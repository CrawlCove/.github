// The large story panels, bars, buttons, heading icons and per-repo banners.
import { C, T, n, svg, measure, wrap, water, stars, waves, bubbles, rays, kelp, seabed, fish, probe, pill, cue, check, cross } from './lib.mjs'
import { sceneFor, SCENE_CSS } from './cards.mjs'

const W = 1200

export function hero() {
  const h = 520, wl = 262
  const body = `${stars(W, wl - 20, 70, 11)}
<circle cx="600" cy="120" r="330" fill="url(#glowV)" opacity=".28"/>
${T('OPEN-SOURCE SEO TOOLS', { x: 600, y: 74, size: 15, font: 'mono', weight: 600, fill: C.tide, anchor: 'middle', ls: 3 })}
${T('Crawl Cove', { x: 600, y: 160, size: 92, font: 'display', weight: 700, fill: C.foam, anchor: 'middle', ls: -2.5 })}
${T('Free tools for technical SEO, and the desktop crawler behind them.', { x: 600, y: 210, size: 23, fill: C.mist, anchor: 'middle' })}
${water(wl, W, h - wl, 'hw')}
${rays(W, wl, 230, 4)}
${waves(wl - 5, W, { amp: 9, period: 300, dur: 14, fill: '#0C3246', strokeOpacity: 0.25, reverse: true, depth: 12 })}
${waves(wl, W, { amp: 7, period: 240, dur: 9, fill: C.shallow, depth: 14 })}
${fish(-120, 330, { dur: 34, opacity: 0.3 })}${fish(-300, 420, { dur: 46, delay: -20, scale: 1.4, color: C.current, opacity: 0.35 })}${fish(1320, 380, { dur: 40, delay: -9, flip: true, scale: 0.9, opacity: 0.25 })}
${seabed(W, h - 44, 60)}
${[70, 120, 190, 960, 1040, 1110, 1150].map((x, i) => kelp(x, h - 26, 70 + (i % 3) * 26, i % 2 ? '#123F4D' : '#0E3340', i + 1)).join('')}
${bubbles(250, 420, h - 40, 7, { h: 200, seed: 9 })}${bubbles(800, 930, h - 40, 6, { h: 190, seed: 12 })}
<g style="animation:bob 5s ease-in-out infinite"><g transform="translate(540 352) rotate(16)">${probe({ lampLen: 230 })}</g></g>
${bubbles(470, 500, 345, 4, { h: 80, seed: 21 })}
${cue('Click to dive in', 600, 446)}`
  return svg({ w: W, h, label: 'Crawl Cove: free, open-source tools for technical SEO and the desktop crawler behind them. A small dive probe waits just under the surface. Click to dive in.', body })
}

// The crawl as a dive. One loop: the probe descends through crawl depths and logs what its lamp finds.
export function dive() {
  const h = 470, D = 24
  const stops = [[250, 128], [520, 198], [790, 268], [1020, 330]]
  const at = [16, 40, 64, 86] // percent of the loop at which the probe reaches each stop
  const kf = `@keyframes path{0%{transform:translate(60px,70px);opacity:0}3%{opacity:1}${stops.map(([x, y], i) => `${at[i]}%,${at[i] + 6}%{transform:translate(${x}px,${y}px)}`).join('')}96%{transform:translate(${stops[3][0]}px,${stops[3][1]}px);opacity:1}100%{transform:translate(${stops[3][0]}px,${stops[3][1]}px);opacity:0}}
${at.map((a, i) => `@keyframes lit${i}{0%,${a}%{opacity:0}${a + 3}%,96%{opacity:1}100%{opacity:0}}@keyframes cnt${i}{0%,${i === 0 ? 0 : at[i - 1] + 2}%{opacity:${i === 0 ? 1 : 0}}${i === 0 ? '' : `${at[i - 1] + 3}%{opacity:1}`}${i === 3 ? '96%{opacity:1}100%{opacity:0}' : `${a + 2}%{opacity:1}${a + 3}%,100%{opacity:0}`}}`).join('')}
@keyframes bar{0%{transform:scaleX(0)}86%,96%{transform:scaleX(1)}100%{transform:scaleX(0)}}`
  const lit = (i, s) => `<g style="animation:lit${i} ${D}s linear infinite">${s}</g>`
  const dim = (s) => `<g opacity=".16">${s}</g>`
  const chain = (c) => `<g fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"><rect x="-44" y="-12" width="40" height="24" rx="12" transform="rotate(-18 -24 0)"/><rect x="6" y="-12" width="40" height="24" rx="12" transform="rotate(14 26 0)"/></g><path d="M-3 -22 l4 9 M2 14 l-3 9 M-12 -16 l-5 -6" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>`
  const loop = (c) => `<g fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-30 6 a30 22 0 0 1 56 -12"/><path d="M30 -6 a30 22 0 0 1 -56 12"/><path d="M18 -18 l9 12 l10 -10 M-18 18 l-9 -12 l-10 10"/></g>`
  const page = (c) => `<g fill="none" stroke="${c}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M-22 -30 h30 l14 14 v46 h-44 Z"/><path d="M-14 4 q14 -14 28 0 q-14 14 -28 0 Z"/><path d="M-18 20 L18 -12"/></g>`
  const hz = [
    { x: 400, y: 128, icon: chain, label: '404 broken link' },
    { x: 670, y: 198, icon: loop, label: 'redirect chain' },
    { x: 940, y: 268, icon: page, label: 'noindex' },
  ]
  const hazards = hz.map((z, i) => `<g transform="translate(${z.x} ${z.y})">${dim(z.icon(C.fog))}${lit(i, `<circle r="74" fill="url(#glowR)"/>${z.icon(C.alert)}`)}</g>${lit(i, pill(z.label, { x: z.x, y: z.y - 80, anchor: 'middle', color: C.alert, stroke: C.alert, fill: C.abyss, dot: C.alert, size: 13 }))}`).join('')
  const depths = [100, 170, 240, 310].map((y, i) => `<line x1="96" x2="${W}" y1="${y}" y2="${y}" stroke="${C.tide}" stroke-opacity=".12" stroke-dasharray="3 9"/>${T(`depth ${i + 1}`, { x: 24, y: y + 4, size: 12, font: 'mono', fill: C.fog })}`).join('')
  const report = `<g transform="translate(1104 344)">${lit(3, `<circle r="70" fill="url(#glowT)" opacity=".7"/>`)}<g opacity=".3"><rect x="-24" y="-32" width="48" height="60" rx="6" fill="${C.surface2}" stroke="${C.fog}" stroke-width="2"/></g>${lit(3, `<rect x="-24" y="-32" width="48" height="60" rx="6" fill="${C.surface2}" stroke="${C.signal}" stroke-width="2.5"/><path d="M-14 -16 h28 M-14 -4 h28 M-14 8 h16" stroke="${C.mist}" stroke-width="3" stroke-linecap="round"/>${check(12, 16, 1.1)}`)}</g>${lit(3, pill('report ready', { x: 1104, y: 388, anchor: 'middle', color: C.signal, stroke: C.signal, fill: C.abyss, dot: C.signal, size: 13 }))}`
  const hud = `<rect x="0" y="${h - 46}" width="${W}" height="46" fill="${C.abyss}" fill-opacity=".86"/><line x1="0" x2="${W}" y1="${h - 46}" y2="${h - 46}" stroke="${C.hairline}"/>
${T('crawling example.com', { x: 24, y: h - 18, size: 13, font: 'mono', fill: C.mist })}
<rect x="220" y="${h - 27}" width="640" height="8" rx="4" fill="${C.surface2}"/><rect x="220" y="${h - 27}" width="640" height="8" rx="4" fill="url(#tgh)" style="transform-origin:220px 0;animation:bar ${D}s linear infinite"/>
${T('issues found', { x: 1040, y: h - 18, size: 13, font: 'mono', fill: C.fog, anchor: 'end' })}
${[0, 1, 2, 3].map((k) => `<g style="animation:cnt${k} ${D}s linear infinite"${k < 3 ? ' opacity="0"' : ''}>${T(String(k), { x: 1058, y: h - 16, size: 19, font: 'mono', weight: 700, fill: k ? C.alert : C.mist })}</g>`).join('')}
${T('lamp on', { x: 1176, y: h - 18, size: 13, font: 'mono', fill: C.tide, anchor: 'end' })}`
  const body = `${water(0, W, h, 'dw', '#0B3044', '#04070D')}${rays(W, 0, 300, 8)}
${waves(-8, W, { amp: 6, period: 260, dur: 11, fill: '#0E3A50', strokeOpacity: 0.3, depth: 0 })}
${depths}
${fish(-200, 220, { dur: 38, opacity: 0.22 })}${fish(1350, 150, { dur: 50, delay: -14, flip: true, color: C.current, opacity: 0.25, scale: 1.3 })}
${seabed(W, h - 84, 90, '#060910', 6)}
${[150, 205, 880].map((x, i) => kelp(x, h - 62, 60 + i * 18, '#0E3340', i + 4)).join('')}
${hazards}${report}
<g style="transform:translate(${stops[3][0]}px,${stops[3][1]}px);animation:path ${D}s ease-in-out infinite"><g style="animation:bob 4s ease-in-out infinite"><g transform="rotate(14)">${probe({ lampLen: 170 })}</g></g></g>
${bubbles(100, 1100, h - 60, 14, { h: 320, seed: 31 })}
${hud}`
  return svg({ w: W, h, label: 'A crawl shown as a dive. The probe descends through crawl depths one to four. Its lamp finds a 404 broken link, a redirect chain and a noindex page, then the report is ready.', body, css: kf })
}

function chest(open) {
  const gold = C.warn
  const lid = `<path d="M-46 -12 q0 -30 46 -30 q46 0 46 30 Z" fill="#231A10" stroke="${gold}" stroke-width="3" stroke-linejoin="round"/><path d="M-16 -41 v29 M16 -41 v29" stroke="${gold}" stroke-width="3"/>`
  return `${open ? `<circle cy="-20" r="120" fill="url(#glowG)" style="animation:glow 3.5s ease-in-out infinite"/><polygon points="-40,-14 40,-14 120,-210 -120,-210" fill="url(#beam)" style="animation:glow 3.5s ease-in-out infinite"/>` : `<circle cy="-6" r="70" fill="url(#glowG)" style="animation:glow 2.8s ease-in-out infinite"/>`}
<g transform="${open ? 'rotate(-30 -46 -12)' : ''}">${lid}</g>
<rect x="-46" y="-12" width="92" height="50" rx="5" fill="#1B140C" stroke="${gold}" stroke-width="3"/>
<path d="M-16 -12 v50 M16 -12 v50" stroke="${gold}" stroke-width="3"/>
${open ? `<path d="M-40 -12 h80" stroke="${C.foam}" stroke-width="3" stroke-linecap="round" opacity=".8"/>` : `<rect x="-8" y="-18" width="16" height="18" rx="3" fill="${gold}"/><circle cy="-9" r="2.5" fill="#1B140C"/>`}`
}
const BEAM = `<linearGradient id="beam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.warn}" stop-opacity=".4"/><stop offset="1" stop-color="${C.warn}" stop-opacity="0"/></linearGradient>`

function bar({ label, icon, title, sub, cueText, seed }) {
  const h = 136
  const body = `${water(0, W, h, 'bw', '#081C2A', '#05060A')}
${seabed(W, h - 30, 40, '#070B12', seed)}
${[30, 1080, 1140].map((x, i) => kelp(x, h - 16, 40 + i * 12, '#0E3340', seed + i)).join('')}
${bubbles(60, 200, h - 20, 5, { h: 110, seed })}
<g transform="translate(118 78)">${icon}</g>
${T(title, { x: 214, y: 66, size: 32, font: 'display', weight: 700, fill: C.foam, ls: -0.6 })}
${T(sub, { x: 214, y: 97, size: 16, font: 'mono', fill: C.fog })}
${cue(cueText, 1030, 49)}`
  return svg({ w: W, h, label, body, defs: BEAM })
}

export const chestBar = () => bar({ label: 'Something is glowing on the seabed: the Crawl Cove desktop app, with a free plan. Click to open the chest.', icon: `<g transform="scale(.85)">${chest(false)}</g>`, title: 'Something is glowing on the seabed', sub: 'the desktop app, free plan included', cueText: 'Click to open', seed: 14 })

const lanternFish = `<path d="M-40 4 q18 -30 52 -12 q14 8 14 12 q0 6 -14 12 q-34 16 -52 -12 Z M-40 4 l-18 -14 v28 Z" fill="${C.surface2}" stroke="${C.current}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="8" cy="-2" r="4" fill="${C.foam}"/><path d="M10 12 h12" stroke="${C.current}" stroke-width="2" stroke-linecap="round"/>
<path d="M-6 -16 q8 -28 34 -22" fill="none" stroke="${C.current}" stroke-width="2" stroke-linecap="round"/>
<circle cx="30" cy="-38" r="26" fill="url(#glowT)" style="animation:glow 2.4s ease-in-out infinite"/><circle cx="30" cy="-38" r="5" fill="${C.tide}"/>`
export const faqBar = () => bar({ label: 'Questions from the surface: six straight answers about Crawl Cove. Click to open.', icon: lanternFish, title: 'Questions from the surface', sub: 'six straight answers', cueText: 'Click to open', seed: 23 })

export function treasure() {
  const h = 400
  const rows = ['1 project', '1,000 URLs a crawl', 'Search Console connection', 'No account, no card, no expiry']
  const gems = [[-70, C.tide, 0], [-20, C.current, 1.4], [34, C.signal, 2.6], [74, C.tide, 3.7], [0, C.foam, 4.6]].map(([x, c, d]) => `<path d="M${x} -40 l8 -10 l8 10 l-8 12 Z" fill="${c}" opacity="0" style="--h:-190px;animation:rise 6s linear ${-d}s infinite"/>`).join('')
  const body = `${water(0, W, h, 'tw', '#0A2434', '#05060A')}${rays(W, 0, 260, 17)}
${seabed(W, h - 60, 70, '#070B12', 19)}
${[60, 110, 470, 1130].map((x, i) => kelp(x, h - 40, 60 + i * 14, '#0E3340', i + 9)).join('')}
<g transform="translate(270 318) scale(1.5)">${chest(true)}${gems}</g>
${T('IN THE CHEST', { x: 560, y: 78, size: 14, font: 'mono', weight: 600, fill: C.tide, ls: 3 })}
${T('The desktop app.', { x: 560, y: 134, size: 50, font: 'display', weight: 700, fill: C.foam, ls: -1.2 })}
${T('Free plan included.', { x: 560, y: 188, size: 50, font: 'display', weight: 700, fill: 'url(#tgh)', ls: -1.2 })}
${rows.map((r, i) => `<g style="animation:s${i + 1} 10s linear infinite"><circle cx="572" cy="${232 + i * 36}" r="11" fill="${C.surface2}" stroke="${C.signal}" stroke-width="1.6"/>${check(572, 232 + i * 36, 0.9)}${T(r, { x: 596, y: 239 + i * 36, size: 21, fill: C.foam, weight: 500 })}</g>`).join('')}
${bubbles(520, 1150, h - 50, 9, { h: 260, seed: 41 })}`
  return svg({ w: W, h, label: 'In the chest: the Crawl Cove desktop app, free plan included. 1 project, 1,000 URLs a crawl, Search Console connection, no account, no card and no expiry.', body, defs: BEAM, css: SCENE_CSS })
}

export function stack() {
  const h = 168
  const items = ['Google Search Console', 'WordPress', 'Yoast SEO', 'Rank Math', 'SEOPress', 'AIOSEO', 'GitHub Actions', 'MCP', 'Chrome', 'Google Sheets', 'Screaming Frog exports', 'JSON and CSV']
  const rowsOf = [items.slice(0, 6), items.slice(6)]
  let chips = ''
  rowsOf.forEach((row, ri) => {
    const widths = row.map((t) => pill.width(t, { size: 15, pad: 18, font: 'sans' }))
    let x = (W - (widths.reduce((a, b) => a + b, 0) + 14 * (row.length - 1))) / 2
    row.forEach((t, i) => {
      chips += `<g style="animation:bob ${n(4 + ((i * 7 + ri * 3) % 5) * 0.5)}s ease-in-out ${n(-(i * 0.7 + ri))}s infinite">${pill(t, { x, y: 34 + ri * 58, h: 42, size: 15, pad: 18, font: 'sans', weight: 500, color: C.foam, fill: C.surface, ls: 0 })}</g>`
      x += widths[i] + 14
    })
  })
  const body = `${water(0, W, h, 'sw', '#081C2A', '#05060A')}${waves(h - 6, W, { amp: 5, period: 200, dur: 12, fill: '#070B12', strokeOpacity: 0.2, depth: 20 })}${chips}${bubbles(40, 1160, h, 8, { h: 150, seed: 51 })}`
  return svg({ w: W, h, label: `Crawl Cove tools work with ${items.join(', ')}.`, body })
}

export function surface() {
  const h = 400, wl = 270
  const body = `${stars(W, wl - 10, 80, 61)}<circle cx="600" cy="250" r="360" fill="url(#glowT)" opacity=".2"/>
${T('Back at the surface.', { x: 600, y: 112, size: 64, font: 'display', weight: 700, fill: C.foam, anchor: 'middle', ls: -1.6 })}
${T('Star a tool you use. Then crawl your own site, free.', { x: 600, y: 160, size: 23, fill: C.mist, anchor: 'middle' })}
${water(wl, W, h - wl, 'fw')}
${waves(wl - 5, W, { amp: 9, period: 300, dur: 14, fill: '#0C3246', strokeOpacity: 0.25, reverse: true, depth: 12 })}
<g style="animation:bob 3.6s ease-in-out infinite"><g transform="translate(600 ${wl - 4}) rotate(-6) scale(1.25)">${probe({ lamp: false })}</g></g>
${waves(wl + 4, W, { amp: 7, period: 240, dur: 9, fill: C.shallow, depth: 14 })}
<g fill="none" stroke="${C.tide}" stroke-width="1.5">${[0, 1.2, 2.4].map((d) => `<ellipse class="fb" cx="600" cy="${wl + 6}" rx="70" ry="9" opacity="0" style="animation:pulse 3.6s ease-out ${-d}s infinite"/>`).join('')}</g>
${fish(-150, 345, { dur: 36, opacity: 0.28 })}${fish(1330, 370, { dur: 44, delay: -12, flip: true, color: C.current, opacity: 0.3 })}
${bubbles(520, 680, h, 8, { h: 110, seed: 71 })}`
  return svg({ w: W, h, label: 'Back at the surface. Star a tool you use, then crawl your own site for free with the Crawl Cove desktop app.', body })
}

export function button(text, { primary = false } = {}) {
  const size = 17, padX = 26, h = 52
  const tw = measure(text, { size, font: 'display', weight: 700 })
  const w = Math.ceil(tw + padX * 2 + (primary ? 26 : 0))
  const body = `<rect width="${w}" height="${h}" fill="${primary ? 'url(#tg)' : C.surface2}"/>${T(text, { x: padX, y: 33, size, font: 'display', weight: 700, fill: primary ? C.abyss : C.foam })}${primary ? `<path d="M${w - padX - 12} 19 v12 m-6 -6 l6 6 l6 -6 M${w - padX - 19} 36 h14" fill="none" stroke="${C.abyss}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`
  let out = svg({ w, h, label: text, body, radius: 14, bg: false })
  if (!primary) out = out.replace('</g></svg>', `</g><rect x=".75" y=".75" width="${w - 1.5}" height="${h - 1.5}" rx="13.25" fill="none" stroke="${C.hairline}" stroke-width="1.5"/></svg>`)
  return out
}

export const HEADS = {
  about: `<path d="M3 20 q5 -8 10 0 t10 0" fill="none" stroke="url(#tgh)" stroke-width="2.6" stroke-linecap="round"/><circle cx="25" cy="13" r="3.4" fill="${C.abyss}" stroke="${C.tide}" stroke-width="2.2"/>`,
  dive: `<circle cx="10" cy="21" r="5.5" fill="none" stroke="${C.tide}" stroke-width="2.2"/><circle cx="21" cy="12" r="4" fill="none" stroke="${C.tide}" stroke-width="2.2" style="animation:bob 2.6s ease-in-out infinite"/><circle cx="12" cy="6" r="2.4" fill="${C.tide}" style="animation:bob 3.2s ease-in-out -1s infinite"/>`,
  tools: `<rect x="3" y="5" width="24" height="20" rx="5" fill="none" stroke="${C.tide}" stroke-width="2.2"/><path d="M9 12 l4 3.5 l-4 3.5 M16 19 h6" fill="none" stroke="${C.signal}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  app: `<path d="M8 6 h14 l6 8 l-13 13 l-13 -13 Z M2 14 h26 M11 14 l4 13 l4 -13 M8 6 l3 8 l4 -8 l4 8 l3 -8" fill="none" stroke="${C.warn}" stroke-width="2" stroke-linejoin="round"/>`,
  faq: `<circle cx="15" cy="15" r="11.5" fill="none" stroke="${C.current}" stroke-width="2.2"/><path d="M11.5 12 q0 -4 3.7 -4 q3.6 0 3.6 3.4 q0 2.4 -3.4 3.6 v1.6" fill="none" stroke="${C.current}" stroke-width="2.2" stroke-linecap="round"/><circle cx="15.3" cy="20.6" r="1.5" fill="${C.current}"/>`,
  works: `<rect x="3" y="10" width="15" height="10" rx="5" fill="none" stroke="${C.tide}" stroke-width="2.2"/><rect x="12" y="10" width="15" height="10" rx="5" fill="none" stroke="${C.current}" stroke-width="2.2"/>`,
}
export function head(key) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30"><defs><linearGradient id="tgh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.tide}"/><stop offset="1" stop-color="${C.current}"/></linearGradient></defs><style>@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}@media (prefers-reduced-motion:reduce){*{animation:none!important}}</style>${HEADS[key]}</svg>\n`
}

// Banner for the top of a tool repo's own README.
export function banner(t, description) {
  const h = 300
  const name = t.name ?? t.repo
  const size = name.length > 26 ? 40 : name.length > 20 ? 48 : 56
  const lines = wrap(description, 600, { size: 19 }).slice(0, 4)
  const body = `${water(0, W, h, 'nw', '#0A2434', '#05060A')}${rays(W, 0, 220, name.length)}
${waves(-10, W, { amp: 6, period: 260, dur: 11, fill: '#0E3A50', strokeOpacity: 0.3, depth: 0 })}
${seabed(W, h - 36, 46, '#070B12', name.length + 3)}
${[40, 86, 1150].map((x, i) => kelp(x, h - 20, 44 + i * 14, '#0E3340', i + name.length)).join('')}
${T('CRAWL COVE OPEN SOURCE', { x: 64, y: 70, size: 13, font: 'mono', weight: 600, fill: C.tide, ls: 3 })}
${T(name, { x: 64, y: 70 + size + 8, size, font: 'display', weight: 700, fill: C.foam, ls: -1 })}
${lines.map((l, i) => T(l, { x: 64, y: 70 + size + 48 + i * 28, size: 19, fill: C.mist })).join('')}
<g transform="translate(748 78)"><rect x="-10" y="-10" width="412" height="146" rx="20" fill="${C.surface}" stroke="${C.hairline}" stroke-width="1.5"/><rect x="0" y="0" width="392" height="126" rx="14" fill="${C.abyss}" stroke="${C.hairline}"/><g transform="translate(4 2) scale(1.07)">${sceneFor(t.scene)}</g></g>
<g style="animation:bob 5s ease-in-out infinite"><g transform="translate(690 236) rotate(-8) scale(.8)">${probe({ lampLen: 120 })}</g></g>
${bubbles(640, 700, 240, 5, { h: 150, seed: name.length })}`
  return svg({ w: W, h, label: `${name}: ${description}`, body, css: SCENE_CSS })
}
