/*
 * frequency-engine.js — SONIQ Frequency Mode audio synthesis engine
 * Dependency-free, plain <script>, exposes global window.FreqEngine.
 *
 * Public API (matches ENGINE contract):
 *   FreqEngine.start(spec)        -> void   (call from a user gesture)
 *   FreqEngine.stop()             -> void
 *   FreqEngine.setVolume(v)       -> void   (v in 0..1, live)
 *   FreqEngine.isPlaying()        -> boolean
 *   FreqEngine.renderWav(spec, s) -> Promise<Blob>   (16-bit PCM WAV)
 *
 * spec = {
 *   mode: "pure" | "binaural" | "isochronic",
 *   carrierHz: number,
 *   beatHz: number,            // 0 for pure
 *   waveform: "sine",          // any OscillatorType
 *   volume: 0..1
 * }
 *
 * pure       = one oscillator @ carrierHz.
 * binaural   = left osc @ carrierHz, right osc @ carrierHz+beatHz, hard panned (needs headphones).
 * isochronic = one carrier gated on/off at beatHz via a low-freq gate oscillator -> gain.
 *
 * No network, no CSP impact. Web Audio only.
 */
(function (global) {
  'use strict';

  // ---- Tunables -----------------------------------------------------------
  var RAMP_TIME = 0.04;      // seconds — smoothing time constant for vol ramps
  var GATE_DEPTH = 0.92;     // isochronic: how deep the gate dips toward silence
  var MASTER_HEADROOM = 0.9; // keep below clipping when stacking oscillators
  var DEFAULT_WAVEFORM = 'sine';

  // ---- State --------------------------------------------------------------
  var ctx = null;            // shared (lazy) AudioContext
  var unlocked = false;      // iOS/Safari unlock done?
  var playing = false;
  var nodes = null;          // active graph teardown handle
  var curVolume = 0.6;       // last requested user volume (0..1)

  // ---- Noise bed state (independent of the tone) -------------------------
  var BED_RAMP = 0.08;       // seconds — fade in / fade out time constant
  var BED_HEADROOM = 0.7;    // keep the bed comfortably below clipping
  var BED_LOOP_SECS = 5;     // length of the looping noise buffer (seconds)
  var bedSource = null;      // active looping BufferSourceNode (null = no bed)
  var bedGain = null;        // bed's OWN GainNode -> destination (independent)
  var bedType = 'off';       // 'off' | 'white' | 'pink' | 'brown'
  var bedVolume = 0.5;       // last requested bed volume (0..1)
  var bedBuffers = {};       // cache of generated noise buffers by color

  // ------------------------------------------------------------------------
  function getAudioContextCtor() {
    return global.AudioContext || global.webkitAudioContext || null;
  }

  function ensureContext() {
    if (ctx) return ctx;
    var Ctor = getAudioContextCtor();
    if (!Ctor) {
      throw new Error('Web Audio API not supported in this browser.');
    }
    ctx = new Ctor();
    return ctx;
  }

  // iOS/Safari require a sound to start from a user gesture; play a 1-sample
  // silent buffer once to unlock the context, then resume.
  function unlockIfNeeded() {
    if (!ctx) return;
    if (typeof ctx.resume === 'function' && ctx.state === 'suspended') {
      try { ctx.resume(); } catch (e) { /* ignore */ }
    }
    if (unlocked) return;
    try {
      var buf = ctx.createBuffer(1, 1, ctx.sampleRate);
      var src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      if (typeof src.start === 'function') src.start(0);
      else if (typeof src.noteOn === 'function') src.noteOn(0);
      unlocked = true;
    } catch (e) {
      // Non-fatal; some contexts unlock simply via resume().
      unlocked = true;
    }
  }

  function clampVol(v) {
    v = (typeof v === 'number' && isFinite(v)) ? v : 0;
    if (v < 0) return 0;
    if (v > 1) return 1;
    return v;
  }

  function normalizeSpec(spec) {
    spec = spec || {};
    var mode = spec.mode === 'binaural' || spec.mode === 'isochronic' ? spec.mode : 'pure';
    var carrier = (typeof spec.carrierHz === 'number' && isFinite(spec.carrierHz) && spec.carrierHz > 0)
      ? spec.carrierHz : 200;
    var beat = (typeof spec.beatHz === 'number' && isFinite(spec.beatHz) && spec.beatHz > 0)
      ? spec.beatHz : 0;
    var waveform = typeof spec.waveform === 'string' ? spec.waveform : DEFAULT_WAVEFORM;
    var volume = clampVol(typeof spec.volume === 'number' ? spec.volume : curVolume);
    // pure has no beat; isochronic/binaural need a sane non-zero beat to do anything
    if (mode === 'pure') beat = 0;
    if ((mode === 'binaural' || mode === 'isochronic') && beat <= 0) beat = 7; // gentle default
    return { mode: mode, carrierHz: carrier, beatHz: beat, waveform: waveform, volume: volume };
  }

  // ------------------------------------------------------------------------
  // Graph builders. Each returns a teardown object: { stop(when), teardown(),
  // masterGain }. They build into the supplied `audioCtx` (online or offline)
  // and connect to `dest`.
  // ------------------------------------------------------------------------

  function makePanner(audioCtx, pan) {
    // Prefer StereoPannerNode; fall back to a ChannelMerger placing the
    // signal on a single channel when unsupported (older Safari).
    if (typeof audioCtx.createStereoPanner === 'function') {
      var p = audioCtx.createStereoPanner();
      try { p.pan.value = pan; } catch (e) { /* ignore */ }
      return { input: p, output: p, isPanner: true };
    }
    // Fallback: route to L or R channel of a 2-channel merger.
    var merger = audioCtx.createChannelMerger(2);
    var g = audioCtx.createGain();
    var channel = pan < 0 ? 0 : 1; // -1 -> left(0), +1 -> right(1)
    g.connect(merger, 0, channel);
    return { input: g, output: merger, isPanner: false };
  }

  function startOsc(osc, when) {
    if (typeof osc.start === 'function') osc.start(when || 0);
    else if (typeof osc.noteOn === 'function') osc.noteOn(when || 0);
  }
  function stopOsc(osc, when) {
    try {
      if (typeof osc.stop === 'function') osc.stop(when || 0);
      else if (typeof osc.noteOff === 'function') osc.noteOff(when || 0);
    } catch (e) { /* already stopped */ }
  }

  function buildGraph(audioCtx, dest, spec) {
    var oscList = [];
    var disconnectables = [];

    var master = audioCtx.createGain();
    master.gain.value = 0; // ramp up after build
    master.connect(dest);
    disconnectables.push(master);

    function track(node) { disconnectables.push(node); return node; }

    if (spec.mode === 'binaural') {
      // Left = carrier, Right = carrier + beat, hard-panned.
      var oscL = audioCtx.createOscillator();
      oscL.type = spec.waveform;
      oscL.frequency.value = spec.carrierHz;
      var oscR = audioCtx.createOscillator();
      oscR.type = spec.waveform;
      oscR.frequency.value = spec.carrierHz + spec.beatHz;

      var panL = makePanner(audioCtx, -1);
      var panR = makePanner(audioCtx, 1);

      oscL.connect(panL.input);
      panL.output.connect(master);
      oscR.connect(panR.input);
      panR.output.connect(master);

      track(panL.input); track(panL.output); track(panR.input); track(panR.output);
      oscList.push(oscL, oscR);
    } else if (spec.mode === 'isochronic') {
      // One carrier gated on/off at beatHz. A low-freq gate oscillator drives
      // a GainNode's gain. Map the LFO (-1..1) into [1-depth .. 1] so the
      // amplitude pulses without hard clicks. We bias the gain node and
      // scale the LFO via a depth gain.
      var carrier = audioCtx.createOscillator();
      carrier.type = spec.waveform;
      carrier.frequency.value = spec.carrierHz;

      var gate = audioCtx.createGain();
      gate.gain.value = 1 - GATE_DEPTH / 2; // mid baseline

      var lfo = audioCtx.createOscillator();
      lfo.type = 'sine'; // sine modulation is click-free vs square
      lfo.frequency.value = spec.beatHz;

      var depth = audioCtx.createGain();
      depth.gain.value = GATE_DEPTH / 2; // LFO swings +/- depth around baseline

      lfo.connect(depth);
      depth.connect(gate.gain); // AudioParam modulation
      carrier.connect(gate);
      gate.connect(master);

      track(gate); track(depth);
      oscList.push(carrier, lfo);
    } else {
      // pure: single oscillator -> master
      var osc = audioCtx.createOscillator();
      osc.type = spec.waveform;
      osc.frequency.value = spec.carrierHz;
      osc.connect(master);
      oscList.push(osc);
    }

    return {
      master: master,
      oscList: oscList,
      disconnectables: disconnectables,
      startAll: function (when) {
        for (var i = 0; i < oscList.length; i++) startOsc(oscList[i], when);
      },
      stopAll: function (when) {
        for (var i = 0; i < oscList.length; i++) stopOsc(oscList[i], when);
      },
      teardown: function () {
        for (var i = 0; i < oscList.length; i++) {
          try { oscList[i].disconnect(); } catch (e) {}
        }
        for (var j = 0; j < disconnectables.length; j++) {
          try { disconnectables[j].disconnect(); } catch (e) {}
        }
        oscList.length = 0;
        disconnectables.length = 0;
      }
    };
  }

  // ------------------------------------------------------------------------
  // Public: start
  // ------------------------------------------------------------------------
  function start(spec) {
    var s = normalizeSpec(spec);
    curVolume = s.volume;

    // Guard against double-start: stop the previous graph cleanly first.
    if (playing) {
      stop();
    }

    ensureContext();
    unlockIfNeeded(); // resume + iOS unlock (must be in a user gesture)

    var graph;
    try {
      graph = buildGraph(ctx, ctx.destination, s);
    } catch (e) {
      // Build failed — make sure we don't leave half a graph live.
      try { if (graph) graph.teardown(); } catch (e2) {}
      throw e;
    }

    var now = ctx.currentTime;
    graph.startAll(now);

    // Smooth fade-in to avoid a click.
    var target = clampVol(s.volume) * MASTER_HEADROOM;
    try {
      graph.master.gain.cancelScheduledValues(now);
      graph.master.gain.setValueAtTime(0.0001, now);
      graph.master.gain.setTargetAtTime(target, now, RAMP_TIME);
    } catch (e) {
      graph.master.gain.value = target;
    }

    nodes = graph;
    playing = true;
  }

  // ------------------------------------------------------------------------
  // Public: stop — fade out, then tear down all nodes (no leaks).
  // ------------------------------------------------------------------------
  function stop() {
    if (!playing || !nodes) {
      playing = false;
      nodes = null;
      return;
    }
    var graph = nodes;
    nodes = null;
    playing = false;

    var localCtx = ctx;
    var now = (localCtx && typeof localCtx.currentTime === 'number') ? localCtx.currentTime : 0;
    var stopAt = now + RAMP_TIME * 4 + 0.02;

    try {
      graph.master.gain.cancelScheduledValues(now);
      // hold current value then ramp to ~0
      var cur = graph.master.gain.value;
      graph.master.gain.setValueAtTime(cur, now);
      graph.master.gain.setTargetAtTime(0.0001, now, RAMP_TIME);
    } catch (e) {
      try { graph.master.gain.value = 0; } catch (e2) {}
    }

    // Schedule oscillator stop after the fade.
    try { graph.stopAll(stopAt); } catch (e) {}

    // Tear down nodes once the fade-out has elapsed to free memory.
    var teardownDelayMs = Math.ceil((stopAt - now) * 1000) + 60;
    global.setTimeout(function () {
      try { graph.teardown(); } catch (e) {}
    }, teardownDelayMs);
  }

  // ------------------------------------------------------------------------
  // Public: setVolume — live, smooth.
  // ------------------------------------------------------------------------
  function setVolume(v) {
    curVolume = clampVol(v);
    if (!playing || !nodes || !ctx) return;
    var target = curVolume * MASTER_HEADROOM;
    var now = ctx.currentTime;
    try {
      nodes.master.gain.cancelScheduledValues(now);
      nodes.master.gain.setTargetAtTime(target, now, RAMP_TIME);
    } catch (e) {
      try { nodes.master.gain.value = target; } catch (e2) {}
    }
  }

  function isPlaying() {
    return !!playing;
  }

  // ------------------------------------------------------------------------
  // NOISE BED — an INDEPENDENT looping noise layer (white/pink/brown) on its
  // OWN GainNode -> destination. It is fully decoupled from the tone: it plays
  // with OR without start(), and stop() never touches it. renderWav stays
  // TONE-ONLY (the bed is a live listening aid, not part of the exported WAV).
  //
  // We generate the noise ONCE into a ~5s AudioBuffer with source.loop=true:
  // cheap, and seamless because we apply a short internal crossfade so the tail
  // matches the head (no click at the loop point). Each color is normalized so
  // perceived loudness is roughly even when switching between them.
  // ------------------------------------------------------------------------

  // Apply a short head/tail crossfade in-place so a looped buffer is seamless.
  // We blend the final `xf` samples with the first `xf` samples (linear), which
  // makes the wrap-around continuous in both value and slope-ish, killing clicks.
  function crossfadeLoop(data, sampleRate) {
    var n = data.length;
    var xf = Math.min(Math.floor(sampleRate * 0.05), Math.floor(n / 4)); // ~50ms
    if (xf < 8) return;
    for (var i = 0; i < xf; i++) {
      var t = i / xf;                 // 0..1 across the fade
      var head = data[i];
      var tail = data[n - xf + i];
      // Crossfade the tail region into a blend of tail->head so end meets start.
      data[n - xf + i] = tail * (1 - t) + head * t;
    }
  }

  // Normalize so the peak sits at `peak` (keeps colors at even perceived level).
  function normalizePeak(data, peak) {
    var max = 0;
    for (var i = 0; i < data.length; i++) {
      var a = data[i] < 0 ? -data[i] : data[i];
      if (a > max) max = a;
    }
    if (max < 1e-6) return;
    var g = peak / max;
    for (var j = 0; j < data.length; j++) data[j] *= g;
  }

  function fillWhite(data) {
    for (var i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1; // [-1, 1)
    }
  }

  // Paul Kellet's refined pink-noise filter (an economical Voss-McCartney
  // approximation). Softer, "rain-like" spectrum.
  function fillPink(data) {
    var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (var i = 0; i < data.length; i++) {
      var w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      var pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362;
      b6 = w * 0.115926;
      data[i] = pink * 0.11; // rough scale into range; normalized after
    }
  }

  // Brown / red noise = integrated white (running sum), leak-clamped to keep it
  // bounded, then normalized. Deep "waterfall / ocean" rumble.
  function fillBrown(data) {
    var last = 0;
    for (var i = 0; i < data.length; i++) {
      var w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02; // leaky integrator stays bounded
      if (last > 1) last = 1; else if (last < -1) last = -1;
      data[i] = last;
    }
  }

  // Build (and cache) a seamless looping noise buffer for the given color in
  // the supplied audio context. Mono buffer; the source fans out to stereo.
  function getNoiseBuffer(audioCtx, type) {
    if (bedBuffers[type]) return bedBuffers[type];
    var sampleRate = audioCtx.sampleRate || 44100;
    var frames = Math.max(1, Math.floor(sampleRate * BED_LOOP_SECS));
    var buf = audioCtx.createBuffer(1, frames, sampleRate);
    var data = buf.getChannelData(0);

    if (type === 'pink') fillPink(data);
    else if (type === 'brown') fillBrown(data);
    else fillWhite(data);

    // Even perceived loudness across colors, then seamless wrap.
    normalizePeak(data, 0.9);
    crossfadeLoop(data, sampleRate);

    bedBuffers[type] = buf;
    return buf;
  }

  function isBedColor(t) {
    return t === 'white' || t === 'pink' || t === 'brown';
  }

  // Build the bed graph for `type` and fade it in to `bedVolume`.
  function buildBed(type) {
    ensureContext();
    unlockIfNeeded(); // resume + iOS unlock — caller must be in a user gesture

    var buf = getNoiseBuffer(ctx, type);

    var src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    var g = ctx.createGain();
    g.gain.value = 0.0001; // ramp up to avoid a click

    src.connect(g);
    g.connect(ctx.destination);

    try {
      if (typeof src.start === 'function') src.start(0);
      else if (typeof src.noteOn === 'function') src.noteOn(0);
    } catch (e) { /* ignore */ }

    bedSource = src;
    bedGain = g;
    bedType = type;

    var now = ctx.currentTime;
    var target = clampVol(bedVolume) * BED_HEADROOM;
    try {
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.setTargetAtTime(target, now, BED_RAMP);
    } catch (e) {
      try { g.gain.value = target; } catch (e2) {}
    }
  }

  // setBed({ type, volume }) — type 'off' stops the bed; a color starts or
  // updates it live. Independent of the tone. Call from a user gesture.
  function setBed(spec) {
    spec = spec || {};
    var type = spec.type;
    if (typeof spec.volume === 'number') bedVolume = clampVol(spec.volume);

    if (type === 'off' || (typeof type === 'string' && !isBedColor(type) && type !== undefined)) {
      // explicit 'off' (or any non-color string) -> stop
      stopBed();
      return;
    }
    if (type === undefined) {
      // No type change requested: treat as a live volume update only.
      if (bedSource) setBedVolume(bedVolume);
      return;
    }

    if (bedSource && bedGain) {
      // Bed already running: swap the buffer for the new color in place (reuse
      // the same gain -> destination plumbing) and ramp volume — click-free.
      if (type !== bedType) {
        var buf = getNoiseBuffer(ctx, type);
        var newSrc = ctx.createBufferSource();
        newSrc.buffer = buf;
        newSrc.loop = true;
        newSrc.connect(bedGain);
        try {
          if (typeof newSrc.start === 'function') newSrc.start(0);
          else if (typeof newSrc.noteOn === 'function') newSrc.noteOn(0);
        } catch (e) {}
        // Tear down the old source (gain stays live, so no audible gap/click).
        var old = bedSource;
        try { old.stop(0); } catch (e) {}
        try { old.disconnect(); } catch (e) {}
        bedSource = newSrc;
        bedType = type;
      }
      setBedVolume(bedVolume);
      return;
    }

    // Not running: build it.
    buildBed(type);
  }

  // stopBed() — fade out, then fully tear down the bed nodes (no leaks).
  function stopBed() {
    bedType = 'off';
    if (!bedSource && !bedGain) return;

    var src = bedSource;
    var g = bedGain;
    bedSource = null;
    bedGain = null;

    var localCtx = ctx;
    var now = (localCtx && typeof localCtx.currentTime === 'number') ? localCtx.currentTime : 0;

    if (g) {
      try {
        g.gain.cancelScheduledValues(now);
        var cur = g.gain.value;
        g.gain.setValueAtTime(cur, now);
        g.gain.setTargetAtTime(0.0001, now, BED_RAMP);
      } catch (e) {
        try { g.gain.value = 0; } catch (e2) {}
      }
    }

    var stopAt = now + BED_RAMP * 4 + 0.02;
    try {
      if (src) {
        if (typeof src.stop === 'function') src.stop(stopAt);
        else if (typeof src.noteOff === 'function') src.noteOff(stopAt);
      }
    } catch (e) { /* already stopped */ }

    var delayMs = Math.ceil((stopAt - now) * 1000) + 60;
    global.setTimeout(function () {
      try { if (src) src.disconnect(); } catch (e) {}
      try { if (g) g.disconnect(); } catch (e) {}
    }, delayMs);
  }

  // setBedVolume(v) — live 0..1.
  function setBedVolume(v) {
    bedVolume = clampVol(v);
    if (!bedGain || !ctx) return;
    var target = bedVolume * BED_HEADROOM;
    var now = ctx.currentTime;
    try {
      bedGain.gain.cancelScheduledValues(now);
      bedGain.gain.setTargetAtTime(target, now, BED_RAMP);
    } catch (e) {
      try { bedGain.gain.value = target; } catch (e2) {}
    }
  }

  // isBedPlaying() — true only while a bed source is active.
  function isBedPlaying() {
    return !!bedSource;
  }

  // ------------------------------------------------------------------------
  // renderWav — render the same graph offline and encode a 16-bit PCM WAV.
  // ------------------------------------------------------------------------
  function getOfflineCtor() {
    return global.OfflineAudioContext || global.webkitOfflineAudioContext || null;
  }

  function renderWav(spec, seconds) {
    return new Promise(function (resolve, reject) {
      try {
        var s = normalizeSpec(spec);
        var secs = (typeof seconds === 'number' && isFinite(seconds) && seconds > 0) ? seconds : 30;

        var Offline = getOfflineCtor();
        if (!Offline) {
          reject(new Error('OfflineAudioContext not supported in this browser.'));
          return;
        }

        var sampleRate = 44100;
        // binaural needs true stereo separation; everything else 2ch is fine too.
        var channels = 2;
        var frameCount = Math.max(1, Math.floor(sampleRate * secs));

        var offline;
        try {
          offline = new Offline(channels, frameCount, sampleRate);
        } catch (e) {
          // Some implementations want the legacy positional signature only.
          offline = new Offline(channels, frameCount, sampleRate);
        }

        var graph = buildGraph(offline, offline.destination, s);

        // Fade in/out within the render to avoid edge clicks.
        var target = clampVol(s.volume) * MASTER_HEADROOM;
        var fade = Math.min(0.05, secs / 4);
        try {
          graph.master.gain.setValueAtTime(0.0001, 0);
          graph.master.gain.linearRampToValueAtTime(target, fade);
          graph.master.gain.setValueAtTime(target, Math.max(fade, secs - fade));
          graph.master.gain.linearRampToValueAtTime(0.0001, secs);
        } catch (e) {
          graph.master.gain.value = target;
        }

        graph.startAll(0);
        graph.stopAll(secs);

        var done = function (renderedBuffer) {
          try {
            var blob = encodeWav(renderedBuffer);
            try { graph.teardown(); } catch (e) {}
            resolve(blob);
          } catch (err) {
            reject(err);
          }
        };

        var p = offline.startRendering();
        if (p && typeof p.then === 'function') {
          p.then(done).catch(function (err) { reject(err); });
        } else {
          // Legacy callback-style OfflineAudioContext.
          offline.oncomplete = function (ev) { done(ev.renderedBuffer); };
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  // ---- Minimal 16-bit PCM WAV encoder ------------------------------------
  function encodeWav(audioBuffer) {
    var numChannels = audioBuffer.numberOfChannels;
    var sampleRate = audioBuffer.sampleRate;
    var numFrames = audioBuffer.length;
    var bytesPerSample = 2; // 16-bit
    var blockAlign = numChannels * bytesPerSample;
    var byteRate = sampleRate * blockAlign;
    var dataSize = numFrames * blockAlign;
    var bufferSize = 44 + dataSize;

    var ab = new ArrayBuffer(bufferSize);
    var view = new DataView(ab);

    function writeStr(offset, str) {
      for (var i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    }

    // RIFF header
    writeStr(0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeStr(8, 'WAVE');
    // fmt chunk
    writeStr(12, 'fmt ');
    view.setUint32(16, 16, true);          // PCM chunk size
    view.setUint16(20, 1, true);           // audio format = PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);          // bits per sample
    // data chunk
    writeStr(36, 'data');
    view.setUint32(40, dataSize, true);

    // Gather channel data
    var channelData = [];
    for (var c = 0; c < numChannels; c++) channelData.push(audioBuffer.getChannelData(c));

    // Interleave + convert float [-1,1] to 16-bit PCM
    var offset = 44;
    for (var f = 0; f < numFrames; f++) {
      for (var ch = 0; ch < numChannels; ch++) {
        var sample = channelData[ch][f];
        if (sample > 1) sample = 1; else if (sample < -1) sample = -1;
        var intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, intSample | 0, true);
        offset += 2;
      }
    }

    return new Blob([ab], { type: 'audio/wav' });
  }

  // ------------------------------------------------------------------------
  // One-time best-effort unlock listeners so the context is primed on the
  // first gesture even if start() hasn't been called yet. Harmless if absent.
  // ------------------------------------------------------------------------
  function attachUnlock() {
    if (!global.document || !global.document.addEventListener) return;
    var handler = function () {
      try {
        if (!ctx) return; // don't create a context before an intentional start()
        unlockIfNeeded();
      } catch (e) {}
    };
    var opts = { passive: true };
    try {
      global.document.addEventListener('touchend', handler, opts);
      global.document.addEventListener('click', handler, opts);
    } catch (e) {
      // older browsers: no options object
      global.document.addEventListener('touchend', handler, false);
      global.document.addEventListener('click', handler, false);
    }
  }
  attachUnlock();

  // ---- Export -------------------------------------------------------------
  var FreqEngine = {
    start: start,
    stop: stop,                 // stops ONLY the tone — the bed is unaffected
    setVolume: setVolume,
    isPlaying: isPlaying,
    renderWav: renderWav,       // TONE-ONLY — the bed is a live aid, never exported
    // ---- Noise bed (independent of the tone) ----
    setBed: setBed,             // setBed({type:"off"|"white"|"pink"|"brown", volume:0..1})
    stopBed: stopBed,           // fade out + tear down the bed
    setBedVolume: setBedVolume, // live 0..1
    isBedPlaying: isBedPlaying, // boolean
    // exposed for diagnostics / UI (not part of the required contract)
    _normalizeSpec: normalizeSpec
  };

  global.FreqEngine = FreqEngine;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = FreqEngine; // harmless in Node; lets node --check & tests load it
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
