/**
 * SONIQ — Universal API Proxy
 * Supports both Anthropic and OpenRouter API keys
 * POST /api/generate
 */

const anonUsage = new Map();
function checkLimit(ip) {
  const now = Date.now();
  const e = anonUsage.get(ip);
  if (!e || now - e.reset > 3600000) { anonUsage.set(ip,{count:1,reset:now}); return true; }
  if (e.count >= 10) return false;
  e.count++; return true;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});

  // Support both key types
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;
  const apiKey = anthropicKey || openrouterKey;

  if (!apiKey) {
    return res.status(500).json({
      error: 'No API key configured. Add ANTHROPIC_API_KEY or OPENROUTER_API_KEY in Vercel → Settings → Environment Variables, then Redeploy.'
    });
  }

  const ip = (req.headers['x-forwarded-for']||'').split(',')[0].trim()||'unknown';
  if (!checkLimit(ip)) return res.status(429).json({error:'Hourly limit reached. Try again soon.'});

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({error:'Invalid JSON'}); }

  const { messages, system, max_tokens = 4096 } = body || {};
  if (!messages?.length) return res.status(400).json({error:'messages required'});

  try {
    let responseText;

    if (openrouterKey && !anthropicKey) {
      // OpenRouter path
      const orMsgs = system
        ? [{role:'system',content:system}, ...messages]
        : messages;

      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + openrouterKey,
          'HTTP-Referer': 'https://soniq.vercel.app',
          'X-Title': 'SONIQ'
        },
        body: JSON.stringify({model:'anthropic/claude-sonnet-4-5', max_tokens, messages:orMsgs})
      });
      if (!r.ok) { const t=await r.text(); return res.status(r.status).json({error:'OpenRouter error '+r.status, detail:t}); }
      const d = await r.json();
      responseText = d.choices?.[0]?.message?.content || '';
    } else {
      // Anthropic path
      const payload = {model:'claude-sonnet-4-20250514', max_tokens, messages};
      if (system) payload.system = system;

      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {'Content-Type':'application/json','x-api-key':anthropicKey,'anthropic-version':'2023-06-01'},
        body: JSON.stringify(payload)
      });
      if (!r.ok) { const t=await r.text(); return res.status(r.status).json({error:'Anthropic error '+r.status, detail:t}); }
      const d = await r.json();
      responseText = d.content?.map(c=>c.text||'').join('') || '';
    }

    // Always return Anthropic-compatible format
    return res.status(200).json({content:[{type:'text', text:responseText}]});

  } catch(err) {
    console.error('Proxy error:', err);
    return res.status(500).json({error: err.message});
  }
};
