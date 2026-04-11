import { useState } from "react";

const AMBER = "#fbbf24";
const CYAN = "#00d4b8";
const BG = "#0a0a12";
const CARD = "#12121e";
const BORDER = "#1e1e30";

const Section = ({ title, icon, children }) => (
  <div style={{ marginBottom: 32 }}>
    <h2 style={{ fontSize: 20, fontWeight: 800, color: AMBER, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
      {icon} {title}
    </h2>
    {children}
  </div>
);

const Metric = ({ label, value, sub, color = "#fff" }) => (
  <div style={{ background: "#16162a", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 20px", textAlign: "center" }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 900, color }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{sub}</div>}
  </div>
);

const Bar = ({ label, value, max, color = AMBER }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "#ccc", marginBottom: 4 }}>
        <span>{label}</span><span style={{ color }}>{value.toLocaleString()}</span>
      </div>
      <div style={{ height: 8, background: "#1a1a30", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: 4, transition: "width 0.5s" }} />
      </div>
    </div>
  );
};

const Table = ({ headers, rows }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr>{headers.map((h, i) => <th key={i} style={{ textAlign: i === 0 ? "left" : "right", padding: "10px 14px", borderBottom: `2px solid ${AMBER}`, color: AMBER, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ background: ri % 2 === 0 ? "transparent" : "#16162a" }}>
            {row.map((cell, ci) => <td key={ci} style={{ textAlign: ci === 0 ? "left" : "right", padding: "10px 14px", color: ci === 0 ? "#ddd" : "#fff", fontWeight: ci === 0 ? 500 : 700, borderBottom: `1px solid ${BORDER}` }}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PricingCard = ({ name, price, annual, features, highlight }) => (
  <div style={{ background: highlight ? `linear-gradient(135deg, #1a1a40, #12122e)` : "#16162a", border: `1px solid ${highlight ? AMBER : BORDER}`, borderRadius: 14, padding: 24, position: "relative", overflow: "hidden" }}>
    {highlight && <div style={{ position: "absolute", top: 12, right: -28, transform: "rotate(45deg)", background: AMBER, color: "#000", fontSize: 9, fontWeight: 800, padding: "4px 36px", letterSpacing: 1 }}>BEST</div>}
    <div style={{ fontSize: 14, fontWeight: 800, color: highlight ? AMBER : "#ccc", textTransform: "uppercase", letterSpacing: 1 }}>{name}</div>
    <div style={{ marginTop: 8 }}>
      <span style={{ fontSize: 36, fontWeight: 900, color: "#fff" }}>${price}</span>
      <span style={{ fontSize: 13, color: "#888" }}>/mo</span>
    </div>
    {annual && <div style={{ fontSize: 11, color: CYAN, marginTop: 4 }}>${annual}/mo billed annually (save 20%)</div>}
    <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
      {features.map((f, i) => <div key={i} style={{ fontSize: 12, color: "#aaa", display: "flex", alignItems: "flex-start", gap: 6 }}><span style={{ color: CYAN, flexShrink: 0 }}>+</span>{f}</div>)}
    </div>
  </div>
);

export default function SONIQValuation() {
  const [tab, setTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "pricing", label: "Pricing", icon: "💰" },
    { id: "valuation", label: "Valuation", icon: "🏦" },
    { id: "licensing", label: "Licensing", icon: "📜" },
    { id: "comps", label: "Competitors", icon: "⚔️" },
  ];

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: BG, color: "#e0e0f0", minHeight: "100vh", padding: "24px 20px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, fontWeight: 900, background: `linear-gradient(135deg, ${AMBER}, ${CYAN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SONIQ</div>
          <div style={{ fontSize: 14, color: "#888", marginTop: 4 }}>Financial Valuation & Pricing Strategy</div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Prepared April 2026 | Confidential</div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, overflowX: "auto", paddingBottom: 4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "10px 18px", borderRadius: 99, border: `1px solid ${tab === t.id ? AMBER : BORDER}`, background: tab === t.id ? `${AMBER}18` : "transparent", color: tab === t.id ? AMBER : "#888", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6, transition: "all .15s" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <div>
            <Section title="What SONIQ Is" icon="🎵">
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 24, lineHeight: 1.8, fontSize: 14, color: "#bbb" }}>
                SONIQ is a <strong style={{ color: "#fff" }}>production-grade AI songwriting studio</strong> with 39,158 lines of code, 39 major features, 24 genre DNA profiles, 42 proprietary data systems, publishing infrastructure, and full Stripe monetization. It generates complete songs with lyrics, production briefs, chord progressions, theory analysis, dopamine maps, visual prompts, and video prompts — all from a single prompt. Deployed on Vercel with Supabase backend and multi-model AI orchestration.
              </div>
            </Section>

            <Section title="Asset Inventory" icon="📦">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                <Metric label="Total Lines of Code" value="39,158" sub="Frontend + Backend" color={AMBER} />
                <Metric label="Major Features" value="39" sub="6 enterprise-grade" color={CYAN} />
                <Metric label="Genre DNA Profiles" value="24" sub="Full production rules" color={AMBER} />
                <Metric label="Data Systems" value="42" sub="Proprietary constants" color={CYAN} />
                <Metric label="API Endpoints" value="14" sub="Serverless on Vercel" color={AMBER} />
                <Metric label="Database Tables" value="6+" sub="Supabase PostgreSQL" color={CYAN} />
                <Metric label="Integrations" value="7" sub="Claude, Stripe, Suno..." color={AMBER} />
                <Metric label="Subscription Tiers" value="4" sub="Free + 3 paid" color={CYAN} />
              </div>
            </Section>

            <Section title="Feature Complexity Breakdown" icon="🧬">
              <Bar label="Enterprise-Grade Systems" value={6} max={39} color={AMBER} />
              <Bar label="Complex Systems" value={12} max={39} color={CYAN} />
              <Bar label="Medium Complexity" value={13} max={39} color="#a78bfa" />
              <Bar label="Simple/Utility" value={8} max={39} color="#888" />
              <div style={{ fontSize: 11, color: "#666", marginTop: 8 }}>Enterprise: Song engine, Genre DNA, Album system, Publishing, Royalty tracking, Admin</div>
            </Section>

            <Section title="Revenue Streams" icon="💎">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                {[
                  { name: "Subscriptions", desc: "$9.99–$49/mo recurring", pct: "70%", color: AMBER },
                  { name: "Publishing Fees", desc: "Copyright registration", pct: "15%", color: CYAN },
                  { name: "Advertising", desc: "Google AdSense", pct: "10%", color: "#a78bfa" },
                  { name: "Affiliates", desc: "Referral commissions", pct: "5%", color: "#f87171" },
                ].map((r, i) => (
                  <div key={i} style={{ background: "#16162a", border: `1px solid ${BORDER}`, borderRadius: 12, padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.name}</div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: r.color }}>{r.pct}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* PRICING TAB */}
        {tab === "pricing" && (
          <div>
            <Section title="Recommended Pricing Tiers" icon="💰">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 14 }}>
                <PricingCard name="Free" price="0" features={["3 lifetime songs", "6 genres", "Basic lyrics + prompt", "Community access"]} />
                <PricingCard name="Starter" price="9.99" annual="7.99" features={["10 songs/month", "All 24 genres", "Production briefs", "Chord progressions", "Visual + video prompts", "Save to library"]} />
                <PricingCard name="Pro" price="19" annual="15" highlight features={["20 songs/month", "Everything in Starter", "Album generator", "Rap Lab", "Batch generation", "Publishing registration", "Sync metadata", "Priority generation"]} />
                <PricingCard name="Studio" price="49" annual="39" features={["50 songs/month", "Everything in Pro", "Platinum mode", "White-label export", "Commercial licensing", "Royalty tracking", "API access", "Priority support"]} />
              </div>
            </Section>

            <Section title="Pricing vs. Market" icon="📈">
              <Table
                headers={["Platform", "Free", "Starter", "Pro", "Top Tier"]}
                rows={[
                  ["SONIQ (Current)", "$0", "$9.99/mo", "$19/mo", "$49/mo"],
                  ["Suno", "50 cr/day", "$10/mo", "$30/mo", "Enterprise"],
                  ["Udio", "Limited", "$10/mo", "$30/mo", "—"],
                  ["Boomy", "1 release", "$9.99/mo", "$29.99/mo", "—"],
                  ["Soundraw", "None", "$11/mo", "$23/mo", "$32/mo"],
                  ["LyricStudio", "Trial", "$3.99/mo", "$9.99/mo", "—"],
                  ["Beatoven", "Limited", "$2.50/mo", "$16.66/mo", "—"],
                ]}
              />
              <div style={{ marginTop: 16, padding: 16, background: "#16162a", borderRadius: 12, border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: CYAN, marginBottom: 8 }}>PRICING INSIGHT</div>
                <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.7 }}>
                  SONIQ's pricing is <strong style={{ color: "#fff" }}>competitive at every tier</strong>. The $9.99 Starter matches Suno/Boomy. The $19 Pro undercuts Suno Premier ($30) while offering more features (publishing, theory, album gen). The $49 Studio tier targets serious creators with commercial licensing — a gap most competitors don't fill. The 20% annual discount is industry-standard.
                </div>
              </div>
            </Section>

            <Section title="Revenue Projections" icon="📊">
              <Table
                headers={["Scenario", "Users", "Paid %", "ARPU", "MRR", "ARR"]}
                rows={[
                  ["Conservative (Year 1)", "2,000", "5%", "$15", "$1,500", "$18K"],
                  ["Moderate (Year 1)", "5,000", "8%", "$18", "$7,200", "$86K"],
                  ["Growth (Year 2)", "15,000", "10%", "$22", "$33,000", "$396K"],
                  ["Scale (Year 3)", "50,000", "12%", "$25", "$150,000", "$1.8M"],
                ]}
              />
            </Section>
          </div>
        )}

        {/* VALUATION TAB */}
        {tab === "valuation" && (
          <div>
            <Section title="What Is SONIQ Worth?" icon="🏦">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14, marginBottom: 20 }}>
                <div style={{ background: `linear-gradient(135deg, #1a1a40, ${CARD})`, border: `1px solid ${AMBER}`, borderRadius: 14, padding: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1.2 }}>Technology Asset Value</div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>(Codebase + IP + Infrastructure)</div>
                  <div style={{ fontSize: 42, fontWeight: 900, color: AMBER, marginTop: 12 }}>$120K–$250K</div>
                  <div style={{ fontSize: 12, color: "#aaa", marginTop: 8, lineHeight: 1.7 }}>
                    39K LOC, 39 features, 42 data systems, 24 genre profiles, full publishing stack, Stripe billing, Supabase auth, Vercel deployment. Equivalent to 6-12 months of senior full-stack development ($150-250K salary).
                  </div>
                </div>
                <div style={{ background: `linear-gradient(135deg, #1a2a30, ${CARD})`, border: `1px solid ${CYAN}`, borderRadius: 14, padding: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1.2 }}>Sale Price Range</div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>(With users + revenue)</div>
                  <div style={{ fontSize: 42, fontWeight: 900, color: CYAN, marginTop: 12 }}>$150K–$500K+</div>
                  <div style={{ fontSize: 12, color: "#aaa", marginTop: 8, lineHeight: 1.7 }}>
                    Depends on ARR at time of sale. Pre-revenue: $120-180K (IP sale). At $100K ARR: $300-500K (3-5x multiple). At $500K ARR: $1.5-3M (strategic acquisition premium).
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Valuation by Method" icon="🧮">
              <Table
                headers={["Method", "Basis", "Multiple", "Value Range"]}
                rows={[
                  ["Cost-to-Rebuild", "Dev time + IP", "1.0-1.5x", "$150K–$250K"],
                  ["Revenue Multiple (Pre-Rev)", "Projected ARR", "3-5x", "$120K–$250K"],
                  ["Revenue Multiple ($100K ARR)", "$100K ARR", "3-5x", "$300K–$500K"],
                  ["Revenue Multiple ($500K ARR)", "$500K ARR", "4-6x", "$2M–$3M"],
                  ["Strategic Acquisition", "IP + Users + Tech", "6-12x", "$500K–$6M+"],
                  ["Comparable (Suno ratio)", "12.25x ARR", "12.25x", "At scale only"],
                ]}
              />
            </Section>

            <Section title="Market Comparable Valuations" icon="📍">
              <Table
                headers={["Company", "Stage", "Valuation", "ARR", "Multiple"]}
                rows={[
                  ["Suno.ai", "Series C", "$2.45B", "$200M", "12.25x"],
                  ["Splice", "Growth", "$500M", "~$50-80M", "6-10x"],
                  ["Endel", "Acquired (WMG)", "Undisclosed", "$15.8M", "~3-5x est."],
                  ["ProducerAI", "Acquired (Google)", "Undisclosed", "Pre-rev", "IP value"],
                  ["Boomy", "Seed", "Undisclosed", "$5.4M raised", "—"],
                  ["SONIQ", "Pre-rev / Early", "$150K–$500K", "Pre-rev", "IP + Tech"],
                ]}
              />
            </Section>

            <Section title="Value Multipliers" icon="🚀">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                {[
                  { factor: "Proprietary Genre DNA", impact: "+30-50%", note: "24 genres, can't be replicated quickly" },
                  { factor: "Publishing Infrastructure", impact: "+20-40%", note: "Legal/regulatory moat" },
                  { factor: "Full-Stack Deployment", impact: "+15-25%", note: "Buyer gets a working product" },
                  { factor: "Music Academia System", impact: "+10-15%", note: "Unique differentiator" },
                  { factor: "Community Forum", impact: "+10-20%", note: "Network effects if active" },
                  { factor: "Stripe + Subs Active", impact: "+25-40%", note: "Revenue engine ready" },
                ].map((f, i) => (
                  <div key={i} style={{ background: "#16162a", border: `1px solid ${BORDER}`, borderRadius: 12, padding: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#ddd" }}>{f.factor}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: CYAN, margin: "6px 0" }}>{f.impact}</div>
                    <div style={{ fontSize: 10, color: "#777" }}>{f.note}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* LICENSING TAB */}
        {tab === "licensing" && (
          <div>
            <Section title="Content Licensing Model" icon="📜">
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 24, marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.8 }}>
                  <strong style={{ color: AMBER }}>Key principle:</strong> Users own what they create. SONIQ provides the tool, not the output rights. This is the industry standard adopted by Suno, Udio, Soundraw, and all major competitors in their paid tiers.
                </div>
              </div>
              <Table
                headers={["Tier", "Commercial Use", "Ownership", "Distribution", "Sync License"]}
                rows={[
                  ["Free", "No", "SONIQ retains", "No", "No"],
                  ["Starter", "Yes", "User owns", "Yes", "No"],
                  ["Pro", "Yes", "User owns", "Yes", "Basic metadata"],
                  ["Studio", "Full commercial", "User owns", "Unlimited", "Full sync pack"],
                ]}
              />
            </Section>

            <Section title="Platform Licensing Options" icon="🔑">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
                {[
                  { name: "SaaS Subscription", price: "$9.99–$49/mo", desc: "Standard B2C model. Users pay monthly for access to the song generation engine. Most scalable path.", color: AMBER },
                  { name: "White-Label License", price: "$5K–$25K/yr", desc: "License the engine to other platforms (music schools, studios, labels) who rebrand it. High-margin, low-volume.", color: CYAN },
                  { name: "API Access", price: "$0.10–$0.50/generation", desc: "Per-call API pricing for developers building on top of SONIQ's engine. Usage-based revenue.", color: "#a78bfa" },
                  { name: "Full IP Sale", price: "$150K–$500K+", desc: "One-time sale of entire codebase, data systems, domain, and deployment. Clean exit.", color: "#f87171" },
                ].map((l, i) => (
                  <div key={i} style={{ background: "#16162a", border: `1px solid ${BORDER}`, borderRadius: 14, padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: l.color }}>{l.name}</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "8px 0" }}>{l.price}</div>
                    <div style={{ fontSize: 12, color: "#999", lineHeight: 1.7 }}>{l.desc}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Copyright & Legal Framework" icon="⚖️">
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 20 }}>
                {[
                  { q: "Who owns AI-generated lyrics?", a: "The user who created them with SONIQ — same as Suno, Udio. SONIQ's publishing system registers copyright on the user's behalf." },
                  { q: "Can users monetize songs commercially?", a: "Yes, on all paid plans. Free tier is non-commercial only. This matches industry standard." },
                  { q: "Does SONIQ own the Genre DNA data?", a: "Yes — the 24 genre profiles, 42 data constants, Music Academia system, and production cue library are SONIQ proprietary IP. This is the core asset in any sale." },
                  { q: "Are there music licensing risks?", a: "Low. SONIQ generates original lyrics via Claude API — no samples, no copyrighted audio. The US Copyright Office (Jan 2025) ruled AI-generated content may have limited copyright protection, but this applies to all AI music tools equally." },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "14px 0", borderBottom: i < 3 ? `1px solid ${BORDER}` : "none" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: CYAN, marginBottom: 6 }}>{item.q}</div>
                    <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.7 }}>{item.a}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* COMPETITORS TAB */}
        {tab === "comps" && (
          <div>
            <Section title="Competitive Landscape" icon="⚔️">
              <Table
                headers={["Platform", "Type", "Pricing", "Valuation/Funding", "SONIQ Edge"]}
                rows={[
                  ["Suno", "Full music gen", "$10–$30/mo", "$2.45B / $375M raised", "SONIQ adds theory, publishing, visual prompts"],
                  ["Udio", "Full music gen", "$10–$30/mo", "Funded, undisclosed", "SONIQ adds lyrics-first workflow"],
                  ["Boomy", "Simple gen", "$10–$30/mo", "$5.4M raised", "SONIQ far more features + depth"],
                  ["Soundraw", "Loop-based", "$11–$32/mo", "Private", "SONIQ generates lyrics + theory"],
                  ["LyricStudio", "Lyrics only", "$4–$10/mo", "Private", "SONIQ adds production, chords, publishing"],
                  ["Beatoven", "Background music", "$2.50–$17/mo", "Private", "SONIQ is songwriter-focused"],
                ]}
              />
            </Section>

            <Section title="SONIQ's Unique Moat" icon="🏰">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
                {[
                  { name: "No competitor has all of these together:", items: ["24 genre DNA profiles with production rules", "Music theory bible (chords, scales, modes)", "6 academic frameworks (MIT, Harvard, NYU)", "240 Suno production cues with learning", "Era x Genre cross-logic (50s-Now)", "Publishing registration (E-SIGN compliant)", "Visual + Video prompt generation", "Hook score + Song score analysis"] },
                  { name: "Suno/Udio generate AUDIO. SONIQ generates:", items: ["Complete lyrics with structure", "Production briefs for ANY platform", "Chord progressions with theory", "Dopamine maps (neuroscience-backed)", "Sync licensing metadata", "Cover art + music video prompts", "Album concepts (10-15 tracks)", "The full songwriter's toolkit"] },
                ].map((m, i) => (
                  <div key={i} style={{ background: "#16162a", border: `1px solid ${BORDER}`, borderRadius: 14, padding: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? AMBER : CYAN, marginBottom: 12 }}>{m.name}</div>
                    {m.items.map((item, j) => <div key={j} style={{ fontSize: 12, color: "#aaa", padding: "3px 0", display: "flex", gap: 8 }}><span style={{ color: i === 0 ? AMBER : CYAN }}>+</span>{item}</div>)}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="TAM — Total Addressable Market" icon="🌍">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                <Metric label="AI Music Market (2025)" value="$6.7B" color={AMBER} />
                <Metric label="Projected (2035)" value="$60B+" sub="27-28% CAGR" color={CYAN} />
                <Metric label="Cloud SaaS Segment" value="$4.8B" sub="74% of market" color={AMBER} />
                <Metric label="Musicians Using AI" value="60%" sub="of all musicians (2025)" color={CYAN} />
              </div>
            </Section>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 40, padding: 20, borderTop: `1px solid ${BORDER}`, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#555" }}>SONIQ Financial Valuation Report | NuWav Media | April 2026</div>
          <div style={{ fontSize: 10, color: "#444", marginTop: 4 }}>This document is confidential and intended for internal use only. Not financial advice.</div>
        </div>
      </div>
    </div>
  );
}