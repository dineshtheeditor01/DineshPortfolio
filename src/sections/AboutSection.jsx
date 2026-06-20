import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FS, STYLE, HEADING } from "../theme";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const EXPERIENCE = [
  {
    year: "2024 - Present",
    role: "Video Editor",
    company: "KlickEdu × Thulir Media",
    desc: "Expertise in end-to-end post-production, including video editing, motion graphics, animation, sound design, color correction & color grading. Delivered a wide range of creative projects from social media tranding transitions & effects reels and brand campaigns to documentaries, product films, wedding videos, and long-form storytelling content.",
  },
  {
    year: "2024 - 2025",
    role: "Motion Graphics Designer | Video Editor | Graphic Designer",
    company: "Chandran Steels",
    desc: "1 year of experience creating reels, motion graphics, animations, storytelling content, advertisement videos, product creatives, and promotional posters.",
  },
  {
    year: "2023 - 2024",
    role: "Video Editor | Graphic Designer ",
    company: "Freelancer",
    desc: "Started my creative journey by working on freelance projects, gaining practical experience in video editing, social media content, promotional designs.",
  },
];

const STATS = [
  { value: "3+", label: "Years \nExpriences" },
  { value: "ADV", label: "VFX\nCertified" },
  { value: "100%", label: "Happy \nClients " },
];

/* ═══════════════════════════════════════════════════
   STYLES — single source, change here = updates all
═══════════════════════════════════════════════════ */
const S = {
  section: {
    padding: "clamp(72px,12vw,140px) 0",
    borderTop: "1px solid var(--border)",
  },
  wrap: {
    maxWidth: "1160px",
    margin: "0 auto",
    padding: "0 clamp(20px,5vw,60px)",
  },

  /* ── Section label row ── */
  topLabel: {
    ...STYLE.labelRow,
    marginBottom: "clamp(36px,6vw,64px)",
  },
  dot: { ...STYLE.dot },
  labelTag: { ...STYLE.labelAccent, letterSpacing: "0.16em" },
  labelDivider: { ...STYLE.labelDivider },
  labelNum: { ...STYLE.labelDim },

  /* ── Two-column grid ── */
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "clamp(40px,8vw,96px)",
    alignItems: "start",
  },

  /* ── LEFT: heading + bio ── */

  /* heading — uses HEADING tokens from theme.js */
  headClip: { ...HEADING.clip },
  headLine1: { ...HEADING.solid },
  headLine2: { ...HEADING.outline },
  dividerLine: { ...HEADING.divider },

  bio: {
    ...STYLE.body,
    lineHeight: 1.8,
    maxWidth: 480,
    marginBottom: "clamp(20px,3vw,28px)",
  },

  /* ── Stats row ── */
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 1,
    background: "var(--border)",
    border: "1px solid var(--border)",
    marginTop: "clamp(32px,5vw,52px)",
  },
  statCell: {
    background: "var(--bg)",
    padding: "clamp(20px,3vw,32px) clamp(14px,2vw,22px)",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    position: "relative",
    overflow: "hidden",
    cursor: "default",
    transition: "background 0.35s ease",
  },
  statValue: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(30px,5vw,40px)",
    lineHeight: 1,
    color: "var(--text)",
    letterSpacing: "0.02em",
    display: "inline-block",
    transition: "color 0.3s, text-shadow 0.3s",
  },
  statLabel: {
    ...STYLE.labelDim,
    lineHeight: 1.5,
    whiteSpace: "pre-line",
    transition: "color 0.3s",
  },

  /* ── RIGHT: experience ── */
  expHeader: {
    ...STYLE.labelMuted,
    letterSpacing: "0.16em",
    marginBottom: "clamp(20px,3vw,32px)",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  expHeaderLine: {
    flex: 1,
    height: 1,
    background: "var(--border)",
  },

  expItem: {
    padding: "clamp(20px,3vw,32px) 0",
    borderBottom: "1px solid var(--border)",
    display: "grid",
    gridTemplateColumns: "72px 1fr",
    gap: "clamp(12px,2vw,24px)",
    alignItems: "start",
  },
  expYear: {
    ...STYLE.labelAccent,
    fontSize: FS.labelSm,
    paddingTop: 4,
    lineHeight: 1.5,
  },
  expRole: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(17px,2vw,22px)",
    letterSpacing: "0.04em",
    lineHeight: 1.1,
    color: "var(--text)",
    marginBottom: 5,
  },
  expCompany: {
    ...STYLE.bodySm,
    fontWeight: 400,
    color: "var(--accent)",
    marginBottom: 6,
    letterSpacing: "0.02em",
  },
  expDesc: {
    ...STYLE.bodySm,
    lineHeight: 1.65,
  },
};

export default function AboutSection() {
  const rootRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const eduRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Heading slide-up ── */
      gsap.set([h1Ref.current, h2Ref.current], { yPercent: 110 });
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(h1Ref.current, {
            yPercent: 0,
            duration: 0.7,
            ease: "expo.out",
          });
          gsap.to(h2Ref.current, {
            yPercent: 0,
            duration: 0.7,
            ease: "expo.out",
            delay: 0.08,
          });
        },
      });

      /* ── Left col fade + rise ── */
      gsap.set("[data-al]", { opacity: 0, y: 22 });
      ScrollTrigger.create({
        trigger: leftRef.current,
        start: "top 78%",
        once: true,
        onEnter: () =>
          gsap.to("[data-al]", {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "expo.out",
          }),
      });

      /* ── Right col — staggered per row ── */
      gsap.set("[data-ar]", { opacity: 0, x: 20 });
      ScrollTrigger.create({
        trigger: rightRef.current,
        start: "top 78%",
        once: true,
        onEnter: () =>
          gsap.to("[data-ar]", {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "expo.out",
          }),
      });

      /* ── Education — header fade + cards stagger ── */
      gsap.set("[data-edu]", { opacity: 0, y: 22, scale: 0.97 });
      ScrollTrigger.create({
        trigger: eduRef.current,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to("[data-edu]", {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "expo.out",
          }),
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} style={S.section}>
      <div style={S.wrap}>
        {/* ── Section label ── */}
        <div data-al style={S.topLabel}>
          <span style={S.dot} />
          <span style={S.labelTag}>Biography</span>
          <span style={S.labelDivider} />
          <span style={S.labelNum}>Section / 03</span>
        </div>

        {/* ── Two-col grid ── */}
        <div style={S.grid} className="about-grid">
          {/* ════ LEFT ════ */}
          <div ref={leftRef}>
            {/* Heading */}
            <div style={S.headClip}>
              <span ref={h1Ref} style={S.headLine1}>
                CRAFTING
              </span>
            </div>
            <div style={S.headClip}>
              <span ref={h2Ref} style={S.headLine2}>
                STORIES
              </span>
            </div>

            <div style={S.dividerLine} data-al />

            {/* Bio */}
            <p data-al style={S.bio}>
              First impressions happen in seconds.The right visuals make them
              count. Creating memorable experiences through thoughtful design,
              compelling storytelling, and a commitment to quality in every
              detail.
            </p>
            <p data-al style={{ ...S.bio, marginBottom: 0 }}>
              In a world full of noise, standing out requires more than just
              beautiful visuals. It takes thoughtful execution, strong
              storytelling, and an eye for the details that make people stop and
              pay attention. That's the standard behind every project.
            </p>

            {/* Stats */}
            <div data-al style={S.statsRow}>
              {STATS.map(({ value, label }) => (
                <div key={label} className="stat-cell" style={S.statCell}>
                  {/* Scan line sweep (CSS-driven) */}
                  <div className="stat-scan" aria-hidden="true" />
                  <span
                    className="stat-value"
                    style={{ ...S.statValue, textAlign: "center" }}
                  >
                    {value}
                  </span>
                  <span
                    className="stat-label"
                    style={{ ...S.statLabel, textAlign: "center" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT — Experience ════ */}
          <div ref={rightRef}>
            <div data-ar style={S.expHeader}>
              <span>Experience</span>
              <span style={S.expHeaderLine} />
            </div>

            {EXPERIENCE.map((item, i) => (
              <div
                key={i}
                data-ar
                style={{
                  ...S.expItem,
                  borderBottom:
                    i < EXPERIENCE.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                <span style={S.expYear}>{item.year}</span>
                <div>
                  <div style={S.expRole}>{item.role}</div>
                  <div style={S.expCompany}>{item.company}</div>
                  <div style={S.expDesc}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════ EDUCATION — full-width below grid ════ */}
        <div
          ref={eduRef}
          style={{
            marginTop: "clamp(48px,8vw,80px)",
            paddingTop: "clamp(32px,5vw,52px)",
          }}
        >
          {/* Header */}
          <div
            data-edu
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: "clamp(24px,4vw,40px)",
            }}
          >
            <span style={{ ...STYLE.labelMuted, letterSpacing: "0.18em" }}>
              Education
            </span>
            <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          {/* Cards grid */}
          <div className="edu-grid">
            {[
              {
                year: "2022 – 23",
                degree: "Pursued ADV VFX Course",
                institution: "from Adoro Multimedia",
                location: "Coimbatore, TN",
              },
              {
                year: "2019 - 2021",
                degree: "Diploma in EEE",
                institution: "Suguna Polytechnic College",
                location: "Coimbatore, TN",
              },
            ].map((e, i) => (
              <div key={i} data-edu className="edu-card">
                {/* Year badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "clamp(16px,2.5vw,22px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--fs-label-sm)",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                    }}
                  >
                    {e.year}
                  </span>
                </div>

                {/* Degree */}
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(17px,2.2vw,22px)",
                    letterSpacing: "0.03em",
                    lineHeight: 1.15,
                    color: "var(--text)",
                    marginBottom: 10,
                  }}
                >
                  {e.degree}
                </div>

                {/* Institution */}
                <div
                  style={{
                    ...STYLE.bodySm,
                    color: "var(--text-muted)",
                    marginBottom: 4,
                  }}
                >
                  {e.institution}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-dim)",
                  }}
                >
                  {e.location}
                </div>

                {/* Bottom accent bar */}
                <div className="edu-bar" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ── Responsive ── */
        @media (max-width: 680px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(40px,8vw,56px) !important;
          }
        }

        /* ── Stat cell hover effects ── */

        /* Top accent bar slides in from left */
        .stat-cell::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        /* Corner glow dot */
        .stat-cell::after {
          content: '';
          position: absolute;
          top: 12px; right: 12px;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0;
          box-shadow: 0 0 0 rgba(57,212,1,0);
          transition: opacity 0.3s, box-shadow 0.3s;
        }

        .stat-cell:hover { background: rgba(57,212,1,0.03) !important; }
        .stat-cell:hover::before { transform: scaleX(1); }
       

        /* Number: glow + glitch on hover */
        .stat-cell:hover .stat-value {
          color: var(--accent) !important;
          text-shadow: 0 0 24px rgba(57,212,1,0.45), 0 0 48px rgba(57,212,1,0.18);
          animation: stat-glitch 0.5s ease-out;
        }
        .stat-cell:hover .stat-label {
          color: var(--text-muted) !important;
        }

        @keyframes stat-glitch {
          0%   { transform: none; filter: none; }
          18%  { transform: skewX(-5deg) translateX(4px); filter: blur(0.3px); }
          36%  { transform: skewX(4deg) translateX(-3px); }
          54%  { transform: none; }
          72%  { transform: skewX(-2deg) translateX(2px); }
          100% { transform: none; filter: none; }
        }

        /* Scan line that sweeps on hover */
        .stat-scan {
          position: absolute;
          left: 0; right: 0;
          height: 60%;
          top: -60%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(57,212,1,0.05) 40%,
            rgba(57,212,1,0.1) 50%,
            rgba(57,212,1,0.05) 60%,
            transparent 100%
          );
          pointer-events: none;
          transition: top 0s;
        }
        .stat-cell:hover .stat-scan {
          animation: stat-sweep 0.55s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes stat-sweep {
          from { top: -60%; }
          to   { top: 100%; }
        }

        /* Mobile: smaller stat cells */
        @media (max-width: 400px) {
          .stat-cell { padding: 16px 10px !important; }
        }

        /* ── Education card grid ── */
        .edu-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(14px, 2.5vw, 24px);
        }
        @media (max-width: 560px) {
          .edu-grid { grid-template-columns: 1fr !important; }
        }

        /* Card */
        .edu-card {
          position: relative;
          padding: clamp(20px, 3vw, 32px) clamp(20px, 3vw, 32px) clamp(24px, 3.5vw, 36px);
          border: 1px solid var(--border);
          border-left: 2px solid var(--border);
          background: var(--surface);
          transition: border-color 0.3s, border-left-color 0.3s, background 0.3s;
          overflow: hidden;
        }
        .edu-card:hover {
          border-color: rgba(57,212,1,0.25);
          border-left-color: var(--accent);
          background: rgba(57,212,1,0.025);
        }

        /* Bottom accent bar that expands on hover */
        .edu-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 1px;
          width: 0%;
          background: var(--accent);
          transition: width 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .edu-card:hover .edu-bar { width: 100%; }
      `}</style>
    </section>
  );
}
