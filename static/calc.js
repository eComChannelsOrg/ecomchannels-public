// Savings calculator: pick a type of work, set the monthly volume and see manual vs eComChannels AI time and cost in real time.
(() => {
  const fmtH = (h) => (h >= 10 ? Math.round(h).toLocaleString('en-AU') : String(Number(h.toFixed(1))));
  const fmtA = (a) => 'A$' + (Math.round(a / 10) * 10).toLocaleString('en-AU');
  for (const root of document.querySelectorAll('.calc')) {
    const data = JSON.parse(root.dataset.calc);
    const $ = (s) => root.querySelector(s);
    const range = $('.calc-range'), num = $('.calc-num'), rate = $('.calc-rate'), unitLabel = $('.calc-unit'), scen = $('.calc-scenario');
    let cur = data.find((d) => d.slug === root.dataset.start) || data[0];
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    function select(slug, keepVol) {
      cur = data.find((d) => d.slug === slug) || cur;
      for (const b of root.querySelectorAll('.calc-work button')) {
        const on = b.dataset.slug === cur.slug;
        b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1;
      }
      range.min = num.min = cur.min; range.max = num.max = cur.max; range.step = cur.step;
      if (!keepVol) range.value = num.value = cur.def;
      unitLabel.textContent = cur.label;
      scen.textContent = cur.how;
      update();
    }
    function update() {
      const units = Number(num.value) || 0;
      const r = clamp(Number(rate.value) || 0, 0, 500);
      const m = (units * cur.manual) / 60, a = (units * cur.ai) / 60, s = m - a;
      $('.calc-m-h').textContent = fmtH(m); $('.calc-m-a').textContent = fmtA(m * r);
      $('.calc-a-h').textContent = fmtH(a); $('.calc-a-a').textContent = fmtA(a * r);
      $('.calc-s-h').textContent = fmtH(s); $('.calc-s-a').textContent = fmtA(s * r);
      $('.calc-y-h').textContent = fmtH(s * 12); $('.calc-y-a').textContent = fmtA(s * 12 * r);
      $('.calc-pct').textContent = Math.round((1 - cur.ai / cur.manual) * 100) + '%';
      $('.calc-bar-a').style.width = Math.max(2, (cur.ai / cur.manual) * 100) + '%';
      range.style.setProperty('--p', ((units - cur.min) / (cur.max - cur.min)) * 100 + '%');
    }
    root.querySelector('.calc-work').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) select(b.dataset.slug); });
    root.querySelector('.calc-work').addEventListener('keydown', (e) => {
      const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      const i = (data.indexOf(cur) + keys[e.key] + data.length) % data.length;
      select(data[i].slug); root.querySelector(`.calc-work button[data-slug="${data[i].slug}"]`).focus();
    });
    range.addEventListener('input', () => { num.value = range.value; update(); });
    num.addEventListener('input', () => { range.value = clamp(Number(num.value) || 0, cur.min, cur.max); update(); });
    num.addEventListener('change', () => { num.value = clamp(Math.round(Number(num.value) || cur.min), cur.min, cur.max); range.value = num.value; update(); });
    rate.addEventListener('input', update);
    root.classList.add('calc-live');
    select(cur.slug, true);
  }
})();
