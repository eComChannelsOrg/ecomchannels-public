// Responsive audit of a site (live or local) at several widths via headless Edge + CDP.
// Usage: node tools/responsive-check.mjs [baseUrl=https://ecomchannels.com] [shotDir] [paths...]  (default: every sitemap page)
// Widths 320/390/768 (touch) and 1024/1440. Fails (exit 1) on horizontal overflow, text under 12px or a missing viewport tag.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const base = process.argv[2] || 'https://ecomchannels.com';
const shotDir = process.argv[3] && process.argv[3] !== '-' ? process.argv[3] : '';
let paths = process.argv.slice(4);
if (!paths.length) {
  const sm = await (await fetch(base + '/sitemap.xml')).text();
  paths = [...sm.matchAll(/<loc>([^<]+)/g)].map((m) => new URL(m[1]).pathname);
}
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const port = 9361;
spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.LOCALAPPDATA}\\ecw-resp-profile`, 'about:blank'], { stdio: 'ignore' });
let ver; for (let i = 0; i < 40 && !ver; i++) { await new Promise((r) => setTimeout(r, 500)); try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch {} }
const pg = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page');
const ws = new WebSocket(pg.webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const pend = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const probe = `(() => {
  const vw = innerWidth, out = { vw, sw: document.documentElement.scrollWidth };
  const vis = (e) => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return s.visibility !== 'hidden' && s.display !== 'none' && r.width > 0 && r.height > 0; };
  // overflow: elements whose right edge passes the viewport, not inside a horizontally scrollable container
  const scrollParent = (e) => { for (let p = e.parentElement; p; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o === 'auto' || o === 'scroll' || o === 'hidden') return true; } return false; };
  out.overflow = [...document.querySelectorAll('body *')].filter((e) => vis(e) && e.getBoundingClientRect().right > vw + 1 && !scrollParent(e)).slice(0, 6).map((e) => e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\\s+/).join('.') : '') + '@' + Math.round(e.getBoundingClientRect().right));
  // small text (< 12px) with real text
  out.smallText = [...new Set([...document.querySelectorAll('body *')].filter((e) => vis(e) && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2) && parseFloat(getComputedStyle(e).fontSize) < 12).map((e) => e.tagName.toLowerCase() + '.' + (typeof e.className === 'string' ? e.className.trim().split(/\\s+/)[0] : '') + ' ' + getComputedStyle(e).fontSize))].slice(0, 6);
  // tap targets < 40px high or wide (links/buttons/inputs) - mobile only meaningful
  out.smallTaps = [...new Set([...document.querySelectorAll('a,button,input,select,textarea,label')].filter((e) => { if (!vis(e)) return false; const r = e.getBoundingClientRect(); const inline = getComputedStyle(e).display === 'inline' && e.closest('p,li,td,dd'); return !inline && (r.height < 40 || r.width < 40); }).map((e) => e.tagName.toLowerCase() + '.' + (typeof e.className === 'string' ? e.className.trim().split(/\\s+/)[0] : '') + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)))].slice(0, 8);
  out.imgsNoResp = [...document.images].filter((i) => vis(i) && i.getBoundingClientRect().width > vw).length;
  out.viewportMeta = (document.querySelector('meta[name=viewport]') || {}).content || 'MISSING';
  out.headerH = Math.round((document.querySelector('header') || document.body).getBoundingClientRect().height);
  return out;
})()`;
const widths = [[320, 640, true], [390, 844, true], [768, 1024, true], [1024, 768, false], [1440, 900, false]];
const results = [];
for (const [w, h, mobile] of widths) {
  await send('Network.setCacheDisabled', { cacheDisabled: true }); await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile });
  await send('Emulation.setTouchEmulationEnabled', { enabled: mobile });
  for (const p of paths) {
    await send('Page.navigate', { url: base + p + (base.startsWith('https') ? `?r=${Date.now()}` : '') });
    await new Promise((r) => setTimeout(r, 1800));
    const r = await send('Runtime.evaluate', { returnByValue: true, expression: probe });
    const v = r.result.result.value; v.w = w; v.path = p; results.push(v);
    console.log(w, p, 'sw=' + v.sw, v.overflow.length ? 'OVERFLOW ' + v.overflow.join(' ') : '', v.smallText.length ? 'SMALLTXT ' + v.smallText.join(' | ') : '', mobile && v.smallTaps.length ? 'TAPS ' + v.smallTaps.join(' | ') : '', v.viewportMeta === 'MISSING' ? 'NO VIEWPORT' : '', 'hdr=' + v.headerH);
    if (shotDir && (p === '/' || p === paths[1]) ) {
      await send('Runtime.evaluate', { expression: 'document.querySelectorAll("img[loading=lazy]").forEach(i=>i.loading="eager")' });
      await new Promise((r) => setTimeout(r, 800));
      const m = await send('Page.getLayoutMetrics');
      const H = Math.min(Math.ceil(m.result.cssContentSize.height), 6000);
      const s = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: H, scale: 1 } });
      fs.writeFileSync(`${shotDir}/${w}${p.replace(/\//g, '_')}.png`, Buffer.from(s.result.data, 'base64'));
    }
  }
}
if (shotDir) fs.writeFileSync(shotDir + '/audit.json', JSON.stringify(results, null, 1));
const bad = results.filter((v) => v.overflow.length || v.sw > v.w || v.smallText.length || v.viewportMeta === 'MISSING');
console.log(bad.length ? `FAIL ${bad.length} of ${results.length} page/width checks` : `PASS ${results.length} page/width checks`);
const bws = new WebSocket(ver.webSocketDebuggerUrl); await new Promise((r) => bws.addEventListener('open', r));
bws.send(JSON.stringify({ id: 1, method: 'Browser.close' })); await new Promise((r) => setTimeout(r, 1500));
process.exit(bad.length ? 1 : 0);
