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

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

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
  founding_t1:        'Early Founder — $5/mo locked forever',
  founding_t1_annual: 'Early Founder Annual — $42/yr locked forever',
  founding_t2:        'Founding Member — $9.99/mo locked forever',
  founding_t2_annual: 'Founding Member Annual — $84/yr locked forever',
  pro:                'Pro — $19/mo',
  pro_annual:         'Pro Annual — $114/yr (50% off)',
  studio:             'Studio — $49/mo',
  studio_annual:      'Studio Annual — $468/yr (20% off)',
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
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}); }
  catch { return res.status(400).json({ error: 'Invalid JSON' }); }

  const { plan } = body;
  if (!plan || !PLAN_TO_PRICE[plan]) {
    return res.status(400).json({ error: 'Invalid plan. Must be founding_t1, founding_t2, pro, or pro_annual.' });
  }

  const priceId = PLAN_TO_PRICE[plan];
  if (!priceId) {
    return res.status(503).json({ error: `Price not configured for plan: ${plan}` });
  }

  // Check founding tier availability
  if (plan === 'founding_t1' || plan === 'founding_t1_annual') {
    const active = await redisGet('soniq:founding:tier1:active');
    if (active !== '1') return res.status(400).json({ error: 'Founding tier 1 is no longer available' });
    const count = parseInt(await redisGet('soniq:founding:tier1:count') || '0', 10);
    if (count >= 500) return res.status(400).json({ error: 'Founding tier 1 is sold out' });
  }
  if (plan === 'founding_t2' || plan === 'founding_t2_annual') {
    const active = await redisGet('soniq:founding:tier2:active');
    if (active !== '1') return res.status(400).json({ error: 'Founding tier 2 is not yet available' });
    const count = parseInt(await redisGet('soniq:founding:tier2:count') || '0', 10);
    if (count >= 1500) return res.status(400).json({ error: 'Founding tier 2 is sold out' });
  }

  const origin = req.headers.origin || 'https://www.mysoniq.com';
  const successUrl = `${origin}/app?checkout=success&plan=${plan}`;
  const cancelUrl  = `${origin}/app`;

  try {
    const session = await stripe.checkout.sessions.create({
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

    return res.status(200).json({ url: session.url, session_id: session.id });
  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}

// ── WEBHOOK HANDLER ───────────────────────────────────────────────
async function handleWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not set');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  let event;
  try {
    // Vercel provides raw body via req.body when Content-Type is application/json
    // For webhooks, Stripe sends raw JSON — we need the raw string for signature verification
    const rawBody = typeof req.body === 'string'
      ? req.body
      : JSON.stringify(req.body);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
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
        break;
      }

      // Increment founding counter atomically
      if (plan === 'founding_t1' || plan === 'founding_t1_annual') await redisIncr('soniq:founding:tier1:count');
      if (plan === 'founding_t2' || plan === 'founding_t2_annual') await redisIncr('soniq:founding:tier2:count');

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

    default:
      // Ignore unhandled events
      break;
  }

  return res.status(200).json({ received: true });
}

// ── MAIN HANDLER ──────────────────────────────────────────────────
module.exports = async function handler(req, res) {
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
};
