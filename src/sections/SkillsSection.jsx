import { useRef, useEffect, useLayoutEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FS, STYLE, HEADING } from "../theme";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = {
  tools: {
    label: "Tools",
    items: [
      {
        id: "ae",
        image: "/images/Ae.webp",
        name: "After Effects",
        color: "#9999FF",
        category: "Video & Motion",
        proficiency: 95,
        desc: "Primary tool for motion graphics, animations, kinetic typography, logo reveals, visual effects, social media creatives, and storytelling-driven content.",
        uses: [
          "Motion Graphics",
          "2D & 3D Animations",
          "Kinetic Typography",
          "Logo Animation",
          "Reels Editing",
          "Storytelling Videos",
        ],
      },
      {
        id: "pr",
        image: "/images/Pr.webp",
        name: "Premiere Pro",
        color: "#E8A0FF",
        category: "Video & Motion",
        proficiency: 95,
        desc: "Professional editing suite used for reels, documentaries, advertisements, product videos, wedding films, long-form content, and branded storytelling.",
        uses: [
          "Video Editing",
          "Reels Editing",
          "Documentaries",
          "Short films editing",
          "Ad Films",
          "Product Videos",
          "Wedding Films",
          "Long-form Content",
        ],
      },
      {
        id: "dv",
        image: "/images/Davinci resolve.webp",
        name: "DaVinci Resolve",
        color: "#6BA5D9",
        category: "Video & Motion",
        proficiency: 80,
        desc: "Advanced color grading and finishing tool used to enhance cinematic visuals, improve skin tones, and create consistent visual aesthetics.",
        uses: [
          "Color Grading",
          "Color Correction",
          "Skin Tones",
          "Look Development",
          "Finishing",
          "Film LUTs",
        ],
      },
      {
        id: "ps",
        image: "/images/Photoshop.webp",
        name: "Photoshop",
        color: "#4BC8FF",
        category: "Design & Visual",
        proficiency: 95,
        desc: "Creative design tool for posters, thumbnails, social media creatives, product promotions, photo manipulation, and marketing visuals.",
        uses: [
          "Poster Design",
          "Photo Manipulation",
          "Thumbnail Design",
          "Social Media Creatives",
          "Product Promotions",
          "Brand Assets",
        ],
      },
      {
        id: "ai",
        image: "/images/Ai.webp",
        name: "Illustrator",
        color: "#FF9A00",
        category: "Design & Visual",
        proficiency: 95,
        desc: "Vector design software used for logo creation, brand assets, illustrations, icons, and scalable marketing graphics.",
        uses: [
          "Logo Design",
          "Brand Assets",
          "Vector Graphics",
          "Icons",
          "Illustrations",
          "Marketing Graphics",
        ],
      },
      {
        id: "au",
        image: "/images/Au.webp",
        name: "Audition",
        color: "#00E0B8",
        category: "Audio Production",
        proficiency: 80,
        desc: "Audio editing and sound design software used for voice enhancement, SFX integration, audio cleanup, mixing, and final sound polish.",
        uses: [
          "Sound Design",
          "SFX",
          "Audio Mixing",
          "Voice Cleanup",
          "Noise Reduction",
          "Audio Enhancement",
        ],
      },
      {
        id: "me",
        image: "/images/Me.webp",
        name: "Media Encoder",
        color: "#7C5CFC",
        category: "Video & Motion",
        proficiency: 100,
        desc: "Optimizes export workflows through batch rendering, format conversion, and platform-ready video delivery across multiple channels.",
        uses: [
          "Batch Rendering",
          "Video Encoding",
          "Format Conversion",
          "Export Optimization",
          "Render Queue",
          "Content Delivery",
        ],
      },
      {
        id: "cv",
        image: "/images/Canva.webp",
        name: "Canva",
        color: "#A855F7",
        category: "Design & Visual",
        proficiency: 85,
        desc: "Rapid content creation platform used for social media designs, presentations, promotional materials, and marketing campaigns.",
        uses: [
          "Social Media Design",
          "Marketing Assets",
          "Promotional Creatives",
          "Presentations",
          "Templates",
          "Brand Content",
        ],
      },
    ],
  },

  ai: {
    label: "AI",
    items: [
      {
        id: "gpt",
        image: "/images/ChatGPT png.webp",
        name: "ChatGPT",
        color: "#4ADE80",
        category: "AI Tools",
        proficiency: 85,
        desc: "Creative assistant for scripting, storytelling, content ideation, copywriting, creative problem-solving, and streamlining production workflows.",
        uses: [
          "Script Writing",
          "Storytelling",
          "Content Strategy",
          "Creative Ideation",
          "Copywriting",
          "Workflow Support",
        ],
      },

      {
        id: "gem",
        image: "/images/Gemni Png.webp",
        name: "Gemini",
        color: "#9B72CB",
        category: "AI Tools",
        proficiency: 85,
        desc: "Multimodal AI assistant used for brainstorming concepts, analyzing visual references, planning content, and accelerating creative workflows.",
        uses: [
          "Creative Research",
          "Visual Analysis",
          "Content Planning",
          "Brainstorming",
          "Reference Gathering",
          "Productivity",
        ],
      },

      {
        id: "el",
        image: "/images/ElevenLabs.webp",
        name: "ElevenLabs",
        color: "#E5E5E5",
        category: "AI Tools",
        proficiency: 85,
        desc: "AI voice platform used for professional voiceovers, narrations, advertisements, explainers, and multilingual content production.",
        uses: [
          "Voiceovers",
          "Narration",
          "Dubbing",
          "Ad Voiceovers",
          "Explainer Videos",
          "Audio Content",
        ],
      },

      {
        id: "rw",
        image: "/images/Runway_Logo png.webp",
        name: "Runway",
        color: "#C084FC",
        category: "AI Tools",
        proficiency: 80,
        desc: "AI-powered creative suite for video enhancement, object removal, motion effects, generative visuals, and rapid content production.",
        uses: [
          "AI Video",
          "Motion Effects",
          "Object Removal",
          "Video Enhancement",
          "Generative Content",
          "Creative Production",
        ],
      },

      {
        id: "fp",
        image: "/images/Freepik png.png",
        name: "Freepik AI",
        color: "#5B9CF6",
        category: "AI Tools",
        proficiency: 85,
        desc: "AI-assisted design platform used for concept generation, marketing visuals, thumbnails, mood boards, and creative asset development.",
        uses: [
          "AI Images",
          "Concept Art",
          "Mood Boards",
          "Marketing Visuals",
          "Thumbnail Concepts",
          "Creative Assets",
        ],
      },

      {
        id: "px",
        image: "/images/perplexity-logo.webp",
        name: "Perplexity",
        color: "#20B8CD",
        category: "AI Tools",
        proficiency: 85,
        desc: "Research and discovery platform used for trend analysis, fact-checking, content research, audience insights, and strategic planning.",
        uses: [
          "Research",
          "Fact Checking",
          "Trend Analysis",
          "Content Research",
          "Audience Insights",
          "Strategic Planning",
        ],
      },
    ],
  },
};
// ─── WHAT I OFFER ─────────────────────────────────────────────────────────────
const OFFERS = [
  {
    title: "Video Editing",
    desc: "Professional editing for reels, long-form content, documentaries, podcasts, wedding films and storytelling-driven videos.",
    icon: "✦",
  },
  {
    title: "Motion Graphics & Animation",
    desc: "Dynamic motion graphics, logo animations, kinetic typography, explainer animations and engaging visual effects.",
    icon: "◈",
  },
  {
    title: "Advertisements & Brand Content",
    desc: "High-converting ad creatives, promotional videos, product showcases and social media campaigns for modern brands.",
    icon: "▶",
  },
  {
    title: "Color Grading & Finishing",
    desc: "Professional color correction, cinematic grading, skin-tone balancing and final delivery optimization.",
    icon: "◑",
  },
  {
    title: "Sound Design & SFX",
    desc: "Immersive audio experiences through sound design, voice enhancement, audio cleanup, mixing and cinematic SFX.",
    icon: "◉",
  },
  {
    title: "Creative Design & AI Production",
    desc: "Posters, thumbnails, social media creatives, AI-assisted content creation, voiceovers and visual concept development.",
    icon: "◍",
  },
];


// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────
function DetailPanel({ tool }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !tool) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
    );
  }, [tool?.id]);
  if (!tool) return null;

  const uses = tool.uses || [];
  const desc = tool.desc || "Professional creative tool.";
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        height: "100%",
      }}
    >
      {/* Tool header */}

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            overflow: "hidden",
            flexShrink: 0,
            border: `1.5px solid ${tool.color}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111",
          }}
        >
          <img
            src={tool.image}
            alt={tool.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(22px,2.8vw,32px)",
              letterSpacing: "0.03em",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {tool.name}
          </div>
        </div>
      </div>

      {/* Proficiency */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              ...STYLE.labelDim,
            }}
          >
            Proficiency
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: FS.labelSm,
              color: tool.color,
            }}
          >
            {tool.proficiency}%
          </span>
        </div>
        <div
          style={{ height: 1, background: "var(--border)", borderRadius: 1 }}
        >
          <div
            style={{
              height: "100%",
              width: `${tool.proficiency}%`,
              background: `linear-gradient(90deg, ${tool.color}55, ${tool.color})`,
              borderRadius: 1,
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          ...STYLE.bodySm,
          lineHeight: 1.8,
          margin: 0,
        }}
      >
        {tool.desc}
      </p>

      {/* Tags */}
      <div>
        <div
          style={{
            ...STYLE.labelDim,
            marginBottom: 10,
          }}
        >
          What I use it for
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {(tool.uses || []).map((u) => (
            <span
              key={u}
              style={{
                padding: "5px 14px",
                border: `1px solid ${tool.color}33`,
                background: `${tool.color}0D`,
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: tool.color,
                borderRadius: 2,
              }}
            >
              {u}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const root    = useRef(null);
  const skH1    = useRef(null); // "WHAT"
  const skH2    = useRef(null); // "I USE"
  const ofH1    = useRef(null); // "WHAT I"
  const ofH2    = useRef(null); // "OFFER"

  const [activeTab, setActiveTab] = useState("tools");
  const [activeTool, setActiveTool] = useState(CATEGORIES.tools.items[0]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setActiveTool(CATEGORIES[tab].items[0]);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Skills heading clip-reveal ── */
      gsap.set([skH1.current, skH2.current], { yPercent: 110 });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 76%",
        once: true,
        onEnter: () => {
          gsap.to(skH1.current, { yPercent: 0, duration: 0.65, ease: "expo.out" });
          gsap.to(skH2.current, { yPercent: 0, duration: 0.65, ease: "expo.out", delay: 0.07 });
        },
      });

      /* ── General reveal blocks (label, tabs, explorer, divider) ── */
      gsap.set("[data-reveal]", { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 75%",
        once: true,
        onEnter: () =>
          gsap.to("[data-reveal]", {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.5,
            ease: "expo.out",
          }),
      });

      /* ── Offer heading clip-reveal ── */
      gsap.set([ofH1.current, ofH2.current], { yPercent: 110 });
      ScrollTrigger.create({
        trigger: "[data-offer-grid]",
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(ofH1.current, { yPercent: 0, duration: 0.65, ease: "expo.out" });
          gsap.to(ofH2.current, { yPercent: 0, duration: 0.65, ease: "expo.out", delay: 0.07 });
        },
      });

      /* ── Offer cards — staggered scale+fade ── */
      gsap.set("[data-offer-card]", { opacity: 0, y: 24, scale: 0.96 });
      ScrollTrigger.create({
        trigger: "[data-offer-grid]",
        start: "top 80%",
        once: true,
        onEnter: () =>
          gsap.to("[data-offer-card]", {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.out",
            delay: 0.1,
          }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const currentItems = CATEGORIES[activeTab].items;

  return (
    <section
      ref={root}
      style={{ padding: "var(--section-y) 0" }}
    >
      <style>{`
        /* ── Tab buttons ── */
        .sk-tab {
          font-family: var(--font-heading);
          font-size: 18px;
          letter-spacing: 0.04em;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 0 10px 0;
          color: rgba(255,255,255,.6);
          position: relative;
          transition: color 0.25s ease;
          outline: none;
          line-height: 1;
        }
        .sk-tab::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: var(--accent);
          transition: width 0.3s cubic-bezier(0.23,1,0.32,1);
        }
        .sk-tab.active { color: #fff; }
        .sk-tab.active::after { width: 100%; }
        .sk-tab:hover { color: #fff; }

        /* ── Icon grid ── */
        .sk-icon-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        /* ── Icon button ── */
        .sk-icon-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px 12px;
          border-radius: 12px;
          transition: background 0.2s ease;
          outline: none;
          position: relative;
        }
        .sk-icon-btn:hover {
          background: rgba(255,255,255,0.04);
        }
        .sk-icon-btn.active {
          background: rgba(255,255,255,0.06);
        }

        /* ── Icon wrapper (the actual visible circle/rounded square) ── */
        .sk-icon-wrap {
          border-radius: 18px;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 0.25s cubic-bezier(0.23,1,0.32,1);
          will-change: transform;
          position: relative;
        }
        .sk-icon-btn:hover .sk-icon-wrap {
          transform: translateY(-4px) scale(1.06);
        }
        .sk-icon-btn.active .sk-icon-wrap {
          transform: translateY(-3px) scale(1.05);
        }

        /* ── Icon label ── */
        .sk-icon-label {
          font-family: var(--font-mono);
          font-size: var(--fs-label-sm);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-dim);
          transition: color 0.2s ease;
          text-align: center;
          line-height: 1.3;
          max-width: 80px;
        }
        .sk-icon-btn.active .sk-icon-label {
          color: #fff;
        }
        .sk-icon-btn:hover .sk-icon-label {
          color: var(--text-muted);
        }

        /* ── Explorer layout: side by side on desktop ── */
        .sk-explorer {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        @media (min-width: 720px) {
          .sk-explorer {
            display: grid;
            grid-template-columns: 260px 1fr;
            gap: 0;
            align-items: stretch;
            border: 1px solid var(--border);
          }
          .sk-icon-panel {
            border-right: 1px solid var(--border) !important;
            border-bottom: none !important;
          }
        }
        @media (min-width: 960px) {
          .sk-explorer {
            grid-template-columns: 300px 1fr;
          }
        }

        /* ── Offer grid ── */
        .offer-grid {
          display: grid;
          grid-template-columns: 1fr;
          border-top: 1px solid var(--border);
          border-left: 1px solid var(--border);
        }
        @media (min-width: 520px) { .offer-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .offer-grid { grid-template-columns: repeat(3, 1fr); } }

        .offer-card {
          padding: clamp(22px,3vw,36px);
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: background 0.35s ease, border-color 0.3s;
        }

        /* Top accent bar slides in from left on hover */
        .offer-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }

        /* Diagonal glow streak */
        .offer-card::after {
          content: '';
          position: absolute;
          top: -60%; left: -40%;
          width: 60%; height: 200%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(57,212,1,0.05) 50%,
            transparent 100%
          );
          transform: translateX(-100%);
          transition: transform 0s;
          pointer-events: none;
        }

        .offer-card:hover {
          background: rgba(57,212,1,0.03);
        }
        .offer-card:hover::before { transform: scaleX(1); }
        .offer-card:hover::after {
          transform: translateX(320%);
          transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }

        /* Icon scales + glows on hover */
        .offer-card:hover .offer-icon {
          transform: scale(1.18) rotate(-6deg);
          filter: drop-shadow(0 0 10px rgba(57,212,1,0.55));
          color: var(--accent);
        }
        .offer-icon {
          display: block;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      filter 0.4s ease,
                      color 0.3s;
        }

        /* Title brightens on hover */
        .offer-card:hover .offer-title {
          color: var(--accent) !important;
          letter-spacing: 0.09em !important;
        }
        .offer-title {
          transition: color 0.3s, letter-spacing 0.35s cubic-bezier(0.16,1,0.3,1);
        }

        /* Corner index badge */
        .offer-index {
          position: absolute;
          bottom: 12px; right: 14px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.12em;
          color: var(--border);
          transition: color 0.3s, opacity 0.3s;
          opacity: 0;
          user-select: none;
        }
        .offer-card:hover .offer-index {
          color: rgba(57,212,1,0.35);
          opacity: 1;
        }
      `}</style>

      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          padding: "0 clamp(20px,5vw,60px)",
        }}
      >
        {/* ── Section label + heading ── */}
        <div style={{ marginBottom: "clamp(40px,6vw,72px)" }}>
          <span data-reveal style={{ ...STYLE.labelAccent, display: "block", marginBottom: 12 }}>
            Skills & Tools
          </span>
          <div style={HEADING.clip}>
            <span ref={skH1} style={HEADING.solid}>WHAT</span>
          </div>
          <div style={HEADING.clip}>
            <span ref={skH2} style={HEADING.outline}>I USE</span>
          </div>
        </div>

        {/* ── Tab row ── */}
        <div
          data-reveal
          style={{
            display: "flex",
            gap: "clamp(20px,3vw,36px)",
            marginBottom: "clamp(28px,4vw,40px)",
          }}
        >
          {Object.keys(CATEGORIES).map((tab) => (
            <button
              key={tab}
              className={`sk-tab${activeTab === tab ? " active" : ""}`}
              onClick={() => handleTabChange(tab)}
            >
              {CATEGORIES[tab].label}
            </button>
          ))}
        </div>

        {/* ── Explorer: icon grid + detail panel ── */}
        <div data-reveal className="sk-explorer">
          {/* Left: icon grid */}
          <div
            className="sk-icon-panel"
            style={{
              padding: "clamp(16px,2.5vw,28px)",
              borderBottom: "1px solid var(--border)",
              overflowY: "auto",
              maxHeight: "none",
            }}
          >
            <div className="sk-icon-grid">
              {currentItems.map((tool) => {
                const isActive = activeTool?.id === tool.id;
                return (
                  <button
                    key={tool.id}
                    className={`sk-icon-btn${isActive ? " active" : ""}`}
                    onClick={() => setActiveTool(tool)}
                    aria-label={tool.name}
                  >
                    <div
                      className="sk-icon-wrap"
                      style={{
                        width: "clamp(56px,8vw,72px)",
                        height: "clamp(56px,8vw,72px)",
                        boxShadow: isActive
                          ? `0 0 0 2px ${tool.color}, 0 8px 24px ${tool.color}44`
                          : "0 2px 12px rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#111",
                      }}
                    >
                      <img
                        src={tool.image}
                        alt={tool.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <span
                      className="sk-icon-label"
                      style={{ color: isActive ? tool.color : undefined }}
                    >
                      {tool.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: detail panel */}
          <div
            style={{
              padding: "clamp(24px,3.5vw,44px)",
              position: "relative",
              minHeight: "clamp(280px,40vw,360px)",
            }}
          >
            {/* Active color accent stripe */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 48,
                height: 2,
                background: activeTool?.color || "var(--accent)",
                transition: "background 0.4s ease",
              }}
            />
            <DetailPanel tool={activeTool} />
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          data-reveal
          style={{
            height: 1,
            background: "var(--border)",
            margin: "clamp(64px,10vw,100px) 0",
          }}
        />

        {/* ── What I Offer ── */}
        <div>
          <div style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
            <span data-reveal style={{ ...STYLE.labelAccent, display: "block", marginBottom: 12 }}>
              Services
            </span>
            <div style={HEADING.clip}>
              <span ref={ofH1} style={HEADING.solid}>WHAT I</span>
            </div>
            <div style={HEADING.clip}>
              <span ref={ofH2} style={HEADING.outline}>OFFER</span>
            </div>
          </div>
          <div className="offer-grid" data-offer-grid>
            {OFFERS.map((offer, i) => (
              <div key={offer.title} className="offer-card" data-offer-card>
                {/* Icon */}
                <span
                  className="offer-icon"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(22px,3vw,28px)",
                    color: "var(--accent)",
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  {offer.icon}
                </span>

                {/* Title */}
                <h3
                  className="offer-title"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(15px,1.8vw,18px)",
                    letterSpacing: "0.06em",
                    color: "#fff",
                    margin: "0 0 12px",
                    lineHeight: 1.2,
                  }}
                >
                  {offer.title}
                </h3>

                {/* Description */}
                <p style={{ ...STYLE.bodySm, lineHeight: 1.75, margin: 0 }}>
                  {offer.desc}
                </p>

                {/* Corner index */}
                <span className="offer-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: "clamp(48px,8vw,96px)" }} />
      </div>
    </section>
  );
}
