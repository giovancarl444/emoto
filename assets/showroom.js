/* EMOTO — showroom ring carousel + header overlay */
(function () {
  function initShowroom(root) {
    var bikes = Array.prototype.slice.call(root.querySelectorAll('[data-sr-bike]'));
    if (!bikes.length) return;
    var count = bikes.length;
    var active = Math.floor((count - 1) / 2);

    var elEyebrow = root.querySelector('[data-sr-eyebrow]');
    var elTitle = root.querySelector('[data-sr-title]');
    var elTag = root.querySelector('[data-sr-tag]');
    var elPrice = root.querySelector('[data-sr-price]');
    var elFin = root.querySelector('[data-sr-fin]');
    var elCta = root.querySelector('[data-sr-cta]');
    var elDots = root.querySelector('[data-sr-dots]');
    var finOr = (root.getAttribute('data-fin-or') || 'eller');
    var finMonth = (root.getAttribute('data-fin-month') || 'mån');

    // dots
    var dots = bikes.map(function (b, i) {
      var d = document.createElement('button');
      d.className = 'showroom__dot';
      d.type = 'button';
      d.setAttribute('aria-label', b.getAttribute('data-name') || 'Model ' + (i + 1));
      d.addEventListener('click', function () { setActive(i); });
      if (elDots) elDots.appendChild(d);
      return d;
    });

    function roleFor(i) {
      var diff = ((i - active) % count + count) % count;
      if (diff === 0) return 'center';
      if (diff === 1) return 'right';
      if (diff === count - 1) return 'left';
      return 'hidden';
    }

    function render() {
      bikes.forEach(function (b, i) {
        var role = roleFor(i);
        b.setAttribute('data-role', role);
        b.style.display = role === 'hidden' ? 'none' : '';
        b.setAttribute('aria-hidden', role === 'center' ? 'false' : 'true');
        b.tabIndex = role === 'center' ? -1 : 0;
      });
      dots.forEach(function (d, i) { d.setAttribute('aria-current', i === active ? 'true' : 'false'); });

      var a = bikes[active];
      var g = function (k) { return a.getAttribute(k) || ''; };
      if (elEyebrow) elEyebrow.textContent = g('data-marque') + ' · ' + g('data-badge');
      if (elTitle) elTitle.textContent = g('data-name');
      if (elTag) elTag.textContent = g('data-tagline');
      if (elPrice) elPrice.textContent = g('data-price');
      if (elFin) elFin.textContent = finOr + ' ' + g('data-monthly') + '/' + finMonth;
      if (elCta) elCta.setAttribute('href', g('data-url') || '#');
    }

    function setActive(i) { active = ((i % count) + count) % count; render(); }

    bikes.forEach(function (b, i) {
      b.addEventListener('click', function () { if (roleFor(i) !== 'center') setActive(i); });
    });
    var prev = root.querySelector('[data-sr-prev]');
    var next = root.querySelector('[data-sr-next]');
    if (prev) prev.addEventListener('click', function () { setActive(active - 1); });
    if (next) next.addEventListener('click', function () { setActive(active + 1); });

    render();
  }

  function initHeaderOverlay() {
    var header = document.querySelector('[data-header-overlay]');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 8) {
        header.removeAttribute('data-overlay');
        header.setAttribute('data-solid', '');
      } else {
        header.setAttribute('data-overlay', '');
        header.removeAttribute('data-solid');
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-showroom]').forEach(initShowroom);
    initHeaderOverlay();
  });
})();
