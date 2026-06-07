#!/usr/bin/env node
/**
 * verify-song-engine.js — fast, offline (no AI / no credits) invariant checks
 * for the Flow lean-brief path and the cross-genre Modulation Engine (Wave 6).
 *
 * Run: node scripts/verify-song-engine.js
 * Exit 0 = all pass, 1 = any failure. Safe to wire into CI.
 */
const b = require('../api/_brain.js');

let fails = 0;
const ok = (cond, msg) => { console.log((cond ? '  ✓ ' : '  ✗ ') + msg); if (!cond) fails++; };

const STRUCT_FULL = '[Intro][Verse 1][Pre-Chorus][Chorus][Verse 2][Chorus][Bridge][Final Chorus][Outro]';
const STRUCT_NOBRIDGE = '[Intro][Verse 1][Chorus][Verse 2][Final Chorus][Outro]';

// ── 1. Flow lean-brief keeps the 3 surfaced sections, drops the heavy tail ──
console.log('\nLEAN BRIEF (Flow path):');
{
  const base = { genre: 'rnb', topic: 'two a.m. apology', mood: 'Reflective', structure: 'standard', length: 'short' };
  const lean = b.buildSongPrompt({ ...base, leanBrief: true }).prompt;
  const full = b.buildSongPrompt({ ...base }).prompt;
  ['ARRANGEMENT BLUEPRINT:', 'VOCAL DIRECTION:', 'SONIC REFERENCES:'].forEach(s =>
    ok(lean.includes(s), `lean keeps "${s}"`));
  ['PLATFORM TIPS:', 'DOPAMINE MAP:', 'THEORY ANALYSIS:', 'VIDEO PROMPT:'].forEach(s =>
    ok(!lean.includes(s), `lean drops heavy-tail "${s}"`));
  ok(full.includes('PLATFORM TIPS:') && full.includes('VIDEO PROMPT:'), 'full path keeps the heavy tail (Write/Lucky unaffected)');
}

// ── 2. Modulation engine: genre-lock (no cross-genre archetype leakage) ──
console.log('\nMODULATION — genre-lock (300 forced rolls / genre):');
{
  const PREFS = b.GENRE_MODULATION_PREFS;
  let leaks = 0, checked = 0;
  for (const g of Object.keys(PREFS)) {
    const pool = PREFS[g].pool;
    for (let i = 0; i < 300; i++) {
      const n = b.buildModulationNote({ genre: g, mood: 'Reflective', structStr: STRUCT_FULL, key: 'C', mode: 'on' });
      const m = n.match(/OPPORTUNITY — "([^"]+)"/); if (!m) continue; checked++;
      if (!pool.includes(m[1])) leaks++;
    }
  }
  ok(leaks === 0, `genre-lock holds (${checked} picks, ${leaks} out-of-pool leaks)`);
}

// ── 3. Modulation engine: gates ──
console.log('\nMODULATION — gates:');
ok(b.buildModulationNote({ genre: 'pop', structStr: STRUCT_FULL, freestyleMode: true, mode: 'on' }) === '', 'freestyle bars → no modulation');
ok(b.buildModulationNote({ genre: 'pop', structStr: STRUCT_FULL, hookStyle: 'Final-Chorus Key Change', mode: 'on' }) === '', 'key-moving hookStyle → engine defers');
ok(b.buildModulationNote({ genre: 'pop', structStr: STRUCT_FULL, mode: 'off' }) === '', 'mode:off → silent');
ok(b.buildModulationNote({ genre: 'pop', structStr: '[Verse][Outro]', mode: 'on' }) === '', 'no chorus/bridge → nothing to pivot around');
{
  let bridgeLeak = 0;
  for (let i = 0; i < 300; i++) {
    const n = b.buildModulationNote({ genre: 'altrock', structStr: STRUCT_NOBRIDGE, mode: 'on' });
    if (/Relative Shift|Parallel-Mode Flip|Down-Modulation/.test(n)) bridgeLeak++;
  }
  ok(bridgeLeak === 0, `no-bridge song never gets a bridge-only archetype (${bridgeLeak} leaks/300)`);
}

// ── 4. Modulation engine: mood organically biases tension vs momentum ──
console.log('\nMODULATION — mood bias (rock pool has both jobs, 400 rolls):');
{
  const jobOf = n => { const m = n.match(/\((TENSION[^)]*|MOMENTUM)\)/); return m ? m[1] : ''; };
  const rate = (mood, want) => {
    let hit = 0;
    for (let i = 0; i < 400; i++) {
      const j = jobOf(b.buildModulationNote({ genre: 'rock', mood, structStr: STRUCT_FULL, mode: 'on' }));
      if (want === 'tension' && j.startsWith('TENSION') && j !== 'TENSION + MOMENTUM') hit++;
      if (want === 'momentum' && j === 'MOMENTUM') hit++;
    }
    return hit / 400;
  };
  ok(rate('dark grief', 'tension') > 0.35, `dark mood leans tension (${(rate('dark grief','tension')*100|0)}%)`);
  ok(rate('triumphant joy', 'momentum') > 0.45, `bright mood leans momentum (${(rate('triumphant joy','momentum')*100|0)}%)`);
}

// ── 5. Modulation flows into both full and lean prompts + emits a [tag] ──
console.log('\nMODULATION — prompt integration:');
{
  const full = b.buildSongPrompt({ genre: 'pop', topic: 'leaving at dawn', mood: 'Bittersweet', structure: 'standard', length: 'medium', modulation: 'on' }).prompt;
  const lean = b.buildSongPrompt({ genre: 'rnb', topic: 'apology', mood: 'Reflective', structure: 'standard', length: 'short', leanBrief: true, modulation: 'on' }).prompt;
  ok(/MODULATION OPPORTUNITY/.test(full), 'full prompt carries the modulation directive');
  ok(/MODULATION OPPORTUNITY/.test(lean), 'Flow lean prompt carries it too');
  ok(/\[(Modulation|Borrowed|Secondary Dominant|Beat Switch)[^\]]*\]/.test(full), 'directive includes an explicit [tag]');
}

console.log(`\n${fails === 0 ? 'ALL PASS ✓' : fails + ' FAILURE(S) ✗'}`);
process.exit(fails === 0 ? 0 : 1);
