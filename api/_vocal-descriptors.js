/**
 * SONIQ Vocal Descriptors — Lever #7
 * Picks the WHO of the voice (texture, character, performance, accent, era,
 * postural, processing) and emits a Suno-ready prefix + a directive note for
 * the brain prompt. Driven by genre + mood + lyric content + user overrides.
 *
 * Server-side only — never expose this file to the client. The taxonomy IS the
 * IP; only the resolved prefix string ever reaches Suno.
 *
 * Usage:
 *   const { selectVocalDescriptors, buildVocalDescriptorNote } = require('./_vocal-descriptors');
 *   const stack = selectVocalDescriptors({ genre, mood, lyrics, overrides });
 *   const note  = buildVocalDescriptorNote(stack);   // append to prompt
 *   stack.suno_prefix  // => "[Gravelly Baritone, Deadpan, Spoken Rap, No Melody, No Autotune]"
 */

// ── A. Texture / Timbre ──────────────────────────────────────────────────────
const TEXTURE = {
  raspy:'raspy', gravelly:'gravelly', smoky:'smoky', husky:'husky',
  breathy:'breathy', airy:'airy', nasal:'nasal', throaty:'throaty',
  chesty:'chesty', sandpaper:'sandpaper', velvety:'velvety', honeyed:'honeyed',
  silken:'silken', syrupy:'syrupy', brittle:'brittle', reedy:'reedy',
  woody:'woody', metallic:'metallic', glassy:'glassy', feathered:'feathered',
  rich_baritone:'rich baritone', paper_thin:'paper-thin',
  whiskey_soaked:'whiskey-soaked', cigarette_burned:'cigarette-burned',
  warm:'warm',
};

// ── B. Character / Persona ───────────────────────────────────────────────────
const CHARACTER = {
  quirky:'quirky', theatrical:'theatrical', whimsical:'whimsical',
  mischievous:'mischievous', deadpan:'deadpan', wry:'wry',
  sardonic:'sardonic', cartoonish:'cartoonish', vaudevillian:'vaudevillian',
  showtuney:'showtune-y', manic_pixie:'manic-pixie', oddball:'oddball',
  innocent:'innocent', childlike:'childlike', world_weary:'world-weary',
  jaded:'jaded', saintly:'saintly', sinister:'sinister',
  seductive:'seductive', menacing:'menacing', vulnerable:'vulnerable',
  confessional:'confessional', drunken:'drunken', drowsy:'drowsy',
  possessed:'possessed', feral:'feral', regal:'regal', cabaret:'cabaret',
  carnival_barker:'carnival-barker', preacher:'preacher',
  narrator:'narrator', town_crier:'town-crier',
  matter_of_fact:'matter-of-fact', confident:'confident', sneering:'sneering',
};

// ── C. Performance Style ─────────────────────────────────────────────────────
const PERFORMANCE = {
  whispered:'whispered', spoken:'spoken', sprechgesang:'half-spoken (Sprechgesang)',
  shouted:'shouted', belted:'belted', crooned:'crooned', hummed:'hummed',
  chanted:'chanted', mumbled:'mumbled', sing_song:'sing-song',
  conversational:'conversational', declamatory:'declamatory',
  recitative:'recitative', preached:'preached', lectured:'lectured',
  half_laughed:'half-laughed', half_cried:'half-cried',
  gritted_teeth:'sung through gritted teeth', through_smile:'sung through a smile',
  on_exhale:'sung on the exhale', on_inhale:'sung on the inhale',
  spoken_rap:'spoken rap', percussive:'percussive delivery',
  spit_tight:'spit-tight', double_time:'double-time',
};

// ── D. Accent / Region (optional) ────────────────────────────────────────────
const ACCENT = {
  rp_british:'RP British', cockney:'cockney', mancunian:'Mancunian',
  scouse:'Scouse', estuary:'Estuary', glaswegian:'Glaswegian',
  irish_lilt:'Irish lilt', appalachian:'Appalachian',
  memphis:'Memphis drawl', nashville:'Nashville twang',
  bayou:'Louisiana bayou', boston:'Boston', bronx_bodega:'Bronx bodega',
  atl:'ATL', west_coast:'West Coast', texan:'Texan',
  midwestern:'Midwestern flat', australian:'Australian',
  french:'French-tinged', spanish:'Spanish-tinged',
  patois:'Jamaican patois', brooklyn_yiddish:'Brooklyn Yiddish-inflected',
};

// ── E. Era / Period (optional) ───────────────────────────────────────────────
const ERA = {
  vaudeville_1920s:'1920s vaudeville', crooner_30s:'30s crooner',
  doowop_50s:'50s doo-wop', lounge_60s:'60s lounge',
  singer_songwriter_70s:'70s singer-songwriter', power_ballad_80s:'80s power-ballad',
  grunge_90s:'90s grunge', emo_2000s:'2000s emo',
  blog_rock:'early-aughts blog-rock', vintage_soul:'vintage soul',
  golden_age_hiphop:'golden-age hip-hop',
};

// ── F. Emotional State (optional, blends with Character) ─────────────────────
const EMOTION = {
  wistful:'wistful', longing:'longing', defiant:'defiant',
  triumphant:'triumphant', panicked:'panicked', ecstatic:'ecstatic',
  sedated:'sedated', resigned:'resigned', giddy:'giddy',
  heartbroken:'heartbroken', vengeful:'vengeful', forgiving:'forgiving',
  in_on_joke:'in-on-the-joke',
};

// ── G. Physical / Postural (optional — surprisingly powerful) ────────────────
// Postural cues are physical/contextual modifiers — Suno reads them as vocal
// affect. through_smile / gritted_teeth / in_on_joke live here too even though
// they overlap with PERFORMANCE — postural is the slot the mood/lyric maps
// reach for.
const POSTURAL = {
  leaning_in:'sung leaning in', back_of_throat:'sung from the back of the throat',
  from_chest:'sung from the chest', from_head:'sung from the head',
  sharing_secret:'sung like sharing a secret',
  reciting_confession:'sung like reciting a confession',
  pacing:'sung pacing the room', lying_down:'sung lying down',
  on_verge_laughter:'sung on the verge of laughter',
  on_verge_tears:'sung on the verge of tears',
  through_smile:'sung through a smile',
  gritted_teeth:'sung through gritted teeth',
  in_on_joke:'sung in on the joke',
};

// ── H. Implied Processing (optional, sonic stamp) ────────────────────────────
const PROCESSING = {
  megaphone:'megaphone', telephone:'telephone-EQ',
  vintage_ribbon:'vintage ribbon mic', lofi_cassette:'lo-fi cassette',
  radio_broadcast:'radio-broadcast', talkbox:'talkbox', vocoder:'vocoder',
  doubled_octave:'doubled an octave down', whisper_doubled:'whisper-doubled',
  pitched_up:'pitched-up imp', pitched_down:'pitched-down demon',
  reversed:'reversed-phrasing', close_mic:'close-mic intimate',
};

// ── J. Placement / Space (where the voice sits in the field) ─────────────────
// Spatial placement is distinct from PROCESSING (which stamps a sonic character
// like telephone/lo-fi). SPATIAL controls DISTANCE and STEREO WIDTH. close_mic
// already lives in PROCESSING as the intimacy stamp; the rest of the depth/width
// axis lives here.
const SPATIAL = {
  far_away:'far-away, distant in the mix',
  in_your_ear:'in-your-ear, ASMR-close',
  center_stage:'center-stage, front and dominant',
  background:'background, behind the mix',
  in_the_distance:'faint, in the distance',
  dry:'dry, no space, clean and direct',
  wide:'wide, expansive full-stereo',
};

// ── I. Pitch / Register / Tuning (THE "unique artist" lever) ─────────────────
// Controls the actual PITCH of the voice — natural range, octave/formant shifts
// to morph perceived size/age/gender, and the auto-tune style. This is the
// single biggest knob for making one genre sound like many different artists.
const PITCH = {
  // Natural register
  deep_baritone:'deep baritone register',
  baritone:'baritone register',
  tenor:'tenor register',
  high_tenor:'high-tenor register',
  countertenor:'countertenor / male-falsetto register',
  alto:'alto register',
  mezzo:'mezzo-soprano register',
  soprano:'soprano register',
  // Octave / interval shift (post-pitch)
  octave_up:'pitched up an octave',
  octave_down:'pitched down an octave',
  fifth_up:'pitched up a fifth',
  // Formant shift — changes perceived size/age WITHOUT moving the note
  formant_up:'formant-shifted up, brighter younger timbre',
  formant_down:'formant-shifted down, bigger darker timbre',
  // Gender / timbre bend (pitch + formant together)
  feminized:'feminized timbre, pitched and formant-shifted up',
  masculinized:'masculinized timbre, pitched and formant-shifted down',
  androgynous:'androgynous, gender-ambiguous timbre',
  // Tuning / correction style
  hard_autotune:'hard auto-tune, robotic quantized pitch',
  melodic_autotune:'melodic auto-tune with pitch glides',
  subtle_tune:'subtle transparent pitch correction',
  natural_pitch:'natural untuned pitch',
  // Layering
  octave_stack:'octave-stacked lead, doubled an octave up',
  detuned_double:'detuned double-tracked, chorused pitch',
};

// ── Conflict table — never co-emit these pairs ───────────────────────────────
const CONFLICTS = [
  ['raspy','silken'], ['raspy','honeyed'], ['raspy','velvety'], ['gravelly','silken'],
  ['sandpaper','silken'], ['whiskey_soaked','silken'],
  ['deadpan','ecstatic'], ['deadpan','triumphant'], ['deadpan','manic_pixie'],
  ['whispered','belted'], ['whispered','shouted'],
  ['childlike','world_weary'], ['childlike','whiskey_soaked'], ['childlike','sinister'],
  ['megaphone','close_mic'], ['megaphone','whispered'],
  ['preacher','mumbled'], ['cartoonish','menacing'],
  // Spatial — depth and width are mutually exclusive at the extremes.
  ['far_away','in_your_ear'], ['far_away','center_stage'], ['far_away','close_mic'],
  ['in_the_distance','in_your_ear'], ['in_the_distance','center_stage'],
  ['background','center_stage'], ['in_your_ear','far_away'],
  ['dry','wide'], ['dry','far_away'],
];
function _conflicts(a, b) {
  return CONFLICTS.some(([x, y]) => (a === x && b === y) || (a === y && b === x));
}

// ── Genre profiles ───────────────────────────────────────────────────────────
// Each profile = the default stack to inject when the user picks Auto for that
// genre. Negative tags hard-block Suno from drifting back to its default
// melodic-emo-rap or breathy-pop fallback.
const GENRE_PROFILES = {
  hiphop: {
    texture: 'gravelly', character: 'deadpan', performance: 'spoken_rap',
    optional: ['percussive', 'matter_of_fact', 'chesty'],
    negative: ['no melodic singing','no autotune','no melisma','no breathiness','no sustained vowels','no sing-song hooks'],
  },
  hiphop_trap: {
    texture: 'smoky', character: 'sneering', performance: 'sprechgesang',
    optional: ['atl', 'memphis', 'nasal'],
    negative: ['no clean singing','no melisma','no acoustic'],
  },
  hiphop_drill: {
    texture: 'sandpaper', character: 'menacing', performance: 'gritted_teeth',
    optional: ['throaty', 'double_time'],
    negative: ['no melodic singing','no autotune','no melisma','no breathiness'],
  },
  hiphop_boombap: {
    texture: 'gravelly', character: 'matter_of_fact', performance: 'spoken_rap',
    optional: ['rich_baritone', 'bronx_bodega', 'percussive'],
    negative: ['no melodic singing','no autotune','no melisma','no sustained vowels','no ad-libs'],
  },
  hiphop_battle: {
    texture: 'woody', character: 'sardonic', performance: 'declamatory',
    optional: ['spit_tight', 'sneering'],
    negative: ['no melodic singing','no autotune','no melisma','no breathiness'],
  },
  hiphop_conscious: {
    texture: 'rich_baritone', character: 'preacher', performance: 'conversational',
    optional: ['narrator', 'warm'],
    negative: ['no autotune','no melisma'],
  },
  hiphop_westcoast: {
    texture: 'smoky', character: 'wry', performance: 'conversational',
    optional: ['west_coast', 'in_on_joke'],
    negative: ['no melisma','no breathiness'],
  },
  pop:       { texture: 'honeyed', character: 'confident', performance: 'belted', optional: ['triumphant'], negative: [] },
  rnb:       { texture: 'velvety', character: 'seductive', performance: 'crooned', optional: ['breathy', 'longing'], negative: [] },
  rock:      { texture: 'chesty', character: 'defiant', performance: 'belted', optional: ['raspy', 'shouted'], negative: ['no autotune'] },
  altrock:   { texture: 'reedy', character: 'wry', performance: 'conversational', optional: ['vulnerable', 'paper_thin'], negative: ['no autotune','no over-production'] },
  punk:      { texture: 'sandpaper', character: 'feral', performance: 'shouted', optional: ['cockney','manic_pixie'], negative: ['no melisma','no autotune','no clean production'] },
  metal:     { texture: 'throaty', character: 'menacing', performance: 'shouted', optional: ['gritted_teeth','possessed'], negative: ['no autotune','no melodic pop hook'] },
  country:   { texture: 'whiskey_soaked', character: 'world_weary', performance: 'conversational', optional: ['nashville','appalachian','narrator'], negative: ['no autotune'] },
  folk:      { texture: 'airy', character: 'confessional', performance: 'conversational', optional: ['vulnerable','paper_thin'], negative: ['no autotune','no over-production'] },
  ss:        { texture: 'airy', character: 'confessional', performance: 'sharing_secret', optional: ['vulnerable','close_mic'], negative: ['no autotune'] },
  blues:     { texture: 'whiskey_soaked', character: 'world_weary', performance: 'conversational', optional: ['memphis','from_chest'], negative: ['no autotune','no melisma stacks'] },
  jazz:      { texture: 'velvety', character: 'cabaret', performance: 'crooned', optional: ['lounge_60s','wistful'], negative: ['no autotune'] },
  reggae:    { texture: 'warm', character: 'preacher', performance: 'chanted', optional: ['patois','from_chest'], negative: ['no autotune'] },
  reggaeton: { texture: 'smoky', character: 'confident', performance: 'sprechgesang', optional: ['spanish','sneering'], negative: ['no acoustic'] },
  afrobeats: { texture: 'honeyed', character: 'confident', performance: 'sing_song', optional: ['triumphant'], negative: [] },
  latin:     { texture: 'rich_baritone', character: 'seductive', performance: 'belted', optional: ['spanish','longing'], negative: [] },
  edm:       { texture: 'glassy', character: 'ecstatic', performance: 'belted', optional: ['vocoder','triumphant'], negative: [] },
  kpop:      { texture: 'glassy', character: 'theatrical', performance: 'belted', optional: ['triumphant','pitched_up'], negative: [] },
  neosoul:   { texture: 'velvety', character: 'seductive', performance: 'crooned', optional: ['breathy','vintage_soul'], negative: [] },
  gospel:    { texture: 'rich_baritone', character: 'preacher', performance: 'belted', optional: ['triumphant','from_chest'], negative: ['no autotune'] },
  parody:    { texture: 'honeyed', character: 'theatrical', performance: 'belted', optional: ['cartoonish','vaudevillian'], negative: [] },
  comedy:    { texture: 'reedy', character: 'quirky', performance: 'sprechgesang', optional: ['theatrical','through_smile','vaudevillian'], negative: [] },
  children:  { texture: 'honeyed', character: 'innocent', performance: 'sing_song', optional: ['through_smile'], negative: ['no autotune','no dark vocal'] },
  tvmusical: { texture: 'rich_baritone', character: 'theatrical', performance: 'belted', optional: ['vaudevillian','showtuney'], negative: [] },
  dancehall: { texture: 'chesty', character: 'confident', performance: 'chanted', optional: ['patois','sneering'], negative: ['no melodic melisma'] },
  amapiano:  { texture: 'velvety', character: 'confident', performance: 'conversational', optional: ['from_chest','longing'], negative: [] },
  brazilian: { texture: 'breathy', character: 'seductive', performance: 'crooned', optional: ['wistful','longing'], negative: ['no belting'] },
  bollywood: { texture: 'honeyed', character: 'theatrical', performance: 'belted', optional: ['longing','from_chest'], negative: [] },
  arabesque: { texture: 'reedy', character: 'world_weary', performance: 'recitative', optional: ['longing','from_chest'], negative: ['no autotune'] },
  mandopop:  { texture: 'silken', character: 'vulnerable', performance: 'crooned', optional: ['longing','from_head'], negative: [] },
};

// ── Mood overlays — nudge the default stack ──────────────────────────────────
const MOOD_OVERLAYS = {
  playful:     { add_character: 'mischievous', add_postural: 'through_smile' },
  whimsical:   { add_character: 'quirky',     add_postural: 'through_smile' },
  quirky:      { add_character: 'quirky',     add_postural: 'through_smile' },
  ironic:      { add_character: 'wry',        add_postural: 'in_on_joke' },
  sardonic:    { add_character: 'sardonic',   add_postural: 'in_on_joke' },
  intimate:    { add_processing: 'close_mic', add_postural: 'sharing_secret' },
  vulnerable:  { add_processing: 'close_mic', add_postural: 'on_verge_tears' },
  confessional:{ add_character: 'confessional', add_processing: 'close_mic' },
  menacing:    { add_character: 'menacing',   add_texture: 'sandpaper' },
  aggressive:  { add_character: 'feral',      add_performance: 'shouted' },
  angry:       { add_character: 'feral',      add_performance: 'gritted_teeth' },
  triumphant:  { add_character: 'triumphant', add_performance: 'belted' },
  ecstatic:    { add_character: 'ecstatic',   add_performance: 'belted' },
  melancholic: { add_character: 'wistful',    add_postural: 'on_verge_tears' },
  sad:         { add_character: 'heartbroken', add_postural: 'on_verge_tears' },
  drunk:       { add_character: 'drunken',    add_performance: 'mumbled' },
  manic:       { add_character: 'possessed',  add_performance: 'shouted' },
  dreamy:      { add_texture: 'feathered',    add_performance: 'on_exhale', add_spatial: 'wide' },
  ethereal:    { add_texture: 'glassy',       add_performance: 'on_exhale', add_spatial: 'wide' },
  cinematic:   { add_character: 'narrator',   add_performance: 'declamatory', add_spatial: 'wide' },
  epic:        { add_character: 'triumphant', add_performance: 'belted', add_spatial: 'center_stage' },
};

// ── Genre pitch pools ────────────────────────────────────────────────────────
// `default` = the genre's canonical register (cohesion); `pool` = the spread we
// roll from in auto mode so each song can sound like a DIFFERENT artist while
// staying genre-true. Auto-tune options are stripped at runtime for genres whose
// profile carries a "no autotune" negative. Resolved profile key (incl. hip-hop
// substyles) is tried first, then the bare genre, then pop.
const GENRE_PITCH = {
  hiphop:           { default:'tenor',            pool:['tenor','baritone','deep_baritone','high_tenor','melodic_autotune','hard_autotune','octave_stack'] },
  hiphop_trap:      { default:'melodic_autotune', pool:['melodic_autotune','hard_autotune','tenor','high_tenor','octave_stack'] },
  hiphop_drill:     { default:'baritone',         pool:['baritone','deep_baritone','tenor','formant_down'] },
  hiphop_boombap:   { default:'tenor',            pool:['tenor','baritone','deep_baritone','natural_pitch'] },
  hiphop_battle:    { default:'baritone',         pool:['baritone','tenor','deep_baritone','natural_pitch'] },
  hiphop_conscious: { default:'tenor',            pool:['tenor','baritone','natural_pitch','deep_baritone'] },
  hiphop_westcoast: { default:'tenor',            pool:['tenor','baritone','melodic_autotune','high_tenor'] },
  rnb:              { default:'tenor',            pool:['tenor','high_tenor','countertenor','alto','melodic_autotune','subtle_tune'] },
  neosoul:          { default:'tenor',            pool:['tenor','high_tenor','alto','countertenor','natural_pitch'] },
  pop:              { default:'tenor',            pool:['tenor','alto','mezzo','soprano','subtle_tune','melodic_autotune'] },
  kpop:             { default:'alto',             pool:['alto','soprano','mezzo','high_tenor','formant_up','melodic_autotune'] },
  rock:             { default:'tenor',            pool:['tenor','baritone','high_tenor','natural_pitch'] },
  altrock:          { default:'tenor',            pool:['tenor','baritone','high_tenor','natural_pitch'] },
  punk:             { default:'tenor',            pool:['tenor','baritone','natural_pitch'] },
  metal:            { default:'baritone',         pool:['baritone','deep_baritone','tenor','natural_pitch'] },
  country:          { default:'baritone',         pool:['baritone','tenor','deep_baritone','natural_pitch'] },
  folk:             { default:'tenor',            pool:['tenor','alto','baritone','natural_pitch'] },
  ss:               { default:'tenor',            pool:['tenor','alto','high_tenor','natural_pitch'] },
  blues:            { default:'baritone',         pool:['baritone','tenor','deep_baritone','natural_pitch'] },
  jazz:             { default:'tenor',            pool:['tenor','alto','mezzo','baritone','natural_pitch'] },
  reggae:           { default:'tenor',            pool:['tenor','baritone','natural_pitch'] },
  reggaeton:        { default:'tenor',            pool:['tenor','baritone','melodic_autotune','hard_autotune'] },
  afrobeats:        { default:'tenor',            pool:['tenor','high_tenor','melodic_autotune','subtle_tune'] },
  amapiano:         { default:'tenor',            pool:['tenor','baritone','alto','subtle_tune'] },
  dancehall:        { default:'tenor',            pool:['tenor','baritone','melodic_autotune'] },
  latin:            { default:'baritone',         pool:['baritone','tenor','high_tenor'] },
  edm:              { default:'alto',             pool:['alto','soprano','mezzo','formant_up','melodic_autotune','octave_up'] },
  gospel:           { default:'baritone',         pool:['baritone','deep_baritone','soprano','alto','natural_pitch'] },
  tvmusical:        { default:'baritone',         pool:['baritone','tenor','soprano','mezzo','alto'] },
  children:         { default:'soprano',          pool:['soprano','alto','formant_up'] },
};
const AUTOTUNE_PITCH = new Set(['hard_autotune','melodic_autotune','subtle_tune']);
function _resolvePitch(resolvedKey, genre, overridePitch, negativeList) {
  const noAuto = (negativeList || []).some(n => /no\s*auto[\s-]?tune/i.test(n));
  if (overridePitch) {
    const k = String(overridePitch).toLowerCase().trim().replace(/\s+/g, '_');
    if (noAuto && AUTOTUNE_PITCH.has(k)) return 'natural_pitch';
    return k;
  }
  const cfg = GENRE_PITCH[resolvedKey] || GENRE_PITCH[genre] || GENRE_PITCH.pop;
  let pool = (cfg.pool || [cfg.default]).slice();
  if (noAuto) pool = pool.filter(p => !AUTOTUNE_PITCH.has(p));
  if (!pool.length) pool = ['natural_pitch'];
  // Genre default gets extra weight (cohesion) unless it's an auto-tune option a
  // no-autotune genre forbids; the rest of the pool provides per-artist variety.
  let def = cfg.default;
  if (noAuto && AUTOTUNE_PITCH.has(def)) def = pool[0];
  const weighted = [def, def, ...pool];
  return weighted[Math.floor(Math.random() * weighted.length)];
}

// ── Lyric content scan — light heuristic ─────────────────────────────────────
// Pulls signals out of free-text lyrics OR topic to nudge the stack.
const LYRIC_SIGNALS = [
  { match: /butterfl|sparkl|fairy|magic|whimsy|silly|kooky/i, add_character: 'whimsical' },
  { match: /blood|gun|kill|enemy|war|threat/i, add_character: 'menacing', add_texture: 'sandpaper' },
  { match: /whisper|secret|quiet|hush/i, add_performance: 'whispered', add_processing: 'close_mic' },
  { match: /pray|gospel|lord|hallelujah|amen/i, add_character: 'preacher' },
  { match: /preach|teach|listen up|y'?all hear/i, add_character: 'preacher' },
  { match: /smile|laugh|joke|funny|hilarious/i, add_postural: 'through_smile' },
  { match: /cry|tears|sob|grief|mourning/i, add_postural: 'on_verge_tears' },
  { match: /cradle|lullaby|sleep|moonlight|bedtime/i, add_character: 'innocent', add_performance: 'sing_song' },
  { match: /night drive|highway|midnight|cigarette/i, add_texture: 'smoky' },
  { match: /telephone|payphone|dial tone/i, add_processing: 'telephone' },
  { match: /far away|distance|across the room|drifting|fading away|miles between/i, add_spatial: 'far_away' },
  { match: /right here|next to me|in my ear|so close|skin on skin/i, add_spatial: 'in_your_ear' },
];

// ── Resolve a label → display string (handles raw user input too) ────────────
function _label(family, key) {
  if (!key) return null;
  const v = family[key];
  if (v) return v;
  // Allow raw user input like "raspy baritone" → pass through as-is, lowercased.
  return String(key).toLowerCase().trim().slice(0, 40) || null;
}

function _capWords(s) {
  return String(s || '').replace(/(^|\s|-|\()([a-z])/g, (m, p, c) => p + c.toUpperCase());
}

/**
 * selectVocalDescriptors
 * @param {object} input
 * @param {string} input.genre        canonical genre key (e.g. 'hiphop')
 * @param {string} [input.substyle]   optional substyle key (e.g. 'Trap', 'Drill')
 * @param {string} [input.mood]       mood string (single or '+'-joined)
 * @param {string} [input.lyrics]     full lyric body OR topic — used for content scan
 * @param {object} [input.overrides]  user-picked descriptors (any subset of the families)
 * @param {boolean}[input.autoMode]   if true, ignore overrides and rebuild from genre+mood
 * @returns {{stack:Array<{family:string,key:string,label:string}>, suno_prefix:string, negative:string, negative_list:string[], source:string}}
 */
function selectVocalDescriptors({
  genre = 'pop', substyle = '', mood = '', lyrics = '', overrides = {}, autoMode = false,
} = {}) {
  // Resolve genre profile (substyle wins for hip-hop subgenres if recognised).
  const subKey = String(substyle || '').toLowerCase().replace(/\s+/g,'_');
  const subLookup = {
    trap:'hiphop_trap', drill:'hiphop_drill', uk_drill:'hiphop_drill',
    boom_bap:'hiphop_boombap', battle:'hiphop_battle',
    conscious:'hiphop_conscious', west_coast:'hiphop_westcoast', g_funk:'hiphop_westcoast',
  };
  const profileKey =
    (genre === 'hiphop' && subLookup[subKey]) ||
    GENRE_PROFILES[genre] ? genre : 'pop';
  const resolvedKey = (genre === 'hiphop' && subLookup[subKey]) ? subLookup[subKey] : profileKey;
  const profile = GENRE_PROFILES[resolvedKey] || GENRE_PROFILES.pop;

  // Start from the profile defaults.
  const picked = {
    texture:     profile.texture,
    character:   profile.character,
    performance: profile.performance,
    accent:      null,
    era:         null,
    postural:    null,
    processing:  null,
    spatial:     null,
  };

  // Apply mood overlays (additive — first mood wins per slot, but won't displace
  // a user override).
  const moodTokens = String(mood || '').toLowerCase().split(/[+,/]/).map(s => s.trim()).filter(Boolean);
  for (const m of moodTokens) {
    const o = MOOD_OVERLAYS[m];
    if (!o) continue;
    if (o.add_character   && !picked._mood_character)   { picked.character   = o.add_character;   picked._mood_character   = true; }
    if (o.add_texture     && !picked._mood_texture)     { picked.texture     = o.add_texture;     picked._mood_texture     = true; }
    if (o.add_performance && !picked._mood_performance) { picked.performance = o.add_performance; picked._mood_performance = true; }
    if (o.add_postural    && !picked.postural)          { picked.postural    = o.add_postural; }
    if (o.add_processing  && !picked.processing)        { picked.processing  = o.add_processing; }
    if (o.add_spatial     && !picked.spatial)           { picked.spatial     = o.add_spatial; }
  }
  delete picked._mood_character; delete picked._mood_texture; delete picked._mood_performance;

  // Lyric / topic content scan.
  const text = String(lyrics || '');
  for (const sig of LYRIC_SIGNALS) {
    if (!sig.match.test(text)) continue;
    if (sig.add_character   && !picked._lyric_character)   { picked.character   = sig.add_character;   picked._lyric_character = true; }
    if (sig.add_texture     && !picked._lyric_texture)     { picked.texture     = sig.add_texture;     picked._lyric_texture   = true; }
    if (sig.add_performance && !picked._lyric_performance) { picked.performance = sig.add_performance; picked._lyric_performance = true; }
    if (sig.add_postural    && !picked.postural)           { picked.postural    = sig.add_postural; }
    if (sig.add_processing  && !picked.processing)         { picked.processing  = sig.add_processing; }
    if (sig.add_spatial     && !picked.spatial)            { picked.spatial     = sig.add_spatial; }
  }
  delete picked._lyric_character; delete picked._lyric_texture; delete picked._lyric_performance;

  // User overrides win — but only when not in pure auto mode.
  if (!autoMode && overrides && typeof overrides === 'object') {
    for (const k of ['texture','character','performance','accent','era','postural','processing','spatial']) {
      if (overrides[k]) picked[k] = String(overrides[k]).trim().slice(0, 40);
    }
  }

  // Pitch / register / tuning — the unique-artist lever. Override wins in manual
  // mode; otherwise roll from the genre pitch pool (auto mode varies it per song
  // so the same genre can sound like many different artists). Auto-tune options
  // are stripped for genres whose profile forbids it.
  const _overridePitch = (!autoMode && overrides && overrides.pitch) ? overrides.pitch : '';
  picked.pitch = _resolvePitch(resolvedKey, genre, _overridePitch, profile.negative);

  // Build ordered stack — pitch leads (it defines WHO is singing), then texture,
  // character, performance; optionals only when present + non-conflicting.
  const order = ['pitch','texture','character','performance','accent','era','postural','processing','spatial'];
  const families = { pitch:PITCH, texture:TEXTURE, character:CHARACTER, performance:PERFORMANCE,
                     accent:ACCENT, era:ERA, postural:POSTURAL, processing:PROCESSING, spatial:SPATIAL };

  const stack = [];
  const usedKeys = new Set();
  for (const fam of order) {
    const key = picked[fam];
    if (!key) continue;
    if (usedKeys.size && Array.from(usedKeys).some(k => _conflicts(k, key))) continue;
    const label = _label(families[fam], key);
    if (!label) continue;
    stack.push({ family: fam, key, label });
    usedKeys.add(key);
    if (stack.length >= 8) break;
  }

  // Suno prefix — title-cased, comma-joined, square-bracketed.
  const suno_prefix = stack.length
    ? '[' + stack.map(e => _capWords(e.label)).join(', ') + ']'
    : '';

  // Negative tags (anti-defaults) — always include genre profile negatives plus
  // any overrides[negativeAdd].
  const negative_list = [...(profile.negative || [])];
  if (overrides && Array.isArray(overrides.negativeAdd)) {
    for (const n of overrides.negativeAdd) {
      const clean = String(n).trim().toLowerCase().slice(0, 40);
      if (clean && !negative_list.includes(clean)) negative_list.push(clean);
    }
  }
  const negative = negative_list.length ? '[' + negative_list.join(', ') + ']' : '';

  return {
    stack, suno_prefix, negative, negative_list,
    source: autoMode ? 'auto' : (overrides && Object.keys(overrides).length ? 'manual' : 'auto'),
    profileKey: resolvedKey,
  };
}

/**
 * buildVocalDescriptorNote — appended to song prompts. Tells the LLM exactly
 * what to put on the Vocal: line and at the head of the Full prompt, and locks
 * the negative tags into the Suno style string.
 */
function buildVocalDescriptorNote(stackResult) {
  if (!stackResult || !stackResult.suno_prefix) return '';
  const prefix = stackResult.suno_prefix;
  // Anti-default vocal qualities, expressed as a PROSE avoid directive — NEVER as
  // a bracketed [no x] token in the Full prompt. Suno parses inline/bracketed
  // negatives ("[no autotune]") as POSITIVE style tokens, so pasting them would
  // SUMMON the very sound we're excluding. Strip the leading "no " for the prose.
  const negProse = (stackResult.negative_list || [])
    .map(n => String(n).replace(/^no\s+/i, '').trim())
    .filter(Boolean)
    .join(', ');

  // Genre-appropriate MOMENT-tag palette for the inline dynamics pass. Spoken-rap
  // stacks must never be handed melodic/sung moment tags (falsetto/belted) — that
  // is the one way an inline tag can fight the global stack. Detect rap from the
  // resolved profile key and the performance keys in the stack.
  const profileKey = String(stackResult.profileKey || '');
  const stackKeys = (stackResult.stack || []).map(e => e.key);
  const isRap = /^hiphop/.test(profileKey) ||
    stackKeys.some(k => /spoken_rap|sprechgesang|percussive|spit_tight|double_time/.test(k));
  const momentPalette = isRap
    ? '[Whisper] · [Spoken] · [Half-Time] · [Double-Time] · [Shouted] · [Gritted Teeth] · [Ad-Lib] · [Build] · [Fade Out]'
    : '[Whisper] · [Breathy] · [Soft] · [Spoken] · [Falsetto] · [Belted] · [Powerful] · [Voice Crack] · [Build] · [Whispered Outro] · [Fade Out]';

  return `

🎙️ VOCAL DESCRIPTOR LOCK (Lever #7 — controls WHO is singing, not just what):
The "Vocal:" field in the SONG PROMPT and the FIRST tokens of the "Full prompt" MUST start with this descriptor stack, character-for-character:

${prefix}${negProse ? '\nAVOID these vocal qualities — keep them OUT of the vocal line and the Full prompt entirely. Do NOT write them as [no …] / "avoid:" tags anywhere in the prompt (Suno reads bracketed negatives as POSITIVE tokens and would ADD them). To hard-exclude, the user places them in Suno\'s separate Exclude Styles field: ' + negProse : ''}

Rules:
- Do NOT translate, summarise, or rephrase the bracketed descriptor terms — they are precision tags Suno's vocal model reads directly.
- Do NOT insert artist names. The bracket above is already Suno-policy-safe.
- The descriptor stack ALWAYS appears BEFORE genre/instrument tokens in the Full prompt.
- NEVER place a [no …] or "avoid:" negative inside the Full prompt or style string — Suno treats those as things to ADD. Negatives belong only in Suno's Exclude Styles field.

🎚️ MOMENT DIRECTION PASS (dynamics — where the performance DEPARTS from the global stack):
The stack above is the DEFAULT voice. Emotion comes from a FEW deliberate departures. Inside the LYRIC BODY, place inline DELIVERY tags on individual lines at 2–4 emotional inflection points ONLY:
  • the most vulnerable / quietest line   • the climax or hardest-hitting line   • a release or resolution line   • (optional) one big transition
Approved moment tags for THIS song — stay inside this palette (it already matches the genre + global stack):
  ${momentPalette}
Moment-tag rules:
- One tag, in square brackets, at the START of its own line, immediately before the lyric it governs. e.g.
    [Whisper] I'm fine
    [Voice Crack] but I'm falling apart
- Cap it: at most ONE moment tag per section and ~4 across the whole song. Most lines get NO tag — restraint is the point. Over-tagging makes Suno sing the brackets aloud or flatten every dynamic.
- Moment tags are DELTAS: never restate the global stack inline, and never pick a tag that contradicts the genre (the palette above is already filtered for that).
- Section tags ([Verse], [Chorus], [Bridge], [Outro]) and ad-libs in (parentheses) are separate layers — moment tags stack ON TOP of them, they do not replace them.
- NEVER an inline [no …] / "avoid:" negative (Suno reads it as ADD).`;
}

module.exports = {
  selectVocalDescriptors,
  buildVocalDescriptorNote,
  // Exported families let the UI render the picker without duplicating the taxonomy.
  TEXTURE, CHARACTER, PERFORMANCE, ACCENT, ERA, EMOTION, POSTURAL, PROCESSING, PITCH, SPATIAL,
  GENRE_PROFILES, GENRE_PITCH, MOOD_OVERLAYS,
};
