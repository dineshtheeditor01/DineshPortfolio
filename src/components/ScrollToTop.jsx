import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ─── SCROLL TO TOP BUTTON ─────────────────────────────────────────────────────
// Usage: mount once in App.jsx (or any layout wrapper) — shows on all pages.
//
//   import ScrollToTop from "./components/ScrollToTop";
//   <ScrollToTop />
//
// That's it. No props needed. Appears after scrolling 300px, hides at top.
// ─────────────────────────────────────────────────────────────────────────────

export default function ScrollToTop() {
  const btnRef = useRef(null);
  const arrowRef = useRef(null);
  const progressRef = useRef(null);
  const visible = useRef(false);
  const [show, setShow] = useState(false);

  // ── Track scroll: show/hide + progress ring ──────────────────────────────
  useEffect(() => {
    const THRESHOLD = 300; // px before button appears

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      // Update SVG progress ring
      if (progressRef.current) {
        const circle = progressRef.current;
        const circumference = parseFloat(circle.getAttribute("data-circ"));
        const offset = circumference * (1 - progress);
        circle.style.strokeDashoffset = offset;
      }

      // Show / hide with GSAP
      const shouldShow = scrollY > THRESHOLD;
      if (shouldShow !== visible.current) {
        visible.current = shouldShow;
        setShow(shouldShow); // mount/unmount handled by opacity, not DOM
        if (shouldShow) {
          gsap.fromTo(
            btnRef.current,
            { opacity: 0, y: 16, scale: 0.85 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.45,
              ease: "back.out(1.6)",
            },
          );
        } else {
          gsap.to(btnRef.current, {
            opacity: 0,
            y: 12,
            scale: 0.85,
            duration: 0.3,
            ease: "power2.in",
          });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Click: smooth scroll to top + arrow bounce ────────────────────────────
  const handleClick = () => {
    // Arrow bounce before scroll
    gsap
      .timeline()
      .to(arrowRef.current, { y: -5, duration: 0.15, ease: "power2.out" })
      .to(arrowRef.current, { y: 0, duration: 0.25, ease: "bounce.out" });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Hover: lift + glow ────────────────────────────────────────────────────
  const handleMouseEnter = () => {
    gsap.to(btnRef.current, {
      y: -3,
      scale: 1.06,
      duration: 0.2,
      ease: "power2.out",
    });
  };
  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  // ── Ring geometry ─────────────────────────────────────────────────────────
  const SIZE = 48; // button size px
  const STROKE = 2; // ring stroke width
  const R = SIZE / 2 - STROKE / 2 - 1; // radius
  const CIRC = 2 * Math.PI * R;

  return (
    <>
      <style>{`
        .stt-btn {
          position: fixed;
          bottom: clamp(20px, 4vw, 36px);
          right:  clamp(20px, 4vw, 36px);
          z-index: 9999;
          width:  ${SIZE}px;
          height: ${SIZE}px;
          border-radius: 50%;
          background: rgba(10,10,10,0.88);
          border: 1px solid var(--border);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
          padding: 0;
          opacity: 0;
          /* Glow on hover via box-shadow transition */
          box-shadow: 0 4px 24px rgba(0,0,0,0.5);
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
          /* GPU layer */
          will-change: transform, opacity;
        }
        .stt-btn:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent), 0 8px 32px rgba(232,184,75,0.25);
        }

        /* Progress ring SVG — sits on top of button */
        .stt-ring {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
          pointer-events: none;
        }

        /* Progress arc */
        .stt-arc {
          fill: none;
          stroke: var(--accent);
          stroke-width: ${STROKE};
          stroke-linecap: round;
          stroke-dasharray: ${CIRC};
          stroke-dashoffset: ${CIRC};
          transition: stroke-dashoffset 0.08s linear;
        }

        /* Background track */
        .stt-track {
          fill: none;
          stroke: var(--border);
          stroke-width: ${STROKE};
        }

        /* Arrow icon */
        .stt-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 480px) {
          .stt-btn { display: none; }
        }
      `}</style>

      <button
        ref={btnRef}
        className="stt-btn"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Scroll to top"
        title="Back to top"
      >
        {/* Progress ring */}
        <svg
          className="stt-ring"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-hidden="true"
        >
          {/* Track */}
          <circle className="stt-track" cx={SIZE / 2} cy={SIZE / 2} r={R} />
          {/* Arc */}
          <circle
            ref={progressRef}
            className="stt-arc"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            data-circ={CIRC}
          />
        </svg>

        {/* Arrow */}
        <span ref={arrowRef} className="stt-arrow">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7 12V2M7 2L2.5 6.5M7 2L11.5 6.5"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </>
  );
}
