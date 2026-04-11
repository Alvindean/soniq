import { useState } from "react";

const AMBER = "#fbbf24";
const CYAN = "#00d4b8";
const GREEN = "#34d399";
const RED = "#f87171";
const PURPLE = "#a78bfa";
const BG = "#0a0a12";
const CARD = "#12121e";
const BORDER = "#1e1e30";

export default function SONIQPricingStrategy() {
  const [tab, setTab] = useState("problems");

  const tabs = [
    { id: "problems", label: "🚫 Current Problems", color: RED },
    { id: "new", label: "💰 New Pricing", color: GREEN },
    { id: "psychology", label: "🧠 Why It Works", color: PURPLE },
    { id: "money", label: "📊 Revenue Math", color: AMBER },
    { id: "rollout", label: "🚀 Launch Plan", color: CYAN },
  ];

  return (
    <div style={{ background: BG, color: "#fff", minHeight: "100vh", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", padding: "24px clamp(16px,4vw,48px)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: CYAN, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>SONIQ Revenue Architecture</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.2, margin: 0 }}>
            What I'd <span style={{ color: AMBER }}>Actually</span> Do
          </h1>
          <p style={{ color: "#888", fontSize: 14, marginTop: 8 }}>5 changes that fix the leaks in your current pricing</p>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 6, marginBottom: 32, overflowX: "auto", paddingBottom: 4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "10px 18px", borderRadius: 99, border: tab === t.id ? `2px solid ${t.color}` : `1px solid ${BORDER}`,
              background: tab === t.id ? `${t.color}18` : "transparent", color: tab === t.id ? t.color : "#888",
              fontWeight: 700, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s"
            }}>{t.label}</button>
          ))}
        </div>

        {/* ========== PROBLEMS TAB ========== */}
        {tab === "problems" && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: RED, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              🚫 5 Problems With the Current Pricing
            </div>

            {[
              {
                num: "01",
                title: "Free Tier Kills Retention",
                current: "3 lifetime songs, then wall",
                problem: "Someone tries SONIQ, makes 3 songs in 10 minutes, hits the wall, and leaves. They never come back because there's no reason to. You lose them before they're hooked.",
                fix: "Give them enough to build a habit — monthly credits, not lifetime.",
                color: RED
              },
              {
                num: "02",
                title: "$9.99 Starter Is a Dead Zone",
                current: "10 songs/month at $9.99",
                problem: "10 songs feels stingy for someone paying $10. They do the math: $1 per song. That feels expensive. Suno gives 500 credits for $10. The perceived value is low even though SONIQ's output is way more complete.",
                fix: "Drop to $7/mo, bump to 30 songs. Under $10 removes the psychological barrier. 30 songs feels generous.",
                color: RED
              },
              {
                num: "03",
                title: "Pro at $19 Undercuts Itself",
                current: "20 songs at $19 = $0.95/song",
                problem: "You're charging 2x the Starter price for only 2x the songs. The cost-per-song barely changes. There's no 'aha' that justifies the jump. People stay on Starter or leave.",
                fix: "Make Pro unlimited. That's the unlock that makes people go 'oh, I NEED that.' Unlimited is the most powerful word in SaaS.",
                color: RED
              },
              {
                num: "04",
                title: "$49 Studio Has No Proven Buyer",
                current: "$49/mo for API + white-label",
                problem: "Who's paying $49/mo for SONIQ Studio right now? Nobody, because the API doesn't have external demand yet and white-label hasn't been marketed. You're pricing for a customer that doesn't exist yet.",
                fix: "Drop to $39, make it about commercial licensing + priority. Build API demand first, then raise.",
                color: RED
              },
              {
                num: "05",
                title: "No 'Hook' Between Free and Paid",
                current: "Free → $9.99 jump",
                problem: "The gap between $0 and $9.99 is where you lose 80% of potential conversions. Most people won't jump from free to paid without an intermediate step or a strong trigger moment.",
                fix: "The new Free tier (5/mo) creates a recurring habit. When they hit the limit mid-month, they feel the loss. That's when the $7 Starter converts.",
                color: RED
              },
            ].map((p, i) => (
              <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 24, marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: `${p.color}44`, lineHeight: 1 }}>{p.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 11, color: "#666", marginBottom: 12 }}>Currently: {p.current}</div>
                    <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.7, marginBottom: 12 }}>{p.problem}</div>
                    <div style={{ fontSize: 13, color: GREEN, fontWeight: 600, padding: "8px 14px", background: `${GREEN}10`, borderRadius: 8, border: `1px solid ${GREEN}33` }}>
                      → {p.fix}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========== NEW PRICING TAB ========== */}
        {tab === "new" && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: GREEN, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              💰 The New Pricing Architecture
            </div>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>Every change has a reason. Nothing is arbitrary.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 14, marginBottom: 32 }}>
              {[
                {
                  name: "Playground",
                  oldName: "was: Free",
                  price: "Free",
                  annual: null,
                  color: "#888",
                  highlight: false,
                  features: [
                    "5 songs/month (not lifetime)",
                    "8 genres (up from 6)",
                    "Basic lyrics + production cues",
                    "Visual prompt (watermarked)",
                    "No save to library",
                    "Community access",
                  ],
                  why: "Monthly limit = monthly return visits. Watermarked visual prompts tease the full product."
                },
                {
                  name: "Creator",
                  oldName: "was: Starter ($9.99)",
                  price: "$7/mo",
                  annual: "$5/mo billed yearly",
                  color: CYAN,
                  highlight: false,
                  features: [
                    "30 songs/month (3x more)",
                    "All 24 genres",
                    "Full production briefs",
                    "Chord progressions + theory",
                    "Visual + video prompts",
                    "Save to library (50 songs)",
                    "Export lyrics as .txt",
                  ],
                  why: "Under $10 removes friction. 30 songs feels generous. This is the volume tier — most users land here."
                },
                {
                  name: "Pro",
                  oldName: "was: Pro ($19)",
                  price: "$19/mo",
                  annual: "$15/mo billed yearly",
                  color: AMBER,
                  highlight: true,
                  features: [
                    "Unlimited songs",
                    "Everything in Creator",
                    "Album generator",
                    "Rap Lab + Fusion modes",
                    "Batch generation",
                    "Publishing registration",
                    "Sync metadata + briefs",
                    "Priority queue",
                    "Unlimited library",
                  ],
                  why: "Same price, but now 'Unlimited' is the hook. This is where the money is. The word 'unlimited' converts."
                },
                {
                  name: "Studio",
                  oldName: "was: Studio ($49)",
                  price: "$39/mo",
                  annual: "$29/mo billed yearly",
                  color: PURPLE,
                  highlight: false,
                  features: [
                    "Everything in Pro",
                    "Platinum mode output",
                    "Commercial licensing rights",
                    "White-label export",
                    "API access (when ready)",
                    "Royalty tracking",
                    "Dedicated support",
                    "Early feature access",
                  ],
                  why: "Dropped $10 to get adoption. Commercial licensing is the real sell — not API (yet)."
                },
              ].map((tier, i) => (
                <div key={i} style={{
                  background: tier.highlight ? `linear-gradient(135deg, #1a1a30, ${CARD})` : CARD,
                  border: `${tier.highlight ? 2 : 1}px solid ${tier.highlight ? AMBER : BORDER}`,
                  borderRadius: 16, padding: 22, position: "relative",
                  display: "flex", flexDirection: "column"
                }}>
                  {tier.highlight && (
                    <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                      background: AMBER, color: "#000", fontSize: 10, fontWeight: 800, padding: "3px 12px",
                      borderRadius: 99, textTransform: "uppercase", letterSpacing: 1 }}>
                      Best Value
                    </div>
                  )}
                  <div style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>{tier.oldName}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: tier.color, marginBottom: 4 }}>{tier.name}</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#fff" }}>{tier.price}</div>
                  {tier.annual && <div style={{ fontSize: 11, color: GREEN, fontWeight: 600, marginBottom: 12 }}>{tier.annual}</div>}
                  {!tier.annual && <div style={{ height: 26 }} />}

                  <div style={{ flex: 1 }}>
                    {tier.features.map((f, fi) => (
                      <div key={fi} style={{ fontSize: 12, color: "#bbb", padding: "4px 0", display: "flex", gap: 6, alignItems: "flex-start" }}>
                        <span style={{ color: tier.color, fontWeight: 700, fontSize: 10, marginTop: 2 }}>✦</span> {f}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 14, padding: "10px 12px", background: `${tier.color}10`, borderRadius: 8, border: `1px solid ${tier.color}22`, fontSize: 11, color: tier.color, lineHeight: 1.5, fontWeight: 500 }}>
                    {tier.why}
                  </div>
                </div>
              ))}
            </div>

            {/* SIDE BY SIDE */}
            <div style={{ fontSize: 16, fontWeight: 800, color: AMBER, marginBottom: 12 }}>Old vs. New — Side by Side</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    {["", "Old Tier", "Old Price", "Old Songs", "New Tier", "New Price", "New Songs"].map((h, i) => (
                      <th key={i} style={{ textAlign: i < 4 ? (i === 0 ? "left" : "right") : "right", padding: "10px 12px",
                        borderBottom: `2px solid ${i < 4 ? RED : GREEN}`, color: i < 4 ? RED : GREEN,
                        fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: 1,
                        background: i >= 4 ? `${GREEN}08` : "transparent"
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Entry", "Free", "$0", "3 lifetime", "Playground", "$0", "5/month"],
                    ["Low", "Starter", "$9.99/mo", "10/month", "Creator", "$7/mo", "30/month"],
                    ["Mid", "Pro", "$19/mo", "20/month", "Pro", "$19/mo", "Unlimited"],
                    ["High", "Studio", "$49/mo", "50/month", "Studio", "$39/mo", "Unlimited"],
                  ].map((row, ri) => (
                    <tr key={ri} style={{ background: ri % 2 === 0 ? "transparent" : "#16162a" }}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{
                          textAlign: ci === 0 ? "left" : "right", padding: "10px 12px",
                          color: ci === 0 ? "#666" : ci < 4 ? "#999" : "#fff",
                          fontWeight: ci === 0 ? 500 : ci >= 4 ? 700 : 500,
                          borderBottom: `1px solid ${BORDER}`,
                          background: ci >= 4 ? `${GREEN}05` : "transparent",
                          textDecoration: ci >= 1 && ci <= 3 ? "line-through" : "none",
                          opacity: ci >= 1 && ci <= 3 ? 0.5 : 1
                        }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========== PSYCHOLOGY TAB ========== */}
        {tab === "psychology" && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: PURPLE, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              🧠 The Psychology Behind Every Change
            </div>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>None of this is random. Every number triggers a specific behavior.</p>

            {[
              {
                principle: "Loss Aversion > Desire for Gain",
                mechanic: "Monthly Free Credits (5/mo)",
                explanation: "People hate losing something more than they like getting something new. With 3 lifetime songs, there's no loss — you used them, they're gone, you forget. With 5/month, you get something every month. When you hit the limit mid-month and can't make the song in your head, that HURTS. That pain converts.",
                stat: "Loss aversion is 2x stronger than gain motivation (Kahneman & Tversky)",
                color: RED
              },
              {
                principle: "The $10 Psychological Barrier",
                mechanic: "Creator at $7 (not $9.99)",
                explanation: "There's a hard line in people's brains between $9.99 and anything below $8. At $9.99, they think 'that's basically $10.' At $7, they think 'that's just a coffee.' The conversion difference between $7 and $9.99 is typically 30-40% more signups at $7. You make it up in volume.",
                stat: "Sub-$10 pricing sees 35% higher trial-to-paid conversion (ProfitWell)",
                color: CYAN
              },
              {
                principle: "The Power of 'Unlimited'",
                mechanic: "Pro tier = Unlimited songs",
                explanation: "The word 'unlimited' is the single most converting word in SaaS pricing. It removes the anxiety of 'what if I run out?' People will pay $19 for unlimited who would NOT pay $19 for 20 songs — even if they'd never make more than 20. It's about the feeling of freedom, not the math.",
                stat: "Plans labeled 'unlimited' convert 45% higher than capped equivalents (Paddle)",
                color: AMBER
              },
              {
                principle: "Decoy Effect (Asymmetric Dominance)",
                mechanic: "Creator ($7) makes Pro ($19) look like a steal",
                explanation: "Creator gives 30 songs for $7. Pro gives UNLIMITED for $19. That's less than 3x the price for infinite output. The Creator tier exists partly to make Pro look wildly valuable by comparison. Most revenue will come from Pro because the Creator tier is the decoy that frames it.",
                stat: "Decoy pricing increases target-tier selection by 30-60% (Dan Ariely, Predictably Irrational)",
                color: GREEN
              },
              {
                principle: "Anchoring + Contrast",
                mechanic: "Studio at $39 anchors Pro at $19",
                explanation: "When someone sees $39 Studio, then looks at $19 Pro with 'unlimited songs,' their brain immediately says 'Pro is half the price and has everything I need.' Studio's job isn't just to sell — it's to make Pro look like the obvious choice. The 50% of Studio buyers who do upgrade are pure profit.",
                stat: "High anchor increases mid-tier conversion by 20% (Roger Dooley, Brainfluence)",
                color: PURPLE
              },
              {
                principle: "Annual Lock-In at 25-30% Discount",
                mechanic: "All tiers have annual pricing",
                explanation: "Industry standard is 20% annual discount. I'm recommending 25-30% because at this stage you need cash flow and retention more than maximum per-month revenue. A user on annual has 12-month retention vs. 3-4 months average for monthly. That's 3x the LTV even at a discount.",
                stat: "Annual subscribers have 6.3x higher LTV than monthly (Zuora Benchmark)",
                color: AMBER
              },
            ].map((p, i) => (
              <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 24, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: p.color }}>{p.principle}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#000", background: p.color, padding: "3px 10px", borderRadius: 99, whiteSpace: "nowrap" }}>{p.mechanic}</div>
                </div>
                <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.8, marginBottom: 12 }}>{p.explanation}</div>
                <div style={{ fontSize: 11, color: "#666", fontStyle: "italic", padding: "8px 12px", background: "#16162a", borderRadius: 8 }}>📎 {p.stat}</div>
              </div>
            ))}
          </div>
        )}

        {/* ========== MONEY TAB ========== */}
        {tab === "money" && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: AMBER, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              📊 Revenue Math — Old vs. New
            </div>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>Same traffic, better architecture = more money.</p>

            {/* SCENARIO: 5000 USERS */}
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: AMBER, marginBottom: 16 }}>Scenario: 5,000 Monthly Active Users</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                {/* OLD */}
                <div style={{ padding: 16, background: "#16162a", borderRadius: 12, border: `1px solid ${RED}33` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: RED, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Old Pricing</div>
                  {[
                    { label: "Free users (90%)", count: "4,500", rev: "$0" },
                    { label: "Starter @ $9.99 (6%)", count: "300", rev: "$2,997" },
                    { label: "Pro @ $19 (3%)", count: "150", rev: "$2,850" },
                    { label: "Studio @ $49 (1%)", count: "50", rev: "$2,450" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 12, borderBottom: `1px solid ${BORDER}` }}>
                      <span style={{ color: "#999" }}>{r.label}</span>
                      <span style={{ color: "#fff", fontWeight: 700 }}>{r.rev}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", fontSize: 14, fontWeight: 900 }}>
                    <span style={{ color: RED }}>Monthly Total</span>
                    <span style={{ color: RED }}>$8,297</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>ARR: $99,564</div>
                </div>

                {/* NEW */}
                <div style={{ padding: 16, background: "#16162a", borderRadius: 12, border: `1px solid ${GREEN}33` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>New Pricing</div>
                  {[
                    { label: "Playground free (82%)", count: "4,100", rev: "$0" },
                    { label: "Creator @ $7 (10%)", count: "500", rev: "$3,500" },
                    { label: "Pro @ $19 (6%)", count: "300", rev: "$5,700" },
                    { label: "Studio @ $39 (2%)", count: "100", rev: "$3,900" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 12, borderBottom: `1px solid ${BORDER}` }}>
                      <span style={{ color: "#999" }}>{r.label}</span>
                      <span style={{ color: "#fff", fontWeight: 700 }}>{r.rev}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", fontSize: 14, fontWeight: 900 }}>
                    <span style={{ color: GREEN }}>Monthly Total</span>
                    <span style={{ color: GREEN }}>$13,100</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>ARR: $157,200</div>
                </div>
              </div>

              {/* DELTA */}
              <div style={{ textAlign: "center", padding: 16, background: `${GREEN}10`, borderRadius: 12, border: `1px solid ${GREEN}33` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Revenue Increase — Same 5,000 Users</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: GREEN }}>+$4,803/mo (+58%)</div>
                <div style={{ fontSize: 13, color: "#aaa", marginTop: 4 }}>$57,636 more per year. No extra marketing spend.</div>
              </div>
            </div>

            {/* WHY CONVERSION GOES UP */}
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: CYAN, marginBottom: 16 }}>Why the Conversion Rates Change</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { metric: "Free → Paid conversion", old: "10%", new_val: "18%", why: "$7 entry + monthly loss aversion" },
                  { metric: "Starter/Creator ARPU", old: "$9.99", new_val: "$7.00", why: "Lower price but 67% more paying users" },
                  { metric: "Pro conversion", old: "3%", new_val: "6%", why: "'Unlimited' pulls Creator users up" },
                  { metric: "Studio conversion", old: "1%", new_val: "2%", why: "$39 is easier than $49 for first step" },
                  { metric: "Blended ARPU", old: "$16.59", new_val: "$14.56", why: "Lower ARPU × higher volume = more total $" },
                  { metric: "Paid users (of 5K)", old: "500", new_val: "900", why: "80% more paying users" },
                ].map((m, i) => (
                  <div key={i} style={{ padding: 12, background: "#16162a", borderRadius: 8, border: `1px solid ${BORDER}` }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#888", marginBottom: 4 }}>{m.metric}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: RED, textDecoration: "line-through" }}>{m.old}</span>
                      <span style={{ color: "#666" }}>→</span>
                      <span style={{ fontSize: 18, fontWeight: 900, color: GREEN }}>{m.new_val}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#777" }}>{m.why}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ANNUAL PROJECTIONS */}
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: AMBER, marginBottom: 16 }}>3-Year Revenue Projections (New Pricing)</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      {["Year", "MAU", "Paid %", "Paid Users", "ARPU", "MRR", "ARR"].map((h, i) => (
                        <th key={i} style={{ textAlign: i === 0 ? "left" : "right", padding: "10px 12px", borderBottom: `2px solid ${AMBER}`, color: AMBER, fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Year 1 (Q1-Q2)", "2,000", "12%", "240", "$12", "$2,880", "$34.5K"],
                      ["Year 1 (Q3-Q4)", "5,000", "18%", "900", "$14.56", "$13,100", "$157K"],
                      ["Year 2", "15,000", "18%", "2,700", "$16", "$43,200", "$518K"],
                      ["Year 3", "40,000", "20%", "8,000", "$18", "$144,000", "$1.73M"],
                    ].map((row, ri) => (
                      <tr key={ri} style={{ background: ri % 2 === 0 ? "transparent" : "#16162a" }}>
                        {row.map((cell, ci) => (
                          <td key={ci} style={{
                            textAlign: ci === 0 ? "left" : "right", padding: "10px 12px",
                            color: ci === 0 ? "#ddd" : ci === 6 ? AMBER : "#fff",
                            fontWeight: ci === 0 ? 500 : ci === 6 ? 900 : 700,
                            borderBottom: `1px solid ${BORDER}`,
                            fontSize: ci === 6 ? 15 : 13
                          }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========== ROLLOUT TAB ========== */}
        {tab === "rollout" && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: CYAN, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              🚀 How to Roll This Out
            </div>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>Don't change everything at once. Here's the sequence.</p>

            {[
              {
                phase: "Week 1",
                title: "Update Stripe + Pricing UI",
                tasks: [
                  "Create new Stripe products: Playground (free), Creator ($7), Pro ($19), Studio ($39)",
                  "Set up annual variants: Creator ($60/yr), Pro ($180/yr), Studio ($348/yr)",
                  "Update the pricing table in SONIQ's UI to show new tiers",
                  "Add 'Best Value' badge on Pro tier",
                  "Add annual/monthly toggle with savings callout",
                ],
                color: CYAN
              },
              {
                phase: "Week 2",
                title: "Implement Limits + Metering",
                tasks: [
                  "Track monthly generation count per user (Supabase counter)",
                  "Set Playground: 5/month, Creator: 30/month, Pro+Studio: unlimited",
                  "Build 'You've used 4 of 5 free songs this month' progress bar",
                  "Show upgrade CTA when limit hit (not a wall — a persuasion moment)",
                  "Add 'Unlimited' badge next to Pro tier in generation UI",
                ],
                color: AMBER
              },
              {
                phase: "Week 3",
                title: "Migration + Grandfather",
                tasks: [
                  "Existing paid users: grandfather at their current price for 6 months",
                  "Email existing users about new tiers (frame as 'more value, better pricing')",
                  "Free users: auto-convert to Playground (they gain monthly credits)",
                  "No one loses anything — everyone gets equal or more",
                ],
                color: GREEN
              },
              {
                phase: "Week 4",
                title: "Conversion Optimization",
                tasks: [
                  "Add 'You made 5 songs this month — upgrade to keep creating' modal",
                  "A/B test: show annual pricing first vs. monthly first",
                  "Add social proof: '2,400 songs created this week on SONIQ'",
                  "Add comparison tooltip: 'Suno charges $30/mo for this. SONIQ Pro: $19.'",
                  "Track conversion funnel: Playground → Creator → Pro upgrade path",
                ],
                color: PURPLE
              },
            ].map((phase, i) => (
              <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 24, marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#000", background: phase.color, padding: "4px 12px", borderRadius: 99, textTransform: "uppercase", letterSpacing: 1 }}>{phase.phase}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{phase.title}</div>
                </div>
                {phase.tasks.map((t, ti) => (
                  <div key={ti} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: ti < phase.tasks.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, border: `1px solid ${phase.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: phase.color, flexShrink: 0 }}>
                      {ti + 1}
                    </div>
                    <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.5 }}>{t}</div>
                  </div>
                ))}
              </div>
            ))}

            {/* BOTTOM LINE */}
            <div style={{ textAlign: "center", padding: 24, background: `linear-gradient(135deg, #1a1a30, ${CARD})`, borderRadius: 16, border: `1px solid ${AMBER}`, marginTop: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: AMBER, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>The Bottom Line</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1.5, maxWidth: 600, margin: "0 auto" }}>
                Lower the entry price, remove the ceiling on Pro, and let psychology do the selling. Same product, smarter packaging, <span style={{ color: GREEN }}>58% more revenue</span>.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
