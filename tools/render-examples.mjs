// Render tools/examples.html tiles to static-examples/<tile>.jpg via headless Edge + CDP (fictional "YourBrand" product, no client data).
import fs from 'node:fs';
import { spawn } from 'node:child_process';
const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const port = 9353;
const p = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.LOCALAPPDATA}\\ecw-render-profile`, 'about:blank'], { stdio: 'ignore' });
let ver; for (let i = 0; i < 40 && !ver; i++) { await new Promise((r) => setTimeout(r, 500)); try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch {} }
const pg = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page');
const ws = new WebSocket(pg.webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const pend = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Emulation.setDeviceMetricsOverride', { width: 720, height: 720, deviceScaleFactor: 1, mobile: false });
fs.mkdirSync(`${root}static-examples`, { recursive: true });
for (const t of ['before', 'hero', 'info', 'dims', 'life']) {
  await send('Page.navigate', { url: `file:///${root}tools/examples.html?x=${t}#${t}` });
  await new Promise((r) => setTimeout(r, 1200));
  const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 86 });
  fs.writeFileSync(`${root}static-examples/${t}.jpg`, Buffer.from(s.result.data, 'base64'));
  console.log(t, 'ok');
}
const b = new WebSocket(ver.webSocketDebuggerUrl); await new Promise((r) => b.addEventListener('open', r));
b.send(JSON.stringify({ id: 1, method: 'Browser.close' })); await new Promise((r) => setTimeout(r, 1500));
try { p.kill(); } catch {} process.exit(0);
