// Swyft: tiny progressive enhancement for lead forms. Site works without JS.
(function () {
  document.querySelectorAll('form.lead-form').forEach(function (form) {
    var page = form.querySelector('input[name="page"]');
    if (page) page.value = location.href;
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      if (form.querySelector('input[name="_gotcha"]').value) { e.preventDefault(); return; }
      var endpoint = form.getAttribute('data-endpoint');
      var data = new FormData(form);
      data.delete('_gotcha');
      if (endpoint) {
        e.preventDefault();
        status.textContent = 'Sending…';
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error(r.status);
            form.reset();
            status.textContent = "Thanks. We have it, and we will reply by email.";
          })
          .catch(function () { mailto(); });
        return;
      }
      e.preventDefault();
      mailto();
      function mailto() {
        var lines = [];
        data.forEach(function (v, k) { lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + v); });
        var subject = 'Swyft door-to-door team' + (data.get('business') ? ' from ' + data.get('business') : '');
        location.href = 'mailto:' + form.getAttribute('data-email') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
        status.textContent = 'Opening your email app… If nothing happens, email ' + form.getAttribute('data-email') + ' or call 267-606-8667.';
      }
    });
  });
})();
