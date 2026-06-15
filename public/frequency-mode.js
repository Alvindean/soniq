/*
 * frequency-mode.js — SONIQ Frequency Mode panel UI
 * Dependency-free, plain <script>. Exposes global initFrequency() called by
 * goPg('frequency', …) inside index.html.
 *
 * Responsibilities (UI team only):
 *   - GET /api/frequency once, cache {chants, frequencies}.
 *   - Render the whole panel into #pg-frequency (header + frequency pads +
 *     chant pads + transport + chant-layer output + disclaimer footer).
 *   - Drive window.FreqEngine for in-browser calibrated tone synthesis.
 *   - POST {chantStyleId, frequencyId} to /api/frequency for a Suno-ready
 *     chant prompt + mantra (NO LLM by default — server returns the seed).
 *
 * Safety/legal: no medical claims; "Not medical advice" disclaimer always
 * shown; headphones note for binaural; epilepsy caution for isochronic.
 *
 * All new CSS class names are prefixed `fq-`. Audio synthesis is local Web
 * Audio (no network, no CSP impact). The GET/POST go to same-origin /api/*.
 */
(function (global) {
  'use strict';

  // ---- Module state -------------------------------------------------------
  var data = null;          // cached {chants:[...], frequencies:[...]}
  var loading = false;      // in-flight GET guard
  var loadFailed = false;   // last GET failed?
  var built = false;        // panel DOM constructed?
  var selFreqId = null;     // selected frequency id
  var selChantId = null;    // selected chant id
  var sessionSeconds = 600; // live auto-stop length in seconds (0 = never)
  var volume = 0.6;         // 0..1
  var generating = false;   // chant POST in-flight
  var stopAt = 0;           // epoch ms when the live tone auto-stops (0 = never)
  var tick = null;          // 1s interval driving the countdown + auto-stop
  var stylesInjected = false;

  var MOUNT_ID = 'pg-frequency';
  var STYLE_ID = 'fq-styles';

  // ---- Small DOM helpers --------------------------------------------------
  function $(id) { return global.document.getElementById(id); }
  function mount() { return $(MOUNT_ID); }

  function el(tag, attrs, html) {
    var node = global.document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        if (k === 'class') node.className = attrs[k];
        else if (k === 'text') node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      }
    }
    if (html != null) node.innerHTML = html;
    return node;
  }

  function esc(s) {
    s = (s == null) ? '' : String(s);
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Validate a hex color before injecting it as inline style (defensive).
  function safeColor(c) {
    if (typeof c === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(c)) return c;
    return '#f5c000'; // fall back to amber
  }

  function hasEngine() {
    var e = global.FreqEngine;
    return !!(e && typeof e.start === 'function' && typeof e.stop === 'function');
  }

  // Toast: reuse the app's global toast() if present, else no-op fallback.
  function notify(msg) {
    if (typeof global.toast === 'function') { try { global.toast(msg); return; } catch (e) {} }
  }

  // Copy: reuse the app's global safeCopy() if present, else clipboard API.
  function copyText(text, label) {
    if (typeof global.safeCopy === 'function') { try { global.safeCopy(text, label); return; } catch (e) {} }
    try {
      if (global.navigator && global.navigator.clipboard && global.navigator.clipboard.writeText) {
        global.navigator.clipboard.writeText(text).then(function () { notify('✓ ' + (label || 'Copied')); });
        return;
      }
    } catch (e) {}
    try {
      var ta = global.document.createElement('textarea');
      ta.value = text; global.document.body.appendChild(ta); ta.select();
      global.document.execCommand('copy'); global.document.body.removeChild(ta);
      notify('✓ ' + (label || 'Copied'));
    } catch (e) {}
  }

  // ---- Selection lookups --------------------------------------------------
  function freqById(id) {
    if (!data || !data.frequencies) return null;
    for (var i = 0; i < data.frequencies.length; i++) {
      if (data.frequencies[i] && data.frequencies[i].id === id) return data.frequencies[i];
    }
    return null;
  }
  function chantById(id) {
    if (!data || !data.chants) return null;
    for (var i = 0; i < data.chants.length; i++) {
      if (data.chants[i] && data.chants[i].id === id) return data.chants[i];
    }
    return null;
  }

  // Map a catalog frequency item to a FreqEngine spec.
  function specFor(freq) {
    if (!freq) return null;
    return {
      mode: freq.mode === 'binaural' || freq.mode === 'isochronic' ? freq.mode : 'pure',
      carrierHz: typeof freq.carrierHz === 'number' ? freq.carrierHz : 200,
      beatHz: typeof freq.beatHz === 'number' ? freq.beatHz : 0,
      waveform: typeof freq.waveform === 'string' ? freq.waveform : 'sine',
      volume: volume
    };
  }

  // ---- Styles (scoped, fq- prefix only) -----------------------------------
  function injectStyles() {
    if (stylesInjected || $(STYLE_ID)) { stylesInjected = true; return; }
    var css = [
      '.fq-wrap{max-width:1040px;margin:0 auto;padding:28px 22px 80px;color:var(--tx,#f0f0f8)}',
      '.fq-head{margin-bottom:22px}',
      '.fq-kicker{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--amber,#f5c000);display:flex;align-items:center;gap:8px}',
      '.fq-title{font-size:clamp(24px,3.4vw,34px);font-weight:800;margin:6px 0 6px;letter-spacing:-.02em;color:var(--tx,#f0f0f8)}',
      '.fq-intro{font-size:14px;line-height:1.55;color:var(--tx3,#6a6a90);max-width:660px}',
      '.fq-sec{margin-top:26px}',
      '.fq-sec-hd{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--tx3,#6a6a90);margin-bottom:12px;display:flex;align-items:center;gap:8px}',
      '.fq-sec-hd .fq-count{color:var(--tx3,#6a6a90);font-weight:600;opacity:.7}',
      '.fq-grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(168px,1fr))}',
      '.fq-pad{position:relative;text-align:left;border:1px solid rgba(255,255,255,0.11);background:rgba(255,255,255,0.025);border-radius:14px;padding:15px 15px 14px;cursor:pointer;transition:transform .12s ease,border-color .15s,background .15s,box-shadow .15s;overflow:hidden}',
      '.fq-pad:hover{transform:translateY(-2px);border-color:rgba(255,255,255,0.22);background:rgba(255,255,255,0.05)}',
      '.fq-pad:focus-visible{outline:2px solid var(--amber,#f5c000);outline-offset:2px}',
      '.fq-pad::before{content:"";position:absolute;inset:0 auto 0 0;width:3px;background:var(--fq-c,#f5c000);opacity:.55;transition:opacity .15s}',
      '.fq-pad.fq-on{border-color:var(--fq-c,#f5c000);background:rgba(255,255,255,0.06);box-shadow:0 0 0 1px var(--fq-c,#f5c000),0 6px 22px rgba(0,0,0,0.35)}',
      '.fq-pad.fq-on::before{opacity:1}',
      '.fq-pad-emoji{font-size:24px;line-height:1;margin-bottom:9px;display:block}',
      '.fq-pad-label{font-size:14px;font-weight:700;color:var(--tx,#f0f0f8);margin-bottom:2px}',
      '.fq-pad-hz{font-size:21px;font-weight:800;letter-spacing:-.01em;color:var(--fq-c,#f5c000);margin:5px 0 3px;font-variant-numeric:tabular-nums}',
      '.fq-pad-hz small{font-size:11px;font-weight:600;color:var(--tx3,#6a6a90);margin-left:3px}',
      '.fq-pad-target{font-size:11px;font-weight:600;color:var(--tx3,#6a6a90);text-transform:uppercase;letter-spacing:.04em}',
      '.fq-pad-band{font-size:10px;color:var(--tx3,#6a6a90);opacity:.8;margin-top:5px}',
      '.fq-pad-desc{font-size:11.5px;line-height:1.45;color:var(--tx3,#6a6a90);margin-top:7px}',
      '.fq-pad-trad{font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--fq-c,#f5c000);opacity:.85;margin-top:6px}',
      '.fq-check{position:absolute;top:11px;right:12px;width:18px;height:18px;border-radius:50%;background:var(--fq-c,#f5c000);color:#07070c;font-size:11px;font-weight:800;display:none;align-items:center;justify-content:center;line-height:1}',
      '.fq-pad.fq-on .fq-check{display:flex}',
      '.fq-transport{margin-top:26px;border:1px solid rgba(255,255,255,0.11);background:rgba(255,255,255,0.025);border-radius:16px;padding:18px 18px 16px}',
      '.fq-tr-row{display:flex;flex-wrap:wrap;align-items:center;gap:12px}',
      '.fq-now{flex:1;min-width:180px;font-size:13px;color:var(--tx3,#6a6a90)}',
      '.fq-now b{color:var(--tx,#f0f0f8);font-weight:700}',
      '.fq-btn{font-size:13px;font-weight:700;padding:9px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);color:var(--tx,#f0f0f8);cursor:pointer;transition:all .14s;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}',
      '.fq-btn:hover:not(:disabled){border-color:rgba(255,255,255,0.32);background:rgba(255,255,255,0.08)}',
      '.fq-btn:disabled{opacity:.4;cursor:not-allowed}',
      '.fq-btn-primary{border-color:var(--amber,#f5c000);background:var(--amber,#f5c000);color:#07070c}',
      '.fq-btn-primary:hover:not(:disabled){background:#ffd633;border-color:#ffd633}',
      '.fq-btn-stop{border-color:rgba(255,107,107,0.5);color:#ff6b6b}',
      '.fq-btn-stop:hover:not(:disabled){background:rgba(255,107,107,0.12)}',
      '.fq-ctrls{display:flex;flex-wrap:wrap;align-items:center;gap:18px;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.07)}',
      '.fq-ctrl{display:flex;align-items:center;gap:9px;font-size:12px;color:var(--tx3,#6a6a90);font-weight:600}',
      '.fq-ctrl label{font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--tx3,#6a6a90)}',
      '.fq-range{accent-color:var(--amber,#f5c000);cursor:pointer;width:120px}',
      '.fq-select{font-size:12px;font-weight:600;padding:6px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.18);background:rgba(0,0,0,0.25);color:var(--tx,#f0f0f8);cursor:pointer}',
      '.fq-note{margin-top:12px;font-size:12px;line-height:1.5;border-radius:10px;padding:9px 12px;display:flex;gap:8px;align-items:flex-start}',
      '.fq-note-headphones{background:rgba(0,220,192,0.07);border:1px solid rgba(0,220,192,0.24);color:#7fe9da}',
      '.fq-note-epilepsy{background:rgba(255,107,107,0.07);border:1px solid rgba(255,107,107,0.24);color:#ffb0b0}',
      '.fq-note-warn{background:rgba(245,192,0,0.07);border:1px solid rgba(245,192,0,0.28);color:#f5d873}',
      '.fq-chant-cta{margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.07);display:flex;flex-wrap:wrap;gap:12px;align-items:center}',
      '.fq-chant-hint{font-size:12px;color:var(--tx3,#6a6a90);flex:1;min-width:200px}',
      '.fq-out{margin-top:16px;border:1px solid var(--amberline,rgba(245,192,0,0.28));background:rgba(245,192,0,0.04);border-radius:14px;padding:18px;display:none}',
      '.fq-out.fq-show{display:block}',
      '.fq-out-title{font-size:18px;font-weight:800;color:var(--tx,#f0f0f8);margin-bottom:4px}',
      '.fq-out-meta{font-size:12px;color:var(--tx3,#6a6a90);margin-bottom:14px}',
      '.fq-field{margin-bottom:14px}',
      '.fq-field-hd{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}',
      '.fq-field-lbl{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--tx3,#6a6a90)}',
      '.fq-copy{font-size:10px;font-weight:700;padding:3px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);color:var(--tx,#f0f0f8);cursor:pointer;transition:all .14s}',
      '.fq-copy:hover{border-color:var(--amber,#f5c000);color:var(--amber,#f5c000)}',
      '.fq-pre{font-family:var(--mono,monospace);font-size:12px;line-height:1.55;white-space:pre-wrap;word-break:break-word;background:rgba(0,0,0,0.28);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:11px 13px;color:var(--tx,#f0f0f8);margin:0}',
      '.fq-suno-help{font-size:12px;color:var(--amber,#f5c000);font-weight:600;margin-top:2px}',
      '.fq-state{text-align:center;padding:64px 20px;color:var(--tx3,#6a6a90)}',
      '.fq-state-emoji{font-size:30px;margin-bottom:12px}',
      '.fq-spin{display:inline-block;width:22px;height:22px;border:2px solid rgba(255,255,255,0.15);border-top-color:var(--amber,#f5c000);border-radius:50%;animation:fq-spin .8s linear infinite;margin-bottom:12px}',
      '@keyframes fq-spin{to{transform:rotate(360deg)}}',
      '.fq-disclaimer{margin-top:30px;padding:14px 16px;border-radius:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);font-size:11.5px;line-height:1.6;color:var(--tx3,#6a6a90);text-align:center}',
      '.fq-disclaimer b{color:var(--tx,#f0f0f8)}',
      '.fq-engine-off{margin-top:12px;font-size:12px;color:#ffb0b0;background:rgba(255,107,107,0.07);border:1px solid rgba(255,107,107,0.24);border-radius:10px;padding:9px 12px}'
    ].join('\n');
    var style = el('style', { id: STYLE_ID });
    style.textContent = css;
    (global.document.head || global.document.body || global.document.documentElement).appendChild(style);
    stylesInjected = true;
  }

  // ---- Loading / error states --------------------------------------------
  function renderLoading() {
    var m = mount(); if (!m) return;
    m.innerHTML = '';
    var wrap = el('div', { class: 'fq-wrap' });
    wrap.appendChild(el('div', { class: 'fq-state' },
      '<div class="fq-spin"></div><div>Loading Frequency Mode…</div>'));
    m.appendChild(wrap);
  }

  function renderError() {
    var m = mount(); if (!m) return;
    m.innerHTML = '';
    var wrap = el('div', { class: 'fq-wrap' });
    var box = el('div', { class: 'fq-state' },
      '<div class="fq-state-emoji">😕</div>' +
      '<div style="font-size:15px;font-weight:600;color:var(--tx,#f0f0f8);margin-bottom:6px">Couldn’t load Frequency Mode</div>' +
      '<div style="font-size:13px;margin-bottom:16px">Check your connection and try again.</div>');
    var retry = el('button', { class: 'fq-btn fq-btn-primary' }, '⟲ Retry');
    retry.addEventListener('click', function () { loadFailed = false; data = null; built = false; load(true); });
    box.appendChild(retry);
    wrap.appendChild(box);
    m.appendChild(wrap);
  }

  // ---- Pad renderers ------------------------------------------------------
  function freqPad(f) {
    var color = safeColor(f.color);
    var pad = el('button', {
      class: 'fq-pad' + (selFreqId === f.id ? ' fq-on' : ''),
      type: 'button',
      'data-freq': f.id,
      'aria-pressed': selFreqId === f.id ? 'true' : 'false',
      title: (f.benefit ? String(f.benefit) : '')
    });
    pad.style.setProperty('--fq-c', color);
    var beatTxt = (f.mode && f.mode !== 'pure' && f.beatHz)
      ? ' <small>+' + esc(f.beatHz) + ' Hz beat</small>' : '';
    pad.innerHTML =
      '<span class="fq-check">✓</span>' +
      '<span class="fq-pad-emoji">' + esc(f.emoji || '🎵') + '</span>' +
      '<div class="fq-pad-label">' + esc(f.label || f.id) + '</div>' +
      '<div class="fq-pad-hz">' + esc(f.carrierHz) + '<small>Hz</small>' + beatTxt + '</div>' +
      '<div class="fq-pad-target">' + esc(f.target || '') + '</div>' +
      (f.brainwaveBand ? '<div class="fq-pad-band">' + esc(f.brainwaveBand) + ' band</div>' : '');
    pad.addEventListener('click', function () { selectFreq(f.id); });
    return pad;
  }

  function chantPad(c) {
    var color = safeColor(c.color);
    var pad = el('button', {
      class: 'fq-pad' + (selChantId === c.id ? ' fq-on' : ''),
      type: 'button',
      'data-chant': c.id,
      'aria-pressed': selChantId === c.id ? 'true' : 'false'
    });
    pad.style.setProperty('--fq-c', color);
    pad.innerHTML =
      '<span class="fq-check">✓</span>' +
      '<span class="fq-pad-emoji">' + esc(c.emoji || '🕉️') + '</span>' +
      '<div class="fq-pad-label">' + esc(c.name || c.id) + '</div>' +
      (c.tradition ? '<div class="fq-pad-trad">' + esc(c.tradition) + '</div>' : '') +
      (c.clientDesc ? '<div class="fq-pad-desc">' + esc(c.clientDesc) + '</div>' : '');
    pad.addEventListener('click', function () { selectChant(c.id); });
    return pad;
  }

  // ---- Selection handlers -------------------------------------------------
  function selectFreq(id) {
    selFreqId = (selFreqId === id) ? null : id;
    // reflect pad active states without a full rebuild
    var pads = mount().querySelectorAll('.fq-pad[data-freq]');
    for (var i = 0; i < pads.length; i++) {
      var on = pads[i].getAttribute('data-freq') === selFreqId;
      pads[i].classList.toggle('fq-on', on);
      pads[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    syncTransport();
    // If a tone is already playing, re-start with the newly selected frequency.
    if (hasEngine() && global.FreqEngine.isPlaying() && selFreqId) {
      try { global.FreqEngine.start(specFor(freqById(selFreqId))); } catch (e) {}
    }
  }

  function selectChant(id) {
    selChantId = (selChantId === id) ? null : id;
    var pads = mount().querySelectorAll('.fq-pad[data-chant]');
    for (var i = 0; i < pads.length; i++) {
      var on = pads[i].getAttribute('data-chant') === selChantId;
      pads[i].classList.toggle('fq-on', on);
      pads[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    syncTransport();
  }

  // ---- Transport sync (enable/disable + contextual notes) -----------------
  function syncTransport() {
    var engineOn = hasEngine();
    var f = freqById(selFreqId);
    var playBtn = $('fq-play');
    var stopBtn = $('fq-stop');
    var dlBtn = $('fq-download');
    var genBtn = $('fq-generate');
    var now = $('fq-now');

    var playing = engineOn && global.FreqEngine.isPlaying();

    if (playBtn) playBtn.disabled = !engineOn || !f || playing;
    if (stopBtn) stopBtn.disabled = !engineOn || !playing;
    if (dlBtn) dlBtn.disabled = !engineOn || !f || generating;
    if (genBtn) genBtn.disabled = !selFreqId || !selChantId || generating;

    if (now) {
      if (!f) {
        now.innerHTML = 'Pick a <b>frequency</b> to begin.';
      } else {
        var modeLabel = f.mode === 'binaural' ? 'binaural beat'
          : f.mode === 'isochronic' ? 'isochronic pulse' : 'pure tone';
        var playingTxt = '';
        if (playing) {
          playingTxt = ' · <span style="color:var(--amber,#f5c000)">▶ playing</span>';
          if (stopAt) playingTxt += ' <span style="color:var(--tx3,#6a6a90)">· ⏱ ' + fmtTime((stopAt - Date.now()) / 1000) + ' left</span>';
          else playingTxt += ' <span style="color:var(--tx3,#6a6a90)">· ∞</span>';
        }
        now.innerHTML = 'Selected: <b>' + esc(f.label || f.id) + '</b> · ' +
          esc(f.carrierHz) + ' Hz ' + esc(modeLabel) +
          (f.target ? ' · <b>' + esc(f.target) + '</b>' : '') + playingTxt;
      }
    }

    // Contextual safety notes (headphones for binaural, epilepsy for isochronic)
    var notes = $('fq-notes');
    if (notes) {
      var html = '';
      if (f && f.mode === 'binaural') {
        html += '<div class="fq-note fq-note-headphones"><span>🎧</span><span><b>Headphones required.</b> ' +
          'Binaural beats only work when each ear hears its own tone.</span></div>';
      }
      if (f && f.mode === 'isochronic') {
        html += '<div class="fq-note fq-note-epilepsy"><span>⚠️</span><span><b>Photosensitivity / epilepsy caution.</b> ' +
          'Isochronic tones pulse rhythmically. Stop if you feel dizzy or unwell, and avoid if prone to seizures.</span></div>';
      }
      if (f && f.safety) {
        html += '<div class="fq-note fq-note-warn"><span>ℹ️</span><span>' + esc(f.safety) + '</span></div>';
      }
      notes.innerHTML = html;
    }
  }

  // ---- Transport actions --------------------------------------------------
  // Start the tone AND arm the auto-stop countdown. Must run inside a user
  // gesture chain so the AudioContext can resume.
  function startTone(f) {
    if (!hasEngine() || !f) return false;
    try { global.FreqEngine.start(specFor(f)); } catch (e) { return false; }
    armSessionTimer();
    return true;
  }

  function armSessionTimer() {
    stopTick();
    stopAt = (sessionSeconds > 0) ? (Date.now() + sessionSeconds * 1000) : 0;
    try { tick = global.setInterval(onTick, 1000); } catch (e) { tick = null; }
  }
  function stopTick() {
    if (tick) { try { global.clearInterval(tick); } catch (e) {} tick = null; }
  }
  function onTick() {
    if (stopAt && Date.now() >= stopAt) { doStop(); return; } // auto fade-out
    syncTransport(); // refresh the live countdown
  }
  function fmtTime(s) {
    s = Math.max(0, Math.round(s));
    var m = Math.floor(s / 60), ss = s % 60;
    return m + ':' + (ss < 10 ? '0' : '') + ss;
  }

  function doPlay() {
    if (!hasEngine()) { notify('Audio engine unavailable'); return; }
    var f = freqById(selFreqId);
    if (!f) { notify('Pick a frequency first'); return; }
    if (!startTone(f)) { notify('Could not start audio'); return; }
    syncTransport();
  }

  function doStop() {
    stopTick();
    stopAt = 0;
    if (hasEngine()) { try { global.FreqEngine.stop(); } catch (e) {} }
    syncTransport();
  }

  function onVolume(e) {
    var v = parseFloat(e.target.value);
    if (!isFinite(v)) return;
    volume = Math.max(0, Math.min(1, v / 100));
    if (hasEngine()) { try { global.FreqEngine.setVolume(volume); } catch (er) {} }
    var lbl = $('fq-vol-val'); if (lbl) lbl.textContent = Math.round(volume * 100) + '%';
  }

  function onSession(e) {
    var v = parseInt(e.target.value, 10);
    if (!isFinite(v) || v < 0) return;
    sessionSeconds = v;
    // If a tone is already playing, re-arm the countdown to the new length.
    if (hasEngine() && global.FreqEngine.isPlaying()) {
      stopAt = (sessionSeconds > 0) ? (Date.now() + sessionSeconds * 1000) : 0;
    }
    syncTransport();
  }

  function doDownload() {
    if (!hasEngine() || typeof global.FreqEngine.renderWav !== 'function') {
      notify('Download unavailable'); return;
    }
    var f = freqById(selFreqId);
    if (!f) { notify('Pick a frequency first'); return; }
    var btn = $('fq-download');
    var orig = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.innerHTML = '⏳ Rendering…'; }
    // Cap the rendered file length to keep memory sane (offline render is heavy).
    var secs = Math.min(sessionSeconds > 0 ? sessionSeconds : 300, 300);
    global.FreqEngine.renderWav(specFor(f), secs).then(function (blob) {
      try {
        var url = global.URL.createObjectURL(blob);
        var a = global.document.createElement('a');
        var safeName = String(f.id || 'tone').replace(/[^a-z0-9_-]/gi, '-');
        a.href = url;
        a.download = 'soniq-' + safeName + '-' + f.carrierHz + 'hz-' + secs + 's.wav';
        global.document.body.appendChild(a); a.click();
        global.document.body.removeChild(a);
        global.setTimeout(function () { try { global.URL.revokeObjectURL(url); } catch (e) {} }, 4000);
        notify('✓ Tone downloaded');
      } catch (e) { notify('Download failed'); }
      if (btn) { btn.disabled = false; btn.innerHTML = orig; }
    }).catch(function () {
      notify('Render failed');
      if (btn) { btn.disabled = false; btn.innerHTML = orig; }
    });
  }

  // ---- Chant layer generation (POST /api/frequency) -----------------------
  function doGenerate() {
    if (!selFreqId || !selChantId) { notify('Pick a frequency and a chant style'); return; }
    if (generating) return;
    generating = true;
    syncTransport();
    var btn = $('fq-generate');
    var orig = btn ? btn.innerHTML : '';
    if (btn) { btn.innerHTML = '⏳ Building…'; }

    global.fetch('/api/frequency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chantStyleId: selChantId, frequencyId: selFreqId })
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (res) {
      renderChantOut(res);
      // Auto-start the tone on success (we're still in the click gesture chain
      // via the resolved promise — browsers allow resume() here after a prior
      // gesture; if blocked, the user can hit Play).
      if (hasEngine() && !global.FreqEngine.isPlaying()) {
        var f = freqById(selFreqId);
        if (f) startTone(f);
      }
      notify('✓ Chant layer ready');
    }).catch(function () {
      notify('Could not generate chant layer');
    }).then(function () {
      generating = false;
      if (btn) { btn.innerHTML = orig; }
      syncTransport();
    });
  }

  function copyField(text, label) { return function () { copyText(text, label); }; }

  function renderChantOut(res) {
    var out = $('fq-out');
    if (!out || !res) return;
    out.innerHTML = '';

    var fr = res.frequency || {};
    var freqLine = (fr.label ? esc(fr.label) : '') +
      (fr.carrierHz != null ? ' · ' + esc(fr.carrierHz) + ' Hz' : '') +
      (fr.target ? ' · ' + esc(fr.target) : '');

    out.appendChild(el('div', { class: 'fq-out-title' }, esc(res.title || 'Chant Layer')));
    if (freqLine) out.appendChild(el('div', { class: 'fq-out-meta' }, 'Pairs with ' + freqLine));

    // chantLyrics (mantra)
    if (res.chantLyrics != null) {
      out.appendChild(buildField('Mantra / chant lyrics', String(res.chantLyrics), 'Mantra copied'));
    }
    // sunoPrompt (the IP the user pastes into Suno)
    if (res.sunoPrompt != null) {
      var promptField = buildField('Suno prompt', String(res.sunoPrompt), 'Suno prompt copied');
      out.appendChild(promptField);
      out.appendChild(el('div', { class: 'fq-suno-help' },
        '↳ Paste this into Suno to render the chant, then play it over the tone.'));
    }

    out.classList.add('fq-show');
    try { out.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) {}
  }

  function buildField(label, value, copyLabel) {
    var field = el('div', { class: 'fq-field' });
    var hd = el('div', { class: 'fq-field-hd' });
    hd.appendChild(el('div', { class: 'fq-field-lbl' }, esc(label)));
    var copy = el('button', { class: 'fq-copy', type: 'button' }, 'Copy');
    copy.addEventListener('click', copyField(value, copyLabel));
    hd.appendChild(copy);
    field.appendChild(hd);
    var pre = el('div', { class: 'fq-pre' });
    pre.textContent = value;
    field.appendChild(pre);
    return field;
  }

  // ---- Full panel build ---------------------------------------------------
  function buildPanel() {
    var m = mount(); if (!m) return;
    m.innerHTML = '';
    var wrap = el('div', { class: 'fq-wrap' });

    // Header
    var head = el('div', { class: 'fq-head' });
    head.appendChild(el('div', { class: 'fq-kicker' }, '🧘 Frequency Mode'));
    head.appendChild(el('div', { class: 'fq-title' }, 'Tune the room, then layer a chant'));
    head.appendChild(el('div', { class: 'fq-intro' },
      'Play a calibrated healing tone right here in your browser. For a chant on top, generate a Suno-ready prompt below, ' +
      'render it in Suno, then play it alongside the tone (a built-in mixer is on the way). Pick a frequency to begin.'));
    wrap.appendChild(head);

    // Engine-missing warning
    if (!hasEngine()) {
      wrap.appendChild(el('div', { class: 'fq-engine-off', id: 'fq-engine-off' },
        '⚠️ The in-browser audio engine didn’t load, so tone playback and download are disabled. ' +
        'You can still generate chant prompts below. Try reloading the page.'));
    }

    // FREQUENCY pads
    var fsec = el('div', { class: 'fq-sec' });
    var freqs = (data && data.frequencies) || [];
    fsec.appendChild(el('div', { class: 'fq-sec-hd' },
      '◷ Frequencies <span class="fq-count">' + freqs.length + '</span>'));
    var fgrid = el('div', { class: 'fq-grid' });
    if (!freqs.length) {
      fgrid.appendChild(el('div', { class: 'fq-pad-desc' }, 'No frequencies available.'));
    } else {
      for (var i = 0; i < freqs.length; i++) {
        if (freqs[i] && freqs[i].id) fgrid.appendChild(freqPad(freqs[i]));
      }
    }
    fsec.appendChild(fgrid);
    wrap.appendChild(fsec);

    // CHANT pads
    var csec = el('div', { class: 'fq-sec' });
    var chants = (data && data.chants) || [];
    csec.appendChild(el('div', { class: 'fq-sec-hd' },
      '🕉️ Chant styles <span class="fq-count">' + chants.length + '</span>'));
    var cgrid = el('div', { class: 'fq-grid' });
    if (!chants.length) {
      cgrid.appendChild(el('div', { class: 'fq-pad-desc' }, 'No chant styles available.'));
    } else {
      for (var j = 0; j < chants.length; j++) {
        if (chants[j] && chants[j].id) cgrid.appendChild(chantPad(chants[j]));
      }
    }
    csec.appendChild(cgrid);
    wrap.appendChild(csec);

    // TRANSPORT
    wrap.appendChild(buildTransport());

    // CHANT OUTPUT (hidden until generated)
    wrap.appendChild(el('div', { class: 'fq-out', id: 'fq-out' }));

    // Footer disclaimer (persistent)
    wrap.appendChild(el('div', { class: 'fq-disclaimer' },
      '<b>Not medical advice.</b> Frequencies reflect traditional / subjective / new-age use and are offered for ' +
      'relaxation and creative purposes only — not a treatment for any condition. "Brainwave entrainment" from ' +
      'binaural or isochronic tones is not robustly proven; effects are subjective. ' +
      '<b>Avoid pulsing / isochronic tones if you have epilepsy or are prone to seizures.</b> Stop if you feel unwell.'));

    m.appendChild(wrap);
    built = true;
    wireTransport();
    syncTransport();
  }

  function buildTransport() {
    var t = el('div', { class: 'fq-transport' });

    var row = el('div', { class: 'fq-tr-row' });
    row.appendChild(el('div', { class: 'fq-now', id: 'fq-now' }, 'Pick a <b>frequency</b> to begin.'));

    var play = el('button', { class: 'fq-btn fq-btn-primary', id: 'fq-play', type: 'button', disabled: 'disabled' }, '▶ Play');
    var stop = el('button', { class: 'fq-btn fq-btn-stop', id: 'fq-stop', type: 'button', disabled: 'disabled' }, '■ Stop');
    var dl = el('button', { class: 'fq-btn', id: 'fq-download', type: 'button', disabled: 'disabled', title: 'Downloads a 5-min sample of the tone. Use the live player above for full-length sessions.' }, '⬇ Download sample (WAV)');
    row.appendChild(play); row.appendChild(stop); row.appendChild(dl);
    t.appendChild(row);

    // Controls: volume + session length
    var ctrls = el('div', { class: 'fq-ctrls' });

    var volCtrl = el('div', { class: 'fq-ctrl' });
    volCtrl.appendChild(el('label', { for: 'fq-vol' }, 'Volume'));
    var vol = el('input', { class: 'fq-range', id: 'fq-vol', type: 'range', min: '0', max: '100', value: String(Math.round(volume * 100)) });
    volCtrl.appendChild(vol);
    volCtrl.appendChild(el('span', { id: 'fq-vol-val' }, Math.round(volume * 100) + '%'));
    ctrls.appendChild(volCtrl);

    var sessCtrl = el('div', { class: 'fq-ctrl' });
    sessCtrl.appendChild(el('label', { for: 'fq-session' }, 'Auto-stop'));
    var sess = el('select', { class: 'fq-select', id: 'fq-session' });
    var opts = [[600, '10 min'], [900, '15 min'], [1200, '20 min'], [1800, '30 min'], [3600, '60 min'], [0, '∞ Off']];
    for (var i = 0; i < opts.length; i++) {
      var o = el('option', { value: String(opts[i][0]) }, opts[i][1]);
      if (opts[i][0] === sessionSeconds) o.setAttribute('selected', 'selected');
      sess.appendChild(o);
    }
    sessCtrl.appendChild(sess);
    sessCtrl.appendChild(el('span', { class: 'fq-pad-band', style: 'opacity:.7' }, 'tone fades out automatically'));
    ctrls.appendChild(sessCtrl);

    t.appendChild(ctrls);

    // Contextual safety notes container
    t.appendChild(el('div', { id: 'fq-notes' }));

    // Chant CTA
    var cta = el('div', { class: 'fq-chant-cta' });
    var gen = el('button', { class: 'fq-btn fq-btn-primary', id: 'fq-generate', type: 'button', disabled: 'disabled' }, '🕉️ Generate Chant Layer');
    cta.appendChild(gen);
    cta.appendChild(el('div', { class: 'fq-chant-hint' },
      'Select a frequency + a chant style, then generate a Suno-ready prompt and mantra.'));
    t.appendChild(cta);

    return t;
  }

  function wireTransport() {
    var play = $('fq-play'); if (play) play.addEventListener('click', doPlay);
    var stop = $('fq-stop'); if (stop) stop.addEventListener('click', doStop);
    var dl = $('fq-download'); if (dl) dl.addEventListener('click', doDownload);
    var gen = $('fq-generate'); if (gen) gen.addEventListener('click', doGenerate);
    var vol = $('fq-vol'); if (vol) vol.addEventListener('input', onVolume);
    var sess = $('fq-session'); if (sess) sess.addEventListener('change', onSession);
  }

  // ---- Data load ----------------------------------------------------------
  function load(force) {
    if (loading) return;
    if (data && !force) { ensureBuilt(); return; }
    loading = true;
    loadFailed = false;
    renderLoading();
    global.fetch('/api/frequency', { method: 'GET', headers: { 'Accept': 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (res) {
        data = res && typeof res === 'object' ? res : { chants: [], frequencies: [] };
        if (!Array.isArray(data.chants)) data.chants = [];
        if (!Array.isArray(data.frequencies)) data.frequencies = [];
        loading = false;
        built = false;
        buildPanel();
      })
      .catch(function () {
        loading = false;
        loadFailed = true;
        renderError();
      });
  }

  function ensureBuilt() {
    var m = mount(); if (!m) return;
    // Rebuild if the mount was cleared or never built (idempotent re-open).
    if (!built || !m.querySelector('.fq-wrap')) {
      buildPanel();
    } else {
      syncTransport();
    }
  }

  // ---- Public entry: initFrequency() (called by goPg) ---------------------
  function initFrequency() {
    if (!mount()) { return; } // page div not present yet
    injectStyles();
    if (loadFailed && !data) { load(true); return; }
    if (data) { ensureBuilt(); return; }
    load(false);
  }

  // Expose globally for index.html's goPg hook.
  global.initFrequency = initFrequency;

  // Node-safe export for `node --check` / unit harnesses (harmless in browser).
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initFrequency: initFrequency };
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
