import { useEffect, useRef, useState, useCallback } from "react";
import FuzzyText from "./FuzzyText";

/* ═══════════════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════════════ */
const CFG = {
  name: "DINESH",
  nameAccent: "R",
  role: "Motion Graphics Designer · Video Editor · Graphics Designer",
  hud: {
    tl: "DINESH_EDIT_STUDIO_v2.0",
    tr: "24 FPS / 48000 Hz / ST",
    bl: "PORTFOLIO_MASTER.mov",
    br: "PRORES_422_HQ",
  },
  minDuration: 3800,
  exitDuration: 950,
  status: [
    "INITIALIZING_SEQUENCES",
    "LOADING_ASSETS",
    "RENDERING_FRAMES",
    "CALIBRATING_COLOR_GRADE",
    "ENCODING_OUTPUT",
    "SYSTEM_READY",
  ],
};

const ACCENT = "#39d401";

/* ═══════════════════════════════════════════════════════
   CSS — injected once
═══════════════════════════════════════════════════════ */
const STYLES = `
  /* ── Entrance animations ── */
  @keyframes ld-name-in {
    from { clip-path: inset(0 0 100% 0); opacity: 0; transform: translateY(20px); }
    to   { clip-path: inset(0 0 0% 0);   opacity: 1; transform: translateY(0); }
  }
  @keyframes ld-role-in {
    from { opacity: 0; letter-spacing: 0.4em; }
    to   { opacity: 1; letter-spacing: 0.22em; }
  }
  @keyframes ld-hud-in {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Idle animations ── */
  @keyframes ld-scan-move {
    0%   { top: -4px; opacity: 0; }
    5%   { opacity: 1; }
    95%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes ld-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  @keyframes ld-pulse {
    0%, 100% { opacity: 0.22; }
    50%       { opacity: 0.48; }
  }
  @keyframes ld-bar-glow {
    0%, 100% { box-shadow: 0 0 4px ${ACCENT}88; }
    50%       { box-shadow: 0 0 12px ${ACCENT}, 0 0 28px ${ACCENT}44; }
  }
  @keyframes ld-tick-in {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* ── Exit animation ── */
  @keyframes ld-exit {
    0%   { transform: translateY(0);     clip-path: inset(0 0 0 0); }
    100% { transform: translateY(-100%); clip-path: inset(0 0 0 0); }
  }

  /* ── Applied classes ── */
  .ld-name-fuzzy { animation: ld-name-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .ld-role    { animation: ld-role-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s both; }
  .ld-hud     { animation: ld-hud-in  0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
  .ld-bottom  { animation: ld-hud-in  0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .ld-counter { animation: ld-tick-in 0.5s cubic-bezier(0.16,1,0.3,1) 1.1s both; }
  .ld-corner  { animation: ld-pulse   3s ease-in-out infinite; }
  .ld-cursor  { animation: ld-blink   1s step-end     infinite; }
  .ld-fill    { animation: ld-bar-glow 2.5s ease-in-out 1s infinite; }

  .ld-scanmove {
    position: absolute;
    left: 0; right: 0;
    height: 3px;
    background: linear-gradient(to bottom,
      transparent,
      rgba(57,212,1,0.08) 40%,
      rgba(57,212,1,0.15) 50%,
      rgba(57,212,1,0.08) 60%,
      transparent);
    animation: ld-scan-move 4s linear 0.8s infinite;
    pointer-events: none;
    z-index: 6;
  }

  .ld-exiting {
    animation: ld-exit ${CFG.exitDuration}ms cubic-bezier(0.76,0,0.24,1) forwards !important;
  }

  /* ── FuzzyText canvas sizing ── */
  .ld-name-fuzzy canvas {
    max-width: 100%;
    height: auto;
  }
`;

if (typeof document !== "undefined" && !document.getElementById("ld-styles")) {
  const tag = document.createElement("style");
  tag.id = "ld-styles";
  tag.textContent = STYLES;
  document.head.appendChild(tag);
}

/* ═══════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════ */
const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

export default function LoadingScreen({ onDone }) {
  const [pct, setPct] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [tc, setTc] = useState("00:00;00:00");
  const [exiting, setExiting] = useState(false);

  const overlayRef = useRef(null);
  const startRef = useRef(Date.now());
  const exitedRef = useRef(false);
  const realDoneRef = useRef(false);

  /* trigger exit: curtain slide-up then notify parent */
  const exit = useCallback(() => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    setExiting(true);
    setTimeout(onDone, CFG.exitDuration);
  }, [onDone]);

  /* track real window load */
  useEffect(() => {
    const handler = () => {
      realDoneRef.current = true;
    };
    if (document.readyState === "complete") {
      realDoneRef.current = true;
    } else {
      window.addEventListener("load", handler, { once: true });
      return () => window.removeEventListener("load", handler);
    }
  }, []);

  /* rAF loop — drives counter, timecode, status */
  useEffect(() => {
    let raf;
    let exitTimeout;

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const progress = Math.min(elapsed / CFG.minDuration, 1);
      const p = Math.floor(progress * 100);

      setPct(p);
      setStatusIdx(
        Math.min(
          Math.floor(progress * CFG.status.length),
          CFG.status.length - 1,
        ),
      );

      /* fake 24fps timecode */
      const totalF = Math.floor(elapsed / (1000 / 24));
      const fr = totalF % 24;
      const sec = Math.floor(totalF / 24) % 60;
      const min = Math.floor(totalF / (24 * 60)) % 60;
      const hr = Math.floor(totalF / (24 * 3600));
      setTc(`${pad(hr)}:${pad(min)};${pad(sec)}:${pad(fr)}`);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        /* wait for real load + a brief hold */
        const waitReal = () => {
          if (realDoneRef.current) {
            exitTimeout = setTimeout(exit, 320);
          } else {
            exitTimeout = setTimeout(waitReal, 100);
          }
        };
        waitReal();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimeout);
    };
  }, [exit]);

  const pctStr = String(pct).padStart(3, "0") + "%";
  const statusStr = CFG.status[statusIdx] ?? CFG.status[0];

  return (
    <div
      ref={overlayRef}
      className={exiting ? "ld-exiting" : ""}
      style={sOverlay}
    >
      {/* ── bg layers ── */}
      <div style={sNoise} />
      <div style={sVignette} />
      <div style={sScanlines} />
      <div className="ld-scanmove" />

      {/* ── corner HUD: top ── */}
      <div
        className="ld-hud ld-corner"
        style={{
          ...sCorner,
          top: "clamp(16px,3vw,28px)",
          left: "clamp(16px,3vw,28px)",
        }}
      >
        <span style={sDot} />
        {CFG.hud.tl}
      </div>
      <div
        className="ld-hud ld-corner"
        style={{
          ...sCorner,
          top: "clamp(16px,3vw,28px)",
          right: "clamp(16px,3vw,28px)",
          textAlign: "right",
        }}
      >
        {CFG.hud.tr}
        <span style={sDot} />
      </div>

      {/* ── corner HUD: bottom ── */}
      <div
        className="ld-bottom"
        style={{
          ...sCorner,
          bottom: "clamp(16px,3vw,28px)",
          left: "clamp(16px,3vw,28px)",
        }}
      >
        <div style={sStatus}>
          STATUS:&nbsp;<span style={{ color: ACCENT }}>{statusStr}</span>
          <span className="ld-cursor" style={{ color: ACCENT }}>
            _
          </span>
        </div>
        <div>FILE:&nbsp;{CFG.hud.bl}</div>
      </div>
      <div
        className="ld-bottom"
        style={{
          ...sCorner,
          bottom: "clamp(16px,3vw,28px)",
          right: "clamp(16px,3vw,28px)",
          textAlign: "right",
        }}
      >
        <div>
          TC:&nbsp;<span style={sMono}>{tc}</span>
        </div>
        <div>CODEC:&nbsp;{CFG.hud.br}</div>
      </div>

      {/* ── center block ── */}
      <div style={sCenter}>
        {/* name — FuzzyText on desktop, plain heading on mobile (canvas CSS-scaling shrinks text too much on narrow screens) */}
        <div className="ld-name-fuzzy" style={sNameRow}>
          {isMobile ? (
            <div style={sMobileName}>
              {CFG.name}{" "}
              <span style={{ color: ACCENT }}>{CFG.nameAccent}</span>
            </div>
          ) : (
            <FuzzyText
              fontSize="clamp(68px, 17vw, 190px)"
              fontFamily="'Clausten', sans-serif"
              fontWeight={400}
              gradient={[
                "#F0F0F0",
                "#F0F0F0",
                "#F0F0F0",
                "#F0F0F0",
                "#F0F0F0",
                "#F0F0F0",
                "#F0F0F0",
                ACCENT,
              ]}
              baseIntensity={0.12}
              hoverIntensity={0.45}
              glitchMode={true}
              glitchInterval={4500}
              glitchDuration={180}
              fps={24}
              fuzzRange={28}
              transitionDuration={6}
              enableHover={true}
            >
              {CFG.name} {CFG.nameAccent}
            </FuzzyText>
          )}
        </div>

        {/* role */}
        <div className="ld-role" style={sRole}>
          {CFG.role}
        </div>

        {/* divider */}
        <div style={sDivider}>
          <div style={sDividerLine} />
          <div className="ld-counter" style={sPct}>
            {pctStr}
          </div>
          <div style={sDividerLine} />
        </div>

        {/* progress bar */}
        <div style={sBarOuter}>
          <div className="ld-fill" style={{ ...sBarFill, width: `${pct}%` }} />
          {/* head glow */}
          <div style={{ ...sBarHead, left: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ── helpers ── */
function pad(n) {
  return String(n).padStart(2, "0");
}

/* ═══════════════════════════════════════════════════════
   INLINE STYLES
═══════════════════════════════════════════════════════ */
const sOverlay = {
  position: "fixed",
  inset: 0,
  zIndex: 10000,
  background: "#0A0A0A",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  cursor: "none",
};

const sNoise = {
  position: "absolute",
  inset: 0,
  opacity: 0.045,
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
  backgroundSize: "180px",
  pointerEvents: "none",
  zIndex: 1,
};

const sVignette = {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.78) 100%)",
  pointerEvents: "none",
  zIndex: 2,
};

const sScanlines = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.13) 3px, rgba(0,0,0,0.13) 4px)",
  pointerEvents: "none",
  zIndex: 4,
};

const sCorner = {
  position: "absolute",
  fontFamily: "'ClashDisplay', 'Space Mono', monospace",
  fontSize: "clamp(7px, 0.9vw, 10px)",
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.24)",
  lineHeight: 2,
  zIndex: 5,
};

const sDot = {
  display: "inline-block",
  width: 4,
  height: 4,
  borderRadius: "50%",
  background: ACCENT,
  verticalAlign: "middle",
  margin: "0 6px",
  boxShadow: `0 0 6px ${ACCENT}`,
};

const sStatus = {
  fontVariantNumeric: "tabular-nums",
};

const sMono = {
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "0.06em",
};

const sCenter = {
  position: "relative",
  zIndex: 5,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "0 clamp(16px, 4vw, 48px)",
  width: "100%",
};

const sNameRow = {
  display: "flex",
  justifyContent: "center",
  lineHeight: 0.9,
  maxWidth: "100%",
  overflow: "hidden",
};

const sMobileName = {
  fontFamily: "'Clausten', sans-serif",
  fontWeight: 400,
  /* 16.5vw ≈ 64px on iPhone SE (375px), ≈ 67px on iPhone 14 (390px)
     Plain CSS text renders at exactly this size — no canvas scaling loss */
  fontSize: "clamp(58px, 16.5vw, 120px)",
  lineHeight: 0.9,
  color: "#F0F0F0",
  letterSpacing: "0.02em",
  textAlign: "center",
  whiteSpace: "nowrap",
};

const sRole = {
  fontFamily: "'ClashDisplay', sans-serif",
  fontWeight: 300,
  fontSize: "clamp(9px, 1.4vw, 13px)",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  marginTop: "clamp(10px, 2vw, 18px)",
};

const sDivider = {
  display: "flex",
  alignItems: "center",
  gap: "clamp(10px, 2vw, 20px)",
  margin: "clamp(18px, 4vw, 32px) 0 clamp(10px, 2vw, 16px)",
  width: "clamp(160px, 30vw, 320px)",
};

const sDividerLine = {
  flex: 1,
  height: 1,
  background: "rgba(255,255,255,0.09)",
};

const sPct = {
  fontFamily: "'ClashDisplay', sans-serif",
  fontSize: "clamp(13px, 1.8vw, 18px)",
  letterSpacing: "0.1em",
  color: ACCENT,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
};

const sBarOuter = {
  position: "relative",
  width: "clamp(160px, 30vw, 320px)",
  height: 1,
  background: "rgba(255,255,255,0.07)",
  overflow: "visible",
};

const sBarFill = {
  position: "absolute",
  left: 0,
  top: 0,
  height: "100%",
  background: ACCENT,
  transition: "width 80ms linear",
};

const sBarHead = {
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: 4,
  height: 4,
  borderRadius: "50%",
  background: ACCENT,
  boxShadow: `0 0 8px ${ACCENT}, 0 0 20px ${ACCENT}88`,
  transition: "left 80ms linear",
  pointerEvents: "none",
};
