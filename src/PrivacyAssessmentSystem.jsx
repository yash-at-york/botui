import { useState } from "react";

const C = {
  deepTeal: "#1A5C54", teal: "#247A70", tealLight: "#2D9B8F",
  sage: "#7BA899", sageMuted: "#A4C5B8",
  warmStone: "#E8DFD3", cream: "#FAF7F2", linen: "#F5F0EA", sand: "#D4CABC",
  amberGold: "#D4A853", amberLight: "#E8C97A",
  softCoral: "#E8876F", coralLight: "#F0A896",
  charcoal: "#2C2C2E", darkSlate: "#3D3D40", midGray: "#8E8E93", lightGray: "#C7C7CC",
  sky: "#6BA3BE", skyLight: "#9DC4D4",
};

const fH = `'Fraunces', 'Georgia', serif`;
const fB = `'DM Sans', 'Helvetica Neue', sans-serif`;

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes growIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
@keyframes progressFill { from { width: 0%; } }
@keyframes pulseGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(26,92,84,0.12); } 50% { box-shadow: 0 0 16px 3px rgba(26,92,84,0.08); } }
@keyframes slideDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 400px; } }
@keyframes dotPulse { 0%,80%,100% { transform: scale(0.6); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }
@keyframes shimmerBar { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
* { box-sizing: border-box; margin: 0; padding: 0; }
*::-webkit-scrollbar { width: 5px; }
*::-webkit-scrollbar-track { background: transparent; }
*::-webkit-scrollbar-thumb { background: rgba(26,92,84,0.12); border-radius: 10px; }
`;

const Ic = {
  Shield: ({ s=16, c=C.teal }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  Leaf: ({ s=16, c=C.teal }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5-3.5 2-7.5 2-12 0-2.5-.5-5.5-2-8z"/><path d="M8 14c2-2 4-3 6-4"/></svg>,
  Eye: ({ s=14, c=C.midGray }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: ({ s=14, c=C.midGray }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Trash: ({ s=14, c=C.softCoral }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  Lock: ({ s=14, c=C.deepTeal }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  Send: ({ s=16, c="#fff" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>,
  Sparkle: ({ s=14, c=C.amberGold }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>,
  Check: ({ s=12, c=C.teal }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>,
};

// ═══════════════════════════════════════════════════
// TOGGLE SWITCH
// ═══════════════════════════════════════════════════
const Toggle = ({ on, onChange, color = C.teal }) => (
  <button onClick={onChange} style={{
    width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer",
    background: on ? color : C.lightGray,
    position: "relative", transition: "background 0.25s ease", flexShrink: 0,
  }}>
    <div style={{
      width: 16, height: 16, borderRadius: "50%", background: "#fff",
      position: "absolute", top: 3,
      left: on ? 21 : 3,
      transition: "left 0.25s ease",
      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
    }} />
  </button>
);

// ═══════════════════════════════════════════════════
// PRIVACY CONTROL CENTER
// ═══════════════════════════════════════════════════
const PrivacyCenter = () => {
  const [toggles, setToggles] = useState({
    corePersonalization: true,
    crossSession: true,
    coachThemes: true,
    coachFull: false,
    adminAggregated: true,
    platformImprovement: false,
  });

  const [expandedMemory, setExpandedMemory] = useState(null);

  const memories = [
    { id: 0, category: "Assessment", items: ["Behavioral profile: Analytical-Empathetic", "Top strength: Analytical thinking (85th percentile)", "Growth area: Assertiveness (48th percentile)"], icon: "📊" },
    { id: 1, category: "Goals", items: ["Improve team communication (set Mar 20)", "Lead with empathy in 1:1s", "Handle conflict constructively"], icon: "🎯" },
    { id: 2, category: "Conversation Themes", items: ["Discussed assertiveness 6 times this month", "Exploring Data-Feeling-Request framework", "Upcoming conflict with team lead"], icon: "💬" },
    { id: 3, category: "Preferences", items: ["Prefers structured frameworks", "Responds well to analytical framing", "Values privacy — opted out of full coach sharing"], icon: "⚙️" },
  ];

  const t = (key) => setToggles(p => ({ ...p, [key]: !p[key] }));

  const privacyScore = Object.values(toggles).filter(v => !v).length * 15 + 40;

  return (
    <div style={{ display: "flex", gap: 20, height: "100%", animation: "fadeInUp 0.4s ease-out" }}>
      {/* Left: Privacy Controls */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", paddingRight: 10 }}>
        {/* Privacy Score */}
        <div style={{
          padding: "20px", borderRadius: 16,
          background: `linear-gradient(135deg, ${C.deepTeal}08, ${C.teal}04)`,
          border: `1px solid ${C.teal}20`,
          display: "flex", alignItems: "center", gap: 20,
        }}>
          <div style={{ position: "relative", width: 70, height: 70 }}>
            <svg width={70} height={70} style={{ transform: "rotate(-90deg)" }}>
              <circle cx={35} cy={35} r={30} fill="none" stroke={C.warmStone} strokeWidth={4} />
              <circle cx={35} cy={35} r={30} fill="none" stroke={C.deepTeal} strokeWidth={4}
                strokeDasharray={2*Math.PI*30} strokeDashoffset={2*Math.PI*30*(1-privacyScore/100)}
                strokeLinecap="round" style={{ transition: "all 0.8s ease" }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ic.Shield s={22} c={C.deepTeal} />
            </div>
          </div>
          <div>
            <div style={{ fontFamily: fH, fontSize: "18px", fontWeight: 500, color: C.charcoal }}>
              Privacy Score: <span style={{ color: C.deepTeal }}>{privacyScore}%</span>
            </div>
            <div style={{ fontFamily: fB, fontSize: "12px", color: C.midGray, lineHeight: 1.5, marginTop: 4 }}>
              Your data is under your control. Adjust what's shared and with whom below.
            </div>
          </div>
        </div>

        {/* Data Flow Visualization */}
        <div style={{ padding: "18px", borderRadius: 16, border: `1px solid ${C.warmStone}` }}>
          <div style={{ fontFamily: fH, fontSize: "14px", fontWeight: 500, color: C.charcoal, marginBottom: 14 }}>
            Who Sees What
          </div>

          {/* Visual flow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 20 }}>
            {/* You */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", margin: "0 auto 6px",
                background: `linear-gradient(135deg, ${C.sky}, ${C.teal})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: fB, fontSize: "14px", fontWeight: 600, color: "#fff",
              }}>You</div>
              <div style={{ fontFamily: fB, fontSize: "10px", color: C.midGray }}>Full access</div>
            </div>

            {/* Arrow */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 40, height: 2, background: `${C.teal}30` }} />
              <span style={{ fontFamily: fB, fontSize: "8px", color: C.lightGray }}>ENCRYPTED</span>
            </div>

            {/* AI */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", margin: "0 auto 6px",
                background: `linear-gradient(135deg, ${C.deepTeal}, ${C.tealLight})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Ic.Leaf s={20} c="#fff" />
              </div>
              <div style={{ fontFamily: fB, fontSize: "10px", color: C.midGray }}>Assessment + Memory</div>
            </div>

            {/* Arrow */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 40, height: 2, background: toggles.coachThemes ? `${C.amberGold}50` : `${C.lightGray}40`, transition: "all 0.3s ease" }} />
              <span style={{ fontFamily: fB, fontSize: "8px", color: toggles.coachThemes ? C.amberGold : C.lightGray }}>
                {toggles.coachThemes ? "THEMES ONLY" : "BLOCKED"}
              </span>
            </div>

            {/* Coach */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", margin: "0 auto 6px",
                background: toggles.coachThemes ? `linear-gradient(135deg, ${C.amberGold}, ${C.amberLight})` : C.lightGray,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s ease",
              }}>
                <Ic.Sparkle s={18} c="#fff" />
              </div>
              <div style={{ fontFamily: fB, fontSize: "10px", color: C.midGray }}>
                {toggles.coachFull ? "Full summaries" : toggles.coachThemes ? "Themes only" : "No access"}
              </div>
            </div>

            {/* Arrow */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 40, height: 2, background: toggles.adminAggregated ? `${C.sage}40` : `${C.lightGray}40`, transition: "all 0.3s ease" }} />
              <span style={{ fontFamily: fB, fontSize: "8px", color: toggles.adminAggregated ? C.sage : C.lightGray }}>
                {toggles.adminAggregated ? "AGGREGATED" : "BLOCKED"}
              </span>
            </div>

            {/* Admin */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", margin: "0 auto 6px",
                background: toggles.adminAggregated ? `linear-gradient(135deg, ${C.sage}, ${C.sageMuted})` : C.lightGray,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s ease",
                fontFamily: fB, fontSize: "12px", fontWeight: 600, color: "#fff",
              }}>
                Org
              </div>
              <div style={{ fontFamily: fB, fontSize: "10px", color: C.midGray }}>
                {toggles.adminAggregated ? "Anonymous stats only" : "No access"}
              </div>
            </div>
          </div>

          {/* Toggle controls */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { key: "corePersonalization", label: "Core personalization", desc: "AI uses your assessment data to personalize coaching", locked: true, color: C.teal },
              { key: "crossSession", label: "Cross-session memory", desc: "AI remembers context between conversations", color: C.teal },
              { key: "coachThemes", label: "Share themes with coach", desc: "Coach sees conversation topics — not full messages", color: C.amberGold },
              { key: "coachFull", label: "Share full summaries with coach", desc: "Coach sees AI-generated conversation summaries", color: C.amberGold },
              { key: "adminAggregated", label: "Anonymous org analytics", desc: "Aggregated, de-identified data for organization insights", color: C.sage },
              { key: "platformImprovement", label: "Help improve the platform", desc: "Anonymous usage patterns help us improve coaching quality", color: C.midGray },
            ].map(item => (
              <div key={item.key} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                borderRadius: 10, border: `1px solid ${C.warmStone}`,
                background: toggles[item.key] ? `${item.color}04` : "transparent",
                transition: "all 0.2s ease",
              }}>
                <Toggle on={toggles[item.key]} onChange={() => !item.locked && t(item.key)} color={item.color} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontFamily: fB, fontSize: "12.5px", fontWeight: 600, color: C.charcoal }}>
                      {item.label}
                    </span>
                    {item.locked && <Ic.Lock s={11} c={C.deepTeal} />}
                  </div>
                  <div style={{ fontFamily: fB, fontSize: "11px", color: C.midGray, lineHeight: 1.4 }}>
                    {item.desc}
                  </div>
                </div>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: toggles[item.key] ? "#4CAF50" : C.lightGray,
                  transition: "background 0.2s ease",
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Memory Manager */}
      <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
        <div style={{
          padding: "16px", borderRadius: 16, border: `1px solid ${C.warmStone}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontFamily: fH, fontSize: "14px", fontWeight: 500, color: C.charcoal }}>
              What I Remember
            </div>
            <button style={{
              padding: "4px 10px", borderRadius: 8, border: `1px solid ${C.softCoral}20`,
              background: `${C.softCoral}06`, fontFamily: fB, fontSize: "10px",
              color: C.softCoral, fontWeight: 600, cursor: "pointer",
            }}>
              Clear All
            </button>
          </div>

          {memories.map(mem => (
            <div key={mem.id} style={{ marginBottom: 8 }}>
              <button onClick={() => setExpandedMemory(expandedMemory === mem.id ? null : mem.id)} style={{
                width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.warmStone}`,
                background: expandedMemory === mem.id ? C.cream : "transparent",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                textAlign: "left", transition: "all 0.2s ease",
              }}>
                <span style={{ fontSize: "16px" }}>{mem.icon}</span>
                <span style={{ flex: 1, fontFamily: fB, fontSize: "12.5px", fontWeight: 600, color: C.charcoal }}>
                  {mem.category}
                </span>
                <span style={{ fontFamily: fB, fontSize: "10px", color: C.midGray }}>{mem.items.length} items</span>
                <span style={{
                  fontSize: "12px", color: C.midGray,
                  transform: expandedMemory === mem.id ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.2s ease",
                }}>▾</span>
              </button>
              {expandedMemory === mem.id && (
                <div style={{ padding: "8px 12px 4px 36px", animation: "fadeInUp 0.3s ease-out" }}>
                  {mem.items.map((item, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "6px 0",
                      borderBottom: i < mem.items.length - 1 ? `1px solid ${C.warmStone}` : "none",
                    }}>
                      <span style={{ flex: 1, fontFamily: fB, fontSize: "11.5px", color: C.darkSlate, lineHeight: 1.4 }}>
                        {item}
                      </span>
                      <button style={{
                        width: 24, height: 24, borderRadius: 6, border: "none",
                        background: `${C.softCoral}08`, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Ic.Trash s={11} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Off the record toggle */}
        <div style={{
          padding: "14px", borderRadius: 14,
          background: `${C.deepTeal}06`, border: `1px solid ${C.deepTeal}15`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Ic.EyeOff s={16} c={C.deepTeal} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: fB, fontSize: "12px", fontWeight: 600, color: C.deepTeal }}>
                Off the Record Mode
              </div>
              <div style={{ fontFamily: fB, fontSize: "10.5px", color: C.midGray, lineHeight: 1.4 }}>
                Next conversation won't be saved or remembered
              </div>
            </div>
            <Toggle on={false} onChange={() => {}} color={C.deepTeal} />
          </div>
        </div>

        {/* Data retention info */}
        <div style={{
          padding: "14px", borderRadius: 14, border: `1px solid ${C.warmStone}`,
        }}>
          <div style={{ fontFamily: fB, fontSize: "11px", fontWeight: 600, color: C.charcoal, marginBottom: 8 }}>
            Data Retention
          </div>
          {[
            { label: "Conversations", value: "90 days", color: C.teal },
            { label: "Assessment data", value: "While active", color: C.deepTeal },
            { label: "Coach summaries", value: "1 year", color: C.amberGold },
          ].map((d, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "6px 0",
              borderBottom: i < 2 ? `1px solid ${C.warmStone}` : "none",
            }}>
              <span style={{ fontFamily: fB, fontSize: "11.5px", color: C.darkSlate }}>{d.label}</span>
              <span style={{
                fontFamily: fB, fontSize: "10px", fontWeight: 600, color: d.color,
                padding: "2px 8px", borderRadius: 6, background: `${d.color}10`,
              }}>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════
// ASSESSMENT UNPACKING FLOW
// ═══════════════════════════════════════════════════
const AssessmentUnpacking = () => {
  const [step, setStep] = useState(0);
  const [resonates, setResonates] = useState({});

  const BotAvatar = () => (
    <div style={{
      width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
      background: `linear-gradient(135deg, ${C.deepTeal}, ${C.tealLight})`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Ic.Leaf s={15} c="#fff" />
    </div>
  );

  const steps = [
    // Step 0: Welcome
    () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <BotAvatar />
          <div style={{
            background: C.cream, border: `1px solid ${C.warmStone}`,
            borderRadius: "14px 14px 14px 4px", padding: "14px 16px", maxWidth: "80%",
          }}>
            <p style={{ fontFamily: fB, fontSize: "13.5px", color: C.charcoal, lineHeight: 1.65, margin: 0 }}>
              Welcome, Ava! 🌱 Your assessment results are in, and I'd love to walk you through them together — not as a report, but as a conversation. We'll explore what makes you <em>you</em>, and how to use that understanding to grow.
            </p>
            <p style={{ fontFamily: fB, fontSize: "13.5px", color: C.charcoal, lineHeight: 1.65, margin: "8px 0 0" }}>
              We'll do this over a few short sessions. Today, let's start with your overall profile. Ready?
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, paddingLeft: 38 }}>
          <button onClick={() => setStep(1)} style={{
            padding: "8px 16px", borderRadius: 10,
            background: `linear-gradient(135deg, ${C.deepTeal}, ${C.tealLight})`,
            color: "#fff", fontFamily: fB, fontSize: "12.5px", fontWeight: 600,
            border: "none", cursor: "pointer", boxShadow: `0 2px 8px ${C.teal}30`,
          }}>
            Let's explore ✦
          </button>
          <button style={{
            padding: "8px 16px", borderRadius: 10,
            border: `1px solid ${C.warmStone}`, background: "transparent",
            fontFamily: fB, fontSize: "12.5px", color: C.midGray, cursor: "pointer",
          }}>
            Tell me more first
          </button>
        </div>
      </div>
    ),
    // Step 1: Profile reveal
    () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <BotAvatar />
          <div style={{
            background: C.cream, border: `1px solid ${C.warmStone}`,
            borderRadius: "14px 14px 14px 4px", padding: "14px 16px", maxWidth: "85%",
          }}>
            <p style={{ fontFamily: fB, fontSize: "13.5px", color: C.charcoal, lineHeight: 1.65, margin: "0 0 12px" }}>
              Here's your behavioral profile at a glance. Think of it as a map of your natural tendencies — not a label, but a starting point.
            </p>

            {/* Profile card */}
            <div style={{
              padding: "16px", borderRadius: 14,
              background: `linear-gradient(135deg, #fff, ${C.cream})`,
              border: `1px solid ${C.teal}15`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{
                  padding: "4px 12px", borderRadius: 8,
                  background: `${C.teal}10`, border: `1px solid ${C.teal}20`,
                  fontFamily: fH, fontSize: "14px", fontWeight: 500, color: C.teal,
                }}>
                  Analytical-Empathetic
                </div>
                <span style={{ fontFamily: fB, fontSize: "10px", color: C.midGray }}>Your primary style</span>
              </div>

              {/* Dimension bars */}
              {[
                { label: "Analytical Thinking", val: 85, color: C.teal, desc: "You naturally see patterns, structure, and logic" },
                { label: "Empathy", val: 78, color: C.sky, desc: "You deeply understand others' perspectives" },
                { label: "Influence", val: 72, color: C.amberGold, desc: "You can persuade and inspire when you choose to" },
                { label: "Steadiness", val: 65, color: C.sage, desc: "You bring calm consistency to your work" },
                { label: "Dominance", val: 48, color: C.softCoral, desc: "Direct assertiveness is a growth opportunity" },
              ].map((d, i) => (
                <div key={i} style={{ marginBottom: 10, animation: `fadeInUp 0.4s ease-out both`, animationDelay: `${i * 100}ms` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontFamily: fB, fontSize: "12px", fontWeight: 600, color: C.charcoal }}>{d.label}</span>
                    <span style={{ fontFamily: fB, fontSize: "11px", fontWeight: 700, color: d.color }}>{d.val}%</span>
                  </div>
                  <div style={{ height: 6, background: C.warmStone, borderRadius: 3, overflow: "hidden", marginBottom: 3 }}>
                    <div style={{ height: "100%", width: `${d.val}%`, background: d.color, borderRadius: 3, animation: `progressFill 1s ease-out both`, animationDelay: `${i * 100 + 200}ms` }} />
                  </div>
                  <div style={{ fontFamily: fB, fontSize: "11px", color: C.midGray, fontStyle: "italic" }}>{d.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Does this resonate? */}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start", paddingLeft: 38 }}>
          <div style={{
            padding: "12px 16px", borderRadius: 12,
            background: `${C.amberGold}08`, border: `1px solid ${C.amberGold}18`,
          }}>
            <div style={{ fontFamily: fB, fontSize: "12px", fontWeight: 600, color: C.charcoal, marginBottom: 8 }}>
              Does this feel accurate to you?
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[
                { label: "Yes, spot on", emoji: "✅" },
                { label: "Mostly", emoji: "🤔" },
                { label: "Not quite", emoji: "🔄" },
              ].map((opt, i) => (
                <button key={i} onClick={() => { setResonates(p => ({ ...p, 1: opt.label })); setStep(2); }} style={{
                  padding: "7px 14px", borderRadius: 10,
                  border: `1.5px solid ${resonates[1] === opt.label ? C.teal : C.warmStone}`,
                  background: resonates[1] === opt.label ? `${C.teal}08` : "transparent",
                  fontFamily: fB, fontSize: "12px", color: C.darkSlate, cursor: "pointer",
                  transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: 4,
                }}>
                  <span>{opt.emoji}</span> {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    // Step 2: Strength story
    () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <BotAvatar />
          <div style={{
            background: C.cream, border: `1px solid ${C.warmStone}`,
            borderRadius: "14px 14px 14px 4px", padding: "14px 16px", maxWidth: "82%",
          }}>
            <p style={{ fontFamily: fB, fontSize: "13.5px", color: C.charcoal, lineHeight: 1.65, margin: 0 }}>
              Great! Let's zoom into your strongest dimension: <strong style={{ color: C.teal }}>Analytical Thinking (85th percentile)</strong>. Here's what this looks like in practice:
            </p>
            <div style={{
              margin: "12px 0", padding: "12px", borderRadius: 10,
              background: `${C.teal}06`, borderLeft: `3px solid ${C.teal}`,
            }}>
              <div style={{ fontFamily: fB, fontSize: "12.5px", color: C.darkSlate, lineHeight: 1.6 }}>
                <strong>At work:</strong> You're the one who spots flaws in plans others miss. You create structure where there's chaos.<br/><br/>
                <strong>In relationships:</strong> You listen carefully and process deeply before responding — sometimes so deeply that others mistake your processing for hesitation.<br/><br/>
                <strong>Growth edge:</strong> Your analytical strength can become a shield. When emotions run high, you might retreat into logic rather than staying present.
              </div>
            </div>
            <p style={{ fontFamily: fB, fontSize: "13px", color: C.midGray, margin: "8px 0 0" }}>
              In our next session, we'll explore how to pair this analytical strength with your empathy to become a more powerful communicator. For now — what resonated most?
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, paddingLeft: 38, flexWrap: "wrap" }}>
          {[
            { label: "The 'processing as hesitation' part", icon: "💡" },
            { label: "Logic as a shield — yes!", icon: "🎯" },
            { label: "I want to explore this more", icon: "🔍" },
          ].map((chip, i) => (
            <button key={i} style={{
              padding: "7px 14px", borderRadius: 20, border: `1.5px solid ${C.teal}25`,
              background: "transparent", fontFamily: fB, fontSize: "11.5px",
              color: C.teal, fontWeight: 500, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <span>{chip.icon}</span> {chip.label}
            </button>
          ))}
        </div>

        {/* Session progress */}
        <div style={{
          margin: "4px 0 0 38px", padding: "10px 14px", borderRadius: 10,
          background: C.linen, display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3, 4].map(s => (
              <div key={s} style={{
                width: 24, height: 4, borderRadius: 2,
                background: s <= 2 ? C.teal : C.warmStone,
                transition: "background 0.3s ease",
              }} />
            ))}
          </div>
          <span style={{ fontFamily: fB, fontSize: "10px", color: C.midGray }}>
            Session 1 of 4 · Your Profile Overview
          </span>
        </div>
      </div>
    ),
  ];

  return (
    <div style={{ maxWidth: 620, margin: "0 auto" }}>
      {/* Session header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 20, padding: "12px 16px", borderRadius: 12,
        background: `linear-gradient(135deg, ${C.teal}08, ${C.amberGold}06)`,
        border: `1px solid ${C.teal}15`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Ic.Sparkle s={16} c={C.amberGold} />
          <div>
            <div style={{ fontFamily: fH, fontSize: "14px", fontWeight: 500, color: C.charcoal }}>
              Assessment Discovery
            </div>
            <div style={{ fontFamily: fB, fontSize: "11px", color: C.midGray }}>
              Session 1: Your Profile Overview
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3, 4].map(s => (
            <div key={s} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: s <= step + 1 ? C.teal : C.warmStone,
              transition: "background 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      {/* Conversation */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {Array.from({ length: step + 1 }, (_, i) => (
          <div key={i} style={{ animation: "fadeInUp 0.5s ease-out" }}>
            {steps[i]()}
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════
// DESIGN SYSTEM OVERVIEW
// ═══════════════════════════════════════════════════
const DesignSystem = () => {
  const colorGroups = [
    { name: "Primary — Forest & Wisdom", colors: [
      { name: "Deep Teal", hex: "#1A5C54", use: "Headers, CTAs, trust" },
      { name: "Teal", hex: "#247A70", use: "Primary actions, links" },
      { name: "Teal Light", hex: "#2D9B8F", use: "Gradients, hover" },
      { name: "Sage", hex: "#7BA899", use: "Secondary, success" },
    ]},
    { name: "Warmth — Ground & Safety", colors: [
      { name: "Warm Stone", hex: "#E8DFD3", use: "Borders, dividers" },
      { name: "Cream", hex: "#FAF7F2", use: "Card backgrounds" },
      { name: "Linen", hex: "#F5F0EA", use: "Input backgrounds" },
      { name: "Sand", hex: "#D4CABC", use: "Disabled, muted" },
    ]},
    { name: "Accent — Achievement & Insight", colors: [
      { name: "Amber Gold", hex: "#D4A853", use: "Coach, milestones" },
      { name: "Soft Coral", hex: "#E8876F", use: "Alerts, important" },
      { name: "Sky", hex: "#6BA3BE", use: "Info, secondary data" },
    ]},
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, overflowY: "auto", paddingBottom: 20 }}>
      {/* Philosophy statement */}
      <div style={{
        padding: "24px", borderRadius: 16,
        background: `linear-gradient(135deg, ${C.deepTeal}08, ${C.cream})`,
        border: `1px solid ${C.teal}15`,
      }}>
        <div style={{ fontFamily: fH, fontSize: "20px", fontWeight: 400, color: C.charcoal, marginBottom: 8 }}>
          Living Growth
        </div>
        <p style={{ fontFamily: fB, fontSize: "13.5px", color: C.darkSlate, lineHeight: 1.7, maxWidth: 600 }}>
          A design language rooted in the principles of natural growth — not the imagery of philosophy, but its patterns. Organic curves over sharp corners. Breathing animations over static states. Warmth over sterility. Every element should feel <em>alive</em>, <em>grounded</em>, and <em>evolving</em> — just like the people who use it.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
          {["Physis — natural unfolding", "Wabi-sabi — beauty in becoming", "The Path — flowing journey"].map((p, i) => (
            <div key={i} style={{
              padding: "6px 12px", borderRadius: 20,
              background: "#fff", border: `1px solid ${C.warmStone}`,
              fontFamily: fB, fontSize: "11px", color: C.midGray, fontStyle: "italic",
            }}>{p}</div>
          ))}
        </div>
      </div>

      {/* Color palette */}
      <div>
        <div style={{ fontFamily: fH, fontSize: "16px", fontWeight: 500, color: C.charcoal, marginBottom: 14 }}>
          Color System
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {colorGroups.map((group, gi) => (
            <div key={gi}>
              <div style={{ fontFamily: fB, fontSize: "11px", fontWeight: 600, color: C.midGray, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {group.name}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {group.colors.map((color, ci) => (
                  <div key={ci} style={{ flex: 1, animation: `fadeInUp 0.4s ease-out both`, animationDelay: `${(gi * 4 + ci) * 40}ms` }}>
                    <div style={{
                      height: 56, borderRadius: 10, marginBottom: 6,
                      background: color.hex,
                      boxShadow: `0 2px 8px ${color.hex}30`,
                    }} />
                    <div style={{ fontFamily: fB, fontSize: "11px", fontWeight: 600, color: C.charcoal }}>{color.name}</div>
                    <div style={{ fontFamily: fB, fontSize: "10px", color: C.midGray }}>{color.hex}</div>
                    <div style={{ fontFamily: fB, fontSize: "10px", color: C.lightGray, fontStyle: "italic" }}>{color.use}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <div style={{ fontFamily: fH, fontSize: "16px", fontWeight: 500, color: C.charcoal, marginBottom: 14 }}>Typography</div>
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ flex: 1, padding: "16px", borderRadius: 14, border: `1px solid ${C.warmStone}` }}>
            <div style={{ fontFamily: fH, fontSize: "28px", fontWeight: 400, color: C.charcoal, marginBottom: 6 }}>Fraunces</div>
            <div style={{ fontFamily: fB, fontSize: "10px", color: C.midGray, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Display & Headings</div>
            <div style={{ fontFamily: fH, fontSize: "11px", color: C.darkSlate, lineHeight: 2 }}>
              <span style={{ fontSize: "20px", fontWeight: 300 }}>Light 300</span><br/>
              <span style={{ fontSize: "20px", fontWeight: 400 }}>Regular 400</span><br/>
              <span style={{ fontSize: "20px", fontWeight: 500 }}>Medium 500</span><br/>
              <span style={{ fontSize: "20px", fontWeight: 600 }}>Semibold 600</span>
            </div>
            <div style={{ fontFamily: fB, fontSize: "11px", color: C.midGray, marginTop: 10, lineHeight: 1.5 }}>
              Organic variable serifs with a handcrafted quality. Used for headings, titles, and moments that deserve warmth and gravitas.
            </div>
          </div>
          <div style={{ flex: 1, padding: "16px", borderRadius: 14, border: `1px solid ${C.warmStone}` }}>
            <div style={{ fontFamily: fB, fontSize: "28px", fontWeight: 400, color: C.charcoal, marginBottom: 6 }}>DM Sans</div>
            <div style={{ fontFamily: fB, fontSize: "10px", color: C.midGray, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Body & Interface</div>
            <div style={{ fontFamily: fB, fontSize: "11px", color: C.darkSlate, lineHeight: 2 }}>
              <span style={{ fontSize: "20px", fontWeight: 300 }}>Light 300</span><br/>
              <span style={{ fontSize: "20px", fontWeight: 400 }}>Regular 400</span><br/>
              <span style={{ fontSize: "20px", fontWeight: 500 }}>Medium 500</span><br/>
              <span style={{ fontSize: "20px", fontWeight: 700 }}>Bold 700</span>
            </div>
            <div style={{ fontFamily: fB, fontSize: "11px", color: C.midGray, marginTop: 10, lineHeight: 1.5 }}>
              Clean, warm, and highly readable. Used for all body text, UI elements, labels, and conversational content.
            </div>
          </div>
        </div>
      </div>

      {/* Component samples */}
      <div>
        <div style={{ fontFamily: fH, fontSize: "16px", fontWeight: 500, color: C.charcoal, marginBottom: 14 }}>Components</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {/* Buttons */}
          <div style={{ padding: "16px", borderRadius: 14, border: `1px solid ${C.warmStone}` }}>
            <div style={{ fontFamily: fB, fontSize: "11px", fontWeight: 600, color: C.midGray, marginBottom: 10 }}>BUTTONS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${C.deepTeal}, ${C.tealLight})`, color: "#fff", fontFamily: fB, fontSize: "13px", fontWeight: 600, cursor: "pointer", boxShadow: `0 2px 8px ${C.teal}30` }}>
                Primary Action
              </button>
              <button style={{ padding: "10px 18px", borderRadius: 10, border: `1.5px solid ${C.warmStone}`, background: "transparent", color: C.darkSlate, fontFamily: fB, fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
                Secondary
              </button>
              <button style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${C.amberGold}, ${C.amberLight})`, color: "#fff", fontFamily: fB, fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                Coach Action
              </button>
            </div>
          </div>

          {/* Chips */}
          <div style={{ padding: "16px", borderRadius: 14, border: `1px solid ${C.warmStone}` }}>
            <div style={{ fontFamily: fB, fontSize: "11px", fontWeight: 600, color: C.midGray, marginBottom: 10 }}>CHIPS & BADGES</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              <span style={{ padding: "5px 12px", borderRadius: 20, border: `1.5px solid ${C.teal}25`, fontFamily: fB, fontSize: "11px", color: C.teal }}>Suggestion chip</span>
              <span style={{ padding: "5px 12px", borderRadius: 20, background: `${C.teal}10`, fontFamily: fB, fontSize: "11px", color: C.teal, fontWeight: 600 }}>Active</span>
              <span style={{ padding: "3px 8px", borderRadius: 6, background: `${C.amberGold}12`, fontFamily: fB, fontSize: "10px", color: C.amberGold, fontWeight: 600 }}>HIGH</span>
              <span style={{ padding: "3px 8px", borderRadius: 6, background: `${C.softCoral}12`, fontFamily: fB, fontSize: "10px", color: C.softCoral, fontWeight: 600 }}>ALERT</span>
              <span style={{ padding: "3px 8px", borderRadius: 6, background: `${C.teal}08`, fontFamily: fB, fontSize: "10px", color: C.teal, fontWeight: 600 }}>✦ AI Insight</span>
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: "16px", borderRadius: 14, border: `1px solid ${C.warmStone}` }}>
            <div style={{ fontFamily: fB, fontSize: "11px", fontWeight: 600, color: C.midGray, marginBottom: 10 }}>INPUTS</div>
            <div style={{
              padding: "10px 14px", borderRadius: 12,
              background: C.linen, border: `1px solid ${C.warmStone}`,
              fontFamily: fB, fontSize: "13px", color: C.lightGray,
            }}>
              Share what's on your mind...
            </div>
            <div style={{ marginTop: 8 }}>
              <Toggle on={true} onChange={() => {}} />
              <span style={{ fontFamily: fB, fontSize: "11px", color: C.midGray, marginLeft: 8 }}>Toggle control</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing & Radius */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ padding: "16px", borderRadius: 14, border: `1px solid ${C.warmStone}` }}>
          <div style={{ fontFamily: fB, fontSize: "11px", fontWeight: 600, color: C.midGray, marginBottom: 10 }}>BORDER RADIUS</div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            {[
              { r: 6, label: "Badges" },
              { r: 10, label: "Buttons" },
              { r: 12, label: "Inputs" },
              { r: 14, label: "Cards" },
              { r: 16, label: "Panels" },
              { r: 20, label: "Chips" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: item.r,
                  border: `2px solid ${C.teal}`, background: `${C.teal}06`,
                  margin: "0 auto 4px",
                }} />
                <div style={{ fontFamily: fB, fontSize: "10px", fontWeight: 600, color: C.charcoal }}>{item.r}px</div>
                <div style={{ fontFamily: fB, fontSize: "9px", color: C.lightGray }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "16px", borderRadius: 14, border: `1px solid ${C.warmStone}` }}>
          <div style={{ fontFamily: fB, fontSize: "11px", fontWeight: 600, color: C.midGray, marginBottom: 10 }}>ANIMATION PRINCIPLES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { name: "Breathe", desc: "Subtle scale pulse on living elements", timing: "3-6s ease-in-out infinite" },
              { name: "Grow In", desc: "Cards and panels enter with scale", timing: "0.4s ease-out" },
              { name: "Fade Up", desc: "Messages and content appear", timing: "0.3-0.5s ease-out" },
              { name: "Progress Fill", desc: "Bars animate from zero", timing: "0.8-1.2s ease-out" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%", background: C.teal,
                  animation: i === 0 ? "pulseGlow 3s ease-in-out infinite" : "none",
                }} />
                <div>
                  <span style={{ fontFamily: fB, fontSize: "11px", fontWeight: 600, color: C.charcoal }}>{a.name}</span>
                  <span style={{ fontFamily: fB, fontSize: "10px", color: C.lightGray, marginLeft: 6 }}>{a.timing}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("privacy");

  const views = [
    { key: "privacy", label: "Privacy Center" },
    { key: "assessment", label: "Assessment Unpacking" },
    { key: "system", label: "Design System" },
  ];

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: `linear-gradient(165deg, #f8f6f2 0%, #eee9e1 40%, #e4ded6 100%)`, fontFamily: fB }}>
      <style>{css}</style>

      <div style={{
        padding: "16px 24px", display: "flex", alignItems: "center", gap: 12,
        borderBottom: `1px solid ${C.warmStone}`, background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${C.deepTeal}, ${C.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ic.Leaf s={17} c="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: fH, fontSize: "16px", fontWeight: 500, color: C.charcoal }}>
            System Views — UI/UX Showcase
          </div>
          <div style={{ fontFamily: fB, fontSize: "11px", color: C.midGray }}>
            Living Growth Design System · Privacy, Assessment & Foundation
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, padding: 3, background: C.linen, borderRadius: 10 }}>
          {views.map(v => (
            <button key={v.key} onClick={() => setView(v.key)} style={{
              padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer",
              fontFamily: fB, fontSize: "12px", fontWeight: view === v.key ? 600 : 400,
              background: view === v.key ? "#fff" : "transparent",
              color: view === v.key ? C.teal : C.midGray,
              boxShadow: view === v.key ? "0 1px 6px rgba(0,0,0,0.06)" : "none",
              transition: "all 0.25s ease",
            }}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px", height: "calc(100vh - 70px)", overflowY: "auto" }}>
        {view === "privacy" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: "24px", border: `1px solid ${C.warmStone}`, boxShadow: "0 8px 40px rgba(0,0,0,0.08)", height: "100%" }}>
            <div style={{ fontFamily: fH, fontSize: "18px", fontWeight: 500, color: C.charcoal, marginBottom: 4 }}>
              Privacy Control Center
            </div>
            <div style={{ fontFamily: fB, fontSize: "12px", color: C.midGray, marginBottom: 20 }}>
              Full transparency and control over your data
            </div>
            <PrivacyCenter />
          </div>
        )}
        {view === "assessment" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: "24px", border: `1px solid ${C.warmStone}`, boxShadow: "0 8px 40px rgba(0,0,0,0.08)", minHeight: "100%" }}>
            <AssessmentUnpacking />
          </div>
        )}
        {view === "system" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: "24px", border: `1px solid ${C.warmStone}`, boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
            <DesignSystem />
          </div>
        )}
      </div>
    </div>
  );
}
