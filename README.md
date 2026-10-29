# ecomchannels.com

Public marketing website for eComChannels. Static HTML, no runtime dependencies.

- `build.mjs`: all page content, products, channels and FAQ. `node build.mjs` writes `docs/`.
- `tools/check.mjs`: SEO gate (title ≤60, description 110–155, one H1, valid JSON-LD, no broken internal links). Run it before every push.
- `static/`: CSS, favicon, `logo.png`, `og.png` (rendered from `tools/og.html`).
- `logos-src/`: channel/courier/social logos. Simple Icons (CC0) are recoloured at build. The rest are the brands' own site icons. Logos are used only to show compatibility.
- Hosting: GitHub Pages serves `main:/docs` at https://ecomchannels.com (`docs/CNAME`). DNS is in Cloudflare (zone ecomchannels.com). The apex A records and the `www` CNAME point at GitHub Pages and are **DNS only (not proxied)**, so GitHub can issue the TLS certificate.

GEO/SEO: every page has a canonical, OG/Twitter tags and a schema.org `@graph` (Organization, WebSite, WebPage, BreadcrumbList, SoftwareApplication, FAQPage, ItemList). There is also `/sitemap.xml`, `/robots.txt` and `/llms.txt`.

Publish: `node build.mjs && node tools/check.mjs && git add -A && git commit && git push`. Pages deploys within about a minute.

IndexNow (Bing, Yandex, Seznam, Naver): the key file is static/<key>.txt (key in .indexnow-key). After publishing, run node tools/indexnow.mjs.

Visuals: `visuals.mjs` holds the hub diagram, before/after comparisons and card visuals. Screenshots: `node tools/shot.mjs <outDir> / /channels/` (local server + headless Edge).
GEO/agents: every page has an `index.md` twin, plus `/llms.txt`, `/llms-full.txt` and `/agents.md`. `robots.txt` explicitly allows search and AI crawlers (OpenAI, Anthropic, Perplexity, Google, Meta/Muse, xAI Grok, Apple and others).
Channel ranking: `marketplaceData` in build.mjs (revenue, period and source URL for each operator). Update it after each results season.
