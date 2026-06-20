import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { FS } from "../theme";

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────
// Single source of truth. To add a page: { to: "/newpage", label: "New", type: "route" }
// To add an anchor: { to: "/#sectionid", label: "Section", type: "anchor" }
const NAV_LINKS = [
  { to: "/works", label: "Works", type: "route" },
  { to: "/#about", label: "About", type: "anchor" },
  { to: "/#skills", label: "Skills", type: "anchor" },
  { to: "/#contact", label: "Contact", type: "anchor" },
];

// ALL_LINKS = Home + NAV_LINKS (used in fullscreen overlay)
const ALL_LINKS = [{ to: "/", label: "Home", type: "route" }, ...NAV_LINKS];

// Anchor section IDs in DOM order — must match <div id="..."> in Home.jsx
const ANCHOR_SECTIONS = ["about", "skills", "contact"];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const WhatsappIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const HomeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const WorksIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const MenuIcon = ({ open }) => (
  <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
    <span
      style={{
        display: "block",
        width: 22,
        height: 1.5,
        background: "#fff",
        transform: open ? "rotate(45deg) translate(3px, 5px)" : "none",
        transition: "transform 0.35s var(--ease)",
        transformOrigin: "center",
      }}
    />
    <span
      style={{
        display: "block",
        width: open ? 0 : 14,
        height: 1.5,
        background: "#fff",
        transition: "width 0.3s var(--ease)",
      }}
    />
    <span
      style={{
        display: "block",
        width: 22,
        height: 1.5,
        background: "#fff",
        transform: open ? "rotate(-45deg) translate(3px, -5px)" : "none",
        transition: "transform 0.35s var(--ease)",
        transformOrigin: "center",
      }}
    />
  </div>
);

// ─── SCROLL TO ANCHOR ─────────────────────────────────────────────────────────
function scrollToAnchor(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── ACTIVE ANCHOR HOOK — position-based, deterministic ───────────────────────
//
// Algorithm:
//   On every scroll event, measure the top edge of each anchor section
//   relative to the viewport. The "active" section is the one whose top
//   is closest to (but still AT or ABOVE) a trigger line set at 40% of
//   viewport height. This is O(n) per scroll, no observer race conditions.
//
//   "No active anchor" = we're above the first section (hero area).
//
function useActiveAnchor(isHomePage) {
  const [active, setActive] = useState("");

  useEffect(() => {
    // Only run on the home page — anchors only exist there
    if (!isHomePage) {
      setActive("");
      return;
    }

    // Trigger line: 40% down from top of viewport
    // Sections that have scrolled past this line are "behind" us
    const TRIGGER = () => window.innerHeight * 0.4;

    const compute = () => {
      let winner = "";
      let winnerTop = -Infinity;

      for (const id of ANCHOR_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top;

        // Section top must be AT or ABOVE the trigger line to be considered
        if (top <= TRIGGER()) {
          // Whichever has the highest (least negative) top wins —
          // that's the most recently entered section
          if (top > winnerTop) {
            winnerTop = top;
            winner = id;
          }
        }
      }

      setActive(winner);
    };

    compute(); // run once on mount
    window.addEventListener("scroll", compute, { passive: true });
    return () => window.removeEventListener("scroll", compute);
  }, [isHomePage]);

  return active;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const linksRef = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const activeAnchor = useActiveAnchor(isHomePage);

  // ── Close overlay on route change ──────────────────────────────────────────
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // ── iOS-safe scroll lock when overlay open ─────────────────────────────────
  useEffect(() => {
    if (open) {
      const y = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${y}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      const y = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      if (y) window.scrollTo(0, parseInt(y) * -1);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
    };
  }, [open]);

  // ── Navbar scroll shrink ───────────────────────────────────────────────────
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    fn(); // run once on mount to set initial state
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── GSAP stagger on overlay open ──────────────────────────────────────────
  useEffect(() => {
    const links = linksRef.current.filter(Boolean);
    if (!links.length) return;
    if (open) {
      gsap.fromTo(
        links,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.12,
        },
      );
    } else {
      gsap.set(links, { opacity: 0 });
    }
  }, [open]);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  // ── Determine active state for any link ────────────────────────────────────
  //
  // Rules (in priority order):
  //   1. Route links  → active when pathname matches exactly
  //   2. Anchor links → active only on "/" AND anchor section is in view
  //   3. Home link    → active on "/" only when NO anchor is in view
  //
  const isActive = useCallback(
    (link) => {
      if (link.type === "route") {
        if (link.to === "/") {
          // Home: active on "/" with no anchor section active
          return isHomePage && activeAnchor === "";
        }
        // Other route: exact pathname match
        return location.pathname === link.to;
      }

      if (link.type === "anchor") {
        // Anchors only exist on the home page
        if (!isHomePage) return false;
        const id = link.to.replace("/#", "");
        return activeAnchor === id;
      }

      return false;
    },
    [isHomePage, activeAnchor, location.pathname],
  );

  // ── Handle link click ─────────────────────────────────────────────────────
  const handleClick = useCallback(
    (e, link) => {
      e.preventDefault();

      if (link.type === "anchor") {
        const id = link.to.replace("/#", "");
        close();
        if (!isHomePage) {
          // Navigate to home first, then scroll after route settles
          navigate("/");
          setTimeout(() => scrollToAnchor(id), 450);
        } else {
          // Already on home — close overlay then scroll
          setTimeout(() => scrollToAnchor(id), open ? 550 : 0);
        }
        return;
      }

      // Route link
      close();
      navigate(link.to);
      if (link.to === "/") {
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
      }
    },
    [close, isHomePage, navigate, open],
  );

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ══ TOP BAR ══════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: scrolled ? "12px 0" : "22px 0",
          background: scrolled ? "rgba(11,11,11,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          transition:
            "padding 0.3s var(--ease), background 0.3s var(--ease), border-color 0.3s var(--ease)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 clamp(20px,5vw,48px)",
            maxWidth: "1160px",
            margin: "0 auto",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              close();
              if (isHomePage) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1,
              gap: 3,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                letterSpacing: "0.06em",
                color: "var(--text)",
                lineHeight: 1,
              }}
            >
              DINESH R
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: FS.labelSm,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              PRO · Editor
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="desk-nav"
            style={{ display: "flex", gap: 36, alignItems: "center" }}
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => handleClick(e, link)}
                  className="desk-nav-link"
                  data-active={active ? "true" : "false"}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: active ? "var(--text)" : "var(--text-muted)",
                    position: "relative",
                    transition: "color 0.2s",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="https://wa.me/919791600432"
            target="_blank"
            rel="noopener noreferrer"
            className="desk-nav"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 22px",
              background: "var(--accent)",
              color: "#000",
              fontFamily: "var(--font-mono)",
              fontSize: FS.label,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Hire Me
          </a>

          {/* Burger */}
          <button
            onClick={toggle}
            aria-label={open ? "Close menu" : "Open menu"}
            className="mob-burger"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              zIndex: 600,
              lineHeight: 0,
            }}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </header>

      {/* ══ FULLSCREEN OVERLAY ═══════════════════════════════════════════════ */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 499,
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(24px,8vw,80px)",
          paddingTop: 80,
          transform: open ? "translateY(0)" : "translateY(-100%)",
          opacity: open ? 1 : 0,
          transition: "transform 0.5s var(--ease), opacity 0.4s ease",
          pointerEvents: open ? "all" : "none",
          overflowY: "auto",
        }}
      >
        <nav>
          {ALL_LINKS.map((link, i) => {
            const active = isActive(link);
            return (
              <a
                key={link.to}
                href={link.to}
                ref={(el) => {
                  linksRef.current[i] = el;
                }}
                onClick={(e) => handleClick(e, link)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(44px,11vw,84px)",
                  lineHeight: 1.05,
                  letterSpacing: "0.01em",
                  color: active ? "var(--accent)" : "var(--text-dim)",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--border)",
                  transition: "color 0.2s",
                  opacity: 0,
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--text-dim)";
                }}
              >
                {link.label}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: active ? "var(--accent)" : "var(--text-muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Overlay footer */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: 28,
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: FS.labelSm,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Coimbatore, Tamil Nadu
          </span>
          <a
            href="mailto:dinesh.theeditor01@gmail.com"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: FS.label,
              letterSpacing: "0.1em",
              color: "var(--accent)",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            dinesh.theeditor01@gmail.com
          </a>
        </div>
      </div>

      {/* ══ BOTTOM DOCK — mobile only ═════════════════════════════════════════ */}
      <nav
        className="bottom-dock"
        aria-label="Quick navigation"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 490,
          background: "rgba(11,11,11,0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "10px 0 max(10px, env(safe-area-inset-bottom))",
        }}
      >
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            if (isHomePage) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              navigate("/");
            }
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            color:
              isHomePage && activeAnchor === ""
                ? "var(--accent)"
                : "var(--text-muted)",
            minWidth: 64,
            padding: "2px 0",
            transition: "color 0.2s",
            textDecoration: "none",
          }}
        >
          <HomeIcon />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: FS.labelSm,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Home
          </span>
        </Link>

        <Link
          to="/works"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            color:
              location.pathname === "/works"
                ? "var(--accent)"
                : "var(--text-muted)",
            minWidth: 64,
            padding: "2px 0",
            transition: "color 0.2s",
            textDecoration: "none",
          }}
        >
          <WorksIcon />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: FS.labelSm,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Works
          </span>
        </Link>

        <a
          href="https://wa.me/919791600432"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            color: "#25D366",
            minWidth: 64,
            padding: "2px 0",
            textDecoration: "none",
          }}
        >
          <WhatsappIcon />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: FS.labelSm,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#25D366",
            }}
          >
            Chat
          </span>
        </a>
      </nav>

      {/* ══ GLOBAL STYLES ════════════════════════════════════════════════════ */}
      <style>{`
        .desk-nav    { display: none !important; }
        .mob-burger  { display: flex !important; }
        .bottom-dock { display: flex !important; }

        @media (min-width: 768px) {
          .desk-nav    { display: flex !important; }
          .mob-burger  { display: none  !important; }
          .bottom-dock { display: none  !important; }
        }

        .desk-nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0;
          height: 1px;
          background: var(--accent);
          width: 0;
          transition: width 0.3s var(--ease);
        }
        .desk-nav-link:hover { color: var(--text) !important; }
        .desk-nav-link:hover::after { width: 100%; }
        .desk-nav-link[data-active="true"]::after { width: 100%; }
        .desk-nav-link[data-active="true"] { color: var(--text) !important; }
      `}</style>
    </>
  );
}
