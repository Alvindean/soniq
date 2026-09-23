#!/usr/bin/env node
/**
 * make-song.mjs — generate a SONIQ song from the terminal against the LIVE
 * backend (soniq-api Worker), exactly the way the app's Write tab does it.
 *
 * Auth: admin bypass (X-Admin-Token = HMAC-SHA256(ADMIN_PASSWORD, ADMIN_TOKEN_SECRET)),
 * read from .env.test — so no plan limits, no credit burn on the user account.
 * Cost: one OpenRouter call per song (~$0.02–0.05).
 *
 * Usage:
 *   node scripts/make-song.mjs --genre rnb --topic "two a.m. apology" --mood Reflective
 *   node scripts/make-song.mjs --genre hiphop --topic "..." --mood Confident --length long \
 *        --vocal "Raspy / Gritty male" --structure storytelling --set substyle=boom_bap
 *
 * Flags (defaults in brackets):
 *   --genre      pop|hiphop|rnb|rock|country|edm|... [pop]
 *   --topic      the song's subject (required)
 *   --mood       Reflective|Confident|Heartbroken|... [Reflective]
 *   --vocal      "Male vocals"|"Female vocals"|"Duet M/F"|... [Male vocals]
 *   --structure  standard|hookfirst|chorusfirst|doublechorus|storytelling|minimal|epic|verseonly|aaba|ballad [standard]
 *   --length     short|medium|long|extended [medium]
 *   --era        [modern]      --mode  auto|on|off (modulation) [auto]
 *   --set k=v    any extra songParams key (repeatable; JSON values allowed)
 *   --out DIR    where to save the .md [songs/]
 *   --quiet      don't stream lyrics to stdout
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHmac } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.env.SONIQ_API || 'https://soniq-api.thealvindean.workers.dev';

// ── env ────────────────────────────────────────────────────────────────
for (const line of fs.readFileSync(path.join(ROOT, '.env.test'), 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)="?(.*?)"?$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const { ADMIN_PASSWORD, ADMIN_TOKEN_SECRET } = process.env;
if (!ADMIN_PASSWORD || !ADMIN_TOKEN_SECRET) { console.error('missing ADMIN_PASSWORD / ADMIN_TOKEN_SECRET in .env.test'); process.exit(1); }
const adminToken = createHmac('sha256', ADMIN_TOKEN_SECRET).update(ADMIN_PASSWORD).digest('hex');

// ── args ───────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const flags = {}; const sets = {};
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--quiet') { flags.quiet = true; continue; }
  if (a === '--set') { const [k, ...v] = argv[++i].split('='); const raw = v.join('='); try { sets[k] = JSON.parse(raw); } catch { sets[k] = raw; } continue; }
  if (a.startsWith('--')) { flags[a.slice(2)] = argv[++i]; }
}
if (!flags.topic) { console.error('--topic is required'); process.exit(1); }

const params = {
  genre: flags.genre || 'pop',
  topic: flags.topic,
  mood: flags.mood || 'Reflective',
  vocal: flags.vocal || 'Male vocals',
  structure: flags.structure || 'standard',
  length: flags.length || 'medium',
  era: flags.era || 'modern',
  quality: 'high',
  theoryLevel: 'standard',
  mode: flags.mode || 'auto',
  lyricTier: flags.tier || 'street',
  hookStyle: 'auto',
  bracketMode: 'suno',
  platform: 'suno',
  substyle: flags.substyle || '',
  region: flags.region || '',
  emotionalVelocity: flags.velocity || '',
  aggression: flags.aggression || 'mid',
  swing: 'genre_default',
  syllableDensity: 'auto',
  emotionalArc: 'none',
  punchlineCraft: [], genreCraft: [],
  avoidPatterns: [], avoidHookPatterns: [],
  voice: { name: '', influences: '', forbidden: '' },
  blend: { genre2: flags.genre2 || '', style2: '', ratio: 70 },
  ...sets,
};

// ── call ───────────────────────────────────────────────────────────────
const t0 = Date.now();
const res = await fetch(BASE + '/api/stream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Admin-Token': adminToken },
  body: JSON.stringify({ action: 'generate', params }),
});
if (!res.ok) { console.error(`HTTP ${res.status}:`, await res.text()); process.exit(1); }

let meta = null;
const metaHeader = res.headers.get('X-Soniq-Meta');
if (metaHeader) { try { meta = JSON.parse(Buffer.from(metaHeader, 'base64').toString('utf8')); } catch {} }

let text = '', buf = '', done = null;
const dec = new TextDecoder();
for await (const chunk of res.body) {
  buf += dec.decode(chunk, { stream: true });
  const lines = buf.split('\n'); buf = lines.pop();
  for (const l of lines) {
    if (!l.startsWith('data: ')) continue;
    let ev; try { ev = JSON.parse(l.slice(6)); } catch { continue; }
    if (ev.error) { console.error('\nSERVER ERROR:', ev.error); process.exit(1); }
    if (ev.text) { text += ev.text; if (!flags.quiet) process.stdout.write(ev.text); }
    if (ev.done) done = ev;
  }
}
const secs = ((Date.now() - t0) / 1000).toFixed(1);

// ── save ───────────────────────────────────────────────────────────────
const titleMatch = text.match(/^\s*(?:TITLE|Title)\s*[:\-—]\s*(.+)$/m) || text.match(/^#\s*(.+)$/m);
const title = (titleMatch ? titleMatch[1] : flags.topic).trim().replace(/["*]/g, '');
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'song';
const outDir = path.resolve(ROOT, flags.out || 'songs');
fs.mkdirSync(outDir, { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);
const file = path.join(outDir, `${stamp}-${params.genre}-${slug}.md`);
const front = [
  '---',
  `title: "${title.replace(/"/g, "'")}"`,
  `genre: ${params.genre}${params.blend.genre2 ? ' + ' + params.blend.genre2 : ''}`,
  `topic: "${params.topic.replace(/"/g, "'")}"`,
  `mood: ${params.mood}`, `vocal: ${params.vocal}`, `structure: ${params.structure}`, `length: ${params.length}`,
  `generated: ${new Date().toISOString()}`, `elapsed: ${secs}s`,
  done?.score != null ? `score: ${JSON.stringify(done.score)}` : null,
  done?.continuity ? `continuity: ${JSON.stringify(done.continuity)}` : null,
  done?.contract ? `contract: ${JSON.stringify(done.contract)}` : null,
  meta ? `meta: ${JSON.stringify(meta)}` : null,
  '---', '',
].filter(Boolean).join('\n');
fs.writeFileSync(file, front + text.trim() + '\n');

console.log(`\n\n── saved ${path.relative(ROOT, file)}  (${text.length} chars, ${secs}s)`);
if (done?.score != null) console.log('   score:', JSON.stringify(done.score));
if (done?.continuity) console.log('   continuity:', JSON.stringify(done.continuity));
if (done?.contract?.findings?.length) console.log('   contract:', done.contract.findings.map(f => f.evidence[0]).join(', '), '— promised in the style prompt, not tagged in the lyrics');
