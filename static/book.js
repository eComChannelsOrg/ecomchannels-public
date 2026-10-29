// Book-a-demo form: preselect type from ?type=trial and send the request as a pre-filled email.
(function () {
  var form = document.getElementById('demo');
  if (!form) return;
  var EMAIL = 'support@ecomchannels.com';
  if (/[?&]type=trial\b/.test(location.search)) {
    var t = form.querySelector('input[name=type][value=trial]');
    if (t) t.checked = true;
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var d = new FormData(form);
    var type = d.get('type') === 'trial' ? '30-day free trial request' : 'Demo request';
    var all = function (k) { return d.getAll(k).join(', ') || '-'; };
    var lines = [
      type,
      '',
      'Name: ' + d.get('name'),
      'Email: ' + d.get('email'),
      'Company: ' + d.get('company'),
      'Phone: ' + (d.get('phone') || '-'),
      'Website: ' + (d.get('website') || '-'),
      'Products: ' + all('products'),
      'Channels: ' + all('channels'),
      'Orders per month: ' + (d.get('orders') || '-'),
      'Preferred time: ' + (d.get('when') || '-'),
      '',
      'Notes:',
      d.get('notes') || '-'
    ];
    var href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(type + ': ' + d.get('company')) + '&body=' + encodeURIComponent(lines.join('\n'));
    window.location.href = href;
    var st = document.getElementById('demo-status');
    if (st) st.innerHTML = 'Your email app should now open with the request ready to send. If nothing happened, email <a href="mailto:' + EMAIL + '">' + EMAIL + '</a> with your details.';
  });
})();
