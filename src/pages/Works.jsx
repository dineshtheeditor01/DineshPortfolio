import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FS, STYLE, HEADING } from "../theme";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   DATA
   orientation : "portrait" | "landscape"  — controls detail layout
   type        : "graphic"                  — enables image-grid layout
   images      : [{src, alt}]               — for graphic type only
═══════════════════════════════════════════════════════════════ */
const CATEGORIES = [
  {
    id: "01",
    slug: "motion-graphics-reels",
    title: "Motion Graphics Reels",
    tag: "Motion · Reels",
    count: "12+ videos",
    orientation: "portrait",
    desc: "High-energy social media reels with kinetic typography, animated transitions, and motion-driven storytelling built for Instagram and YouTube Shorts.",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    videoSrc: "/videos/works/Reel 01.mp4",
    driveUrl:
      "https://drive.google.com/drive/folders/1PFlVdMjvaQBFzl74pT0N6fp11gWGsiiX?usp=sharing",
  },
  {
    id: "02",
    slug: "animation-motion-graphics",
    title: "Animation & Motion Graphics",
    tag: "Animation",
    count: "8+ videos",
    orientation: "landscape",
    desc: "Full motion design — logo animations, explainer videos, title sequences, and kinetic art with sound-sync and frame-perfect timing.",
    tools: ["After Effects", "Cinema 4D", "Illustrator"],
    videoSrc: "/videos/works/3D Animation 02 - Personal Branding Video.mp4",
    driveUrl:
      "https://drive.google.com/drive/folders/1SeUMF2NmSWGwxKUR4XnzMPK5PPZl4vPH?usp=sharing",
  },
  {
    id: "03",
    slug: "documentary",
    title: "Documentary Editing",
    tag: "Documentary",
    count: "5+ projects",
    orientation: "landscape",
    desc: "Long-form documentary edits with narrative structure, interview pacing, B-roll weaving, and cinematic color grades that hold viewer attention.",
    tools: ["Premiere Pro", "DaVinci Resolve", "Audition"],
    videoSrc: "/videos/works/Periyar Documentary.mp4",
    driveUrl:
      "https://drive.google.com/drive/folders/1mApgLumoFHshmIvSmTTjtD6tjmAYlfhZ?usp=sharing",
  },
  {
    id: "04",
    slug: "commercial-ad-reels",
    title: "Commercial Ad Reels",
    tag: "Ads · Commercial",
    count: "20+ ads",
    orientation: "portrait",
    desc: "Performance-driven ad edits for Meta, YouTube, and broadcast — fast cuts, product highlights, call-to-action hooks, and color-graded for conversions.",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    videoSrc: "/videos/works/Ramraj Ad Video.mp4",
    driveUrl:
      "https://drive.google.com/drive/folders/1GeUPpkDNo-tdfqYgSjqMgxyTX6Ck2hb0?usp=sharing",
  },
  {
    id: "05",
    slug: "transitions-effects",
    title: "Transitions & Effects",
    tag: "VFX · Transitions",
    count: "15+ clips",
    orientation: "portrait",
    desc: "Custom transition packs, seamless cuts, whip pans, morphing effects, and VFX compositing — showcasing technical precision and visual rhythm.",
    tools: ["After Effects", "Premiere Pro", "DaVinci Resolve"],
    videoSrc: "/videos/works/Transition Edit 01.mp4",
    driveUrl:
      "https://drive.google.com/drive/folders/18cMH2fja5Rh8YJuMgdfKtwEMj00muSUY?usp=sharing",
  },
  {
    id: "06",
    slug: "car-video-edits",
    title: "Car Video Edits",
    tag: "Automotive",
    count: "6+ videos",
    orientation: "portrait",
    desc: "Cinematic automotive content — exterior walkarounds, driving shots with dynamic grading, revving sound-sync, and high-contrast moody color grades.",
    tools: ["DaVinci Resolve", "Premiere Pro", "After Effects"],
    videoSrc: "/videos/works/Altroz Car Edit - 01.mp4",
    driveUrl:
      "https://drive.google.com/drive/folders/1F1LTgBX3rNPnsLD8GRJ1NuLY4vnutQeK?usp=sharing",
  },
  {
    id: "07",
    slug: "cinematic-model-edits",
    title: "Cinematic Model Edits",
    tag: "Cinematic · Fashion",
    count: "10+ edits",
    orientation: "portrait",
    desc: "Fashion and lifestyle visual storytelling — slow-motion grades, dramatic lighting edits, music-synced cuts, and editorial motion for model portfolios.",
    tools: ["DaVinci Resolve", "Premiere Pro", "After Effects"],
    videoSrc: "/videos/works/Model Edit - 01.mp4",
    driveUrl:
      "https://drive.google.com/drive/folders/108w9kzT85LvkZxGDo2Wn_ixtifRWToGz?usp=sharing",
  },
  {
    id: "08",
    slug: "long-form-edits",
    title: "Long Form Edits",
    tag: "Long Form",
    count: "8+ projects",
    orientation: "landscape",
    desc: "Full-length productions — YouTube videos, event recaps, brand films, and corporate content structured for engagement, retention, and clear communication.",
    tools: ["Premiere Pro", "After Effects", "Audition"],
    videoSrc:
      "/videos/works/Video 01 -Tajik Intake Student Journey Edit (1).mp4",
    driveUrl:
      "https://drive.google.com/drive/folders/1UFqXHLWO3TV8-DtrCBazII32sCuiJfbX?usp=sharing",
  },
  {
    id: "09",
    slug: "student-testimonials",
    title: "Student Testimonials",
    tag: "Testimonials",
    count: "25+ stories",
    orientation: "portrait",
    desc: "Authentic student story edits for education brands — clean interview cuts, subtle motion graphics, lower thirds, and warm grades that build trust.",
    tools: ["Premiere Pro", "After Effects", "Canva"],
    videoSrc: "/videos/works/03.mp4",
    driveUrl:
      "https://drive.google.com/drive/folders/1i2xzXglGT46KzOIoAZyX7cSWVvCS4Aha?usp=sharing",
  },
  {
    id: "10",
    slug: "ai-video-editing",
    title: "AI Video Editing",
    tag: "AI · Tech",
    count: "5+ projects",
    orientation: "landscape",
    desc: "Next-gen content using AI tools — synthetic voice-overs, AI avatars, generated visuals combined with motion design for scalable brand content.",
    tools: ["Runway", "HeyGen", "Synthesia", "ElevenLabs"],
    videoSrc: "/videos/works/Ai Video 01-Spiderman.mp4",
    driveUrl:
      "https://drive.google.com/drive/folders/1-vy8486Zkb1-IDOyjL5lHrGUxFwdhwbq?usp=sharing",
  },
  {
    id: "11",
    slug: "graphic-designing",
    title: "Graphic Designing",
    tag: "Design · Visual",
    count: "30+ designs",
    type: "graphic" /* ← unique layout */,
    desc: "Brand identities, social media creatives, poster design, product visuals, and print-ready assets — clean design that communicates and converts.",
    tools: ["Photoshop", "Illustrator", "Canva"],
    driveUrl:
      "https://drive.google.com/drive/folders/1tpfLQ-4XCdOlPfXnMiO7f10O8jKHGGQa?usp=sharing",
    images: [
      { src: "/images/works/poster (1).webp", alt: "Brand Identity" },
      { src: "/images/works/poster (2).webp", alt: "Social Media Design" },
      { src: "/images/works/poster (3).webp", alt: "Poster Design" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   SVG ICONS
═══════════════════════════════════════════════════════════════ */
const IconPlay = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const IconPause = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);
const IconMute = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);
const IconUnmute = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);
const IconArrowUpRight = ({ size = 12 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 11L11 1M11 1H4M11 1v7" />
  </svg>
);
const IconArrowLeft = ({ size = 10 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 10 10"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 5H1M1 5l4-4M1 5l4 4" />
  </svg>
);
const IconDrive = () => (
  <svg width="14" height="14" viewBox="0 0 87.3 78" fill="currentColor">
    <path
      d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
      fill="#0066da"
    />
    <path
      d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
      fill="#00ac47"
    />
    <path
      d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
      fill="#ea4335"
    />
    <path
      d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
      fill="#00832d"
    />
    <path
      d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
      fill="#2684fc"
    />
    <path
      d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 27h27.45c0-1.55-.4-3.1-1.2-4.5z"
      fill="#ffba00"
    />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   SHARED TOKENS
═══════════════════════════════════════════════════════════════ */
const T = {
  page: { background: "var(--bg)", minHeight: "100vh" },
  wrap: { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" },
  divLine: { height: 1, background: "var(--border)" },

  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "var(--font-mono)",
    fontSize: FS.labelSm,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    background: "none",
    border: "1px solid var(--border)",
    cursor: "pointer",
    padding: "7px 16px",
    transition: "border-color 0.2s, color 0.2s",
  },
  idTag: { ...STYLE.labelAccent, letterSpacing: "0.14em" },
  title: { ...HEADING.solid, fontSize: "clamp(28px,5vw,58px)" },
  desc: { ...STYLE.bodySm, lineHeight: 1.8 },
  toolLabel: { ...STYLE.labelDim, display: "block", marginBottom: 10 },
  toolsRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  pill: { ...STYLE.pill, padding: "4px 12px" },
  countBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 14px",
    border: "1px solid var(--accent)",
    fontFamily: "var(--font-mono)",
    fontSize: FS.labelSm,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--accent)",
  },
  driveBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "clamp(12px,2vw,18px) clamp(16px,3vw,24px)",
    background: "var(--accent)",
    color: "#000",
    fontFamily: "var(--font-mono)",
    fontSize: FS.label,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    textDecoration: "none",
    transition: "opacity 0.2s",
  },
  navRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "clamp(8px,2vw,16px)",
    marginTop: "clamp(40px,7vw,72px)",
    paddingTop: "clamp(24px,4vw,40px)",
    borderTop: "1px solid var(--border)",
  },
  navCard: {
    padding: "clamp(12px,2vw,20px)",
    border: "1px solid var(--border)",
    background: "transparent",
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    textAlign: "left",
  },
  navLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: FS.monoXs,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--text-dim)",
  },
  navTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(14px,2vw,20px)",
    letterSpacing: "0.02em",
    color: "var(--text-muted)",
    transition: "color 0.2s",
  },
};

/* ═══════════════════════════════════════════════════════════════
   VIDEO PLAYER — autoplay, play/pause, mute controls
   Used in both portrait and landscape detail layouts
═══════════════════════════════════════════════════════════════ */
function VideoPlayer({ src, orientation }) {
  const vidRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  /* reset when src changes (navigating categories) */
  useEffect(() => {
    setLoaded(false);
    setPlaying(false);
    setMuted(true);
  }, [src]);

  const startPlayback = useCallback(() => {
    const v = vidRef.current;
    if (!v) return;
    if (!loaded) {
      v.src = src;
      v.muted = true;
      v.load();
      setLoaded(true);
    }
    v.play().then(() => setPlaying(true)).catch(() => {});
  }, [src, loaded]);

  const togglePlay = useCallback(() => {
    const v = vidRef.current;
    if (!v) return;
    if (!loaded) { startPlayback(); return; }
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [loaded, startPlayback]);

  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    const v = vidRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const aspectRatio = orientation === "portrait" ? "9/16" : "16/9";

  return (
    <div
      className="vid-wrap"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <video
        ref={vidRef}
        loop
        playsInline
        preload="none"
        onEnded={() => setPlaying(false)}
        onClick={togglePlay}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          cursor: "pointer",
        }}
      />

      {/* Bottom gradient for control readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* Big centered play button — shown before first play */}
      {!playing && (
        <div
          onClick={togglePlay}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.28)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconPlay />
          </div>
        </div>
      )}

      {/* Controls bar — visible once loaded */}
      {loaded && (
        <div
          className="vid-controls"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "clamp(10px,2vw,16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 4,
          }}
        >
          <button
            onClick={togglePlay}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              padding: "6px 14px",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: FS.monoXs,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          >
            {playing ? <IconPause /> : <IconPlay />}
            <span>{playing ? "Pause" : "Play"}</span>
          </button>

          <button
            onClick={toggleMute}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              color: muted ? "rgba(255,255,255,0.55)" : "#fff",
              padding: "6px 14px",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: FS.monoXs,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          >
            {muted ? <IconMute /> : <IconUnmute />}
            <span>{muted ? "Unmute" : "Mute"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INFO PANEL — shared between layouts
═══════════════════════════════════════════════════════════════ */
function InfoPanel({ cat }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(18px,2.5vw,28px)",
      }}
    >
      <div>
        <h1 style={T.title}>{cat.title}</h1>
      </div>
      <div>
        <span style={T.countBadge}>{cat.count}</span>
      </div>
      <div>
        <p
          style={{
            ...T.desc,
            fontSize: 13,
            color: "var(--text-muted)",
            marginBottom: 14,
          }}
        >
          Full project files organized on Google Drive — accessible below.
        </p>
        <a
          href={cat.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={T.driveBtn}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <IconDrive />
            View All Works — G Drive
          </span>
          <IconArrowUpRight size={14} />
        </a>
      </div>
      <div style={T.divLine} />
      <p style={T.desc}>{cat.desc}</p>
      <div style={T.divLine} />
      <div>
        <span style={T.toolLabel}>Tools Used</span>
        <div style={T.toolsRow}>
          {cat.tools.map((t) => (
            <span key={t} style={T.pill}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PORTRAIT LAYOUT — video left (9:16), info right
═══════════════════════════════════════════════════════════════ */
function PortraitLayout({ cat }) {
  return (
    <div
      className="portrait-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "clamp(200px,38%,360px) 1fr",
        gap: "clamp(28px,5vw,64px)",
        alignItems: "start",
      }}
    >
      <VideoPlayer
        key={cat.id}
        src={cat.videoSrc}
        orientation="portrait"
        catId={cat.id}
      />
      <InfoPanel cat={cat} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LANDSCAPE LAYOUT — video full-width top, info row below
═══════════════════════════════════════════════════════════════ */
function LandscapeLayout({ cat }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(28px,5vw,52px)",
      }}
    >
      {/* Full-width video */}
      <VideoPlayer
        key={cat.id}
        src={cat.videoSrc}
        orientation="landscape"
        catId={cat.id}
      />

      {/* Info below: 2-column */}
      <div
        className="landscape-info"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(28px,5vw,64px)",
          alignItems: "start",
        }}
      >
        {/* Left col: title + count + drive */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(16px,2.5vw,24px)",
          }}
        >
          <h1 style={T.title}>{cat.title}</h1>
          <span style={T.countBadge}>{cat.count}</span>
          <div>
            <p
              style={{
                ...T.desc,
                fontSize: 13,
                color: "var(--text-muted)",
                marginBottom: 14,
              }}
            >
              Full project files organized on Google Drive.
            </p>
            <a
              href={cat.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={T.driveBtn}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconDrive />
                View All Works — G Drive
              </span>
              <IconArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Right col: desc + tools */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(16px,2.5vw,24px)",
          }}
        >
          <p style={T.desc}>{cat.desc}</p>
          <div style={T.divLine} />
          <div>
            <span style={T.toolLabel}>Tools Used</span>
            <div style={T.toolsRow}>
              {cat.tools.map((t) => (
                <span key={t} style={T.pill}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GRAPHIC DESIGN LAYOUT — no video, image bento grid
   Update images[] in CATEGORIES data with your real image paths
═══════════════════════════════════════════════════════════════ */
function GraphicLayout({ cat }) {
  const imgs = cat.images || [];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(28px,5vw,52px)",
      }}
    >
      {/* Header row: title + count + drive */}
      <div
        className="graphic-header"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "clamp(20px,4vw,48px)",
          alignItems: "end",
        }}
      >
        <div>
          <h1 style={{ ...T.title, marginBottom: "clamp(10px,1.5vw,16px)" }}>
            {cat.title}
          </h1>
          <span style={T.countBadge}>{cat.count}</span>
        </div>
        <a
          href={cat.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...T.driveBtn, alignSelf: "flex-end", whiteSpace: "nowrap" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <IconDrive />
            View All — G Drive
          </span>
          <IconArrowUpRight size={14} />
        </a>
      </div>

      <div style={T.divLine} />

      {/* Bento image grid:  [IMG1 tall]  [IMG2 + IMG3 stacked] */}
      {imgs.length > 0 && (
        <div
          className="graphic-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gridTemplateRows: "auto auto",
            gap: "clamp(10px,1.5vw,16px)",
          }}
        >
          {/* Big image — spans 2 rows */}
          <GraphicCard img={imgs[0]} span={2} />
          {/* Two stacked images */}
          {imgs[1] && <GraphicCard img={imgs[1]} />}
          {imgs[2] && <GraphicCard img={imgs[2]} />}
        </div>
      )}

      <div style={T.divLine} />

      {/* Description + tools */}
      <div
        className="graphic-info"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(24px,4vw,56px)",
          alignItems: "start",
        }}
      >
        <p style={T.desc}>{cat.desc}</p>
        <div>
          <span style={T.toolLabel}>Tools Used</span>
          <div style={T.toolsRow}>
            {cat.tools.map((t) => (
              <span key={t} style={T.pill}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GraphicCard({ img, span = 1 }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  /* accent gradient colors per card for placeholder */
  const gradients = [
    "linear-gradient(135deg, #1a1a1a 0%, #0f2a1a 100%)",
    "linear-gradient(135deg, #1a1a1a 0%, #0a1f2e 100%)",
    "linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 100%)",
  ];
  const gi = ["Brand Identity", "Social Media", "Poster"].indexOf(img.alt);
  const grad = gradients[gi >= 0 ? gi : 0];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridRow: span === 2 ? "span 2" : "span 1",
        position: "relative",
        overflow: "hidden",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        cursor: "pointer",
        transition: "border-color 0.25s",
        aspectRatio: span === 2 ? "3/4" : "4/3",
        background: grad,
      }}
    >
      {!imgErr ? (
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          onError={() => setImgErr(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      ) : (
        /* Styled placeholder shown when image file doesn't exist yet */
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: 24,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: "1px solid var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
            }}
          >
            <IconArrowUpRight size={16} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: FS.monoXs,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textAlign: "center",
            }}
          >
            {img.alt}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.1em",
              color: "var(--text-dim)",
              textAlign: "center",
              wordBreak: "break-all",
            }}
          >
            {img.src}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "clamp(12px,2vw,20px)",
            left: "clamp(12px,2vw,20px)",
            right: "clamp(12px,2vw,20px)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: FS.monoXs,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            {img.alt}
          </span>
        </div>
      </div>

      {/* Corner accent dot */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: hovered ? "var(--accent)" : "rgba(255,255,255,0.2)",
          transition: "background 0.25s",
          boxShadow: hovered ? "0 0 8px var(--accent)" : "none",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROW THUMBNAIL — uses video first frame as preview
═══════════════════════════════════════════════════════════════ */
function RowThumb({ cat, hovered }) {
  const isGraphic = cat.type === "graphic";
  const vidRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isGraphic || !vidRef.current || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && vidRef.current && !vidRef.current.src) {
          vidRef.current.src = cat.videoSrc;
          vidRef.current.load();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [cat.videoSrc, isGraphic]);

  return (
    <div
      ref={containerRef}
      style={{
        width: 80,
        aspectRatio: "16/11",
        borderRadius: 4,
        overflow: "hidden",
        background: "var(--surface)",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        flexShrink: 0,
        position: "relative",
        transition: "border-color 0.25s",
      }}
    >
      {isGraphic ? (
        /* Graphic placeholder thumbnail */
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #111 0%, #0f2a1a 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {cat.images?.[0] && (
            <img
              src={cat.images[0].src}
              alt=""
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          <span
            style={{
              position: "absolute",
              fontFamily: "var(--font-mono)",
              fontSize: "8px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              textAlign: "center",
            }}
          >
            Design
          </span>
        </div>
      ) : (
        /* Video — src set lazily by IntersectionObserver, no preload until visible */
        <video
          ref={vidRef}
          preload="none"
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}

      {/* Play icon on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#000">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIST ROW
═══════════════════════════════════════════════════════════════ */
function CategoryRow({ cat, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-row
      onClick={() => onClick(cat)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "48px 80px 1fr auto",
        gap: "clamp(12px,2.5vw,28px)",
        alignItems: "center",
        padding: "clamp(12px,2vw,20px) 0",
        borderBottom: "1px solid var(--border)",
        cursor: "pointer",
        background: hovered ? "rgba(255,255,255,0.015)" : "transparent",
        transition: "background 0.2s",
      }}
    >
      {/* Number */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(18px,2.5vw,24px)",
          lineHeight: 1,
          color: hovered ? "var(--accent)" : "var(--text-dim)",
          transition: "color 0.2s",
          userSelect: "none",
        }}
      >
        {cat.id}
      </span>

      {/* Thumbnail */}
      <RowThumb cat={cat} hovered={hovered} />

      {/* Text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: FS.monoXs,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: hovered ? "var(--accent)" : "var(--text-dim)",
            transition: "color 0.2s",
          }}
        >
          {cat.tag}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(14px,2vw,22px)",
            letterSpacing: "0.02em",
            lineHeight: 1.1,
            color: hovered ? "var(--text)" : "var(--text-muted)",
            transition: "color 0.2s",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {cat.title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: FS.monoXs,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
          }}
        >
          {cat.count}
        </span>
      </div>

      {/* Arrow */}
      <div
        style={{
          width: 34,
          height: 34,
          border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: hovered ? "var(--accent)" : "transparent",
          color: hovered ? "#000" : "var(--text-dim)",
          transition: "border-color 0.25s, background 0.25s, color 0.25s",
        }}
      >
        <IconArrowUpRight size={12} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DETAIL VIEW
═══════════════════════════════════════════════════════════════ */
function DetailView({ cat, allCats, onClose, onNavigate }) {
  const panelRef = useRef(null);
  const currentIdx = allCats.findIndex((c) => c.id === cat.id);
  const prevCat = currentIdx > 0 ? allCats[currentIdx - 1] : null;
  const nextCat =
    currentIdx < allCats.length - 1 ? allCats[currentIdx + 1] : null;

  /* slide in */
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
    );
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cat.id]);

  /* Escape key */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const handleNav = (target) => {
    gsap.to(panelRef.current, {
      opacity: 0,
      y: -16,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => onNavigate(target),
    });
  };

  return (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 700,
        background: "var(--bg)",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 clamp(20px,5vw,60px)",
          paddingTop: "clamp(80px,12vw,140px)",
          paddingBottom: "clamp(60px,10vw,120px)",
        }}
      >
        {/* Back bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "clamp(28px,5vw,52px)",
            paddingBottom: "clamp(16px,2.5vw,24px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <button
            onClick={onClose}
            style={T.backBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <IconArrowLeft size={10} /> All Works
          </button>
          <span style={T.idTag}>
            {cat.tag} / {cat.id}
          </span>
        </div>

        {/* Dynamic layout based on type / orientation.
            key={cat.id} forces a full remount on every navigation so the
            video element is always fresh and plays the correct file.       */}
        {cat.type === "graphic" ? (
          <GraphicLayout key={cat.id} cat={cat} />
        ) : cat.orientation === "landscape" ? (
          <LandscapeLayout key={cat.id} cat={cat} />
        ) : (
          <PortraitLayout key={cat.id} cat={cat} />
        )}

        {/* Prev / Next nav */}
        <div className="detail-nav" style={T.navRow}>
          {prevCat ? (
            <button
              style={T.navCard}
              onClick={() => handleNav(prevCat)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.querySelector(".nt").style.color =
                  "var(--text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.querySelector(".nt").style.color =
                  "var(--text-muted)";
              }}
            >
              <span style={T.navLabel}>← Previous</span>
              <span className="nt" style={T.navTitle}>
                {prevCat.title}
              </span>
            </button>
          ) : (
            <div />
          )}

          {nextCat ? (
            <button
              style={{ ...T.navCard, textAlign: "right" }}
              onClick={() => handleNav(nextCat)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.querySelector(".nt").style.color =
                  "var(--text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.querySelector(".nt").style.color =
                  "var(--text-muted)";
              }}
            >
              <span style={T.navLabel}>Next →</span>
              <span className="nt" style={T.navTitle}>
                {nextCat.title}
              </span>
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function Works() {
  const rootRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-ph]", { opacity: 0, y: 20 });
      gsap.to("[data-ph]", {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.set("[data-row]", { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: "[data-rowlist]",
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to("[data-row]", {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.55,
            ease: "power3.out",
          }),
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleSelect = useCallback((cat) => {
    setSelected(cat);
    window.scrollTo(0, 0);
  }, []);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <div ref={rootRef} style={T.page}>
      <div style={T.wrap}>
        {/* List header */}
        <div
          style={{
            paddingTop: "clamp(80px,12vw,140px)",
            paddingBottom: "clamp(28px,4vw,48px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            data-ph
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: "clamp(14px,2.5vw,22px)",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--accent)",
                flexShrink: 0,
              }}
            />
            <span style={STYLE.labelAccent}>Portfolio</span>
            <span style={STYLE.labelDivider} />
            <span style={STYLE.labelDim}>11 Categories</span>
          </div>
          <div data-ph>
            <div style={HEADING.clip}>
              <span
                style={{
                  ...HEADING.solid,
                  fontSize: "var(--fs-section-heading)",
                }}
              >
                ALL
              </span>
            </div>
            <div style={HEADING.clip}>
              <span style={{ ...HEADING.outline }}>WORKS</span>
            </div>
          </div>
          <p
            data-ph
            style={{
              ...STYLE.bodySm,
              lineHeight: 1.7,
              maxWidth: 480,
              marginTop: "clamp(12px,2vw,20px)",
            }}
          >
            Browse by category. Click any row to view details and access full
            files on Google Drive.
          </p>
          <Link
            to="/"
            data-ph
            style={{
              ...STYLE.labelDim,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginTop: "clamp(12px,2vw,20px)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-dim)")
            }
          >
            <IconArrowLeft size={9} /> Back to Home
          </Link>
        </div>

        {/* Category list */}
        <div data-rowlist>
          {CATEGORIES.map((cat) => (
            <CategoryRow key={cat.id} cat={cat} onClick={handleSelect} />
          ))}
        </div>

        <div style={{ height: "clamp(40px,8vw,80px)" }} />
      </div>

      {selected && (
        <DetailView
          cat={selected}
          allCats={CATEGORIES}
          onClose={handleClose}
          onNavigate={handleSelect}
        />
      )}

      {/* ── Responsive overrides ── */}
      <style>{`
        /* List row: hide number on mobile */
        @media (max-width: 480px) {
          [data-row] {
            grid-template-columns: 72px 1fr auto !important;
            gap: 10px !important;
          }
          [data-row] > span:first-child { display: none !important; }
        }

        /* Portrait detail: stack on mobile */
        @media (max-width: 640px) {
          .portrait-grid {
            grid-template-columns: 1fr !important;
          }
          .portrait-grid > *:first-child {
            max-width: 360px;
            margin: 0 auto;
          }
        }

        /* Landscape detail: stack info cols on mobile */
        @media (max-width: 640px) {
          .landscape-info {
            grid-template-columns: 1fr !important;
          }
        }

        /* Graphic header: stack on mobile */
        @media (max-width: 560px) {
          .graphic-header {
            grid-template-columns: 1fr !important;
          }
          .graphic-grid {
            grid-template-columns: 1fr !important;
          }
          .graphic-info {
            grid-template-columns: 1fr !important;
          }
        }

        /* Prev/Next nav: stack on mobile */
        @media (max-width: 480px) {
          .detail-nav {
            grid-template-columns: 1fr !important;
          }
        }

        /* Video controls: always visible on touch */
        @media (hover: none) {
          .vid-controls { opacity: 1 !important; }
        }
      `}</style>
    </div>
  );
}
