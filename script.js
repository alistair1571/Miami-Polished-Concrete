document.querySelectorAll('.leadForm').forEach(function(f){
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var form = this;
    var btn = form.querySelector('.form-submit');
    var originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function(response){
      if (response.ok) {
        btn.textContent = "Thanks, we'll call you shortly!";
        btn.style.background = 'var(--green-deep)';
        form.reset();
      } else {
        btn.textContent = 'Something went wrong, please call us instead';
        btn.disabled = false;
      }
    }).catch(function(){
      btn.textContent = 'Something went wrong, please call us instead';
      btn.disabled = false;
    });
  });
});

/* Mobile menu */
(function(){
  var btn = document.querySelector('.mobile-toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
})();

/* Carry a cost-calculator estimate into the quote form */
(function(){
  if (!window.URLSearchParams) return;
  var q = new URLSearchParams(window.location.search);
  if (q.get('source') !== 'cost-calculator') return;
  var parts = [];
  ['service','finish','sqft','extras','estimate'].forEach(function(k){
    var v = q.get(k);
    if (v) parts.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + v);
  });
  if (!parts.length) return;
  var text = 'From the cost calculator. ' + parts.join('; ');
  document.querySelectorAll('textarea[name="details"]').forEach(function(t){ if (!t.value) t.value = text; });
})();
