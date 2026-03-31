/**
 * SONIQ — Email sending endpoint
 * POST /api/send-email
 * Body: { type: 'welcome' | 'upgrade_nudge', email, name }
 *
 * Called internally after Supabase auth events.
 * Requires RESEND_API_KEY env var.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = 'SONIQ <info@mysoniq.com>';
const REPLY_TO = 'info@mysoniq.com';

// Escape HTML special characters to prevent injection into email body
function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const ALLOWED_ORIGINS = [
  'https://www.mysoniq.com',
  'https://mysoniq.com',
  'https://soniq.vercel.app',
  'https://project-47rl2-git-main-alvin-deans-projects.vercel.app',
];

const EMAILS = {
  welcome: (name) => ({
    subject: 'Your studio is ready.',
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#0a0a0f;color:#f1f0ff;font-family:'Inter',system-ui,sans-serif;margin:0;padding:0">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Header -->
        <tr><td style="padding:0 0 32px 0">
          <span style="font-size:1.4rem;font-weight:800;color:#9d5af5;letter-spacing:-0.02em">SONIQ</span>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#0f0f1a;border:1px solid rgba(124,58,237,0.2);border-radius:12px;padding:40px">

          <p style="font-size:1.1rem;font-weight:600;margin:0 0 16px">Welcome to SONIQ${name ? ', ' + escHtml(name) : ''}.</p>

          <p style="color:#8b8aab;line-height:1.7;margin:0 0 24px">You just got access to the same intelligence we built for working songwriters, producers, and sync-ready artists.</p>

          <p style="color:#f1f0ff;font-weight:500;margin:0 0 12px">Here's what's waiting for you right now:</p>
          <ul style="color:#8b8aab;line-height:1.9;padding-left:20px;margin:0 0 24px">
            <li><strong style="color:#f1f0ff">24 genre DNAs</strong> — structural rules, production formulas, and the outlier songs that broke the rules but still charted</li>
            <li><strong style="color:#f1f0ff">Music theory layer</strong> — modes, chord psychology, harmony controls baked in</li>
            <li><strong style="color:#f1f0ff">Production brief</strong> — BPM, instrumentation, arrangement notes, ready for the studio</li>
            <li><strong style="color:#f1f0ff">Visual direction</strong> — music video concept, cover art prompts, artist visual</li>
            <li><strong style="color:#f1f0ff">Copyright timestamp</strong> — SONIQ-ID on every song you generate</li>
          </ul>

          <p style="color:#8b8aab;line-height:1.7;margin:0 0 32px">One thing to do right now: pick a genre you know cold. Generate a song on a topic you've been sitting on. See what comes back.</p>

          <table cellpadding="0" cellspacing="0"><tr><td>
            <a href="https://www.mysoniq.com/app" style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:0.95rem;box-shadow:0 0 24px rgba(124,58,237,0.35)">Start Writing Free →</a>
          </td></tr></table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0 0;color:#5a597a;font-size:0.8rem;line-height:1.6">
          <p>SONIQ / Nu Wav Media LLC · <a href="https://www.mysoniq.com/legal/privacy.html" style="color:#5a597a">Privacy</a> · <a href="https://www.mysoniq.com/legal/terms.html" style="color:#5a597a">Terms</a></p>
          <p style="margin-top:4px">You're receiving this because you signed up at mysoniq.com.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  }),

  upgrade_nudge: (name) => ({
    subject: "You're hitting the ceiling",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#0a0a0f;color:#f1f0ff;font-family:'Inter',system-ui,sans-serif;margin:0;padding:0">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <tr><td style="padding:0 0 32px 0">
          <span style="font-size:1.4rem;font-weight:800;color:#9d5af5;letter-spacing:-0.02em">SONIQ</span>
        </td></tr>

        <tr><td style="background:#0f0f1a;border:1px solid rgba(124,58,237,0.2);border-radius:12px;padding:40px">

          <p style="font-size:1.1rem;font-weight:600;margin:0 0 16px">3 songs a day goes fast${name ? ', ' + escHtml(name) : ''}.</p>

          <p style="color:#8b8aab;line-height:1.7;margin:0 0 16px">Until you're in a session and you want to try the same concept across three different genres. Or run a variant with a darker tone. Or find a fusion that's working and push it further.</p>

          <p style="color:#8b8aab;line-height:1.7;margin:0 0 24px">That's when 3 runs out.</p>

          <p style="color:#f1f0ff;font-weight:500;margin:0 0 12px">Pro removes the ceiling entirely:</p>
          <ul style="color:#8b8aab;line-height:1.9;padding-left:20px;margin:0 0 24px">
            <li>Unlimited generations</li>
            <li>Full production briefs every time</li>
            <li>Music theory layer on demand</li>
            <li>Visual briefs + sync metadata</li>
            <li>Version history</li>
          </ul>

          <p style="color:#f1f0ff;font-size:1.1rem;font-weight:700;margin:0 0 8px">$19/month. Or $9.50/mo on annual — 6 months free.</p>
          <p style="color:#8b8aab;line-height:1.7;margin:0 0 32px">Less than a studio hour. Less than one sync license fee.</p>

          <table cellpadding="0" cellspacing="0"><tr><td>
            <a href="https://www.mysoniq.com/app" style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:0.95rem;box-shadow:0 0 24px rgba(124,58,237,0.35)">Go Pro — 50% Off Annual →</a>
          </td></tr></table>

        </td></tr>

        <tr><td style="padding:24px 0 0;color:#5a597a;font-size:0.8rem;line-height:1.6">
          <p>SONIQ / Nu Wav Media LLC · <a href="https://www.mysoniq.com/legal/privacy.html" style="color:#5a597a">Privacy</a> · <a href="https://www.mysoniq.com/legal/terms.html" style="color:#5a597a">Terms</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  }),
};

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const cors = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  if (!RESEND_API_KEY) return res.status(503).json({ error: 'Email service not configured' });

  // Require a valid internal secret so this endpoint cannot be used as an open relay.
  // Fail-closed: if the secret env var is not set, block all requests.
  const internalSecret = process.env.INTERNAL_API_SECRET;
  if (!internalSecret) return res.status(503).json({ error: 'Email service not configured' });
  const provided = req.headers['x-internal-secret'] || '';
  if (provided !== internalSecret) return res.status(401).json({ error: 'Unauthorized' });

  const { type, email, name } = req.body || {};
  if (!type || !email) return res.status(400).json({ error: 'type and email required' });
  if (!EMAILS[type]) return res.status(400).json({ error: 'Unknown email type' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });
  if (email.length > 254) return res.status(400).json({ error: 'Invalid email' });

  // Sanitize name: strip control characters, limit length
  const safeName = name ? String(name).replace(/[\x00-\x1f\x7f]/g, '').slice(0, 100).trim() : '';

  const template = EMAILS[type](safeName);

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        reply_to: REPLY_TO,
        to: [email],
        subject: template.subject,
        html: template.html,
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      console.error('Resend error:', data);
      return res.status(502).json({ error: 'Email delivery failed' });
    }

    return res.status(200).json({ ok: true, id: data.id });
  } catch (e) {
    console.error('send-email error:', e);
    return res.status(500).json({ error: 'Internal error' });
  }
};
