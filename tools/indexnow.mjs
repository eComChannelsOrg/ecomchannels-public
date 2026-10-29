// Submit every sitemap URL to IndexNow (shared by Bing, Yandex, Seznam, Naver). Run after the push is live.
import fs from 'node:fs';
const key = fs.readFileSync(new URL('../.indexnow-key', import.meta.url), 'utf8').trim();
const host = 'ecomchannels.com';
const urlList = [...fs.readFileSync(new URL('../docs/sitemap.xml', import.meta.url), 'utf8').matchAll(/<loc>([^<]+)/g)].map((m) => m[1]);
for (const ep of ['https://api.indexnow.org/indexnow', 'https://www.bing.com/indexnow', 'https://yandex.com/indexnow']) {
  const r = await fetch(ep, { method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }) });
  console.log(ep, r.status, (await r.text()).slice(0, 200), `(${urlList.length} urls)`);
}
