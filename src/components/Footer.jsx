import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { to: "/works",    label: "works",   isRoute: true  },
  { to: "/#about",   label: "about",   isRoute: false },
  { to: "/#contact", label: "contact", isRoute: false },
];

export default function Footer() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 98%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} style={{ borderTop: "1px solid var(--border)", padding: "28px 0" }}>
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="t-label">© {new Date().getFullYear()} Dinesh R</span>
        <div style={{ display: "flex", gap: 28 }}>
          {LINKS.map(({ to, label, isRoute }) =>
            isRoute ? (
              <Link
                key={to}
                to={to}
                className="t-label"
                style={{ transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                {label}
              </Link>
            ) : (
              <a
                key={to}
                href={to}
                className="t-label"
                style={{ textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                {label}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
