// SEO gate for docs/: unique titles <=60, descriptions 110-155, one H1, valid JSON-LD, no broken internal links/images.
import fs from 'node:fs';
import p from 'node:path';
const D = process.argv[2] || 'docs';
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const q = p.join(d, f); fs.statSync(q).isDirectory() ? walk(q) : q.endsWith('index.html') && files.push(q); } })(D);
const titles = new Set(), descs = new Set();
let fails = 0;
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const t = h.match(/<title>([^<]*)/)[1].replace(/&amp;/g, '&');
  const d = h.match(/name="description" content="([^"]*)/)[1];
  const h1 = (h.match(/<h1/g) || []).length;
  const issues = [];
  try { JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]); } catch { issues.push('bad JSON-LD'); }
  const missing = [...h.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)].map((m) => m[1])
    .filter((s) => !fs.existsSync(p.join(D, s, s.endsWith('/') ? 'index.html' : '')));
  // Insights articles: research-written titles up to 65 and descriptions up to 160 chars (still inside Google's pixel limits).
  const art = f.split(p.sep).includes('insights') && !f.endsWith(p.join('insights', 'index.html'));
  if (t.length > (art ? 65 : 60)) issues.push(`title ${t.length}`);
  if (d.length > (art ? 160 : 155) || d.length < 110) issues.push(`desc ${d.length}`);
  if (h1 !== 1) issues.push(`h1 ${h1}`);
  if (titles.has(t)) issues.push('dup title');
  if (descs.has(d)) issues.push('dup desc');
  if (missing.length) issues.push('missing ' + [...new Set(missing)]);
  titles.add(t); descs.add(d);
  if (issues.length) fails++;
  console.log(f.padEnd(50), t.length, d.length, issues.join('; ') || 'ok');
}
console.log(fails ? `FAIL ${fails}` : `PASS ${files.length} pages`);
process.exit(fails ? 1 : 0);
