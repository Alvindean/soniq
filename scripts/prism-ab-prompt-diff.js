#!/usr/bin/env node
/**
 * prism-ab-prompt-diff.js — FREE, node-only A/B PROMPT diff for the craft layer.
 *
 *   node scripts/prism-ab-prompt-diff.js
 *
 * Builds the SAME concept twice through brain.buildSongPrompt — once with every
 * craft directive forced 'on', once with every craft directive forced 'off' —
 * and reports what the ON build injects that the OFF build does not. This PROVES
 * the craft layer (Prince Method / Anti-Drop / Tresillo / Melodic / One-Note /
 * Chorus-in-Intro / Pop Drop / Ostinato) actually reaches the prompt text.
 *
 * NO network. NO model call. NO credits. Pure string comparison of the prompts
 * buildSongPrompt returns. Safe to run anytime.
 */

const brain = require('../api/_brain.js');

// ── Fixed concept (per spec): genre 'pop', a topic, structure 'standard' ──────
// pop is the broadest gate — it qualifies for the most directives, so the diff
// surfaces the largest set of named blocks. Phrase/seed left empty; this is a
// pure craft-layer A/B, not a phrase-flip test.
const BASE = {
  genre: 'pop',
  topic: 'the quiet kind of heartbreak, told from the angle of the room after they left',
  structure: 'standard',
  mood: 'Emotional',
  vocal: 'any',
  lyricTier: 'street',
  length: 'medium'
};

// The eight 'auto'|'on'|'off' craft directives the brain now exposes.
const DIRECTIVES = [
  'melodicUnity', 'antiDrop', 'tresillo', 'melodicCliche',
  'bassOstinato', 'chorusIntro', 'oneNoteMelody', 'popDrop'
];

function withMode(mode) {
  const p = Object.assign({}, BASE);
  for (const d of DIRECTIVES) p[d] = mode;
  return p;
}

// Named directive BLOCK signatures → the exact header literal emitted in the
// prompt body. (Sourced from api/_brain.js block templates.)
const BLOCKS = [
  { name: 'PRINCE METHOD',     marker: 'PRINCE METHOD — MELODIC UNITY' },
  { name: 'ANTI-DROP',         marker: 'ANTI-DROP — STRIPPED CHORUS' },
  { name: 'TRESILLO',          marker: 'TRESILLO (3-3-2)' },
  { name: 'MELODIC',           marker: 'MELODIC SHAPE TOUCHSTONES' },
  { name: 'ONE-NOTE',          marker: 'ONE-NOTE MELODY' },
  { name: 'CHORUS-IN-INTRO',   marker: 'CHORUS-IN-INTRO' },
  { name: 'POP DROP',          marker: 'POP DROP' },
  { name: 'OSTINATO',          marker: 'MELODIC BASSLINE — OSTINATO' }
];

function build(mode) {
  const out = brain.buildSongPrompt(withMode(mode));
  // buildSongPrompt returns { system, prompt }; the craft notes live in `prompt`.
  return String((out && out.prompt) || '');
}

const onPrompt = build('on');
const offPrompt = build('off');

const charDelta = onPrompt.length - offPrompt.length;

const injected = [];     // present in ON but NOT in OFF (the craft layer's work)
const alwaysOn = [];     // present in BOTH (genre default, not toggled by the lever)
const neverOn = [];      // absent from both (genre-gated out even when forced)
for (const b of BLOCKS) {
  const inOn = onPrompt.includes(b.marker);
  const inOff = offPrompt.includes(b.marker);
  if (inOn && !inOff) injected.push(b.name);
  else if (inOn && inOff) alwaysOn.push(b.name);
  else if (!inOn && !inOff) neverOn.push(b.name);
}

console.log('═══════════════════════════════════════════════════════════════');
console.log(' PRISM A/B PROMPT DIFF — craft layer ON vs OFF  (FREE, no network)');
console.log('═══════════════════════════════════════════════════════════════');
console.log('Concept: genre=' + BASE.genre + ', structure=' + BASE.structure +
            ', tier=' + BASE.lyricTier + ', length=' + BASE.length);
console.log('Directives toggled: ' + DIRECTIVES.join(', '));
console.log('');
console.log('Prompt length  ON : ' + onPrompt.length + ' chars');
console.log('Prompt length  OFF: ' + offPrompt.length + ' chars');
console.log('Char delta (ON-OFF): ' + (charDelta >= 0 ? '+' : '') + charDelta);
console.log('');
console.log('CRAFT BLOCKS INJECTED (in ON, not in OFF) — proves the layer fires:');
if (injected.length) injected.forEach(n => console.log('  ✓ ' + n));
else console.log('  (none)');
console.log('');
if (alwaysOn.length) {
  console.log('Present in BOTH (genre default for this concept, not lever-gated):');
  alwaysOn.forEach(n => console.log('  • ' + n));
  console.log('');
}
if (neverOn.length) {
  console.log('Absent from BOTH (genre-gated out even when forced ON):');
  neverOn.forEach(n => console.log('  · ' + n));
  console.log('');
}

// Exit non-zero if the craft layer proved INERT (nothing injected AND no growth)
// — that would mean the ON path failed to add anything, a real regression.
if (!injected.length && charDelta <= 0) {
  console.error('FAIL: craft layer injected nothing and ON prompt did not grow.');
  process.exit(1);
}
console.log('PASS: craft layer measurably changes the prompt when toggled ON.');
