# CrawlCove/.github

The organisation profile for [Crawl Cove](https://crawlcove.com) on GitHub.

- `profile/README.md` is the page shown at [github.com/CrawlCove](https://github.com/CrawlCove).
- `profile/assets/` holds its artwork: animated SVG panels, tool cards and buttons.
- `banners/` holds one matching banner per tool repo, ready to sit at the top of that repo's README.
- `scripts/` generates all of it.

## Rebuilding the artwork

```sh
cd scripts
npm install
node build.mjs    # every SVG
node readme.mjs   # profile/README.md
```

GitHub shows an SVG through an image tag, which cannot load web fonts or run scripts. So the build
converts every piece of text to outlines and all motion is CSS inside each file. Motion stops for
anyone who has asked their system to reduce it.

Tool names, one-line summaries and card scenes live in `scripts/cards.mjs`. Banner copy lives in
`scripts/descriptions.json`.

The fonts in `scripts/fonts/` are Space Grotesk, Inter and JetBrains Mono, each under the SIL Open
Font License.
