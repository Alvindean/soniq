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
  jazz:{dna:'Improvisation over harmony, chord substitution, rhythmic sophistication, the conversation between instruments, space as music.',structure:'Head (melody) → Solos → Head out. Blues form (12-bar) or AABA (32-bar standard). The arrangement is a vehicle for improvisation.',suno:'"jazz, piano trio, upright bass, brushed drums, 120 BPM swing" for classic. "jazz fusion, electric piano, 100 BPM" for fusion.',keys:['The melody (head) is the launching pad — state it cleanly, then destroy it in the solo','Walking bass is always a counter-melody','Chord substitution creates harmonic surprise — ii-V-I can be approached from anywhere','Silence is the most important note in jazz'],artists:'Miles Davis · John Coltrane · Bill Evans · Thelonious Monk · Charlie Parker · Herbie Hancock · Esperanza Spalding · Kamasi Washington',counter:{device:'Walking bass (primary counter) / piano comping / horn counterpoint',does:'Jazz has the richest counter-melody tradition: the walking bass is ALWAYS a counter-melody — it creates an independent melodic line of its own against the soloist. Piano comping creates harmonic counter-commentary. In ensemble sections, horns play genuine counterpoint — multiple independent melodic lines simultaneously, each complete on its own.',howto:'walking bass counter-melody, piano comp counter-voice, horn counterpoint lines',map:'Throughout: walking bass provides constant counter / Head: piano comps creates harmonic counter / Solos: bass and comping in three-voice counterpoint / Ensemble: full horn counterpoint'},outliers:[{song:'"Take Five" — Dave Brubeck Quartet',rule:'5/4 time signature — commercially unthinkable, programmers said listeners couldn\'t feel an odd meter',result:'First jazz instrumental to sell over 1 million copies, proved listeners feel groove not math'},{song:'"Round Midnight" — Thelonious Monk',rule:'Extremely dissonant angular melody that sounded "wrong" to bebop musicians trained in smooth lines',result:'Most recorded jazz standard written by a living composer — the wrongness WAS the emotional truth'},{song:'"A Love Supreme" — John Coltrane',rule:'Four-part spiritual suite with no traditional song structure, no hooks, no commercial concessions',result:'Best-selling jazz album of all time — proved jazz listeners wanted transcendence more than entertainment'}],vocables:{sounds:'scat syllables: doo-wah, bop, skee-dat, ba-da',when:'improvised solo sections, outro scat fade',suno_tag:'[Scat vocal]',borrowed_from:'African American vocal improvisation tradition',notes:'Jazz vocables (scat) are melodically sophisticated — they mimic instrument lines, not crowd participation'}}
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
  // Gospel substyles
  'Traditional Gospel':  'Traditional Gospel DNA: Thomas Dorsey / Mahalia Jackson tradition. Hammond B3 organ is the anchor. Call-and-response between lead and choir. Testimony lyrics (I was broken → God moved → I am free). Building to a shout. Suno style: "traditional gospel, Hammond B3, mass choir, hand claps, call and response, soul, powerful".',
  'Contemporary Gospel': 'Contemporary Gospel DNA: Kirk Franklin, Fred Hammond, Tye Tribbett. Pop and hip-hop production underneath gospel content. 808 bass, modern drums, mass choir stacked harmonies. Celebration energy. Suno style: "contemporary gospel, Kirk Franklin style, 808 bass, mass choir, celebratory, hip-hop gospel, full production".',
  'Worship / CCM':       'Worship/CCM DNA: Hillsong, Chris Tomlin, Bethel Music. Arena rock meets hymn. Corporate worship — songs designed for congregations to sing together. Simple melody, repetitive chorus designed for crowds. Suno style: "worship music, piano, electric guitar, congregational, 75 BPM, soaring, emotional, Hillsong style".',
  'Southern Gospel':     'Southern Gospel DNA: Acoustic quartet harmonies, banjo or acoustic guitar, country-gospel intersection. Shaped-note singing tradition. Narrative testimony. Suno style: "southern gospel, acoustic guitar, four-part harmony, country gospel, warm, testimony".',
  'Gospel Hip-Hop':      'Gospel Hip-Hop DNA: Lecrae, Andy Mineo, KB. Rap flow with gospel message. Trap/boom bap production under spiritual content. Street credibility meets faith testimony. Suno style: "gospel rap, trap beat, 808 bass, conscious lyrics, faith, hip-hop gospel".',
  // Children substyles
  'Singalong / Playful': 'Children\'s Singalong DNA: Maximum participation. Simple repeating phrase as chorus hook. Motion cues embedded (clap, stomp, jump). Major key, bright, 100-120 BPM. The melody must be singable by a 4-year-old in 2 listens. Suno style: "children\'s singalong, ukulele, clapping, bright, joyful, 110 BPM, playful".',
  'Educational':         'Educational Children\'s DNA: The lesson is hidden inside the fun. Count, alphabet, animals, colors, shapes — but approached with wonder not drill. Repetition that teaches. Suno style: "educational children\'s song, acoustic guitar, glockenspiel, clear vocals, 105 BPM, friendly, warm".',
  'Lullaby / Bedtime':   'Lullaby DNA: Descending melody (literally descending — falling intervals calm the nervous system). Slowing tempo verse to verse. Safety and love in every image. Minimal instrumentation. Suno style: "lullaby, soft acoustic guitar, gentle, 60 BPM, warm, soothing, hushed vocals, night, stars".',
  'Silly / Nonsense':    'Silly/Nonsense Children\'s DNA: Pure absurdist fun. Made-up words, tongue twisters, impossible scenarios played completely straight. The laugh IS the lesson — joy is educational. Suno style: "silly children\'s song, bouncy, 115 BPM, playful, bright, ukulele, fun".',
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
};

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

function buildSongPrompt(params) {
  const {
    genre = 'pop', topic: rawTopic = '', mood: rawMood = 'Emotional', vocal: rawVocal = 'any',
    structure = 'standard', era = 'modern', length = 'medium',
    quality = 'high', theoryLevel = 'standard', mode = 'auto',
    substyle = '', hookStyle = 'auto', voice = {}, albumTrack = null,
    blend = {}, bracketMode = 'suno'
  } = params;

  const topic = sanitizeInput(rawTopic);
  const mood = sanitizeInput(rawMood);
  const vocal = sanitizeInput(rawVocal);

  const genreLabel = GENRE_LABELS[genre] || genre;
  const structStr = STRUCTURES[structure] || STRUCTURES.standard;

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

  // Voice profile
  const voiceNote = (voice.name || voice.influences || voice.forbidden)
    ? `\n\nARTIST VOICE: ${voice.name ? `Write as ${voice.name}.` : ''} ${voice.influences ? `Lyric influences: ${voice.influences}.` : ''} ${voice.forbidden ? `NEVER use these phrases: ${voice.forbidden}.` : ''}`
    : '';

  // Album context
  const albumNote = albumTrack
    ? `\n\nALBUM CONTEXT: This song is the "${albumTrack.type}" on the album "${albumTrack.album}". Its role: ${albumTrack.role}. The album's emotional arc: ${albumTrack.arc}. Write it so it fits cohesively within that album story.`
    : '';

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

  const prompt = `Write a complete, production-ready ${genreLabel} song at the highest possible level of craft.

Genre: ${genreLabel}
Topic: ${topic}
Mood: ${mood}
Vocal style: ${vocal}
Structure: ${structStr}
Quality target: ${quality}
Era: ${eraMap[era] || eraMap.modern}
Song length: ${lengthMap[length] || lengthMap.medium}${substyleNote}${bibleNote}${counterNote}${outlierSongsNote}${theoryNote}${blendNote}${albumNote}${genreSpecificNote}${hookNote}${voiceNote}

SONGWRITING RULES:
- Hook must arrive within 30 seconds
- Chorus lines: maximum 10 syllables each for singability
- Verse lines: 8-13 syllables, consistent within each verse
- Every line must be specific — no vague emotions, no clichés
- Use the Zeigarnik effect: leave one phrase slightly open-ended per chorus
- Dynamic contrast: verse energy should be noticeably lower than chorus
- Bridge must offer a new emotional or narrative perspective — not a repeat
- The last chorus must feel bigger than the first
- ${bracketInstructionServer(genre, bracketMode, substyle)}

Respond with EXACTLY this format — use these exact headers, nothing else:

TITLE: [song title]

VERDICT: [one sentence on why this song will connect with listeners]

LYRICS:
[Write the complete song lyrics below. EACH SECTION MUST START WITH ITS BRACKET TAG ON ITS OWN LINE — e.g. [Verse 1] then the lines, [Chorus] then the lines, [Bridge] then the lines. No bracket tag = section does not exist. Every word must earn its place.]

SONG PROMPT:
[The AI music platform style prompt. Under 440 characters. Include: core genre, sub-genre feel, key instruments (4-5), BPM range, tempo feel, vocal descriptor, production texture, counter-melody device. NO artist names.]

PRODUCTION BRIEF:
CORE PROMPT:
[Exact copy of the SONG PROMPT above — ready to paste]

TEMPO & KEY:
[BPM range · Suggested key · Time signature · Feel]

ARRANGEMENT BLUEPRINT:
[Section by section: what instruments enter/drop, energy shifts]

VOCAL DIRECTION:
[Delivery style per section]

SONIC REFERENCES:
[3 production reference points — no artist names, describe the sonic feel]

PLATFORM TIPS:
[3 specific actionable tips for AI music platforms]

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
5. [tip 5]

COUNTERMELODY:
DEVICE: [specific counter-melodic instrument/voice]
WHAT IT DOES: [one sentence]
HOW TO PROMPT: [exact Suno/Udio phrase, under 60 chars]
SECTION MAP: [which sections and how it evolves]`;

  return { system, prompt };
}

function buildLuckyPrompt(params) {
  const keys = Object.keys(FUSION_DATA);
  const rawG1 = params && params.g1 ? sanitizeInput(params.g1, 50) : null;
  const rawG2 = params && params.g2 ? sanitizeInput(params.g2, 50) : null;
  const key = (rawG1 && rawG2) ? rawG1 + '+' + rawG2 : pickRandom(keys);
  const [g1, g2] = key.split('+');
  const fd = FUSION_DATA[key];
  const topic = pickRandom(LUCKY_TOPICS);
  const mood = pickRandom(LUCKY_MOODS);
  const structure = pickRandom(LUCKY_STRUCTURES);
  const vocal = pickRandom(LUCKY_VOCALS);
  const structStr = STRUCTURES[structure] || STRUCTURES.standard;

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

Respond with EXACTLY this format:

TITLE: [song title]

VERDICT: [one sentence on why this song will connect]

LYRICS:
[Write the complete song lyrics. EVERY SECTION MUST START WITH ITS BRACKET TAG ON ITS OWN LINE.]

SONG PROMPT:
[Under 440 chars. Core genre + sub-genre feel, key instruments (4-5), BPM range, tempo feel, vocal descriptor, production texture, counter-melody device. NO artist names.]

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
5. [tip 5]

COUNTERMELODY:
DEVICE: [specific counter-melodic instrument/voice]
WHAT IT DOES: [one sentence]
HOW TO PROMPT: [exact Suno/Udio phrase, under 60 chars]
SECTION MAP: [which sections and how it evolves]`;

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
    hookStyle = 'auto'
  } = params || {};

  const topic = sanitizeInput(rawTopic);
  const mood = sanitizeInput(rawMood);
  const vocal = sanitizeInput(rawVocal);

  const style = RAP_STYLES[rapStyle] || RAP_STYLES.trap;
  const dims = {
    flow:          rapDimensions.flow          || style.defaults.flow,
    rhymeArch:     rapDimensions.rhymeArch     || style.defaults.rhymeArch,
    density:       rapDimensions.density       || style.defaults.density,
    vocabRegister: rapDimensions.vocabRegister || style.defaults.vocabRegister,
    persona:       rapDimensions.persona       || style.defaults.persona
  };

  const structStr = STRUCTURES[structure] || STRUCTURES.standard;
  const hookNote = HOOK_STYLE_NOTES[hookStyle] || '';
  const brackets = GENRE_SUNO_BRACKETS.hiphop;

  const system = `${style.agent}

RAP LAB ACTIVE: You are operating in precision rap construction mode. Every dimension below is a hard constraint — not a suggestion. Your craft must honor the specific combination of dimensions requested.`;

  const prompt = `Write a complete, production-ready Rap / Hip-Hop song in the ${style.label} style at the highest possible level of craft.

Style: ${style.label} (${style.era})
Topic: ${topic}
Mood: ${mood}
Vocal style: ${vocal}
Structure: ${structStr}
Quality target: ${quality}

RAP LAB DIMENSIONS — HARD CONSTRAINTS:
• FLOW STYLE: ${dims.flow} — ${FLOW_NOTES[dims.flow]}
• RHYME ARCHITECTURE: ${dims.rhymeArch} — ${RHYME_NOTES[dims.rhymeArch]}
• SYLLABIC DENSITY: ${dims.density} — ${DENSITY_NOTES[dims.density]}
• VOCABULARY REGISTER: ${dims.vocabRegister} — ${VOCAB_NOTES[dims.vocabRegister]}
• PERSONA: ${dims.persona} — ${PERSONA_NOTES[dims.persona]}
${hookNote ? '\n' + hookNote : ''}

LYRIC INTELLIGENCE REQUIREMENTS:
Every verse must include a LYRIC INTELLIGENCE note in [brackets after the last bar] with:
- FLOW: the specific flow pattern used (name the cadence)
- RHYME MAP: diagram the rhyme scheme (A/B/C notation + note any internal rhymes)
- PHONETICS: flag any words Suno may mispronounce + the correct syllable emphasis
- DENSITY: syllables per bar (avg)
- STANDOUT LINE: the single most powerful line and why it works

BRACKET REQUIREMENTS:
${bracketInstructionServer('hiphop', 'full', null)}

SONGWRITING RULES:
- Every bar must earn its space — no filler lines
- Flow patterns must be intentional, matching the specified FLOW dimension
- Internal rhyme schemes preferred over simple end rhymes (unless 'end-only' specified)
- Metaphors must be specific — no generic imagery
- Hook within 30 seconds
- Last chorus must feel bigger than the first

Respond with EXACTLY this format:

TITLE: [song title]

VERDICT: [one sentence on why this song will connect]

LYRICS:
[Complete song lyrics. EVERY SECTION starts with its bracket tag. Include LYRIC INTELLIGENCE note after each verse/hook section.]

SONG PROMPT:
[Under 440 chars. ${style.label} style, specific production elements, BPM range, vocal texture, key sonic signatures. NO artist names.]

PRODUCTION BRIEF:
CORE PROMPT:
[Exact copy of SONG PROMPT]

TEMPO & KEY:
[BPM · Key · Time sig · Feel]

FLOW BREAKDOWN:
[Bar-by-bar flow pattern guide for the main verse — tell the producer exactly where accents land]

RAP LAB SETTINGS USED:
Style: ${style.label} | Flow: ${dims.flow} | Rhyme: ${dims.rhymeArch} | Density: ${dims.density} | Vocab: ${dims.vocabRegister} | Persona: ${dims.persona}

DIRECTOR NOTES:
1. [Production decision specific to THIS song and style]
2. [Mixing note for this specific style]
3. [Vocal direction note]
4. [Suno/AI platform specific tip]
5. [What makes this combination of dimensions unique]`;

  return { system, prompt };
}

const VARIANT_PROMPTS = {
  title: (song) => `Generate 5 creative song title alternatives for a song with the following details:
Genre: ${song.genre}${song.genre2 ? ' / ' + song.genre2 : ''}
Topic: ${song.topic}
Current title: ${song.title}

Output only the 5 titles as a numbered list. No explanations.`,

  lyrics: (song) => `Rewrite the following song lyrics, keeping the same structure and theme but with fresh word choices and imagery:

Title: ${song.title}
Genre: ${song.genre}${song.genre2 ? ' / ' + song.genre2 : ''}
Topic: ${song.topic}

Current lyrics:
${song.lyrics}

Output only the new lyrics. Preserve section headers like [Verse 1], [Chorus], etc.`,

  style: (song) => `Generate 3 alternative style/genre directions for the following song:

Title: ${song.title}
Current genre: ${song.genre}${song.genre2 ? ' / ' + song.genre2 : ''}
Topic: ${song.topic}

For each alternative, provide: genre name, mood, and a one-sentence description of how it would sound. Output as a numbered list.`,

  hook: (song) => `Write 3 alternative hook/chorus options for the following song:

Title: ${song.title}
Genre: ${song.genre}${song.genre2 ? ' / ' + song.genre2 : ''}
Topic: ${song.topic}

Current lyrics context:
${song.lyrics ? song.lyrics.slice(0, 500) : '(no lyrics provided)'}

Output only the 3 hook alternatives as numbered sections. Each hook should be 4-8 lines.`
};

function buildVariantPrompt(variant, song) {
  const builder = VARIANT_PROMPTS[variant];
  if (!builder) throw new Error('Unknown variant: ' + variant);
  return builder(song);
}

module.exports = { buildSongPrompt, buildLuckyPrompt, buildRapLabPrompt, buildVariantPrompt, GENRE_LABELS, GENRE_BIBLE, MUSIC_THEORY_BIBLE };
