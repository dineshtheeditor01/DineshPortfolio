import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Particles from "../components/Particles";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FS, STYLE } from "../theme";

gsap.registerPlugin(ScrollTrigger);

// ─── TEXT TOKENS — import from theme.js for shared values ────────────────────
const TXT = {
  tag: {
    ...STYLE.labelAccent,
  },
  role: {
    fontFamily: "var(--font-mono)",
    fontSize: "clamp(10px,1.2vw,12px)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
  },
  bio: {
    ...STYLE.body,
  },
  btnSolid: {
    fontFamily: "var(--font-mono)",
    fontSize: FS.labelSm,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  btnOut: {
    fontFamily: "var(--font-mono)",
    fontSize: FS.labelSm,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  badgeText: {
    ...STYLE.labelDim,
  },
  scrollLbl: {
    fontFamily: "var(--font-mono)",
    fontSize: FS.labelSm,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--text-dim)",
    writingMode: "vertical-rl",
  },
  placeholder: {
    ...STYLE.monoXs,
  },
};

const ROLES = [
  "",
  "Motion Graphics Designer",
  "Video Editor",
  "Graphics Designer",
];

export default function HeroSection() {
  const rootRef = useRef(null);
  const lineRef = useRef(null);
  const tagRef = useRef(null);
  const nameRef = useRef(null);
  const portraitRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(tagRef.current, { opacity: 0, y: 14, duration: 0.55 }, 0.05)
        .from(nameRef.current, { opacity: 0, y: 36, duration: 0.7 }, 0.12)
        .from(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left", duration: 0.9 },
          0.1,
        )
        .from(
          "[data-hb]",
          { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 },
          0.22,
        )
        .from(portraitRef.current, { opacity: 0, y: 28, duration: 0.65 }, 0.28);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        paddingTop: "clamp(80px,12vw,140px)",
      }}
    >
      {/* ── Particles bg ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Particles
          particleCount={100}
          particleSpread={8}
          speed={0.05}
          particleColors={["#39d401", "#5FD42A", "#82E84B"]}
          particleBaseSize={70}
          alphaParticles={true}
          sizeRandomness={1.2}
          disableRotation={false}
          moveParticlesOnHover={true}
          particleHoverFactor={0.25}
          pixelRatio={Math.min(
            typeof window !== "undefined" ? window.devicePixelRatio : 1,
            2,
          )}
        />
      </div>

      {/* ── Radial vignette ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 90% 80% at 50% 40%, transparent 20%, var(--bg) 100%)",
        }}
      />

      {/* ── Main content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            maxWidth: "1160px",
            margin: "0 auto",
            padding: "0 clamp(20px,5vw,60px)",
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ══ HERO LAYOUT — responsive via className + <style> ══ */}
          <div className="hero-layout">
            {/* ── TEXT BLOCK ── */}
            <div className="hero-text">
              {/* Availability tag */}
              <div
                ref={tagRef}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  border: "1px solid var(--border)",
                  background: "rgba(20,20,20,0.75)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  width: "fit-content",
                  marginBottom: "clamp(20px,4vw,32px)",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    display: "block",
                    flexShrink: 0,
                  }}
                />
                <span style={TXT.tag}>Open to collaborate </span>
              </div>

              {/* Name */}
              <div ref={nameRef} style={{ marginBottom: 0, lineHeight: 0.88 }}>
                <h1 className="t-hero" style={{ display: "inline" }}>
                  DINESH
                  <span
                    className="t-hero-outline"
                    style={{ display: "inline", marginLeft: "0.2em" }}
                  >
                    R
                  </span>
                </h1>
              </div>

              {/* Divider */}
              <div
                ref={lineRef}
                style={{
                  height: 1,
                  background: "var(--border)",
                  margin: "clamp(18px,3.5vw,36px) 0",
                }}
              />

              {/* Roles */}
              <div
                data-hb
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px,2vw,14px)",
                  flexWrap: "wrap",
                  marginBottom: "clamp(16px,3vw,24px)",
                }}
              >
                {ROLES.map((r, i) => (
                  <span
                    key={r}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(8px,2vw,14px)",
                    }}
                  >
                    <span style={TXT.role}>{r}</span>
                    {i < ROLES.length - 1 && (
                      <span
                        style={{
                          width: 3,
                          height: 3,
                          borderRadius: "50%",
                          background: "var(--accent)",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p
                data-hb
                style={{
                  ...TXT.bio,
                  maxWidth: 580,
                  marginBottom: "clamp(24px,4vw,36px)",
                }}
              >
                Driven by a passion for visual storytelling and refined
                execution, I transform ideas into polished experiences that
                connect with people, communicate clearly, and stand out with
                confidence.
              </p>

              {/* CTAs */}
              <div
                data-hb
                style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
              >
                <Link
                  to="/works"
                  style={{
                    ...TXT.btnSolid,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 26px",
                    background: "var(--accent)",
                    color: "#000",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  View Works
                </Link>
                <Link
                  to="/contact"
                  style={{
                    ...TXT.btnOut,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "11px 24px",
                    border: "1px solid var(--border-mid)",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-mid)";
                    e.currentTarget.style.color = "var(--text-muted)";
                  }}
                >
                  Let's Talk
                </Link>
              </div>
            </div>

            {/* ── PORTRAIT ── */}
            <div ref={portraitRef} className="hero-portrait-col">
              <div className="portrait-frame">
                {/* Placeholder — shown when image fails */}
                <div className="portrait-placeholder" aria-hidden="true">
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: 48,
                      color: "var(--text-dim)",
                      lineHeight: 1,
                    }}
                  >
                    DR
                  </span>
                </div>

                {/* ── REAL PHOTO — <img> tag, portrait crop ── */}
                <img
                  src="/images/Hero.jpeg"
                  alt="Dinesh R — Motion Graphics & Video Editor"
                  loading="eager"
                  decoding="async"
                  className="portrait-img"
                  onError={(e) => {
                    e.target.style.opacity = "0";
                  }}
                />

                {/* Bottom gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background:
                      "linear-gradient(to top, var(--bg) 0%, transparent 55%)",
                    zIndex: 1,
                  }}
                />

                {/* Available badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(11,11,11,0.88)",
                    border: "1px solid var(--border)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    padding: "5px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    whiteSpace: "nowrap",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#4ade80",
                      display: "block",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ ...TXT.badgeText, fontSize: 8 }}>
                    Available for projects
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* /hero-layout */}
        </div>
      </div>

      {/* ── Scroll indicator — hidden on mobile ── */}
      <div
        className="scroll-indicator"
        style={{
          position: "absolute",
          bottom: "clamp(28px,4vw,40px)",
          right: "clamp(20px,5vw,60px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 3,
        }}
      >
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
        <span style={TXT.scrollLbl}>scroll</span>
      </div>

      {/* ══ RESPONSIVE STYLES ══ */}
      <style>{`

        /* ─────────────────────────────────────────
           MOBILE FIRST — single column, portrait
           aspect ratio for the photo
        ───────────────────────────────────────── */

        .hero-layout {
          display: flex;
          flex-direction: column;
          gap: clamp(40px, 8vw, 56px);
          padding-bottom: clamp(60px, 10vw, 80px);
          flex: 1;
          justify-content: center;
        }

        .hero-text {
          flex: 1;
          min-width: 0;
        }

        /* Portrait column fills full width on mobile */
        .hero-portrait-col {
          width: 100%;
        }

        /* Frame: portrait aspect 3/4 on mobile */
        .portrait-frame {
          position: relative;
          width: 100%;
          /* 4:5 portrait ratio on small screens */
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
        }

        /* Actual image fills the frame, portrait crop */
        .portrait-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 20% center;
          display: block;
          z-index: 1;
          transition: opacity 0.3s ease;
        }

        /* Placeholder centred inside frame */
        .portrait-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          z-index: 0;
        }

        /* ─────────────────────────────────────────
           SMALL-MID (480px+): slightly narrower portrait
           centred, still stacked layout
        ───────────────────────────────────────── */
        @media (min-width: 480px) {
          .hero-portrait-col {
            display: flex;
            justify-content: center;
          }
          .portrait-frame {
            /* Max width on small screens — keeps portrait ratio */
            width: min(280px, 70vw);
            aspect-ratio: 3 / 4;
          }
        }

        /* ─────────────────────────────────────────
           TABLET (640px+): side-by-side begins
        ───────────────────────────────────────── */
        @media (min-width: 640px) {
          .hero-layout {
            flex-direction: row;
            align-items: flex-end;
            gap: clamp(32px, 5vw, 80px);
          }

          .hero-portrait-col {
            /* Don't grow — fixed portrait column */
            flex-shrink: 0;
            width: auto;
            display: block;
          }

          .portrait-frame {
            width: clamp(180px, 22vw, 260px);
            aspect-ratio: 3 / 4;
          }
        }

        /* ─────────────────────────────────────────
           DESKTOP (1024px+): larger portrait
        ───────────────────────────────────────── */
        @media (min-width: 1024px) {
          .portrait-frame {
            width: clamp(240px, 22vw, 300px);
            aspect-ratio: 3 / 4;
          }
        }

        /* ─────────────────────────────────────────
           LARGE (1280px+)
        ───────────────────────────────────────── */
        @media (min-width: 1280px) {
          .portrait-frame {
            width: clamp(280px, 20vw, 340px);
            aspect-ratio: 3 / 4;
          }
        }

        /* ─────────────────────────────────────────
           Hide scroll indicator on small screens
        ───────────────────────────────────────── */
        @media (max-width: 639px) {
          .scroll-indicator { display: none !important; }
        }

      `}</style>
    </section>
  );
}
