// Full-page screenshots of docs/ via a local static server + headless Edge (CDP). Usage: node tools/shot.mjs <outDir> [paths...]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
const DOCS = new URL('../docs/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const out = process.argv[2];
const paths = process.argv.slice(3).length ? process.argv.slice(3) : ['/'];
const types = { '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.html': 'text/html' };
const srv = http.createServer((q, r) => {
  let f = path.join(DOCS, decodeURIComponent(q.url.split('?')[0]));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { r.statusCode = 404; f = path.join(DOCS, '404.html'); }
  r.setHeader('content-type', types[path.extname(f)] || 'text/plain'); r.end(fs.readFileSync(f));
}).listen(5612);
const port = 9352;
const p = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.LOCALAPPDATA}\\ecw-shot-profile`, 'about:blank'], { stdio: 'ignore' });
let ver; for (let i = 0; i < 40 && !ver; i++) { await new Promise((r) => setTimeout(r, 500)); try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch {} }
const pg = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page');
const ws = new WebSocket(pg.webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const pend = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
for (const [w, tag, mobile] of [[1366, 'desktop', false], [390, 'mobile', true]]) {
  for (const pth of paths) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile });
    await send('Page.navigate', { url: `http://127.0.0.1:5612${pth}` });
    await new Promise((r) => setTimeout(r, 1500));
    await send('Runtime.evaluate', { expression: 'document.querySelectorAll("img[loading=lazy]").forEach(i=>i.loading="eager")' });
    await new Promise((r) => setTimeout(r, 1200));
    const h = (await send('Runtime.evaluate', { returnByValue: true, expression: 'Math.min(document.documentElement.scrollHeight, 9000)' })).result.result.value;
    const sw = (await send('Runtime.evaluate', { returnByValue: true, expression: 'document.documentElement.scrollWidth' })).result.result.value;
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile });
    await new Promise((r) => setTimeout(r, 600));
    const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70 });
    const name = `${tag}${pth.replace(/\//g, '_') || '_'}.jpg`;
    fs.writeFileSync(path.join(out, name), Buffer.from(s.result.data, 'base64'));
    console.log(name, `h=${h}`, `scrollWidth=${sw}/${w}`);
  }
}
const b = new WebSocket(ver.webSocketDebuggerUrl); await new Promise((r) => b.addEventListener('open', r));
b.send(JSON.stringify({ id: 1, method: 'Browser.close' })); await new Promise((r) => setTimeout(r, 1500));
try { p.kill(); } catch {} srv.close(); process.exit(0);
