#!/usr/bin/env node
/**
 * SONIQ — Audio Render Spike  (Suno-wrapper path: sunoapi.org)
 * ---------------------------------------------------------------------------
 * Proves the missing half of SONIQ: turning the {lyrics, sunoPrompt} that
 * generate.js already produces into an actual rendered song (mp3).
 *
 * This is the ONE-PROVIDER spike. It is deliberately standalone (no Worker,
 * no R2, no UI) so we can prove the pipe end-to-end before building the
 * productized version (CF Worker + Queue + R2 + /app "Produce" button).
 *
 * FAIL-CLOSED: with no SUNO_API_KEY set it does a full DRY RUN — prints the
 * exact payload it WOULD send and exits 0 without ever calling the paid API.
 * Nothing here can charge you by accident.
 *
 * Provider contract (verified from docs.sunoapi.org, 2026-06):
 *   submit:  POST https://api.sunoapi.org/api/v1/generate
 *            body { customMode, instrumental, callBackUrl, model, prompt, style, title }
 *            -> { code:200, data:{ taskId } }
 *   poll:    GET  https://api.sunoapi.org/api/v1/generate/record-info?taskId=...
 *            -> data.status in PENDING|TEXT_SUCCESS|FIRST_SUCCESS|SUCCESS|*_FAILED|...
 *            -> on SUCCESS: data.response.sunoData[].audioUrl  (2 songs per task)
 *
 * Usage:
 *   node soniq/scripts/render-spike.mjs                 # dry run (no key) OR live (key set)
 *   node soniq/scripts/render-spike.mjs --lyrics my.txt --style "neo-soul, 70bpm, warm Rhodes" --title "Ocean"
 *   node soniq/scripts/render-spike.mjs --model V5 --instrumental
 *   node soniq/scripts/render-spike.mjs --dry           # force dry run even with a key
 *
 * Key: put SUNO_API_KEY in soniq/.env.local (or C:\Users\alvin\.env.local), e.g.
 *   SUNO_API_KEY=sk-...
 * Get one at https://sunoapi.org  (sign up, top up ~$5, copy the API key).
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..');          // C:\Users\alvin
const OUT_DIR   = join(REPO_ROOT, 'soniq-audio', '_spike');

// ── tiny .env.local loader (no dependency) ─────────────────────────────────
async function loadEnvFile(path) {
  if (!existsSync(path)) return;
  const txt = await readFile(path, 'utf8');
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const key = m[1];
    let val = m[2].replace(/^["']|["']$/g, '');
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
await loadEnvFile(join(__dirname, '..', '.env.local'));     // soniq/.env.local
await loadEnvFile(join(REPO_ROOT, '.env.local'));           // C:\Users\alvin\.env.local

// ── args ───────────────────────────────────────────────────────────────────
function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return def;
  const next = process.argv[i + 1];
  return next && !next.startsWith('--') ? next : true;      // bare flag => true
}

const CFG = {
  base:     process.env.SUNO_API_BASE || 'https://api.sunoapi.org',
  key:      process.env.SUNO_API_KEY || '',
  model:    String(arg('model', process.env.SUNO_MODEL || 'V4_5')),  // V4_5 = great quality / cheaper than V5
  callback: process.env.SUNO_CALLBACK_URL || 'https://example.com/noop', // we poll; callback unused but field is required
  title:    String(arg('title', 'SONIQ Spike — Ocean')),
  style:    String(arg('style', 'warm neo-soul, 72 BPM, vintage Rhodes, soft drums, intimate female vocal, analog tape')),
  instrumental: arg('instrumental', false) === true,
  dry:      arg('dry', false) === true,
  pollEveryMs: 10_000,
  maxPolls: 42,                                             // ~7 min ceiling
};

// Demo song so the script runs out-of-the-box. In production this {lyrics, style}
// pair is exactly what generate.js returns as { lyrics, sunoPrompt }.
const DEMO_LYRICS = `[Verse 1]
I keep your name like a coin in my coat
something to hold when the cold gets close
the city forgets but the streetlights know
every slow road that I drive alone

[Chorus]
I'm just a drop in your ocean
one small light on a wide dark sea
but you pull me in like the moon does
and I'd rather drown than be free

[Verse 2]
You laugh and the whole room leans in to listen
I'm a quiet thing in a loud tradition
but you found the frequency under my noise
and tuned every word back into a voice

[Chorus]
I'm just a drop in your ocean
one small light on a wide dark sea
but you pull me in like the moon does
and I'd rather drown than be free`;

async function loadLyrics() {
  const f = arg('lyrics', null);
  if (f && f !== true) return readFile(resolve(String(f)), 'utf8');
  return DEMO_LYRICS;
}

function H() { return { 'Authorization': `Bearer ${CFG.key}`, 'Content-Type': 'application/json' }; }

async function submit(prompt) {
  const body = {
    customMode:   true,
    instrumental: CFG.instrumental,
    callBackUrl:  CFG.callback,
    model:        CFG.model,
    prompt,                       // the lyrics (omit/ignored if instrumental)
    style:        CFG.style,      // the sunoPrompt
    title:        CFG.title,
  };
  const r = await fetch(`${CFG.base}/api/v1/generate`, { method: 'POST', headers: H(), body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.code !== 200 || !j?.data?.taskId) {
    throw new Error(`submit failed (${r.status}): ${j.msg || JSON.stringify(j).slice(0, 300)}`);
  }
  return j.data.taskId;
}

const DONE = new Set(['SUCCESS']);
const FAIL = new Set(['CREATE_TASK_FAILED', 'GENERATE_AUDIO_FAILED', 'CALLBACK_EXCEPTION', 'SENSITIVE_WORD_ERROR']);

async function poll(taskId) {
  for (let i = 1; i <= CFG.maxPolls; i++) {
    await new Promise(res => setTimeout(res, CFG.pollEveryMs));
    const r = await fetch(`${CFG.base}/api/v1/generate/record-info?taskId=${encodeURIComponent(taskId)}`, { headers: H() });
    const j = await r.json().catch(() => ({}));
    const status = j?.data?.status || 'UNKNOWN';
    const songs = j?.data?.response?.sunoData || [];
    process.stdout.write(`  [${String(i).padStart(2)}/${CFG.maxPolls}] ${status}${songs.length ? ` — ${songs.length} track(s)` : ''}\n`);
    if (FAIL.has(status)) throw new Error(`render failed: ${status} ${j?.data?.errorMessage || ''}`.trim());
    if (DONE.has(status) && songs.some(s => s.audioUrl)) return songs.filter(s => s.audioUrl);
  }
  throw new Error(`timed out after ~${(CFG.maxPolls * CFG.pollEveryMs) / 60000} min — task ${taskId} still rendering. Re-poll later.`);
}

async function download(song, idx) {
  const safe = CFG.title.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
  const out = join(OUT_DIR, `${safe}-${idx + 1}-${song.id?.slice(0, 8) || 'track'}.mp3`);
  const r = await fetch(song.audioUrl);
  if (!r.ok) throw new Error(`download failed (${r.status}) for ${song.audioUrl}`);
  await writeFile(out, Buffer.from(await r.arrayBuffer()));
  return out;
}

// ── main ────────────────────────────────────────────────────────────────────
const lyrics = await loadLyrics();
const prompt = CFG.instrumental ? '' : lyrics;

console.log('SONIQ Audio Render Spike — provider: sunoapi.org');
console.log('─'.repeat(64));
console.log(`title       : ${CFG.title}`);
console.log(`model       : ${CFG.model}`);
console.log(`instrumental: ${CFG.instrumental}`);
console.log(`style       : ${CFG.style}`);
console.log(`lyrics      : ${CFG.instrumental ? '(instrumental — none)' : `${lyrics.split('\n').length} lines, ${lyrics.length} chars`}`);
console.log(`output dir  : ${OUT_DIR}`);
console.log('─'.repeat(64));

if (!CFG.key || CFG.dry) {
  console.log(CFG.key ? '\n⏸  DRY RUN (--dry): not calling the API.\n' : '\n⏸  No SUNO_API_KEY found — DRY RUN, nothing was charged.\n');
  console.log('Payload that WOULD be POSTed to ' + CFG.base + '/api/v1/generate :\n');
  console.log(JSON.stringify({
    customMode: true, instrumental: CFG.instrumental, callBackUrl: CFG.callback,
    model: CFG.model, prompt: CFG.instrumental ? '' : '(lyrics above)', style: CFG.style, title: CFG.title,
  }, null, 2));
  if (!CFG.key) {
    console.log('\nTo render for real (~$0.10–0.40, returns 2 songs):');
    console.log('  1. Sign up at https://sunoapi.org and top up ~$5.');
    console.log('  2. Add to soniq/.env.local :  SUNO_API_KEY=your_key_here');
    console.log('  3. Re-run:  node soniq/scripts/render-spike.mjs');
  }
  process.exit(0);
}

try {
  console.log('\n▶  Submitting render task…');
  const taskId = await submit(prompt);
  console.log(`   taskId: ${taskId}`);
  console.log('▶  Polling (Suno usually finishes in 1–3 min)…');
  const songs = await poll(taskId);
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`\n✓  ${songs.length} track(s) rendered — downloading…`);
  const paths = [];
  for (let i = 0; i < songs.length; i++) paths.push(await download(songs[i], i));
  console.log('\n🎵  Done. SONIQ made the song:');
  paths.forEach(p => console.log('   ' + p));
  console.log('\nOpen one to listen, then we build the productized pipeline (Worker + R2 + /app button).');
} catch (e) {
  console.error('\n✗  ' + e.message);
  process.exit(1);
}
