// Bascule FR / NL / EN — aucune dépendance, aucun cookie (le choix est gardé en localStorage
// si disponible). Sans JavaScript, les trois langues s'affichent simplement l'une sous l'autre.
(function () {
  var LANGS = ['fr', 'nl', 'en'];
  document.documentElement.classList.add('js');
  function pick() {
    var h = (location.hash || '').slice(1).toLowerCase(); if (LANGS.indexOf(h) >= 0) return h;
    try { var s = localStorage.getItem('sollist.lang'); if (LANGS.indexOf(s) >= 0) return s; } catch (e) {}
    var n = (navigator.language || 'fr').slice(0, 2).toLowerCase();
    return LANGS.indexOf(n) >= 0 ? n : 'en';
  }
  function show(lang) {
    document.documentElement.lang = lang;
    Array.prototype.forEach.call(document.querySelectorAll('[data-lang]'), function (el) {
      el.classList.toggle('on', el.getAttribute('data-lang') === lang);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.langs button'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === lang));
    });
    try { localStorage.setItem('sollist.lang', lang); } catch (e) {}
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('.langs button');
    if (b) show(b.getAttribute('data-set'));
  });
  show(pick());
})();
