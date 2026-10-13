const test = require('node:test');
const assert = require('node:assert/strict');
const { getProviderOrder, getUserProvider, OPENROUTER_MODEL } = require('../api/_provider');

function withProvider(t, provider) {
  const previous = process.env.SONIQ_AI_PROVIDER;
  if (provider === undefined) delete process.env.SONIQ_AI_PROVIDER;
  else process.env.SONIQ_AI_PROVIDER = provider;
  t.after(() => {
    if (previous === undefined) delete process.env.SONIQ_AI_PROVIDER;
    else process.env.SONIQ_AI_PROVIDER = previous;
  });
}

test('auto prefers Claude when both providers are configured, then falls back to OpenRouter', (t) => {
  withProvider(t);
  assert.deepEqual(getProviderOrder('anthropic-key', 'openrouter-key').order, ['anthropic', 'openrouter']);
});

test('auto uses OpenRouter when no Anthropic key is configured', (t) => {
  withProvider(t);
  assert.deepEqual(getProviderOrder('', 'openrouter-key').order, ['openrouter']);
});

test('forced Anthropic never falls back to OpenRouter', (t) => {
  withProvider(t, 'anthropic');
  assert.deepEqual(getProviderOrder('anthropic-key', 'openrouter-key').order, ['anthropic']);
});

test('forced OpenRouter never switches to Anthropic', (t) => {
  withProvider(t, 'openrouter');
  assert.deepEqual(getProviderOrder('anthropic-key', 'openrouter-key').order, ['openrouter']);
});

test('forced Anthropic reports missing credentials instead of silently switching', (t) => {
  withProvider(t, 'anthropic');
  assert.equal(getProviderOrder('', 'openrouter-key').status, 503);
});

test('forced OpenRouter reports missing credentials instead of silently switching', (t) => {
  withProvider(t, 'openrouter');
  assert.equal(getProviderOrder('anthropic-key', '').status, 503);
});

test('rejects unknown provider settings and uses the current OpenRouter Claude model ID', (t) => {
  withProvider(t, 'missing');
  assert.equal(getProviderOrder('anthropic-key', 'openrouter-key').status, 500);
  assert.equal(OPENROUTER_MODEL, 'anthropic/claude-sonnet-4.5');
});

test('accepts user Anthropic and OpenRouter keys by their provider-specific prefixes', () => {
  assert.equal(getUserProvider('sk-ant-api03-abcdefghijklmnopqrstuvwxyz').provider, 'anthropic');
  assert.equal(getUserProvider('sk-or-v1-abcdefghijklmnopqrstuvwxyz').provider, 'openrouter');
  assert.equal(getUserProvider('not-an-api-key'), null);
});
