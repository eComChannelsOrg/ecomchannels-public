// eComChannels demo booking calendar. Slots are 30 minutes, Mon–Fri 9:30–16:30 Melbourne time.
// The request goes to the team by email (prefilled); the visitor also gets a calendar file to hold the time.
(function () {
  var EMAIL = 'support@ecomchannels.com';
  var TZ = 'Australia/Melbourne';
  var DAYS_AHEAD = 35, LEAD_HOURS = 3, SLOT_MIN = 30;
  var START = [9, 30], END = [16, 30];
  // Victorian and national public holidays (no demos).
  var HOLIDAYS = ['2026-11-03', '2026-12-25', '2026-12-28', '2027-01-01', '2027-01-26', '2027-03-08', '2027-03-26', '2027-03-27', '2027-03-29', '2027-04-26', '2027-06-14', '2027-11-02', '2027-12-27', '2027-12-28'];
  var grid = document.getElementById('cal-grid');
  if (!grid) return;
  var form = document.getElementById('demo');
  var slotsEl = document.getElementById('slots'), slotsTitle = document.getElementById('slots-title');
  var label = document.getElementById('cal-label'), prev = document.getElementById('cal-prev'), next = document.getElementById('cal-next');
  var chosen = document.getElementById('chosen'), done = document.getElementById('done');
  var userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone || TZ;

  // Melbourne wall time -> UTC ms
  function partsIn(tz, ms) {
    var p = {}; new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
      .formatToParts(new Date(ms)).forEach(function (x) { p[x.type] = x.value; });
    return p;
  }
  function melbToUTC(y, m, d, h, mi) {
    var guess = Date.UTC(y, m - 1, d, h, mi);
    for (var i = 0; i < 2; i++) {
      var p = partsIn(TZ, guess);
      var asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
      guess -= asUTC - Date.UTC(y, m - 1, d, h, mi);
    }
    return guess;
  }
  function ymd(y, m, d) { return y + '-' + String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0'); }

  // Build the list of bookable days (Melbourne dates).
  var now = Date.now(), today = partsIn(TZ, now);
  var days = {};
  for (var i = 0; i <= DAYS_AHEAD; i++) {
    var base = new Date(Date.UTC(+today.year, +today.month - 1, +today.day + i));
    var y = base.getUTCFullYear(), m = base.getUTCMonth() + 1, d = base.getUTCDate(), dow = base.getUTCDay();
    var key = ymd(y, m, d);
    if (dow === 0 || dow === 6 || HOLIDAYS.indexOf(key) >= 0) continue;
    var slots = [];
    for (var t = START[0] * 60 + START[1]; t <= END[0] * 60 + END[1] - SLOT_MIN; t += SLOT_MIN) {
      var ms = melbToUTC(y, m, d, Math.floor(t / 60), t % 60);
      if (ms - now >= LEAD_HOURS * 3600e3) slots.push(ms);
    }
    if (slots.length) days[key] = slots;
  }
  var keys = Object.keys(days);
  var months = [];
  keys.forEach(function (k) { var mk = k.slice(0, 7); if (months.indexOf(mk) < 0) months.push(mk); });
  var mIdx = 0, selDay = null, selSlot = null;

  var fmtTime = function (ms, tz) { return new Intl.DateTimeFormat('en-AU', { timeZone: tz, hour: 'numeric', minute: '2-digit' }).format(new Date(ms)); };
  var fmtLong = function (ms, tz) { return new Intl.DateTimeFormat('en-AU', { timeZone: tz, weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(new Date(ms)); };

  function renderMonth() {
    grid.innerHTML = '';
    if (!months.length) { label.textContent = 'No times available'; return; }
    var mk = months[mIdx], y = +mk.slice(0, 4), m = +mk.slice(5, 7);
    label.textContent = new Intl.DateTimeFormat('en-AU', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, 1)));
    prev.disabled = mIdx === 0; next.disabled = mIdx === months.length - 1;
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(function (n) { var e = document.createElement('div'); e.className = 'dow'; e.textContent = n; grid.appendChild(e); });
    var first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay(); first = (first + 6) % 7;
    for (var b = 0; b < first; b++) grid.appendChild(document.createElement('span'));
    var dim = new Date(Date.UTC(y, m, 0)).getUTCDate();
    for (var d = 1; d <= dim; d++) {
      var key = ymd(y, m, d), btn = document.createElement('button');
      btn.type = 'button'; btn.textContent = d;
      if (days[key]) {
        btn.className = 'open' + (key === selDay ? ' sel' : '');
        btn.setAttribute('aria-label', 'Choose ' + key);
        btn.onclick = (function (k) { return function () { selDay = k; selSlot = null; renderMonth(); renderSlots(); updateChosen(); }; })(key);
      } else { btn.disabled = true; }
      grid.appendChild(btn);
    }
  }
  function renderSlots() {
    slotsEl.innerHTML = '';
    if (!selDay) return;
    var list = days[selDay];
    slotsTitle.textContent = new Intl.DateTimeFormat('en-AU', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(selDay + 'T00:00:00Z'));
    list.forEach(function (ms) {
      var b = document.createElement('button'); b.type = 'button';
      b.textContent = fmtTime(ms, userTZ);
      b.className = ms === selSlot ? 'sel' : '';
      b.onclick = function () { selSlot = ms; renderSlots(); updateChosen(); form.querySelector('[name=name]').focus({ preventScroll: true }); };
      slotsEl.appendChild(b);
    });
  }
  function updateChosen() {
    if (selSlot) { chosen.className = 'chosen'; chosen.textContent = '📅 ' + fmtLong(selSlot, userTZ) + (userTZ !== TZ ? ' (' + fmtTime(selSlot, TZ) + ' Melbourne)' : ''); }
    else { chosen.className = 'chosen empty'; chosen.textContent = selDay ? 'Now choose a time' : 'Pick a date and time in the calendar'; }
  }
  document.getElementById('tz').textContent = 'Times shown in your time zone (' + userTZ.replace(/_/g, ' ') + '). Our team is in Melbourne.';
  prev.onclick = function () { if (mIdx > 0) { mIdx--; renderMonth(); } };
  next.onclick = function () { if (mIdx < months.length - 1) { mIdx++; renderMonth(); } };
  if (/[?&]type=trial\b/.test(location.search)) { var t = form.querySelector('input[name=type][value=trial]'); if (t) t.checked = true; }
  if (keys.length) { selDay = keys[0]; mIdx = months.indexOf(keys[0].slice(0, 7)); }
  renderMonth(); renderSlots(); updateChosen();

  function icsDate(ms) { return new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!selSlot) { chosen.className = 'chosen empty'; chosen.textContent = 'Please pick a date and time first'; document.getElementById('cal').scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    if (!form.reportValidity()) return;
    var d = new FormData(form);
    var kind = d.get('type') === 'trial' ? 'Demo + 30-day free trial' : 'Demo';
    var all = function (k) { return d.getAll(k).join(', ') || '-'; };
    var whenMelb = fmtLong(selSlot, TZ), whenUser = fmtLong(selSlot, userTZ);
    var body = [
      'Booking request: ' + kind,
      'Time: ' + whenMelb + (userTZ !== TZ ? ' (visitor: ' + whenUser + ')' : ''),
      '',
      'Name: ' + d.get('name'), 'Email: ' + d.get('email'), 'Company: ' + d.get('company'),
      'Phone: ' + (d.get('phone') || '-'), 'Website: ' + (d.get('website') || '-'),
      'Products: ' + all('products'), 'Channels: ' + all('channels'), 'Orders per month: ' + (d.get('orders') || '-'),
      '', 'Notes:', d.get('notes') || '-'
    ].join('\n');
    var subject = kind + ' booking: ' + d.get('company') + ', ' + whenMelb;
    var mailto = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    var endMs = selSlot + SLOT_MIN * 60e3;
    var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//eComChannels//Demo booking//EN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
      'UID:' + selSlot + '-' + Math.random().toString(36).slice(2) + '@ecomchannels.com', 'DTSTAMP:' + icsDate(Date.now()),
      'DTSTART:' + icsDate(selSlot), 'DTEND:' + icsDate(endMs), 'SUMMARY:eComChannels demo (pending confirmation)',
      'DESCRIPTION:Requested demo with eComChannels. We will confirm by email and send the video link. Questions: ' + EMAIL,
      'STATUS:TENTATIVE', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    var icsUrl = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    var gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent('eComChannels demo (pending confirmation)') +
      '&dates=' + icsDate(selSlot) + '/' + icsDate(endMs) + '&details=' + encodeURIComponent('We will confirm by email and send the video link. ' + EMAIL);
    done.innerHTML = '<b>Almost done: send the email that just opened to confirm your request.</b><br>Requested: ' + whenUser +
      '. We will confirm by email, usually within one business day.<div class="links-row"><a href="' + mailto + '">Open the email again</a><a href="' + icsUrl + '" download="ecomchannels-demo.ics">Add to calendar (.ics)</a><a href="' + gcal + '" target="_blank" rel="noopener">Add to Google Calendar</a></div>';
    done.className = 'done show';
    window.location.href = mailto;
  });
})();
