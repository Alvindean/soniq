// api/aff.js — server-side affiliate redirect
// Keeps partner codes private from client-side inspection
// Usage: /api/aff?p=distrokid&ref=blog-hiphop-tips

const PARTNERS = {
  distrokid: {
    base: 'https://distrokid.com/vip/seven/',
    code: 'soniq',
    name: 'DistroKid',
    rel: 'nofollow sponsored',
  },
  tunecorepartner: {
    base: 'https://www.tunecore.com/',
    code: 'SONIQ20',
    name: 'TuneCore',
    rel: 'nofollow sponsored',
  },
  soundraw: {
    base: 'https://soundraw.io/',
    code: '?ref=soniq',
    name: 'Soundraw',
    rel: 'nofollow sponsored',
  },
  splice: {
    base: 'https://splice.com/',
    code: '?utm_source=soniq',
    name: 'Splice',
    rel: 'nofollow sponsored',
  },
};

module.exports = function handler(req, res) {
  const { p, ref } = req.query || {};

  if (!p || !PARTNERS[p]) {
    return res.status(400).json({ error: 'Unknown partner' });
  }

  const partner = PARTNERS[p];
  const destination = partner.base + (partner.code || '');

  // Log affiliate click (no PII stored — just partner + ref source)
  console.log(`[aff] partner=${p} ref=${ref || 'direct'} ts=${Date.now()}`);

  // 302 redirect (not 301 — affiliate links change)
  res.setHeader('Cache-Control', 'no-store, no-cache');
  res.setHeader('X-Robots-Tag', 'noindex');
  res.redirect(302, destination);
}
