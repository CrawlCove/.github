// One card per tool. Each has its own small looping scene drawn in a 360x112 box.
import { C, T, n, svg, check, cross, measure, wrap } from './lib.mjs'

const m = (text, x, y, fill = C.mist, size = 13, weight = 500) => T(text, { x, y, size, font: 'mono', weight, fill })
const st = (k, dur = 9) => `style="animation:s${k} ${dur}s linear infinite"`
const g = (k, body, dur) => `<g ${st(k, dur)}>${body}</g>`
const arrow = (x1, y, x2, color = C.fog) => `<path d="M${x1} ${y} H${x2} m-6 -5 l6 5 l-6 5" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`
const box = (x, y, w, h, { fill = C.surface2, stroke = C.hairline, r = 8 } = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`
function tag(text, x, y, color = C.mist, stroke = C.hairline) {
  const w = measure(text, { size: 12, font: 'mono', weight: 600 }) + 20
  return { w, s: box(x, y, n(w), 26, { r: 13, stroke }) + T(text, { x: x + 10, y: y + 17.5, size: 12, font: 'mono', weight: 600, fill: color }) }
}

// Steps s0..s7 appear one after another and all clear together at the end of the loop.
let seqCss = '@keyframes cur{0%,49%{opacity:1}50%,100%{opacity:0}}@keyframes hop{0%,8%{transform:translateX(0)}40%,48%{transform:translateX(var(--a))}80%,92%{transform:translateX(var(--b))}100%{transform:translateX(0)}}@keyframes ping{0%,100%{transform:translateX(0)}50%{transform:translateX(var(--a))}}@keyframes turn{to{transform:rotate(360deg)}}@keyframes grow{0%,10%{transform:scaleY(.15)}45%,90%{transform:scaleY(1)}100%{transform:scaleY(.15)}}@keyframes fillx{0%,8%{transform:scaleX(0)}70%,92%{transform:scaleX(1)}100%{transform:scaleX(0)}}@keyframes gone{0%,44%{opacity:1}50%,96%{opacity:0}100%{opacity:1}}'
for (let k = 0; k < 8; k++) {
  const a = 6 + k * 10
  seqCss += `@keyframes s${k}{0%,${a}%{opacity:0}${a + 4}%,93%{opacity:1}100%{opacity:0}}`
}

const scenes = {
  cli: () => T('$', { x: 18, y: 30, size: 13, font: 'mono', weight: 700, fill: C.tide }) + m('crawlcove crawl example.com', 34, 30, C.foam)
    + g(1, m('crawled 1,000 URLs', 18, 52, C.fog))
    + g(2, cross(24, 70, 0.8) + m('12 broken links', 36, 74, C.alert))
    + g(3, `<path d="M24 86 l6 11 h-12 Z" fill="none" stroke="${C.warn}" stroke-width="1.8" stroke-linejoin="round"/>` + m('3 redirect chains', 36, 96, C.warn))
    + `<rect x="252" y="19" width="8" height="15" fill="${C.tide}" style="animation:cur 1s steps(1) infinite"/>`,
  action: () => m('pull request checks', 18, 28, C.fog, 12)
    + `<circle cx="28" cy="52" r="9" fill="none" stroke="${C.signal}" stroke-width="1.6"/>` + check(28, 52, 0.8) + m('build', 48, 57, C.foam)
    + `<g style="animation:gone 9s linear infinite"><circle class="fb" cx="28" cy="84" r="9" fill="none" stroke="${C.warn}" stroke-width="2" stroke-dasharray="30 60" style="animation:turn 1s linear infinite"/></g>`
    + g(4, `<circle cx="28" cy="84" r="9" fill="${C.surface2}" stroke="${C.signal}" stroke-width="1.6"/>` + check(28, 84, 0.8))
    + m('SEO audit', 48, 89, C.foam) + g(4, m('0 broken links', 232, 89, C.signal, 12)),
  mcp: () => box(18, 30, 124, 40) + m('AI assistant', 34, 55, C.foam, 12) + box(218, 30, 124, 40, { stroke: C.tide }) + m('crawl data', 240, 55, C.tide, 12)
    + `<line x1="142" y1="50" x2="218" y2="50" stroke="${C.hairline}" stroke-width="2" stroke-dasharray="4 5"/>`
    + `<circle cx="148" cy="50" r="4.5" fill="${C.current}" style="--a:64px;animation:ping 2.6s ease-in-out infinite"/>`
    + g(2, m('find_broken_links()', 18, 96, C.fog, 12)) + g(4, check(326, 92, 0.9)),
  redirect: () => {
    const a = tag('301', 22, 30, C.warn), b = tag('302', 132, 30, C.warn), c = tag('200', 242, 30, C.signal, C.signal)
    return a.s + arrow(76, 43, 124) + b.s + arrow(186, 43, 234) + c.s
      + `<circle cx="44" cy="68" r="4.5" fill="${C.tide}" style="--a:110px;--b:220px;animation:hop 5s ease-in-out infinite"/>`
      + g(3, m('2 hops before the page', 22, 98, C.warn, 12))
  },
  sitemap: () => m('sitemap.xml', 18, 28, C.foam) + `<path d="M24 36 V92 M24 50 H38 M24 71 H38 M24 92 H38" fill="none" stroke="${C.hairline}" stroke-width="1.6"/>`
    + m('/blog/', 46, 54) + g(1, check(330, 50, 0.9)) + m('/old-page/', 46, 75) + g(2, cross(330, 71, 0.8) + m('404', 284, 75, C.alert, 12))
    + m('/shop/', 46, 96) + g(3, check(330, 92, 0.9)),
  robots: () => m('User-agent: *', 18, 30, C.fog) + m('Disallow: /cart', 18, 52, C.foam)
    + g(2, box(18, 70, 150, 28, { r: 14, stroke: C.signal }) + check(36, 84, 0.8) + m('/pricing', 52, 89, C.signal, 12))
    + g(4, box(190, 70, 150, 28, { r: 14, stroke: C.alert }) + cross(208, 84, 0.7) + m('/cart', 224, 89, C.alert, 12)),
  hreflang: () => {
    const a = tag('en-gb', 22, 26, C.foam), b = tag('de', 146, 26, C.foam), c = tag('fr', 250, 26, C.foam)
    const two = (x1, x2) => `<path d="M${x1} 39 H${x2} m-5 -4 l5 4 l-5 4 M${x1} 39 l5 -4 m-5 4 l5 4" fill="none" stroke="${C.tide}" stroke-width="1.6" stroke-linecap="round"/>`
    return a.s + g(1, two(22 + a.w + 8, 138)) + b.s + g(2, two(146 + b.w + 8, 242)) + c.s
      + g(3, check(26, 74, 0.8) + m('return tags', 40, 78, C.mist, 12)) + g(4, check(26, 96, 0.8) + m('x-default', 40, 100, C.mist, 12))
  },
  schema: () => m('{ "@type": "Product",', 18, 28, C.foam) + m('"name"', 36, 50, C.tide) + g(1, check(330, 46, 0.9))
    + m('"offers"', 36, 72, C.tide) + g(2, check(330, 68, 0.9)) + m('"review"', 36, 94, C.tide) + g(3, m('recommended', 232, 94, C.warn, 12)),
  spec: () => `<path d="M22 16 h44 l14 14 v66 h-58 Z M66 16 v14 h14" fill="${C.surface2}" stroke="${C.tide}" stroke-width="1.6" stroke-linejoin="round"/>` + m('{ }', 36, 66, C.tide, 15, 700)
    + g(1, m('"url"', 104, 36, C.foam) + m('string', 262, 36, C.fog, 12)) + g(2, m('"status"', 104, 60, C.foam) + m('integer', 262, 60, C.fog, 12))
    + g(3, m('"title"', 104, 84, C.foam) + m('string', 262, 84, C.fog, 12)),
  js: () => m('import { readExport }', 18, 30, C.foam) + m("from 'crawlcove-export'", 34, 52, C.signal) + g(2, m('crawl.issues()', 18, 80, C.tide))
    + g(4, m('// 15 issues, typed', 18, 100, C.fog, 12)),
  sf: () => {
    const a = tag('internal_all.csv', 18, 22, C.mist), b = tag('crawl.json', 232, 22, C.tide, C.tide)
    return a.s + arrow(18 + a.w + 10, 35, 224, C.tide) + b.s + `<rect x="18" y="64" width="324" height="8" rx="4" fill="${C.surface2}"/><rect x="18" y="64" width="324" height="8" rx="4" fill="url(#tgh)" style="transform-origin:18px 68px;animation:fillx 9s ease-in-out infinite"/>`
      + g(6, check(24, 92, 0.8) + m('columns carried over', 38, 96, C.mist, 12))
  },
  sheets: () => {
    let s = `<rect x="18" y="14" width="324" height="84" rx="6" fill="${C.surface2}" stroke="${C.hairline}"/><rect x="18" y="14" width="324" height="21" rx="6" fill="${C.signal}" fill-opacity=".14"/>`
    for (let i = 1; i < 4; i++) s += `<line x1="18" x2="342" y1="${14 + i * 21}" y2="${14 + i * 21}" stroke="${C.hairline}"/>`
    for (const x of [126, 234]) s += `<line x1="${x}" x2="${x}" y1="14" y2="98" stroke="${C.hairline}"/>`
    s += m('page', 28, 29, C.signal, 11) + m('issue', 136, 29, C.signal, 11) + m('status', 244, 29, C.signal, 11)
    const rows = [[70, 84, C.signal], [56, 62, C.alert], [78, 70, C.signal]]
    rows.forEach(([a, b, c], i) => { s += g(i + 1, `<rect x="28" y="${42 + i * 21}" width="${a}" height="7" rx="3.5" fill="${C.fog}"/><rect x="136" y="${42 + i * 21}" width="${b}" height="7" rx="3.5" fill="${C.fog}"/><rect x="244" y="${42 + i * 21}" width="34" height="7" rx="3.5" fill="${c}"/>`) })
    return s
  },
  wp: () => ['meta description', 'image alt text', 'canonical'].map((t, i) => `<circle cx="28" cy="${27 + i * 30}" r="9" fill="none" stroke="${C.hairline}" stroke-width="1.6"/>` + g(i + 1, `<circle cx="28" cy="${27 + i * 30}" r="9" fill="${C.surface2}" stroke="${C.signal}" stroke-width="1.6"/>` + check(28, 27 + i * 30, 0.8)) + m(t, 48, 32 + i * 30, C.foam)).join('')
    + g(5, `<path d="M300 22 a12 12 0 1 1 -10 6 m-3 -7 l3 7 l7 -2" fill="none" stroke="${C.fog}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` + m('revert', 280, 64, C.fog, 11)),
  chrome: () => box(18, 12, 324, 88, { r: 10 }) + `<circle cx="32" cy="24" r="3" fill="${C.alert}"/><circle cx="43" cy="24" r="3" fill="${C.warn}"/><circle cx="54" cy="24" r="3" fill="${C.signal}"/><rect x="68" y="18" width="150" height="12" rx="6" fill="${C.abyss}"/><line x1="18" x2="342" y1="36" y2="36" stroke="${C.hairline}"/><line x1="226" x2="226" y1="36" y2="100" stroke="${C.hairline}"/>`
    + `<rect x="30" y="48" width="120" height="8" rx="4" fill="${C.hairline}"/><rect x="30" y="64" width="170" height="6" rx="3" fill="${C.hairline}"/><rect x="30" y="78" width="140" height="6" rx="3" fill="${C.hairline}"/>`
    + g(1, check(240, 52, 0.7) + m('title', 252, 56, C.mist, 11)) + g(2, check(240, 70, 0.7) + m('schema', 252, 74, C.mist, 11)) + g(3, cross(240, 88, 0.6, C.warn) + m('llms.txt', 252, 92, C.warn, 11)),
  testsite: () => m('crawlcove.github.io/seo-test-site', 18, 28, C.fog, 12)
    + m('duplicate title', 18, 54, C.foam) + g(1, cross(330, 50, 0.8))
    + m('canonical to a 404', 18, 75, C.foam) + g(2, cross(330, 71, 0.8))
    + m('54 planted problems', 18, 96, C.tide) + g(3, check(330, 92, 0.9)),
  claude: () => T('>', { x: 18, y: 30, size: 13, font: 'mono', weight: 700, fill: C.tide }) + m('/plugin install crawlcove-seo', 34, 30, C.foam)
    + g(1, m('audit example.com', 18, 60, C.fog)) + g(2, m('broken links, with the page to fix', 18, 84, C.signal)),
  app: () => box(18, 12, 324, 88, { r: 10 }) + `<rect x="18" y="12" width="52" height="88" rx="10" fill="${C.abyss}" stroke="${C.hairline}"/><rect x="30" y="24" width="28" height="28" rx="8" fill="url(#tg)"/>`
    + [0, 1, 2].map((i) => `<rect x="30" y="${62 + i * 11}" width="28" height="5" rx="2.5" fill="${C.hairline}"/>`).join('')
    + [34, 52, 28, 62, 44, 70].map((h, i) => `<rect class="fbb" x="${88 + i * 22}" y="${90 - h}" width="13" height="${h}" rx="3" fill="url(#tg)" opacity="${0.55 + i * 0.09}" style="animation:grow 9s ease-in-out ${n(i * 0.25)}s infinite"/>`).join('')
    + g(3, box(232, 24, 98, 26, { r: 13, stroke: C.alert }) + m('12 issues', 246, 41, C.alert, 12)) + g(5, box(232, 60, 98, 26, { r: 13, stroke: C.signal }) + m('fix list', 249, 77, C.signal, 12)),
}

export const TOOLS = [
  { repo: 'seo-crawler-cli', kind: 'CLI', scene: 'cli', line: 'Crawl a site from a script or CI and fail the build on SEO regressions.' },
  { repo: 'seo-audit-action', kind: 'GITHUB ACTION', scene: 'action', line: 'Audit a preview URL on every pull request, with the details as a comment.' },
  { repo: 'seo-mcp-server', kind: 'MCP SERVER', scene: 'mcp', line: 'Crawl data inside Claude, Cursor and other AI assistants.' },
  { repo: 'redirect-chain-checker', kind: 'CLI', scene: 'redirect', line: 'Follow every hop and flag chains, loops and HTTPS downgrades.' },
  { repo: 'xml-sitemap-validator', kind: 'CLI', scene: 'sitemap', line: 'Check a sitemap against the protocol and search engine limits.' },
  { repo: 'robots-txt-tester', kind: 'CLI', scene: 'robots', line: 'See which URLs each crawler may fetch, and the line that decides it.' },
  { repo: 'hreflang-checker', kind: 'CLI', scene: 'hreflang', line: 'Validate self-reference, x-default and return tags.' },
  { repo: 'schema-markup-validator', kind: 'CLI', scene: 'schema', line: 'Check JSON-LD against the properties rich results need.' },
  { repo: 'seo-crawl-export-spec', kind: 'OPEN FORMAT', scene: 'spec', line: 'A JSON Schema and CSV reference for site crawl data.' },
  { repo: 'seo-crawl-export-js', kind: 'LIBRARY', scene: 'js', line: 'Load, query and convert crawl exports with typed pages and issues.' },
  { repo: 'screaming-frog-export-converter', kind: 'CLI', scene: 'sf', line: 'Turn an internal_all.csv into the open crawl export format.' },
  { repo: 'seo-audit-google-sheets', kind: 'SHEETS ADD-ON', scene: 'sheets', line: 'Turn a crawl export into an audit workbook.' },
  { repo: 'wordpress-seo-connector', kind: 'WORDPRESS PLUGIN', scene: 'wp', line: 'Bulk-apply crawl fixes to your SEO plugin, with one-click revert.' },
  { repo: 'seo-chrome-extension', kind: 'CHROME EXTENSION', scene: 'chrome', line: 'On-page SEO checks and an AI visibility report in the browser.' },
  { repo: 'claude-seo-plugin', kind: 'CLAUDE CODE PLUGIN', scene: 'claude', line: 'Seven SEO skills for Claude, backed by a real crawl of your site.' },
  { repo: 'seo-test-site', kind: 'TEST SITE', scene: 'testsite', line: 'A broken site with 54 planted problems. Point any crawler at it.' },
  { repo: 'desktop-app', name: 'Crawl Cove desktop app', kind: 'FREE PLAN', scene: 'app', line: 'The full crawler. Every issue, the pages it is on and the fix.', app: true },
]

export function sceneFor(key) { return scenes[key]() }
export const SCENE_CSS = seqCss

export function card(t) {
  const name = t.name ?? t.repo
  const size = name.length > 26 ? 16 : 18
  const lines = wrap(t.line, 350, { size: 15.5 })
  const body = `<rect width="400" height="252" fill="${C.surface}"/>
${t.app ? `<circle cx="340" cy="20" r="150" fill="url(#glowV)" opacity=".5"/>` : ''}
${T(t.kind, { x: 24, y: 32, size: 11.5, font: 'mono', weight: 600, fill: t.app ? C.tide : C.fog, ls: 1 })}
<rect x="20" y="46" width="360" height="112" rx="14" fill="${C.abyss}" stroke="${C.hairline}" stroke-width="1.2"/>
<g transform="translate(20 46)">${scenes[t.scene]()}</g>
${T(name, { x: 24, y: 190, size, font: t.app ? 'display' : 'mono', weight: t.app ? 700 : 600, fill: C.foam })}
${lines.map((l, i) => T(l, { x: 24, y: 214 + i * 21, size: 15.5, fill: C.mist })).join('')}`
  let out = svg({ w: 400, h: 252, label: `${name}: ${t.line}`, body, css: seqCss, radius: 20 })
  if (t.app) out = out.replace(`stroke="${C.hairline}" stroke-width="1.5"/></svg>`, `stroke="url(#tg)" stroke-width="2"/></svg>`)
  return out
}
