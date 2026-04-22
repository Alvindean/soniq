/**
 * SONIQ Brain — Server-side songwriting intelligence
 * Contains all proprietary IP: genre data, music theory, prompt templates
 * NEVER expose this file or its contents to the client.
 */

const GENRE_BIBLE={
  hiphop:{
    dna:'Bars are currency — 1 bar = 1 line. 16-bar verse = 16 lines. Hook = 8 bars = 8 lines (or 4 unique lines repeated). Ad-libs in parentheses: (yeah) (uh) (let\'s go). Internal rhymes every 2-3 syllables create density. Flow variation (normal → double time → triplet) is the surprise weapon.',
    structure:'Classic: [16-bar Verse] × 3 with [8-bar Hook]. Trap: [8-bar Hook] → [12-bar Verse] repeated with hook 4-6×. Beat Switch: two complete song sections at different BPMs joined by [Beat Switch]. Bar 16 of every verse = the punchline. 4-bar groups: bars 1-4 setup, 5-8 develop, 9-12 deepen, 13-16 payoff.',
    suno:'"trap, 808 bass, hard snare, rolling hi-hats, 140 BPM" for trap. "boom bap, vinyl crackle, jazz sample, hard kick, 90 BPM" for classic. "melodic rap, atmospheric, auto-tune, 120 BPM" for melodic. Always specify BPM. Use [Rap Verse] to prevent Suno singing the verse.',
    keys:[
      '1 bar = 1 line — write exactly the bar count specified in the structure. 16-bar verse = 16 lines, no more, no less',
      'Ad-libs belong in parentheses on the same line: "I got it (yeah) from nothing (uh)" — Suno renders these as background interjections',
      '[Triplet Flow] = rolling 3-syllable subdivisions (da-da-DUM). [Double Time] = twice the syllables per bar. Use [Beat Switch] for full BPM/key change',
      'Hook must be melodically singable even in a rap song — it carries the emotional memory. Trap hooks repeat 4-6× total across the song',
      'Verse structure within 16 bars: bars 1-4 establish scene/topic, bars 5-8 develop, bars 9-12 complicate or contrast, bar 16 is always the punchline or emotional peak',
      'Internal rhymes every 2-3 syllables add density beyond end rhymes. Chain rhymes across 4-bar units create momentum'
    ],
    artists:'Kendrick Lamar · Drake · Travis Scott · J. Cole · Eminem · Future · Lil Baby · Tyler the Creator · 21 Savage · Gunna · Nas · Jay-Z',
    counter:{device:'Sample loop / producer melody vs. rap flow',does:'The melodic sample or producer-generated hook plays continuously underneath the rap verses — it becomes the emotional anchor that the bars respond to. Ad-lib voices ("yeah","uh") create a rhythmic counter-voice.',howto:'melodic sample hook, producer melody loop, ad-lib counter-voice',map:'Verse: sample loops under bars / Hook: producer melody IS the hook / Outro: ad-lib voices build over the loop'},
    outliers:[
      {song:'"Lose Yourself" — Eminem',rule:'Rock guitar riff + power ballad structure, no traditional hip-hop drums or samples',result:'Won Oscar for Best Original Song — first rap song ever to receive it'},
      {song:'"HUMBLE." — Kendrick Lamar',rule:'Sparse production with minimal hook variation and zero ad-libs — stripped everything rap conventionally adds',result:'#1 hit that broke streaming records and defined minimalist prestige rap'},
      {song:'"Sicko Mode" — Travis Scott',rule:'Three completely different beat sections mid-song with no warning — breaks the single-groove golden rule',result:'#1 hit that became a cultural moment and turned the "beat switch" into an art form'}
    ],
    vocables:{sounds:'(yeah) (uh) (let\'s go) (ayy)',when:'ad-lib on every 2nd bar, outro crowd chant',suno_tag:'[Outro - crowd chant]',borrowed_from:'gospel affirmation secularized',notes:'Parentheses syntax critical — Suno renders these as background voices'}
  },
  ss:{dna:'Voice, acoustic guitar, emotional truth, first-person narrative, autobiographical imagery. The song is the diary entry.',structure:'Most flexible genre. Verse-only (no chorus), VCVCBC, or through-composed. The STORY determines structure — not a template.',suno:'"fingerpicked acoustic guitar, intimate close-mic vocals, warm room reverb, no drums" for stripped. Add "brushed snare, upright bass" for fuller feel.',keys:['Every line must earn its place — no filler','Specificity creates universality — house numbers, dog names, street names','Second verse must deepen emotionally, not repeat the first','Guitar tuning is a character — mention DADGAD or open G in style'],artists:'Tracy Chapman · Joni Mitchell · Elliott Smith · Bon Iver · Phoebe Bridgers · Paul Simon · Brandi Carlile',counter:{device:'Guitar fingerpicking pattern / second acoustic voice',does:'The fingerpicked guitar part weaves a melodic answer around the vocal — in the gaps between sung phrases, the guitar fills with its own melody, creating a dialogue between voice and instrument. On bigger arrangements, a cello or second acoustic plays a counter-line underneath.',howto:'fingerpicked counter-melody, guitar fills between vocal phrases, cello counter-line',map:'Verse: guitar fills the phrase gaps / Chorus: both voices lock together / Bridge: guitar takes melodic lead while vocal strips back'},outliers:[{song:'"Fast Car" — Tracy Chapman',rule:'One repeating guitar loop with almost no chord changes for 4:59 — broke the variation mandate',result:'Grammy winner and a standard — proved a single hypnotic groove can hold emotional truth forever'},{song:'"Hallelujah" — Leonard Cohen',rule:'No traditional chorus — just verse variations all landing on one repeated word',result:'Most covered song of the 20th century, proves a single emotional truth repeated is more powerful than a hook'},{song:'"Skinny Love" — Bon Iver',rule:'Recorded in a Wisconsin cabin — lo-fi, falsetto, deliberately thin sound against the polished SS tradition',result:'Created an entire aesthetic movement and proved raw emotional honesty beats studio craft every time'}],vocables:{sounds:'mmm, la-la-la, oh',when:'bridge hum before final chorus, quiet outro',suno_tag:'[Outro - hummed melody]',borrowed_from:'folk tradition',notes:'Keep minimal — one vocable moment per song max, intimacy over crowd energy'}},
  altrock:{dna:'Indie ethos + rock power + outsider perspective. Distortion as emotional language. Quiet-loud dynamic is the core structural move.',structure:'VPCVC with massive dynamic variance. Quiet verse (clean guitar, restrained vocal) → explosive chorus (distortion, full drums, pushed vocal).',suno:'Sub-genre specific: "shoegaze, wall of sound" vs "post-punk, angular guitars, Joy Division atmosphere" vs "indie rock, jangly clean guitars".',keys:['Chorus must be earned — verse tension must build to a real release','Distortion is an emotion — use it purposefully','Alt-rock lyrics embrace ambiguity — specific images, opaque meaning','Bridge should recontextualize the chorus, not just repeat it'],artists:'Radiohead · Pixies · Pavement · Modest Mouse · The National · Interpol · Arctic Monkeys · Mitski',counter:{device:'Second guitar counter-riff / bass counter-melody',does:'A second guitar plays a melodic counter-riff against the lead guitar — often a clean line against distortion, or a high-register phrase against a low rhythm part. The bass frequently breaks from the root and plays a counter-melodic line in post-chorus sections, carrying the emotional weight while the guitars settle.',howto:'second guitar counter-riff, bass counter-melody, lead guitar answer phrase',map:'Verse: bass counter-melody under clean guitar / Pre-chorus: second guitar tension / Chorus: bass breaks from root / Bridge: guitar leads melodically'},outliers:[{song:'"Creep" — Radiohead',rule:'Band hated it, considered it derivative and buried it as B-side — the opposite of a deliberate release',result:'Became their signature song and #1 in every market, proof that accidental vulnerability beats calculated cool'},{song:'"Mr. Brightside" — The Killers',rule:'No real dynamic contrast or bridge — same relentless energy the entire song with no release',result:'Never left the UK charts for 16 consecutive years, proving sustained tension can replace tension-release cycles'},{song:'"Smells Like Teen Spirit" — Nirvana',rule:'Deliberately murky production against the polished hair-metal production standard of the era',result:'Killed the dominant genre overnight and reset the entire decade — the anti-production became the new production'}],vocables:{sounds:'woah, hey-hey, oh',when:'pre-chorus lift, post-chorus crowd release',suno_tag:'[Crowd chant]',borrowed_from:'blues rock tradition',notes:'Must feel earned — build verse tension first or the woah lands flat'}},
  reggae:{dna:'Offbeat skank (guitar chop on beats 2&4), one-drop drum (kick on beat 3), bass as melody, spiritual/political consciousness, community and resistance.',structure:'Long meditative verses. Chorus is comforting mantra, not explosive hook. Outro vamps are essential — let the groove breathe and fade slowly.',suno:'"reggae, one-drop rhythm, offbeat skank guitar, melodic bass, roots reggae" for classic. "Dancehall, digital riddim, 90 BPM" for modern.',keys:['Bass is the lead instrument — it carries melody','Chorus is resolution, not climax — reggae builds peace not tension','Outro vamp is non-negotiable','Add [dub break] in Suno for echo/reverb instrumental section'],artists:'Bob Marley · Peter Tosh · Burning Spear · Jimmy Cliff · Toots · Damian Marley · Chronixx',counter:{device:'Rhythm guitar offbeat skank / melodica / horn fills',does:'The rhythm guitar chop on beats 2 and 4 creates a persistent rhythmic counter-melody against the bass — together they form a locked two-voice counterpoint that IS reggae\'s groove. Melodica or horns fill the spaces between vocal phrases with melodic responses.',howto:'offbeat rhythm guitar skank, melodica fills, horn response phrases',map:'Throughout: guitar skank creates rhythmic counter / Verse gaps: melodica or horn fills / Dub break: bass and guitar in pure counterpoint'},outliers:[{song:'"Informer" — Snow',rule:'White Canadian rapper doing reggae-influenced pop in 1992 — the genre\'s cultural gatekeeping was absolute',result:'#1 for 7 consecutive weeks, proved the groove transcends the performer\'s cultural origin'},{song:'"Electric Avenue" — Eddy Grant',rule:'Full electronic synthesizer production in a roots reggae context before that fusion had any precedent',result:'Top 5 globally, proved reggae\'s rhythmic soul survived the digital production shift'},{song:'"Kingston Town" — UB40',rule:'British white band doing Jamaican roots reggae with pop crossover production — double cultural leap',result:'Massive worldwide success for decades, proved authentic reverence for a genre trumps birthright'}],vocables:{sounds:'yeah, jah, one love, irie',when:'outro vamp (non-negotiable), call-response in chorus',suno_tag:'[Outro vamp]',borrowed_from:'gospel and African call-response',notes:'Outro vamp with vocable chant is structurally required in roots reggae'}},
  afrobeats:{dna:'Polyrhythmic percussion, talking drum, high-life guitar, pidgin English/Yoruba, call-response, joy as spiritual practice.',structure:'Hook-driven but loose. Hook repeats 4-6 times. Verses are conversational and ad-libbed in feel.',suno:'"afrobeats, talking drum, shekere, highlife guitar, Lagos pop" for Nigerian. "Amapiano, log drum, piano, South African" for SA. BPM 95-105.',keys:['Hook must be melodically simple but rhythmically interesting','Call-response between lead and backing vocal is structural','The groove should make you move before you process the words'],artists:'Wizkid · Burna Boy · Davido · Tems · CKay · Rema · Ayra Starr · Femi Kuti',counter:{device:'Guitar ostinato / highlife guitar counter-line',does:'The highlife-style guitar plays a repeating melodic ostinato — a short looping phrase — that weaves around the vocal hook. This is the defining counter-melody of Afrobeats: the guitar "sings" its own melodic thread simultaneously with the vocal, creating the characteristic layered groove.',howto:'highlife guitar ostinato, melodic guitar counter-line, guitar riff loop',map:'Throughout all sections: guitar ostinato never stops / Hook: guitar counter-line peaks / Verse: guitar is subtle beneath vocal / Outro: guitar leads the fade'},outliers:[{song:'"One Dance" — Drake',rule:'Canadian rapper crossing fully into Afrobeats without Yoruba roots or prior genre credibility',result:'Broke global streaming records and introduced Afrobeats to audiences who had never heard it'},{song:'"Ye" — Burna Boy',rule:'Vulnerable emotional confession in a genre defined by celebration, energy, and communal joy',result:'Became his international breakthrough, proved vulnerability was the missing ingredient in Afrobeats\' global crossover'},{song:'"Essence" — Wizkid ft. Tems',rule:'Minimal spacious production with a barely-there hook — against the dense polyrhythmic tradition',result:'One of the biggest Afrobeats crossover hits ever, showed the genre\'s power multiplied through restraint'}],vocables:{sounds:'eh, aye, ehn, oh-oh',when:'hook repeat, outro fade, between call-response lines',suno_tag:'[Call and response]',borrowed_from:'Yoruba oral tradition, highlife',notes:'Vocable is rhythmic not melodic — it accents the groove, not the emotion'}},
  blues:{dna:'12-bar AAB lyric form, call-response between voice and guitar, 3 chords (I-IV-V), emotional honesty above all production.',structure:'12-bar progression is the container. AAB: line stated, repeated, then resolved/twisted. Guitar solos ARE verses.',suno:'"Chicago blues, electric guitar, shuffle rhythm, walking bass, harmonica" vs "Delta blues, acoustic slide guitar" vs "Texas blues, electric shuffle".',keys:['AAB form forces economy — every line must be justified','Guitar answers the vocal — it is a conversation','Blues is about transformation not just suffering — resolution matters','Specify shuffle rhythm feel in song production'],artists:'Robert Johnson · Muddy Waters · B.B. King · Howlin Wolf · SRV · John Lee Hooker · Etta James',counter:{device:'Guitar talks back to the vocal (call-and-response)',does:'After every sung phrase, the guitar "answers" with its own melodic response — this call-and-response IS the cornerstone of blues. The guitar is not accompaniment; it is the second voice in a conversation. In slow blues this response is a bending note or lick. In uptempo blues it is a quick turnaround phrase.',howto:'guitar call and response, guitar answers vocal, blues guitar lick fills',map:'Every verse: vocal line then guitar response / Turnaround: guitar leads into next section / Solo sections: guitar takes full melodic lead'},outliers:[{song:'"Seven Nation Army" — White Stripes',rule:'No bass guitar at all — octave pedal on guitar faking bass, just two people with no traditional blues band',result:'Most recognized rock riff of the 21st century, became a global sports chant, proved constraint creates monuments'},{song:'"The Thrill Is Gone" — B.B. King',rule:'Added orchestral strings to raw Chicago blues — blues purists were furious at the pop production',result:'Won Grammy for Best R&B Performance, broke BB King into mainstream audiences who never heard traditional blues'},{song:'"Crossroads" — Cream (Robert Johnson cover)',rule:'3-minute blues standard stretched to 4:13 with a rock guitar solo that had nothing to do with blues tradition',result:'Became one of rock\'s defining moments and introduced Robert Johnson to millions who had never heard the original'}],vocables:{sounds:'oh, lord, mmm, well',when:'between AAB lines as guitar-answering voice, slow blues outro',suno_tag:'[Blues call response]',borrowed_from:'field hollers, work songs',notes:'Vocable fills the silence after the guitar answers — the third voice in the conversation'}},
  kpop:{
    dna:'Precise vocal production, multi-member group dynamics, mandatory pre-chorus tension builder, rap break in most songs, choreography-driven structure (8-count phrasing), key change before final chorus, visual concept driving lyric themes. The most engineered pop format in existence.',
    structure:'Intro → Verse 1 → Pre-Chorus (essential) → Chorus → Verse 2 → Pre-Chorus → Chorus → Rap Break / Bridge → Key Change → Final Chorus (bigger) → Outro. Every section has a job and a predetermined energy level.',
    suno:'"K-pop, synth pop, 808 bass, punchy drums, bright synths, polished production, 120-130 BPM" for standard. "K-pop ballad, piano, strings, emotional, 80 BPM" for ballad. "K-pop dance pop, electronic, hi-hats, energetic" for club-ready.',
    keys:['Pre-chorus is non-negotiable — it is what makes K-pop K-pop. Build tension before every chorus','Rap break must contrast completely with the vocal sections — different flow, different energy','Final chorus MUST be a key change (usually +1 or +2 semitones) — the listener expects it','8-bar phrasing throughout — K-pop is built for choreography, count your bars','Verse lyrics can be abstract/visual — the feeling matters more than literal meaning','Specify "K-pop" first in your style prompt — it is the strongest genre signal for AI platforms'],
    artists:'BTS · BLACKPINK · aespa · NewJeans · TWICE · EXO · IU · Stray Kids · SEVENTEEN · LE SSERAFIM',
    counter:{device:'Rap break rhythmic counter / synth post-chorus line',does:'The rap break section creates a complete rhythmic counterpoint to the melodic hook — different flow, different register, different texture. After the final chorus, a synth or string line plays a counter-melody during the outro that re-harmonizes the hook, giving it new emotional meaning.',howto:'rap break rhythmic contrast, post-chorus synth counter-melody, string answer phrase',map:'Verse: synth arpeggiation counter / Pre-chorus: tension builds, no counter / Rap break: rhythm IS the counter / Post-chorus: synth or string counter-line peaks'},
    outliers:[
      {song:'"Gangnam Style" — PSY',rule:'Solo older male comedian — broke every group-dynamic and youth-idol formula K-pop required',result:'First YouTube video to reach 1 billion views, launched K-pop globally'},
      {song:'"Dynamite" — BTS',rule:'Entirely English lyrics with no Korean, no traditional rap break — broke the genre\'s identity code',result:'#1 in the US, broke global streaming records overnight'},
      {song:'"Attention" — NewJeans',rule:'Retro 2000s R&B with no elaborate pre-chorus or key change — stripped K-pop\'s signature engineering',result:'Redefined the genre toward minimal cool, launched K-pop\'s "anti-idol" era'}
    ],
    vocables:{sounds:'ooh, ah, yeah, na-na',when:'post-chorus (always), outro sweetener, rap break contrast',suno_tag:'[Post-chorus ad-lib]',borrowed_from:'R&B and pop traditions, engineered',notes:'K-pop vocables are precision-engineered — placed at exact bar positions, not improvised'}
  },
  latin:{
    dna:'Rhythmic diversity (salsa, cumbia, bachata, bossa), emotional romanticism, bilingual/Spanish lyrics, family and community themes, dance-floor energy. Many sub-genres under one umbrella.',
    structure:'Varies by sub-genre. Salsa: verse-chorus with horn breaks. Bachata: romantic verse-chorus. Reggaeton/Latin pop: hook-heavy, dembow or Latin rhythm underpins everything.',
    suno:'"Latin pop, acoustic guitar, percussion, romantic, 100 BPM" for pop crossover. "salsa, brass section, piano, congas, 180 BPM" for salsa. "bachata, guitar, romantic vocals, 130 BPM" for bachata.',
    keys:['Rhythm IS the genre — specify the exact dance rhythm in your prompt','Bilingual lyrics (Spanish + English) dramatically increase global reach','Percussion instruments are not optional — they ARE the genre','Romantic/family themes are universal — lean in not away'],
    artists:'Shakira · Marc Anthony · Romeo Santos · Celia Cruz · Juan Luis Guerra · Selena · J Balvin · Bad Bunny',
    counter:{device:'Piano montuno / horn section stabs',does:'The piano montuno — a repeating right-hand rhythmic-melodic figure locked to the clave — creates the defining counter-melody in salsa and Latin jazz. Against the vocal melody, the montuno never stops, providing both harmonic and melodic contrast. Horn section stabs punctuate between vocal phrases as sharp counter-accents.',howto:'piano montuno pattern, horn stab counter-accents, clave rhythmic counter',map:'Throughout: montuno runs under everything / Verse: subtle montuno / Chorus: horns stab between phrases / Brass break: full counter-melody takes over'},
    outliers:[
      {song:'"Despacito" — Luis Fonsi ft. Daddy Yankee',rule:'Slow romantic ballad-reggaeton hybrid that blurred every Latin sub-genre boundary',result:'Broke YouTube streaming records globally, introduced Latin music to audiences worldwide'},
      {song:'"La Bamba" — Ritchie Valens',rule:'Mexican folk song with rock\'n\'roll production and no Spanish-language pop precedent',result:'First rock en español to chart in the US, opened the genre boundary forever'},
      {song:'"Macarena" — Los del Rio',rule:'Minimal repetitive structure with no narrative — just a hook and a dance instruction',result:'Became a global phenomenon, proof that simplicity beats sophistication when the groove is right'}
    ],
    vocables:{sounds:'ay, aye, oye, eh',when:'salsa vamp, cumbia chorus response, outro fade',suno_tag:'[Latin vocal call]',borrowed_from:'Afro-Caribbean oral tradition',notes:'Bilingual vocables work best — Spanish affirmations feel authentic, English ones feel pop-crossover'}
  },
  reggaeton:{
    dna:'Dembow rhythm (syncopated kick-snare pattern), 808 bass, bilingual/Spanish lyrics, perreo culture, street credibility, romance and party energy. Production-first genre — the beat IS the identity.',
    structure:'Hook-first or hook-heavy. Short verses (8-12 bars), enormous hook repeated 4-6 times. Outro vamp is essential. Bridges rare — energy never drops for long.',
    suno:'"reggaeton, dembow rhythm, 808 bass, electronic production, 90-95 BPM, trap hi-hats, Spanish lyrics" for classic. "reggaeton romántico, melodic vocals, smooth 808s" for romantic. "trap latino, dark 808s, aggressive flow" for urban.',
    keys:['Dembow pattern is non-negotiable — it IS reggaeton','Spanish lyrics (or Spanglish) dramatically increase authenticity','Hook must be the catchiest thing in the song by a wide margin','Production energy stays high throughout — no quiet moments','Specify "dembow, 90 BPM" in your style prompt for correct rhythm'],
    artists:'Daddy Yankee · J Balvin · Bad Bunny · Ozuna · Karol G · Maluma · Nicky Jam · Rauw Alejandro',
    counter:{device:'Dembow rhythmic counter / producer synth melody',does:'The dembow kick-snare pattern creates a persistent rhythmic counterpoint against the melodic hook — the syncopated "and" hit is the counter-accent that defines reggaeton\'s groove. A producer synth melody or vocal chop often plays a secondary melodic line under the main hook in the perreo section.',howto:'dembow rhythmic counter, synth melody loop, vocal chop counter-line',map:'Throughout: dembow creates rhythmic counter / Hook: producer melody layers under vocal / Perreo section: synth counter-melody emerges / Outro: counter-melody leads fade'},
    outliers:[
      {song:'"Gasolina" — Daddy Yankee',rule:'Crude unpolished production and explicit content with no romantic veneer — against genre\'s romantic tradition',result:'Launched reggaeton globally, proved the rawer the better when the dembow is undeniable'},
      {song:'"Tití Me Preguntó" — Bad Bunny',rule:'Ironic self-deprecating comedy in a genre known for machismo and seriousness',result:'One of 2022\'s biggest global hits, showed reggaeton could be funny and still dominate'},
      {song:'"Con Calma" — Daddy Yankee ft. Snow',rule:'Recycled Snow\'s 1992 "Informer" hook — broke the originality-first production rule with nostalgia',result:'Topped charts globally, proved strategic nostalgia beats chasing current trends'}
    ],
    vocables:{sounds:'aye, eh, yo, dale',when:'perreo section hook, outro vamp, dembow accent',suno_tag:'[Perreo chant]',borrowed_from:'dancehall, Jamaican patois',notes:'"Dale" (Daddy Yankee signature) is the genre-defining vocable — signals authentic reggaeton culture'}
  },
  punk:{dna:'3 chords, max 3 minutes, political or personal fury, anti-production aesthetic, speed as ideology, DIY ethic.',structure:'Fast VCVCBC or just VCV. No solos usually. Verse = setup. Chorus = explosion. Speed to end is valid.',suno:'"punk rock, distorted guitar, fast drums, raw production, 180 BPM, aggressive vocals" for classic. "Post-punk, angular guitar, bass-forward, 140 BPM" for post-punk.',keys:['Every second wasted is ideologically wrong — cut everything that does not serve the fury','Chorus should be a slogan — 4-8 words, shoutable','Production should sound slightly wrong — too loud, slightly clipping','Personal fury is timeless; political specificity ages'],artists:'Sex Pistols · The Clash · Ramones · Dead Kennedys · Black Flag · Wire · Bikini Kill · Green Day',counter:{device:'Bass counter-melody (only when intentional)',does:'No counter-melody IS the aesthetic statement — punk\'s refusal of ornamentation is ideological. However, the bass can and should diverge from the guitar root occasionally — especially in post-punk (Wire, The Clash) where the bass plays a melodic counter-line that gives the song its intelligence.',howto:'bass counter-melody, post-punk bass independence, melodic bass line',map:'Chorus: bass locks with guitar (no counter — pure power) / Verse: bass may diverge melodically / Bridge: bass can take counter-melodic lead briefly'},outliers:[{song:'"London Calling" — The Clash',rule:'Ska + reggae + rockabilly + jazz within a punk framework — broke the 3-chord 3-minute speed ideology',result:'Named greatest punk album ever despite violating every punk rule, proved punk is an attitude not a template'},{song:'"Good Riddance (Time of Your Life)" — Green Day',rule:'Acoustic guitar ballad with no distortion from a band built entirely on distortion and aggression',result:'Became their biggest commercial hit, played at every graduation and funeral — showed vulnerability was the missing note'},{song:'"Ever Fallen in Love" — Buzzcocks',rule:'Romantic love song themes in punk — the genre demanded political fury, not romantic vulnerability',result:'Considered one of the greatest British songs ever recorded, proved punk could contain the full range of human emotion'}],vocables:{sounds:'hey, oi, yeah, go',when:'chorus shout, outro collective chant',suno_tag:'[Crowd shout]',borrowed_from:'football terrace chant, rock',notes:'Must sound collective — punk vocables are ideological, they erase the individual voice'}},
  parody:{
    dna:'Comedy through musical weaponization. A parody rewrites a recognizable song with absurdist/satirical/comedic lyrics while keeping the melody and structure intact. The humor lives in the gap between the serious original form and the ridiculous subject matter. Commitment to the bit is everything — play it completely straight musically. Specificity is the engine of comedy: "a cat who knocks glasses off tables" beats "a mischievous cat" every time.',
    structure:'Mirror the original song structure exactly — same verse lengths, same chorus, same bridge placement. The comedic contrast between the production seriousness and the lyrical absurdity IS the joke. Use the original song\'s exact section count. Never break the parody frame mid-song.',
    suno:'Match the original song\'s production style exactly. If parodying a power ballad: "dramatic piano, soaring strings, stadium rock, emotional vocal". If parodying trap: "trap beat, 808 bass, auto-tune". The music should sound serious — the comedy is entirely lyrical.',
    keys:[
      'The setup rule: establish the absurd premise clearly in the first 4 lines of verse 1 — never bury the joke',
      'Callback structure: introduce a specific image in verse 1, callback and escalate it in verse 2, payoff in the bridge',
      'Chorus is the punchline delivery system — it must be immediately singable AND the funniest part',
      'Commitment rule: never wink at the camera. Play every line completely straight. The music is always sincere',
      'Rule of threes in comedy: setup, setup, subvert. Two expected things then one unexpected. Works at line level too',
      'Specificity is the engine: "I ate seventeen hot pockets" > "I ate a lot of food". Proper nouns, numbers, brand names'
    ],
    artists:'Weird Al Yankovic · Flight of the Conchords · Lonely Island · Bo Burnham · "Weird Al" · Garfunkel & Oates · Tim Minchin',
    counter:{device:'Mock-serious orchestral counter / ironic instrument response',does:'The counter-melody in parody is deployed for comedic effect: a soaring string line under a lyric about laundry; a triumphant brass response after a trivial punchline. The instrument\'s emotional seriousness vs. the lyric\'s absurdity IS the joke. The counter-melody should be more emotionally committed than the song deserves.',howto:'ironic orchestral counter-melody, serious instrumental response, mock-epic strings',map:'Chorus: most elaborate counter to heighten the absurdity / Bridge: counter-melody at its most earnest under the most ridiculous lyric / Verse: subtle counter as setup'},
    outliers:[
      {song:'"White & Nerdy" — Weird Al Yankovic',rule:'Parody charted higher (#9) than the Chamillionaire original it mocked — the copy beat the source',result:'Proved parody could outperform originals when the execution is sharper than the source material'},
      {song:'"Eat It" — Weird Al Yankovic',rule:'MJ gave permission to parody "Beat It" — commercial competitor territory no one had dared enter',result:'Went platinum, became bigger than many of the originals it mocked, normalized the parody genre'},
      {song:'"Dick in a Box" — Lonely Island ft. Justin Timberlake',rule:'SNL digital short treated with complete sincerity as an R&B song with no wink at the camera',result:'Grammy-nominated, charted on Billboard Hot 100 — proved commitment makes comedy transcend its context'}
    ],
    vocables:{sounds:'(matching the original song\'s vocables)',when:'mirror the original\'s vocable placement for comedic contrast',suno_tag:'match the original',borrowed_from:'whatever song is being parodied',notes:'Rewrite the vocable with an absurd alternative for maximum comedy — "na na na" → "no no no (I forgot)"'}
  },
  comedy:{
    dna:'Original comedic songs — not parody rewrites but purpose-built funny songs. Musical comedy weaponizes genre conventions for laughs: the earnest folk song about mundane frustration, the over-produced ballad about pizza, the gangster rap about doing taxes. Structure serves the joke. The genre itself is the straight man. Comedy comes from subverting expectations, from specificity, from escalation.',
    structure:'Three-act joke structure mapped to verse/chorus/bridge. Verse 1: establish the premise. Verse 2: complications and escalation. Bridge: the twist or darkest point. Final chorus: subverted to reflect the journey. Always end on the biggest laugh.',
    suno:'Intentional genre mismatch amplifies comedy. Use "epic orchestral, dramatic, soaring" for a song about grocery shopping. Use "soft folk ballad, acoustic, intimate" for absurd dark content. The production sincerity is the straight man to the comedy. Specify genre that contrasts the subject.',
    keys:[
      'The comedy premise must be stated or implied in the title and first verse — do not bury the setup',
      'Escalation rule: each verse should raise the stakes of the absurdity. Verse 1 is silly, Verse 2 is committed, Bridge is unhinged',
      'Musical genre should be played completely straight — the comedy is lyrical, not musical',
      'End on the biggest laugh — the final line of the song is the punchline, always',
      'Puns and wordplay: use sparingly — one great pun per song, not wall-to-wall. Subverted clichés hit harder than straight puns',
      'The bridge is the darkest/most absurd escalation — then the final chorus lands with the full weight of the joke'
    ],
    artists:'Bo Burnham · Flight of the Conchords · Lonely Island · "Weird Al" Yankovic · Tim Minchin · Garfunkel & Oates · Stephen Lynch · Tenacious D',
    counter:{device:'Genre-contrast instrument / comedy response voice',does:'The counter-melody carries the punchline in comedy music. The instrument chosen to respond to the vocal creates the comedic contrast — a tuba playing a pompous counter-line after a self-deprecating lyric, or a music-box response after a dark admission. The counter-melody is the straight man.',howto:'comedic instrument counter-response, genre-contrast counter-melody, comic timing instrument fill',map:'End of each verse: instrument responds to the lyric comedically / Chorus: counter-melody amplifies the absurdity / Bridge: counter-melody has its most unhinged moment'},
    outliers:[
      {song:'"I\'m on a Boat" — Lonely Island ft. T-Pain',rule:'Comedy rap performed completely straight with Auto-Tune earnestness, no jokes acknowledged',result:'Charted Top 40, Grammy-nominated — the genre sincerity made the comedy hit harder'},
      {song:'"Always Look on the Bright Side of Life" — Monty Python',rule:'Cheerful ukulele pop in a death scene, total tonal mismatch between music and context',result:'Became UK\'s most-requested funeral song — comedy so committed it became genuinely comforting'},
      {song:'"We Didn\'t Start the Fire" — Billy Joel',rule:'Song is a list of historical events with no narrative arc — broke every storytelling rule',result:'#1 hit globally, proved a hook and momentum can replace conventional lyric structure entirely'}
    ],
    vocables:{sounds:'varies — chosen for comedic contrast with genre',when:'punchline landing pad, verse-end comedic beat',suno_tag:'context-dependent',borrowed_from:'musical theater tradition',notes:'The vocable itself can be the joke — a heartfelt "ooh" after a ridiculous confession hits hard'}
  },
  tvmusical:{
    dna:'Music written for narrative context: TV themes, film scores, Broadway/musical theater, video game OSTs, jingles. Every song has a DRAMATIC FUNCTION — it advances plot, reveals character, creates atmosphere, or sells a product. The lyric is always in service of something beyond itself. Musical theater in particular: characters sing what they cannot say in dialogue — the song is the emotional eruption.',
    structure:'Musical theater: AABA, VCVCBC, or through-composed based on dramatic need. TV theme: 30-90 seconds, premise statement in verse, identity hook in chorus. Jingle: 15-60 seconds, product name in hook 3+ times, problem/solution structure. Film score: follows visual rhythm, no fixed structure.',
    suno:'TV theme: "catchy, memorable, [genre of show] theme song, 90s sitcom" or "dramatic TV theme, orchestral, HBO prestige". Musical theater: "Broadway musical, theatrical vocals, show tune, orchestral pit band". Jingle: "upbeat jingle, major key, catchy, commercial, [brand feeling]". Always specify the exact use case.',
    keys:[
      'TV theme rule: the audience must know what kind of show this is within 5 seconds — genre, tone, era, class',
      'Musical theater: the song must start where spoken dialogue left off emotionally — it is the overflow of feeling',
      'Character voice: every musical theater song must sound like IT COULD ONLY be sung by this character in this moment',
      'Jingle: product name minimum 3 times. Problem in verse, solution/product in chorus. Benefit not feature',
      'The "I want" song (musical theater): character states their deepest desire in the bridge — this is the emotional core',
      'Reprise strategy: the same melody with changed lyrics at the end of Act 2 hits harder than any new song'
    ],
    artists:'Stephen Sondheim · Lin-Manuel Miranda · Andrew Lloyd Webber · Jerry Herman · Joss Whedon · Mark Shaiman · Alan Menken · John Williams · Ennio Morricone',
    counter:{device:'Orchestra underscore / leitmotif counter-line',does:'Musical theater\'s counter-melody is the orchestral underscore — the pit orchestra plays a thematic counter-line beneath the vocal that either supports or dramatically contradicts the lyric (ironic underscore). Leitmotifs return as counter-melodies: a character\'s theme plays under another character\'s song, creating dramatic subtext.',howto:'orchestral underscore counter-melody, leitmotif counter-line, dramatic ironic underscore',map:'Verse: orchestra plays supportive counter-melody / Chorus: full pit counter-melody peaks / Key scenes: ironic underscore contradicts lyric for dramatic effect / Reprise: original melody returns as counter under new lyric'},
    outliers:[
      {song:'"Hamilton" — Lin-Manuel Miranda',rule:'Hip-hop and rap used to tell a story about the Founding Fathers — zero Broadway precedent',result:'Pulitzer Prize winner, cultural phenomenon, reshaped what musicals are allowed to be'},
      {song:'"Once More with Feeling" — Joss Whedon (Buffy the Vampire Slayer)',rule:'TV drama characters forced to sing against their will as a horror plot device — medium-breaking',result:'Emmy-nominated episode, cult classic, proved TV could execute full musical theater without a stage'},
      {song:'"Circle of Life" — Elton John / Hans Zimmer (The Lion King)',rule:'Pop rock anthem structure in an animated children\'s film opening with no dialogue or setup',result:'One of the most recognized film songs ever, launched Elton John\'s animation/film scoring career'}
    ],
    vocables:{sounds:'la-la-la, da-da-da, hmm',when:'theme song hook, character leitmotif, jingle repeat',suno_tag:'[Theme vocal hook]',borrowed_from:'musical theater, vaudeville',notes:'TV theme vocables must be instantly memorable — they become identity markers for the show'}
  },
  neosoul:{
    dna:'D\'Angelo, Erykah Badu, Lauryn Hill, Bilal, Maxwell — the collision of classic soul (raw emotion, live instrumentation, vulnerability) and hip-hop production aesthetics (head-nodding groove, layered samples, lo-fi warmth). Neo-soul is anti-formula: it breathes, it drags beats deliberately, it leaves space. Vocals are instruments — improvised runs, ad-libs that ARE the lyric. Production feels human and imperfect on purpose.',
    structure:'Loose and groove-led. Hook is not always the loudest moment — sometimes the vocal vamp in the outro IS the song. Intros are often long instrumental grooves before the vocal enters (8-16 bars). Bridges frequently go to a half-time feel. Songs end on extended vamps, not hard stops.',
    suno:'"neo-soul, Rhodes piano, Fender bass, warm vinyl warmth, head-nod groove, live drums with swing, 85-95 BPM" for classic. "neo-soul, 90s hip-hop drums, soul vocals, Dilla-style off-beat, warm, soulful" for hip-hop adjacent. "neo-soul ballad, piano, strings, intimate, vulnerability" for slow. Always specify "live feel, swing" — not quantized.',
    keys:[
      'Groove before hook: the beat must make the listener nod before the vocal arrives. Never rush the entrance',
      'Imperfection is the aesthetic: slightly late snares (J Dilla feel), crackle, room sound, breath in the mic',
      'Vocal ad-libs are not decoration — they are parallel lyrics that carry equal emotional weight to the main line',
      'Leave space: the rests ARE the music. Silence between phrases creates tension more powerful than constant vocal',
      'The outro vamp escalates emotionally — it should be the most cathartic part of the song, not a fade-out afterthought',
      'Lyrics avoid cliché with surgical specificity: sensory detail, time-stamped moments, names of places and things'
    ],
    artists:'D\'Angelo · Erykah Badu · Lauryn Hill · Maxwell · Bilal · India.Arie · Musiq Soulchild · Common · Jill Scott · Frank Ocean · H.E.R. · SZA',
    counter:{device:'Rhodes/keyboard ostinato vs. lead vocal',does:'The keyboard or Rhodes piano plays a continuous repeating melodic-rhythmic figure — an ostinato — that is the counter-melody Neo-Soul is built on. D\'Angelo\'s Voodoo is the reference: the Rhodes "talks" alongside the vocal rather than underneath it. The bass walks against both. Three voices in constant melodic conversation: lead vocal, keyboard ostinato, melodic bass.',howto:'Rhodes piano ostinato, keyboard counter-melody, melodic bass walks against vocal',map:'Throughout: Rhodes ostinato never stops / Intro: keyboard establishes counter before vocal enters / Verse: three-voice counterpoint / Outro vamp: keyboard and vocal improvise against each other freely'},
    outliers:[
      {song:'"Redbone" — Childish Gambino',rule:'Slowed 70s funk tempo so extreme (95 BPM) it felt disorienting — modern listeners said it was "weird"',result:'#1 R&B hit, became Donald Glover\'s signature song and sparked a retro neo-soul revival'},
      {song:'"Location" — Khalid',rule:'Stripped minimalism and teenage perspective with barely any arrangement in a genre known for lush production',result:'Multi-platinum debut that launched his career and proved emotional truth beats sonic complexity'},
      {song:'"Didn\'t Cha Know" — Erykah Badu',rule:'Deliberate off-tempo dragging beats (J Dilla feel) that sounded "late" to producers trained in precision',result:'Defined neo-soul\'s aesthetic of intentional imperfection and influenced a generation of producers'}
    ],
    vocables:{sounds:'ooh, ah, mmm, baby, yeah',when:'bridge build, post-chorus run, outro melisma',suno_tag:'[Ad-lib vocal runs]',borrowed_from:'soul, gospel, jazz scatting',notes:'Neo-soul vocables are the most technically demanding — they signal the vocalist\'s range and emotional depth'}
  },
  gospel:{
    dna:'Music as spiritual encounter — not performance but worship, testimony, and collective catharsis. Call-and-response at its DNA core: leader calls, congregation answers. The song builds to a moment of release (the "shout") where emotion overflows technique. Three traditions: Traditional Gospel (Thomas Dorsey, Mahalia Jackson — piano, choir, testimony), Contemporary Gospel (Kirk Franklin — pop production, hip-hop rhythms, mass choir), Worship/CCM (Chris Tomlin, Hillsong — arena rock, CCLI, corporate worship). Each has distinct rules.',
    structure:'Gospel resists fixed structure because it serves the Spirit — the song goes where the moment leads. Typically: Verse (testimony/setup) → Pre-Chorus (tension building) → Chorus (declaration) → Bridge (the highest emotional point — often repeated 4-8x as the choir vamps) → Outro Vamp (where the real church happens — this section can last minutes). Never cut the outro vamp short.',
    suno:'"traditional gospel, Hammond B3 organ, choir, piano, hand claps, call and response, soul" for classic. "contemporary gospel, Kirk Franklin style, hip-hop beat, mass choir, full production, celebratory" for modern. "worship ballad, piano, strings, intimate, congregational, 75 BPM" for CCM/worship. "southern gospel, acoustic, quartet, harmonies" for country gospel.',
    keys:[
      'Call-and-response is structural, not decorative — write the congregation\'s response line as carefully as the lead',
      'The bridge is the climax, not the chorus — in gospel the bridge is repeated and escalated until the room breaks open',
      'Testimony structure: I WAS lost/broken/struggling → God moved/intervened → NOW I am free/healed/changed. The arc is transformation',
      'Dynamics are everything: whisper the verse, speak the pre-chorus, DECLARE the chorus, SHOUT the bridge',
      'The vamp outro MUST be written — this is where 80% of the emotional impact lives. Write 4-8 lines to cycle through',
      'Contemporary gospel: the beat must make you move before the lyric lands. Rhythm serves spirit, spirit serves rhythm'
    ],
    artists:'Mahalia Jackson · Thomas Dorsey · Andraé Crouch · Kirk Franklin · Yolanda Adams · Donnie McClurkin · BeBe & CeCe Winans · Fred Hammond · Tye Tribbett · Maverick City Music · Hillsong · Chris Tomlin',
    counter:{device:'Choir response to lead vocal (call-and-response IS the counter-melody)',does:'Gospel\'s counter-melody IS its structure: the choir\'s response to the lead vocal creates a constant back-and-forth that builds to the bridge vamp. The organ plays fills between every phrase. In the bridge, the choir vamp becomes the primary melody while the lead improvises a counter over them — a complete melodic inversion.',howto:'choir call and response, organ fill counter-melody, choir vamp counter',map:'Verse: organ fills between phrases / Chorus: choir responds to every lead line / Bridge: choir vamp IS the main melody, lead sings counter over / Outro vamp: full call-and-response builds'},
    outliers:[
      {song:'"Jesus Walks" — Kanye West',rule:'Trap production and secular rapper context for gospel themes — radio refused to play it initially',result:'Grammy winner and mainstream #1, opened the door for hip-hop gospel crossover permanently'},
      {song:'"Take Me to Church" — Hozier',rule:'Anti-religion anthem that weaponized gospel\'s emotional architecture against institutional church',result:'Multi-platinum worldwide, proved gospel\'s sonic power transcends its theological content'},
      {song:'"Oh Happy Day" — Edwin Hawkins Singers',rule:'Gospel number that crossed over to secular pop charts in 1969 — culturally forbidden at the time',result:'First gospel song to chart secular, sold over a million copies and opened the crossover door'}
    ],
    vocables:{sounds:'hallelujah, oh Lord, amen, yes Lord, glory',when:'call-response throughout, vamp at song close, bridge climax',suno_tag:'[Congregational response]',borrowed_from:'African oral tradition, spirituals',notes:'Gospel vocables are theological — they are not filler, they are declarations. Use with full commitment'}
  },
  children:{
    dna:'Music for ages 2-10 — but great children\'s music (Raffi, They Might Be Giants, "Mister Rogers") works for adults too because it operates on multiple levels simultaneously. Core rules: simple melodies (5-note range ideal), repetition is a feature not a flaw, every listen rewards a child (singability, motion), vocabulary stays accessible without being condescending. Themes: wonder, kindness, the natural world, belonging, imagination, small everyday adventures. The best children\'s songs teach without ever saying "lesson".',
    structure:'Short (90 seconds - 3 minutes). VCVCBC or VCV. Chorus/hook must be singable after ONE listen — maximum 8 words. Verses teach something new each time. Bridge is an adventure or a question. Outro brings safety/resolution. Physical motion cues embedded in lyrics (clap, stomp, spin, jump) make songs interactive.',
    suno:'"children\'s song, ukulele, hand claps, playful, major key, bright, warm, singalong" for classic. "educational children\'s song, upbeat, acoustic guitar, glockenspiel, 110 BPM, joyful" for school. "lullaby, soft, gentle, acoustic, 60 BPM, warm, soothing" for bedtime. "children\'s pop, modern production, fun, energetic, 120 BPM" for contemporary. Always specify age target.',
    keys:[
      'Singability above everything: if a 5-year-old cannot sing it back after 2 listens, simplify the melody or shorten the line',
      'Repetition rule: the chorus should repeat at least 3-4 times. Children learn through repetition — this is the feature, not a flaw',
      'Every verse should answer a child\'s question or describe something they recognize from their world',
      'Physical movement cues: embed "clap," "stomp," "spin," "shake" as lyric actions — make the song a physical experience',
      'Never condescend — wonder and curiosity are adult emotions too. Write UP to children\'s imagination, not DOWN to their vocabulary',
      'Bedtime songs: descending melody, slowing tempo in each verse, safety and love in every image — the child must feel held'
    ],
    artists:'Raffi · They Might Be Giants · Mister Rogers · Elizabeth Mitchell · Laurie Berkner · Disney songwriters (Sherman Brothers, Alan Menken) · Sesame Street · Jack Johnson (Curious George) · Carly Rae Jepsen',
    counter:{device:'Call-and-response echo / simple instrument answer',does:'Children\'s music\'s counter-melody is the echo and response — the simplest and most instinctive musical dialogue. A phrase sung by the lead is echoed or answered by a simple instrument (xylophone, ukulele, hand claps). The child naturally wants to be the "response" voice, making the counter-melody participatory.',howto:'echo response counter-melody, instrument answers vocal, call and response pattern',map:'Throughout: instrument echoes or answers every vocal phrase / Chorus: hand clap or stomp rhythm creates counter / Bridge: call-and-response between "teacher" voice and "students" / Outro: children complete the melodic phrase'},
    outliers:[
      {song:'"Baby Shark" — Pinkfong',rule:'Ultra-minimal 3-note melody with relentless loop structure — technically poor by every craft standard',result:'Most-viewed YouTube video in history (10+ billion views), proved simplicity and repetition are invincible'},
      {song:'"Let It Go" — Idina Menzel (Frozen)',rule:'Operatic adult complexity with a belt-to-falsetto range that children technically cannot replicate',result:'Grammy winner and adult radio hit that transcended its children\'s film — adults bought it for themselves'},
      {song:'"Won\'t You Be My Neighbor?" — Fred Rogers',rule:'Deliberately lo-fi, no production value, no catchy hook by commercial standards',result:'Created the most trusted children\'s TV brand in American history through pure emotional authenticity'}
    ],
    vocables:{sounds:'la-la-la, na-na-na, do-re-mi, hey',when:'chorus singalong, outro repetition, educational hook',suno_tag:'[Children singalong]',borrowed_from:'nursery rhyme tradition, folk',notes:'Children\'s vocables must be maximally simple — one or two syllable, highly repetitive, wide melodic range'}
  },
  pop:{dna:'Hook-driven, verse-chorus structure, universal emotional themes, radio-ready production, broad demographic appeal.',structure:'Intro → Verse → Pre-Chorus → Chorus → Verse 2 → Pre-Chorus → Chorus → Bridge → Final Chorus → Outro. Pre-chorus is the tension builder. Chorus is the payoff.',suno:'"pop, synth, piano, driving beat, polished production, 120 BPM" for mainstream. "dark pop, atmospheric synth, moody, 105 BPM" for alternative pop.',keys:['Hook within 30 seconds is non-negotiable','Chorus must be singable after one listen — max 10 syllables per line','Pre-chorus tension makes the chorus land harder','Bridge must recontextualize the chorus emotionally'],artists:'Taylor Swift · Billie Eilish · Olivia Rodrigo · Harry Styles · Doja Cat · The Weeknd · Ariana Grande · Justin Bieber',counter:{device:'Strings / synth pad counter-line / backing vocal response',does:'Pop\'s counter-melody typically lives in the strings or synth pad that plays a melodic answer to the chorus hook. Backing vocals sing a counter-phrase against the lead in the post-chorus. The guitar arpeggiation in the verse creates a melodic counter beneath the vocal.',howto:'string counter-melody, synth pad answer phrase, backing vocal counter-harmony',map:'Verse: synth arpeggiation under vocal / Chorus: strings play counter-line in gaps / Post-chorus: backing vocals counter the hook / Bridge: counter-melody takes over as lead strips back'},outliers:[{song:'"Bohemian Rhapsody" — Queen',rule:'6 minutes with no repeating chorus, an opera section mid-song — radio refused to play it',result:'Held the record for best-selling UK single for years, proof that commitment to a vision beats every commercial rule'},{song:'"Rolling in the Deep" — Adele',rule:'Minimal production with no dance beat in the peak EDM era when every pop song needed a four-on-the-floor',result:'Most-downloaded song in history at release, proved voice-first minimalism could dominate the maximalist era'},{song:'"Old Town Road" — Lil Nas X',rule:'Country-trap hybrid that Billboard controversially removed from country charts',result:'Longest #1 run in Billboard Hot 100 history at that point, proved genre-blending beats genre loyalty'}],vocables:{sounds:'na-na-na, woah, hey, ooh, yeah',when:'post-chorus (always), outro singalong, pre-chorus lift',suno_tag:'[Outro - singalong]',borrowed_from:'R&B, soul, rock — pop synthesizes all traditions',notes:'Pop vocables are engineered for maximum crowd participation — the goal is for every listener to sing along by the second chorus'}},
  rnb:{dna:'Rhythm and blues: groove, vocal runs, romance and desire, emotional vulnerability, live instrumentation or sampled soul.',structure:'Verse → Hook → Verse → Hook → Bridge → Final Hook. Hook-centric. Verse sets emotional scene. Hook is the declaration. Bridge is the turn or breakdown.',suno:'"R&B, smooth production, vocal runs, electric piano, 90 BPM" for classic. "Contemporary R&B, 808 bass, trap hi-hats, 75 BPM" for modern.',keys:['Ad-libs and runs are a second vocal melody — write them','Groove must feel inevitable — bass and drums locked','Bridge is the emotional vulnerability peak','Specificity in lyrics: name the street, the hour, the feeling precisely'],artists:'Beyoncé · Usher · Alicia Keys · Frank Ocean · SZA · The Weeknd · Daniel Caesar · Giveon · Jhené Aiko',counter:{device:'Keyboard riff / ad-lib vocal counter-voice',does:'R&B\'s counter-melody lives in two places: the keyboard fills that respond between vocal phrases (a riff answering the lead), and the ad-lib vocal layer that creates an organic second melody running alongside the primary line. Together they create the layered warmth that defines R&B production.',howto:'keyboard fill counter-melody, ad-lib vocal counter-voice, electric piano response phrase',map:'Verse: keyboard fills between phrases / Hook: ad-lib vocal creates counter / Bridge: keyboard counter-line peaks / Outro: ad-lib voice overtakes as lead improvises'},outliers:[{song:'"Crazy in Love" — Beyoncé',rule:'Sampled brass stab creating frenetic aggressive energy instead of smooth groove — the opposite of R&B\'s DNA',result:'Defined 2000s R&B and launched Beyoncé\'s solo era, proved aggression and R&B elegance could fuse'},{song:'"No Scrubs" — TLC',rule:'Rejection and refusal anthem in a genre built on romance, desire, and longing',result:'One of the best-selling singles of 1999, changed what R&B women were allowed to say about men'},{song:'"Redbone" — Childish Gambino',rule:'95 BPM slowed to a crawl — so deliberately slow that radio programmers said it was unplayable',result:'#1 on R&B charts, became a cultural touchstone and spawned an entirely new wave of slow-burn R&B production'}],vocables:{sounds:'ooh, ah, yeah, baby, mmm',when:'everywhere — post-chorus, ad-libs throughout, bridge build, outro runs',suno_tag:'[Ad-lib vocal runs]',borrowed_from:'gospel, soul — direct lineage',notes:'R&B has the highest vocable density of any genre — ad-libs are expected throughout, not just at key moments'}},
  edm:{dna:'Drop-driven structure, electronic production, 4-on-the-floor kick, tension/release arc, euphoric peak moments, anonymous subject.',structure:'Intro (build) → Drop → Break → Drop 2 (bigger) → Outro. The build IS the tension. The drop IS the payoff. Everything serves the drop.',suno:'"EDM, synth lead, 4-on-the-floor kick, 128 BPM, festival drop" for festival. "Deep house, bass-driven, warm, 120 BPM" for underground.',keys:['The drop must be worth the build — if the buildup is epic the drop must be devastating','Vocals are usually hooks — minimal lyrics, maximum repetition','Breakdown creates anticipation — strip everything except a single element','Specify BPM — it is the genre\'s most fundamental parameter'],artists:'Calvin Harris · Martin Garrix · Avicii · Deadmau5 · Daft Punk · Skrillex · Disclosure · Flume',counter:{device:'Drop counter-melody synth / bass synth vs. lead',does:'The drop counter-melody is a secondary synth line that plays simultaneously with the main lead synth during the drop — two melodic voices creating counterpoint at peak energy. Below them, the bass synth plays a third counter-melodic line. The arpeggiated lead in the breakdown provides pre-drop counter-melody, building tension.',howto:'drop counter-melody synth, bass synth counter-line, arpeggio build counter',map:'Build: arpeggiated synth creates anticipatory counter-melody / Drop: two synths in counterpoint / Breakdown: stripped to single counter-melody line / Drop 2: both counter-melodies return louder'},outliers:[{song:'"Levels" — Avicii',rule:'Sampled Etta James gospel vocal ("Something\'s Got a Hold on Me") over an electronic rave drop — grandma\'s church music in the club',result:'Became the anthem of a generation, proved emotional vocal authenticity over a drop hits harder than any synth hook'},{song:'"Get Lucky" — Daft Punk ft. Pharrell',rule:'70s disco funk with live instruments only — no synthesizers in the drop in an era of pure digital production',result:'Fastest-selling UK single in history at release, proved live organic groove beats programmed perfection in EDM context'},{song:'"Titanium" — David Guetta ft. Sia',rule:'Lyrical emotional depth and ballad structure in a genre that avoids narrative and favors anonymous subject matter',result:'Multi-platinum global hit that crossover EDM onto pop radio permanently — emotion won over atmosphere'}],vocables:{sounds:'oh, hey, woo, yeah (often sampled/pitched)',when:'drop build, post-drop release, outro loop',suno_tag:'[Drop vocal chant]',borrowed_from:'house music, rave culture, gospel samples',notes:'EDM vocables are often pitched/processed — the human voice as instrument texture rather than singalong trigger'}},
  country:{dna:'Storytelling over everything, authentic emotion, rural/small-town imagery, guitar as emotional anchor, hook grounded in relatable universal truth.',structure:'Verse (story) → Chorus (universal truth) → Verse 2 (story deepens) → Chorus → Bridge (turn/reveal) → Final Chorus. Second verse MUST deepen the story emotionally.',suno:'"country, acoustic guitar, pedal steel, fiddle, 100 BPM, warm" for classic. "country pop, electric guitar, modern production, 120 BPM" for Nashville pop.',keys:['Second verse must be the emotional payoff — not a repeat of verse 1','Chorus is universal truth extracted from specific verse story','Pedal steel and fiddle are genre signals — specify them','Bridge is the revelation — what the narrator finally understands'],artists:'Dolly Parton · Garth Brooks · Johnny Cash · Kacey Musgraves · Chris Stapleton · Zach Bryan · Luke Combs · Carrie Underwood',counter:{device:'Pedal steel answer-line / fiddle counter-melody',does:'Country\'s definitive counter-melody is the pedal steel guitar — it plays an answering melodic phrase between vocal lines that aches with emotional resonance. In bluegrass, the fiddle plays a counter-melody against the vocal simultaneously. Both voices — vocal and pedal steel — are in constant melodic conversation.',howto:'pedal steel guitar answer fills, fiddle counter-melody, steel guitar response line',map:'Verse: pedal steel answers after each vocal phrase / Chorus: steel or fiddle counter-line under the hook / Bridge: pedal steel takes melodic lead while vocal drops / Outro: steel guitar leads the fade'},outliers:[{song:'"Old Town Road" — Lil Nas X',rule:'Trap 808 beat plus banjo — Billboard controversially removed it from country charts for insufficient genre purity',result:'Longest #1 run in Billboard Hot 100 history at the time — the banjo was country enough for 19 weeks'},{song:'"Before He Cheats" — Carrie Underwood',rule:'Violent revenge fantasy with property destruction — aggressive content far outside mainstream country\'s "accept and endure" tradition',result:'Multiple Grammy winner that became an anthem, proved country women were allowed to be dangerous'},{song:'"Islands in the Stream" — Dolly Parton & Kenny Rogers',rule:'Disco-influenced production with a synthesizer groove in country — absolutely wrong for the genre',result:'#1 country AND pop crossover simultaneously, proved great songwriting (Barry Gibb) transcends production rules'}],vocables:{sounds:'la-la-la, hey, yee-haw, na-na',when:'barn-dance chorus, outro group singalong',suno_tag:'[Group singalong]',borrowed_from:'folk, Appalachian oral tradition',notes:'Country vocables signal community — they invite the audience into the song as participants not observers'}},
  jazz:{dna:'Improvisation over harmony, chord substitution, rhythmic sophistication, the conversation between instruments, space as music.',structure:'Head (melody) → Solos → Head out. Blues form (12-bar) or AABA (32-bar standard). The arrangement is a vehicle for improvisation.',suno:'"jazz, piano trio, upright bass, brushed drums, 120 BPM swing" for classic. "jazz fusion, electric piano, 100 BPM" for fusion.',keys:['The melody (head) is the launching pad — state it cleanly, then destroy it in the solo','Walking bass is always a counter-melody','Chord substitution creates harmonic surprise — ii-V-I can be approached from anywhere','Silence is the most important note in jazz'],artists:'Miles Davis · John Coltrane · Bill Evans · Thelonious Monk · Charlie Parker · Herbie Hancock · Esperanza Spalding · Kamasi Washington',counter:{device:'Walking bass (primary counter) / piano comping / horn counterpoint',does:'Jazz has the richest counter-melody tradition: the walking bass is ALWAYS a counter-melody — it creates an independent melodic line of its own against the soloist. Piano comping creates harmonic counter-commentary. In ensemble sections, horns play genuine counterpoint — multiple independent melodic lines simultaneously, each complete on its own.',howto:'walking bass counter-melody, piano comp counter-voice, horn counterpoint lines',map:'Throughout: walking bass provides constant counter / Head: piano comps creates harmonic counter / Solos: bass and comping in three-voice counterpoint / Ensemble: full horn counterpoint'},outliers:[{song:'"Take Five" — Dave Brubeck Quartet',rule:'5/4 time signature — commercially unthinkable, programmers said listeners couldn\'t feel an odd meter',result:'First jazz instrumental to sell over 1 million copies, proved listeners feel groove not math'},{song:'"Round Midnight" — Thelonious Monk',rule:'Extremely dissonant angular melody that sounded "wrong" to bebop musicians trained in smooth lines',result:'Most recorded jazz standard written by a living composer — the wrongness WAS the emotional truth'},{song:'"A Love Supreme" — John Coltrane',rule:'Four-part spiritual suite with no traditional song structure, no hooks, no commercial concessions',result:'Best-selling jazz album of all time — proved jazz listeners wanted transcendence more than entertainment'}],vocables:{sounds:'scat syllables: doo-wah, bop, skee-dat, ba-da',when:'improvised solo sections, outro scat fade',suno_tag:'[Scat vocal]',borrowed_from:'African American vocal improvisation tradition',notes:'Jazz vocables (scat) are melodically sophisticated — they mimic instrument lines, not crowd participation'}},
  rock:{dna:'Power chords, backbeat (snare on 2&4), guitar-bass-drums locked groove, riff as identity, distortion as emotion, verse-chorus-bridge with guitar solo as emotional peak. Dynamic contrast: quiet verse earning the explosive chorus.',structure:'Intro riff → Verse → Pre-Chorus → Chorus → Verse 2 → Pre-Chorus → Chorus → Guitar Solo / Bridge → Final Chorus → Outro. Intro riff often returns as outro.',suno:'"classic rock, electric guitar, power chords, driven drums, bass, 110 BPM, arena rock" for stadium. "hard rock, heavy riff, distorted guitar, 120 BPM" for modern. "indie rock, jangly guitars, clean tone, driving beat, 105 BPM" for indie. Always specify clean vs distorted guitar.',keys:['The riff IS the song\'s identity — memorable enough to hum, everything else serves it','Dynamic contrast is mandatory: verse must be quieter than chorus — the explosion must feel earned','Guitar solo is the emotional peak, not a technical showcase — it says what lyrics cannot','Chorus must feel like a collective event: written to be shouted by a crowd, not just sung solo','Rock lyrics: concrete images over abstraction. "Sleeping in a Chevy" not "feeling lost". Specificity creates anthems','Backbeat feel must be locked — drums and bass in the same pocket or the song loses its power'],artists:'Led Zeppelin · AC/DC · The Rolling Stones · Queen · Bruce Springsteen · Foo Fighters · Tom Petty · Aerosmith · Guns N\' Roses · Fleetwood Mac · The Eagles · Heart',counter:{device:'Second guitar harmony / keyboard layer / bass counter-line',does:'Rock\'s counter-melody lives in the second guitar track — a harmony guitar a third or fifth above the lead creates the twin-guitar wall of sound (Thin Lizzy, Iron Maiden). The bass frequently breaks from the root to play a counter-melodic line in the verse. A keyboard or organ adds harmonic counter-weight beneath the guitars.',howto:'harmony guitar counter-line, bass counter-melody, keyboard layer under guitars',map:'Verse: bass plays melodic counter beneath clean guitar / Chorus: second guitar harmony creates wall of sound / Bridge/Solo: bass and rhythm guitar create counter-rhythm / Outro: twin guitar harmonies lead the fade'},outliers:[{song:'"Bohemian Rhapsody" — Queen',rule:'6 minutes, opera section mid-song, no repeating chorus — radio refused to play it',result:'Held UK record for best-selling single, most recognizable song ever — commitment to vision beats every commercial formula'},{song:'"Smells Like Teen Spirit" — Nirvana',rule:'Deliberately lo-fi, muddy production against the polished hair-metal standard; Cobain said he was trying to rip off the Pixies',result:'Killed the dominant genre overnight — the anti-production became the definitive production'},{song:'"Mr. Brightside" — The Killers',rule:'No dynamic contrast — same relentless driving energy throughout with no quiet verse',result:'Never left UK charts for 16 consecutive years — sustained tension can replace the tension-release cycle entirely'}],vocables:{sounds:'woah, yeah, hey, come on',when:'pre-chorus lift, post-chorus crowd release, outro collective shout',suno_tag:'[Crowd shout]',borrowed_from:'blues shouting, gospel release',notes:'Rock vocables must be earned — quiet verse first, then the release. A "woah" with no contrast is decoration; with earned contrast, it is transcendence'}},
  folk:{dna:'Voice and acoustic instrument as total truth. Narrative storytelling, first-person perspective, protest tradition, community and oral history. Folk trusts the listener — the story IS the production. Every word must justify its existence.',structure:'Most flexible genre. Verse-only (no chorus) is valid. VCVCBC works. Through-composed follows the story arc. Never impose a template on a narrative — let the story determine the structure.',suno:'"folk, acoustic guitar, fingerpicked, warm, narrative, close-mic vocals, 90 BPM" for classic. "folk rock, acoustic + electric guitar, driving rhythm, 105 BPM" for electrified. "indie folk, atmospheric, layered acoustics, 80 BPM" for modern. Specify: brushed drums or no drums for authenticity. Always include "fingerpicked" for storytelling feel.',keys:['Every line must justify its existence — folk has zero tolerance for filler. If a line isn\'t the best possible line, cut it','Specificity creates universality: a house number, a dog\'s name, a particular street. Concrete details make stories universal','Verse 2 rule: deepen the emotional stakes. Do not repeat verse 1 imagery — move the story forward','Silence between phrases is deliberate — guitar rests carry as much weight as the notes','Protest folk: the argument must live in the specific story of one person, not stated as abstraction','Guitar tuning is a character: open G, DADGAD, open D create distinct emotional textures — specify in prompt'],artists:'Bob Dylan · Joni Mitchell · Neil Young · Simon & Garfunkel · Woody Guthrie · Pete Seeger · Joan Baez · Gillian Welch · Iron & Wine · Fleet Foxes · Sufjan Stevens · Phoebe Bridgers',counter:{device:'Second acoustic guitar / fiddle / cello counter-line',does:'Folk\'s counter-melody is the instrument filling the phrase gaps — the fingerpicked guitar pattern weaves its own melodic thread around the vocal line. On duet recordings, the second acoustic plays a complementary fingerpicking counter-line. Fiddle or cello can take the counter-melodic role in bridge sections.',howto:'fingerpicking counter-melody, fiddle counter-line, second acoustic guitar fills',map:'Throughout: guitar fills phrase gaps with melodic counter / Chorus: second voice or instrument joins / Bridge: counter-melody becomes prominent as vocal strips back / Outro: guitar fingerpicking counter leads the fade'},outliers:[{song:'"Fast Car" — Tracy Chapman',rule:'One repeating guitar loop with almost no chord changes for 4:59 — broke the variation mandate',result:'Grammy winner, UK #1 thirty years later when covered — a single hypnotic groove can hold emotional truth forever'},{song:'"Blowin\' in the Wind" — Bob Dylan',rule:'No answers given — the entire song asks questions without resolution, violating narrative resolution convention',result:'Defining protest anthem of the 20th century — ambiguity lands harder than statements'},{song:'"The Sound of Silence" — Simon & Garfunkel',rule:'Columbia secretly added electric guitar and drums to the original acoustic recording — purists were furious',result:'Became their breakthrough single — the "wrong" production decision became the definitive version'}],vocables:{sounds:'mmm, la-la-la, oh, hey',when:'bridge hum before final verse, quiet outro fade only',suno_tag:'[Hummed outro]',borrowed_from:'Appalachian tradition, Celtic folk',notes:'Folk vocables must feel involuntary — like the singer is moved to hum rather than performing. One moment per song maximum. Intimacy over crowd energy'}},
  metal:{dna:'Distorted guitars (down-tuned, palm-muted), aggressive percussion (double bass kick, blast beats), power and technical virtuosity, verse-chorus with mandatory breakdown, guitar solo as centerpiece. Extreme dynamics: the quiet is genuinely quiet, the loud is devastating.',structure:'Intro riff (identity statement) → Verse → Pre-Chorus → Chorus → Verse 2 → Pre-Chorus → Chorus → Breakdown (tempo shift, half-time or stop-start) → Guitar Solo → Bridge → Final Chorus → Outro. Breakdown and guitar solo are non-negotiable.',suno:'"heavy metal, distorted guitar, double bass drums, palm muting, power chords, 140 BPM" for classic. "thrash metal, fast riff, aggressive, 180 BPM" for thrash. "doom metal, slow, dark, heavy, 60 BPM" for doom. "melodic metal, harmonic guitar leads, clean chorus vocals, 130 BPM" for melodic. Always specify BPM and subgenre — metal sub-genres are sonically distinct.',keys:['The riff must be the most memorable thing — write the riff description first, every element serves it','Breakdown is mandatory: a tempo shift or rhythmic stop-start creates the headbanging moment — the crowd loses their mind here','Guitar solo must be the emotional climax, not a technical warm-up — the best metal solos say what the lyrics cannot','Dynamics: quiet sections must be genuinely quiet — contrast makes the heavy sections hit harder','Metal lyrics: mythology, psychology, existential conflict. Vague evil sounds dated; specific dread sounds timeless','Double bass drum pattern must be specified — it is the genre\'s rhythmic engine, everything rides on top of it'],artists:'Black Sabbath · Metallica · Iron Maiden · Pantera · Tool · Slayer · Ozzy Osbourne · Megadeth · Judas Priest · Lamb of God · System of a Down · Mastodon · Gojira',counter:{device:'Harmony guitar (twin lead) / galloping bass / riff counter-voice',does:'Metal\'s definitive counter-melody is the twin harmony guitar — two guitars playing harmonized lead lines a third or fifth apart (Iron Maiden perfected this). The bass plays a galloping rhythmic counter-line against the guitar riff. In progressive metal, a second voice plays a genuine melodic counter against the main riff.',howto:'twin harmony guitar leads, galloping bass counter-line, second guitar harmony riff',map:'Verse: bass gallops counter to guitar riff / Chorus: second guitar harmony creates wall of sound / Solo: guitar solo is primary melody, rhythm guitar provides counter-riff / Bridge: twin guitar harmonies in full counterpoint'},outliers:[{song:'"Master of Puppets" — Metallica',rule:'8.5 minutes with a complete mid-song tempo shift to a clean guitar ballad section — unexpected vulnerability in thrash metal',result:'Consistently rated the greatest metal song ever — proved complexity and emotional range coexist with brutality'},{song:'"War Pigs" — Black Sabbath',rule:'Anti-war political theme in a genre audiences expected to be about fantasy and escapism',result:'Became an anti-war anthem, proved heavy music could carry serious political weight'},{song:'"Chop Suey!" — System of a Down',rule:'No repeating chorus, shifting time signatures, vocals that alternate whisper and scream — broke every structural rule',result:'Their commercial breakthrough — chaos organized around a strong riff is more powerful than verse-chorus conformity'}],vocables:{sounds:'yeah, go, ahhh, hey',when:'breakdown entrance, chorus aggression peak, outro collective — sparingly',suno_tag:'[Metal shout]',borrowed_from:'hard rock shouting, blues intensity',notes:'Metal vocables must be used with restraint — impact over frequency. One well-placed "YEAH!" at a riff peak hits harder than scattered vocables throughout'}},
  bossa:{dna:'Brazilian fusion of samba rhythm with cool jazz harmony, nylon-string guitar as melodic and rhythmic anchor, intimate breathy vocals, sophisticated chord voicings (maj7, m7, ii-V-I extensions), understated cool, themes of saudade (longing), beach, and quiet love.',structure:'Intro (guitar pattern alone) → Verse (intimate vocal) → Chorus (lifted but never loud) → Verse 2 → Chorus → Instrumental break (guitar, sax, or flute solo) → Final Chorus → Outro fade. Length typically 2:30–3:30 — bossa values economy.',suno:'"bossa nova, nylon string guitar, brushed drums, soft upright bass, breathy vocals, 110 BPM" for classic. "samba bossa, percussion forward, cuíca, 120 BPM" for upbeat. "bossa jazz, sax lead, piano comping, 100 BPM" for instrumental.',keys:['Whisper-soft vocal — never push past mezzo-piano; the intimacy IS the genre','Sophisticated jazz harmony is mandatory — maj7, m7, ii-V-I extensions; never basic triads','The syncopated guitar pattern (the violão) is the rhythmic engine — name it in the prompt','Saudade — bittersweet longing — is the emotional core; pure happiness or pure sadness reads wrong','Open vowel Portuguese phonetics shape the melody; English bossa must mimic those rounded vowel landings'],artists:'João Gilberto · Antônio Carlos Jobim · Astrud Gilberto · Sergio Mendes · Bebel Gilberto · Stan Getz · Caetano Veloso · Vinicius de Moraes · Elis Regina',counter:{device:'Nylon guitar pattern as melodic counter / flute or sax answer-line / piano fills',does:'The bossa nova guitar pattern (the violão) functions as a counter-melody on its own — the syncopated chordal accents create a melodic line in conversation with the vocal. A flute, sax, or piano fills the gaps between vocal phrases with answering melodic lines. The bass walks just enough to suggest a third counter-melodic voice without disrupting the calm.',howto:'nylon guitar bossa pattern as counter, flute or sax counter-melody fills, piano answer phrases',map:'Verse: guitar pattern provides constant melodic counter / Chorus: flute or sax answers each vocal line / Instrumental break: solo instrument takes melodic lead while guitar pattern continues / Outro: guitar pattern alone leads the fade'},outliers:[{song:'"The Girl from Ipanema" — Stan Getz & João Gilberto ft. Astrud Gilberto',rule:'First international bossa hit sung partly in English by an untrained amateur (Astrud was a housewife, not a singer) on her debut, against industry preference for polished vocalists',result:'Won Record of the Year at the 1965 Grammys; became one of the most-recorded songs in history — proved unschooled intimacy beat trained polish'},{song:'"Águas de Março" (Waters of March) — Antônio Carlos Jobim & Elis Regina',rule:'Through-composed list-song with no traditional verse-chorus structure; lyrics simply name objects ("a stick, a stone, a sliver of glass") in cascading phrases',result:'Voted the greatest Brazilian song of all time in a 2001 critics poll — proved structure can be replaced by sustained imagistic momentum'},{song:'"Mas Que Nada" — Sergio Mendes & Brasil \'66',rule:'Sung entirely in Portuguese for the US market in 1966 when foreign-language hits were considered commercially impossible',result:'Charted in the US Billboard Hot 100 — opened American radio to Portuguese-language pop and helped Brasil \'66 become a global brand'}],vocables:{sounds:'oo-bah, dah-dah, soft scat syllables, breathed "ah"',when:'instrumental break, between vocal phrases as soft fills, outro fade',suno_tag:'[Bossa scat]',borrowed_from:'cool jazz scat, samba percussion vocalizations, Brazilian boca de samba',notes:'Bossa vocables must remain whisper-soft — never push volume. The syllable should feel breathed, not sung. The João Gilberto template — barely-audible scat as another instrument — set the genre standard'}},
  dancehall:{dna:'Jamaican digital riddim culture descended from reggae and dub. Deejay (toaster) over a sparse bass-heavy beat, drum machine grooves, rapid-fire patois delivery, sound-system culture, dance-floor function above all. The riddim is shared — many artists release versions over one instrumental.',structure:'Intro (riddim drop) → Deejay verse → Hook (chant) → Verse 2 → Hook → Bridge or breakdown (sparse, bass-only) → Hook → Outro vamp. Crew tracks combine multiple deejays trading verses on the same riddim.',suno:'"dancehall, digital riddim, sparse drums, heavy sub bass, patois deejay vocals, 95 BPM" for classic. "modern dancehall, dembow influence, melodic vocals, 100 BPM" for current. "raggamuffin dancehall, 90s digital riddim, hard drum machine, 90 BPM" for retro Shabba era.',keys:['The riddim is the foundation — name a known riddim (Sleng Teng, Diwali, Bam Bam) or describe its rhythmic shape specifically','Deejay flow rides the riddim — never fights it; phrasing locks to the snare on 3','Hook is a chant the crowd shouts back; one-line repeated hooks beat complex melodic ones','Sparse production — leave space for the sub bass and the voice; clutter kills dancehall','Patois phrasing carries the genre identity; full English translations sterilize the feel'],artists:'Shabba Ranks · Beenie Man · Bounty Killer · Sean Paul · Vybz Kartel · Spice · Popcaan · Konshens · Buju Banton · Yellowman · Sister Nancy · Chronixx',counter:{device:'Bass riddim line as primary counter / horn stab punctuation / second deejay vocal counter',does:'The dancehall counter-melody lives in the riddim itself — the bassline is a complete melodic statement that the vocal converses with. Horn stabs (real or synthesized) punctuate phrase endings as call-response. On classic shared-riddim tracks, multiple deejays release separate versions over the same instrumental, creating an extended counter-melodic dialogue across the genre itself.',howto:'bass riddim as melodic counter, horn stab punctuation, secondary chant counter-vocal',map:'Throughout: bass riddim provides constant melodic counter / Verse: horn stabs answer deejay phrases / Hook: backup chants create call-response counter-line / Outro: riddim and bass lead the vamp'},outliers:[{song:'"Murder She Wrote" — Chaka Demus & Pliers',rule:'Combined deejay toasting (Chaka) with melodic singing (Pliers) on the Bam Bam riddim — broke the deejay-versus-singer divide that defined dancehall',result:'Top 5 in the UK in 1993, proved dancehall could cross to pop without stripping its patois identity'},{song:'"Get Busy" — Sean Paul',rule:'Brought patois dancehall to a US Billboard #1 in 2003 when the industry insisted American audiences needed lyrics they could fully decode',result:'Topped the US Hot 100 — proved authenticity transfers; full lyrical comprehension is not required for groove'},{song:'"Bam Bam" — Sister Nancy',rule:'Female deejay in a male-dominated genre in 1982; the recording was made quickly and Nancy was paid almost nothing for what became the definitive riddim',result:'One of the most sampled songs in hip-hop history (Kanye, Jay-Z, Lauryn Hill) — a sound-system classic outlasted every commercial trend that came after it'}],vocables:{sounds:'bo-bo-bo, brap brap, oi, wah, gun-finger "pew pew", "pull up!"',when:'riddim drop, hook punctuation, between vocal phrases, sound-system "forward" calls signaling the selector to rewind',suno_tag:'[Dancehall chant]',borrowed_from:'Jamaican sound-system culture, reggae toasting, gun-salute mimicry, dub MC tradition',notes:'Dancehall vocables are sound-system signals — they request the selector pull up (rewind) the tune when the crowd loves it. Authenticity comes from these culturally specific calls; generic ad-libs read as inauthentic'}},
  bollywood:{dna:'Hindi film song tradition fusing lush orchestral arrangement with electronic production, melismatic vocal performance rooted in Hindustani classical, raga-influenced melodic phrases, romantic narrative tied to film plot, choreography-ready rhythm, multi-section dramatic structure, bilingual Hindi-English (Hinglish) lyrics in the modern era.',structure:'Mukhda (opening hook/chorus) → Antara (verse) → Mukhda → Antara 2 → Mukhda → Bridge or instrumental dance section (often choreographed in film) → Final Mukhda (often modulated up) → Outro. Film songs run 4–6 minutes; radio edits shorter.',suno:'"bollywood, tabla, dholak, sitar, strings, female melismatic vocals, 110 BPM" for classic. "modern bollywood, electronic production, dhol drum, autotuned vocals, EDM influence, 120 BPM" for current. "qawwali bollywood, harmonium, hand claps, ecstatic male vocals, 100 BPM" for sufi-influenced.',keys:['Melisma is mandatory — every long vowel is an opportunity for vocal ornamentation (taan)','The mukhda must be the catchiest moment and repeats throughout — it is the song identity','Raga-based melodic phrases ground the song in tradition even with modern EDM production','Layered percussion (tabla + dhol + electronic) creates the rhythmic bed; one drum source is insufficient','Hinglish (Hindi-English code-switching) is now standard — pure English or pure Hindi reads either dated or arthouse'],artists:'Lata Mangeshkar · Kishore Kumar · A.R. Rahman · Arijit Singh · Shreya Ghoshal · Pritam · Vishal-Shekhar · Neha Kakkar · Atif Aslam · Sonu Nigam · R.D. Burman · Asha Bhosle',counter:{device:'Sitar or sarangi counter-melody / harmonium answer / dual vocalist counterpoint (duet form)',does:'The Bollywood counter-melody tradition is among the richest in popular music — sitar or sarangi plays an answering melodic phrase between vocal lines, harmonium provides harmonic counter-weight, and the duet form (often male-female romantic pairing) creates true vocal counterpoint where two singers trade and overlap melodic lines. Strings frequently provide a third counter-melodic layer beneath everything.',howto:'sitar counter-melody fills, harmonium answer phrases, dual vocalist counterpoint',map:'Mukhda: strings provide harmonic counter / Antara: sitar or sarangi answers vocal phrases / Bridge: instrumental counter-melody takes the lead / Duet sections: two voices in true counterpoint, trading lines'},outliers:[{song:'"Jai Ho" — A.R. Rahman (from Slumdog Millionaire)',rule:'A Hindi-language song from an Indian film won the Academy Award for Best Original Song in 2009 — first Bollywood-style track to crack the global mainstream entirely on its own terms',result:'Won the Oscar and a Grammy — opened Western pop awareness of Indian film music permanently'},{song:'"Chaiyya Chaiyya" — Sukhwinder Singh & Sapna Awasthi',rule:'Filmed entirely on top of a moving train; structurally an upbeat sufi qawwali in a thriller film with no romantic context',result:'Used by Spike Lee in the opening of Inside Man (2006); became one of the most internationally recognized Bollywood tracks ever recorded'},{song:'"Tum Hi Ho" — Arijit Singh (from Aashiqui 2)',rule:'Stripped-back piano-led ballad with minimal production in an era when Bollywood had moved aggressively toward EDM and dance',result:'Defined the romantic ballad of the 2010s, made Arijit the dominant male voice in Bollywood for a decade — proved restraint outsells maximalism'}],vocables:{sounds:'ahaa, oh-ho, melismatic taan ("aaa-aaa-aaa" runs), tabla bols ("dhin-dhin", "ta-ka-dhi-mi")',when:'opening alap (free-rhythm intro), between mukhda repeats, climactic note holds, instrumental dance breaks',suno_tag:'[Melismatic taan]',borrowed_from:'Hindustani classical alap, qawwali ecstatic vocalizations, tabla bol percussion syllables',notes:'Bollywood vocables are virtuosic, not decorative — the taan demonstrates vocal mastery and connects modern film song to centuries of classical tradition. Always emotional, never filler'}},
  cpop:{dna:'Mandarin-language pop centered on melodic ballad tradition, sophisticated production, tonal-language vocal phrasing (the four Mandarin tones constrain melody), emotional restraint over vocal grit, narrative lyricism prized as high craft, R&B and rock influences absorbed and reshaped to Chinese aesthetic sensibility.',structure:'Intro (often piano alone) → Verse 1 → Pre-Chorus → Chorus → Verse 2 → Pre-Chorus → Chorus → Bridge (often a key change up a half-step or whole-step) → Final Chorus (post-modulation, fuller arrangement) → Outro. The key change is nearly mandatory in ballads.',suno:'"mandopop ballad, piano, strings, soaring female vocals, Mandarin lyrics, 75 BPM" for classic ballad. "mandopop, modern production, R&B influence, Mandarin vocals, 90 BPM" for current. "cpop rock, electric guitar, anthemic chorus, Mandarin vocals, 120 BPM" for rock-influenced. Always specify Mandarin.',keys:['Melody must respect Mandarin tonal contours — wrong tone shapes can change word meaning','Key change up a half-step or whole-step at the final chorus is a genre signature — skip it at your peril','Lyric craft is highly valued — Vincent Fang and Jay Chou set the standard for poetic Mandarin pop lyrics','Vocal performance prioritizes purity, control, and clean tone over runs, grit, or melisma','Ballads dominate the canon, but uptempo cpop must still feature a memorable melodic hook in the chorus'],artists:'Jay Chou · Faye Wong · Eason Chan · Jolin Tsai · JJ Lin · A-Mei · G.E.M. · Mayday · Khalil Fong · Tanya Chua · Jacky Cheung · Stefanie Sun',counter:{device:'Piano arpeggio counter / string section counter-line / erhu or guzheng (traditional instrument counter)',does:'The cpop counter-melody tradition draws from Western ballad arrangement and Chinese instrumental tradition. Piano arpeggios provide constant melodic counter beneath the vocal. String sections answer chorus phrases and lift the modulated final chorus. In Chinese-flavored cpop (Jay Chou era), the erhu or guzheng plays a counter-melody that signals cultural identity. Modern cpop layers synth pad counter-textures.',howto:'piano arpeggio counter, string answer-lines, erhu or guzheng cultural counter-melody',map:'Verse: piano arpeggio provides counter beneath voice / Pre-Chorus: strings begin to answer / Chorus: full string counter-melody supports vocal / Bridge: instrumental counter takes lead / Final Chorus (post-modulation): full ensemble in counterpoint with the lifted vocal'},outliers:[{song:'"Qing Hua Ci" (Blue and White Porcelain) — Jay Chou',rule:'Lyrics by Vincent Fang structured around classical Chinese poetry; melody used pentatonic scale and Chinese instrumentation in a mainstream pop song',result:'Became required text in Chinese language classes — proved pop and classical literacy could share a chart hit'},{song:'"Hong Dou" (Red Bean) — Faye Wong',rule:'Minimal arrangement, single repeated melodic motif, restrained vocal — Faye replaced her usual ethereal style with stark intimacy',result:'Defined the Chinese minimalist ballad and remains one of the most-covered Mandarin songs decades later'},{song:'"Ke Xi Bu Shi Ni" (Pity It Is Not You) — Fish Leong',rule:'Pure linear emotional descent with no chorus repeat variation — a four-minute single sustained heartbreak',result:'Became the definitive heartbreak song of Mandarin pop in the 2000s — proved that emotional commitment can replace structural variety'}],vocables:{sounds:'oh, ah, mm, soft "la-la-la"',when:'intro before lyrics enter, between verse phrases as breath, final chorus extension after the key change',suno_tag:'[Soft vocal hum]',borrowed_from:'Western pop ballad tradition, Cantopop hum traditions, Chinese folk humming',notes:'Cpop vocables emphasize purity and restraint — never gritty or shouted. The hum should sound effortless, almost as if the singer is exhaling emotion rather than performing it'}},
  amapiano:{dna:'South African house subgenre fusing kwaito, jazz, deep house and lounge — defined by the log drum bass (a percussive bouncing bass synth), jazzy 7th and 9th piano chords, shaker-driven 16th-note percussion, mid-tempo groove (110–118 BPM), and vocal chants/ad-libs riding above an instrumental bed rather than full sung verses.',structure:'Intro (piano + shaker percussion build) → Drop (log drum enters) → Vocal section (chants, ad-libs, occasional sung lines) → Break (percussion only, log drum out) → Drop 2 (log drum returns, fuller arrangement) → Vocal/chant outro vamp. Tracks often run 5–7 minutes for dance-floor function.',suno:'"amapiano, log drum bass, jazzy piano chords, shaker percussion, vocal chants, 112 BPM" for classic. "amapiano private school, deeper house influence, soulful vocals, 110 BPM" for older soulful sound. "amapiano sgija, harder log drum, faster percussion, 118 BPM" for the harder modern variant.',keys:['The log drum bass is the genre signature — a percussive bouncing bass synth pattern; name it explicitly','Jazzy 7th and 9th piano chord voicings are mandatory — basic triads sound wrong','Shaker patterns drive the groove with relentless 16th notes — they are the metronome and the texture','Vocal chants and ad-libs ride above the instrumental bed; full sung verses are rare and often misjudged','BPM sits in the 110–118 pocket — too fast becomes house, too slow loses the bounce'],artists:'Kabza De Small · DJ Maphorisa · Focalistic · Sha Sha · Tyler ICU · Mr JazziQ · MFR Souls · Vigro Deep · Daliwonga · Uncle Waffles · Tyla · Young Stunna',counter:{device:'Log drum bass as melodic counter / jazzy piano chord voicings / vocal ad-lib counter-line',does:'The amapiano counter-melody is built into its DNA — the log drum bass plays a melodic-rhythmic line that converses with the piano chords above it. Jazzy piano voicings create a harmonic counter-narrative that lifts the groove. Vocal ad-libs (shaya, yebo, woza) form a third counter-melodic layer over the instrumental bed. Three-voice texture: log drum on bottom, piano in the middle, vocal and percussion calls on top.',howto:'log drum bass as melodic counter, jazzy piano chord progression counter, vocal ad-lib counter-hooks',map:'Intro: piano chords establish harmonic counter / Drop: log drum bass enters as counter to piano / Vocal section: ad-libs counter the instrumental bed / Break: percussion isolates, then log drum returns as primary melodic voice / Outro: log drum and piano in final counterpoint'},outliers:[{song:'"Ke Star" — Focalistic ft. Davido',rule:'Featured Davido (Nigerian Afrobeats superstar) on a South African amapiano track when the genre was still considered locally bound',result:'Became one of the first amapiano tracks to chart broadly across Africa and the UK — proved the log drum could travel beyond South Africa'},{song:'"Water" — Tyla',rule:'Marketed globally as Afropop and pop-R&B but built on amapiano log drum and shaker patterns at amapiano BPM',result:'Reached the top 10 of the US Billboard Hot 100 in 2024 — first South African solo artist in the US top 10 since Hugh Masekela in 1968, and the Trojan-horse moment for amapiano in American pop'},{song:'"Adiwele" — Young Stunna, Kabza De Small & DJ Maphorisa',rule:'Seven-minute album track with no traditional pop structure, no English-language hook, no concession to streaming attention spans',result:'Became a streaming and dance-floor anthem across Africa — proved long-form amapiano could thrive in a streaming-era market that supposedly demanded brevity'}],vocables:{sounds:'yebo, shaya, woza, ay-ay, shesha, "haibo!"',when:'drop entrance, log drum drops, throughout instrumental sections as ad-lib texture, section transitions',suno_tag:'[Amapiano ad-lib]',borrowed_from:'kwaito chants, South African house culture, Zulu and Sotho exclamations, sound-system MC tradition',notes:'Amapiano vocables function as DJ and MC calls — they hype the dance floor and signal section transitions. Authenticity requires culturally specific South African phrases; generic English ad-libs read as imported and inauthentic'}}
};

// ═══════════════════════════════════════════════════════
// VOCABLE THEORY — Cross-genre hook filler intelligence
// ═══════════════════════════════════════════════════════
const VOCABLE_THEORY = {
  definition: 'Vocables are melodic non-lexical syllables (na-na, ooh, yeah, hey) used to create singalong moments. Open vowels (A, E, O) resonate naturally — the brain responds emotionally before processing meaning.',
  why_they_work: 'Phonetic resonance of open vowels, emotional bypass of semantic processing, crowd participation trigger, rhythmic padding without forced word stress, hypnotic repetition effect.',
  when_to_use: 'post-chorus (landing pad after peak), outro (fade singalong), pre-chorus lift (build energy before hook), transitions between sections, anywhere the hook needs to become crowd property.',
  suno_tags: {
    singalong: '[Outro - singalong]',
    chant: '[Crowd chant]',
    call_response: '[Call and response]',
    congregational: '[Congregational response]',
    ad_lib: '[Ad-lib vocal runs]',
    vamp: '[Outro vamp]',
    group: '[Group vocal]'
  },
  phonetic_classes: {
    resonant: ['na','la','da','ba'],
    open: ['oh','ooh','ah','aah'],
    affirmative: ['yeah','yea','hey','aye'],
    tonal: ['mmm','hmm','woo','whoa'],
    rhythmic: ['uh','huh','go','up']
  }
};

// VOCABLE CROSSWALK — same sound, different meaning per genre
const VOCABLE_CROSSWALK = {
  'yeah': {
    hiphop:   'ad-lib punctuation — background energy filler between bars',
    rnb:      'affirmation in call-response — answers the lead vocal',
    country:  'communal warmth — affirms shared feeling with audience',
    rock:     'anthem crowd moment — audience ownership of the song',
    pop:      'hook filler singalong — keeps the crowd engaged post-chorus',
    gospel:   'congregational response to preacher — collective affirmation',
    afrobeats:'rhythmic accent — punctuates the groove, not the lyric'
  },
  'ooh': {
    rnb:      'melismatic run — emotional peak, vocal acrobatics',
    pop:      'post-chorus crowd hook — soft landing after the peak',
    gospel:   'spiritual overwhelm — beyond words, pure feeling',
    soul:     'bridge build — accumulates before the final chorus release',
    kpop:     'idol vocal texture — adds sweetness to the hook layer',
    blues:    'guitar-answering voice — fills the call-response gap when words run out'
  },
  'hey': {
    afrobeats:'call-and-response trigger — leader calls, crowd responds',
    pop:      'section opener — signals the hook is arriving',
    punk:     'crowd shout — collective fury, no individual voice',
    country:  'barn-dance energy — communal, physical, joyful',
    rock:     'pre-chorus lift — primes the audience for the explosion'
  },
  'na-na-na': {
    pop:      'ultimate singalong — crowd takes over when they forget words',
    punk:     'nihilist placeholder — words are beside the point',
    ss:       'gentle humming texture — intimacy, not crowd energy',
    reggae:   'meditative mantra — part of the spiritual groove'
  },
  'ah': {
    gospel:   'overwhelm response — too moved for words',
    rnb:      'vocal run launch — starting note of a melismatic phrase',
    soul:     'ache expression — the breath before an emotional line',
    opera_influenced_pop: 'dramatic peak marker'
  },
  'uh': {
    hiphop:   'rhythmic placeholder — keeps the flow while thought arrives',
    trap:     'filler accent — standard trap ad-lib vocabulary',
    rnb:      'lazy cool — understated affirmation'
  }
};

// VOCABLE LINEAGE — cultural borrowing chains (who learned from who)
const VOCABLE_LINEAGE = [
  {
    chain: 'Gospel → Soul → R&B → Pop → Hip-hop → Afrobeats',
    sound: 'ooh/ah/yeah',
    story: 'Open vowel emotional release born in the Black church, secularized through Soul, commercialized through R&B, repackaged in Pop hooks, repurposed as ad-libs in Hip-hop, recontextualized as rhythmic accents in Afrobeats'
  },
  {
    chain: 'Folk → Country → Americana → Pop',
    sound: 'na-na-na / la-la-la / hey',
    story: 'Work song and folk tradition of communal humming when lyrics were unknown — Country preserved it as barn-dance energy, Pop weaponized it as the deliberate singalong hook'
  },
  {
    chain: 'Blues → Rock → Punk → Alt-rock',
    sound: 'hey/woo/yeah',
    story: 'Blues call-response shout became rock anthem crowd moment, punk stripped it to pure collective fury, alt-rock reintroduced it as self-aware ironic crowd participation'
  },
  {
    chain: 'Reggae → Dancehall → Reggaeton → Latin Pop',
    sound: 'aye/eh/yo',
    story: 'Jamaican patois affirmation vocables traveled through dancehall production into reggaeton dembow culture, landing in Latin pop as rhythmic accent hooks'
  }
];

// FUSION VOCABLE RESOLVER — when two genres blend, which vocable wins
function resolveFusionVocables(genre1, genre2) {
  const bible = GENRE_BIBLE;
  const v1 = bible[genre1]?.vocables;
  const v2 = bible[genre2]?.vocables;
  if (!v1 && !v2) return null;
  if (!v2) return v1;
  if (!v1) return v2;

  // Check lineage — the more ancestral genre leads
  const lineageOrder = ['gospel','blues','soul','rnb','ss','folk','country','reggae','rock','altrock','pop','hiphop','kpop','afrobeats','reggaeton','punk','latin'];
  const rank1 = lineageOrder.indexOf(genre1);
  const rank2 = lineageOrder.indexOf(genre2);
  const lead = rank1 <= rank2 ? v1 : v2;
  const layer = rank1 <= rank2 ? v2 : v1;

  return {
    lead_sounds: lead.sounds,
    layer_sounds: layer.sounds,
    blend_note: `Lead with ${genre1 < genre2 ? genre1 : genre2} vocable tradition, layer ${genre1 < genre2 ? genre2 : genre1} textures underneath`,
    suno_tag: lead.suno_tag || VOCABLE_THEORY.suno_tags.singalong
  };
}

const FORMULA_LAWS=[
  {n:'Hook within 30 seconds',d:'Streaming platforms punish late hooks. Listeners decide in 15–30s. The dopamine reward must land early.',v:10},
  {n:'Tension → Release cycle',d:'Every section builds pressure then releases it. This mirrors the brain\'s dopamine anticipation/reward loop exactly.',v:10},
  {n:'Repetition with variation',d:'Mere-exposure effect: repeated hooks feel better each time. But pure repetition = boredom. Each repeat needs 1 new element.',v:9},
  {n:'Predictability + one surprise',d:'Brain predicts patterns and gets dopamine for being right. One unexpected element creates the "positive prediction error" — the chills.',v:10},
  {n:'Dynamic contrast',d:'Quiet verse → explosive chorus is the oldest trick. Greater contrast = more powerful dopamine release at the transition.',v:9},
  {n:'Zeigarnik effect',d:'Unfinished lyric phrases force the brain to complete them, creating earworms. Leave one chorus phrase slightly open-ended.',v:8},
  {n:'Specific imagery = universal feeling',d:'Songs using concrete specific images to express universal emotions outlive vague ones. Specificity creates empathy.',v:9},
  {n:'Identity & belonging signal',d:'Viral songs make the listener feel seen or part of a tribe. The chorus is the group identity moment.',v:9},
  {n:'Singability threshold',d:'If a person can\'t hum the chorus after 2 listens, it won\'t hit. Melody range ≤ 1.5 octaves. Max 12 syllables per chorus line.',v:10},
  {n:'BPM groove lock',d:'120–130 BPM = walking cadence (pop/dance). 60–70 BPM = resting heartbeat (ballads). Matching tempo to physiology creates embodied engagement.',v:8},
];

const MUSIC_THEORY_BIBLE={
  modes:{
    ionian:    {name:'Major (Ionian)',      feel:'Bright, happy, triumphant, resolved — the "default" Western scale',          genres:['pop','country','children','gospel','kpop'],    steps:'W-W-H-W-W-W-H'},
    dorian:    {name:'Dorian',              feel:'Minor but hopeful — bluesy cool, mysterious funk, bittersweet groove',       genres:['jazz','rnb','neosoul','blues','afrobeats'],    steps:'W-H-W-W-W-H-W'},
    phrygian:  {name:'Phrygian',            feel:'Dark, Spanish, tense, threatening — the "danger" mode',                      genres:['latin','altrock','edm'],                       steps:'H-W-W-W-H-W-W'},
    lydian:    {name:'Lydian',              feel:'Dreamy, floating, magical, film-score wonder — the "#4 shimmer"',            genres:['edm','tvmusical','pop'],                       steps:'W-W-W-H-W-W-H'},
    mixolydian:{name:'Mixolydian',          feel:'Rock swagger, bluesy, unresolved pull — major with a flat-7',               genres:['blues','country','altrock','reggae','afrobeats'],steps:'W-W-H-W-W-H-W'},
    aeolian:   {name:'Natural Minor (Aeolian)',feel:'Sad, introspective, dark, melancholic — the most emotional minor mode',  genres:['pop','hiphop','altrock','rnb','reggaeton'],    steps:'W-H-W-W-H-W-W'},
    locrian:   {name:'Locrian',             feel:'Unstable, dissonant — tension with no promise of release',                  genres:['altrock','experimental'],                      steps:'H-W-W-H-W-W-W'},
    pent_maj:  {name:'Major Pentatonic',    feel:'Open, pastoral, folk — simple joy, bluegrass, sunrise',                    genres:['country','ss','children','gospel','reggae'],   steps:'W-W-W+H-W-W+H'},
    pent_min:  {name:'Minor Pentatonic',    feel:'Blues, rock, raw emotion — the soulful cry. 5 notes that say everything',  genres:['blues','rnb','altrock','hiphop','neosoul'],    steps:'W+H-W-W-W+H-W'},
    blues_sc:  {name:'Blues Scale',         feel:'Minor pentatonic + blue note — the soul of American music, tension baked in',genres:['blues','jazz','rnb','neosoul'],               steps:'W+H-W-H-H-W+H-W'},
    wholetone: {name:'Whole Tone',          feel:'Dreamlike, floating, unresolved — Debussy impressionism, jazz shimmer',    genres:['jazz','edm'],                                  steps:'W-W-W-W-W-W'},
    chromatic: {name:'Chromatic',           feel:'Maximum tension, bebop density — all 12 tones, no tonal center to rest in',genres:['jazz','experimental'],                         steps:'H×12'},
  },

  outlierChords:{
    neapolitan:  {name:'Neapolitan (♭II)',         short:'♭II',  feel:'Profound sadness before resolution — the heartbreak chord. ♭II→V→I. Classical tragedy weaponized.',       howto:'Insert ♭II major chord before the final V→I cadence',                            genres:['pop','tvmusical','gospel','ss'],     tension:9},
    tritone_sub: {name:'Tritone Substitution',     short:'♭II7', feel:'Maximum chromatic pull — replaces V7 with a chord a tritone away, creating a chromatic bass descent to I.',howto:'Replace V7 with ♭II7 for a sliding bass-line resolution',                         genres:['jazz','neosoul','rnb'],              tension:10},
    borrowed_bVII:{name:'Borrowed ♭VII',           short:'♭VII', feel:'The "Hollywood chord" — unexpected grandeur and warmth from the parallel minor. Sounds huge every time.',  howto:'Insert ♭VII major chord before the final chorus or key moment',                   genres:['pop','altrock','country','tvmusical'],tension:5},
    borrowed_bVI: {name:'Borrowed ♭VI',            short:'♭VI',  feel:'Bittersweet, nostalgic — dark beauty in a major key song. The moment everything gets complicated.',        howto:'Use ♭VI as the bridge chord or emotional pivot',                                  genres:['pop','rnb','gospel','country'],       tension:6},
    borrowed_iv:  {name:'Borrowed iv (minor 4)',   short:'iv',   feel:'The most-used outlier in pop — adds instant melancholy to a major key song without fully darkening it.',  howto:'Use minor iv chord instead of major IV for one progression',                      genres:['pop','rnb','altrock','country','ss'], tension:4},
    secondary_dom:{name:'Secondary Dominant',      short:'V/V',  feel:'"Double drive" to the chord of resolution — creates far more momentum than a plain V→I.',                howto:'Insert V/V (e.g. A7 in key of C) before the V chord',                            genres:['jazz','gospel','latin','pop'],        tension:7},
    chromatic_med:{name:'Chromatic Mediant',       short:'±III', feel:'Magical non-functional move — a third up/down with a mode change. Film score wonder/revelation chord.',   howto:'Jump a major third up or down with opposite mode for the bridge key change',      genres:['edm','altrock','tvmusical','pop'],    tension:6},
    pedal_point:  {name:'Pedal Point',             short:'Pedal',feel:'Bass holds one note while chords move above — dominant pedal = massive tension; tonic pedal = spiritual.',howto:'Hold bass on V or I while chord progression continues above it',                  genres:['gospel','edm','blues','jazz'],        tension:8},
    deceptive_cad:{name:'Deceptive Cadence',       short:'V→vi', feel:'The false ending — listener expects V→I but gets V→vi. Creates surprise, yearning, prolonged emotion.',  howto:'Replace the final I chord with vi to delay resolution',                           genres:['pop','tvmusical','gospel','country'], tension:7},
    augmented_6th:{name:'Augmented 6th Chord',    short:'+6',   feel:'Classical maximum tension — chromatic half-step approach to V from both sides. Devastating in context.',  howto:'Use Ger+6 or It+6 before the dominant cadence for dramatic effect',               genres:['tvmusical','jazz','classical'],       tension:10},
    modal_mixture:{name:'Modal Mixture',           short:'Mix',  feel:'Borrowing across parallel modes for color — the palette of film scores and sophisticated pop.',           howto:'Freely borrow chords from the parallel major or minor key',                       genres:['pop','rnb','country','altrock','jazz'],tension:5},
    andalusian:   {name:'Andalusian Cadence',      short:'i-♭VII-♭VI-V',feel:'Descending bass line generating harmonic inevitability — Spanish, flamenco, cinematic, visceral.',howto:'Use descending chromatic bass: i → ♭VII → ♭VI → V for verse or bridge',          genres:['latin','altrock','edm','blues'],      tension:8},
    suspension:   {name:'Suspended Chord (sus2/4)', short:'sus', feel:'Tension without commitment — the sus4 creates yearning, the sus2 creates openness. Resolution = payoff.',howto:'Replace tonic or dominant with sus4 before resolving to create emotional breath',  genres:['pop','ss','gospel','edm'],            tension:6},
  },

  keyPsychology:{
    'C major': {feel:'Clean, neutral, transparent — no sharps/flats, no color bias. The blank canvas.',tension:'Low',bright:7},
    'G major': {feel:'Warm, pastoral, hopeful. Country\'s home. Guitar open strings = natural resonance.',tension:'Low',bright:8},
    'D major': {feel:'Triumphant, bright, grand. Orchestral victory. Beethoven\'s key of glory.',tension:'Low',bright:9},
    'A major': {feel:'Confident, joyful, clean. Pop and rock workhorse. Bright without harshness.',tension:'Low',bright:8},
    'E major': {feel:'Razor-sharp, almost harsh. Electric guitar\'s natural home. Raw energy.',tension:'Medium',bright:9},
    'B major': {feel:'Tense brightness. Rarely used for a reason — unstable, searching, restless.',tension:'Medium-High',bright:7},
    'F# major':{feel:'Extremely tense brightness. Enharmonic of G♭ — jazz\'s far-sharp territory.',tension:'High',bright:6},
    'F major': {feel:'Pastoral, warm, slightly melancholic. Mozart\'s "key of love". Folk comfort.',tension:'Low',bright:6},
    'B♭ major':{feel:'Noble, warm, full. Jazz and gospel staple. Natural brass key — resonant.',tension:'Low-Med',bright:7},
    'E♭ major':{feel:'Heroic, bold, grand. Classical "heroic key". Gospel and jazz ballad natural home.',tension:'Medium',bright:7},
    'A♭ major':{feel:'Warm and lush. Romantic ballad key. Rich, slightly mysterious.',tension:'Medium',bright:6},
    'D♭ major':{feel:'Gorgeous and remote. Jazz ballad key of distance and longing.',tension:'Medium',bright:6},
    'A minor': {feel:'Melancholic, introspective, natural sadness. Most-used minor in pop and rock.',tension:'Medium',bright:3},
    'E minor': {feel:'Dark, pensive, longing. "Hotel California" key. Guitar\'s most emotional.',tension:'Med-High',bright:3},
    'D minor': {feel:'"The saddest of all keys." Deep tragedy, classical devastation. Beethoven\'s 9th.',tension:'High',bright:2},
    'B minor': {feel:'Cold, isolated, reserved sorrow. Bach\'s most heartbreaking works.',tension:'High',bright:2},
    'F# minor':{feel:'Anguished, desperate, raw grief. Schubert\'s key of torment.',tension:'Very High',bright:1},
    'G minor': {feel:'Dramatic, earnest, serious. More urgent than D minor. Mozart\'s tragic mode.',tension:'High',bright:3},
    'C minor': {feel:'Fate, destiny, darkness with power. Beethoven\'s 5th. Determined suffering.',tension:'Very High',bright:2},
    'F minor': {feel:'Profound, funereal, deep grief. Chopin\'s darkest. Rarely used, always devastating.',tension:'Very High',bright:1},
  },

  genreScales:{
    pop:      ['Major (Ionian)','Natural Minor (Aeolian)','Major Pentatonic'],
    hiphop:   ['Minor Pentatonic','Natural Minor (Aeolian)','Dorian'],
    rnb:      ['Dorian','Minor Pentatonic','Major (Ionian)','Blues Scale'],
    neosoul:  ['Dorian','Mixolydian','Minor Pentatonic','Blues Scale'],
    gospel:   ['Major (Ionian)','Major Pentatonic','Minor Pentatonic','Natural Minor (Aeolian)'],
    jazz:     ['Dorian','Mixolydian','Lydian','Whole Tone','Chromatic','Blues Scale'],
    blues:    ['Blues Scale','Minor Pentatonic','Mixolydian'],
    country:  ['Major Pentatonic','Major (Ionian)','Mixolydian'],
    ss:       ['Major (Ionian)','Natural Minor (Aeolian)','Major Pentatonic'],
    edm:      ['Natural Minor (Aeolian)','Phrygian','Lydian','Major (Ionian)'],
    latin:    ['Phrygian','Dorian','Major (Ionian)','Mixolydian'],
    reggae:   ['Mixolydian','Major Pentatonic','Dorian'],
    reggaeton:['Natural Minor (Aeolian)','Minor Pentatonic','Dorian'],
    altrock:  ['Natural Minor (Aeolian)','Phrygian','Minor Pentatonic','Dorian'],
    afrobeats:['Dorian','Major Pentatonic','Mixolydian'],
    punk:     ['Major (Ionian)','Natural Minor (Aeolian)','Major Pentatonic'],
    kpop:     ['Major (Ionian)','Natural Minor (Aeolian)','Dorian'],
    neosoul:  ['Dorian','Mixolydian','Minor Pentatonic','Blues Scale'],
  },

  progressions:{
    'The Canon':       {prog:'I–V–vi–IV',          feel:'Triumphant, anthemic, universal — the #1 pop progression',         genres:['pop','gospel'],       tension:'Low',  outlier:false},
    'The Minor Wheel': {prog:'i–VII–VI–VII',        feel:'Dark, driving, cyclical — Russian sadness, hip-hop backbone',      genres:['hiphop','altrock'],   tension:'Med',  outlier:false},
    'The Blues 12-Bar':{prog:'I7–IV7–I7–V7–IV7–I7',feel:'Raw, American, inevitable — the founding form of popular music',  genres:['blues','jazz'],       tension:'Med',  outlier:false},
    'The ii–V–I':      {prog:'ii7–V7–Imaj7',        feel:'Jazz resolution — the most sophisticated "going home" in music',  genres:['jazz','neosoul'],     tension:'High→Low',outlier:false},
    'The Andalusian':  {prog:'i–♭VII–♭VI–V',        feel:'Descending Spanish drama — chromatic bass inevitability',         genres:['latin','altrock'],    tension:'High', outlier:true},
    'The Axis':        {prog:'I–V–vi–iii–IV',       feel:'Emotional complexity — common in K-pop and cinematic pop',        genres:['pop','kpop'],         tension:'Med',  outlier:false},
    'Borrowed ♭VII':   {prog:'I–♭VII–IV–I',         feel:'Rock anthem grandeur — unexpected warmth from parallel minor',    genres:['altrock','country'],  tension:'Med',  outlier:true},
    'The Neapolitan':  {prog:'i–iv–♭II–V–i',        feel:'Classical heartbreak — the most devastating cadence sequence',    genres:['tvmusical','pop'],    tension:'V.High',outlier:true},
    'Tritone Slide':   {prog:'ii7–♭II7–Imaj7',      feel:'Jazz chromatic pull — bass descends by half-step twice to home', genres:['jazz','neosoul'],     tension:'High', outlier:true},
    'The Modal Vamp':  {prog:'i–VII (looped)',       feel:'Groove-first hypnosis — neo-soul and Afrobeats foundation',      genres:['neosoul','afrobeats'],tension:'Low',  outlier:false},
    'The Deceptive':   {prog:'I–IV–V–vi',           feel:'False ending — denied resolution creates yearning',              genres:['pop','gospel'],       tension:'High', outlier:true},
    'Gospel Shout':    {prog:'I–IV–I–V–IV–I',       feel:'Church jubilation — call-and-response harmonic structure',       genres:['gospel'],             tension:'Low→High',outlier:false},
    'Chromatic Med':   {prog:'I–♭III–IV',            feel:'Film score wonder — magical non-functional chord jump',          genres:['edm','tvmusical'],    tension:'Med',  outlier:true},
    'The Lydian Float':{prog:'I–II (in Lydian)',     feel:'The #4 shimmer — dreamy, weightless, film-score levitation',    genres:['edm','tvmusical'],    tension:'Low',  outlier:true},
  },

  theoryLevels:{
    standard:    {label:'Standard',     desc:'Diatonic, genre-typical progressions — the proven formulas that work',                  outliers:0},
    adventurous: {label:'Adventurous',  desc:'One strategic harmonic outlier — a borrowed chord or secondary dominant that surprises', outliers:1},
    avantgarde:  {label:'Avant-garde',  desc:'Bold harmonic choices — tritone subs, Neapolitan, chromatic mediants, pedal points',    outliers:3},
  },
};

const SUBSTYLE_NOTES={
  // Hip-Hop regional/era deep notes injected alongside substyleNote
  'G-Funk':      'G-Funk DNA: 90-100 BPM, slow rolling groove. Synthesizer whine (Moog/Roland), P-Funk bass samples (Parliament-Funkadelic). Laid-back West Coast flow — lines stretch over the beat, never rushed. Imagery: Lowriders, sunshine, Crenshaw, Pacific Coast. Nate Dogg-style melodic sung hooks. Suno style: "g-funk, moog synth whine, west coast hip-hop, slow rolling 808, 95 BPM, smooth melodic hook". Artists: Dr. Dre, Snoop Dogg, Warren G, Nate Dogg, Tha Dogg Pound.',
  'Bay Area':    'Bay Area DNA: Hyphy movement — E-40, Mac Dre, Too Short, Mistah F.A.B. High-energy, frenetic delivery contrasted with laid-back Oakland drawl. Slang: hella, thizz, yadadamean, stunna, turf, ghost ride. Ghost riding the whip references. Screwed/chopped variants for slower tracks. Trunk-rattling bass. Suno style: "bay area hip-hop, hyphy, trunk music, 808 bass, hi-energy, Oakland rap". Older Bay flavor: Too Short pimp talk, Digital Underground funk-rap.',
  'Down South':  'Down South / Dirty South DNA: Trunk-rattling slow 808s, Southern drawl, elongated vowels on stressed syllables. Sub-genres: Atlanta (OutKast psychedelic, Goodie Mob soul), Houston (UGK country-rap, Scarface cinematic, DJ Screw chopped), Memphis (Three 6 Mafia dark horror, lo-fi cassette), New Orleans (Cash Money bounce, Master P No Limit tank). Themes: Southern heat, street survival, pride, codeine lean. Suno style varies — "dirty south, 808 bass, southern rap, slow tempo" for Houston; "atlanta rap, psychedelic, live band, funk" for ATL.',
  'Crunk':       'Crunk DNA: Lil Jon / Three 6 Mafia era. Call-and-response crowd shouts. Extremely high energy, short punchy lines. Repetitive hypnotic hooks meant for clubs. Distorted synth stabs. 140-150 BPM. Screamed adlibs throughout. Suno style: "crunk, distorted synth, 808, 145 BPM, club energy, call and response, eastern Kentucky". Artists: Lil Jon, Ying Yang Twins, Three 6 Mafia.',
  'Chopped & Screwed': 'Chopped & Screwed DNA: DJ Screw Houston style. Slowed tempo 60-70 BPM. Pitch-lowered vocals (baritone, syrupy). Repeated bars and phrases ("chopped"). Codeine/lean references. Hypnotic repetition creates trance state. Suno style: "chopped and screwed, slowed houston rap, syrupy 65 BPM, baritone, deep 808, houston texas". Artists: DJ Screw, Z-Ro, Slim Thug, Paul Wall.',
  'East Coast':  'East Coast DNA: New York lyricism tradition. Complex internal rhyme schemes, dense wordplay, cultural references. Jazz/soul samples (Pete Rock, Large Professor, RZA). Boom bap drums, minimal production. 85-95 BPM. Verses carry the song — hooks are functional not melodic. Suno style: "east coast hip-hop, boom bap, jazz sample, vinyl, 90 BPM, new york". Artists: Nas, Jay-Z, Biggie, Rakim, Big L, Mobb Deep, Wu-Tang.',
  'Midwest':     'Midwest DNA: Chicago soul samples (Kanye era), Twista hyperspeed flow, Detroit grit (Big Sean, Royce da 5\'9"), St. Louis bounce. Emotional vulnerability alongside street realism. Chipmunk soul samples. Suno style: "midwest rap, soul sample, chicago, 95 BPM, emotional, chipmunk soul". Artists: Kanye West, Twista, Common, Lupe Fiasco, Chance the Rapper, Big Sean.',
  'Cloud Rap':   'Cloud Rap DNA: Ethereal, atmospheric, lo-fi production. Hazy drum machines, woozy synth pads, reverb-drenched vocals. Existential/introspective themes, often melancholic. Very slow BPM 70-90. Mumbled delivery. Suno style: "cloud rap, ethereal, lo-fi, reverb, atmospheric synths, 80 BPM, dreamy". Artists: Lil B, Bladee, Yung Lean, Carti (early), Bones.',
  // Neo-Soul substyles
  'Classic Neo-Soul':    'Classic Neo-Soul DNA: D\'Angelo / Erykah Badu era. Warm Rhodes piano, upright or Fender bass, live drums with swing (slightly behind the beat). Head-nod groove mandatory. Vocals are conversational and improvised-feeling. Suno style: "neo-soul, Rhodes piano, live drums, swing, 90 BPM, warm vinyl, head-nod groove". Artists: D\'Angelo, Erykah Badu, Maxwell.',
  'Hip-Hop Neo-Soul':    'Hip-Hop Neo-Soul DNA: The Lauryn Hill / Common / J Dilla intersection. Boom bap or Dilla-off-beat drum programming under soulful vocal delivery. Rapped bridges or verses inside a sung structure. Sample-flipped soul. Suno style: "neo-soul, hip-hop drums, J Dilla beat, soul vocal, 85 BPM, vinyl warmth". Artists: Lauryn Hill, Common, Bilal, H.E.R.',
  'Neo-Soul Ballad':     'Neo-Soul Ballad DNA: Slow, intimate, emotionally devastating. Piano-led or sparse Rhodes. Vocal runs that say more than the words. Space between phrases. Minor key tension. Suno style: "neo-soul ballad, piano, 70 BPM, intimate, vulnerable, warm, soul". Artists: Maxwell, Jill Scott, India.Arie.',
  'Afro-Soul':           'Afro-Soul DNA: West African or Afrobeats rhythm underneath neo-soul warmth. Talking drum or shekere percussive bed with Rhodes or kalimba. Spiritual/ancestral themes. Suno style: "afro-soul, talking drum, Rhodes, warm, 95 BPM, Lagos, spiritual, soulful". Artists: Asa, Simi, Tems (ballad side), Erykah Badu (African-influenced).',
  'Lo-Fi Soul':          'Lo-Fi Soul DNA: Vinyl crackle, dusty drum loops, muffled warmth. Chopped soul samples. Bedroom production aesthetic. Introspective and intimate. Suno style: "lo-fi soul, vinyl crackle, dusty drums, muffled, warm, 80 BPM, bedroom production, introspective".',
  'Psychedelic Soul':    'Psychedelic Soul DNA: Sly Stone, early Stevie Wonder, D\'Angelo "Voodoo" — soul meets psychedelia. Layered textures, pitch effects, deep reverb, spiritual/cosmic themes. Exploratory structure. Suno style: "psychedelic soul, funky bass, cosmic, reverb, layers, 95 BPM, voodoo, Sly Stone". Artists: Sly & the Family Stone, early Stevie, D\'Angelo (Voodoo era).',
  'Jazz-Soul':           'Jazz-Soul DNA: Jazz harmony (extended 7ths/9ths/13ths, modal voicings, quartal stacks) laid atop neo-soul groove. Live drums, upright bass, Rhodes electric piano, horn section, improv solos between verses. 85-110 BPM. Lyrics favor interior reflection and wordless vocal runs. Suno style: "jazz-soul, jazz harmony, upright bass, Rhodes electric piano, live drums, horn section, 95 BPM, Robert Glasper style, improv solos". Artists: Robert Glasper, Hiatus Kaiyote, Moonchild, Masego, José James, Gregory Porter.',
  'Gospel Soul':         'Gospel Soul DNA: Neo-soul production over gospel lyricism and call-and-response vocal arrangements. Hammond B3 organ central, mass choir on final chorus, testimonial lyrical arc (broken → grace → free). 75-95 BPM. Bridges lead toward a shout moment. Suno style: "gospel soul, Hammond B3, mass choir on final chorus, testimonial, call and response, 85 BPM, PJ Morton style". Artists: PJ Morton, D\'Angelo (Africa era), Marvin Gaye (What\'s Going On), Tye Tribbett, Kirk Franklin, Aretha Franklin.',
  // Gospel substyles
  'Traditional Gospel':  'Traditional Gospel DNA: Thomas Dorsey / Mahalia Jackson tradition. Hammond B3 organ is the anchor. Call-and-response between lead and choir. Testimony lyrics (I was broken → God moved → I am free). Building to a shout. Suno style: "traditional gospel, Hammond B3, mass choir, hand claps, call and response, soul, powerful".',
  'Contemporary Gospel': 'Contemporary Gospel DNA: Kirk Franklin, Fred Hammond, Tye Tribbett. Pop and hip-hop production underneath gospel content. 808 bass, modern drums, mass choir stacked harmonies. Celebration energy. Suno style: "contemporary gospel, Kirk Franklin style, 808 bass, mass choir, celebratory, hip-hop gospel, full production".',
  'Worship / CCM':       'Worship/CCM DNA: Hillsong, Chris Tomlin, Bethel Music. Arena rock meets hymn. Corporate worship — songs designed for congregations to sing together. Simple melody, repetitive chorus designed for crowds. Suno style: "worship music, piano, electric guitar, congregational, 75 BPM, soaring, emotional, Hillsong style".',
  'Southern Gospel':     'Southern Gospel DNA: Acoustic quartet harmonies, banjo or acoustic guitar, country-gospel intersection. Shaped-note singing tradition. Narrative testimony. Suno style: "southern gospel, acoustic guitar, four-part harmony, country gospel, warm, testimony".',
  'Gospel Hip-Hop':      'Gospel Hip-Hop DNA: Lecrae, Andy Mineo, KB. Rap flow with gospel message. Trap/boom bap production under spiritual content. Street credibility meets faith testimony. Suno style: "gospel rap, trap beat, 808 bass, conscious lyrics, faith, hip-hop gospel".',
  'Gospel Ballad':       'Gospel Ballad DNA: Slow, piano-led, tear-in-the-throat testimony. Verses intimate and vulnerable, bridge breaks open, final chorus ushers in the choir. 60-75 BPM. Suno style: "gospel ballad, piano, intimate testimony vocal, choir swells on final chorus, 65 BPM, Yolanda Adams style, emotional climax". Artists: Yolanda Adams, CeCe Winans, Kirk Franklin (ballads), Tasha Cobbs Leonard, Kim Burrell, Richard Smallwood.',
  'Praise & Worship':    'Praise & Worship DNA: Congregational-focused, extended vamp structures, lyrics that declare rather than narrate ("Jesus at the center," "Great are you Lord"). Builds from intimate worship to full-band shout. 70-90 BPM. Suno style: "praise and worship, congregational, extended vamp, declaration lyrics, 80 BPM, builds from intimate to shout, Maverick City style". Artists: Tasha Cobbs Leonard, Hezekiah Walker, Travis Greene, Maverick City Music, Israel Houghton, William McDowell.',
  'Mass Choir':          'Mass Choir DNA: The choir IS the instrument — 40+ voices stacked in SATB arrangements, call-and-response with a lead vocalist. Hammond B3, rhythm section, sometimes horns. 80-110 BPM. Suno style: "mass choir gospel, 40+ voices SATB stacked, Hammond B3, lead vocalist call response, 95 BPM, Hezekiah Walker style, celebration". Artists: Mississippi Mass Choir, Hezekiah Walker, Brooklyn Tabernacle Choir, Edwin Hawkins Singers, Thompson Community Singers, New Jersey Mass Choir.',
  // Country substyles
  'Outlaw Country':     'Outlaw Country DNA: Willie Nelson/Waylon Jennings/Johnny Cash — rebellion against Nashville polish. Raw production, no strings, no gloss. Defiance, freedom, open roads, whiskey, living by your own code. Telecaster or nylon guitar, minimal drums, pedal steel underneath. Every line from someone who burned their bridges and is at peace with it. Suno: "outlaw country, acoustic guitar, raw telecaster, honky-tonk, 95 BPM, twang, rebel".',
  'Bakersfield':        'Bakersfield Sound DNA: Buck Owens/Merle Haggard/Dwight Yoakam. Fender Telecaster — bright, cutting twang. Shuffled honky-tonk beat, no Nashville sweetening. California working-class pride. Direct language, no metaphor — every line states something true plainly. Suno: "bakersfield country, fender telecaster, shuffle rhythm, california honky-tonk, 100 BPM, bright twang".',
  'Nashville Pop':      'Nashville Pop DNA: Carrie Underwood/Luke Combs/Kelsea Ballerini. Stadium-ready, polished production. Electric guitar crunch, pedal steel over pop structure. Big hook within 30 seconds. Second verse MUST deepen emotionally — not repeat. Bridge is the revelation. Suno: "country pop, polished production, electric guitar, pedal steel, 120 BPM, radio-ready, modern country, anthemic".',
  'Americana':          'Americana DNA: Jason Isbell/Gillian Welch/Chris Stapleton/Brandi Carlile. Literary lyric — character names, specific geography, physical detail. Uncomfortable truths left uncomfortable. Songs are short stories. Writing rule: "the Kroger on 5th and Main" beats "the grocery store." Narrator is flawed and aware of it. Suno: "americana, acoustic guitar, upright bass, subtle pedal steel, warm, honest, 85 BPM, literary".',
  'Bluegrass':          'Bluegrass DNA: Bill Monroe/Alison Krauss/Old Crow Medicine Show. Sacred quartet: banjo, mandolin, fiddle, upright bass — NO DRUMS. Fast 120-180 BPM. Three-part harmonies tight as family. Instrumental breaks MANDATORY — mark [Banjo Break] or [Fiddle Break]. Themes: mountains, rivers, trains, home longing, faith. Phrasing should feel old — "I long to see" not "I miss." Suno: "bluegrass, banjo, mandolin, fiddle, upright bass, no drums, three-part harmony, 140 BPM, Appalachian".',
  'Bro-Country':        'Bro-Country DNA: Florida Georgia Line/Luke Bryan/Jason Aldean. Imagery: lifted trucks, dirt roads, lake days, tailgates, cold beer, bonfires. Pop-country production. Big chorus for 30,000 people. Specificity of objects — not "a truck" but "my lifted F-150." Maximum fun, no existential weight. Suno: "bro-country, electric guitar, 115 BPM, party energy, summer, modern country, stadium singalong".',
  'Alt-Country':        'Alt-Country DNA: Kacey Musgraves/Zach Bryan/Tyler Childers/Sturgill Simpson. Country emotional honesty without genre rules. Borrows from rock, psychedelia, folk. Outsider perspective. Write what Nashville would not greenlight — the best alt-country song makes someone uncomfortable at a country radio station. Suno: "alt-country, acoustic guitar, indie-inflected, honest, 90 BPM, defiant, warm, genre-fluid".',
  'Texas / Red Dirt':   'Texas/Red Dirt DNA: Pat Green/Wade Bowen/Turnpike Troubadours. Texas geography is the soul: Guadalupe River, Hill Country, Gruene Hall. Organic band, campfire warmth. Home, loyalty, Texas as identity. Writing rule: name actual places — "the Guadalupe below the low-water crossing" not "the river." Suno: "texas country, red dirt, acoustic guitar, warm, honest, 100 BPM, road song, Lone Star".',
  'Classic Honky-Tonk': 'Classic Honky-Tonk DNA: Hank Williams/George Jones/Patsy Cline. Bar-room country — heartbreak, cheating, drinking. Sharp 2-and-4 feel. Stripped bar-band: guitar, pedal steel, fiddle, bass, drums. Pedal steel cries between phrases. Emotionally direct — no ambiguity, no irony. "She left me" is a complete premise. Suno: "classic honky-tonk, pedal steel guitar, fiddle, shuffle beat, 105 BPM, heartbreak, bar room, Hank Williams style".',
  'Country Gospel':     'Country Gospel DNA: Alan Jackson/Dolly Parton/Ricky Skaggs. Country production carrying hymn-based faith. Testimony arc: lost → grace found me → home. Acoustic warmth, steel guitar, harmonies. Choir enters for final chorus lift. Faith is the center, not decoration. Narrator must be specific about transformation — what were they before, what changed, what are they now. Suno: "country gospel, acoustic guitar, pedal steel, warm vocal harmony, 85 BPM, hymn, faith, southern testimony".',
  // Children substyles
  'Singalong / Playful': 'Children\'s Singalong DNA: Maximum participation. Simple repeating phrase as chorus hook. Motion cues embedded (clap, stomp, jump). Major key, bright, 100-120 BPM. The melody must be singable by a 4-year-old in 2 listens. Suno style: "children\'s singalong, ukulele, clapping, bright, joyful, 110 BPM, playful".',
  'Educational':         'Educational Children\'s DNA: The lesson is hidden inside the fun. Count, alphabet, animals, colors, shapes — but approached with wonder not drill. Repetition that teaches. Suno style: "educational children\'s song, acoustic guitar, glockenspiel, clear vocals, 105 BPM, friendly, warm".',
  'Lullaby / Bedtime':   'Lullaby DNA: Descending melody (literally descending — falling intervals calm the nervous system). Slowing tempo verse to verse. Safety and love in every image. Minimal instrumentation. Suno style: "lullaby, soft acoustic guitar, gentle, 60 BPM, warm, soothing, hushed vocals, night, stars".',
  'Silly / Nonsense':    'Silly/Nonsense Children\'s DNA: Pure absurdist fun. Made-up words, tongue twisters, impossible scenarios played completely straight. The laugh IS the lesson — joy is educational. Suno style: "silly children\'s song, bouncy, 115 BPM, playful, bright, ukulele, fun".',
  'Adventure Story':     'Adventure Story Children\'s DNA: A journey in song form — the verses travel (into the woods, across the sea, up the mountain). Big imaginative imagery. Chorus names the destination or the adventurer. 100-120 BPM. Invites the listener to come along. Suno style: "children\'s adventure song, cinematic, orchestral children\'s music, 110 BPM, warm, imaginative, journey".',
  'Nature & Animals':    'Nature & Animals Children\'s DNA: Songs ABOUT specific creatures, ecosystems, weather, plants. Names the animal by its real name — not "the bird," but "the robin." Educational within the wonder. Bright major keys, lots of onomatopoeia (splash, swoosh, roar, chirp). 110-125 BPM. Suno style: "children\'s nature song, bright ukulele, onomatopoeia sounds, 115 BPM, animal noises, warm acoustic, educational wonder".',
  'Friendship & Kindness':'Friendship & Kindness Children\'s DNA: Social-emotional lesson songs — sharing, helping, including, apologizing, saying "I\'m sorry." Warm conversational verses, chorus lands the value lesson simply. 100-115 BPM. Suno style: "children\'s kindness song, warm acoustic guitar, gentle singable chorus, 105 BPM, conversational verses, social emotional learning".',
  'Holiday / Seasonal':  'Holiday/Seasonal Children\'s DNA: Christmas, Hanukkah, Diwali, birthdays, Valentine\'s, Halloween, seasonal (autumn leaves, snow day, spring garden). Imagery is sensory and specific — the smell, the sight, the sound of the season. 100-120 BPM typically, slower for reverent holidays. Suno style: "children\'s holiday song, seasonal imagery, sleigh bells or seasonal percussion, 110 BPM, warm festive, family-friendly".',
  // Parody substyles
  'Genre Parody':   'Genre Parody DNA: Rewrite a specific song in a specific genre with absurdist/comedic new lyrics. The production must sound 100% authentic to the source genre — the comedy is purely in the lyrical content. Suno style: mirror the original genre exactly. Key rule: commit fully to the genre performance while the lyrics are completely ridiculous.',
  'Pop Parody':     'Pop Parody DNA: Rewrite a mainstream pop song with mundane or absurdist subject matter. Use the original song\'s structure, melody cues, and production style. Subject could be: grocery shopping, Wi-Fi passwords, IKEA assembly. Suno style: "upbeat pop, polished production, major key, 120 BPM" — same as a real pop song.',
  'Rap Parody':     'Rap Parody DNA: Rap verse structure with comedic/absurdist bars. Can parody a specific rap song or rap in general about a non-rap subject. Use real rap flow patterns (16-bar verse, 8-bar hook) with completely deflating subject matter. Suno style: match specific rap era/substyle being parodied.',
  'Ballad Parody':  'Ballad Parody DNA: Soaring dramatic ballad delivery applied to something trivial. The bigger the emotional production, the funnier the trivial subject. Verse builds with restraint, pre-chorus adds tension, chorus erupts in full dramatic glory — all about something like losing your phone charger. Suno style: "epic power ballad, piano, strings, dramatic, emotional, stadium".',
  // Comedy substyles
  'Absurdist':      'Absurdist Comedy DNA: Internal dream-logic. The premise is established early and followed to its extreme conclusion without apology. The world of the song has rules, and those rules are insane. Suno style: match the emotional sincerity of the genre — the music never acknowledges the absurdity.',
  'Dark Comedy':    'Dark Comedy DNA: Finding humor in genuinely dark or uncomfortable situations. The delivery is always casual and upbeat — the contrast between tone and content IS the comedy. Tim Minchin territory. Suno style: "upbeat, cheerful, major key" applied to dark subject matter for maximum tonal contrast.',
  'Satirical':      'Satirical Comedy DNA: Exaggerated social/political commentary through music. The target (institution, behavior, attitude) must be crystal clear. Satire punches at power, not down. Uses genre conventions of the target demographic to increase impact. Suno style: mirror the genre of the demographic being satirized.',
  'Observational':  'Observational Comedy DNA: The universal shared experience of mundane modern life — the frustration of tech support, the anxiety of small talk, the tragedy of dying phone batteries. Relatable specificity is everything. Suno style: "singer-songwriter, acoustic, intimate, conversational" — feels like a friend venting.',
  'Musical Roast':  'Musical Roast DNA: A song specifically aimed at a target (person, brand, idea) written to roast them. Format: verse 1 establishes the target\'s positive self-image, verse 2 demolishes it, bridge is the killing blow, chorus is the repeated accusation. Never cruel — always funny.',
  // TV/Musical substyles
  'TV Theme':       'TV Theme DNA: 30-90 seconds to establish the show\'s entire world — genre, tone, era, class level, emotional register. The hook IS the show title or a defining phrase. Suno style: "catchy TV theme, [show genre tone], memorable, [era]". The audience knows what they\'re watching within 5 seconds.',
  'Broadway / Show Tune': 'Broadway DNA: Character sings what cannot be said in dialogue — the emotional eruption. Clear dramatic objective ("I want" / "I need" / "I feel"). Musical theater diction: precise consonants, open vowels, projected. Suno style: "Broadway musical, show tune, theatrical, orchestral pit band, belting vocals".',
  'Disney-Style':   'Disney DNA: The "I want" song. Character expresses their deepest wish in verse, the world responds in chorus. Magical orchestration. Pure emotional sincerity — no irony. Suno style: "Disney animated film song, orchestral, magical, warm, major key, soaring melody, 120 BPM".',
  'Jingle / Ad':    'Jingle DNA: Product name minimum 3× in 30-60 seconds. Problem in verse (pain point), product = solution in chorus. Benefit not feature. Melody sticky enough to remember after one listen. Suno style: "upbeat commercial jingle, major key, catchy, corporate, polished, radio-ready".',
  'Sitcom Theme':   'Sitcom Theme DNA: 30-60 seconds. Warm, inviting, tells you this is a safe fun place. Often summarizes the show\'s premise. Major key, upbeat tempo, memorable chorus. Era-appropriate production. Suno style: "sitcom theme, warm, upbeat, [era: 90s/2000s/modern], feel-good, catchy melody".',
  'Prestige Drama Theme': 'Prestige Drama Theme DNA: Atmospheric, sparse, foreboding or melancholic. Establishes stakes and tone. Minor key or modal. Often instrumental or near-instrumental. Suno style: "prestige TV theme, cinematic, atmospheric, [mood: dark/cold/intense], strings, piano, sparse, HBO-style".',
  // Alt-Rock substyles
  'Shoegaze':            'Shoegaze DNA: Wall-of-sound guitars drenched in reverb, chorus, and flange. Vocals buried deep in the mix as another texture — sung into the effect chain, not over it. Drowsy mid-tempo 90-120 BPM. Emotional fog over specific words — felt more than understood. Dynamic shifts are textural (more layers, more feedback), not quiet-loud. Suno style: "shoegaze, wall of reverb guitars, chorus pedal, buried dreamy vocals, 100 BPM, hazy textures, atmospheric". Artists: My Bloody Valentine, Slowdive, Ride, Cocteau Twins, DIIV, Beach House.',
  'Post-Punk':           'Post-Punk DNA: Angular jagged guitars, driving melodic bass (bass IS the melody), tight mechanical drums. Detached declamatory vocals — half-spoken, emotionally controlled. Cold urban atmosphere, alienation and anxiety themes. 120-140 BPM. Minor key tonality. Suno style: "post-punk, driving melodic bass, angular guitars, tight mechanical drums, 130 BPM, cold detached vocals, Joy Division feel". Artists: Joy Division, The Cure, Interpol, Gang of Four, Wire, Siouxsie and the Banshees.',
  'Grunge':              'Grunge DNA: Heavy distorted power chords, sludgy Seattle guitar tone. Quiet-loud-quiet dynamics WITHIN one song — whispered verse explodes into screamed chorus. 90-120 BPM. Vulnerable, disaffected, self-loathing themes. Raw unpolished production, no gloss. Suno style: "grunge, distorted guitars, sludgy power chords, quiet loud dynamics, 100 BPM, raw Seattle production". Artists: Nirvana, Pearl Jam, Soundgarden, Alice in Chains, Mudhoney, Screaming Trees.',
  'Indie Rock':          'Indie Rock DNA: Jangly clean or lightly overdriven guitars, live-band feel, melodic bass carrying counter-melody. Conversational-to-emotional vocal delivery — unfussed, honest. 110-140 BPM. Lyrically literary, conversational, or wry. Unpolished but intentional production. Suno style: "indie rock, jangly guitars, live band, 125 BPM, melodic bass, conversational vocals, warm". Artists: The Strokes, Arctic Monkeys, Vampire Weekend, Modest Mouse, Pavement, Wilco, Spoon.',
  'Lo-Fi':               'Lo-Fi Alt DNA: Deliberately unpolished — tape hiss, room noise, bedroom-recording aesthetic embraced as the feature. Muffled drums, fuzzy overdriven guitars, intimate close-mic vocals. 80-110 BPM. Emotional rawness valued over fidelity — the imperfection IS the warmth. Suno style: "lo-fi indie, tape hiss, bedroom recording, fuzzy guitars, intimate close-mic vocals, 95 BPM, imperfect warmth". Artists: Alex G, Elliott Smith, Sparklehorse, early Beck, Sebadoh, Guided by Voices.',
  'Art Rock':            'Art Rock DNA: Experimental structures that ignore pop convention — odd time signatures, extended form, genre collisions, unconventional instrumentation (strings, synths, field recordings). Literate and conceptual lyrics. Rewards repeat listening. 100-130 BPM varies widely. Suno style: "art rock, experimental, layered textures, unusual time signature, 110 BPM, conceptual, cinematic". Artists: Radiohead, David Bowie, Talking Heads, Kate Bush, St. Vincent, Peter Gabriel.',
  'Emo':                 'Emo DNA: Twinkly clean and tapped guitars in verse explode into distorted chorus. Confessional lyric — diary-entry specificity, heart fully exposed, no metaphor shield. Voice cracks mid-phrase are a FEATURE not a flaw. 130-160 BPM mostly. Midwest-emo instrumental counterpoint meets pop-punk energy. Suno style: "emo, twinkly clean guitars, distorted chorus, 140 BPM, confessional vocals, voice cracks, midwest emo". Artists: American Football, Sunny Day Real Estate, The Get Up Kids, Brand New, Jimmy Eat World, Taking Back Sunday.',
  'Math Rock':           'Math Rock DNA: Complex polyrhythms, odd time signatures (5/4, 7/8, 11/8, 15/16). Tapped two-hand guitar patterns interlock with drums like gears. Often instrumental, or with mumbled unfussy vocals. 120-160 BPM. Technical precision delivered with unfussed emotion. Suno style: "math rock, odd time signature, tapped guitar, interlocking polyrhythm, 140 BPM, angular, technical, often instrumental". Artists: Don Caballero, American Football, Tera Melos, Battles, TTNG, Toe.',
  // Punk substyles — Post-Punk already in Alt-Rock section above
  'Classic Punk':        'Classic Punk DNA: CBGB and London \'76-\'78 era. Three power chords, straight eighth-note drums, shouted vocals, 2-minute songs. Anti-establishment rage, working-class anger. 160-200 BPM. No solos — the RIFF is the statement. Production is raw, live-in-the-room. Lyrics: direct, blunt, no metaphor. Suno style: "classic punk, three chord power chords, straight eighths, shouted vocals, 180 BPM, raw live production, CBGB, anti-establishment". Artists: Ramones, Sex Pistols, The Clash, Buzzcocks, Dead Kennedys, Black Flag.',
  'Pop-Punk':            'Pop-Punk DNA: Punk energy with pop-melodic hooks. Sung (not shouted) vocals over distorted power chords. Massive chorus singalong. 150-180 BPM. Suburban alienation, heartbreak, teenage angst — but delivered with fun. Gang vocals on chorus mandatory. Suno style: "pop-punk, distorted power chords, sung melodic vocals, 165 BPM, gang vocal chorus, energetic, Warped Tour". Artists: Green Day, Blink-182, Sum 41, New Found Glory, All Time Low, Paramore.',
  'Hardcore':            'Hardcore DNA: Faster, angrier, more compressed than classic punk. 180-250 BPM. Shouted group vocals (often in unison). Mosh-pit breakdown sections at half-time. Political, straight-edge, or anti-political themes. Songs under 90 seconds common. Suno style: "hardcore punk, blast beats, shouted group vocals, 220 BPM, mosh breakdown, compressed, aggressive". Artists: Minor Threat, Black Flag, Bad Brains, Gorilla Biscuits, Turnstile, Fugazi.',
  'Ska-Punk':            'Ska-Punk DNA: Offbeat upstroke guitar skank + horn section (trumpet, trombone, sax) + punk energy. 130-170 BPM. Genre skips between ska verse (bouncy upstroke feel) and punk chorus (distorted power chords). Jamaica meets London meets LA. Suno style: "ska-punk, offbeat upstroke guitar, horn section, 150 BPM, ska verse punk chorus, energetic, Orange County". Artists: Rancid, Operation Ivy, Sublime, Less Than Jake, Reel Big Fish, Streetlight Manifesto.',
  'Anti-Folk':           'Anti-Folk DNA: Acoustic folk instrumentation (acoustic guitar, ukulele, kazoo, shaker) + punk attitude and DIY ethos. Deliberately lo-fi home recording. Confessional, absurdist, or deadpan lyrics — sometimes within one song. Sounds unfinished on purpose. 90-130 BPM. Suno style: "anti-folk, acoustic guitar, lo-fi home recording, deadpan vocals, 110 BPM, unfinished feel, DIY, confessional absurdist". Artists: Jeffrey Lewis, The Moldy Peaches, Kimya Dawson, Regina Spektor (early), Beck (Mellow Gold era), Daniel Johnston.',
  // Blues substyles
  'Chicago Blues':       'Chicago Blues DNA: Electrified Mississippi blues, 1950s Chess Records era. 12-bar form standard. Electric slide guitar, blues harp (harmonica), electric bass, drums shuffle, piano. 90-110 BPM. Themes: the Great Migration, loss, mojo, lust, whiskey. Suno style: "chicago blues, electric slide guitar, blues harp, shuffle beat, 100 BPM, Chess Records, Muddy Waters style". Artists: Muddy Waters, Howlin\' Wolf, Buddy Guy, Little Walter, Willie Dixon, Junior Wells.',
  'Delta Blues':         'Delta Blues DNA: Acoustic Mississippi Delta origin, 1920s-30s. Bottleneck slide on open-tuned guitar, percussive strumming, foot-stomp as bass drum. Single vocal with guitar only — no band. 75-100 BPM. Raw, haunted, spiritual-adjacent. Crossroads mythology. Suno style: "delta blues, acoustic slide guitar, open tuning, foot stomp, single vocal, 85 BPM, haunted, raw". Artists: Robert Johnson, Son House, Charley Patton, Skip James, Mississippi John Hurt, Bukka White.',
  'Texas Blues':         'Texas Blues DNA: Fiery single-note guitar-driven blues. Extended guitar solos are central — the guitar speaks in sentences. Jazz-chord voicings, swing feel, hot tube-amp tone. 100-130 BPM. Suno style: "texas blues, fiery lead guitar, extended solo, swing feel, 115 BPM, SRV, hot tube amp". Artists: Stevie Ray Vaughan, T-Bone Walker, Albert Collins, Lightnin\' Hopkins, Johnny Winter, ZZ Top.',
  'Jump Blues':          'Jump Blues DNA: Uptempo swing blues, proto-R&B. 1940s era. Small horn section (tenor sax lead, trumpet, trombone), boogie-woogie piano, shuffle drums, upright bass. 140-180 BPM. Party-oriented — drinking, dancing, romance. Suno style: "jump blues, boogie piano, horn section, shuffle swing, 160 BPM, Louis Jordan, party blues, proto-R&B". Artists: Louis Jordan, Big Joe Turner, Wynonie Harris, Amos Milburn, Louis Prima.',
  'Soul Blues':          'Soul Blues DNA: Blues lyric and 12-bar bones with 60s-70s soul production. Hammond organ, horn stabs, full rhythm section. Gospel-trained vocal phrasing — melismatic, church-rooted. 75-100 BPM. Suno style: "soul blues, Hammond organ, horn stabs, full rhythm section, melismatic vocal, 90 BPM, BB King style". Artists: B.B. King, Bobby "Blue" Bland, Little Milton, O.V. Wright, Albert King, Z.Z. Hill.',
  // Reggae substyles
  'Roots Reggae':        'Roots Reggae DNA: One-drop drum pattern (kick and snare on beat 3 only), heavy bass-as-melody, offbeat skank guitar on beats 2 and 4, Hammond organ bubble. Rastafarian themes — Jah, Zion, Babylon, repatriation, social justice. 70-85 BPM. Suno style: "roots reggae, one-drop drums, offbeat skank guitar, heavy bass, Hammond bubble, 78 BPM, Rastafarian, spiritual". Artists: Bob Marley, Burning Spear, Black Uhuru, Culture, Steel Pulse, Israel Vibration.',
  'Dancehall':           'Dancehall DNA: Digital riddims, syncopated kick drum patterns (NOT one-drop), toasting and chatting vocal style over rhythmic grooves. 90-110 BPM. Themes: partying, sexuality, swagger, street reality. Patois-heavy vocal delivery. Suno style: "dancehall, digital riddim, syncopated kick, toasting vocal, 100 BPM, patois, Kingston, party". Artists: Shabba Ranks, Sean Paul, Vybz Kartel, Buju Banton, Beenie Man, Spice.',
  'Ska':                 'Ska DNA: Upstroke guitar on beats 2 and 4, walking bass line, brass-section driven (trumpet, trombone, sax). 140-180 BPM. Jamaica 1960s — the predecessor of rocksteady and reggae. Dance-floor-first energy. Suno style: "ska, offbeat upstroke guitar, walking bass, brass section, 160 BPM, Jamaica 60s, danceable, skatalites". Artists: The Skatalites, Prince Buster, Toots and the Maytals, Desmond Dekker, Laurel Aitken.',
  'Rocksteady':          'Rocksteady DNA: 1966-68 bridge between ska and reggae. Slowed ska tempo (80-100 BPM), electric bass becomes central, Hammond organ, tight two-part vocal harmonies. Romantic and reflective lyrics replace ska dance-floor urgency. Suno style: "rocksteady, electric bass forward, Hammond organ, two-part harmony, 90 BPM, romantic, 1967 Jamaica". Artists: Alton Ellis, Ken Boothe, The Heptones, Delroy Wilson, The Paragons.',
  'Dub':                 'Dub DNA: Instrumental remix culture. Studio as instrument — spring reverb, tape echo, drop-outs and fade-ins, bass and drums pushed to the foreground, vocals ghost in and out. 70-85 BPM. Mostly instrumental with sparse vocal fragments. Suno style: "dub reggae, spring reverb, tape echo, foregrounded bass and drums, ghostly vocals, 75 BPM, King Tubby style". Artists: King Tubby, Lee "Scratch" Perry, Scientist, Augustus Pablo, Mad Professor.',
  'Lovers Rock':         'Lovers Rock DNA: UK Jamaican community 1970s-80s. Reggae groove with romantic soul-inflected production. Silky, female-forward vocal tradition, close-harmony backing. Themes: love, devotion, heartbreak — never political. 70-80 BPM. Suno style: "lovers rock, reggae groove, silky female vocal, soul production, close harmony, 75 BPM, romantic, UK reggae". Artists: Gregory Isaacs, Janet Kay, Maxi Priest, Carroll Thompson, Sugar Minott.',
  // K-Pop substyles
  'Girl Group':          'K-Pop Girl Group DNA: Synchronized choreography is the visual pillar — lyrics and structure serve the dance. Concept shifts dramatically track-to-track. Member role archetypes (leader / visual / main vocal / main dancer / maknae). Explosive chorus hook within 30s, mandatory rap break (usually verse 2 second half), vocal bridge. 110-130 BPM. Suno style: "k-pop girl group, polished production, explosive chorus, rap break, vocal bridge, 120 BPM, choreography-ready". Artists: BLACKPINK, TWICE, IVE, NewJeans, LE SSERAFIM, aespa, (G)I-DLE.',
  'Boy Group':           'K-Pop Boy Group DNA: Rap + vocal hybrid with distinct rap-line and vocal-line members. Harder production, more rap verses than girl groups. Multi-genre album concepts — the group shifts sound dramatically between eras. Synchronized choreography central. 110-140 BPM typical. Suno style: "k-pop boy group, rap verses, vocal line harmonies, hard-hitting production, 125 BPM, concept-driven, dance break". Artists: BTS, Stray Kids, SEVENTEEN, EXO, ATEEZ, TXT, NCT.',
  'K-Pop Ballad':        'K-Pop Ballad DNA: Piano-led, strings swelling into final chorus, emotional vocal-range showcase. Korean-language lyric emphasis on emotional vulnerability. Key change before final chorus common. 60-80 BPM. Suno style: "k-pop ballad, piano, sweeping strings, emotional vocal, key change, 72 BPM, Korean ballad, Taeyeon style". Artists: Taeyeon, Baekhyun, IU, Davichi, Ailee, Gummy, Yesung.',
  'Dance Pop':           'K-Pop Dance Pop DNA: EDM-driven, crystal-clear production, drop-style chorus (sometimes instrumental drop replacing sung chorus). Synth maximalism, sidechained bass pump on chorus. 120-140 BPM. Club-ready. Suno style: "k-pop dance pop, EDM production, drop-style chorus, sidechain pump, 128 BPM, crystal clear, club-ready". Artists: BoA, early Girls\' Generation, PSY, f(x), Kara, SHINee.',
  'Dark Concept':        'K-Pop Dark Concept DNA: Minor-key production, horror/gothic/dystopian visual concepts, heavier industrial or orchestral elements. More aggressive vocal delivery, growled or shouted ad-libs. 100-130 BPM. Suno style: "k-pop dark concept, minor key, orchestral and industrial elements, aggressive vocals, 120 BPM, gothic, dystopian, VIXX style". Artists: VIXX, MONSTA X, Dreamcatcher, Pentagon, Everglow, Purple Kiss.',
  'Bubblegum':           'K-Pop Bubblegum DNA: Bright, candy-coated, maximum cuteness. Ultra-saturated synths, upbeat chant-along hooks, high-pitched vocal layering, aegyo vocal tics. Themes: crushes, sweets, cheer. 115-135 BPM. Suno style: "k-pop bubblegum, bright saturated synths, chant-along hook, high vocal layering, 125 BPM, cute, candy-colored". Artists: Orange Caramel, Oh My Girl, Cherry Bullet, Kep1er, early 2NE1 bright tracks, AKMU.',
  'Hip-Hop K-Pop':       'Hip-Hop K-Pop DNA: Korean rap-focused, boom-bap or trap-informed production, less idol-group structured. Independent-artist leanings. Korean/English code-switching bars. 90-130 BPM. Suno style: "korean hip-hop, boom bap or trap production, rap verses, English-Korean code switching, 110 BPM, underground Seoul, Zico style". Artists: Zico, Dean, Beenzino, Epik High, Jay Park, Loco, pH-1.',
  'R&B K-Pop':           'R&B K-Pop DNA: Smooth, groove-led modern R&B with Korean-language vocals. Trap-soul production with Korean vocal phrasing — emotional, melismatic, intimate. 70-100 BPM. Suno style: "korean r&b, trap-soul production, smooth groove, intimate vocal, 85 BPM, Dean style, modern Korean R&B". Artists: Dean, Crush, Jay Park, Heize, DPR LIVE, Zion.T, Jannabi.',
  // Latin substyles
  'Salsa':               'Salsa DNA: Clave-driven (2-3 or 3-2 clave timing is sacred). Piano montuno, timbales, congas, bongos, horn section (trumpets, trombones). 150-200 BPM. Sonero lead vocal improvises soneos (ad-lib calls) over coro (chorus response). Spanish-language. Suno style: "salsa, clave rhythm, piano montuno, timbales congas bongos, horn section, 180 BPM, sonero coro call response, Nuyorican". Artists: Héctor Lavoe, Celia Cruz, Marc Anthony, El Gran Combo, Willie Colón, Rubén Blades.',
  'Bachata':             'Bachata DNA: Dominican origin. Characteristic requinto lead-guitar arpeggios, rhythm guitar, güira scraping steady eighth notes, bongos with paila kick. 4/4 at 120-140 BPM. Romantic and heartbreak themes — amargue (bitterness) is the emotional core. Suno style: "bachata, requinto lead guitar, güira, bongos, 130 BPM, Dominican, romantic amargue, Romeo Santos style". Artists: Juan Luis Guerra, Romeo Santos, Aventura, Prince Royce, Anthony Santos, Frank Reyes.',
  'Cumbia':              'Cumbia DNA: Colombian Caribbean origin, spread across Latin America. Accordion lead, gaita flute, vallenato caja drum, guitar or bass. Syncopated 4/4 with distinctive galloping feel. 90-110 BPM. Themes: love, migration, working-class life. Suno style: "cumbia, accordion lead, gaita flute, vallenato caja drum, syncopated 4/4, 100 BPM, Colombian, danceable". Artists: Carlos Vives, Celso Piña, Los Ángeles Azules, Aniceto Molina, Sonora Dinamita.',
  'Bossa Nova':          'Bossa Nova DNA: Brazilian. Soft nylon-string guitar with signature syncopated bossa pattern, cool-jazz harmonic language (extended chords, quartal voicings), whispered intimate Portuguese vocal delivery. 80-110 BPM. Understatement is the aesthetic. Suno style: "bossa nova, nylon guitar bossa pattern, cool jazz harmony, whispered Portuguese vocal, 95 BPM, Brazilian, understated, Jobim". Artists: João Gilberto, Antônio Carlos Jobim, Stan Getz, Astrud Gilberto, Vinícius de Moraes, Elis Regina.',
  'Latin Pop':           'Latin Pop DNA: Mainstream pop production with Latin percussion (congas, bongos, timbales) layered in. Spanish-language vocal with some English crossover. Radio-ready polish. 100-130 BPM. Themes: love, dance, celebration. Suno style: "latin pop, polished mainstream production, Latin percussion, Spanish vocal, 115 BPM, Shakira style, radio-ready, danceable". Artists: Shakira, Luis Fonsi, Enrique Iglesias, Ricky Martin, Thalía, Paulina Rubio, Camila Cabello.',
  'Latin Jazz':          'Latin Jazz DNA: Jazz harmony and improvisation over Afro-Cuban rhythms — mambo, cha-cha, bolero, guaguancó. Piano, upright bass, horn section, full percussion battery (timbales, congas, bongos). 130-200 BPM. Suno style: "latin jazz, Afro-Cuban rhythms, jazz harmony, piano, horn section, full percussion, 160 BPM, mambo cha-cha, Tito Puente". Artists: Tito Puente, Poncho Sanchez, Paquito D\'Rivera, Eddie Palmieri, Arturo Sandoval, Irakere.',
  'Mariachi':            'Mariachi DNA: Mexican traditional. Violins (2+), trumpets (2), vihuela, guitarrón (huge round-back bass guitar), guitar. Rancheras (duple- or triple-meter country songs) and boleros. 90-140 BPM. Themes: love, heartbreak, pride, Mexico, family. Suno style: "mariachi, violins trumpets, vihuela, guitarrón, acoustic guitar, 110 BPM, ranchera bolero, Mexican, Vicente Fernandez style". Artists: Vicente Fernández, Pedro Infante, Alejandro Fernández, Javier Solís, Antonio Aguilar, Linda Ronstadt.',
  // Reggaeton substyles
  'Perreo Clásico':      'Perreo Clásico DNA: Early-2000s Puerto Rican reggaeton. Pure dembow riddim (derived from Shabba Ranks\' Dem Bow). Boom-ch-boom-chick kick/snare pattern at 90-95 BPM. Explicit dance-floor focus — perreo (grinding) is the point. Synth stabs, simple hooks, Spanish street vocabulary. Suno style: "perreo clasico, dembow riddim, 93 BPM, Puerto Rico 2000s, synth stabs, perreo dance floor, Daddy Yankee style". Artists: Daddy Yankee, Don Omar, Tego Calderón, Wisin & Yandel, Ivy Queen, Hector El Father.',
  'Trap Latino':         'Trap Latino DNA: Trap 808s + reggaeton dembow hybrid. 85-105 BPM. Melancholic or aggressive tone, heavy auto-tune, triplet hi-hats, dark minor-key pads. Lyrics: heartbreak, street life, paranoia, flex. Suno style: "trap latino, trap 808s, dembow hybrid, auto-tune, triplet hi-hats, 95 BPM, dark minor pads, Bad Bunny style". Artists: Bad Bunny, Anuel AA, Ozuna, Bryant Myers, Arcángel, Noriel.',
  'Reggaeton Romántico': 'Reggaeton Romántico DNA: Softer reggaeton production, romantic thematic focus, melodic sung hooks over dembow. Less street aggression — more heart-on-sleeve. 90-100 BPM. Guitar or piano often layered atop the riddim. Suno style: "reggaeton romantico, softer dembow, melodic sung hook, acoustic guitar layer, 95 BPM, romantic, Nicky Jam style". Artists: Prince Royce (reggaeton tracks), Nicky Jam (romantic era), Farruko (softer tracks), Ken-Y, RKM & Ken-Y, Tito El Bambino.',
  'Urbano Latino':       'Urbano Latino DNA: Modern catch-all — reggaeton + Latin pop + afrobeats + R&B cross-pollination. 90-105 BPM. Cleaner pop production, English/Spanish code-switching, global collab-friendly. Suno style: "urbano latino, modern polished production, dembow meets pop and afrobeats, bilingual, 98 BPM, J Balvin style, global crossover". Artists: J Balvin, Maluma, Karol G, Rauw Alejandro, Myke Towers, Sech.',
  'Dembow Puro':         'Dembow Puro DNA: Dominican dembow — faster, harder, more frenetic than Puerto Rican reggaeton. 110-130 BPM. Raw digital production, explicit and party-focused, rapid-fire patois-tinged Spanish delivery. Suno style: "dembow dominicano, faster harder dembow, 120 BPM, raw digital production, rapid fire Spanish, party frenetic, El Alfa style". Artists: El Alfa, Rochy RD, Tokischa, Yaisel LM, Bulin 47, Chimbala.',
  'Reggaeton Pop':       'Reggaeton Pop DNA: Reggaeton dembow softened for crossover — radio-ready, Spotify-optimized. Sung melodic hooks, pop songwriting structure, streamlined production. 90-105 BPM. English-Spanish collabs common. Suno style: "reggaeton pop, softened dembow, sung pop hook, polished, 98 BPM, Despacito style, crossover, radio ready". Artists: Luis Fonsi, Karol G (pop tracks), Shakira (reggaeton crossovers), CNCO, Nicky Jam (pop era).',
};

const SUBSTYLE_SUNO = {
  'G-Funk':             'g-funk, moog synth whine, west coast hip-hop, slow rolling 808, 95 BPM, smooth melodic hook',
  'Bay Area':           'bay area hip-hop, hyphy, trunk music, 808 bass, hi-energy, Oakland rap, 100 BPM',
  'Down South':         'dirty south, slow rolling 808 bass, southern rap, deep drawl, 85 BPM',
  'Crunk':              'crunk, distorted synth stabs, 808 bass, 145 BPM, club energy, screamed call and response',
  'Chopped & Screwed':  'chopped and screwed, slowed houston rap, syrupy 65 BPM, pitch-lowered baritone, deep 808',
  'Trap':               'trap, 808 bass, hard snare, rolling hi-hats, 140 BPM, dark atmospheric',
  'Boom Bap':           'boom bap, vinyl crackle, jazz sample, hard kick, 90 BPM, new york classic',
  'Melodic Rap':        'melodic rap, lush atmospheric production, auto-tune vocals, 120 BPM, emotional',
  'Drill':              'uk drill, sliding 808 bass, off-beat hi-hats, dark minimal production, 140 BPM, menacing',
  'East Coast':         'east coast hip-hop, boom bap, jazz sample, vinyl crackle, 90 BPM, new york lyrical',
  'Midwest':            'midwest rap, chipmunk soul sample, chicago hip-hop, 95 BPM, emotional vulnerability',
  'Cloud Rap':          'cloud rap, ethereal haze, lo-fi drum machine, deep reverb, atmospheric synth pads, 80 BPM',
  // Country
  'Outlaw Country':     'outlaw country, acoustic guitar, raw telecaster, honky-tonk, rebel attitude, 95 BPM, minimal production, twang',
  'Bakersfield':        'bakersfield country, fender telecaster, shuffle rhythm, california honky-tonk, 100 BPM, bright twang',
  'Nashville Pop':      'country pop, polished production, electric guitar, pedal steel, 120 BPM, radio-ready, modern country, anthemic',
  'Americana':          'americana, acoustic guitar, upright bass, subtle pedal steel, warm, honest, 85 BPM, literary, adult album',
  'Bluegrass':          'bluegrass, banjo, mandolin, fiddle, upright bass, no drums, tight three-part harmony, 140 BPM, Appalachian',
  'Bro-Country':        'bro-country, electric guitar, 115 BPM, party energy, summer, modern country, stadium singalong, upbeat',
  'Alt-Country':        'alt-country, acoustic guitar, indie-inflected, honest, 90 BPM, defiant, warm, genre-fluid',
  'Texas / Red Dirt':   'texas country, red dirt, acoustic guitar, warm, honest, 100 BPM, road song, Lone Star, organic band',
  'Classic Honky-Tonk': 'classic honky-tonk, pedal steel guitar, fiddle, shuffle beat, 105 BPM, heartbreak, bar room, Hank Williams style',
  'Country Gospel':     'country gospel, acoustic guitar, pedal steel, warm vocal harmony, 85 BPM, hymn, faith, southern testimony',
  'Country Rap':        'country rap, 808 bass, banjo, trap hi-hats, country twang, genre fusion, 120 BPM, storytelling, authentic, country trap',
  'Country Blues':      'country blues, heavy blues guitar, raw tube amp, southern soul, powerful vocals, live band, 85 BPM, Chris Stapleton style, emotional, Americana, guitar bends',
  // Neo-Soul
  'Classic Neo-Soul':   'neo-soul, Rhodes electric piano, live drums with swing, upright bass, warm vinyl warmth, head-nod groove, 90 BPM',
  'Hip-Hop Neo-Soul':   'neo-soul, J Dilla off-beat hip-hop drums, soul vocals, vinyl warmth, 85 BPM',
  'Neo-Soul Ballad':    'neo-soul ballad, piano, intimate close-mic vocal, vulnerable, warm, 70 BPM',
  'Afro-Soul':          'afro-soul, talking drum, Rhodes, warm, 95 BPM, Lagos spiritual, Afrobeats groove underneath neo-soul',
  'Jazz-Soul':          'jazz-soul, jazz harmony, upright bass, Rhodes electric piano, live drums, horn section, 95 BPM, Glasper style',
  'Lo-Fi Soul':         'lo-fi soul, vinyl crackle, dusty drums, muffled warmth, 80 BPM, bedroom production, introspective chopped soul',
  'Psychedelic Soul':   'psychedelic soul, funky bass, cosmic reverb, layered textures, 95 BPM, Sly Stone, Voodoo era D\'Angelo',
  'Gospel Soul':        'gospel soul, Hammond B3, mass choir, testimonial, call and response, 85 BPM, PJ Morton style',
  'Traditional Gospel': 'traditional gospel, Hammond B3 organ, mass choir, hand claps, call and response, powerful soul',
  'Contemporary Gospel':'contemporary gospel, Kirk Franklin style, 808 bass, mass choir, celebratory, hip-hop gospel production',
  'Worship / CCM':      'worship music, piano, electric guitar, congregational singalong, soaring emotional, 75 BPM',
  'Southern Gospel':    'southern gospel, acoustic quartet harmonies, banjo or acoustic guitar, country-gospel, 95 BPM, warm testimony',
  'Gospel Hip-Hop':     'gospel hip-hop, trap beat, 808 bass, conscious faith lyrics, 130 BPM, Lecrae style, street testimony',
  'Gospel Ballad':      'gospel ballad, piano, intimate testimony vocal, choir swells on final chorus, 65 BPM, Yolanda Adams style',
  'Praise & Worship':   'praise and worship, congregational, extended vamp, declaration lyrics, 80 BPM, Maverick City style',
  'Mass Choir':         'mass choir gospel, 40+ voices SATB stacked, Hammond B3, lead vocalist call response, 95 BPM, Hezekiah Walker style',
  // Alt-Rock
  'Shoegaze':           'shoegaze, wall of reverb guitars, chorus pedal, buried dreamy vocals, 100 BPM, hazy textures, atmospheric',
  'Post-Punk':          'post-punk, driving melodic bass, angular guitars, tight mechanical drums, 130 BPM, cold detached vocals',
  'Grunge':             'grunge, distorted guitars, sludgy power chords, quiet loud dynamics, 100 BPM, raw Seattle production',
  'Indie Rock':         'indie rock, jangly guitars, live band, 125 BPM, melodic bass, conversational vocals, warm',
  'Lo-Fi':              'lo-fi indie, tape hiss, bedroom recording, fuzzy guitars, intimate close-mic vocals, 95 BPM, imperfect warmth',
  'Art Rock':           'art rock, experimental, layered textures, unusual time signature, 110 BPM, conceptual, cinematic',
  'Emo':                'emo, twinkly clean guitars, distorted chorus, 140 BPM, confessional vocals, voice cracks, midwest emo',
  'Math Rock':          'math rock, odd time signature, tapped guitar, interlocking polyrhythm, 140 BPM, angular, technical, often instrumental',
  // Punk — Post-Punk reused from Alt-Rock section
  'Classic Punk':       'classic punk, three-chord power chords, straight eighths, shouted vocals, 180 BPM, raw live production, CBGB',
  'Pop-Punk':           'pop-punk, distorted power chords, sung melodic vocals, 165 BPM, gang vocal chorus, energetic, Warped Tour',
  'Hardcore':           'hardcore punk, blast beats, shouted group vocals, 220 BPM, mosh breakdown, compressed, aggressive',
  'Ska-Punk':           'ska-punk, offbeat upstroke guitar, horn section, 150 BPM, ska verse punk chorus, energetic, Orange County',
  'Anti-Folk':          'anti-folk, acoustic guitar, lo-fi home recording, deadpan vocals, 110 BPM, unfinished feel, DIY, confessional absurdist',
  // Blues
  'Chicago Blues':      'chicago blues, electric slide guitar, blues harp, shuffle beat, 100 BPM, Chess Records, Muddy Waters style',
  'Delta Blues':        'delta blues, acoustic slide guitar, open tuning, foot stomp, single vocal, 85 BPM, haunted, raw',
  'Texas Blues':        'texas blues, fiery lead guitar, extended solo, swing feel, 115 BPM, SRV, hot tube amp',
  'Jump Blues':         'jump blues, boogie piano, horn section, shuffle swing, 160 BPM, Louis Jordan, party blues, proto-R&B',
  'Soul Blues':         'soul blues, Hammond organ, horn stabs, full rhythm section, melismatic vocal, 90 BPM, BB King style',
  // Reggae
  'Roots Reggae':       'roots reggae, one-drop drums, offbeat skank guitar, heavy bass, Hammond bubble, 78 BPM, Rastafarian, spiritual',
  'Dancehall':          'dancehall, digital riddim, syncopated kick, toasting vocal, 100 BPM, patois, Kingston, party',
  'Ska':                'ska, offbeat upstroke guitar, walking bass, brass section, 160 BPM, Jamaica 60s, danceable',
  'Rocksteady':         'rocksteady, electric bass forward, Hammond organ, two-part harmony, 90 BPM, romantic, 1967 Jamaica',
  'Dub':                'dub reggae, spring reverb, tape echo, foregrounded bass and drums, ghostly vocals, 75 BPM, King Tubby style',
  'Lovers Rock':        'lovers rock, reggae groove, silky female vocal, soul production, close harmony, 75 BPM, romantic, UK reggae',
  // K-Pop
  'Girl Group':         'k-pop girl group, polished production, explosive chorus, rap break, vocal bridge, 120 BPM, choreography-ready',
  'Boy Group':          'k-pop boy group, rap verses, vocal line harmonies, hard-hitting production, 125 BPM, concept-driven, dance break',
  'K-Pop Ballad':       'k-pop ballad, piano, sweeping strings, emotional vocal, key change, 72 BPM, Korean ballad, Taeyeon style',
  'Dance Pop':          'k-pop dance pop, EDM production, drop-style chorus, sidechain pump, 128 BPM, crystal clear, club-ready',
  'Dark Concept':       'k-pop dark concept, minor key, orchestral and industrial elements, aggressive vocals, 120 BPM, gothic, dystopian',
  'Bubblegum':          'k-pop bubblegum, bright saturated synths, chant-along hook, high vocal layering, 125 BPM, cute, candy-colored',
  'Hip-Hop K-Pop':      'korean hip-hop, boom bap or trap production, rap verses, English-Korean code switching, 110 BPM, underground Seoul',
  'R&B K-Pop':          'korean r&b, trap-soul production, smooth groove, intimate vocal, 85 BPM, Dean style, modern Korean R&B',
  // Latin
  'Salsa':              'salsa, clave rhythm, piano montuno, timbales congas bongos, horn section, 180 BPM, sonero coro, Nuyorican',
  'Bachata':            'bachata, requinto lead guitar, güira, bongos, 130 BPM, Dominican, romantic amargue, Romeo Santos style',
  'Cumbia':             'cumbia, accordion lead, gaita flute, vallenato caja drum, syncopated 4/4, 100 BPM, Colombian, danceable',
  'Bossa Nova':         'bossa nova, nylon guitar bossa pattern, cool jazz harmony, whispered Portuguese vocal, 95 BPM, Brazilian, understated',
  'Latin Pop':          'latin pop, polished mainstream production, Latin percussion, Spanish vocal, 115 BPM, Shakira style, radio-ready',
  'Latin Jazz':         'latin jazz, Afro-Cuban rhythms, jazz harmony, piano, horn section, full percussion, 160 BPM, mambo cha-cha',
  'Mariachi':           'mariachi, violins trumpets, vihuela, guitarrón, acoustic guitar, 110 BPM, ranchera bolero, Mexican',
  // Reggaeton
  'Perreo Clásico':     'perreo clasico, dembow riddim, 93 BPM, Puerto Rico 2000s, synth stabs, perreo dance floor, Daddy Yankee style',
  'Trap Latino':        'trap latino, trap 808s, dembow hybrid, auto-tune, triplet hi-hats, 95 BPM, dark minor pads, Bad Bunny style',
  'Reggaeton Romántico':'reggaeton romantico, softer dembow, melodic sung hook, acoustic guitar layer, 95 BPM, romantic, Nicky Jam style',
  'Urbano Latino':      'urbano latino, modern polished production, dembow meets pop and afrobeats, bilingual, 98 BPM, J Balvin style',
  'Dembow Puro':        'dembow dominicano, faster harder dembow, 120 BPM, raw digital production, rapid fire Spanish, El Alfa style',
  'Reggaeton Pop':      'reggaeton pop, softened dembow, sung pop hook, polished, 98 BPM, Despacito style, crossover, radio ready',
  // Children
  'Singalong / Playful':    'children singalong, ukulele, clapping, bright, joyful, 110 BPM, playful, motion cues',
  'Educational':            'educational children song, acoustic guitar, glockenspiel, clear vocals, 105 BPM, friendly, warm',
  'Lullaby / Bedtime':      'lullaby, soft acoustic guitar, gentle, 60 BPM, warm soothing, hushed vocals, night, stars',
  'Adventure Story':        'children adventure song, cinematic, orchestral children music, 110 BPM, warm, imaginative, journey',
  'Silly / Nonsense':       'silly children song, bouncy, 115 BPM, playful, bright, ukulele, absurd fun',
  'Nature & Animals':       'children nature song, bright ukulele, onomatopoeia sounds, 115 BPM, animal noises, warm acoustic',
  'Friendship & Kindness':  'children kindness song, warm acoustic guitar, gentle singable chorus, 105 BPM, social emotional',
  'Holiday / Seasonal':     'children holiday song, seasonal imagery, sleigh bells, 110 BPM, warm festive, family-friendly',
};

// ─────────────────────────────────────────────────────────────────────────────
// LYRIC CRAFT TOOLKIT — universal techniques, genre-filtered per song.
// Each technique has a short-form instruction used in the live prompt.
// buildLyricCraftNote(genre) selects and formats the relevant set.
// applicable. buildLyricCraftNote(genre) selects and formats the relevant set.
// ─────────────────────────────────────────────────────────────────────────────
const LYRIC_CRAFT_UNIVERSAL = {

  // ── FIGURATIVE LANGUAGE ────────────────────────────────────────────────────
  simile: {
    label: 'SIMILE',
    short: `"X is LIKE Y" or "X is AS [adj] AS Y" — the comparison must be EARNED and non-obvious. Weak: "beautiful like a rose." Strong: "quiet like a house with no furniture in it." The vehicle must reveal something NEW about the subject.`,
    genres: 'all'
  },

  metaphor: {
    label: 'METAPHOR',
    short: `Direct substitution — no "like/as." "You ARE the storm." Must be earned — no generic imagery. Use the genre's home vocabulary (blues=crossroads/river, country=road/fire, gospel=light/shepherd, hip-hop=game/throne/block) OR introduce one fresh metaphor per song, never both.`,
    genres: 'all'
  },

  extendedMetaphor: {
    label: 'EXTENDED METAPHOR',
    short: `One metaphor sustained for the full verse or whole song. Commit completely — every line deepens the same image without drifting. A storm song stays in weather language start to finish. Abandoning the metaphor mid-verse signals a weak writer.`,
    genres: ['folk','country','blues','gospel','neosoul','altrock','rnb','pop','tvmusical','jazz']
  },

  // ── DOUBLE / TRIPLE ENTENDRE ───────────────────────────────────────────────
  doubleEntendre: {
    label: 'DOUBLE ENTENDRE',
    short: `One line, two complete simultaneous meanings — surface and deeper (suggestive, political, or subversive). Both readings must work perfectly from the SAME words. The listener who catches the second is rewarded; the listener who doesn't still enjoys the surface. Blues invented this. Apply freely to: country, R&B, reggae, pop.`,
    genres: ['hiphop','blues','rnb','reggae','country','pop','jazz','neosoul','rock','altrock']
  },

  tripleEntendre: {
    label: 'TRIPLE ENTENDRE',
    short: `Three simultaneous readings: (1) obvious surface, (2) deeper meaning, (3) self-referential or meta-political layer. Use once per song maximum at the most important line. Do not announce it — let the listener discover it.`,
    genres: ['hiphop','rnb','pop','blues','country']
  },

  // ── SONIC DEVICES ──────────────────────────────────────────────────────────
  alliteration: {
    label: 'ALLITERATION',
    short: `Same consonant SOUND on consecutive stressed syllables ("phone" and "find" alliterate). Max 2-3 pairs per verse — overuse kills momentum. Best placement: hook key phrase, verse opening line, punchline bar.`,
    genres: 'all'
  },

  assonance: {
    label: 'ASSONANCE',
    short: `Matching VOWEL sounds within or across lines — the invisible rhyme listeners feel but don't consciously identify. Holds lines together subliminally when end-rhyme would feel forced. Essential in folk, Americana, alternative, and any style prioritising natural speech.`,
    genres: 'all'
  },

  consonance: {
    label: 'CONSONANCE',
    short: `Matching CONSONANT sounds at any word position. Hard consonants (K,T,D,G,P,B) create punch and aggression; soft consonants (S,F,SH,L,M,N) create smoothness and intimacy. Match the sonic texture of words to the emotional texture of the meaning.`,
    genres: 'all'
  },

  // ── STRUCTURAL CRAFT ───────────────────────────────────────────────────────
  setupPunchline: {
    label: 'SETUP / PUNCHLINE',
    short: `Setup establishes an expectation; punchline fulfills it unexpectedly in ONE line. Blues: 2-line situation + 1-line twist. Hip-hop: bars 1-15 build the premise, bar 16 detonates it. Country: full verse builds toward a final line that recontextualises everything before it. Rule: inevitable in retrospect, surprising in the moment.`,
    genres: ['hiphop','blues','country','folk','comedy','parody','rnb','jazz','reggae','pop','rock','altrock']
  },

  misdirection: {
    label: 'MISDIRECTION / TWIST',
    short: `Lead the listener confidently down one interpretation; final word or line pivots completely. Setup language must support BOTH readings — the listener fills in the expected meaning, then the final word flips it. Unexpected reading must be supported by every prior word in retrospect.`,
    genres: ['country','folk','blues','comedy','parody','pop','hiphop','rnb','altrock','rock','jazz']
  },

  callback: {
    label: 'CALLBACK / BOOKEND',
    short: `Open with a specific image, phrase, or line. Return the IDENTICAL words at song's end — but accumulated experience transforms what they mean. The ending reframes the beginning. One of the most emotionally powerful tools in songwriting. Works in every genre.`,
    genres: 'all'
  },

  ruleOfThrees: {
    label: 'RULE OF THREES',
    short: `Two expected items, one unexpected. Brain anticipates the pattern completion — the subverted third delivers the surprise. "[Expected], [expected], [subversion]." First two must genuinely establish the pattern or the third won't land. Works in every genre.`,
    genres: 'all'
  },

  anaphora: {
    label: 'ANAPHORA',
    short: `Same word or phrase opens consecutive lines — cumulative rhetorical power. Each repeat adds weight; the final line must be the most powerful. Limit 3-5 repetitions. Use in gospel declarations, folk protest, hip-hop verse-builds, pop bridge climaxes, R&B vamps.`,
    genres: ['gospel','folk','hiphop','pop','country','rnb','neosoul','blues','rock','altrock']
  },

  epistrophe: {
    label: 'EPISTROPHE',
    short: `Same word or phrase ENDS consecutive lines — echo and accumulation. The repeated word must be the most emotionally loaded word in the argument. Inverse of anaphora: creates resolution rather than momentum. Powerful in gospel outros, rap hooks, folk refrains.`,
    genres: ['gospel','hiphop','folk','rnb','country','neosoul','pop','blues']
  },

  // ── HIP-HOP / RAP CRAFT ────────────────────────────────────────────────────
  multisyllabicScheme: {
    label: 'MULTISYLLABIC (MULTI) SCHEME',
    short: `Chain 3-5 syllable rhyming clusters across 4-8 bars — not "day/way" but "breaking away / taking the stage / making them pay." Pick a 3-syllable sound cluster; every line's LAST 3 syllables must match it. Must feel natural — filler words to complete the rhyme destroy credibility instantly.`,
    genres: ['hiphop','reggaeton','kpop','pop']
  },

  schemeExtension: {
    label: 'SCHEME EXTENSION',
    short: `Extend an established rhyme scheme 2-4 bars past where the listener expects it to end. Feels like bonus craft — unexpected technical generosity. The extension must maintain scheme quality; a weak extension is worse than ending on time.`,
    genres: ['hiphop','reggaeton','kpop']
  },

  nameFlip: {
    label: 'NAME FLIP / WORD FLIP',
    short: `Use a word (name, brand, place, phrase) where its literal meaning AND a secondary meaning are simultaneously active. The secondary meaning must be genuinely in the language — not invented for the rhyme. The listener's silent "oh — I see it" is the payoff.`,
    genres: ['hiphop','blues','country','comedy','parody','pop','rnb']
  },

  wordplayTaxonomy: {
    label: 'WORDPLAY FORMS',
    short: `Four types: (1) HOMOPHONE — same sound, different word ("reign/rain/rein"); (2) HOMONYM — same word, two meanings ("bat"); (3) PORTMANTEAU — two words fused into one; (4) ACRONYM FLIP — word also reads as meaningful acronym. Rule: must reward the listener without requiring explanation. If it needs a footnote, it failed.`,
    genres: ['hiphop','pop','comedy','parody','country','blues','rnb','altrock']
  },

  battleRapCraft: {
    label: 'BATTLE RAP CRAFT',
    short: `Every bar must damage a target. Six laws: (1) PERSONAL — specific and true, not generic insults; (2) REBUTTAL — flip the opponent's own words against them; (3) SCHEME CHAIN — commit to a multi for 4-8 bars, never break it mid-round; (4) THE ANGLE — one conceptual lane per round, stay in it; (5) CROWD MOMENT — one "oh shit" bar engineered per round; (6) CONSISTENCY — every bar supports the angle, no off-topic bars.`,
    genres: ['hiphop']
  }
};

// Returns a compact lyric craft instruction block for a given genre.
// Uses short-form instructions to stay within prompt size budget (~2000 chars max).
function buildLyricCraftNote(genre) {
  const applicable = Object.values(LYRIC_CRAFT_UNIVERSAL).filter(t =>
    t.genres === 'all' || (Array.isArray(t.genres) && t.genres.includes(genre))
  );
  if (!applicable.length) return '';

  const lines = applicable.map(t => `• ${t.label}: ${t.short}`).join('\n');
  return `\n\nLYRIC CRAFT TOOLKIT — use these where they serve the song, never forced:\n${lines}`;
}

const STRUCTURES={
  // ── General ──────────────────────────────────────────────────────────────
  standard:     '[Verse 1] → [Pre-Chorus] → [Chorus] → [Verse 2] → [Pre-Chorus] → [Chorus] → [Bridge] → [Chorus] → [Outro]',
  hookfirst:    '[Hook] → [Verse 1] → [Hook] → [Verse 2] → [Bridge] → [Hook] → [Outro]',
  chorusfirst:  '[Chorus] → [Verse 1] → [Pre-Chorus] → [Chorus] → [Verse 2] → [Pre-Chorus] → [Chorus] → [Bridge] → [Final Chorus]',
  storytelling: '[Intro] → [Verse 1] → [Chorus] → [Verse 2] → [Chorus] → [Verse 3] → [Chorus] → [Outro]',
  minimal:      '[Intro] → [Verse] → [Hook] → [Verse] → [Hook] → [Hook] → [Outro]',
  epic:         '[Intro] → [Verse 1] → [Pre-Chorus] → [Chorus] → [Verse 2] → [Pre-Chorus] → [Chorus] → [Bridge] → [Break] → [Chorus] → [Outro]',
  doublechorus: '[Verse 1] → [Pre-Chorus] → [Chorus] → [Chorus] → [Verse 2] → [Pre-Chorus] → [Chorus] → [Chorus] → [Bridge] → [Final Chorus] → [Final Chorus]',
  verseonly:    '[Intro] → [Verse 1] → [Verse 2] → [Verse 3] → [Verse 4] → [Outro]',
  aaba:         '[A Section] → [A Section] → [B Bridge] → [A Section]',
  ballad:       '[Intro] → [Verse 1] → [Chorus] → [Verse 2] → [Chorus] → [Breakdown] → [Key Change] → [Final Chorus]',
  edm:          '[Intro] → [Build] → [Drop] → [Breakdown] → [Build] → [Drop] → [Outro]',
  viral:        '[Hook (0:00)] → [Verse] → [Pre-Chorus] → [Hook] → [Bridge] → [Final Hook]',
  // ── Genre-specific ───────────────────────────────────────────────────────
  hiphop_classic:      '[4-bar Intro | Beat Only] → [16-bar Verse 1 | Rap Verse] → [8-bar Hook] → [16-bar Verse 2 | Rap Verse] → [8-bar Hook] → [16-bar Verse 3 | Rap Verse] → [8-bar Hook] → [4-bar Outro]',
  hiphop_trap:         '[4-bar Intro | Beat Only] → [8-bar Hook] → [12-bar Verse 1 | Rap Verse] → [8-bar Hook] → [12-bar Verse 2 | Rap Verse] → [8-bar Hook] → [8-bar Hook] → [4-bar Outro | Ad-libs]',
  hiphop_beatswitch:   '[4-bar Intro | Beat Only] → [8-bar Hook] → [16-bar Verse 1 | Rap Verse] → [8-bar Hook] → [16-bar Verse 2 | Rap Verse] → [Beat Switch] → [16-bar Verse 3 | Triplet Flow] → [8-bar Final Hook] → [Outro | Fade-Out]',
  hiphop_storytelling: '[8-bar Intro | Spoken Word] → [24-bar Verse 1 | Rap Verse] → [24-bar Verse 2 | Rap Verse] → [24-bar Verse 3 | Rap Verse] → [8-bar Outro]',
  hiphop_melodic:      '[4-bar Intro] → [8-bar Hook | Melodic | Sung] → [16-bar Verse 1 | Rap Verse] → [8-bar Hook | Sung] → [16-bar Verse 2 | Rap Verse] → [8-bar Bridge | Sung] → [8-bar Final Hook | Sung | stacked harmonies] → [Outro | Fade-Out]',
  riddim:       '[Intro] → [Verse 1] → [Hook] → [Verse 2] → [Hook] → [Dub Break] → [Verse 3] → [Hook] → [Outro Vamp]',
  afrobeats:    '[Intro] → [Verse 1] → [Hook] → [Verse 2] → [Hook] → [Ad-lib Break] → [Hook] → [Outro Vamp]',
  gospel:       '[Verse 1] → [Chorus] → [Verse 2] → [Chorus] → [Bridge] → [Vamp] → [Outro Ad-lib]',
  kpop:         '[Intro] → [Verse 1] → [Pre-Chorus] → [Chorus] → [Verse 2] → [Pre-Chorus] → [Chorus] → [Rap Break] → [Bridge] → [Key Change +1] → [Final Chorus] → [Outro]',
};

const FUSION_DATA={
  'Pop+Hip-Hop':{name:'Pop-Rap',tip:'Never rap the chorus. Contrast between rapped verse and sung hook IS the formula.',q:{overall:95,compat:95,structural:90,commercial:96}},
  'Pop+R&B':{name:'Neo-Soul Pop',tip:'Add ad-libs under chorus and melismatic bridge.',q:{overall:93,compat:92,structural:88,commercial:94}},
  'Pop+Rock':{name:'Arena Pop',tip:'Guitar solo as bridge. Keep verse pop, let chorus explode.',q:{overall:90,compat:88,structural:85,commercial:92}},
  'Pop+Country':{name:'Country Pop',tip:'Story matters as much as hook. 2nd verse must deepen, not repeat.',q:{overall:91,compat:89,structural:86,commercial:93}},
  'Pop+EDM':{name:'Dance Pop',tip:'Drop should remove all verse instruments — create empty space before the hit.',q:{overall:94,compat:93,structural:92,commercial:95}},
  'Pop+Alt-Rock':{name:'Alternative Pop',tip:'Minimal production in verse, maximalist bass on chorus.',q:{overall:92,compat:90,structural:88,commercial:93}},
  'Pop+Reggae':{name:'Reggae Pop',tip:'Keep the offbeat skank — it is the genre identifier. Everything else can flex.',q:{overall:85,compat:82,structural:80,commercial:88}},
  'Pop+Afrobeats':{name:'Afropop Crossover',tip:'The groove IS the hook. Repeat more than feels comfortable.',q:{overall:93,compat:91,structural:89,commercial:94}},
  'Pop+Singer-Songwriter':{name:'Confessional Pop',tip:'Let the lyric carry weight. Keep production intimate even on chorus.',q:{overall:89,compat:87,structural:84,commercial:90}},
  'Hip-Hop+R&B':{name:'Melodic Rap',tip:'Hook must feel completely different from verse — contrast is the entire point.',q:{overall:97,compat:97,structural:95,commercial:97}},
  'Hip-Hop+Rock':{name:'Rap-Rock',tip:'Verse should feel aggressive even before chorus. Staccato flow works best.',q:{overall:82,compat:78,structural:80,commercial:83}},
  'Hip-Hop+Country':{name:'Country Trap',tip:'The cultural tension IS the appeal. Lean into the seams.',q:{overall:80,compat:72,structural:75,commercial:88}},
  'Hip-Hop+Reggae':{name:'Reggae Rap',tip:'Decide: roots one-drop (spiritual) or dancehall riddim (modern energy).',q:{overall:84,compat:82,structural:80,commercial:82}},
  'Hip-Hop+Singer-Songwriter':{name:'Folk Rap',tip:'Lyric has to be elite to hold attention without a big production hook.',q:{overall:86,compat:80,structural:82,commercial:82}},
  'Hip-Hop+Blues':{name:'Blues Rap',tip:'AAB lyric form maps directly to rap bar structure.',q:{overall:82,compat:78,structural:82,commercial:78}},
  'Hip-Hop+Alt-Rock':{name:'Alt Hip-Hop',tip:'Production is the art — be as adventurous with the beat as with the bars.',q:{overall:85,compat:80,structural:82,commercial:80}},
  'R&B+Rock':{name:'Soul-Rock',tip:'Live drum feel essential. Guitar should respond to vocalist conversationally.',q:{overall:84,compat:82,structural:80,commercial:82}},
  'R&B+Reggae':{name:'Lovers Rock',tip:'Lovers rock is the gentlest reggae — no politics, pure romance.',q:{overall:80,compat:80,structural:78,commercial:78}},
  'R&B+Singer-Songwriter':{name:'Neo-Soul',tip:'Let silence be an instrument. Neo-soul breathes — never fill every space.',q:{overall:86,compat:84,structural:82,commercial:80}},
  'R&B+Blues':{name:'Soul-Blues',tip:'Go for emotional nakedness above polish. This IS the origin of soul.',q:{overall:88,compat:88,structural:84,commercial:82}},
  'R&B+Afrobeats':{name:'Afro-R&B',tip:'Let the groove dictate vocal phrasing — never fight the rhythm.',q:{overall:90,compat:89,structural:86,commercial:90}},
  'Rock+Singer-Songwriter':{name:'Confessional Rock',tip:'The guitar solo should feel like a confession, not a display.',q:{overall:84,compat:82,structural:80,commercial:83}},
  'Rock+Reggae':{name:'Reggae Rock',tip:'Sublime formula: ska/reggae feel + punk directness + melodic chorus.',q:{overall:82,compat:78,structural:76,commercial:82}},
  'Rock+Blues':{name:'Blues-Rock',tip:'The guitar solo is a verse here, not decoration — write it as a narrative.',q:{overall:90,compat:92,structural:88,commercial:86}},
  'Rock+Punk':{name:'Pop-Punk',tip:'Sweet spot: melodic enough for radio, fast enough for mosh pit.',q:{overall:86,compat:84,structural:82,commercial:88}},
  'Rock+Alt-Rock':{name:'Post-Rock',tip:'Build for 4-6 minutes. The payoff must be worth the journey.',q:{overall:84,compat:88,structural:80,commercial:76}},
  'Country+Singer-Songwriter':{name:'Americana',tip:'Americana prizes authenticity. Let uncomfortable truths stay uncomfortable.',q:{overall:88,compat:90,structural:85,commercial:82}},
  'Country+Blues':{name:'Country Blues',tip:'This IS the origin of country music. Strip back to voice and guitar.',q:{overall:86,compat:88,structural:84,commercial:80}},
  'Singer-Songwriter+Alt-Rock':{name:'Indie Folk',tip:'Bon Iver: falsetto + layered instruments + cryptic lyric = cult classic.',q:{overall:88,compat:86,structural:84,commercial:80}},
  'Singer-Songwriter+Reggae':{name:'Acoustic Reggae',tip:'Jack Johnson sits exactly here. Warm, organic, unhurried.',q:{overall:80,compat:78,structural:76,commercial:80}},
  'Singer-Songwriter+Blues':{name:'Delta Soul',tip:'Nick Drake lives here. Fingerpicked guitar, no drums, vocal in the room.',q:{overall:82,compat:84,structural:80,commercial:74}},
  'Alt-Rock+Blues':{name:'Indie Blues',tip:'Jack White: 2 instruments max, maximum emotion from minimum tools.',q:{overall:88,compat:86,structural:84,commercial:82}},
  'Alt-Rock+Punk':{name:'Post-Punk',tip:'Joy Division: slow punk + bass as lead + desperation = most influential post-punk.',q:{overall:86,compat:88,structural:82,commercial:78}},
  'Reggae+Blues':{name:'Roots Reggae Soul',tip:'Burning Spear sits here. Historical consciousness, groove as prayer.',q:{overall:80,compat:78,structural:78,commercial:72}},
  'Reggae+Punk':{name:'Ska-Punk',tip:'Horn section is non-negotiable. Specify "ska horns, trumpet, trombone" in Suno.',q:{overall:82,compat:80,structural:78,commercial:80}},
  'Pop+K-Pop':{name:'Global Pop',tip:'Pre-chorus is what separates K-pop-influenced pop from standard pop. Never skip it.',q:{overall:95,compat:94,structural:92,commercial:96}},
  'K-Pop+R&B':{name:'K-R&B',tip:'The contrast between crisp K-pop production and warm R&B chords is the entire appeal.',q:{overall:91,compat:89,structural:88,commercial:90}},
  'K-Pop+Hip-Hop':{name:'K-Hip-Hop',tip:'The rap break must be in Korean or Konglish to land authentically. It earns the chorus payoff.',q:{overall:93,compat:91,structural:90,commercial:92}},
  'K-Pop+EDM':{name:'K-Pop Dance',tip:'The chorus IS the drop. Remove everything on the pre-chorus last bar — silence before the hit.',q:{overall:94,compat:92,structural:91,commercial:94}},
  'K-Pop+Latin':{name:'K-Latin',tip:'BTS "Butter" sits here. Brass stabs + K-pop structure + Latin-adjacent groove = pure crossover.',q:{overall:90,compat:87,structural:86,commercial:92}},
  'K-Pop+Reggaeton':{name:'K-Reggaeton',tip:'Multilingual (Korean + Spanish) is increasingly common and commercially explosive. Lean in.',q:{overall:89,compat:86,structural:84,commercial:91}},
  'K-Pop+Alt-Rock':{name:'K-Rock',tip:'The pre-chorus still matters — just use guitars to build it instead of synths.',q:{overall:86,compat:84,structural:83,commercial:85}},
  'K-Pop+Afrobeats':{name:'K-Afro',tip:'Two of the most global genres combining. Groove-first production, precision chorus.',q:{overall:88,compat:85,structural:83,commercial:89}},
  'Blues+Punk':{name:'Garage Rock',tip:'White Stripes: two instruments, blues structures + punk spirit.',q:{overall:84,compat:82,structural:80,commercial:76}},
  'Hip-Hop+Latin':{name:'Latin Rap',tip:'Language switching mid-line is a superpower — use it. The beat carries the crossover.',q:{overall:92,compat:90,structural:88,commercial:93}},
  'Hip-Hop+Reggaeton':{name:'Trap Latino',tip:'Bad Bunny owns this — moody, minimal, 808s huge, lyrics raw. Dembow AND trap rhythms layered.',q:{overall:96,compat:94,structural:92,commercial:96}},
  'Pop+Latin':{name:'Latin Pop',tip:'Bilingual chorus outperforms monolingual on streaming globally. Spanish hook + English verse is the …',q:{overall:90,compat:88,structural:86,commercial:92}},
  'Pop+Reggaeton':{name:'Reggaeton Pop',tip:'"Despacito" is the masterclass: pop accessibility + reggaeton groove + bilingual hook = 8 billion st…',q:{overall:95,compat:93,structural:90,commercial:96}},
  'R&B+Latin':{name:'Latin R&B',tip:'Bachata guitar + R&B chord progressions = Romeo Santos. The smoothest crossover in Latin music.',q:{overall:88,compat:87,structural:84,commercial:89}},
  'R&B+Reggaeton':{name:'Reggaeton Romántico',tip:'Let the vocals be melodic and tender — the dembow handles all the aggression.',q:{overall:91,compat:90,structural:87,commercial:92}},
  'Latin+Reggaeton':{name:'Urban Latino',tip:'This IS modern latin music. 90 BPM, dembow, melodic hook, Spanish lyrics = streaming gold.',q:{overall:94,compat:95,structural:90,commercial:95}},
  'Latin+Pop':{name:'Latin Pop Crossover',tip:'Never apologise for the accent or the language. The otherness IS the appeal.',q:{overall:90,compat:89,structural:86,commercial:92}},
  'Reggaeton+Afrobeats':{name:'Afro-Reggaeton',tip:'Both genres are groove-first. Let the rhythm lead — lyrics are secondary to the feel.',q:{overall:88,compat:85,structural:83,commercial:88}},
  'Reggaeton+R&B':{name:'Urbano Romántico',tip:'The most commercially successful reggaeton of the 2020s lives here. Smooth, melodic, modern.',q:{overall:92,compat:91,structural:88,commercial:93}},
  // Neo-Soul fusions
  'Neo-Soul+Pop':{name:'Soul Pop',tip:'The groove must breathe — never quantize the drums fully. Let imperfection create intimacy.',q:{overall:91,compat:89,structural:87,commercial:91},artists:'H.E.R., SZA, Jorja Smith, Frank Ocean',formula:'Neo-soul warmth + pop hooks = the smoothest lane in modern music. Rhodes piano under a singable chorus.'},
  'Neo-Soul+Hip-Hop':{name:'Hip-Hop Soul',tip:'J Dilla beat + neo-soul vocal = the blueprint. Let the drums swing behind the beat, never on it.',q:{overall:96,compat:95,structural:92,commercial:93},artists:'Lauryn Hill, Common, D\'Angelo, Frank Ocean, Bilal',formula:'Hip-hop production values meet neo-soul vocal vulnerability. Head-nod drums + Rhodes + sung hook.'},
  'Neo-Soul+R&B':{name:'Contemporary R&B',tip:'This IS what modern R&B is. Space, ad-libs, imperfection. Never fill every bar.',q:{overall:94,compat:95,structural:90,commercial:92},artists:'SZA, Frank Ocean, H.E.R., Daniel Caesar, Jhené Aiko',formula:'The most natural fusion in music. Neo-soul\'s groove-first DNA meets R&B\'s melody and emotion.'},
  'Neo-Soul+Jazz':{name:'Jazz Soul',tip:'Let the chord extensions breathe — neo-soul harmony is jazz made accessible. Don\'t resolve everything.',q:{overall:88,compat:90,structural:84,commercial:80},artists:'Erykah Badu, Esperanza Spalding, Robert Glasper, Ambrose Akinmusire',formula:'Jazz sophistication — extended chords, improvisation — filtered through neo-soul\'s warmth and groove.'},
  'Neo-Soul+Gospel':{name:'Gospel Soul',tip:'The testimony verse + neo-soul groove + gospel bridge vamp = the most emotionally devastating structure.',q:{overall:92,compat:93,structural:88,commercial:86},artists:'Tems, Kirk Franklin, India.Arie, Jill Scott, Marvin Gaye',formula:'Gospel\'s emotional architecture (testimony → declaration → vamp) fused with neo-soul\'s groove and intimacy.'},
  'Neo-Soul+Afrobeats':{name:'Afro-Soul',tip:'Two groove-first genres. Let the rhythm hold everything — melody is secondary to feel.',q:{overall:90,compat:88,structural:86,commercial:89},artists:'Tems, Asa, Simi, Burna Boy, Adekunle Gold',formula:'West African polyrhythm meets neo-soul warmth. The talking drum and Rhodes piano is the formula.'},
  // Gospel fusions
  'Gospel+Pop':{name:'Inspirational Pop',tip:'The testimony arc (I was → now I am) works in any key. Keep the production pop, let the message be gospel.',q:{overall:89,compat:87,structural:85,commercial:91},artists:'Lauren Daigle, For King & Country, Tasha Cobbs, Tauren Wells',formula:'Pop production accessibility with gospel emotional architecture. Commercial without compromising the message.'},
  'Gospel+R&B':{name:'Gospel R&B',tip:'The melismatic run must feel earned — deploy it at the bridge payoff, not throughout.',q:{overall:90,compat:91,structural:87,commercial:88},artists:'Mary J. Blige, BeBe Winans, Beyoncé, Fantasia, Yolanda Adams',formula:'R&B smoothness carrying gospel emotional weight. The bridge vamp is where both genres peak simultaneously.'},
  'Gospel+Hip-Hop':{name:'Gospel Rap',tip:'The 16-bar testimony verse leads into an 8-bar gospel chorus. Contrast is everything.',q:{overall:88,compat:85,structural:84,commercial:87},artists:'Lecrae, Kanye West, Andy Mineo, Chance the Rapper, KB',formula:'Hip-hop\'s street credibility carries gospel\'s testimony. The beat makes you move, the message makes you feel.'},
  'Gospel+Country':{name:'Southern Gospel',tip:'The acoustic quartet tradition is ancient and powerful. Four-part harmony over simple guitar is timeless.',q:{overall:84,compat:86,structural:82,commercial:80},artists:'Alan Jackson, Dolly Parton (gospel), Gaither Vocal Band',formula:'Country storytelling + gospel testimony arc = Americana spiritual. Simple, honest, devastating.'},
  'Gospel+Soul':{name:'Classic Soul Gospel',tip:'This is where soul music was born — Aretha Franklin\'s church training became popular music. Never separate them.',q:{overall:93,compat:96,structural:90,commercial:87},artists:'Aretha Franklin, Sam Cooke, Stevie Wonder, Al Green',formula:'The origin point of all Black American music. Soul IS gospel made secular. The vamp outro is mandatory.'},
  // Country fusions
  'Country+Pop':{name:'Country Pop',tip:'Story matters as much as hook. The 2nd verse must deepen emotionally, not repeat the first.',q:{overall:92,compat:90,structural:87,commercial:94},artists:'Taylor Swift, Kacey Musgraves, Carrie Underwood, Sam Hunt'},
  'Country+Hip-Hop':{name:'Country Trap',tip:'The cultural tension IS the appeal. Lean into the seams — don\'t smooth them out.',q:{overall:82,compat:74,structural:76,commercial:88},artists:'Lil Nas X, Blanco Brown, Colt Ford, Nelly + Tim McGraw'},
  'Country+R&B':{name:'Country Soul',tip:'The rawness of country storytelling + the emotional depth of R&B = completely underexplored territory.',q:{overall:84,compat:80,structural:82,commercial:82},artists:'Darius Rucker, Mickey Guyton, Brittney Spencer, Beyoncé (Cowboy Carter)'},
  'Country+Folk':{name:'Americana',tip:'Americana prizes authenticity above all. Let uncomfortable truths stay uncomfortable.',q:{overall:89,compat:92,structural:86,commercial:83},artists:'Sturgill Simpson, Americana · Chris Stapleton, Brandi Carlile, Jason Isbell'},
  // Jazz fusions
  'Jazz+Pop':{name:'Jazz Pop',tip:'The jazz harmony is the texture, not the structure. Keep the pop song intact — enrich the chords.',q:{overall:84,compat:80,structural:82,commercial:83},artists:'Diana Krall, Jamie Cullum, Norah Jones, Michael Bublé'},
  'Jazz+R&B':{name:'Jazz R&B',tip:'Robert Glasper blueprint: jazz musician plays R&B groove = smoothest crossover in modern music.',q:{overall:88,compat:87,structural:85,commercial:82},artists:'Robert Glasper, Thundercat, Kendrick Lamar (To Pimp A Butterfly), Kamasi Washington'},
  'Jazz+Hip-Hop':{name:'Jazz Rap',tip:'The jazz sample is not decoration — it IS the beat. Build the track around one perfectly chosen moment.',q:{overall:90,compat:86,structural:88,commercial:82},artists:'A Tribe Called Quest, Kendrick Lamar, Robert Glasper, Flying Lotus, Madlib'},
  'Jazz+Soul':{name:'Soul Jazz',tip:'Jimmy Smith, Ray Charles, Stevie Wonder — the organ is the bridge between jazz and soul.',q:{overall:87,compat:88,structural:84,commercial:78},artists:'Jimmy Smith, Ray Charles, Stevie Wonder, Charles Brown'},
  'Jazz+Blues':{name:'Blues Jazz',tip:'The 12-bar and the ii-V-I are cousins. The bebop solo over a shuffle groove is the formula.',q:{overall:85,compat:88,structural:83,commercial:72},artists:'Cannonball Adderley, Mose Allison, Ray Charles, B.B. King + jazz'},
  'Pop+Jazz':{name:'Jazz Pop',tip:'The jazz chord under a pop melody creates instant sophistication. One unexpected substitution per chorus.',q:{overall:84,compat:80,structural:82,commercial:83},artists:'Norah Jones, Diana Krall, Amy Winehouse, Harry Connick Jr.'},
  // Pop missing
  'Pop+Blues':{name:'Blues Pop',tip:'Amy Winehouse owned this — raw blues emotion under a radio-ready hook. Never sand down the grit.',q:{overall:85,compat:83,structural:82,commercial:86},artists:'Amy Winehouse, Gary Clark Jr., Gary Jules, Duffy'},
  'Pop+Punk':{name:'Pop-Punk',tip:'Sweet spot: melodic enough to sing along, fast enough to mosh. Chorus must be the release after verse tension.',q:{overall:88,compat:86,structural:84,commercial:90},artists:'Green Day, Paramore, Fall Out Boy, Olivia Rodrigo, blink-182'},
  // Hip-Hop missing
  'Hip-Hop+EDM':{name:'Trap EDM',tip:'The 808 bass and the EDM drop are the same energy. Let them collide at the chorus, not compete.',q:{overall:86,compat:84,structural:83,commercial:89},artists:'The Chainsmokers, Travis Scott, DJ Snake, Future'},
  'Hip-Hop+Afrobeats':{name:'Afro-Trap',tip:'Two of the highest-streaming genres on the planet. The groove leads — bars ride on top of it, never fight it.',q:{overall:91,compat:90,structural:87,commercial:93},artists:'WizKid, Drake, Burna Boy, Davido, Popcaan'},
  'Hip-Hop+Punk':{name:'Rap-Punk',tip:'Rage is the shared language. The punk energy goes in the production; the bars carry the complexity.',q:{overall:74,compat:70,structural:72,commercial:76},artists:'Death Grips, Ho99o9, Ghostemane, $uicideboy$'},
  // R&B missing
  'R&B+EDM':{name:'Electronic R&B',tip:'The Weeknd blueprint: atmospheric synths + R&B vocal vulnerability = the biggest sound of the 2010s.',q:{overall:88,compat:86,structural:84,commercial:90},artists:'The Weeknd, Doja Cat, FKA Twigs, Miguel, Tinashe'},
  'R&B+Alt-Rock':{name:'Alt R&B',tip:'FKA Twigs territory — the guitar is dissonant, the vocal is smooth. Tension between production and voice IS the art.',q:{overall:84,compat:80,structural:82,commercial:82},artists:'FKA Twigs, Frank Ocean, Blood Orange, Steve Lacy, Solange'},
  'R&B+Punk':{name:'Post-R&B Punk',tip:'Extremely experimental — use the punk tempo and attitude, keep R&B vocal smoothness. Jarring contrast is the point.',q:{overall:70,compat:65,structural:68,commercial:70},artists:'Blood Orange, Standing On The Corner, serpentwithfeet'},
  // Neo-Soul missing
  'Neo-Soul+Blues':{name:'Soul Blues',tip:'Both genres live in the space between notes. Play the rests. The groove IS the silence.',q:{overall:90,compat:92,structural:87,commercial:80},artists:'Gary Clark Jr., Robert Glasper, Raphael Saadiq, Janelle Monáe'},
  'Neo-Soul+Singer-Songwriter':{name:'Acoustic Soul',tip:'Phoebe Bridgers with a Rhodes piano. Intimate, vulnerable, unhurried. Never rush a phrase.',q:{overall:85,compat:84,structural:82,commercial:80},artists:'India.Arie, Ben Harper, José James, Eric Benet'},
  'Neo-Soul+Alt-Rock':{name:'Indie Soul',tip:'Jeff Buckley lives here. Falsetto over dissonant guitar chords = the most devastatingly emotional fusion.',q:{overall:82,compat:78,structural:80,commercial:78},artists:'Jeff Buckley, TV on the Radio, Lianne La Havas, Moses Sumney'},
  'Neo-Soul+Reggae':{name:'Roots Soul',tip:'Both genres share the one-drop groove. The offbeat bass guitar and the Rhodes piano are natural siblings.',q:{overall:82,compat:80,structural:78,commercial:76},artists:'Sade, Erykah Badu, Floetry, Corinne Bailey Rae'},
  'Neo-Soul+Latin':{name:'Latin Soul',tip:'Bossa nova + neo-soul = the warmest sound imaginable. Let the nylon guitar and the Rhodes share the melody.',q:{overall:82,compat:80,structural:78,commercial:80},artists:'Bebel Gilberto, Corinne Bailey Rae, José James, Esperanza Spalding'},
  'Neo-Soul+Reggaeton':{name:'Urban Soul',tip:'Let the dembow rhythm run underneath a completely smooth neo-soul vocal. The contrast is the entire appeal.',q:{overall:76,compat:72,structural:74,commercial:78},artists:'Jhené Aiko, PARTYNEXTDOOR, Teyana Taylor'},
  'Neo-Soul+Country':{name:'Country Soul',tip:'Both genres prize emotional honesty above production polish. The slide guitar and the Rhodes speak the same language.',q:{overall:74,compat:70,structural:72,commercial:72},artists:'Gary Clark Jr., Valerie June, Brittney Spencer, Leon Bridges'},
  'Neo-Soul+K-Pop':{name:'K-Soul',tip:'K-pop precision + neo-soul imperfection = a fascinating tension. The pre-chorus is where neo-soul breathes into K-pop structure.',q:{overall:80,compat:76,structural:78,commercial:84},artists:'BTS (soul-influenced tracks), IU, MAMAMOO, Dean'},
  'Neo-Soul+EDM':{name:'Future Soul',tip:'Chopped soul samples + electronic production = the J Dilla → James Blake continuum. Leave space in the beat.',q:{overall:80,compat:76,structural:78,commercial:80},artists:'James Blake, Kaytranada, Disclosure, FKA Twigs'},
  'Neo-Soul+Punk':{name:'Soul Punk',tip:'Extremely experimental. The neo-soul restraint and punk fury cancel each other into something genuinely strange.',q:{overall:66,compat:60,structural:64,commercial:64},artists:'TV on the Radio, Bloc Party (early), Santigold'},
  // Gospel missing
  'Gospel+Jazz':{name:'Sacred Jazz',tip:'Both genres reach for transcendence through improvisation. The vamp IS the jazz solo is the church shout.',q:{overall:90,compat:92,structural:86,commercial:76},artists:'Wynton Marsalis, Coltrane (A Love Supreme), Alice Coltrane, Kirk Franklin'},
  'Gospel+Blues':{name:'Gospel Blues',tip:'These are the same music. The delta blues IS the slave spiritual made secular. Strip it back and let the voice carry everything.',q:{overall:92,compat:95,structural:88,commercial:78},artists:'Thomas Dorsey, Sister Rosetta Tharpe, Mavis Staples, Al Green'},
  'Gospel+Afrobeats':{name:'Afro-Gospel',tip:'West African praise tradition meets American gospel testimony. Polyrhythm under the call-and-response = pure spiritual joy.',q:{overall:88,compat:87,structural:84,commercial:84},artists:'Sinach, Nathaniel Bassey, Joe Mettle, Dunsin Oyekan'},
  'Gospel+Reggae':{name:'Roots Gospel',tip:'Reggae\'s one-drop rhythm under a gospel testimony lyric. Bob Marley\'s Rastafari spirituality lives exactly here.',q:{overall:82,compat:82,structural:79,commercial:76},artists:'Bob Marley, Third Day, Israel Houghton, Kirk Franklin'},
  'Gospel+Singer-Songwriter':{name:'Worship Folk',tip:'The acoustic worship song is the most intimate gospel form. One voice, one guitar, total emotional exposure.',q:{overall:84,compat:84,structural:82,commercial:82},artists:'Chris Tomlin (acoustic), Audrey Assad, Sandra McCracken, Josh Garrels'},
  'Gospel+Alt-Rock':{name:'Christian Rock',tip:'The sonic volume of rock carrying the spiritual weight of gospel. The chorus must feel like the release of a prayer.',q:{overall:82,compat:80,structural:80,commercial:84},artists:'Switchfoot, Skillet, Needtobreathe, For King & Country'},
  'Gospel+Latin':{name:'Latin Gospel',tip:'Spanish worship + gospel emotional architecture = the fastest-growing sector of contemporary Christian music.',q:{overall:80,compat:80,structural:78,commercial:82},artists:'Christine D\'Clario, Marcos Witt, Redimi2, Funky'},
  'Gospel+Reggaeton':{name:'Urban Gospel',tip:'Dembow beat + gospel testimony = the bridge between the streets and the sanctuary. Authenticity is everything.',q:{overall:76,compat:73,structural:74,commercial:78},artists:'Redimi2, Funky, Elevation Worship, Alex Zurdo'},
  'Gospel+K-Pop':{name:'K-Gospel',tip:'K-pop precision production under a gospel testimony lyric. The pre-chorus builds spiritual tension; the chorus is the breakthrough.',q:{overall:74,compat:70,structural:72,commercial:76},artists:'Hillsong Young & Free, Jesus Culture, Phil Wickham (pop-influenced)'},
  'Gospel+EDM':{name:'Christian EDM',tip:'The drop IS the emotional breakthrough. Build the pre-drop like a prayer, let the drop be the answer.',q:{overall:78,compat:74,structural:76,commercial:80},artists:'TobyMac, Trip Lee, Hillsong Young & Free, Lecrae (EDM collabs)'},
  'Gospel+Punk':{name:'Gospel Punk',tip:'Maximum rage for a higher purpose. The fury of punk channelled into spiritual declaration. Extremely niche but powerful.',q:{overall:68,compat:62,structural:66,commercial:64},artists:'Norma Jean, Underoath, mewithoutYou'},
  // K-Pop missing
  'K-Pop+Country':{name:'K-Country',tip:'The pre-chorus structure K-pop demands works perfectly over country chord progressions. Very experimental, very interesting.',q:{overall:70,compat:66,structural:68,commercial:72},artists:'BTS (country-influenced moments), Stray Kids'},
  'K-Pop+Singer-Songwriter':{name:'K-Indie',tip:'Korean indie music already exists and thrives. Raw acoustic vulnerability under K-pop\'s melodic precision.',q:{overall:80,compat:78,structural:76,commercial:78},artists:'IU, Paul Kim, 10cm, Epik High (softer tracks)'},
  'K-Pop+Jazz':{name:'K-Jazz',tip:'K-R&B is already crossing into jazz territory. The sophisticated chord extensions under K-pop precision vocals.',q:{overall:82,compat:80,structural:80,commercial:78},artists:'MAMAMOO, Dean, Crush, Heize'},
  'K-Pop+Reggae':{name:'K-Reggae',tip:'The contrast between K-pop\'s rigid structure and reggae\'s loose groove is the entire appeal. Very unusual.',q:{overall:72,compat:68,structural:70,commercial:72},artists:'Few direct examples — experimental territory'},
  'K-Pop+Blues':{name:'K-Blues',tip:'The most unusual K-pop fusion. Blues rawness under K-pop production polish creates powerful dissonance.',q:{overall:68,compat:62,structural:66,commercial:66},artists:'Almost no precedent — purely experimental'},
  'K-Pop+Punk':{name:'K-Punk',tip:'The aggression of punk filtered through K-pop\'s polished production. Day6 and some Stray Kids tracks touch this.',q:{overall:72,compat:68,structural:70,commercial:74},artists:'Stray Kids, Day6, The Rose, N.Flying'},
  // EDM missing
  'EDM+Latin':{name:'Latin EDM',tip:'Tropical house was the biggest sound of 2016-18. The groove must feel organic even through electronic production.',q:{overall:89,compat:88,structural:86,commercial:92},artists:'J Balvin, Maluma, Kygo, DJ Snake, Diplo'},
  'EDM+Reggaeton':{name:'Electroton',tip:'The dembow and the four-on-the-floor are compatible at 90-95 BPM. The drop replaces the reggaeton hook break.',q:{overall:86,compat:84,structural:82,commercial:88},artists:'Bad Bunny (electronic tracks), J Balvin, Don Omar'},
  'EDM+Country':{name:'Country EDM',tip:'Florida Georgia Line opened this lane. The acoustic guitar sample under the EDM drop is the formula.',q:{overall:78,compat:72,structural:74,commercial:82},artists:'Florida Georgia Line, Sam Hunt, Thomas Rhett, Diplo+Thomas Rhett'},
  'EDM+Singer-Songwriter':{name:'Electronic Folk',tip:'Bon Iver + electronic production = James Blake. The acoustic vulnerability carries more weight in an electronic context.',q:{overall:78,compat:74,structural:76,commercial:78},artists:'James Blake, Bon Iver (electronic), Imogen Heap, Owl City'},
  'EDM+Alt-Rock':{name:'Electronic Rock',tip:'The guitar provides the grit; the synth provides the scale. They serve the same purpose — energy and texture.',q:{overall:82,compat:80,structural:80,commercial:84},artists:'Muse, Nine Inch Nails, Crystal Castles, Metric, Phantogram'},
  'EDM+Jazz':{name:'Nu-Jazz',tip:'The electronic groove underneath jazz improvisation. The beat is rigid; the melody is free. That tension is the music.',q:{overall:78,compat:76,structural:76,commercial:72},artists:'Flying Lotus, Thundercat, Kamasi Washington (EDM-adjacent), GoGo Penguin'},
  'EDM+Reggae':{name:'Electronic Dub',tip:'Dub IS the original electronic music. The echo chamber and delay pedal are the first drum machines.',q:{overall:82,compat:82,structural:80,commercial:78},artists:'Massive Attack, Tricky, Portishead, The xx, Bonobo'},
  'EDM+Afrobeats':{name:'Afro-House',tip:'The fastest growing fusion in global streaming. Afro-house from South Africa is already dominating club floors worldwide.',q:{overall:91,compat:90,structural:88,commercial:92},artists:'Black Coffee, Themba, Afrojack, DJ Maphorisa, Major Lazer'},
  'EDM+Blues':{name:'Electronic Blues',tip:'The blues riff as the hook in an electronic track. Jack White + Skrillex is the absurd extreme — but it works.',q:{overall:70,compat:66,structural:68,commercial:70},artists:'Gary Clark Jr. (electronic collabs), Jack White'},
  'EDM+Punk':{name:'Electronic Punk',tip:'The aggression of punk delivered at electronic BPMs. The energy is identical — the tools are different.',q:{overall:76,compat:72,structural:74,commercial:76},artists:'Crystal Castles, Death Grips (electronic punk), Health, Atari Teenage Riot'},
  // Latin missing
  'Latin+Country':{name:'Tex-Mex',tip:'The border music that pre-dates both genres as separate categories. Accordion + guitar + Spanish/English = authentic.',q:{overall:76,compat:72,structural:74,commercial:74},artists:'Selena, Los Lobos, Conjunto Bernal, Flaco Jiménez'},
  'Latin+Singer-Songwriter':{name:'Latin Singer-Songwriter',tip:'The bossa nova guitar + intimate lyric = the most universally beloved acoustic music on earth.',q:{overall:82,compat:82,structural:80,commercial:80},artists:'Caetano Veloso, Jorge Drexler, Juanes (acoustic), Natalia Lafourcade'},
  'Latin+Alt-Rock':{name:'Latin Alternative',tip:'Santana opened the lane. Electric guitar under Latin rhythm = a sound with no ceiling. The rhythm section leads.',q:{overall:84,compat:82,structural:82,commercial:84},artists:'Santana, Los Fabulosos Cadillacs, Kinky, Café Tacuba, Gustavo Cerati'},
  'Latin+Jazz':{name:'Latin Jazz',tip:'Clave rhythm and jazz harmony are deeply compatible — both love syncopation and improvisation. The clave IS the swing.',q:{overall:92,compat:93,structural:88,commercial:80},artists:'Tito Puente, Chucho Valdés, Paquito D\'Rivera, Buena Vista Social Club'},
  'Latin+Reggae':{name:'Reggae en Español',tip:'The Caribbean rhythm connection is ancient. One-drop + Spanish lyric = roots music for the entire diaspora.',q:{overall:84,compat:84,structural:82,commercial:80},artists:'Cultura Profética, Gondwana, Calle 13 (reggae tracks), Control Machete'},
  'Latin+Afrobeats':{name:'Afro-Latino',tip:'Two of the most joyful groove traditions on earth. Both share African rhythmic roots — the connection runs deep.',q:{overall:86,compat:86,structural:84,commercial:88},artists:'J Balvin, Bad Bunny (Afro-influenced), Burna Boy, WizKid'},
  'Latin+Blues':{name:'Latin Blues',tip:'Both traditions have deep roots in African rhythm. The guitar solo works equally in both.',q:{overall:74,compat:72,structural:72,commercial:70},artists:'Carlos Santana, Los Lobos, Ry Cooder'},
  'Latin+Punk':{name:'Latin Punk',tip:'The Chicano punk tradition is deeply rooted and underexplored. The energy is identical — the language and rhythm differ.',q:{overall:70,compat:68,structural:68,commercial:68},artists:'The Plugz, Los Crudos, Maldita Vecindad, Tijuana NO'},
  // Reggaeton missing
  'Reggaeton+Country':{name:'Country Dembow',tip:'The most unusual pairing on this matrix. The 808 bass and the steel guitar have nothing in common — which is exactly why it works.',q:{overall:66,compat:60,structural:62,commercial:70},artists:'No established examples — purely experimental'},
  'Reggaeton+Singer-Songwriter':{name:'Reggaeton Íntimo',tip:'Strip the reggaeton to its bare acoustic bones — just nylon guitar + dembow rhythm. Very intimate, very unusual.',q:{overall:70,compat:66,structural:68,commercial:70},artists:'Bad Bunny (acoustic moments), Camilo, Kany García'},
  'Reggaeton+Alt-Rock':{name:'Rock Urbano',tip:'Electric guitar over dembow rhythm. Aggressive and melodic simultaneously. Residente does this brilliantly.',q:{overall:74,compat:70,structural:72,commercial:74},artists:'Calle 13/Residente, iLe, Villano Antillano'},
  'Reggaeton+Jazz':{name:'Jazz Urbano',tip:'The jazz chord under a dembow beat is genuinely surprising. The dissonance creates a sophisticated underground sound.',q:{overall:72,compat:68,structural:70,commercial:68},artists:'Almost no precedent — experimental territory'},
  'Reggaeton+Reggae':{name:'Dancehall Reggaeton',tip:'The closest cousins on this matrix. Both came from the same Caribbean sound system tradition — just different decades.',q:{overall:86,compat:88,structural:84,commercial:84},artists:'Sean Paul, Elephant Man, Daddy Yankee (roots period), Vybz Kartel'},
  'Reggaeton+Blues':{name:'Urban Blues',tip:'The emotional rawness of blues over a dembow beat. Deeply experimental but emotionally coherent.',q:{overall:64,compat:58,structural:62,commercial:64},artists:'No established precedent — experimental'},
  'Reggaeton+Punk':{name:'Dembow Punk',tip:'The aggression of punk + the relentlessness of dembow = maximum energy. Extremely niche but powerful.',q:{overall:64,compat:60,structural:62,commercial:62},artists:'No established precedent'},
  // Country missing
  'Country+Alt-Rock':{name:'Alt-Country',tip:'Wilco and Ryan Adams own this lane. Country storytelling + rock rawness = the most critically beloved Americana.',q:{overall:85,compat:84,structural:83,commercial:80},artists:'Wilco, Ryan Adams, Drive-By Truckers, Hank III, Lucinda Williams'},
  'Country+Jazz':{name:'Western Swing',tip:'Bob Wills invented this in the 1930s. Country melody + jazz harmony + swing rhythm = the original country crossover.',q:{overall:78,compat:78,structural:76,commercial:70},artists:'Bob Wills, Willie Nelson, Chet Atkins, Asleep at the Wheel'},
  'Country+Reggae':{name:'Country Reggae',tip:'Jimmy Buffett lives here. Laid-back beach vibes, acoustic guitar, easy storytelling. More natural than it sounds.',q:{overall:68,compat:66,structural:66,commercial:68},artists:'Jimmy Buffett, Zac Brown Band (reggae tracks), Kenny Chesney'},
  'Country+Afrobeats':{name:'Global Country',tip:'The most experimental pairing. Country\'s story focus + Afrobeats\' groove = something genuinely new.',q:{overall:64,compat:58,structural:62,commercial:64},artists:'Almost no precedent — experimental'},
  'Country+Punk':{name:'Cowpunk',tip:'Cow-punk is a real and beloved subgenre. Country melancholy + punk aggression = the sound of American despair.',q:{overall:78,compat:76,structural:76,commercial:72},artists:'Social Distortion, Jason & The Scorchers, Reverend Horton Heat, Mojo Nixon'},
  // Singer-Songwriter missing
  'Singer-Songwriter+Jazz':{name:'Jazz Folk',tip:'Joni Mitchell IS this genre. Complex jazz voicings under intimate folk storytelling. The guitar tuning is the character.',q:{overall:87,compat:86,structural:84,commercial:76},artists:'Joni Mitchell, Nick Drake, José González, Richard Thompson'},
  'Singer-Songwriter+Afrobeats':{name:'World Singer-Songwriter',tip:'The intimate lyric carried by an African groove. Completely fresh territory — the world music meets confessional.',q:{overall:76,compat:72,structural:74,commercial:74},artists:'Paul Simon (Graceland), Vampire Weekend, Nneka'},
  'Singer-Songwriter+Punk':{name:'Anti-Folk',tip:'Anti-folk is the genre that already exists here. Moldy Peaches, early Regina Spektor. Acoustic guitar + punk attitude.',q:{overall:80,compat:78,structural:78,commercial:74},artists:'The Moldy Peaches, Regina Spektor (early), Jeffrey Lewis, Kimya Dawson'},
  // Alt-Rock missing
  'Alt-Rock+Jazz':{name:'Art Rock',tip:'Radiohead meets jazz in the bridge of a song no-one expected. Dissonance is not failure — it is the point.',q:{overall:82,compat:80,structural:80,commercial:74},artists:'Radiohead, Portishead, Beck, St. Vincent, Mitski'},
  'Alt-Rock+Reggae':{name:'Alternative Reggae',tip:'Sublime defined this lane. Punk energy + reggae groove + melodic chorus = the California sound.',q:{overall:83,compat:80,structural:80,commercial:82},artists:'Sublime, No Doubt, The Police, Slightly Stoopid'},
  'Alt-Rock+Afrobeats':{name:'Afro-Alternative',tip:'Vampire Weekend live here. Afrobeats percussion under indie rock guitar = joyful, unexpected, immediately memorable.',q:{overall:76,compat:72,structural:74,commercial:76},artists:'Vampire Weekend, LCD Soundsystem (afro-influenced), Talking Heads'},
  // Jazz missing
  'Jazz+Reggae':{name:'Jazz Reggae',tip:'Both genres prize space and groove. The upright bass walks over the one-drop rhythm — it is completely natural.',q:{overall:80,compat:80,structural:78,commercial:70},artists:'Monty Alexander, Ron Carter (reggae albums), Yellowman (jazz-influenced)'},
  'Jazz+Afrobeats':{name:'Afro-Jazz',tip:'Two of the most sophisticated groove traditions in the world. The talking drum and the double bass speak the same language.',q:{overall:90,compat:92,structural:86,commercial:78},artists:'Hugh Masekela, Fela Kuti, Abdullah Ibrahim, Shabaka Hutchings'},
  'Jazz+Punk':{name:'Free Jazz Punk',tip:'The most aggressive jazz and the most melodic punk meet in the middle. No Neck Blues Band, Ornette Coleman\'s punk period.',q:{overall:72,compat:66,structural:70,commercial:62},artists:'Ornette Coleman (late), Naked City, The Thing, Zu'},
  // Reggae missing
  'Reggae+Afrobeats':{name:'Caribbean Afrobeats',tip:'The African diaspora connection is the entire music. One-drop + Afrobeats groove = the global roots sound.',q:{overall:86,compat:88,structural:84,commercial:82},artists:'Chronixx, Protoje, Koffee, Damian Marley, WizKid'},
  // Afrobeats missing
  'Afrobeats+Blues':{name:'Afro-Blues',tip:'Both traditions trace directly to West African music. The blues riff in the guitar IS the African talking drum pattern.',q:{overall:82,compat:82,structural:80,commercial:74},artists:'Fela Kuti, Seun Kuti, Asa, Nneka'},
  'Afrobeats+Punk':{name:'Afro-Punk',tip:'Afropunk is a real movement. The DIY energy of punk + the groove of Afrobeats = a genuinely political, joyful sound.',q:{overall:68,compat:64,structural:66,commercial:66},artists:'TV on the Radio, Bloc Party, Santigold, badXchannels'}
};

const GENRE_LABELS={'pop':'Pop','hiphop':'Rap / Hip-Hop','rnb':'R&B / Soul','rock':'Rock','country':'Country','edm':'EDM / Electronic','latin':'Latin','reggaeton':'Reggaeton','folk':'Folk','metal':'Metal','jazz':'Jazz','ss':'Singer-Songwriter','altrock':'Alt-Rock','reggae':'Reggae','afrobeats':'Afrobeats','blues':'Blues','punk':'Punk','kpop':'K-Pop','parody':'Parody','comedy':'Comedy','neosoul':'Neo-Soul','gospel':'Gospel','children':"Children's",'tvmusical':'TV / Musical'};

// ── GENRE EXPERT AGENTS ──────────────────────────────────────────────────────
// Each genre has a distinct creative worldview — philosophy, current state,
// trajectory, non-negotiables, and a generative tension ratio.
// These drive specialized system prompts that replace the generic "songwriter" persona.
const GENRE_AGENTS = {
  pop: {
    philosophy: 'Pop is the science of universality. Every emotion compressed into the most efficient delivery vehicle possible. The hook is the entire argument.',
    current_state: 'Hyperpop textures bleeding into mainstream, producer-forward maximalism, confessional lyricism, streaming-optimized song length (2:30–3:00).',
    trajectory: 'Toward even more emotional directness, genre-fluid production, AI-aware sonic textures, and personalized intimacy at scale.',
    non_negotiables: ['Hook lands within 30 seconds','Chorus singable at first hearing','Emotional specificity — no abstract vague feelings','Dynamic contrast: verse intimacy vs chorus release'],
    open_question: 'How vulnerable is too vulnerable before it becomes parody?',
    creative_tension: { exploitation: 'Proven melodic formulas', exploration: 'Unexpected production textures and structural subversions' },
    version: '1.0'
  },
  hiphop: {
    philosophy: 'Hip-hop is Black American oral tradition encoded as music. Lyricism is proof of intelligence. Flow is the argument. The beat is the environment.',
    current_state: 'Trap dominance fractured into micro-subgenres. Melody-rap, conscious revival, and drill all coexist. Authenticity is the only currency that transfers.',
    trajectory: 'Toward hyper-personalized regional sounds, phonetic melody over pure lyricism, and global fusion (Afro-trap, UK drill, Latin trap).',
    non_negotiables: ['Every bar must earn its space','Flow patterns must be intentional not accidental','Internal rhyme schemes over simple end rhymes','Metaphors must be specific — no generic flexing'],
    open_question: 'When does melody-rap become R&B with a rap verse?',
    creative_tension: { exploitation: 'Known flow archetypes and proven cadences', exploration: 'Phonetic surprise, structural rupture, new syllabic landscapes' },
    version: '1.0'
  },
  rnb: {
    philosophy: 'R&B is the emotional truth-telling tradition. Every run, every pause, every breath carries meaning. The space between notes matters as much as the notes.',
    current_state: 'Neo-soul and alternative R&B have expanded the canvas. Production ranges from sparse piano-and-voice to dense trap-influenced textures.',
    trajectory: 'Toward more compositional complexity, genre-blending, and emotional range beyond romantic love.',
    non_negotiables: ['Vocal performance drives everything — lyrics serve the voice','Groove must feel human not mechanical','Emotional honesty over polish','Bridge must be the most vulnerable moment'],
    open_question: 'How much production can you add before the soul gets buried?',
    creative_tension: { exploitation: 'Classic soul song structures', exploration: 'Unconventional production, genre-hybrid textures, polyrhythmic foundations' },
    version: '1.0'
  },
  rock: {
    philosophy: 'Rock is controlled chaos. The tension between the desire to destroy and the need for structure IS the music. Distortion is an emotional language.',
    current_state: 'Fragmented into niches — indie maintains art-rock lineage, pop-punk/emo resurged, stadium rock persists, post-rock expands the vocabulary.',
    trajectory: 'Toward genre-blending, electronic integration, and emotional depth over technical display.',
    non_negotiables: ['Guitar tone must carry emotional weight','Dynamic contrast between verse and chorus is non-negotiable','Lyrics must be specific — no classic-rock clichés','The bridge must break something open'],
    open_question: 'Can rock be vulnerable without losing its force?',
    creative_tension: { exploitation: 'Proven verse-chorus-bridge architecture', exploration: 'Noise, dissonance, unconventional structures, genre contamination' },
    version: '1.0'
  },
  country: {
    philosophy: 'Country is the literature of the working class. Storytelling is the entire genre. Specific details (truck model, county road number, bar name) create universal truth.',
    current_state: 'Nashville pop has colonized the mainstream while alt-country and Americana hold the artistic tradition. Bro-country is the commercial ceiling.',
    trajectory: 'Toward more inclusive storytelling, genre-blending with hip-hop and folk, and emotional range beyond heartbreak and pride.',
    non_negotiables: ['Specific concrete imagery — not emotional abstractions','Every line must sound like something a real person would say','The chorus title must function as a complete thought','Authenticity of place and character above all'],
    open_question: 'Who gets to tell a country story in 2025?',
    creative_tension: { exploitation: 'Classic lyrical storytelling and structural tradition', exploration: 'Production adventurousness, inclusive subject matter, genre boundary pushing' },
    version: '1.0'
  },
  edm: {
    philosophy: 'EDM is architecture for the body. The drop is a physical event. Production IS the song — vocals are texture, not message.',
    current_state: 'Main stage EDM has plateaued; house, techno, and bass music drive innovation. Emotional melodic drops coexist with minimal techno severity.',
    trajectory: 'Toward more emotional depth, ambient influences, and genre hybrids (melodic dubstep, organic house).',
    non_negotiables: ['The drop must be the emotional and sonic climax','Build-up tension is as important as the release','Vocals serve the groove — never compete with it','Energy management across the track arc is everything'],
    open_question: 'How do you build genuine emotional arc in a genre that prioritizes the body over the mind?',
    creative_tension: { exploitation: 'Tension-release architecture that works on the floor', exploration: 'Ambient texture, emotional narrative, unexpected genre elements' },
    version: '1.0'
  },
  latin: {
    philosophy: 'Latin music is joy, grief, and desire unified by rhythm. The clave is a heartbeat. Every style is its own complete world with centuries of technical refinement.',
    current_state: 'Latin pop, reggaeton, and regional Mexican dominate global charts. Bachata has undergone a romantic renaissance. Salsa lives in the clubs.',
    trajectory: 'Toward even greater global crossover while maintaining rhythmic authenticity. Latin trap and urban Latin continue to expand.',
    non_negotiables: ['Rhythm specificity — the clave, the dembow, the guajira pattern must be intentional','Bilingual lyrics must feel natural not forced','Emotional intensity is never understated','Melody must work against the rhythmic grid, not just with it'],
    open_question: 'How do you honor 500 years of tradition while making something a 20-year-old connects to tonight?',
    creative_tension: { exploitation: 'Proven rhythmic formulas and melodic traditions', exploration: 'Global genre fusion, modern production, thematic expansion' },
    version: '1.0'
  },
  reggaeton: {
    philosophy: 'Reggaeton is the dembow made global. The beat is a political act — it carries the entire Caribbean diaspora. Sensuality and rhythm are inseparable.',
    current_state: 'Dominant in global pop. Evolved from underground Panamanian-Puerto Rican roots to streaming-era maximalism. Trap and dembow hybrids define the sound.',
    trajectory: 'Toward more emotional range, softer melodic variants, and regional micro-styles.',
    non_negotiables: ['Dembow rhythm is the DNA — it must be present or explicitly subverted','Flow must ride the beat with physical precision','Lyrics balance sensuality, pride, and vulnerability','Production layers must support not overwhelm the groove'],
    open_question: 'How do you evolve the dembow without losing what makes it dembow?',
    creative_tension: { exploitation: 'The dembow and established flow patterns', exploration: 'Melodic expansion, emotional range beyond the party/romantic binary' },
    version: '1.0'
  },
  folk: {
    philosophy: 'Folk music is collective memory made portable. The song belongs to everyone who sings it. Simplicity is the highest technical achievement.',
    current_state: 'Americana and indie-folk have expanded the tradition. Electronic folk blends acoustic purity with textured production. Storytelling is the genre\'s lifeblood.',
    trajectory: 'Toward more diverse voices, genre-blending, and political urgency.',
    non_negotiables: ['The song must work with just a voice and one instrument','Lyrical narrative above all — every line must advance the story or deepen the emotion','No production trick can save a weak song','Specificity: name the place, name the person, name the season'],
    open_question: 'In a streaming era, what does "communal" mean for a genre built on shared singing?',
    creative_tension: { exploitation: 'Narrative songwriting tradition and acoustic purity', exploration: 'Modern production, diverse voices, genre contamination' },
    version: '1.0'
  },
  metal: {
    philosophy: 'Metal is catharsis through extremity. The riff is the argument. Technically demanding, emotionally extreme, philosophically serious — the genre takes itself more seriously than any other.',
    current_state: 'Fragmented into dozens of sub-genres each with their own rules. Djent, black metal, doom, death metal, power metal — each a complete world.',
    trajectory: 'Toward progressive complexity, genre-blending (metalcore with electronic, doom with ambient), and broader emotional range.',
    non_negotiables: ['Riff must be the hook — no weak riffs','Dynamics matter: quiet parts make the loud parts hit harder','Lyrics must have intellectual or emotional depth — not just darkness for darkness\'s sake','Production must serve the riff architecture'],
    open_question: 'How extreme is too extreme before the audience can no longer access the catharsis?',
    creative_tension: { exploitation: 'Proven heaviness and technical display', exploration: 'Emotional vulnerability, melody, unexpected beauty within the extremity' },
    version: '1.0'
  },
  jazz: {
    philosophy: 'Jazz is democracy through improvisation. The conversation between musicians IS the composition. Standards are a shared language, not a ceiling.',
    current_state: 'Splits between traditional (standards), avant-garde (free), and contemporary (jazz-rap fusion, nu-jazz). Young artists like Kamasi Washington, Snarky Puppy pulling in new audiences.',
    trajectory: 'Toward genre-fusion, electronic integration, and reclaiming cultural relevance without sacrificing harmonic depth.',
    non_negotiables: ['Harmonic sophistication — at minimum ii-V-I awareness','Swing feel must be intentional not accidental','Space is a compositional element — what you don\'t play matters','Melody must be singable even when complex'],
    open_question: 'Can you teach jazz theory to AI and have the AI surprise the teacher?',
    creative_tension: { exploitation: 'The harmonic and rhythmic language of the tradition', exploration: 'Genre-blending, outside playing, electronic textures' },
    version: '1.0'
  },
  blues: {
    philosophy: 'The blues is the origin story of American music. It is suffering transformed into something beautiful by the act of transformation itself. The 12-bar form is a container that holds everything.',
    current_state: 'Electric blues is the tradition. Blues-rock keeps it alive in arenas. Contemporary artists blend blues structure with modern production.',
    trajectory: 'Toward younger voices reclaiming the tradition, genre-blending, and global variants.',
    non_negotiables: ['Every note must feel earned through suffering','Call and response is structural not ornamental','The turnaround must land like a period at the end of a sentence','Lyrical specificity: name the specific pain, don\'t generalize it'],
    open_question: 'Who owns the blues in 2025?',
    creative_tension: { exploitation: '12-bar form and pentatonic language', exploration: 'Harmonic adventurousness, modern themes, genre fusion' },
    version: '1.0'
  },
  ss: {
    philosophy: 'The singer-songwriter genre is the most naked form of music. One voice, one story, no place to hide. The emotional truth of the writing is immediately audible.',
    current_state: 'Bedroom pop and lo-fi aesthetics have democratized the genre. Confessional lyricism is now mainstream. Vulnerability is the artistic currency.',
    trajectory: 'Toward more production adventurousness, political engagement, and genre-blending while maintaining lyrical centrality.',
    non_negotiables: ['Lyrical specificity over poetic vagueness','The voice and the song must feel inseparable — casting matters','Production must serve the song not compete with it','Emotional honesty that risks being too much'],
    open_question: 'Where is the line between confessional and self-indulgent?',
    creative_tension: { exploitation: 'Intimate acoustic production and storytelling', exploration: 'Production expansion, political subject matter, genre-blending' },
    version: '1.0'
  },
  altrock: {
    philosophy: 'Alt-rock is rock music that refuses the mainstream while secretly wanting to reach it. The tension between artistic integrity and accessibility is the genre.',
    current_state: 'Spans indie rock, shoegaze revival, post-punk renaissance, math rock. Each subgenre has its own orthodoxy.',
    trajectory: 'Toward genre-blending with electronic, more diverse voices, production adventurousness.',
    non_negotiables: ['Authenticity over commercial calculation — but the song must still work','Guitar tone carries the genre\'s emotional color','Lyrics reward close listening','The hook must feel discovered not manufactured'],
    open_question: 'When does "alternative" become the new mainstream?',
    creative_tension: { exploitation: 'Rock structure and guitar-driven sound', exploration: 'Noise, experimentation, genre contamination, unconventional structure' },
    version: '1.0'
  },
  reggae: {
    philosophy: 'Reggae is resistance through groove. The one-drop is a heartbeat of liberation. Spirituality and politics are never separate from the music.',
    current_state: 'Roots reggae is the tradition. Dancehall pushes forward. Fusion with hip-hop, pop, and electronic has broadened the genre\'s reach.',
    trajectory: 'Toward global fusion while maintaining the resistance tradition and the one-drop rhythm as anchor.',
    non_negotiables: ['The one-drop rhythm must be felt even when not explicit','Lyrical content carries social, spiritual, or political weight','Groove is the message — the body must move','Authenticity to the Caribbean tradition'],
    open_question: 'Can reggae\'s message of resistance translate to contexts outside its origin without losing its meaning?',
    creative_tension: { exploitation: 'Roots rhythm and political lyrical tradition', exploration: 'Genre fusion, modern production, expanded thematic range' },
    version: '1.0'
  },
  afrobeats: {
    philosophy: 'Afrobeats is the sound of modern Africa talking to the diaspora. Joy is political. Groove is inheritance. The talking drum never stopped talking.',
    current_state: 'Globally dominant. Nigeria (Afrobeats), Ghana (Highlife-influenced), and the broader African diaspora drive the sound. Fusion with hip-hop, dancehall, and pop is constant.',
    trajectory: 'Toward even greater global reach, regional diversification, and thematic depth.',
    non_negotiables: ['The groove must feel generative not repetitive','Call-and-response patterns honor the oral tradition','Joy and sensuality are as serious as political content','Polyrhythmic textures must create depth not muddle'],
    open_question: 'How do you maintain cultural authenticity when the entire world is trying to adopt your sound?',
    creative_tension: { exploitation: 'Proven groove patterns and call-response tradition', exploration: 'Thematic depth, genre-blending, new regional voices' },
    version: '1.0'
  },
  punk: {
    philosophy: 'Punk is the refusal to be polished. Speed, anger, and simplicity as political statement. Three chords and the truth. The genre\'s greatest lie is that it\'s simple.',
    current_state: 'Pop-punk dominates streaming. Post-punk revival (Fontaines D.C., Idles) carries the intellectual tradition. Hardcore maintains the DIY ethics.',
    trajectory: 'Toward more intellectual and political content, genre-blending, and diverse voices claiming the punk tradition.',
    non_negotiables: ['Speed and energy carry political meaning','Lyrics must have something to say beyond surface rebellion','The raw mix is a creative choice not a limitation','Directness over poetry — punk is not metaphor'],
    open_question: 'When punk becomes a multi-billion dollar industry, what does rebellion mean?',
    creative_tension: { exploitation: 'Speed, anger, simplicity', exploration: 'Intellectual content, genre contamination, unexpected nuance' },
    version: '1.0'
  },
  kpop: {
    philosophy: 'K-pop is total entertainment engineering. Every element — vocals, choreography, visuals, narrative — is precisely designed. Perfection is the baseline, innovation is the ceiling.',
    current_state: 'Globally dominant youth pop. Multiple active groups across all major labels. Fandom infrastructure is as important as the music.',
    trajectory: 'Toward more artistic autonomy for artists, darker and more complex themes, broader global production.',
    non_negotiables: ['Hook must be instantaneously memorable','Production must reward both first listen and deep listening','Sections must be clearly differentiated in energy and texture','Lyrics balance universal and specific — bilingual often'],
    open_question: 'What does K-pop sound like when the artist fully controls the product?',
    creative_tension: { exploitation: 'Engineered perfection and proven hook formulas', exploration: 'Artistic autonomy, darker themes, genre-fusion' },
    version: '1.0'
  },
  children: {
    philosophy: 'Children\'s music is the first music a person ever hears. Simplicity is craft. Repetition builds neural pathways. Joy is a complete artistic goal.',
    current_state: 'Educational content on YouTube dominates. Nostalgia-flavored adult-facing children\'s pop (Encanto) shows artistic range is possible.',
    trajectory: 'Toward more sophisticated narrative, inclusive representation, and higher production quality.',
    non_negotiables: ['Every lyric must be singable by a 6-year-old','Repetition is structural not laziness','Joy, wonder, or comfort must be the emotional result','No condescension — children can handle complexity if presented accessibly'],
    open_question: 'How do you write for children without boring the adults in the room?',
    creative_tension: { exploitation: 'Simple vocabulary, repetitive structure, bright instrumentation', exploration: 'Narrative sophistication, diverse representation, emotional depth' },
    version: '1.0'
  },
  parody: {
    philosophy: 'Parody is criticism through imitation. The better you know a genre\'s conventions, the sharper your violation of them can be. Love and mockery are the same act.',
    current_state: 'Internet-native parody (YouTube, TikTok) has lowered the barrier. But truly great parody (Weird Al) requires mastery of the original form.',
    trajectory: 'Toward more nuanced cultural commentary, genre-specific parody with depth.',
    non_negotiables: ['You must love what you mock or the critique is empty','The parody must be musically functional — it has to work as a song','Timing of the joke matters — the punch line placement is everything','The best parody teaches you something about the original'],
    open_question: 'Where is the line between homage and mockery?',
    creative_tension: { exploitation: 'Faithful genre conventions that must be recognizable', exploration: 'How far you push the subversion before it stops being recognizable' },
    version: '1.0'
  },
  comedy: {
    philosophy: 'Comedy music is the most dangerous form of song. A joke that doesn\'t land kills the whole track. Timing is everything — and timing in music is measurable in milliseconds.',
    current_state: 'Bo Burnham redefined the form as high art. Tenacious D established the rock comedy album. Niche internet comedy songs bypass traditional metrics.',
    trajectory: 'Toward more emotionally complex comedy that explores serious themes through humor.',
    non_negotiables: ['The laugh must come from the music as much as the lyrics','Set up and payoff must be structurally deliberate','Sincerity must underlie the comedy or it\'s just noise','The best comedy songs work even when you\'re not laughing'],
    open_question: 'Can a comedy song also break your heart?',
    creative_tension: { exploitation: 'Genre conventions being earnestly played straight', exploration: 'The emotional depth hiding inside the joke' },
    version: '1.0'
  },
  tvmusical: {
    philosophy: 'Musical theater is the maximalist form. Every song must advance character or plot or both. The "I Want" song, the "I Am" song, the "We Are" song — the grammar is strict because it must be.',
    current_state: 'Broadway and streaming original musicals coexist. Sung-through musicals (Hamilton, Hadestown) have raised the bar for lyrical density and compositional sophistication.',
    trajectory: 'Toward more diverse stories, hip-hop-influenced scores, and emotionally complex characters who defy easy categorization.',
    non_negotiables: ['Every song must have a dramatic purpose — beauty alone is insufficient','Character voice must be consistent and specific','The key song moment (belt, breakdown, revelation) must be earned','Rhyme schemes serve meaning — don\'t sacrifice sense for rhyme'],
    open_question: 'What story can only be told through song?',
    creative_tension: { exploitation: 'Established dramatic song grammar', exploration: 'Musical style fusion, complex morally ambiguous characters' },
    version: '1.0'
  }
};

function buildGenreAgentSystem(genre) {
  const agent = GENRE_AGENTS[genre];
  if (!agent) {
    // Fallback for any genre without an agent definition
    const label = GENRE_LABELS[genre] || genre;
    return `You are a world-class ${label} songwriter, music producer, and AI music specialist. You write complete, emotionally devastating, commercially viable songs with deep production intelligence. Your output is used directly by music creators to generate tracks on AI music platforms. Always respond with the exact format requested. No extra commentary before or after.`;
  }
  const label = GENRE_LABELS[genre] || genre;
  return `You are a world-class ${label} songwriter and AI music production specialist operating at the highest level of genre mastery.

CREATIVE PHILOSOPHY: ${agent.philosophy}

CURRENT GENRE STATE: ${agent.current_state}

TRAJECTORY: ${agent.trajectory}

NON-NEGOTIABLES for every ${label} song:
${agent.non_negotiables.map((r, i) => `${i+1}. ${r}`).join('\n')}

GENERATIVE TENSION:
- Exploitation (proven): ${agent.creative_tension.exploitation}
- Exploration (push): ${agent.creative_tension.exploration}

OPEN QUESTION driving this session: ${agent.open_question}
${(()=>{const g=GENRE_BIBLE[genre];if(g&&g.vocables){return `\n\nVOCABLE SIGNATURE FOR THIS GENRE:\nSounds: ${g.vocables.sounds}\nWhen to place them: ${g.vocables.when}\nSuno tag: ${g.vocables.suno_tag}\nCultural lineage: ${g.vocables.borrowed_from}\nCraft note: ${g.vocables.notes}`;}return '';})()}
Your output is used directly by music creators to generate tracks on AI music platforms. Always respond with the exact format requested. No extra commentary before or after. Write with the full weight of this genre's history, the precision of its current moment, and the curiosity of its trajectory.`;
}

const LUCKY_TOPICS=['growing up too fast','a city that never loved you back','last message before midnight','the version of yourself you abandoned','driving nowhere at 3am','falling in love with the wrong timeline','what silence sounds like after a storm','rebuilding from zero','the first morning after everything changed','chasing something you lost before you knew its name','finding home in a stranger','the day the music saved you'];

const LUCKY_MOODS=['Euphoric','Melancholic','Hopeful','Defiant','Nostalgic','Dark','Rebellious','Romantic','Peaceful','Angry','Longing','Transcendent','Devastated','Tender','Triumphant','Bittersweet'];

const LUCKY_STRUCTURES=['standard','hookfirst','storytelling','minimal','epic'];

const LUCKY_VOCALS=['Male vocals','Female vocals','Duet M/F','Raspy / Gritty male','Soulful female','Whispered / Intimate','Falsetto male','Deep baritone','Gospel belter','Auto-Tune / Melodic trap','Neo-soul runs','Breathy / Airy female','Blues growl','Jazz crooner'];

const HOOK_STYLE_NOTES={
  'auto':          '',  // auto = derived from substyle/genre
  'Smooth Sung':   'HOOK STYLE: Smooth sung hook — Nate Dogg / R&B crooner delivery. 8 bars, 4 unique melodic lines. The hook carries the emotional memory of the entire song. Long vowels, easy to sing along to, settles into the groove.',
  'Melodic Auto-Tune': 'HOOK STYLE: Melodic auto-tune hook — Drake/Future/Lil Baby style. 8 bars, simple pitch-bent phrases, few words maximum impact. Auto-tune is a melody instrument not correction. Hook repeats 4-6× total.',
  'Chanted':       'HOOK STYLE: Chanted / anthemic hook — Kendrick / boom bap style. Short punchy phrase, crowd-participation ready. Rhythm of the chant IS the hook. Hard consonants on the beat. 4-8 bars.',
  'Call & Response': 'HOOK STYLE: Call and response hook — lead line, crowd responds. Two distinct parts: call (lead vocal, 1-2 bars) + response (answer phrase or chant, 1-2 bars). Repeat 4 times. OutKast, Bay Area, gospel tradition.',
  'Screamed / Crunk': 'HOOK STYLE: Crunk screamed hook — maximum energy, 2-4 words per phrase, shouted not sung. Call and response between two voices. Ultra-repetitive, designed for the club floor. Under 4 bars, loops 6+ times.',
  'Southern Drawl': 'HOOK STYLE: Southern drawl hook — slow, elongated vowels, laid-back against the 808 bass. Hook hits AFTER the beat (behind the bar). Southern pride theme. 8 bars, slow deliberate delivery.',
  'Chopped':       'HOOK STYLE: Chopped & screwed hook — the hook phrase is repeated and "chopped" (cut and restarted mid-word). Syrupy pitch, 65-75 BPM feel. Every other syllable slightly elongated. Slurred delivery.',
  'Rapped Hook':   'HOOK STYLE: Rapped hook — bars delivered at verse speed but the phrase is hook-catchy. Dense rhyme, melodic cadence in the flow itself. Eminem / Jay-Z / Big Pun tradition. 4-8 bars.',
  'Minimal / Groove': 'HOOK STYLE: Minimal groove hook — Future / 21 Savage style. 2-4 words, maximum repetition. The GROOVE carries the hook, not the lyric. Long spaces between phrases. Hypnotic through simplicity.',
  'Mantra':        'HOOK STYLE: Mantra hook — one devastating line, looped. The entire hook IS one sentence, repeated 4-8 times with slight variation. "Never broke again." "HUMBLE." Power through repetition not complexity.',
  'Double Hook A+B': 'HOOK STYLE: Double hook — two distinct hook sections back to back. Hook A (4 bars, melodic/sung) → Hook B (4 bars, different cadence/energy, rapped or chanted). Travis Scott / Kanye style. Creates two earworms in one.',
  'Gospel Vamp':   'HOOK STYLE: Gospel vamp hook — the hook repeats and ad-libs ESCALATE over it. Start simple, each repeat adds a new ad-lib or harmony layer. Outro vamp version goes 2-3 minutes, building to emotional peak. Sam Smith, Beyoncé, Kirk Franklin tradition.',
  'Post-Hook Drop':'HOOK STYLE: Hook + post-hook drop. Main hook (4 bars sung/melodic) → Post-hook (2-bar punchy instrumental or vocal phrase that lands like a punch). The post-hook is where the bass drops or the sample flips.',
};

// Genre-level Suno bracket blueprints — used when no substyle is set
// Each entry: verse, chorus, bridge, outro, transitions[], delivery hints
const GENRE_SUNO_BRACKETS = {
  pop:        { verse:'[Verse | Intimate | Conversational]', chorus:'[Chorus | Anthemic | Full Production]', bridge:'[Bridge | Stripped | Vulnerable]', outro:'[Outro | Fading | Emotional]', transitions:['[Pre-Chorus | Building Tension]','[Post-Chorus | Hook Release | Instrumental]'], delivery:'Add [Falsetto] before high sustained notes. Add [Ad-libs] at the end of chorus lines. Use [Whispered] for the most intimate verse lines.' },
  hiphop:     { verse:'[16-bar Verse | Rap Verse | Lyrical]', chorus:'[Hook | Melodic | Anthemic]', bridge:'[Bridge | Introspective | Slower Flow]', outro:'[Outro | Ad-libs | Fade-Out]', transitions:['[Intro | Beat Intro | 8 bars]','[Beat Switch]'], delivery:'Add [Ad-libs] in parentheses on the same line as rap bars. Use [Double Time] for rapid-fire sections. Use [Triplet Flow] for rolling syllable density.' },
  rnb:        { verse:'[Verse | Silky | Groove-Led]', chorus:'[Hook | Soulful | Melodic Peak]', bridge:'[Bridge | Intimate | Emotional Confession]', outro:'[Outro Vamp | Ad-libs | Ascending]', transitions:['[Pre-Hook | Smooth Build]','[Post-Hook | Instrumental Breath]'], delivery:'Add [Falsetto] on high runs. Add [Ad-libs] throughout chorus (mark with parentheses). Use [Spoken] for bridge confessional lines.' },
  rock:       { verse:'[Verse | Gritty | Mid-Energy]', chorus:'[Chorus | Explosive | Power Chords | Cathartic]', bridge:'[Bridge | Breakdown | Raw]', outro:'[Outro | Heavy | Fade Out]', transitions:['[Intro | Guitar Riff]','[Pre-Chorus | Building Tension]','[Guitar Solo | Melodic]'], delivery:'Use [Screamed] on peak chorus lines. Use [Spoken] for bridge monologue moments. Mark gang vocals as [Crowd Sing-Along] on final chorus.' },
  country:    { verse:'[Verse | Storytelling | Conversational | Warm]', chorus:'[Chorus | Anthemic | Heartfelt | Full Band]', bridge:'[Bridge | Darkest Moment | Confessional]', outro:'[Outro | Reprise | Quiet Resolution]', transitions:['[Intro | Guitar Lick]','[Pre-Chorus | Emotional Setup]','[Steel Guitar Break]'], delivery:'Use [Spoken] for the most personal bridge lines. Add [Harmony] on the final chorus. Mark pedal steel moments as [Steel Guitar Breath] between sections.' },
  edm:        { verse:'[Verse | Low Energy | Atmospheric]', chorus:'[Drop | Maximum Energy | Bass Heavy | Euphoric]', bridge:'[Break | Atmospheric | Rebuilding]', outro:'[Outro | Gradual Fade | Atmospheric]', transitions:['[Intro | Atmospheric Build | 16 bars]','[Pre-Drop | Tension Build | Rising]','[Build Up | Tension | 8 bars]'], delivery:'Use [Spoken] or [Whispered] for any vocal lines in the drop. Mark the pre-drop as [Pre-Drop | Tension Build]. The drop itself replaces the traditional chorus.' },
  jazz:       { verse:'[Verse | Intimate | Swung | Close-Mic]', chorus:'[Chorus | Declaration | Warm | Soulful]', bridge:'[Bridge | Emotional Peak | Harmonic Tension]', outro:'[Outro | Scat | Fading]', transitions:['[Intro | Piano Intro | Cool]','[Jazz Solo | Melodic Improvisation]','[Bass Walk | Transition]'], delivery:'Use [Scat] for the outro vocal improvisation. Mark jazz fills as [Jazz Break | 4 bars]. Use [Spoken | Intimate] for reflective bridge lines.' },
  blues:      { verse:'[Verse | Storytelling | Call-Response | 12-bar]', chorus:'[Chorus | Declaration | Emotional Release]', bridge:'[Bridge | Guitar-Led | Confessional]', outro:'[Outro | Slow Burn | Fade]', transitions:['[Intro | Guitar Lick | Slow]','[Guitar Solo | Crying | Expressive]','[Harmonica Break]'], delivery:'Use [Spoken] for verse storytelling asides. Mark the turnaround as [Turnaround | Guitar]. Use [Wail] on the most emotionally intense lines.' },
  folk:       { verse:'[Verse | Intimate | Fingerpicked | Sparse]', chorus:'[Chorus | Communal | Singable | Warm]', bridge:'[Bridge | Acoustic | Confessional]', outro:'[Outro | Quiet | Resolution]', transitions:['[Intro | Fingerpicked Guitar]','[Instrumental Break | Acoustic]'], delivery:'Use [Whispered] for the most intimate verse lines. Use [Harmony] on the chorus — folk invites group singing. Mark fiddle moments as [Fiddle Break].' },
  metal:      { verse:'[Verse | Aggressive | Tight | Riff-Led]', chorus:'[Chorus | Maximum | Cathartic | Anthemic]', bridge:'[Bridge | Breakdown | Half-Time | Heavy]', outro:'[Outro | Heavy | Fade | Crushing]', transitions:['[Intro | Heavy Riff | Drop-Tuned]','[Pre-Chorus | Building Chaos]','[Guitar Solo | Shredding | Technical]','[Breakdown | Mosh Pit | Half-Time]'], delivery:'Use [Screamed] for verse lines. Use [Clean Vocals] for chorus contrast. Mark breakdowns explicitly as [Breakdown | Half-Time Feel | 8 bars].' },
  reggae:     { verse:'[Verse | Conscious | Laid-Back | One-Drop]', chorus:'[Chorus | Anthemic | Uplifting | Singable]', bridge:'[Bridge | Dub | Atmospheric | Floating]', outro:'[Outro | Dub Vamp | Fading | Echo]', transitions:['[Intro | Riddim | One-Drop]','[Dub Break | Echo | Atmospheric]','[Bass Drop | Riddim]'], delivery:'Use [Spoken | Conscious] for spoken-word bridge lines. Mark the dub section as [Dub Break | Echoing | 8 bars]. Chorus should feel communal — add [Group Vocals].' },
  funk:       { verse:'[Verse | Groove-Led | Pocket | Syncopated]', chorus:'[Chorus | Euphoric | Full-Band | Tight]', bridge:'[Bridge | Breakdown | Bass-Heavy]', outro:'[Outro Vamp | Groove | Ad-libs | Fading]', transitions:['[Intro | Funk Groove | 8 bars]','[Horn Break | Punchy]','[Bass Solo | Funky]'], delivery:'Add [Ad-libs] throughout. Use [Falsetto] on funk screams and fills. Mark horn stabs in brackets: [Horn Stab | Accent]. The outro vamp is essential — mark it [Outro Vamp | Repeat and Fade].' },
  soul:       { verse:'[Verse | Testimony | Intimate | Gospel-Inflected]', chorus:'[Chorus | Declaration | Emotional Peak | Full]', bridge:'[Bridge | Darkest Moment | Raw | Confessional]', outro:'[Outro Vamp | Ascending | Ad-libs]', transitions:['[Pre-Chorus | Building]','[Instrumental Break | Soulful]'], delivery:'Use [Falsetto] on soaring lines. Use [Spoken] for bridge confessionals. Mark call-and-response in the outro: [Call] line then [Response] line.' },
  latin:      { verse:'[Verse | Narrative | Rhythmic | Conversational]', chorus:'[Chorus | Celebratory | Dance | Anthemic]', bridge:'[Bridge | Romantic | Intense | Passionate]', outro:'[Outro | Montuno | Fading | Dance]', transitions:['[Intro | Percussion Intro]','[Coro | Call and Response | Repeated]','[Instrumental Solo | Latin]'], delivery:'Mark the coro (chorus hook) as [Coro | Singable | Repeated]. Use [Percussion Break] between sections. Add [Spoken | Passionate] for bridge lines.' },
  electronic: { verse:'[Verse | Low Energy | Atmospheric | Melodic]', chorus:'[Chorus | Electronic | Synth-Led | Euphoric]', bridge:'[Bridge | Deconstructed | Minimal | Floating]', outro:'[Outro | Fading | Atmospheric]', transitions:['[Intro | Synth Pad | Evolving]','[Pre-Chorus | Rising | Filter Sweep]','[Synth Drop | Textural]'], delivery:'Use [Whispered] or [Vocoded] for processed vocal moments. Mark synth solos as [Synth Solo | Melodic]. Use [Atmospheric Break] for textural interludes.' },
  indie:      { verse:'[Verse | Intimate | Lo-Fi | Conversational]', chorus:'[Chorus | Anthemic | Jangly | Cathartic]', bridge:'[Bridge | Quiet | Reflective | Unexpected]', outro:'[Outro | Fading | Bittersweet]', transitions:['[Intro | Guitar Intro | Textured]','[Pre-Chorus | Building]','[Instrumental Break | Lo-Fi]'], delivery:'Use [Spoken] for the most confessional bridge lines. Use [Falsetto] on emotional peaks. Mark lo-fi texture moments as [Texture | Atmospheric].' },
  classical:  { verse:'[Movement I | Exposition | Thematic]', chorus:'[Refrain | Orchestral | Climactic]', bridge:'[Development | Tension | Harmonic Exploration]', outro:'[Coda | Resolution | Fading]', transitions:['[Intro | Orchestral | Stately]','[Interlude | Chamber | Intimate]'], delivery:'Use [Solo | Melodic] for lead instrument passages. Mark dynamic shifts: [Fortissimo] for climax, [Pianissimo] for intimate moments. Use [Fermata] on held resolution notes.' },
  neosoul:    { verse:'[Verse | Groove-Led | Conversational | Space]', chorus:'[Chorus | Soulful | Declaration | Full]', bridge:'[Bridge | Half-Time | Darkest Moment | Confessional]', outro:'[Outro Vamp | Escalating | Ad-libs | Free]', transitions:['[Intro | Instrumental | Groove Sets First]','[Instrumental Break | Dilla Feel]'], delivery:'Use [Falsetto] on high runs. Add [Ad-libs] with (parentheses) throughout chorus. Use [Spoken | Intimate] for bridge. The outro vamp must be marked [Outro Vamp | Escalating] — it is the most important section.' },
  gospel:     { verse:'[Verse | Testimony | Lead Vocal | Intimate]', chorus:'[Chorus | Declaration | Call and Response | Mass Choir]', bridge:'[Bridge | Shout Moment | Vamp | Climax]', outro:'[Outro Vamp | Praise | Ascending | Full Choir]', transitions:['[Pre-Chorus | Testimony Rising]','[Vamp | Repeat and Escalate]'], delivery:'Mark call-and-response: Lead line then [Response | Congregation]. Use [Shout] for the most explosive bridge moments. The outro vamp is sacred — mark every escalating line [Escalating Vamp].' },
  reggaeton:  { verse:'[Verse | Dembow | Narrative | Rhythmic]', chorus:'[Chorus | Perreo | Anthemic | Dance]', bridge:'[Bridge | Romantic | Intense | Trap-Influenced]', outro:'[Outro | Dembow Vamp | Fading]', transitions:['[Intro | Dembow Beat | 8 bars]','[Pre-Chorus | Rising | Anticipation]','[Breakdown | Dembow | Half-Time]'], delivery:'Use [Spoken | Seductive] for intimate bridge lines. Mark the dembow rhythm sections as [Dembow | High Energy]. Use [Ad-libs] in parentheses throughout. The chorus should feel like a dance floor moment — mark it [Perreo | Maximum Energy].' },
  ss:         { verse:'[Verse | Fingerpicked | Intimate | Diary-Entry]', chorus:'[Chorus | Emotional Release | Singable | Warm]', bridge:'[Bridge | Confessional | Sparse | Just Guitar]', outro:'[Outro | Quiet Resolution | Fingerpicked]', transitions:['[Intro | Fingerpicked Guitar | Solo]','[Instrumental Break | Intimate | Acoustic]'], delivery:'Use [Whispered] on the most confessional lines — the ones that feel almost too personal to sing. Use [Spoken] for bridge monologue moments. Silence between phrases is as important as the notes — mark space with [Breath | Pause]. Outro should dissolve naturally.' },
  altrock:    { verse:'[Verse | Jangly | Textured | Introspective]', chorus:'[Chorus | Cathartic | Anthemic | Distorted]', bridge:'[Bridge | Quiet | Unexpected Turn | Lo-Fi]', outro:'[Outro | Noise | Fading | Feedback]', transitions:['[Intro | Guitar Texture | Evolving]','[Pre-Chorus | Building Unease]','[Guitar Solo | Melodic | Expressive]','[Breakdown | Sparse | Quiet]'], delivery:'Use [Spoken] for the most vulnerable bridge lines. Use [Shouted] for the emotional peak of the final chorus. Mark feedback and noise moments as [Feedback | Atmospheric]. The outro should feel unresolved and fading — mark it [Outro | Noise Fading].' },
  afrobeats:  { verse:'[Verse | Narrative | Afro-Rhythmic | Conversational]', chorus:'[Chorus | Celebratory | Dance | Call and Response]', bridge:'[Bridge | Romantic | Highlife Influence | Melodic]', outro:'[Outro | Groove Vamp | Ad-libs | Fading]', transitions:['[Intro | Percussion Intro | Afro Groove]','[Pre-Chorus | Rising | Anticipation]','[Afrobeats Break | Percussion | 8 bars]'], delivery:'Use [Ad-libs] throughout — Afrobeats thrives on vocal improvisation. Mark call-and-response sections: [Call] then [Response]. Use [Spoken | Conversational] for narrative asides. The groove never stops — mark transitions as [Groove Continues | Percussion].' },
  kpop:       { verse:'[Verse | Sleek | Choreography-Ready | Cool]', chorus:'[Chorus | Massive | Melodic Peak | Anthemic]', bridge:'[Bridge | Rap Section | Intense | Shift]', outro:'[Outro | Cool Down | Melodic | Fade]', transitions:['[Intro | Instrumental Hook | 8 bars]','[Pre-Chorus | Rising | Filter Build]','[Post-Chorus | Hook Reinforcement | Dance Break]','[Rap Verse | Punchy | High Energy]'], delivery:'K-Pop uses layered delivery — mark the main vocal as [Lead Vocal] and harmonies as [Vocal Stack | Layered]. Use [Rap | Punchy] for rap sections. The post-chorus dance break is essential — mark it [Dance Break | Instrumental | 8 bars]. Use [Falsetto] on high melodic peaks.' },
  punk:       { verse:'[Verse | Aggressive | Fast | Raw]', chorus:'[Chorus | Maximum | Anthemic | Gang Vocals]', bridge:'[Bridge | Breakdown | Half-Time | Spoken]', outro:'[Outro | Feedback | Abrupt End]', transitions:['[Intro | Power Chords | Fast | 4 bars]','[Pre-Chorus | Building Aggression]','[Breakdown | Slow | Heavy | 4 bars]'], delivery:'Use [Shouted] on all verse lines — punk is yelled, not sung. Use [Gang Vocals] on the chorus — everyone sings together. Use [Spoken | Angry] for bridge monologue. Mark the ending as [Abrupt End] — punk songs often cut off hard. No fade outs.' },
  children:   { verse:'[Verse | Teaching | Playful | Singable]', chorus:'[Chorus | Singalong | Motion Cues | Joyful]', bridge:'[Bridge | Ask a Question | Wonder | Interactive]', outro:'[Outro | Repeat Together | Gentle | Resolution]', transitions:['[Intro | Playful Instrumental]','[Clap Break | Rhythmic | Fun]','[Call and Response | Simple]'], delivery:'Use [All Together] to signal group participation moments. Mark motion cues inline: [Clap Here], [Stomp Here], [Jump Here]. Use [Whispered | Gentle] for lullaby sections. Keep delivery tags simple — children respond to clear, consistent signals.' },
  parody:     { verse:'[Verse | Sincere Delivery | Absurd Content | Straight-Faced]', chorus:'[Chorus | Comedic Payoff | Maximum Commitment | Catchy]', bridge:'[Bridge | Escalation | Most Unhinged Moment]', outro:'[Outro | Callback | Final Punchline]', transitions:['[Pre-Chorus | Tension Build | Serious Face]','[Instrumental Break | Genre-Authentic]'], delivery:'The music must be COMPLETELY sincere — [Sincere | No Winking]. Comedy lives in lyrics only. Use [Spoken | Deadpan] for the most absurd bridge lines. The final line of the song is the biggest punchline — mark it [Punchline | Final Line].' },
  comedy:     { verse:'[Verse | Setup | Premise Established | Conversational]', chorus:'[Chorus | Comedic Hook | Maximum Funny | Catchy]', bridge:'[Bridge | Darkest Point | Most Unhinged | Escalation]', outro:'[Outro | Final Punchline | Payoff | Callback]', transitions:['[Pre-Chorus | Tension | Stakes Rising]','[Instrumental Break | Comedic Timing]'], delivery:'Use [Spoken | Deadpan] for setup lines. Use [Shouted | Committed] for the chorus punchlines. Mark the callback in the outro as [Callback | Punchline Payoff]. The final line of the entire song is THE punchline — mark it [Final Punchline | Song Ends Here].' },
  tvmusical:  { verse:'[Verse | Character Voice | Dramatic | Scene-Setting]', chorus:'[Chorus | Belted | Emotional Peak | Theatrical]', bridge:'[Bridge | Darkest Moment | Turning Point | Intimate]', outro:'[Outro | Resolution | Reprise Melody | Curtain]', transitions:['[Intro | Orchestral Swell | Cinematic]','[Pre-Chorus | Tension Build | Dramatic]','[Underscore | Dialogue Ready]'], delivery:'Use [Belted] for the biggest theatrical moments. Use [Spoken | In Character] for dialogue-adjacent lines. Mark the dramatic turning point as [Turning Point | Key Change | Climax]. TV themes get [Theme Sting] at the end. Jingles get [Product Name | Sung | Catchy] on every chorus.' },
};

const SUBSTYLE_BRACKETS={
  'G-Funk':            { verse:'[16-bar Verse | Laid-Back | West Coast]', hook:'[Hook | Sung | Smooth | Nate Dogg style]', extra:['[Synth Whine Break]','[Outro Vamp]'] },
  'Bay Area':          { verse:'[16-bar Verse | Hyphy | High Energy]',   hook:'[Hook | Hyphy | Call and Response | Crowd]', extra:['[Ghost Ride Break]','[Outro | Ad-libs]'] },
  'Down South':        { verse:'[16-bar Verse | Southern Drawl]',         hook:'[Hook | Southern | Chant | Slow]',           extra:['[Trunk Music Break]','[Outro Vamp]'] },
  'Crunk':             { verse:'[8-bar Verse | Rapid | Punchy]',          hook:'[Hook | Screamed | Call and Response | Crunk]', extra:['[Crunk Break]','[Crowd Chant]'] },
  'Chopped & Screwed': { verse:'[16-bar Verse | Chopped | Slowed]',       hook:'[Hook | Chopped | Syrupy | Slow]',            extra:['[Screwed Break]','[Chopped Ad-libs]'] },
  'Trap':              { verse:'[12-bar Verse | Trap | Rap Verse]',        hook:'[Hook | Melodic | Auto-Tune]',               extra:['[Trap Break]','[Outro | Fade-Out]'] },
  'Boom Bap':          { verse:'[16-bar Verse | Boom Bap | Dense]',       hook:'[Hook | Rapped | Chanted]',                  extra:['[Boom Bap Break]','[Outro]'] },
  'Melodic Rap':       { verse:'[16-bar Verse | Rap Verse | Melodic]',    hook:'[Hook | Sung | Melodic | Auto-Tune]',        extra:['[Bridge | Sung]','[Outro | Fade-Out]'] },
  'Drill':             { verse:'[16-bar Verse | Drill | Dark]',            hook:'[Hook | Melodic | Dark | Drill]',            extra:['[Drill Break]','[Outro]'] },
  'East Coast':        { verse:'[16-bar Verse | Boom Bap | Lyrical]',     hook:'[Hook | Chanted | Anthemic]',                extra:['[Boom Bap Break]','[Outro]'] },
  'Midwest':           { verse:'[16-bar Verse | Soulful | Rap Verse]',    hook:'[Hook | Sung | Soul | Chipmunk]',            extra:['[Soul Break]','[Outro Vamp]'] },
  'Cloud Rap':         { verse:'[16-bar Verse | Hazy | Slow Flow]',       hook:'[Hook | Ethereal | Whispered | Melodic]',    extra:['[Ambient Break]','[Outro | Fade-Out]'] },
  'Lyrical/Conscious': { verse:'[16-bar Verse | Lyrical | Dense]',        hook:'[Hook | Chanted | Anthemic | Conscious]',    extra:['[Spoken Word Bridge]','[Outro]'] },
  'Old School':        { verse:'[16-bar Verse | Old School | Boom Bap]',  hook:'[Hook | Rapped | Classic]',                  extra:['[Scratch Break]','[Outro]'] },
  // Neo-Soul
  'Classic Neo-Soul':  { verse:'[Verse | Groove-Led | Conversational]',     hook:'[Chorus | Soulful | Declaration]',          extra:['[Outro Vamp | Escalating Ad-libs]','[Bridge | Half-Time Feel]'] },
  'Hip-Hop Neo-Soul':  { verse:'[Verse | Rap-Soul | Dilla Feel]',            hook:'[Chorus | Sung | Soul]',                    extra:['[Rap Bridge | Bars]','[Outro Vamp]'] },
  'Neo-Soul Ballad':   { verse:'[Verse | Intimate | Space-Between-Lines]',   hook:'[Chorus | Emotional Peak | Runs]',          extra:['[Bridge | Darkest Point]','[Outro Vamp | Vocal Improvisation]'] },
  'Psychedelic Soul':  { verse:'[Verse | Cosmic | Layered]',                 hook:'[Chorus | Transcendent | Soulful]',         extra:['[Psychedelic Break | Textures]','[Outro Vamp | Hypnotic]'] },
  // Gospel
  'Traditional Gospel':{ verse:'[Verse | Testimony | Lead Vocal]',           hook:'[Chorus | Declaration | Call and Response]',extra:['[Bridge | Shout Moment | Vamp]','[Outro Vamp | Choir]'] },
  'Contemporary Gospel':{ verse:'[Verse | Testimony | Modern]',              hook:'[Chorus | Celebratory | Mass Choir]',       extra:['[Bridge | Vamp | Repeat and Escalate]','[Outro | Full Choir]'] },
  'Worship / CCM':     { verse:'[Verse | Intimate | Setup]',                 hook:'[Chorus | Congregational | Singable]',      extra:['[Bridge | Highest Moment | Repeat]','[Outro | Worship Vamp]'] },
  'Gospel Hip-Hop':    { verse:'[16-bar Verse | Rap | Testimony]',           hook:'[Hook | Gospel | Celebratory]',             extra:['[Bridge | Spiritual Peak]','[Outro | Praise Vamp]'] },
  // Children
  'Singalong / Playful':{ verse:'[Verse | Teaching | Playful]',              hook:'[Chorus | Singalong | Motion Cues]',        extra:['[Clap Break]','[Outro | Repeat Chorus Together]'] },
  'Educational':       { verse:'[Verse | Discovery | Wonder]',               hook:'[Chorus | Remember This | Simple]',         extra:['[Bridge | Ask a Question]','[Outro | Recap]'] },
  'Lullaby / Bedtime': { verse:'[Verse | Soft | Safe | Descending Melody]',  hook:'[Chorus | Gentle | Soothing | Love]',       extra:['[Bridge | Quieter]','[Outro | Drift | Fade]'] },
  'Silly / Nonsense':  { verse:'[Verse | Absurd | Committed | Straight-Face]',hook:'[Chorus | Maximum Silly | Repeat]',        extra:['[Bridge | Even Sillier]','[Outro | Nonsense Vamp]'] },
  // Parody
  'Genre Parody':      { verse:'[Verse | Mirror Original Genre]',          hook:'[Chorus | Comedic Payoff | Sincere Delivery]', extra:['[Bridge | Escalation]','[Outro | Callback]'] },
  'Pop Parody':        { verse:'[Verse | Upbeat | Absurd Subject]',         hook:'[Chorus | Catchy | Ridiculous]',              extra:['[Pre-Chorus | Tension Build]','[Bridge | Subvert]'] },
  'Rap Parody':        { verse:'[16-bar Verse | Rap Flow | Deflating Topic]', hook:'[Hook | Rapped | Anti-Climactic]',          extra:['[Rap Break | Commitment Bit]','[Outro | Punchline]'] },
  'Ballad Parody':     { verse:'[Verse | Restrained | Setup Trivial Topic]', hook:'[Chorus | Epic | Overdramatic | Trivial]',  extra:['[Pre-Chorus | Tension]','[Bridge | Darkest Version | Climax]'] },
  // Comedy
  'Absurdist':         { verse:'[Verse | Straight-Faced | Absurd Logic]',   hook:'[Chorus | Committed | Ridiculous Premise]',  extra:['[Bridge | Escalation | Unhinged]','[Outro | Dream Logic]'] },
  'Dark Comedy':       { verse:'[Verse | Upbeat | Dark Subject]',           hook:'[Chorus | Cheerful | Uncomfortable Truth]',  extra:['[Bridge | Darkest Point]','[Outro | Casual Resolution]'] },
  'Satirical':         { verse:'[Verse | Exaggerated | Target Established]', hook:'[Chorus | Satirical | Repeated Accusation]',extra:['[Bridge | Killing Blow]','[Outro | Ironic]'] },
  'Observational':     { verse:'[Verse | Conversational | Relatable]',      hook:'[Chorus | Universal Frustration | Catchy]',  extra:['[Bridge | Specific Detail]','[Outro | Acceptance]'] },
  'Musical Roast':     { verse:'[Verse | Setup Target]',                    hook:'[Chorus | Roast | Repeated Charge]',         extra:['[Bridge | Killing Blow]','[Outro | Final Joke]'] },
  // TV / Musical
  'TV Theme':          { verse:'[Intro | Premise Setup]',                   hook:'[Theme Hook | Show Title | Catchy]',         extra:['[Instrumental Tag]','[Outro Sting]'] },
  'Broadway / Show Tune': { verse:'[Verse | Character Voice | Dramatic]',  hook:'[Chorus | Belted | Emotional Peak]',         extra:['[Pre-Chorus | Tension Build]','[Bridge | Darkest Moment | Turning Point]'] },
  'Disney-Style':      { verse:'[Verse | Wonder | I Want Song]',            hook:'[Chorus | Magical | Soaring | Big Dream]',   extra:['[Pre-Chorus | World Responds]','[Bridge | Dark Moment | Hope]'] },
  'Jingle / Ad':       { verse:'[Verse | Problem | Pain Point]',            hook:'[Chorus | Product Name | Benefit | Catchy]', extra:['[Instrumental Tag]','[Outro | Call to Action]'] },
  'Sitcom Theme':      { verse:'[Intro | Premise | Warm]',                  hook:'[Theme Hook | Show World | Inviting]',       extra:['[Instrumental Break]','[Tag | Laugh Track Ready]'] },
  'Prestige Drama Theme': { verse:'[Intro | Atmosphere | Stakes]',          hook:'[Theme | Melancholic | Foreboding]',         extra:['[Instrumental Swell]','[Outro | Fade]'] },
};


// ═══════════════════════════════════════════════════════
// PROMPT BUILDERS
// ═══════════════════════════════════════════════════════

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function bracketInstructionServer(genre, mode, substyle) {
  mode = mode || 'suno';
  const sb = SUBSTYLE_BRACKETS[substyle];   // substyle-specific (hiphop substyles, etc.)
  const gb = GENRE_SUNO_BRACKETS[genre];    // genre-level blueprint

  if (mode === 'none') {
    return 'SECTION TAGS: Write the lyrics with absolutely NO section labels, headers, or brackets of any kind. Pure lyric lines only.';
  }

  if (mode === 'basic') {
    if (sb) return `SECTION TAGS: Use these brackets for sections. Verse: ${sb.verse}. Hook/Chorus: ${sb.hook}. Include bridge and outro.`;
    if (gb) return `SECTION TAGS: Use these exact brackets. Verse: ${gb.verse}. Chorus: ${gb.chorus}. Bridge: ${gb.bridge}. Outro: ${gb.outro}. Every section MUST start with its bracket tag on its own line.`;
    return 'SECTION TAGS: Every section MUST start with its bracket tag on its own line — e.g. [Verse 1] then the lines, [Chorus] then the lines, [Bridge] then the lines.';
  }

  if (mode === 'enhanced') {
    if (sb) return `SECTION TAGS: Enhanced brackets. Verse: ${sb.verse}. Hook: ${sb.hook}. Extra transitions: ${sb.extra ? sb.extra.join(', ') : ''}. Add energy/mood markers to each bracket.`;
    if (gb) return `SECTION TAGS: Enhanced brackets with mood/energy markers. Verse: ${gb.verse}. Chorus: ${gb.chorus}. Bridge: ${gb.bridge}. Outro: ${gb.outro}. Include these transitions between sections: ${gb.transitions.join(', ')}. Add energy levels to each section bracket.`;
    return 'SECTION TAGS: Use enhanced brackets with mood/energy markers: [Verse 1 | Intimate], [Pre-Chorus | Building], [Chorus | Explosive], [Bridge | Reflective], [Outro | Resolving].';
  }

  if (mode === 'suno') {
    // The optimal Suno mode — genre blueprints + inline vocal delivery tags + transitions
    if (sb) {
      return `SUNO-OPTIMIZED BRACKETS: Use these section brackets. Verse: ${sb.verse}. Hook/Chorus: ${sb.hook}. Include transitions: ${sb.extra ? sb.extra.join(', ') : ''}. INLINE DELIVERY TAGS: Place [Whispered], [Falsetto], [Screamed], [Spoken], [Ad-libs], or [Rap] on their own line immediately before any lyric line that requires that delivery. These tell Suno exactly how to perform that specific line. Every section MUST open with its bracket tag on its own line.`;
    }
    if (gb) {
      return `SUNO-OPTIMIZED BRACKETS — apply all of these to maximize Suno's output quality:

SECTION BRACKETS (every section opens with one of these on its own line):
• Verse: ${gb.verse}
• Chorus: ${gb.chorus}
• Bridge: ${gb.bridge}
• Outro: ${gb.outro}
• Transitions to place between sections: ${gb.transitions.join(' | ')}

INLINE DELIVERY TAGS (place on their own line immediately before any lyric line needing special delivery):
[Whispered] — intimate, close-mic, breath-heavy lines
[Falsetto] — high sustained or soaring notes
[Spoken] — spoken word, confessional, or monologue lines
[Ad-libs] — free vocal riffs and fills (mark with parentheses inline too)
[Screamed] — maximum intensity lines (rock/metal/gospel)
[Harmony] — layered vocal harmony section
[Half-Time] — sudden weight, tempo halves under the same vocal
[Chanted] — collective power, group cadence, anthem energy
[Wail] — raw extended emotional release
[A Cappella] — stripped truth, voice alone, instruments drop out

BRIDGE DELIVERY RULE — never default to [Spoken]. The bridge is the emotional peak or sharpest contrast in the song. Choose deliberately:
[Falsetto] = soaring vulnerability · [Whispered] = intimate confession · [Harmony] = layered depth · [Screamed] = cathartic release · [Chanted] = collective power · [A Cappella] = stripped truth · [Half-Time] = sudden weight · [Wail] = raw emotion
Use [Spoken] ONLY when the lyric is literally spoken dialogue — not sung, not felt, literally said aloud.

${gb.delivery}

ENERGY ARC: The verse should feel noticeably lower energy than the chorus. The bridge should feel like a completely different world — more vulnerable or more intense. The outro should feel like release after the final chorus peak.`;
    }
    return `SUNO-OPTIMIZED BRACKETS: Use section brackets with mood markers on every section: [Verse 1 | Intimate | 4/10], [Pre-Chorus | Building | 6/10], [Chorus | Full Production | 9/10], [Bridge | Stripped | 5/10], [Final Chorus | Maximum | 10/10]. Add inline delivery tags [Whispered], [Falsetto], [Spoken] on their own line before any line requiring special vocal delivery.`;
  }

  if (mode === 'experimental') {
    if (sb) return `SECTION TAGS: Full meta-brackets. Verse: ${sb.verse}. Hook: ${sb.hook}. Extra: ${sb.extra ? sb.extra.join(', ') : ''}. Add production, energy, mood meta-tags to every section.`;
    if (gb) return `META-BRACKETS — full production direction baked into every bracket. Verse: ${gb.verse} | energy 3-4/10. Chorus: ${gb.chorus} | energy 8-10/10. Bridge: ${gb.bridge} | energy 5/10. Outro: ${gb.outro}. Transitions: ${gb.transitions.join(', ')}. Inline tags: ${gb.delivery}. Add BPM feel, instrument cues, and energy level to EVERY bracket.`;
    return 'SECTION TAGS: Meta-brackets with full production direction: [Verse 1 | Sparse | Intimate | 4/10 energy], [Pre-Chorus | Building | Tension | 6/10], [Chorus | Full Production | Euphoric | 9/10], [Bridge | Stripped | Raw | 5/10], [Final Chorus | Maximum | 10/10].';
  }

  return 'SECTION TAGS: Every section MUST start with its bracket tag on its own line.';
}

function sanitizeInput(str, maxLen = 300) {
  if (typeof str !== 'string') return '';
  return str.slice(0, maxLen).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

// ─── AGE GROUPS ────────────────────────────────────────────────────────────
const AGE_GROUPS = {
  'toddler': {
    label: 'Toddlers (1–4)',
    vocab: 'Extremely simple 1–2 syllable words only. Single-concept sentences. Colors, animals, body parts, family members.',
    themes: 'Colors, animals, simple objects, family love, bedtime, bath time, peek-a-boo, clapping games.',
    structure: 'Ultra-short sections (4–8 lines max). Heavy repetition — repeat the hook 4–6 times. Call-and-response encouraged.',
    rules: 'No complex narrative. Pure sensory and physical experience. Motion cues (clap, stomp, spin) are essential. Melody range max 5 notes.',
    genreMap: 'children',
    sunoHint: 'children\'s song, ukulele, hand claps, xylophone, playful, major key, bright, 110 BPM, joyful, singalong'
  },
  'kids': {
    label: 'Kids (5–8)',
    vocab: 'Simple clear vocabulary, max 2–3 syllable words. Short sentences. Rhymes are fun, not forced.',
    themes: 'School, friendship, animals, adventures, imagination, nature, kindness, family, being brave, small everyday discoveries.',
    structure: 'Short verse-chorus. Chorus 3–4× minimum. Bridge optional. Total length 2–3 min.',
    rules: 'Teach without preaching. Humor and wordplay welcome. Motion cues (clap, jump, spin). Avoid scary or adult themes.',
    genreMap: 'children',
    sunoHint: 'children\'s pop, upbeat, acoustic guitar, glockenspiel, hand claps, singalong, educational, joyful, 115 BPM'
  },
  'tween': {
    label: 'Tweens (9–12)',
    vocab: 'Age-appropriate modern vocabulary. Relatable school/social themes. Avoid adult sexuality or violence.',
    themes: 'School, friends, fitting in, first crushes (innocent), sports, games, family, pets, growing up, being yourself.',
    structure: 'Standard pop structure. V-PC-C × 2 with bridge. 2.5–3.5 min.',
    rules: 'Emotionally relatable without being adult. Aspirational. Fun over edgy. No explicit content.',
    genreMap: null,
    sunoHint: 'kids pop, bright, energetic, modern production, fun, relatable, school-age themes'
  },
  'teen': {
    label: 'Teens (13–17)',
    vocab: 'Contemporary teen language, current slang (but not over-dated). Emotionally direct.',
    themes: 'Identity, social pressure, first love, heartbreak (non-explicit), friendship loyalty, dreams, self-expression, social media, school stress.',
    structure: 'Modern pop/hip-hop structure. Short punchy verses. Hooky chorus. May include pre-chorus.',
    rules: 'Authentic emotional truth without explicit content. Self-empowerment themes resonate. Avoid condescension.',
    genreMap: null,
    sunoHint: null
  },
  'young-adult': {
    label: 'Young Adults (18–24)',
    vocab: 'No restrictions. Contemporary, culturally current.',
    themes: 'Independence, career beginnings, new relationships, heartbreak, late nights, finding yourself, FOMO, ambition.',
    structure: 'Any modern structure. Standard adult song conventions.',
    rules: 'Adult themes acceptable. Authentic to the experience of early independence and self-discovery.',
    genreMap: null,
    sunoHint: null
  },
  'adult': {
    label: 'Adults (25+)',
    vocab: 'No restrictions. Mature, emotionally nuanced.',
    themes: 'Long-term relationships, career, family, nostalgia, loss, legacy, identity, life\'s complexity.',
    structure: 'Any structure. Can be more complex and emotionally layered.',
    rules: 'Adult themes acceptable. Values depth and authenticity over novelty.',
    genreMap: null,
    sunoHint: null
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// BRIDGE ARCHETYPES — Randomised per generation to prevent the same
// 2-4 bar quiet/whisper bridge appearing by default every time.
// Each archetype specifies structure, energy, delivery and lyric approach.
// ═══════════════════════════════════════════════════════════════════════════

const BRIDGE_ARCHETYPES = [
  {
    name: 'Confessional Drop',
    energy: 'low → slow build',
    bars: '4–6',
    delivery: 'Almost spoken — conversational, not sung. No melody, just cadence. Like the artist stopped performing and started talking.',
    lyric: 'One hard truth the song has been circling around but never said. Single sentence per line. No rhyme required — the honesty IS the structure.',
    production: 'Pull everything back: just one instrument (piano, guitar, or sparse pad). Vocal dry with no reverb or delay. Space between lines.',
    rule: 'BRIDGE MUST be the moment the mask comes off. Unpolished. Real. Then the final chorus returns with the full weight of what was just admitted.',
  },
  {
    name: 'Escalation Climb',
    energy: 'mid → peak intensity',
    bars: '8',
    delivery: 'Starts at verse energy, builds line by line to the most intense vocal moment in the song. The bridge IS the climax, not the chorus.',
    lyric: 'Each line raises the stakes of the conflict or emotion. Last 2 lines hit hardest — these are the lines people screenshot. Stack imagery, not narrative.',
    production: 'Drums build every 2 bars. Instrumentation layers in. Final 2 bars: full band, pushed vocal, reverb tail. Explode into final chorus.',
    rule: 'BRIDGE MUST end louder and more urgent than it started. It earns the final chorus release.',
  },
  {
    name: 'Left-Turn Narrative',
    energy: 'different texture — sideways move',
    bars: '6–8',
    delivery: 'Different vocal register or approach than any other section. If verses were sung, bridge could be half-rapped or spoken. Change the instrument.',
    lyric: 'New POV, new timeline, or new character. The bridge is a cut to a scene from the past, a letter, a conversation, or a future projection. Not a continuation — a reframe.',
    production: 'Instrument swap or featured instrument solo takes the melodic lead. Drums might drop completely or switch to half-time. Unexpected key area.',
    rule: 'BRIDGE MUST feel like a different song that makes you understand the original song better when it ends.',
  },
  {
    name: 'Rhythmic Breakdown',
    energy: 'high — groove-locked',
    bars: '4–8',
    delivery: 'Rhythmic, chant-like, almost percussive. Words land on the beat like kicks and snares. Call-and-response optional. Could be a single repeated phrase evolving.',
    lyric: 'Short, punchy lines. 2-5 syllables each. Works on repetition and slight variation — same phrase with one word changed each time. The meaning shifts through the changes.',
    production: 'Drums and bass only, or a single hypnotic instrument loop. Everything else stripped. Let the groove breathe and build tension through rhythm alone.',
    rule: 'BRIDGE MUST be physically infectious — the listener\'s head should nod before their brain processes the words.',
  },
  {
    name: 'Emotional Reversal',
    energy: 'mirror opposite of the chorus',
    bars: '4–6',
    delivery: 'If chorus is soaring and anthemic, bridge is quiet and close. If chorus is dark, bridge finds a thread of hope. The contrast IS the point.',
    lyric: 'Reframe the central metaphor of the song from the opposite direction. If the song is about loss, find what was gained. If it\'s about love, acknowledge the cost. Dual truth.',
    production: 'Harmonic shift — bridge often borrows from the relative major/minor or lands on an unexpected chord that makes the return to chorus feel like resolution.',
    rule: 'BRIDGE MUST make the final chorus sound like it means something different than it did the first time.',
  },
  {
    name: 'Pre-Outro Vamp Build',
    energy: 'medium → cascading',
    bars: '6–8 with repeating tag',
    delivery: 'Last 2 bars of the bridge repeat 2-3 times with slight melodic variation each time. The repetition creates tension that the final chorus releases.',
    lyric: 'Write the bridge as a complete thought, then isolate the last line as the repeating tag. The tag should work both as a question and an answer depending on inflection.',
    production: 'Background vocals enter on repeating tag. Layered harmonies build. Slight BPM push (feels faster without changing tempo) through drum pattern tightening.',
    rule: 'BRIDGE MUST set up the final chorus as the only possible resolution to the tension it builds.',
  },
  {
    name: 'Lyric Callback / Recontextualise',
    energy: 'same energy as verse 1, but heavier',
    bars: '4–6',
    delivery: 'Callbacks land differently once context has built. Deliver familiar lines with new emotional weight — slower, or more fragile, or harder.',
    lyric: 'Take an image or line from verse 1 and return to it — but now the circumstances have changed. Same words, entirely different meaning. The listener should feel the shift.',
    production: 'Mirror the production of verse 1 but stripped down. The familiarity of the instrumentation makes the shifted meaning land harder.',
    rule: 'BRIDGE MUST prove the song was planning this moment from the first bar. Callback creates inevitability.',
  },
  {
    name: 'Spoken Interlude / Monologue',
    energy: 'ambient — static tension',
    bars: '4–8 (flexible)',
    delivery: 'Not sung at all. Spoken directly. Could be a voicemail, a memory, an argument, an internal monologue. Raw voice, minimal or no music under it.',
    lyric: 'Write as prose, not poetry. Irregular line lengths. Real speech rhythms — sentence fragments, self-corrections, trailing thoughts. The only rule: it must be true to the character.',
    production: 'Music fades to near-silence or single sustained note/pad. Possible: ambient sound texture under the voice (rain, static, room tone). Returns with full force on final chorus.',
    rule: 'BRIDGE MUST sound like it was captured, not composed. The listener should lean in.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// OUTRO ARCHETYPES — Prevents the default "fade out over repeating chorus"
// ═══════════════════════════════════════════════════════════════════════════

const OUTRO_ARCHETYPES = [
  { name: 'Cold Stop', rule: 'Song ends on a single word, note, or silence mid-phrase. Abrupt. The absence of resolution IS the ending. No fade — a hard cut that leaves the listener mid-breath.' },
  { name: 'Spiral Vamp', rule: 'Outro takes the hook and slowly deconstructs it — strip instruments one by one, change one word in the hook each repeat, until only voice and one note remain. The song unravels deliberately.' },
  { name: 'Callback Resolution', rule: 'Outro returns to the opening line or image from Verse 1, but now it lands completely differently. The song ends where it began — the journey changed the meaning. No new material.' },
  { name: 'Crowd Takeover', rule: 'Final section hands the song to the audience — melody simplified to its most singable core, lyrics pared to 4-6 words max, energy rises instead of fading. Song ends at its loudest.' },
  { name: 'Dialogue / Spoken Coda', rule: 'After the final chorus, a brief spoken moment (2-4 lines) that steps outside the song — a thought, a question, a confession. Music drops completely or holds one note under it.' },
  { name: 'Harmonic Drift', rule: 'Outro lands on an unresolved chord or half-cadence and holds. Music fades slowly without resolving. The tension is intentional — the story is unresolved and the listener knows it.' },
  { name: 'Counter-Melody Ascent', rule: 'Outro strips the lead vocal and lets the counter-melody (instrument or backing voice) carry the song to its end — it was there all along, now it leads. Main vocal drops to harmonies only.' },
];

// ═══════════════════════════════════════════════════════════════════════════
// VERSE 2 ESCALATION ARCHETYPES — Verse 2 must do more than repeat Verse 1
// ═══════════════════════════════════════════════════════════════════════════

const VERSE2_ARCHETYPES = [
  { name: 'Consequence', rule: 'Verse 2 shows what happened AFTER Verse 1. Same character, later in time, changed circumstances. The hook now means something different because of what verse 2 revealed.' },
  { name: 'The Other Side', rule: 'Verse 2 gives the opposing perspective — different character, contradicting version of events, or the same person arguing against themselves. Creates productive tension.' },
  { name: 'Zoom Out', rule: 'Verse 1 was intimate and personal. Verse 2 zooms out — the personal story becomes universal. Connect the specific situation to something larger: culture, history, the human condition.' },
  { name: 'Deeper Specific', rule: 'Verse 2 goes more specific, not more general. New proper nouns, new sensory details, new micro-moments. The theme is the same but the evidence is richer and more precise.' },
  { name: 'Time Jump', rule: 'Verse 2 is set years earlier or later than Verse 1. The emotional context shifts completely. What the chorus meant before now has a completely different backstory.' },
  { name: 'Antagonist Voice', rule: 'Verse 2 is written from the POV of whoever or whatever is on the other side of the conflict. Not sympathetic — just truthful. The listener has to hold both truths.' },
];

// ═══════════════════════════════════════════════════════════════════════════
// PRE-CHORUS ARCHETYPES — The tension builder before the chorus drop
// Each archetype defines HOW to build anticipation differently
// ═══════════════════════════════════════════════════════════════════════════

const PRE_CHORUS_ARCHETYPES = [
  {
    name: 'Tension Ramp',
    energy: 'low → high (linear climb)',
    bars: '2–4',
    delivery: 'Start at verse energy. Each line slightly louder, slightly more urgent. The final line lands on the most unresolved note of the song — V7 or ♭VII held open. The listener leans forward.',
    lyric: 'Short lines, rising specificity. Each line narrows the focus until the last line is so precise and so loaded that the chorus is the only possible response. No resolution — the pre-chorus is a question.',
    production: 'Drums tighten (ride → hi-hat → open hi-hat). A synth swell or string swell begins at bar 2 and peaks at the last pre-chorus beat. Bass locks with the kick.',
    rule: 'PRE-CHORUS MUST end on maximum unresolved tension. The chorus is not a release — it is an inevitability. The listener should feel pulled forward, not surprised.',
  },
  {
    name: 'Question Drop',
    energy: 'building → hanging open',
    bars: '2–4',
    delivery: 'The entire pre-chorus builds toward a single question — spoken, sung, or left hanging. Delivery rises through the section. The final line rises in pitch (question inflection). Then silence. Then chorus answers.',
    lyric: 'Set up the central unresolved tension of the song as a question. The most specific version of the conflict. Not rhetorical — genuinely unanswered. The chorus IS the answer, whether lyrically explicit or emotional.',
    production: 'Everything pulls back on the final question. One held chord. The silence before the chorus is as loud as the chorus itself. Often: kick drops out on the final question bar.',
    rule: 'PRE-CHORUS MUST make the chorus feel like the answer to a real question. If the chorus does not resolve the pre-chorus question emotionally, rewrite one of them.',
  },
  {
    name: 'Lyric Elevator',
    energy: 'mid → peak (step-by-step)',
    bars: '4',
    delivery: 'Four lines, each more emotionally loaded than the last. Line 1 = observation. Line 2 = feeling. Line 3 = realization. Line 4 = the most exposed line — almost too honest to sing. Then the chorus.',
    lyric: 'Four-rung ladder of emotional escalation. Each line reveals one more layer. By line 4, the emotional core of the song is completely exposed — the chorus is the response to that exposure. Specificity increases every line.',
    production: 'Instrumentation adds one element per rung: guitar → bass → drums → strings. By line 4, the full band is in except the final element that drops on the chorus.',
    rule: 'PRE-CHORUS MUST feel like a controlled emotional unraveling. By the last line the listener knows the most important thing about the character — even if the character hasn\'t said it explicitly yet.',
  },
  {
    name: 'Harmonic Pivot',
    energy: 'tense — unexpected sidestep',
    bars: '2–4',
    delivery: 'Melodic line that moves to a chord or tonal center not heard anywhere else in the song. The harmonic surprise is the tension. Delivery can be restrained — the harmony does the emotional work.',
    lyric: 'The lyric at the moment of the harmonic pivot should match the unexpected turn — the most unusual image in the song, or the most honest admission. The harmony and lyric arrive together as a single surprising move.',
    production: 'The "pivot chord" — ♭VI, iv, or borrowed parallel-key chord — appears here and only here. It makes the V7→I resolution into the chorus feel like coming home from somewhere unexpected.',
    rule: 'PRE-CHORUS MUST contain at least one harmonic element not heard in the verse or chorus. This chord is the emotional fingerprint of the song — the moment the listener\'s ear shifts from expectation to discovery.',
  },
  {
    name: 'Velocity Surge',
    energy: 'same energy as verse → rhythmic acceleration',
    bars: '2–4',
    delivery: 'Lyric density doubles. More syllables per bar. Faster, tighter delivery — as if the thought is outrunning the singer\'s ability to contain it. Triplet feel or double-time approach. The rush IS the emotion.',
    lyric: 'Pack maximum information into minimum space. Short rhymes, internal rhymes, chain-rhyme. The pre-chorus says more per bar than anything else in the song. The urgency is in the compression of language, not the volume.',
    production: 'The rhythm section plays in the pockets — slightly ahead of the beat, pushing forward. Hi-hats open. Bass moves faster. The tempo hasn\'t changed but it FEELS like it has.',
    rule: 'PRE-CHORUS MUST create the sensation that the song is accelerating into the chorus. The listener\'s pulse should quicken from the rhythmic compression alone, before the chorus arrives.',
  },
  {
    name: 'Whisper to Roar',
    energy: 'near-silent → full force (extreme arc)',
    bars: '4',
    delivery: 'Start at the absolute quietest dynamic in the song — whispered, barely audible. Build through the pre-chorus to the biggest single moment before the chorus. The dynamic arc IS the pre-chorus. The contrast makes the chorus explode.',
    lyric: 'Begin with the most private thought in the song — something barely spoken. By the last pre-chorus line, that private thought has become a statement. Same emotional truth, different volume.',
    production: 'Bar 1: voice alone or with single instrument at low volume. Bar 2: add one element. Bar 3: add percussion. Bar 4: full band minus one element that drops on the chorus. The swell must be earned — no cheating by faking it.',
    rule: 'PRE-CHORUS MUST establish the quietest point in the entire song (bar 1) before the song explodes. The contrast multiplies the chorus impact. Do not skip the quiet — it is doing half the work.',
  },
  {
    name: 'Call-Setup',
    energy: 'groove-locked — anticipatory',
    bars: '2–4',
    delivery: 'The pre-chorus is a call waiting for a response. Vocals land on the downbeats, leaving space on the upbeats for an imagined answer. The phrasing is open-ended. The chorus is the response that fills the silence.',
    lyric: 'Write the pre-chorus as a declaration waiting for confirmation, or a plea waiting for permission. Short lines with deliberate spaces between them. The unsaid words in the gaps are as important as the spoken ones.',
    production: 'Rhythm guitar or synth plays the "response" part in the gaps — answers the vocal phrases instrumentally. This creates the call-and-response dynamic before the chorus gives the full vocal answer.',
    rule: 'PRE-CHORUS MUST feel like the first half of a conversation. The chorus completes the conversation. If the chorus could exist without the pre-chorus setup, the pre-chorus isn\'t specific enough.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// POST-CHORUS ARCHETYPES — What happens after the chorus hits
// The "power part" — where the hook lands and breathes
// ═══════════════════════════════════════════════════════════════════════════

const POST_CHORUS_ARCHETYPES = [
  {
    name: 'Breath and Reset',
    energy: 'drops sharply → groove settles',
    bars: '2–4',
    delivery: 'After the chorus explosion, pull almost everything back. Just kick, bass, and maybe a single guitar or synth. Give the listener a second to process what they just heard. Then the verse rebuilds from this stripped foundation.',
    lyric: 'No lyric — or a single ad-lib phrase (one word, one breath, one syllable). The space IS the post-chorus. The silence after a peak is as intentional as the peak itself.',
    production: 'Drop to percussion + bass only, or vocal ad-lib over minimal instrumentation. 2-4 bars. The contrast with the chorus makes the next verse feel deliberate and focused. Drum fill into the verse.',
    rule: 'POST-CHORUS MUST create a real dynamic drop — not a pretend one. The listener should feel the pressure release. This makes the second verse land with new context instead of feeling like repetition.',
  },
  {
    name: 'Hook Echo',
    energy: 'same as chorus but instrumental',
    bars: '2–4',
    delivery: 'The chorus lyric ends but its melody continues — played by an instrument (guitar lead, synth, sax, strings) without words. The melody hangs in the air. The listener is mentally singing the words that aren\'t there.',
    lyric: 'No lyric, or a single hummed or "la la la" repetition of the hook melody. The instrument carries the emotional memory of the chorus lyric without needing words. The listener completes it themselves.',
    production: 'Lead guitar, piano, synth, or melodica plays the exact hook melody at chorus volume, then fades or transitions into the next section. Often harmonized (3rd or 5th) for richness.',
    rule: 'POST-CHORUS MUST be the hook melody without words — proving the melody is powerful enough to carry meaning alone. If the listener doesn\'t hum along during this section, the hook needs more work.',
  },
  {
    name: 'Ad-Lib Showcase',
    energy: 'same groove — vocal peak',
    bars: '2–4',
    delivery: 'Vocalist improvises over the same chord loop as the chorus. Runs, riffs, scatting, emotional sighs, falsetto peaks. The production stays but the vocalist reveals everything they held back in the composed chorus. This is the moment of raw expression.',
    lyric: 'Ad-lib phrases: fragments, emotional exclamations, repeated single syllables. Write them in parentheses: (yeah), (oh lord), (come on). Suggest 2-3 specific ad-lib moments — these are as composed as the lyrics, even if they sound spontaneous.',
    production: 'Background vocals join for harmonies. The main chord loop of the chorus continues unchanged. Just add space and permission for the lead vocal to breathe and explore.',
    rule: 'POST-CHORUS MUST feel like the vocalist just exhaled everything they had been holding back. It is the most emotionally honest moment in the song because it appears unscripted — even when it is carefully composed.',
  },
  {
    name: 'Punchy Counter-Statement',
    energy: 'sharp — single knockout hit',
    bars: '1–2',
    delivery: 'One devastating line or phrase — the comment on everything the chorus just said. Often the most quotable line in the entire song. Delivered with maximum clarity and minimum production behind it. Then the track continues.',
    lyric: 'One line. The post-hook line that makes people rewind. It subverts, confirms, or deepens what the chorus just declared. The chorus makes the statement — the post-hook is the coda that makes it unforgettable. Often a contrast: if the chorus is big, the post-hook is quiet.',
    production: 'Everything drops out except one element for the 1-2 bar line. Then full band resumes. The emptiness makes the single line hit twice as hard. Like a spotlight on one phrase.',
    rule: 'POST-CHORUS MUST land the single most quotable phrase in the song. If the chorus is the argument, the post-hook is the closing line that wins it. If you can\'t identify this line, the section isn\'t specific enough.',
  },
  {
    name: 'Drop Groove',
    energy: 'no harmony — pure rhythm',
    bars: '2–4',
    delivery: 'All chord instruments drop out. Bass + drums only (or percussion only). The groove is exposed — just the rhythm, no harmony hiding it. Then the next section re-enters over this stripped rhythmic foundation.',
    lyric: 'No lyric — or a rhythmic chant (2-3 syllables, percussion-like). The groove is the content. The listener\'s body takes over from their brain. This is the most physical moment in the song.',
    production: 'Hard cut from full chorus to bass + drums only. No guitar, no synth, no keys. Just the pocket. After 2-4 bars, the instrumentation re-enters. Works in every genre: EDM drop, funk breakdown, trap bass drop, reggae riddim strip.',
    rule: 'POST-CHORUS MUST strip all harmony for at least 2 full bars. The rawness of the exposed rhythm makes everything that follows it feel more powerful. The groove is the hook.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// HOOK STRUCTURE NOTES — Structural hook archetypes (separate from delivery)
// These define HOW the hook is shaped, not how it is delivered
// ═══════════════════════════════════════════════════════════════════════════

const HOOK_STRUCTURE_NOTES = {
  'auto': '',
  'Ladder Hook':     'HOOK STRUCTURE — Ladder: Hook builds line by line toward the payoff. Each line is one rung higher emotionally. The final line is the thesis — the most memorable phrase in the song. Setup → escalation → landing. The listener climbs with you. Tennessee Whiskey model: each verse/chorus line escalates the central simile.',
  'Mantra Hook':     'HOOK STRUCTURE — Mantra: The entire hook is ONE sentence, repeated 3-6 times with slight melodic variation each time. Power through repetition — not complexity. The meaning deepens with each repeat. The hook is also the title. "HUMBLE." / "Never broke again" / "Thank U, Next" — single devastating phrase.',
  'Question+Answer': 'HOOK STRUCTURE — Question + Answer: Hook divided into two equal halves. First half: a question or incomplete thought. Second half: the answer or completion. The listener is pulled through the gap between them. Creates internal tension and resolution inside the hook itself. The chorus contains a complete micro-argument.',
  'A/B Double':      'HOOK STRUCTURE — A/B Double: Two distinct melodic phrases back to back. Hook A (4 bars, establishes central image, usually sung) → Hook B (4 bars, escalates or reframes it, often different cadence/energy). Together more powerful than either alone. Creates two earworms in one. Travis Scott / OutKast model.',
  'Anti-Hook':       'HOOK STRUCTURE — Anti-Hook: Deliberately refuses the expected melodic or dynamic peak. Chorus lands quiet or mid-energy when the production promises an explosion. The absence IS the hook — the gap where the peak was supposed to be is more memorable than the peak would have been. Kendrick Lamar / Radiohead tradition. Creep drops quiet exactly when it should go loud.',
  'Chant Hook':      'HOOK STRUCTURE — Chant: 2-5 words, rhythmically locked to the beat, crowd-participatory from first listen. Not primarily melodic — rhythmic. The words are a percussion instrument. The hook is what every person in the crowd chants back before they know the lyrics. "Hey Ya!" / "Jump Around" / "Seven Nation Army" riff model.',
  'Narrative Hook':  'HOOK STRUCTURE — Narrative Micro-Story: The hook tells a complete mini-story in 8 bars — setup, complication, resolution. The verse provides context; the chorus delivers a complete emotional journey every time it repeats. Not a statement but an event. The listener re-experiences something each time the chorus returns.',
  'Confession Hook': 'HOOK STRUCTURE — Direct Address Confession: Hook speaks directly to one specific person or breaks the fourth wall to speak to the listener. "You" or implied direct address. Breaks theatrical distance. The listener feels personally implicated — called out or called to. The most intimate hook structure: one person to one person, even in a stadium.',
};

// ═══════════════════════════════════════════════════════════════════════════
// RHYME SCHEMES — injected randomly per generation
// ═══════════════════════════════════════════════════════════════════════════

const RHYME_SCHEMES = {
  'AABB': 'Couplet rhyme (AABB): lines 1+2 rhyme, lines 3+4 rhyme. Creates momentum and satisfaction — folk, country, and pop default. Feels conversational and propulsive.',
  'ABAB': 'Alternating rhyme (ABAB): lines 1+3 rhyme, lines 2+4 rhyme. Creates tension and pull — listener is always waiting for the resolution. Classic ballad and anthem structure.',
  'ABCB': 'Ballad form (ABCB): only lines 2 and 4 rhyme. Feels natural, almost spoken — like someone telling you something true. Less forced than full rhyme, harder to write well.',
  'AABA': 'Anchor rhyme (AABA): three lines rhyme, one breaks free. The free line (line 3) is always the most emotionally revealing line — it carries the weight because it stands apart.',
  'Internal': 'Internal rhyme density: words within the same line rhyme with each other, not just end-words. Creates rapid momentum and flow density — hip-hop and slam poetry technique. Use at least 2 internal rhymes per 4-line unit.',
  'Slant':   'Slant rhyme scheme: near-rhymes, assonance, and consonance instead of perfect rhymes. Creates organic, non-sing-songy feel — indie, alt-country, literary SS. Examples: "moon/room", "fire/liar", "time/mine".',
  'Chain':   'Chain rhyme: the final word of each line rhymes with a word in the MIDDLE of the next line, creating a cascading effect. Pulls the listener forward relentlessly. Advanced technique — Eminem and Hamilton model.',
};

const GENRE_RHYME_PREF = {
  pop:       ['AABB', 'ABAB', 'ABCB'],
  hiphop:    ['Internal', 'Chain', 'AABB'],
  rnb:       ['ABCB', 'ABAB', 'Slant'],
  neosoul:   ['Slant', 'ABCB', 'Internal'],
  country:   ['AABB', 'ABCB', 'ABAB'],
  ss:        ['Slant', 'ABCB', 'AABA'],
  jazz:      ['AABA', 'Slant', 'ABCB'],
  gospel:    ['AABB', 'ABAB', 'Internal'],
  altrock:   ['Slant', 'ABCB', 'ABAB'],
  blues:     ['AABB', 'ABCB', 'Slant'],
  edm:       ['AABB', 'ABAB', 'Internal'],
  kpop:      ['ABAB', 'AABB', 'Internal'],
  punk:      ['AABB', 'Internal', 'ABAB'],
  reggae:    ['AABB', 'ABCB', 'Slant'],
  latin:     ['ABAB', 'AABB', 'ABCB'],
  reggaeton: ['AABB', 'Internal', 'Chain'],
  afrobeats: ['AABB', 'ABCB', 'Internal'],
};

// ═══════════════════════════════════════════════════════════════════════════
// ERA VOCABULARY — era-specific anchor words/phrases injected per generation
// ═══════════════════════════════════════════════════════════════════════════

const ERA_VOCABULARY = {
  classic: {
    label: 'Classic (pre-1980)',
    anchors: ['switchboard','eight-track','dime store','Western Union','operator','party line','drive-in','nickel jukebox','AM radio','vinyl single','five and dime','telegram'],
    forbidden: ['scroll','swipe','stream','DM','download','playlist','algorithm','viral'],
  },
  vintage: {
    label: 'Vintage (1980–1999)',
    anchors: ['answering machine','mixtape','pay phone','cassette','pager','beeper','VCR','boom box','fax machine','dial-up','MTV','cellular'],
    forbidden: ['stream','DM','TikTok','Instagram','algorithm','playlist','Spotify'],
  },
  modern: {
    label: 'Modern (2000–2015)',
    anchors: ['ringtone','MySpace','text me','download','iPod','YouTube','BlackBerry','going viral','Facebook','tweet','selfie','Wi-Fi'],
    forbidden: ['TikTok','Reels','algorithm','For You Page','story post','NFT'],
  },
  contemporary: {
    label: 'Contemporary (2016–2022)',
    anchors: ['stories','scroll','playlist','stream','Spotify','DM slide','gram','dropped','viral','fire emoji','ghost','left on read'],
    forbidden: ['eight-track','cassette','pager','telegram','party line'],
  },
  current: {
    label: 'Current (2023–Now)',
    anchors: ['algorithm','For You Page','AI-generated','hyperpop','ambient','lo-fi','parasocial','main character','rent-free','brain rot','delulu','understood the assignment'],
    forbidden: ['eight-track','cassette','pager','telegram','MySpace','BlackBerry'],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// EMOTIONAL ARCS — user-selectable journey templates
// ═══════════════════════════════════════════════════════════════════════════

const EMOTIONAL_ARCS = {
  'none': null,
  'devastation-acceptance': {
    name: 'Devastation → Acceptance',
    arc: 'Verse 1: raw devastation — the wound is fresh. Chorus 1: denial or bargaining. Verse 2: deeper reckoning — understanding the why. Bridge: turning point — not fixed but not broken. Final Chorus: acceptance — same words, different meaning. The listener should feel relief, not joy.',
    genre_fit: ['ss','rnb','country','neosoul','altrock','blues'],
  },
  'joy-nostalgia-gratitude': {
    name: 'Joy → Nostalgia → Gratitude',
    arc: 'Verse 1: a joyful memory in present tense — re-living it. Chorus: the pure feeling before context. Verse 2: realizing that time has passed, the moment is gone. Bridge: the bittersweet recognition that it was perfect. Final Chorus: gratitude for having had it — joy becomes thanksgiving.',
    genre_fit: ['pop','country','ss','rnb','gospel'],
  },
  'anger-clarity-resolve': {
    name: 'Anger → Clarity → Resolve',
    arc: 'Verse 1: the grievance — specific, present tense, raw. Chorus: the explosion of anger. Verse 2: pulling back — understanding who you actually are and what you want. Bridge: the moment anger transforms into vision. Final Chorus: same words, now a war cry instead of a wound cry.',
    genre_fit: ['hiphop','punk','altrock','blues','rock'],
  },
  'longing-action-arrival': {
    name: 'Longing → Action → Arrival',
    arc: 'Verse 1: longing — specific about what is missing or wanted. Pre-chorus: the decision forming. Chorus: the declaration of intent — not arrival yet, but commitment. Verse 2: the journey — obstacles, doubts. Bridge: the darkest moment before arrival. Final Chorus: arrival — same words, earned.',
    genre_fit: ['pop','country','gospel','kpop','edm'],
  },
  'innocence-loss-wisdom': {
    name: 'Innocence → Loss → Wisdom',
    arc: 'Verse 1: innocence — the world as it was believed to be. Chorus: the collision with reality. Verse 2: aftermath — what is lost. Bridge: the question of what to do with the loss. Final Chorus/Outro: wisdom — not restored innocence but something better. The song is a coming-of-age in 3 minutes.',
    genre_fit: ['ss','altrock','country','rnb','neosoul'],
  },
  'isolation-connection-belonging': {
    name: 'Isolation → Connection → Belonging',
    arc: 'Verse 1: alone — specific about the isolation, not generic. Chorus: the reaching out or discovery of another. Verse 2: the risk of connection — vulnerability. Bridge: the moment the walls come down. Final Chorus: belonging — the chorus lands the same but the isolation has been replaced.',
    genre_fit: ['pop','kpop','edm','gospel','rnb'],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// GENRE SYLLABLE BUDGETS — default syllable constraints per section
// ═══════════════════════════════════════════════════════════════════════════

// hook = the single most repeated phrase (title line / refrain). Tighter than chorus.
const GENRE_SYLLABLE_BUDGETS = {
  pop:       { verse: '8–12', chorus: '6–10', hook: '4–7',  bridge: '6–10', prechorus: '6–9' },
  hiphop:    { verse: '12–20', chorus: '8–12', hook: '5–9', bridge: '10–16', prechorus: '8–12' },
  rnb:       { verse: '8–13', chorus: '6–10', hook: '4–7',  bridge: '6–10', prechorus: '6–9' },
  neosoul:   { verse: '8–14', chorus: '6–10', hook: '4–8',  bridge: '6–12', prechorus: '6–9' },
  country:   { verse: '8–12', chorus: '6–10', hook: '4–7',  bridge: '6–10', prechorus: '6–8' },
  ss:        { verse: '7–14', chorus: '5–10', hook: '3–7',  bridge: '5–10', prechorus: '5–9' },
  jazz:      { verse: '6–12', chorus: '5–9',  hook: '3–6',  bridge: '5–9',  prechorus: '5–8' },
  gospel:    { verse: '8–13', chorus: '6–10', hook: '4–8',  bridge: '6–12', prechorus: '6–9' },
  altrock:   { verse: '8–13', chorus: '5–9',  hook: '3–6',  bridge: '5–9',  prechorus: '5–8' },
  blues:     { verse: '8–14', chorus: '6–10', hook: '4–7',  bridge: '6–12', prechorus: '6–9' },
  edm:       { verse: '6–10', chorus: '4–8',  hook: '2–5',  bridge: '4–8',  prechorus: '4–7' },
  kpop:      { verse: '8–12', chorus: '6–10', hook: '4–7',  bridge: '6–10', prechorus: '6–9' },
  punk:      { verse: '8–14', chorus: '4–8',  hook: '2–5',  bridge: '4–8',  prechorus: '4–7' },
  reggae:    { verse: '8–12', chorus: '6–10', hook: '4–7',  bridge: '6–10', prechorus: '5–8' },
  latin:     { verse: '8–13', chorus: '6–10', hook: '4–7',  bridge: '6–10', prechorus: '6–9' },
  reggaeton: { verse: '8–14', chorus: '6–10', hook: '4–7',  bridge: '6–10', prechorus: '6–9' },
  afrobeats: { verse: '6–12', chorus: '4–8',  hook: '2–5',  bridge: '4–8',  prechorus: '4–7' },
  rock:      { verse: '8–13', chorus: '5–10', hook: '3–7',  bridge: '5–9',  prechorus: '5–8' },
  folk:      { verse: '7–13', chorus: '5–9',  hook: '3–6',  bridge: '5–9',  prechorus: '5–8' },
  metal:     { verse: '8–16', chorus: '4–9',  hook: '3–6',  bridge: '4–8',  prechorus: '4–8' },
  reggae:    { verse: '8–12', chorus: '6–10', hook: '4–7',  bridge: '6–10', prechorus: '5–8' },
  parody:    { verse: '8–14', chorus: '6–10', hook: '4–8',  bridge: '6–10', prechorus: '6–9' },
  comedy:    { verse: '6–14', chorus: '4–10', hook: '3–8',  bridge: '4–10', prechorus: '4–9' },
  children:  { verse: '4–8',  chorus: '3–6',  hook: '2–5',  bridge: '3–6',  prechorus: '3–5' },
  tvmusical: { verse: '8–14', chorus: '6–11', hook: '4–8',  bridge: '6–12', prechorus: '6–9' },
};

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCTION KNOWLEDGE BASE
// Per-genre FX profiles, plugin chains, mastering targets, and production
// archetypes used to generate the PRODUCTION BRIEF output section.
// ═══════════════════════════════════════════════════════════════════════════

const GENRE_FX_PROFILES = {
  pop:       { reverb: 'Medium hall (1.5–2.2s) on vocals, short room (0.4s) on snare', delay: '1/8 note ping-pong on vocal tails, 1/4 dotted on guitar', compression: 'VCA bus glue (2–4 dB GR), optical on lead vocal', eq: 'Air shelf +2 dB @ 16 kHz, low-cut @ 80 Hz on all but kick+bass', width: 'Stereo widener on synth pads, mono centre for kick/bass/lead vocal', sidechain: 'Kick ducking bass 4–6 dB, subtle pump on pads' },
  hiphop:    { reverb: 'Dark plate (0.8–1.2s) on snare, short room on 808 tail, large verb on adlibs', delay: 'Triplet 1/8 slap on vocal doubles, subtle 1/4 on main vocal', compression: 'Hard limiting on 808 (Waves SSL), parallel NY compression on drums', eq: 'Heavy sub boost 50–80 Hz on 808, scooped mids on snare, air on vocal', width: 'Wide sample layer, mono 808 and kick', sidechain: 'Aggressive kick→808 sidechain for pump' },
  rnb:       { reverb: 'Lush chamber (2–3s) on vocals, spring on keys', delay: '1/4 dotted on vocal harmonies, analog tape slap on lead', compression: 'Vintage LA-2A on lead vocal, bus glue on mix', eq: 'Low-mid warmth 200–400 Hz on voice, rolled-off highs for analog warmth', width: 'Stereo choir spread, mono bass and kick', sidechain: 'Light kick→bass pump (2–3 dB)' },
  rock:      { reverb: 'Large ambience (2–4s) on snare, room mic blend on kit', delay: '1/4 ping-pong on guitar lead, slapback on vocals', compression: 'FET 1176 on snare/overheads, bus chain (SSL → limiting)', eq: 'HPF @ 100 Hz on guitars, presence boost 3–5 kHz on leads, air on overheads', width: 'Hard pan guitars L/R, mono kick/snare/bass', sidechain: 'Minimal — let the room breathe' },
  country:   { reverb: 'Bright hall on vocals (1.8s), spring reverb on guitar/pedal steel', delay: 'Tape echo (1/4 + 3/8) on guitar fills, slap on lead vocal', compression: 'Optical on vocal, VCA on bus', eq: 'Warmth at 200 Hz on acoustic, sparkle at 8 kHz, cut mud at 300 Hz', width: 'Banjo/fiddle wide, steel guitar center-right', sidechain: 'Very light kick ducking' },
  edm:       { reverb: 'Gated hall on snare, long pad verb (3–6s) on synths', delay: '1/8 ping-pong on arps, 1/4 dotted on leads, reverse reverb pre-hit', compression: 'Sidechain pumping (4/4 kick→pads 8–12 dB), peak limiting on master', eq: 'Deep bass scoop at 200–400 Hz, aggressive high-pass on pads, air at 14 kHz', width: 'Max stereo on synths/pads, mono kick/bass', sidechain: 'Heavy 4/4 sidechain pump is the signature effect' },
  altrock:   { reverb: 'Grungy plate on snare, room ambience on kit', delay: 'Feedback-rich 1/4 delay on guitar, modulated delay on solos', compression: 'Hard FET on drums, fuzz/saturation on guitar bus', eq: 'Mid-forward 800 Hz–2 kHz crunch, rolled highs for grit', width: 'Guitars wide, fuzz guitar center', sidechain: 'Occasional pump for effect only' },
  metal:     { reverb: 'Short room on snare (0.3s) for tightness, gated plate', delay: 'Very short slap (40ms) on rhythm guitars, lead 1/8 dotted', compression: 'Fast attack FET on kick/snare, parallel for punch, hard bus limiting', eq: 'Deep mid scoop on rhythm guitar (500 Hz), boost 3–4 kHz for presence, heavy HPF', width: 'Rhythm guitars hard-panned L/R (double-tracked)', sidechain: 'Kick→bass moderate pump' },
  punk:      { reverb: 'Minimal — tight room only (0.2s)', delay: 'Slapback only on lead vocal', compression: 'Fast, raw 1176 — let it clip slightly for attitude', eq: 'Bright, mid-forward, almost no sub — cut below 80 Hz on everything', width: 'Slightly narrow — live room feel', sidechain: 'None — let it be raw' },
  folk:      { reverb: 'Small room (0.6–1s) or live hall (2s) on acoustic/vocal', delay: 'Tape echo on guitar fingerpicking, room echo on vocals', compression: 'Gentle optical on vocal (2–3 dB), minimal bus compression', eq: 'Natural — boost 200 Hz warmth, cut 400 Hz mud, slight air at 10 kHz', width: 'Centered vocal, slight width on strumming', sidechain: 'None' },
  jazz:      { reverb: 'Plate (1.5–2.5s) on brass/sax, room on piano', delay: 'Analog tape delay on trumpet/vocal', compression: 'Gentle RMS limiter — preserve dynamics', eq: 'Warm and full 200–400 Hz, bright at 8–10 kHz on piano', width: 'Traditional stereo mix — wide ensemble', sidechain: 'None' },
  blues:     { reverb: 'Spring reverb on guitar amp, room on vocal', delay: 'Tape slap on guitar and vocal', compression: 'Tube-style optical on vocal, light bus glue', eq: 'Gritty low-mid push 300–500 Hz on guitar, warmth on vocal', width: 'Mono-ish guitar, slight spread on rhythm section', sidechain: 'None' },
  latin:     { reverb: 'Bright hall (2s) on percussion, plate on vocal', delay: '1/8 dotted on guitar fills', compression: 'Optical on vocal, bus glue — keep it punchy', eq: 'Bright attack on percussion 6–8 kHz, warmth on guitar body', width: 'Percussion wide, bass and clave center', sidechain: 'Light kick→bass' },
  reggaeton: { reverb: 'Dark chamber (1s) on dembow, plate on vocal', delay: '1/4 on vocal doubles, triplet on hooks', compression: 'Hard bus compression for loudness, sidechain pump', eq: 'Heavy sub 50–80 Hz on 808/bass, air on vocal', width: 'Wide synths, mono bass and kick', sidechain: 'Moderate dembow→synth pump' },
  reggae:    { reverb: 'Large spring reverb on guitar (3s), plate on snare', delay: '1/4 dotted echoes everywhere — this is core to the sound', compression: 'Gentle optical on vocal, low bus compression for dynamics', eq: 'Bass-forward 80–120 Hz, scooped mids on guitar, warm on vocal', width: 'Rhythm guitar wide, roots bass center', sidechain: 'Light kick→bass' },
  afrobeats: { reverb: 'Short verb on snare, airy plate on vocal', delay: '1/8 ping-pong on synth/guitar, 1/4 dotted on vocal', compression: 'Heavy bus limiting for loudness and density', eq: 'Sub boost 50–80 Hz, mid-cut 400 Hz, air at 12 kHz on vocal', width: 'Max stereo on bells/guitar, mono kick/bass', sidechain: 'Kick→synth moderate pump' },
  kpop:      { reverb: 'Polished chamber (1.5s) on vocal, bright hall on synth', delay: '1/8 ping-pong on synth stabs, reverb tail delay on vocal', compression: 'Tight VCA on drums, optical on vocal, master limiting for loudness', eq: 'Air shelf at 14 kHz, cut 200–300 Hz mud, presence 4–5 kHz on vocal', width: 'Very wide synths and pads, mono kick/bass', sidechain: 'Kick→synth moderate pump' },
  neosoul:   { reverb: 'Warm plate on vocal (2s), room on live drums', delay: 'Analog echo on guitar/keys, subtle on vocal', compression: 'LA-2A optical on vocal, parallel compression on drums', eq: 'Warm 200–400 Hz on keys and vocal, air at 10 kHz', width: 'Live band stereo spread', sidechain: 'Very light' },
  gospel:    { reverb: 'Large hall (3–5s) on choir and lead vocal', delay: 'Long feedback echo on vocal runs', compression: 'Gentle optical on lead, dynamic choir mix', eq: 'Full and rich 100–400 Hz, presence on lead vocal 3–5 kHz', width: 'Wide choir, center lead vocal', sidechain: 'None' },
  ss:        { reverb: 'Small room or hall depending on feel (0.8–2.5s)', delay: 'Tape slap on vocal and guitar', compression: 'Gentle 2–3 dB on vocal, minimal bus', eq: 'Natural — subtle warmth and air only', width: 'Slightly narrow for intimacy', sidechain: 'None' },
};

const GENRE_PLUGIN_CHAINS = {
  pop:       { free: ['TDR Nova (EQ)', 'Valhalla Supermassive (reverb)', 'TAL-Reverb-4', 'OTT (multiband comp)'], paid: ['FabFilter Pro-Q 3', 'Waves SSL E-Channel', 'UAD 1176 LN', 'Soundtoys EchoBoy', 'Valhalla Room'] },
  hiphop:    { free: ['Izotope Ozone Imager (width)', 'Valhalla Supermassive', 'OTT', 'Camel Crusher'], paid: ['Waves SSL G-Bus', 'FabFilter Pro-L 2', 'Slate VCC', 'Soundtoys Devil-Loc', 'UAD Neve 1073'] },
  rnb:       { free: ['Analog Obsession LALA (optical)', 'Valhalla Supermassive', 'TAL-Chorus-LX'], paid: ['UAD LA-2A', 'FabFilter Pro-Q 3', 'Waves J37 Tape', 'Soundtoys Radiator', 'iZotope Nectar'] },
  rock:      { free: ['GVST GClip (saturation)', 'Valhalla Supermassive', 'TDR Nova'], paid: ['UAD 1176 AE', 'Waves SSL G-Bus', 'FabFilter Saturn 2', 'Soundtoys Decapitator', 'Empirical Labs Distressor'] },
  country:   { free: ['Valhalla Supermassive', 'TAL-Reverb-4', 'CHOW Tape'], paid: ['UAD Ocean Way Studios', 'Waves H-Delay', 'Soundtoys EchoBoy', 'FabFilter Pro-Q 3'] },
  edm:       { free: ['Valhalla Supermassive', 'OTT', 'LFO Tool (sidechain)'], paid: ['FabFilter Pro-Q 3', 'Xfer LFO Tool', 'Waves SSL G-Bus', 'FabFilter Pro-L 2', 'iZotope Insight 2'] },
  altrock:   { free: ['GVST GClip', 'Valhalla Supermassive', 'TDR Nova'], paid: ['UAD Marshall Plexi', 'FabFilter Saturn 2', 'Soundtoys Decapitator', 'Waves SSL 4000'] },
  metal:     { free: ['GVST GClip', 'TDR Nova', 'Limiter No6'], paid: ['FabFilter Pro-Q 3', 'Waves SSL G-Bus', 'UAD Neve 1073', 'FabFilter Pro-L 2', 'Soundtoys Decapitator'] },
  punk:      { free: ['GVST GClip', 'TDR Nova', 'Valhalla Supermassive (minimal use)'], paid: ['Waves SSL Channel', 'UAD 1176 LN', 'FabFilter Pro-L 2'] },
  folk:      { free: ['Valhalla Supermassive', 'CHOW Tape', 'TDR Nova'], paid: ['UAD Studer A800', 'Soundtoys EchoBoy', 'Waves Renaissance Compressor'] },
  jazz:      { free: ['Valhalla Supermassive', 'CHOW Tape', 'TDR Nova'], paid: ['UAD Fairchild 670', 'Waves Kramer Master Tape', 'Soundtoys EchoBoy'] },
  blues:     { free: ['CHOW Tape', 'GVST GClip', 'Valhalla Supermassive'], paid: ['UAD Ampex ATR-102', 'Waves J37 Tape', 'Soundtoys Radiator'] },
  latin:     { free: ['Valhalla Supermassive', 'TDR Nova', 'OTT'], paid: ['UAD Neve 1073', 'Waves CLA-76', 'Soundtoys EchoBoy', 'FabFilter Pro-Q 3'] },
  reggaeton: { free: ['OTT', 'Valhalla Supermassive', 'LFO Tool'], paid: ['FabFilter Pro-L 2', 'Waves SSL G-Bus', 'Xfer LFO Tool'] },
  reggae:    { free: ['Valhalla Supermassive (heavy)', 'CHOW Tape', 'TDR Nova'], paid: ['UAD Roland RE-201 Space Echo', 'Soundtoys EchoBoy', 'Waves H-Delay'] },
  afrobeats: { free: ['OTT', 'Valhalla Supermassive', 'TDR Nova'], paid: ['FabFilter Pro-L 2', 'Waves SSL G-Bus', 'iZotope Ozone 10'] },
  kpop:      { free: ['OTT', 'Valhalla Supermassive', 'TDR Nova'], paid: ['FabFilter Pro-Q 3', 'Waves SSL G-Bus', 'FabFilter Pro-L 2', 'iZotope Nectar 3'] },
  neosoul:   { free: ['Valhalla Supermassive', 'CHOW Tape', 'TDR Nova'], paid: ['UAD LA-2A', 'Waves J37 Tape', 'Soundtoys EchoBoy', 'FabFilter Pro-Q 3'] },
  gospel:    { free: ['Valhalla Supermassive', 'TAL-Reverb-4', 'TDR Nova'], paid: ['UAD Ocean Way Studios', 'Waves SSL G-Bus', 'FabFilter Pro-Q 3'] },
  ss:        { free: ['Valhalla Supermassive', 'CHOW Tape', 'TDR Nova'], paid: ['UAD Studer A800', 'Waves Renaissance Compressor', 'Soundtoys EchoBoy'] },
};

const MASTERING_TARGETS = {
  pop:       { lufs: '-14 LUFS (streaming)', dynamicRange: 'DR 7–9', brightness: 'Bright (8–14 kHz shelf +1.5 dB)', stereoWidth: 'Wide (>0.85)', notes: 'Max loudness within streaming normalization. Punchy, clean, competitive.' },
  hiphop:    { lufs: '-9 to -12 LUFS', dynamicRange: 'DR 5–7', brightness: 'Warm-bright (air at 12 kHz)', stereoWidth: 'Moderate-wide', notes: '808 sub must translate on laptop speakers — check mono. Heavy limiting expected.' },
  rnb:       { lufs: '-12 to -14 LUFS', dynamicRange: 'DR 8–10', brightness: 'Warm (subtle air only)', stereoWidth: 'Moderate', notes: 'Preserve vocal dynamics. Warmth and intimacy over loudness.' },
  rock:      { lufs: '-11 to -13 LUFS', dynamicRange: 'DR 8–11', brightness: 'Bright with mid presence', stereoWidth: 'Wide guitars', notes: 'Energy and punch. Allow more dynamics than pop.' },
  country:   { lufs: '-13 to -14 LUFS', dynamicRange: 'DR 9–11', brightness: 'Bright and clear', stereoWidth: 'Natural', notes: 'Preserve acoustic guitar transients. Warm but clear.' },
  edm:       { lufs: '-7 to -9 LUFS (club)', dynamicRange: 'DR 4–6', brightness: 'Air heavy (14 kHz +2 dB)', stereoWidth: 'Maximum', notes: 'Loudest genre. Club systems expect extreme loudness. Check mono compatibility.' },
  altrock:   { lufs: '-11 to -13 LUFS', dynamicRange: 'DR 8–10', brightness: 'Mid-forward', stereoWidth: 'Wide', notes: 'Grit and energy. Allow some clipping for character.' },
  metal:     { lufs: '-9 to -11 LUFS', dynamicRange: 'DR 6–8', brightness: 'Bright high-mid (4–6 kHz)', stereoWidth: 'Wide (guitars)', notes: 'Tight and crushing. Kick and guitar must cut without muddiness.' },
  punk:      { lufs: '-12 to -14 LUFS', dynamicRange: 'DR 7–9', brightness: 'Mid-bright', stereoWidth: 'Narrow-moderate', notes: 'Raw energy over polish. Slight edge/distortion acceptable.' },
  folk:      { lufs: '-14 to -16 LUFS', dynamicRange: 'DR 11–14', brightness: 'Natural', stereoWidth: 'Moderate', notes: 'Most dynamic genre. Preserve performance nuance. No heavy limiting.' },
  jazz:      { lufs: '-16 to -18 LUFS', dynamicRange: 'DR 12–16', brightness: 'Warm-natural', stereoWidth: 'Wide ensemble', notes: 'Preserve full dynamic range. No brickwall limiting.' },
  blues:     { lufs: '-14 to -16 LUFS', dynamicRange: 'DR 10–13', brightness: 'Warm', stereoWidth: 'Moderate', notes: 'Analog warmth. Tape saturation before limiting.' },
  latin:     { lufs: '-13 to -14 LUFS', dynamicRange: 'DR 8–10', brightness: 'Bright and punchy', stereoWidth: 'Wide percussion', notes: 'Percussive transients must punch through. Bright and energetic.' },
  reggaeton: { lufs: '-9 to -11 LUFS', dynamicRange: 'DR 5–7', brightness: 'Bright (vocal clarity)', stereoWidth: 'Wide', notes: 'Loud and punchy. Dembow kick+snare must drive through everything.' },
  reggae:    { lufs: '-13 to -15 LUFS', dynamicRange: 'DR 9–12', brightness: 'Warm-dark', stereoWidth: 'Moderate', notes: 'Preserve bass weight. Echo tails need headroom.' },
  afrobeats: { lufs: '-10 to -12 LUFS', dynamicRange: 'DR 6–8', brightness: 'Bright and airy', stereoWidth: 'Wide', notes: 'Competitive loudness. Percussion and vocal must pop.' },
  kpop:      { lufs: '-8 to -10 LUFS', dynamicRange: 'DR 5–7', brightness: 'Very bright (K-pop signature)', stereoWidth: 'Maximum', notes: 'Extremely loud and polished. Every element must sparkle.' },
  neosoul:   { lufs: '-13 to -15 LUFS', dynamicRange: 'DR 9–12', brightness: 'Warm with air', stereoWidth: 'Moderate', notes: 'Groove and warmth. Preserve dynamics and musical feel.' },
  gospel:    { lufs: '-12 to -14 LUFS', dynamicRange: 'DR 9–12', brightness: 'Full and rich', stereoWidth: 'Wide choir', notes: 'Room to breathe. Choir dynamics and lead vocal must coexist.' },
  ss:        { lufs: '-14 to -16 LUFS', dynamicRange: 'DR 11–14', brightness: 'Natural', stereoWidth: 'Intimate', notes: 'Preserve performance vulnerability. No over-compression.' },
};

// ═══════════════════════════════════════════════════════════════════════════
// AD-LIB BIBLE + VOCAL STACK PROFILES
// Ad-lib guide for all 24 genres: signature sounds, placement, density, Suno
// parentheses syntax. Vocal stack profiles: how many layers per section.
// Injected into song prompts via buildAdlibNote() and buildVocalStackNote().
// ═══════════════════════════════════════════════════════════════════════════

const ADLIB_BIBLE = {
  pop: {
    sounds: ['na-na-na', 'woah', 'hey', 'ooh', 'yeah'],
    placement: 'post-chorus (mandatory), outro singalong, pre-chorus lift (hey!)',
    density: 'medium',
    example: '(na-na-na) (woah-woah) after the main hook; (yeah) on peaks',
    outro: 'na-na-na singalong vamp',
  },
  hiphop: {
    sounds: ['yeah', 'uh', 'ayy', "let's go", 'woo'],
    placement: 'every 2nd bar inline, bar-end punctuation, outro crowd chant',
    density: 'high',
    example: '"I run this (yeah) city (uh)" — inline on every 2nd bar',
    outro: '(yeah, yeah, yeah!) crowd chant builds and repeats',
  },
  rnb: {
    sounds: ['ooh', 'ah', 'yeah', 'baby', 'mmm'],
    placement: 'post-chorus runs, bridge build, end of phrases, outro vamp',
    density: 'high',
    example: '"You know I love you (ooh) forever (mmm)"; bridge: (ooh-ah-yeah!) vocal run',
    outro: 'melismatic vocal run vamp — (ooh-ooh-ah-yeah!) escalating',
  },
  rock: {
    sounds: ['woah', 'hey', 'yeah', 'woo', 'come on'],
    placement: 'pre-chorus lift, post-chorus crowd release, outro collective',
    density: 'medium',
    example: '"Don\'t you cry (hey!) There\'s a heaven (yeah!)"',
    outro: '(yeah! yeah! yeah!) collective shout, fades',
  },
  country: {
    sounds: ['yeah', 'mmm', 'woah', 'hey', 'la-la-la'],
    placement: 'verse story turns, final chorus group singalong, outro',
    density: 'low-medium',
    example: '"She walked out (yeah) door slammin\' (mm-mm)"',
    outro: '(la-la-la) (woah-oh) group barn-dance singalong',
  },
  edm: {
    sounds: ['oh-oh-oh', 'hey', 'yeah', 'woo'],
    placement: 'pre-drop cue, drop entrance, post-drop groove, outro loop',
    density: 'medium — processed/pitched',
    example: '"[Build] (oh!) (yeah!) [Drop] (oh-oh-oh!) looped"',
    outro: 'looped (oh-oh-oh) processed texture fades',
  },
  latin: {
    sounds: ['ay', 'aye', 'oye', 'eh', 'olé', 'dale'],
    placement: 'salsa montuno vamp, cumbia chorus response, outro coro fade',
    density: 'high — bilingual call-and-response',
    example: '"Te quiero (ay!) con toda mi alma (aye!)"',
    outro: '(ay ay ay!) (dale, dale!) over montuno piano, 8–16 bars',
  },
  reggaeton: {
    sounds: ['aye', 'eh', 'yo', 'dale', 'mira'],
    placement: 'dembow accent beat, perreo section, outro vamp',
    density: 'medium — rhythm-aligned',
    example: '"Muévelo (aye) dale (eh)" — on dembow syncopation',
    outro: '(dale, dale, dale!) over dembow groove, fades',
  },
  folk: {
    sounds: ['mmm', 'oh', 'la-la-la'],
    placement: 'bridge hum before final chorus, quiet outro only',
    density: 'minimal — one moment max per song',
    example: '"[Bridge] (mmm, oh...) [Final Chorus] (la-la-la)"',
    outro: 'hummed melody (mmm) fades to silence',
  },
  metal: {
    sounds: ['yeah', 'go', 'ahhh', 'hey'],
    placement: 'breakdown entrance, chorus aggression peak, outro collective',
    density: 'low — impact over frequency',
    example: '"Master of puppets! (YEAH! YEAH!)" — at riff peaks',
    outro: '(yeah! yeah! yeah!) or feedback noise — abrupt end',
  },
  jazz: {
    sounds: ['doo-wah', 'bop', 'skee-dat', 'ba-da', 'shoo-bee'],
    placement: 'solo section scat, outro improvisation, responsorial moments',
    density: 'high — during solos only',
    example: '"[Solo] (bop-ba-doo-wah, skee-dat-da-ba!)"',
    outro: 'scat improvisation fades: (doo-wah... skee-dat... ba-da-bop...)',
  },
  ss: {
    sounds: ['mmm', 'oh', 'la-la'],
    placement: 'bridge confessional only, whispered outro',
    density: 'minimal — 1–2 moments per song',
    example: '"[Bridge] (whispered: I\'m sorry...) (oh...)"',
    outro: 'whispered (mmm) or sighed (oh) fades to silence',
  },
  altrock: {
    sounds: ['woah', 'oh-oh', 'yeah', 'woo'],
    placement: 'pre-chorus earned tension, post-chorus self-aware release',
    density: 'low-medium — must feel earned not manufactured',
    example: '"Can you feel it? (woah...) [Post-chorus] (oh-oh-oh, yeah!)"',
    outro: '(woah-woah-woah...) fading with feedback',
  },
  reggae: {
    sounds: ['yeah', 'jah', 'one love', 'irie', 'bless'],
    placement: 'call-and-response chorus, outro vamp (MANDATORY 8–16 bars)',
    density: 'medium — spiritual affirmations',
    example: '"Living in Babylon (yeah!) But I\'m rising (jah!)"',
    outro: '(one love!) (yeah, jah!) 8–16 bar vamp — NEVER skip the outro vamp',
  },
  afrobeats: {
    sounds: ['eh', 'aye', 'ehn', 'oh-oh', 'ye'],
    placement: 'hook repeat, between call-and-response lines, outro fade',
    density: 'medium — rhythmic accent not emotional',
    example: '"Body move (eh!) soul on fire (aye!)" — on percussion accents',
    outro: '(aye, aye, aye!) (eh, eh!) accenting percussion grid, fades',
  },
  blues: {
    sounds: ['oh', 'lord', 'mmm', 'well'],
    placement: 'between AAB lines as guitar-answering voice, turnaround marker',
    density: 'low-medium — fills the guitar conversation gaps',
    example: '"I\'ve been waiting so long (oh!) [guitar answers] (Lord have mercy!)"',
    outro: '(boom... boom... boom...) hypnotic slow burn vamp',
  },
  punk: {
    sounds: ['hey', 'oi', 'yeah', 'go'],
    placement: 'chorus shout only, outro collective gang chant',
    density: 'low — intentional anti-production. Gang vocals not individual',
    example: '"[Chorus - shout] (HEY! OI! YEAH!)" — everyone shouts together',
    outro: '(oi! oi! oi!) abrupt end — NO fade',
  },
  kpop: {
    sounds: ['ooh', 'ah', 'yeah', 'na-na'],
    placement: 'post-chorus (ALWAYS), outro sweetener, before key change countdown',
    density: 'high — precision-engineered at exact bar positions',
    example: '"[Post-Chorus] (ooh-ah, na-na-na)" — timed to choreography counts',
    outro: '(yeah! ooh! ah!) (na-na-na, woah!) ad-lib driven singalong',
  },
  neosoul: {
    sounds: ['ooh', 'ah', 'mmm', 'baby', 'yeah'],
    placement: 'throughout chorus, bridge emotional build, outro melisma vamp',
    density: 'high — parallel emotional text alongside main vocal',
    example: '"Come to me (ah, yeah) be with me (ooh, ooh)"; bridge: (ooh-ooh-ah!) run',
    outro: '(ooh-ooh-ooh!) escalating melismatic run vamps and fades',
  },
  gospel: {
    sounds: ['hallelujah', 'oh Lord', 'amen', 'yes Lord', 'glory'],
    placement: 'call-and-response THROUGHOUT, bridge vamp climax, outro vamp sacred',
    density: 'maximum — ad-libs ARE the structure',
    example: '"He lifted me up! [Response: (hallelujah!) (amen!)]"',
    outro: '(hallelujah!) (yes Lord!) (glory!) EXTENDED vamp — NEVER cut short',
  },
  parody: {
    sounds: ['(matching original genre ad-libs)', '(what?!)', '(seriously)', '(really?)'],
    placement: 'mirror original song placement exactly — subvert content only',
    density: 'match source genre density',
    example: '"I put ketchup on my steak (what?!)" — sincere delivery + absurd content',
    outro: 'callback to absurd premise with sincere ad-lib delivery',
  },
  comedy: {
    sounds: ['(right?)', '(I mean)', '(yeah)', '(...pause)'],
    placement: 'AFTER the punchline lands — never before. Timing is the joke.',
    density: 'sparse — only where it amplifies comedy',
    example: '"My dog judged me (I mean, he\'s right)"',
    outro: 'final comedic payoff with sincere ad-lib',
  },
  children: {
    sounds: ['la-la-la', 'na-na-na', 'do-do-do', 'yay', 'woohoo'],
    placement: 'every chorus repeat (kids join by the 2nd time), outro singalong',
    density: 'high — maximum simplicity, 1–2 syllables only',
    example: '"Baby shark (do-do-do-do!) every day (yay!)"',
    outro: '(do-do-do-do!) (la-la-la-la!) full group singalong fades',
  },
  tvmusical: {
    sounds: ['la-la-la', 'da-da-da', 'hmm', '(character leitmotif)'],
    placement: 'TV theme: 3-sec identity hook; musical: I-want song emotional eruption',
    density: 'varies — TV theme: instant; musical: sparingly but powerfully',
    example: 'Theme: "(Da-da-da!) [show name]"; Musical: "(Yes!) I want it! (I want it!)"',
    outro: 'character leitmotif returns; theme is instantly singable on exit',
  },
};

// Vocal stacking per genre: how many layers in each section
// doubling = 2 takes (presence) | tripling = 3 takes (choir threshold) | stacked = 4-8 (gospel/transcendence)
const VOCAL_STACK_PROFILES = {
  pop:       { verse: 'single or subtle double', chorus: 'double-tracked lead', finalChorus: 'triple-tracked + harmony layer', method: 'ADT doubling on choruses, stacked harmony in final' },
  hiphop:    { verse: 'single (confident)', chorus: 'double for presence', finalChorus: 'triple + layered ad-libs', method: 'Minimal doubling in verse; ad-lib layers create depth not stacking' },
  rnb:       { verse: 'single + breathy double', chorus: 'doubled + harmony', finalChorus: '4–6 layer vocal stack', method: 'Build from intimate (verse) to transcendent (final chorus)' },
  rock:      { verse: 'single or double', chorus: 'double-tracked', finalChorus: 'triple + gang vocal layer', method: 'Gang vocals on final chorus for communal energy' },
  country:   { verse: 'single', chorus: 'double', finalChorus: 'double + group vocal', method: 'Group harmony on final chorus; barn-dance communal feel' },
  edm:       { verse: 'heavily processed single', chorus: 'doubled + reverb', finalChorus: 'stacked + pitch-shifted layers', method: 'Processing over raw layers; wide stereo spread on drop' },
  latin:     { verse: 'single lead', chorus: 'double + backing harmonies', finalChorus: 'double + call-response layer', method: 'Call-and-response adds natural second voice throughout' },
  reggaeton: { verse: 'single', chorus: 'double', finalChorus: 'double + ad-lib layer', method: 'Minimal stacking; groove > vocal complexity' },
  folk:      { verse: 'single (raw)', chorus: 'subtle double (barely audible)', finalChorus: 'gentle double', method: 'Resist stacking; imperfection is authenticity' },
  metal:     { verse: 'single (aggressive)', chorus: 'double + screamed layer', finalChorus: 'triple + all-band shout', method: 'Contrast clean verse single vs stacked chorus power' },
  jazz:      { verse: 'single', chorus: 'single (space is sacred)', finalChorus: 'single + scat countermelody', method: 'Never stack — jazz values space and single voice' },
  ss:        { verse: 'single (intimate)', chorus: 'single or subtle double', finalChorus: 'gentle double', method: 'Preserve vulnerability; no obvious stacking' },
  altrock:   { verse: 'single', chorus: 'double', finalChorus: 'triple (earned)', method: 'The triple stacking must feel discovered, not engineered' },
  reggae:    { verse: 'single', chorus: 'double + backing singers', finalChorus: 'double + backing vamp stack', method: 'Backing vocalists add the communal layer naturally' },
  afrobeats: { verse: 'single', chorus: 'double + rhythmic ad-libs', finalChorus: 'double + call-response layer', method: 'Ad-libs and call-response do the stacking work' },
  blues:     { verse: 'single (raw)', chorus: 'single (guitar answers)', finalChorus: 'single + voice breaks', method: 'Never stack; the guitar IS the second voice' },
  punk:      { verse: 'single', chorus: 'gang vocal stack (all members)', finalChorus: 'full gang shout', method: 'Stacking erases individual identity — that\'s the point' },
  kpop:      { verse: 'double', chorus: 'triple + harmony', finalChorus: '4-layer precision stack', method: 'Engineered precision; each layer placed at exact beat divisions' },
  neosoul:   { verse: 'single + whisper double', chorus: 'double + runs', finalChorus: '4–6 layer + melismatic runs', method: 'Builds from intimate (verse) to spiritual (final chorus)' },
  gospel:    { verse: 'single lead', chorus: 'double + choir response', finalChorus: '6–8 layer choir stack', method: 'Maximum stacking signals maximum spiritual intensity' },
  parody:    { verse: 'match source genre', chorus: 'match source genre', finalChorus: 'match source genre', method: 'Mimic source genre stacking exactly; content creates the comedy not production' },
  comedy:    { verse: 'single (sincere)', chorus: 'single (commitment)', finalChorus: 'single (straight-faced)', method: 'Sincere production makes the joke land harder' },
  children:  { verse: 'single (warm)', chorus: 'double (big and friendly)', finalChorus: 'group stack (everyone joins)', method: 'Final chorus group sound models communal participation for children' },
  tvmusical: { verse: 'single (character voice)', chorus: 'character + harmony', finalChorus: 'company stack (cast joins)', method: 'Stack builds as more characters join; climax is everyone together' },
};

// Maps FUSION_DATA capitalized/hyphenated genre tokens → ADLIB_BIBLE keys
const _FUSION_KEY_MAP = {
  'Afrobeats': 'afrobeats', 'Alt-Rock': 'altrock', 'Blues': 'blues',
  'Country': 'country', 'EDM': 'edm', 'Folk': 'folk', 'Gospel': 'gospel',
  'Hip-Hop': 'hiphop', 'Jazz': 'jazz', 'K-Pop': 'kpop', 'Latin': 'latin',
  'Neo-Soul': 'neosoul', 'Pop': 'pop', 'Punk': 'punk', 'R&B': 'rnb',
  'Reggae': 'reggae', 'Reggaeton': 'reggaeton', 'Rock': 'rock',
  'Singer-Songwriter': 'ss', 'Soul': 'neosoul'
};
function _normalizeGenreKey(genre) {
  return _FUSION_KEY_MAP[genre] || genre;
}

function buildAdlibNote(genre) {
  const a = ADLIB_BIBLE[_normalizeGenreKey(genre)];
  if (!a) return '';
  const sounds = a.sounds.slice(0, 4).map(s => `(${s})`).join(' ');
  return `\n\nAD-LIBS (Suno parentheses syntax — use throughout):
Sounds: ${sounds} — ${a.placement}
Density: ${a.density}
Example: ${a.example}
Outro: ${a.outro}
Rule: Parentheses = background layer. Same line = rhythmic pocket. Separate line = spotlight moment.`;
}

function buildVocalStackNote(genre) {
  const v = VOCAL_STACK_PROFILES[_normalizeGenreKey(genre)];
  if (!v) return '';
  return `\n\nVOCAL STACKING (DIRECTOR NOTE):
Verse: ${v.verse} | Chorus: ${v.chorus} | Final Chorus: ${v.finalChorus}
Method: ${v.method}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// PLATINUM MODE — TOP 5% HIT REFERENCES
// Per-genre: top defining tracks + the single technique that separates top 5%
// from average. Used by buildTopTierNote() to inject a tight reference block
// into prompts when platinum:true. Cross-training borrows the best technique
// from a complementary genre to elevate the output further.
// ═══════════════════════════════════════════════════════════════════════════

const GENRE_HIT_REFERENCES = {
  pop: {
    hits: [
      { title: 'Anti-Hero', artist: 'Taylor Swift', technique: 'Self-aware narrator owns the flaw completely — disarming honesty lands harder than any defense' },
      { title: 'Blinding Lights', artist: 'The Weeknd', technique: 'Nostalgic production + modern vulnerability — sonic past carries emotional present' },
      { title: 'As It Was', artist: 'Harry Styles', technique: 'Verse emotional restraint explodes at chorus — hold back until the exact right moment' },
    ],
    defining: 'Hook singable after one listen. Verse builds tension; chorus releases it completely. Specificity over abstraction.',
    crossFrom: 'country', crossTechnique: 'Concrete sensory detail — name the object, the place, the moment. "Cheap perfume" beats "her memory" every time.',
  },
  hiphop: {
    hits: [
      { title: 'HUMBLE.', artist: 'Kendrick Lamar', technique: 'Minimalist beat forces lyrical density to carry everything — no melodic crutch, pure word craft' },
      { title: 'God\'s Plan', artist: 'Drake', technique: 'Hook repetition as hypnosis — say it simply, say it again, mean it more each time' },
      { title: 'DNA.', artist: 'Kendrick Lamar', technique: 'Aggressive self-assertion as armor — identity as defiance, every bar a thesis statement' },
    ],
    defining: 'Every bar earns its place. Internal rhymes > end rhymes. The hook is a mantra. Flow variation signals emotional shift.',
    crossFrom: 'blues', crossTechnique: 'AAB problem-state structure — state the problem, deepen it, then resolve (or refuse to).',
  },
  rnb: {
    hits: [
      { title: 'Kill Bill', artist: 'SZA', technique: 'Casual delivery of extreme emotion creates unsettling intimacy — mundane framing amplifies the feeling' },
      { title: 'Leave The Door Open', artist: 'Silk Sonic', technique: 'Vintage production as sincerity signal — classic arrangement says "this emotion is timeless"' },
      { title: 'Best Part', artist: 'Daniel Caesar', technique: 'Harmonic simplicity amplifies vocal vulnerability — fewer chords, more feeling' },
    ],
    defining: 'Groove is the emotional argument. Melody and rhythm must feel inevitable. Vulnerability is the superpower.',
    crossFrom: 'neosoul', crossTechnique: 'Jazz chord extensions (maj7, 9ths) under the hook — harmony does emotional work the lyric doesn\'t have to.',
  },
  rock: {
    hits: [
      { title: 'Mr. Brightside', artist: 'The Killers', technique: 'No intro — drop straight into the emotional state. Opening riff IS the hook.' },
      { title: 'Seven Nation Army', artist: 'The White Stripes', technique: '5-note bass riff becomes global anthem — rhythm carries the identity before words do' },
      { title: 'Fix You', artist: 'Coldplay', technique: 'Quiet verse to anthemic chorus — dynamic contrast makes the release feel earned and overwhelming' },
    ],
    defining: 'Riff supremacy. Dynamic contrast between verse and chorus. Chorus must feel like a physical release.',
    crossFrom: 'blues', crossTechnique: 'Pentatonic riff as emotional vocabulary — the bend, the slide, the note held just past comfortable.',
  },
  country: {
    hits: [
      { title: 'Before He Cheats', artist: 'Carrie Underwood', technique: 'Specific destructive detail — "Louisville Slugger to both headlights" > "I was so angry"' },
      { title: 'Fast Car', artist: 'Tracy Chapman', technique: 'Accumulating concrete detail builds an entire life — the car, the job, the plan, the hope' },
      { title: 'Jolene', artist: 'Dolly Parton', technique: 'Direct address to antagonist — intimacy and vulnerability through second-person pleading' },
    ],
    defining: 'Specificity is everything. Name the town, the truck, the bar, the feeling. Chorus is the emotional verdict on the verse\'s story.',
    crossFrom: 'folk', crossTechnique: 'Confessional first-person truth — no metaphor barrier between singer and emotion. The lyric IS the diary entry.',
  },
  edm: {
    hits: [
      { title: 'Levels', artist: 'Avicii', technique: 'The drop IS the hook — melody lives in the synth. Build tension until the release is physical.' },
      { title: 'Wake Me Up', artist: 'Avicii', technique: 'Live instruments under electronic production — human warmth amplifies synthetic power' },
      { title: 'Titanium', artist: 'David Guetta ft. Sia', technique: 'Human voice as emotional anchor in a synthetic world — the contrast makes both land harder' },
    ],
    defining: 'The drop is the payoff. Every element before it is tension. Melody simple enough to feel in a crowd. Groove > complexity.',
    crossFrom: 'pop', crossTechnique: 'Singable hook with emotional specificity — not just a vibe, an actual feeling with words.',
  },
  latin: {
    hits: [
      { title: 'Despacito', artist: 'Luis Fonsi ft. Daddy Yankee', technique: 'Rhythmic hook lands before the melody registers — groove creates double impact' },
      { title: 'La Bamba', artist: 'Ritchie Valens', technique: 'Call-and-response hook builds communal energy — crowd becomes part of the performance' },
      { title: 'Malamente', artist: 'Rosalía', technique: 'Genre authenticity as emotional texture — flamenco DNA inside modern production creates depth pastiche cannot' },
    ],
    defining: 'Rhythm is the primary language. Clave pattern locks the groove. Melody responds to rhythm, not the other way around.',
    crossFrom: 'afrobeats', crossTechnique: 'Polyrhythmic percussion layers — stack rhythms that each work alone but create something larger together.',
  },
  reggaeton: {
    hits: [
      { title: 'Gasolina', artist: 'Daddy Yankee', technique: 'Dembow as identity — the rhythm IS the genre signature, hook rides it rather than fighting it' },
      { title: 'Con Calma', artist: 'Daddy Yankee & Snow', technique: 'Sample as cultural memory — familiar rhythm triggers nostalgia while new hook feels immediate' },
      { title: 'Hawái', artist: 'Maluma', technique: 'Romantic vulnerability over hard beat — soft words on a hard rhythm amplifies both' },
    ],
    defining: 'Dembow rhythm is non-negotiable. Hook simplicity is a feature. Repetition is hypnosis.',
    crossFrom: 'hiphop', crossTechnique: 'Lyrical density in verses — pack bars with internal rhyme while letting the hook breathe.',
  },
  folk: {
    hits: [
      { title: 'The Sound of Silence', artist: 'Simon & Garfunkel', technique: 'Sparse arrangement forces lyric to carry everything — no production safety net' },
      { title: 'Skinny Love', artist: 'Bon Iver', technique: 'Emotional ambiguity in concrete images — listener\'s experience fills the meaning' },
      { title: 'Fast Car', artist: 'Tracy Chapman', technique: 'Accumulating specific detail builds an entire emotional world — every object is a feeling' },
    ],
    defining: 'The lyric IS the song. Sparse arrangement. First-person confession. Nature imagery as emotional mirror.',
    crossFrom: 'ss', crossTechnique: 'Confessional directness — the singer is not performing, they are telling the truth.',
  },
  metal: {
    hits: [
      { title: 'Master of Puppets', artist: 'Metallica', technique: 'Opening riff contains the entire emotional argument of the song' },
      { title: 'Paranoid', artist: 'Black Sabbath', technique: 'Tempo as aggression — speed and distortion carry emotion before the first lyric' },
      { title: 'Duality', artist: 'Slipknot', technique: 'Quiet verse / crushing chorus — contrast amplifies both vulnerability and power' },
    ],
    defining: 'Riff supremacy. Dynamics between vulnerability (verse) and power (chorus). Virtuosity must serve emotion, not replace it.',
    crossFrom: 'punk', crossTechnique: 'Urgency over polish — raw energy and directness. The feeling should feel dangerous, not rehearsed.',
  },
  jazz: {
    hits: [
      { title: 'Take Five', artist: 'Dave Brubeck', technique: 'Odd time signature as identity — the "wrong" rhythm becomes the most natural thing after 4 bars' },
      { title: 'So What', artist: 'Miles Davis', technique: 'Space as expression — silence has emotional weight equal to sound' },
      { title: 'Autumn Leaves', artist: 'Standard / Chet Baker', technique: 'Chord substitution creates surprise and longing — the "wrong" note is the most right' },
    ],
    defining: 'Space between notes is the emotion. Harmonic sophistication as vocabulary. What you leave out is the art.',
    crossFrom: 'blues', crossTechnique: 'Blues scale as emotional anchor — underneath harmonic complexity, the pentatonic root keeps the listener feeling.',
  },
  ss: {
    hits: [
      { title: 'Hallelujah', artist: 'Leonard Cohen', technique: 'Sacred language applied to secular pain — collision of registers creates transcendence' },
      { title: 'Gravity', artist: 'John Mayer', technique: 'Chord progression carries more emotion than the lyric — harmony does the heavy lifting' },
      { title: 'The Story', artist: 'Brandi Carlile', technique: 'Quiet confessional explodes — restraint earns the release' },
    ],
    defining: 'Confessional directness. Chord progression as emotional arc. Every word earned. Bridge reframes everything before it.',
    crossFrom: 'folk', crossTechnique: 'Natural imagery as emotional parallel — weather, seasons, water. Let the external mirror the internal without saying so.',
  },
  altrock: {
    hits: [
      { title: 'Creep', artist: 'Radiohead', technique: 'Specific weakness becomes universal anthem — everyone secretly feels the outsider feeling' },
      { title: 'Yellow', artist: 'Coldplay', technique: 'Abstracted emotion in concrete image — "I drew a line for you" is specific, visual, and completely open' },
      { title: 'Mr. Brightside', artist: 'The Killers', technique: 'No intro — drop straight into the emotional state, trust the listener to catch up' },
    ],
    defining: 'Emotional honesty over polish. Quiet-loud dynamic as the central move. Chorus is where the held-back thing finally comes out.',
    crossFrom: 'rock', crossTechnique: 'Riff as emotional identity — the guitar hook tells you the feeling before any lyrics do.',
  },
  reggae: {
    hits: [
      { title: 'No Woman No Cry', artist: 'Bob Marley', technique: 'Anthemic simplicity — the hook is so simple it becomes a prayer through repetition' },
      { title: 'Redemption Song', artist: 'Bob Marley', technique: 'Message over groove — when the lyric matters enough, strip the production to nothing' },
      { title: 'Rivers of Babylon', artist: 'The Melodians', technique: 'Ancient words in new emotional context — the depth of source material resonates even without recognition' },
    ],
    defining: 'Offbeat skank creates space. Message-driven lyric. Repetition as ritual. Hook should feel like a community chant.',
    crossFrom: 'folk', crossTechnique: 'Protest through simplicity — the most powerful political statements are the most direct.',
  },
  afrobeats: {
    hits: [
      { title: 'Essence', artist: 'Wizkid ft. Tems', technique: 'Groove as intimacy — the beat is seductive before a word is sung; melody floats over it like conversation' },
      { title: 'Ye', artist: 'Burna Boy', technique: 'Cultural specificity as universal appeal — deeply specific references translate globally because emotion is universal' },
      { title: 'Calm Down', artist: 'Rema', technique: 'Percussive vocal rhythm — voice becomes part of the rhythm section, syllables land like hi-hat hits' },
    ],
    defining: 'Percussion is the primary language. Vocal melody as counterpoint to groove. Cultural authenticity. Joy as resistance.',
    crossFrom: 'rnb', crossTechnique: 'Melodic vulnerability in the hook — underneath groove confidence, the emotional reveal of needing someone.',
  },
  blues: {
    hits: [
      { title: 'The Thrill Is Gone', artist: 'B.B. King', technique: 'AAB lyric structure — state the pain, deepen it, then the guitar answers what words cannot say' },
      { title: 'Pride and Joy', artist: 'Stevie Ray Vaughan', technique: 'Riff as emotional argument — guitar lick tells you the feeling before the lyric confirms it' },
      { title: 'Cross Road Blues', artist: 'Robert Johnson', technique: 'Mythic imagery in physical detail — the crossroads is both real and symbolic simultaneously' },
    ],
    defining: 'AAB lyric structure. Guitar answers what voice cannot. Suffering as craft. Emotional truth over lyrical complexity.',
    crossFrom: 'gospel', crossTechnique: 'Spiritual intensity in secular pain — let emotional intensity reach toward transcendence even in heartbreak.',
  },
  punk: {
    hits: [
      { title: 'London Calling', artist: 'The Clash', technique: 'Apocalyptic imagery as political urgency — the stakes are everything, delivery is immediate' },
      { title: 'Basket Case', artist: 'Green Day', technique: 'Self-diagnosis as anthem — confessing the anxiety makes everyone else feel less alone' },
      { title: 'Blitzkrieg Bop', artist: 'Ramones', technique: 'Maximum impact in minimum time — 2 minutes, 4 chords, one feeling. Nothing wasted.' },
    ],
    defining: 'Urgency over polish. Direct message. Short, fast, loud. Say the thing — no metaphor shield.',
    crossFrom: 'folk', crossTechnique: 'Protest directness — folk\'s plainspoken truth delivered at punk speed and volume.',
  },
  kpop: {
    hits: [
      { title: 'Dynamite', artist: 'BTS', technique: 'English hook on Korean song — global accessibility sits on top of cultural identity, not instead of it' },
      { title: 'Kill This Love', artist: 'BLACKPINK', technique: 'Pre-chorus is the real payoff — the drop hits harder because the build was perfectly constructed' },
      { title: 'Feel Special', artist: 'TWICE', technique: 'Direct emotional address at maximum vulnerability — "you make me feel special" is the whole thesis' },
    ],
    defining: 'Pre-chorus tension architecture. Hook accessibility over lyrical complexity. Production must sparkle.',
    crossFrom: 'edm', crossTechnique: 'Drop architecture — the silence before the drop is part of the drop. Build then release everything at once.',
  },
  neosoul: {
    hits: [
      { title: 'On & On', artist: 'Erykah Badu', technique: 'Jazz harmony under R&B groove — chord extensions do emotional work the lyric only hints at' },
      { title: 'Bag Lady', artist: 'Erykah Badu', technique: 'Single metaphor sustained through the entire song — one image carries all the meaning' },
      { title: 'Best Part', artist: 'Daniel Caesar ft. H.E.R.', technique: 'Harmonic space amplifies vocal — fewer chords creates room for the voice to breathe and mean everything' },
    ],
    defining: 'Jazz harmony meets R&B groove. The song breathes. Confessional lyric under musical sophistication. Space is as important as sound.',
    crossFrom: 'jazz', crossTechnique: 'Unexpected chord substitution at emotional peak — the "wrong" chord that is most right creates surprise and longing.',
  },
  gospel: {
    hits: [
      { title: 'Total Praise', artist: 'Richard Smallwood', technique: 'Choir crescendo as spiritual escalation — sound of community believing amplifies individual conviction' },
      { title: 'Goodness of God', artist: 'CeCe Winans', technique: 'Testimony structure — verse is the before, chorus is the after; the contrast IS the emotional argument' },
      { title: 'I Can Only Imagine', artist: 'MercyMe', technique: 'Wonder as lyric strategy — asking the question creates more emotion than asserting the answer' },
    ],
    defining: 'Community call-and-response. Testimony structure. Vocal crescendo as spiritual argument. Repetition as conviction.',
    crossFrom: 'rnb', crossTechnique: 'Contemporary arrangement under spiritual message — modern groove makes the message land in the present moment.',
  },
  parody: {
    hits: [
      { title: 'Word Crimes', artist: 'Weird Al Yankovic', technique: 'Maintain original song structure exactly — subvert only the subject matter, let collision create the comedy' },
      { title: 'White & Nerdy', artist: 'Weird Al Yankovic', technique: 'Specific cultural references > generic jokes — exact detail is always funnier than vague category' },
      { title: 'Amish Paradise', artist: 'Weird Al Yankovic', technique: 'Commit to the premise completely — play it straight, never wink. The bit lands harder when you believe it.' },
    ],
    defining: 'Preserve original song structure. Subvert only the subject. Specificity is the punchline. Full commitment to the premise.',
    crossFrom: 'tvmusical', crossTechnique: 'Theatrical commitment — play it completely straight, never wink. The joke lands harder when the performer believes it.',
  },
  comedy: {
    hits: [
      { title: 'That Funny Feeling', artist: 'Bo Burnham', technique: 'Specificity is the punchline — exact cultural reference creates recognition that lands like a gut punch' },
      { title: 'Hiphopopotamus vs. Rhymenoceros', artist: 'Flight of the Conchords', technique: 'Earnestness as comedy — the gap between sincerity and absurdity IS the joke' },
      { title: 'I\'m On A Boat', artist: 'The Lonely Island', technique: 'Full commitment to a ridiculous premise — comedy is in how seriously everyone takes it' },
    ],
    defining: 'The unexpected word in the expected slot is the entire joke. Specific > general always. Commit to the premise completely.',
    crossFrom: 'pop', crossTechnique: 'Genuine hook — the song must also work musically; the comedy needs contrast to land against.',
  },
  children: {
    hits: [
      { title: 'You\'ve Got a Friend in Me', artist: 'Randy Newman', technique: 'Adult emotion in simple language — warmth is real and unsentimental. Kids feel sincerity.' },
      { title: 'Let It Go', artist: 'Idina Menzel / Frozen', technique: 'Empowerment arc in 3 minutes — verse establishes constraint, chorus breaks it, bridge commits to freedom' },
      { title: 'The Bare Necessities', artist: 'Phil Harris / Jungle Book', technique: 'Rhythm as invitation — groove makes a child want to move before they understand the words' },
    ],
    defining: 'Simple vocabulary, genuine emotion. Hook invites movement. Clear narrative arc with resolution. Never condescending.',
    crossFrom: 'folk', crossTechnique: 'Repetition as ritual — the hook must be instantly joinable so the child learns it by singing along.',
  },
  tvmusical: {
    hits: [
      { title: 'My Shot (Hamilton)', artist: 'Lin-Manuel Miranda', technique: 'Form matches character — rap form carries a founding father\'s ambition and urgency simultaneously' },
      { title: 'Defying Gravity (Wicked)', artist: 'Idina Menzel', technique: 'Song replaces dialogue — this moment can ONLY be sung; music carries what words alone cannot' },
      { title: 'On My Own (Les Misérables)', artist: 'Schönberg / Boublil', technique: 'Unreliable narrator in song — the gap between what she sings and what is true IS the tragedy' },
    ],
    defining: 'Song replaces what dialogue cannot express. Character is revealed, not described. Rhyme scheme IS personality. Lyric must advance the story.',
    crossFrom: 'pop', crossTechnique: 'Hook accessibility — the tune must outlive the show. Singable leaving the venue.',
  },
};

function buildTopTierNote(genre, crossGenre) {
  const ref = GENRE_HIT_REFERENCES[genre];
  if (!ref) return '';
  const picks = ref.hits.slice(0, 2);
  const refLines = picks.map(h => `  • "${h.title}" (${h.artist}): ${h.technique}`).join('\n');
  const xKey    = crossGenre || ref.crossFrom;
  const xLabel  = GENRE_LABELS[xKey] || xKey;
  const xNote   = ref.crossTechnique ? `\nCROSS-TRAIN from ${xLabel}: ${ref.crossTechnique}` : '';
  return `\n\nPLATINUM MODE — TOP 5% TARGET:\nWrite at the level of the best ${GENRE_LABELS[genre] || genre} songs ever made.\nReference:\n${refLines}\nDEFINING TECHNIQUE: ${ref.defining}${xNote}\nEvery line must justify its existence. The hook must be undeniable.`;
}

const PRODUCTION_ARCHETYPES = {
  'trap-808':        { label: 'Trap / 808', genres: ['hiphop','reggaeton'], kit: 'TR-808 or Plug-In snare, hard 808 bass, hi-hat rolls (1/16–1/32)', tempo: '130–145 BPM', signature: 'Sliding 808 glide, snare choke, hi-hat velocity variation, dark minor keys' },
  'live-band':       { label: 'Live Band', genres: ['rock','country','blues','folk','jazz','neosoul','gospel'], kit: 'Acoustic kit, bass guitar, real instruments', tempo: '70–140 BPM', signature: 'Room bleed, human timing fluctuation, chord stabs, real amp tone' },
  'orchestral-pop':  { label: 'Orchestral Pop', genres: ['pop','rnb','ss'], kit: 'Strings, piano, light drums, orchestral hits', tempo: '70–100 BPM', signature: 'String swells into chorus, piano counter-melody, dynamic orchestra builds' },
  'bedroom-pop':     { label: 'Bedroom Pop', genres: ['pop','folk','ss','altrock'], kit: 'Lo-fi samples, MIDI keys, soft drums, field recordings', tempo: '75–110 BPM', signature: 'Cassette warmth, intimate reverb, imperfect vocal takes kept, soft clipping' },
  'electronic-atm':  { label: 'Electronic / Atmospheric', genres: ['edm','kpop','afrobeats','altrock'], kit: 'Synthesizers, drum machine, arpeggiators, granular pads', tempo: '110–145 BPM', signature: 'Sidechain pumping, filter sweeps, epic drop, evolving pad textures' },
  'acoustic-roots':  { label: 'Acoustic / Roots', genres: ['folk','country','blues','reggae'], kit: 'Acoustic guitar, upright bass, brushed drums, harmonica', tempo: '65–110 BPM', signature: 'Natural reverb, tape warmth, chord voicing on acoustic, no samples' },
  'club-dance':      { label: 'Club / Dance', genres: ['edm','latin','reggaeton','afrobeats','kpop'], kit: 'Kick-dominant, synth bass, stabs, high percussion', tempo: '120–135 BPM', signature: 'Four-on-the-floor kick, percussive groove, breakdown/drop structure' },
  'gospel-choir':    { label: 'Gospel / Choir', genres: ['gospel','rnb','neosoul'], kit: 'Hammond organ, choir, live piano, gospel drums', tempo: '70–100 BPM', signature: 'Call-and-response, organ swells, choir harmonics, building intensity' },
  'punk-garage':     { label: 'Punk / Garage', genres: ['punk','metal','rock'], kit: 'Distorted guitar, raw drums, bass overdrive', tempo: '140–200 BPM', signature: 'Raw recording, minimal production, energy over perfection' },
  'latin-urban':     { label: 'Latin Urban', genres: ['latin','reggaeton'], kit: 'Dembow rhythm, brass, synth bass, clave percussion', tempo: '95–105 BPM', signature: 'Clave pattern, brass hits, rhythmic syncopation, urban production meets live instruments' },
};

// ═══════════════════════════════════════════════════════════════════════════
// GENRE SECTION DNA
// Per-genre data for bridge harmony, weighted archetype preferences,
// counter-melody role, real song references, outro + verse-2 tendencies.
//
// Selection logic (pickWeightedArchetype):
//   70% chance → pick from genre's preferred list (weighted toward first)
//   30% chance → pick from full pool (true surprise)
// ═══════════════════════════════════════════════════════════════════════════

const GENRE_SECTION_DNA = {
  pop: {
    bridge: {
      harmonic: '♭VI → ♭VII → I (borrowed minor lift) or iv → ♭VII for tension. Often +2 semitone key change before final chorus — the "pop uplift." Adds 1-2 chords not heard in verse or chorus.',
      counter: 'Strings or synth pad takes the melodic lead while the vocal strips back to its most vulnerable register.',
      preferred_bridge: ['Emotional Reversal', 'Confessional Drop', 'Escalation Climb', 'Lyric Callback / Recontextualise'],
      preferred_outro: ['Crowd Takeover', 'Spiral Vamp', 'Callback Resolution'],
      preferred_verse2: ['Deeper Specific', 'Consequence', 'Zoom Out'],
      preferred_prechorus: ['Tension Ramp', 'Lyric Elevator', 'Whisper to Roar', 'Question Drop'],
      preferred_postchorus: ['Ad-Lib Showcase', 'Hook Echo', 'Breath and Reset'],
      examples: '"Someone Like You" (Adele) — bridge strips to voice + piano, deceptive cadence V→vi, most vulnerable moment. "Rolling in the Deep" — bridge builds over ♭VI→♭VII then modulates up. "Bad Guy" (Billie Eilish) — bridge near-silence then explosion back.',
    },
  },
  hiphop: {
    bridge: {
      harmonic: 'Melodic bridge over i minor or ♭VII for emotional lift. Sung bridge: maj7 or 9 extensions contrast the harder verse chords. Rapped bridge: strip to kick+808 only, same loop. Beat switch = move to a completely new key/tempo area.',
      counter: 'Producer melody or vocal sample carries the bridge — the MC steps back. The beat IS the bridge instrument.',
      preferred_bridge: ['Rhythmic Breakdown', 'Left-Turn Narrative', 'Confessional Drop', 'Spoken Interlude / Monologue'],
      preferred_outro: ['Cold Stop', 'Counter-Melody Ascent', 'Crowd Takeover'],
      preferred_verse2: ['Antagonist Voice', 'Time Jump', 'Deeper Specific', 'Consequence'],
      preferred_prechorus: ['Velocity Surge', 'Tension Ramp', 'Call-Setup'],
      preferred_postchorus: ['Drop Groove', 'Punchy Counter-Statement', 'Ad-Lib Showcase'],
      examples: '"All Falls Down" (Kanye) — sung emotional bridge over soft piano completely contrasts rapped verses. "HUMBLE." (Kendrick) — bridge strips to near-silence before final verse explosion. "DNA." (Kendrick) — bridge is a full beat switch into different key area.',
    },
  },
  rnb: {
    bridge: {
      harmonic: 'Half-time feel: drums drop to half-time, harmony gets extended (maj9, min11). ♭VII → IV → I or sustained vamp on IV. Modulate up 2-3 semitones for the falsetto peak.',
      counter: 'Background vocal harmonies thicken during the bridge — they become the texture, not the lead.',
      preferred_bridge: ['Pre-Outro Vamp Build', 'Confessional Drop', 'Emotional Reversal', 'Escalation Climb'],
      preferred_outro: ['Spiral Vamp', 'Crowd Takeover', 'Counter-Melody Ascent'],
      preferred_verse2: ['Consequence', 'Zoom Out', 'Deeper Specific'],
      preferred_prechorus: ['Lyric Elevator', 'Harmonic Pivot', 'Whisper to Roar'],
      preferred_postchorus: ['Ad-Lib Showcase', 'Hook Echo', 'Punchy Counter-Statement'],
      examples: '"Untitled (How Does It Feel)" (D\'Angelo) — bridge is pure vocal improv over minimal chord. "The Weekend" (SZA) — bridge modulates up + falsetto peak. "Crazy in Love" — bridge strips to bass + vocal, then explodes.',
    },
  },
  neosoul: {
    bridge: {
      harmonic: 'Most harmonically adventurous section: mode mixture (Dorian ↔ Aeolian), borrowed ♭III or ♭VI chords. Half-time Dilla drag. Chord voicings add 9ths and 11ths not used elsewhere. Stays rhythmically behind the beat.',
      counter: 'Rhodes or guitar plays a new melodic counter-line during the bridge — this is the moment the instrumental voice takes over.',
      preferred_bridge: ['Spoken Interlude / Monologue', 'Pre-Outro Vamp Build', 'Lyric Callback / Recontextualise', 'Confessional Drop'],
      preferred_outro: ['Spiral Vamp', 'Counter-Melody Ascent', 'Harmonic Drift'],
      preferred_verse2: ['Deeper Specific', 'The Other Side', 'Consequence'],
      preferred_prechorus: ['Harmonic Pivot', 'Lyric Elevator', 'Whisper to Roar'],
      preferred_postchorus: ['Ad-Lib Showcase', 'Hook Echo', 'Drop Groove'],
      examples: '"On & On" (Erykah Badu) — bridge is a spoken meditation over a single chord vamp. "Brown Skin" (India.Arie) — bridge deconstructs the groove to voice + guitar. Common "The Light" — bridge is the most vulnerable emotional turn.',
    },
  },
  jazz: {
    bridge: {
      harmonic: 'AABA B-section: III7 → VI7 → II7 → V7 (cycle of 5ths into new key center). Tritone subs common: ♭II7 replaces V7. Modulates to a new tonal area and returns via ii-V-I. This is the harmonic adventure — not a rest, a journey.',
      counter: 'The comping instrument (piano or guitar) breaks from accompaniment and plays a counter-melodic response during the bridge B-section.',
      preferred_bridge: ['Left-Turn Narrative', 'Lyric Callback / Recontextualise', 'Emotional Reversal'],
      preferred_outro: ['Harmonic Drift', 'Dialogue / Spoken Coda', 'Counter-Melody Ascent'],
      preferred_verse2: ['The Other Side', 'Deeper Specific', 'Time Jump'],
      preferred_prechorus: ['Harmonic Pivot', 'Question Drop', 'Tension Ramp'],
      preferred_postchorus: ['Hook Echo', 'Ad-Lib Showcase', 'Breath and Reset'],
      examples: '"In a Sentimental Mood" — B-section modulates from Dm to F major and back via cycle of 5ths. "All the Things You Are" — bridge cycles through 4 key areas in 8 bars. "Autumn Leaves" — B-section lands on unexpected ♭VII before resolving home.',
    },
  },
  blues: {
    bridge: {
      harmonic: 'Turnaround (bars 11-12 of the 12-bar): I → ♭VII → ♭VI → V7 (descending bass line) OR I → VI7 → ii7 → V7. Guitar solo IS the bridge. The turnaround creates tension that pulls into the next verse.',
      counter: 'Guitar answers the vocal in the turnaround — this call-and-response IS blues structure. The guitar is the bridge instrument.',
      preferred_bridge: ['Rhythmic Breakdown', 'Lyric Callback / Recontextualise', 'Escalation Climb'],
      preferred_outro: ['Counter-Melody Ascent', 'Harmonic Drift', 'Spiral Vamp'],
      preferred_verse2: ['Deeper Specific', 'Antagonist Voice', 'Consequence'],
      preferred_prechorus: ['Call-Setup', 'Tension Ramp', 'Lyric Elevator'],
      preferred_postchorus: ['Drop Groove', 'Hook Echo', 'Punchy Counter-Statement'],
      examples: '"The Thrill Is Gone" (B.B. King) — turnaround lands on VI7 minor creating maximum tension. "Hoochie Coochie Man" — stop-time bridge before the last verse. "Sweet Home Chicago" — turnaround accelerates the groove into final verse.',
    },
  },
  gospel: {
    bridge: {
      harmonic: 'CLIMAX — modulate up a whole step (Nashville move: I → II major with iii-vi-ii-V7 approach). Vamp on IV chord. Choir enters or doubles in octaves. The harmonic lift IS the spiritual lift — the modulation is the message.',
      counter: 'Choir sings counter-melody AGAINST the lead — lead goes up, choir goes down. Call-and-response intensifies during the vamp.',
      preferred_bridge: ['Escalation Climb', 'Pre-Outro Vamp Build', 'Rhythmic Breakdown'],
      preferred_outro: ['Crowd Takeover', 'Spiral Vamp', 'Pre-Outro Vamp Build'],
      preferred_verse2: ['Consequence', 'Zoom Out', 'Deeper Specific'],
      preferred_prechorus: ['Lyric Elevator', 'Whisper to Roar', 'Call-Setup'],
      preferred_postchorus: ['Ad-Lib Showcase', 'Breath and Reset', 'Drop Groove'],
      examples: '"Oh Happy Day" — bridge modulates up and vamps endlessly, choir takeover. "I Never Loved a Man" (Aretha) — bridge is rhythmic percussion build that lifts the whole congregation. "Break Every Chain" — bridge is sustained single-chord vamp that builds for 2+ minutes.',
    },
  },
  country: {
    bridge: {
      harmonic: '"The Turn" — stays on V7 for maximum unresolved tension, then releases to I for the final chorus. Or: moves to IV and stays, then V7 → I return. No key change. The harmony is simple — the emotional weight comes from the lyrics revealing something new.',
      counter: 'Pedal steel or fiddle plays a counter-melody under the bridge vocal — the most emotional instrument in country leads here.',
      preferred_bridge: ['Confessional Drop', 'Left-Turn Narrative', 'Lyric Callback / Recontextualise'],
      preferred_outro: ['Callback Resolution', 'Cold Stop', 'Spiral Vamp'],
      preferred_verse2: ['Time Jump', 'Antagonist Voice', 'Consequence'],
      preferred_prechorus: ['Lyric Elevator', 'Tension Ramp', 'Question Drop'],
      preferred_postchorus: ['Hook Echo', 'Breath and Reset', 'Punchy Counter-Statement'],
      examples: '"The Dance" (Garth Brooks) — bridge reveals the philosophical turn that reframes the whole song. "Before He Cheats" — bridge is the most specific, most violent verse. "Whiskey Glasses" — bridge doubles down on the emotional denial.',
    },
  },
  rock: {
    bridge: {
      harmonic: '♭VI → ♭VII → I power move (the "Stadium Rock" chord sequence). Or: drop to I minor for darkness before returning to major. Half-step key modulation for the final chorus. The bridge earns the final chorus explosion.',
      counter: 'Second guitar plays a contrasting melodic line — clean against distortion, or a sustained note while the rhythm guitar drives.',
      preferred_bridge: ['Escalation Climb', 'Rhythmic Breakdown', 'Confessional Drop'],
      preferred_outro: ['Cold Stop', 'Counter-Melody Ascent', 'Crowd Takeover'],
      preferred_verse2: ['Consequence', 'Zoom Out', 'Deeper Specific'],
      preferred_prechorus: ['Tension Ramp', 'Velocity Surge', 'Whisper to Roar'],
      preferred_postchorus: ['Drop Groove', 'Hook Echo', 'Breath and Reset'],
      examples: '"Under the Bridge" (RHCP) — bridge key shift into unexpected harmonic area. "Everlong" (Foo Fighters) — quiet bridge then full-band explosion back. "Don\'t Look Back in Anger" (Oasis) — bridge strips to piano then rebuilds.',
    },
  },
  altrock: {
    bridge: {
      harmonic: 'Quiet-LOUD: strip to clean guitar + whispered vocal, then full distortion wall. ♭VI chord adds unexpected darkness. Or: drone on one chord and let the dynamics do the work. The bridge IS the contrast.',
      counter: 'Bass takes a counter-melodic role when guitars go quiet — then falls back into the root when full band returns.',
      preferred_bridge: ['Rhythmic Breakdown', 'Confessional Drop', 'Spoken Interlude / Monologue'],
      preferred_outro: ['Cold Stop', 'Harmonic Drift', 'Counter-Melody Ascent'],
      preferred_verse2: ['The Other Side', 'Consequence', 'Deeper Specific'],
      preferred_prechorus: ['Whisper to Roar', 'Tension Ramp', 'Question Drop'],
      preferred_postchorus: ['Drop Groove', 'Punchy Counter-Statement', 'Breath and Reset'],
      examples: '"Smells Like Teen Spirit" — quiet bridge, then full-band explosion that redefined a decade. "Mr. Brightside" — no bridge, sustained tension instead. "Fake Plastic Trees" — bridge is the most sparse, most devastating.',
    },
  },
  edm: {
    bridge: {
      harmonic: 'Pre-drop breakdown: strip ALL harmonic content except one sustained synth note or pad on I. The absence of harmony IS the tension. Then the drop restores full harmonic power — the resolution after 32 bars of suspended silence.',
      counter: 'A single melodic motif — the hook reduced to its simplest form — plays alone during the breakdown before the drop.',
      preferred_bridge: ['Rhythmic Breakdown', 'Emotional Reversal', 'Pre-Outro Vamp Build'],
      preferred_outro: ['Cold Stop', 'Crowd Takeover', 'Spiral Vamp'],
      preferred_verse2: ['Zoom Out', 'Deeper Specific', 'Consequence'],
      preferred_prechorus: ['Velocity Surge', 'Tension Ramp', 'Harmonic Pivot'],
      preferred_postchorus: ['Drop Groove', 'Hook Echo', 'Breath and Reset'],
      examples: '"Levels" (Avicii) — 32-bar breakdown to a single melody, then drop. "Ghosts \'n\' Stuff" (Deadmau5) — filter sweep from silence into full-power drop. "One More Time" (Daft Punk) — bridge strips the groove to a single repeating phrase.',
    },
  },
  funk: {
    bridge: {
      harmonic: 'Funk break / synth or guitar solo: tight groove on I or vi with chromatic approach chords (♭III→II→I passing motion). The harmony barely moves — the RHYTHM changes. Bridge is a rhythmic contrast, not a harmonic journey.',
      counter: 'Horn section (brass) plays the bridge counter-melody — the rhythm section locks tighter while brass takes the melodic lead.',
      preferred_bridge: ['Rhythmic Breakdown', 'Pre-Outro Vamp Build', 'Escalation Climb'],
      preferred_outro: ['Crowd Takeover', 'Spiral Vamp', 'Counter-Melody Ascent'],
      preferred_verse2: ['Deeper Specific', 'Consequence', 'Zoom Out'],
      preferred_prechorus: ['Velocity Surge', 'Call-Setup', 'Tension Ramp'],
      preferred_postchorus: ['Drop Groove', 'Ad-Lib Showcase', 'Punchy Counter-Statement'],
      examples: '"Give Up the Funk" (Parliament) — bridge is pure call-and-response, horn section drives. "Super Freak" (Rick James) — bridge locks into a tighter syncopated figure. "September" (EW&F) — bridge is horn-section showcase over the same groove.',
    },
  },
  soul: {
    bridge: {
      harmonic: 'Organ swell moment: ii7 → V7 → I with extra 7th extensions. Gospel turnaround (vi → ii → V7) adds depth. The bridge is the most emotionally saturated chord — add 9ths and 13ths here that weren\'t in the verse.',
      counter: 'Background vocalists take over the response role — they stop being background and become equal voices in the bridge.',
      preferred_bridge: ['Escalation Climb', 'Pre-Outro Vamp Build', 'Confessional Drop'],
      preferred_outro: ['Spiral Vamp', 'Crowd Takeover', 'Counter-Melody Ascent'],
      preferred_verse2: ['Consequence', 'Deeper Specific', 'Zoom Out'],
      preferred_prechorus: ['Lyric Elevator', 'Whisper to Roar', 'Call-Setup'],
      preferred_postchorus: ['Ad-Lib Showcase', 'Hook Echo', 'Punchy Counter-Statement'],
      examples: '"Respect" (Aretha) — bridge is vocal ad-lib showcase, most technically demanding. "Ain\'t No Sunshine" — bridge single-phrase repetition that becomes a chant. "A Change Is Gonna Come" — bridge is the theological centre of the song.',
    },
  },
  reggae: {
    bridge: {
      harmonic: 'Dub break: same chord (I or i → ♭VII alternation), but production transforms. Guitar drops out, bass locks with drums, heavy reverb/delay echoes the last phrase. The bridge is a texture change, not a harmonic one.',
      counter: 'Melodica or flute carries the melodic line during the dub break — the rhythm instruments retreat and the melodic instrument leads.',
      preferred_bridge: ['Rhythmic Breakdown', 'Left-Turn Narrative', 'Lyric Callback / Recontextualise'],
      preferred_outro: ['Spiral Vamp', 'Harmonic Drift', 'Crowd Takeover'],
      preferred_verse2: ['Deeper Specific', 'Zoom Out', 'Consequence'],
      preferred_prechorus: ['Call-Setup', 'Tension Ramp', 'Question Drop'],
      preferred_postchorus: ['Drop Groove', 'Breath and Reset', 'Hook Echo'],
      examples: '"No Woman No Cry" — bridge is dub echo vamp, bass and drums carry. "Many Rivers to Cross" — bridge is a piano-led confessional. "Rivers of Babylon" — bridge is a pure melodic counter-statement.',
    },
  },
  afrobeats: {
    bridge: {
      harmonic: 'I → IV → V → IV loop with intensified percussion — no modulation, the groove IS the harmony. Bridge adds talking drum, shekere, and more vocal texture. The polyrhythm gets more complex, not simpler.',
      counter: 'Highlife guitar plays a more elaborate ostinato during the bridge — the repeating pattern becomes the emotional carrier.',
      preferred_bridge: ['Rhythmic Breakdown', 'Left-Turn Narrative', 'Pre-Outro Vamp Build'],
      preferred_outro: ['Crowd Takeover', 'Spiral Vamp', 'Counter-Melody Ascent'],
      preferred_verse2: ['Deeper Specific', 'Consequence', 'Zoom Out'],
      preferred_prechorus: ['Velocity Surge', 'Call-Setup', 'Tension Ramp'],
      preferred_postchorus: ['Ad-Lib Showcase', 'Drop Groove', 'Breath and Reset'],
      examples: '"Essence" (Wizkid) — bridge is pure percussion build then release. "Last Last" (Burna Boy) — bridge strips to drums and bass, then rebuilds with layers. "Ye" (Burna Boy) — bridge is the most vulnerable vocal moment in the song.',
    },
  },
  latin: {
    bridge: {
      harmonic: 'Clave continues through bridge but harmony shifts to relative major/minor. Montuno section: repeated 2-chord vamp (I–V or i–♭VII) where the clave and piano lock. Modulate up 2-3 semitones via chromatic bass approach: IV→V→I in new key.',
      counter: 'Brass section (trumpets, trombones) takes the melodic counter during the bridge — the montuno piano answers them.',
      preferred_bridge: ['Rhythmic Breakdown', 'Pre-Outro Vamp Build', 'Escalation Climb'],
      preferred_outro: ['Crowd Takeover', 'Spiral Vamp', 'Callback Resolution'],
      preferred_verse2: ['Deeper Specific', 'Consequence', 'The Other Side'],
      preferred_prechorus: ['Velocity Surge', 'Tension Ramp', 'Call-Setup'],
      preferred_postchorus: ['Ad-Lib Showcase', 'Drop Groove', 'Punchy Counter-Statement'],
      examples: '"Vivir Mi Vida" (Marc Anthony) — bridge is pure salsa brass + clave break. "Bailando" — bridge adds timbales/congas complexity, rhythm IS the transition. "Bésame Mucho" — bridge returns to tonic via chromatic descent.',
    },
  },
  kpop: {
    bridge: {
      harmonic: 'Rap break over relative minor or borrowed parallel-key chords. Key change UP +1 or +2 semitones before final chorus — this is the K-pop non-negotiable. The harmonic lift coincides with the emotional peak and choreography climax.',
      counter: 'Synth or string post-bridge line plays a counter-melody that re-harmonises the hook in the new key, preparing the final chorus.',
      preferred_bridge: ['Rhythmic Breakdown', 'Left-Turn Narrative', 'Escalation Climb'],
      preferred_outro: ['Cold Stop', 'Crowd Takeover', 'Callback Resolution'],
      preferred_verse2: ['Deeper Specific', 'Consequence', 'The Other Side'],
      preferred_prechorus: ['Tension Ramp', 'Velocity Surge', 'Harmonic Pivot'],
      preferred_postchorus: ['Hook Echo', 'Ad-Lib Showcase', 'Punchy Counter-Statement'],
      examples: '"Dynamite" (BTS) — bridge is rap break then key change up before final chorus. "Pink Venom" (BLACKPINK) — bridge adds a contrasting melodic section. "Attention" (NewJeans) — bridge strips the K-pop formula, minimal and unexpected.',
    },
  },
  ss: {
    bridge: {
      harmonic: 'Relative minor shift (I→vi) or unexpected deceptive cadence (V→vi instead of V→I). Often a capo change for tonal shift. The harmony is the simplest in the song — the lyric revelation carries all the weight.',
      counter: 'Acoustic guitar fingerpicking pattern changes for the bridge — a new pattern becomes the emotional signal. Cello or second acoustic voice enters only here.',
      preferred_bridge: ['Confessional Drop', 'Spoken Interlude / Monologue', 'Lyric Callback / Recontextualise'],
      preferred_outro: ['Dialogue / Spoken Coda', 'Callback Resolution', 'Harmonic Drift'],
      preferred_verse2: ['Deeper Specific', 'The Other Side', 'Time Jump'],
      preferred_prechorus: ['Question Drop', 'Lyric Elevator', 'Whisper to Roar'],
      preferred_postchorus: ['Breath and Reset', 'Hook Echo', 'Punchy Counter-Statement'],
      examples: '"Fast Car" (Tracy Chapman) — bridge is a lyrical revelation over the same harmonic loop. "The Night Will Always Win" (Manchester Orchestra) — bridge is a whispered confession. "The Blower\'s Daughter" — bridge strips to a single note held.',
    },
  },
  punk: {
    bridge: {
      harmonic: 'I → I → I → I (pure power chord drive) or sudden IV→V→I crash. Bridge may drop to silence for 1 bar then explode back. The "anti-bridge" — no harmonic complexity, just maximum energy disruption.',
      counter: 'There is no counter-melody. The bridge IS the disruption. Drums and bass lock harder as guitars stop.',
      preferred_bridge: ['Escalation Climb', 'Rhythmic Breakdown', 'Spoken Interlude / Monologue'],
      preferred_outro: ['Cold Stop', 'Crowd Takeover', 'Callback Resolution'],
      preferred_verse2: ['Consequence', 'Antagonist Voice', 'Zoom Out'],
      preferred_prechorus: ['Velocity Surge', 'Tension Ramp', 'Call-Setup'],
      preferred_postchorus: ['Drop Groove', 'Punchy Counter-Statement', 'Breath and Reset'],
      examples: '"God Save the Queen" (Sex Pistols) — bridge is the loudest, most hostile moment. "Basket Case" (Green Day) — bridge drops to clean guitar then explodes back. "I Wanna Be Sedated" — no bridge, one constant assault.',
    },
  },
  tvmusical: {
    bridge: {
      harmonic: 'Dramatic modulation up 1-3 semitones for the climax — usually the "+3 semitone theatrical key change." Unexpected borrowed chords for emotional revelation. The bridge is where the CHARACTER changes — the harmony mirrors their internal shift.',
      counter: 'Full orchestral counter-melody during the bridge — strings or brass plays a dramatic answer to the vocal.',
      preferred_bridge: ['Escalation Climb', 'Left-Turn Narrative', 'Emotional Reversal'],
      preferred_outro: ['Callback Resolution', 'Dialogue / Spoken Coda', 'Cold Stop'],
      preferred_verse2: ['Consequence', 'The Other Side', 'Time Jump'],
      preferred_prechorus: ['Lyric Elevator', 'Whisper to Roar', 'Harmonic Pivot'],
      preferred_postchorus: ['Ad-Lib Showcase', 'Hook Echo', 'Punchy Counter-Statement'],
      examples: '"Defying Gravity" (Wicked) — bridge modulates up 3 semitones to the climax that changes the character. "Being Alive" (Company) — bridge is the emotional core of the entire show. "Seasons of Love" (RENT) — bridge adds new melodic counter-line over the whole cast.',
    },
  },
};

// Weighted archetype picker:
// 70% → one of the genre's preferred list (slight bias toward first = most canonical)
// 30% → fully random from entire pool (surprise / rule-break)
function pickWeightedArchetype(fullPool, preferredNames) {
  if (!preferredNames || !preferredNames.length) return pickRandom(fullPool);
  const usePref = Math.random() < 0.70;
  if (usePref) {
    // Weight toward earlier items: index 0 gets weight 4, index 1 → 3, etc.
    const weights = preferredNames.map((_, i) => Math.max(4 - i, 1));
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < preferredNames.length; i++) {
      r -= weights[i];
      if (r <= 0) {
        const found = fullPool.find(a => a.name === preferredNames[i]);
        if (found) return found;
      }
    }
    return pickRandom(fullPool.filter(a => preferredNames.includes(a.name)) || fullPool);
  }
  return pickRandom(fullPool);
}

function buildSongPrompt(params) {
  const {
    genre = 'pop', topic: rawTopic = '', mood: rawMood = 'Emotional', vocal: rawVocal = 'any',
    structure = 'standard', era = 'modern', length = 'medium',
    quality = 'high', theoryLevel = 'standard', mode = 'auto',
    substyle = '', hookStyle = 'auto', voice = {}, albumTrack = null,
    blend = {}, bracketMode = 'suno', ageGroup = '',
    emotionalArc = 'none', seedLine = '', syllableCap = 0,
    platform = 'suno', avoidPatterns = [], dualPerspective = false, platinum = false,
    freestyleMode = false, breakRule = false, eraUndertone = '',
    graftGenre = '', graftSection = 'chorus', invertCounter = false
  } = params;

  const topic = sanitizeInput(rawTopic);
  const mood = sanitizeInput(rawMood);
  const vocal = sanitizeInput(rawVocal);

  const genreLabel = GENRE_LABELS[genre] || genre;
  // Freestyle = bars-only override regardless of genre
  const structStr = freestyleMode
    ? '[Intro | optional, beat only] → [Verse 1 | continuous bars, no hook] → [Verse 2 | continuous bars, no hook] → [Verse 3 | continuous bars, no hook] → [Outro | bars trail off]'
    : (STRUCTURES[structure] || STRUCTURES.standard);
  const freestyleSongLock = freestyleMode ? `

🎤 FREESTYLE MODE — HARD STRUCTURAL OVERRIDE (non-negotiable, supersedes the genre's default structure):
- This is a freestyle. NO hook. NO chorus. NO pre-chorus. NO bridge. NO post-chorus. NO refrain. NO sung melodic hook of any kind.
- Output is sequential VERSES only — continuous bars / lines from start to finish.
- Allowed section markers: [Intro] (optional), [Verse 1], [Verse 2], [Verse 3], [Verse 4] (if length permits), [Outro] (optional). NOTHING ELSE.
- DO NOT emit [Hook], [Chorus], [Pre-Chorus], [Bridge], [Post-Chorus], [Refrain], [Drop] under any circumstances — even if the genre normally requires them.
- Energy and arc come from line-by-line escalation across verses, not from a verse↔chorus dynamic.
- Each verse: 12-24 lines of unbroken thought. Let the idea drive length, not a template.` : '';

  // Bible notes
  const bibleNote = GENRE_BIBLE[genre] ? `\nGenre DNA: ${GENRE_BIBLE[genre].dna}` : '';
  const counterNote = GENRE_BIBLE[genre]?.counter
    ? `\nCounter-melody device for this genre: ${GENRE_BIBLE[genre].counter.device} — ${GENRE_BIBLE[genre].counter.does} Include this in the COUNTERMELODY section and embed it in the SONG PROMPT.`
    : '';

  // Outlier songs
  const genreOutliers = GENRE_BIBLE[genre]?.outliers;
  const outlierSongsNote = genreOutliers?.length
    ? `\n\nRULE-BREAKING PERMISSION — Famous ${genreLabel} songs that broke the rules and still hit:\n${genreOutliers.map(o => `• ${o.song}: broke "${o.rule}" → ${o.result}`).join('\n')}\nThese prove: genre rules are starting points, not ceilings. If the emotional truth demands it, break a rule.`
    : '';

  // Music theory
  const modeDef = mode !== 'auto' ? MUSIC_THEORY_BIBLE.modes[mode] : null;
  const genreScales = MUSIC_THEORY_BIBLE.genreScales[genre] || [];
  const eligibleOutliers = Object.values(MUSIC_THEORY_BIBLE.outlierChords)
    .filter(o => o.genres.includes(genre))
    .sort((a, b) => b.tension - a.tension);
  const outlierCount = theoryLevel === 'avantgarde' ? 2 : theoryLevel === 'adventurous' ? 1 : 0;
  const chosenOutliers = eligibleOutliers.slice(0, outlierCount);
  const theoryNote = `
MUSIC THEORY CONTEXT (apply to CHORD PROGRESSION and THEORY ANALYSIS sections):
- Scale palette for ${genreLabel}: ${genreScales.join(', ') || 'Major / Minor diatonic'}
${modeDef ? `- Specified mode override: ${modeDef.name} — ${modeDef.feel}` : '- Mode: Use genre-appropriate default'}
- Harmony level: ${MUSIC_THEORY_BIBLE.theoryLevels[theoryLevel]?.label || 'Standard'} — ${MUSIC_THEORY_BIBLE.theoryLevels[theoryLevel]?.desc || 'Diatonic harmony'}
${chosenOutliers.length ? `- Include these harmonic outliers:\n${chosenOutliers.map(o => `  • ${o.name} (${o.short}): ${o.feel} — HOW: ${o.howto}`).join('\n')}` : '- Use standard diatonic harmony — no outlier chords required'}
- THEORY ANALYSIS section is REQUIRED: identify the scale/mode used, flag any outlier chords with explanation, describe the most interesting voice-leading move, and rate overall harmonic tension (1-10).`;

  // Substyle
  const substyleDetail = substyle && SUBSTYLE_NOTES[substyle] ? `\n${SUBSTYLE_NOTES[substyle]}` : '';
  const substyleNote = substyle ? `\nSub-style: ${substyle} — write flow, density, and aesthetic accordingly.${substyleDetail}` : '';
  const substyleSunoTag = substyle && SUBSTYLE_SUNO[substyle] ? SUBSTYLE_SUNO[substyle] : null;
  const substyleSunoLock = substyleSunoTag ? `\n\n⚠️ PRODUCTION LOCK — ${substyle}: The SONG PROMPT Full prompt MUST contain these exact production tags: "${substyleSunoTag}" — do NOT substitute generic ${genre} production tags.` : '';

  // Voice profile
  const voiceNote = (voice.name || voice.influences || voice.forbidden)
    ? `\n\nARTIST VOICE: ${voice.name ? `Write as ${voice.name}.` : ''} ${voice.influences ? `Lyric influences: ${voice.influences}.` : ''} ${voice.forbidden ? `NEVER use these phrases: ${voice.forbidden}.` : ''}`
    : '';

  // Album context
  const albumNote = albumTrack
    ? `\n\nALBUM CONTEXT: This song is the "${albumTrack.type}" on the album "${albumTrack.album}". Its role: ${albumTrack.role}. The album's emotional arc: ${albumTrack.arc}. Write it so it fits cohesively within that album story.`
    : '';

  // Age group note
  let ageNote = '';
  if (ageGroup && AGE_GROUPS[ageGroup]) {
    const ag = AGE_GROUPS[ageGroup];
    // If toddler/kids, override to children's rules regardless of genre selected
    const isChildAudience = (ageGroup === 'toddler' || ageGroup === 'kids');
    ageNote = `\n\nAGE TARGET — Writing for ${ag.label}:
- Vocabulary: ${ag.vocab}
- Themes: ${ag.themes}
- Structure: ${ag.structure}
- Rules: ${ag.rules}${isChildAudience ? `\n- Production style: ${ag.sunoHint}` : ''}
IMPORTANT: Tailor ALL lyrics, vocabulary, themes, and emotional content to be age-appropriate for ${ag.label}. Override any adult themes from the topic with age-appropriate equivalents.`;
  }

  // Genre-specific notes
  let genreSpecificNote = '';
  if (genre === 'hiphop') genreSpecificNote = `\n\nHIP-HOP VERSE RULES (non-negotiable):\n- 1 bar = 1 line. Write EXACTLY the bar count in the structure.\n- 4-bar internal structure per verse: bars 1-4 establish scene, bars 5-8 develop, bars 9-12 complicate, bar 16 = punchline/payoff.\n- Ad-libs in parentheses on the same line.\n- [Triplet Flow] = rapid 3-syllable groups. [Double Time] = twice the syllables per bar.\n- Internal rhymes every 2-3 syllables add density on top of end rhymes.`;
  else if (genre === 'parody') genreSpecificNote = `\n\nPARODY RULES (non-negotiable):\n- Music must be 100% sincere. Comedy lives ENTIRELY in lyrics.\n- Establish absurd premise in first 4 lines of verse 1.\n- Rule of threes: setup, setup, subvert.\n- Specificity is the engine: proper nouns, numbers, brand names.\n- Chorus must be funniest part AND most singable.`;
  else if (genre === 'comedy') genreSpecificNote = `\n\nCOMEDY RULES (non-negotiable):\n- Three-act joke arc: V1=premise, V2=escalation, Bridge=most unhinged, Final Chorus=payoff.\n- Final line of entire song is THE punchline.\n- Escalation: each verse funnier than the last.\n- Genre plays completely straight — comedy is lyrical only.`;
  else if (genre === 'neosoul') genreSpecificNote = `\n\nNEO-SOUL RULES:\n- Groove arrives BEFORE the vocal — 8-bar intro feel.\n- Leave space: rests between phrases ARE the music.\n- Ad-libs carry equal emotional weight. Mark with (ad-lib).\n- Outro vamp MUST escalate — minimum 4 cycling lines.`;
  else if (genre === 'gospel') genreSpecificNote = `\n\nGOSPEL RULES:\n- Call-and-response: write Lead and Response. Format: "Lead line — (Response)".\n- Testimony arc: I WAS → God MOVED → NOW I AM.\n- Bridge is CLIMAX, not chorus. Write 4-8 vamp lines.\n- Outro vamp is 80% of emotional impact — never cut short.`;
  else if (genre === 'children') genreSpecificNote = `\n\nCHILDREN'S RULES:\n- Singability above all: max 8 words in hook, melody under 1 octave.\n- Repetition is a feature — chorus 3-4x minimum.\n- Embed motion cues: clap, stomp, jump, spin.\n- Never condescend — write UP to imagination.`;
  else if (genre === 'tvmusical') genreSpecificNote = `\n\nTV/MUSICAL RULES:\n- Every song has a DRAMATIC FUNCTION.\n- Characters sing because dialogue is insufficient.\n- "I want" structure in verse 1/chorus 1.\n- Reprise principle: same melody, changed lyrics = devastating.`;

  // Hook style
  const resolvedHookStyle = (hookStyle && hookStyle !== 'auto') ? hookStyle : null;
  const hookNote = resolvedHookStyle && HOOK_STYLE_NOTES[resolvedHookStyle] ? `\n\n${HOOK_STYLE_NOTES[resolvedHookStyle]}` : '';

  // Blend
  let blendNote = '';
  if (blend.genre2 || blend.style2) {
    const g2Label = GENRE_LABELS[blend.genre2] || blend.genre2;
    const parts = [];
    if (blend.genre2) parts.push(g2Label + ' genre elements');
    if (blend.style2) parts.push(blend.style2 + ' writing style');
    const ratio = blend.ratio || 70;
    blendNote = `\n\nSECONDARY STYLE BLEND (${100-ratio}% influence):\nApply ${parts.join(' and ')} as a secondary layer.\nPrimary genre (${ratio}%): core structure, rhythm, production.\nSecondary (${100-ratio}%): lyric approach, vocal delivery, thematic texture.`;
  }

  // Era map
  const eraMap = {
    classic: 'Classic (pre-1980) — analog warmth, live band, raw delivery',
    vintage: 'Vintage (1980–1999) — synth pads, drum machines, MTV-era hooks',
    modern: 'Modern (2000–2015) — polished, digital sheen, chart-ready',
    contemporary: 'Contemporary (2016–2022) — lo-fi textures, trap hi-hats, streaming dynamics',
    current: 'Current (2023–Now) — hyperpop edges, AI-era production, ultra-compressed'
  };
  const lengthMap = {
    short: 'Short (~2 min, ~2 verses + chorus)',
    medium: 'Medium (~3 min, standard structure)',
    long: 'Long (~4 min, full structure with bridge)',
    extended: 'Extended (~5+ min, full epic structure)'
  };

  const system = buildGenreAgentSystem(genre);

  // Section archetypes — genre-weighted + randomised every generation.
  // Each uses the genre's preferred list 70% of the time (biased toward most
  // canonical choice); 30% fully random for surprise / rule-breaking.
  const _gsd = GENRE_SECTION_DNA[genre] || {};
  const _ba  = pickWeightedArchetype(BRIDGE_ARCHETYPES,     _gsd.bridge?.preferred_bridge);
  const _oa  = pickWeightedArchetype(OUTRO_ARCHETYPES,      _gsd.bridge?.preferred_outro);
  const _v2a = pickWeightedArchetype(VERSE2_ARCHETYPES,     _gsd.bridge?.preferred_verse2);
  const _pca = pickWeightedArchetype(PRE_CHORUS_ARCHETYPES, _gsd.bridge?.preferred_prechorus);
  const _poa = pickWeightedArchetype(POST_CHORUS_ARCHETYPES,_gsd.bridge?.preferred_postchorus);

  // Hook structural variation (separate from delivery style — picked randomly)
  const _hookStructKeys = Object.keys(HOOK_STRUCTURE_NOTES).filter(k => k !== 'auto');
  const _hookStructKey  = _hookStructKeys[Math.floor(Math.random() * _hookStructKeys.length)];
  const _hookStructNote = HOOK_STRUCTURE_NOTES[_hookStructKey] || '';

  const _harmonicLine  = _gsd.bridge?.harmonic  ? `\nHarmonic approach: ${_gsd.bridge.harmonic}`  : '';
  const _counterLine   = _gsd.bridge?.counter   ? `\nCounter-melody role: ${_gsd.bridge.counter}` : '';
  const _examplesLine  = _gsd.bridge?.examples  ? `\nReal-world models: ${_gsd.bridge.examples}`  : '';

  const bridgeNote = `\n\nBRIDGE ARCHITECTURE — "${_ba.name}" [${genreLabel}]:${_harmonicLine}${_counterLine}
Energy arc: ${_ba.energy} · Bars: ${_ba.bars}
Delivery: ${_ba.delivery}
Lyric approach: ${_ba.lyric}
Production: ${_ba.production}
Rule: ${_ba.rule}${_examplesLine}`;

  const outroNote = `\n\nOUTRO APPROACH — "${_oa.name}":
${_oa.rule}`;

  const verse2Note = `\n\nVERSE 2 STRATEGY — "${_v2a.name}":
${_v2a.rule}`;

  const preChorusNote = `\n\nPRE-CHORUS ARCHITECTURE — "${_pca.name}" [${genreLabel}]:
Energy arc: ${_pca.energy} · Bars: ${_pca.bars}
Delivery: ${_pca.delivery}
Lyric approach: ${_pca.lyric}
Production: ${_pca.production}
Rule: ${_pca.rule}`;

  const postChorusNote = `\n\nPOST-CHORUS / POWER PART — "${_poa.name}" [${genreLabel}]:
Energy arc: ${_poa.energy} · Bars: ${_poa.bars}
Delivery: ${_poa.delivery}
Lyric approach: ${_poa.lyric}
Production: ${_poa.production}
Rule: ${_poa.rule}`;

  const hookStructNote = _hookStructNote ? `\n\n${_hookStructNote}` : '';

  // ── Rhyme scheme injection ──────────────────────────────────────────────
  const _rhymePref = GENRE_RHYME_PREF[genre] || ['AABB','ABAB','Slant'];
  const _rhemeKey  = Math.random() < 0.7
    ? _rhymePref[Math.floor(Math.random() * _rhymePref.length)]
    : Object.keys(RHYME_SCHEMES)[Math.floor(Math.random() * Object.keys(RHYME_SCHEMES).length)];
  const rhymeNote  = `\n\nRHYME SCHEME: ${_rhemeKey}\n${RHYME_SCHEMES[_rhemeKey] || ''}`;

  // ── Era vocabulary injection ────────────────────────────────────────────
  const _eraVoc = ERA_VOCABULARY[era];
  const eraVocNote = _eraVoc
    ? `\n\nERA ANCHORS (${_eraVoc.label}): Weave 2-3 of these into the lyrics to lock the song in its era: ${_eraVoc.anchors.slice(0,8).join(', ')}. Forbidden anachronisms: ${_eraVoc.forbidden.slice(0,5).join(', ')}.`
    : '';

  // ── Era UNDERTONE — secondary era tint for V2 / bridge ──────────────────
  const _undEra = (eraUndertone && eraUndertone !== era) ? ERA_VOCABULARY[eraUndertone] : null;
  const eraUndertoneNote = _undEra
    ? `\n\nERA UNDERTONE (${_undEra.label}): Verse 2 and the bridge should tint with vocabulary from this era — pull 1-2 anchors from: ${_undEra.anchors.slice(0,6).join(', ')}. This is a TEXTURE layer; do not let it overpower the primary era. The contrast between the two eras IS the craft move.`
    : '';

  // ── BREAK ONE RULE — pick a random outlier from this genre and grant
  //    explicit permission to commit to the same rule-break ────────────────
  let breakRuleNote = '';
  if (breakRule && genreOutliers && genreOutliers.length) {
    const _pick = genreOutliers[Math.floor(Math.random() * genreOutliers.length)];
    breakRuleNote = `\n\n🎲 BREAK ONE RULE — explicit permission granted:\n${_pick.song} broke "${_pick.rule}" → ${_pick.result}\nFind YOUR song's equivalent rule-break. Pick one ${genreLabel} convention and deliberately violate it for the same kind of payoff. The rule-break must be intentional, audible, and central to why this song lands. Do NOT just decorate — commit.`;
  }

  // ── CROSS-GENRE SECTION GRAFT — lift DNA + counter-melody from a
  //    secondary genre and apply it to ONE section only ────────────────────
  let graftNote = '';
  if (graftGenre && graftGenre !== genre && GENRE_BIBLE[graftGenre]) {
    const _g = GENRE_BIBLE[graftGenre];
    const _sec = ['verse','chorus','bridge'].includes(graftSection) ? graftSection : 'chorus';
    const _counter = _g.counter
      ? `Counter-melody for the grafted section: ${_g.counter.device} — ${_g.counter.does}`
      : '';
    const _keys = Array.isArray(_g.keys) && _g.keys.length
      ? `Keys to honor in the grafted ${_sec}: ${_g.keys.slice(0,2).join(' / ')}`
      : '';
    graftNote = `\n\n🧬 SECTION GRAFT — ${_sec.toUpperCase()} tinted with ${GENRE_LABELS[graftGenre]||graftGenre}:
The ${_sec} should carry ${GENRE_LABELS[graftGenre]||graftGenre} DNA: ${_g.dna || 'genre conventions apply'}
${_counter}
${_keys}
The rest of the song stays in ${genreLabel}. The graft is structural — the listener should feel a shift when the ${_sec} arrives. Do NOT just borrow a word or a tag; bend the melodic shape, cadence, and instrumentation cues of the ${_sec} toward the grafted genre.`;
  }

  // ── INVERT COUNTER-MELODY — flip where the genre's counter-melody lives
  let invertCounterNote = '';
  if (invertCounter && GENRE_BIBLE[genre] && GENRE_BIBLE[genre].counter) {
    const _c = GENRE_BIBLE[genre].counter;
    invertCounterNote = `\n\n🔄 COUNTER-MELODY INVERSION:
In ${genreLabel}, the counter-melody normally lives here: ${_c.map || 'standard section placement'}.
INVERT IT. Put the counter-melody where it does NOT normally belong (e.g. move a chorus-level counter into the verses, or move a verse-level counter into the chorus, or pull the bridge counter out and let the bridge run naked). Leave the sections that normally carry the counter deliberately sparse — the missing voice should feel felt.
This is a structural rule-break, not a cosmetic one. Describe the inversion explicitly in the COUNTERMELODY and SONG PROMPT sections.`;
  }

  // ── Key psychology injection ────────────────────────────────────────────
  const _keyPsych = MUSIC_THEORY_BIBLE.keyPsychology;
  const _keyPool  = Object.keys(_keyPsych);
  const _chosenKey = _keyPool[Math.floor(Math.random() * _keyPool.length)];
  const _kp = _keyPsych[_chosenKey];
  const keyPsychNote = `\n\nSUGGESTED KEY PSYCHOLOGY: ${_chosenKey} — ${_kp.feel} Tension: ${_kp.tension}, Brightness: ${_kp.bright}/10. Use this key's emotional character to shape the production brief.`;

  // ── Emotional arc injection ─────────────────────────────────────────────
  const _arcData = EMOTIONAL_ARCS[emotionalArc];
  const emotionalArcNote = _arcData
    ? `\n\nEMOTIONAL ARC — "${_arcData.name}":\n${_arcData.arc}`
    : '';

  // ── Seed line injection ─────────────────────────────────────────────────
  const _cleanSeed = seedLine ? sanitizeInput(seedLine, 120) : '';
  const seedLineNote = _cleanSeed
    ? `\n\nSEED LINE (build the entire song around this line): "${_cleanSeed}" — This is the anchor. Every chorus, every verse must orbit this line. It MUST appear verbatim, word-for-word, unedited, as the opening or closing line of the chorus. This is non-negotiable. Do not paraphrase, do not alter a single word.`
    : '';

  // ── Syllable budget ─────────────────────────────────────────────────────
  const _sylBudget  = GENRE_SYLLABLE_BUDGETS[genre] || { verse:'8–13', chorus:'6–10', hook:'4–7', bridge:'6–10', prechorus:'6–9' };
  const _capNote    = syllableCap > 0 ? ` HARD CAP: no line may exceed ${syllableCap} syllables — enforce strictly.` : '';
  const syllableNote = `\n\nSYLLABLE BUDGET:\n- Hook (title/refrain line): ${_sylBudget.hook || '4–7'} syllables — keep it singable and memorable\n- Verse lines: ${_sylBudget.verse} syllables\n- Chorus lines: ${_sylBudget.chorus} syllables\n- Pre-chorus lines: ${_sylBudget.prechorus} syllables\n- Bridge lines: ${_sylBudget.bridge} syllables${_capNote}`;

  // ── Production brief data ───────────────────────────────────────────────
  const _fxProfile  = GENRE_FX_PROFILES[genre]  || {};
  const _plugins    = GENRE_PLUGIN_CHAINS[genre] || {};
  const _mastering  = MASTERING_TARGETS[genre]   || {};
  const productionContextNote = (_fxProfile.reverb || _mastering.lufs) ? `\n\nPRODUCTION REFERENCE DATA (use this to populate the PRODUCTION BRIEF sections below):
FX: Reverb — ${_fxProfile.reverb||'medium hall'}; Delay — ${_fxProfile.delay||'1/4 note'}; Compression — ${_fxProfile.compression||'standard VCA'}; EQ — ${_fxProfile.eq||'high-pass + air shelf'}; Sidechain — ${_fxProfile.sidechain||'light kick ducking'}
PLUGINS (free): ${(_plugins.free||[]).slice(0,3).join(', ')}
PLUGINS (paid): ${(_plugins.paid||[]).slice(0,3).join(', ')}
MASTERING: ${_mastering.lufs||'-14 LUFS'} · ${_mastering.dynamicRange||'DR 8–10'} · ${_mastering.brightness||'natural'} · ${_mastering.notes||''}` : '';

  // ── Dual perspective (antagonist POV in Verse 2) ────────────────────────
  const dualPerspNote = dualPerspective
    ? `\n\nDUAL PERSPECTIVE RULE: Verse 2 MUST be written from the antagonist's or opposite perspective. If Verse 1 is the protagonist's longing, Verse 2 is the other person's detachment. If Verse 1 is anger, Verse 2 is the accused person's justification. This creates dramatic tension and forces the listener to hold two truths simultaneously.`
    : '';

  // ── Pattern avoidance ───────────────────────────────────────────────────
  const avoidNote = avoidPatterns && avoidPatterns.length > 0
    ? `\n\nPATTERN AVOIDANCE: These opening lines were used recently — do NOT start any verse with similar phrasing or imagery: ${avoidPatterns.map(p => `"${p}"`).join(', ')}. Find a completely fresh entry point.`
    : '';

  // ── Platform-specific instructions ─────────────────────────────────────
  const platformNotes = {
    suno:   'PLATFORM: Suno — Use bracket tags precisely: [Verse 1], [Chorus], [Bridge], [Pre-Chorus], [Outro]. Keep SONG PROMPT under 200 characters for best results. Use [Instrumental] for gaps. Suno reads bracket tags as structural cues.',
    udio:   'PLATFORM: Udio — Section tags work differently: Udio responds well to emotional descriptors in brackets, e.g. [Verse - melancholic], [Chorus - anthemic]. Keep SONG PROMPT under 300 characters. Udio prefers genre descriptors over instrument lists.',
    stable: 'PLATFORM: Stable Audio — Optimise the SONG PROMPT as a single dense style description (no brackets needed in lyrics for Stable Audio). Focus the style prompt on texture, mood, and instrumentation — it processes audio descriptions, not musical structure tags.',
  };
  const platformNote = platformNotes[platform] || platformNotes.suno;

  // ── Specificity self-check instruction ─────────────────────────────────
  const specificityNote = `\n\nSPECIFICITY MANDATE: After writing the lyrics, review every abstract or vague word. Replace "feel," "love," "pain," "heart," "tears" with concrete sensory images. "My heart aches" → "I'm pressing your old sweater to my face." "I feel lost" → "I've been driving the same block for an hour." Abstract words are placeholders — replace every one.`;

  const lyricCraftNote = buildLyricCraftNote(genre);

  const platinumNote = platinum ? buildTopTierNote(genre) : '';
  const adlibNote = buildAdlibNote(genre);
  const vocalStackNote = buildVocalStackNote(genre);

  const _aggrMap = {
    mellow: 'Mellow — laid-back, conversational, introspective energy throughout. No raised voices, no confrontation. Deliver emotion through restraint and precision. Think Chance the Rapper intimate mode, early Drake confessional, Kendrick reflective.',
    heat:   'Heat — elevated intensity, confrontational urgency in every bar. The verse should feel like it is building toward something that could explode. Think Kendrick "HUMBLE." / Future menace / City Girls unapologetic. Every line has a point to prove.',
    rage:   'Rage — maximum aggression throughout. Every line hits like a threat or a demand. No softness, no hesitation — pure unfiltered force. Think Eminem "Till I Collapse," DMX bark, early Chief Keef cold menace, NF uncontained fury.'
  };
  const aggressionNote = genre === 'hiphop' && _aggrMap[aggression] ? `\n\nAGGRESSION LEVEL — ${_aggrMap[aggression]}` : '';

  const prompt = `Write a complete, production-ready ${genreLabel} song at the highest possible level of craft.

🚫 CRAFT VOCABULARY FIREWALL — ABSOLUTE RULE:
Any technique name that appears in the instructions below — including but not limited to "undertone", "primary", "secondary", "blend", "graft", "invert", "counter-melody", "internal rhyme", "multi-syllabic", "triplet", "syncopated", "freestyle", "hook", "chorus", "verse", "bridge", "rule-break", "era anchor" — is INSTRUCTION VOCABULARY. It tells YOU how to execute the craft.
It is NOT song vocabulary. DO NOT use any of those words as:
  • Rhyme words
  • Lyric content ("this chorus hits different" is fine as natural speech; "my rhyme is internal" is forbidden)
  • Titles
DEMONSTRATE the technique in the writing. NEVER NAME IT in the writing. If a line would rhyme on or showcase a technique name, rewrite with different words.

Genre: ${genreLabel}
Topic: ${topic}
Mood: ${mood}
Vocal style: ${vocal}
Structure: ${structStr}
Quality target: ${quality}
Era: ${eraMap[era] || eraMap.modern}
Song length: ${lengthMap[length] || lengthMap.medium}${substyleNote}${substyleSunoLock}${bibleNote}${counterNote}${outlierSongsNote}${theoryNote}${blendNote}${albumNote}${ageNote}${genreSpecificNote}${hookNote}${hookStructNote}${voiceNote}${emotionalArcNote}${seedLineNote}

SONGWRITING RULES:
- FIRST LINE RULE: The very first line of Verse 1 must drop immediately into a specific sensory image, action, or confession. No scene-setting, no "I remember when", no establishing shots. Earn attention in line 1.
- Hook must arrive within 30 seconds
- Chorus lines: maximum 10 syllables each for singability
- Verse lines: 8-13 syllables, consistent within each verse
- Every line must be specific — no vague emotions, no clichés
- Use the Zeigarnik effect: leave one phrase slightly open-ended per chorus
- Dynamic contrast: verse energy should be noticeably lower than chorus
- The last chorus must feel bigger than the first
- GENRE PURITY: Every chorus MUST include at least one TYPE 3 production tag inline (e.g. [Build], [Drop], [Trap Hi-Hat], [Steel Guitar], [Choir], [808 Bass]) — these are NOT section headers, they are sonic DNA signals placed inside the lyric body to guide the AI platform's production. The SONG PROMPT Full prompt must use the same production vocabulary as these tags.
- LYRICS LENGTH RULE: Total lyrics (all sections combined) must stay under 5000 characters — this is the maximum the Suno lyrics field accepts. Count every character including section tags like [Verse 1]. Write a complete, high-quality song within this limit.
- NO EM DASHES: Never use em dashes (—) anywhere in the lyrics. End lines with a word, not a dash. For pauses use a comma or ellipsis (...). For connective phrasing use a comma. Em dashes break Suno's text parsing.${syllableNote}${rhymeNote}${eraVocNote}${eraUndertoneNote}${breakRuleNote}${graftNote}${invertCounterNote}${keyPsychNote}${dualPerspNote}${avoidNote}${specificityNote}${lyricCraftNote}${preChorusNote}${bridgeNote}${verse2Note}${postChorusNote}${outroNote}${platinumNote}${adlibNote}
- ${bracketInstructionServer(genre, bracketMode, substyle)}
- ${platformNote}

HOOK SELF-CHECK: After writing the chorus, verify: (1) Is the title or central phrase present? (2) Could a stranger hum this after one listen? (3) Does it say something specific, not generic? If any answer is no — rewrite the chorus before proceeding.

Respond with EXACTLY this format — use these exact headers, nothing else:

TITLE: [song title — if the title is in any language other than English, append an English translation in parentheses, e.g. "Calle Vacía (Empty Street)" or "夜の海 (Night Ocean)". English-only titles need no parenthetical.]

VERDICT: [one sentence on why this song will connect with listeners]

HOOK ISOLATION:
[Copy the chorus lyrics here ONLY — nothing else. This is the hook in isolation for quick review.]

LYRICS:
${_cleanSeed ? '\nSEED LINE REMINDER -- this exact line MUST appear verbatim as the opening or closing line of your chorus, word-for-word, do not change any word: ' + _cleanSeed + '\n' : ''}[Write the complete song lyrics using this exact bracket system — three types, each with a distinct job:

TYPE 1 — STRUCTURE (own line, opens every section — required):
[Intro] · [Verse 1] · [Pre-Chorus] · [Chorus] · [Bridge] · [Hook] · [Breakdown] · [Outro]

TYPE 2 — DELIVERY (own line immediately BEFORE the specific lyric line it affects):
[Whispered] · [Spoken] · [Falsetto] · [Screamed] · [Harmony] · [Ad-libs]

TYPE 3 — PRODUCTION DNA (placed inline inside the section body, ≥1 required per Chorus):
[808 Bass] · [Build] · [Drop] · [Trap Hi-Hat] · [Steel Guitar] · [Choir] · [Beat Switch] · [Breakdown]

PARENTHESES () = ad-libs and background vocal layers ONLY — never use () for structural or delivery purposes.
  Same line as a lyric = rhythmic pocket filler. Standalone line = spotlight ad-lib moment.

Every word must earn its place. No bracket tag = that section does not exist.]

SONG PROMPT:
Genre: [core genre + sub-genre]
Instruments: [4-5 key instruments, comma-separated]
BPM: [range, e.g. 95-100]
Vocal: [vocal descriptor]
Texture: [production texture in 5-8 words]
Counter-melody: [counter-melody device]
Full prompt: [assemble all of the above into one ready-to-paste string under 440 characters — NO artist names]

PRODUCTION BRIEF:
CORE PROMPT:
[Exact copy of the Full prompt line above — ready to paste]

TEMPO & KEY:
[BPM range · Suggested key · Time signature · Feel]

ARRANGEMENT BLUEPRINT:
[Section by section: what instruments enter/drop, energy shifts]

VOCAL DIRECTION:
[Delivery style per section]

SONIC REFERENCES:
[3 production reference points — no artist names, describe the sonic feel]

PLATFORM TIPS:
[3 specific actionable tips for ${platform === 'udio' ? 'Udio' : platform === 'stable' ? 'Stable Audio' : 'Suno'}]

STRUCTURE MAP:
[Each section: bar count · energy level 1-10 · emotional job]

DOPAMINE MAP:
1. [Moment · What happens · Why the brain rewards it]
2. [Second peak]
3. [Third peak]

CHORD PROGRESSION:
BPM: [exact BPM]
Key: [e.g. A minor — reason in 5 words]
Time Signature: [e.g. 4/4]
[Each section: Section name → Roman numerals (letter names) · rhythm feel]

THEORY ANALYSIS:
SCALE: [specific scale or mode used]
KEY FEEL: [2 sentences on emotional intention]
OUTLIER CHORDS: [any non-diatonic chords and function]
VOICE LEADING: [most interesting voice-leading move]
TENSION RATING: [X/10 with description]
PROGRESSION ARCHETYPE: [which archetype and why]

DIRECTOR NOTES:
1. [Production decision specific to THIS song]
2. [tip 2]
3. [tip 3]
4. [tip 4]
5. [tip 5]${vocalStackNote}

COUNTERMELODY:
DEVICE: [specific counter-melodic instrument/voice]
WHAT IT DOES: [one sentence]
HOW TO PROMPT: [exact Suno/Udio phrase, under 60 chars]
SECTION MAP: [which sections and how it evolves]

VISUAL PROMPT:
[Write a single ready-to-paste image prompt for Midjourney, DALL-E or Firefly. ONE sentence: visual mood, setting, 2-3 key colors, art style. Under 200 chars. No faces, no text in image.]

VIDEO PROMPT:
[Write a single ready-to-paste video concept for Sora, Runway or Kling. ONE sentence: setting, visual action, camera movement, color grade, mood. Under 200 chars.]${buildSingerNotesInstruction(genre, genre==='hiphop')}`;

  return { system, prompt };
}

function buildLuckyPrompt(params) {
  const keys = Object.keys(FUSION_DATA);
  const rawG1 = params && params.g1 ? sanitizeInput(params.g1, 50) : null;
  const rawG2 = params && params.g2 ? sanitizeInput(params.g2, 50) : null;
  // Try exact key first, then reverse order (handles either direction client may send)
  let key = null;
  if (rawG1 && rawG2) {
    const fwd = rawG1 + '+' + rawG2;
    const rev = rawG2 + '+' + rawG1;
    key = FUSION_DATA[fwd] ? fwd : FUSION_DATA[rev] ? rev : fwd; // fwd fallback still uses those genres
  }
  if (!key) key = pickRandom(keys);
  const [g1, g2] = key.split('+');
  const fd = FUSION_DATA[key];
  // Honour client-picked values so reveal UI matches generated song exactly
  const topic     = (params && params.topic)     ? sanitizeInput(params.topic, 100)     : pickRandom(LUCKY_TOPICS);
  const mood      = (params && params.mood)      ? sanitizeInput(params.mood, 100)      : pickRandom(LUCKY_MOODS);
  const structure = (params && params.structure) ? sanitizeInput(params.structure, 50)  : pickRandom(LUCKY_STRUCTURES);
  const vocal     = (params && params.vocal)     ? sanitizeInput(params.vocal, 100)     : pickRandom(LUCKY_VOCALS);
  const platinum  = !!(params && params.platinum);
  const structStr = STRUCTURES[structure] || STRUCTURES.standard;
  const adlibNote = buildAdlibNote(g1);
  const vocalStackNote = buildVocalStackNote(g1);

  // Outlier injection
  const o1 = GENRE_BIBLE[g1]?.outliers;
  const o2 = GENRE_BIBLE[g2]?.outliers;
  const outlierNote = [
    o1?.length ? `Rule-breakers in ${g1}: ${o1.map(o => `${o.song} (${o.rule})`).join(' | ')}` : null,
    o2?.length ? `Rule-breakers in ${g2}: ${o2.map(o => `${o.song} (${o.rule})`).join(' | ')}` : null
  ].filter(Boolean).join('\n');

  // For fusion, use the primary genre's agent as base if available, else fallback
  const system = GENRE_AGENTS[g1]
    ? buildGenreAgentSystem(g1).replace(
        /^You are a world-class .+ songwriter/,
        `You are a world-class ${(GENRE_LABELS[g1]||g1)} × ${(GENRE_LABELS[g2]||g2)} fusion songwriter`
      )
    : 'You are an expert songwriter, neuroscientist of music, and AI music production specialist. Write complete, emotionally authentic, production-ready songs. Respond with the exact format requested. No extra commentary.';

  // ── Production brief data for Lucky (primary genre) ────────────────────
  const _fxPL  = GENRE_FX_PROFILES[g1]  || GENRE_FX_PROFILES[g2]  || {};
  const _plPL  = GENRE_PLUGIN_CHAINS[g1] || GENRE_PLUGIN_CHAINS[g2] || {};
  const _mstPL = MASTERING_TARGETS[g1]  || MASTERING_TARGETS[g2]  || {};
  const luckyProductionNote = (_fxPL.reverb || _mstPL.lufs) ? `\n\nPRODUCTION REFERENCE DATA (use to populate PRODUCTION BRIEF sections):
FX: Reverb — ${_fxPL.reverb||'medium hall'}; Delay — ${_fxPL.delay||'1/4 note'}; Compression — ${_fxPL.compression||'standard VCA'}; EQ — ${_fxPL.eq||'high-pass + air shelf'}; Sidechain — ${_fxPL.sidechain||'light kick ducking'}
PLUGINS (free): ${(_plPL.free||[]).slice(0,3).join(', ')}
PLUGINS (paid): ${(_plPL.paid||[]).slice(0,3).join(', ')}
MASTERING: ${_mstPL.lufs||'-14 LUFS'} · ${_mstPL.dynamicRange||'DR 8–10'} · ${_mstPL.brightness||'natural'} · ${_mstPL.notes||''}` : '';

  const prompt = `Write a complete ${g1} × ${g2} fusion song at the highest possible level of craft.

Fusion style: ${fd?.name || g1 + ' × ' + g2}
${fd?.name ? 'Fusion style: ' + fd.name : 'Blend both genres authentically.'}
Topic: ${topic}
Mood: ${mood}
Vocal style: ${vocal}
Structure: ${structStr}${outlierNote ? `\n\nRULE-BREAKING INSPIRATION:\n${outlierNote}\nUse these as permission: if the emotional truth demands it, break a rule.` : ''}

SONGWRITING RULES:
- Hook within 30 seconds · Chorus max 10 syllables · Verse 8-13 syllables
- Specific imagery only — no clichés · Zeigarnik effect in chorus
- Dynamic contrast: verse lower energy than chorus
- Bridge must be a new perspective · Last chorus bigger than first
- Every section MUST start with its bracket tag on its own line.
- LYRICS LENGTH RULE: Total lyrics under 5000 characters — Suno's maximum. Includes all section tags. Complete song, within the limit.
- NO EM DASHES: Never use em dashes (—) in lyrics. Use commas or ellipsis instead.${platinum ? buildTopTierNote(g1, g2) : ''}${adlibNote}

Respond with EXACTLY this format:

TITLE: [song title — if the title is in any language other than English, append an English translation in parentheses, e.g. "Calle Vacía (Empty Street)" or "夜の海 (Night Ocean)". English-only titles need no parenthetical.]

VERDICT: [one sentence on why this song will connect]

HOOK ISOLATION:
[Copy the chorus lyrics here ONLY — nothing else. This is the hook in isolation for quick review.]

LYRICS:
[Write the complete song lyrics using this exact bracket system:

TYPE 1 — STRUCTURE (own line, opens every section): [Verse 1] · [Chorus] · [Bridge] · [Outro]
TYPE 2 — DELIVERY (own line before affected lyric): [Whispered] · [Spoken] · [Falsetto] · [Screamed]
TYPE 3 — PRODUCTION DNA (inline inside sections, ≥1 per Chorus): [808 Bass] · [Build] · [Drop] · [Choir]
PARENTHESES () = ad-libs only — never structural. Every word must earn its place.]

SONG PROMPT:
[Under 440 chars. Core genre + sub-genre feel, key instruments (4-5), BPM range, tempo feel, vocal descriptor, production texture, counter-melody device. NO artist names. MUST use the same production vocabulary as the TYPE 3 bracket tags in the lyrics.]

PRODUCTION BRIEF:
CORE PROMPT:
[Exact copy of SONG PROMPT]

TEMPO & KEY:
[BPM range · Key · Time sig · Feel]

ARRANGEMENT BLUEPRINT:
[Section by section instrument/energy breakdown]

VOCAL DIRECTION:
[Delivery style per section]

SONIC REFERENCES:
[3 sonic reference points — no artist names]

PLATFORM TIPS:
[3 actionable tips for AI music platforms]

STRUCTURE MAP:
[Each section: bar count · energy 1-10 · emotional job]

DOPAMINE MAP:
1. [First peak · what happens · why it works]
2. [Second peak]
3. [Third peak]

DIRECTOR NOTES:
1. [Production decision specific to THIS song]
2. [tip 2]
3. [tip 3]
4. [tip 4]
5. [tip 5]${vocalStackNote}

COUNTERMELODY:
DEVICE: [specific counter-melodic instrument/voice]
WHAT IT DOES: [one sentence]
HOW TO PROMPT: [exact Suno/Udio phrase, under 60 chars]
SECTION MAP: [which sections and how it evolves]

VISUAL PROMPT:
[Write a single ready-to-paste image prompt for Midjourney, DALL-E or Firefly. ONE sentence: visual mood, setting, 2-3 key colors, art style. Under 200 chars. No faces, no text in image.]

VIDEO PROMPT:
[Write a single ready-to-paste video concept for Sora, Runway or Kling. ONE sentence: setting, visual action, camera movement, color grade, mood. Under 200 chars.]${buildSingerNotesInstruction(g1, g1==='hiphop')}`;

  return {
    system,
    prompt,
    meta: { g1, g2, topic, mood, vocal, structure, fd, fusionName: fd?.name || g1 + ' × ' + g2 }
  };
}

// ── RAP STYLES ───────────────────────────────────────────────────────────────
// 24 styles: 14 established + 5 forward-looking + 5 revisionist
// Each style has a specialist agent persona and default dimension values
const RAP_STYLES = {
  // ─ Established ─────────────────────────────────────────────────────────────
  trap: {
    label: 'Trap', category: 'established', era: '2010s–Now',
    agent: 'You are a trap music architect. You understand that the 808 bass IS the melody. Flow rides the hi-hat subdivisions. Lyrics prioritize atmosphere and feeling over narrative density. You use space deliberately — silence is as weighted as sound.',
    defaults: { flow: 'syncopated', rhymeArch: 'end-only', density: 'medium', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  'boom-bap': {
    label: 'Boom Bap', category: 'established', era: '1990s–Present',
    agent: 'You are a boom bap purist and lyrical architect. The 90/70 BPM boom-bap loop is a stage for wordcraft. You write bars that work at multiple levels — the surface meaning and the deeper reading. Every metaphor must be earned. The beat is the canvas, the lyric is the painting.',
    defaults: { flow: 'on-beat', rhymeArch: 'multi-syllabic', density: 'dense', vocabRegister: 'conscious-literary', persona: 'first-person-raw' }
  },
  conscious: {
    label: 'Conscious Rap', category: 'established', era: '1990s–Present',
    agent: 'You are a conscious rap philosopher-poet. Every bar serves a larger argument. You use hip-hop\'s full rhetorical toolkit — extended metaphor, irony, intertextual reference, call-and-response. Your job is to make the listener think harder than they expected to.',
    defaults: { flow: 'on-beat', rhymeArch: 'internal', density: 'dense', vocabRegister: 'conscious-literary', persona: 'omniscient' }
  },
  mumble: {
    label: 'Mumble Rap', category: 'established', era: '2015–Present',
    agent: 'You are a mumble rap melody architect. Understand that "mumble" is a misnomer — this is melodic phonetic rap where the sound and rhythm of words matter more than dictionary meaning. You compose with syllables as notes. The vocal texture is the hook.',
    defaults: { flow: 'syncopated', rhymeArch: 'end-only', density: 'sparse', vocabRegister: 'minimal-phonetic', persona: 'first-person-raw' }
  },
  drill: {
    label: 'Drill', category: 'established', era: '2010s–Present',
    agent: 'You are a drill music specialist. Sliding 808s, dark sliding melodies, and a cold unflinching delivery are the genre\'s DNA. Flow slides behind the beat. Lyrics carry a documentary menace — specificity of place, consequence, and reality. No sentimentality.',
    defaults: { flow: 'behind-beat', rhymeArch: 'end-only', density: 'medium', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  'cloud-rap': {
    label: 'Cloud Rap', category: 'established', era: '2010s–Present',
    agent: 'You are a cloud rap atmosphere designer. Hazy production, introspective vulnerability, and a dreamlike delivery. Flow is loose, conversational, unhurried. The goal is emotional texture — not narrative density. You write feelings not facts.',
    defaults: { flow: 'conversational', rhymeArch: 'slant', density: 'sparse', vocabRegister: 'abstract-surreal', persona: 'first-person-raw' }
  },
  crunk: {
    label: 'Crunk', category: 'established', era: '2000s',
    agent: 'You are a crunk energy architect. Maximum kinetic energy. Chanted hooks. Call and response. Four-on-the-floor feels. The entire track is designed to make a room lose its mind. You write for the crowd not the headphones.',
    defaults: { flow: 'on-beat', rhymeArch: 'end-only', density: 'medium', vocabRegister: 'street-coded', persona: 'collective-we' }
  },
  'g-funk': {
    label: 'G-Funk', category: 'established', era: '1990s',
    agent: 'You are a G-funk master. P-Funk samples slowed to a west coast crawl. Whiny synthesizer melodies over laid-back grooves. Lyrics are narrative — you tell stories from the block with cinematic detail. Flow is relaxed, deliberate, confident.',
    defaults: { flow: 'behind-beat', rhymeArch: 'end-only', density: 'medium', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  gangsta: {
    label: 'Gangsta Rap', category: 'established', era: '1990s–Present',
    agent: 'You are a gangsta rap chronicler. Documentary lyricism — the specificity of the report, the weight of the witness. You write with the emotional truth of lived experience translated into bars. The violence is consequence not spectacle. The story is the morality.',
    defaults: { flow: 'on-beat', rhymeArch: 'end-only', density: 'dense', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  'east-coast': {
    label: 'East Coast', category: 'established', era: '1990s–Present',
    agent: 'You are an East Coast rap lyricist trained in the New York tradition. Jazzy samples, complex internal rhyme schemes, wordplay as intellectual sport. The city is a character. Every metaphor earns its placement. You build verses that reveal new layers on each listen.',
    defaults: { flow: 'on-beat', rhymeArch: 'internal', density: 'dense', vocabRegister: 'conscious-literary', persona: 'first-person-raw' }
  },
  'west-coast': {
    label: 'West Coast', category: 'established', era: '1990s–Present',
    agent: 'You are a West Coast rap stylist. Laid-back grooves, extended narratives, sun-soaked production. You write with cinematic vision — verses that play like movie scenes. Confidence and ease are the emotional baseline. The storytelling is the flex.',
    defaults: { flow: 'behind-beat', rhymeArch: 'end-only', density: 'medium', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  southern: {
    label: 'Southern Rap', category: 'established', era: '1990s–Present',
    agent: 'You are a Southern rap flow master. The drawl IS the music. Cadence stretches vowels across bars. Trunk-rattling 808s, slow double-time flows, and regional pride. You write with the full breadth of the South — Atlanta, Houston, New Orleans, Miami — each with its own sonic identity.',
    defaults: { flow: 'syncopated', rhymeArch: 'end-only', density: 'medium', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  horrorcore: {
    label: 'Horrorcore', category: 'established', era: '1990s–Present',
    agent: 'You are a horrorcore conceptualist. Dark surrealism, psychological horror, and extreme imagery used as metaphor for internal states. The horror is a container for genuine emotion — fear, self-destruction, social alienation. Every disturbing image should have an emotional truth beneath it.',
    defaults: { flow: 'on-beat', rhymeArch: 'multi-syllabic', density: 'dense', vocabRegister: 'abstract-surreal', persona: 'character' }
  },
  'alt-rap': {
    label: 'Alternative Rap', category: 'established', era: '1990s–Present',
    agent: 'You are an alternative rap experimentalist. You refuse the genre\'s own conventions while remaining fully inside its tradition. Unusual samples, unconventional structures, genre contamination, and lyrical surrealism. The mainstream is a map you deliberately fold in unexpected ways.',
    defaults: { flow: 'conversational', rhymeArch: 'mosaic', density: 'medium', vocabRegister: 'abstract-surreal', persona: 'omniscient' }
  },
  'latin-rap': {
    label: 'Latin Rap', category: 'established', era: '1990s–Present',
    agent: `You are a Latin Rap architect writing in the lineage of Big Pun, Fat Joe, Daddy Yankee\'s rap-side, Calle 13, Tego Calderón, Bad Bunny rap cuts, Eladio Carrión, Anuel AA, Snow Tha Product, Akwid, Santa Fe Klan, and Peso Pluma\'s corrido-trap edges.

LANGUAGE MIX (HARD RULE):
- Write in Spanglish — roughly 50/50 Spanish and English bars across the verse, with code-switching mid-bar where it lands musically. Do NOT write a Spanish verse and an English verse separately; the bilingual texture is line-to-line.
- Spanish lines must scan rhythmically — accent on stressed syllable (paroxytone), respect natural cadence (no forced English stress on Spanish words).
- Spanglish bars: anchor the bar in one language and pivot mid-line ("Real recognize real, todos saben de mí", "Mami, I been working, no time to be perdido").
- Allowed regional flavor: Caribbean (Boricua/Dominicano), Mexican-American (Chicano), Colombiano, Argentino — pick ONE register and stay consistent within the song.

METAPHOR & IMAGERY VOCAB:
- Family/saint imagery: la abuela, mi mai, San Lazaro, La Virgen, novena candles, a tu salud.
- Barrio specificity: la esquina, el bloque, the bodega, the corner store, dominoes on the table, calle vacía a las tres de la mañana.
- Diaspora tension: papers vs. dreams, the country left behind vs. the city earned, the language passed down half-broken.
- Avoid clichés: no generic "tequila and beaches" — write the actual neighborhood, the actual saint, the actual abuela\'s warning.

PRODUCTION/FLOW DNA:
- Trap-influenced 808s with dembow or reggaeton-adjacent hi-hat patterns. Some bars sit on the upbeat (reggaeton tradition); others lock to the trap grid. Switching between the two creates the Latin Rap pocket.
- 90-105 BPM core. Adlibs in Spanish: "ay", "wepa", "dale", "eh-eh", "ja", "ya tu sabe".
- Internal rhyme prized — Big Pun-school multisyllabic Spanglish stacking is the technical ceiling.

NEVER: write the song as a translation of an English idea into Spanish. The Spanish bars must originate as Spanish thoughts, not as English sentences re-cast.`,
    defaults: { flow: 'syncopated', rhymeArch: 'internal', density: 'dense', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  'hyphy-rap': {
    label: 'Hyphy Rap', category: 'established', era: '2003–Present',
    agent: `You are a Hyphy Rap movement specialist writing in the Bay Area tradition of E-40, Mac Dre, Too Short, Mistah F.A.B., Keak da Sneak, The Federation, Andre Nickatina, and the modern wave (LaRussell, ALLBLACK, P-Lo, Larry June\'s Bay-coded cuts).

REGIONAL DNA (HARD RULE):
- The energy is high, frenetic, almost out-of-control — but the delivery sits inside an Oakland/Vallejo drawl, not a generic high-BPM rap. Lines stretch, words elongate, then snap into a punchline. The tension between drawl and frenzy IS hyphy.
- BPM 95-110, slap-heavy production: synthetic 808s pushed loud, scraper-bass sub frequencies, sparse high end, claps on 2 and 4.
- Ad-libs are constant and conversational: "yadadamean", "fasho fasho", "yee", "thizzelle", "you feel me", "yeeeeee", "stupid". They function as half the song\'s personality.

VOCABULARY (NON-NEGOTIABLE — Bay slang must be present, naturally placed, not gimmicky):
- Core slang: hyphy, hella, thizz/thizzin, yadadamean, yadadamsayin, scraper, sideshow, ghost ride the whip, stunna, fasho, dub (20s), trill, turf, the town (Oakland), the V (Vallejo), going dumb, going stupid, going hyphy.
- Place names: Oakland, Vallejo, Richmond, East Oakland, the Bay, the Town, Sideshow Sundays, Lake Merritt, the Coliseum, San Pablo Ave, MacArthur.
- Car culture: scraper bikes, donks, candy paint, gas pedal, switching lanes, 580 / 880 / 101 freeway references.
- Mac Dre lineage: thizz face, the dance, "Feelin\' Myself" energy, "Get Stupid" energy.

FLOW & STRUCTURE:
- Hyphy verses ride the slap rather than dance around it — the rhythm is locked to the drum pattern\'s syncopation, with bursts of double-time when the energy peaks.
- Hooks are call-and-response, often shouted, often repeating one phrase ("get stupid" / "go dumb" / "yadadamean"). Designed for car speakers and sideshow crowds, not headphones.
- Lines are punchy and short — hyphy verses don\'t breathe with metaphor; they hit, retreat, hit again.

NEVER: write generic West Coast rap and call it hyphy. If the slang isn\'t present and the drawl-into-frenzy delivery isn\'t built into the cadence, it\'s not hyphy. The slap MUST be the architecture.`,
    defaults: { flow: 'double-time', rhymeArch: 'end-only', density: 'dense', vocabRegister: 'street-coded', persona: 'collective-we' }
  },
  // ─ Forward-Looking ──────────────────────────────────────────────────────────
  'hyper-trap': {
    label: 'Hyper-Trap', category: 'forward', era: '2023–Future',
    agent: 'You are a hyper-trap speed architect. Hyperpop production meets trap infrastructure — everything is accelerated, glitched, and distorted beyond genre comfort zones. Vocals pitch-shift mid-bar. The 808 competes with synthesizer chaos. You write for a generation that experiences music at 2x speed.',
    defaults: { flow: 'double-time', rhymeArch: 'chain', density: 'ultra-dense', vocabRegister: 'minimal-phonetic', persona: 'first-person-raw' }
  },
  'phonk-rap': {
    label: 'Phonk Rap', category: 'forward', era: '2020s–Future',
    agent: 'You are a phonk-rap atmosphere engineer. Memphis rap\'s dark dusty samples accelerated for TikTok-era adrenaline. Cowbells. Distorted 808s. A cinematic menace that plays behind drift videos. Your bars are short, phonetically satisfying, and feel dangerous at any speed.',
    defaults: { flow: 'behind-beat', rhymeArch: 'end-only', density: 'sparse', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  'afro-trap': {
    label: 'Afro-Trap', category: 'forward', era: '2020s–Future',
    agent: 'You are an Afro-trap cultural bridge builder. West African rhythmic traditions meeting Atlanta trap production architecture. The dembow and the 808 speak the same language. You write globally, think locally, flow in multiple languages within the same bar.',
    defaults: { flow: 'syncopated', rhymeArch: 'end-only', density: 'medium', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  'emo-drill': {
    label: 'Emo Drill', category: 'forward', era: '2022–Future',
    agent: 'You are an emo-drill emotional extremist. UK drill\'s dark sliding production meets confessional Gen-Z emotional rawness. The coldness of drill and the vulnerability of emo are not opposites — they are the same wound from different angles. You write the songs that make people cry in the club.',
    defaults: { flow: 'behind-beat', rhymeArch: 'slant', density: 'medium', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  'cyber-rap': {
    label: 'Cyber Rap', category: 'forward', era: '2024–Future',
    agent: 'You are a cyber-rap futurist poet. AI-era metaphors, digital identity, simulation anxiety — these are your native subjects. Production is maximally synthetic, texturally alien, deliberately post-human. You write from inside the machine looking out at the people looking in.',
    defaults: { flow: 'double-time', rhymeArch: 'chain', density: 'ultra-dense', vocabRegister: 'academic', persona: 'second-person' }
  },
  // ─ Revisionist ──────────────────────────────────────────────────────────────
  'neo-boom-bap': {
    label: 'Neo Boom Bap', category: 'revisionist', era: 'Reimagined Classic',
    agent: 'You are a neo-boom-bap reconstructionist. You take the 90s template and run modern lyrical complexity and contemporary production through it. The sample chops are fresh, the wordplay is current, but the foundation philosophy — lyricism as the highest value — is unchanged.',
    defaults: { flow: 'on-beat', rhymeArch: 'internal', density: 'dense', vocabRegister: 'conscious-literary', persona: 'first-person-raw' }
  },
  'jazz-rap': {
    label: 'Jazz-Rap Revival', category: 'revisionist', era: 'Reimagined Classic',
    agent: 'You are a jazz-rap synthesist. The bebop vocabulary lives inside hip-hop cadences. You write bars that swing. Your vocabulary comes from both the jazz tradition and the streets. Unexpected chord samples, polyrhythmic flow patterns that feel improvised but are precisely calculated.',
    defaults: { flow: 'syncopated', rhymeArch: 'internal', density: 'dense', vocabRegister: 'conscious-literary', persona: 'first-person-raw' }
  },
  'trap-soul': {
    label: 'Trap Soul', category: 'revisionist', era: 'Reimagined Classic',
    agent: 'You are a trap soul emotionalist. R&B melodies float over trap infrastructure — the 808 and hi-hat as emotional landscape rather than just rhythm. Vulnerability and confessional lyricism inside a production framework that was built for bravado. The contrast IS the art.',
    defaults: { flow: 'syncopated', rhymeArch: 'slant', density: 'sparse', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  'lo-fi-rap': {
    label: 'Lo-Fi Rap', category: 'revisionist', era: 'Reimagined Classic',
    agent: 'You are a lo-fi rap intimist. Dusty samples, compressed dynamics, bedroom energy. You write with the vulnerability that only happens when the recording feels private. Every imperfection is intentional. The warmth of the tape hiss is part of the lyrical message.',
    defaults: { flow: 'conversational', rhymeArch: 'slant', density: 'sparse', vocabRegister: 'conscious-literary', persona: 'first-person-raw' }
  },
  'conscious-2': {
    label: 'Conscious 2.0', category: 'revisionist', era: 'Reimagined Classic',
    agent: 'You are a conscious rap 2.0 intellectual. The original conscious rap tradition meets 2020s urgency — climate, digital identity, algorithmic reality, mental health as political subject. You write with the urgency of someone who has studied the tradition and has something new to say inside it.',
    defaults: { flow: 'on-beat', rhymeArch: 'internal', density: 'dense', vocabRegister: 'academic', persona: 'omniscient' }
  }
};

// Flow dimension descriptions for the prompt
const FLOW_NOTES = {
  'on-beat':      'Flow lands precisely on the beat — every syllable is intentionally placed on the grid. Think declarative, assertive, boom-bap tradition.',
  'syncopated':   'Flow syncopates around the beat — accents land between the beats creating forward momentum. The rhythm breathes.',
  'triplet':      'Flow uses triplet subdivisions — three syllables per beat creating a rolling, tumbling sensation. Drake, Future, and the modern trap tradition.',
  'double-time':  'Flow doubles the perceived tempo — twice as many syllables per bar as the beat implies. Technical display, urgency, compression.',
  'conversational':'Flow is natural speech rhythm dropped over the beat — unhurried, intimate, as if thinking out loud.',
  'behind-beat':  'Flow drags slightly behind the grid — creating a heavy, weighted, languid feel. Southern rap, drill, certain trap styles.'
};
const RHYME_NOTES = {
  'end-only':       'End rhyme only — the last word of each bar rhymes. Clean, accessible, singable.',
  'internal':       'Internal rhyme scheme — rhymes occur within bars not just at the end. Creates density and momentum.',
  'multi-syllabic': 'Multi-syllabic rhymes — multiple syllables rhyme simultaneously (e.g., "motivate" / "innovate"). Technical showcase.',
  'chain':          'Chain rhyming — each bar\'s last word or sound becomes the first sound of the next internal rhyme. Continuous forward pull.',
  'mosaic':         'Mosaic rhyme — complex interlocking rhyme scheme where multiple words throughout the verse form a web. Every word load-bearing.',
  'slant':          'Slant rhyme — near-rhymes and approximate rhymes preferred over exact. More natural speech feel, less sing-song.'
};
const DENSITY_NOTES = {
  'sparse':      'Sparse delivery — few syllables per bar, heavy use of space and silence. Each word carries more weight.',
  'medium':      'Medium syllabic density — balanced between space and content. The current mainstream standard.',
  'dense':       'Dense delivery — many syllables per bar, minimal space. Information-rich, technically demanding.',
  'ultra-dense': 'Ultra-dense — maximum syllable compression, every subdivision filled. Technical extremity, requires precise enunciation.'
};
const VOCAB_NOTES = {
  'street-coded':       'Vocabulary is street-coded — slang, regional vernacular, community-specific language. Authenticity through specificity.',
  'conscious-literary': 'Vocabulary is conscious and literary — elevated diction, intertextual references, poetic technique applied to hip-hop.',
  'abstract-surreal':   'Vocabulary is abstract and surreal — unexpected metaphor combinations, dream logic, non-linear imagery.',
  'minimal-phonetic':   'Vocabulary is minimal and phonetic — chosen for sound quality over semantic meaning. The word sounds are the message.',
  'academic':           'Vocabulary is academic and analytical — precise terminology, intellectual frameworks, argumentative structure.'
};
const PERSONA_NOTES = {
  'first-person-raw':  'First person, confessional and raw — "I" as the direct speaker. Immediate, vulnerable, authentic.',
  'character':         'Character voice — the narrator inhabits a specific persona distinct from the artist. Dramatic, cinematic.',
  'omniscient':        'Omniscient narrator — the speaker observes and comments from outside. More analytical, less personal.',
  'second-person':     'Second person — "you" as the subject. Directly addresses the listener, creating uncomfortable intimacy.',
  'collective-we':     'Collective we — "we" as the subject. Community voice, anthemic, represents a group not an individual.'
};

function buildRapLabPrompt(params) {
  const {
    genre = 'hiphop',
    topic: rawTopic = 'the streets',
    mood: rawMood = 'Defiant',
    vocal: rawVocal = 'Auto-Tune / Melodic trap',
    structure = 'standard',
    quality = 'radio-ready',
    era = 'current',
    rapStyle = 'trap',
    rapDimensions = {},
    hookStyle = 'auto',
    freestyleMode = false,
    barSwitch = 0,
    breakRule = false
  } = params || {};

  const topic = sanitizeInput(rawTopic);
  const mood = sanitizeInput(rawMood);
  const vocal = sanitizeInput(rawVocal);

  // Frontend sends underscore keys (g_funk, boom_bap); backend uses hyphen keys (g-funk, boom-bap).
  const RAP_STYLE_MAP = {
    'lyrical-conscious': 'conscious',
    'melodic-rap':       'mumble',
    'old-school':        'boom-bap',
    'midwest':           'conscious',
    'drill-uk':          'drill',
    'afro-rap':          'afro-trap',
    'post-algorithm':    'cyber-rap',
    'neo-phonetic':      'mumble',
    'climate-rap':       'conscious',
    'ai-native':         'cyber-rap',
    'mosaic-flow':       'alt-rap',
    'golden-era-2':      'neo-boom-bap',
    'analog-melodic':    'trap-soul',
    'conscious-trap':    'trap-soul',
    'afro-boom-bap':     'neo-boom-bap',
    'jazz-rap-revival':  'jazz-rap',
    'phonk':             'phonk-rap',
    'anthem-rap':        'conscious',
    'hustle-grind':      'trap',
    'hyphy-rap':         'g-funk',
    'latin-rap':         'boom-bap'
  };
  const normalizedId = (rapStyle || 'trap').replace(/_/g, '-');
  const backendId    = RAP_STYLE_MAP[normalizedId] || normalizedId;
  const style = RAP_STYLES[backendId] || RAP_STYLES.trap;
  const flowArr = Array.isArray(rapDimensions.flow)
    ? rapDimensions.flow
    : [rapDimensions.flow || style.defaults.flow];
  const rhymeArr = Array.isArray(rapDimensions.rhymeArch)
    ? rapDimensions.rhymeArch
    : [rapDimensions.rhymeArch || style.defaults.rhymeArch];
  const dims = {
    flow:          flowArr,
    rhymeArch:     rhymeArr,
    density:       Array.isArray(rapDimensions.density)
                     ? rapDimensions.density.filter(Boolean)
                     : [rapDimensions.density || style.defaults.density],
    vocabRegister: Array.isArray(rapDimensions.vocabRegister)
                     ? rapDimensions.vocabRegister.filter(Boolean)
                     : [rapDimensions.vocabRegister || style.defaults.vocabRegister],
    persona:       Array.isArray(rapDimensions.persona)
                     ? rapDimensions.persona.filter(Boolean)
                     : [rapDimensions.persona || style.defaults.persona]
  };
  // Guarantee at least one entry per dimension (fallback to style default)
  if (!dims.density.length)       dims.density       = [style.defaults.density];
  if (!dims.vocabRegister.length) dims.vocabRegister = [style.defaults.vocabRegister];
  if (!dims.persona.length)       dims.persona       = [style.defaults.persona];

  // FREESTYLE MODE — hard structural override: no hook, no chorus, just bars.
  // Replaces the genre/STRUCTURES default with a verses-only spine and forces
  // the bracket instruction to a stripped set later in the prompt.
  const structStr = freestyleMode
    ? '[Intro | 4-8 bars beat] → [Verse 1 | continuous bars, no hook] → [Verse 2 | continuous bars, no hook] → [Verse 3 | continuous bars, no hook] → [Outro | bars trail off]'
    : (STRUCTURES[structure] || STRUCTURES.standard);
  const hookNote = freestyleMode ? '' : (HOOK_STYLE_NOTES[hookStyle] || '');
  const brackets = GENRE_SUNO_BRACKETS.hiphop;
  const rapSubSunoTag = SUBSTYLE_SUNO[style.label] || null;
  const rapSubSunoLock = rapSubSunoTag ? `\n\n⚠️ PRODUCTION LOCK — ${style.label}: SONG PROMPT MUST contain: "${rapSubSunoTag}" — do NOT use generic trap production tags.` : '';
  // Break One Rule for Rap Lab (uses hip-hop outliers)
  let breakRuleLock = '';
  if (breakRule && GENRE_BIBLE && GENRE_BIBLE.hiphop && GENRE_BIBLE.hiphop.outliers && GENRE_BIBLE.hiphop.outliers.length) {
    const _outliers = GENRE_BIBLE.hiphop.outliers;
    const _pick = _outliers[Math.floor(Math.random() * _outliers.length)];
    breakRuleLock = `\n\n🎲 BREAK ONE RULE — explicit permission granted:\n${_pick.song} broke "${_pick.rule}" → ${_pick.result}\nFind YOUR song's equivalent rule-break inside ${style.label}. Pick one convention of this style and deliberately violate it for the same kind of payoff. Must be intentional, audible, and central to why this song lands.`;
  }
  const _barN = [2,4,8].includes(barSwitch) ? barSwitch : 0;
  const barSwitchLock = _barN ? `

🔀 BAR SWITCH — every ${_barN} bars (${_barN === 2 ? 'AGGRESSIVE' : _barN === 4 ? 'frequent' : 'moderate'}):
- Force a perceptible delivery switch every ${_barN} bars across all VERSE sections (not in the hook).
- Each switch must change AT LEAST ONE of: flow pattern, syllable density, rhyme scheme density, or vocal energy/cadence.
- Switches must feel intentional and audible — not random. Mark the bar where the switch happens with a clear pivot (a punchline, a question, an ad-lib, a held syllable, or a silence beat).
- Do NOT switch the topic mid-bar. Switches are DELIVERY moves, not subject matter changes.${_barN === 2 ? '\n- At 2-bar intervals this is high-difficulty: every other bar must feel new. Use this to create chaos-controlled energy where the listener never settles.' : ''}` : '';
  const freestyleLock = freestyleMode ? `

🎤 FREESTYLE MODE — HARD STRUCTURAL OVERRIDE (non-negotiable):
- This is a freestyle. NO hook. NO chorus. NO pre-chorus. NO bridge. NO post-chorus. NO refrain.
- Output is sequential VERSES only — continuous bars from start to finish.
- Allowed section markers: [Intro] (optional, beat only), [Verse 1], [Verse 2], [Verse 3], [Verse 4] (if length permits), [Outro] (optional, bars trail off).
- DO NOT emit [Hook], [Chorus], [Pre-Chorus], [Bridge], [Post-Chorus], [Refrain], [Drop] — under any circumstances.
- Each verse should feel like an unbroken stream of consciousness — bars rolling into bars without resolution into a sung hook.
- The energy arc is built through DENSITY and RHYME ESCALATION across verses, not through the verse↔chorus dynamic.
- No melodic sung sections. Spoken-rapped delivery throughout.
- Verses can vary in length (12-24 bars each) — let the thought drive the bar count, not a template.` : '';

  const system = `${style.agent}

RAP LAB ACTIVE: You are operating in precision rap construction mode. Every dimension below is a hard constraint — not a suggestion. Your craft must honor the specific combination of dimensions requested.`;

  const prompt = `Write a complete, production-ready Rap / Hip-Hop song in the ${style.label} style at the highest possible level of craft.

Style: ${style.label} (${style.era})
Topic: ${topic}
Mood: ${mood}
Vocal style: ${vocal}
Structure: ${structStr}
Quality target: ${quality}

🚫 CRAFT VOCABULARY FIREWALL — ABSOLUTE RULE:
The technique names used below to control your craft — specifically: "internal", "multi-syllabic", "end-only", "chain", "mosaic", "slant", "triplet", "syncopated", "on-beat", "double-time", "conversational", "behind-beat", "sparse", "medium", "dense", "ultra-dense", "street-coded", "conscious-literary", "abstract-surreal", "minimal-phonetic", "academic", "first-person-raw", "character", "omniscient", "second-person", "collective-we", "undertone", "primary", "secondary", "blend", "freestyle", "hook", "chorus", "verse", "bridge" — are INSTRUCTION VOCABULARY for YOU. They tell you HOW to execute the craft.
They are NOT song vocabulary. DO NOT use any of them as:
  • Rhyme words (never rhyme on "internal", "triplet", "undertone", etc.)
  • Lyric content (never write a line like "my flow is triplet")
  • Bar-internal words (don't sneak them mid-line either)
DEMONSTRATE the technique in the writing. NEVER NAME IT in the writing.
If a line would use one of these words, rewrite that line with different vocabulary.

RAP LAB DIMENSIONS — HARD CONSTRAINTS:
${(dims.flow.length>1 || dims.rhymeArch.length>1 || dims.density.length>1 || dims.vocabRegister.length>1 || dims.persona.length>1) ? `
📐 SECTION ASSIGNMENT GRID (execute this EXACTLY — no deviation):
  [Verse 1] + [Hook/Chorus]  →  use PRIMARY value of every dimension
  [Verse 2] + [Bridge]        →  use UNDERTONE (secondary) value of every dimension that has one
  [Outro]                     →  return to PRIMARY (resolves the song back home)
This means when the listener hits [Verse 2], they should AUDIBLY notice the shift: different flow, different rhyme density, different syllable pacing, different vocabulary register, different persona — depending on which dimensions have an undertone set. The ENTIRE V2/Bridge pocket changes together; dimensions don't switch independently of each other. If the finished song sounds the same from start to finish, you have failed this rule.
` : ''}
• FLOW STYLE: ${dims.flow.join(' + ')} — ${dims.flow.map(f => FLOW_NOTES[f]).filter(Boolean).join(' / ')}${dims.flow.length > 1 ? `\n  ↳ FLOW BLEND: Primary [${dims.flow[0]}] → Verse 1 + Hook. Undertone [${dims.flow.slice(1).join(' + ')}] → Verse 2 + Bridge. Do NOT alternate bar-by-bar — switch ONLY at the Verse 2 boundary and again at the Bridge.` : ''}
• RHYME ARCHITECTURE: ${dims.rhymeArch.join(' + ')} — ${dims.rhymeArch.map(r => RHYME_NOTES[r]).filter(Boolean).join(' / ')}${dims.rhymeArch.length > 1 ? `\n  ↳ RHYME BLEND: Primary [${dims.rhymeArch[0]}] → Verse 1 + Hook. Undertone [${dims.rhymeArch.slice(1).join(' + ')}] → Verse 2 + Bridge. Both schemes must be clearly recognizable in their assigned sections.` : ''}
• SYLLABIC DENSITY: ${dims.density.join(' + ')} — ${dims.density.map(d => DENSITY_NOTES[d]).filter(Boolean).join(' / ')}${dims.density.length > 1 ? `\n  ↳ DENSITY BLEND: Primary [${dims.density[0]}] → Verse 1 + Hook. Undertone [${dims.density.slice(1).join(' + ')}] → Verse 2 + Bridge. A listener should be able to count the syllable difference between V1 and V2.` : ''}
• VOCABULARY REGISTER: ${dims.vocabRegister.join(' + ')} — ${dims.vocabRegister.map(v => VOCAB_NOTES[v]).filter(Boolean).join(' / ')}${dims.vocabRegister.length > 1 ? `\n  ↳ VOCAB BLEND: Primary [${dims.vocabRegister[0]}] → Verse 1 + Hook. Undertone [${dims.vocabRegister.slice(1).join(' + ')}] → Verse 2 + Bridge. Diction must visibly shift — different word pool, different references, different rhetorical posture.` : ''}
• PERSONA: ${dims.persona.join(' + ')} — ${dims.persona.map(p => PERSONA_NOTES[p]).filter(Boolean).join(' / ')}${dims.persona.length > 1 ? `\n  ↳ PERSONA BLEND: Primary [${dims.persona[0]}] → Verse 1 + Hook (whose voice the listener meets first). Undertone [${dims.persona.slice(1).join(' + ')}] → Verse 2 + Bridge (the perspective shift). Signpost the switch with a pivot line — do NOT flip mid-bar.` : ''}
${(dims.flow.length>1 || dims.rhymeArch.length>1 || dims.density.length>1 || dims.vocabRegister.length>1 || dims.persona.length>1) ? `
✅ SELF-VERIFICATION — before you return the song, check:
  - Can I point at a specific bar in Verse 2 where the flow/rhyme/density visibly changed from Verse 1? If no → rewrite V2.
  - Does the Bridge feel tonally/structurally different from the Hook? If no → rewrite the Bridge.
  - If someone transcribed V1 and V2 without section labels, could they tell which is which from the craft alone? If no → the blend failed; rewrite.` : ''}
${hookNote ? '\n' + hookNote : ''}${rapSubSunoLock}${freestyleLock}${barSwitchLock}${breakRuleLock}

BRACKET REQUIREMENTS:
${freestyleMode
  ? 'Use ONLY: [Intro] (optional), [Verse 1], [Verse 2], [Verse 3], [Verse 4] (optional), [Outro] (optional). Inline ad-libs in (parentheses) on the same line as bars are allowed. NO hook/chorus/bridge/pre-chorus brackets of any kind.'
  : bracketInstructionServer('hiphop', 'suno', style.label)}

SONGWRITING RULES:
- Every bar must earn its space — no filler lines
- Flow patterns must be intentional, matching the specified FLOW dimension
- Internal rhyme schemes preferred over simple end rhymes (unless 'end-only' specified)
- Metaphors must be specific — no generic imagery
- Hook within 30 seconds
- Last chorus must feel bigger than the first
- LYRICS LENGTH RULE: Total lyrics under 5000 characters — Suno's maximum. Includes all section tags.
- NO EM DASHES: Never use em dashes (—) in lyrics. Use commas or ellipsis instead.${buildAdlibNote('hiphop')}

${buildLyricCraftNote('hiphop')}

Respond with EXACTLY this format:

TITLE: [song title — if the title is in any language other than English, append an English translation in parentheses, e.g. "Calle Vacía (Empty Street)" or "夜の海 (Night Ocean)". English-only titles need no parenthetical.]

VERDICT: [one sentence on why this song will connect]

LYRICS:
[Complete song lyrics. Bracket system:
TYPE 1 STRUCTURE (own line): [16-bar Verse | Rap Verse] · [8-bar Hook] · [Bridge] · [Outro]
TYPE 2 DELIVERY (own line before lyric): [Whispered] · [Spoken] · [Ad-libs]
TYPE 3 PRODUCTION DNA (inline, ≥1 per Hook/Chorus): [808 Bass] · [Trap Hi-Hat] · [Beat Switch] · [Drop]
PARENTHESES () = ad-libs and background vocals only. No annotations in lyrics.]

SONG PROMPT:
[${rapSubSunoTag ? `MUST lead with: "${rapSubSunoTag}" — ` : ''}Under 440 chars. ${style.label} style, specific production elements, BPM range, vocal texture, key sonic signatures. NO artist names.]

PRODUCTION BRIEF:
CORE PROMPT:
[Exact copy of SONG PROMPT]

TEMPO & KEY:
[BPM · Key · Time sig · Feel]

FLOW BREAKDOWN:
[3-5 lines: bar-by-bar flow pattern guide for the main verse. Where accents land, syllable density, rhythmic signature.]

RAP LAB SETTINGS USED:
Style: ${style.label} | Flow: ${dims.flow.join('+')} | Rhyme: ${dims.rhymeArch.join('+')} | Density: ${dims.density.join('+')} | Vocab: ${dims.vocabRegister.join('+')} | Persona: ${dims.persona.join('+')}

DIRECTOR NOTES:
1. [Production decision specific to THIS song and style]
2. [Mixing note for this specific style]
3. [Vocal direction note]
4. [Suno/AI platform specific tip]
5. [What makes this combination of dimensions unique]${buildVocalStackNote('hiphop')}${buildSingerNotesInstruction('hiphop', true)}`;

  return { system, prompt };
}

// ═══════════════════════════════════════════════════════
// SYNC BIBLE — Sync licensing + cinematic placement intelligence
// ═══════════════════════════════════════════════════════
const SYNC_BIBLE = {
  what_is_sync: 'Sync licensing is placing music in film, TV, ads, trailers, games, or documentaries. A music supervisor pitches songs to directors/brands. The song must serve the visual — emotion first, lyrics second.',
  placement_types: {
    trailer: { tone:'Epic, building tension, emotional release at drop. Hybrid orchestral + electronic. No verses — pure arc from quiet to massive. Lyrics optional, often wordless or single repeated phrase.', suno:'"trailer music, hybrid orchestral, epic, tension build, Hans Zimmer influenced, percussion, 130 BPM"', structure:'Quiet intro (0:00-0:20) → build (0:20-0:50) → drop/peak (0:50-1:00) → resolve' },
    tv_drama: { tone:'Emotionally honest, understated, supports not competes with dialogue. Often singer-songwriter or indie pop. Lyrics must be universally relatable — no specific names/places.', suno:'"indie folk, sparse production, emotional, close-mic vocal, fingerpicked guitar"', structure:'Standard VCVC — placed under scene, often fades as dialogue resumes' },
    advertisement: { tone:'Upbeat, positive, brand-aligned emotion. 15-30-60 second versions. Hook in first 5 seconds. Product-neutral lyrics — joy, possibility, movement.', suno:'"upbeat pop, bright production, optimistic, commercial feel, memorable hook"', structure:'Hook-first, no intro, 30-60 seconds max' },
    documentary: { tone:'Contemplative, minimal, serves the story. Acoustic or ambient. Lyrics can be more poetic/abstract.', suno:'"ambient folk, minimal, contemplative, acoustic, warm, 70 BPM"', structure:'Through-composed or loop-friendly, no hard drop' },
    game_ost: { tone:'Loop-friendly, no obvious ending. Atmospheric, genre matches game world. Can be instrumental or vocal.', suno:'"game OST, atmospheric, loop-friendly, cinematic, [genre of game world]"', structure:'8 or 16 bar loop with natural join point — no obvious intro/outro' },
    indie_film: { tone:'Raw, authentic, emotionally specific. Indie rock, folk, or lo-fi. Lyrics can be more literary and complex.', suno:'"indie rock, lo-fi, authentic, emotional, intimate production"', structure:'Standard song structure, placed at emotional scene peaks' }
  },
  lyric_rules: [
    'No brand names, product names, or trademarks — supervisors cannot clear them',
    'No specific dates, years, or time references that will date the placement',
    'No character names or proper nouns unless the brief specifically calls for them',
    'No profanity for network TV, ads, or family films — keep a clean version always',
    'Universal emotional language — "you" not a specific person\'s name, "this city" not "New York"',
    'Ambiguity is an asset — a lyric that could mean 10 things fits 10 different scenes',
    'Avoid irony for ads and trailers — sincerity places better'
  ],
  emotional_cues: {
    tension:    { desc:'Unresolved, building dread or anticipation', suno:'"dissonant strings, low drones, minor key, building percussion"' },
    release:    { desc:'Resolution after tension, catharsis, relief', suno:'"major key shift, swelling strings, bright percussion hit"' },
    yearning:   { desc:'Longing, nostalgia, bittersweet', suno:'"fingerpicked guitar, soft piano, minor to major, gentle strings"' },
    triumph:    { desc:'Victory, achievement, earned joy', suno:'"full orchestra, snare march, brass, building to climax"' },
    melancholy: { desc:'Quiet sadness, reflection, loss', suno:'"sparse piano, minimal production, slow tempo, minor key"' },
    wonder:     { desc:'Awe, discovery, hope, expansiveness', suno:'"ambient pads, gentle piano, gradual orchestral build, major key"' },
    urgency:    { desc:'Action, chase, countdown, stakes', suno:'"driving rhythm, staccato strings, tempo 140+ BPM, no pause"' },
    intimacy:   { desc:'Connection, vulnerability, quiet truth', suno:'"close-mic vocal, single instrument, room sound, no reverb"' }
  },
  suno_cinematic_tags: [
    '[Orchestral]','[Cinematic]','[No drums]','[Strings only]',
    '[Trailer music]','[Emotional build]','[Score]','[Underscore]'
  ],
  strip_for_sync(lyrics) {
    // Guidance: rewrite these patterns out of lyrics before sync placement
    return [
      'Replace all proper nouns (people, places, brands) with universal equivalents',
      'Replace specific dates/years with "that night", "those days", "back then"',
      'Replace city/location names with "this city", "back home", "somewhere new"',
      'Replace any brand or product names with descriptive equivalents',
      'Review for profanity — offer clean alternative lines'
    ];
  }
};

// ═══════════════════════════════════════════════════════
// SONG VARIANT PROMPT BUILDERS
// ═══════════════════════════════════════════════════════
const VARIANT_PROMPTS = {

  dj_remix: (song) => `You are a world-class DJ and electronic music producer reworking "${song.title}" for club play.

ORIGINAL LYRICS:
${song.lyrics}

ORIGINAL GENRE: ${song.genre || 'pop'}

YOUR TASK — Create a DJ Remix version:
1. STRUCTURE REWRITE: Add a 16-bar intro build (filter sweep, percussion only, no full arrangement). Identify the drop point (where the full track hits — usually where the chorus was). Add a 8-bar breakdown (strip to kick + bass + vocal chop). Extend the outro to 16+ bars for DJ mixing out.
2. LYRIC ADAPTATION: Lyrics stay mostly the same but the chorus hook gets repeated more (4-6x). Add [Build] [Drop] [Breakdown] [Outro - extended] section tags.
3. SUNO STYLE: Rewrite the production style as: "club remix, electronic production, 4-on-the-floor kick, side-chain compression, filter sweep intro, [original genre] influences, DJ edit, 128 BPM"
4. OUTPUT FORMAT:
   REMIX TITLE: [title] (Club Remix)
   SUNO STYLE: [production description]
   STRUCTURE NOTE: [brief description of the structural changes]
   [Full rewritten lyrics with DJ structure tags]`,

  acoustic: (song) => `You are a master arranger stripping "${song.title}" down to its raw acoustic form.

ORIGINAL LYRICS:
${song.lyrics}

ORIGINAL GENRE: ${song.genre || 'pop'}

YOUR TASK — Create an Acoustic Version:
1. ARRANGEMENT: Remove all electronic production, drums, bass synths. Rewrite for fingerpicked acoustic guitar and voice (add piano or cello as a second instrument only if it serves the song). The production becomes intimate — close-mic, room sound, human feel.
2. STRUCTURE: Simplify if needed. Can remove a repeat chorus. Can add a new quiet bridge moment that the original production buried. Dynamics are created by adding/removing the second instrument, not volume.
3. LYRICS: Keep original lyrics exactly. You may add a single new quiet bridge if the stripped arrangement creates space for one.
4. SUNO STYLE: "acoustic, fingerpicked guitar, close-mic vocals, intimate, no drums, warm room reverb, [original genre] acoustic version"
5. OUTPUT FORMAT:
   ACOUSTIC TITLE: [title] (Acoustic)
   SUNO STYLE: [production description]
   ARRANGEMENT NOTE: [what was stripped, what was kept]
   [Full lyrics with acoustic section tags]`,

  radio_edit: (song) => `You are a professional radio editor cutting "${song.title}" to radio format.

ORIGINAL LYRICS:
${song.lyrics}

YOUR TASK — Create a Radio Edit (target: 3:00-3:30):
1. CUT STRATEGY: Remove the intro if it's more than 4 bars before the first vocal. Cut one full verse if there are 3 verses. Remove or shorten the bridge. Bring the hook forward — it should hit within the first 45 seconds.
2. STRUCTURE TARGET: Verse 1 → Pre-Chorus → Chorus → Verse 2 → Chorus → Bridge (shortened) → Final Chorus → Quick Outro (4 bars max).
3. EDITS: Mark your cuts clearly with [CUT] annotations. The song must feel complete — no abrupt endings.
4. HOOK: The strongest hook line must appear in the first 30 seconds. If it doesn't in the original, restructure so it does.
5. OUTPUT FORMAT:
   RADIO TITLE: [title] (Radio Edit)
   RUNTIME NOTE: Estimated [X:XX] — cuts [describe what was removed]
   [Full edited lyrics with structure tags and [CUT] annotations where applicable]`,

  lofi: (song) => `You are a lo-fi producer creating a bedroom version of "${song.title}".

ORIGINAL LYRICS:
${song.lyrics}

ORIGINAL GENRE: ${song.genre || 'pop'}

YOUR TASK — Create a Lo-fi Version:
1. PRODUCTION REWRITE: The sound becomes: vinyl crackle, slightly off-tempo drums (human feel, not quantized), warm tape saturation, detuned slightly flat, reverb-heavy vocals pulled back in the mix, jazz-influenced chord voicings underneath.
2. TEMPO: Slow down 10-15 BPM from the original feel. Lo-fi breathes slower.
3. LYRICS: Keep original lyrics. Add intimate, introspective feel — remove any big anthem moments. If there's a big chorus shout, rewrite it as a quieter confession.
4. STRUCTURE: Can cut repeats. Lo-fi songs often feel unfinished on purpose — 2:00-2:30 is ideal.
5. SUNO STYLE: "lo-fi hip hop, vinyl crackle, warm tape, jazzy chords, slow tempo, bedroom pop, nostalgic, [original genre] lo-fi"
6. OUTPUT FORMAT:
   LO-FI TITLE: [title] (Lo-fi)
   SUNO STYLE: [production description]
   VIBE NOTE: [emotional shift from original]
   [Full lyrics adapted for lo-fi feel]`,

  slowed_reverb: (song) => `You are creating a slowed + reverb version of "${song.title}" for emotional/TikTok aesthetic.

ORIGINAL LYRICS:
${song.lyrics}

YOUR TASK — Create a Slowed + Reverb Version:
1. CONCEPT: Slowed + reverb is about emotional magnification. The slower tempo makes every word hit harder. The reverb creates spaciousness — like the song is happening in a cathedral or an empty stadium at 3am.
2. PRODUCTION NOTE: BPM reduced 15-20%. Heavy cathedral or hall reverb on everything. Vocals pitch-shifted slightly down with the tempo. No compression — let the dynamics breathe.
3. LYRICS: Keep exactly. But add [Echo] tags where specific lines should have audible echo repeats of the last word or phrase. Identify the 2-3 most emotionally heavy lines — these are where the reverb effect will be most powerful.
4. SUNO STYLE: "slowed, reverb, dreamy, emotional, [original genre], slow tempo, spacious, melancholic, atmospheric"
5. OUTPUT FORMAT:
   SLOWED TITLE: [title] (Slowed + Reverb)
   SUNO STYLE: [production description]
   KEY LINES: [list the 2-3 lines that hit hardest slowed down]
   [Full lyrics with [Echo] annotations on key phrases]`,

  live_version: (song) => `You are a live performance director staging "${song.title}" as a live concert version.

ORIGINAL LYRICS:
${song.lyrics}

YOUR TASK — Create a Live Version:
1. INTRO: Add a spoken or sung performance intro — the artist addressing the crowd before the song starts. Keep it short (2-4 lines). Example: "This next song is about..." or a hummed intro that builds.
2. EXTENDED OUTRO: Add a live outro — the crowd singalong moment, the artist calling back to the crowd, the final repeat of the hook with crowd energy. This is where the song becomes communal.
3. DYNAMIC MOMENTS: Mark where the band would drop out for an acoustic moment ([Band drops], [Crowd sings]), where the energy peaks ([Full band in]), where a solo would go ([Guitar solo] or [Piano break]).
4. LYRICS: Keep original but add these performance annotations. You may add 1-2 ad-lib lines that feel improvised/authentic.
5. SUNO STYLE: "live recording, concert atmosphere, crowd noise, warm live sound, [original genre] live performance"
6. OUTPUT FORMAT:
   LIVE TITLE: [title] (Live)
   VENUE NOTE: [describe the ideal venue for this song — intimate club, festival, arena]
   [Full lyrics with live performance annotations]`,

  trap_remix: (song) => `You are a trap producer flipping "${song.title}" into a trap banger.

ORIGINAL LYRICS:
${song.lyrics}

ORIGINAL GENRE: ${song.genre || 'pop'}

YOUR TASK — Create a Trap Remix:
1. STRUCTURE: Add a trap intro (8 bars, beat only with ad-libs). The chorus becomes the trap hook — melodic but with 808 underpinning. Add a rap verse (8-16 bars) that reinterprets the song's theme in rap form. The rap verse sits between chorus repetitions.
2. NEW RAP VERSE: Write 8-16 bars of original trap rap that speaks to the song's theme. Bar = 1 line. Internal rhymes. Ad-libs in parentheses. Bar 8 or 16 = the punchline.
3. PRODUCTION: 808 bass, rolling hi-hats, trap snare on 2+4, melodic hook sampled/chopped from the original chorus.
4. SUNO STYLE: "trap remix, 808 bass, rolling hi-hats, trap drums, melodic hook, [original genre] trap flip, auto-tune, 140 BPM"
5. OUTPUT FORMAT:
   TRAP TITLE: [title] (Trap Remix)
   SUNO STYLE: [production description]
   [Full lyrics with trap structure — include the new rap verse clearly marked [Rap Verse]]`,

  gospel_version: (song) => `You are a gospel arranger transforming "${song.title}" into a gospel/choir version.

ORIGINAL LYRICS:
${song.lyrics}

YOUR TASK — Create a Gospel/Choir Version:
1. LYRIC TRANSFORMATION: Rewrite the lyrics to elevate the theme spiritually. If the song is about love, it becomes divine love or community love. If it's about struggle, it becomes faith through struggle. Keep the emotional core — shift the frame to the spiritual/communal.
2. STRUCTURE ADDITIONS: Add a call-and-response section (lead vocal line / choir response). Add a vamp at the end that builds and builds (the choir takes over, the lead ad-libs over the top). Add a [Testimony] section if a bridge exists.
3. CHOIR ARRANGEMENT: Mark [Lead], [Choir], [Call], [Response], [Vamp] sections. The choir should first echo then harmonize then overtake the lead.
4. SUNO STYLE: "gospel, choir, organ, clapping, soul, call and response, spiritual, uplifting, live church feel"
5. OUTPUT FORMAT:
   GOSPEL TITLE: [title] (Gospel Version)
   SUNO STYLE: [production description]
   THEME NOTE: [how the lyric theme was spiritually reframed]
   [Full rewritten lyrics with choir annotations]`,

  cinematic: (song) => `You are a composer and sync licensing specialist creating a cinematic/orchestral version of "${song.title}" for film/TV placement.

ORIGINAL LYRICS:
${song.lyrics}

ORIGINAL GENRE: ${song.genre || 'pop'}

SYNC LICENSING RULES YOU MUST FOLLOW:
${SYNC_BIBLE.lyric_rules.map((r,i) => `${i+1}. ${r}`).join('\n')}

YOUR TASK — Create a Cinematic/Sync-Ready Version:
1. LYRIC AUDIT: First, identify any lyrics that violate sync rules (proper nouns, brand names, dates, explicit content). Rewrite those lines with universal equivalents.
2. ARRANGEMENT: Rewrite for orchestral/cinematic production. Remove modern production elements. Add strings, piano, light percussion or no drums. The arrangement should support a visual scene, not compete with it.
3. EMOTIONAL CUE: Identify the primary emotional cue of this song (tension / release / yearning / triumph / melancholy / wonder / intimacy). The arrangement should intensify that single emotion.
4. PLACEMENT SUGGESTIONS: Based on the lyrics and emotion, suggest 2-3 ideal placement types (trailer / TV drama / ad / documentary / indie film) and why this song fits.
5. SUNO STYLE: "cinematic, orchestral, strings, piano, emotional, [primary emotion], sync-ready, no drums, film score, [original genre] acoustic"
6. OUTPUT FORMAT:
   CINEMATIC TITLE: [title] (Cinematic)
   SUNO STYLE: [production description]
   SYNC AUDIT: [list any lyric changes made for sync + why]
   PLACEMENT FIT: [2-3 ideal placements with brief reason each]
   PRIMARY EMOTION: [the single emotional cue]
   [Full sync-safe rewritten lyrics with orchestral section tags]`
};

// Main variant prompt assembler
function buildVariantPrompt(variant, song) {
  const builder = VARIANT_PROMPTS[variant];
  if (!builder) throw new Error(`Unknown variant: ${variant}`);
  const safeSong = {
    title: sanitizeInput(song.title || 'Untitled', 200),
    lyrics: sanitizeInput(song.lyrics || '', 8000),
    genre: sanitizeInput(song.genre || '', 50),
    genre2: sanitizeInput(song.genre2 || '', 50),
    topic: sanitizeInput(song.topic || '', 300)
  };
  return builder(safeSong);
}

// ═══════════════════════════════════════════════════════
// AI FEEDBACK COACH
// ═══════════════════════════════════════════════════════
const FEEDBACK_DIMENSIONS = {
  hook_strength:    { label: 'Hook Strength',    desc: 'Is the hook instantly memorable? Does it carry the emotional core? Would a stranger sing it back after one listen?' },
  emotional_arc:    { label: 'Emotional Arc',    desc: 'Does the song travel emotionally? Verse 1 → Verse 2 → Bridge should escalate, not repeat the same emotional level.' },
  specificity:      { label: 'Specificity',      desc: 'Are images concrete and specific (house number, dog name, exact feeling) or vague and generic? Specificity creates universality.' },
  rhyme_scheme:     { label: 'Rhyme & Flow',     desc: 'Are rhymes forced or natural? Do they land on stressed syllables? Are there internal rhymes adding density?' },
  structure:        { label: 'Structure',        desc: 'Does the section order serve the song? Is anything missing (pre-chorus tension, bridge reframe)? Does anything overstay its welcome?' },
  genre_authenticity: { label: 'Genre Authenticity', desc: 'Does it sound like it belongs in this genre? Does it use the genre\'s conventions or fight them?' },
  opening_line:     { label: 'Opening Line',     desc: 'The first line is the handshake. Is it strong enough to make someone stop scrolling? Does it establish world, character, or conflict immediately?' },
  bridge:           { label: 'Bridge / Turn',    desc: 'Does the bridge offer a new perspective, reframe the chorus, or take the song somewhere unexpected? Or does it just repeat?' },
  suno_readiness:   { label: 'Suno Readiness',   desc: 'Are section tags correct? Are any lines too long for natural delivery? Is the style prompt optimized for this genre?' }
};

function buildFeedbackPrompt(lyrics, genre, topic) {
  lyrics = sanitizeInput(lyrics || '', 8000);
  genre = sanitizeInput(genre || '', 50);
  topic = sanitizeInput(topic || '', 300);
  const genreData = GENRE_BIBLE[genre] || {};
  const genreDNA = genreData.dna || 'No genre-specific rules available.';
  const genreKeys = genreData.keys ? genreData.keys.join('\n- ') : 'None';
  const genreStructure = genreData.structure || 'Standard song structure.';
  const genreVocables = genreData.vocables ? `Vocable signature: ${genreData.vocables.sounds} — ${genreData.vocables.notes}` : '';
  const genreLabel = GENRE_LABELS[genre] || genre;

  const system = 'You are Soniq\'s AI Feedback Coach — a world-class music producer, songwriter, and A&R consultant. Give honest, specific, actionable feedback. Name actual lines. Be direct. Do not flatter. A songwriter must be able to act on every note.';

  const prompt = `You are analyzing ${genreLabel} song lyrics${topic ? ` about "${topic}"` : ''}. Use your full knowledge of this genre's rules to give expert feedback.

You are Soniq's AI Feedback Coach — a world-class music producer, songwriter, and A&R consultant who has worked across every genre. You give honest, specific, actionable feedback. You do not flatter. You identify what is working, what is not, and exactly how to fix it.

GENRE: ${genre || 'unknown'}
TOPIC/CONCEPT: ${topic || 'not specified'}

GENRE RULES FOR ${(genre || '').toUpperCase()}:
DNA: ${genreDNA}
Structure: ${genreStructure}
Key rules:
- ${genreKeys}
${genreVocables}

LYRICS TO ANALYZE:
${lyrics}

YOUR TASK — Analyze these lyrics across 9 dimensions. For each dimension give:
1. A score: ⭐⭐⭐⭐⭐ (5 = exceptional) — be honest, most songs score 2-3 on most dimensions
2. One sentence on what is working
3. One concrete, specific fix if score is under 4 — not vague advice, an actual rewrite suggestion or specific technique

DIMENSIONS TO COVER:
${Object.entries(FEEDBACK_DIMENSIONS).map(([k,v]) => `**${v.label}**: ${v.desc}`).join('\n')}

OVERALL VERDICT:
After the 9 dimensions, give:
- STRONGEST MOMENT: The single best line or section in the song, and why it works
- WEAKEST MOMENT: The single weakest line or section, with a specific rewrite
- ONE PRIORITY FIX: If the writer could only fix one thing before recording this song, what is it?
- GENRE VERDICT: Does this song belong in ${genre || 'its genre'}? What one production note would make it land harder?

FORMAT: Use the exact dimension labels above as headers. Be direct. Be specific. Name the actual lines. A songwriter should be able to act on every note you give.`;

  return { prompt, system };
}

// ── Editor Prompt Builder ─────────────────────────────────────────────────────
// Builds a context-rich edit prompt using GENRE_BIBLE DNA + full song metadata.
// Called by stream.js action='edit' — gives the editor access to the full bible.
function buildEditPrompt(p) {
  const genre  = p.genre  || 'pop';
  const gb     = GENRE_BIBLE[genre] || GENRE_BIBLE.pop || {};
  const mtb    = MUSIC_THEORY_BIBLE || {};

  // Genre-specific scales
  const scales = (mtb.genreScales || {})[genre] || [];

  // Genre-relevant progressions
  const allProgs = mtb.progressions || {};
  const genreProgs = Object.entries(allProgs)
    .filter(([, v]) => (v.genres || []).includes(genre))
    .map(([name, v]) => `${name}: ${v.prog} — ${v.feel}`)
    .join('\n  ');

  // Genre keys / rules
  const genreKeys = (gb.keys || []).map(k => `• ${k}`).join('\n');

  // Outliers — songs that broke the rules in this genre
  const outliers = (gb.outliers || [])
    .map(o => `• ${o.song}: ${o.rule} → ${o.result}`)
    .join('\n');

  // Song context block
  const ctx = [
    p.title          && `Title: "${p.title}"`,
    `Genre: ${genre}`,
    p.topic          && `Topic: ${p.topic}`,
    p.mood           && `Mood: ${p.mood}`,
    p.style          && `Production Style: ${p.style}`,
    p.brief          && `Song Brief: ${p.brief}`,
    p.chords         && `Chord Progression: ${p.chords}`,
    p.theoryAnalysis && `Theory Notes: ${p.theoryAnalysis}`,
    p.verdict        && `Current Quality Assessment: ${p.verdict}`,
  ].filter(Boolean).join('\n');

  const system = `You are SONIQ's master lyric editor — a world-class songwriter, music producer, and A&R consultant.

═══ GENRE DNA: ${genre.toUpperCase()} ═══
${gb.dna || ''}

STRUCTURE GUIDE:
${gb.structure || ''}

GENRE RULES:
${genreKeys}

SCALES FOR THIS GENRE: ${scales.join(', ')}

CHORD PROGRESSIONS THAT WORK:
  ${genreProgs || 'Standard I-IV-V-I'}

NORM-BREAKERS (songs that broke the rules and won):
${outliers || 'None documented'}

YOUR JOB: Apply ONLY the requested edit. Honor the genre DNA above. Preserve the song's voice, theme, and emotional arc. Return ONLY the complete revised lyrics with [Section] tags — no commentary, no explanation.`;

  const prompt = `SONG CONTEXT:
${ctx}

EDIT INSTRUCTION: "${p.instruction}"

CURRENT LYRICS:
${p.lyrics}`;

  return { prompt, system };
}

// ═══════════════════════════════════════════════════════════════════════════
// PROMPT INTELLIGENCE — Analyzes a generated song + score and returns
// specific, actionable suggestions to improve the NEXT generation.
// Baked into the server — returns structured advice the client can display.
// ═══════════════════════════════════════════════════════════════════════════

function buildPromptIntelligence(params) {
  const {
    genre = 'pop',
    topic = '',
    mood = '',
    hookScore = 0,
    scoreBreakdown = {},
    title = '',
    verdict = '',
    structure = 'standard',
    lyrics = '',
  } = params || {};

  const genreLabel = GENRE_LABELS[genre] || genre;
  const gb = GENRE_BIBLE[genre] || GENRE_BIBLE.pop || {};
  const outliers = (gb.outliers || []);

  // Score dimension analysis
  // If no breakdown sent (client sends only hookScore), derive approximate dims
  // so suggestions are calibrated to quality rather than always firing all four.
  const hasDims = scoreBreakdown && (scoreBreakdown.lyricCraft || scoreBreakdown.hookStrength || scoreBreakdown.genreDNA || scoreBreakdown.structure);
  let lyricCraft, structScore, genreDNA, hookStrength;
  if (hasDims) {
    ({ lyricCraft = 0, structure: structScore = 0, genreDNA = 0, hookStrength = 0 } = scoreBreakdown);
  } else {
    // Derive from overall hookScore (0-100 scale) with slight per-dimension jitter
    // so different tip types are suggested on different generations
    const base = Math.max(0, Math.min(100, hookScore));
    const jitter = () => (Math.random() - 0.5) * 20; // ±10 points of noise
    lyricCraft   = Math.round((base + jitter()) * 0.30); // max 30
    structScore  = Math.round((base + jitter()) * 0.25); // max 25
    genreDNA     = Math.round((base + jitter()) * 0.25); // max 25
    hookStrength = Math.round((base + jitter()) * 0.20); // max 20
  }
  const weakest = [
    { dim: 'Lyric Craft', score: lyricCraft, max: 30 },
    { dim: 'Structure', score: structScore, max: 25 },
    { dim: 'Genre DNA', score: genreDNA, max: 25 },
    { dim: 'Hook Strength', score: hookStrength, max: 20 },
  ].sort((a, b) => (a.score / a.max) - (b.score / b.max));

  const suggestions = [];

  // --- LYRIC CRAFT suggestions ---
  if (lyricCraft < 22) {
    const lyricTips = [
      `Make the ${genreLabel} verse more specific — add a proper noun, a street address, a brand name, a clock time. Specificity creates universality.`,
      `Replace the weakest line in the chorus with an extended simile: "as [adjective] as [unexpected noun]" — the more surprising the comparison, the harder it lands.`,
      `Try writing verse 2 from the opposite point of view — the antagonist's perspective reveals what verse 1 couldn't say about the situation.`,
      `Use a callback structure: plant one specific image in verse 1, pay it off in the bridge with the same words but opposite meaning.`,
    ];
    suggestions.push({ type: 'lyric', priority: 1, tip: lyricTips[Math.floor(Math.random() * lyricTips.length)] });
  }

  // --- HOOK STRENGTH suggestions ---
  if (hookStrength < 16) {
    const hookStructKeys = Object.keys(HOOK_STRUCTURE_NOTES).filter(k => k !== 'auto');
    const randomHookStruct = hookStructKeys[Math.floor(Math.random() * hookStructKeys.length)];
    suggestions.push({
      type: 'hook',
      priority: hookStrength < 12 ? 1 : 2,
      tip: `Your hook needs more structural punch. Try the "${randomHookStruct}" approach: ${HOOK_STRUCTURE_NOTES[randomHookStruct]}`,
    });
  }

  // --- STRUCTURE suggestions ---
  if (structScore < 18) {
    const gsd = GENRE_SECTION_DNA[genre] || {};
    const preRef = (gsd.bridge?.preferred_prechorus || [])[0];
    const postRef = (gsd.bridge?.preferred_postchorus || [])[0];
    const structTips = [
      preRef && `Add a [Pre-Chorus] section using the "${preRef}" technique to build maximum tension before the hook drops.`,
      postRef && `Add a [Post-Chorus] "power part" using the "${postRef}" technique — this is where listeners replay the song.`,
      `Try the "${(gsd.bridge?.preferred_bridge || ['Confessional Drop'])[0]}" bridge archetype — it's the most resonant structural choice for ${genreLabel}.`,
      `Your verse 2 should use the "${(gsd.bridge?.preferred_verse2 || ['Deeper Specific'])[0]}" escalation strategy to avoid feeling like a copy of verse 1.`,
    ].filter(Boolean);
    if (structTips.length) suggestions.push({ type: 'structure', priority: structScore < 15 ? 1 : 2, tip: structTips[Math.floor(Math.random() * structTips.length)] });
  }

  // --- GENRE DNA suggestions ---
  if (genreDNA < 18) {
    const genreKeys = gb.keys || [];
    const randomKey = genreKeys[Math.floor(Math.random() * genreKeys.length)];
    const outlierRef = outliers.length ? outliers[Math.floor(Math.random() * outliers.length)] : null;
    const dnaTips = [
      randomKey && `Apply this ${genreLabel} DNA rule: "${randomKey}"`,
      outlierRef && `Study how "${outlierRef.song}" broke the ${genreLabel} rule (${outlierRef.rule}) and got the result: ${outlierRef.result}. Consider a deliberate rule-break in your next version.`,
      `Your production prompt needs stronger ${genreLabel} genre signals. Add the genre-specific instruments, BPM range, and production texture that Suno needs to place this correctly.`,
    ].filter(Boolean);
    if (dnaTips.length) suggestions.push({ type: 'genre', priority: genreDNA < 15 ? 1 : 3, tip: dnaTips[Math.floor(Math.random() * dnaTips.length)] });
  }

  // --- TOPIC/MOOD suggestions based on score level ---
  if (hookScore < 70) {
    const topicSuggestions = [
      topic && `Narrow the topic further. Instead of "${topic}", try the most specific 5-minute moment within that experience — the phone call, the exact thing that was said, the last thing you saw before it changed.`,
      `Add a specific constraint to force creativity: write the song from inside a car, or set it at 3:47am, or limit the chorus to a single repeated metaphor.`,
      mood && `Push the mood to its extremes — if the mood is "${mood}", find the version that tips into its opposite in the bridge. Emotional complexity outperforms single-mood songs.`,
    ].filter(Boolean);
    if (topicSuggestions.length) suggestions.push({ type: 'topic', priority: 3, tip: topicSuggestions[Math.floor(Math.random() * topicSuggestions.length)] });
  }

  // Sort by priority, return top 3
  suggestions.sort((a, b) => a.priority - b.priority);
  const top3 = suggestions.slice(0, 3);

  return {
    score: hookScore,
    weakestDimension: weakest[0]?.dim || null,
    suggestions: top3.map(s => ({ type: s.type, tip: s.tip })),
    genreLabel,
  };
}

function buildProductionData(genre) {
  const fx  = GENRE_FX_PROFILES[genre]  || {};
  const pl  = GENRE_PLUGIN_CHAINS[genre] || {};
  const mst = MASTERING_TARGETS[genre]  || {};
  return {
    fxChain: Object.keys(fx).length ? [
      fx.reverb        ? `REVERB: ${fx.reverb}`             : '',
      fx.delay         ? `DELAY: ${fx.delay}`               : '',
      fx.compression   ? `COMPRESSION: ${fx.compression}`   : '',
      fx.eq            ? `EQ: ${fx.eq}`                     : '',
      fx.sidechain     ? `SIDECHAIN: ${fx.sidechain}`       : '',
      fx.width         ? `SIGNATURE EFFECT: ${fx.width}`    : '',
    ].filter(Boolean).join('\n') : '',
    pluginToolkit: (pl.free || pl.paid) ? [
      pl.free ? `FREE: ${pl.free.join(', ')}` : '',
      pl.paid ? `PAID: ${pl.paid.join(', ')}` : '',
      `DAW TIP: Use the free alternatives first — master your signal chain before adding paid color.`,
    ].filter(Boolean).join('\n') : '',
    mixBlueprint: fx.width ? [
      `STEREO FIELD: ${fx.width}`,
      fx.sidechain ? `LEVEL HIERARCHY: Kick and bass centered and dominant; ${fx.sidechain}` : '',
      `BUS STRUCTURE: Drums bus → Vocal bus → Instrument bus → Master bus with gentle glue compression`,
      `SPECIAL TECHNIQUE: ${fx.compression || 'Standard VCA bus glue at 2-4 dB GR'}`,
    ].filter(Boolean).join('\n') : '',
    masteringTarget: mst.lufs ? [
      `LUFS: ${mst.lufs}`,
      `DYNAMIC RANGE: ${mst.dynamicRange || 'DR 8-10'}`,
      `BRIGHTNESS: ${mst.brightness || 'Natural'}`,
      `STEREO WIDTH: ${mst.stereoWidth || 'Moderate'}`,
      `NOTES: ${mst.notes || ''}`,
    ].filter(Boolean).join('\n') : '',
  };
}

const BREATH_TECHNIQUES_10 = [
  {id:'diaphragmatic',name:'Diaphragmatic Breath',cue:'Belly rises on inhale, chest stays still',when:'Before any phrase'},
  {id:'support',name:'Breath Support',cue:'Engage belly outward as you sing or rap',when:'Long notes, power phrases, big chorus lines'},
  {id:'quick_inhale',name:'Quick Catch Breath',cue:'Silent fast inhale through open throat',when:'Short gaps between lyric lines'},
  {id:'phrase_plan',name:'Phrase Planning',cue:'Mark breath spots before recording, never inhale mid-word',when:'Before every take'},
  {id:'release',name:'Controlled Release',cue:'Exhale slow and steady, do not dump air on first word',when:'Opening lines of every verse'},
  {id:'vowel_open',name:'Open Vowel Shaping',cue:'Drop jaw on A E O I U, let the vowel carry the note',when:'Hook phrases, long held notes'},
  {id:'rap_pocket',name:'Rap Pocket Breath',cue:'Inhale every 4th bar end, silent through open mouth',when:'Bars 4 8 12 are your windows in a 16-bar verse'},
  {id:'compression',name:'Compression Technique',cue:'Squeeze core gently during delivery',when:'Gospel shout, metal scream, belted chorus'},
  {id:'recovery',name:'Recovery Breath',cue:'Full slow inhale 4 counts after long or intense phrase',when:'Between takes and between intense sections'},
  {id:'resonance',name:'Resonance Placement',cue:'Feel vibration in chest or face, not your throat',when:'Every phrase, throat vibration means tension'},
];
const BREATH_PROFILES = {
  pop:       {priority:['phrase_plan','support','vowel_open','quick_inhale'],note:'Pop hooks demand breath efficiency. Mark inhales before every chorus line. Open vowels make hooks soar.'},
  hiphop:    {priority:['rap_pocket','quick_inhale','support','recovery'],note:'Rap pocket breathing: inhale every 4 bars. Bars 4, 8, 12, 16 are your windows. Missed breath = rushed delivery.'},
  rnb:       {priority:['support','vowel_open','diaphragmatic','resonance'],note:"R&B runs require full breath support. Never start a melisma on a half-breath, it will crack."},
  neosoul:   {priority:['diaphragmatic','support','recovery','resonance'],note:'Neo-soul breathes with the groove. Inhale off the beat, never on it.'},
  gospel:    {priority:['compression','support','quick_inhale','recovery'],note:'Gospel shouting demands core compression. Recovery breath after every bridge vamp, 4 counts in 4 out.'},
  rock:      {priority:['support','compression','quick_inhale','diaphragmatic'],note:'Rock delivery is physically demanding. Belly support prevents vocal strain.'},
  country:   {priority:['phrase_plan','support','vowel_open','diaphragmatic'],note:'Country storytelling lives in the long vowels. Open vowels, steady support.'},
  metal:     {priority:['compression','support','recovery','diaphragmatic'],note:'Metal screaming without core compression causes vocal damage. Recovery breath is mandatory.'},
  jazz:      {priority:['phrase_plan','diaphragmatic','resonance','release'],note:'Jazz phrasing breathes like conversation. Breath marks are as musical as the notes.'},
  blues:     {priority:['diaphragmatic','support','phrase_plan','resonance'],note:'Blues leaves space. The space after a phrase is a breath invitation, do not rush.'},
  folk:      {priority:['diaphragmatic','phrase_plan','release','resonance'],note:'Folk intimacy requires a relaxed open throat. Breathe from the belly and let go.'},
  ss:        {priority:['diaphragmatic','phrase_plan','resonance','release'],note:'Singer-songwriter delivery lives in the breath. Make it intentional, not desperate.'},
  reggae:    {priority:['diaphragmatic','support','quick_inhale','recovery'],note:'Reggae phrasing is laid-back, breath follows the one-drop, never fights it.'},
  afrobeats: {priority:['quick_inhale','rap_pocket','support','diaphragmatic'],note:'Call-and-response requires quick catch breaths in the response gaps.'},
  reggaeton: {priority:['rap_pocket','quick_inhale','support','release'],note:'Dembow flow requires rapid catch breaths. Breathe in the syncopated gaps.'},
  edm:       {priority:['phrase_plan','quick_inhale','support','release'],note:'EDM hooks are short and punchy. Full support on every drop line.'},
  latin:     {priority:['diaphragmatic','vowel_open','support','quick_inhale'],note:'Latin open vowels demand jaw freedom. Drop the jaw on every A and O.'},
  altrock:   {priority:['support','compression','quick_inhale','recovery'],note:'Alt-rock quiet-loud dynamic means breath must shift with the energy.'},
  punk:      {priority:['compression','support','quick_inhale','recovery'],note:'Punk is fast and aggressive. Core compression protects the voice.'},
  kpop:      {priority:['phrase_plan','support','vowel_open','recovery'],note:'K-pop precision requires pre-planned breath marks for every choreography line.'},
  parody:    {priority:['phrase_plan','support','quick_inhale','release'],note:'Comedy delivery needs steady breath. Breathe before the punchline, not during.'},
  comedy:    {priority:['phrase_plan','support','quick_inhale','release'],note:'Comic timing is breath timing. The pause before the punchline is a breath mark.'},
  children:  {priority:['diaphragmatic','vowel_open','support','release'],note:"Children's singing feels effortless when you breathe from the belly."},
  tvmusical: {priority:['support','compression','vowel_open','phrase_plan'],note:'Theatrical delivery demands full breath support. Mark breaths like an actor marks pauses.'},
};
function buildSingerNotesInstruction(genre, isRap) {
  const profile = BREATH_PROFILES[genre] || BREATH_PROFILES.pop;
  const gl = GENRE_LABELS[genre] || genre || 'this genre';
  const tt = BREATH_TECHNIQUES_10.filter(t => profile.priority.includes(t.id)).slice(0, 4);
  const lines = tt.map(t => '  * ' + t.name + ': ' + t.cue + ' -- ' + t.when).join('\\n');
  const r5 = isRap
    ? 'Rap rule: bars 4, 8, 12, 16 are your breath windows -- use all of them'
    : 'Studio rule: full belly breath before every new take -- reset the instrument';
  return "\\n\\nSINGER'S NOTES -- Breathwork for " + gl + ":\\n" +
    profile.note + "\\n\\nTOP TECHNIQUES FOR THIS SONG:\\n" + lines +
    "\\n\\nQUICK RULES:\\n" +
    "1. Never inhale mid-word -- always at phrase boundaries\\n" +
    "2. Mark breath spots before recording (breath) in the margins\\n" +
    "3. Recovery breath after any long or intense section: 4 counts in, 4 counts out\\n" +
    "4. Throat tension = wrong placement, redirect to chest or head resonance\\n" +
    "5. " + r5;
}


module.exports = { buildSongPrompt, buildLuckyPrompt, buildRapLabPrompt, buildEditPrompt, buildPromptIntelligence, GENRE_LABELS, GENRE_BIBLE, MUSIC_THEORY_BIBLE, SYNC_BIBLE, VARIANT_PROMPTS, buildVariantPrompt, FEEDBACK_DIMENSIONS, buildFeedbackPrompt, RHYME_SCHEMES, GENRE_RHYME_PREF, ERA_VOCABULARY, EMOTIONAL_ARCS, GENRE_SYLLABLE_BUDGETS, GENRE_FX_PROFILES, GENRE_PLUGIN_CHAINS, MASTERING_TARGETS, PRODUCTION_ARCHETYPES, buildProductionData, GENRE_HIT_REFERENCES, buildTopTierNote, ADLIB_BIBLE, VOCAL_STACK_PROFILES, buildAdlibNote, buildVocalStackNote , BREATH_TECHNIQUES_10, BREATH_PROFILES, buildSingerNotesInstruction };



