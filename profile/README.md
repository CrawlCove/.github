<!--
  Crawl Cove (CrawlCove): a desktop SEO crawler with a free plan, and open-source tools for technical SEO.
  Website: https://crawlcove.com
  Download: https://crawlcove.com/download
-->

<details>
<summary><a name="hero"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/hero.svg" width="1200" height="520" alt="Crawl Cove: free, open-source tools for technical SEO, and the desktop crawler behind them. A small dive probe waits under the surface. Click to dive in." /></a></summary>
<br />

**Dive brief**

- **The crawler**: a desktop app that crawls your site and lists every issue, the pages it is on and the fix. The free plan covers 1 project and 1,000 URLs a crawl. No account, no card.
- **The kit**: 16 open-source tools for the jobs around a crawl. Redirects, sitemaps, robots.txt, hreflang, schema, CI checks.
- **The rule**: the crawler runs on your machine and your crawl data stays there.

<a href="https://crawlcove.com/download"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/btn-download.svg" width="197" height="52" alt="Download the Crawl Cove desktop app, free" /></a> <a href="#h-tools"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/btn-tools.svg" width="191" height="52" alt="Browse the open-source SEO tools" /></a>
</details>

<p align="center">
  <b>Crawl Cove</b> is a desktop <b>SEO crawler</b> with a free plan.<br />
  These are the open-source tools we wrote around it. Take what you need.
</p>

## <a name="h-dive"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/h-dive.svg" width="30" height="30" alt="" /></a> The dive

Every site looks calm from the surface. Then you send something down with a lamp.

<details>
<summary><a name="dive"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/dive.svg" width="1200" height="470" alt="A crawl shown as a dive. The probe descends through crawl depths one to four. Its lamp finds a 404 broken link, a redirect chain and a noindex page, then the report is ready. Click for what a crawl checks." /></a></summary>
<br />

<img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/log.svg" width="1200" height="366" alt="The dive log: a 404 linked from 3 pages, a redirect chain, a noindex page, a missing meta description and a page 4 clicks from the homepage. Report ready." />

**What the lamp picks out.** A crawl follows every internal link the way a search engine does, and logs what it meets on the way down:

- Broken links and the pages that link to them
- Redirect chains and loops
- Pages shut out of search by noindex or robots.txt
- Missing or duplicate titles, meta descriptions and H1s
- Canonical, hreflang and structured data mistakes
- Pages that sit too many clicks from the homepage

The desktop app does all of it in one crawl and turns the log into a fix list. The tools below each do one of those jobs from a terminal or a pipeline.

<a href="https://crawlcove.com/download"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/btn-download.svg" width="197" height="52" alt="Download the Crawl Cove desktop app, free" /></a>
</details>

## <a name="h-tools"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/h-tools.svg" width="30" height="30" alt="" /></a> Pick your kit

Fourteen small tools and one large one. Each card opens its repo.

<p><a href="https://crawlcove.com/download"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-desktop-app.svg" width="33%" align="top" alt="Crawl Cove desktop app: The full crawler. Every issue, the pages it is on and the fix." /></a><a href="https://github.com/CrawlCove/seo-crawler-cli"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-seo-crawler-cli.svg" width="33%" align="top" alt="seo-crawler-cli: Crawl a site from a script or CI and fail the build on SEO regressions." /></a><a href="https://github.com/CrawlCove/seo-audit-action"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-seo-audit-action.svg" width="33%" align="top" alt="seo-audit-action: Audit a preview URL on every pull request, with the details as a comment." /></a><a href="https://github.com/CrawlCove/seo-mcp-server"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-seo-mcp-server.svg" width="33%" align="top" alt="seo-mcp-server: Crawl data inside Claude, Cursor and other AI assistants." /></a><a href="https://github.com/CrawlCove/redirect-chain-checker"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-redirect-chain-checker.svg" width="33%" align="top" alt="redirect-chain-checker: Follow every hop and flag chains, loops and HTTPS downgrades." /></a><a href="https://github.com/CrawlCove/xml-sitemap-validator"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-xml-sitemap-validator.svg" width="33%" align="top" alt="xml-sitemap-validator: Check a sitemap against the protocol and search engine limits." /></a><a href="https://github.com/CrawlCove/robots-txt-tester"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-robots-txt-tester.svg" width="33%" align="top" alt="robots-txt-tester: See which URLs each crawler may fetch, and the line that decides it." /></a><a href="https://github.com/CrawlCove/hreflang-checker"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-hreflang-checker.svg" width="33%" align="top" alt="hreflang-checker: Validate self-reference, x-default and return tags." /></a><a href="https://github.com/CrawlCove/schema-markup-validator"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-schema-markup-validator.svg" width="33%" align="top" alt="schema-markup-validator: Check JSON-LD against the properties rich results need." /></a><a href="https://github.com/CrawlCove/seo-crawl-export-spec"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-seo-crawl-export-spec.svg" width="33%" align="top" alt="seo-crawl-export-spec: A JSON Schema and CSV reference for site crawl data." /></a><a href="https://github.com/CrawlCove/seo-crawl-export-js"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-seo-crawl-export-js.svg" width="33%" align="top" alt="seo-crawl-export-js: Load, query and convert crawl exports with typed pages and issues." /></a><a href="https://github.com/CrawlCove/screaming-frog-export-converter"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-screaming-frog-export-converter.svg" width="33%" align="top" alt="screaming-frog-export-converter: Turn an internal_all.csv into the open crawl export format." /></a><a href="https://github.com/CrawlCove/seo-audit-google-sheets"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-seo-audit-google-sheets.svg" width="33%" align="top" alt="seo-audit-google-sheets: Turn a crawl export into an audit workbook." /></a><a href="https://github.com/CrawlCove/wordpress-seo-connector"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-wordpress-seo-connector.svg" width="33%" align="top" alt="wordpress-seo-connector: Bulk-apply crawl fixes to your SEO plugin, with one-click revert." /></a><a href="https://github.com/CrawlCove/seo-chrome-extension"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-seo-chrome-extension.svg" width="33%" align="top" alt="seo-chrome-extension: On-page SEO checks and an AI visibility report in the browser." /></a><a href="https://github.com/CrawlCove/claude-seo-plugin"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-claude-seo-plugin.svg" width="33%" align="top" alt="claude-seo-plugin: Seven SEO skills for Claude, backed by a real crawl of your site." /></a><a href="https://github.com/CrawlCove/seo-test-site"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/tool-seo-test-site.svg" width="33%" align="top" alt="seo-test-site: A broken site with 54 planted problems. Point any crawler at it." /></a></p>

- **[seo-crawler-cli](https://github.com/CrawlCove/seo-crawler-cli)**: Crawl a site from a script or CI. Checks status codes, redirect chains, titles, meta descriptions, H1s, canonicals, noindex and broken links, and fails the build on regressions.
- **[seo-audit-action](https://github.com/CrawlCove/seo-audit-action)**: Crawl a staging or preview URL on every pull request. Fails the check on broken links, missing titles, noindex and redirect chains, with the details as a PR comment.
- **[seo-mcp-server](https://github.com/CrawlCove/seo-mcp-server)**: Crawl a site, list SEO issues, inspect pages and find broken links from inside Claude, Cursor and other AI assistants.
- **[redirect-chain-checker](https://github.com/CrawlCove/redirect-chain-checker)**: Follow every hop of a URL's redirects and flag chains, loops, HTTPS downgrades, meta refreshes and redirects to error pages.
- **[xml-sitemap-validator](https://github.com/CrawlCove/xml-sitemap-validator)**: Check a sitemap or sitemap index against the sitemaps.org protocol and search engine limits. Flags bad URLs, lastmod dates and cross-host entries.
- **[robots-txt-tester](https://github.com/CrawlCove/robots-txt-tester)**: Fetch and lint a robots.txt, test which URLs each crawler may fetch and see the deciding line. Fails deploys that block the site.
- **[hreflang-checker](https://github.com/CrawlCove/hreflang-checker)**: Validate the hreflang tags on a page or across a whole XML sitemap, including self-reference, x-default and return tags.
- **[schema-markup-validator](https://github.com/CrawlCove/schema-markup-validator)**: Check every schema.org node on a page against the required and recommended properties for rich results.
- **[seo-crawl-export-spec](https://github.com/CrawlCove/seo-crawl-export-spec)**: An open format for site crawl data: JSON Schema and CSV column reference, with a real sample export and a validator script.
- **[seo-crawl-export-js](https://github.com/CrawlCove/seo-crawl-export-js)**: Load, query and convert site crawl data in JavaScript and TypeScript, with typed pages, issues by type and status filters.
- **[screaming-frog-export-converter](https://github.com/CrawlCove/screaming-frog-export-converter)**: Turn an SEO Spider internal_all.csv into the open JSON crawl export format, with a report of which columns carried over.
- **[seo-audit-google-sheets](https://github.com/CrawlCove/seo-audit-google-sheets)**: An Apps Script add-on that turns a site crawl export into an audit workbook: pages, issues by type, pages by status and title and meta flags.
- **[wordpress-seo-connector](https://github.com/CrawlCove/wordpress-seo-connector)**: Bulk-apply fixes from the Crawl Cove desktop crawler to Yoast SEO, Rank Math, SEOPress or AIOSEO, with a change log and one-click revert.
- **[seo-chrome-extension](https://github.com/CrawlCove/seo-chrome-extension)**: On-page SEO checker with an AI visibility report: which AI crawlers can read the page, snippet blocks, llms.txt and extractability. Nothing leaves the browser.
- **[claude-seo-plugin](https://github.com/CrawlCove/claude-seo-plugin)**: Seven SEO skills for Claude Code backed by a real site crawl: audits, broken links, redirects, titles and fixes, from a chat.
- **[seo-test-site](https://github.com/CrawlCove/seo-test-site)**: A deliberately broken SEO test site with 54 planted problems and the expected findings, for testing any SEO crawler.

Most of them run with one line and nothing to install first:

```sh
npx github:CrawlCove/redirect-chain-checker https://example.com/old-page
```

## <a name="h-app"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/h-app.svg" width="30" height="30" alt="" /></a> On the seabed

Divers have a rule about glowing things on the seabed. Ignore it this once.

<details>
<summary><a name="chest"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/chest-bar.svg" width="1200" height="136" alt="Something is glowing on the seabed: the Crawl Cove desktop app, free plan included. Click to open the chest." /></a></summary>
<br />
<a href="https://crawlcove.com/download"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/treasure.svg" width="1200" height="400" alt="In the chest: the Crawl Cove desktop app, free plan included. 1 project, 1,000 URLs a crawl, Search Console connection, no account, no card and no expiry." /></a>

**The Crawl Cove desktop app.** It crawls a site, scores it, and gives you one row per fix with the pages it touches, most urgent first. The free plan is not a trial and does not expire:

- 1 project
- 1,000 URLs a crawl
- Every check and its fix
- The Google Search Console connection

Paid plans add more projects, uncapped crawls, exports, PDF reports and scheduled crawls. [See the plans](https://crawlcove.com/pricing).

<a href="https://crawlcove.com/download"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/app-overview.png" width="1200" alt="The Crawl Cove desktop app overview: health score, Search Console clicks and impressions, and the next fixes ranked by urgency" /></a>

<a href="https://crawlcove.com/download"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/btn-download.svg" width="197" height="52" alt="Download the Crawl Cove desktop app, free" /></a> <a href="https://crawlcove.com/pricing"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/btn-pricing.svg" width="164" height="52" alt="See the Crawl Cove plans" /></a>
</details>

## <a name="h-faq"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/h-faq.svg" width="30" height="30" alt="" /></a> FAQ

The lantern fish takes questions. It is brief, because it is a fish.

<details>
<summary><a name="faq"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/faq-bar.svg" width="1200" height="136" alt="Questions from the surface: six straight answers about Crawl Cove. Click to open." /></a></summary>
<br />

<details>
<summary><b>What is Crawl Cove?</b></summary>
<br />
A desktop SEO crawler. It crawls your website the way a search engine does, finds broken links, redirect chains, noindex pages, missing titles and more, and tells you which pages to fix and how. Website: <a href="https://crawlcove.com">crawlcove.com</a>.
</details>

<details>
<summary><b>Is the desktop app free?</b></summary>
<br />
There is a free plan with no account, no card and no expiry: 1 project and 1,000 URLs a crawl, with every check, its fix and the Search Console connection. Paid plans add more projects, uncapped crawls, exports, PDF reports and scheduled crawls. <a href="https://crawlcove.com/download">Download it here</a>.
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

## <a name="h-works"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/h-works.svg" width="30" height="30" alt="" /></a> Works with

<img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/stack.svg" width="1200" height="168" alt="Crawl Cove tools work with Google Search Console, WordPress, Yoast SEO, Rank Math, SEOPress, AIOSEO, GitHub Actions, MCP, Chrome, Google Sheets, Screaming Frog exports, JSON and CSV." />

<a href="https://crawlcove.com/download"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/surface.svg" width="1200" height="400" alt="Back at the surface. Star a tool you use, then crawl your own site for free with the Crawl Cove desktop app." /></a>

<p align="center">
<a href="https://crawlcove.com/download"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/btn-download.svg" width="197" height="52" alt="Download the Crawl Cove desktop app, free" /></a> <a href="https://crawlcove.com"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/btn-site.svg" width="175" height="52" alt="Visit crawlcove.com" /></a> <a href="https://crawlcove.com/pricing"><img src="https://raw.githubusercontent.com/CrawlCove/.github/main/profile/assets/btn-pricing.svg" width="164" height="52" alt="See the Crawl Cove plans" /></a>
</p>
