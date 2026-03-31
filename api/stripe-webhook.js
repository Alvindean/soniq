/**
 * SONIQ — Stripe Webhook Handler
 * POST /api/stripe-webhook
 * Headers: stripe-signature
 * Body: raw Stripe event payload
 *
 * Dedicated webhook endpoint — delegates to the main stripe.js webhook handler.
 * Register this URL in the Stripe dashboard:
 *   https://www.mysoniq.com/api/stripe-webhook
 *
 * Events to listen for:
 *   checkout.session.completed
 *   checkout.session.expired
 *   customer.subscription.updated
 *   customer.subscription.deleted
 *   invoice.payment_failed
 */

// Re-use the full stripe handler; route as a webhook request
const stripeHandler = require('./stripe');

module.exports = async function handler(req, res) {
  // Force webhook path
  if (!req.query) req.query = {};
  req.query.webhook = '1';
  return stripeHandler(req, res);
};

// Must disable body parsing so Stripe signature verification works on raw bytes
module.exports.config = { api: { bodyParser: false } };
