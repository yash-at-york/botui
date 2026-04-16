import { useState, useEffect } from "react";

const COLORS = {
  deepTeal: "#1A5C54", teal: "#247A70", tealLight: "#2D9B8F",
  sage: "#7BA899", sageMuted: "#A4C5B8",
  warmStone: "#E8DFD3", cream: "#FAF7F2", linen: "#F5F0EA", sand: "#D4CABC",
  amberGold: "#D4A853", amberLight: "#E8C97A",
  softCoral: "#E8876F", coralLight: "#F0A896",
  charcoal: "#2C2C2E", darkSlate: "#3D3D40", midGray: "#8E8E93", lightGray: "#C7C7CC",
  sky: "#6BA3BE", skyLight: "#9DC4D4",
};

const fontHead = `'Fraunces', 'Georgia', serif`;
const fontBody = `'DM Sans', 'Helvetica Neue', sans-serif`;

const styleTag = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes growIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes progressFill { from { width: 0%; } }
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(26,92,84,0.12); }
  50% { box-shadow: 0 0 16px 3px rgba(26,92,84,0.08); }
}
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.02); opacity: 0.8; }
}

* { box-sizing: border-box; margin: 0; padding: 0; }
*::-webkit-scrollbar { width: 5px; }
*::-webkit-scrollbar-track { background: transparent; }
*::-webkit-scrollbar-thumb { background: rgba(26,92,84,0.12); border-radius: 10px; }
`;

// ─── Mini icons ───
const I = {
  Leaf: ({ s = 16, c = COLORS.teal }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5-3.5 2-7.5 2-12 0-2.5-.5-5.5-2-8z"/><path d="M8 14c2-2 4-3 6-4"/></svg>,
  Users: ({ s = 16, c = COLORS.midGray }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85"/></svg>,
  Calendar: ({ s = 16, c = COLORS.midGray }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  Chart: ({ s = 16, c = COLORS.teal }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  Shield: ({ s = 16, c = COLORS.teal }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  Send: ({ s = 16, c = "#fff" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>,
  Sparkle: ({ s = 14, c = COLORS.amberGold }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>,
  Clock: ({ s = 14, c = COLORS.midGray }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  FileText: ({ s = 16, c = COLORS.midGray }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>,
  Alert: ({ s = 14, c = COLORS.softCoral }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  TrendUp: ({ s = 14, c = COLORS.teal }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>,
  Settings: ({ s = 16, c = COLORS.midGray }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
};

// ─── Radar Chart ───
const MiniRadar = ({ data, size = 120 }) => {
  const center = size / 2;
  const radius = size * 0.38;
  const n = data.length;
  const getPoint = (i, val) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = radius * (val / 100);
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };
  return (
    <svg width={size} height={size}>
      {[25, 50, 75, 100].map(r => (
        <polygon key={r} points={Array.from({ length: n }, (_, i) => { const p = getPoint(i, r); return `${p.x},${p.y}`; }).join(" ")}
          fill="none" stroke={COLORS.sand} strokeWidth="0.7" opacity="0.5" />
      ))}
      {data.map((_, i) => { const p = getPoint(i, 100); return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke={COLORS.sand} strokeWidth="0.5" opacity="0.3" />; })}
      <polygon points={data.map((d, i) => { const p = getPoint(i, d.prev); return `${p.x},${p.y}`; }).join(" ")}
        fill={COLORS.sand} fillOpacity="0.15" stroke={COLORS.sand} strokeWidth="0.8" strokeDasharray="3,3" />
      <polygon points={data.map((d, i) => { const p = getPoint(i, d.val); return `${p.x},${p.y}`; }).join(" ")}
        fill={COLORS.teal} fillOpacity="0.1" stroke={COLORS.teal} strokeWidth="1.3" />
      {data.map((d, i) => { const p = getPoint(i, d.val); return <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#fff" stroke={COLORS.teal} strokeWidth="1.2" />; })}
      {data.map((d, i) => { const p = getPoint(i, 120); return <text key={`l${i}`} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: "7px", fontFamily: fontBody, fill: COLORS.darkSlate, fontWeight: 500 }}>{d.label}</text>; })}
    </svg>
  );
};

// ─── Progress Bar ───
const ProgressBar = ({ value, color = COLORS.teal, height = 4 }) => (
  <div style={{ height, background: COLORS.warmStone, borderRadius: height / 2, overflow: "hidden", width: "100%" }}>
    <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: height / 2, animation: "progressFill 1s ease-out" }} />
  </div>
);

// ═══════════════════════════════════════════════════════
// COACH DASHBOARD
// ═══════════════════════════════════════════════════════
const CoachDashboard = () => {
  const [selectedClient, setSelectedClient] = useState(0);
  const [activeTab, setActiveTab] = useState("prep");

  const clients = [
    { name: "Ava Kim", role: "Product Designer", type: "Analytical-Empathetic", sessions: 8, nextSession: "Today, 2:00 PM", status: "upcoming", avatar: "AK", flags: ["Breakthrough moment in conflict resolution", "Requesting more assertiveness coaching"], growth: 72, color: COLORS.sky },
    { name: "Marcus Chen", role: "Engineering Lead", type: "Dominant-Analytical", sessions: 12, nextSession: "Tomorrow", status: "scheduled", avatar: "MC", flags: ["Struggling with delegation"], growth: 58, color: COLORS.teal },
    { name: "Sarah Johnson", role: "Marketing Manager", type: "Influential-Empathetic", sessions: 5, nextSession: "Apr 18", status: "scheduled", avatar: "SJ", flags: [], growth: 45, color: COLORS.amberGold },
    { name: "David Park", role: "Sales Director", type: "Dominant-Influential", sessions: 15, nextSession: "Apr 20", status: "scheduled", avatar: "DP", flags: ["Completed goal: team leadership"], growth: 85, color: COLORS.sage },
  ];

  const client = clients[selectedClient];

  const sessionTopics = [
    { topic: "Assertive communication in team settings", priority: "high", aiInsight: "Ava has discussed this 6 times in AI conversations. Shows strong motivation but reports difficulty 'in the moment.'" },
    { topic: "Navigating conflict with team lead", priority: "high", aiInsight: "Recent AI session explored the Data-Feeling-Request framework. Ava resonated with leading from analytical strength." },
    { topic: "Building influence without authority", priority: "medium", aiInsight: "Emerging theme from last 3 weeks. Assessment shows Influence at 72nd percentile — +14% from baseline." },
  ];

  const sessionHistory = [
    { date: "Apr 3", focus: "Conflict resolution", outcome: "Identified avoidance pattern; introduced direct communication framework", progress: "+8% assertiveness" },
    { date: "Mar 20", focus: "Strengths exploration", outcome: "Connected analytical strength to leadership potential", progress: "+5% confidence" },
    { date: "Mar 8", focus: "Goal setting", outcome: "Set 3 communication goals with measurable outcomes", progress: "Baseline" },
  ];

  return (
    <div style={{ display: "flex", height: "100%", background: "#fff", borderRadius: 16, overflow: "hidden", border: `1px solid ${COLORS.warmStone}`, boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
      
      {/* Left Sidebar - Client List */}
      <div style={{ width: 280, borderRight: `1px solid ${COLORS.warmStone}`, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px", borderBottom: `1px solid ${COLORS.warmStone}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.amberGold}, ${COLORS.amberLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <I.Sparkle s={15} c="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: fontHead, fontSize: "14px", fontWeight: 500, color: COLORS.charcoal }}>Coach Portal</div>
              <div style={{ fontFamily: fontBody, fontSize: "10px", color: COLORS.midGray }}>Dr. Elena Rivera</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, padding: "8px", borderRadius: 10, background: `${COLORS.teal}08`, border: `1px solid ${COLORS.teal}15`, textAlign: "center" }}>
              <div style={{ fontFamily: fontBody, fontSize: "18px", fontWeight: 700, color: COLORS.teal }}>4</div>
              <div style={{ fontFamily: fontBody, fontSize: "9px", color: COLORS.midGray }}>Active Clients</div>
            </div>
            <div style={{ flex: 1, padding: "8px", borderRadius: 10, background: `${COLORS.amberGold}08`, border: `1px solid ${COLORS.amberGold}15`, textAlign: "center" }}>
              <div style={{ fontFamily: fontBody, fontSize: "18px", fontWeight: 700, color: COLORS.amberGold }}>1</div>
              <div style={{ fontFamily: fontBody, fontSize: "9px", color: COLORS.midGray }}>Today's Sessions</div>
            </div>
          </div>
        </div>

        {/* Client list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
          {clients.map((c, i) => (
            <button key={i} onClick={() => setSelectedClient(i)} style={{
              width: "100%", padding: "12px", borderRadius: 12, border: "none", cursor: "pointer",
              background: selectedClient === i ? `${COLORS.teal}08` : "transparent",
              borderLeft: selectedClient === i ? `3px solid ${COLORS.teal}` : "3px solid transparent",
              display: "flex", gap: 10, alignItems: "center", textAlign: "left",
              transition: "all 0.2s ease", marginBottom: 2,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                background: `linear-gradient(135deg, ${c.color}, ${c.color}aa)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: fontBody, fontSize: "12px", fontWeight: 600, color: "#fff",
              }}>{c.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: fontBody, fontSize: "13px", fontWeight: 600, color: COLORS.charcoal }}>{c.name}</div>
                <div style={{ fontFamily: fontBody, fontSize: "10.5px", color: COLORS.midGray }}>{c.role}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                  <I.Clock s={10} c={c.status === "upcoming" ? COLORS.teal : COLORS.midGray} />
                  <span style={{ fontFamily: fontBody, fontSize: "10px", color: c.status === "upcoming" ? COLORS.teal : COLORS.midGray, fontWeight: c.status === "upcoming" ? 600 : 400 }}>
                    {c.nextSession}
                  </span>
                </div>
              </div>
              {c.flags.length > 0 && (
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.amberGold, flexShrink: 0 }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Client header */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.warmStone}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: `linear-gradient(135deg, ${client.color}, ${client.color}aa)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: fontBody, fontSize: "15px", fontWeight: 600, color: "#fff",
            }}>{client.avatar}</div>
            <div>
              <div style={{ fontFamily: fontHead, fontSize: "16px", fontWeight: 500, color: COLORS.charcoal }}>{client.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: fontBody, fontSize: "11px", color: COLORS.midGray }}>{client.role}</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: COLORS.lightGray }} />
                <span style={{ fontFamily: fontBody, fontSize: "11px", padding: "1px 7px", borderRadius: 6, background: `${COLORS.teal}10`, color: COLORS.teal, fontWeight: 500 }}>
                  {client.type}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{
              padding: "8px 16px", borderRadius: 10, border: `1px solid ${COLORS.warmStone}`,
              background: "transparent", fontFamily: fontBody, fontSize: "12px", color: COLORS.darkSlate,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
            }}>
              <I.FileText s={14} c={COLORS.midGray} /> Session Notes
            </button>
            <button style={{
              padding: "8px 16px", borderRadius: 10, border: "none",
              background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`,
              fontFamily: fontBody, fontSize: "12px", color: "#fff", fontWeight: 600,
              cursor: "pointer", boxShadow: `0 2px 8px ${COLORS.teal}30`,
            }}>
              Start Session
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ padding: "0 20px", borderBottom: `1px solid ${COLORS.warmStone}`, display: "flex", gap: 0 }}>
          {[
            { key: "prep", label: "Session Prep", icon: "✦" },
            { key: "history", label: "Session History", icon: "◷" },
            { key: "progress", label: "Progress", icon: "↗" },
            { key: "chat", label: "AI Coach Chat", icon: "◈" },
          ].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
              padding: "12px 16px", border: "none", cursor: "pointer",
              background: "transparent", fontFamily: fontBody, fontSize: "12.5px",
              fontWeight: activeTab === t.key ? 600 : 400,
              color: activeTab === t.key ? COLORS.teal : COLORS.midGray,
              borderBottom: `2px solid ${activeTab === t.key ? COLORS.teal : "transparent"}`,
              transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: 5,
            }}>
              <span style={{ fontSize: "12px" }}>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {activeTab === "prep" && (
            <div style={{ display: "flex", gap: 20, animation: "fadeInUp 0.4s ease-out" }}>
              {/* AI-generated session brief */}
              <div style={{ flex: 1 }}>
                <div style={{
                  padding: "16px", borderRadius: 14,
                  background: `linear-gradient(135deg, ${COLORS.amberGold}06, ${COLORS.teal}04)`,
                  border: `1px solid ${COLORS.amberGold}20`,
                  marginBottom: 16,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                    <I.Sparkle s={14} c={COLORS.amberGold} />
                    <span style={{ fontFamily: fontHead, fontSize: "14px", fontWeight: 500, color: COLORS.charcoal }}>
                      AI-Generated Session Brief
                    </span>
                    <span style={{ fontFamily: fontBody, fontSize: "9px", padding: "2px 6px", borderRadius: 6, background: `${COLORS.amberGold}15`, color: COLORS.amberGold, fontWeight: 600, marginLeft: "auto" }}>
                      Updated 2h ago
                    </span>
                  </div>
                  <p style={{ fontFamily: fontBody, fontSize: "13px", color: COLORS.darkSlate, lineHeight: 1.65, marginBottom: 12 }}>
                    Ava has had <strong>6 AI coaching conversations</strong> since your last session, primarily focused on assertive communication and an upcoming conflict with her team lead. She's shown strong engagement with the <em>Data-Feeling-Request</em> framework you introduced. Key themes to explore:
                  </p>
                  
                  {sessionTopics.map((t, i) => (
                    <div key={i} style={{
                      padding: "12px", borderRadius: 10, marginBottom: 8,
                      background: "#fff", border: `1px solid ${COLORS.warmStone}`,
                      animation: `fadeInUp 0.4s ease-out both`, animationDelay: `${i * 100}ms`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <span style={{
                          fontFamily: fontBody, fontSize: "9px", padding: "2px 7px", borderRadius: 6,
                          background: t.priority === "high" ? `${COLORS.softCoral}15` : `${COLORS.amberGold}12`,
                          color: t.priority === "high" ? COLORS.softCoral : COLORS.amberGold,
                          fontWeight: 600, textTransform: "uppercase",
                        }}>{t.priority}</span>
                        <span style={{ fontFamily: fontBody, fontSize: "12.5px", fontWeight: 600, color: COLORS.charcoal }}>
                          {t.topic}
                        </span>
                      </div>
                      <div style={{
                        fontFamily: fontBody, fontSize: "12px", color: COLORS.midGray, lineHeight: 1.55,
                        paddingLeft: 10, borderLeft: `2px solid ${COLORS.teal}20`,
                      }}>
                        <span style={{ fontSize: "10px", color: COLORS.teal, fontWeight: 600 }}>AI Insight: </span>
                        {t.aiInsight}
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI-suggested coaching questions */}
                <div style={{
                  padding: "16px", borderRadius: 14,
                  border: `1px solid ${COLORS.warmStone}`,
                }}>
                  <div style={{ fontFamily: fontHead, fontSize: "13px", fontWeight: 500, color: COLORS.charcoal, marginBottom: 10 }}>
                    Suggested Coaching Questions
                  </div>
                  {[
                    "What happened when you tried the Data-Feeling-Request approach?",
                    "When you imagine being assertive, what specific fear comes up?",
                    "Can you walk me through the moment you felt 'steamrolled' last time?",
                  ].map((q, i) => (
                    <div key={i} style={{
                      padding: "10px 12px", borderRadius: 8, marginBottom: 6,
                      background: `${COLORS.teal}04`, border: `1px solid ${COLORS.teal}12`,
                      fontFamily: fontBody, fontSize: "12.5px", color: COLORS.darkSlate, lineHeight: 1.5,
                      display: "flex", gap: 8, alignItems: "flex-start",
                    }}>
                      <span style={{ color: COLORS.teal, fontWeight: 600, flexShrink: 0 }}>Q{i + 1}</span>
                      {q}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column - Assessment summary */}
              <div style={{ width: 240 }}>
                <div style={{ padding: "14px", borderRadius: 14, border: `1px solid ${COLORS.warmStone}`, marginBottom: 14 }}>
                  <div style={{ fontFamily: fontBody, fontSize: "11px", fontWeight: 600, color: COLORS.charcoal, marginBottom: 8 }}>
                    Behavioral Snapshot
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <MiniRadar size={150} data={[
                      { label: "INF", val: 72, prev: 58 },
                      { label: "STD", val: 65, prev: 60 },
                      { label: "ANA", val: 85, prev: 80 },
                      { label: "DOM", val: 48, prev: 42 },
                      { label: "EMP", val: 78, prev: 70 },
                    ]} />
                  </div>
                  <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 4 }}>
                    <span style={{ fontFamily: fontBody, fontSize: "9px", color: COLORS.midGray }}>━ Current</span>
                    <span style={{ fontFamily: fontBody, fontSize: "9px", color: COLORS.midGray }}>┅ Previous</span>
                  </div>
                </div>

                <div style={{ padding: "14px", borderRadius: 14, border: `1px solid ${COLORS.warmStone}`, marginBottom: 14 }}>
                  <div style={{ fontFamily: fontBody, fontSize: "11px", fontWeight: 600, color: COLORS.charcoal, marginBottom: 10 }}>
                    Overall Growth
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: "50%", position: "relative",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width={50} height={50} style={{ transform: "rotate(-90deg)" }}>
                        <circle cx={25} cy={25} r={21} fill="none" stroke={COLORS.warmStone} strokeWidth={3} />
                        <circle cx={25} cy={25} r={21} fill="none" stroke={COLORS.teal} strokeWidth={3}
                          strokeDasharray={2 * Math.PI * 21} strokeDashoffset={2 * Math.PI * 21 * (1 - 0.72)}
                          strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
                      </svg>
                      <span style={{ position: "absolute", fontFamily: fontBody, fontSize: "12px", fontWeight: 700, color: COLORS.teal }}>72%</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: fontBody, fontSize: "12px", fontWeight: 600, color: COLORS.charcoal }}>Strong progress</div>
                      <div style={{ fontFamily: fontBody, fontSize: "10px", color: COLORS.midGray }}>8 sessions · 6 weeks</div>
                    </div>
                  </div>
                  {[
                    { label: "Communication", val: 68, color: COLORS.teal },
                    { label: "Assertiveness", val: 52, color: COLORS.sky },
                    { label: "Self-awareness", val: 80, color: COLORS.amberGold },
                  ].map((g, i) => (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span style={{ fontFamily: fontBody, fontSize: "10.5px", color: COLORS.darkSlate }}>{g.label}</span>
                        <span style={{ fontFamily: fontBody, fontSize: "10px", fontWeight: 600, color: g.color }}>{g.val}%</span>
                      </div>
                      <ProgressBar value={g.val} color={g.color} />
                    </div>
                  ))}
                </div>

                {/* Behavioral flags */}
                {client.flags.length > 0 && (
                  <div style={{ padding: "14px", borderRadius: 14, border: `1px solid ${COLORS.amberGold}20`, background: `${COLORS.amberGold}04` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                      <I.Alert s={13} c={COLORS.amberGold} />
                      <span style={{ fontFamily: fontBody, fontSize: "11px", fontWeight: 600, color: COLORS.charcoal }}>AI Flags</span>
                    </div>
                    {client.flags.map((f, i) => (
                      <div key={i} style={{
                        padding: "6px 8px", borderRadius: 6, marginBottom: 4,
                        fontFamily: fontBody, fontSize: "11px", color: COLORS.darkSlate, lineHeight: 1.4,
                        background: "#fff", border: `1px solid ${COLORS.warmStone}`,
                      }}>
                        {f}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
              {sessionHistory.map((s, i) => (
                <div key={i} style={{
                  padding: "16px", borderRadius: 14, border: `1px solid ${COLORS.warmStone}`,
                  marginBottom: 10, display: "flex", gap: 14, alignItems: "flex-start",
                  animation: `fadeInUp 0.4s ease-out both`, animationDelay: `${i * 80}ms`,
                }}>
                  <div style={{
                    padding: "6px 10px", borderRadius: 8, background: COLORS.linen,
                    fontFamily: fontBody, fontSize: "11px", fontWeight: 600, color: COLORS.darkSlate,
                    flexShrink: 0, textAlign: "center", minWidth: 50,
                  }}>
                    {s.date}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: fontBody, fontSize: "13px", fontWeight: 600, color: COLORS.charcoal, marginBottom: 4 }}>
                      {s.focus}
                    </div>
                    <div style={{ fontFamily: fontBody, fontSize: "12px", color: COLORS.midGray, lineHeight: 1.5 }}>
                      {s.outcome}
                    </div>
                  </div>
                  <span style={{
                    padding: "3px 8px", borderRadius: 6, flexShrink: 0,
                    background: `${COLORS.teal}10`, fontFamily: fontBody,
                    fontSize: "10px", fontWeight: 600, color: COLORS.teal,
                    display: "flex", alignItems: "center", gap: 3,
                  }}>
                    <I.TrendUp s={10} /> {s.progress}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "progress" && (
            <div style={{ animation: "fadeInUp 0.4s ease-out", display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
              <div style={{ textAlign: "center" }}>
                <MiniRadar size={220} data={[
                  { label: "Influence", val: 72, prev: 58 },
                  { label: "Steadiness", val: 65, prev: 60 },
                  { label: "Analytical", val: 85, prev: 80 },
                  { label: "Dominance", val: 48, prev: 42 },
                  { label: "Empathy", val: 78, prev: 70 },
                  { label: "Openness", val: 60, prev: 50 },
                ]} />
                <div style={{ fontFamily: fontBody, fontSize: "12px", color: COLORS.midGray, marginTop: 8 }}>
                  Behavioral dimension growth over 8 sessions · Dashed = baseline
                </div>
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div style={{ animation: "fadeInUp 0.4s ease-out" }}>
              {/* Coach-AI chat interface */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <I.Leaf s={14} c="#fff" />
                  </div>
                  <div style={{ background: COLORS.cream, border: `1px solid ${COLORS.warmStone}`, borderRadius: "14px 14px 14px 4px", padding: "12px 14px" }}>
                    <p style={{ fontFamily: fontBody, fontSize: "13px", color: COLORS.charcoal, lineHeight: 1.6, margin: 0 }}>
                      Here's what I've observed about Ava since your last session: She's been consistently working on assertiveness, engaging 6 times. She responded well to the Data-Feeling-Request framework but reports difficulty applying it in real-time with her team lead.
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start", justifyContent: "flex-end" }}>
                  <div style={{
                    background: `linear-gradient(135deg, ${COLORS.amberGold}, ${COLORS.amberLight})`,
                    borderRadius: "14px 14px 4px 14px", padding: "12px 14px", maxWidth: "70%",
                  }}>
                    <p style={{ fontFamily: fontBody, fontSize: "13px", color: "#fff", lineHeight: 1.6, margin: 0 }}>
                      Thanks. In future AI sessions, can you focus more on helping her identify the physical cues of when she's about to shut down? Also emphasize that assertiveness is a skill, not a personality trait.
                    </p>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.amberGold}, ${COLORS.amberLight})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: fontBody, fontSize: "10px", fontWeight: 600, color: "#fff" }}>
                    ER
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <I.Leaf s={14} c="#fff" />
                  </div>
                  <div style={{ background: COLORS.cream, border: `1px solid ${COLORS.warmStone}`, borderRadius: "14px 14px 14px 4px", padding: "12px 14px" }}>
                    <p style={{ fontFamily: fontBody, fontSize: "13px", color: COLORS.charcoal, lineHeight: 1.6, margin: 0 }}>
                      Noted. I'll integrate body-awareness prompts into our assertiveness conversations and reframe assertiveness as a learnable skill. I'll also track whether she mentions physical cues in future sessions and flag progress for you.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center", maxWidth: 600, padding: "10px 14px", borderRadius: 12, background: COLORS.linen, border: `1px solid ${COLORS.warmStone}` }}>
                <input placeholder="Guide the AI's coaching approach for this client..." style={{
                  flex: 1, border: "none", background: "transparent", fontFamily: fontBody, fontSize: "13px", color: COLORS.charcoal, outline: "none",
                }} />
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.amberGold}, ${COLORS.amberLight})`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <I.Send s={13} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// COMPANY ADMIN DASHBOARD
// ═══════════════════════════════════════════════════════
const AdminDashboard = () => (
  <div style={{ display: "flex", height: "100%", background: "#fff", borderRadius: 16, overflow: "hidden", border: `1px solid ${COLORS.warmStone}`, boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
    {/* Sidebar */}
    <div style={{ width: 220, borderRight: `1px solid ${COLORS.warmStone}`, padding: "16px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I.Leaf s={17} c="#fff" />
        </div>
        <div>
          <div style={{ fontFamily: fontHead, fontSize: "13px", fontWeight: 500, color: COLORS.charcoal }}>Admin Portal</div>
          <div style={{ fontFamily: fontBody, fontSize: "10px", color: COLORS.midGray }}>Acme Inc.</div>
        </div>
      </div>

      {[
        { label: "Dashboard", icon: <I.Chart s={15} c={COLORS.teal} />, active: true },
        { label: "Team Members", icon: <I.Users s={15} />, active: false },
        { label: "Assessments", icon: <I.FileText s={15} />, active: false },
        { label: "Coach Sessions", icon: <I.Calendar s={15} />, active: false },
        { label: "Privacy & RBAC", icon: <I.Shield s={15} />, active: false },
        { label: "Settings", icon: <I.Settings s={15} />, active: false },
      ].map((item, i) => (
        <button key={i} style={{
          padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer",
          background: item.active ? `${COLORS.teal}08` : "transparent",
          display: "flex", alignItems: "center", gap: 10, width: "100%",
          fontFamily: fontBody, fontSize: "12.5px",
          fontWeight: item.active ? 600 : 400,
          color: item.active ? COLORS.teal : COLORS.midGray,
          marginBottom: 2, transition: "all 0.2s ease", textAlign: "left",
        }}>
          {item.icon} {item.label}
        </button>
      ))}
    </div>

    {/* Main content */}
    <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
      <div style={{ fontFamily: fontHead, fontSize: "18px", fontWeight: 500, color: COLORS.charcoal, marginBottom: 4 }}>
        Organization Overview
      </div>
      <div style={{ fontFamily: fontBody, fontSize: "12px", color: COLORS.midGray, marginBottom: 20 }}>
        128 employees · 4 coaches · Last updated today
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Assessment Completion", val: "87%", sub: "+12% this month", color: COLORS.teal },
          { label: "Active AI Conversations", val: "342", sub: "This week", color: COLORS.sky },
          { label: "Coach Sessions", val: "28", sub: "Scheduled this month", color: COLORS.amberGold },
          { label: "Growth Score", val: "71", sub: "+8 from last quarter", color: COLORS.sage },
        ].map((s, i) => (
          <div key={i} style={{
            padding: "16px", borderRadius: 14, border: `1px solid ${COLORS.warmStone}`,
            animation: `fadeInUp 0.4s ease-out both`, animationDelay: `${i * 60}ms`,
          }}>
            <div style={{ fontFamily: fontBody, fontSize: "10px", color: COLORS.midGray, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: fontHead, fontSize: "28px", fontWeight: 500, color: s.color }}>
              {s.val}
            </div>
            <div style={{ fontFamily: fontBody, fontSize: "11px", color: COLORS.midGray, marginTop: 2 }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Team behavioral composition */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ padding: "16px", borderRadius: 14, border: `1px solid ${COLORS.warmStone}` }}>
          <div style={{ fontFamily: fontBody, fontSize: "12px", fontWeight: 600, color: COLORS.charcoal, marginBottom: 12 }}>
            Team Behavioral Composition
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { type: "Analytical", pct: 32, color: COLORS.teal },
              { type: "Dominant", pct: 18, color: COLORS.softCoral },
              { type: "Influential", pct: 28, color: COLORS.amberGold },
              { type: "Steady", pct: 22, color: COLORS.sky },
            ].map((t, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{
                  width: "100%", height: 80, borderRadius: 8, position: "relative",
                  background: COLORS.linen, overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", bottom: 0, width: "100%", height: `${t.pct * 2.2}%`,
                    background: `${t.color}20`, borderRadius: "8px 8px 0 0",
                    animation: "progressFill 1s ease-out",
                  }} />
                  <div style={{
                    position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: fontBody, fontSize: "16px", fontWeight: 700, color: t.color,
                  }}>
                    {t.pct}%
                  </div>
                </div>
                <div style={{ fontFamily: fontBody, fontSize: "10px", color: COLORS.midGray, marginTop: 6, fontWeight: 500 }}>
                  {t.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement heatmap placeholder */}
        <div style={{ padding: "16px", borderRadius: 14, border: `1px solid ${COLORS.warmStone}` }}>
          <div style={{ fontFamily: fontBody, fontSize: "12px", fontWeight: 600, color: COLORS.charcoal, marginBottom: 12 }}>
            Weekly Engagement
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {Array.from({ length: 28 }, (_, i) => {
              const intensity = Math.random();
              return (
                <div key={i} style={{
                  width: 22, height: 22, borderRadius: 4,
                  background: intensity > 0.7 ? COLORS.teal : intensity > 0.4 ? `${COLORS.teal}40` : intensity > 0.2 ? `${COLORS.teal}15` : COLORS.linen,
                  transition: "all 0.2s ease",
                }} />
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontFamily: fontBody, fontSize: "9px", color: COLORS.lightGray }}>Less</span>
            <div style={{ display: "flex", gap: 3 }}>
              {[COLORS.linen, `${COLORS.teal}15`, `${COLORS.teal}40`, COLORS.teal].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
              ))}
            </div>
            <span style={{ fontFamily: fontBody, fontSize: "9px", color: COLORS.lightGray }}>More</span>
          </div>
        </div>
      </div>

      {/* AI Chat bar for admin */}
      <div style={{
        marginTop: 16, padding: "12px 16px", borderRadius: 14,
        background: COLORS.linen, border: `1px solid ${COLORS.warmStone}`,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <I.Leaf s={14} c="#fff" />
        </div>
        <input placeholder="Ask about your team — 'Show teams with highest engagement' or 'Which departments need more coaching?'" style={{
          flex: 1, border: "none", background: "transparent",
          fontFamily: fontBody, fontSize: "13px", color: COLORS.charcoal, outline: "none",
        }} />
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <I.Send s={14} />
        </div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [activeView, setActiveView] = useState("coach");

  return (
    <div style={{
      width: "100%", minHeight: "100vh",
      background: `linear-gradient(165deg, #f8f6f2 0%, #eee9e1 40%, #e4ded6 100%)`,
      fontFamily: fontBody,
    }}>
      <style>{styleTag}</style>

      {/* Nav */}
      <div style={{
        padding: "16px 24px", display: "flex", alignItems: "center", gap: 12,
        borderBottom: `1px solid ${COLORS.warmStone}`, background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <I.Leaf s={17} c="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: fontHead, fontSize: "16px", fontWeight: 500, color: COLORS.charcoal }}>
            Professional Views — UI/UX Showcase
          </div>
          <div style={{ fontFamily: fontBody, fontSize: "11px", color: COLORS.midGray }}>
            Living Growth Design System · Coach & Admin
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, padding: 3, background: COLORS.linen, borderRadius: 10 }}>
          {[
            { key: "coach", label: "Coach Dashboard" },
            { key: "admin", label: "Company Admin" },
          ].map(v => (
            <button key={v.key} onClick={() => setActiveView(v.key)} style={{
              padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer",
              fontFamily: fontBody, fontSize: "12px", fontWeight: activeView === v.key ? 600 : 400,
              background: activeView === v.key ? "#fff" : "transparent",
              color: activeView === v.key ? COLORS.teal : COLORS.midGray,
              boxShadow: activeView === v.key ? "0 1px 6px rgba(0,0,0,0.06)" : "none",
              transition: "all 0.25s ease",
            }}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px", height: "calc(100vh - 70px)" }}>
        {activeView === "coach" ? <CoachDashboard /> : <AdminDashboard />}
      </div>
    </div>
  );
}
