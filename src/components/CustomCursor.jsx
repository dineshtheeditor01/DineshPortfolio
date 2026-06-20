import { useEffect, useRef } from "react";

const ACCENT = "#39d401";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    /* Desktop-only: needs fine pointer + no touch input + wide screen */
    if (navigator.maxTouchPoints > 0) return;
    if (!window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let raf;
    let isHover = false;

    const onMove  = (e) => { mx = e.clientX; my = e.clientY; };
    const onLeave = ()  => { mx = -200; my = -200; };

    /* Track attached elements to avoid duplicate listeners */
    const attached = new WeakSet();
    const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]";

    const attach = (el) => {
      if (attached.has(el)) return;
      attached.add(el);
      el.addEventListener("mouseenter", () => { isHover = true; });
      el.addEventListener("mouseleave", () => { isHover = false; });
    };

    const refresh = () => document.querySelectorAll(INTERACTIVE).forEach(attach);

    const mo = new MutationObserver(refresh);
    mo.observe(document.body, { childList: true, subtree: true });
    refresh();

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      rx = lerp(rx, mx, 0.18);
      ry = lerp(ry, my, 0.18);

      dot.style.transform  = `translate(${mx - 3}px, ${my - 3}px)`;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;

      if (isHover) {
        ring.style.width       = "46px";
        ring.style.height      = "46px";
        ring.style.borderColor = ACCENT;
        ring.style.opacity     = "1";
        dot.style.opacity      = "0";
      } else {
        ring.style.width       = "36px";
        ring.style.height      = "36px";
        ring.style.borderColor = "rgba(240,240,240,0.3)";
        ring.style.opacity     = "0.75";
        dot.style.opacity      = "1";
      }
    };

    raf = requestAnimationFrame(loop);
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      mo.disconnect();
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: ACCENT,
          boxShadow: `0 0 8px ${ACCENT}`,
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          transform: "translate(-200px, -200px)",
          transition: "opacity 0.12s ease",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(240,240,240,0.3)",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          transform: "translate(-200px, -200px)",
          transition: "width 0.18s cubic-bezier(0.16,1,0.3,1), height 0.18s cubic-bezier(0.16,1,0.3,1), border-color 0.18s, opacity 0.18s",
        }}
      />
    </>
  );
}
