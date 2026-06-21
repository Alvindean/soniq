#!/usr/bin/env node
/**
 * test-adlibs.js — offline (no AI / no credits) eyeball harness for the
 * ad-lib injection that actually reaches SONIQ song prompts via
 * buildSongPrompt() -> buildAdlibNote().
 *
 * Prints buildAdlibNote() output across a {genre x mood x substyle} matrix so
 * the mood-gating, substyle banks (RAP_STYLE_ADLIBS), and Suno parentheses
 * syntax can be reviewed by hand. ZERO API cost — pure function calls only.
 *
 * Run: node scripts/test-adlibs.js
 *      node scripts/test-adlibs.js --genre hiphop      # filter to one genre
 *      node scripts/test-adlibs.js --check             # invariant assertions, exit 1 on fail
 */
const b = require('../api/_brain.js');

const argv = process.argv.slice(2);
const getFlag = (name) => { const i = argv.indexOf('--' + name); return i >= 0 ? (argv[i + 1] || true) : null; };
const onlyGenre = getFlag('genre');
const checkMode = argv.includes('--check');

// Matrix. Genres pulled live from the exported ADLIB_BIBLE so new genres
// appear automatically. Moods exercise the mood-gate buckets; substyles
// exercise the RAP_STYLE_ADLIBS overlay (only meaningful for rap-family genres).
const GENRES = Object.keys(b.ADLIB_BIBLE);
const MOODS = ['aggressive', 'sad', 'euphoric', 'romantic', 'dark', 'triumphant', ''];
const SUBSTYLES = [null, 'Drill', 'Trap', 'Boom Bap', 'Phonk'];

function band(title) { return '\n' + '═'.repeat(72) + '\n' + title + '\n' + '═'.repeat(72); }

function dump() {
  for (const genre of GENRES) {
    if (onlyGenre && genre !== onlyGenre) continue;
    console.log(band('GENRE: ' + genre));
    for (const mood of MOODS) {
      // For non-rap genres the substyle overlay is a no-op, so only vary
      // substyle on rap-family genres to keep the dump readable.
      const subs = /hiphop|rap|trap|drill|grime/i.test(genre) ? SUBSTYLES : [null];
      for (const substyle of subs) {
        const note = b.buildAdlibNote(genre, mood, substyle);
        const head = `--- mood="${mood || '(none)'}" substyle="${substyle || '(none)'}" ---`;
        console.log('\n' + head + (note ? note : '\n[empty — genre not in ADLIB_BIBLE]'));
      }
    }
  }
}

// Lightweight invariants so this can double as a CI smoke test. None call AI.
function check() {
  let fails = 0;
  const ok = (cond, msg) => { console.log((cond ? '  PASS ' : '  FAIL ') + msg); if (!cond) fails++; };

  ok(typeof b.buildAdlibNote === 'function', 'buildAdlibNote is exported');
  ok(b.ADLIB_BIBLE && Object.keys(b.ADLIB_BIBLE).length > 0, 'ADLIB_BIBLE is exported and non-empty');

  const hip = b.buildAdlibNote('hiphop', 'aggressive', 'Drill');
  ok(/AD-LIBS \(Suno parentheses syntax/.test(hip), 'note carries Suno parentheses header');
  ok(/\([^)]+\)/.test(hip), 'sounds are wrapped in ( ) for Suno background layering');
  ok(/gang/.test(hip), 'Drill substyle bank merged in (expects "gang")');

  const sad = b.buildAdlibNote('rnb', 'sad', null);
  ok(/MOOD GATE — DO NOT USE/.test(sad) || /buckets: sad/.test(sad), 'sad mood produces a mood-gate / bucket line for rnb');

  const bad = b.buildAdlibNote('not-a-real-genre', 'happy', null);
  ok(bad === '', 'unknown genre returns empty string (safe)');

  console.log('\n' + (fails ? fails + ' CHECK(S) FAILED' : 'ALL CHECKS PASSED'));
  process.exit(fails ? 1 : 0);
}

if (checkMode) check(); else dump();
