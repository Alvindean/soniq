/**
 * SONIQ Frequency Mode — Frequency Catalog
 *
 * The calibrated tone table for Frequency Mode. Each entry drives the in-browser
 * Web Audio synthesis (pure / binaural / isochronic) and the on-pad copy.
 *
 * NOT secret — Hz values and targets are fully client-exposable. This whole
 * array is returned to the browser by GET /api/frequency.
 *
 * Item shape:
 *   { id, label, carrierHz, beatHz (0 for pure), mode, waveform, target,
 *     benefit, brainwaveBand, color (hex), emoji, safety }
 *
 * SAFETY: all benefit copy is framed as traditional / new-age / subjective —
 * no medical claims. Do not add clinical language here.
 */

const FREQUENCIES = [
  { id: "solfeggio-174", label: "174 Hz — Grounding", carrierHz: 174, beatHz: 0, mode: "pure", waveform: "sine", target: "Calm & grounding", benefit: "The lowest Solfeggio tone, traditionally used as a gentle foundation for relaxation and a sense of safety.", brainwaveBand: "—", color: "#7C3AED", emoji: "🪨", safety: "Subjective/traditional — not medical advice" },
  { id: "solfeggio-285", label: "285 Hz — Renewal", carrierHz: 285, beatHz: 0, mode: "pure", waveform: "sine", target: "Restore & renew", benefit: "A Solfeggio tone associated in new-age practice with feelings of rejuvenation and renewal.", brainwaveBand: "—", color: "#8B5CF6", emoji: "🌱", safety: "Subjective/traditional — not medical advice" },
  { id: "solfeggio-396", label: "396 Hz — Release", carrierHz: 396, beatHz: 0, mode: "pure", waveform: "sine", target: "Release fear", benefit: "Traditionally used to let go of guilt and fear, the 'Liberating Guilt and Fear' Solfeggio tone.", brainwaveBand: "—", color: "#9333EA", emoji: "🕊️", safety: "Subjective/traditional — not medical advice" },
  { id: "solfeggio-417", label: "417 Hz — Change", carrierHz: 417, beatHz: 0, mode: "pure", waveform: "sine", target: "Clear & reset", benefit: "The 'Undoing Situations' tone, traditionally used to clear stagnation and welcome change.", brainwaveBand: "—", color: "#A21CAF", emoji: "🔄", safety: "Subjective/traditional — not medical advice" },
  { id: "solfeggio-528", label: "528 Hz — Transformation", carrierHz: 528, beatHz: 0, mode: "pure", waveform: "sine", target: "Heart & harmony", benefit: "The famous 'Miracle' tone, traditionally associated with love, balance and a sense of transformation.", brainwaveBand: "—", color: "#16A34A", emoji: "💚", safety: "Subjective/traditional — not medical advice" },
  { id: "solfeggio-639", label: "639 Hz — Connection", carrierHz: 639, beatHz: 0, mode: "pure", waveform: "sine", target: "Bonds & relating", benefit: "Traditionally used to support warmth, communication and a feeling of connection with others.", brainwaveBand: "—", color: "#0EA5E9", emoji: "🤝", safety: "Subjective/traditional — not medical advice" },
  { id: "solfeggio-741", label: "741 Hz — Expression", carrierHz: 741, beatHz: 0, mode: "pure", waveform: "sine", target: "Clarity & voice", benefit: "The 'Awakening Intuition' tone, traditionally used for self-expression and mental clearing.", brainwaveBand: "—", color: "#0891B2", emoji: "🗣️", safety: "Subjective/traditional — not medical advice" },
  { id: "solfeggio-852", label: "852 Hz — Intuition", carrierHz: 852, beatHz: 0, mode: "pure", waveform: "sine", target: "Inner awareness", benefit: "Traditionally associated with returning to spiritual order and heightened intuition.", brainwaveBand: "—", color: "#4F46E5", emoji: "👁️", safety: "Subjective/traditional — not medical advice" },
  { id: "solfeggio-963", label: "963 Hz — Awakening", carrierHz: 963, beatHz: 0, mode: "pure", waveform: "sine", target: "Stillness & unity", benefit: "The highest Solfeggio tone, traditionally linked with a sense of oneness and meditative stillness.", brainwaveBand: "—", color: "#6366F1", emoji: "✨", safety: "Subjective/traditional — not medical advice" },
  { id: "tuning-432", label: "432 Hz — Natural Tuning", carrierHz: 432, beatHz: 0, mode: "pure", waveform: "sine", target: "Warm & mellow", benefit: "An alternative concert pitch many listeners find warmer and more relaxing than standard 440 Hz tuning.", brainwaveBand: "—", color: "#D97706", emoji: "🎵", safety: "Subjective/traditional — not medical advice" },
  { id: "binaural-delta-2", label: "Delta 2 Hz — Deep Sleep", carrierHz: 200, beatHz: 2, mode: "binaural", waveform: "sine", target: "Sleep & deep rest", benefit: "A slow 2 Hz binaural beat in the Delta range, traditionally used as a backdrop for deep rest and winding down.", brainwaveBand: "Delta", color: "#1E3A8A", emoji: "😴", safety: "Binaural needs headphones" },
  { id: "binaural-theta-6", label: "Theta 6 Hz — Meditation", carrierHz: 200, beatHz: 6, mode: "binaural", waveform: "sine", target: "Meditation & creativity", benefit: "A 6 Hz binaural beat in the Theta range, traditionally used to accompany meditation, daydreaming and creative flow.", brainwaveBand: "Theta", color: "#3730A3", emoji: "🧘", safety: "Binaural needs headphones" },
  { id: "binaural-alpha-10", label: "Alpha 10 Hz — Relaxed Focus", carrierHz: 200, beatHz: 10, mode: "binaural", waveform: "sine", target: "Calm focus & flow", benefit: "A 10 Hz binaural beat in the Alpha range, traditionally used as a backdrop for relaxed, present focus.", brainwaveBand: "Alpha", color: "#0D9488", emoji: "🌊", safety: "Binaural needs headphones" },
  { id: "binaural-beta-18", label: "Beta 18 Hz — Alert Focus", carrierHz: 200, beatHz: 18, mode: "binaural", waveform: "sine", target: "Alert & active focus", benefit: "An 18 Hz binaural beat in the Beta range, traditionally used as an energizing backdrop for active concentration.", brainwaveBand: "Beta", color: "#CA8A04", emoji: "⚡", safety: "Binaural needs headphones" },
  { id: "binaural-gamma-40", label: "Gamma 40 Hz — Cognition", carrierHz: 200, beatHz: 40, mode: "binaural", waveform: "sine", target: "Sharp & engaged", benefit: "A 40 Hz binaural beat in the Gamma range, traditionally used as a backdrop for engaged, high-attention work.", brainwaveBand: "Gamma", color: "#DC2626", emoji: "🧠", safety: "Binaural needs headphones" },
  { id: "iso-alpha-10", label: "Alpha 10 Hz — Flow (Speaker-Safe)", carrierHz: 200, beatHz: 10, mode: "isochronic", waveform: "sine", target: "Calm focus, no headphones", benefit: "A 10 Hz isochronic pulse in the Alpha range — a headphone-free option traditionally used for relaxed focus.", brainwaveBand: "Alpha", color: "#0F766E", emoji: "🎧", safety: "Avoid isochronic if prone to seizures" },
  { id: "iso-gamma-40", label: "Gamma 40 Hz — Sharp (Speaker-Safe)", carrierHz: 200, beatHz: 40, mode: "isochronic", waveform: "sine", target: "Engaged, no headphones", benefit: "A 40 Hz isochronic pulse in the Gamma range — a headphone-free option traditionally used for high-attention sessions.", brainwaveBand: "Gamma", color: "#B91C1C", emoji: "💡", safety: "Avoid isochronic if prone to seizures" }
];

module.exports = { FREQUENCIES };
