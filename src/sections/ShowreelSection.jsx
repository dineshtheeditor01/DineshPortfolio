import { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger, revealOnScroll } from "../utils/animations";

export default function ShowreelSection() {
  const root = useRef(null);
  const vidRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll("[data-reel]", root.current, { stagger: 0.1, y: 28 });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 80%",
        once: true,
        onEnter: () => vidRef.current?.play().catch(() => {}),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section">
      <div className="container">
        <div
          data-reel
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <span className="t-label-accent">Showreel 2025</span>
          <span className="t-label">01 / 01</span>
        </div>

        <div
          data-reel
          style={{
            position: "relative",
            aspectRatio: "16/9",
            background: "var(--surface)",
            overflow: "hidden",
          }}
        >
          <video
            ref={vidRef}
            muted
            loop
            playsInline
            preload="none"
            poster="/images/reel-poster.jpg"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </video>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)",
              display: "flex",
              alignItems: "flex-end",
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <div>
                <div
                  className="t-label"
                  style={{ color: "rgba(255,255,255,0.35)", marginBottom: 4 }}
                >
                  now playing
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(18px,4vw,30px)",
                    letterSpacing: "0.04em",
                    lineHeight: 1,
                    color: "#fff",
                  }}
                >
                  SHOWREEL 2025
                </div>
              </div>
              <button
                onClick={() => {
                  if (!vidRef.current) return;
                  vidRef.current.muted = !muted;
                  setMuted((m) => !m);
                }}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                  padding: "7px 14px",
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                {muted ? "▶ unmute" : "▶ mute"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
