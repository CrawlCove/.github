#!/usr/bin/env node
// Record a REAL command run and render it as an animated terminal SVG for a README.
//
//   node scripts/terminal-demo.mjs --out ../repo/docs/demo.svg --title "seo-crawler-cli" \
//     --show "npx github:CrawlCove/seo-crawler-cli https://crawlcove.github.io/seo-test-site/" \
//     -- node ../repo/dist/cli.js https://crawlcove.github.io/seo-test-site/
//
// Everything after `--` is executed (NO_COLOR=1); every stdout/stderr line is stamped with
// the time it arrived, and the SVG replays those lines at that pace (gaps capped so a slow
// network does not make a dull loop). `--show` is the command printed at the prompt, when
// what a reader types differs from how this box runs the local build. The JSON recording
// is written next to the SVG (`.cast.json`) so a re-render never needs a re-run.
// No JavaScript: CSS keyframes only, so GitHub's <img> renders and loops it.
import { spawn } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { C } from './lib.mjs'

const argv = process.argv.slice(2)
const sep = argv.indexOf('--')
const opts = {}
for (let i = 0; i < (sep < 0 ? argv.length : sep); i += 2) opts[argv[i].replace(/^--/, '')] = argv[i + 1]
const cmd = sep < 0 ? null : argv.slice(sep + 1)
if (!opts.out || (!cmd && !opts.cast && !opts.steps)) {
  console.error('usage: terminal-demo.mjs --out file.svg --title T [--show "cmd"] [--cast rec.json] [--max-lines 30] -- command args')
  process.exit(2)
}
const MAX_LINES = Number(opts['max-lines'] ?? 30)
const COLS = Number(opts.cols ?? 110)

function record(command) {
  return new Promise((resolve) => {
    const t0 = Date.now()
    const lines = []
    const child = spawn(command[0], command.slice(1), { env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0', CI: '1' } })
    const feed = (buf) => {
      for (const l of buf.toString('utf8').replace(/\r/g, '').split('\n')) {
        if (l === '' && lines.length && lines[lines.length - 1].text === '') continue
        lines.push({ t: Date.now() - t0, text: l })
      }
    }
    let pending = ''
    const onData = (b) => {
      pending += b.toString('utf8')
      const parts = pending.split('\n')
      pending = parts.pop()
      if (parts.length) feed(Buffer.from(parts.join('\n')))
    }
    child.stdout.on('data', onData)
    child.stderr.on('data', onData)
    child.on('close', (code) => {
      if (pending) feed(Buffer.from(pending))
      while (lines.length && lines[lines.length - 1].text.trim() === '') lines.pop()
      resolve({ code, ms: Date.now() - t0, lines })
    })
  })
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function tone(text) {
  if (/\b0 error\(s\)/.test(text) && !/\b[1-9]\d* (error|warning)/.test(text)) return C.signal
  if (/[✗✖]/.test(text) || /\b(error|errors|fail|failed|broken|blocked|404|5\d\d)\b/i.test(text)) return C.alert
  if (/\b(warn|warning|warnings|redirect|301|302|noindex)\b/i.test(text)) return C.warn
  if (/\b(ok|pass|passed|valid|200)\b|✓|✔/i.test(text)) return C.signal
  return C.mist
}

function render({ title, steps }) {
  // Flatten into rows: a prompt row (typed) then its output rows, each with a replay time.
  const rows = []
  let clock = 400
  for (const st of steps) {
    // A long command wraps onto continuation rows, each typed in turn.
    const parts = []
    let rest = st.show
    while (rest.length > COLS - 4) {
      let cut = rest.lastIndexOf(' ', COLS - 6)
      if (cut < 20) cut = COLS - 6
      parts.push(rest.slice(0, cut) + ' \\')
      rest = rest.slice(cut).trimStart()
    }
    parts.push(rest)
    parts.forEach((text, j) => {
      const typeMs = Math.min(1600, 28 * text.length)
      rows.push({ kind: 'prompt', text, at: clock, typeMs, cont: j > 0 })
      clock += typeMs + 120
    })
    clock += 250
    // Drop leading blank lines and wrap long ones at COLS so nothing is cut off.
    let lines = st.lines.slice(st.lines.findIndex((l) => l.text.trim() !== '') < 0 ? st.lines.length : st.lines.findIndex((l) => l.text.trim() !== ''))
    lines = lines.flatMap((l) => {
      if (l.text.length <= COLS) return [l]
      const out = []
      let rest = l.text
      while (rest.length > COLS) {
        let cut = rest.lastIndexOf(' ', COLS)
        if (cut < COLS / 2) cut = COLS
        out.push({ t: l.t, text: rest.slice(0, cut), tone: tone(l.text) })
        rest = '  ' + rest.slice(cut).trimStart()
      }
      out.push({ t: l.t, text: rest, tone: tone(l.text) })
      return out
    })
    const cap = st.maxLines ?? MAX_LINES
    if (lines.length > cap) {
      const head = lines.slice(0, cap - 3)
      lines = [...head, { t: head[head.length - 1].t, text: `… ${st.lines.length - cap + 2} more lines` }, ...st.lines.slice(-2)]
    }
    let prev = 0
    for (const l of lines) {
      clock += Math.max(60, Math.min(700, l.t - prev))
      prev = l.t
      rows.push({ kind: 'out', text: l.text, at: clock, tone: l.tone })
    }
    clock += 900
  }
  const total = clock + 3600
  const pct = (ms) => ((ms / total) * 100).toFixed(2)

  const lh = 20
  const pad = 22
  const top = 46
  const w = 980
  const h = top + pad + rows.length * lh + pad
  const clip = (s) => (s.length > COLS ? s.slice(0, COLS - 1) + '…' : s)

  let css = `text{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace;font-size:14px;white-space:pre}
.ln{opacity:0}`
  let defs = ''
  let body = ''
  rows.forEach((r, i) => {
    const y = top + pad + (i + 1) * lh - 5
    const s = pct(r.at)
    css += `\n@keyframes k${i}{0%,${s}%{opacity:0}${(Number(s) + 0.01).toFixed(2)}%,99.5%{opacity:1}100%{opacity:0}}.l${i}{animation:k${i} ${total}ms linear infinite}`
    if (r.kind === 'prompt') {
      const t = r.cont ? '  ' + r.text : r.text
      const cw = (t.length * 8.45).toFixed(0)
      css += `\n@keyframes t${i}{0%,${s}%{width:0}${pct(r.at + r.typeMs)}%,99.5%{width:${cw}px}100%{width:0}}#c${i}{animation:t${i} ${total}ms steps(${Math.max(1, t.length)},end) infinite}`
      defs += `<clipPath id="p${i}"><rect id="c${i}" x="${pad + 17}" y="${y - 15}" height="20" width="0"/></clipPath>`
      body += `\n<g class="ln l${i}"><text x="${pad}" y="${y}" fill="${C.tide}">${r.cont ? '' : '$'}</text><g clip-path="url(#p${i})"><text x="${pad + 17}" y="${y}" fill="${C.foam}">${esc(t)}</text></g></g>`
    } else {
      body += `\n<text class="ln l${i}" x="${pad}" y="${y}" fill="${r.tone ?? tone(r.text)}">${esc(clip(r.text)) || ' '}</text>`
    }
  })
  const label = steps.map((s) => s.show).join('; ')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}: terminal recording of ${esc(label)}">
<title>${esc(title)}: ${esc(label)}</title>
<style>${css}
</style>
<defs>${defs}</defs>
<rect width="${w}" height="${h}" rx="12" fill="${C.surface}" stroke="${C.hairline}"/>
<rect width="${w}" height="${top - 10}" rx="12" fill="${C.surface2}"/><rect y="${top - 22}" width="${w}" height="12" fill="${C.surface2}"/>
<circle cx="22" cy="18" r="6" fill="${C.alert}"/><circle cx="42" cy="18" r="6" fill="${C.warn}"/><circle cx="62" cy="18" r="6" fill="${C.signal}"/>
<text x="${w / 2}" y="23" fill="${C.fog}" text-anchor="middle" style="font-size:13px">${esc(title)}</text>${body}
</svg>
`
}

// --steps steps.json: [{ "show": "what the reader types", "run": "what this box runs (bash)", "maxLines": 12 }]
// runs each in turn and replays them as one session. Without it, one step from --show and `-- cmd`.
const castPath = opts.cast ?? opts.out.replace(/\.svg$/, '.cast.json')
let steps
if (opts.steps || cmd) {
  const plan = opts.steps ? JSON.parse(readFileSync(opts.steps, 'utf8')) : [{ show: opts.show ?? cmd.join(' '), argv: cmd }]
  steps = []
  for (const st of plan) {
    const rec = await record(st.argv ?? ['bash', '-c', st.run])
    steps.push({ show: st.show, maxLines: st.maxLines, exit: rec.code, ms: rec.ms, lines: rec.lines })
    console.log(`  ${st.show}: ${rec.lines.length} lines, exit ${rec.code}, ${rec.ms} ms`)
  }
  mkdirSync(dirname(castPath), { recursive: true })
  writeFileSync(castPath, JSON.stringify({ recorded: new Date().toISOString(), steps }, null, 1) + '\n')
} else {
  steps = JSON.parse(readFileSync(castPath, 'utf8')).steps
}
mkdirSync(dirname(opts.out), { recursive: true })
writeFileSync(opts.out, render({ title: opts.title ?? 'terminal', steps }))
console.log(opts.out)
