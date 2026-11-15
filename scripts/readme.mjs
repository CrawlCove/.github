// Writes profile/README.md. Run after build.mjs: node readme.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TOOLS } from './cards.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const A = 'https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets'
const DL = 'https://crawlcove.com/download'
const desc = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'descriptions.json'), 'utf8'))
const img = (f, w, h, alt) => `<img src="${A}/${f}" width="${w}" height="${h}" alt="${alt}" />`
const btn = (f, w, href, alt) => `<a href="${href}"><img src="${A}/${f}" width="${w}" height="52" alt="${alt}" /></a>`
const widths = Object.fromEntries(['btn-download', 'btn-tools', 'btn-site', 'btn-pricing'].map((b) => [b, fs.readFileSync(path.join(root, 'profile/assets', b + '.svg'), 'utf8').match(/width="(\d+)"/)[1]]))
const download = btn('btn-download.svg', widths['btn-download'], DL, 'Download the Crawl Cove desktop app, free')
const h = (key, title) => `## <a name="h-${key}"><img src="${A}/h-${key}.svg" width="30" height="30" alt="" /></a> ${title}`
const url = (t) => (t.app ? DL : `https://github.com/CrawlCove/${t.repo}`)
const order = [TOOLS.at(-1), ...TOOLS.slice(0, -1)]
const grid = order.map((t) => `<a href="${url(t)}"><img src="${A}/tool-${t.repo}.svg" width="33%" align="top" alt="${t.name ?? t.repo}: ${t.line}" /></a>`).join('')
const list = TOOLS.filter((t) => !t.app).map((t) => `- **[${t.repo}](${url(t)})**: ${desc[t.repo]}`).join('\n')

const md = `<!--
  Crawl Cove (CrawlCove): a desktop SEO crawler with a free plan, and open-source tools for technical SEO.
  Website: https://crawlcove.com
  Download: ${DL}
-->

<details>
<summary><a name="hero">${img('hero.svg', 1200, 520, 'Crawl Cove: free, open-source tools for technical SEO, and the desktop crawler behind them. A small dive probe waits under the surface. Click to dive in.')}</a></summary>
<br />

**Dive brief**

- **The crawler**: a desktop app that crawls your site and lists every issue, the pages it is on and the fix. The free plan covers 1 project and 1,000 URLs a crawl. No account, no card.
- **The kit**: ${TOOLS.length - 1} open-source tools for the jobs around a crawl. Redirects, sitemaps, robots.txt, hreflang, schema, CI checks.
- **The rule**: the crawler runs on your machine and your crawl data stays there.

${download} ${btn('btn-tools.svg', widths['btn-tools'], '#h-tools', 'Browse the open-source SEO tools')}
</details>

<p align="center">
  <b>Crawl Cove</b> is a desktop <b>SEO crawler</b> with a free plan.<br />
  These are the open-source tools we wrote around it. Take what you need.
</p>

${h('dive', 'The dive')}

Every site looks calm from the surface. Then you send something down with a lamp.

<details>
<summary><a name="dive">${img('dive.svg', 1200, 470, 'A crawl shown as a dive. The probe descends through crawl depths one to four. Its lamp finds a 404 broken link, a redirect chain and a noindex page, then the report is ready. Click for what a crawl checks.')}</a></summary>
<br />

${img('log.svg', 1200, 366, 'The dive log: a 404 linked from 3 pages, a redirect chain, a noindex page, a missing meta description and a page 4 clicks from the homepage. Report ready.')}

**What the lamp picks out.** A crawl follows every internal link the way a search engine does, and logs what it meets on the way down:

- Broken links and the pages that link to them
- Redirect chains and loops
- Pages shut out of search by noindex or robots.txt
- Missing or duplicate titles, meta descriptions and H1s
- Canonical, hreflang and structured data mistakes
- Pages that sit too many clicks from the homepage

The desktop app does all of it in one crawl and turns the log into a fix list. The tools below each do one of those jobs from a terminal or a pipeline.

${download}
</details>

${h('tools', 'Pick your kit')}

Fourteen small tools and one large one. Each card opens its repo.

<p>${grid}</p>

${list}

Most of them run with one line and nothing to install first:

\`\`\`sh
npx github:CrawlCove/redirect-chain-checker https://example.com/old-page
\`\`\`

${h('app', 'On the seabed')}

Divers have a rule about glowing things on the seabed. Ignore it this once.

<details>
<summary><a name="chest">${img('chest-bar.svg', 1200, 136, 'Something is glowing on the seabed: the Crawl Cove desktop app, free plan included. Click to open the chest.')}</a></summary>
<br />
<a href="${DL}">${img('treasure.svg', 1200, 400, 'In the chest: the Crawl Cove desktop app, free plan included. 1 project, 1,000 URLs a crawl, Search Console connection, no account, no card and no expiry.')}</a>

**The Crawl Cove desktop app.** It crawls a site, scores it, and gives you one row per fix with the pages it touches, most urgent first. The free plan is not a trial and does not expire:

- 1 project
- 1,000 URLs a crawl
- Every check and its fix
- The Google Search Console connection

Paid plans add more projects, uncapped crawls, exports, PDF reports and scheduled crawls. [See the plans](https://crawlcove.com/pricing).

<a href="${DL}"><img src="${A}/app-overview.png" width="1200" alt="The Crawl Cove desktop app overview: health score, Search Console clicks and impressions, and the next fixes ranked by urgency" /></a>

${download} ${btn('btn-pricing.svg', widths['btn-pricing'], 'https://crawlcove.com/pricing', 'See the Crawl Cove plans')}
</details>

${h('faq', 'FAQ')}

The lantern fish takes questions. It is brief, because it is a fish.

<details>
<summary><a name="faq">${img('faq-bar.svg', 1200, 136, 'Questions from the surface: six straight answers about Crawl Cove. Click to open.')}</a></summary>
<br />

<details>
<summary><b>What is Crawl Cove?</b></summary>
<br />
A desktop SEO crawler. It crawls your website the way a search engine does, finds broken links, redirect chains, noindex pages, missing titles and more, and tells you which pages to fix and how. Website: <a href="https://crawlcove.com">crawlcove.com</a>.
</details>

<details>
<summary><b>Is the desktop app free?</b></summary>
<br />
There is a free plan with no account, no card and no expiry: 1 project and 1,000 URLs a crawl, with every check, its fix and the Search Console connection. Paid plans add more projects, uncapped crawls, exports, PDF reports and scheduled crawls. <a href="${DL}">Download it here</a>.
</details>

<details>
<summary><b>Are the tools on this page open source?</b></summary>
<br />
Yes. They are MIT licensed, apart from the WordPress connector, which is GPL v2 like WordPress itself.
</details>

<details>
<summary><b>Do I need the desktop app to use them?</b></summary>
<br />
No. The checkers and the CLI run on their own with <code>npx</code> and Node. The WordPress connector is the exception: it applies fixes found by the desktop app.
</details>

<details>
<summary><b>Can I run SEO checks in CI?</b></summary>
<br />
Yes. <a href="https://github.com/CrawlCove/seo-audit-action">seo-audit-action</a> crawls a preview URL on every pull request and fails the check on broken links, missing titles, noindex and redirect chains. The CLIs exit non-zero on failure, so they fit any pipeline.
</details>

<details>
<summary><b>Where does my crawl data go?</b></summary>
<br />
Nowhere. The desktop crawler and the command-line tools run on your own machine, and the Chrome extension keeps everything in the browser.
</details>

</details>

${h('works', 'Works with')}

${img('stack.svg', 1200, 168, 'Crawl Cove tools work with Google Search Console, WordPress, Yoast SEO, Rank Math, SEOPress, AIOSEO, GitHub Actions, MCP, Chrome, Google Sheets, Screaming Frog exports, JSON and CSV.')}

<a href="${DL}">${img('surface.svg', 1200, 400, 'Back at the surface. Star a tool you use, then crawl your own site for free with the Crawl Cove desktop app.')}</a>

<p align="center">
${download} ${btn('btn-site.svg', widths['btn-site'], 'https://crawlcove.com', 'Visit crawlcove.com')} ${btn('btn-pricing.svg', widths['btn-pricing'], 'https://crawlcove.com/pricing', 'See the Crawl Cove plans')}
</p>
`
if (md.includes('—')) throw new Error('em dash in README')
fs.writeFileSync(path.join(root, 'profile', 'README.md'), md)
console.log('README', md.length, 'chars')
