/**
 * SONIQ — Flow: spec → song.
 * Given a FlowSpec from /api/flow-spec, generates the full song
 * (title kept from spec, full lyrics, ready-to-paste Suno prompt).
 */

const { createClient } = require('@supabase/supabase-js');

function getSupabaseClient(token) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    global: { headers: token ? { Authorization: `Bearer ${token}` } : {} },
  });
}

async function callAnthropic(apiKey, messages, system, max_tokens) {
  const payload = { model: 'claude-sonnet-4-20250514', max_tokens, messages };
  if (system) payload.system = system;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error('Anthropic ' + r.status + ': ' + (await r.text()).slice(0, 200));
  const d = await r.json();
  return d.content?.map(c => c.text || '').join('') || '';
}

async function callOpenRouter(apiKey, messages, system, max_tokens) {
  const orMsgs = system ? [{ role: 'system', content: system }, ...messages] : messages;
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + apiKey,
      'HTTP-Referer': 'https://mysoniq.com',
      'X-Title': 'SONIQ',
    },
    body: JSON.stringify({ model: 'anthropic/claude-sonnet-4-5', max_tokens, messages: orMsgs }),
  });
  if (!r.ok) throw new Error('OpenRouter ' + r.status + ': ' + (await r.text()).slice(0, 200));
  const d = await r.json();
  return d.choices?.[0]?.message?.content || '';
}

async function callAI(messages, system, max_tokens) {
  const ak = process.env.ANTHROPIC_API_KEY;
  const ok = process.env.OPENROUTER_API_KEY;
  if (!ak && !ok) throw new Error('No AI provider configured');
  try {
    if (ak) return await callAnthropic(ak, messages, system, max_tokens);
    return await callOpenRouter(ok, messages, system, max_tokens);
  } catch (e) {
    if (ok && ak) return await callOpenRouter(ok, messages, system, max_tokens);
    throw e;
  }
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowed = ['https://www.mysoniq.com', 'https://mysoniq.com', 'http://localhost:3000', 'http://localhost:5000'];
  const cors = allowed.includes(origin) ? origin : 'https://www.mysoniq.com';
  res.setHeader('Access-Control-Allow-Origin', cors);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Token');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { createHmac } = require('crypto');
  const adminTokenHeader = req.headers['x-admin-token'] || '';
  let isAdmin = false;
  if (adminTokenHeader) {
    const secret = process.env.ADMIN_TOKEN_SECRET;
    const adminPw = process.env.ADMIN_PASSWORD || '';
    if (secret && secret.length >= 16 && adminPw) {
      const expected = createHmac('sha256', secret).update(adminPw).digest('hex');
      isAdmin = adminTokenHeader === expected;
    }
  }

  if (!isAdmin) {
    const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
    if (!token) return res.status(401).json({ error: 'auth_required' });
    const supabase = getSupabaseClient(token);
    if (!supabase) return res.status(503).json({ error: 'auth service unavailable' });
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return res.status(401).json({ error: 'auth_required' });
  }

  let concept = '', spec = null;
  try {
    const body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
    concept = (body.concept || '').trim();
    spec = body.spec;
  } catch (e) {
    return res.status(400).json({ error: 'invalid JSON body' });
  }
  if (!concept) return res.status(400).json({ error: 'concept is required' });
  if (!spec || !spec.title || !spec.genre || !spec.tempo || !spec.key || !spec.vocal ||
      !Array.isArray(spec.instrumentation) || spec.instrumentation.length === 0 ||
      !spec.moodArc || !spec.moodArc.start || !spec.moodArc.end ||
      !spec.structure) {
    return res.status(400).json({ error: 'spec is missing required fields' });
  }

  const fusionLine = spec.fusion && spec.subGenre
    ? `Fusion: blend ${spec.genre} with ${spec.subGenre}. Honor both traditions in the lyric.`
    : '';

  const system = `You are a professional songwriter writing for a specific, fully-spec'd song.
Rules:
- Honor the spec exactly: tempo, key, vocal archetype, instrumentation and mood arc shape the phrasing.
- Use section markers like [Verse 1], [Chorus], [Bridge] — match the genre's structural convention.
- Lyrics must be singable at the given tempo.
- Mood must move from the arc start to the arc end across the song.
- Avoid clichés. Earn the imagery.
- Return ONLY the lyrics. No title line. No commentary. No markdown fences.`;

  const userPrompt = `CONCEPT:
${concept}

SPEC:
Title: ${spec.title}
Genre: ${spec.genre}${spec.fusion && spec.subGenre ? ' × ' + spec.subGenre : ''}
Tempo: ${spec.tempo} BPM
Key: ${spec.key}
Vocal: ${spec.vocal}
Instrumentation: ${spec.instrumentation.join(', ')}
Mood arc: ${spec.moodArc.start} → ${spec.moodArc.end}
Structure: ${spec.structure}
${fusionLine}

Write the lyrics now.`;

  try {
    const text = await callAI([{ role: 'user', content: userPrompt }], system, 1800);
    return res.status(200).json({
      title: spec.title,
      lyrics: text.trim(),
      sunoPrompt: spec.sunoPrompt || '',
    });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Lyric generation failed' });
  }
};
