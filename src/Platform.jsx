import { lazy, Suspense, useCallback, useEffect, useState } from "react";

const EmployeeExperience = lazy(() => import("./EmployeeExperience.jsx"));
const PrivacyAssessmentSystem = lazy(() => import("./PrivacyAssessmentSystem.jsx"));
const CoachAdminViews = lazy(() => import("./CoachAdminViews.jsx"));

// ═══════════════════════════════════════════════════════════
// PLATFORM DESIGN SYSTEM: "Living Growth"
// ═══════════════════════════════════════════════════════════
const COLORS = {
  deepTeal: "#1A5C54",
  teal: "#247A70",
  tealLight: "#2D9B8F",
  warmStone: "#E8DFD3",
  linen: "#F5F0EA",
  charcoal: "#2C2C2E",
  midGray: "#8E8E93",
};

const fontHead = `'Fraunces', 'Georgia', serif`;
const fontBody = `'DM Sans', 'Helvetica Neue', sans-serif`;

const Icons = {
  Leaf: ({ s = 18, c = COLORS.teal }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5-3.5 2-7.5 2-12 0-2.5-.5-5.5-2-8z" />
      <path d="M8 14c2-2 4-3 6-4" />
    </svg>
  ),
  Shield: ({ s = 18, c = COLORS.teal }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Users: ({ s = 18, c = COLORS.teal }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      <path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85" />
    </svg>
  ),
  Sparkle: ({ s = 14, c = COLORS.amberGold }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  ),
};

const DEMOS = [
  { id: "ee", label: "Employee", desc: "Experience", Component: EmployeeExperience, Icon: Icons.Leaf },
  { id: "privacy", label: "Privacy", desc: "Assessment", Component: PrivacyAssessmentSystem, Icon: Icons.Shield },
  { id: "coach", label: "Coach", desc: "Admin Views", Component: CoachAdminViews, Icon: Icons.Users },
];

function parseHash() {
  const raw = window.location.hash.replace(/^#/, "").split("/")[0];
  return DEMOS.some((d) => d.id === raw) ? raw : DEMOS[0].id;
}

function DemoFallback() {
  return (
    <div style={{ 
      height: "100vh", width: "100vw", 
      display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(165deg, #f8f6f2 0%, #eee9e1 40%, #e4ded6 100%)`,
      fontFamily: fontBody, color: COLORS.teal
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, animation: "breathe 3s ease-in-out infinite" }}>
        <Icons.Leaf s={32} c={COLORS.teal} />
        <span style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>Unfolding...</span>
      </div>
    </div>
  );
}

const platformStyles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

@keyframes slideUpDock {
  from { opacity: 0; transform: translate(-50%, 20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 1; }
}

.platform-nav-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  background: transparent;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.platform-nav-button:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}

.platform-nav-button.active {
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(26, 92, 84, 0.08), 0 1px 3px rgba(26, 92, 84, 0.04);
}

.platform-nav-button .icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${COLORS.linen};
  transition: all 0.4s ease;
}

.platform-nav-button.active .icon-wrap {
  background: linear-gradient(135deg, ${COLORS.deepTeal}, ${COLORS.tealLight});
}

.platform-nav-button .text-wrap {
  text-align: left;
  transition: all 0.3s ease;
}

.platform-nav-label {
  font-family: ${fontHead};
  font-size: 15px;
  font-weight: 500;
  color: ${COLORS.charcoal};
  line-height: 1.2;
  transition: color 0.3s ease;
}

.platform-nav-button.active .platform-nav-label {
  color: ${COLORS.deepTeal};
}

.platform-nav-desc {
  font-family: ${fontBody};
  font-size: 11px;
  color: ${COLORS.midGray};
  line-height: 1.2;
}

/* Tooltip / Hint for platform context */
.platform-brand {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: ${COLORS.charcoal};
  color: #fff;
  font-family: ${fontBody};
  font-size: 11px;
  padding: 6px 12px;
  border-radius: 20px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  white-space: nowrap;
  letter-spacing: 0.5px;
}

.platform-dock:hover .platform-brand {
  opacity: 1;
  transform: translate(-50%, -5px);
}
`;

export default function Platform() {
  const [activeId, setActiveId] = useState(parseHash);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const onHashChange = () => setActiveId(parseHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const part = window.location.hash.replace(/^#/, "").split("/")[0];
    if (!part || !DEMOS.some((d) => d.id === part)) {
      const fallback = DEMOS[0].id;
      window.history.replaceState(null, "", `#${fallback}`);
      setActiveId(fallback);
    }
  }, []);

  const select = useCallback((id) => {
    window.location.hash = id;
    setActiveId(id);
  }, []);

  const active = DEMOS.find((d) => d.id === activeId) ?? DEMOS[0];
  const ActiveDemo = active.Component;

  return (
    <>
      <style>{platformStyles}</style>
      <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: COLORS.warmStone }}>
        
        {/* Main Content Area */}
        <main style={{ height: "100vh", width: "100%", overflow: "auto" }}>
          <Suspense fallback={<DemoFallback />}>
            <ActiveDemo />
          </Suspense>
        </main>

        {/* Floating Organic Dock */}
        <div 
          className="platform-dock"
          style={{
            position: "fixed",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px",
            background: "rgba(245, 240, 234, 0.75)", // linen with transparency
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "100px",
            border: `1px solid rgba(255, 255, 255, 0.6)`,
            boxShadow: "0 10px 40px rgba(26, 92, 84, 0.08), 0 2px 10px rgba(26, 92, 84, 0.04)",
            animation: "slideUpDock 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            zIndex: 9999,
          }}
        >
          <div className="platform-brand">
            Living Growth • UI/UX Prototypes
          </div>

          {DEMOS.map((d) => {
            const on = d.id === activeId;
            return (
              <button
                key={d.id}
                type="button"
                className={`platform-nav-button ${on ? "active" : ""}`}
                onClick={() => select(d.id)}
                aria-label={`View ${d.label} prototype`}
              >
                <div className="icon-wrap">
                  <d.Icon s={18} c={on ? "#fff" : COLORS.teal} />
                </div>
                
                {/* Dynamic width text container to animate expansion */}
                <div 
                  className="text-wrap"
                  style={{
                    width: on ? "auto" : "0px",
                    opacity: on ? 1 : 0,
                    overflow: "hidden",
                    paddingRight: on ? "8px" : "0px",
                  }}
                >
                  <div className="platform-nav-label">{d.label}</div>
                  <div className="platform-nav-desc">{d.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </>
  );
}
