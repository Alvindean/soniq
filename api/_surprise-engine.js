/**
 * SONIQ Surprise Engine — kills the linear song problem
 * Picks 1–4 "human attractor" moves per song (drops, builds, breaths, pauses,
 * phone-call interjections, off-mic chatter, found sounds, beat switches, key
 * changes, vocal flips) and tells the brain exactly where to deploy them.
 *
 * Design:
 * - Every move is a Suno-readable directive (bracket tag, parenthesised ad-lib,
 *   or short prose annotation). Suno honors these surprisingly well.
 * - Per-genre move pools — folk doesn't get a beat switch; trap doesn't get a
 *   second-guitar entrance. Each pool is curated so the moves feel native.
 * - Intensity dial — low (1 move), medium (2), high (3), wild (4). Default
 *   medium is calibrated to "more interesting without being weird."
 * - Section affinity — each move declares which sections it can land on
 *   (verse / pre-chorus / chorus / bridge / outro / between-sections).
 * - User overrides — the UI can pre-pick specific moves and the engine
 *   honors them.
 *
 * Server-side only. The taxonomy IS the IP; only the resolved directives
 * appear in the LLM prompt.
 */

// ── Move catalog ─────────────────────────────────────────────────────────────
// id              : stable key
// name            : short user-facing label
// suno            : the literal Suno tag/syntax to put in the lyric body
// where           : prose hint for the LLM about placement (anchored to a section)
// sections        : valid landing zones
// genres          : whitelist of genre keys (empty array = universal)
// requires        : optional companion moves (e.g. 'drop' usually paired with 'build')
// weight          : default selection weight (higher = more likely on auto-pick)
const MOVES = [
  // ── Dynamic surprises ──────────────────────────────────────────────────────
  { id:'drop', name:'Beat Drop', suno:'[Drop]',
    where:'after the final pre-chorus or right before the last chorus — everything cuts to silence for half a bar then everything slams back',
    sections:['pre_chorus','chorus','bridge'], genres:['edm','pop','hiphop','reggaeton','kpop','rock','altrock','metal','rnb','afrobeats','latin'], weight:9 },
  { id:'build', name:'Tension Build', suno:'[Build]',
    where:'final 4–8 bars of the bridge or pre-chorus — risers, snare rolls, vocal climb, escalating ad-libs',
    sections:['pre_chorus','bridge','verse'], genres:[], weight:8 },
  { id:'breakdown', name:'Breakdown', suno:'[Breakdown]',
    where:'after second chorus — strip everything except one element (vocal+kick, or guitar+vocal, or just bass)',
    sections:['bridge','post_chorus','verse'], genres:[], weight:7 },
  { id:'beat_switch', name:'Beat Switch', suno:'[Beat Switch]',
    where:'mid-song full-tempo or full-key change — the next section feels like a different song (Sicko Mode style)',
    sections:['bridge','verse','chorus'], genres:['hiphop','rnb','pop','altrock','edm','kpop','neosoul'], weight:6 },
  { id:'half_time', name:'Half-Time Flip', suno:'[Half-Time]',
    where:'final chorus or bridge — drums drop to half-time underneath, vocal stays the same tempo for instant gravity',
    sections:['bridge','chorus','outro'], genres:['hiphop','rnb','rock','altrock','metal','edm','neosoul'], weight:6 },
  { id:'double_time', name:'Double-Time Burst', suno:'[Double-Time]',
    where:'last 4 bars of a verse — vocal density doubles, hi-hats roll, momentum spikes before the chorus',
    sections:['verse','bridge'], genres:['hiphop','rnb','rock','altrock','metal','edm','reggaeton','kpop','punk'], weight:6 },
  { id:'tape_stop', name:'Tape Stop', suno:'[Tape Stop]',
    where:'transition into the final chorus or after the bridge — pitched-down sweep that sounds like a cassette being stopped',
    sections:['bridge','pre_chorus','outro'], genres:['edm','pop','hiphop','rnb','altrock','kpop','reggaeton'], weight:5 },
  { id:'reverse_swell', name:'Reverse Swell', suno:'[Reverse Swell]',
    where:'sucks-in transition — 1-bar reversed cymbal/synth swell pulling into the next section',
    sections:['pre_chorus','chorus','bridge'], genres:[], weight:5 },
  { id:'glitch', name:'Glitch / Stutter', suno:'[Glitch] [Vocal Stutter]',
    where:'last word of the chorus or bridge stutters/repeats once — adds digital edge',
    sections:['chorus','bridge','outro'], genres:['edm','hiphop','pop','rnb','altrock','kpop'], weight:5 },
  { id:'key_change', name:'Final Chorus Key Change', suno:'[Modulation Up +1]',
    where:'mark this tag at the START of the FINAL chorus only — modulate up a half-step or whole-step for the climax',
    sections:['chorus'], genres:['pop','rnb','country','rock','altrock','kpop','tvmusical','gospel','ss','jazz'], weight:6 },

  // ── Breath / pause / silence ──────────────────────────────────────────────
  { id:'silence_2bar', name:'Silence (2 bars)', suno:'[Silence — 2 bars]',
    where:'before the bridge or before the final chorus — full silence, lets the listener catch their breath',
    sections:['pre_chorus','bridge','chorus'], genres:[], weight:5 },
  { id:'vocal_pause', name:'Vocal Pause', suno:'[Vocal Pause]',
    where:'mid-bar inside the second verse — vocalist stops mid-phrase for half a bar, then continues',
    sections:['verse','chorus','bridge'], genres:[], weight:6 },
  { id:'breath_in', name:'Audible Breath', suno:'(audible inhale)',
    where:'on its own line right before the final chorus drops — the breath IS the gravity',
    sections:['pre_chorus','chorus','bridge'], genres:['ss','folk','rnb','pop','altrock','neosoul','jazz','blues','country'], weight:5 },
  { id:'beat_stops', name:'Beat Stops', suno:'[Beat Stops]',
    where:'last line of the chorus lands a cappella — drums and beat cut, vocal alone for one bar',
    sections:['chorus','bridge','outro'], genres:[], weight:6 },

  // ── Dialogue / found-sound interjections ──────────────────────────────────
  { id:'phone_call', name:'Phone Call Interjection', suno:'(phone rings) (voicemail beep) (voice through phone: "yo, where you at?")',
    where:'between verse 1 and verse 2 — the phone rings, a brief recorded-sounding voice plays, then the song resumes. Write a context-appropriate one-line message',
    sections:['interlude','verse','bridge'], genres:['hiphop','rnb','pop','altrock','neosoul','reggaeton','latin'], weight:6 },
  { id:'voicemail', name:'Voicemail Outro', suno:'[Voicemail Outro]\n(beep) "hey, it\'s me — call me back when you can"',
    where:'final 8 bars — song fades and a voicemail-quality recorded line plays over the tail',
    sections:['outro','bridge'], genres:['hiphop','rnb','pop','altrock','ss','folk','neosoul','country'], weight:5 },
  { id:'off_mic_chatter', name:'Off-Mic Chatter', suno:'(off-mic: "yeah, that\'s the one")',
    where:'right before a chorus or after the bridge — a sotto-voce studio aside, dry and unprocessed',
    sections:['pre_chorus','chorus','bridge','interlude'], genres:[], weight:5 },
  { id:'producer_tag', name:'Producer Drop / Tag', suno:'(producer: "let it ride")',
    where:'opening of the song or right after the first hook — a quick producer-style verbal tag',
    sections:['intro','post_chorus','interlude'], genres:['hiphop','rnb','reggaeton','edm','pop','afrobeats','latin'], weight:5 },
  { id:'crowd_cheer', name:'Crowd Reaction', suno:'(crowd cheers) (audience claps)',
    where:'after the final chorus or as a build into the bridge — adds live-show energy',
    sections:['post_chorus','outro','bridge'], genres:['rock','altrock','punk','metal','hiphop','country','gospel','reggae','latin','kpop'], weight:4 },
  { id:'crowd_chant', name:'Crowd Chant', suno:'[Crowd Chant]\n(hey! hey! hey!)',
    where:'final chorus or outro — call-and-response shoutable phrase repeated by a group',
    sections:['chorus','bridge','outro'], genres:['rock','altrock','punk','metal','reggae','reggaeton','latin','gospel','kpop','afrobeats'], weight:5 },
  { id:'street_ambient', name:'Street Ambience', suno:'[Sample: street ambience — distant siren, traffic, footsteps]',
    where:'intro or between verses — diegetic city sound for 4 bars, then the music enters/resumes',
    sections:['intro','interlude','outro'], genres:['hiphop','rnb','neosoul','altrock','ss','folk','jazz','blues'], weight:4 },
  { id:'rain_room', name:'Rain / Room Tone', suno:'[Sample: rain on a window]',
    where:'intro or final 8 bars — diegetic ambient texture, panned slightly',
    sections:['intro','outro','interlude','bridge'], genres:['ss','folk','rnb','neosoul','jazz','blues','altrock','pop','country'], weight:4 },
  { id:'subway_announce', name:'Subway / PA Announcement', suno:'[Sample: muffled PA announcement — train doors closing]',
    where:'intro or interlude — grounds the song in an urban moment',
    sections:['intro','interlude'], genres:['hiphop','rnb','altrock','neosoul','jazz','ss'], weight:3 },
  { id:'tv_static', name:'TV Static / Channel Flip', suno:'[Sample: TV static then dial flip] (faintly: "...breaking news...")',
    where:'intro or transition — channel-flip texture between sections',
    sections:['intro','interlude','bridge'], genres:['hiphop','altrock','rnb','rock','edm','neosoul'], weight:3 },

  // ── Ad-lib creativity moves ───────────────────────────────────────────────
  { id:'adlib_echo', name:'Echo Ad-lib', suno:'(echo: "yeah… yeah… yeah…")',
    where:'last word of a chorus line gets echo-stacked in delay-trail style',
    sections:['chorus','bridge','outro'], genres:['hiphop','rnb','reggaeton','edm','kpop','neosoul'], weight:5 },
  { id:'adlib_panned', name:'Panned Whisper Ad-lib', suno:'(whispered, panned left: "stay")',
    where:'pre-chorus or bridge — ad-lib placed hard-left or hard-right in the stereo field',
    sections:['pre_chorus','chorus','bridge'], genres:['rnb','pop','neosoul','altrock','edm','kpop','hiphop'], weight:4 },
  { id:'adlib_laugh', name:'Laugh Ad-lib', suno:'(quiet laugh)',
    where:'after a punchline or wry line — undersells the joke, lands the comedy',
    sections:['verse','bridge','outro'], genres:['hiphop','rnb','pop','comedy','parody','altrock','country','neosoul','jazz'], weight:4 },

  // ── Performance flips ─────────────────────────────────────────────────────
  { id:'whisper_to_shout', name:'Whisper → Shout Flip', suno:'[Whispered] then [Shouted]',
    where:'first line of bridge whispered, then explodes into shouted on the final 4 bars — extreme dynamic surprise',
    sections:['bridge','chorus','verse'], genres:['rock','altrock','punk','metal','rnb','hiphop','pop','edm'], weight:5 },
  { id:'spoken_interlude', name:'Spoken-Word Interlude', suno:'[Spoken Word Interlude]',
    where:'between verse 2 and bridge — 2–4 bars of spoken-word delivery (no melody, conversational)',
    sections:['interlude','bridge','verse'], genres:['hiphop','rnb','neosoul','altrock','ss','folk','jazz','blues','country','pop'], weight:5 },
  { id:'fakeout_outro', name:'Fakeout Outro', suno:'[Fakeout — fade then re-enter]',
    where:'song fades almost to silence, then crashes back in for one more chorus or one more punch line',
    sections:['outro'], genres:['rock','altrock','punk','pop','rnb','hiphop','metal','country','tvmusical'], weight:4 },
  { id:'a_cappella_open', name:'A Cappella Open', suno:'[A Cappella Intro]',
    where:'first 2–4 bars are vocal alone — band/beat enters on bar 3 or 5',
    sections:['intro'], genres:['rnb','pop','gospel','soul','neosoul','rock','altrock','country','ss','folk','jazz','blues','tvmusical'], weight:5 },
  { id:'instrument_solo', name:'Counter-Instrument Solo', suno:'[Instrumental Solo]',
    where:'8 bars between verse 2 and final chorus — let the genre-counter instrument take the lead (guitar/sax/keys/strings)',
    sections:['bridge','interlude'], genres:['rock','altrock','blues','jazz','country','punk','metal','rnb','neosoul','funk','reggae'], weight:5 },
];

const MOVE_BY_ID = Object.fromEntries(MOVES.map(m => [m.id, m]));

// ── Genre-key normaliser (mirrors _brain.js _normalizeGenreKey) ─────────────
const _GENRE_KEY_MAP = {
  'Afrobeats':'afrobeats','Alt-Rock':'altrock','Blues':'blues','Country':'country',
  'EDM':'edm','Folk':'folk','Gospel':'gospel','Hip-Hop':'hiphop','Jazz':'jazz',
  'K-Pop':'kpop','Latin':'latin','Metal':'metal','Children\'s':'children',
  'Parody':'parody','Comedy':'comedy','TV / Musical':'tvmusical',
  'Neo-Soul':'neosoul','Pop':'pop','Punk':'punk','R&B':'rnb','Reggae':'reggae',
  'Reggaeton':'reggaeton','Rock':'rock','Singer-Songwriter':'ss',
  'Soul':'neosoul','Funk':'rnb',
};
function _normGenre(g) { return _GENRE_KEY_MAP[g] || g || 'pop'; }

// ── Mood overlays — boost certain move weights when the mood asks for them ───
const MOOD_BOOSTS = {
  intimate:    { breath_in:+5, vocal_pause:+5, off_mic_chatter:+4, rain_room:+4, voicemail:+3, a_cappella_open:+3, beat_stops:+3 },
  vulnerable:  { breath_in:+5, vocal_pause:+4, voicemail:+3, rain_room:+3, beat_stops:+3, a_cappella_open:+3 },
  confessional:{ vocal_pause:+4, voicemail:+4, off_mic_chatter:+3, beat_stops:+3 },
  cinematic:   { drop:+5, build:+5, key_change:+4, reverse_swell:+4, beat_stops:+3, breakdown:+3 },
  epic:        { drop:+6, build:+5, key_change:+5, crowd_chant:+4, breakdown:+3 },
  aggressive:  { drop:+5, double_time:+5, whisper_to_shout:+4, beat_switch:+3, glitch:+3 },
  angry:       { whisper_to_shout:+5, drop:+4, double_time:+3, glitch:+3 },
  manic:       { glitch:+6, double_time:+5, beat_switch:+4, tape_stop:+3 },
  playful:     { adlib_laugh:+5, off_mic_chatter:+4, fakeout_outro:+3, glitch:+2 },
  ironic:      { adlib_laugh:+5, off_mic_chatter:+4, fakeout_outro:+3 },
  sardonic:    { adlib_laugh:+5, off_mic_chatter:+4, voicemail:+3 },
  triumphant:  { drop:+5, build:+4, crowd_chant:+5, key_change:+4 },
  ecstatic:    { drop:+5, build:+4, crowd_cheer:+4, key_change:+3 },
  dreamy:      { reverse_swell:+5, breath_in:+4, rain_room:+4, tape_stop:+3 },
  ethereal:    { reverse_swell:+5, breath_in:+4, rain_room:+4 },
  nostalgic:   { tape_stop:+4, voicemail:+5, rain_room:+4, vintage_ribbon:+3 },
  melancholic: { breath_in:+4, vocal_pause:+4, voicemail:+4, rain_room:+4, beat_stops:+3 },
  sad:         { breath_in:+4, vocal_pause:+4, voicemail:+4, beat_stops:+4, a_cappella_open:+3 },
  hype:        { drop:+5, build:+5, crowd_chant:+5, double_time:+4, glitch:+3 },
  celebratory: { drop:+4, build:+4, crowd_cheer:+5, key_change:+4 },
  menacing:    { whisper_to_shout:+4, glitch:+3, drop:+3, double_time:+3, street_ambient:+3 },
  defiant:     { drop:+4, double_time:+4, whisper_to_shout:+3, half_time:+3 },
  cinematic_indie:{ rain_room:+5, off_mic_chatter:+4, breath_in:+4, voicemail:+4 },
};

const INTENSITY_COUNT = { low:1, medium:2, high:3, wild:4 };

// Lyric / topic content scan — boost moves the lyrics literally ask for.
const LYRIC_TRIGGERS = [
  { match: /phone|call(?:ed|ing)?\s|voicemail|texted|missed call/i, force:'phone_call' },
  { match: /rain|storm|window|drizzle/i, force:'rain_room' },
  { match: /subway|train|station|metro|platform/i, force:'subway_announce' },
  { match: /tv|television|news|channel|remote/i, force:'tv_static' },
  { match: /street|sidewalk|corner|block|pavement/i, force:'street_ambient' },
  { match: /silence|quiet|hush|holds? (her|his|my|their) breath/i, force:'silence_2bar' },
  { match: /laugh|chuckle|joking|smirk/i, force:'adlib_laugh' },
  { match: /shout|scream|holler|yell/i, force:'whisper_to_shout' },
];

function _shuffle(a, seed) {
  const r = a.slice();
  let s = seed || Math.floor(Math.random() * 1e6);
  for (let i = r.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/**
 * selectSurpriseMoves
 * @param {object} input
 * @param {string} input.genre        canonical genre key
 * @param {string} [input.mood]
 * @param {string} [input.lyrics]     lyric body OR topic — used for content scan
 * @param {string} [input.intensity]  'low' | 'medium' | 'high' | 'wild' (default medium)
 * @param {string[]}[input.userPicks] explicit move ids the user wants forced in
 * @param {string[]}[input.userExcludes] explicit move ids to drop
 * @param {boolean}[input.autoMode]   if false, ONLY userPicks are used
 * @returns {{moves:object[], count:number, intensity:string, source:string}}
 */
function selectSurpriseMoves({
  genre = 'pop', mood = '', lyrics = '',
  intensity = 'medium', userPicks = [], userExcludes = [],
  autoMode = true,
} = {}) {
  const g = _normGenre(genre);
  const cap = INTENSITY_COUNT[intensity] || 2;

  // Manual mode — exact user picks (still respect cap).
  if (!autoMode) {
    const picks = (Array.isArray(userPicks) ? userPicks : [])
      .map(id => MOVE_BY_ID[id]).filter(Boolean).slice(0, cap);
    return { moves: picks, count: picks.length, intensity, source: 'manual' };
  }

  // Auto mode — score the eligible pool and pick top N.
  const moodTokens = String(mood || '').toLowerCase().split(/[+,/]/).map(s => s.trim()).filter(Boolean);
  const lyricText = String(lyrics || '');
  const excludeSet = new Set(userExcludes || []);

  const eligible = MOVES.filter(m =>
    !excludeSet.has(m.id) && (m.genres.length === 0 || m.genres.includes(g))
  );

  // Forced picks from lyric scan — these get +99 weight bias and will land first.
  const forcedIds = new Set();
  for (const trig of LYRIC_TRIGGERS) {
    if (trig.match.test(lyricText) && MOVE_BY_ID[trig.force] &&
        (MOVE_BY_ID[trig.force].genres.length === 0 || MOVE_BY_ID[trig.force].genres.includes(g))) {
      forcedIds.add(trig.force);
    }
  }
  // User-requested picks also forced (when in auto mode but with hints).
  for (const id of (userPicks || [])) if (MOVE_BY_ID[id]) forcedIds.add(id);

  const scored = eligible.map(m => {
    let w = m.weight || 5;
    for (const mt of moodTokens) {
      const boost = MOOD_BOOSTS[mt]?.[m.id];
      if (boost) w += boost;
    }
    if (forcedIds.has(m.id)) w += 99;
    // Add a tiny stable shuffle so two same-weight moves don't always tie the same way.
    return { m, w: w + Math.random() };
  });
  scored.sort((a, b) => b.w - a.w);

  // Pick top N with section-spread guard — try not to land two moves on the same section.
  const picked = [];
  const usedSections = new Set();
  for (const { m } of scored) {
    if (picked.length >= cap) break;
    const fresh = m.sections.find(s => !usedSections.has(s));
    if (!fresh && picked.length > 0) continue; // skip if no free section
    picked.push(m);
    if (fresh) usedSections.add(fresh);
  }
  // If we couldn't fill, relax the section spread.
  if (picked.length < cap) {
    for (const { m } of scored) {
      if (picked.length >= cap) break;
      if (!picked.includes(m)) picked.push(m);
    }
  }

  return { moves: picked, count: picked.length, intensity, source: forcedIds.size ? 'auto+lyric' : 'auto' };
}

/**
 * buildSurpriseNote — directive appended to song prompts. Tells the LLM
 * EXACTLY which Suno tags to embed in the lyrics body, where to put them,
 * and why.
 */
function buildSurpriseNote(result) {
  if (!result || !result.moves || !result.moves.length) return '';
  const lines = result.moves.map((m, i) =>
    `${i + 1}. ${m.name}
   • Suno tag to embed in the lyrics: ${m.suno}
   • Where to deploy: ${m.where}
   • Eligible sections: ${m.sections.join(', ')}`
  ).join('\n');
  return `

🎲 SURPRISE / CREATIVITY MOVES (Lever #8 — kills linearity, makes the song feel human):
This song MUST contain the following ${result.moves.length} surprise move${result.moves.length > 1 ? 's' : ''}. Embed each one inside the LYRICS body at the section indicated, using the EXACT Suno tag/syntax shown. These are not optional — they are what separates a linear AI song from one that lands.

${lines}

Rules:
- Place each move's Suno tag on its OWN line inside the relevant section, OR on the line immediately before the lyric it modifies.
- Parenthesised dialogue/sample lines render as background voices/samples — write them in character (production note: a phone-call line should sound like a real friend's tone, not generic copy).
- If two moves want the same section, prefer the higher one in this list and place the other in an adjacent section.
- Add a single SURPRISE NOTES block right after the LYRICS body listing each move you placed and its bar position, e.g.:
  SURPRISE NOTES:
  • [Drop] — bar 32, just before final chorus
  • (phone rings — "yo, where you at?") — between Verse 1 and Verse 2
- The Full prompt in SONG PROMPT must reference the surprise moves at the END (e.g. "...with beat drop, voicemail outro, audible breath before final chorus") so Suno knows to render them.`;
}

module.exports = {
  selectSurpriseMoves,
  buildSurpriseNote,
  MOVES, MOVE_BY_ID, MOOD_BOOSTS, INTENSITY_COUNT, LYRIC_TRIGGERS,
};
