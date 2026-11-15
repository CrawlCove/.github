// Regenerates every SVG under profile/assets and banners/.
//   cd scripts && npm install && node build.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { card, TOOLS } from './cards.mjs'
import { hero, dive, chestBar, treasure, faqBar, stack, surface, button, head, HEADS, banner, log } from './panels.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const assets = path.join(root, 'profile', 'assets')
const banners = path.join(root, 'banners')
fs.mkdirSync(assets, { recursive: true })
fs.mkdirSync(banners, { recursive: true })

const out = {
  'hero.svg': hero(), 'dive.svg': dive(), 'chest-bar.svg': chestBar(), 'treasure.svg': treasure(),
  'faq-bar.svg': faqBar(), 'stack.svg': stack(), 'surface.svg': surface(), 'log.svg': log(),
  'btn-download.svg': button('Download free', { primary: true }),
  'btn-tools.svg': button('Browse the tools'), 'btn-site.svg': button('crawlcove.com'), 'btn-pricing.svg': button('See the plans'),
}
for (const k of Object.keys(HEADS)) out[`h-${k}.svg`] = head(k)

// Cards sit edge to edge in the README, so each one carries its own 8px gutter.
const pad = (s) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 416 268" width="416" height="268">${s.trim()}</svg>\n`
for (const t of TOOLS) out[`tool-${t.repo}.svg`] = pad(card(t))

let total = 0
for (const [name, s] of Object.entries(out)) { fs.writeFileSync(path.join(assets, name), s); total += s.length }

// Banner copy comes from descriptions.json (repo -> one sentence), kept beside this script.
const desc = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'descriptions.json'), 'utf8'))
for (const t of TOOLS.filter((x) => !x.app)) {
  const s = banner(t, desc[t.repo] ?? t.line)
  fs.writeFileSync(path.join(banners, `${t.repo}.svg`), s); total += s.length
}
console.log(`${Object.keys(out).length} profile assets, ${TOOLS.length - 1} banners, ${Math.round(total / 1024)} KB`)
