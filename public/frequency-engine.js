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
    stop: stop,
    setVolume: setVolume,
    isPlaying: isPlaying,
    renderWav: renderWav,
    // exposed for diagnostics / UI (not part of the required contract)
    _normalizeSpec: normalizeSpec
  };

  global.FreqEngine = FreqEngine;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = FreqEngine; // harmless in Node; lets node --check & tests load it
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
