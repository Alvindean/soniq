/* SONIQ blog layout v2 — runs on every post page (static + Worker-rendered).
 * Builds: reading progress bar, generated cover art in the hero, a two-column
 * body with a sticky sidebar (product card, numbered TOC, partner tools with
 * logos via /api/aff, related guides), and cover art on index cards.
 * No frameworks, no images to host: art is deterministic inline SVG per slug. */
(function () {
  var API = 'https://soniq-api.thealvindean.workers.dev';
  var slug = (location.pathname.replace(/^\/blog\/?/, '').replace(/\.html$/, '') || 'index');
  // ref = the page path, so affiliate clicks line up with this page's pageviews
  // (soniq:pv:pages:*) and the admin stats can compute click-through rate.
  var pagePath = location.pathname.replace(/\.html$/, '').toLowerCase().replace(/\/+$/, '') || '/';
  var ref = pagePath;
  // First-party pageview beacon (no cookies, no PII) — blog pages never sent one before.
  // Older static posts carry their own inline beacon; only send when they don't (no double counts).
  var hasInline = [].some.call(document.scripts, function (s) { return !s.src && /pageview beacon/.test(s.textContent); });
  if (!hasInline) { try { fetch(API + '/api/pv', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'pageview', path: pagePath }), keepalive: true }); } catch (e) {} }

  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rnd(seed) { var x = seed || 1; return function () { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; }; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // Deterministic "waveform" cover art: hue drifts violet→cyan by slug, bars from a seeded PRNG.
  function coverArt(seed, label, big) {
    var h = hash(seed), r = rnd(h), hue = 250 + (h % 60) - 20, hue2 = 190 + (h % 40);
    var w = 640, hgt = big ? 400 : 260, bars = big ? 36 : 22, gap = 6, bw = (w - gap * (bars + 1)) / bars, out = '';
    for (var i = 0; i < bars; i++) {
      var amp = 0.25 + 0.7 * Math.abs(Math.sin(i * 0.55 + r() * 2)) * (0.6 + r() * 0.6);
      var bh = Math.max(14, amp * (hgt * 0.62)), x = gap + i * (bw + gap), y = hgt / 2 - bh / 2;
      out += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="' + (bw / 2).toFixed(1) + '" fill="url(#g' + h + ')" opacity="' + (0.55 + r() * 0.45).toFixed(2) + '"/>';
    }
    return '<svg class="cover-art" viewBox="0 0 ' + w + ' ' + hgt + '" role="img" aria-label="' + esc(label) + '" preserveAspectRatio="xMidYMid slice">' +
      '<defs><linearGradient id="g' + h + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(' + hue + ',85%,62%)"/><stop offset="1" stop-color="hsl(' + hue2 + ',90%,55%)"/></linearGradient>' +
      '<radialGradient id="bg' + h + '" cx="0.3" cy="0.2" r="1"><stop offset="0" stop-color="hsl(' + hue + ',60%,18%)"/><stop offset="1" stop-color="#0a0a0f"/></radialGradient></defs>' +
      '<rect width="' + w + '" height="' + hgt + '" fill="url(#bg' + h + ')"/>' + out +
      (label ? '<text x="24" y="' + (hgt - 22) + '" font-family="Inter,system-ui,sans-serif" font-size="' + (big ? 22 : 16) + '" font-weight="800" letter-spacing="0.12em" fill="rgba(241,240,255,0.85)">' + esc(label.toUpperCase()) + '</text>' : '') +
      '</svg>';
  }

  // ── Index page: add cover art to every card ──
  var cards = document.querySelectorAll('a.blog-card');
  if (cards.length) {
    cards.forEach(function (a) {
      if (a.querySelector('.cover-art')) return;
      var cat = (a.querySelector('.blog-card-category') || {}).textContent || 'SONIQ';
      var wrap = document.createElement('div'); wrap.className = 'blog-card-art';
      wrap.innerHTML = coverArt(a.getAttribute('href') || a.textContent, cat.trim(), false);
      a.insertBefore(wrap, a.firstChild);
    });
    document.body.classList.add('blog-v2');
    return;
  }

  // ── Post page ──
  var hero = document.querySelector('.post-hero'), body = document.querySelector('article.post-body');
  if (!hero || !body) return;
  var title = (document.querySelector('.post-hero h1') || {}).textContent || document.title;
  var category = ((hero.querySelector('.post-category') || {}).textContent || 'SONIQ').trim();

  // progress bar
  var bar = document.createElement('div'); bar.className = 'read-progress'; document.body.appendChild(bar);
  function onScroll() { var d = document.documentElement, m = d.scrollHeight - d.clientHeight; bar.style.width = (m > 0 ? (d.scrollTop / m) * 100 : 0) + '%'; }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // hero: two-column with art
  var heroInner = document.createElement('div'); heroInner.className = 'post-hero-inner';
  while (hero.firstChild) heroInner.appendChild(hero.firstChild);
  var art = document.createElement('div'); art.className = 'post-hero-art';
  // A real hero photo (featured_image, rendered by the Worker at the top of the
  // body) replaces the generated waveform art so posts don't show two covers.
  var photo = body && body.querySelector('img.post-hero-img');
  if (photo) { photo.style.margin = '0'; photo.style.height = '100%'; photo.style.objectFit = 'cover'; art.appendChild(photo); }
  else art.innerHTML = coverArt(slug, category, true);
  hero.appendChild(heroInner); hero.appendChild(art);

  // layout wrapper
  var layout = document.createElement('div'); layout.className = 'post-layout';
  var main = document.createElement('div'); main.className = 'post-main';
  var side = document.createElement('aside'); side.className = 'post-side';
  body.parentNode.insertBefore(layout, body); main.appendChild(body); layout.appendChild(main); layout.appendChild(side);

  // 1) product card
  side.insertAdjacentHTML('beforeend',
    '<div class="side-card side-product">' +
      '<div class="side-product-visual"><div class="lyric-sheet"><span></span><span class="w2"></span><span class="w3"></span><span class="w1"></span><span class="w2"></span><span class="hl"></span><span class="w3"></span></div></div>' +
      '<div class="side-kicker">SONIQ · AI SONGWRITING STUDIO</div>' +
      '<h3>Write your next song in minutes</h3>' +
      '<p>Genre-aware lyrics, hooks and structure, in your voice. Your first song is free — no card.</p>' +
      '<a class="side-btn" href="/app?ref=' + esc(ref) + '">Write a song free →</a>' +
    '</div>');

  // 2) partner tools — real referral links via the Worker's /api/aff redirect
  var tools = [
    { p: 'distrokid', name: 'DistroKid', domain: 'distrokid.com', line: 'Unlimited releases to every store. 7% off through SONIQ.' },
    { p: 'tunecorepartner', name: 'TuneCore', domain: 'tunecore.com', line: 'Distribution + publishing admin. Code SONIQ20.' },
    { p: 'soundraw', name: 'Soundraw', domain: 'soundraw.io', line: 'Royalty-free AI beats to write over.' },
    { p: 'splice', name: 'Splice', domain: 'splice.com', line: 'Samples, loops and presets for your productions.' },
    { p: 'descript', name: 'Descript', domain: 'descript.com', line: 'Edit music videos, lyric videos and podcasts by editing text.' }
  ];
  side.insertAdjacentHTML('beforeend', '<div class="side-card side-tools"><div class="side-kicker">TOOLS WE ACTUALLY USE</div>' +
    tools.map(function (t) {
      return '<a class="tool-card" href="' + API + '/api/aff?p=' + t.p + '&ref=' + esc(ref) + '" target="_blank" rel="nofollow sponsored noopener">' +
        '<img class="tool-logo" src="/blog/logo-' + t.p.replace('partner', '') + '.png" alt="' + esc(t.name) + ' logo" width="40" height="40" loading="lazy">' +
        '<div><div class="tool-name">' + esc(t.name) + ' <span>→</span></div><div class="tool-line">' + esc(t.line) + '</div></div></a>';
    }).join('') +
    '<div class="side-disclosure">Partner links — SONIQ may earn a commission at no cost to you. It never changes what we recommend.</div></div>');

  // 3) TOC (numbered, active tracking)
  var h2s = Array.prototype.slice.call(body.querySelectorAll('h2'));
  if (h2s.length >= 2) {
    h2s.forEach(function (h, i) { if (!h.id) h.id = 'sec-' + (i + 1) + '-' + h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40); });
    side.insertAdjacentHTML('beforeend', '<div class="side-card side-toc"><div class="side-kicker">IN THIS GUIDE</div><ol class="toc">' +
      h2s.map(function (h) { return '<li><a href="#' + h.id + '">' + esc(h.textContent) + '</a></li>'; }).join('') + '</ol></div>');
    var links = side.querySelectorAll('.toc a');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { links.forEach(function (l) { l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id); }); } }); }, { rootMargin: '-20% 0px -65% 0px' });
      h2s.forEach(function (h) { io.observe(h); });
    }
  }

  // 4) related guides (from the public content API; falls back to the existing related section)
  var relHost = document.createElement('div'); relHost.className = 'side-card side-related'; relHost.innerHTML = '<div class="side-kicker">KEEP READING</div><div class="side-related-list"></div>';
  side.appendChild(relHost);
  var words = title.toLowerCase().split(/[^a-z0-9]+/).filter(function (w) { return w.length > 3; });
  fetch(API + '/api/content?action=public').then(function (r) { return r.json(); }).then(function (d) {
    var posts = (d.posts || []).filter(function (p) { return p.slug !== slug; });
    posts.forEach(function (p) { var t = p.title.toLowerCase(); p._s = words.reduce(function (a, w) { return a + (t.indexOf(w) >= 0 ? 1 : 0); }, 0) + Math.random() * 0.1; });
    posts.sort(function (a, b) { return b._s - a._s; });
    var list = relHost.querySelector('.side-related-list');
    list.innerHTML = posts.slice(0, 4).map(function (p) {
      return '<a class="rel-item" href="' + esc(p.url) + '"><div class="rel-art">' + coverArt(p.slug, '', false) + '</div><div><div class="rel-cat">' + esc(p.category || 'SONIQ') + '</div><div class="rel-title">' + esc(p.title) + '</div></div></a>';
    }).join('');
    // refresh the bottom related section too
    var bottom = document.querySelector('.related-section');
    if (bottom) {
      bottom.innerHTML = '<h3>Related guides</h3><div class="related-grid">' + posts.slice(0, 3).map(function (p) {
        return '<a class="related-card v2" href="' + esc(p.url) + '"><div class="related-card-art">' + coverArt(p.slug, p.category || '', false) + '</div><div class="related-card-body"><div class="rel-cat">' + esc(p.category || 'SONIQ') + '</div><div class="related-card-title">' + esc(p.title) + '</div></div></a>';
      }).join('') + '</div>';
    }
  }).catch(function () { relHost.remove(); });

  document.body.classList.add('blog-v2');
})();
