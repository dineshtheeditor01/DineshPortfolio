import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FS } from "../theme";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  "After Effects", "·", "Premiere Pro", "·", "DaVinci Resolve", "·",
  "Photoshop", "·", "Illustrator", "·", "Motion Graphics", "·",
  "Color Grading", "·", "Reels", "·", "Sound Design", "·", "Branding", "·",
];

export default function MarqueeSection() {
  const ref = useRef(null);
  const all = [...SKILLS, ...SKILLS];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 95%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        padding: "16px 0",
      }}
    >
      <div className="marquee-track">
        {all.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: FS.label,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: item === "·" ? "var(--accent)" : "var(--text-muted)",
              padding: "0 18px",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
