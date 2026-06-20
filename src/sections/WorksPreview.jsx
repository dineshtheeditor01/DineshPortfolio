import { useRef, useEffect, useLayoutEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FS, STYLE, HEADING } from "../theme";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   STYLES — single source of truth
   Every text, spacing, color token lives here.
   Change once → updates the whole component.
═══════════════════════════════════════════════════════════ */
const S = {
  section: {
    position: "relative",
    background: "var(--bg)",
    paddingBottom: "clamp(40px,6vw,72px)",
  },

  /* ── Top label bar ── */
  labelBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "clamp(14px,2vw,24px) clamp(20px,5vw,60px)",
    borderBottom: "1px solid var(--border)",
    marginBottom: "clamp(28px,5vw,56px)",
  },
  labelLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "var(--accent)",
    flexShrink: 0,
  },
  labelTag: { ...STYLE.labelAccent, letterSpacing: "0.16em" },
  labelDivider: { ...STYLE.labelDivider },
  labelNum: { ...STYLE.labelDim },

  /* ── Heading ── */
  headingWrap: {
    padding: "0 clamp(20px,5vw,60px)",
    marginBottom: "clamp(28px,5vw,56px)",
    textAlign: "center",
  },
  headingClip: { ...HEADING.clip },
  line1: { ...HEADING.solid },
  line2: { ...HEADING.outline, paddingLeft: 0, marginTop: "0.05em" },

  /* ── Video block — width controlled by GSAP ── */
  videoBlock: {
    display: "flex",
    justifyContent: "center",
    transformOrigin: "center center",
  },
  videoInner: {
    position: "relative",
    overflow: "hidden",
    background: "var(--surface)",
    aspectRatio: "16 / 9",
    /* width set via ref, starts at 60% desktop / 92% mobile */
  },
  videoEl: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  /* Bottom gradient — 10% height, inside video */
  videoGrad: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "10%",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
    pointerEvents: "none",
    zIndex: 1,
  },

  /* ── Video controls row ── */
  controls: {
    position: "absolute",
    bottom: "clamp(10px,1.5vw,18px)",
    left: "clamp(10px,1.5vw,18px)",
    right: "clamp(10px,1.5vw,18px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 3,
    gap: 8,
  },
  controlsLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  /* Shared control button style */
  ctrlBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    background: "rgba(0,0,0,0.6)",
    border: "1px solid rgba(255,255,255,0.13)",
    color: "rgba(255,255,255,0.8)",
    fontFamily: "var(--font-mono)",
    fontSize: FS.labelSm,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "5px 12px",
    cursor: "pointer",
    lineHeight: 1,
    whiteSpace: "nowrap",
  },

  /* ── CTA below video ── */
  ctaRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: "clamp(20px,3vw,36px)",
    padding: "0 clamp(20px,5vw,60px)",
  },
  ctaLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "11px 32px",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    fontFamily: "var(--font-mono)",
    fontSize: FS.label,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    textDecoration: "none",
    transition: "border-color 0.2s, color 0.2s",
  },
};

/* PlayIcon / PauseIcon — tiny inline SVGs, no lib needed */
const PlayIcon = () => (
  <svg width="8" height="9" viewBox="0 0 8 9" fill="currentColor">
    <path d="M0 0.5l8 4-8 4V0.5z" />
  </svg>
);
const PauseIcon = () => (
  <svg width="8" height="9" viewBox="0 0 9 9" fill="currentColor">
    <rect x="0" y="0" width="3" height="9" />
    <rect x="5" y="0" width="3" height="9" />
  </svg>
);

export default function WorksPreview() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const videoWrapRef = useRef(null); /* the sizing div */
  const videoInnerRef = useRef(null);
  const videoElRef = useRef(null);

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);

  /* ── Play / Pause toggle ── */
  const togglePlay = useCallback(() => {
    const v = videoElRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  /* ── Mute toggle ── */
  const toggleMute = useCallback(
    (e) => {
      e.stopPropagation();
      const v = videoElRef.current;
      if (!v) return;
      v.muted = !muted;
      setMuted((m) => !m);
    },
    [muted],
  );

  /* ── GSAP ── */
  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 640;

    /* initial video width */
    const startW = isMobile ? "92%" : "60%";
    const endW = isMobile ? "100%" : "82%";

    if (videoWrapRef.current) {
      videoWrapRef.current.style.width = startW;
    }

    const ctx = gsap.context(() => {
      /* label fade */
      gsap.set(labelRef.current, { opacity: 0, y: 8 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 84%",
        once: true,
        onEnter: () =>
          gsap.to(labelRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }),
      });

      /* headings slide up */
      gsap.set([h1Ref.current, h2Ref.current], { yPercent: 110 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(h1Ref.current, { yPercent: 0, duration: 0.72, ease: "expo.out" });
          gsap.to(h2Ref.current, { yPercent: 0, duration: 0.72, ease: "expo.out", delay: 0.08 });
        },
      });

      /* video block reveal + autoplay */
      gsap.set(videoWrapRef.current, { opacity: 0, scale: 0.95 });
      ScrollTrigger.create({
        trigger: videoWrapRef.current,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(videoWrapRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "expo.out",
          });
          const v = videoElRef.current;
          if (v && !v.src) {
            setBuffering(true);
            v.src = "/videos/works/Video 04 - KlickEdu Take Off Edit.mp4";
            v.load();
            v.play().then(() => setPlaying(true)).catch(() => {});
          }
        },
      });

      /* scroll-driven WIDTH expansion — desktop only */
      if (!isMobile) {
        gsap.to(videoWrapRef.current, {
          width: endW,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 20%",
            scrub: 1.4,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={S.section}>
      {/* ── Label bar ── */}
      <div ref={labelRef} style={S.labelBar}>
        <div style={S.labelLeft}>
          <span style={S.dot} />
          <span style={S.labelTag}>Works · Showcase</span>
        </div>
      </div>

      {/* ── Heading ── */}
      <div style={S.headingWrap}>
        <div style={S.headingClip}>
          <span ref={h1Ref} style={S.line1}>
            STORIES THROUGH
          </span>
        </div>
        <div style={S.headingClip}>
          <span ref={h2Ref} style={S.line2}>
            EDITS &amp; SOUND
          </span>
        </div>
      </div>

      {/* ── Video ── */}
      {/*
        videoWrapRef: outer div whose WIDTH is animated by GSAP scrub
        videoInnerRef: holds aspect ratio + overflow:hidden
        videoElRef: the actual <video>, slightly over-scaled for parallax
      */}
      <div style={S.videoBlock}>
        <div ref={videoWrapRef} style={{ position: "relative" }}>
          <div ref={videoInnerRef} style={S.videoInner}>
            <video
              ref={videoElRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/reel-poster.jpg"
              style={S.videoEl}
              onPlay={() => { setPlaying(true); setBuffering(false); }}
              onPause={() => setPlaying(false)}
              onCanPlay={() => setBuffering(false)}
              onWaiting={() => setBuffering(true)}
            />

            {/* Buffering spinner */}
            {buffering && (
              <div style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center",
                zIndex: 2, pointerEvents: "none",
              }}>
                <div className="wp-spinner" />
              </div>
            )}

            {/* 10% bottom gradient */}
            <div style={S.videoGrad} />

            {/* ── Controls row ── */}
            <div style={S.controls}>
              <div style={S.controlsLeft}>
                {/* Play / Pause */}
                <button
                  onClick={togglePlay}
                  style={S.ctrlBtn}
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <PauseIcon /> : <PlayIcon />}
                </button>

                {/* Mute / Unmute */}
                <button
                  onClick={toggleMute}
                  style={S.ctrlBtn}
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? "⟩ Unmute" : "⟩ Mute"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── CTA below video ── */}
      <div style={S.ctaRow}>
        <Link
          to="/works"
          style={S.ctaLink}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          Browse Full Portfolio →
        </Link>
      </div>

      <style>{`
        @keyframes wp-spin { to { transform: rotate(360deg); } }
        .wp-spinner {
          width: 32px; height: 32px;
          border: 2px solid rgba(255,255,255,0.12);
          border-top-color: rgba(255,255,255,0.7);
          border-radius: 50%;
          animation: wp-spin 0.75s linear infinite;
        }
      `}</style>
    </section>
  );
}
