/**
 * SONIQ — Stripe Checkout Session
 * POST /api/stripe-checkout
 * Headers: Authorization: Bearer <supabase_jwt>
 * Body: { plan: 'founding_t1' | 'founding_t1_annual' | 'founding_t2' | 'founding_t2_annual'
 *              | 'pro' | 'pro_annual' | 'studio' | 'studio_annual' }
 *
 * Dedicated checkout endpoint — delegates to the main stripe.js handler.
 */

// Re-use the full stripe handler; route as a checkout request (no ?webhook param)
const stripeHandler = require('./stripe');

module.exports = async function handler(req, res) {
  // Force checkout path (not webhook)
  if (req.query) delete req.query.webhook;
  return stripeHandler(req, res);
};

module.exports.config = { api: { bodyParser: false } };
