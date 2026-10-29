// Mobile overflow check of the live site via headless Edge + CDP; closes the browser cleanly.
import { spawn } from 'node:child_process';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const port = 9351;
const prof = process.env.LOCALAPPDATA + '\\ecw-cdp-profile';
const p = spawn(EDGE, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, 'about:blank'], { stdio: 'ignore' });
let ver;
for (let i = 0; i < 40 && !ver; i++) { await new Promise((r) => setTimeout(r, 500)); try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch {} }
const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const pending = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
for (const path of ['/', '/products/', '/channels/', '/products/ai-shipping/', '/products/ai-social-media-marketing/', '/faq/', '/contact/', '/book-a-demo/']) {
  await send('Page.navigate', { url: `https://ecomchannels.com${path}?m=${Date.now()}` });
  await new Promise((r) => setTimeout(r, 2500));
  const r = await send('Runtime.evaluate', { returnByValue: true, expression: `({vw: innerWidth, sw: document.documentElement.scrollWidth, wide: [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).slice(0,4).map(e => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().right))})` });
  console.log(path, JSON.stringify(r.result.result.value));
  if (path === '/') { const s = await send('Page.captureScreenshot', { format: 'png' }); (await import('node:fs')).writeFileSync('C:/Users/norep/dev/ecomchannels-website/tools/mlive.png', Buffer.from(s.result.data, 'base64')); }
}
await send("Page.navigate",{url:"https://ecomchannels.com/book-a-demo/?type=trial"});await new Promise(r=>setTimeout(r,2500));
const ft=await send("Runtime.evaluate",{returnByValue:true,awaitPromise:true,expression:`(async()=>{const f=document.getElementById("demo");const pre=f.querySelector("input[value=trial]").checked;f.name.value="Test";f.email.value="t@example.com";f.company.value="TestCo";f.querySelector("input[name=products]").checked=true;f.requestSubmit();await new Promise(r=>setTimeout(r,800));return {trialPreselected:pre,status:document.getElementById("demo-status").textContent.slice(0,60)}})()`});
console.log("form",JSON.stringify(ft.result.result.value));
const bws = new WebSocket(ver.webSocketDebuggerUrl);
await new Promise((r) => bws.addEventListener('open', r));
bws.send(JSON.stringify({ id: 1, method: 'Browser.close' }));
await new Promise((r) => setTimeout(r, 1500));
try { p.kill(); } catch {}
process.exit(0);
