/**
 * SONIQ Loop Anchor — Lever #N
 * Architects the whole song around a user-supplied "anchor phrase" (e.g.
 * "tell me where it hurts", "started from the bottom"). The phrase loops as
 * BOTH the lyric refrain AND a Suno-style audio transform, so verses, bridge,
 * and outro all orbit the same load-bearing center.
 *
 * Server-side only — never expose this file to the client. The transform map
 * IS the IP; only the resolved prefix string and the brain-prompt note ever
 * reach the LLM / Suno.
 *
 * Usage:
 *   const LA = require('./_loop_anchor');
 *   const v   = LA.validatePhrase(userInput);          // gate the UI
 *   const tx  = LA.selectAnchorTransform({ genre, substyle, mood });
 *   const note = LA.buildLoopAnchorNote({ phrase: v.normalized, genre, substyle, mood });
 *   // ...then append `note` to the brain prompt and `tx.sunoStylePrefix` to the Suno style line.
 */

// ── Phrase scoring constants ─────────────────────────────────────────────────
const STRONG_CONSONANTS = ['t','k','p','s','b','d','g','sh','ch'];
const OPEN_VOWEL_PATTERNS = [
  /\b\w*aa\w*\b/i,  /\b\w*ee\w*\b/i,  /\b\w*oo\w*\b/i,
  /\b\w*ay\w*\b/i,  /\b\w*ai\w*\b/i,  /\b\w*ey\w*\b/i,
  /\b\w*oh\b/i,     /\b\w*ah\b/i,     /\b\w*aw\w*\b/i,
  /\bme\b/i,        /\bbe\b/i,        /\bsee\b/i,
  /\bgo\b/i,        /\bno\b/i,        /\bso\b/i,
  /\bday\b/i,       /\bway\b/i,       /\bsay\b/i,
  /\b\w+e\b/i,      // word ending in -e is still a fallback signal (lower-confidence)
];
const THIRD_PERSON = ['she','he','they','them','him','her','his','hers','their','theirs'];
const ABSTRACT_EMOTIONS = [
  'sad','happy','lonely','scared','hopeful','angry','joyful','depressed',
  'anxious','excited','peaceful','grateful','blessed','broken','hurting',
];
// Words that look like proper nouns but are anchor-phrase-acceptable. Add
// sparingly — anything in here bypasses the proper-noun penalty.
const PROPER_NOUN_EXCEPTIONS = new Set([
  'dior','god','lord','jesus','allah','mama','daddy','pops','yeah','yeh','oh',
  'i','i\'m','i\'ll','i\'d','i\'ve',
]);

// ── Cross-genre transform map ────────────────────────────────────────────────
// Each entry produces the same shape: loopStyle, sunoStylePrefix, placement,
// audioTransform, lyricArchitecture, referenceTrack, bucket. The architect at
// the bottom of the file looks these up by substyle first, then genre, then
// falls back to GENERIC_DEFAULT.
const TRANSFORMS = {
  toronto_dry: {
    loopStyle: 'toronto_dry',
    sunoStylePrefix: '[dry vocal let-ring, marimba conga answer, no chop, slight pitch-bend tail]',
    bucket: 'sustain_refrain',
    audioTransform: 'Vocal sits dry and forward, no chop. Marimba/conga answers between phrases. Slight pitch-bend tail on the last syllable of each pass.',
    referenceTrack: 'Drake — "Hotline Bling"',
  },
  kanye_chop: {
    loopStyle: 'kanye_chop',
    sunoStylePrefix: '[chopped soul vocal sample, pitched +5 semitones, vinyl crackle, MPC swing, sidechain duck under kick]',
    bucket: 'rap_chop',
    audioTransform: 'Chop the phrase into 1–2 syllable hits, pitch them +5 semitones, sit them on the downbeat with MPC swing. Vinyl crackle bed underneath, sidechain duck on the kick.',
    referenceTrack: 'Kanye West — "Through the Wire"',
  },
  sicko_mode: {
    loopStyle: 'sicko_mode',
    sunoStylePrefix: '[doubled octave-down ad-lib loop, autotuned, reverb tail bleeds into 808 slide]',
    bucket: 'rap_chop',
    audioTransform: 'Doubled octave-down ad-lib of the phrase loops as the hook. Autotuned, long reverb tail that bleeds directly into the next 808 slide.',
    referenceTrack: 'Travis Scott — "Sicko Mode"',
  },
  drill_chant: {
    loopStyle: 'drill_chant',
    sunoStylePrefix: '[group shout chant, slight detune layer, sliding 808, no melodic processing]',
    bucket: 'call_response',
    audioTransform: 'Group shout chant on the phrase, slight detune layer for grit. Sliding 808 underneath. No melodic processing — keep it dry and aggressive.',
    referenceTrack: 'Pop Smoke — "Dior"',
  },
  phonk_pitched_down: {
    loopStyle: 'phonk_pitched_down',
    sunoStylePrefix: '[pitched-down vocal loop -4 semitones, tape saturation, cowbell, sidechained 808]',
    bucket: 'rap_chop',
    audioTransform: 'Pitch the phrase down 4 semitones, loop it under tape saturation. Cowbell on the offbeat, 808 heavily sidechained.',
    referenceTrack: 'DJ Smokey — Memphis lift',
  },
  lofi_dusty: {
    loopStyle: 'lofi_dusty',
    sunoStylePrefix: '[dusty pitched-down vocal loop, vinyl crackle, tape hiss, low-pass filter, no sharp transients]',
    bucket: 'sustain_refrain',
    audioTransform: 'Pitch the phrase down slightly and loop it low and warm under vinyl crackle and tape hiss. Low-pass the top end, soften every transient — no bright attacks. Head-nod, hazy, behind-the-beat.',
    referenceTrack: 'lo-fi hip-hop head-nod tradition',
  },
  rock_anthem: {
    loopStyle: 'rock_anthem',
    sunoStylePrefix: '[double-tracked lead vocal, gang-vocal hook layer, driven guitar doubling the melody, live room drums]',
    bucket: 'sustain_refrain',
    audioTransform: 'Double-track the hook vocal; gang vocals join on the final chorus. Distorted guitar doubles the vocal contour. Live room drums, no chops.',
    referenceTrack: 'stadium-rock anthem tradition',
  },
  metal_chant: {
    loopStyle: 'metal_chant',
    sunoStylePrefix: '[layered gang chant, palm-muted guitar chug under the phrase, double-kick, no melodic FX]',
    bucket: 'call_response',
    audioTransform: 'Layered gang chant on the phrase over a palm-muted chug. Double-kick locks the grid. No autotune, no melodic processing.',
    referenceTrack: 'groove-metal chant tradition',
  },
  reggae_riddim: {
    loopStyle: 'reggae_riddim',
    sunoStylePrefix: '[one-drop riddim, offbeat skank guitar, dub delay throw on the phrase tail, deep bass]',
    bucket: 'call_response',
    audioTransform: 'Phrase rides the one-drop. Skank guitar on the offbeat; a dub delay throws the last word into the next bar. Bass carries the root.',
    referenceTrack: 'roots-reggae riddim tradition',
  },
  cloud_loop: {
    loopStyle: 'cloud_loop',
    sunoStylePrefix: '[reverbed mumble loop, hazy delay, ethereal pad bed]',
    bucket: 'sustain_refrain',
    audioTransform: 'Phrase mumbled through long reverb and hazy delay. Ethereal pad bed throughout — no hard transients on the vocal.',
    referenceTrack: 'Lil Yachty — cloud era',
  },
  rnb_anchor_sustain: {
    loopStyle: 'rnb_anchor_sustain',
    sunoStylePrefix: '[wet plate reverb, doubled in thirds, sustained final vowel, breath kept in]',
    bucket: 'sustain_refrain',
    audioTransform: 'Wet plate reverb, doubled in thirds on the final word. Sustain the last vowel, keep the breath in the take.',
    referenceTrack: 'Sade — "No Ordinary Love"',
  },
  dangelo_question: {
    loopStyle: 'dangelo_question',
    sunoStylePrefix: '[behind-the-beat vocal, dry stacked harmonies, Rhodes answer, swung against kick]',
    bucket: 'call_response',
    audioTransform: 'Vocal sits behind the beat, dry stacked harmonies on the phrase. Rhodes answers each pass. Swung against the kick — never locked.',
    referenceTrack: 'D\'Angelo — "Untitled (How Does It Feel)"',
  },
  gospel_vamp: {
    loopStyle: 'gospel_vamp',
    sunoStylePrefix: '[live room vamp, organ swells, choir call-and-response, half-step modulation per cycle, drummer pushing tempo]',
    bucket: 'vamp',
    audioTransform: 'Live room vamp on the phrase. Organ swells, choir does call-and-response. Half-step modulation each cycle, drummer pushes tempo.',
    referenceTrack: 'Hezekiah Walker — "Every Praise"',
  },
  soul_one_chord_vamp: {
    loopStyle: 'soul_one_chord_vamp',
    sunoStylePrefix: '[one-chord vamp, single-take vocal, tambourine, no chops]',
    bucket: 'vamp',
    audioTransform: 'One-chord vamp underneath. Single-take vocal, no chops. Tambourine keeps the grid.',
    referenceTrack: 'Staple Singers — "I\'ll Take You There"',
  },
  max_martin_post_chorus: {
    loopStyle: 'max_martin_post_chorus',
    sunoStylePrefix: '[clean lead + stacked octave-up post-chorus, marimba pluck doubling syllables]',
    bucket: 'sustain_refrain',
    audioTransform: 'Clean lead on the chorus, stacked octave-up doubles on the post-chorus. Marimba pluck doubles each syllable of the phrase.',
    referenceTrack: 'Ed Sheeran — "Shape of You"',
  },
  country_refrain: {
    loopStyle: 'country_refrain',
    sunoStylePrefix: '[acoustic guitar + pedal steel, dry vocal, room reverb, crowd singalong final chorus]',
    bucket: 'sustain_refrain',
    audioTransform: 'Acoustic guitar and pedal steel hold the bed. Dry vocal with room reverb. Final chorus turns the phrase into a crowd singalong.',
    referenceTrack: 'Garth Brooks — "Friends in Low Places"',
  },
  folk_refrain: {
    loopStyle: 'folk_refrain',
    sunoStylePrefix: '[single guitar + voice, no doubling, no FX, refrain at end of each verse]',
    bucket: 'sustain_refrain',
    audioTransform: 'One guitar, one voice, no doubling, no FX. The phrase lands as a refrain at the end of each verse.',
    referenceTrack: 'Bob Dylan — "Blowin\' in the Wind"',
  },
  edm_vocal_chop: {
    loopStyle: 'edm_vocal_chop',
    sunoStylePrefix: '[vocal chopped per beat on drop, pitched in key with synth lead, heavy sidechain, reverb tail on last chop]',
    bucket: 'filter_sweep',
    audioTransform: 'Chop the phrase per beat across the drop, pitched in key with the synth lead. Heavy sidechain. Reverb tail extends the last chop into the next bar.',
    referenceTrack: 'Avicii — "Wake Me Up"',
  },
  house_filter_sweep: {
    loopStyle: 'house_filter_sweep',
    sunoStylePrefix: '[dry vocal stab, filter sweep open/close across 16 bars, piano stab answer]',
    bucket: 'filter_sweep',
    audioTransform: 'Dry vocal stab on the phrase. Filter sweep opens and closes across 16 bars. Piano stab answers between passes.',
    referenceTrack: 'Crystal Waters — "Gypsy Woman"',
  },
  burial_stretch: {
    loopStyle: 'burial_stretch',
    sunoStylePrefix: '[time-stretched vocal fragment, +/-2 semitone shifts, vinyl crackle, sub-bass underneath]',
    bucket: 'rap_chop',
    audioTransform: 'Time-stretch fragments of the phrase, shift ±2 semitones between passes. Vinyl crackle bed, sub-bass underneath, never lock the grid.',
    referenceTrack: 'Burial — "Archangel"',
  },
  amapiano_logdrum: {
    loopStyle: 'amapiano_logdrum',
    sunoStylePrefix: '[dry vocal stab on log-drum hits, panned, doubled with log-drum, shaker swing, 112 BPM]',
    bucket: 'vocal_stab',
    audioTransform: 'Drop the phrase as a dry vocal stab on the log-drum hits. Pan it wide, double it with the log-drum itself. Shaker swing at 112 BPM.',
    referenceTrack: 'Major League DJz / Focalistic — "Ke Star"',
  },
  afrobeats_stab: {
    loopStyle: 'afrobeats_stab',
    sunoStylePrefix: '[lightly autotuned lead, doubled octave-up sparingly, log-drum or shekere answer]',
    bucket: 'vocal_stab',
    audioTransform: 'Lightly autotuned lead on the phrase, doubled octave-up sparingly on the final word. Log-drum or shekere answers each pass.',
    referenceTrack: 'Wizkid — "Essence"',
  },
  reggaeton_coro: {
    loopStyle: 'reggaeton_coro',
    sunoStylePrefix: '[dry lead + whispered double, gang vocal answer, dembow pattern locked]',
    bucket: 'call_response',
    audioTransform: 'Dry lead on the phrase with a whispered double underneath. Gang vocal answers. Dembow pattern stays locked.',
    referenceTrack: 'Luis Fonsi — "Despacito"',
  },
  latin_coro: {
    loopStyle: 'latin_coro',
    sunoStylePrefix: '[salsa montuno coro, gang response, horn section answer, percussion grid]',
    bucket: 'call_response',
    audioTransform: 'Salsa montuno coro on the phrase. Gang response after each call. Horn section answers between cycles. Percussion grid never breaks.',
    referenceTrack: 'Marc Anthony — montuno tradition',
  },
  kpop_postchorus: {
    loopStyle: 'kpop_postchorus',
    sunoStylePrefix: '[clean stacked harmonies, layered ad-lib yeahs, sidechain pump on post-chorus]',
    bucket: 'sustain_refrain',
    audioTransform: 'Clean stacked harmonies on the phrase. Layered ad-lib yeahs between passes. Sidechain pump kicks in on the post-chorus.',
    referenceTrack: 'NewJeans — "Super Shy"',
  },
  altrock_singalong: {
    loopStyle: 'altrock_singalong',
    sunoStylePrefix: '[double-tracked chorus, gang vocal on final, slight tape saturation]',
    bucket: 'sustain_refrain',
    audioTransform: 'Double-track the chorus on the phrase. Gang vocal joins on the final pass. Slight tape saturation glues it.',
    referenceTrack: 'The Killers — "Mr. Brightside"',
  },
  punk_chant: {
    loopStyle: 'punk_chant',
    sunoStylePrefix: '[gang shout chant, abrupt no-fade outro, no melodic processing]',
    bucket: 'call_response',
    audioTransform: 'Gang shout chant on the phrase. Abrupt no-fade outro. No melodic processing — keep it raw.',
    referenceTrack: 'Ramones / Fall Out Boy chant tradition',
  },
  jazz_scat_anchor: {
    loopStyle: 'jazz_scat_anchor',
    sunoStylePrefix: '[scat motif over single chord, brushed snare, upright bass walk, solo section variations]',
    bucket: 'vamp',
    audioTransform: 'Scat motif on the phrase over a single chord. Brushed snare, upright bass walks. Solo section riffs variations on the phrase.',
    referenceTrack: 'Ella Fitzgerald — "How High the Moon"',
  },
  blues_call_response: {
    loopStyle: 'blues_call_response',
    sunoStylePrefix: '[guitar answers each vocal phrase, turnaround marker every 4 bars, dry vocal]',
    bucket: 'call_response',
    audioTransform: 'Vocal calls the phrase, guitar answers. Turnaround marker every 4 bars. Dry vocal, no chops.',
    referenceTrack: 'Howlin\' Wolf / Muddy Waters tradition',
  },
  hyperpop_glitch: {
    loopStyle: 'hyperpop_glitch',
    sunoStylePrefix: '[bit-crushed pitch-jump per syllable, glitch stutter, tape wow, detuned synth doubling]',
    bucket: 'rap_chop',
    audioTransform: 'Bit-crush the phrase, pitch-jump per syllable. Glitch stutter on the last word. Tape wow underneath, detuned synth doubles the contour.',
    referenceTrack: '100 gecs — "money machine"',
  },
  generic_refrain: {
    loopStyle: 'generic_refrain',
    sunoStylePrefix: '[dry vocal refrain, doubled lightly on final chorus, no chop]',
    bucket: 'sustain_refrain',
    audioTransform: 'Dry vocal refrain on the phrase. Light doubling on the final chorus. No chop.',
    referenceTrack: 'pop refrain default',
  },
};

// ── Bucket → placement zones + lyric architecture ────────────────────────────
const BUCKET_PLACEMENT = {
  rap_chop:       ['intro','chorus','post-chorus','outro'],
  vocal_stab:     ['chorus','post-chorus','outro'],
  filter_sweep:   ['intro','drop','breakdown','outro'],
  sustain_refrain:['chorus','bridge-tail','outro'],
  vamp:           ['intro','chorus','vamp-outro'],
  call_response:  ['chorus','bridge','outro'],
};
const BUCKET_LYRIC_ARCH = {
  rap_chop: {
    verses: 'Present-day flexes/struggles anchored to the phrase as setup-payoff. Each bar should land into the phrase like a punchline catch.',
    bridge: 'Beat switch. Either introduce a new anchor or strip the phrase entirely — empty space sets up the return.',
    outro:  'Phrase looped alone with ad-libs. No new lyric content — let the loop carry it out.',
  },
  vocal_stab: {
    verses: 'Verses in the native language/style sit over the same groove. The phrase functions as the identity marker, dropped on log-drum/shekere/horn hits.',
    bridge: 'Instrumental solo (log-drum, shekere, or horns). Vocal drops out — the groove answers.',
    outro:  'Stab fades into the percussion bed. Phrase repeats sparser each pass until only the percussion answer remains.',
  },
  filter_sweep: {
    verses: 'Verses are thin or absent. The phrase IS the song — narrative is carried by the arrangement.',
    bridge: 'Full breakdown — drums drop, filter closes, phrase whispers through.',
    outro:  'Filter sweep open across the final 16 bars, phrase fragments riding the sweep until cut.',
  },
  sustain_refrain: {
    verses: 'Verses describe the scenes/causes that justify the phrase. Build evidence — by the chorus the phrase reads as earned conclusion.',
    bridge: 'Intensify vocally — climb register or stack harmonies. Lyric content departs from the phrase so the return hits harder.',
    outro:  'Vamp the phrase with ad-libs. Doubles and harmonies stack, never resolve the suspension.',
  },
  vamp: {
    verses: 'Verses minimal — the song IS the vamp. Lyric variations on the phrase rather than new sections.',
    bridge: 'Modulation or solo every 8–16 bars. The phrase persists; only the harmony moves.',
    outro:  'Never resolve. Vamp keeps cycling, optional half-step climbs, and the track just stops — no fade-out, no resolution.',
  },
  call_response: {
    verses: 'Verses are the call — the lead carries the lyric. The phrase is the response, often a gang vocal.',
    bridge: 'Guest verse or solo break. The response can rest here; when it returns it lands louder.',
    outro:  'Response alone — gang vocal repeats the phrase without the call, until cut.',
  },
};

// ── Phrase normalization + syllable counting ─────────────────────────────────
function _stripTags(s) {
  return String(s || '')
    // strip brackets/parens content
    .replace(/[\[\(\{][^\]\)\}]*[\]\)\}]/g, ' ')
    // strip emojis & non-ASCII
    .replace(/[^\x20-\x7E]/g, ' ')
    // collapse whitespace
    .replace(/\s+/g, ' ')
    // strip leading/trailing punctuation
    .replace(/^[\s\W_]+|[\s\W_]+$/g, '')
    .trim();
}

function _normalize(phrase) {
  const stripped = _stripTags(phrase);
  return stripped.slice(0, 80);
}

/**
 * _escapePhrase — neutralizes prompt-injection markers in the user phrase
 * BEFORE it gets interpolated into the brain's LLM directive. The phrase
 * already passed sanitizeLoopAnchor's printable-ASCII gate, but free-form
 * tokens like `SYSTEM:`, triple-quotes, and angle markers can still steer
 * the model. Strip or substitute them.
 */
function _escapePhrase(s) {
  if (!s || typeof s !== 'string') return '';
  let out = s;
  // Strip prompt-marker sequences (case-insensitive)
  out = out.replace(/(>>>|<<<|```)/g, '');
  out = out.replace(/\b(system|assistant|user)\s*:/gi, '');
  out = out.replace(/\bignore\s+previous\s+instructions\b/gi, '');
  out = out.replace(/\boverride\s*:/gi, '');
  // Strip stray quotes that could break our own quoted interpolation
  out = out.replace(/[`"]/g, '');
  // Collapse whitespace
  out = out.replace(/\s+/g, ' ').trim();
  return out;
}

/**
 * _countSyllables — simple vowel-group heuristic. Good enough for English
 * anchor phrases (2–8 syllables). Counts vowel runs, subtracts trailing
 * silent-e, adds 1 if word ends in 'le' after a consonant.
 */
function _countSyllables(text) {
  if (!text) return 0;
  const words = String(text).toLowerCase().split(/\s+/).filter(Boolean);
  let total = 0;
  for (const raw of words) {
    const w = raw.replace(/[^a-z]/g, '');
    if (!w) continue;
    // count vowel groups
    const groups = w.match(/[aeiouy]+/g) || [];
    let count = groups.length;
    // silent-e at end (but not "le" after consonant)
    if (w.length > 2 && w.endsWith('e') && !/[aeiouy]e$/.test(w)) {
      if (!(w.endsWith('le') && !/[aeiouy]le$/.test(w))) {
        if (count > 1) count -= 1;
      }
    }
    // "le" after consonant adds a syllable if not already counted
    if (w.length > 2 && w.endsWith('le') && !/[aeiouy]le$/.test(w)) {
      // already accounted for by the vowel group; no-op
    }
    if (count < 1) count = 1;
    total += count;
  }
  return total;
}

// ── Phrase score components ──────────────────────────────────────────────────
function _hasStrongConsonant(text) {
  const t = String(text).toLowerCase();
  return STRONG_CONSONANTS.some(c => t.includes(c));
}
function _hasOpenVowel(text) {
  return OPEN_VOWEL_PATTERNS.some(rx => rx.test(text));
}
function _hasThirdPerson(text) {
  const tokens = String(text).toLowerCase().split(/[^a-z']+/).filter(Boolean);
  return tokens.some(t => THIRD_PERSON.includes(t));
}
function _hasAbstractEmotion(text) {
  const tokens = String(text).toLowerCase().split(/[^a-z']+/).filter(Boolean);
  return tokens.some(t => ABSTRACT_EMOTIONS.includes(t));
}
function _findProperNouns(text) {
  // Capitalized words NOT at sentence-start, not in exception list.
  const tokens = String(text).split(/\s+/);
  const offenders = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i].replace(/^[^\w']+|[^\w']+$/g, '');
    if (!t) continue;
    if (i === 0) continue; // sentence-start is fine
    if (PROPER_NOUN_EXCEPTIONS.has(t.toLowerCase())) continue;
    if (/^[A-Z][a-z]+/.test(t)) offenders.push(t);
  }
  return offenders;
}

/**
 * _phraseScore — composite 0–100 across the universal rules.
 * Returns { score, issues } so validatePhrase can surface them.
 */
function _phraseScore(normalized) {
  const issues = [];
  let score = 0;

  // 1) Syllable fit (35 pts)
  const syl = _countSyllables(normalized);
  if (syl >= 3 && syl <= 5) {
    score += 35;
  } else if (syl === 2 || syl === 6) {
    score += 28;
  } else if (syl === 7 || syl === 8) {
    score += 20;
    issues.push(`${syl} syllables — on the edge, aim for 3–5.`);
  } else if (syl < 2) {
    issues.push(`${syl} syllable${syl === 1 ? '' : 's'} — too short, min 2.`);
  } else {
    issues.push(`${syl} syllables — too long, max 8.`);
  }

  // 2) Consonant/vowel mix (20 pts)
  const sc = _hasStrongConsonant(normalized);
  const ov = _hasOpenVowel(normalized);
  if (sc && ov) score += 20;
  else if (sc || ov) { score += 10; issues.push(sc ? 'Lacks an open vowel sound — anchor phrases need a singable vowel.' : 'Lacks a strong consonant — phrase will mush in the mix.'); }
  else issues.push('Lacks both a strong consonant and an open vowel — phrase will not stick.');

  // 3) Proper noun check (15 pts) — soft penalty, warning not blocker
  const propers = _findProperNouns(normalized);
  if (propers.length === 0) {
    score += 15;
  } else {
    score += 5;
    issues.push(`Contains proper noun${propers.length > 1 ? 's' : ''} "${propers.join(', ')}" — anchor phrases usually avoid names (exceptions like "Dior" do exist).`);
  }

  // 4) Person check (15 pts) — first/second person rewarded, third penalized
  if (_hasThirdPerson(normalized)) {
    score += 4;
    issues.push('Uses third-person pronouns (she/he/they) — anchor phrases prefer first/second person ("I/you/we").');
  } else {
    score += 15;
  }

  // 5) Concrete imagery (15 pts) — penalize abstract emotion words
  if (_hasAbstractEmotion(normalized)) {
    score += 5;
    issues.push('Contains an abstract emotion word (sad/happy/lonely/scared/hopeful) — anchor phrases want concrete imagery, not labels.');
  } else {
    score += 15;
  }

  if (score > 100) score = 100;
  if (score < 0) score = 0;
  return { score, syllables: syl, issues };
}

// ── Style classifier ─────────────────────────────────────────────────────────
/**
 * _classifyLoopStyle — resolution order: substyle regex → genre default →
 * GENERIC. Returns the TRANSFORMS key.
 */
function _classifyLoopStyle({ genre, substyle }) {
  const g = String(genre || '').toLowerCase().trim();
  const s = String(substyle || '').trim();

  // Substyle regex matches first — most specific wins.
  if (s) {
    if (/OVO|Toronto|Melodic Rap/i.test(s)) return 'toronto_dry';
    if (/Boom Bap|Soul Sample|chop/i.test(s)) return 'kanye_chop';
    if (/Drill|UK Drill/i.test(s)) return 'drill_chant';
    if (/Phonk/i.test(s)) return 'phonk_pitched_down';
    if (/Cloud Rap/i.test(s)) return 'cloud_loop';
    if (/Trap/i.test(s)) return 'sicko_mode';
    if (/Gospel-?House|House/i.test(s)) return 'house_filter_sweep';
    if (/Garage|2-?step|Future Garage/i.test(s)) return 'burial_stretch';
    if (/Amapiano/i.test(s)) return 'amapiano_logdrum';
    if (/Lo-?fi/i.test(s)) return 'lofi_dusty';
  }

  // Genre defaults.
  switch (g) {
    case 'hiphop':    return 'sicko_mode';           // Trap is the modern default
    case 'rnb':       return 'rnb_anchor_sustain';
    case 'neosoul':   return 'dangelo_question';
    case 'gospel':    return 'gospel_vamp';
    case 'pop':       return 'max_martin_post_chorus';
    case 'country':   return 'country_refrain';
    case 'folk':      return 'folk_refrain';
    case 'ss':        return 'folk_refrain';
    case 'edm':       return 'edm_vocal_chop';
    case 'amapiano':  return 'amapiano_logdrum';
    case 'afrobeats': return 'afrobeats_stab';
    case 'reggaeton': return 'reggaeton_coro';
    case 'latin':     return 'latin_coro';
    case 'kpop':      return 'kpop_postchorus';
    case 'altrock':   return 'altrock_singalong';
    case 'punk':      return 'punk_chant';
    case 'rock':      return 'rock_anthem';
    case 'metal':     return 'metal_chant';
    case 'reggae':    return 'reggae_riddim';
    case 'jazz':      return 'jazz_scat_anchor';
    case 'blues':     return 'blues_call_response';
    case 'hyperpop':  return 'hyperpop_glitch';
    default:          return 'generic_refrain';
  }
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * validatePhrase
 * @param {string} phrase — raw user input
 * @returns {{ok:boolean, syllables:number, issues:string[], score:number, normalized:string}}
 */
exports.validatePhrase = function validatePhrase(phrase) {
  // Defensive: null/undefined/empty
  if (phrase === null || phrase === undefined) {
    return { ok: false, syllables: 0, issues: ['No phrase provided.'], score: 0, normalized: '' };
  }
  const normalized = _normalize(phrase);
  if (!normalized) {
    return { ok: false, syllables: 0, issues: ['Phrase is empty after sanitization.'], score: 0, normalized: '' };
  }

  const { score, syllables, issues } = _phraseScore(normalized);
  const ok = score >= 60 && syllables >= 2 && syllables <= 8;

  return { ok, syllables, issues, score, normalized };
};

/**
 * selectAnchorTransform
 * @param {object} input
 * @param {string} input.genre
 * @param {string} [input.substyle]
 * @param {string} [input.mood]   — currently unused, reserved for future mood-tuned variants
 * @returns {{
 *   loopStyle:string, sunoStylePrefix:string, placement:string[],
 *   audioTransform:string, lyricArchitecture:{verses:string,bridge:string,outro:string},
 *   referenceTrack:string, bucket:string
 * }}
 */
exports.selectAnchorTransform = function selectAnchorTransform({ genre, substyle, mood } = {}) {
  void mood; // reserved
  const key = _classifyLoopStyle({ genre, substyle });
  const t = TRANSFORMS[key] || TRANSFORMS.generic_refrain;
  const placement = BUCKET_PLACEMENT[t.bucket] || BUCKET_PLACEMENT.sustain_refrain;
  const lyricArchitecture = BUCKET_LYRIC_ARCH[t.bucket] || BUCKET_LYRIC_ARCH.sustain_refrain;
  return {
    loopStyle:        t.loopStyle,
    sunoStylePrefix:  t.sunoStylePrefix,
    placement:        placement.slice(),
    audioTransform:   t.audioTransform,
    lyricArchitecture: {
      verses: lyricArchitecture.verses,
      bridge: lyricArchitecture.bridge,
      outro:  lyricArchitecture.outro,
    },
    referenceTrack:   t.referenceTrack,
    bucket:           t.bucket,
  };
};

/**
 * buildLoopAnchorNote — appended to song prompts. Tells the LLM the anchor
 * phrase is load-bearing, locks it into every placement zone, specifies the
 * audio transform for the Suno style string, and directs section behaviour.
 * Returns '' (empty string) if phrase is empty/invalid — caller may skip
 * injection cleanly.
 */
exports.buildLoopAnchorNote = function buildLoopAnchorNote({ phrase, genre, substyle, mood } = {}) {
  if (!phrase || typeof phrase !== 'string') return '';
  const clean = _normalize(phrase);
  if (!clean) return '';

  const tx = exports.selectAnchorTransform({ genre, substyle, mood });
  const zones = tx.placement.map(z => `"${z}"`).join(', ');
  const safe = _escapePhrase(clean);

  return `

🔁 LOOP ANCHOR LOCK (this phrase is the LOAD-BEARING center of the song — lyric AND music):

ANCHOR PHRASE (verbatim, do NOT paraphrase, do NOT translate, do NOT reword):
>>> ${safe} <<<

═══════════════════════════════════════════════════════════════
🎵 MUSICAL LOOP MANDATE — equal priority to the lyric side
═══════════════════════════════════════════════════════════════
The anchor is NOT just a lyric refrain. It is the song's signature AUDIO MOTIF
— a vocal sample that Suno must loop, chop, pitch, and reinforce as the central
production element. Treat the audio side with the same weight as genre and BPM.

LEAD TOKENS — the SONG PROMPT / "Full prompt" MUST begin with this exact bracket-tagged
audio-transform string, before genre, before BPM, before mood. This is the song's
primary sonic identity tag:
${tx.sunoStylePrefix}

REINFORCEMENT — the same SONG PROMPT must reference the looped vocal motif AGAIN
later in the string, using phrasing like:
"vocal phrase '${safe}' loops as the central motif throughout — appears at intro
stab, every chorus, post-chorus chop, and outro vamp"

PRODUCTION DIRECTION (plain English — for the engineer notes section):
${tx.audioTransform}

INLINE BRACKET TAGS — the lyric body MUST carry these production cues at the
exact sections listed below so Suno's parser locks the loop into the audio
arrangement (not just sings the words):
- Top of [Intro]:        [Vocal stab: "${safe}"]
- Top of [Chorus]:       [Hook Loop: "${safe}"]
- Top of [Post-Chorus]:  [Chop & loop "${safe}" — pitched/filtered per transform]
- Top of [Bridge]:       [Loop strips out — phrase returns at bar 4]
- Top of [Outro]:        [Loop vamps with ad-libs — fade or abrupt cut per transform]

SUNO PROMPT SELF-CHECK — before finalizing, read the SONG PROMPT aloud. Does it
scream "this vocal phrase loops as the hook"? If you can't HEAR the loop in the
prompt, rewrite it. The audio side is failing if the loop only lives in the lyrics.

═══════════════════════════════════════════════════════════════

LYRIC SIDE rules — non-negotiable:
- The phrase appears verbatim in EVERY one of these sections: ${zones}.
- The phrase is the gravitational center. Verses, bridge, and outro all orbit it — they justify it, defer to it, or strip away to make its return hit harder.
- Reference track for craft (do NOT name in lyrics, do NOT mention to the user — this is a craft anchor only): ${tx.referenceTrack}.

Section architecture (bucket: ${tx.bucket}):
- VERSES: ${tx.lyricArchitecture.verses}
- BRIDGE: ${tx.lyricArchitecture.bridge}
- OUTRO:  ${tx.lyricArchitecture.outro}

Hard constraints:
- Do NOT substitute synonyms for the anchor phrase. The exact characters above are the loop.
- Do NOT bury the phrase inside a longer line on its placement zones — it must land as the dominant hook on every required zone.
- If a section's lyric content forces a contradiction with the architecture above, prefer the architecture — rewrite the section, do not break the loop.
- If the SONG PROMPT does NOT lead with the LEAD TOKENS above, that is a hard failure — rewrite the SONG PROMPT before returning.`;
};

// ── Internal namespace for QA/tests ──────────────────────────────────────────
exports._internal = {
  _classifyLoopStyle,
  _phraseScore,
  _countSyllables,
  _normalize,
  _stripTags,
  _findProperNouns,
  _escapePhrase,
  TRANSFORMS,
  BUCKET_PLACEMENT,
  BUCKET_LYRIC_ARCH,
};
