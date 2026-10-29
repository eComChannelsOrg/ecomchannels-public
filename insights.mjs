// Insights articles (content/insights/*.md) and the research library (content/stats/*.json) for ecomchannels.com.
// No dependencies: a small front-matter reader and Markdown renderer cover the subset the articles use.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const anchor = (raw) => raw.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*|`|\*/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- categories (one per research cluster) ----------
export const categories = {
  A: { slug: 'ecommerce-trends', name: 'E-commerce trends', blurb: 'What is changing in Australian online retail, with the latest numbers.', icon: 'trend' },
  B: { slug: 'marketplaces', name: 'Marketplaces & multichannel', blurb: 'How Australian marketplaces work and how to grow across them.', icon: 'grid' },
  C: { slug: 'ai-listings', name: 'AI listings & marketplace SEO', blurb: 'Titles, attributes and content that get products found and bought.', icon: 'text' },
  D: { slug: 'ai-graphics', name: 'AI graphics & visual commerce', blurb: 'Product images, infographics and video that lift clicks and sales.', icon: 'image' },
  E: { slug: 'shipping', name: 'Shipping & delivery', blurb: 'Couriers, delivery expectations, tracking and returns in Australia.', icon: 'truck' },
  F: { slug: 'finance', name: 'Finance & reconciliation', blurb: 'Marketplace payouts, fees, cash flow and month-end close.', icon: 'coin' },
  G: { slug: 'social-commerce', name: 'Social commerce', blurb: 'Selling and getting discovered on social platforms.', icon: 'chat' },
  H: { slug: 'operations', name: 'Operations & overhead', blurb: 'Order management, stock accuracy and running leaner.', icon: 'gear' },
  I: { slug: 'ai-search', name: 'AI search & storefronts', blurb: 'GEO, AI shopping assistants, agentic commerce and fast stores.', icon: 'search' },
  J: { slug: 'ai-in-retail', name: 'AI in retail', blurb: 'Where AI pays off in retail, the evidence and the risks.', icon: 'spark' },
};
const icons = {
  trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  text: '<path d="M4 6h16M4 12h10M4 18h13"/><path d="M19 15l2 2-4 4h-2v-2z"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  truck: '<path d="M2 6h11v10H2zM13 10h4l4 4v2h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.2 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2M12 16v2"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/><path d="M11 8v6M8 11h6"/>',
  spark: '<path d="M12 2l2.2 6.3L20 10l-5.8 1.7L12 18l-2.2-6.3L4 10l5.8-1.7z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>',
};
export const icon = (k, size = 22) => `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[k] || icons.spark}</svg>`;

// ---------- front matter ----------
const unq = (v) => {
  v = v.trim();
  if (/^".*"$/.test(v)) return JSON.parse(v);
  if (/^'.*'$/.test(v)) return v.slice(1, -1).replace(/''/g, "'");
  if (/^\[.*\]$/.test(v)) return v.slice(1, -1).split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map((x) => unq(x)).filter((x) => x !== '');
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return v;
};
function parseFront(src, file) {
  const m = src.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`no front matter: ${file}`);
  const data = {}; let list = null, item = null;
  for (const line of m[1].split('\n')) {
    if (!line.trim()) continue;
    let r;
    if ((r = line.match(/^([a-z_]+):\s*(.*)$/))) { list = null; if (r[2] === '') { list = data[r[1]] = []; } else data[r[1]] = unq(r[2]); }
    else if ((r = line.match(/^\s+-\s+([a-z_]+):\s*(.*)$/)) && list) { item = { [r[1]]: unq(r[2]) }; list.push(item); }
    else if ((r = line.match(/^\s+([a-z_]+):\s*(.*)$/)) && item) item[r[1]] = unq(r[2]);
    else throw new Error(`front matter line not understood in ${file}: ${line}`);
  }
  return { data, body: m[2].trim() };
}

// ---------- markdown ----------
const BAD = /\b(soga|anyco|heyhey|timbo|wechat)\b/i;
function inline(s) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
  s = esc(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) => {
      const ext = /^https?:/.test(href);
      return `<a href="${href.replace(/&amp;/g, '&').replace(/"/g, '%22').replace(/&/g, '&amp;')}"${ext ? ' rel="noopener" target="_blank"' : ''}>${t}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[i])}</code>`);
}
export function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = []; let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = l.match(/^(#{2,4})\s+(.*)$/))) { const h = inline(m[2]); out.push(`<h${m[1].length} id="${anchor(m[2])}">${h}</h${m[1].length}>`); i++; continue; }
    if (/^\|/.test(l)) {
      const rows = []; while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = (r) => r.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map((c) => c.trim());
      const head = cells(rows[0]); const body = rows.slice(/^\|[\s:|-]+\|?\s*$/.test(rows[1] || '') ? 2 : 1);
      out.push(`<div class="table-wrap"><table><thead><tr>${head.map((c) => `<th scope="col">${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (/^[-*]\s+/.test(l) || /^\d+\.\s+/.test(l)) {
      const ordered = /^\d+\./.test(l); const items = [];
      while (i < lines.length && (ordered ? /^\d+\.\s+/ : /^[-*]\s+/).test(lines[i])) {
        let t = lines[i++].replace(/^([-*]|\d+\.)\s+/, '');
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+\.)\s/.test(lines[i])) t += ' ' + lines[i++].trim();
        items.push(`<li>${inline(t)}</li>`);
      }
      out.push(ordered ? `<ol>${items.join('')}</ol>` : `<ul>${items.join('')}</ul>`); continue;
    }
    if (/^>\s?/.test(l)) { const q = []; while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, '')); out.push(`<blockquote><p>${inline(q.join(' '))}</p></blockquote>`); continue; }
    const p = []; while (i < lines.length && lines[i].trim() && !/^(#{2,4}\s|\||[-*]\s|\d+\.\s|>)/.test(lines[i])) p.push(lines[i++].trim());
    out.push(`<p>${inline(p.join(' '))}</p>`);
  }
  return out.join('\n');
}

// ---------- load ----------
export function loadArticles(dir) {
  const list = readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const { data, body } = parseFront(readFileSync(join(dir, f), 'utf8'), f);
    for (const k of ['title', 'slug', 'description', 'cluster', 'products', 'sources', 'date']) if (!data[k]) throw new Error(`${f}: missing ${k}`);
    if (`${data.slug}.md` !== f) throw new Error(`${f}: slug mismatch`);
    if (BAD.test(body) || BAD.test(JSON.stringify(data))) throw new Error(`${f}: confidential or removed name found`);
    const faq = [];
    const fq = body.split(/^## FAQ\s*$/m)[1];
    if (fq) for (const b of fq.split(/^### /m).slice(1)) { const [q, ...a] = b.split('\n'); faq.push([q.trim(), a.join(' ').replace(/\s+/g, ' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*?|`/g, '').trim()]); }
    const words = body.replace(/\]\([^)]*\)/g, ']').split(/\s+/).length;
    return { ...data, cat: categories[data.cluster], body, faq, words, minutes: Math.max(3, Math.round(words / 220)) };
  });
  const order = Object.keys(categories);
  return list.sort((a, b) => order.indexOf(a.cluster) - order.indexOf(b.cluster) || a.slug.localeCompare(b.slug));
}

export function loadStats(dir) {
  const seen = new Map();
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
    for (const s of JSON.parse(readFileSync(join(dir, f), 'utf8'))) {
      const key = `${s.figure.replace(/\.\d+%|\s/g, '').toLowerCase()}|${s.url.replace(/[?#].*$/, '')}`;
      if (!seen.has(key)) seen.set(key, { ...s, id: `${f[0]}${seen.size}` });
    }
  }
  return [...seen.values()];
}

// ---------- render helpers ----------
export const stages = [
  ['visibility', 'Exposure & visibility', 'Be found in marketplace search, Google, AI assistants and social feeds.'],
  ['traffic', 'Traffic & clicks', 'Turn impressions into visits with better images, titles and content.'],
  ['conversion', 'Conversion', 'Turn visits into orders with complete information, delivery promises and speed.'],
  ['sales', 'Sales growth', 'Sell on more channels, stay in stock and grow order value.'],
  ['overhead', 'Lower overhead', 'Less manual work, fewer errors and fewer costly returns.'],
  ['delivery', 'Delivery experience', 'Fast, tracked delivery that brings shoppers back.'],
  ['trend', 'Market trends', 'Where Australian e-commerce is heading.'],
];
const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };
export const statCard = (s, cls = '') => `<figure class="evi ${cls}"><b>${esc(s.figure)}</b><figcaption><p>${esc(s.claim)}</p><cite><a href="${esc(s.url)}" rel="nofollow noopener" target="_blank">${esc(s.source)}${s.year ? `, ${s.year}` : ''}</a></cite></figcaption></figure>`;
export const articleCard = (a, h = 'h3') => `<article class="icard c-${a.cluster}"><a class="icard-cover" href="/insights/${a.slug}/" tabindex="-1" aria-hidden="true"><span class="icard-cat">${icon(a.cat.icon, 16)} ${esc(a.cat.name)}</span>${a.key_stat ? `<span class="icard-stat">${esc(a.key_stat)}</span>` : ''}</a><div class="icard-body"><${h}><a href="/insights/${a.slug}/">${esc(a.title)}</a></${h}><p>${esc(a.description)}</p><span class="meta">${a.minutes} min read · ${a.sources.length} sources</span></div></article>`;

export function buildInsights({ SITE, NAME, LASTMOD, products, statsDir, articlesDir }) {
  const articles = loadArticles(articlesDir);
  const stats = loadStats(statsDir);
  const prodName = Object.fromEntries(products.map((p) => [p.slug, p.short]));
  const byCluster = Object.keys(categories).map((k) => [k, articles.filter((a) => a.cluster === k)]);
  const statsFor = (slug, n = 4) => stats.filter((s) => s.product === slug).slice(0, n);
  const articlesFor = (slug, n = 6) => {
    const primary = articles.filter((a) => a.products[0] === slug);
    return [...primary, ...articles.filter((a) => !primary.includes(a) && a.products.includes(slug))].slice(0, n);
  };

  const hub = {
    path: '/insights/', title: 'E-commerce insights: trends, AI and growth | eComChannels',
    description: '100 research-backed guides on what is changing in Australian e-commerce: marketplaces, AI listings, graphics, shipping, finance, social and AI search.',
    h1: 'E-commerce insights', trail: [['Insights', '/insights/']], eyebrow: '100 research-backed guides',
    lead: 'What is changing in online retail, what the research says, and how to grow sales and cut overhead. Every figure links to the study it comes from.',
    ld: [{ '@type': 'CollectionPage', name: 'eComChannels Insights', url: `${SITE}/insights/`, hasPart: articles.map((a) => ({ '@type': 'Article', headline: a.title, url: `${SITE}/insights/${a.slug}/` })) }],
    body: `<section class="cat-nav-wrap"><div class="wrap"><nav class="cat-nav" aria-label="Insight categories">${byCluster.map(([k, l]) => `<a href="#${categories[k].slug}">${icon(categories[k].icon, 16)} ${esc(categories[k].name)} <small>${l.length}</small></a>`).join('')}</nav></div></section>
${byCluster.map(([k, l], i) => `<section id="${categories[k].slug}"${i % 2 ? ' class="alt"' : ''}><div class="wrap"><div class="sec-head"><span class="sec-ico c-${k}">${icon(categories[k].icon, 24)}</span><div><h2>${esc(categories[k].name)}</h2><p class="sub">${esc(categories[k].blurb)}</p></div></div><div class="igrid">${l.map((a) => articleCard(a)).join('')}</div></div></section>`).join('\n')}`,
  };

  const articlePages = articles.map((a) => {
    const related = articles.filter((o) => o !== a && o.cluster === a.cluster).slice(0, 3);
    const prods = a.products.filter((p) => prodName[p]);
    const bodyHtml = mdToHtml(a.body);
    const toc = [...a.body.matchAll(/^## (.+)$/gm)].map((m) => m[1]).filter((t) => t !== 'FAQ');
    const fullTitle = a.title.length <= 50 ? `${a.title} | ${NAME}` : a.title;
    return {
      path: `/insights/${a.slug}/`, title: fullTitle, description: a.description, h1: a.title, noCta: true, articleMeta: a,
      trail: [['Insights', '/insights/'], [a.cat.name, `/insights/#${a.cat.slug}`], [a.title, `/insights/${a.slug}/`]],
      eyebrow: `${a.cat.name}`,
      lead: `${esc(a.description)}<span class="art-meta"><span>${a.minutes} min read</span><span>${a.sources.length} cited sources</span><span>Updated <time datetime="${a.date}">${new Date(a.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</time></span></span>`,
      ld: [
        { '@type': 'Article', '@id': `${SITE}/insights/${a.slug}/#article`, headline: a.title, description: a.description, datePublished: a.date, dateModified: a.date, inLanguage: 'en-AU', articleSection: a.cat.name, keywords: (a.keywords || []).join(', '), wordCount: a.words, author: { '@id': `${SITE}/#organization` }, publisher: { '@id': `${SITE}/#organization` }, mainEntityOfPage: `${SITE}/insights/${a.slug}/`, image: `${SITE}/og.png`, citation: a.sources.map((s) => ({ '@type': 'CreativeWork', name: s.title, publisher: s.publisher, datePublished: String(s.year), url: s.url })), about: prods.map((p) => ({ '@id': `${SITE}/products/${p}/#software` })) },
        ...(a.faq.length ? [{ '@type': 'FAQPage', mainEntity: a.faq.map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ans } })) }] : []),
      ],
      md: `# ${a.title}\n\nURL: ${SITE}/insights/${a.slug}/\nCategory: ${a.cat.name}\nUpdated: ${a.date}\n\n> ${a.description}\n\n${a.body.replace(/\]\(\//g, `](${SITE}/`)}\n\n## Sources\n${a.sources.map((s) => `- ${s.title}, ${s.publisher} (${s.year}): ${s.url}`).join('\n')}\n`,
      skipFull: true,
      body: `<section class="article-sec"><div class="wrap art-grid">
<article class="prose" id="article">
${a.key_stat ? `<aside class="keystat"><span class="ks-label">${icon('spark', 16)} Key figure</span><strong>${esc(a.key_stat)}</strong>${a.key_stat_source ? `<a href="${esc(a.key_stat_source)}" rel="nofollow noopener" target="_blank">Source: ${esc(host(a.key_stat_source))}</a>` : ''}</aside>` : ''}
${bodyHtml}
<section class="sources" aria-labelledby="src-h"><h2 id="src-h">Sources</h2><ol>${a.sources.map((s) => `<li><a href="${esc(s.url)}" rel="nofollow noopener" target="_blank">${esc(s.title)}</a> <span>${esc(s.publisher)}, ${esc(s.year)}</span></li>`).join('')}</ol><p class="small-note">Figures are from the third-party studies listed and were checked against the source when this guide was written. They are not eComChannels customer results.</p></section>
</article>
<aside class="art-side">
<div class="side-card toc"><b>On this page</b><ol>${toc.map((t) => `<li><a href="#${anchor(t)}">${esc(t.replace(/\*\*|`/g, ''))}</a></li>`).join('')}</ol></div>
<div class="side-card prodbox"><b>${icon('spark', 16)} eComChannels can help</b><ul>${prods.map((p) => `<li><a href="/products/${p}/">${esc(prodName[p])}</a></li>`).join('')}</ul><a class="btn" href="/book-a-demo/">Book a demo</a><a class="btn ghost-dark" href="/book-a-demo/?type=trial">Start 30-day free trial</a></div>
</aside>
</div></section>
${related.length ? `<section class="alt"><div class="wrap"><h2>More on ${esc(a.cat.name.toLowerCase())}</h2><div class="igrid">${related.map((r) => articleCard(r)).join('')}</div><p class="note"><a href="/insights/">All 100 insights</a></p></div></section>` : ''}`,
    };
  });

  const byStage = stages.map(([k, n, d]) => [k, n, d, stats.filter((s) => s.topic === k)]).filter((x) => x[3].length);
  const research = {
    path: '/research/', title: 'Research: how AI lifts e-commerce sales | eComChannels',
    description: 'Independent studies on how AI listings, product images, fast delivery, multichannel selling and automation lift visibility, traffic, sales and cut costs.',
    h1: 'What the research says', trail: [['Research', '/research/']], eyebrow: `${stats.length} cited findings`,
    lead: 'Independent studies from Australia Post, Amazon, eBay, Adobe, McKinsey, Baymard, Salesforce and others on how better listings, images, delivery, multichannel selling and AI move visibility, traffic, sales and costs. Every figure links to its source.',
    ld: [{ '@type': 'Dataset', name: 'E-commerce growth and AI research findings', description: 'Curated, cited figures on how AI, product content, delivery and automation affect e-commerce visibility, traffic, conversion, sales and overhead.', url: `${SITE}/research/`, creator: { '@id': `${SITE}/#organization` }, license: 'https://creativecommons.org/licenses/by/4.0/', isAccessibleForFree: true, citation: [...new Set(stats.map((s) => s.url))].slice(0, 60) }],
    body: `<section class="funnel-sec"><div class="wrap">${funnel(stats)}</div></section>
<section class="cat-nav-wrap"><div class="wrap"><nav class="cat-nav" aria-label="Research topics">${byStage.map(([k, n, , l]) => `<a href="#${k}">${esc(n)} <small>${l.length}</small></a>`).join('')}</nav></div></section>
${byStage.map(([k, n, d, l], i) => `<section id="${k}"${i % 2 ? ' class="alt"' : ''}><div class="wrap"><h2>${esc(n)}</h2><p class="sub">${esc(d)}</p><div class="evi-grid">${l.map((s) => statCard(s)).join('')}</div></div></section>`).join('\n')}
<section><div class="wrap narrow"><h2>About these figures</h2><p>Each finding comes from a published third-party study, report or official seller guide, and links to it. Some come from overseas samples or earlier years, and the source says so. They describe the market and what better content, delivery and automation tend to achieve; they are not results promised by eComChannels. For the full context, read the <a href="/insights/">insights guides</a> that discuss each study.</p></div></section>`,
  };

  return { articles, stats, pages: [hub, ...articlePages, research], statsFor, articlesFor };
}

// Exposure -> traffic -> conversion -> sales, plus overhead, each with its strongest cited figure.
const PICK = { visibility: ['40%', '29%'], traffic: ['76%', '40%'], conversion: ['54%', '31%'], sales: ['2.3x', '20%'], overhead: ['12 million+', '13.8%'] };
const STAGE_PRODUCTS = {
  visibility: [['ai-listing-optimisation', 'AI listings'], ['storefronts', 'GEO-ready storefronts'], ['ai-social-media-marketing', 'AI social']],
  traffic: [['ai-graphics', 'AI graphics'], ['ai-social-media-marketing', 'AI social']],
  conversion: [['ai-listing-optimisation', 'AI listings'], ['ai-shipping', 'AI shipping']],
  sales: [['order-management', 'Multichannel OMS'], ['ai-graphics', 'AI graphics']],
  overhead: [['finance-reconciliation', 'Auto reconciliation'], ['ai-shipping', 'Auto shipping'], ['ai-listing-optimisation', 'Bulk AI listings']],
};
export function funnel(stats) {
  const find = (k, fig) => stats.find((s) => s.topic === k && s.figure === fig) || stats.find((s) => s.figure === fig);
  return `<div class="funnel">${['visibility', 'traffic', 'conversion', 'sales', 'overhead'].map((k, i) => {
    const st = stages.find((x) => x[0] === k);
    const s = PICK[k].map((f) => find(k, f)).filter(Boolean)[0];
    return `<div class="fstep f-${k}"><span class="fnum">${i + 1}</span><h3>${esc(st[1])}</h3>${s ? `<b>${esc(s.figure)}</b><p>${esc(s.claim)}</p><cite><a href="${esc(s.url)}" rel="nofollow noopener" target="_blank">${esc(s.source)}, ${s.year}</a></cite>` : ''}<div class="fprod">${STAGE_PRODUCTS[k].map(([p, n]) => `<a href="/products/${p}/">${esc(n)}</a>`).join('')}</div></div>`;
  }).join('')}</div>`;
}
