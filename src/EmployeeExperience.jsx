import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// DESIGN PHILOSOPHY: "Living Growth"
// Inspired by: Physis (Greek: natural unfolding), Wabi-sabi (beauty in becoming),
// The Tao (the path), and dendrochronology (growth rings as time made visible).
// No literal symbols — only the underlying patterns of growth itself.
// ═══════════════════════════════════════════════════════════

const COLORS = {
  // Primary - Deep forest/wisdom
  deepTeal: "#1A5C54",
  teal: "#247A70",
  tealLight: "#2D9B8F",
  sage: "#7BA899",
  sageMuted: "#A4C5B8",
  // Warmth & Ground
  warmStone: "#E8DFD3",
  cream: "#FAF7F2",
  linen: "#F5F0EA",
  sand: "#D4CABC",
  // Accent - Achievement/Enlightenment
  amberGold: "#D4A853",
  amberLight: "#E8C97A",
  softCoral: "#E8876F",
  coralLight: "#F0A896",
  // Depth
  charcoal: "#2C2C2E",
  darkSlate: "#3D3D40",
  midGray: "#8E8E93",
  lightGray: "#C7C7CC",
  // Sky/Clarity
  sky: "#6BA3BE",
  skyLight: "#9DC4D4",
};

const fontHead = `'Fraunces', 'Georgia', serif`;
const fontBody = `'DM Sans', 'Helvetica Neue', sans-serif`;

// ─── Subtle organic background pattern ───
const OrganicBg = () => (
  <div style={{
    position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0,
  }}>
    {/* Growth rings - very subtle */}
    {[200, 340, 500].map((size, i) => (
      <div key={i} style={{
        position: "absolute",
        right: -size * 0.3,
        bottom: -size * 0.3,
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1px solid rgba(26,92,84,${0.03 - i * 0.005})`,
        animation: `breathe ${6 + i * 2}s ease-in-out infinite`,
        animationDelay: `${i * 0.5}s`,
      }} />
    ))}
  </div>
);

// ─── Animations ───
const styleTag = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.03); opacity: 1; }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes growIn {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(26,92,84,0.15); }
  50% { box-shadow: 0 0 20px 4px rgba(26,92,84,0.08); }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes dotPulse {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
}
@keyframes progressFill {
  from { width: 0%; }
}
@keyframes gentleFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
@keyframes streamIn {
  from { opacity: 0; max-height: 0; }
  to { opacity: 1; max-height: 500px; }
}

* { box-sizing: border-box; margin: 0; padding: 0; }
*::-webkit-scrollbar { width: 5px; }
*::-webkit-scrollbar-track { background: transparent; }
*::-webkit-scrollbar-thumb { background: rgba(26,92,84,0.15); border-radius: 10px; }
`;

// ═══════════════════════════════════════════════════════
// ICON COMPONENTS
// ═══════════════════════════════════════════════════════
const Icons = {
  Leaf: ({ size = 18, color = COLORS.teal }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5-3.5 2-7.5 2-12 0-2.5-.5-5.5-2-8z"/>
      <path d="M8 14c2-2 4-3 6-4"/>
    </svg>
  ),
  Journey: ({ size = 18, color = COLORS.teal }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 20c2-4 4-6 8-8s6-6 8-10"/>
      <circle cx="4" cy="20" r="2" fill={color} fillOpacity="0.3"/>
      <circle cx="20" cy="4" r="2" fill={color} fillOpacity="0.3"/>
    </svg>
  ),
  Shield: ({ size = 18, color = COLORS.teal }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  Send: ({ size = 18, color = "#fff" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>
    </svg>
  ),
  Sparkle: ({ size = 16, color = COLORS.amberGold }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/>
    </svg>
  ),
  User: ({ size = 18, color = COLORS.midGray }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0112 0v1"/>
    </svg>
  ),
  Check: ({ size = 14, color = COLORS.teal }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7"/>
    </svg>
  ),
  Expand: ({ size = 16, color = COLORS.midGray }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
    </svg>
  ),
  Coach: ({ size = 18, color = COLORS.amberGold }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0112 0v1"/>
      <path d="M17 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" strokeWidth="1.5"/>
    </svg>
  ),
  Mood: ({ size = 18, color = COLORS.softCoral }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5"/><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5"/>
    </svg>
  ),
  Chart: ({ size = 18, color = COLORS.teal }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2" fill={color} fillOpacity="0.2"/>
    </svg>
  ),
  Calendar: ({ size = 16, color = COLORS.midGray }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  ChevDown: ({ size = 14, color = COLORS.midGray }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
  ),
  Brain: ({ size = 18, color = COLORS.teal }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2a5 5 0 015 5c0 1.5-.5 2.8-1.4 3.8A5 5 0 0119 15a5 5 0 01-3 4.6V22h-4v-2.4A5 5 0 019 15a5 5 0 013.4-4.2A5 5 0 0112 2z"/>
    </svg>
  ),
};

// ═══════════════════════════════════════════════════════
// RADAR CHART - Assessment Visualization
// ═══════════════════════════════════════════════════════
const RadarChart = ({ data, size = 180 }) => {
  const center = size / 2;
  const radius = size * 0.38;
  const n = data.length;

  const getPoint = (i, val) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = radius * (val / 100);
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  const rings = [25, 50, 75, 100];
  const currentPath = data.map((d, i) => getPoint(i, d.value)).map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
  const previousPath = data.map((d, i) => getPoint(i, d.previous || d.value * 0.7)).map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid rings */}
      {rings.map((r) => (
        <polygon key={r} points={Array.from({ length: n }, (_, i) => {
          const p = getPoint(i, r);
          return `${p.x},${p.y}`;
        }).join(" ")}
        fill="none" stroke={COLORS.sand} strokeWidth="0.8" opacity="0.6" />
      ))}
      {/* Axis lines */}
      {data.map((_, i) => {
        const p = getPoint(i, 100);
        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke={COLORS.sand} strokeWidth="0.6" opacity="0.4" />;
      })}
      {/* Previous values (ghost) */}
      <polygon points={data.map((d, i) => {
        const p = getPoint(i, d.previous || d.value * 0.7);
        return `${p.x},${p.y}`;
      }).join(" ")}
      fill={COLORS.sand} fillOpacity="0.2" stroke={COLORS.sand} strokeWidth="1" strokeDasharray="3,3" />
      {/* Current values */}
      <polygon points={data.map((d, i) => {
        const p = getPoint(i, d.value);
        return `${p.x},${p.y}`;
      }).join(" ")}
      fill={COLORS.teal} fillOpacity="0.12" stroke={COLORS.teal} strokeWidth="1.5" />
      {/* Data points */}
      {data.map((d, i) => {
        const p = getPoint(i, d.value);
        return <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={COLORS.cream} stroke={COLORS.teal} strokeWidth="1.5" />;
      })}
      {/* Labels */}
      {data.map((d, i) => {
        const p = getPoint(i, 118);
        return (
          <text key={`l-${i}`} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: "8.5px", fontFamily: fontBody, fill: COLORS.darkSlate, fontWeight: 500 }}>
            {d.label}
          </text>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════
// PROGRESS RING
// ═══════════════════════════════════════════════════════
const ProgressRing = ({ value, size = 48, strokeWidth = 3, color = COLORS.teal, label }) => {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={COLORS.warmStone} strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }} />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: fontBody, fontSize: size * 0.24, fontWeight: 600, color: COLORS.charcoal,
      }}>
        {label || `${value}%`}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// MESSAGE COMPONENTS
// ═══════════════════════════════════════════════════════

const BotAvatar = () => (
  <div style={{
    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
    background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`,
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 2px 8px rgba(26,92,84,0.2)",
  }}>
    <Icons.Leaf size={16} color="#fff" />
  </div>
);

const UserAvatar = () => (
  <div style={{
    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
    background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.teal})`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "13px", fontWeight: 600, color: "#fff", fontFamily: fontBody,
  }}>
    AK
  </div>
);

const TypingIndicator = () => (
  <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "8px 0" }}>
    <BotAvatar />
    <div style={{
      display: "flex", gap: 5, padding: "12px 16px",
      background: COLORS.cream, borderRadius: "16px 16px 16px 4px",
      border: `1px solid ${COLORS.warmStone}`,
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%", background: COLORS.sage,
          animation: `dotPulse 1.2s ease-in-out infinite`,
          animationDelay: `${i * 0.15}s`,
        }} />
      ))}
    </div>
  </div>
);

const BotMessage = ({ children, delay = 0, noAvatar }) => (
  <div style={{
    display: "flex", gap: 10, alignItems: "flex-start", maxWidth: "82%",
    animation: `fadeInUp 0.5s ease-out both`,
    animationDelay: `${delay}ms`,
  }}>
    {!noAvatar ? <BotAvatar /> : <div style={{ width: 32 }} />}
    <div style={{
      background: COLORS.cream,
      border: `1px solid ${COLORS.warmStone}`,
      borderRadius: "16px 16px 16px 4px",
      padding: "12px 16px",
      fontFamily: fontBody, fontSize: "14px", lineHeight: 1.6,
      color: COLORS.charcoal,
    }}>
      {children}
    </div>
  </div>
);

const UserMessage = ({ children, delay = 0 }) => (
  <div style={{
    display: "flex", justifyContent: "flex-end", gap: 10, alignItems: "flex-start",
    animation: `fadeInUp 0.4s ease-out both`, animationDelay: `${delay}ms`,
  }}>
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.teal})`,
      borderRadius: "16px 16px 4px 16px",
      padding: "12px 16px",
      fontFamily: fontBody, fontSize: "14px", lineHeight: 1.6,
      color: "#fff", maxWidth: "75%",
    }}>
      {children}
    </div>
    <UserAvatar />
  </div>
);

// ─── Rich Cards ───

const MoodCheckIn = ({ delay = 0 }) => {
  const [selected, setSelected] = useState(null);
  const moods = [
    { emoji: "😊", label: "Great", color: "#4CAF50" },
    { emoji: "🙂", label: "Good", color: COLORS.teal },
    { emoji: "😐", label: "Okay", color: COLORS.amberGold },
    { emoji: "😔", label: "Low", color: COLORS.softCoral },
  ];
  return (
    <div style={{
      animation: `growIn 0.5s ease-out both`, animationDelay: `${delay}ms`,
      display: "flex", gap: 10, alignItems: "flex-start", maxWidth: "82%",
    }}>
      <BotAvatar />
      <div style={{
        background: COLORS.cream, border: `1px solid ${COLORS.warmStone}`,
        borderRadius: "16px 16px 16px 4px", padding: "16px", width: 320,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Icons.Mood size={16} />
          <span style={{ fontFamily: fontBody, fontSize: "13px", fontWeight: 600, color: COLORS.charcoal }}>
            How are you feeling today?
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {moods.map((m) => (
            <button key={m.label} onClick={() => setSelected(m.label)} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              padding: "10px 4px", borderRadius: 12, border: `1.5px solid ${selected === m.label ? m.color : COLORS.warmStone}`,
              background: selected === m.label ? `${m.color}10` : "transparent",
              cursor: "pointer", transition: "all 0.25s ease",
              transform: selected === m.label ? "scale(1.05)" : "scale(1)",
            }}>
              <span style={{ fontSize: "22px" }}>{m.emoji}</span>
              <span style={{ fontFamily: fontBody, fontSize: "11px", color: COLORS.darkSlate, fontWeight: 500 }}>{m.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const AssessmentCard = ({ delay = 0 }) => (
  <div style={{
    animation: `growIn 0.6s ease-out both`, animationDelay: `${delay}ms`,
    display: "flex", gap: 10, alignItems: "flex-start", maxWidth: "90%",
  }}>
    <BotAvatar />
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.cream}, #fff)`,
      border: `1px solid ${COLORS.warmStone}`,
      borderRadius: "16px 16px 16px 4px", padding: "18px", width: 400,
      boxShadow: "0 2px 12px rgba(26,92,84,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: `linear-gradient(135deg, ${COLORS.teal}18, ${COLORS.amberGold}18)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icons.Chart size={15} color={COLORS.teal} />
        </div>
        <div>
          <div style={{ fontFamily: fontHead, fontSize: "14px", fontWeight: 500, color: COLORS.charcoal }}>
            Your Behavioral Profile
          </div>
          <div style={{ fontFamily: fontBody, fontSize: "11px", color: COLORS.midGray }}>
            Based on assessment · Updated 2 weeks ago
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <RadarChart size={160} data={[
          { label: "Influence", value: 72, previous: 58 },
          { label: "Steadiness", value: 65, previous: 60 },
          { label: "Analytical", value: 85, previous: 80 },
          { label: "Dominance", value: 48, previous: 42 },
          { label: "Empathy", value: 78, previous: 70 },
          { label: "Openness", value: 60, previous: 50 },
        ]} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { label: "Analytical", val: 85, prev: 80, color: COLORS.teal },
            { label: "Empathy", val: 78, prev: 70, color: COLORS.sky },
            { label: "Influence", val: 72, prev: 58, color: COLORS.amberGold },
          ].map((d) => (
            <div key={d.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontFamily: fontBody, fontSize: "11px", fontWeight: 500, color: COLORS.darkSlate }}>{d.label}</span>
                <span style={{ fontFamily: fontBody, fontSize: "11px", color: COLORS.teal, fontWeight: 600 }}>
                  +{d.val - d.prev}% <span style={{ color: COLORS.midGray, fontWeight: 400 }}>↑</span>
                </span>
              </div>
              <div style={{ height: 4, background: COLORS.warmStone, borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${d.val}%`, background: d.color,
                  borderRadius: 2, animation: "progressFill 1.2s ease-out",
                }} />
              </div>
            </div>
          ))}
          <div style={{
            marginTop: 4, padding: "6px 8px", borderRadius: 8,
            background: `${COLORS.teal}08`, border: `1px solid ${COLORS.teal}15`,
          }}>
            <span style={{ fontFamily: fontBody, fontSize: "10.5px", color: COLORS.teal, fontWeight: 500 }}>
              ✦ Strongest growth: Influence +14%
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 3, marginTop: 10, flexWrap: "wrap" }}>
        <span style={{ fontFamily: fontBody, fontSize: "10px", color: COLORS.midGray, display: "flex", alignItems: "center", gap: 3 }}>
          <span style={{ width: 10, height: 2, background: COLORS.teal, borderRadius: 1, display: "inline-block" }} /> Current
        </span>
        <span style={{ fontFamily: fontBody, fontSize: "10px", color: COLORS.midGray, display: "flex", alignItems: "center", gap: 3, marginLeft: 10 }}>
          <span style={{ width: 10, height: 2, background: COLORS.sand, borderRadius: 1, display: "inline-block", borderBottom: "1px dashed" }} /> Previous
        </span>
      </div>
    </div>
  </div>
);

const ActionPlanCard = ({ delay = 0 }) => {
  const [checks, setChecks] = useState({ 0: true, 1: false, 2: false });
  const items = [
    { text: "Practice active listening in tomorrow's team standup", due: "Tomorrow" },
    { text: "Use 'I notice...' framing in your 1:1 with Sarah", due: "Wed" },
    { text: "Journal 3 situations where you led with empathy this week", due: "Friday" },
  ];
  return (
    <div style={{
      animation: `growIn 0.6s ease-out both`, animationDelay: `${delay}ms`,
      display: "flex", gap: 10, alignItems: "flex-start", maxWidth: "85%",
    }}>
      <BotAvatar />
      <div style={{
        background: COLORS.cream, border: `1px solid ${COLORS.warmStone}`,
        borderRadius: "16px 16px 16px 4px", padding: "16px", width: 370,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icons.Sparkle size={14} />
            <span style={{ fontFamily: fontHead, fontSize: "13.5px", fontWeight: 500, color: COLORS.charcoal }}>
              This Week's Growth Actions
            </span>
          </div>
          <span style={{
            fontFamily: fontBody, fontSize: "10px", padding: "3px 8px",
            background: `${COLORS.teal}12`, color: COLORS.teal, borderRadius: 20, fontWeight: 600,
          }}>
            1 of 3
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((item, i) => (
            <div key={i} onClick={() => setChecks(p => ({ ...p, [i]: !p[i] }))} style={{
              display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px",
              borderRadius: 10, cursor: "pointer", transition: "all 0.2s ease",
              background: checks[i] ? `${COLORS.teal}08` : "transparent",
              border: `1px solid ${checks[i] ? COLORS.teal + "25" : COLORS.warmStone}`,
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                border: `1.5px solid ${checks[i] ? COLORS.teal : COLORS.lightGray}`,
                background: checks[i] ? COLORS.teal : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}>
                {checks[i] && <Icons.Check size={12} color="#fff" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: fontBody, fontSize: "13px", color: COLORS.charcoal, lineHeight: 1.4,
                  textDecoration: checks[i] ? "line-through" : "none",
                  opacity: checks[i] ? 0.6 : 1,
                }}>
                  {item.text}
                </div>
                <div style={{ fontFamily: fontBody, fontSize: "11px", color: COLORS.midGray, marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
                  <Icons.Calendar size={11} /> Due {item.due}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MilestoneCard = ({ delay = 0 }) => (
  <div style={{
    animation: `growIn 0.6s ease-out both`, animationDelay: `${delay}ms`,
    margin: "4px 0", padding: "12px 20px",
    background: `linear-gradient(135deg, ${COLORS.amberGold}10, ${COLORS.teal}08)`,
    borderRadius: 14,
    border: `1px solid ${COLORS.amberGold}25`,
    display: "flex", alignItems: "center", gap: 12,
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      background: `linear-gradient(135deg, ${COLORS.amberGold}, ${COLORS.amberLight})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 2px 10px ${COLORS.amberGold}30`,
    }}>
      <Icons.Sparkle size={18} color="#fff" />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: fontHead, fontSize: "13px", fontWeight: 500, color: COLORS.charcoal }}>
        Growth Milestone Reached
      </div>
      <div style={{ fontFamily: fontBody, fontSize: "12px", color: COLORS.midGray, lineHeight: 1.5 }}>
        Assertive communication improved from <strong style={{ color: COLORS.teal }}>42%</strong> to <strong style={{ color: COLORS.teal }}>68%</strong> over 3 months
      </div>
    </div>
    <ProgressRing value={68} size={44} color={COLORS.amberGold} label="68" />
  </div>
);

const CoachHandoff = ({ delay = 0 }) => (
  <div style={{
    animation: `growIn 0.6s ease-out both`, animationDelay: `${delay}ms`,
    display: "flex", gap: 10, alignItems: "flex-start", maxWidth: "82%",
  }}>
    <BotAvatar />
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.amberGold}08, ${COLORS.cream})`,
      border: `1px solid ${COLORS.amberGold}30`,
      borderRadius: "16px 16px 16px 4px", padding: "16px", width: 340,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Icons.Coach size={16} />
        <span style={{ fontFamily: fontHead, fontSize: "13px", fontWeight: 500, color: COLORS.charcoal }}>
          Coach Session Suggested
        </span>
      </div>
      <p style={{ fontFamily: fontBody, fontSize: "13px", color: COLORS.darkSlate, lineHeight: 1.6, margin: 0 }}>
        This is a great topic to explore deeper with your coach. A 1:1 session could help you develop a personalized strategy for navigating team dynamics.
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button style={{
          flex: 1, padding: "9px 14px", borderRadius: 10,
          background: `linear-gradient(135deg, ${COLORS.amberGold}, ${COLORS.amberLight})`,
          color: "#fff", fontFamily: fontBody, fontSize: "12.5px", fontWeight: 600,
          border: "none", cursor: "pointer",
          boxShadow: `0 2px 8px ${COLORS.amberGold}30`,
        }}>
          Book Session
        </button>
        <button style={{
          flex: 1, padding: "9px 14px", borderRadius: 10,
          background: "transparent", color: COLORS.darkSlate,
          fontFamily: fontBody, fontSize: "12.5px", fontWeight: 500,
          border: `1.5px solid ${COLORS.warmStone}`, cursor: "pointer",
        }}>
          Continue with AI
        </button>
      </div>
    </div>
  </div>
);

const SuggestionChips = ({ chips, delay = 0 }) => (
  <div style={{
    display: "flex", gap: 6, flexWrap: "wrap", paddingLeft: 42,
    animation: `fadeInUp 0.4s ease-out both`, animationDelay: `${delay}ms`,
  }}>
    {chips.map((chip, i) => (
      <button key={i} style={{
        padding: "7px 14px", borderRadius: 20,
        background: "transparent",
        border: `1.5px solid ${COLORS.teal}30`,
        color: COLORS.teal, fontFamily: fontBody, fontSize: "12px", fontWeight: 500,
        cursor: "pointer", transition: "all 0.2s ease",
        display: "flex", alignItems: "center", gap: 5,
      }}>
        {chip.icon && <span style={{ fontSize: "13px" }}>{chip.icon}</span>}
        {chip.label}
      </button>
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════
// GROWTH JOURNEY RAIL
// ═══════════════════════════════════════════════════════
const GrowthJourneyRail = () => {
  const milestones = [
    { date: "Apr 15", label: "Today", type: "active", detail: "Communication coaching" },
    { date: "Apr 10", label: "Action completed", type: "done", detail: "Active listening in standup" },
    { date: "Apr 3", label: "Coach session", type: "coach", detail: "Conflict resolution with Dr. Rivera" },
    { date: "Mar 28", label: "Milestone", type: "milestone", detail: "Influence score +14%" },
    { date: "Mar 20", label: "Goal set", type: "goal", detail: "Improve team communication" },
    { date: "Mar 12", label: "Assessment", type: "assessment", detail: "Behavioral profile completed" },
    { date: "Mar 1", label: "Joined", type: "start", detail: "Welcome to your growth journey" },
  ];

  const typeStyles = {
    active: { bg: COLORS.teal, border: COLORS.teal, glow: true },
    done: { bg: COLORS.teal, border: COLORS.teal },
    coach: { bg: COLORS.amberGold, border: COLORS.amberGold },
    milestone: { bg: COLORS.amberGold, border: COLORS.amberGold },
    goal: { bg: COLORS.sky, border: COLORS.sky },
    assessment: { bg: COLORS.deepTeal, border: COLORS.deepTeal },
    start: { bg: COLORS.sage, border: COLORS.sage },
  };

  return (
    <div style={{
      width: 220, height: "100%", background: "#fff",
      borderRight: `1px solid ${COLORS.warmStone}`,
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: "18px 16px 14px",
        borderBottom: `1px solid ${COLORS.warmStone}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
          <Icons.Journey size={16} color={COLORS.teal} />
          <span style={{ fontFamily: fontHead, fontSize: "14px", fontWeight: 500, color: COLORS.charcoal }}>
            Growth Journey
          </span>
        </div>
        {/* Growth streak */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
          borderRadius: 10, background: `${COLORS.amberGold}08`,
          border: `1px solid ${COLORS.amberGold}18`,
        }}>
          <span style={{ fontSize: "16px" }}>🌱</span>
          <div>
            <div style={{ fontFamily: fontBody, fontSize: "12px", fontWeight: 600, color: COLORS.charcoal }}>
              12-day streak
            </div>
            <div style={{ fontFamily: fontBody, fontSize: "10px", color: COLORS.midGray }}>
              Keep growing!
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
        {milestones.map((m, i) => {
          const s = typeStyles[m.type];
          return (
            <div key={i} style={{
              display: "flex", gap: 12, position: "relative",
              paddingBottom: i < milestones.length - 1 ? 20 : 0,
              animation: `fadeInUp 0.4s ease-out both`,
              animationDelay: `${i * 80}ms`,
            }}>
              {/* Timeline line */}
              {i < milestones.length - 1 && (
                <div style={{
                  position: "absolute", left: 7, top: 18, width: 1.5,
                  height: "calc(100% - 10px)",
                  background: `linear-gradient(to bottom, ${s.border}40, ${COLORS.warmStone})`,
                }} />
              )}
              {/* Node */}
              <div style={{
                width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                background: m.type === "active" ? s.bg : "transparent",
                border: `2px solid ${s.border}`,
                marginTop: 2,
                boxShadow: s.glow ? `0 0 8px ${s.bg}40` : "none",
                animation: s.glow ? "pulseGlow 2.5s ease-in-out infinite" : "none",
              }}>
                {m.type === "done" && (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icons.Check size={9} color={s.bg} />
                  </div>
                )}
              </div>
              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: fontBody, fontSize: "10px", color: COLORS.midGray, marginBottom: 2,
                }}>
                  {m.date}
                </div>
                <div style={{
                  fontFamily: fontBody, fontSize: "12px", fontWeight: 600,
                  color: m.type === "active" ? COLORS.teal : COLORS.charcoal,
                }}>
                  {m.label}
                </div>
                <div style={{
                  fontFamily: fontBody, fontSize: "11px", color: COLORS.midGray, lineHeight: 1.4,
                }}>
                  {m.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// CONTEXT PANEL (Right sidebar)
// ═══════════════════════════════════════════════════════
const ContextPanel = () => (
  <div style={{
    width: 240, height: "100%", background: "#fff",
    borderLeft: `1px solid ${COLORS.warmStone}`,
    display: "flex", flexDirection: "column", overflow: "hidden",
  }}>
    {/* Profile summary */}
    <div style={{ padding: "16px", borderBottom: `1px solid ${COLORS.warmStone}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.teal})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "15px", fontWeight: 600, color: "#fff", fontFamily: fontBody,
        }}>
          AK
        </div>
        <div>
          <div style={{ fontFamily: fontBody, fontSize: "13px", fontWeight: 600, color: COLORS.charcoal }}>
            Ava Kim
          </div>
          <div style={{ fontFamily: fontBody, fontSize: "11px", color: COLORS.midGray }}>
            Product Designer
          </div>
        </div>
      </div>
      {/* Primary type badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "5px 10px", borderRadius: 8,
        background: `${COLORS.teal}10`, border: `1px solid ${COLORS.teal}20`,
      }}>
        <Icons.Brain size={13} color={COLORS.teal} />
        <span style={{ fontFamily: fontBody, fontSize: "11px", fontWeight: 600, color: COLORS.teal }}>
          Analytical-Empathetic
        </span>
      </div>
    </div>

    {/* Mini radar */}
    <div style={{ padding: "12px 16px", borderBottom: `1px solid ${COLORS.warmStone}` }}>
      <div style={{ fontFamily: fontBody, fontSize: "11px", fontWeight: 600, color: COLORS.charcoal, marginBottom: 8 }}>
        Behavioral Snapshot
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RadarChart size={140} data={[
          { label: "INF", value: 72 },
          { label: "STD", value: 65 },
          { label: "ANA", value: 85 },
          { label: "DOM", value: 48 },
          { label: "EMP", value: 78 },
        ]} />
      </div>
    </div>

    {/* Active goals */}
    <div style={{ padding: "12px 16px", flex: 1, overflowY: "auto" }}>
      <div style={{ fontFamily: fontBody, fontSize: "11px", fontWeight: 600, color: COLORS.charcoal, marginBottom: 10 }}>
        Active Goals
      </div>
      {[
        { goal: "Improve team communication", progress: 68, color: COLORS.teal },
        { goal: "Lead with empathy", progress: 45, color: COLORS.sky },
        { goal: "Handle conflict constructively", progress: 30, color: COLORS.amberGold },
      ].map((g, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: fontBody, fontSize: "11.5px", color: COLORS.darkSlate }}>{g.goal}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 4, background: COLORS.warmStone, borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${g.progress}%`, background: g.color,
                borderRadius: 2, animation: "progressFill 1s ease-out",
              }} />
            </div>
            <span style={{ fontFamily: fontBody, fontSize: "10px", fontWeight: 600, color: g.color }}>{g.progress}%</span>
          </div>
        </div>
      ))}

      {/* Privacy indicator */}
      <div style={{
        marginTop: 16, padding: "10px", borderRadius: 10,
        background: `${COLORS.deepTeal}06`,
        border: `1px solid ${COLORS.deepTeal}12`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icons.Shield size={13} color={COLORS.deepTeal} />
          <span style={{ fontFamily: fontBody, fontSize: "10.5px", fontWeight: 600, color: COLORS.deepTeal }}>
            Privacy Protected
          </span>
        </div>
        <div style={{ fontFamily: fontBody, fontSize: "10px", color: COLORS.midGray, marginTop: 4, lineHeight: 1.4 }}>
          Your conversations are private. Only themes shared with your coach.
        </div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════
// MAIN FULL-VIEW INTERFACE
// ═══════════════════════════════════════════════════════
const FullViewChat = () => {
  const [inputVal, setInputVal] = useState("");
  const [depthMode, setDepthMode] = useState("balanced");

  return (
    <div style={{
      display: "flex", height: "100%", width: "100%",
      background: "#fff", borderRadius: 16, overflow: "hidden",
      border: `1px solid ${COLORS.warmStone}`,
      boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
    }}>
      {/* Left: Growth Journey Rail */}
      <GrowthJourneyRail />

      {/* Center: Chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
        <OrganicBg />
        
        {/* Header */}
        <div style={{
          padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: `1px solid ${COLORS.warmStone}`, background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)", zIndex: 2,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "pulseGlow 3s ease-in-out infinite",
            }}>
              <Icons.Leaf size={17} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: fontHead, fontSize: "15px", fontWeight: 500, color: COLORS.charcoal }}>
                Growth Companion
              </div>
              <div style={{ fontFamily: fontBody, fontSize: "11px", color: COLORS.sage, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4CAF50", display: "inline-block" }} />
                Personalized to your profile
              </div>
            </div>
          </div>
          
          {/* Depth mode selector */}
          <div style={{
            display: "flex", gap: 2, padding: 3, borderRadius: 10,
            background: COLORS.linen, border: `1px solid ${COLORS.warmStone}`,
          }}>
            {[
              { key: "quick", label: "Quick", icon: "⚡" },
              { key: "balanced", label: "Balanced", icon: "◐" },
              { key: "deep", label: "In-depth", icon: "◉" },
            ].map(m => (
              <button key={m.key} onClick={() => setDepthMode(m.key)} style={{
                padding: "5px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                fontFamily: fontBody, fontSize: "11.5px", fontWeight: depthMode === m.key ? 600 : 400,
                background: depthMode === m.key ? "#fff" : "transparent",
                color: depthMode === m.key ? COLORS.teal : COLORS.midGray,
                boxShadow: depthMode === m.key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.25s ease",
                display: "flex", alignItems: "center", gap: 4,
              }}>
                <span style={{ fontSize: "11px" }}>{m.icon}</span> {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "20px 24px",
          display: "flex", flexDirection: "column", gap: 16, zIndex: 1,
        }}>
          {/* Mood check-in */}
          <MoodCheckIn delay={100} />

          {/* User message */}
          <UserMessage delay={300}>
            I have a difficult conversation coming up with my team lead about project direction. I tend to get steamrolled in these situations. How can I be more assertive without being aggressive?
          </UserMessage>

          {/* Bot response with assessment grounding */}
          <BotMessage delay={500}>
            <div style={{ marginBottom: 6 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                padding: "2px 8px", borderRadius: 6, fontSize: "10px", fontWeight: 600,
                background: `${COLORS.teal}10`, color: COLORS.teal, marginBottom: 8,
                fontFamily: fontBody,
              }}>
                ✦ Based on your Analytical-Empathetic profile
              </span>
            </div>
            <p style={{ margin: "6px 0", fontSize: "13.5px" }}>
              Your assessment shows you're naturally empathetic (78th percentile) with strong analytical thinking (85th). This means you <em>understand</em> situations deeply — you don't lack insight, you lack a framework for expressing it assertively.
            </p>
            <p style={{ margin: "6px 0", fontSize: "13.5px" }}>
              With your team lead, try the <strong>"Data-Feeling-Request"</strong> pattern — it plays to your natural strengths:
            </p>
            <div style={{
              margin: "10px 0", padding: "10px 14px", borderRadius: 10,
              background: `${COLORS.teal}06`, borderLeft: `3px solid ${COLORS.teal}`,
            }}>
              <div style={{ fontSize: "12px", lineHeight: 1.7 }}>
                <strong>Data:</strong> "I've analyzed the sprint metrics and see X pattern..."<br/>
                <strong>Feeling:</strong> "I'm concerned this trajectory might..."<br/>
                <strong>Request:</strong> "Could we explore an alternative approach?"
              </div>
            </div>
            <p style={{ margin: "6px 0", fontSize: "13.5px", color: COLORS.midGray }}>
              This approach works for you because you lead with your strongest dimension (analytical) which builds confidence, then layer in empathy to maintain connection.
            </p>
          </BotMessage>

          {/* Milestone */}
          <MilestoneCard delay={700} />

          {/* Action plan */}
          <ActionPlanCard delay={900} />

          {/* Suggestion chips */}
          <SuggestionChips delay={1100} chips={[
            { icon: "🎭", label: "Role-play this conversation" },
            { icon: "📊", label: "Show my communication growth" },
            { icon: "🧭", label: "Explore other approaches" },
          ]} />

          {/* Coach handoff */}
          <CoachHandoff delay={1300} />
        </div>

        {/* Input area */}
        <div style={{
          padding: "14px 20px 18px", borderTop: `1px solid ${COLORS.warmStone}`,
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", zIndex: 2,
        }}>
          {/* Quick action chips */}
          <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto" }}>
            {["Set a goal", "Review my progress", "Explore strengths", "Practice scenario"].map((t, i) => (
              <button key={i} style={{
                padding: "5px 12px", borderRadius: 16, whiteSpace: "nowrap",
                border: `1px solid ${COLORS.warmStone}`, background: COLORS.linen,
                fontFamily: fontBody, fontSize: "11px", color: COLORS.darkSlate,
                cursor: "pointer", transition: "all 0.2s ease",
              }}>
                {t}
              </button>
            ))}
          </div>
          {/* Input field */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", borderRadius: 14,
            border: `1.5px solid ${COLORS.warmStone}`,
            background: COLORS.cream,
            transition: "border-color 0.2s ease",
          }}>
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Share what's on your mind..."
              style={{
                flex: 1, border: "none", background: "transparent",
                fontFamily: fontBody, fontSize: "14px", color: COLORS.charcoal,
                outline: "none",
              }}
            />
            <button style={{
              width: 36, height: 36, borderRadius: 10,
              background: inputVal ? `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})` : COLORS.warmStone,
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.25s ease",
              boxShadow: inputVal ? `0 2px 8px ${COLORS.teal}30` : "none",
            }}>
              <Icons.Send size={16} color={inputVal ? "#fff" : COLORS.midGray} />
            </button>
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: 6, padding: "0 4px",
          }}>
            <span style={{ fontFamily: fontBody, fontSize: "10px", color: COLORS.lightGray }}>
              Responses grounded in your behavioral methodology
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icons.Shield size={11} color={COLORS.lightGray} />
              <span style={{ fontFamily: fontBody, fontSize: "10px", color: COLORS.lightGray }}>
                Private & encrypted
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Context Panel */}
      <ContextPanel />
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// COMPACT WIDGET STATES
// ═══════════════════════════════════════════════════════
const CompactWidget = () => {
  const [state, setState] = useState("bubble"); // bubble, compact, expanded
  
  if (state === "bubble") {
    return (
      <div style={{ position: "relative" }}>
        <button onClick={() => setState("compact")} style={{
          width: 56, height: 56, borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`,
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 20px ${COLORS.teal}40`,
          animation: "pulseGlow 3s ease-in-out infinite",
          transition: "transform 0.2s ease",
        }}>
          <Icons.Leaf size={24} color="#fff" />
        </button>
        {/* Notification badge */}
        <div style={{
          position: "absolute", top: -2, right: -2,
          width: 18, height: 18, borderRadius: "50%",
          background: COLORS.softCoral, border: "2px solid #fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: fontBody, fontSize: "9px", fontWeight: 700, color: "#fff",
        }}>
          2
        </div>
      </div>
    );
  }

  if (state === "compact") {
    return (
      <div style={{
        width: 360, borderRadius: 20,
        background: "#fff",
        border: `1px solid ${COLORS.warmStone}`,
        boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        overflow: "hidden",
        animation: "growIn 0.35s ease-out",
      }}>
        {/* Header */}
        <div style={{
          padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.teal})`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icons.Leaf size={18} color="#fff" />
            <span style={{ fontFamily: fontHead, fontSize: "14px", fontWeight: 500, color: "#fff" }}>
              Growth Companion
            </span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setState("expanded")} style={{
              width: 28, height: 28, borderRadius: 8,
              background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icons.Expand size={13} color="#fff" />
            </button>
            <button onClick={() => setState("bubble")} style={{
              width: 28, height: 28, borderRadius: 8,
              background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: fontBody, fontSize: "16px", color: "#fff", lineHeight: 1,
            }}>
              ×
            </button>
          </div>
        </div>

        {/* Quick insight card */}
        <div style={{ padding: "12px 14px", borderBottom: `1px solid ${COLORS.warmStone}` }}>
          <div style={{
            padding: "10px 12px", borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.amberGold}08, ${COLORS.teal}06)`,
            border: `1px solid ${COLORS.amberGold}15`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <Icons.Sparkle size={12} />
              <span style={{ fontFamily: fontBody, fontSize: "11px", fontWeight: 600, color: COLORS.charcoal }}>
                Pre-meeting insight
              </span>
            </div>
            <p style={{ fontFamily: fontBody, fontSize: "12px", color: COLORS.darkSlate, lineHeight: 1.5, margin: 0 }}>
              Meeting with James Chen in 25 min. He's high-Dominance — lead with outcomes first.
            </p>
          </div>
        </div>

        {/* Latest message preview */}
        <div style={{ padding: "12px 14px" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={{
              width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icons.Leaf size={13} color="#fff" />
            </div>
            <div>
              <p style={{ fontFamily: fontBody, fontSize: "12.5px", color: COLORS.charcoal, lineHeight: 1.5, margin: 0 }}>
                Great progress on your communication goal! Ready to continue where we left off?
              </p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: "0 14px 8px", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Continue session", "Quick check-in", "My progress"].map((t, i) => (
            <button key={i} style={{
              padding: "6px 12px", borderRadius: 16,
              border: `1px solid ${COLORS.teal}25`, background: `${COLORS.teal}06`,
              fontFamily: fontBody, fontSize: "11px", color: COLORS.teal, fontWeight: 500,
              cursor: "pointer",
            }}>
              {t}
            </button>
          ))}
        </div>

        {/* Minimal input */}
        <div style={{ padding: "10px 14px 14px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "9px 12px", borderRadius: 12,
            background: COLORS.linen, border: `1px solid ${COLORS.warmStone}`,
          }}>
            <input placeholder="Quick message..." style={{
              flex: 1, border: "none", background: "transparent",
              fontFamily: fontBody, fontSize: "13px", color: COLORS.charcoal, outline: "none",
            }} />
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icons.Send size={13} color="#fff" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Expanded compact - taller with more chat
  return (
    <div style={{
      width: 380, height: 520, borderRadius: 20,
      background: "#fff",
      border: `1px solid ${COLORS.warmStone}`,
      boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
      overflow: "hidden", display: "flex", flexDirection: "column",
      animation: "growIn 0.3s ease-out",
    }}>
      {/* Header */}
      <div style={{
        padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.teal})`,
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icons.Leaf size={18} color="#fff" />
          <span style={{ fontFamily: fontHead, fontSize: "14px", fontWeight: 500, color: "#fff" }}>
            Growth Companion
          </span>
          <span style={{
            padding: "2px 8px", borderRadius: 8, fontSize: "10px",
            background: "rgba(255,255,255,0.2)", color: "#fff", fontFamily: fontBody,
          }}>
            Quick Mode
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setState("compact")} style={{
            background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
            width: 28, height: 28, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: fontBody, fontSize: "14px", color: "#fff",
          }}>
            ↙
          </button>
          <button onClick={() => setState("bubble")} style={{
            background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
            width: 28, height: 28, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: fontBody, fontSize: "16px", color: "#fff", lineHeight: 1,
          }}>
            ×
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 12 }}>
        <BotMessage delay={0}>
          <p style={{ margin: 0, fontSize: "13px" }}>
            Welcome back, Ava! You have a meeting with James in 25 minutes. Want a quick communication prep?
          </p>
        </BotMessage>
        <UserMessage delay={100}>
          Yes please, quick tips for that meeting
        </UserMessage>
        <BotMessage delay={200}>
          <div style={{
            padding: "2px 7px", borderRadius: 5, fontSize: "10px", fontWeight: 600,
            background: `${COLORS.teal}10`, color: COLORS.teal, display: "inline-block",
            marginBottom: 6, fontFamily: fontBody,
          }}>
            ⚡ Quick prep
          </div>
          <p style={{ margin: "4px 0", fontSize: "13px" }}>
            <strong>James is high-Dominance.</strong> Three quick tips:
          </p>
          <div style={{ fontSize: "12.5px", lineHeight: 1.7 }}>
            → Lead with the bottom line first<br/>
            → Use specific numbers and timelines<br/>
            → Save relationship talk for after decisions
          </div>
        </BotMessage>
        <SuggestionChips delay={300} chips={[
          { label: "Tell me more" },
          { label: "Role-play intro" },
        ]} />
      </div>

      {/* Input */}
      <div style={{ padding: "10px 14px 14px", borderTop: `1px solid ${COLORS.warmStone}`, flexShrink: 0 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "9px 12px", borderRadius: 12,
          background: COLORS.linen, border: `1px solid ${COLORS.warmStone}`,
        }}>
          <input placeholder="Quick message..." style={{
            flex: 1, border: "none", background: "transparent",
            fontFamily: fontBody, fontSize: "13px", color: COLORS.charcoal, outline: "none",
          }} />
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: `linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight})`,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <Icons.Send size={13} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN SHOWCASE APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [activeView, setActiveView] = useState("full");

  const views = [
    { key: "full", label: "Full View — Employee Chat", sublabel: "Primary coaching experience" },
    { key: "widget", label: "Compact Widget", sublabel: "Quick coaching & nudges" },
  ];

  return (
    <div style={{
      width: "100%", minHeight: "100vh",
      background: `linear-gradient(165deg, #f8f6f2 0%, #eee9e1 40%, #e4ded6 100%)`,
      fontFamily: fontBody,
    }}>
      <style>{styleTag}</style>

      {/* View Selector */}
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
          <Icons.Leaf size={17} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: fontHead, fontSize: "16px", fontWeight: 500, color: COLORS.charcoal }}>
            Employee Experience — UI/UX Showcase
          </div>
          <div style={{ fontFamily: fontBody, fontSize: "11px", color: COLORS.midGray }}>
            Living Growth Design System · Role: Employee
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, padding: 3, background: COLORS.linen, borderRadius: 10 }}>
          {views.map(v => (
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

      {/* Content */}
      {activeView === "full" ? (
        <div style={{ padding: "20px", height: "calc(100vh - 70px)" }}>
          <FullViewChat />
        </div>
      ) : (
        <div style={{
          height: "calc(100vh - 70px)",
          display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
          padding: "24px 32px",
          position: "relative",
        }}>
          {/* Simulated page content behind */}
          <div style={{
            position: "absolute", inset: 20, background: "#fff", borderRadius: 16,
            border: `1px solid ${COLORS.warmStone}`, opacity: 0.5,
            display: "flex", flexDirection: "column", padding: 30,
          }}>
            <div style={{ width: 200, height: 18, background: COLORS.warmStone, borderRadius: 6, marginBottom: 12 }} />
            <div style={{ width: "60%", height: 12, background: COLORS.linen, borderRadius: 4, marginBottom: 8 }} />
            <div style={{ width: "80%", height: 12, background: COLORS.linen, borderRadius: 4, marginBottom: 8 }} />
            <div style={{ width: "45%", height: 12, background: COLORS.linen, borderRadius: 4 }} />
          </div>
          <CompactWidget />
        </div>
      )}
    </div>
  );
}
