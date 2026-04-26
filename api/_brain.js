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
  'Country Parody': 'Country Parody DNA: Rewrite in authentic country voice with absurd or mundane subject (riding a Roomba, losing at Monopoly, inventing a seventh sense). Steel guitar, shuffle rhythm, full country commitment. Lyric flags as parody but music never does. Suno style: "country parody, pedal steel, shuffle rhythm, committed country instrumentation, 110 BPM, earnest delivery, mundane absurd topic".',
  'Rock Parody':    'Rock Parody DNA: Power chords, anthemic rock chorus, absurd or trivial lyrical content. Arena-rock belted vocal about something ridiculous — the commitment of the rock performance amplifies the absurdity. Suno style: "rock parody, distorted power chords, anthemic chorus, belted vocal, 130 BPM, earnest arena rock production, absurd lyrics".',
  'EDM Parody':     'EDM Parody DNA: Full EDM drop production (sidechained bass, build-up riser, snare roll) applied to deflating lyrics. The bigger the drop, the more trivial the topic IS the joke. 128 BPM. Suno style: "EDM parody, massive drop, sidechained bass, build-up riser, 128 BPM, full EDM production, committed, trivial absurd subject".',
  'Folk Parody':    'Folk Parody DNA: Fingerpicked acoustic guitar, warm harmony, conversational melody — applied to ridiculous subject matter. The sincerity of the folk delivery contrasts with the absurdity. Suno style: "folk parody, fingerpicked acoustic guitar, warm two-part harmony, conversational melody, 90 BPM, sincere delivery, absurd topic".',
  // Comedy substyles
  'Absurdist':      'Absurdist Comedy DNA: Internal dream-logic. The premise is established early and followed to its extreme conclusion without apology. The world of the song has rules, and those rules are insane. Suno style: match the emotional sincerity of the genre — the music never acknowledges the absurdity.',
  'Dark Comedy':    'Dark Comedy DNA: Finding humor in genuinely dark or uncomfortable situations. The delivery is always casual and upbeat — the contrast between tone and content IS the comedy. Tim Minchin territory. Suno style: "upbeat, cheerful, major key" applied to dark subject matter for maximum tonal contrast.',
  'Satirical':      'Satirical Comedy DNA: Exaggerated social/political commentary through music. The target (institution, behavior, attitude) must be crystal clear. Satire punches at power, not down. Uses genre conventions of the target demographic to increase impact. Suno style: mirror the genre of the demographic being satirized.',
  'Observational':  'Observational Comedy DNA: The universal shared experience of mundane modern life — the frustration of tech support, the anxiety of small talk, the tragedy of dying phone batteries. Relatable specificity is everything. Suno style: "singer-songwriter, acoustic, intimate, conversational" — feels like a friend venting.',
  'Musical Roast':  'Musical Roast DNA: A song specifically aimed at a target (person, brand, idea) written to roast them. Format: verse 1 establishes the target\'s positive self-image, verse 2 demolishes it, bridge is the killing blow, chorus is the repeated accusation. Never cruel — always funny.',
  'Nerd Comedy':    'Nerd Comedy DNA: Comedy about tech, gaming, science, internet culture — insider references that reward the in-the-know listener. 100-130 BPM. Tone is earnestly enthusiastic about the niche. Jonathan Coulton / MC Frontalot / Tom Lehrer tradition. Suno style: "nerd comedy, upbeat melodic, 115 BPM, clever wordplay, earnest enthusiasm, insider references, Jonathan Coulton style".',
  'Romantic Comedy':'Romantic Comedy DNA: Love songs where the humor comes from awkward specificity — dating app fails, text-read-receipt anxiety, meet-cute misunderstandings. The feelings are genuine; the situations are absurd. 95-115 BPM, singer-songwriter tone. Suno style: "romantic comedy song, acoustic singer-songwriter, warm melodic, 105 BPM, awkward specificity, earnest feelings comedic situations".',
  'Storytelling Comedy':'Storytelling Comedy DNA: A full narrative with escalating absurdity — something happened, then this happened, then THIS happened. Verses stack the premise, final verse or bridge detonates it. Flight of the Conchords / Bo Burnham narrative-track tradition. 100-130 BPM. Suno style: "storytelling comedy, narrative verses escalating, 115 BPM, acoustic or band, Flight of the Conchords style, detonating bridge".',
  // TV/Musical substyles
  'TV Theme':       'TV Theme DNA: 30-90 seconds to establish the show\'s entire world — genre, tone, era, class level, emotional register. The hook IS the show title or a defining phrase. Suno style: "catchy TV theme, [show genre tone], memorable, [era]". The audience knows what they\'re watching within 5 seconds.',
  'Broadway / Show Tune': 'Broadway DNA: Character sings what cannot be said in dialogue — the emotional eruption. Clear dramatic objective ("I want" / "I need" / "I feel"). Musical theater diction: precise consonants, open vowels, projected. Suno style: "Broadway musical, show tune, theatrical, orchestral pit band, belting vocals".',
  'Disney-Style':   'Disney DNA: The "I want" song. Character expresses their deepest wish in verse, the world responds in chorus. Magical orchestration. Pure emotional sincerity — no irony. Suno style: "Disney animated film song, orchestral, magical, warm, major key, soaring melody, 120 BPM".',
  'Jingle / Ad':    'Jingle DNA: Product name minimum 3× in 30-60 seconds. Problem in verse (pain point), product = solution in chorus. Benefit not feature. Melody sticky enough to remember after one listen. Suno style: "upbeat commercial jingle, major key, catchy, corporate, polished, radio-ready".',
  'Sitcom Theme':   'Sitcom Theme DNA: 30-60 seconds. Warm, inviting, tells you this is a safe fun place. Often summarizes the show\'s premise. Major key, upbeat tempo, memorable chorus. Era-appropriate production. Suno style: "sitcom theme, warm, upbeat, [era: 90s/2000s/modern], feel-good, catchy melody".',
  'Prestige Drama Theme': 'Prestige Drama Theme DNA: Atmospheric, sparse, foreboding or melancholic. Establishes stakes and tone. Minor key or modal. Often instrumental or near-instrumental. Suno style: "prestige TV theme, cinematic, atmospheric, [mood: dark/cold/intense], strings, piano, sparse, HBO-style".',
  'Film Score Ballad':    'Film Score Ballad DNA: Cinematic orchestral ballad designed to underscore a specific emotional moment — loss, revelation, triumph. Piano-led verse building to full orchestra on chorus. Often diegetic in concept (character sings this moment). 60-80 BPM. Suno style: "film score ballad, orchestral, piano verse, strings swell, full orchestra chorus, 72 BPM, cinematic emotional climax, Hans Zimmer style vocal feature".',
  'Video Game OST':       'Video Game OST DNA: Looping-friendly structures (8-bar or 16-bar loops that sit under gameplay indefinitely). Memorable melodic motif that becomes the game\'s sonic identity. Genre varies by setting (orchestral for fantasy, synthwave for cyberpunk, chiptune for retro). Dynamic layering — verses add/remove instruments to match gameplay intensity. Suno style: "video game soundtrack, looping-friendly, memorable melodic motif, dynamic layering, orchestral or synthwave or chiptune by setting, cinematic".',
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
  // Singer-Songwriter substyles
  'Confessional / Diary': 'Confessional/Diary SS DNA: First-person, present-tense honesty. Specific details from the speaker\'s actual life — house numbers, dog names, dates, the smell of a specific room. Vulnerability without performance. No metaphor unless it earns its place. Whispered or barely-projected vocals; the listener leans in. The "I" is unguarded. 60-85 BPM. Suno style: "fingerpicked acoustic guitar, intimate close-mic vocal, room reverb, brushed snare maximum, no drums preferred, 75 BPM, confessional, vulnerable". Artists: Phoebe Bridgers, Elliott Smith, Adrianne Lenker (Big Thief solo), Sufjan Stevens (Carrie & Lowell), Lucy Dacus, Julien Baker.',
  'Storyteller / Narrative': 'Storyteller SS DNA: Character-driven. Third-person or first-person-as-narrator (not necessarily the writer\'s own life). Specific protagonist — name, age, place, era. Story has setup → conflict → turn within the song length. The song is a 3-minute short film. Detail-rich, image-driven, emotional payoff in final verse or bridge. 70-100 BPM. Suno style: "acoustic guitar, fiddle, brushed drums, warm room mic, 90 BPM, storyteller, narrative, country-folk crossover, Tracy Chapman feel". Artists: Tracy Chapman, John Prine, Jason Isbell, Kacey Musgraves (storytelling cuts), Brandi Carlile, Lori McKenna, Kris Kristofferson.',
  'Folk-leaning':         'Folk-leaning SS DNA: Image-stacking lyrics, allusive, occasionally free-verse cadence (lines don\'t have to rhyme cleanly). Open guitar tunings (DADGAD, drop-D, double drop-D) — the tuning is character. Modal harmony (Dorian, Mixolydian — not just major/minor). Imagery from nature, geography, history, mythology. Fingerpicking or strummed-with-air-between-strums. 65-95 BPM. Suno style: "open-tuned acoustic guitar, fingerpicking, modal harmony, light percussion or no drums, warm reverb, 80 BPM, folk-leaning, Joni Mitchell feel, image-stacked". Artists: Joni Mitchell (Hejira-era), Bob Dylan (Blonde on Blonde, Blood on the Tracks), Sufjan Stevens (Illinois, Seven Swans), Joanna Newsom, Iron & Wine, Nick Drake.',
  'Indie-leaning':        'Indie-leaning SS DNA: Cracked falsetto or breathy chest voice. Production is binary: bedroom-intimate (cassette warmth, room sounds, single mic) OR expansive ("Hejira"-wide, layered atmosphere). Cryptic lyrics that reward attention but don\'t demand decoding. Often non-traditional structure — no chorus, or chorus is a single repeated word/phrase. 70-110 BPM. Suno style: "lo-fi indie folk OR expansive indie folk, falsetto vocal, layered ambient texture or stripped bedroom production, 85 BPM, Bon Iver feel". Artists: Bon Iver, Big Thief, Phoebe Bridgers, boygenius, Florist, Adrianne Lenker, Wilco (Yankee Hotel Foxtrot).',
  'Country-leaning':      'Country-leaning SS DNA: Pedal steel, fiddle, acoustic guitar, mandolin. Twang or warmth in vocals. Storytelling tradition. Verses build slowly with detail; chorus delivers a singable refrain. Themes: heartbreak, family, geography (named towns/highways/rivers), faith, working-class life. 70-100 BPM. Suno style: "pedal steel, fiddle, acoustic guitar, brushed drums, warm room mic, 90 BPM, country singer-songwriter, twang or warmth, Brandi Carlile feel". Artists: Brandi Carlile, Tyler Childers, Lori McKenna, Kacey Musgraves, Jason Isbell, Sturgill Simpson, Patty Griffin.',
  'Piano-based':          'Piano-based SS DNA: Piano IS the instrument — other instruments are added on top, never replacing it. Vocal melody often follows or contrasts a piano counter-line. Dynamics tied directly to keyboard dynamics — soft passages whispered, loud passages belted, sometimes within the same phrase. Rich harmonic palette (jazz-tinged voicings welcomed). 60-95 BPM. Suno style: "solo piano lead, intimate close-mic vocal, dynamic range preserved, light strings or no other instruments, 78 BPM, piano singer-songwriter, Tori Amos feel". Artists: Tori Amos, Regina Spektor, Fiona Apple, Adele (album cuts), Ben Folds, Sara Bareilles, Norah Jones.',
  'Anti-folk / Lo-fi':    'Anti-folk/Lo-fi SS DNA: Deliberately rough recording — off-key moments left in, room noise audible, conversational delivery, irreverent or absurd lyrics. Anti-craft AS craft. Cassette-tape warmth, single-mic mono recording, acoustic guitar with audible buzz. The "mistakes" are the point. 75-110 BPM. Suno style: "lo-fi acoustic guitar, single-mic recording, cassette tape warmth, conversational vocal, room noise audible, 95 BPM, anti-folk, Daniel Johnston feel". Artists: Daniel Johnston, Kimya Dawson, Jeffrey Lewis, Adam Green, Moldy Peaches, Diane Cluck, early Beck (One Foot in the Grave).',
  'Through-composed':     'Through-composed SS DNA: No traditional chorus repeat. The song journeys forward — sections never return verbatim. Long-form (5-10 minute songs are common). Lyrics evolve: an image planted in V1 returns transformed in V4 or V5. Demands listener attention; no easy entry point but enormous reward for the patient listener. 60-90 BPM, often with shifting tempo. Suno style: "through-composed, evolving sections, no chorus repeat, dynamic range, acoustic and orchestral instrumentation, 75 BPM, art-folk, Joanna Newsom feel". Artists: Joanna Newsom, Sufjan Stevens (album cuts), Joni Mitchell (Hejira), Brandi Carlile (The Joke and bigger forms), Nick Cave (longer ballads), Aimee Mann.',
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
  'Classic Honky-Tonk': 'classic honky-tonk, pedal steel guitar, fiddle, shuffle beat, 105 BPM, heartbreak, bar-room country, 1950s traditional vocal',
  'Country Gospel':     'country gospel, acoustic guitar, pedal steel, warm vocal harmony, 85 BPM, hymn, faith, southern testimony',
  'Country Rap':        'country rap, 808 bass, banjo, trap hi-hats, country twang, genre fusion, 120 BPM, storytelling, authentic, country trap',
  'Country Blues':      'country blues, heavy blues guitar, raw tube amp, southern soul, powerful melismatic vocals, live band, 85 BPM, emotional country-soul, guitar bends',
  // Neo-Soul
  'Classic Neo-Soul':   'neo-soul, Rhodes electric piano, live drums with swing, upright bass, warm vinyl warmth, head-nod groove, 90 BPM',
  'Hip-Hop Neo-Soul':   'neo-soul, off-beat hip-hop drums, soul vocals, vinyl warmth, 85 BPM, behind-the-beat pocket',
  'Neo-Soul Ballad':    'neo-soul ballad, piano, intimate close-mic vocal, vulnerable, warm, 70 BPM',
  'Afro-Soul':          'afro-soul, talking drum, Rhodes, warm, 95 BPM, Lagos spiritual, Afrobeats groove underneath neo-soul',
  'Jazz-Soul':          'jazz-soul, jazz harmony, upright bass, Rhodes electric piano, live drums, horn section, 95 BPM, modern live-jazz-band soul, improv solos',
  'Lo-Fi Soul':         'lo-fi soul, vinyl crackle, dusty drums, muffled warmth, 80 BPM, bedroom production, introspective chopped soul',
  'Psychedelic Soul':   'psychedelic soul, funky bass, cosmic reverb, layered textures, 95 BPM, late-60s psychedelic funk, soulful multi-tracked vocal',
  'Gospel Soul':        'gospel soul, Hammond B3, mass choir, testimonial, call and response, 85 BPM, neo-soul-meets-gospel, choir-swell arc',
  'Traditional Gospel': 'traditional gospel, Hammond B3 organ, mass choir, hand claps, call and response, powerful soul',
  'Contemporary Gospel':'contemporary gospel, celebratory hip-hop gospel production, 808 bass, mass choir, modern-full-production celebration',
  'Worship / CCM':      'worship music, piano, electric guitar, congregational singalong, soaring emotional, 75 BPM',
  'Southern Gospel':    'southern gospel, acoustic quartet harmonies, banjo or acoustic guitar, country-gospel, 95 BPM, warm testimony',
  'Gospel Hip-Hop':     'gospel hip-hop, trap beat, 808 bass, conscious faith lyrics, 130 BPM, street-testimony rap, gospel-content trap production',
  'Gospel Ballad':      'gospel ballad, piano, intimate testimony vocal, choir swells on final chorus, 65 BPM, gospel ballad vocalist, emotional climax arc',
  'Praise & Worship':   'praise and worship, congregational, extended vamp, declaration lyrics, 80 BPM, modern praise music, builds from intimate to full-band shout',
  'Mass Choir':         'mass choir gospel, 40+ voices SATB stacked, Hammond B3, lead vocalist call response, 95 BPM, traditional mass-choir celebration, SATB stacked arrangement',
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
  'Chicago Blues':      'chicago blues, electric slide guitar, blues harp, shuffle beat, 100 BPM, 1950s electrified Mississippi blues, urban shuffle',
  'Delta Blues':        'delta blues, acoustic slide guitar, open tuning, foot stomp, single vocal, 85 BPM, haunted, raw',
  'Texas Blues':        'texas blues, fiery lead guitar, extended solo, swing feel, 115 BPM, hot tube amp, Gulf-coast shuffle',
  'Jump Blues':         'jump blues, boogie piano, horn section, shuffle swing, 160 BPM, 1940s proto-R&B, uptempo party blues',
  'Soul Blues':         'soul blues, Hammond organ, horn stabs, full rhythm section, melismatic vocal, 90 BPM, 60s-70s gospel-trained blues vocal',
  // Reggae
  'Roots Reggae':       'roots reggae, one-drop drums, offbeat skank guitar, heavy bass, Hammond bubble, 78 BPM, Rastafarian, spiritual',
  'Dancehall':          'dancehall, digital riddim, syncopated kick, toasting vocal, 100 BPM, patois, Kingston, party',
  'Ska':                'ska, offbeat upstroke guitar, walking bass, brass section, 160 BPM, Jamaica 60s, danceable',
  'Rocksteady':         'rocksteady, electric bass forward, Hammond organ, two-part harmony, 90 BPM, romantic, 1967 Jamaica',
  'Dub':                'dub reggae, spring reverb, tape echo, foregrounded bass and drums, ghostly vocals, 75 BPM, Jamaican studio-as-instrument, 70s dub engineering',
  'Lovers Rock':        'lovers rock, reggae groove, silky female vocal, soul production, close harmony, 75 BPM, romantic, UK reggae',
  // K-Pop
  'Girl Group':         'k-pop girl group, polished production, explosive chorus, rap break, vocal bridge, 120 BPM, choreography-ready',
  'Boy Group':          'k-pop boy group, rap verses, vocal line harmonies, hard-hitting production, 125 BPM, concept-driven, dance break',
  'K-Pop Ballad':       'k-pop ballad, piano, sweeping strings, emotional vocal, key change, 72 BPM, Korean ballad, power-vocal showcase',
  'Dance Pop':          'k-pop dance pop, EDM production, drop-style chorus, sidechain pump, 128 BPM, crystal clear, club-ready',
  'Dark Concept':       'k-pop dark concept, minor key, orchestral and industrial elements, aggressive vocals, 120 BPM, gothic, dystopian',
  'Bubblegum':          'k-pop bubblegum, bright saturated synths, chant-along hook, high vocal layering, 125 BPM, cute, candy-colored',
  'Hip-Hop K-Pop':      'korean hip-hop, boom bap or trap production, rap verses, English-Korean code switching, 110 BPM, underground Seoul',
  'R&B K-Pop':          'korean r&b, trap-soul production, smooth groove, intimate vocal, 85 BPM, modern Korean R&B, late-night aesthetic',
  // Latin
  'Salsa':              'salsa, clave rhythm, piano montuno, timbales congas bongos, horn section, 180 BPM, sonero coro, Nuyorican',
  'Bachata':            'bachata, requinto lead guitar, güira, bongos, 130 BPM, Dominican, romantic amargue, modern bachata vocal',
  'Cumbia':             'cumbia, accordion lead, gaita flute, vallenato caja drum, syncopated 4/4, 100 BPM, Colombian, danceable',
  'Bossa Nova':         'bossa nova, nylon guitar bossa pattern, cool jazz harmony, whispered Portuguese vocal, 95 BPM, Brazilian, understated',
  'Latin Pop':          'latin pop, polished mainstream production, Latin percussion, Spanish vocal, 115 BPM, crossover mainstream Latin, radio-ready',
  'Latin Jazz':         'latin jazz, Afro-Cuban rhythms, jazz harmony, piano, horn section, full percussion, 160 BPM, mambo cha-cha',
  'Mariachi':           'mariachi, violins trumpets, vihuela, guitarrón, acoustic guitar, 110 BPM, ranchera bolero, Mexican',
  // Reggaeton
  'Perreo Clásico':     'perreo clasico, dembow riddim, 93 BPM, Puerto Rico 2000s, synth stabs, perreo dance floor, early-2000s reggaeton',
  'Trap Latino':        'trap latino, trap 808s, dembow hybrid, auto-tune, triplet hi-hats, 95 BPM, dark minor pads, modern urbano-trap',
  'Reggaeton Romántico':'reggaeton romantico, softer dembow, melodic sung hook, acoustic guitar layer, 95 BPM, romantic, softer-crossover reggaeton',
  'Urbano Latino':      'urbano latino, modern polished production, dembow meets pop and afrobeats, bilingual, 98 BPM, modern crossover urbano',
  'Dembow Puro':        'dembow dominicano, faster harder dembow, 120 BPM, raw digital production, rapid fire Spanish, Dominican dembow pioneer aesthetic',
  'Reggaeton Pop':      'reggaeton pop, softened dembow, sung pop hook, polished, 98 BPM, Spotify-optimized crossover, radio ready',
  // Children
  'Singalong / Playful':    'children singalong, ukulele, clapping, bright, joyful, 110 BPM, playful, motion cues',
  'Educational':            'educational children song, acoustic guitar, glockenspiel, clear vocals, 105 BPM, friendly, warm',
  'Lullaby / Bedtime':      'lullaby, soft acoustic guitar, gentle, 60 BPM, warm soothing, hushed vocals, night, stars',
  'Adventure Story':        'children adventure song, cinematic, orchestral children music, 110 BPM, warm, imaginative, journey',
  'Silly / Nonsense':       'silly children song, bouncy, 115 BPM, playful, bright, ukulele, absurd fun',
  'Nature & Animals':       'children nature song, bright ukulele, onomatopoeia sounds, 115 BPM, animal noises, warm acoustic',
  'Friendship & Kindness':  'children kindness song, warm acoustic guitar, gentle singable chorus, 105 BPM, social emotional',
  'Holiday / Seasonal':     'children holiday song, seasonal imagery, sleigh bells, 110 BPM, warm festive, family-friendly',
  // Parody
  'Genre Parody':       'genre parody, mirror original genre exactly, sincere production, committed performance, comedy in lyrics only',
  'Pop Parody':         'upbeat pop parody, polished major key production, 120 BPM, committed pop delivery, absurd mundane topic',
  'Rap Parody':         'rap parody, rap flow 16-bar verse, boom bap or trap production, deflating topic, earnest flow',
  'Ballad Parody':      'ballad parody, epic power ballad, piano, strings, dramatic, stadium, 75 BPM, trivial subject maximum emotion',
  'Country Parody':     'country parody, pedal steel, shuffle rhythm, earnest country instrumentation, 110 BPM, mundane absurd topic',
  'Rock Parody':        'rock parody, distorted power chords, anthemic chorus, belted vocal, 130 BPM, earnest arena rock, absurd lyrics',
  'EDM Parody':         'edm parody, massive drop, sidechained bass, 128 BPM, full edm production, committed, trivial absurd subject',
  'Folk Parody':        'folk parody, fingerpicked acoustic guitar, warm harmony, 90 BPM, sincere delivery, absurd topic',
  // Comedy
  'Absurdist':          'absurdist comedy, match genre sincerity, never acknowledge absurdity, committed performance',
  'Dark Comedy':        'dark comedy, upbeat cheerful major key, 120 BPM, applied to dark subject, tonal contrast',
  'Satirical':          'satirical comedy, mirror demographic genre, exaggerated commentary, punch at power',
  'Observational':      'observational comedy, singer-songwriter, acoustic intimate, conversational, 100 BPM, relatable specificity',
  'Nerd Comedy':        'nerd comedy, upbeat melodic, 115 BPM, clever wordplay, Jonathan Coulton style, insider references',
  'Romantic Comedy':    'romantic comedy song, acoustic singer-songwriter, warm melodic, 105 BPM, awkward specificity, earnest',
  'Storytelling Comedy':'storytelling comedy, narrative verses escalating, 115 BPM, Flight of the Conchords style, detonating bridge',
  'Musical Roast':      'musical roast, upbeat, target-focused, 110 BPM, verse 1 praise verse 2 demolish, bridge killing blow',
  // TV / Musical
  'TV Theme':              'tv theme, catchy memorable, era-appropriate production, 30-90 seconds, defining hook, genre-matches show',
  'Broadway / Show Tune':  'broadway show tune, orchestral pit band, belted theatrical vocals, 110 BPM, dramatic, I want song',
  'Film Score Ballad':     'film score ballad, orchestral, piano verse, strings swell, full orchestra chorus, 72 BPM, cinematic emotional climax',
  'Disney-Style':          'disney animated film song, orchestral, magical, warm, major key, soaring melody, 120 BPM, I want song',
  'Jingle / Ad':           'upbeat commercial jingle, major key, catchy, corporate polished, radio-ready, product name repeated',
  'Video Game OST':        'video game soundtrack, looping-friendly, memorable motif, dynamic layering, orchestral or synthwave, cinematic',
  'Sitcom Theme':          'sitcom theme, warm upbeat, era-appropriate, feel-good, catchy memorable, 30-60 seconds',
  'Prestige Drama Theme':  'prestige tv theme, cinematic, atmospheric, minor key, strings, piano sparse, premium-drama aesthetic',
  // ─── Rap Lab — unique production fingerprint per style (keyed by RAP_STYLES label) ───
  // All entries are artist-name-free for Suno compliance. Descriptive era /
  // region / production language only — the LLM gets artist context via
  // style.agent text (system prompt), which never leaks to the SONG PROMPT.
  // Established era
  'Lyrical/Conscious':     'lyrical conscious rap, jazz sample loops, live-band boom bap drums, warm vinyl texture, 88 BPM, conscious rap tradition, dense pocket mix, literary bars',
  'Old School':            'old school hip-hop, 808 drum machine, record scratches, funk breakbeat, 102 BPM, 1985-era boom bap roots, golden-age block-party aesthetic',
  'UK Drill':              'UK drill, sliding 808 basslines, snappy off-beat snares, dark piano chords, 140 BPM, London drill flow, Tottenham/Peckham vocabulary, menacing minor key',
  'Afro-Rap':              'afro rap, amapiano log drum bass, talking drum percussion, Afrobeats groove, 105 BPM, modern West African hip-hop crossover, pidgin/Yoruba inflected',
  'Latin Rap':             'latin rap, dembow trap hybrid, Spanish flow, salsa horn stabs, 95 BPM, modern barrio-trap, reggaeton drums under 808 bass',
  'Hyphy Rap':             'hyphy rap, scraper bass, hella energy Bay Area, hi-hat rolls, 108 BPM, Oakland hyphy-movement slang, crowd-chant ad-libs, breathless delivery',
  'Phonk':                 'phonk rap, Memphis tape hiss, cowbell kick, distorted 808, slowed pitch-shifted sample, 75 BPM, drift-video atmosphere, dark cinematic menace',
  'Anthem Rap':            'anthem rap, thundering kicks, orchestral string swells, stadium choir on hook, 92 BPM, walk-out energy, championship-moment vocal, cinematic minor key',
  'Hustle / Grind':        'hustle grind rap, soulful sample loop, crispy snares, moody piano, 87 BPM, come-up storytelling texture, late-night mixtape feel',
  // Forward-looking
  'Post-Algorithm':        'post-algorithm rap, glitched stereo field, unpredictable beat drops, AI-processed vocal chops, 130 BPM, anti-formula production, fragmented drum programming',
  'Neo-Phonetic':          'neo-phonetic rap, vocals as percussion, syllable-chopped hi-hats, phonetic hooks, 145 BPM, post-mumble rap, texture over semantic meaning',
  'Climate Rap':           'climate rap, apocalyptic synth pads, field recording ambience, analog strings, 82 BPM, eco-conscious minor key, doomy future-tense atmosphere',
  'AI-Native':             'AI-native rap, synthetic drum machine grid, autotune melody woven with rapped bars, machine-precision hi-hats, 128 BPM, cyborg aesthetic, post-human production',
  'Mosaic Flow':           'mosaic flow rap, beat switches every 8 bars, eclectic sample chops, genre-shifting production, 110 BPM, eclectic post-genre hip-hop, unpredictable structure',
  // Revisionist
  'Golden Era 2.0':        'golden era 2.0 rap, modern mix over 90s boom bap DNA, crispy vinyl sample chops, tight pocket drums, 93 BPM, modern-mixed east-coast revival, dusty warm pocket',
  'Analog Melodic':        'analog melodic rap, warm tape-saturated drums, Rhodes piano bed, 90 BPM, melodic auto-tuned flow over analog warmth, lo-fi pocket',
  'Conscious Trap':        'conscious trap, 808 bass under philosophical bars, live jazz horn accents, dark minor-key piano, 86 BPM, thoughtful literary trap, systemic-critique lyric register',
  'Afro-Boom Bap':         'afro boom bap, West African percussion layered over boom bap drums, chopped soul sample, upright bass, 91 BPM, modern UK/African conscious hip-hop, African tonal melody',
  'Jazz Rap Revival':      'jazz rap revival, live jazz band, upright bass walks, muted trumpet, brushed snare, 96 BPM, modern live-instrumentation hip-hop, 90s jazz-rap reimagined',
};

// ─────────────────────────────────────────────────────────────────────────────
// RAP_STYLE_ADLIBS — authentic regional/era vernacular ad-libs per Rap Lab style.
// Keyed by style.label (matches RAP_STYLES[].label). Used by buildRapLabPrompt
// AND by the Lucky feature on the frontend (mirrored as RAP_STYLE_ADLIBS_CLIENT).
// Intent: stop every rap output from defaulting to generic "(yeah)" / "(hey)" —
// a Hyphy song should say "YEE!" and "whoop whoop", a UK Drill song says "oi"
// and "bruv", a Conscious Trap song uses sparse intentional ad-libs, etc.
// ─────────────────────────────────────────────────────────────────────────────
const RAP_STYLE_ADLIBS = {
  'Trap':                 ['skrrt','yah','ay','woo','let\'s go','bands','ooh','lil'],
  'Boom Bap':             ['yo','uh','check it','word','yessir','uh-huh','one-two','aiyyo'],
  'Lyrical/Conscious':    ['(knowledge)','peace god','word is bond','represent','true indeed','wisdom','uh-huh','check'],
  'Drill':                ['gang','slide','brr','demon time','splash','opps','no cap','grrah'],
  'Melodic Rap':          ['(melodic)','oh','yeah yeah','mmm','(auto-tune)','whoa','ayy','let me tell ya'],
  'Old School':           ['yo ho','throw your hands up','in the place to be','dj spin it','fresh','def','word up','uh huh'],
  'G-Funk':               ['(smooth)','ya don\'t stop','hol up','(cruisin)','west side','smoke somethin','yeaahh','(laid back)'],
  'East Coast':           ['yo','word up','ayo','c\'mon son','true indeed','check it','nawmean','that\'s real'],
  'Midwest':              ['(chipmunk soul)','uh','yep','you know','c\'mon','(soul chop)','mmm','check it'],
  'Cloud Rap':            ['(whispered)','(echo)','(mumbled)','(ethereal)','yeahh','uhh','(hazy)','(reverb)'],
  'UK Drill':             ['oi','bruv','fam','gang','straight up','innit','splash','brrap'],
  'Afro-Rap':             ['O YO!','EHEN!','NA WETIN!','MAKE I TELL YOU','(laughter)','ODESHI!','BROKE WASH','(drum break)'],
  'Latin Rap':            ['¡DALE!','¡WEPA!','¡ESO!','BRR','JEJE','QUE LO QUE','¡FUEGO!','¡VAMOS!'],
  'Hyphy Rap':            ['YEEE!','WHOOP WHOOP!','HELLA!','GO DUMB!','GHOST RIDE!','YADADAMEAN?','THIZZIN!','TURF!'],
  'Phonk':                ['(ominous)','yea hoe','pimp','triple six','(drawl)','smokin','grim','(slowed)'],
  'Anthem Rap':           ['(LET\'S GO!)','(UP!)','(AYY!)','(WHAT IT IS!)','(LIGHT IT UP!)','(STAND UP!)','(IT\'S ON!)','(RIDE OUT!)'],
  'Hustle / Grind':       ['still up','on my grind','the marathon','(grinding)','no sleep','up first','the mix','get it'],
  'Post-Algorithm':       ['(glitch)','(data)','(refresh)','(buffer)','(fragment)','(error)','(corrupt)','(reset)'],
  'Neo-Phonetic':         ['(stutter)','brr brr','kah','tata','(chopped syllable)','boof','ah ah','(phonetic)'],
  'Climate Rap':          ['(breath)','(sigh)','look around','real talk','(urgent)','(grim)','time\'s up','(sobering)'],
  'AI-Native':            ['(processed)','(synth)','(vocoded)','(robotic)','one-oh-one','(binary)','(digital)','(rendered)'],
  'Mosaic Flow':          ['(switch)','(beat change)','wait','aight','shift','(pivot)','new angle','(reset)'],
  'Golden Era 2.0':       ['yo','real hip-hop','check it','one two','yessir','fam','(shotgun click)','hittas'],
  'Analog Melodic':       ['(tape warmth)','mm','oh','(soft auto-tune)','yeah yeah','(hazy)','(rhodes)','whoa'],
  'Conscious Trap':       ['(mm)','(pause)','(check it)','(listen)','(word)','(truth)','(real)','(breath)'],
  'Afro-Boom Bap':        ['(African chant)','sankofa','true','word','(tonal)','uh-huh','real','(djembe)'],
  'Jazz Rap Revival':     ['(scat)','doo bop','yeah yeah','(horn)','true that','mm','peace','(brush snare)'],
  'Bay Area':             ['(hyphy)','hella','ghost ride','slap','yadada','beyotch','(Too Short)','yay area'],
  'Down South':           ['(drawl)','slatt','bussin','huh','what it do','fasho','trill','errybody'],
  'Crunk':                ['YEAH!','OKAY!','WHAT!','(SHOUTED)','TURN UP!','CRUNK!','SKEET!','OOOWWWW!'],
  'Chopped & Screwed':    ['(screwed)','(chopped)','(slowed)','sippin','leanin','(syrupy)','(pitch-down)','slow it down']
};

// ─────────────────────────────────────────────────────────────────────────────
// LYRIC CRAFT TOOLKIT — universal techniques, genre + mode filtered per song.
// Each technique has a short-form instruction used in the live prompt.
// buildLyricCraftNote(genre, mood, topic) selects the relevant set based on
// BOTH genre match AND mood-signal match (for cross-cutting frameworks like
// the comedy / parody craft below, which apply to any genre when mood signals
// funny / playful / absurd / etc.).
// ─────────────────────────────────────────────────────────────────────────────

// Shared mood keyword list for all 4 comedy-framework techniques. A comedy
// technique fires when the mood matches ANY keyword here (word-boundary,
// case-insensitive, hyphen-or-space tolerant). Matched against MOOD ONLY
// (not topic) — topic is narrative content and contains words like "funny
// story" on serious songs, which would cause false comedy injection.
const COMEDY_MODES = [
  'playful','funny','silly','absurd','humorous','comedic','ironic','satirical',
  'tongue in cheek','witty','goofy','cheeky','lighthearted','whimsical','novelty'
];
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

  // ── QUOTABLE-LINE CRAFT (money bars / hook kernels / opening + closing gravity) ──
  moneyLine: {
    label: 'MONEY LINE (THE QUOTABLE BAR)',
    short: `Every great song has 1-3 lines people screenshot, quote, tattoo — NOT punchlines but compressed truth in specific imagery. Hip-hop: "I ain't passed the bar but I know a little bit" (Jay-Z, double meaning). Country: "She thinks my tractor's sexy" (title IS the money line). Rock: "I can't get no satisfaction" (thesis in 4 words). R&B: "I'd wait a million years, walk a million miles" (compression via repetition). Folk: "How many roads must a man walk down" (rhetorical that IS the argument). RULES: (1) Specificity — name, number, place, sensory image, not abstract. (2) Syntactic compression or inversion. (3) Double meaning OR universal truth uniquely expressed. (4) Place at bar 8 or 16 of a verse, OR the line immediately before the chorus breaks. Aim for 1-3 per song. The test: could this line stand alone as a tweet?`,
    genres: 'all'
  },

  hookKernel: {
    label: 'HOOK KERNEL (ONE TWEETABLE THESIS)',
    short: `Every great hook collapses to ONE quotable idea in 6-10 words — the song's entire thesis compressed to a phrase. "All you need is love" (Beatles). "Born in the USA" (Springsteen). "I will always love you" (Whitney). "Shake it off" (Swift). "Old Town Road" (Lil Nas X). The hook can have multiple lines, but ONE line inside it MUST be the extractable thesis that works standalone. RULES: (1) Declarative or imperative — never a question or qualification. (2) Under 11 words, ideally 6-8. (3) States the song's entire argument. (4) Works printed on a t-shirt. (5) The rest of the hook supports this one line; this line can carry the hook alone.`,
    genres: 'all'
  },

  openingLineGravity: {
    label: 'OPENING LINE GRAVITY',
    short: `First line earns attention or loses it. RULES: (1) SPECIFICITY over abstraction — "She called me up from behind her locked door" beats "I was sad when she left." (2) IMAGE or ACTION over state-of-being — "It was the heat of the summer" beats "I remember feeling young." (3) AVOID cliché openings: "I used to...", "Baby...", "Once upon a time", "Remember when...". (4) Name a place, person, object, OR specific moment inside the first 7-10 words. GREAT OPENINGS: "Hello darkness my old friend" (Simon), "I was born in a crossfire hurricane" (Stones), "It was a rainy night when he came into sight" (Johnny Cash), "I found a love for me" (Sheeran), "Yeah, I think about the end just way too much" (Swift "Anti-Hero"). The opening line is the single most-heard line in the entire song — engineer it last after the hook lands.`,
    genres: 'all'
  },

  closingLineWeight: {
    label: 'CLOSING LINE WEIGHT',
    short: `The final line of the song (before any outro vamp/fade) must land ONE of four moves: (1) REFRAME the opening — identical words, transformed meaning. (2) REVELATION — the truth the song has been building toward. (3) IMAGE THAT STAYS — a single sensory detail that outlasts the song. (4) ACCEPTANCE or RESOLUTION — what the narrator now knows or has accepted. EXAMPLES: "But still haven't found what I'm looking for" (U2 — acceptance). "You can check out any time you like but you can never leave" (Eagles — revelation). "And the only way to see her was to kill her" (country murder ballad — image). "I'm still here, and that's enough" (quiet resolution). RULE: never end on cliché or summary. End on a specific — a named image, a concrete action, a declarative truth.`,
    genres: 'all'
  },

  // ── STORYTELLING CRAFT (narrative songwriting, character-driven genres) ────
  characterEstablishment: {
    label: 'CHARACTER ESTABLISHMENT',
    short: `Name the character in 4-8 words with a defining trait — not just a description. "Small-town girl, big-city dreams" beats "she was a nice girl." Country masters this: "Jolene, Jolene, Jolene, Jolene — your beauty is beyond compare, with flaming locks of auburn hair" (Dolly — name + sensory detail + threat). Hip-hop: "Richie Rich from Oakland, caps on, suburban" (not "a friend of mine"). Folk: "Hazel Eyes she called herself though they were actually green." RULES: (1) At least one proper noun or signature detail. (2) Trait that implies a whole history. (3) Anchor them in place or era. (4) Never describe with abstract adjectives ("kind", "smart", "troubled") — always with specific objects, actions, or speech. Character-driven songs live or die on this.`,
    genres: ['country','folk','hiphop','blues','rock','altrock','ss','americana','gospel','tvmusical','jazz','indie']
  },

  sceneAnchor: {
    label: 'SCENE ANCHOR (WHERE + WHEN)',
    short: `Ground the song in a specific place AND time within the first 4 lines. "August heat wave, my Chevy on the side of 441" beats "It was summer." Country: "Route 19, sundown, radio on static, coffee cold." Hip-hop: "Second floor of the Marcy Projects, '94, Timbs wet from the rain." Folk: "The morning of my twenty-third year, the ice thawed late." Singer-songwriter: "Brooklyn January, the deli bag in my hand was splitting." RULES: (1) Name a location — street, city, landmark, interior room. (2) Name a time — hour, season, year, specific event. (3) Include at least one sensory detail — sound, smell, light quality, temperature. A story without a scene is just an opinion.`,
    genres: ['country','folk','hiphop','blues','rock','altrock','ss','americana','gospel','tvmusical','jazz','indie']
  },

  showNotTell: {
    label: 'SHOW NOT TELL',
    short: `Never STATE the emotion. Show it through action, object, or sensory detail. "Her hand shook as she poured the third glass" beats "She was sad." "I broke the frame because I couldn't look at him" beats "I was angry." "He left the porch light on for six months" beats "He was hopeful." This is the single hardest discipline in lyric writing AND the single biggest gap between amateur and pro. RULES: (1) In storytelling verses, NO abstract emotion words (sad, angry, lonely, scared, happy, hopeful) — replace each with an image. (2) The listener should be able to draw the scene from the words alone. (3) The emotion lives in the implication, not the statement. (4) Hooks can still state emotion directly — the show-not-tell discipline is for verses.`,
    genres: ['country','folk','hiphop','blues','rock','altrock','ss','americana','pop','rnb','gospel','jazz','indie','neosoul','tvmusical']
  },

  narrativeReveal: {
    label: 'NARRATIVE REVEAL',
    short: `Hold back ONE key piece of information until verse 3 or the bridge. The audience thinks the song is about X; a single line reveals it's actually about Y, and verses 1-2 now read differently in retrospect. Taylor Swift "Dear John" — the age gap reveal. Kendrick "Sing About Me, I'm Dying of Thirst" — the narrator identity shifts. Country murder ballads — the victim identity. Bo Burnham "That Funny Feeling" — the "funny feeling" IS the dread. RULES: (1) The reveal line must be screenshot-worthy on its own. (2) Verses 1-2 must READ differently after you know the reveal. (3) Don't telegraph early — the reveal works because it's surprising in the moment, inevitable in retrospect. (4) Usually lives on the bridge or bar 1 of verse 3.`,
    genres: ['country','folk','hiphop','blues','rock','altrock','ss','americana','tvmusical','jazz','indie','pop']
  },

  dialogueAsLyric: {
    label: 'DIALOGUE AS LYRIC',
    short: `Use quoted speech as lyric instead of paraphrased attribution. "She said 'I can't do this anymore' and closed the door" beats "She told me she was leaving." Country masters this (Hank Williams "Your Cheatin' Heart", Miranda Lambert "The House That Built Me", Tyler Childers). Hip-hop's best storytelling tracks quote characters directly (Slick Rick "Children's Story", Nas "I Gave You Power"). RULES: (1) Quote full phrases, not paraphrased summary. (2) Use speech patterns — contractions, dialect, regionalism — that reveal the speaker's character. (3) Dialogue lines can break the song's dominant meter; treat that as a feature, not a bug. (4) Tag the speaker when needed: "she said", "Daddy told me", "the preacher asked". Three or more speakers in one song turns lyric into scene.`,
    genres: ['country','folk','hiphop','blues','rock','altrock','ss','americana','tvmusical','rnb','gospel']
  },

  timeCompression: {
    label: 'TIME COMPRESSION',
    short: `Compress months or years into 2-4 lines, usually on the bridge or between verses. "Then the leaves came down / Then the snow covered everything she owned / Then I didn't see her for a year" = a full year in three lines via seasonal imagery. Country: "One long summer, one hard winter, one morning she was gone." Folk: "Ten years later I was standing at the same door." RULES: (1) Use seasonal markers, life events (funerals, moves, graduations, births), or calendar events to jump. (2) Compression lines should be SHORTER than scene-setting lines — the rhythm of time passing. (3) Usually a bridge move to set up the final verse. (4) Don't skip all the middle — choose 2-3 specific markers that imply the rest.`,
    genres: ['country','folk','hiphop','blues','rock','altrock','ss','americana','tvmusical','indie','gospel','pop']
  },

  // ── COMEDY / PARODY CRAFT (Ian Edwards "running the game" framework) ───────
  // These 4 techniques activate on EITHER:
  //   • genre match (comedy / parody / tvmusical), OR
  //   • mood match (any word in COMEDY_MODES — word-boundary, case-insensitive)
  // Comedic craft isn't a genre, it's a mode. A rap song about an absurd
  // flex, a country novelty track, a pop tongue-in-cheek banger — all
  // benefit from this framework whenever the MOOD signals funny. Mood is
  // a short emotional label; topic is narrative content and is NOT used
  // for mode gating (would cause false-positives on serious songs whose
  // topic happens to use words like "funny story").
  runTheGame: {
    label: 'RUN THE GAME (5-STEP HEIGHTENING)',
    short: `The framework behind every great comedic song (Lonely Island "I'm On A Boat", Weird Al originals, Bo Burnham, Flight of the Conchords, hip-hop's best punchline tracks, country novelty hits). 5 steps, executed across the song: (1) NOTICE: pick one unusual anchor — a word, behavior, or belief — and react to it honestly in the hook. (2) POV: give your comedic opinion on why it's unusual. This is your point of view for the entire song — commit to it. (3) HEIGHTEN: "if this is true, what else is true?" Each verse imagines a funnier scenario where the anchor is even more real. (4) GATHER: introduce new characters, settings, or info in verse 2 — new setups your anchor can land on. (5) CONNECT: every new setup punchlines back to the original anchor word or behavior. Final hook collapses everything into the same joke. Rule: you are not making 4 different jokes — you are making ONE joke 4 different ways.`,
    genres: ['comedy','parody','tvmusical'],
    modes: COMEDY_MODES
  },

  heightenTheAnchor: {
    label: 'HEIGHTEN THE ANCHOR',
    short: `Pick ONE anchor word or behavior in the song (e.g. "peninsula", "boat", "kitchen"). Every verse stacks a more absurd scenario where the anchor is MORE true, more committed, more literal than before. Verse 1 is "I own a peninsula." Verse 2 is "I send girls pictures of my peninsula." Verse 3 is "the woman I'm marrying is a peninsula bride." Rule: scenarios must get WEIRDER and MORE SPECIFIC each time, not just repeat the premise. If verse 3 feels like verse 1, you haven't heightened.`,
    genres: ['comedy','parody','tvmusical'],
    modes: COMEDY_MODES
  },

  remixTheAnchor: {
    label: 'REMIX THE ANCHOR (TWO BECOMING ONE)',
    short: `Take your anchor word and fuse it with OTHER nouns in the song to create nonsense-phrases that commit 100% to the joke. Ian Edwards: instead of "I'll send pictures of my penis," it becomes "I'll send pictures of my PENINSULA." The remix should land in a place the listener didn't expect but can perfectly understand in retrospect. Works in hook lines (maximum impact) or as a recurring punchline through verses. The word you pick for the anchor must be phonetically rich enough to absorb other nouns plausibly.`,
    genres: ['comedy','parody','tvmusical'],
    modes: COMEDY_MODES
  },

  crowdWorkFeel: {
    label: 'CROWD-WORK FEEL (REACTIVE COMEDY)',
    short: `Write the song as if it's being discovered in real time — reactions, asides, observations to unseen "audience" responses built into the lyric. "So you live in San Fran? I kinda know what that means but I really don't" IS the first line. The comedic voice notices things and updates its theory mid-song. Use: (1) direct address to listener/character ("Don't have kids? That one's my niece."), (2) self-correction mid-verse ("Wait — it's a peninsula, not an island"), (3) interjections as bars ("Oh REALLY?"). Makes the song feel improvised, human, and alive — even though it's structured.`,
    genres: ['comedy','parody','tvmusical'],
    modes: COMEDY_MODES
  },

  // ── HIP-HOP / RAP CRAFT ────────────────────────────────────────────────────
  // Phonetic-decomposition craft (Eminem / MF DOOM / Big Pun level technique —
  // treating words as a sequence of rhymeable phonemes instead of indivisible
  // rhyme units). This is the layer above surface multi-rhyme schemes.
  syllableDecomposition: {
    label: 'SYLLABLE DECOMPOSITION (WORD-AS-RHYME-ATOMS)',
    short: `Break a keyword into its phonetic atoms — each atom becomes a SEPARATE rhyme anchor for a subsequent bar. "California" → "CAL" (matches: gal, pal, shall) + "FORN" (matches: warn, torn, storm) + "NIA" (matches: hear-ya, steer-ya). Now you have THREE rhyme threads running through the next 6-12 bars instead of one end-rhyme. Plant each atom at varied positions (not always bar-end) through bars 2-12. Eminem, MF DOOM, Big Pun build entire verses this way. RULES: (1) Atoms must be real phonetic units — consult the word's actual syllable boundaries (vowel + following consonant), not arbitrary letter splits. (2) Each atom's rhymes must be real words doing syntactic work — never filler. (3) All 3 atom-threads can run simultaneously through one verse; each listener discovers a different one on repeat plays.`,
    genres: ['hiphop']
  },

  internalRhymeChain: {
    label: 'INTERNAL RHYME CHAIN (RHYMES INSIDE BARS, NOT JUST AT ENDS)',
    short: `Rhymes live INSIDE the bar, not only at the end. Every 2-4 syllables within a bar contains a hit on the scheme — listener gets a dopamine reward 3-6 times per bar instead of once at the line-break. Eminem "Till I Collapse" runs the "at" sound every 2 syllables through whole verses. Big Pun "Twinz" runs internal chains so dense the rhyme count doubles the syllable count. RULES: (1) Pick ONE phonetic target (a vowel + following consonant). (2) Plant the target at syllables 2, 4, 6, 8 of each bar — not just at bar-end. (3) Each planted hit must be a real word doing syntactic work — never filler to complete the scheme. (4) The end-rhyme can also hit the target, but it's one of five hits, not the only one. The density IS the craft.`,
    genres: ['hiphop']
  },

  prefixSuffixRhyme: {
    label: 'PREFIX / SUFFIX RHYME (PARTIAL-WORD ANCHORS)',
    short: `Rhyme on word BEGINNINGS (prefix) or ENDINGS (suffix) instead of whole-word rhymes. Prefix: "UNDERwater / UNDERfire / UNDERpressure" — the "UNDER-" IS the scheme anchor; the word-tails vary. Suffix: "agGRESSION / deDRESSION / proGRESSION" — the "-ESSION" is the anchor. The ear hears recurrence before the syntactic word completes, giving a locked-in percussive feel. Best placement: 3-5 consecutive bars using the same prefix or suffix. RULE: the scheme anchor must carry the stressed syllable — unstressed prefix/suffix rhymes don't land.`,
    genres: ['hiphop','pop']
  },

  vowelChain: {
    label: 'VOWEL CHAIN (LONG-FORM ASSONANCE THREAD)',
    short: `Pick ONE specific vowel phoneme (not a general vowel category — the exact sound: long A as in "cake", short I as in "bit", schwa "uh", long E as in "beat") and run it through 8-16 bars as a through-line. The vowel must appear at every 2-4 syllables, planted in words chosen for that exact sound. Eminem "Sing for the Moment" threads the "ay" sound (say, way, day, make, break, fate, hate) through verse 1. MF DOOM "One Beer" threads "ee" through the whole verse. RULES: (1) Pick one exact vowel — don't drift to neighboring sounds. (2) Minimum density: one hit per bar, usually 2-4. (3) Can stack with end-rhyme scheme. (4) Vowel choice matches emotional register — bright vowels (ee, ay) for triumph, dark vowels (oh, oo, uh) for menace or loss. This is different from generic assonance: assonance is occasional vowel repetition; vowel chain is a structural through-line.`,
    genres: ['hiphop']
  },

  phoneticTargeting: {
    label: 'PHONETIC TARGETING (RHYME AS PHONEME, NOT WORD)',
    short: `Meta-technique underneath all the above. When building a rhyme scheme, DO NOT think "I need a word that rhymes with X." Think "I need the phoneme /ɛkʃən/" (or whatever the exact vowel+consonant target is). Then search for that phoneme at ANY syllable position of ANY word — first syllable, middle, end. "Reflection" + "section" + "necklace" all hit /ɛk/ — at bar-end, mid-word, first-syllable respectively. Searching at the phoneme level expands vocabulary 10× over word-level. RULES: (1) Isolate the exact phoneme sequence the scheme runs on (consonant + vowel + consonant, usually 3 phonemes). (2) Never sacrifice meaning for phoneme match — if no meaning-respecting match exists, pick a different target. (3) Between a perfect word-level end-rhyme vs a phoneme hit planted mid-word elsewhere, pick the phoneme hit — it sounds more sophisticated and less "Hallmark card." (4) This is the technique behind the sensation of "wait, how did that rhyme?" that elite rappers create.`,
    genres: ['hiphop']
  },

  // ── DOUBLE MEANING CRAFT — surface + depth at bar / line / theme levels ────
  thematicDoubleMeaning: {
    label: 'THEMATIC DOUBLE MEANING (SURFACE + DEPTH / WHOLE-SONG HIDDEN READING)',
    short: `Write a song that has a SURFACE meaning AND a DEEPER hidden meaning — both complete, both believable on their own. Most listeners hear the surface; attentive listeners discover the second reading on repeat plays. This is song-level double entendre (the whole song), distinct from bar-level or line-level double entendre. Legendary examples where listeners thought the song meant one thing but it really meant another:

  • "Every Breath You Take" (The Police) — SURFACE: love song played at weddings. REAL: a stalker's confession. Sting has publicly regretted how often it's played at weddings.
  • "Hotel California" (Eagles) — SURFACE: strange hotel experience. REAL: music industry trap / addiction / spiritual crisis.
  • "Pumped Up Kicks" (Foster the People) — SURFACE: upbeat indie pop. REAL: school shooting from the shooter's POV.
  • "Semi-Charmed Life" (Third Eye Blind) — SURFACE: summer radio hit. REAL: methamphetamine addiction cycle — the "doo doo doos" replacing edited-out drug references.
  • "Slide" (Goo Goo Dolls) — SURFACE: sweet romance. REAL: Catholic teenager considering abortion.
  • "Born in the USA" (Springsteen) — SURFACE: patriotic anthem (often misused politically). REAL: Vietnam veteran abandonment by the country.
  • "The One I Love" (R.E.M.) — SURFACE: wedding-ready love song. REAL: "a simple prop to occupy my time" — using someone.
  • "99 Luftballons" (Nena) — SURFACE: colorful pop novelty. REAL: 99 balloons trigger accidental nuclear war.
  • "Closing Time" (Semisonic) — SURFACE: last call at a bar. REAL: childbirth metaphor — "you don't have to go home but you can't stay here" = being born out of the womb.
  • "Waterfalls" (TLC) — SURFACE: upbeat pop. REAL: cautionary tale about AIDS and drug dealing.
  • "Kids" (MGMT) — SURFACE: bright synth-pop. REAL: melancholy on loss of childhood innocence.
  • "99 Problems" (Jay-Z, verse 2) — SURFACE: bragging rap. REAL: a forensic account of racial profiling at a traffic stop.
  • "Pompeii" (Bastille) — SURFACE: anthemic shout-along. REAL: volcanic-destruction metaphor for personal paralysis.
  • "Tears of a Clown" (Smokey Robinson) — SURFACE: circus imagery. REAL: depression masked by public performance.
  • "Hey Ya!" (OutKast) — SURFACE: dance hit. REAL: the narrator begs for honesty in a failing relationship — "separate for a while."

RULES:
(1) The SURFACE reading must be COMPLETE — a casual listener could enjoy the song end-to-end without discovering the deeper meaning. No lines that only make sense through the hidden reading.
(2) The DEEP reading must be ACCESSIBLE — there must be at least 2-3 specific lyrical details that unlock it on attentive listen. These are the breadcrumbs.
(3) Don't telegraph. Never explicitly announce "this is actually about X." Let the listener catch it.
(4) Let the title be the camouflage. "Every Breath You Take" sounds romantic. "Born in the USA" sounds patriotic. The title sells the surface.
(5) The deeper reading should enhance, not betray — when the listener discovers it, they feel smart, not tricked.`,
    genres: 'all'
  },

  falseFriendHook: {
    label: 'FALSE-FRIEND HOOK (CATCHY-BUT-DARK)',
    short: `The hook sounds positive, anthemic, or celebratory — but in context reveals something dark, ironic, or tragic. Listener sings along happily for 2-3 plays, then "wait — what does this actually say?" This is a specific flavor of thematic double meaning focused on the hook itself. Examples:
  • "Pumped Up Kicks" — catchy hook, school-shooter lyric.
  • "Semi-Charmed Life" — bouncy "doo doo doos" over meth addiction.
  • "Hey Ya!" — dance hit, literally "separate for a while."
  • "Last Friday Night" (Katy Perry) — party anthem listing a full alcoholic blackout.
  • "Chop Suey!" (System of a Down) — mosh-pit hook quotes Jesus on the cross ("Father, into your hands I commend my spirit").
  • "Foster the People" and "Imagine Dragons" routinely deploy this.
RULES: (1) Hook passes a casual listen as positive/neutral. (2) At least one word or phrase in the hook contains the dark reading in plain sight. (3) Verses tilt the listener toward the dark reading on closer listen. (4) Never explicitly explain the trick — the unguarded hook is the point.`,
    genres: ['pop','rock','altrock','indie','hiphop','rnb','country','neosoul']
  },

  sarcasm: {
    label: 'SARCASM (INVERSE MEANING WITH BITE)',
    short: `Say the OPPOSITE of what you mean, and the listener knows it. Distinct from tongue-in-cheek (gentle wink) and from double entendre (both meanings true). Sarcasm is UNILATERAL inverse — "Oh, that's GREAT" when it obviously isn't. The gap between what's said and what's meant IS the content.

Examples:
  • Alanis Morissette "You Oughta Know" — "I hope you feel it" (meaning: I hope it destroys you)
  • Pink "So What" — "I'm still a rock star, I got my rock moves" (sung with mocking bravado to cover heartbreak)
  • Lily Allen "F*** You" — saccharine melody over vicious content; sweet delivery IS the knife
  • Randy Newman "Short People" — performs bigotry straight-faced to expose its stupidity
  • Country: Brad Paisley "Alcohol" — the song's narrator IS alcohol personified, arguing for its own virtue
  • Eminem "My Name Is" — mocks tabloid attention BY taking it further than tabloids ever would
  • Fiona Apple "Limp" — "You fondle my trigger" (romantic diction deployed as accusation)

RULES:
(1) The listener MUST catch the inversion — if the listener thinks the narrator is sincere, the sarcasm failed. Plant an unmissable tell (a lyric detail, a tonal shift, a too-perfect cliché).
(2) Delivery tone does half the work — sarcasm SUNG sincerely over content that's obviously wrong is the purest form.
(3) Sarcasm should land BOTH as a joke AND as a wound — funny first, then "oh, this is actually bitter."
(4) NOT the same as tongue-in-cheek: sarcasm has a target. Tongue-in-cheek has a shared smirk.
(5) Best placed on the chorus (the inversion becomes the earworm) or on a single pivot line mid-verse.`,
    genres: ['pop','rock','altrock','indie','hiphop','country','rnb','comedy','parody','neosoul']
  },

  perspectiveRotation: {
    label: 'PERSPECTIVE ROTATION (SAME SUBJECT, DIFFERENT LOOKS)',
    short: `Take ONE subject (event, relationship, place, feeling) and rotate through multiple angles or POVs across the song. Each verse is a different look at the same thing. The song accumulates into a prismatic portrait instead of a linear narrative.

Patterns:
  • MULTIPLE CHARACTERS, SAME EVENT: "Eleanor Rigby" (3 lonely people), "The Chain" Fleetwood Mac (verses from different band members on the shared breakup), "Jackie and Wilson" Hozier
  • SAME PERSON, DIFFERENT TIMES: Taylor Swift "The Story of Us" (early / middle / present of one relationship), Jason Isbell "Elephant" (same event across time)
  • SAME SCENE, DIFFERENT EYES: Joni Mitchell "Both Sides Now" (clouds from above vs below, love from inside vs outside, life young vs old), Kendrick "Sing About Me" (3 voices speaking about the same street)
  • SAME TRUTH, DIFFERENT GENRES: Dolly Parton "I Will Always Love You" (country original → R&B cover by Whitney) — same lyric, two whole meanings
  • NARRATOR VS. SUBJECT: Jay-Z "4:44" (narrator addresses wife / son / himself / industry — all about one act)

RULES:
(1) Commit to ONE subject. If each verse is about a different thing, you lost the technique.
(2) Each verse's LOOK must be genuinely different — not just different words describing the same thing, but a different ANGLE (different eyes, different time, different role, different scale).
(3) Chorus binds the rotation — the chorus is the invariant truth all the different looks circle.
(4) Final verse or bridge often reconciles — shows how the different looks add up.
(5) Pairs naturally with narrativeReveal (a reveal that recontextualizes all prior perspectives).`,
    genres: ['pop','rock','altrock','indie','country','folk','ss','americana','hiphop','rnb','neosoul','jazz','gospel','tvmusical']
  },

  unreliableNarrator: {
    label: 'UNRELIABLE NARRATOR (NARRATOR\'S STORY ≠ THE TRUTH)',
    short: `The narrator tells one version of events — specific details in the lyric reveal they're lying, self-deceiving, or missing the obvious truth. Listener assembles the REAL story from the gap between what the narrator says and what the song shows.

Examples:
  • "You're So Vain" (Carly Simon) — narrator insists the ex is vain; the whole song is about the ex, proving she's still thinking about him (point-blank target of the accusation lands on the narrator too).
  • "Every Breath You Take" (Police) — narrator presents himself as a devoted lover; every verb reveals he's a stalker.
  • "Delilah" (Tom Jones) — narrator confesses violence he calls love; the listener sees a murderer convincing himself.
  • "Stan" verse 4 (Eminem) — Stan writes from a position of calm composure while the details show he's driving drunk with his pregnant girlfriend in the trunk.
  • "Suzanne" (Leonard Cohen) — narrator frames Suzanne as a mystic savior; the specifics reveal it's his projection onto a tea-serving woman.
  • "Luka" (Suzanne Vega) — the narrator-as-victim denies the abuse the lyric clearly depicts ("I think it's because I'm clumsy").

RULES:
(1) The narrator's SELF-IMAGE must be clear from line one. They're presenting themselves as X.
(2) At least 3 details in the song must contradict the self-image if the listener is paying attention.
(3) Never the narrator's voice admit the gap — the lyric maintains the cover to the end. The listener discovers.
(4) Works best in first-person storytelling songs (country, folk, R&B, hip-hop narrative tracks).
(5) Different from narrativeReveal (which is a plot twist); this is a CHARACTER twist — the narrator is less truthful than they know.`,
    genres: ['country','folk','ss','americana','rock','altrock','indie','hiphop','rnb','pop','neosoul','tvmusical']
  },

  covertNarrative: {
    label: 'COVERT NARRATIVE (HIDDEN STORY UNDER APPARENT STORY)',
    short: `A second, complete narrative runs underneath the apparent one — different characters, different events, different stakes — and only reveals through specific verses or bridge. Different from thematic double meaning (which is meaning-level): this is a full second STORY. Examples:
  • "Stan" (Eminem) — apparent narrative: letters from a fan. Covert: Stan's escalating instability → murder-suicide → Eminem's belated reply.
  • "The Devil Went Down to Georgia" (Charlie Daniels) — apparent: fiddle contest. Covert: the devil loses because pride blinds him.
  • "American Pie" (Don McLean) — apparent: nostalgia. Covert: full history of rock music with coded references for each era.
  • "Fast Car" (Tracy Chapman) — apparent: a hopeful escape. Covert: every hopeful line is contradicted later, revealing the cycle never breaks.
  • "Luka" (Suzanne Vega) — apparent: cheerful acoustic song. Covert: child abuse from the victim's POV, denying it to the listener.
RULES: (1) Both narratives must be internally consistent. (2) Specific details are shared between the narratives but mean different things in each. (3) The covert narrative usually reveals on the bridge or final verse. (4) A listener must be able to re-read the whole song and see the covert story was there from line 1.`,
    genres: ['country','folk','ss','hiphop','rock','altrock','indie','pop','rnb','americana','tvmusical']
  },

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
// Select lyric craft techniques by genre AND by mode (mood keyword).
// A technique activates if ANY of:
//   - genres === 'all'                                              (universal)
//   - genres array contains the current genre                       (genre-gated)
//   - modes array contains a word that appears in `mood` as a       (mode-gated)
//     whole token (word-boundary match, case-insensitive,
//     hyphens/underscores normalized to spaces so "tongue-in-cheek"
//     and "tongue in cheek" both match).
// Mode gating is intentionally against `mood` only (not `topic`). Topic is
// free-form narrative content — on a serious song the user might write
// "funny story my grandma told me" and that phrase must NOT trigger comedy
// craft injection. Mood is a short emotional label and a reliable signal.
// `topic` is accepted in the signature for future extensibility.
function buildLyricCraftNote(genre, mood, topic) {
  // Normalize mood: lowercase, turn hyphens/underscores into spaces, collapse
  // internal whitespace, pad with single spaces for word-boundary matching
  // (so `' funny '` never matches inside `'funnymoney'`, `' ironic '` never
  // matches inside `'sardonic'`/`'chronic'`/`'byronic'`, etc.).
  const moodNorm = ' ' + (mood || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  const matchesMode = (modes) => {
    if (!Array.isArray(modes) || !modes.length) return false;
    for (const m of modes) {
      if (moodNorm.includes(' ' + m + ' ')) return true;
    }
    return false;
  };
  const applicable = Object.values(LYRIC_CRAFT_UNIVERSAL).filter(t => {
    if (t.genres === 'all') return true;
    if (Array.isArray(t.genres) && t.genres.includes(genre)) return true;
    if (t.modes && matchesMode(t.modes)) return true;
    return false;
  });
  const craftBlock = applicable.length
    ? `\n\nLYRIC CRAFT TOOLKIT — use these where they serve the song, never forced:\n${applicable.map(t => `• ${t.label}: ${t.short}`).join('\n')}`
    : '';
  // Anti-cliche rules always apply, regardless of genre or mood.
  return craftBlock + buildAntiClicheNote();
}

// ============ ANTI-CLICHE RHYME SYSTEM ============
// Banned cliche rhyme chains. The LLM must never chain two words from the same
// chain in the same song. Using ONE word from a chain is fine — it's the
// chaining (rhyming one against another from the same family) that marks the
// lyric as derivative. Each chain is the SURFACE PATTERN, not the concept —
// you can still write about love, fire, the spiritual, etc., just don't rhyme
// them with the obvious partner.
const CLICHE_RHYME_CHAINS = [
  ['lyrical', 'spiritual', 'miracle', 'biblical', 'physical'],
  ['fire', 'desire', 'higher', 'tire', 'wire', 'entire'],
  ['love', 'above', 'dove', 'of', 'shove'],
  ['heart', 'apart', 'start', 'part', 'smart', 'chart'],
  ['night', 'light', 'right', 'fight', 'sight', 'tight', 'bright', 'might'],
  ['pain', 'rain', 'brain', 'again', 'insane', 'chain', 'vein', 'main'],
  ['time', 'rhyme', 'climb', 'prime', 'mime', 'grime'],
  ['feel', 'real', 'steal', 'heal', 'deal', 'reveal'],
  ['play', 'day', 'way', 'say', 'stay', 'away', 'pray', 'today'],
  ['crown', 'down', 'town', 'frown', 'clown', 'around'],
  ['money', 'honey', 'funny', 'sunny', 'bunny'],
  ['streets', 'beats', 'sheets', 'heats', 'feet', 'repeat', 'seats'],
  ['grind', 'mind', 'find', 'behind', 'shine', 'nine', 'blind', 'kind'],
  ['sky', 'high', 'fly', 'cry', 'die', 'lie', 'eye', 'why', 'goodbye'],
  ['dream', 'scheme', 'team', 'scream', 'beam', 'gleam'],
  ['soul', 'goal', 'role', 'whole', 'control', 'roll'],
  ['game', 'fame', 'name', 'same', 'flame', 'shame'],
  ['young', 'tongue', 'lungs', 'hung', 'sung', 'rung'],
  ['world', 'girl', 'curl', 'pearl', 'swirl', 'twirl']
];

function buildAntiClicheNote() {
  const chains = CLICHE_RHYME_CHAINS.map(c => c.map(w => `"${w}"`).join('/')).join(' · ');
  return `

⚠️ ANTI-CLICHE SYSTEM (MANDATORY — THIS IS WHAT SEPARATES AMATEUR AI LYRICS FROM REAL SONGWRITING):

═══════════════════════════════════════════════════
PART A — FORBIDDEN RHYME CHAINS
═══════════════════════════════════════════════════
Do NOT chain any two words from the same cliche family inside the same song:
${chains}

WHY: Every AI lyric generator defaults to these chains. "Lyrical/spiritual/miracle", "fire/desire/higher", "heart/apart/start", "night/light/fight", "grind/mind/shine" — these appear in 10,000+ existing songs. Picking two partners from the same chain marks the song as derivative before the second bar lands.

EXAMPLES:
✗ WRONG: "my flow is lyrical / touched by the spiritual / every bar's a miracle"
✓ RIGHT: "my flow is lyrical / pen bleeds the literal / stanzas stay pivotal"
  (kept "lyrical", rhymed on -iteral/-ivotal — same meaning, fresh chain)

✗ WRONG: "this love is fire / burning with desire / taking me higher"
✓ RIGHT: "this love's a live wire / a want I can't retire / a charge nothing acquires"
  (kept the heat, fresh rhyme family)

✗ WRONG: "broken heart / torn apart / falling start"
✓ RIGHT: "broken compass / torn from honest / falling off the promise"
  (kept the wound image, slant rhyme beats cliche)

RHYME CHAIN RULES:
1. If the word appears in any chain above, NONE of the other chain members may rhyme with it in this song.
2. Prefer multisyllabic, internal, and consonance rhymes (see LYRIC CRAFT toolkit above).
3. Slant rhymes, vowel echoes, assonance beat a perfect rhyme used 10,000 times.
4. If the song's concept legitimately requires the word, put it in a non-rhyming line.
5. ONE chain word per verse max. NEVER two from the same chain in the same song.

═══════════════════════════════════════════════════
PART B — CLICHE PHRASES: FLIP OR HOMAGE-AND-SUBVERT
═══════════════════════════════════════════════════
Beyond rhyme chains, common lyrical cliches include whole phrases and images:
"heart on my sleeve", "dancing in the rain", "shooting star", "ride or die",
"through thick and thin", "the one that got away", "against all odds",
"like a moth to a flame", "butterflies in my stomach", "head over heels",
"written in the stars", "time stood still", "take my breath away",
"fell to my knees", "burn it to the ground", "rise from the ashes",
"out of the blue", "walk the line", "end of the line", "edge of the world",
"tears like rain", "cold as ice", "heart of stone", "fire in my veins",
"chasing a dream", "living on a prayer", "king of the world", "only human",
"broken wings", "borrowed time", "second chance", "no strings attached".

RULE: Never use one of these cliches at face value. You have TWO legal options:

OPTION 1 — FLIP THE CLICHE
Take the cliche and invert its meaning, image, or conclusion. Keep enough of the
original so the listener catches the reference, then twist the finish.

✗ CLICHE: "I wear my heart on my sleeve"
✓ FLIP:   "I wear my heart on my sleeve / but the sleeve is kevlar"
✓ FLIP:   "keep my heart off my sleeve / she can't read what I don't print"

✗ CLICHE: "dancing in the rain"
✓ FLIP:   "dancing in the rain ain't romance, it's hypothermia"
✓ FLIP:   "I stopped dancing in the rain when I got a roof"

✗ CLICHE: "time heals all wounds"
✓ FLIP:   "time doesn't heal, it just buries"
✓ FLIP:   "time heals all wounds, but leaves every scar"

✗ CLICHE: "against all odds"
✓ FLIP:   "the odds weren't against me, I just bet them down to nothing"

OPTION 2 — HOMAGE-AND-SUBVERT (call out the cliche, then break it)
Name the cliche out loud inside the lyric — signal to the listener that YOU
know it's a cliche — then immediately subvert it. This works because the
listener feels included in the joke instead of patronized by it.

✗ CLICHE (used straight): "she took my breath away"
✓ HOMAGE-AND-SUBVERT: "they say she took my breath away / nah — she gave me asthma, and the bill"
✓ HOMAGE-AND-SUBVERT: "'took my breath away' — that's what the poets say / I'd say she punched me in the diaphragm / same thing, less ceremony"

✗ CLICHE (used straight): "living on a prayer"
✓ HOMAGE-AND-SUBVERT: "Bon Jovi said we're livin' on a prayer / I'm out here livin' on a billing cycle"

✗ CLICHE (used straight): "love is a battlefield"
✓ HOMAGE-AND-SUBVERT: "Pat Benatar called it a battlefield / I call it an HR complaint with better lighting"

✗ CLICHE (used straight): "broken wings, learn to fly"
✓ HOMAGE-AND-SUBVERT: "everybody wanna talk about broken wings / nobody talk about the bird that walked / and made it further"

THE RULES (PART B):
1. Scan your draft line-by-line. If a line could appear in 100 other songs as-is, it's a cliche — flip it or homage-and-subvert it.
2. The flip has to make the line MORE specific, not less. A flip that stays generic just swaps one cliche for another.
3. Homage works best when the original cliche is famous enough that the listener recognizes it on first pass. Obscure cliches should just be flipped, not named.
4. Never explain the subversion. The listener catches it or they don't — if you explain it, you killed it.
5. ONE homage-and-subvert per song max (it's a spotlight move, not a pattern). Flips can appear anywhere.

THE TEST: After writing a line, ask "could this line appear unchanged in any other song in this genre written in the last 20 years?" If yes, flip it or cut it.`;
}

// ============ CRAFT VOCABULARY FIREWALL ============
// Prevents technique names used in the prompt from bleeding into the actual
// lyrics. This is a single source of truth wired into all 5 prompt builders
// (song, lucky, rap lab, variant, edit). Expand the BANNED_WORDS list any
// time a new dimension or pill is added.
function buildCraftFirewallNote() {
  const BANNED = [
    // Rhyme architecture
    '"internal"','"multi-syllabic"','"multisyllabic"','"end-only"','"end rhyme"','"chain rhyme"','"mosaic rhyme"','"slant rhyme"','"rhyme scheme"','"rhyme architecture"',
    // Flow / cadence
    '"triplet"','"triplet flow"','"syncopated"','"on-beat"','"off-beat"','"double-time"','"double time"','"conversational"','"behind-beat"','"behind the beat"','"flow pattern"','"cadence"',
    // Speed gears system
    '"gear"','"gear up"','"gear down"','"gear shift"','"cascade"','"breakdown"','"breath reset"','"patter"','"speed-rap"','"speed rap"','"chopper flow"','"talking blues"',
    // Density
    '"sparse"','"medium density"','"dense"','"ultra-dense"','"syllable density"',
    // Vocab registers (all 13 pill labels)
    '"street-coded"','"street coded"','"conscious-literary"','"abstract-surreal"','"minimal-phonetic"','"academic"','"braggadocio"','"confessional"','"sardonic"','"finance-hustle"','"mythic-biblical"','"cinematic-storyteller"','"chess-strategy"','"sports-combat"','"vocab register"','"vocabulary register"',
    // Persona
    '"first-person-raw"','"second-person"','"third-person"','"omniscient"','"character-voice"','"collective-we"','"persona"',
    // Structure / section names used as lyric content (allowed as [brackets] only)
    '"internal rhyme scheme"','"rhyme pattern"','"bar structure"','"16-bar"','"8-bar"','"bar count"',
    // Craft concepts from lyric craft toolkit
    '"money line"','"hook kernel"','"opening gravity"','"closing gravity"','"homage and subvert"','"cliche flip"','"rule break"','"era anchor"','"counter-melody"','"undertone"','"primary"','"secondary"','"blend"','"graft"','"invert"','"freestyle"',
    // Anti-cliche system itself
    '"anti-cliche"','"cliche rhyme"','"rhyme chain"','"flip the cliche"'
  ];
  return `

🚫 CRAFT VOCABULARY FIREWALL — ABSOLUTE RULE (ENFORCE ON EVERY LINE):

The words below are INSTRUCTION VOCABULARY — the labels we use to TELL YOU how to write. They are NOT song vocabulary and MUST NEVER appear inside the lyrics you generate:

${BANNED.join(', ')}

THREE USES FORBIDDEN:
1. As a RHYME WORD — never rhyme on "internal", "triplet", "cascade", "braggadocio", "cinematic", etc.
2. As LYRIC CONTENT — never write a bar like "my flow is triplet", "my rhyme scheme is internal", "now I gear up", "this is that braggadocio mode", "watch me cascade".
3. SNEAKED MID-BAR — don't hide them inside otherwise-normal lines either ("I'm in my confessional bag" is forbidden).

BRACKET TAGS ARE EXEMPT. Delivery/section tags like [Verse 1], [Chorus], [Triplet Flow], [Gear Up], [Cascade], [Breakdown] belong OUTSIDE the lyric line — on their own line before the affected bars. Those are the stage directions. The bars themselves never name the directions.

THE TEST: After writing each line, scan it for any of the banned words above. If the line uses one, rewrite that line with DIFFERENT words that demonstrate the same technique.

NATURAL-SPEECH EXCEPTION: If a banned word is also a common English word used in natural speech ("chain", "bridge", "verse", "pattern", "break", "fire", "cold"), it MAY appear in a bar when used for its everyday meaning — but NEVER as a technique self-reference. "Chain on my neck" = fine. "My rhyme chain's tight" = forbidden.

META-RAP EXCEPTION: Some rap lineages (Eminem, J. Cole, Lupe Fiasco) genuinely reference their own craft in-bar. If and only if the topic is EXPLICITLY about rapping or writing, a SINGLE meta-reference per song is allowed — but still never using the exact pill labels from the UI. Write "I bend syllables", not "I use multi-syllabic rhyme".

DEMONSTRATE the technique. NEVER NAME it. If the listener could hear the verse and identify the technique without you labeling it, you executed it correctly. If you had to SAY the label, you failed to execute.`;
}

// ============ SPEED GEARS SYSTEM ============
// Cadence modulation as a cross-genre storytelling device. Speed is a lever
// the narrator pulls — acceleration = escalation/panic/list-cascade, pullback
// = weight/reveal/reflection. The contrast between gears is where the impact
// lives. This is NOT rap-exclusive — country (Garth Brooks "Ain't Going Down"),
// folk (Dylan "Subterranean Homesick Blues"), broadway (Hamilton "Guns & Ships",
// Gilbert & Sullivan patter songs), rock (R.E.M. "End of the World"), punk,
// gospel-rap-preach all have their own speed-cadence traditions.

const SPEED_GEARS_LINEAGE = {
  hiphop:    'Twista (Midwest hyperspeed, Adrenaline Rush), Busta Rhymes (multisyllabic barrage, "Break Ya Neck"), Eminem ("Rap God" sixteenth-note cascade, "Godzilla" outro), Royce da 5\'9" (internal-rhyme density, technical precision), Tech N9ne (chopper flow, "Midwest Choppers"), Tonedeff, Crooked I, Bone Thugs-N-Harmony (melodic triplet chaining), Kendrick Lamar ("Rigamortis" sixteenth-note stretches, "HiiiPoWeR"), Chino XL, R.A. the Rugged Man, Big Pun (breath-control legend).',
  country:   'Garth Brooks "Ain\'t Going Down (\'Til the Sun Comes Up)" — the prototype: rapid-fire couplets timeline-marching through Friday night→Saturday night→Sunday morning. "Copperhead Road" (Steve Earle) — speed-narrative through 3 generations. Tim McGraw "Where the Green Grass Grows" bridge sections. Chris LeDoux fast-narrative tradition. Brad Paisley "Online" verse gallop. Country-rap crossover: Colt Ford, Big & Rich "Save a Horse" bridge. Bluegrass lineage: "Rocky Top" cascades, Alison Krauss speed-picking patter.',
  pop:       'Billy Joel "We Didn\'t Start the Fire" (rapid-inventory cascade), R.E.M. "It\'s the End of the World as We Know It" (the pop patter ceiling), Fall Out Boy "Sugar, We\'re Goin Down" bridge, Panic! at the Disco fast-patter choruses ("I Write Sins Not Tragedies"), Lin-Manuel-era pop-rap crossover.',
  rock:      'R.E.M. "End of the World" verse gallop, Rage Against the Machine verse cascades ("Killing in the Name", "Bulls on Parade"), System of a Down rapid-switch ("Chop Suey", "B.Y.O.B."), Bad Religion double-time punk-patter, Muse "Knights of Cydonia" verse drive, Queen "Bohemian Rhapsody" operatic section, Meat Loaf "Paradise by the Dashboard Light" narrative cascades.',
  altrock:   'Modest Mouse "Float On" verse cadence, Cake "The Distance" speak-sung cascade, Cage the Elephant patter verses, Arctic Monkeys ("I Bet You Look Good on the Dancefloor" rapid-syllable verse), The Killers "Jenny Was a Friend of Mine" story-gallop, Fall Out Boy lineage.',
  punk:      'Minor Threat (straight-edge cascade), Bad Brains (sixteenth-note hardcore-reggae hybrid), Dead Kennedys ("Holiday in Cambodia" accelerating delivery), NOFX speed-patter, Descendents "Suburban Home", The Clash "Police on My Back" gallop, Green Day "Basket Case" verse compression.',
  folk:      'Bob Dylan "Subterranean Homesick Blues" — the prototype speed-folk, 20 syllables per bar with image-inventory cascade. Arlo Guthrie "Alice\'s Restaurant" (talking-blues long-form narrative). Woody Guthrie talking-blues lineage ("Talking Dust Bowl Blues"). Dave Van Ronk. Loudon Wainwright III talking narrative tradition. Modern: The Decemberists "Mariner\'s Revenge Song" story-cascade, Mumford "The Cave" verse gallop.',
  blues:     'Talking blues tradition (Woody Guthrie → Bob Dylan lineage): speak-sung rapid delivery over shuffle groove. Chris Thomas King modern speed-blues. Gary Clark Jr. verse-gallop sections. "Subterranean Homesick Blues" is officially blues-cadence on folk instrumentation.',
  reggae:    'Toasting tradition: U-Roy, Big Youth, I-Roy — dancehall DJ speed-chat. Modern: Sean Paul rapid-fire patois, Shaggy verse cadences, Busy Signal. Ragga/dancehall speed-toasting is the reggae-family version of rap cascades.',
  rnb:       'Missy Elliott rap-sung verse cascades, Mary J. Blige emotional double-time bridges, Usher "Yeah!" verse gallop with Lil Jon, modern trap-R&B triplet-riding (Bryson Tiller, Summer Walker).',
  neosoul:   'Lauryn Hill "Doo Wop (That Thing)" verse-rap cascades, Erykah Badu "Tyrone" speak-sung fast sections, Anderson .Paak rapid verse-hybrid, D\'Angelo fast conversational passages.',
  latin:     'Celia Cruz "La Vida Es Un Carnaval" verse patter, Rubén Blades narrative-salsa speed-sections, Juan Luis Guerra bachata-merengue speed-verses, Marc Anthony salsa cascades.',
  reggaeton: 'Daddy Yankee "Gasolina" verse velocity, Tego Calderón rapid Spanish-rap cascades, Don Omar verse drives, Bad Bunny fast-section builds, Anuel AA/Ozuna trap-latino triplet runs.',
  kpop:      'BTS rap-line cascades (Suga "Agust D" sixteenth-note runs, RM technical speed, J-Hope verse-gallop), Stray Kids 3racha speed sections, Epik High verse cadences, KARD rap-line bursts. K-pop rap-line is systematically trained on speed-rap technique.',
  afrobeats: 'Burna Boy verse-pidgin cascades, Wizkid rapid afrobeats-riding, Rema verse drives, Davido fast-section builds. Afrobeats speed lives in the pocket between reggae toasting and hip-hop cadence.',
  gospel:    'Kirk Franklin rap-preach break-ins ("Stomp", "Revolution"), Fred Hammond rapid call-and-response, gospel-rap lineage (Lecrae, Andy Mineo). Black preacher tradition: Rev. Jasper Williams, T.D. Jakes rhythmic crescendo-speed sections.',
  tvmusical: 'Hamilton "Guns and Ships" (Lafayette\'s verse is literal speed-rap on Broadway — 19 words per 3 seconds), "The Reynolds Pamphlet", "Non-Stop" finale, "Satisfied" reverse-chronology. Gilbert & Sullivan patter songs: "Modern Major-General", "Nightmare Song", "Matter Matter Matter". Sondheim: "Getting Married Today" (Company) — still a record-holding speed-patter. "Not Getting Married". Meredith Willson "Trouble" (The Music Man).',
  country_comedy: 'Ray Stevens fast-patter novelty songs ("The Streak", "Harry the Hairy Ape"), Roger Miller rapid-delivery verse humor. Hee Haw cornpone speed-sections.',
  parody:    'Weird Al fast-patter parodies ("Hardware Store" pure cascade, "Jurassic Park" rapid-bridge, "White & Nerdy" rap-parody speed ceiling). Flight of the Conchords rapid-switch.',
  comedy:    'Bo Burnham rapid-list comedy songs, Stephen Lynch fast-patter, Tim Minchin cascade-verses. The comedy tradition uses speed for density of jokes per bar — each line must land a beat.',
  children:  'Schoolhouse Rock! rapid-education cadences ("Just a Bill", "Conjunction Junction"), VeggieTales "Lord of the Beans" rapid-patter, The Wiggles speed-sections. Kids songs use speed to hold attention.',
  indie:     'Kate Nash rapid-verse narrative, The Streets (Mike Skinner) — British speak-sung speed-narrative, Arctic Monkeys speed-verses, Car Seat Headrest cascades.',
  edm:       'Drum & bass MC tradition (Stevie Hyper D, Skibadee — UK DnB speed-chat 200+ BPM), jungle toasting, dubstep rap-breaks (Skrillex "Bangarang" vocal chops, modern DnB vocal cascades).'
};

const SPEED_GEARS_FRAMEWORK = `SPEED GEARS SYSTEM — cadence modulation as a storytelling device.

Speed is a lever the narrator pulls — it is not a stunt or a flex. The CONTRAST between gears is where the impact lives. Every gear shift must serve the story: acceleration = escalation / panic / list-cascade / timeline-marching / physiological rush (drunk, wired, in love, being chased). Deceleration = reveal / weight / reflection / consequence landing. Never stay at max speed for a whole verse — that flattens the dynamic. Always enter and exit gears.

THE FIVE GEARS (syllables per beat):
• Gear 0 — Quarter-note (≈1 syl/beat). Weighted, declarative, anthemic. The line lands like a hammer. Use for reveals, final choruses, the breath-after-a-cascade.
• Gear 1 — Eighth-note (≈2 syl/beat). Conversational baseline. Most of a song lives here. Natural speech cadence.
• Gear 2 — Triplet (≈3 syl/beat). Rolling, hypnotic, rapping-while-dancing feel. Bone Thugs, modern trap, country-song hook-leads.
• Gear 3 — Sixteenth-note (≈4 syl/beat = "double-time"). Tight, technical, overdrive. The ceiling for most pop-adjacent styles.
• Gear 4 — Thirty-second / quintuplet / speed-rap (6–8+ syl/beat). Twista / Busta / Eminem "Rap God" / Royce / Hamilton "Guns & Ships" / Dylan "Subterranean Homesick Blues" zone. Breath-control territory.

GEAR-SHIFT BRACKET TAGS (place on own line BEFORE the affected lyric, like any delivery tag):
[Gear Up]        → shift one level faster starting here
[Gear Down]      → shift one level slower starting here
[Breakdown]      → drop to Gear 0. Full pullback — the lyric lands naked.
[Cascade]        → climb through gears in sequence (e.g. 1→2→3→4 over 4 bars)
[Double Time]    → explicit jump to Gear 3
[Triplet Flow]   → explicit jump to Gear 2
[Speed-Rap]      → explicit jump to Gear 4 (rap-family genres only)
[Breath Reset]   → one-bar pullback to Gear 1 after a cascade, then resume
[Patter]         → sustained Gear 3-4 rapid delivery (broadway / pop-patter term for the same move)
[Talking Blues]  → folk/blues rapid-speak-sung over baseline groove (Dylan/Woody lineage)

THE SEVEN USAGE RULES:
1. Gear shifts must have a NARRATIVE REASON. Before writing a shift, name the reason: escalation / reveal / list-cascade / chase-panic / physiological rush / time-compression / emotional overwhelm. If you can't name a reason, don't shift.
2. Shift at narrative joints — end of a line, beat change, section boundary. NEVER shift mid-word.
3. Maximum gear distance in one jump: 2 gears. Going 0→4 is a stunt; 1→3 is a shift. Use [Cascade] for multi-step climbs.
4. Maximum consecutive bars at Gear 4 (speed-rap / patter): 4 bars. Longer = breath-dead, listener exhausted, story lost in technique. Exception: Hamilton-style patter songs and Gilbert & Sullivan can sustain 8 bars because the genre is built for it.
5. Always exit the shift. A [Gear Up] without a matching [Gear Down] or [Breath Reset] is a one-way trip — the section won't feel like a gear, it'll feel like a new mode.
6. Gear shifts are a CROSS-GENRE tool. This is not rap-exclusive. Every genre has its own speed-cadence tradition — see GENRE LINEAGE below.
7. Speed density goes with rhyme-scheme density. Gear 3-4 verses should use internal rhymes, multisyllabic landings, consonance chains. Speed without rhyme-architecture is just rushing.`;

function buildSpeedGearsNote(genre, mood, topic, explicit) {
  // Mood-based auto-inject when the song signals escalation/urgency/cascade.
  const ESCALATION_MOODS = ['urgent','frantic','chaotic','racing','panicked','hype','celebratory','adrenaline','wired','energetic','manic','frenetic','escalating','rushed','pressured','hyped','amped','electric','breathless'];
  const moodNorm = ' ' + (mood || '').toLowerCase().replace(/[-_]/g,' ').replace(/\s+/g,' ').trim() + ' ';
  const moodSignal = ESCALATION_MOODS.some(m => moodNorm.includes(' ' + m + ' '));
  const isHipHop = genre === 'hiphop';
  // Rap genres always get the framework (they live in gears 2-3 baseline and
  // should know the full vocabulary). Other genres get it only when the user
  // explicitly picks a gear-shift structure or the mood signals escalation.
  if (!explicit && !moodSignal && !isHipHop) return '';
  const lineage = SPEED_GEARS_LINEAGE[genre] || SPEED_GEARS_LINEAGE.pop;
  const directive = explicit
    ? 'SPEED GEARS: ENABLED EXPLICITLY — this song MUST use gear-shifting. Build at least one multi-bar cascade (use [Cascade] or sequential [Gear Up] → [Gear Down] tags), then resolve back to baseline. The gear shift carries story weight — pick the moment carefully.'
    : (isHipHop
        ? 'SPEED GEARS: RAP BASELINE — you may shift freely between Gears 1-3 inside verses. Use Gear 4 ([Speed-Rap]) as a spotlight cascade max 4 bars, then [Breath Reset] or [Gear Down] back to baseline.'
        : 'SPEED GEARS: MOOD-TRIGGERED — the mood signals escalation. Consider ONE gear-shift cascade at the dramatic peak (pre-chorus lift, bridge climax, or outro build), then exit back to the genre baseline. Do not sustain max gear across the whole song.');
  return `\n\n${SPEED_GEARS_FRAMEWORK}\n\nGENRE LINEAGE FOR ${genre.toUpperCase()}:\n${lineage}\n\nAPPLICATION: ${directive}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// LYRIC TIER SYSTEM — universal demand-on-listener dial (cross-genre).
// Four tiers scale four dials together: vocabulary register, rhyme density,
// reference density, conceit depth. Each (genre × tier) gets concrete anchor
// artists so the abstract dials become specific style direction.
// Default tier is 'street' — emits no extra instruction (current baseline).
// 'archival' is the Black Thought / Joni Mitchell / Sondheim ceiling — peak
// craft density, never dumb down, rare-words permitted.
// ═══════════════════════════════════════════════════════════════════════════
const LYRIC_TIERS = {
  radio: {
    label: 'Radio',
    description: 'Immediate, universal, no demand on the listener — every line lands first listen',
    vocabulary: 'Common words only. No word the listener might pause on. Avoid archaic, academic, or rare-register words.',
    rhyme: 'Single-syllable end-rhymes are fine. No requirement for internal or multi-syllable rhymes.',
    references: 'Minimal, universal. Avoid specific cultural/historical/literary references unless they are mass-known (Sunday, Coca-Cola, summer).',
    conceit: 'Literal mostly. One controlling metaphor max, and it should be obvious. Never make the listener decode.'
  },
  street: {
    label: 'Street',
    description: 'Conversational, direct — talks to the listener like they are in the room',
    vocabulary: 'Conversational + genre slang where it fits. Mix register naturally but stay accessible.',
    rhyme: 'Two-syllable end rhymes preferred. Internal rhymes welcome but not required. End-rhymes can chain across two lines.',
    references: 'About one specific reference per 8 bars — a street name, a brand, a year, a person — to anchor the song in a real world.',
    conceit: 'One controlling conceit per song. The metaphor is clear; the listener knows what the song is about.'
  },
  conscious: {
    label: 'Conscious',
    description: 'Layered, purposeful — asks something of the listener and rewards a second listen',
    vocabulary: 'Mix registers freely. Plain language can sit next to elevated word choice when it earns its place. Code-switch when it lands.',
    rhyme: 'Three-syllable multis where natural. Internal rhymes inside the bar. Rhyme placement should reinforce meaning, not just close lines.',
    references: 'About two specific references per 8 bars — historical, literary, religious, political, named details. Each reference does work; nothing is decoration.',
    conceit: 'Two layered conceits or a controlling conceit + a counter-image. The song should have an emotional arc, not just a feeling.'
  },
  archival: {
    label: 'Archival',
    description: 'Peak-craft density — the kind of writing that gets re-listened to and quoted years later',
    vocabulary: 'Rare or elevated words are PERMITTED when they are the right word. DO NOT DUMB DOWN. Use words the genre\'s best writers would use without flinching.',
    rhyme: 'Sustained 3-4 syllable multis. Internal rhymes inside every bar. Line-spanning rhyme schemes (not just couplets). Rhyme is structural, not ornamental.',
    references: 'One or more specific references per 4 bars — named places, dated events, named figures, literary/religious/cultural allusions. Density that rewards study.',
    conceit: 'Extended conceits welcome. Hidden-subject reveal allowed — the literal answer to "what is this song about" can land in the final bar. Triple entendres should appear without flexing.'
  }
};

// Per-(genre × tier) anchor artists. The model uses these as concrete style
// targets — not subjects to imitate verbatim, but writers who operate at
// this density. Genres without a tier-specific list fall back to pop.
// Comedy/parody/children operate on a different axis (joke density) and are
// handled elsewhere — they get a minimal entry here just for safe lookup.
const TIER_ANCHORS = {
  hiphop: {
    radio:     ['Drake hits-era', 'Post Malone', 'Lil Baby radio cuts'],
    street:    ['Drake mixtape-era', 'J. Cole', 'Future'],
    conscious: ['Kendrick Lamar', 'J. Cole conscious cuts', 'Common', 'Nas (Illmatic)'],
    archival:  ['Black Thought (Funk Flex freestyle, Streams of Thought)', 'Lupe Fiasco (The Cool, Mural)', 'Talib Kweli (Quality, Train of Thought)', 'MF DOOM', 'Ka', 'Earl Sweatshirt']
  },
  pop: {
    radio:     ['Max Martin-era', 'Dua Lipa', 'Olivia Rodrigo singles'],
    street:    ['Charli XCX', 'Lana Del Rey early', 'Olivia Rodrigo album cuts'],
    conscious: ['Lorde (Melodrama)', 'Mitski', 'Phoebe Bridgers'],
    archival:  ['Kate Bush', 'Florence Welch (Lungs, Ceremonials)', 'Caroline Polachek', 'Joni Mitchell (Hejira)']
  },
  country: {
    radio:     ['Luke Combs', 'Morgan Wallen radio', 'Kane Brown'],
    street:    ['Tyler Childers', 'Zach Bryan', 'Chris Stapleton'],
    conscious: ['Kacey Musgraves', 'Sturgill Simpson', 'Brandy Clark'],
    archival:  ['John Prine', 'Jason Isbell', 'Lori McKenna', 'Townes Van Zandt', 'Guy Clark']
  },
  rnb: {
    radio:     ['Bruno Mars', 'The Weeknd hits', 'Khalid'],
    street:    ['Brent Faiyaz', 'Summer Walker', 'PartyNextDoor'],
    conscious: ['Jorja Smith', 'H.E.R.', 'SZA (Ctrl)'],
    archival:  ['Stevie Wonder (Innervisions, Songs in the Key of Life)', 'Lauryn Hill (Miseducation)', 'D\'Angelo (Voodoo)', 'Solange (A Seat at the Table)', 'Frank Ocean (Blonde)']
  },
  neosoul: {
    radio:     ['H.E.R. crossover', 'Daniel Caesar singles'],
    street:    ['Jhené Aiko', 'Bryson Tiller'],
    conscious: ['Jorja Smith', 'Cleo Sol', 'Sault'],
    archival:  ['Lauryn Hill', 'D\'Angelo', 'Erykah Badu (Mama\'s Gun, New Amerykah)', 'Bilal']
  },
  rock: {
    radio:     ['Imagine Dragons', 'Twenty One Pilots', 'Foo Fighters'],
    street:    ['Arctic Monkeys', 'The Strokes early'],
    conscious: ['Radiohead (In Rainbows)', 'Arcade Fire (Funeral)'],
    archival:  ['Bruce Springsteen (Nebraska, Born to Run)', 'Patti Smith (Horses)', 'Nick Cave', 'The Mountain Goats (John Darnielle)', 'Leonard Cohen']
  },
  altrock: {
    radio:     ['The Killers radio', 'Coldplay'],
    street:    ['Phoebe Bridgers', 'boygenius'],
    conscious: ['Radiohead', 'Arcade Fire', 'The National'],
    archival:  ['The Mountain Goats', 'Bright Eyes (Conor Oberst)', 'Sufjan Stevens', 'Nick Cave']
  },
  folk: {
    radio:     ['Mumford & Sons hits', 'The Lumineers'],
    street:    ['Noah Kahan', 'Hozier album cuts'],
    conscious: ['Hozier', 'Brandi Carlile', 'First Aid Kit'],
    archival:  ['Joni Mitchell (Hejira, Blue)', 'Bob Dylan (Blonde on Blonde, Blood on the Tracks)', 'Sufjan Stevens (Carrie & Lowell, Illinois)', 'Phoebe Bridgers (Punisher)', 'Joanna Newsom']
  },
  ss: {
    radio:     ['Ed Sheeran', 'Shawn Mendes'],
    street:    ['Noah Kahan', 'Gracie Abrams'],
    conscious: ['Brandi Carlile', 'Lori McKenna'],
    archival:  ['Joni Mitchell', 'Leonard Cohen', 'Paul Simon (Graceland, Hearts and Bones)', 'Aimee Mann']
  },
  latin: {
    radio:     ['J Balvin hits', 'Maluma', 'Karol G singles'],
    street:    ['Bad Bunny (YHLQMDLG-era)', 'Anuel'],
    conscious: ['Bad Bunny (Un Verano Sin Ti)', 'Rosalía'],
    archival:  ['Rosalía (El Mal Querer)', 'Residente (Calle 13)', 'Natalia Lafourcade', 'Juan Luis Guerra', 'Silvio Rodríguez']
  },
  reggaeton: {
    radio:     ['J Balvin', 'Karol G', 'Daddy Yankee hits'],
    street:    ['Bad Bunny early', 'Ozuna'],
    conscious: ['Bad Bunny album cuts', 'Rauw Alejandro (Saturno)'],
    archival:  ['Bad Bunny (Un Verano Sin Ti deep cuts)', 'Tego Calderón']
  },
  afrobeats: {
    radio:     ['Davido hits', 'Wizkid (Made in Lagos singles)'],
    street:    ['Burna Boy (African Giant)', 'Asake'],
    conscious: ['Burna Boy', 'Tems', 'Mr Eazi'],
    archival:  ['Burna Boy (Twice as Tall, African Giant deep cuts)', 'Fela Kuti', 'Asa']
  },
  edm: {
    radio:     ['Calvin Harris', 'David Guetta hits'],
    street:    ['Disclosure', 'Skrillex'],
    conscious: ['Bonobo', 'Caribou (Daphni)'],
    archival:  ['Four Tet', 'Burial', 'Aphex Twin', 'Jamie xx (lyrical work — Romy)']
  },
  blues: {
    radio:     ['Gary Clark Jr crossover'],
    street:    ['Black Keys', 'Gary Clark Jr'],
    conscious: ['Robert Cray', 'Keb\' Mo\''],
    archival:  ['Robert Johnson', 'Howlin\' Wolf', 'Muddy Waters', 'Skip James', 'Mississippi John Hurt']
  },
  jazz: {
    radio:     ['Norah Jones', 'Michael Bublé'],
    street:    ['Gregory Porter', 'José James'],
    conscious: ['Cécile McLorin Salvant', 'Kurt Elling'],
    archival:  ['Joni Mitchell (Mingus, Hejira)', 'Mose Allison', 'Tom Waits (Closing Time-era)', 'Leonard Cohen (jazz-adjacent late work)']
  },
  gospel: {
    radio:     ['Tasha Cobbs Leonard radio', 'CeCe Winans'],
    street:    ['Maverick City Music', 'Lecrae'],
    conscious: ['Kirk Franklin', 'Donnie McClurkin'],
    archival:  ['Mahalia Jackson', 'James Cleveland', 'Andraé Crouch', 'Marvin Sapp (lyric craft)', 'Fred Hammond']
  },
  punk: {
    radio:     ['Green Day', 'Blink-182 hits'],
    street:    ['IDLES', 'Fontaines D.C.'],
    conscious: ['IDLES (Joy as an Act of Resistance)', 'Fontaines D.C.', 'Patti Smith'],
    archival:  ['Patti Smith (Horses, Easter)', 'The Clash (London Calling, Sandinista!)', 'Fugazi', 'X (Exene Cervenka)']
  },
  metal: {
    radio:     ['Metallica radio', 'Disturbed'],
    street:    ['Slipknot', 'Lamb of God'],
    conscious: ['Tool', 'Mastodon'],
    archival:  ['Tool (Lateralus, Ænima)', 'Mastodon (Crack the Skye)', 'Opeth', 'Deafheaven (lyrical density)']
  },
  reggae: {
    radio:     ['UB40-style crossover'],
    street:    ['Chronixx', 'Protoje'],
    conscious: ['Chronixx', 'Damian Marley', 'Protoje'],
    archival:  ['Bob Marley (Exodus, Survival)', 'Burning Spear', 'Peter Tosh']
  },
  kpop: {
    radio:     ['BTS (Dynamite-era)', 'BLACKPINK singles'],
    street:    ['NewJeans', 'IVE'],
    conscious: ['BTS (Wings, MOTS:7)', 'Agust D'],
    archival:  ['Agust D (D-2, D-Day)', 'Epik High (Tablo)', 'Tablo (Fever\'s End)']
  },
  tvmusical: {
    radio:     ['Disney radio cuts'],
    street:    ['Hamilton popular tracks'],
    conscious: ['Hamilton', 'Hadestown'],
    archival:  ['Stephen Sondheim (Sweeney Todd, Sunday in the Park, Into the Woods)', 'Lin-Manuel Miranda (Hamilton density)', 'Anaïs Mitchell (Hadestown)', 'Jason Robert Brown']
  },
  children: {
    radio:     ['Disney sing-along style'],
    street:    ['Raffi', 'Laurie Berkner'],
    conscious: ['Sandra Boynton style — clever, kid-AND-parent funny'],
    archival:  ['They Might Be Giants (kids albums)', 'Andrew & Polly']
  }
};

// Returns the lyric-tier instruction block for the prompt. Default 'street'
// tier emits empty string (matches the current baseline). Higher tiers scale
// the four dials AND give the model concrete anchor artists for the
// (genre × tier) combo. Genres without a tier-specific entry fall back to pop.
function buildLyricTierNote(genre, tier) {
  if (!tier || tier === 'street') return '';
  const t = LYRIC_TIERS[tier];
  if (!t) return '';
  const anchors = (TIER_ANCHORS[genre] && TIER_ANCHORS[genre][tier])
                || (TIER_ANCHORS.pop && TIER_ANCHORS.pop[tier])
                || [];
  const anchorLine = anchors.length
    ? `\nANCHOR ARTISTS at this tier (style targets — write at this density, do not imitate verbatim): ${anchors.join(', ')}`
    : '';
  return `

🎚 LYRIC TIER: ${t.label.toUpperCase()} — ${t.description}
- VOCABULARY: ${t.vocabulary}
- RHYME / CADENCE: ${t.rhyme}
- REFERENCE DENSITY: ${t.references}
- CONCEIT DEPTH: ${t.conceit}${anchorLine}

This tier is a craft floor, not a ceiling — exceed it where the song earns it, but never write below it. If the topic is light, the tier still applies — let craft carry the weight that the subject does not.`;
}

// ═══════════════════════════════════════════════════════════════════════════
// EMOTIONAL_VELOCITY — how fast the song's emotional state changes.
// Distinct from emotional ARC (the shape of the journey). Velocity is the RATE.
//
// Example: Adele "Hello" and Bo Burnham "Welcome to the Internet" have similar
// arcs (intro → revelation → climax) but radically different velocities —
// Adele takes 4:55 to climb one hill, Bo cycles through 12 emotional registers
// in 4:44.
//
// 5 levels:
//   slow_burn      — one emotional state per minute, single peak
//   standard_arc   — one shift per section (default radio pacing)
//   cycling        — emotion rotates every 4-8 bars within a section
//   whiplash       — multiple emotional states per verse (4-bar pivots)
//   plateau_drift  — almost no change; sonic textures evolve instead
//
// Cross-genre by design — universal pacing dial. Each level has natural
// genres where it sits comfortably, plus an "intentional contrast" mode
// when the user picks an unusual velocity for a genre.
// ═══════════════════════════════════════════════════════════════════════════
const EMOTIONAL_VELOCITY = {
  slow_burn: {
    label: 'Slow Burn',
    icon: '🕯️',
    description: 'One emotional state per minute. Cathartic single peak. Patience IS the payoff.',
    sectionBehavior: 'V1+V2 same emotional state; bridge is the only meaningful shift; final chorus pays off the build. Resist mid-section pivots. The listener should feel like they\'re sinking deeper, not turning corners.',
    rule: 'EMOTIONAL VELOCITY = SLOW BURN: do NOT change emotional state every section. Hold the same feeling for 1-2 minutes before any meaningful shift. The song earns its peak through restraint, not through cycling. Bridge is the ONLY mid-song emotional pivot.',
    anchors: ['Adele "Hello"', 'Frank Ocean "Pyramids"', 'Phoebe Bridgers "Funeral"', 'Bon Iver "Holocene"', 'James Blake "Retrograde"', 'Sufjan Stevens "John Wayne Gacy, Jr."'],
    avoid: 'Multiple emotional pivots per verse, tonal contrast between every section, quick cycling between joy and sadness',
    naturalGenres: new Set(['ss','folk','rnb','neosoul','gospel','jazz','blues','country','tvmusical'])
  },
  standard_arc: {
    label: 'Standard Arc',
    icon: '⛰️',
    description: 'One shift per section — verse↔chorus tonal contrast. Default radio pacing.',
    sectionBehavior: 'Verse establishes one feeling, chorus shifts to its complement, bridge inverts both. Each section has ONE clear emotional job. No mid-section pivots, no held emotions across sections.',
    rule: 'EMOTIONAL VELOCITY = STANDARD ARC: maintain ONE clear emotional shift per section boundary. Verse contrasts chorus, bridge inverts. Don\'t hold emotions across sections; don\'t pivot mid-section. This is the default radio-friendly pacing.',
    anchors: ['Taylor Swift "Anti-Hero"', 'The Weeknd "Blinding Lights"', 'Olivia Rodrigo "Drivers License"', 'Kendrick Lamar "HUMBLE."', 'Maggie Rogers "Light On"', 'Doja Cat "Paint The Town Red"'],
    avoid: 'Holding the same emotion across V→C→V→C, skipping the bridge inversion',
    naturalGenres: new Set(['pop','rock','altrock','kpop','mandopop','latin','reggaeton','afrobeats','rnb','metal','punk','edm','country','dancehall','amapiano','brazilian','bollywood'])
  },
  cycling: {
    label: 'Cycling',
    icon: '🌀',
    description: 'Emotion rotates every 4-8 bars. Each verse moves the camera; bridge inverts.',
    sectionBehavior: 'Within each section, emotional register shifts every 4-8 bars. V1 might cycle [hopeful → doubt → resolve]. V2 cycles a different triad. Chorus can hold a single emotion as contrast. Bridge breaks the cycle entirely.',
    rule: 'EMOTIONAL VELOCITY = CYCLING: shift emotional register every 4-8 bars within each section. Each cycle is a small turn of the camera. Use specific image-anchors at each pivot. The listener feels active engagement, not passive arrival.',
    anchors: ['Phoebe Bridgers "Punisher"', 'Sufjan Stevens "Casimir Pulaski Day"', 'Big Thief "Not"', 'Bon Iver "33 \\"GOD\\""', 'Mountain Goats "No Children"', 'Mitski "Nobody"'],
    avoid: 'Holding a single emotional state for >8 bars, generic verse-to-chorus arc with no internal shifts',
    naturalGenres: new Set(['ss','altrock','folk','rnb','neosoul','tvmusical','arabesque'])
  },
  whiplash: {
    label: 'Whiplash',
    icon: '⚡',
    description: 'Multiple emotional states per verse. 4-bar pivots. Rewards close listening.',
    sectionBehavior: 'Every 4-bar block is a different emotional register. A verse might travel: nostalgic → angry → confused → resolved. Demands listener attention; rewards close listening with density.',
    rule: 'EMOTIONAL VELOCITY = WHIPLASH: each 4-bar block must occupy a DIFFERENT emotional register. Maximum 4 bars on one feeling before pivoting. Use specific image-anchors to ground each pivot so it doesn\'t feel chaotic. The whiplash is the art — the listener shouldn\'t be able to predict the next emotional turn.',
    anchors: ['Eminem "Stan"', 'Kendrick Lamar "u"', 'Bo Burnham "Welcome to the Internet"', 'Childish Gambino "This Is America"', 'Drake "Marvins Room"', 'Tyler, the Creator "EARFQUAKE"'],
    avoid: 'Holding any one emotion for more than 4 bars, vague pivots without concrete image anchors, tonal whiplash without lyrical justification',
    naturalGenres: new Set(['hiphop','comedy','parody','tvmusical','altrock','metal','punk'])
  },
  plateau_drift: {
    label: 'Plateau Drift',
    icon: '🌊',
    description: 'Almost no emotional change. Atmosphere over story. Sonic textures evolve instead.',
    sectionBehavior: 'The song holds ONE emotional state from start to finish. Sonic textures (instrumentation, ambience, layer additions) evolve to maintain interest, but the emotional baseline doesn\'t move. Lyrics reinforce the held state from different angles.',
    rule: 'EMOTIONAL VELOCITY = PLATEAU DRIFT: hold a SINGLE emotional state across the entire song. NO emotional shifts. Variation comes from PRODUCTION (added layers, ambient texture changes, dynamic swells), not from lyric pivots. The chorus is the same emotion as the verse. The listener floats in the held state.',
    anchors: ['Sigur Rós "Hoppípolla"', 'Bon Iver "22 (OVER S∞∞N)"', 'Frank Ocean "White Ferrari"', 'Cocteau Twins "Cherry-Coloured Funk"', 'Slowdive "Sugar for the Pill"', 'Beach House "Space Song"'],
    avoid: 'Verse-to-chorus emotional contrast, bridge that "reveals" or shifts, narrative arc, story progression',
    naturalGenres: new Set(['edm','altrock','rnb','jazz','neosoul','reggae','folk'])
  }
};

// Genre → recommended default velocity (used when params.emotionalVelocity is
// 'auto' — server picks the genre's natural pacing). Free-tier users always hit
// this path since they don't get the explicit dropdown.
const GENRE_DEFAULT_VELOCITY = {
  pop:'standard_arc', rock:'standard_arc', country:'standard_arc',
  hiphop:'whiplash', rap:'whiplash',
  rnb:'slow_burn', neosoul:'slow_burn', gospel:'slow_burn',
  edm:'plateau_drift', afrobeats:'standard_arc', amapiano:'plateau_drift',
  latin:'standard_arc', reggaeton:'standard_arc', dancehall:'standard_arc',
  folk:'cycling', ss:'cycling', jazz:'slow_burn', blues:'slow_burn',
  altrock:'cycling', punk:'standard_arc', metal:'standard_arc',
  reggae:'plateau_drift', kpop:'standard_arc', mandopop:'standard_arc',
  brazilian:'standard_arc', bollywood:'standard_arc', arabesque:'cycling',
  parody:'whiplash', comedy:'whiplash', children:'standard_arc', tvmusical:'cycling'
};

// Returns the velocity overlay block for the prompt. Resolves 'auto' to the
// genre's natural default, then emits the directive + anchor songs +
// natural-vs-contrast framing.
function buildEmotionalVelocityNote(genre, velocity) {
  // 'auto' resolves to genre default. Free-tier users always hit this path.
  let key = velocity;
  if (!key || key === 'auto') {
    key = GENRE_DEFAULT_VELOCITY[genre] || 'standard_arc';
  }
  const v = EMOTIONAL_VELOCITY[key];
  if (!v) return '';
  const isNatural = v.naturalGenres && v.naturalGenres.has(genre);
  const naturalNote = isNatural
    ? `This velocity is NATURAL for ${genre} — lean into the genre's normal pacing.`
    : `Note: ${v.label.toLowerCase()} is unusual for ${genre}. The contrast is intentional — keep the genre's instrumentation native while the emotional pacing breaks expectation.`;
  return `

⚡ EMOTIONAL VELOCITY: ${v.icon} ${v.label.toUpperCase()} — ${v.description}

SECTION BEHAVIOR: ${v.sectionBehavior}

${v.rule}

${naturalNote}

AVOID: ${v.avoid}.

ANCHOR SONGS at this velocity (use as PACING reference, not lyrical reference): ${v.anchors.slice(0, 5).join(', ')}.`;
}

// ═══════════════════════════════════════════════════════════════════════════
// REGION_BIBLE — cross-cutting region overlay. Combines with any genre to
// produce a regional flavor (e.g. country × Australia = bush ballad, folk ×
// Ireland = Celtic trad, hiphop × Australia = Hilltop Hoods drill).
//
// Each region carries 8 fields, with the PEJORATIVE GUARD being the most
// critical — it's the stereotype-blocking firewall that keeps regional
// flavor authentic instead of cartoonish.
//
// Coverage in this initial drop: Ireland, UK, Australia, Japan, India-Punjab,
// France, Mexico, Jamaica. Additional regions added in follow-up PRs.
// ═══════════════════════════════════════════════════════════════════════════
const REGION_BIBLE = {
  ireland: {
    label: 'Ireland',
    flag: '🇮🇪',
    vocalMarkers: 'Distinctive vowel rounding (the Irish "you" stretches into "ye", "the" softens to "deh"), "th" sometimes flattens to "t" or "d" (think → tink), gentle melodic cadence, "yeah" lengthens to "yeh-eh". Glottal stops between vowels.',
    instruments: 'Uilleann pipes, tin whistle, fiddle, bodhrán (frame drum), bouzouki, button accordion, low whistle, harp. Modern Irish: layered with rock kit / synths but the trad instruments stay audible.',
    scalarTendency: 'Mixolydian and Dorian dominate (♭7 in major; ♭3 + natural 6 in minor). Drone bass pedal tones common. Rarely uses fully-resolved V-I cadences — modal vamps preferred.',
    themes: 'Emigration and exile, the sea, drink + community, faith and doubt, family across distance, the Troubles and political memory, weather (rain as character), tracks and roads, names of specific places (Cork, Donegal, Sligo, Belfast, Dublin\'s Liberties).',
    vernacularBank: 'craic (fun/scene/news), grand (fine/good), deadly (excellent), sound (kind/decent), "fair play to ye" (well done), eejit (fool, affectionate), feck (mild expletive, non-vulgar), savage (intense/great), gas (funny), arse (used freely), the pictures (cinema), messages (groceries), now (sentence-starter, non-temporal), "would ye ever" (mild rebuke), "go away" (expressing disbelief).',
    pejorativeGuard: 'NEVER invoke: leprechauns, pots of gold, four-leaf clovers, "top o\' the morning", thatched cottages with ivy, cartoon Dublin "Oirish" accent, drunken-Irish stereotype as the JOKE (drinking can appear; the joke can\'t be that they\'re Irish AND drinking), green everything, St. Patrick\'s Day kitsch, "luck of the Irish", banshees as decorative, "diddly-eye" mockery of trad music.',
    anchorsByGenre: {
      folk:     ['Lankum', 'Lisa Hannigan', 'Glen Hansard', 'Christy Moore', 'The Dubliners', 'Mary Black', 'Damien Rice'],
      ss:       ['Glen Hansard', 'Hozier', 'Damien Rice', 'Lisa Hannigan', 'Imelda May', 'Aoife O\'Donovan'],
      rock:     ['U2', 'The Pogues', 'Thin Lizzy', 'My Bloody Valentine', 'Fontaines D.C.', 'The Cranberries'],
      altrock:  ['Fontaines D.C.', 'The Murder Capital', 'Just Mustard', 'The Frames', 'My Bloody Valentine'],
      punk:     ['The Pogues', 'Stiff Little Fingers', 'The Undertones'],
      hiphop:   ['Kojaque', 'Versatile', 'Rejjie Snow', 'Denise Chaila'],
      pop:      ['Westlife', 'CMAT', 'Soak', 'Saint Sister', 'Niall Horan']
    },
    visualCues: 'Modern Dublin terrace pubs (NOT thatched cottages), Atlantic coastal weather (greys and sea-spray, not stage-Irish green), suburban estates, Cork city streetscape, Donegal hills in winter light, kitchen tables in real homes, GAA pitches, ferries to England, Belfast murals (treated soberly, not as decoration). AVOID: shamrocks, leprechaun statues, Riverdance posters.'
  },
  uk: {
    label: 'United Kingdom',
    flag: '🇬🇧',
    vocalMarkers: 'Regional varies enormously — Cockney/East-End ("nuffink", "innit"), Northern (Manchester/Liverpool stretched vowels), RP (clipped consonants, "T"s pronounced), Welsh lilt (rising-falling phrasing), Scottish (rolled R, glottal Ts: "wa\'er" for water). Singers often sing in their natural accent (Adele, Lily Allen, Arctic Monkeys) not American-stylized.',
    instruments: 'Genre-led, but UK-coded: New-wave synths, Britpop guitar tone (jangly, mid-forward, Marshall amps), Northern brass band, drum-machine post-punk, dubstep wobble bass (UK invention), garage 2-step shuffle, grime metallic sub.',
    scalarTendency: 'Pop modal interchange common (Beatles → Radiohead lineage). Britpop = major-key swagger. Post-punk = minor + chromaticism. Folk-leaning UK = modal (Mixolydian/Dorian), parallel to Irish.',
    themes: 'Class consciousness, weather, council estates, the high street, Sunday roasts, the pub, dole queues / working life, regional identity (North vs South vs Wales vs Scotland), nostalgia for specific decades (the 70s, the 90s), motorways (M1, M62), rain.',
    vernacularBank: 'innit, mate, lad, lass, gutted, knackered, brilliant, proper (intensifier — "proper good"), mental (crazy), chuffed (pleased), bevvy (drink — Northern), the lads, on the lash (drinking), kip (sleep), naff (bad), lush (excellent — Welsh/Northern), tea (the meal — Northern), bairn (child — Northeast/Scottish), pure (intensifier — Scottish "pure dead brilliant").',
    pejorativeGuard: 'NEVER invoke: bowler hats, Big Ben as the only image, Mary Poppins, the Queen as cartoon, "cheerio", "pip pip", "spot of tea" mocking, redcoats, "stiff upper lip" as the joke, fake Cockney ("guvnor", "blimey" used unironically), Scotland reduced to bagpipes/kilts/whisky/Loch Ness, Wales reduced to dragons/sheep/coal mines.',
    anchorsByGenre: {
      pop:      ['Adele', 'Dua Lipa', 'Harry Styles', 'Sam Smith', 'Charli XCX', 'Robbie Williams'],
      rock:     ['The Beatles', 'Oasis', 'Radiohead', 'Arctic Monkeys', 'Stone Roses', 'Blur', 'The Smiths'],
      altrock:  ['Radiohead', 'The Smiths', 'Bloc Party', 'Wolf Alice', 'Black Country New Road', 'IDLES'],
      punk:     ['The Clash', 'Sex Pistols', 'IDLES', 'Sleaford Mods'],
      hiphop:   ['Stormzy', 'Skepta', 'Dave', 'Little Simz', 'Slowthai', 'Loyle Carner', 'Headie One'],
      rnb:      ['Sade', 'Jorja Smith', 'FKA Twigs', 'Sampha', 'Cleo Sol', 'Mahalia'],
      edm:      ['The Prodigy', 'Massive Attack', 'Underworld', 'Burial', 'Disclosure', 'Four Tet'],
      folk:     ['Nick Drake', 'Fairport Convention', 'Pentangle', 'Laura Marling'],
      ss:       ['Ed Sheeran', 'Sam Fender', 'Lewis Capaldi', 'Laura Marling']
    },
    visualCues: 'Rainy bus stops, terraced housing (Coronation Street feel), the Tube, motorway service stations at night, Sunday market stalls, modern London skyline + East-End pubs, Manchester canal-side, Welsh valleys in real weather. AVOID: red phone boxes as the only icon, Tower Bridge postcard shots, Beefeaters.'
  },
  australia: {
    label: 'Australia',
    flag: '🇦🇺',
    vocalMarkers: 'Flattened diphthongs ("g\'day" stretches the "a"), high rising terminal (statements end like questions), nasal forward placement, casual final consonant drop ("nothin\'"). Singers tend to KEEP the accent (Tame Impala, Courtney Barnett, Hilltop Hoods) — Americanized vocal is a giveaway of inauthenticity.',
    instruments: 'Genre-led, but Aussie pub-rock has a specific guitar tone (overdriven, Marshall, mid-heavy à la AC/DC), psych-Aussie indie (Tame Impala) leans heavy phaser/flanger + tight snare. Aboriginal traditional context: didgeridoo, clapsticks (yidaki) — handle ONLY with clear cultural context, never decoratively.',
    scalarTendency: 'Pop-major dominance for radio. Indie/psych Aussie leans modal (Tame Impala = Mixolydian + Phrygian). Pub rock = blues-pentatonic anchored. Aboriginal music doesn\'t use Western scale framework — don\'t pretend it does.',
    themes: 'Suburban paradox (sun + boredom), beach + surf culture (real, not postcard), larrikin distance (laconic understatement), heat as character, road trips through inland, working-class pride, the bush vs the city tension, multicultural Melbourne / Sydney, the cost of distance from the world.',
    vernacularBank: 'mate, no worries, arvo (afternoon), reckon, heaps (a lot), bloody (intensifier — "bloody good"), too easy, fair dinkum (genuine — used sparingly), straya (Australia, slang), servo (gas station), bottle-o (liquor store), brekkie (breakfast), maccas (McDonald\'s), thongs (flip-flops), esky (cooler).',
    pejorativeGuard: 'NEVER invoke: Crocodile Dundee, kangaroos as the only image, "g\'day mate" as the joke, Steve Irwin caricature, dingoes-eat-babies references, Aboriginal culture as decorative or generic ("tribal", "didgeridoo for atmosphere"), outback as the only landscape (most Australians live in coastal cities), "throw another shrimp on the barbie" (Australians say "prawn"), "Sheila" as casual term for woman.',
    anchorsByGenre: {
      altrock:  ['Tame Impala', 'King Gizzard & The Lizard Wizard', 'Courtney Barnett', 'Pond', 'Stella Donnelly', 'Methyl Ethel'],
      rock:     ['AC/DC', 'Cold Chisel', 'Midnight Oil', 'INXS', 'Crowded House', 'You Am I'],
      hiphop:   ['Hilltop Hoods', 'OneFour', 'The Kid LAROI', 'Drapht', 'Briggs', 'Sampa the Great'],
      pop:      ['Kylie Minogue', 'Sia', 'Troye Sivan', 'The Kid LAROI', 'Empire of the Sun'],
      country:  ['Slim Dusty', 'Keith Urban', 'Lee Kernaghan', 'Kasey Chambers', 'Troy Cassar-Daley'],
      ss:       ['Paul Kelly', 'Missy Higgins', 'Pete Murray', 'Vance Joy', 'Lior'],
      edm:      ['Flume', 'Rüfüs Du Sol', 'Empire of the Sun', 'Pendulum'],
      punk:     ['The Saints', 'Radio Birdman', 'Amyl and the Sniffers'],
      folk:     ['Paul Kelly', 'The Waifs', 'John Butler Trio', 'Kasey Chambers']
    },
    visualCues: 'Suburban Melbourne streets (Brunswick / Fitzroy aesthetic), Sydney harbor at non-postcard angles, sun-bleached petrol stations on inland highways, beach culture as worked-in routine (not posed), multicultural cafés, terrace housing, eucalyptus trees, Brisbane heat haze, surf carparks. AVOID: outback red-rock as the only landscape, Sydney Opera House postcard shots, kangaroos as decoration.'
  },
  japan: {
    label: 'Japan',
    flag: '🇯🇵',
    vocalMarkers: 'Distinct phonetic shapes — final consonants soften, vowels are pure (no diphthongs), pitch accent rather than stress accent. Code-switching with English is common in J-Pop and city pop — and STYLISTIC, not awkward. Anime-OST vocal style: precise, slightly theatrical, emotionally uninhibited. Japanese language sung lyrics work — don\'t default to all-English.',
    instruments: 'Genre-led for J-Pop / J-Rock / city-pop. Traditional context: shamisen, koto, taiko, shakuhachi (handle with cultural respect, not as flavor sprinkles). Modern J-Rock = tight Marshall guitars, fast double-kick drums, soaring vocal melodies. City pop = jazz-funk fusion synths, fretless bass, glossy production.',
    scalarTendency: 'J-Pop heavy on key changes (final-chorus modulation up a half/whole step is near-mandatory in 90s/2000s J-Pop). Frequent borrowed chords from parallel minor in major-key songs. Anime-OST chord progressions often use ♭VI - ♭VII - I uplift cadence.',
    themes: 'Youth and ephemerality (mono no aware — "the pathos of things"), school-life specificity (uniforms, festivals, end-of-year rituals), seasons as emotional markers, Tokyo / Osaka as living cities (not exotic backdrops), small shrines in suburbs, bullet trains, vending-machine bedrooms, anime/manga reference culture.',
    vernacularBank: 'KEEP code-switching natural — sprinkling of Japanese phrases inside English-anchored lyrics is fine when the song genuinely sits in J-Pop tradition (e.g. yappari, wakaranai, arigatou, konban wa). DO NOT stuff random Japanese words for exotic flavor — mishandling is worse than not using them.',
    pejorativeGuard: 'NEVER invoke: cherry blossoms as the only image, geisha as decoration, samurai as decoration, "konnichiwa" as a punchline, anime-girl tropes used sexually or mockingly, "exotic Tokyo" frame (Tokyo is a working city like London or NYC, not a wonderland), Yakuza/martial-arts as cultural shorthand, "kawaii" as a sneer, samurai swords as decorative.',
    anchorsByGenre: {
      pop:      ['Utada Hikaru', 'Kenshi Yonezu', 'Aimer', 'King Gnu', 'YOASOBI', 'Mrs. GREEN APPLE'],
      rock:     ['B\'z', 'L\'Arc-en-Ciel', 'X Japan', 'ONE OK ROCK', 'Mr. Children', 'BUMP OF CHICKEN'],
      altrock:  ['Number Girl', 'toe', 'Fishmans', 'Cornelius', 'Boris', 'Mono'],
      hiphop:   ['Nujabes', 'KOHH', 'Awich', 'Daichi Yamamoto', 'JJJ', 'BIM'],
      rnb:      ['Crystal Kay', 'Toshi Kubota', 'Suchmos', 'Yogee New Waves'],
      jazz:     ['Hiromi Uehara', 'Sadao Watanabe', 'Yamashita Tatsuro (city-pop edge)'],
      edm:      ['Yellow Magic Orchestra', 'Cornelius', 'Susumu Hirasawa', 'Towa Tei'],
      ss:       ['Yumi Matsutoya', 'Akiko Yano', 'Chitose Hajime'],
      metal:    ['X Japan', 'Dir En Grey', 'Loudness', 'BABYMETAL']
    },
    visualCues: 'Tokyo at night (Shinjuku/Shibuya neon, but DAILY use, not tourist), suburban train stations at dusk, school festival corridors, Osaka covered shopping streets, vending machines glowing in summer, small neighborhood shrines, Hokkaido snow. AVOID: Mount Fuji + cherry blossom + geisha postcard combo, samurai decor, anime-girl maid-cafe stereotype.'
  },
  india_punjab: {
    label: 'India / Punjab',
    flag: '🇮🇳',
    vocalMarkers: 'Vocal melisma (alankar) and microtonal slides (gamak) are signatures. Punjabi-specific: forward-placed nasal resonance, rhythmic emphasis on stressed syllables, hard "K"s and "T"s. Bilingual code-switching between Punjabi/Hindi/English is natural in modern Punjabi pop.',
    instruments: 'Punjabi/Bhangra: dhol, tumbi, dholki, sarangi, harmonium. Bollywood: layered orchestral arrangement, tabla, bansuri, sitar — wide palette per song. Modern Punjabi pop blends 808s + dhol — that fusion is the genre.',
    scalarTendency: 'Indian classical raga system. Quarter-tones (microtones smaller than Western half-step) appear in vocal slides. Punjabi pop tends pentatonic-heavy with raga-influenced melodic decisions. Modern fusions stay diatonic-friendly while preserving signature melodic ornaments.',
    themes: 'Punjabi: the village (pind), prosperity and hard work, pride in family/heritage, weddings and dance, tractors and fields, diaspora longing. Bollywood: love (across class, distance, religion), family duty, dance as celebration, monsoon as romantic backdrop, modern urban India alongside rural roots.',
    vernacularBank: 'Punjabi: yaar (friend), oye (hey — affectionate), bhangra (dance), pindwale (village folk), saadi (our), tere (your). Hindi: pyaar (love), dil (heart), zindagi (life), yaadein (memories), sapne (dreams). Use sparingly and only where natural.',
    pejorativeGuard: 'NEVER invoke: snake charmers, exoticized "Bombay/Mumbai", Slumdog-Millionaire-style poverty tourism, generic "Bollywood dance number" played for laughs, "namaste" as punchline, accent-mockery (the "Apu" voice is a hate symbol), Punjabi farmers reduced to caricature, religious imagery (Sikh turbans, Hindu deities) as decoration, Taj Mahal as the only image, India reduced to spice/yoga/curry.',
    anchorsByGenre: {
      pop:      ['Diljit Dosanjh', 'AP Dhillon', 'Sidhu Moose Wala', 'Karan Aujla', 'Ritviz', 'Prateek Kuhad'],
      hiphop:   ['Divine', 'Naezy', 'Raftaar', 'Seedhe Maut', 'KR$NA'],
      bollywood:['A.R. Rahman', 'Pritam', 'Vishal-Shekhar', 'Amit Trivedi', 'Shankar-Ehsaan-Loy'],
      rnb:      ['Ritviz', 'Tejas'],
      folk:     ['Gurdas Maan', 'Surinder Kaur', 'Reshma'],
      edm:      ['Nucleya', 'Ritviz', 'Lost Stories', 'Anish Sood'],
      rock:     ['Indian Ocean', 'Parikrama', 'Pentagram (India)'],
      ss:       ['Prateek Kuhad', 'Anuv Jain', 'Tejas', 'Karsh Kale']
    },
    visualCues: 'Modern Mumbai high-rises, Punjab fields with tractors at golden hour (real working farms), Delhi metro, family-wedding celebrations, village roads in Punjab, suburban Delhi/Bangalore homes. AVOID: Taj Mahal as default backdrop, "magical India" mysticism, slum poverty tourism.'
  },
  france: {
    label: 'France',
    flag: '🇫🇷',
    vocalMarkers: 'Distinct French phonetics — nasalized vowels, soft "R"s rolled in throat, intonation rises at phrase ends. French chanson tradition: parlé-chanté (half-spoken, half-sung) is a real technique. Singers often sing in French (or French-accented English).',
    instruments: 'Chanson tradition: accordion, piano, double bass, brushed drums, sometimes string quartet. French house/Eurodance: filtered-disco loops, four-on-the-floor, vocoder. Yé-yé (60s French pop): jangly guitars + breathy vocals. Modern French pop is hybridized.',
    scalarTendency: 'Major-key chanson with frequent modal interchange. French jazz (Django, Reinhardt) + gypsy-jazz harmony available. French house = filtered disco extracts, often pentatonic / blues-derived loops.',
    themes: 'Cities (Paris specifically — but real Paris, not postcard), unrequited love, philosophical melancholy, café-table observation of street life, the nuit (the night), train stations, social class commentary (gilets jaunes, banlieue tension), the South (Marseille, Provence).',
    vernacularBank: 'Bilingual code-switching feels natural in modern French pop. Common: oui, non, mon amour, ma chérie, c\'est la vie, à plus. Use only where natural.',
    pejorativeGuard: 'NEVER invoke: berets + striped shirts + baguettes combo, "ooh la la" as punchline, Eiffel Tower as the only image, Pepé Le Pew style cartoon flirtation, "snooty waiter" cliché, banlieue caricature, "smelly cheese" jokes, the Pink Panther aesthetic, mime tropes.',
    anchorsByGenre: {
      pop:      ['Stromae', 'Indila', 'Christine and the Queens', 'Angèle', 'Louane', 'Aya Nakamura'],
      hiphop:   ['Booba', 'PNL', 'Orelsan', 'Damso', 'Jul', 'IAM', 'NTM'],
      rnb:      ['Aya Nakamura', 'Dadju', 'Christine and the Queens'],
      edm:      ['Daft Punk', 'Justice', 'Cassius', 'M83', 'Phoenix', 'Air'],
      rock:     ['Phoenix', 'Indochine', 'Téléphone', 'Noir Désir'],
      jazz:     ['Django Reinhardt', 'Stéphane Grappelli', 'Henri Texier'],
      ss:       ['Jacques Brel', 'Georges Brassens', 'Léo Ferré', 'Vianney', 'Pomme'],
      folk:     ['Pomme', 'Clara Luciani', 'Eddy de Pretto']
    },
    visualCues: 'Modern Paris (Belleville, the 19th, working-class quartiers), the métro, cafés as workplaces (not tourist scenes), banlieue tower blocks (treated soberly), the South of France in real working light, cigarette breaks in winter coats, Lyon old-town, Marseille port. AVOID: Eiffel Tower postcard frame, accordion-busker stereotype, "Amelie"-aesthetic kitsch.'
  },
  mexico: {
    label: 'Mexico',
    flag: '🇲🇽',
    vocalMarkers: 'Spanish (Mexican variant) — sharp consonants, rolled R, distinct Latin-American Spanish. Vocal melisma in ranchera/banda traditions. Norteño polka feel in vocal phrasing for working-class regional music.',
    instruments: 'Mariachi: violins (2+), trumpets (2), vihuela, guitarrón, guitar. Banda: tuba, clarinet, trumpet, tambora. Norteño: accordion, bajo sexto. Modern Mexican pop blends regional with electronic + trap. Corridos tumbados (Peso Pluma era) = trap drums + acoustic guitar + tuba bass.',
    scalarTendency: 'Major-key dominance for ranchera/mariachi. Triple meter (3/4) common — rancheras and waltzes. Boleros use jazz-influenced minor key with extended chords. Modern corridos blend trap minor-pentatonic with traditional melodic ornaments.',
    themes: 'Heartbreak (la pena), pride and dignity (orgullo), family across borders, geography (specific cities — Tijuana, Monterrey, CDMX, Sinaloa), the migrant experience, faith (Virgen de Guadalupe — handle with respect), working-class hustle, fiestas, the corrido tradition (narrative ballad about real events/people).',
    vernacularBank: 'Mexican Spanish: chido (cool), neta (truth, "for real"), órale (alright/wow), wey (dude — informal), no manches (no way), padre (cool — different meaning than "father"), chamba (work), cuate (close friend), ahorita (right now).',
    pejorativeGuard: 'NEVER invoke: sombreros + cactus + serape combo, "speedy gonzales" accent mockery, mariachi as comic decoration, drug-cartel tropes as default Mexican narrative (corridos can address it but with respect for real lives), "fiesta" as the joke, día de los muertos as Halloween costume, "border-crossing" as a joke, frijoles/tacos/tequila as the only references.',
    anchorsByGenre: {
      latin:    ['Vicente Fernández', 'Pedro Infante', 'Alejandro Fernández', 'Lila Downs', 'Café Tacvba'],
      reggaeton:['Becky G', 'Karol G (collab era)'],
      hiphop:   ['Cuco', 'Santa Fe Klan', 'Cartel de Santa', 'Akwid', 'Peso Pluma (corridos tumbados)'],
      pop:      ['Thalía', 'Paulina Rubio', 'Belinda', 'Sofía Reyes', 'Danna Paola'],
      rock:     ['Café Tacvba', 'Maná', 'Caifanes', 'Jaguares', 'Los Tigres del Norte'],
      country:  ['Norteño-pop crossovers — Los Tigres del Norte, Intocable'],
      folk:     ['Lila Downs', 'Eugenia León', 'Natalia Lafourcade'],
      ss:       ['Natalia Lafourcade', 'Carla Morrison', 'Julieta Venegas'],
      jazz:     ['Magos Herrera', 'Eugenio Toussaint']
    },
    visualCues: 'Mexico City rooftops at golden hour, Monterrey industrial skyline, Tijuana border traffic, Oaxaca markets (real, daily, not staged), suburban Guadalajara streets, family kitchens with real food, Sinaloa highways, beach towns out of season. AVOID: sombrero-cactus-serape postcard, day-of-the-dead costume kitsch.'
  },
  jamaica: {
    label: 'Jamaica',
    flag: '🇯🇲',
    vocalMarkers: 'Jamaican Patois — distinct vowel system (Jamaican "ah" vs English "a"), syllabic timing (every syllable carries equal weight), specific intonation patterns. Toasting (rhythmic spoken delivery) is its own technique — predates rap.',
    instruments: 'Reggae: bass + drums first (the "riddim"), one-drop drum pattern, skanking guitar (off-beat upstrokes), Hammond organ. Dancehall: digital riddims (synth bass, programmed drums), heavier 808s in modern. Roots reggae adds horns + percussion (nyabinghi drums for Rasta context).',
    scalarTendency: 'Major-key dominance with bluesy ♭3 in vocals. Reggae chord progressions tend simple (I-IV-V or I-V-IV) — the groove and bass do the heavy lifting. The rhythmic identity is the genre.',
    themes: 'Roots and ancestry (especially Africa as spiritual homeland in Rasta context), social justice and oppression, ganja (used reverently in Rasta context, not as the joke), love and "ones-ness", island life with real working-class detail, neighborhood rivalries, dance and body, music as community.',
    vernacularBank: 'Patois: irie (good/peaceful), bredda (brother), wagwan (what\'s going on), seen (understood), bless up (farewell/blessing), "one love" (NOT a joke phrase — a Rasta affirmation), big up (respect/shout-out), bredren and sistren (community terms).',
    pejorativeGuard: 'NEVER invoke: dreadlocks as decorative (they\'re Rasta sacred), ganja/weed as the punchline, "yeah mon" as casual joke, beach-paradise stereotype only (Jamaicans live working lives), Bob Marley as cartoon, "irie" as filler, fake patois (mockery), reducing Jamaica to ganja + reggae + beach. Rasta imagery (red-gold-green flags, lion of Judah) used decoratively without context — these are religious symbols.',
    anchorsByGenre: {
      reggae:   ['Bob Marley', 'Peter Tosh', 'Burning Spear', 'Toots and the Maytals', 'Damian Marley', 'Chronixx', 'Protoje'],
      dancehall:['Vybz Kartel', 'Popcaan', 'Sean Paul', 'Buju Banton', 'Beenie Man', 'Spice', 'Shenseea'],
      hiphop:   ['Damian Marley', 'Chronixx', 'Koffee'],
      pop:      ['Sean Paul', 'Shaggy', 'Koffee', 'Shenseea'],
      rnb:      ['Lila Iké', 'Jah9', 'Etana'],
      jazz:     ['Monty Alexander'],
      folk:     ['Mento tradition (Stanley Beckford, Jolly Boys)'],
      ss:       ['Koffee (acoustic-reggae crossover)', 'Lila Iké']
    },
    visualCues: 'Kingston neighborhoods (Trench Town treated with respect, not poverty tourism), modern Jamaica (Kingston skyline, not just beaches), recording studios (Tuff Gong, dub plate culture), ganja fields treated soberly when they appear, Jamaican family life. AVOID: postcard-beach-only frame, Bob Marley merch shots, dreadlock decoration without Rasta context.'
  }
};

// Returns the region overlay block for the prompt. Combines with any genre.
// CRITICAL: includes the pejorativeGuard list — these are stereotype tropes
// the model must avoid. Without this, regional overlays slide into caricature.
function buildRegionNote(genre, region) {
  if (!region || region === 'auto' || region === 'none') return '';
  const r = REGION_BIBLE[region];
  if (!r) return '';
  const anchorList = (r.anchorsByGenre && r.anchorsByGenre[genre])
                  || (r.anchorsByGenre && r.anchorsByGenre.pop)
                  || [];
  const anchorLine = anchorList.length
    ? `\nANCHOR ARTISTS (${r.label} × ${genre}): ${anchorList.slice(0, 5).join(', ')}`
    : '';
  return `

🌍 REGIONAL OVERLAY: ${r.flag} ${r.label} — write this song authentically rooted in ${r.label}'s sound, themes, and vernacular.

VOCAL MARKERS: ${r.vocalMarkers}
INSTRUMENTS: ${r.instruments}
HARMONIC/SCALE TENDENCY: ${r.scalarTendency}
THEMES (${r.label}): ${r.themes}
VERNACULAR (use sparingly, only where natural): ${r.vernacularBank}${anchorLine}

⚠️ PEJORATIVE GUARD — DO NOT WRITE STEREOTYPES.
${r.pejorativeGuard}

This regional overlay does not override the primary genre — it FLAVORS it. A "${r.label} × ${genre}" song still follows the genre's structural rules; the region adds vocabulary, instruments, themes, and authentic voice.`;
}

// ═══════════════════════════════════════════════════════════════════════════
// MUSIC_ACADEMIA — Songwriting frameworks from real university courses
// taught by legendary artists & producers. Each framework maps to genres
// where its principles apply. Server-side mirror of the client constant.
// (Previously the client built this into local-dev prompts only — production
// went out missing all of it. This wiring fixes that.)
// ═══════════════════════════════════════════════════════════════════════════
const MUSIC_ACADEMIA = {
  lupe_fiasco_mit: {
    name: 'Lupe Fiasco — MIT "Rap Theory & Practice"',
    principles: [
      'BAR ARCHITECTURE: Every bar is a micro-composition. Count syllables per bar — density creates intensity. Sparse bars = emphasis. Dense bars = urgency.',
      'WORDPLAY LAYERING: Stack meanings — surface narrative + metaphorical subtext + phonetic wordplay in every line. Best lyrics reward 3rd listen.',
      'CONCEPTUAL COMMITMENT: Choose a central conceit and NEVER break character. "Kick Push" = skateboarding as life metaphor. Every image must serve the concept.',
      'INTERNAL RHYME DENSITY: Rhyming at end-of-line is amateur. Place rhymes mid-bar, across bars, in unexpected positions. This creates flow.',
      'NARRATIVE PERSPECTIVE: Use specific POV — not "people struggle" but "she counts the change from the vending machine". Specificity IS universality.'
    ],
    genres: ['hiphop','rap','trap','drill','conscious','spoken_word','experimental','alternative']
  },
  ninth_wonder_harvard: {
    name: '9th Wonder — Harvard "Hip-Hop Sampling" & Duke "History of Hip-Hop"',
    principles: [
      'SAMPLING AS ARCHAEOLOGY: Every beat contains a conversation with the past. Production should reference, honor, and transform its source material.',
      'DRUM POCKET THEORY: The space BETWEEN hits matters more than the hits themselves. Swing, pocket, and micro-timing create the feeling people call "groove".',
      'ARRANGEMENT AS NARRATIVE: A beat should evolve like a story — intro sets mood, verse provides context, hook delivers the thesis, bridge pivots, outro resolves.',
      'SONIC TEXTURE PALETTE: Limit your sonic palette intentionally. Soulquarians used 5-7 textures max. Too many sounds = too many characters = no story.',
      'EMOTIONAL FREQUENCY: Every key and BPM combo triggers a specific emotional frequency. Minor + slow = introspection. Major + uptempo = triumph. Know the science.'
    ],
    genres: ['hiphop','rnb','soul','neo_soul','jazz','lo_fi','boom_bap','alternative','neosoul']
  },
  questlove_nyu: {
    name: 'Questlove — NYU "Classic Albums"',
    principles: [
      'ALBUM ARC AS EMOTIONAL JOURNEY: Even a single song exists on an emotional arc. Open with tension, build expectation, deliver catharsis, leave an aftertaste.',
      'THE 3-SECOND TEST: A hit song declares itself in the first 3 seconds. An intro sound, a vocal texture, a rhythmic hook — something that says "stop and listen."',
      'IMPERFECTION AS SIGNATURE: The "mistakes" that define classics — the breath before a note, the off-grid snare, the cracked voice — these are features, not bugs.',
      'GROOVE OVER PERFECTION: Music that is mathematically perfect is emotionally dead. Leave room for human timing, for the push-pull between instruments.',
      'REFERENCE POINT THEORY: Great songs exist in conversation with 2-3 older songs. The listener may not know the references, but they feel the depth.'
    ],
    genres: ['pop','rock','rnb','soul','funk','jazz','alternative','indie','blues','country','altrock','ss','folk']
  },
  swizz_beatz_nyu: {
    name: 'Swizz Beatz — NYU "Producer as Entrepreneur/Creative"',
    principles: [
      'THE DROP PHILOSOPHY: Build tension for 4-8 bars, then REMOVE elements to create the drop. Silence is the most powerful instrument.',
      'ENERGY ARCHITECTURE: Map energy 1-10 across the entire song. Verse = 5, pre-chorus = 7, chorus = 9, bridge = 4, final chorus = 10. Never flatline.',
      'SONIC BRANDING: Every song needs ONE signature sound that makes it instantly identifiable in 2 seconds of a TikTok scroll.',
      'SIMPLICITY DOCTRINE: The best hooks are 4-6 words. The best melodies are 5-7 notes. Complexity is easy — simplicity that hits is craft.',
      'COLLISION THEORY: Put two things together that should NOT work. Classical piano + 808 bass. Gospel choir + trap hi-hats. The friction creates heat.'
    ],
    genres: ['hiphop','pop','edm','trap','dance','electropop','experimental','hyperpop','latin_trap','reggaeton','afrobeats']
  },
  gza_harvard: {
    name: 'GZA — Harvard "Science of Hip-Hop"',
    principles: [
      'LYRICAL PRECISION: Every word must earn its place. If a word can be cut without losing meaning, cut it. Dense writing = respect for the listener.',
      'CONCEPTUAL ARCHITECTURE: Structure lyrics like a chess game — opening establishes position, middle develops strategy, end delivers checkmate.',
      'VOCABULARY AS PAINT: Technical language from ANY field (science, philosophy, street, cuisine) creates unique imagery. "Liquid swords" > "sharp words".',
      'STORYTELLING THROUGH SPECIFICS: Replace every adjective with a concrete detail. Not "the hard streets" but "the stairwell where the lightbulb\'s been out since June."',
      'RHYTHM MATHEMATICS: Syllable patterns follow mathematical progressions. 8-8-8-12 creates anticipation. 12-12-8-4 creates compression. Map your syllable counts.'
    ],
    genres: ['hiphop','rap','conscious','spoken_word','experimental','alternative','drill','trap']
  },
  bun_b_rice: {
    name: 'Bun B — Rice University "Religion & Hip-Hop in America"',
    principles: [
      'CULTURAL GROUNDING: Music that endures comes from a specific place, community, and experience. Root every song in geography and lived truth.',
      'ORAL TRADITION TECHNIQUE: Rap is the latest form of oral storytelling — use techniques of repetition, call-and-response, and rhythmic emphasis from that lineage.',
      'AUTHENTICITY OVER TECHNIQUE: A perfectly delivered lie loses to a raw truth every time. Write from what you know, then learn to say it with skill.',
      'COMMUNAL RESONANCE: The best songs say something one person feels but a million people recognize. Write the specific, deliver the universal.',
      'NARRATIVE PATIENCE: Let a story breathe. Not every bar needs a punchline. Build scenes, establish characters, THEN deliver the turn.'
    ],
    genres: ['hiphop','rap','country','gospel','blues','soul','rnb','southern_rap','conscious','spoken_word','folk','ss']
  }
};

// Genre alias map — normalizes inbound genre keys to MUSIC_ACADEMIA's vocabulary
const GENRE_ACADEMIA_ALIAS = {
  'hip-hop':'hiphop', 'hiphop':'hiphop', 'rap':'hiphop',
  'r&b':'rnb', 'rnb':'rnb', 'soul':'soul',
  'neo-soul':'neosoul', 'neosoul':'neosoul', 'neo_soul':'neosoul',
  'alt-rock':'altrock', 'altrock':'altrock', 'alternative':'alternative',
  'singer-songwriter':'ss', 'ss':'ss',
  'tv/musical':'tvmusical', 'tvmusical':'tvmusical',
  "children's":'children', 'children':'children',
  'electronic':'edm', 'edm':'edm',
  'k-pop':'kpop', 'kpop':'kpop'
};

// Genre → applicable course-keys, computed once at module load
const GENRE_ACADEMIA_MAP = (function() {
  const map = {};
  Object.entries(MUSIC_ACADEMIA).forEach(([key, course]) => {
    course.genres.forEach(g => {
      if (!map[g]) map[g] = [];
      map[g].push(key);
    });
  });
  return map;
})();

// Returns up to 2 academic principles per song, rotated by a (genre+era) hash so
// the same song doesn't always get the same two principles. Tells the model these
// are guidelines, not rigid rules — apply where they elevate the song.
function buildAcademicFrameworkNote(genre, era) {
  if (!genre) return '';
  const _g = String(genre).toLowerCase().replace(/[\s\-\/]+/g, '_');
  const gKey = GENRE_ACADEMIA_ALIAS[_g] || GENRE_ACADEMIA_ALIAS[String(genre).toLowerCase()] || _g;
  const courseKeys = GENRE_ACADEMIA_MAP[gKey] || GENRE_ACADEMIA_MAP['pop'] || [];
  if (!courseKeys.length) return '';

  // Pick up to 2 courses (preferring the first match — usually the most genre-specific)
  const selected = courseKeys.slice(0, Math.min(2, courseKeys.length));
  const _era = era || 'modern';
  const hash = (gKey + _era).split('').reduce((a, c) => a + c.charCodeAt(0), 0);

  const blocks = selected.map((courseKey, ci) => {
    const course = MUSIC_ACADEMIA[courseKey];
    if (!course) return null;
    const pList = course.principles;
    const startIdx = (hash + ci * 7) % pList.length;
    const p1 = pList[startIdx % pList.length];
    const p2 = pList[(startIdx + 1) % pList.length];
    const sourceShort = course.name.split('—')[0].trim();
    return `[${sourceShort}]\n- ${p1}\n- ${p2}`;
  }).filter(Boolean);

  if (!blocks.length) return '';

  return `

🎓 ACADEMIC SONGWRITING FRAMEWORK — apply these university-level principles (from real courses taught by legendary artists/producers):

${blocks.join('\n\n')}

INTEGRATION RULES:
- These are GUIDELINES, not rigid rules — apply them where they elevate the song
- Do not name-drop the courses or instructors in the lyrics themselves
- The principles should be visible in CRAFT, not in commentary about the craft`;
}

// ═══════════════════════════════════════════════════════════════════════════
// EDGE MODE — when toggled on, the model writes with sharper teeth.
// Rawer subject matter, harder language, no radio-edit reflex. Stays inside
// the song's lyric_tier ceiling — Edge does not override an 'archival' tier
// downward into shock-value gimmickry. Edge × archival = peak craft with
// permission to bleed; Edge × radio = nothing (Radio is by definition smooth).
// ═══════════════════════════════════════════════════════════════════════════
function buildEdgeNote(edgeMode, lyricTier) {
  if (!edgeMode) return '';
  // Edge has no effect on the radio tier — radio is by definition listener-frictionless
  if (lyricTier === 'radio') return '';
  return `

🔥 EDGE MODE — write with teeth:
- PERMISSION: Profanity is allowed when it lands. Sexual frankness is allowed when it serves. Violence/menace is allowed when it earns. Do not soften for radio reflex.
- RAW SUBJECT MATTER: If the topic touches addiction, abuse, breakup mess, intrusive thought, ambition, jealousy, lust, money, faith doubt — go to the hard part of it, not the safe paraphrase.
- DICTION: Replace every hedge ("kind of", "a little", "sort of") with the actual feeling. Replace abstract emotions with concrete physical reactions ("shaking" not "nervous", "couldn't breathe" not "upset").
- NO RADIO INSTINCT: Do not self-censor mid-line. Do not reach for the family-friendly synonym. The line "I'd burn this house down for you" beats "I'd do anything for you" every time.
- TIER RESPECT: Edge is INTENSITY, not laziness. Stay inside the lyric tier's craft floor — Edge × archival means peak craft + permission to bleed; Edge × street means honest street language, not edgelord nihilism.

This song must feel risked, not safe.`;
}

// ═══════════════════════════════════════════════════════════════════════════
// BLEND_STYLE_BIBLE — per-(writing-style) bible for the Secondary Style Blend
// system. Each entry gives the model anchor artists, signature techniques to
// reach for, an explicit "do not" list (anti-stereotype/cliché), and an
// integration rule that explains how the style overlays on a primary genre
// at any blend ratio.
//
// Replaces the old anemic blend instruction ("apply X as a secondary layer")
// which gave the model nothing concrete to anchor on. Mirrors the architecture
// of TIER_ANCHORS / LYRIC_TIERS so the blend overlay is just as specific.
// ═══════════════════════════════════════════════════════════════════════════
const BLEND_STYLE_BIBLE = {
  soul: {
    label: 'Soul',
    description: 'Classic warmth, raw emotion, Motown DNA',
    anchors:    ['Aretha Franklin', 'Otis Redding', 'Marvin Gaye (What\'s Going On)', 'Sam Cooke', 'Stevie Wonder (Talking Book)'],
    techniques: ['Vocal melisma on the emotional peak — bend the note before resolving', 'Call-and-response between lead and backing vocals', 'Horn stabs answering vocal phrases', 'Hammond B3 organ swells under the chorus'],
    doNot:      ['Don\'t mistake "soul" for "loud"; restraint is the genre — Otis whispered as often as he wailed', 'Avoid generic "I feel it deep inside" tropes — soul is specific feeling about specific people'],
    integration:'Soul flavors the VOCAL DELIVERY and LYRIC EMOTIONAL CORE. The primary genre keeps its production architecture; soul rewrites how the singer carries the words.'
  },
  funk: {
    label: 'Funk',
    description: 'Groove-first, syncopated, James Brown DNA',
    anchors:    ['James Brown', 'Sly & The Family Stone', 'Parliament-Funkadelic', 'Tower of Power', 'Prince (1999-era)'],
    techniques: ['One on the one — the downbeat is sacred', 'Slap bass as melodic instrument, not just rhythm', 'Horn punches landing OFF-beat against the groove', 'Vocal ad-libs that ride the pocket without overcrowding it'],
    doNot:      ['Don\'t over-arrange — funk is space + repetition, not density', 'Don\'t intellectualize — funk is body music, lyrics serve the groove'],
    integration:'Funk flavors the RHYTHM POCKET and INSTRUMENTAL ARRANGEMENT. The primary genre keeps its lyrical content; funk rewrites how the band locks into the groove.'
  },
  lofi: {
    label: 'Lo-Fi',
    description: 'Vinyl crackle, dusty, bedroom warmth',
    anchors:    ['J Dilla (Donuts)', 'Madlib', 'Nujabes', 'Mac DeMarco (Salad Days)', 'Clairo (Diary 001)'],
    techniques: ['Vinyl crackle and tape hiss as production texture', 'Drums slightly behind the beat — Dilla swing', 'Sampled vocal chops or warm Rhodes/Wurli pads', 'Single-mic recording aesthetic; preserve "imperfections"'],
    doNot:      ['Don\'t literally write "lofi" or "bedroom" into the lyrics', 'Avoid the "study beats with rain" meme cliché'],
    integration:'Lo-fi flavors the PRODUCTION TEXTURE and DRUM POCKET. The primary genre\'s structure stays intact; lo-fi softens the edges and warms the room.'
  },
  folkworld: {
    label: 'Folk World',
    description: 'Celtic, West African, Appalachian roots',
    anchors:    ['Lankum', 'Tinariwen', 'Carolina Chocolate Drops', 'Ry Cooder (Buena Vista era)', 'Gillian Welch'],
    techniques: ['Modal harmony (Mixolydian, Dorian) instead of major/minor', 'Drone bass — open strings or sustained pedal tones', 'Region-specific instruments (uilleann pipes, kora, banjo, oud)', 'Story-ballad lyric tradition — character-driven verses'],
    doNot:      ['NEVER invoke region stereotypes — no "leprechauns", no "mystic East", no "tribal" anything', 'Don\'t namedrop world-music tropes; let the harmonic and rhythmic DNA do the work'],
    integration:'Folk World flavors the HARMONIC LANGUAGE and INSTRUMENTAL PALETTE. Pick one regional tradition — don\'t muddle three at once.'
  },
  psychedelic: {
    label: 'Psychedelic',
    description: 'Cosmic layers, woozy, exploratory',
    anchors:    ['Tame Impala', 'Pink Floyd (Dark Side era)', 'The Flaming Lips', 'King Gizzard & The Lizard Wizard', 'MGMT'],
    techniques: ['Phaser, flanger, tape echo on vocals and guitars', 'Modal interchange — chords that should not work but do', 'Lyrics that float between literal and dream-logic without committing to either', 'Sectional shifts — tempo or key change mid-song'],
    doNot:      ['Don\'t confuse "psychedelic" with "vague" — the imagery is specific, just non-linear', 'Avoid 60s pastiche unless explicitly requested — modern psych has its own vocabulary'],
    integration:'Psychedelic flavors the PRODUCTION TEXTURE and LYRICAL POV. The primary genre\'s structure can stay; psych warps it through effects and dream logic.'
  },
  gospel: {
    label: 'Gospel / Spiritual',
    description: 'Testimony, transcendence, call-response',
    anchors:    ['Mahalia Jackson', 'Kirk Franklin', 'Andraé Crouch', 'Marvin Sapp', 'Sister Rosetta Tharpe'],
    techniques: ['Testimony lyric structure: I was → God moved → I am free', 'Vocal runs that climb in stepwise increments before landing', 'Call-and-response between lead and choir', 'Modulation up a half-step on the final chorus'],
    doNot:      ['Avoid generic "lift me up" filler — gospel is specific about what was broken', 'Don\'t use gospel form to deliver secular content unless the irony is the point (and even then, be careful)'],
    integration:'Gospel flavors the VOCAL ARRANGEMENT (call-response, choir stacks) and LYRIC EMOTIONAL ARC (testimony shape). Works powerfully on R&B, soul, country.'
  },
  spoken_word: {
    label: 'Spoken Word / Slam',
    description: 'Rhythm over melody',
    anchors:    ['Saul Williams', 'Gil Scott-Heron', 'The Last Poets', 'Patti Smith', 'Kae Tempest'],
    techniques: ['Cadence is the melody — meter does the work melody usually does', 'Long lines that breathe across multiple bars', 'Internal rhyme + assonance carrying the listener forward', 'Build to one devastating image rather than a sung hook'],
    doNot:      ['Don\'t default to slam-poetry "powerful! truth!" cliché tone — specificity over rhetoric', 'Avoid forced rhyme that breaks the cadence'],
    integration:'Spoken Word flavors the VERSE DELIVERY. The primary genre still gets a sung hook (unless it\'s rap); verses tilt toward declamation.'
  },
  cinematic: {
    label: 'Cinematic / Narrative',
    description: 'Scene-setting, story arc',
    anchors:    ['Florence + The Machine', 'Hozier', 'Lana Del Rey', 'Mitski', 'Springsteen (Nebraska)'],
    techniques: ['Open with a SHOT — visual, kinetic, specific (camera enters a room or a scene)', 'Each verse advances the story; nothing is decorative', 'Bridge zooms out or reveals — the moment that reframes everything', 'Strings or piano underscore the emotional climaxes'],
    doNot:      ['Don\'t over-narrate — show, don\'t tell. "She closed the door" beats "she felt rejected"', 'Avoid generic Hollywood-cliché images (rain on windows etc.) unless used ironically'],
    integration:'Cinematic flavors the LYRIC STRUCTURE (scene → conflict → reveal) and PRODUCTION DYNAMIC (build → climax). Pairs well with rock, pop, country, indie.'
  },
  confessional: {
    label: 'Confessional',
    description: 'First-person, diary-honest, exposed',
    anchors:    ['Phoebe Bridgers', 'Elliott Smith', 'Adrianne Lenker', 'Sufjan Stevens (Carrie & Lowell)', 'Lucy Dacus'],
    techniques: ['Specific real-world details — house numbers, names, dates, weather', 'Whispered or barely-projected vocal — listener leans in', 'No metaphor unless it earns its keep — most images are literal', 'Vulnerability admitted plainly: "I\'m not okay" is allowed if surrounded by specifics'],
    doNot:      ['Avoid performance-confessional ("look how raw I am!") — real confession is quiet', 'Don\'t blanket-swap "you" for any addressee — the specific person matters'],
    integration:'Confessional flavors the LYRIC POV and VOCAL DELIVERY. Production stays in the primary genre; the singer pulls the mic close.'
  },
  political: {
    label: 'Political / Protest',
    description: 'Social commentary, rallying',
    anchors:    ['Bob Dylan (early)', 'Public Enemy', 'Rage Against The Machine', 'Kendrick Lamar (To Pimp a Butterfly)', 'Run The Jewels'],
    techniques: ['Name the structure, not just the symptom — protest songs name banks, presidents, laws by name', 'Specific examples ground the rage — "they shut the plant on Tuesday" beats "the system is broken"', 'Hook is a chant: short, repeatable, crowd-ready', 'End on action or commitment, not despair'],
    doNot:      ['Avoid vague "wake up sheeple" tone — specificity is what separates protest from venting', 'Don\'t punch down — protest punches at power, not at fellow workers'],
    integration:'Political flavors the LYRIC CONTENT and HOOK SHAPE (chant-able). Production keeps the primary genre\'s sonic identity.'
  },
  street: {
    label: 'Street Narrative',
    description: 'Vivid realism, community voice',
    anchors:    ['Nas (Illmatic)', 'Tupac (Me Against the World)', 'Mobb Deep', 'Killer Mike', 'Kendrick Lamar (Section.80, GKMC)'],
    techniques: ['Block-level specificity — name street, name corner, name year', 'Community voice — neighbors, family, the scene as character', 'Action verbs over interpretation — "he counted twenties" not "he made money"', 'Refuse the easy moral — let the listener feel the weight'],
    doNot:      ['Don\'t stereotype — real street narrative is specific and humane, not cartoonish', 'Avoid romanticizing pain without naming the cost'],
    integration:'Street flavors the LYRIC CONTENT and IMAGERY DENSITY. Pairs strongly with hip-hop, R&B, soul, country, and folk.'
  },
  surreal: {
    label: 'Surreal / Abstract',
    description: 'Dream logic, image over meaning',
    anchors:    ['Björk', 'Kate Bush', 'Caroline Polachek', 'Sufjan Stevens (Age of Adz)', 'David Bowie (Berlin trilogy)'],
    techniques: ['Images that should not connect, do', 'The literal subject is hidden until the last bar (or never revealed)', 'Sensory crossings — sound becomes color, taste becomes sound', 'Specific concrete objects placed in impossible scenes'],
    doNot:      ['Don\'t mistake "surreal" for "vague" — surreal is hyper-specific about impossible things', 'Avoid clichéd dream-imagery (clocks melting, doors to nowhere) unless reframed entirely'],
    integration:'Surreal flavors the LYRIC IMAGERY. The model writes verses that operate on dream logic while the primary genre\'s structure holds the song together.'
  },
  romantic_classic: {
    label: 'Classic Romance',
    description: 'Timeless love, poetic, elegant',
    anchors:    ['Frank Sinatra', 'Nat King Cole', 'Adele (album cuts)', 'Norah Jones', 'Sade'],
    techniques: ['Whole-song commitment to one beloved (no audience, no third party)', 'Restraint — the song earns "I love you" by saying it once, not seven times', 'Imagery from the body and the senses, not abstract emotion', 'Resolved chord movement — the love arrives'],
    doNot:      ['Avoid Hallmark-card filler ("you complete me" etc.)', 'Don\'t age-mismatch the diction — classic romance speaks like an adult, not a teenager'],
    integration:'Classic Romance flavors the LYRIC EMOTIONAL POSTURE and CHORD CHOICES (movement toward resolution). Pairs strongly with jazz, R&B, ballad-mode pop.'
  },
  minimalist: {
    label: 'Minimalist',
    description: 'Fewer words, more space, restraint',
    anchors:    ['Billie Eilish (When We All Fall Asleep)', 'James Blake', 'Frank Ocean (channel ORANGE deep cuts)', 'Bon Iver (22, A Million)', 'The xx'],
    techniques: ['Short lines — 4-6 syllables max in many cases', 'Single image per stanza, repeated or refracted', 'Production almost-empty — the silences are the song', 'Trust the listener to fill in what you don\'t say'],
    doNot:      ['Don\'t use minimalism as cover for vagueness — every word still has to earn its place', 'Avoid the "trap of profundity" — short doesn\'t mean meaningful by default'],
    integration:'Minimalist flavors the LYRIC LINE LENGTH and PRODUCTION DENSITY. Forces the primary genre to breathe.'
  }
};

// Builds the blend overlay block. Handles the 3 cases:
//   1. Genre-only blend (no writing style): describe genre fusion
//   2. Style-only blend: inject BLEND_STYLE_BIBLE entry
//   3. Both: layered overlay with explicit primary/secondary ratios
function buildBlendNote(primaryGenre, blend) {
  if (!blend || (!blend.genre2 && !blend.style2)) return '';
  const ratio = Math.max(10, Math.min(90, parseInt(blend.ratio || 70, 10)));
  const secondaryPct = 100 - ratio;
  const blocks = [];

  if (blend.genre2) {
    const g2Label = (typeof GENRE_LABELS !== 'undefined' && GENRE_LABELS[blend.genre2]) || blend.genre2;
    blocks.push(`SECONDARY GENRE: ${g2Label} (${secondaryPct}% influence)
- Borrow ${g2Label}'s rhythmic feel, instrument palette, and production texture
- The primary genre (${ratio}%) keeps its structural backbone (verse/chorus shape, hook placement, length)
- Where the two genres conflict (e.g. tempo), the primary wins; where they can layer (e.g. instrumentation), let ${g2Label} color the mix`);
  }

  if (blend.style2) {
    const bible = BLEND_STYLE_BIBLE[blend.style2];
    if (bible) {
      const anchors = bible.anchors.slice(0, 5).join(', ');
      const techs   = bible.techniques.map(t => '  • ' + t).join('\n');
      const donts   = bible.doNot.map(d => '  ✗ ' + d).join('\n');
      blocks.push(`WRITING STYLE INFLUENCE: ${bible.label} (${secondaryPct}% influence) — ${bible.description}
ANCHOR ARTISTS (style targets, do not imitate verbatim): ${anchors}
SIGNATURE MOVES TO REACH FOR:
${techs}
DO NOT:
${donts}
INTEGRATION: ${bible.integration}`);
    } else {
      // Unknown style key — fall back to a thin label-only blend
      blocks.push(`WRITING STYLE INFLUENCE: ${blend.style2} (${secondaryPct}% influence) — apply as secondary layer over the primary genre.`);
    }
  }

  return `\n\n🎨 SECONDARY STYLE BLEND — primary ${ratio}% / secondary ${secondaryPct}%:\n\n${blocks.join('\n\n')}\n\nThe blend ratio is approximate — the primary genre always wins on structure and length; the secondary leaks into vocal delivery, lyric texture, and production color.`;
}

const STRUCTURES={
  // ── General ──────────────────────────────────────────────────────────────
  standard:     '[Verse 1] → [Pre-Chorus] → [Chorus] → [Verse 2] → [Pre-Chorus] → [Chorus] → [Bridge] → [Chorus] → [Outro]',
  hookfirst:    '[Chorus] → [Verse 1] → [Chorus] → [Verse 2] → [Bridge] → [Chorus] → [Outro]',
  chorusfirst:  '[Chorus] → [Verse 1] → [Pre-Chorus] → [Chorus] → [Verse 2] → [Pre-Chorus] → [Chorus] → [Bridge] → [Final Chorus]',
  storytelling: '[Intro] → [Verse 1] → [Chorus] → [Verse 2] → [Chorus] → [Verse 3] → [Chorus] → [Outro]',
  // ── Extended narrative architectures (character-driven story songs) ──
  story_classic_3act:    '[Verse 1 — Setup: establish character, place, time] → [Chorus] → [Verse 2 — Conflict: something changes or breaks] → [Chorus] → [Verse 3 — Resolution or consequence] → [Final Chorus]',
  story_in_medias_res:   '[Verse 1 — START MID-ACTION: listener drops into the middle of the scene] → [Chorus] → [Verse 2 — BACKSTORY: how we got here] → [Chorus] → [Verse 3 — Continue from where V1 ended] → [Final Chorus]',
  story_flashback:       '[Verse 1 — Present day scene] → [Chorus] → [Verse 2 — Present day, escalating] → [Bridge — FLASHBACK: backstory reveal that reframes V1-V2] → [Verse 3 — Return to present, transformed by the reveal] → [Final Chorus]',
  story_reveal_twist:    '[Verse 1 — Narrator POV, apparent story] → [Chorus] → [Verse 2 — Same POV, more detail, building trust] → [Bridge — THE REVEAL: one line that reframes everything] → [Final Chorus — same words as opening chorus, now with new meaning]',
  story_murder_ballad:   '[Verse 1 — Innocent-seeming scene with quiet menace] → [Chorus — warning disguised as refrain] → [Verse 2 — Tension rises, characters interact] → [Chorus] → [Verse 3 — The act happens] → [Bridge — Aftermath / reveal of who died or who did it] → [Outro — The image that stays]',
  story_origin:          '[Verse 1 — Formative moment in the past, age/era specific] → [Chorus] → [Verse 2 — Growth, leaving, threshold crossing] → [Chorus] → [Verse 3 — Present-day consequence or return to origin place] → [Final Chorus]',
  story_revenge:         '[Verse 1 — The wound: what happened to narrator] → [Pre-Chorus — marking the moment] → [Chorus — declaration of intent] → [Verse 2 — The plotting, the waiting] → [Chorus] → [Bridge — The act / the confrontation] → [Final Chorus — aftermath, what the narrator has become]',
  story_conversation:    '[Verse 1 — Speaker A voice] → [Chorus — shared truth both voices reach for] → [Verse 2 — Speaker B responds, different POV on same events] → [Chorus] → [Verse 3 — Both voices together OR unresolved exchange] → [Outro]',
  story_diary:           '[Verse 1 — Dated entry #1: early in timeline] → [Chorus] → [Verse 2 — Dated entry #2: weeks or months later, same situation evolved] → [Chorus] → [Verse 3 — Final entry, present-day or closure] → [Outro]',
  story_reverse_chrono:  '[Verse 1 — The ending of the story] → [Chorus] → [Verse 2 — The middle: how it unravelled] → [Chorus] → [Verse 3 — The beginning: how it started] → [Final Chorus — returns to V1 imagery in new light]',
  gear_shift_escalation: '[Verse 1 — Gear 1 baseline conversational cadence, establish scene] → [Pre-Chorus — [Gear Up] to Gear 2, stakes tighten] → [Chorus — Gear 1 hook lands wide] → [Verse 2 — Gear 2 pocket, density rising] → [Pre-Chorus — [Cascade] through Gears 2→3→4 as timeline compresses or panic builds] → [Chorus — [Breakdown] to Gear 0, the line lands naked] → [Bridge — Gear 4 spotlight cascade max 4 bars, then [Breath Reset]] → [Final Chorus — Gear 1 resolution, the air comes back]',
  hiphop_storytelling_24: '[8-bar Intro | Spoken Word OR beat only] → [24-bar Verse 1 | Scene establishment, characters, place, time] → [24-bar Verse 2 | Conflict, escalation, stakes rising] → [24-bar Verse 3 | Climax, reveal, or consequence] → [8-bar Outro | Image that stays]',
  minimal:      '[Intro] → [Verse] → [Chorus] → [Verse] → [Chorus] → [Chorus] → [Outro]',
  epic:         '[Intro] → [Verse 1] → [Pre-Chorus] → [Chorus] → [Verse 2] → [Pre-Chorus] → [Chorus] → [Bridge] → [Break] → [Chorus] → [Outro]',
  doublechorus: '[Verse 1] → [Pre-Chorus] → [Chorus] → [Chorus] → [Verse 2] → [Pre-Chorus] → [Chorus] → [Chorus] → [Bridge] → [Final Chorus] → [Final Chorus]',
  verseonly:    '[Intro] → [Verse 1] → [Verse 2] → [Verse 3] → [Verse 4] → [Outro]',
  aaba:         '[A Section] → [A Section] → [B Bridge] → [A Section]',
  ballad:       '[Intro] → [Verse 1] → [Chorus] → [Verse 2] → [Chorus] → [Breakdown] → [Key Change] → [Final Chorus]',
  edm:          '[Intro] → [Build] → [Drop] → [Breakdown] → [Build] → [Drop] → [Outro]',
  viral:        '[Chorus (0:00)] → [Verse] → [Pre-Chorus] → [Chorus] → [Bridge] → [Final Chorus]',
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

// Structure-opening hints — when a non-standard structure is picked, give the
// model an EXPLICIT directive about which section opens the song. Without this,
// the model's training prior pulls it back to verse-first standard order even
// when the structure map clearly says "[Chorus] first". The directive overrides
// the prior. Keys that aren't here use the default (model infers from the map).
const STRUCTURE_OPENING_HINTS = {
  hookfirst:           'OPENING SECTION: this song starts with the [Chorus] at 0:00. NO intro, NO verse first. The hook lands immediately — the listener should be inside the chorus before they decide whether to keep listening. Modern streaming / TikTok strategy.',
  chorusfirst:         'OPENING SECTION: this song opens with the [Chorus]. The verse comes second. Pop-radio formula: lead with the catchy refrain, earn the verse with momentum already established.',
  viral:               'OPENING SECTION: this song starts with the [Chorus] at the 0:00 mark — designed for the first 5-7 seconds to be hookable on TikTok / Reels / Shorts. Hook lands instantly, no preamble.',
  story_in_medias_res: 'OPENING SECTION: drop the listener into the MIDDLE of the action in line 1 of [Verse 1]. No scene-setting, no establishing context — they should feel like the song is already 30 seconds into a movie when it starts. Backstory comes in V2.',
  story_reverse_chrono:'OPENING SECTION: [Verse 1] is the END of the story (the resolution / aftermath / final image). The song moves BACKWARD chronologically. Final chorus returns to V1 imagery in new light.',
  story_murder_ballad: 'OPENING SECTION: [Verse 1] is innocent-seeming with quiet menace. Do NOT telegraph the act. The listener should feel something is wrong without knowing why.',
  hiphop_storytelling: 'OPENING SECTION: skip the hook. Open with [Verse 1] — 24-32 bars of pure narrative, no chorus interruption. Slick Rick / Nas / Kendrick storytelling tradition.',
  hiphop_storytelling_24: 'OPENING SECTION: 8-bar [Intro] (spoken word OR beat only), then 24-bar [Verse 1] establishing scene/characters/place/time. Hook does NOT appear in this song.',
  verseonly:           'OPENING SECTION: [Intro] then verses only — NO chorus, NO hook, NO bridge. Folk / SS storytelling form. Each verse develops the same emotional thread.',
  edm:                 'OPENING SECTION: instrumental [Intro] builds into the [Build] section, then [Drop] is the song\'s peak moment. Lyrics may be sparse — the production carries the emotional arc.',
  aaba:                'OPENING SECTION: [A Section] is the main theme — verse + chorus combined into a single 8-bar unit. Repeats. The [B Bridge] is the only contrast.'
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
  // Singer-Songwriter substyles
  'Confessional / Diary':    { verse:'[Verse | Whispered | Specific Detail]',          hook:'[Chorus | Restrained | Emotional Center]',     extra:['[Bridge | Most Vulnerable Line]','[Outro | Fingerpicked Fade]'] },
  'Storyteller / Narrative': { verse:'[Verse | Character Setup | Scene]',              hook:'[Chorus | Refrain | Emotional Anchor]',        extra:['[Bridge | Story Turn | Reveal]','[Outro | Image That Stays]'] },
  'Folk-leaning':            { verse:'[Verse | Image-Stacked | Modal]',                hook:'[Chorus | Melodic Refrain | Open-Tuned Guitar]', extra:['[Instrumental Break | Fingerpicked]','[Outro | Drone Resolve]'] },
  'Indie-leaning':           { verse:'[Verse | Cracked Vocal | Cryptic]',              hook:'[Chorus | Repeated Phrase | Layered Texture]', extra:['[Bridge | Wordless Vocal Layer]','[Outro | Texture Fade]'] },
  'Country-leaning':         { verse:'[Verse | Conversational | Geography]',           hook:'[Chorus | Pedal Steel Lift | Singable]',       extra:['[Bridge | New Perspective]','[Outro | Steel Vamp]'] },
  'Piano-based':              { verse:'[Verse | Piano-Led | Whispered]',                hook:'[Chorus | Belted | Piano Counter-Line]',       extra:['[Bridge | Stripped to Piano Alone]','[Outro | Final Piano Line]'] },
  'Anti-folk / Lo-fi':       { verse:'[Verse | Conversational | Imperfect]',           hook:'[Chorus | Off-Hand | Refrain]',                extra:['[Tape Break | Cassette Glitch]','[Outro | Spoken Fade]'] },
  'Through-composed':        { verse:'[Movement 1 | Establishing]',                    hook:'[Movement 2 | Development]',                   extra:['[Movement 3 | Recapitulation Transformed]','[Coda | Final Image]'] },
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
  reggaeton: {
    bridge: {
      harmonic: 'Dembow pattern continues unbroken — bridge does NOT drop the boom-ch-boom-chick. Harmony shifts to relative minor (i↔♭III) or borrowed ♭VI for darkness. Often a +2 semitone key change before the final perreo drop. Auto-tune melodic break or a guest verse in a contrasting register.',
      counter: 'Reggaeton synth lead (the "rosalía" lead or a marimba pluck) takes the melodic counter while the dembow snare drives unchanged.',
      preferred_bridge: ['Rhythmic Breakdown', 'Pre-Outro Vamp Build', 'Left-Turn Narrative'],
      preferred_outro: ['Crowd Takeover', 'Cold Stop', 'Spiral Vamp'],
      preferred_verse2: ['Deeper Specific', 'Antagonist Voice', 'The Other Side'],
      preferred_prechorus: ['Velocity Surge', 'Tension Ramp', 'Call-Setup'],
      preferred_postchorus: ['Drop Groove', 'Hook Echo', 'Ad-Lib Showcase'],
      examples: '"Despacito" (Luis Fonsi/Daddy Yankee) — bridge is the rapped Daddy Yankee verse contrasting the sung hook. "Tusa" (Karol G/Nicki Minaj) — bridge is the English rap break against the Spanish hook. "Con Altura" (Rosalía/J Balvin) — bridge strips the dembow and modulates the synth lead before final drop.',
    },
  },
  folk: {
    bridge: {
      harmonic: 'Modal shift: Mixolydian ↔ Dorian, or stays diatonic but moves to relative minor (I→vi). The bridge often introduces a single new chord (♭VII or iv) that was absent from the rest of the song. No key changes — folk earns weight from lyrical revelation, not modulation.',
      counter: 'Fiddle, mandolin, or banjo plays a counter-melodic line during the bridge — the lead instrument becomes a second voice answering the vocal.',
      preferred_bridge: ['Confessional Drop', 'Lyric Callback / Recontextualise', 'Left-Turn Narrative', 'Spoken Interlude / Monologue'],
      preferred_outro: ['Callback Resolution', 'Harmonic Drift', 'Dialogue / Spoken Coda'],
      preferred_verse2: ['Time Jump', 'The Other Side', 'Deeper Specific'],
      preferred_prechorus: ['Question Drop', 'Lyric Elevator', 'Tension Ramp'],
      preferred_postchorus: ['Breath and Reset', 'Hook Echo', 'Callback Resolution'],
      examples: '"The Times They Are A-Changin\'" (Dylan) — bridge is the moral pivot where the song addresses the listener directly. "Hallelujah" (Leonard Cohen) — each verse functions as a bridge, escalating the theological weight. "The Boxer" (Simon & Garfunkel) — instrumental bridge with the famous "lie-la-lie" chant takes the song to its widest emotional point.',
    },
  },
  metal: {
    bridge: {
      harmonic: 'Breakdown chord — chugging on ♭II or open low E with palm-mute syncopation. Or: I→♭VI→♭VII→I "Iron Maiden gallop." Modulate down a semitone (rare in pop, common in metal) for darkness. The bridge often features the SOLO over a sus2 or dim7 chord progression that wouldn\'t fit anywhere else in the song.',
      counter: 'Lead guitar takes a melodic solo during the bridge — twin-guitar harmonies (in 3rds or 6ths) for melodic metal, or a single shredding line for thrash/death.',
      preferred_bridge: ['Rhythmic Breakdown', 'Escalation Climb', 'Confessional Drop'],
      preferred_outro: ['Cold Stop', 'Counter-Melody Ascent', 'Spiral Vamp'],
      preferred_verse2: ['Antagonist Voice', 'Consequence', 'Deeper Specific'],
      preferred_prechorus: ['Velocity Surge', 'Tension Ramp', 'Call-Setup'],
      preferred_postchorus: ['Drop Groove', 'Punchy Counter-Statement', 'Hook Echo'],
      examples: '"Master of Puppets" (Metallica) — clean bridge with melodic solo, then full-tilt breakdown back. "Painkiller" (Judas Priest) — bridge is twin-guitar harmony solo over double-kick. "Tornado of Souls" (Megadeth) — bridge solo is the most-discussed solo in metal, modulates through unexpected keys.',
    },
  },
  parody: {
    bridge: {
      harmonic: 'Mimics whatever pop/rock bridge convention the source genre uses — borrowed ♭VI→♭VII→I for pop parody, half-step modulation for power-ballad parody. The bridge is where the JOKE PIVOTS: the parody reveals its sharpest punchline or breaks the fourth wall. Harmony is intentionally formulaic to set up the lyric subversion.',
      counter: 'Counter-melody often becomes part of the joke — a saxophone solo where one wouldn\'t normally appear, or an absurdly serious orchestral line under a ridiculous lyric.',
      preferred_bridge: ['Left-Turn Narrative', 'Lyric Callback / Recontextualise', 'Spoken Interlude / Monologue'],
      preferred_outro: ['Callback Resolution', 'Cold Stop', 'Dialogue / Spoken Coda'],
      preferred_verse2: ['Antagonist Voice', 'Time Jump', 'The Other Side'],
      preferred_prechorus: ['Tension Ramp', 'Question Drop', 'Call-Setup'],
      preferred_postchorus: ['Hook Echo', 'Punchy Counter-Statement', 'Breath and Reset'],
      examples: '"Amish Paradise" (Weird Al) — bridge mirrors Coolio\'s spoken section but flips it into pun territory. "White & Nerdy" — bridge is a fake-aggressive rap break that doubles down on the joke. "The Saga Begins" — bridge is the dramatic emotional turn that takes the parody seriously enough to land.',
    },
  },
  comedy: {
    bridge: {
      harmonic: 'Functional simple harmony (I-IV-V or I-vi-IV-V) — bridge often shifts to a "serious" key (relative minor) to set up the punchline contrast. Or stays in the same key but slows down for a fake-emotional moment that gets undercut. The harmony serves the joke timing, not the melody.',
      counter: 'A "straight man" instrument (orchestral strings, somber piano) plays the counter-melody to highlight the absurdity above it.',
      preferred_bridge: ['Spoken Interlude / Monologue', 'Left-Turn Narrative', 'Lyric Callback / Recontextualise'],
      preferred_outro: ['Cold Stop', 'Dialogue / Spoken Coda', 'Callback Resolution'],
      preferred_verse2: ['The Other Side', 'Antagonist Voice', 'Time Jump'],
      preferred_prechorus: ['Question Drop', 'Call-Setup', 'Tension Ramp'],
      preferred_postchorus: ['Hook Echo', 'Punchy Counter-Statement', 'Breath and Reset'],
      examples: '"The Internet Is for Porn" (Avenue Q) — bridge is the spoken realisation that pivots the song. "I\'m Just Ken" (Barbie) — bridge drops to spoken vulnerability before the rock explosion. "Dick in a Box" (Lonely Island) — bridge is the fake-romantic key-change moment that sells the joke.',
    },
  },
  children: {
    bridge: {
      harmonic: 'Stays in the same key — children\'s songs prize predictability. Bridge often introduces ONE new chord (commonly IV or V7) that signals "something different is happening." Tempo may slow for a "calm down" bridge or speed up for a "get up and dance" bridge. Repetition is structural, not lazy — the bridge teaches a new pattern.',
      counter: 'A new instrument enters during the bridge — a kazoo, marimba, or character voice — that becomes the bridge identity and is referenced again in the outro.',
      preferred_bridge: ['Rhythmic Breakdown', 'Lyric Callback / Recontextualise', 'Spoken Interlude / Monologue'],
      preferred_outro: ['Callback Resolution', 'Crowd Takeover', 'Cold Stop'],
      preferred_verse2: ['Deeper Specific', 'Time Jump', 'The Other Side'],
      preferred_prechorus: ['Call-Setup', 'Tension Ramp', 'Question Drop'],
      preferred_postchorus: ['Hook Echo', 'Breath and Reset', 'Drop Groove'],
      examples: '"Baby Shark" — bridge is the family-introduction sequence that teaches the song\'s pattern. "Let It Go" (Frozen) — bridge is the harmonic and emotional climax that earns the final chorus. "We Don\'t Talk About Bruno" (Encanto) — bridge layers all character voices into a counterpoint.',
    },
  },
  brazilian: {
    bridge: {
      harmonic: 'Bossa: most harmonically adventurous genre on earth. Bridge cycles through 3-4 key areas via secondary dominants (V/ii, V/V, V/vi). Maj7, m7, 7♭9, 9♯11 voicings throughout. Samba bridge: tight 2-chord vamp (i↔V7) where the surdo and tamborim drive. MPB bridge: modulates via mediant relationships (I→♭III maj7).',
      counter: 'Bossa: classical guitar plays a contrapuntal melodic line. Samba: cavaquinho or mandolin takes the counter. MPB: cuíca or pandeiro accents the rhythmic counter.',
      preferred_bridge: ['Left-Turn Narrative', 'Lyric Callback / Recontextualise', 'Pre-Outro Vamp Build'],
      preferred_outro: ['Harmonic Drift', 'Spiral Vamp', 'Counter-Melody Ascent'],
      preferred_verse2: ['The Other Side', 'Deeper Specific', 'Time Jump'],
      preferred_prechorus: ['Harmonic Pivot', 'Lyric Elevator', 'Question Drop'],
      preferred_postchorus: ['Ad-Lib Showcase', 'Hook Echo', 'Drop Groove'],
      examples: '"Garota de Ipanema" (Jobim) — bridge modulates from F maj to D♭ maj via Gm7-C7 pivot, the most studied bridge in jazz. "Águas de Março" (Jobim/Elis) — bridge is a list-poem over descending chromatic harmony. "Mas Que Nada" (Jorge Ben) — samba bridge tightens the rhythm and adds horn-section call-and-response.',
    },
  },
  amapiano: {
    bridge: {
      harmonic: 'Log drum and shaker continue unbroken through the bridge — never strip the rhythm in amapiano. Harmony shifts to relative minor (I→vi) or adds a sustained ♭VII pad. Often a vocal hook gets "sliced and stretched" during the bridge — Auto-Tune phrase repetition with delay. The bridge is a TEXTURE shift, not a structural break.',
      counter: 'Mid-range synth pad or piano stab plays a melodic counter during the bridge — the log drum holds the floor while the pad sings above.',
      preferred_bridge: ['Pre-Outro Vamp Build', 'Rhythmic Breakdown', 'Left-Turn Narrative'],
      preferred_outro: ['Spiral Vamp', 'Counter-Melody Ascent', 'Harmonic Drift'],
      preferred_verse2: ['Deeper Specific', 'Zoom Out', 'The Other Side'],
      preferred_prechorus: ['Velocity Surge', 'Tension Ramp', 'Call-Setup'],
      preferred_postchorus: ['Drop Groove', 'Ad-Lib Showcase', 'Hook Echo'],
      examples: '"Mnike" (Tyler ICU/DJ Maphorisa) — bridge thickens the log drum and adds layered vocal chops. "Asibe Happy" (Kabza De Small/Ami Faku) — bridge is the most emotional vocal moment over softened percussion. "Woza" (Mr JazziQ) — bridge introduces a new bass slide and re-pitches the hook.',
    },
  },
  dancehall: {
    bridge: {
      harmonic: 'One-drop or steppers riddim continues — same chord (often a single i7 or i↔♭VII alternation) throughout. Bridge is delivered by a different toaster/MC OR by the same artist in a different vocal mode (sing-jay → fast chat → spoken). Harmonic shift is rare — dancehall bridges are RHYTHMIC and VOCAL contrasts.',
      counter: 'Synth horn stab or melodica plays a melodic counter during the bridge — the riddim never moves, so the horns mark the section change.',
      preferred_bridge: ['Rhythmic Breakdown', 'Left-Turn Narrative', 'Pre-Outro Vamp Build'],
      preferred_outro: ['Crowd Takeover', 'Cold Stop', 'Spiral Vamp'],
      preferred_verse2: ['Antagonist Voice', 'Deeper Specific', 'Consequence'],
      preferred_prechorus: ['Call-Setup', 'Velocity Surge', 'Tension Ramp'],
      preferred_postchorus: ['Drop Groove', 'Hook Echo', 'Punchy Counter-Statement'],
      examples: '"Dem Bow" (Shabba Ranks) — the bridge IS the rhythmic blueprint that reggaeton later borrowed. "Murder She Wrote" (Chaka Demus & Pliers) — bridge switches from sing-jay to fast chat over the same riddim. "Romping Shop" (Vybz Kartel/Spice) — bridge swaps lead vocalists, riddim never moves.',
    },
  },
  bollywood: {
    bridge: {
      harmonic: 'Antara section (the Indian "bridge" equivalent): modulates UP via mediant — moves from sthayi (verse) to a higher tessitura with a new raga colour. Often introduces a borrowed komal (flat) note from the parallel raga. Tabla maintains the taal (cycle) but a new instrumental line takes the lead.',
      counter: 'Sitar, sarangi, bansuri, or shehnai plays a counter-melody during the antara — Bollywood treats the bridge as the showcase moment for the orchestral or folk-instrument soloist.',
      preferred_bridge: ['Escalation Climb', 'Pre-Outro Vamp Build', 'Lyric Callback / Recontextualise'],
      preferred_outro: ['Spiral Vamp', 'Crowd Takeover', 'Counter-Melody Ascent'],
      preferred_verse2: ['Deeper Specific', 'The Other Side', 'Time Jump'],
      preferred_prechorus: ['Lyric Elevator', 'Tension Ramp', 'Harmonic Pivot'],
      preferred_postchorus: ['Ad-Lib Showcase', 'Hook Echo', 'Drop Groove'],
      examples: '"Tum Hi Ho" (Aashiqui 2) — antara modulates up and the strings take the melodic lead. "Chaiyya Chaiyya" (Dil Se) — bridge is a percussion-led rhythmic break that adds dholak intensity. "Kal Ho Naa Ho" (title track) — antara introduces the philosophical pivot before the final mukhda.',
    },
  },
  arabesque: {
    bridge: {
      harmonic: 'Maqam-based modal modulation — typically shifts from one maqam family to another via a shared pivot tone (Hijaz → Bayati, Rast → Saba). Quarter-tone (sika, half-flat) inflections appear in the bridge that were absent in the verse. Tempo often slackens into rubato (free time) for a vocal taqsim (improvised solo).',
      counter: 'Oud, ney (reed flute), or qanun plays the bridge taqsim — the melodic instrument improvises a counter-line that responds to the vocalist\'s last phrase.',
      preferred_bridge: ['Confessional Drop', 'Pre-Outro Vamp Build', 'Lyric Callback / Recontextualise', 'Spoken Interlude / Monologue'],
      preferred_outro: ['Harmonic Drift', 'Spiral Vamp', 'Counter-Melody Ascent'],
      preferred_verse2: ['Deeper Specific', 'The Other Side', 'Consequence'],
      preferred_prechorus: ['Lyric Elevator', 'Whisper to Roar', 'Question Drop'],
      preferred_postchorus: ['Ad-Lib Showcase', 'Hook Echo', 'Breath and Reset'],
      examples: '"Enta Omri" (Umm Kulthum) — the bridge is the maqam modulation moment that Arab audiences wait an hour for. "Nour El Ein" (Amr Diab) — bridge introduces a new oud counter-melody and modulates briefly into Hijaz. "Habibi Ya Eini" — bridge is a vocal mawwāl (improvised passage) over sustained drone.',
    },
  },
  mandopop: {
    bridge: {
      harmonic: 'Often the most dramatic key change in any modern pop tradition: +1 to +3 semitone modulation via secondary dominant (V/V → I in new key). Bridge introduces extended chords (maj7, add9) absent from the rest of the song. Sometimes a "rap break" — but the rap is highly melodic and rides the existing chord progression.',
      counter: 'String section (often Erhu for Chinese-coded ballads, full strings for cosmopolitan ballads) plays a sweeping counter-melody during the bridge — the cinematic moment.',
      preferred_bridge: ['Escalation Climb', 'Confessional Drop', 'Emotional Reversal', 'Lyric Callback / Recontextualise'],
      preferred_outro: ['Callback Resolution', 'Crowd Takeover', 'Counter-Melody Ascent'],
      preferred_verse2: ['Consequence', 'Deeper Specific', 'Time Jump'],
      preferred_prechorus: ['Lyric Elevator', 'Tension Ramp', 'Harmonic Pivot'],
      preferred_postchorus: ['Ad-Lib Showcase', 'Hook Echo', 'Punchy Counter-Statement'],
      examples: '"童話" (Fairy Tale, Michael Wong) — bridge modulates up and strings sweep into the climactic final chorus. "說好不哭" (Won\'t Cry, Jay Chou/Ashin) — bridge is the duet pivot where both vocalists trade emotional lines. "光年之外" (Light Years Away, G.E.M.) — bridge is the harmonic and dynamic peak before the final chorus.',
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
    graftGenre = '', graftSection = 'chorus', invertCounter = false,
    coachInstruction = '', originalLyrics = '', aggression = ''
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

  // Blend — secondary genre + writing style influence (rewritten to inject the
  // BLEND_STYLE_BIBLE for writing styles + concrete sonic guidance).
  const blendNote = buildBlendNote(genre, blend);

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

  const lyricCraftNote = buildLyricCraftNote(genre, mood, topic);
  // Speed-gears auto-triggers when the user picks the gear-shift structure
  // or the mood signals escalation; hip-hop always gets the framework.
  const speedGearsExplicit = structure === 'gear_shift_escalation';
  const speedGearsNote = buildSpeedGearsNote(genre, mood, topic, speedGearsExplicit);
  const lyricTierNote = buildLyricTierNote(genre, params.lyricTier);
  const academicNote = buildAcademicFrameworkNote(genre, era);
  const edgeNote = buildEdgeNote(params.edgeMode, params.lyricTier);
  const regionNote = buildRegionNote(genre, params.region);
  const velocityNote = buildEmotionalVelocityNote(genre, params.emotionalVelocity);

  const platinumNote = platinum ? buildTopTierNote(genre) : '';
  const adlibNote = buildAdlibNote(genre);
  const vocalStackNote = buildVocalStackNote(genre);

  const _aggrMap = {
    mellow: 'Mellow — laid-back, conversational, introspective energy throughout. No raised voices, no confrontation. Deliver emotion through restraint and precision. Think Chance the Rapper intimate mode, early Drake confessional, Kendrick reflective.',
    heat:   'Heat — elevated intensity, confrontational urgency in every bar. The verse should feel like it is building toward something that could explode. Think Kendrick "HUMBLE." / Future menace / City Girls unapologetic. Every line has a point to prove.',
    rage:   'Rage — maximum aggression throughout. Every line hits like a threat or a demand. No softness, no hesitation — pure unfiltered force. Think Eminem "Till I Collapse," DMX bark, early Chief Keef cold menace, NF uncontained fury.'
  };
  const aggressionNote = genre === 'hiphop' && _aggrMap[aggression] ? `\n\nAGGRESSION LEVEL — ${_aggrMap[aggression]}` : '';

  // Coach-driven rewrite directive — injected at the TOP of the prompt so the
  // model treats this as a fix-and-improve job, not a fresh-page generation.
  // The original lyrics + coach feedback are passed in; the model is told to
  // address every weakness identified, while preserving topic + intent.
  const _coachI = (coachInstruction && typeof coachInstruction === 'string') ? coachInstruction.trim().slice(0, 4000) : '';
  const _origL  = (originalLyrics && typeof originalLyrics === 'string') ? originalLyrics.trim().slice(0, 6000) : '';
  const coachRewriteNote = (_coachI && _origL) ? `

🎓 COACH-DRIVEN REWRITE — this is NOT a fresh-page generation. You are rewriting an existing song to address specific weaknesses identified by an AI feedback coach. Preserve the topic + emotional intent; transform craft.

ORIGINAL LYRICS (the version that was analyzed):
${_origL}

COACH FEEDBACK (every weakness identified MUST be addressed in your rewrite):
${_coachI}

REWRITE RULES:
- Address EVERY weakness the coach identified — do not cherry-pick.
- Preserve the topic, emotional arc, and any imagery anchors that worked.
- The rewrite should feel like the SAME song made better, not a different song. A listener who knew the original should recognize the bones and feel the upgrade.
- If the coach identified a weak hook, rewrite the hook. If the coach said V2 = V1 in synonyms, rewrite V2 along a new axis. If the coach said the opening was weak, replace it.
- The full Soniq craft system below ALSO applies — lyric tier, region, edge, academic frameworks, craft mechanics. Apply them on top of the coach fixes.
- Do NOT include the coach feedback or the original lyrics in your output. Only emit the rewritten song in the standard format.

` : '';

  const prompt = `Write a complete, production-ready ${genreLabel} song at the highest possible level of craft.
${coachRewriteNote}${buildCraftFirewallNote()}

Genre: ${genreLabel}
Topic: ${topic}
Mood: ${mood}
Vocal style: ${vocal}
Structure: ${structStr}${STRUCTURE_OPENING_HINTS[structure] ? '\n\n⚠ ' + STRUCTURE_OPENING_HINTS[structure] : ''}
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
- ⚠️ HARD LIMIT — SUNO 5000-CHAR CAP (NON-NEGOTIABLE):
  The total lyrics you output MUST stay under 4900 characters. 5000 is Suno's literal wall; treat 4900 as the ceiling to leave a 100-char safety margin.
  Count EVERY character including [Section] tags, newlines, parentheses, ad-libs — everything between the LYRICS: header and the SONG PROMPT: header.
  BUDGET GUIDE (pick the row matching your song length):
    Short  (≈2 min, indie/acoustic/comedy):                         aim 1800–2500 chars
    Medium (≈3 min, most pop/country/rock):                         aim 2800–3600 chars
    Long   (≈4 min, standard hip-hop/full-band):                    aim 3600–4400 chars
    Epic   (≈5 min+, Sicko Mode / beatswitch / multi-movement):     aim 4400–4900 chars (NEVER cross 4900)
  If your first draft is over 4900: cut repeated chorus/hook occurrences (keep first two + the final one, drop middle repeats), shorten the bridge, trim the outro, drop extra verses (V3/V4/V5 first).
  COUNT your total character output BEFORE you emit the SONG PROMPT section. If over 4900, rewrite before submitting. Going over silently LOSES bars — the end of your song will be cut off in Suno.
- NO EM DASHES: Never use em dashes (—) anywhere in the lyrics. End lines with a word, not a dash. For pauses use a comma or ellipsis (...). For connective phrasing use a comma. Em dashes break Suno's text parsing.${syllableNote}${rhymeNote}${eraVocNote}${eraUndertoneNote}${breakRuleNote}${graftNote}${invertCounterNote}${keyPsychNote}${dualPerspNote}${avoidNote}${specificityNote}${lyricCraftNote}${speedGearsNote}${lyricTierNote}${academicNote}${edgeNote}${regionNote}${velocityNote}${aggressionNote}${preChorusNote}${bridgeNote}${verse2Note}${postChorusNote}${outroNote}${platinumNote}${adlibNote}
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
⚠️ SUNO COMPLIANCE — MANDATORY: Every field below AND the Full prompt must contain ZERO artist names, band names, or "[Name] style" references. Suno's policy rejects prompts that name specific artists as potential impersonation. If the PRODUCTION LOCK above contains any artist name, STRIP IT OUT and replace with an equivalent descriptive phrase (era, region, production technique, vocal quality, genre lineage). Examples:
  BAD: "Drake style, Taylor Swift melodic vocal"
  GOOD: "intimate melodic pop vocal, auto-tuned conversational delivery"
  BAD: "Kendrick Lamar conscious trap, J Cole philosophical"
  GOOD: "philosophical trap, 808s under literary bars, dark minor-key piano"
  BAD: "E-40 Mac Dre Keak da Sneak vocabulary"
  GOOD: "Bay Area hyphy slang, Oakland scraper-bass vocabulary, hella-energy ad-libs"
Genre: [core genre + sub-genre, no artist names]
Instruments: [4-5 key instruments, comma-separated]
BPM: [range, e.g. 95-100]
Vocal: [vocal descriptor — no artist names]
Texture: [production texture in 5-8 words — no artist names]
Counter-melody: [counter-melody device]
Full prompt: [assemble all of the above into one ready-to-paste string under 440 characters — ABSOLUTELY NO artist names, band names, or "[Name] style" references]

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
  // Lucky gets the full lyric craft toolkit — money lines, hook kernels, opening/
  // closing gravity, storytelling craft, comedy craft (mood-gated). Same builder
  // used by Writer and Rap Lab so Lucky songs match their craft ceiling.
  const lyricCraftNote = buildLyricCraftNote(g1, mood, topic);
  const speedGearsNote = buildSpeedGearsNote(g1, mood, topic, structure === 'gear_shift_escalation');
  const lyricTierNote = buildLyricTierNote(g1, params.lyricTier);
  const velocityNote = buildEmotionalVelocityNote(g1, params.emotionalVelocity);
  const academicNote = buildAcademicFrameworkNote(g1, params.era);
  const edgeNote = buildEdgeNote(params.edgeMode, params.lyricTier);
  const regionNote = buildRegionNote(g1, params.region);

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
${buildCraftFirewallNote()}

Fusion style: ${fd?.name || g1 + ' × ' + g2}
${fd?.name ? 'Fusion style: ' + fd.name : 'Blend both genres authentically.'}
Topic: ${topic}
Mood: ${mood}
Vocal style: ${vocal}
Structure: ${structStr}${STRUCTURE_OPENING_HINTS[structure] ? '\n\n⚠ ' + STRUCTURE_OPENING_HINTS[structure] : ''}${outlierNote ? `\n\nRULE-BREAKING INSPIRATION:\n${outlierNote}\nUse these as permission: if the emotional truth demands it, break a rule.` : ''}${lyricCraftNote}${speedGearsNote}${lyricTierNote}${academicNote}${edgeNote}${regionNote}${velocityNote}

SONGWRITING RULES:
- Hook within 30 seconds · Chorus max 10 syllables · Verse 8-13 syllables
- Specific imagery only — no clichés · Zeigarnik effect in chorus
- Dynamic contrast: verse lower energy than chorus
- Bridge must be a new perspective · Last chorus bigger than first
- Every section MUST start with its bracket tag on its own line.
- ⚠️ HARD LIMIT: Total lyrics under 4900 chars (Suno caps at 5000, 100-char safety margin). Count every character including [Section] tags, newlines, ad-libs. If over, cut repeated chorus/hook repeats (keep first two + final), shorten bridge, drop extra verses. Going over SILENTLY LOSES bars in Suno — the song gets truncated.
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
⚠️ SUNO COMPLIANCE — MANDATORY: ZERO artist names, band names, or "[Name] style" references. Suno rejects prompts that name artists. If a PRODUCTION LOCK above contains any artist name, STRIP IT and replace with era/region/technique/vocal-quality descriptors.
  BAD: "Drake style, Taylor Swift vocal", "E-40 energy", "Kirk Franklin choir"
  GOOD: "auto-tuned intimate pop vocal", "Bay Area hyphy slang", "celebratory hip-hop gospel choir"
[Under 440 chars. Core genre + sub-genre feel, key instruments (4-5), BPM range, tempo feel, vocal descriptor, production texture, counter-melody device. MUST use the same production vocabulary as the TYPE 3 bracket tags in the lyrics.]

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
  },
  'anthem-rap': {
    label: 'Anthem Rap', category: 'established', era: '1990s–present',
    agent: 'You are an anthem-rap triumph architect. First-person struggle sublimated into collective victory — every verse is the come-up, every hook is the crowd completing the chant. Think Jay-Z "Public Service Announcement," Eminem "Lose Yourself," Kanye "POWER," Rick Ross "B.M.F.," Meek Mill "Dreams and Nightmares," DMX "Ruff Ryders\' Anthem." The bars stay specific (names, places, dollar amounts, years) but the emotional arc is universal — doubters silenced, survival earned, walk-out music. Production is cinematic: thundering drums, orchestral or choral elements, 808s that feel like event entrances, hooks engineered for 30,000-person singalongs. 85-100 BPM typical, often with a half-time breakdown on the bridge. Key anthem rules: (1) Verse 1 establishes the specific struggle with receipts — years, locations, numbers. (2) Hook is chant-able — short, percussive, completable by a stranger on first listen. (3) Verse 2 widens from "me" to "we" — the listener joins the army. (4) Bridge or final verse is the victory declaration. NOT conscious rap (no essays, no academic register). NOT bragging (no designer drops, no flex-for-flex). Chest-out defiance that earns its confidence through specificity of struggle. You write for the moment someone ties their shoes tighter before doing the hard thing.',
    defaults: { flow: 'on-beat', rhymeArch: 'multi-syllabic', density: 'medium', vocabRegister: 'street-coded', persona: 'collective-we' }
  },
  'hustle-grind-rap': {
    label: 'Hustle / Grind', category: 'established', era: '1990s–present',
    agent: 'You are a hustle-grind chronicler. The come-up documented in real time — you\'re not bragging about the destination, you\'re narrating the climb. Think Nipsey Hussle "Dedication," Jeezy "Trap or Die," Meek Mill "Dreams Worth More Than Money," Pusha T "Numbers on the Boards," Rick Ross Teflon Don era. Specific imagery: late nights, missed family time, doubters named (even if obliquely), dollar amounts disclosed, territory claimed. Production: soulful samples or trap production, both work — the constant is that the beat feels earned, not inherited. 80-95 BPM. Lyrical rules: (1) Every verse contains at least one piece of verifiable biographical evidence (year, location, job, name). (2) Hook names the grind itself — "still up," "on my grind," "coming up." (3) Gratitude alongside defiance — the hustler thanks the ones who believed AND names the ones who didn\'t. (4) NOT trap flex (not about the Rolex, about the shift that paid for the Rolex). Writing register: street-coded but literate, first-person, emotionally direct. The listener should finish the song feeling like they know what it cost.',
    defaults: { flow: 'conversational', rhymeArch: 'multi-syllabic', density: 'medium', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  'midwest-soul': {
    label: 'Midwest', category: 'established', era: '2000–present',
    agent: 'You are a Midwest soul-rap architect. Chipmunk soul samples — the backbone of Kanye West\'s early production (College Dropout through Graduation), Common\'s Be, Lupe Fiasco\'s Cool. Chicago and Detroit lineage: soul vocal chops pitched high, dusty vinyl drums, chords that feel warm and nostalgic even when the bars are hard. Emotional vulnerability sits alongside street realism without contradiction. Twista-style hyperspeed flow can live in this space too — speed as craft, not gimmick. Writing rules: (1) The sample should feel like a ghost in the mix — an old soul vocalist phrasing the emotion the rapper is about to verbalize. (2) Verses can be conversational or technical but always return to emotional truth. (3) Chicago or Detroit specificity welcome (locations, Black cultural references, church imagery from Kanye\'s gospel lineage, Detroit auto-industry references). (4) NOT conscious rap (not academic, not preaching — feels personal). NOT boom bap (samples are pitched up / chopped, not loop-based). The soul sample is the emotional narrator underneath the rap. Artists: Kanye West (College Dropout, Late Registration, Graduation), Common, Lupe Fiasco, Twista, Chance the Rapper, Big Sean (Detroit), early Royce Da 5\'9", Rhymefest, No I.D. production tradition.',
    defaults: { flow: 'conversational', rhymeArch: 'internal', density: 'medium', vocabRegister: 'conscious-literary', persona: 'first-person-raw' }
  },
  'hyphy': {
    label: 'Hyphy Rap', category: 'established', era: '2003–present',
    agent: 'You are a Hyphy-movement Bay Area architect. Oakland, Vallejo, Richmond origin — E-40, Mac Dre, Keak da Sneak, Mistah F.A.B., Too $hort elder statesman energy, The Federation, Turf Talk. Scraper bass, hella energy, sideshow culture, ghost-riding the whip. This is EXPLICITLY NOT G-Funk (slow, laid-back, Dr. Dre Pacific-Coast cruising) — Hyphy is UPTEMPO 100-115 BPM, frenetic, breathless, crowd-focused. Slang is central: "hella," "thizz," "yadadamean," "stunna," "ghost ride the whip," "going dumb," "get hyphy," "turf," "slap," "fed" (Federation). Ad-libs are not decoration — they are a core feature: "YEEE," "WHOOP WHOOP," sharp shouts, grunts, self-hype interjections woven mid-bar. Hook is a crowd chant with spaces for call-and-response. Production: synth stabs, scraper bass (rolling low-end that literally sounds like a car rattling on the freeway), hand claps, hi-hat rolls but NOT trap-style triplets. Writing rules: (1) Every verse contains at least one Bay Area place name (Oakland, Vallejo, Hunters Point, the 580, E-14th, Port of Oakland). (2) Ad-libs woven through bars, not just at the end. (3) Hook is chantable with air for the crowd to finish. (4) NOT G-Funk — never slow-roll, never laid-back, never Pacific-Coast-cruising vibes. Artists: E-40, Mac Dre, Keak da Sneak, Mistah F.A.B., Too $hort, The Federation, Turf Talk, Messy Marv, San Quinn, Kafani.',
    defaults: { flow: 'double-time', rhymeArch: 'end-only', density: 'dense', vocabRegister: 'street-coded', persona: 'collective-we' }
  },
  'latin-urbano': {
    label: 'Latin Rap', category: 'established', era: '1990s–present',
    agent: 'You are a Latin rap cultural bridge — spanning Big Pun/Fat Joe\'s boom-bap 90s Nuyorican era through Bad Bunny / Anuel AA / Myke Towers\' modern dembow-trap fusion. The defining trait is LANGUAGE FLUIDITY: Spanish bars, English bars, and Spanglish within the same 16. Barrio metaphors, family references (Mamá, abuela, papi, tío), occasional Catholic imagery (La Virgen, saints, rosaries), immigration and first/second-generation identity themes. Production is NOT boom bap alone (classic era) and NOT straight trap (modern era) — it\'s the INTERSECTION: dembow drum patterns under 808 bass, or trap hi-hats over reggaeton-coded percussion. Horns (salsa stabs), accordion (for cumbia-adjacent tracks), or vintage Latin piano samples layered when appropriate. Tempo 85-100 BPM. Writing rules: (1) At least one full bar in Spanish per verse — not a literal translation of an English bar, but a thought that only works in Spanish (idiom, cultural specificity, rhythmic feel). (2) Cultural specificity — NOT generic "Latin," but Puerto Rican OR Dominican OR Mexican OR Cuban OR Colombian identity named or implied through context. (3) NOT boom bap (not 90s NY sample-loop culture alone). NOT straight trap (not Atlanta/Memphis coded alone). The dembow IS audible in the drums. Artists: Big Pun, Fat Joe (Terror Squad era), Bad Bunny (YHLQMDLG), Anuel AA, Ozuna (rap tracks), Myke Towers, Cypress Hill (B-Real Spanish tracks), Residente / Calle 13, Daddy Yankee (rap tracks), French Montana (Moroccan-diaspora parallel).',
    defaults: { flow: 'syncopated', rhymeArch: 'internal', density: 'dense', vocabRegister: 'street-coded', persona: 'first-person-raw' }
  },
  'conscious-trap': {
    label: 'Conscious Trap', category: 'revisionist', era: 'Trap × Kendrick',
    agent: 'You are a conscious-trap philosopher. 808 bass and triplet hi-hats carrying LYRICAL depth that would have lived in boom-bap conscious rap fifteen years earlier. The Kendrick Lamar, J. Cole, Rapsody, Vince Staples, Noname, Saba tradition: trap production as the vehicle for themes of systemic injustice, mental health, internal contradiction, race and class, personal accountability, generational trauma. Importantly: this is NOT trap-soul (which is emotional vulnerability over trap infrastructure). This is trap with BRAIN — analytical, observational, willing to sit with uncomfortable complexity, willing to critique the self as loudly as the system. Writing rules: (1) Every verse must name at least one specific SYSTEM, not just an emotion — capitalism, policing, generational trauma, patriarchy, gentrification, addiction as disease not choice, the prison-industrial complex. (2) Avoid academic jargon; philosophy delivered through street language and personal narrative. (3) Production IS trap (booming 808s, rolling hi-hats, dark pads, minor-key piano) but the lyrics have conscious-rap density (multi-syllabic, internal rhyme, argumentative structure). (4) The contradiction IS the art — the listener should feel both the 808 rattle and the argument simultaneously. (5) Personal accountability is mandatory — the narrator is implicated, not above the mess. Artists: Kendrick Lamar (TPAB through DAMN through Mr. Morale), J. Cole (especially KOD era), Rapsody, Vince Staples, Noname, Saba, Earl Sweatshirt (post-Doris), Danny Brown (Atrocity Exhibition), Tobe Nwigwe, Little Simz.',
    defaults: { flow: 'syncopated', rhymeArch: 'internal', density: 'dense', vocabRegister: 'conscious-literary', persona: 'first-person-raw' }
  }
};

// Flow dimension descriptions for the prompt
const FLOW_NOTES = {
  'on-beat':      'Flow lands precisely on the beat — every syllable is intentionally placed on the grid. Think declarative, assertive, boom-bap tradition.',
  'syncopated':   'Flow syncopates around the beat — accents land between the beats creating forward momentum. The rhythm breathes.',
  'triplet':      'Flow uses triplet subdivisions — three syllables per beat creating a rolling, tumbling sensation. Drake, Future, and the modern trap tradition.',
  'double-time':  'Flow doubles the perceived tempo — twice as many syllables per bar as the beat implies. Technical display, urgency, compression.',
  'conversational':'Flow is natural speech rhythm dropped over the beat — unhurried, intimate, as if thinking out loud.',
  'behind-beat':  'Flow drags slightly behind the grid — creating a heavy, weighted, languid feel. Southern rap, drill, certain trap styles.',
  'speed-rap':    'Speed-rap / chopper flow — Gear 4 sixteenth-note or quintuplet cascades (6–8+ syllables per beat). Twista / Busta Rhymes / Eminem "Rap God" / Royce da 5\'9" / Tech N9ne / Bone Thugs-N-Harmony. MUST be used as spotlight cascade max 4 bars at a time, then [Breath Reset] or [Gear Down] back to baseline. Always entered with [Speed-Rap] or [Cascade] tag and exited with matching pullback tag — never sustained as a whole verse.'
};
const RHYME_NOTES = {
  'end-only':       'End rhyme only — the last word of each bar rhymes. Clean, accessible, singable.',
  'internal':       'Internal rhyme scheme — rhymes occur within bars not just at the end. Creates density and momentum.',
  'multi-syllabic': 'Multi-syllabic rhymes — multiple syllables rhyme simultaneously (e.g., "motivate" / "innovate"). Technical showcase.',
  'chain':          'Chain rhyming — each bar\'s last word or sound becomes the first sound of the next internal rhyme. Continuous forward pull.',
  'mosaic':         'Mosaic rhyme — complex interlocking rhyme scheme where multiple words throughout the verse form a web. Every word load-bearing.',
  'slant':          'Slant rhyme — near-rhymes and approximate rhymes preferred over exact. More natural speech feel, less sing-song.',
  'deferred':       'Deferred rhyme — the rhyme scheme lands 2-4 bars later than the ear expects it. Creates tension-and-release across a whole verse rather than bar-to-bar.',
  'vowel-chain':    'Vowel chain — pick ONE specific vowel phoneme (long A, short I, schwa) and thread it through 8-16 bars. Hit the vowel at every 2-4 syllables in each bar. Eminem "Till I Collapse" runs the "at" sound this way. Bright vowels for triumph, dark vowels for menace.',
  'syllable-atoms': 'Syllable decomposition — take a keyword, break it into phonetic atoms (e.g. "California" → CAL + FORN + IA), use EACH atom as a separate rhyme anchor across the next 6-12 bars. Three parallel rhyme threads instead of one end-rhyme. MF DOOM / Big Pun signature.',
  'prefix-suffix':  'Prefix/suffix rhyme — anchor the scheme on word BEGINNINGS (UNDERwater / UNDERfire / UNDERpressure) or ENDINGS (agGRESSION / deDRESSION / proGRESSION) instead of whole-word rhymes. The partial-word anchor carries the scheme; word tails vary. The anchor must carry the stressed syllable to land.',
  'phoneme-target': 'Phoneme-level targeting — do NOT think "word that rhymes with X." Think "the phoneme /ɛk/" and plant it at ANY syllable position of ANY word: first syllable, middle, end. "rEflection" + "sEction" + "nEcklace" all hit /ɛk/. Expands rhyme vocabulary 10× over word-level matching.'
};
const DENSITY_NOTES = {
  'sparse':      'Sparse delivery — few syllables per bar, heavy use of space and silence. Each word carries more weight.',
  'medium':      'Medium syllabic density — balanced between space and content. The current mainstream standard.',
  'dense':       'Dense delivery — many syllables per bar, minimal space. Information-rich, technically demanding.',
  'ultra-dense': 'Ultra-dense — maximum syllable compression, every subdivision filled. Technical extremity, requires precise enunciation.'
};
const VOCAB_NOTES = {
  'street-coded':       'Vocabulary is street-coded — slang, regional vernacular, community-specific language. Authenticity through specificity. Think: Jeezy, Young Thug, Gucci Mane, Freddie Gibbs — vocab that could only come from a specific block and era.',
  'conscious-literary': 'Vocabulary is conscious and literary — elevated diction, intertextual references, poetic technique applied to hip-hop. Think: Nas, Black Thought, Rapsody, Kendrick Lamar, Lupe Fiasco, Common — words chosen for meaning-density, bars that reward rereading.',
  'abstract-surreal':   'Vocabulary is abstract and surreal — unexpected metaphor combinations, dream logic, non-linear imagery. Think: MF DOOM, Earl Sweatshirt, MIKE, Milo/R.A.P. Ferreira, Aesop Rock — images that don\'t resolve to literal meaning but carry emotional weight.',
  'minimal-phonetic':   'Vocabulary is minimal and phonetic — chosen for sound quality over semantic meaning. The word sounds are the message. Think: Young Thug (later era), Playboi Carti, Lil Yachty, Sheck Wes — syllable-as-percussion.',
  'academic':           'Vocabulary is academic and analytical — precise terminology, intellectual frameworks, argumentative structure. Think: Killer Mike (Run the Jewels), El-P, Saul Williams, Talib Kweli — rap as essay, bars as theses.',
  'braggadocio':        'Vocabulary is flex / luxury / status-marked — designer houses, aircraft tail numbers, watches, distilleries, hotel addresses, currency symbols, boardroom terminology. Specificity is the flex. Generic "I\'m rich" is dead — "the Patek says 10:47, the Gulfstream says Teterboro" is alive. Think: Jay-Z, Rick Ross, Drake, Pusha T, Travis Scott, Migos — the art of the receipt.',
  'confessional':       'Vocabulary is confessional / therapy-voice / diary-coded — mental-health terminology, relational ambivalence, self-diagnosis, the small humiliations. Not "I\'m sad" but "I rehearsed that voicemail six times and still hit cancel." Think: Kid Cudi, early Drake, NF, Juice WRLD, Kendrick Lamar ("u"/"i"), Rod Wave, Noname — interiority without euphemism.',
  'sardonic':           'Vocabulary is sardonic / jaded / world-weary — dry wit, deadpan observations, the joke that isn\'t asking to be laughed at. Irony carries the bar, never a punchline tag. Think: Mach-Hommy, Ka, MIKE, Earl Sweatshirt, Boldy James, Ghostface Killah at his most acerbic, Action Bronson — the wink you almost miss.',
  'finance-hustle':     'Vocabulary is business / finance / enterprise domain — wire transfers, cap tables, margin calls, distribution deals, LLC, equity vs. advance, publishing splits, supply chain. The money isn\'t just spent — it\'s structured. Think: Jay-Z (later catalog), Nipsey Hussle (Marathon vocab), Meek Mill ("Dreams and Nightmares" post-Roc Nation), Dame Dash interviews, Master P as rap-CEO archetype.',
  'mythic-biblical':    'Vocabulary is mythic / biblical / cosmic — scripture references (named: Ezekiel, Job, Revelations — not generic "the Bible"), prophets, numerology (5%er mathematics, Supreme Alphabet), ancient civilizations, cosmological imagery. The bar reaches for eternity. Think: Nas ("God\'s Son"), Lauryn Hill, RZA, GZA, Jay Electronica, Ab-Soul, Killah Priest, Kendrick ("HUMBLE" / DAMN. scripture), André 3000 ("Da Art of Storytellin\'").',
  'cinematic-storyteller':'Vocabulary is cinematic — scenes structured like film: establishing shot, close-up, cut to, fade out. Character names, street names, times of day, weather, dialogue-in-bars. The listener sees the movie. Think: Slick Rick, Nas ("One Love", "Memory Lane"), Ghostface Killah ("Shakey Dog"), Raekwon (Cuban Linx), Biggie ("Gimme the Loot"), Kendrick ("Sing About Me"), J. Cole ("Lost Ones").',
  'chess-strategy':     'Vocabulary is chess / war-room / strategy domain — openings, gambits, sacrifices, flanks, the long game, move 14, pawn structures. Power plays get named by maneuver, not outcome. Think: RZA ("Chess-Boxin\'"), GZA (Liquid Swords entire album), Wu-Tang collective, Killer Mike on R.A.P. Music, Ka ("Grief Pedigree") — the rap as positional play.',
  'sports-combat':      'Vocabulary is sports / combat / game-tape — boxing rounds, basketball pickup rules, football down-and-distance, wrestling promos, MMA ground game, locker-room addresses, specific arena names. The competition is the metaphor — but named, dated, scored. Think: Kendrick (entire verse around dunk cams/Compton courts), J. Cole ("4 Your Eyez Only" boxing imagery), Drake ("0-100" sports counting), Kanye ("Jesus Walks" competitive scripture), Lil Wayne sports skits.'
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
    'midwest':           'midwest-soul',
    'drill-uk':          'drill',
    'afro-rap':          'afro-trap',
    'post-algorithm':    'cyber-rap',
    'neo-phonetic':      'mumble',
    'climate-rap':       'conscious',
    'ai-native':         'cyber-rap',
    'mosaic-flow':       'alt-rap',
    'golden-era-2':      'neo-boom-bap',
    'analog-melodic':    'trap-soul',
    'conscious-trap':    'conscious-trap',
    'afro-boom-bap':     'neo-boom-bap',
    'jazz-rap-revival':  'jazz-rap',
    'phonk':             'phonk-rap',
    'anthem-rap':        'anthem-rap',
    'hustle-grind':      'hustle-grind-rap',
    'hyphy-rap':         'hyphy',
    'latin-rap':         'latin-urbano'
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
  const rapAdlibs = RAP_STYLE_ADLIBS[style.label] || null;
  const rapAdlibLock = rapAdlibs ? `\n\n🎤 AUTHENTIC AD-LIBS — ${style.label} (regional/era vernacular; use THESE, not generic "(yeah)" or "(hey)"):\n  ${rapAdlibs.join('  ·  ')}\n\nAd-lib placement rules:\n- Weave 2-4 of these per verse in parentheses on the same line as rap bars.\n- Hook gets 1-2 prominent/chanted ad-libs from the list above.\n- Do NOT invent new ad-libs OR use generic hip-hop ad-libs ("yeah", "uh", "hey") — those sound AI-written.\n- The above ad-libs are specific to ${style.label}'s regional vernacular, era, and artist lineage. Stay inside this vocabulary.` : '';
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
Structure: ${structStr}${STRUCTURE_OPENING_HINTS[structure] ? '\n\n⚠ ' + STRUCTURE_OPENING_HINTS[structure] : ''}
Quality target: ${quality}

${buildCraftFirewallNote()}

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
${hookNote ? '\n' + hookNote : ''}${rapSubSunoLock}${rapAdlibLock}${freestyleLock}${barSwitchLock}${breakRuleLock}

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
- ⚠️ HARD LIMIT: Total lyrics under 4900 chars (Suno caps at 5000, 100-char safety margin). Count every character including [Section] tags, newlines, ad-libs. Epic / beatswitch / Sicko-Mode-style songs STILL must fit — cut repeated hook occurrences, trim bridge/outro, drop extra verses if over. Going over truncates the end of the song in Suno.
- NO EM DASHES: Never use em dashes (—) in lyrics. Use commas or ellipsis instead.${buildAdlibNote('hiphop')}

${buildLyricCraftNote('hiphop', mood, topic)}
${buildSpeedGearsNote('hiphop', mood, topic, Array.isArray(rapDimensions.flow) ? rapDimensions.flow.includes('speed-rap') : rapDimensions.flow === 'speed-rap')}
${buildLyricTierNote('hiphop', params.lyricTier)}
${buildAcademicFrameworkNote('hiphop', params.era)}
${buildEdgeNote(params.edgeMode, params.lyricTier)}
${buildRegionNote('hiphop', params.region)}
${buildEmotionalVelocityNote('hiphop', params.emotionalVelocity)}

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
⚠️ SUNO COMPLIANCE — MANDATORY: ZERO artist names, rapper names, or "[Name] style" references anywhere in the SONG PROMPT. Suno rejects prompts naming artists. If the PRODUCTION LOCK above contains any artist names (e.g. "E-40", "Jay-Z", "Kendrick Lamar"), STRIP THEM and replace with region/era/technique descriptors.
  BAD: "E-40 Mac Dre vocabulary, Keak da Sneak energy"
  GOOD: "Bay Area hyphy slang, Oakland scraper-bass vocabulary, hella-energy ad-libs"
[${rapSubSunoTag ? `MUST lead with the PRODUCTION LOCK string above, BUT with any artist names stripped out and replaced by descriptive equivalents. ` : ''}Under 440 chars. ${style.label} style descriptors, specific production elements, BPM range, vocal texture, key sonic signatures.]

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
  // Variants generate new lyrics (acoustic rewrite, radio cut, cinematic
  // sync rewrite, etc.) so they need the same craft toolkit as Writer/Lucky/
  // Rap Lab — money lines, hook kernels, opening/closing gravity,
  // storytelling craft, comedy craft if the original was comedic.
  const craftNote = buildLyricCraftNote(safeSong.genre, '', safeSong.topic);
  // Variants inherit speed-gears for rap genres (baseline applies) but can't
  // tell if the original used gear-shifting — safe default: no explicit flag.
  const speedGearsNote = buildSpeedGearsNote(safeSong.genre, '', safeSong.topic, false);
  const lyricTierNote = buildLyricTierNote(safeSong.genre, song.lyricTier);
  const velocityNote = buildEmotionalVelocityNote(safeSong.genre, song.emotionalVelocity);
  const academicNote = buildAcademicFrameworkNote(safeSong.genre, song.era);
  const edgeNote = buildEdgeNote(song.edgeMode, song.lyricTier);
  const regionNote = buildRegionNote(safeSong.genre, song.region);
  return builder(safeSong) + craftNote + speedGearsNote + lyricTierNote + velocityNote + academicNote + edgeNote + regionNote + buildCraftFirewallNote();
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

  // Lyric craft toolkit — applies to revise/edit flow too. If the edit
  // instruction is a craft-level rewrite (make hook punchier, deeper verse,
  // new bridge), the editor benefits from the same money-line / storytelling
  // / comedy-mode rules as the original generate.
  const craftNote = buildLyricCraftNote(genre, p.mood, p.topic);
  const speedGearsNote = buildSpeedGearsNote(genre, p.mood, p.topic, p.structure === 'gear_shift_escalation');
  const lyricTierNote = buildLyricTierNote(genre, p.lyricTier);
  const velocityNote = buildEmotionalVelocityNote(genre, p.emotionalVelocity);
  const academicNote = buildAcademicFrameworkNote(genre, p.era);
  const edgeNote = buildEdgeNote(p.edgeMode, p.lyricTier);
  const regionNote = buildRegionNote(genre, p.region);

  const prompt = `SONG CONTEXT:
${ctx}

EDIT INSTRUCTION: "${p.instruction}"

CURRENT LYRICS:
${p.lyrics}${craftNote}${speedGearsNote}${lyricTierNote}${academicNote}${edgeNote}${regionNote}${velocityNote}${buildCraftFirewallNote()}`;

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


// ============ SUNO GENERATION SETTINGS SYSTEM ============
// Per-song recommended values for Suno's three generation knobs:
//   • Weirdness  (0-100%) — experimental / safe balance
//   • Style Influence (0-100%) — genre lock / drift balance
//   • Exclude Styles — negative prompt, what to keep out
// Studio-plan only. Free users see a masked placeholder with upgrade CTA.
// Phase 2 (learning loop) blends community + user-specific signals in via
// the optional `userLearning` parameter — see api/suno-feedback.js.

const SUNO_GEN_SETTINGS_BASE = {
  pop:       { weirdness: 25, styleInfluence: 70, exclude: ['auto-tune distortion','trap hi-hats unless noted','screamo vocals','excessive 808s','low-fi noise'] },
  rock:      { weirdness: 35, styleInfluence: 75, exclude: ['auto-tune pop vocal','trap hi-hats','modern pop production','EDM drops','country steel'] },
  altrock:   { weirdness: 50, styleInfluence: 70, exclude: ['auto-tune pop vocal','country twang','trap hi-hats','gospel choir','orchestral bombast'] },
  country:   { weirdness: 20, styleInfluence: 85, exclude: ['auto-tune distortion','trap hi-hats','drill drums','electronic dance drops','screamo'] },
  hiphop:    { weirdness: 45, styleInfluence: 75, exclude: ['rock guitar solos','country steel','orchestral lead','musical theater vocal','folk acoustic'] },
  rap:       { weirdness: 45, styleInfluence: 75, exclude: ['rock guitar solos','country steel','orchestral lead','musical theater vocal','folk acoustic'] },
  rnb:       { weirdness: 30, styleInfluence: 80, exclude: ['trap hi-hats unless specified','rock distortion','country twang','screamo'] },
  neosoul:   { weirdness: 40, styleInfluence: 75, exclude: ['auto-tune distortion','trap hi-hats','country twang','rock distortion','EDM drops'] },
  gospel:    { weirdness: 20, styleInfluence: 85, exclude: ['profanity','sexual content','trap hi-hats','rock distortion','secular slang','drill drums'] },
  kpop:      { weirdness: 40, styleInfluence: 90, exclude: ['country instrumentation','blues harmonica','americana','folk acoustic','gospel choir unless specified'] },
  reggaeton: { weirdness: 35, styleInfluence: 90, exclude: ['country steel','rock distortion','gospel choir','indie folk','orchestral ballad'] },
  afrobeats: { weirdness: 40, styleInfluence: 85, exclude: ['country twang','rock distortion','drill drums','orchestral bombast','screamo'] },
  edm:       { weirdness: 50, styleInfluence: 75, exclude: ['country instrumentation','acoustic ballad','gospel choir unless specified','rap hi-hats unless specified'] },
  latin:     { weirdness: 35, styleInfluence: 85, exclude: ['country steel','rock distortion','drill drums','gospel choir','EDM drops'] },
  blues:     { weirdness: 30, styleInfluence: 80, exclude: ['auto-tune','trap hi-hats','modern pop production','EDM drops','orchestral bombast'] },
  jazz:      { weirdness: 45, styleInfluence: 75, exclude: ['auto-tune','trap hi-hats','modern pop production','EDM drops','rock distortion','screamo'] },
  folk:      { weirdness: 30, styleInfluence: 75, exclude: ['auto-tune','trap hi-hats','EDM drops','modern pop production','orchestral bombast','screamo'] },
  indie:     { weirdness: 55, styleInfluence: 65, exclude: ['auto-tune pop vocal','trap hi-hats','drill drums','country twang','orchestral bombast'] },
  punk:      { weirdness: 45, styleInfluence: 80, exclude: ['auto-tune','trap hi-hats','gospel choir','EDM drops','orchestral bombast','country twang'] },
  reggae:    { weirdness: 30, styleInfluence: 85, exclude: ['country steel','rock distortion','EDM drops','drill drums','screamo'] },
  comedy:    { weirdness: 70, styleInfluence: 55, exclude: ['generic pop production','radio-polish mix','overly serious production'] },
  parody:    { weirdness: 65, styleInfluence: 50, exclude: ['generic pop production','derivative production'] },
  tvmusical: { weirdness: 35, styleInfluence: 80, exclude: ['auto-tune','trap hi-hats','rap verses unless in-character','EDM drops','screamo'] },
  children:  { weirdness: 20, styleInfluence: 75, exclude: ['profanity','sexual content','drugs','violence','dark themes','trap hi-hats','screamo','menacing tone'] }
};

// Mood / mode modifiers — applied on top of base via word-boundary match.
// Positive weirdness = more experimental. Positive styleInfluence = more genre-lock.
const MOOD_SUNO_MODIFIERS = {
  experimental:{ weirdness:+15, styleInfluence:-10 },
  surreal:     { weirdness:+25, styleInfluence:-15 },
  absurd:      { weirdness:+20, styleInfluence:-15 },
  playful:     { weirdness:+10, styleInfluence:-5  },
  ironic:      { weirdness:+15, styleInfluence:-5  },
  sardonic:    { weirdness:+15, styleInfluence:0   },
  chaotic:     { weirdness:+20, styleInfluence:-10 },
  frantic:     { weirdness:+15, styleInfluence:-5  },
  urgent:      { weirdness:+10, styleInfluence:+5  },
  manic:       { weirdness:+20, styleInfluence:-10 },
  cinematic:   { weirdness:+10, styleInfluence:+5  },
  epic:        { weirdness:+5,  styleInfluence:+10 },
  anthemic:    { weirdness:-5,  styleInfluence:+10 },
  radio:       { weirdness:-15, styleInfluence:+10 },
  commercial:  { weirdness:-20, styleInfluence:+10 },
  intimate:    { weirdness:-5,  styleInfluence:0   },
  vulnerable:  { weirdness:-5,  styleInfluence:0   },
  confessional:{ weirdness:-5,  styleInfluence:0   },
  nostalgic:   { weirdness:0,   styleInfluence:+5  },
  romantic:    { weirdness:-5,  styleInfluence:+5  },
  melancholic: { weirdness:+5,  styleInfluence:0   },
  sad:         { weirdness:0,   styleInfluence:0   },
  hopeful:     { weirdness:-5,  styleInfluence:+5  },
  defiant:     { weirdness:+5,  styleInfluence:0   },
  angry:       { weirdness:+10, styleInfluence:+5  },
  aggressive:  { weirdness:+10, styleInfluence:+5  },
  dark:        { weirdness:+10, styleInfluence:0   },
  dreamy:      { weirdness:+15, styleInfluence:-5  },
  ethereal:    { weirdness:+15, styleInfluence:-5  },
  hype:        { weirdness:+5,  styleInfluence:+10 },
  celebratory: { weirdness:+5,  styleInfluence:+5  }
};

// Structure modifiers — certain architectures want more sonic experimentation
const STRUCTURE_SUNO_MODIFIERS = {
  gear_shift_escalation: { weirdness:+10, styleInfluence:0 },
  hiphop_storytelling_24:{ weirdness:+5,  styleInfluence:0 },
  hiphop_beatswitch:     { weirdness:+15, styleInfluence:-5 },
  story_in_medias_res:   { weirdness:+5,  styleInfluence:0 },
  story_flashback:       { weirdness:+5,  styleInfluence:0 },
  story_reverse_chrono:  { weirdness:+10, styleInfluence:0 },
  viral:                 { weirdness:-10, styleInfluence:+5 }
};

// Core formula. Blends base + mood + structure + optional learning overlay.
// `userLearning` shape: { sampleSize, avgWeirdness, avgStyleInfluence, excludeHits }
// When sampleSize >= 3, learning overlays with weight = min(0.5, sampleSize/20).
function buildSunoSettings({ genre, substyle, mood, structure, rapStyle, userLearning }) {
  const base = SUNO_GEN_SETTINGS_BASE[genre] || SUNO_GEN_SETTINGS_BASE.pop;
  let weirdness = base.weirdness;
  let styleInfluence = base.styleInfluence;
  const excludes = new Set(base.exclude);

  // Word-boundary mood match (same pattern as anti-cliche / speed-gears)
  const moodNorm = ' ' + (mood || '').toLowerCase().replace(/[-_]/g,' ').replace(/\s+/g,' ').trim() + ' ';
  for (const [key, mod] of Object.entries(MOOD_SUNO_MODIFIERS)) {
    if (moodNorm.includes(' ' + key + ' ')) {
      weirdness += mod.weirdness;
      styleInfluence += mod.styleInfluence;
    }
  }

  // Structure modifier
  const structMod = STRUCTURE_SUNO_MODIFIERS[structure];
  if (structMod) {
    weirdness += structMod.weirdness;
    styleInfluence += structMod.styleInfluence;
  }

  // Rap substyle modifier (hip-hop only — some styles are more experimental)
  if (genre === 'hiphop' && rapStyle) {
    const experimentalStyles = new Set(['cloud-rap','abstract-rap','jazz-rap','mosaic-flow','analog-melodic']);
    const lockedStyles = new Set(['drill','uk-drill','trap','anthem-rap','hyphy-rap']);
    if (experimentalStyles.has(rapStyle)) { weirdness += 10; styleInfluence -= 5; }
    if (lockedStyles.has(rapStyle)) { weirdness -= 5; styleInfluence += 5; }
  }

  // Learning overlay — Phase 2
  let learningApplied = false;
  if (userLearning && typeof userLearning.sampleSize === 'number' && userLearning.sampleSize >= 3) {
    const w = Math.min(0.5, userLearning.sampleSize / 20);
    if (typeof userLearning.avgWeirdness === 'number') {
      weirdness = Math.round(weirdness * (1 - w) + userLearning.avgWeirdness * w);
    }
    if (typeof userLearning.avgStyleInfluence === 'number') {
      styleInfluence = Math.round(styleInfluence * (1 - w) + userLearning.avgStyleInfluence * w);
    }
    if (Array.isArray(userLearning.excludeHits)) {
      userLearning.excludeHits.forEach(e => excludes.add(e));
    }
    learningApplied = true;
  }

  // Clamp + cap exclude list
  weirdness = Math.max(0, Math.min(100, Math.round(weirdness)));
  styleInfluence = Math.max(0, Math.min(100, Math.round(styleInfluence)));

  return {
    weirdness,
    styleInfluence,
    excludeStyles: Array.from(excludes).slice(0, 10),
    learningApplied,
    sampleSize: userLearning?.sampleSize || 0
  };
}

module.exports = { buildSongPrompt, buildLuckyPrompt, buildRapLabPrompt, buildEditPrompt, buildPromptIntelligence, GENRE_LABELS, GENRE_BIBLE, MUSIC_THEORY_BIBLE, SYNC_BIBLE, VARIANT_PROMPTS, buildVariantPrompt, FEEDBACK_DIMENSIONS, buildFeedbackPrompt, RHYME_SCHEMES, GENRE_RHYME_PREF, ERA_VOCABULARY, EMOTIONAL_ARCS, GENRE_SYLLABLE_BUDGETS, GENRE_FX_PROFILES, GENRE_PLUGIN_CHAINS, MASTERING_TARGETS, PRODUCTION_ARCHETYPES, buildProductionData, GENRE_HIT_REFERENCES, buildTopTierNote, ADLIB_BIBLE, VOCAL_STACK_PROFILES, buildAdlibNote, buildVocalStackNote , BREATH_TECHNIQUES_10, BREATH_PROFILES, buildSingerNotesInstruction, buildSunoSettings, SUNO_GEN_SETTINGS_BASE, MOOD_SUNO_MODIFIERS, LYRIC_TIERS, TIER_ANCHORS, buildLyricTierNote, MUSIC_ACADEMIA, GENRE_ACADEMIA_MAP, buildAcademicFrameworkNote, buildEdgeNote, REGION_BIBLE, buildRegionNote, BLEND_STYLE_BIBLE, buildBlendNote, EMOTIONAL_VELOCITY, GENRE_DEFAULT_VELOCITY, buildEmotionalVelocityNote };



