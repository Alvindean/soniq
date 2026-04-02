/**
 * SONIQ — Stripe integration
 *
 * POST /api/stripe               → create checkout session
 *   Body: { plan: 'founding_t1' | 'founding_t1_annual' | 'founding_t2' | 'founding_t2_annual'
 *                | 'pro' | 'pro_annual' | 'studio' | 'studio_annual' }
 *   Headers: Authorization: Bearer <supabase_jwt>
 *
 * POST /api/stripe?webhook=1     → Stripe webhook handler
 *   Headers: stripe-signature
 *   Body: raw Stripe event payload
 *
 * Env vars required:
 *   STRIPE_SECRET_KEY
 *   STRIPE_WEBHOOK_SECRET                (whsec_...)
 *   STRIPE_FOUNDING_T1_PRICE_ID          price_1TGuKzIZ86EsfktXD9VbT2xE  ($5/mo)
 *   STRIPE_FOUNDING_T1_ANNUAL_PRICE_ID   price_1TGv2nIZ86EsfktXb6HFAoF2  ($42/yr)
 *   STRIPE_FOUNDING_T2_PRICE_ID          price_1TGuL0IZ86EsfktXNnLXxZQC  ($9.99/mo)
 *   STRIPE_FOUNDING_T2_ANNUAL_PRICE_ID   price_1TGv2oIZ86EsfktXBMXudIu2  ($84/yr)
 *   STRIPE_PRO_PRICE_ID                  price_1TGuL1IZ86EsfktXZIKAkAuR  ($19/mo)
 *   STRIPE_PRO_ANNUAL_PRICE_ID           price_1TGv2pIZ86EsfktXbyG8XGKt  ($114/yr)
 *   STRIPE_STUDIO_PRICE_ID               price_1TGuL2IZ86EsfktX3hxg1usk  ($49/mo)
 *   STRIPE_STUDIO_ANNUAL_PRICE_ID        price_1TGv2pIZ86EsfktXOjqXBWIs  ($468/yr)
 *   SUPABASE_URL
 *   SUPABASE_ANON_KEY
 *   SUPABASE_SERVICE_KEY                 (service role — needed for admin writes)
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 */

const { createClient } = require('@supabase/supabase-js');

// Lazy-init Stripe to avoid module-level errors when env var is missing at build time
let _stripe = null;
function getStripe() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY is not configured');
    _stripe = require('stripe')(key);
  }
  return _stripe;
}

// Buffer the raw request body (needed when bodyParser: false)
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

const ALLOWED_ORIGINS = [
  'https://www.mysoniq.com',
  'https://mysoniq.com',
  'https://soniq.vercel.app',
];

const PLAN_TO_PRICE = {
  founding_t1:        process.env.STRIPE_FOUNDING_T1_PRICE_ID,
  founding_t1_annual: process.env.STRIPE_FOUNDING_T1_ANNUAL_PRICE_ID,
  founding_t2:        process.env.STRIPE_FOUNDING_T2_PRICE_ID,
  founding_t2_annual: process.env.STRIPE_FOUNDING_T2_ANNUAL_PRICE_ID,
  pro:                process.env.STRIPE_PRO_PRICE_ID,
  pro_annual:         process.env.STRIPE_PRO_ANNUAL_PRICE_ID,
  studio:             process.env.STRIPE_STUDIO_PRICE_ID,
  studio_annual:      process.env.STRIPE_STUDIO_ANNUAL_PRICE_ID,
};

const PLAN_LABELS = {
  founding_t1:        'Early Founder — $5/mo',
  founding_t1_annual: 'Early Founder Annual — $42/yr',
  founding_t2:        'Entry — $9.99/mo',
  founding_t2_annual: 'Entry Annual — $84/yr',
  pro:                'Pro — $19/mo',
  pro_annual:         'Pro Annual — $114/yr',
  studio:             'Studio — $49/mo',
  studio_annual:      'Studio Annual — $468/yr',
};

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisGet(key) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  try {
    const r = await fetch(`${UPSTASH_URL}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    });
    const d = await r.json();
    return d.result;
  } catch { return null; }
}

async function redisIncr(key) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  try {
    const r = await fetch(`${UPSTASH_URL}/incr/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    });
    const d = await r.json();
    return d.result;
  } catch { return null; }
}

async function redisDecr(key) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  try {
    const r = await fetch(`${UPSTASH_URL}/decr/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    });
    const d = await r.json();
    return d.result;
  } catch { return null; }
}

// SET key value [EX seconds]
async function redisSet(key, value, exSeconds) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  try {
    const parts = [encodeURIComponent(key), encodeURIComponent(value)];
    if (exSeconds) parts.push('ex', encodeURIComponent(exSeconds));
    const r = await fetch(`${UPSTASH_URL}/set/${parts.join('/')}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    });
    const d = await r.json();
    return d.result;
  } catch { return null; }
}

async function redisDel(key) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  try {
    const r = await fetch(`${UPSTASH_URL}/del/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    });
    const d = await r.json();
    return d.result;
  } catch { return null; }
}

// Tier spot limits (single source of truth)
const FOUNDING_TIER_LIMITS = { 1: 500, 2: 1500 };

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// ── CHECKOUT HANDLER ──────────────────────────────────────────────
async function handleCheckout(req, res) {
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  // Verify user with anon key
  const supabaseUser = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
  const { data: { user }, error: authErr } = await supabaseUser.auth.getUser();
  if (authErr || !user) return res.status(401).json({ error: 'Invalid or expired token' });

  let body;
  try {
    const rawBody = await getRawBody(req);
    body = JSON.parse(rawBody.toString() || '{}');
  } catch { return res.status(400).json({ error: 'Invalid JSON' }); }

  const { plan } = body;
  if (!plan || !PLAN_TO_PRICE[plan]) {
    return res.status(400).json({ error: 'Invalid plan. Must be founding_t1, founding_t2, pro, or pro_annual.' });
  }

  const priceId = PLAN_TO_PRICE[plan];
  if (!priceId) {
    return res.status(503).json({ error: `Price not configured for plan: ${plan}` });
  }

  // Reserve a founding tier spot atomically at checkout creation time.
  // This prevents the race condition where many concurrent users all pass
  // the read check before any webhook fires to increment the counter.
  let foundingTierNum = null;
  if (plan === 'founding_t1' || plan === 'founding_t1_annual') foundingTierNum = 1;
  if (plan === 'founding_t2' || plan === 'founding_t2_annual') foundingTierNum = 2;

  if (foundingTierNum !== null) {
    const activeKey = `soniq:founding:tier${foundingTierNum}:active`;
    const countKey  = `soniq:founding:tier${foundingTierNum}:count`;
    const limit     = FOUNDING_TIER_LIMITS[foundingTierNum];

    const active = await redisGet(activeKey);
    if (active !== '1') {
      return res.status(400).json({ error: `Founding tier ${foundingTierNum} is no longer available` });
    }

    // Atomically reserve a spot — INCR first, then check
    const newCount = await redisIncr(countKey);
    if (newCount === null) {
      return res.status(503).json({ error: 'Service temporarily unavailable' });
    }
    if (newCount > limit) {
      await redisDecr(countKey); // return the spot
      // Auto-close this tier
      await redisSet(activeKey, '0');
      return res.status(400).json({ error: `Founding tier ${foundingTierNum} is sold out` });
    }
    // If this was the last spot, close the tier and open the next one
    if (newCount === limit) {
      await redisSet(activeKey, '0');
      if (foundingTierNum === 1) await redisSet('soniq:founding:tier2:active', '1');
    }
  }

  const origin = req.headers.origin || 'https://www.mysoniq.com';
  const successUrl = `${origin}/app?checkout=success&plan=${plan}`;
  const cancelUrl  = `${origin}/app`;

  let session;
  try {
    session = await getStripe().checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: user.id,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        plan,
        plan_label: PLAN_LABELS[plan],
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
          plan,
        },
      },
    });

  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    // Release the reserved founding spot if Stripe session creation failed
    if (foundingTierNum !== null) {
      await redisDecr(`soniq:founding:tier${foundingTierNum}:count`);
    }
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }

  // Store session reservation so the webhook knows this spot was already counted.
  // TTL: 2 hours (well within Stripe's 24h session window; expired sessions release the spot).
  if (foundingTierNum !== null) {
    await redisSet(`soniq:founding:reserve:${session.id}`, String(foundingTierNum), 7200);
  }

  return res.status(200).json({ url: session.url, session_id: session.id });
}

// ── WEBHOOK HANDLER ───────────────────────────────────────────────
async function handleWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not set');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  let rawBody;
  try { rawBody = await getRawBody(req); } catch {
    return res.status(400).json({ error: 'Failed to read request body' });
  }

  let event;
  try {
    // Default tolerance: 300s — do not override, protects against replay attacks.
    event = getStripe().webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  const supabase = getSupabaseAdmin();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const userId  = session.client_reference_id || session.metadata?.user_id;
      const plan    = session.metadata?.plan;

      if (!userId || !plan) {
        console.error('Webhook: missing user_id or plan in session metadata', session.id);
        // Return 200 so Stripe doesn't retry — this is a data issue, not a server error
        return res.status(200).json({ received: true, warning: 'missing metadata' });
      }

      // Founding counter: spot was already reserved (INCRed) at checkout creation time.
      // Only increment here if there is no reservation key (legacy session or edge case).
      const reserveKey = `soniq:founding:reserve:${session.id}`;
      const reservation = await redisGet(reserveKey);
      if (!reservation) {
        // No reservation found — increment now (fallback for sessions created before this fix)
        if (plan === 'founding_t1' || plan === 'founding_t1_annual') await redisIncr('soniq:founding:tier1:count');
        if (plan === 'founding_t2' || plan === 'founding_t2_annual') await redisIncr('soniq:founding:tier2:count');
      } else {
        // Reservation exists — spot already counted; just clean it up
        await redisDel(reserveKey);
      }

      // Update user profile
      if (supabase) {
        const { error } = await supabase
          .from('profiles')
          .update({
            plan,
            stripe_customer_id:      session.customer,
            stripe_subscription_id:  session.subscription,
            subscription_status:     'active',
            plan_activated_at:       new Date().toISOString(),
          })
          .eq('id', userId);

        if (error) {
          console.error('Supabase profile update error:', error.message);
        } else {
          console.log(`Plan upgraded: user=${userId} plan=${plan}`);
        }
      }
      break;
    }

    case 'customer.subscription.updated': {
      const sub    = event.data.object;
      const userId = sub.metadata?.user_id;
      if (!userId || !supabase) break;

      await supabase
        .from('profiles')
        .update({ subscription_status: sub.status })
        .eq('stripe_subscription_id', sub.id);
      break;
    }

    case 'customer.subscription.deleted': {
      const sub    = event.data.object;
      const userId = sub.metadata?.user_id;
      if (!userId || !supabase) break;

      await supabase
        .from('profiles')
        .update({
          plan: 'free',
          subscription_status: 'canceled',
          stripe_subscription_id: null,
        })
        .eq('stripe_subscription_id', sub.id);

      console.log(`Subscription canceled: user=${userId}`);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      if (!supabase) break;

      await supabase
        .from('profiles')
        .update({ subscription_status: 'past_due' })
        .eq('stripe_customer_id', invoice.customer);
      break;
    }

    case 'checkout.session.expired': {
      // Release the reserved founding spot so it becomes available again
      const session   = event.data.object;
      const sessionId = session.id;
      const reserveKey = `soniq:founding:reserve:${sessionId}`;
      const tierStr = await redisGet(reserveKey);
      if (tierStr) {
        const tierNum = parseInt(tierStr, 10);
        const countKey  = `soniq:founding:tier${tierNum}:count`;
        const activeKey = `soniq:founding:tier${tierNum}:active`;
        await redisDecr(countKey);
        await redisDel(reserveKey);
        // Re-open the tier if it was auto-closed when this spot was reserved
        const newCount = parseInt(await redisGet(countKey) || '0', 10);
        const limit = FOUNDING_TIER_LIMITS[tierNum];
        if (newCount < limit) {
          await redisSet(activeKey, '1');
          console.log(`Founding tier ${tierNum} reopened after session expiry ${sessionId}`);
        }
      }
      break;
    }

    default:
      // Ignore unhandled events
      break;
  }

  return res.status(200).json({ received: true });
}

// ── MAIN HANDLER ──────────────────────────────────────────────────
async function handler(req, res) {
  const origin = req.headers.origin || '';
  const isPreview = origin.startsWith('https://') && origin.endsWith('.vercel.app');
  const cors = ALLOWED_ORIGINS.includes(origin) || isPreview ? origin : ALLOWED_ORIGINS[0];

  // Webhook: no CORS headers, raw body required
  if (req.query?.webhook === '1' || req.query?.type === 'webhook') {
    return handleWebhook(req, res);
  }

  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  return handleCheckout(req, res);
}

module.exports = handler;
// Vercel: disable body parsing so webhook receives raw bytes for Stripe signature verification.
// The checkout path re-parses JSON from the buffered raw body via getRawBody().
module.exports.config = { api: { bodyParser: false } };
