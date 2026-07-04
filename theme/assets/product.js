/* EMOTO — product page: road-class configurator + gallery.
   Live-updates variant id, price, financing and add-to-cart state without a reload. */
(function () {
  var root = document.querySelector('[data-product-section]');
  if (!root) return;

  /* ── Variant data ── */
  var dataEl = root.querySelector('[data-pdp-variants]') || document.querySelector('[data-pdp-variants]');
  var variants = [];
  try { variants = JSON.parse(dataEl.textContent); } catch (e) { variants = []; }

  var form = root.querySelector('[data-product-section] form, .pdp__form') || root.querySelector('form');
  var idInput = root.querySelector('[data-pdp-variant-id]');
  var priceEls = root.querySelectorAll('[data-pdp-price]');
  var compareEl = root.querySelector('[data-pdp-compare]');
  var monthlyEl = root.querySelector('[data-pdp-monthly]');
  var atcEls = root.querySelectorAll('[data-pdp-atc]');
  var atcTextEls = root.querySelectorAll('[data-pdp-atc-text]');
  var moneyFormat = (window.Shopify && window.Shopify.money_format) || '{{amount}} kr';
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  /* Current selection: option position (1-based) → value */
  var selected = {};
  root.querySelectorAll('[data-pdp-option]').forEach(function (opt) {
    var pos = opt.getAttribute('data-pdp-option');
    var active = opt.querySelector('.pdp__opt-btn.is-selected');
    selected[pos] = active ? active.getAttribute('data-value') : null;
  });

  /* ── Money formatting (mirrors Shopify's money filter, SEK-friendly) ── */
  function formatMoney(cents) {
    var amount = (cents / 100);
    var hasDecimals = /\{\{\s*amount\s*\}\}/.test(moneyFormat);
    var value;
    if (/amount_no_decimals/.test(moneyFormat)) {
      value = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    } else {
      value = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace(/\.(\d\d)$/, ',$1');
    }
    return moneyFormat
      .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/g, value)
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/g, value)
      .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/g, value)
      .replace(/\{\{\s*amount\s*\}\}/g, value);
    void hasDecimals;
  }

  /* ── Find the variant matching the current selection ── */
  function matchVariant() {
    var positions = Object.keys(selected);
    return variants.find(function (v) {
      return positions.every(function (pos) {
        var i = parseInt(pos, 10) - 1;
        var vOpt = v.options[i];
        return selected[pos] == null || vOpt === selected[pos];
      });
    });
  }

  /* Is a given option value reachable given the OTHER currently-selected options? */
  function valueAvailable(pos, value) {
    return variants.some(function (v) {
      if (!v.available) return false;
      if (v.options[parseInt(pos, 10) - 1] !== value) return false;
      return Object.keys(selected).every(function (p) {
        if (p === pos || selected[p] == null) return true;
        return v.options[parseInt(p, 10) - 1] === selected[p];
      });
    });
  }

  function render() {
    var v = matchVariant();

    /* Availability hints on each button */
    root.querySelectorAll('[data-pdp-value]').forEach(function (btn) {
      var pos = btn.getAttribute('data-option-position');
      var value = btn.getAttribute('data-value');
      btn.classList.toggle('is-unavailable', !valueAvailable(pos, value));
    });

    if (!v) {
      each(atcEls, function (b) { b.disabled = true; });
      each(atcTextEls, function (t) { t.textContent = window.EMOTO_STR ? window.EMOTO_STR.unavailable : 'Ej tillgänglig'; });
      return;
    }

    if (idInput) idInput.value = v.id;
    each(priceEls, function (el) { el.textContent = formatMoney(v.price); });
    if (compareEl) {
      if (v.compare_at_price && v.compare_at_price > v.price) {
        compareEl.textContent = formatMoney(v.compare_at_price);
        compareEl.style.display = '';
      } else {
        compareEl.style.display = 'none';
      }
    }
    if (monthlyEl) monthlyEl.textContent = formatMoney(Math.round(v.price / 36));

    each(atcEls, function (b) { b.disabled = !v.available; });
    each(atcTextEls, function (t) {
      t.textContent = v.available
        ? (window.EMOTO_STR ? window.EMOTO_STR.add : 'Lägg i varukorg')
        : (window.EMOTO_STR ? window.EMOTO_STR.soldout : 'Slutsåld');
    });

    /* Reflect variant image in the gallery if it has one */
    if (v.featured_media && typeof v.featured_media.position === 'number') {
      showSlide(v.featured_media.position - 1);
    }

    /* Keep the URL shareable (?variant=) without a reload */
    if (window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      url.searchParams.set('variant', v.id);
      window.history.replaceState({}, '', url.toString());
    }
  }

  /* ── Option button clicks ── */
  root.querySelectorAll('[data-pdp-value]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pos = btn.getAttribute('data-option-position');
      var value = btn.getAttribute('data-value');
      selected[pos] = value;

      var group = btn.closest('[data-pdp-option]');
      if (group) {
        group.querySelectorAll('[data-pdp-value]').forEach(function (b) { b.classList.remove('is-selected'); });
        var sel = group.querySelector('[data-pdp-opt-selected]');
        if (sel) sel.textContent = value;
      }
      btn.classList.add('is-selected');
      render();
    });
  });

  /* ── Gallery ── */
  var slides = root.querySelectorAll('[data-pdp-slide]');
  var thumbs = root.querySelectorAll('[data-pdp-thumb]');
  function showSlide(index) {
    if (!slides.length) return;
    slides.forEach(function (s) {
      s.classList.toggle('is-active', s.getAttribute('data-pdp-slide') == index);
    });
    thumbs.forEach(function (t) {
      t.classList.toggle('is-active', t.getAttribute('data-pdp-thumb') == index);
    });
  }
  thumbs.forEach(function (t) {
    t.addEventListener('click', function () { showSlide(t.getAttribute('data-pdp-thumb')); });
  });

  render();
})();
