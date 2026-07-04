/* EMOTO — AJAX cart: add-to-cart interception, slide-out drawer, live count.
   Uses Shopify's Section Rendering API to keep the drawer markup in sync. */
(function () {
  var DRAWER_SECTION = 'cart-drawer';
  var drawer = document.querySelector('[data-cart-drawer]');
  var body = drawer ? drawer.querySelector('[data-cart-body]') : null;
  var countLabel = drawer ? drawer.querySelector('[data-cart-count-label]') : null;

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  }

  function updateCount(n) {
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = n;
      el.hidden = n < 1;
      el.classList.toggle('is-empty', n < 1);
    });
    if (countLabel) countLabel.textContent = '(' + n + ')';
  }

  /* Replace drawer contents from a Section Rendering API payload */
  function renderSections(sections) {
    if (!sections || !sections[DRAWER_SECTION] || !body) return;
    var doc = new DOMParser().parseFromString(sections[DRAWER_SECTION], 'text/html');
    var fresh = doc.querySelector('[data-cart-body]');
    if (fresh) body.innerHTML = fresh.innerHTML;
    var freshLabel = doc.querySelector('[data-cart-count-label]');
    if (freshLabel && countLabel) countLabel.textContent = freshLabel.textContent;
  }

  function sectionsUrl() { return window.location.pathname; }

  /* ── Add to cart ── */
  function handleAdd(form) {
    var btn = form.querySelector('[type="submit"]');
    var data = new FormData(form);
    data.append('sections', DRAWER_SECTION);
    data.append('sections_url', sectionsUrl());
    if (btn) { btn.classList.add('is-loading'); btn.setAttribute('aria-busy', 'true'); }

    fetch('/cart/add.js', { method: 'POST', headers: { 'Accept': 'application/json' }, body: data })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok) { throw res.j; }
        renderSections(res.j.sections);
        return fetch('/cart.js').then(function (r) { return r.json(); });
      })
      .then(function (cart) { updateCount(cart.item_count); openDrawer(); })
      .catch(function (err) {
        var msg = (err && err.description) || 'Något gick fel. Försök igen.';
        var note = form.querySelector('[data-atc-error]');
        if (note) { note.textContent = msg; note.hidden = false; }
      })
      .finally(function () { if (btn) { btn.classList.remove('is-loading'); btn.removeAttribute('aria-busy'); } });
  }

  /* ── Change line quantity ── */
  function changeLine(line, quantity) {
    return fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ line: line, quantity: quantity, sections: DRAWER_SECTION, sections_url: sectionsUrl() })
    })
      .then(function (r) { return r.json(); })
      .then(function (cart) { renderSections(cart.sections); updateCount(cart.item_count); });
  }

  /* ── Event delegation ── */
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('form[action*="/cart/add"], form[action$="/cart/add"], form.pdp__form');
    if (!form) return;
    e.preventDefault();
    handleAdd(form);
  });

  document.addEventListener('click', function (e) {
    // open via header cart
    var cartLink = e.target.closest('[data-cart-open]');
    if (cartLink && drawer) { e.preventDefault(); openDrawer(); return; }
    // close
    if (e.target.closest('[data-cart-close]')) { closeDrawer(); return; }
    // qty + / - / remove inside drawer
    var plus = e.target.closest('[data-cart-plus]');
    var minus = e.target.closest('[data-cart-minus]');
    var remove = e.target.closest('[data-cart-remove]');
    if (plus || minus || remove) {
      var el = plus || minus || remove;
      var line = parseInt(el.getAttribute('data-cart-plus') || el.getAttribute('data-cart-minus') || el.getAttribute('data-cart-remove'), 10);
      var li = el.closest('[data-cart-line]');
      var qtyEl = li ? li.querySelector('[data-cart-qty]') : null;
      var current = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
      var next = remove ? 0 : (plus ? current + 1 : Math.max(0, current - 1));
      changeLine(line, next);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) closeDrawer();
  });
})();
