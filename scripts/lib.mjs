// Shared drawing helpers for the Crawl Cove GitHub artwork.
// Every piece of text is converted to outlines, because an SVG shown through an
// <img> tag on GitHub cannot load web fonts.
import * as fontkit from 'fontkit'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))

export const C = {
  abyss: '#05060A', surface: '#0B0E16', surface2: '#121723', hairline: '#1E2533',
  fog: '#8A93A6', mist: '#C7CEDB', foam: '#F2F5FA', tide: '#22D3EE', current: '#7C5CFF',
  signal: '#34F5C5', warn: '#FFB020', alert: '#FF5C7A',
  deep: '#061521', shallow: '#0A2A3C',
}

const files = { display: 'space-grotesk', sans: 'inter', mono: 'jetbrains-mono' }
const fonts = {}
const instances = {}
function font(kind, weight) {
  const key = kind + weight
  if (!instances[key]) {
    fonts[kind] ??= fontkit.openSync(path.join(here, 'fonts', `${files[kind]}-latin-wght-normal.woff2`))
    instances[key] = fonts[kind].getVariation({ wght: weight })
  }
  return instances[key]
}

const r1 = (n) => String(Math.round(n * 10) / 10)
export const n = r1

function layout(text, { size = 16, font: kind = 'sans', weight = 400, ls = 0 }) {
  const f = font(kind, weight)
  const s = size / f.unitsPerEm
  const run = f.layout(text)
  let pen = 0
  const parts = []
  run.glyphs.forEach((g, i) => {
    parts.push({ g, x: pen })
    pen += run.positions[i].xAdvance * s + ls
  })
  return { parts, width: pen - (run.glyphs.length ? ls : 0), s }
}

export function measure(text, opts = {}) {
  return layout(text, opts).width
}

// Text as a single outlined <path>. anchor: start | middle | end.
export function T(text, opts = {}) {
  const { x = 0, y = 0, fill = C.foam, anchor = 'start', opacity, cls, style } = opts
  const { parts, width, s } = layout(text, opts)
  const ox = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x
  let d = ''
  for (const { g, x: gx } of parts) {
    for (const c of g.path.commands) {
      const a = c.args
      d += c.command === 'closePath' ? 'Z' : { moveTo: 'M', lineTo: 'L', quadraticCurveTo: 'Q', bezierCurveTo: 'C' }[c.command]
      for (let i = 0; i < a.length; i += 2) d += `${r1(ox + gx + a[i] * s)} ${r1(y - a[i + 1] * s)} `
    }
  }
  const extra = (opacity != null ? ` opacity="${opacity}"` : '') + (cls ? ` class="${cls}"` : '') + (style ? ` style="${style}"` : '')
  return `<path d="${d.trim()}" fill="${fill}"${extra}/>`
}

export function wrap(text, maxWidth, opts = {}) {
  const lines = []
  let cur = ''
  for (const w of text.split(' ')) {
    const next = cur ? cur + ' ' + w : w
    if (measure(next, opts) > maxWidth && cur) { lines.push(cur); cur = w } else cur = next
  }
  if (cur) lines.push(cur)
  return lines
}

export function paragraph(text, maxWidth, opts = {}) {
  const lh = opts.lh ?? Math.round((opts.size ?? 16) * 1.45)
  return wrap(text, maxWidth, opts).map((l, i) => T(l, { ...opts, y: (opts.y ?? 0) + i * lh })).join('')
}

export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const DEFS = `
<linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.tide}"/><stop offset="1" stop-color="${C.current}"/></linearGradient>
<linearGradient id="tgh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.tide}"/><stop offset="1" stop-color="${C.current}"/></linearGradient>
<linearGradient id="lamp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.tide}" stop-opacity=".42"/><stop offset="1" stop-color="${C.tide}" stop-opacity="0"/></linearGradient>
<linearGradient id="ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.tide}" stop-opacity=".16"/><stop offset="1" stop-color="${C.tide}" stop-opacity="0"/></linearGradient>
<radialGradient id="glowT"><stop offset="0" stop-color="${C.tide}" stop-opacity=".5"/><stop offset="1" stop-color="${C.tide}" stop-opacity="0"/></radialGradient>
<radialGradient id="glowV"><stop offset="0" stop-color="${C.current}" stop-opacity=".45"/><stop offset="1" stop-color="${C.current}" stop-opacity="0"/></radialGradient>
<radialGradient id="glowG"><stop offset="0" stop-color="${C.warn}" stop-opacity=".55"/><stop offset="1" stop-color="${C.warn}" stop-opacity="0"/></radialGradient>
<radialGradient id="glowR"><stop offset="0" stop-color="${C.alert}" stop-opacity=".4"/><stop offset="1" stop-color="${C.alert}" stop-opacity="0"/></radialGradient>
`

export const BASE_CSS = `
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes blink{0%,60%,100%{opacity:1}70%,90%{opacity:.15}}
@keyframes spin{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.15)}}
@keyframes rise{0%{transform:translateY(0);opacity:0}12%{opacity:.7}85%{opacity:.5}100%{transform:translateY(var(--h,-220px));opacity:0}}
@keyframes drift{from{transform:translateX(0)}to{transform:translateX(var(--d,-240px))}}
@keyframes sway{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}}
@keyframes twinkle{0%,100%{opacity:.25}50%{opacity:.9}}
@keyframes pulse{0%{transform:scale(.6);opacity:.7}100%{transform:scale(1.9);opacity:0}}
@keyframes glow{0%,100%{opacity:.45}50%{opacity:1}}
@keyframes eye{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
@keyframes swim{from{transform:translateX(0)}to{transform:translateX(var(--d,1400px))}}
.fb{transform-box:fill-box;transform-origin:50% 50%}
.fbb{transform-box:fill-box;transform-origin:50% 100%}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
`

// Wraps a scene in an <svg> with a rounded clip, shared defs and CSS.
export function svg({ w, h, label, body, css = '', radius = 24, defs = '', bg = true, vw = w, vh = h }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" width="${w}" height="${h}" role="img" aria-label="${label}"><title>${label}</title><defs>${DEFS}${defs}<clipPath id="clip"><rect width="${vw}" height="${vh}" rx="${radius}"/></clipPath></defs><style>${BASE_CSS}${css}</style><g clip-path="url(#clip)">${bg ? `<rect width="${vw}" height="${vh}" fill="${C.abyss}"/>` : ''}${body}</g>${bg ? `<rect x=".75" y=".75" width="${vw - 1.5}" height="${vh - 1.5}" rx="${radius - 0.75}" fill="none" stroke="${C.hairline}" stroke-width="1.5"/>` : ''}</svg>\n`
}

export function water(y, w, h, id = 'wg', top = C.shallow, bottom = C.abyss) {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect x="0" y="${y}" width="${w}" height="${h}" fill="url(#${id})"/>`
}

export function stars(w, h, count, seed = 7) {
  const r = rng(seed)
  let s = ''
  for (let i = 0; i < count; i++) {
    const tw = r() < 0.4
    s += `<circle cx="${n(r() * w)}" cy="${n(r() * h)}" r="${n(0.6 + r() * 1.1)}" fill="${C.foam}" opacity="${n(0.2 + r() * 0.5)}"${tw ? ` style="animation:twinkle ${n(3 + r() * 4)}s ease-in-out ${n(-r() * 5)}s infinite"` : ''}/>`
  }
  return s
}

// Layered wave line across the panel at height y. Scrolls sideways for ever.
export function waves(y, w, { amp = 6, period = 240, dur = 9, fill = C.shallow, stroke = C.tide, strokeOpacity = 0.55, depth = 60, reverse = false } = {}) {
  let d = `M${-period} ${y}`
  for (let x = -period; x < w + period; x += period) {
    d += ` Q${x + period / 4} ${y - amp} ${x + period / 2} ${y} T${x + period} ${y}`
  }
  const line = d
  d += ` L${w + period} ${y + depth} L${-period} ${y + depth} Z`
  const st = `--d:${reverse ? period : -period}px;animation:drift ${dur}s linear infinite`
  return `<g style="${st}"><path d="${d}" fill="${fill}"/><path d="${line}" fill="none" stroke="${stroke}" stroke-opacity="${strokeOpacity}" stroke-width="2"/></g>`
}

export function bubbles(x0, x1, y, count, { h = 220, seed = 3 } = {}) {
  const r = rng(seed)
  let s = ''
  for (let i = 0; i < count; i++) {
    const dur = 5 + r() * 5
    s += `<circle cx="${n(x0 + r() * (x1 - x0))}" cy="${n(y - r() * 30)}" r="${n(1.5 + r() * 3.5)}" fill="none" stroke="${C.tide}" stroke-opacity=".6" stroke-width="1.2" opacity="0" style="--h:${-Math.round(h * (0.6 + r() * 0.4))}px;animation:rise ${n(dur)}s linear ${n(-r() * dur)}s infinite"/>`
  }
  return s
}

export function rays(w, y, h, seed = 5) {
  const r = rng(seed)
  let s = ''
  for (let i = 0; i < 6; i++) {
    const x = 80 + r() * (w - 160)
    const tw = 30 + r() * 50
    s += `<polygon points="${n(x)},${y} ${n(x + tw)},${y} ${n(x + tw + 90)},${y + h} ${n(x - 40)},${y + h}" fill="url(#ray)" style="animation:glow ${n(5 + r() * 5)}s ease-in-out ${n(-r() * 6)}s infinite"/>`
  }
  return s
}

export function kelp(x, base, h, color = '#0E3A44', seed = 1) {
  const r = rng(seed)
  let d = `M${x} ${base}`
  const seg = h / 4
  for (let i = 0; i < 4; i++) {
    const dir = i % 2 ? 1 : -1
    d += ` q${dir * 14} ${-seg / 2} 0 ${-seg}`
  }
  return `<path class="fbb" d="${d}" fill="none" stroke="${color}" stroke-width="${n(5 + r() * 3)}" stroke-linecap="round" style="animation:sway ${n(5 + r() * 3)}s ease-in-out ${n(-r() * 4)}s infinite"/>`
}

export function seabed(w, y, h, fill = '#070B12', seed = 2) {
  const r = rng(seed)
  let d = `M0 ${y + 10}`
  for (let x = 0; x < w; x += 150) d += ` q75 ${n(-10 - r() * 18)} 150 0`
  d += ` L${w} ${y + h} L0 ${y + h} Z`
  return `<path d="${d}" fill="${fill}"/><path d="${d.split(' L')[0]}" fill="none" stroke="${C.hairline}" stroke-width="1.5"/>`
}

export function fish(x, y, { scale = 1, color = C.tide, opacity = 0.35, dur = 30, delay = 0, dist = 1500, flip = false } = {}) {
  const body = `<path d="M0 0 q14 -9 30 0 q-16 9 -30 0 Z M0 0 l-10 -7 v14 Z" fill="${color}"/>`
  return `<g style="--d:${flip ? -dist : dist}px;animation:swim ${dur}s linear ${delay}s infinite" opacity="${opacity}"><g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${body}</g></g>`
}

// The crawler: a small dive probe with a lamp. Drawn facing right, centred on 0,0.
export function probe({ lamp = true, lampLen = 190 } = {}) {
  return `${lamp ? `<polygon points="24,-3 ${lampLen},-52 ${lampLen},60 24,7" fill="url(#lamp)" style="animation:glow 4s ease-in-out infinite"/>` : ''}
<path d="M-28 0 L-46 -15 L-46 15 Z" fill="${C.surface2}" stroke="${C.tide}" stroke-width="2" stroke-linejoin="round"/>
<rect class="fb" x="-54" y="-13" width="5" height="26" rx="2.5" fill="${C.mist}" style="animation:spin .5s linear infinite"/>
<rect x="-32" y="-19" width="66" height="38" rx="19" fill="#0F1626" stroke="url(#tg)" stroke-width="2.5"/>
<circle cx="13" cy="0" r="11" fill="#06222B" stroke="${C.tide}" stroke-width="2"/>
<g class="fb" style="animation:eye 5s linear infinite"><circle cx="13" cy="0" r="5.5" fill="${C.tide}"/><circle cx="15.2" cy="-2.2" r="1.7" fill="${C.foam}"/></g>
<circle cx="-14" cy="6" r="1.8" fill="${C.fog}"/><circle cx="-21" cy="6" r="1.8" fill="${C.fog}"/>
<line x1="-10" y1="-19" x2="-10" y2="-31" stroke="${C.mist}" stroke-width="2" stroke-linecap="round"/>
<circle cx="-10" cy="-34" r="3.2" fill="${C.signal}" style="animation:blink 2.4s linear infinite"/>`
}

export function pill(text, { x, y, h = 30, pad = 14, size = 13, fill = C.surface2, stroke = C.hairline, color = C.mist, font = 'mono', weight = 500, anchor = 'start', dot, ls = 0.4 }) {
  const tw = measure(text, { size, font, weight, ls })
  const w = tw + pad * 2 + (dot ? 14 : 0)
  const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x
  return `<rect x="${n(x0)}" y="${y}" width="${n(w)}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>${dot ? `<circle cx="${n(x0 + pad + 3)}" cy="${y + h / 2}" r="3.5" fill="${dot}"/>` : ''}${T(text, { x: x0 + pad + (dot ? 14 : 0), y: y + h / 2 + size * 0.36, size, font, weight, fill: color, ls })}`
}
pill.width = (text, { pad = 14, size = 13, font = 'mono', weight = 500, dot, ls = 0.4 } = {}) => measure(text, { size, font, weight, ls }) + pad * 2 + (dot ? 14 : 0)

// "Click to ..." cue with a pulsing ring.
export function cue(text, x, y) {
  const w = pill.width(text, { size: 14, pad: 20 }) + 22
  return `<g><rect x="${n(x - w / 2)}" y="${y}" width="${n(w)}" height="38" rx="19" fill="${C.abyss}" fill-opacity=".8" stroke="url(#tgh)" stroke-width="1.6"/>
<circle class="fb" cx="${n(x - w / 2 + 22)}" cy="${y + 19}" r="6" fill="none" stroke="${C.tide}" stroke-width="1.5" style="animation:pulse 1.8s ease-out infinite"/>
<circle cx="${n(x - w / 2 + 22)}" cy="${y + 19}" r="4" fill="${C.tide}"/>
${T(text, { x: x - w / 2 + 38, y: y + 24, size: 14, font: 'mono', weight: 600, fill: C.foam, ls: 0.4 })}</g>`
}

export function check(x, y, s = 1, color = C.signal) {
  return `<path d="M${n(x - 5 * s)} ${n(y)} l${n(3.5 * s)} ${n(3.5 * s)} l${n(7 * s)} ${n(-7.5 * s)}" fill="none" stroke="${color}" stroke-width="${n(2.2 * s)}" stroke-linecap="round" stroke-linejoin="round"/>`
}
export function cross(x, y, s = 1, color = C.alert) {
  return `<path d="M${n(x - 4.5 * s)} ${n(y - 4.5 * s)} l${n(9 * s)} ${n(9 * s)} M${n(x + 4.5 * s)} ${n(y - 4.5 * s)} l${n(-9 * s)} ${n(9 * s)}" fill="none" stroke="${color}" stroke-width="${n(2.2 * s)}" stroke-linecap="round"/>`
}

// A headland with a lighthouse, so the cove reads as a cove. side: 'right' | 'left'.
export function headland(w, wl, side = 'right', { lighthouse: lh = true } = {}) {
  const right = side === 'right'
  const d = right
    ? `M${w} ${wl + 20} L${w} ${wl - 78} q-40 -8 -74 -2 q-34 4 -58 26 q-26 22 -58 30 q-30 8 -46 24 Z`
    : `M0 ${wl + 20} L0 ${wl - 44} q34 -6 62 4 q30 10 52 22 q26 12 44 18 Z`
  let s = `<path d="${d}" fill="#080B13" stroke="${C.hairline}" stroke-width="1.5"/>`
  if (right && lh) {
    const x = w - 62, y = wl - 82
    s = `<g opacity=".5"><polygon class="beam" points="${x},${y - 62} ${x - 620},${y - 150} ${x - 620},${y + 10}" fill="url(#lhb)"/></g>` + s
      + `<path d="M${x - 11} ${y} L${x - 7} ${y - 52} h14 L${x + 11} ${y} Z" fill="#0F1626" stroke="${C.mist}" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M${x - 9.5} ${y - 20} h19 M${x - 8} ${y - 38} h16" stroke="${C.tide}" stroke-width="3" opacity=".7"/>
<rect x="${x - 9}" y="${y - 70}" width="18" height="18" rx="3" fill="#0F1626" stroke="${C.mist}" stroke-width="1.5"/>
<circle cx="${x}" cy="${y - 61}" r="22" fill="url(#glowG)" style="animation:glow 6s ease-in-out infinite"/><circle cx="${x}" cy="${y - 61}" r="4.5" fill="${C.warn}"/>
<path d="M${x - 11} ${y - 70} L${x} ${y - 82} L${x + 11} ${y - 70} Z" fill="${C.mist}"/>`
  }
  return s
}
export const LH_DEFS = `<linearGradient id="lhb" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="${C.warn}" stop-opacity=".5"/><stop offset="1" stop-color="${C.warn}" stop-opacity="0"/></linearGradient>`
export const LH_CSS = `.beam{transform-box:fill-box;transform-origin:100% 50%;animation:sweep 12s ease-in-out infinite}@keyframes sweep{0%,100%{transform:rotate(-7deg);opacity:.35}50%{transform:rotate(9deg);opacity:1}}@keyframes shoot{0%,86%{transform:translate(0,0);opacity:0}88%{opacity:1}94%,100%{transform:translate(-260px,110px);opacity:0}}@keyframes walk{0%,100%{transform:translateX(0)}50%{transform:translateX(var(--d,160px))}}@keyframes legs{0%,100%{transform:scaleX(1)}50%{transform:scaleX(.82)}}`

export function shootingStar(x, y, delay = 0, dur = 13) {
  return `<path d="M${x} ${y} l34 -14" stroke="${C.foam}" stroke-width="2" stroke-linecap="round" opacity="0" style="animation:shoot ${dur}s linear ${delay}s infinite"/>`
}

// A crab. It crawls, which is the whole joke.
export function crab(x, y, { dist = 160, dur = 16, delay = 0, scale = 1, color = '#FF8A6B' } = {}) {
  return `<g style="--d:${dist}px;animation:walk ${dur}s ease-in-out ${delay}s infinite"><g transform="translate(${x} ${y}) scale(${scale})">
<g class="fb" style="animation:legs .5s linear infinite" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M-9 2 l-9 5 M-10 -1 l-10 1 M9 2 l9 5 M10 -1 l10 1"/></g>
<path d="M-12 0 q0 -11 12 -11 q12 0 12 11 q-12 6 -24 0 Z" fill="${color}"/>
<path d="M-11 -6 q-8 -4 -7 -12 M11 -6 q8 -4 7 -12" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>
<circle cx="-18" cy="-19" r="3.4" fill="${color}"/><circle cx="18" cy="-19" r="3.4" fill="${color}"/>
<circle cx="-4" cy="-13" r="2" fill="${C.foam}"/><circle cx="4" cy="-13" r="2" fill="${C.foam}"/><circle cx="-4" cy="-13" r=".9" fill="${C.abyss}"/><circle cx="4" cy="-13" r=".9" fill="${C.abyss}"/></g></g>`
}
