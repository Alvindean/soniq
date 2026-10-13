const OPENROUTER_MODEL = 'anthropic/claude-sonnet-4.5';

function getProviderOrder(anthropicKey, openrouterKey) {
  const configured = (process.env.SONIQ_AI_PROVIDER || 'auto').trim().toLowerCase();
  if (!['auto', 'anthropic', 'openrouter'].includes(configured)) {
    return {
      status: 500,
      error: 'SONIQ_AI_PROVIDER must be auto, anthropic, or openrouter.',
      order: [],
    };
  }

  if (configured === 'anthropic' && !anthropicKey) {
    return {
      status: 503,
      error: 'SONIQ_AI_PROVIDER is set to anthropic, but ANTHROPIC_API_KEY is not configured.',
      order: [],
    };
  }
  if (configured === 'openrouter' && !openrouterKey) {
    return {
      status: 503,
      error: 'SONIQ_AI_PROVIDER is set to openrouter, but OPENROUTER_API_KEY is not configured.',
      order: [],
    };
  }
  if (!anthropicKey && !openrouterKey) {
    return {
      status: 503,
      error: 'Either ANTHROPIC_API_KEY or OPENROUTER_API_KEY must be configured.',
      order: [],
    };
  }

  if (configured === 'anthropic') return { order: ['anthropic'] };
  if (configured === 'openrouter') return { order: ['openrouter'] };

  const order = [];
  if (anthropicKey) order.push('anthropic');
  if (openrouterKey) order.push('openrouter');
  return { order };
}

function getUserProvider(rawKey) {
  const key = String(rawKey || '').trim();
  if (/^sk-ant-[A-Za-z0-9_-]{20,}$/.test(key)) return { provider: 'anthropic', key };
  if (/^sk-or-[A-Za-z0-9_-]{20,}$/.test(key)) return { provider: 'openrouter', key };
  return null;
}

module.exports = { getProviderOrder, getUserProvider, OPENROUTER_MODEL };
