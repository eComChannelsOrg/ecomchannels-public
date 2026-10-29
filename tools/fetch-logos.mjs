// Fetch square brand icons (apple-touch-icon / icon links) from official sites into static/logos/<name>.<ext>
import { writeFileSync } from 'node:fs';
const sites = {
  kogan: 'https://www.kogan.com/au/', bunnings: 'https://www.bunnings.com.au/', woolworths: 'https://www.woolworths.com.au/',
  bigw: 'https://www.bigw.com.au/', mirakl: 'https://www.mirakl.com/', marketplacer: 'https://marketplacer.com/',
  auspost: 'https://auspost.com.au/', couriersplease: 'https://www.couriersplease.com.au/', alliedexpress: 'https://www.alliedexpress.com.au/',
  startrack: 'https://startrack.com.au/',
};
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36', accept: 'text/html,*/*' };
const out = process.argv[2];
for (const [name, url] of Object.entries(sites)) {
  try {
    const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) });
    const html = await r.text();
    const links = [...html.matchAll(/<link[^>]+>/gi)].map((m) => m[0]).filter((l) => /rel=["'][^"']*(apple-touch-icon|icon)[^"']*["']/i.test(l));
    const cand = links.map((l) => ({ href: (l.match(/href=["']([^"']+)/i) || [])[1], size: +((l.match(/sizes=["'](\d+)/i) || [])[1] || (/apple/i.test(l) ? 180 : 16)), l }))
      .filter((c) => c.href).sort((a, b) => b.size - a.size);
    if (!cand.length) cand.push({ href: '/apple-touch-icon.png', size: 180 });
    let saved = false;
    for (const c of cand) {
      const u = new URL(c.href, r.url).href;
      const ir = await fetch(u, { headers: UA, signal: AbortSignal.timeout(20000) });
      const ct = ir.headers.get('content-type') || '';
      if (!ir.ok || /html/.test(ct)) continue;
      const ext = /svg/.test(ct) || u.endsWith('.svg') ? 'svg' : /png/.test(ct) || u.endsWith('.png') ? 'png' : /ico/.test(ct) || u.endsWith('.ico') ? 'ico' : 'img';
      const buf = Buffer.from(await ir.arrayBuffer());
      writeFileSync(`${out}/${name}.${ext}`, buf);
      console.log(name, r.status, c.size, ext, buf.length, u); saved = true; break;
    }
    if (!saved) console.log(name, r.status, 'NO ICON', cand.length);
  } catch (e) { console.log(name, 'ERR', e.message); }
}
