import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FS, STYLE, HEADING } from "../theme";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════
   BRAND ICONS — accurate SVG paths
══════════════════════════════════════════════ */
const IconMail = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const IconWhatsApp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const CONTACTS = [
  {
    icon: <IconMail />,
    label: "Direct Email",
    value: "dinesh.theeditor01@gmail.com",
    href: "mailto:dinesh.theeditor01@gmail.com",
    hoverColor: "var(--accent)",
  },
  {
    icon: <IconWhatsApp />,
    label: "Call & WhatsApp",
    value: "+91 9791 600432",
    href: "https://wa.me/919791600432?text=Hi%20Dinesh,%20let%27s%20create%20something%20great%20together.",
    hoverColor: "#25D366",
  },
  {
    icon: <IconInstagram />,
    label: "Instagram",
    value: "@din.ez___",
    href: "https://instagram.com/din.ez___",
    hoverColor: "#E1306C",
  },
  {
    icon: <IconLinkedIn />,
    label: "LinkedIn",
    value: "Dinesh R",
    href: "https://linkedin.com/dineshreditor",
    hoverColor: "#0A66C2",
  },
];

/* ══════════════════════════════════════════════
   STYLES — single source of truth
══════════════════════════════════════════════ */
const S = {
  section: {
    borderTop: "1px solid var(--border)",
    background: "var(--bg)",
    overflow: "hidden",
  },

  wrap: {
    maxWidth: "1160px",
    margin: "0 auto",
    padding: "0 clamp(20px,5vw,60px)",
  },

  /* Label bar */
  labelBar: {
    ...STYLE.labelRow,
    padding: "clamp(14px,2vw,22px) 0",
    borderBottom: "1px solid var(--border)",
  },
  dot: { ...STYLE.dot },
  labelTag: { ...STYLE.labelAccent, letterSpacing: "0.16em" },
  labelDivider: { ...STYLE.labelDivider },
  labelNum: { ...STYLE.labelDim },

  /* Heading */
  headWrap: {
    padding: "clamp(40px,7vw,88px) 0 clamp(32px,5vw,64px)",
    textAlign: "center",
  },
  headClip: { ...HEADING.clip, display: "block" },
  headLineSolid: { ...HEADING.solid },
  headLineOutline: { ...HEADING.outline, paddingLeft: 0 },
  subText: {
    ...STYLE.bodySm,
    lineHeight: 1.7,
    maxWidth: 380,
    margin: "clamp(18px,3vw,28px) auto 0",
  },
  ctaWrap: {
    marginTop: "clamp(24px,4vw,36px)",
  },
  mainCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "13px 36px",
    background: "var(--accent)",
    color: "#000",
    fontFamily: "var(--font-mono)",
    fontSize: FS.labelSm,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    textDecoration: "none",
    transition: "opacity 0.2s",
  },

  /* ── Contact strip ── */
  stripOuter: {
    borderTop: "1px solid var(--border)",
    borderBottom: "1px solid var(--border)",
    padding: "clamp(20px,3vw,28px) 0",
  },
  stripInner: {
    maxWidth: "1160px",
    margin: "0 auto",
    display: "grid",
    gap: "clamp(1px,0.1vw,1px)",
    background: "var(--border)",
  },

  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(10px,1.5vw,16px)",
    padding: "clamp(14px,2vw,20px) clamp(12px,2vw,20px)",
    background: "var(--bg)",
    textDecoration: "none",
    transition: "background 0.25s",
    cursor: "pointer",
  },

  iconWrap: {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    flexShrink: 0,
    transition: "border-color 0.25s, background 0.25s, color 0.25s",
    borderRadius: 2,
  },

  textCol: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minWidth: 0,
  },
  itemLabel: {
    ...STYLE.labelDim,
    letterSpacing: "0.13em",
    whiteSpace: "nowrap",
  },
  itemValue: {
    ...STYLE.bodySm,
    lineHeight: 1.3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    transition: "color 0.25s",
  },

  /* Footer */
  footerBar: {
    padding: "clamp(14px,2vw,20px) 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  footerText: {
    ...STYLE.labelDim,
  },
};

/* ══════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════ */
export default function ContactSection() {
  const rootRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const h3Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([h1Ref.current, h2Ref.current, h3Ref.current], {
        yPercent: 110,
      });
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(h1Ref.current, {
            yPercent: 0,
            duration: 0.85,
            ease: "power3.out",
          });
          gsap.to(h2Ref.current, {
            yPercent: 0,
            duration: 0.85,
            ease: "power3.out",
            delay: 0.09,
          });
          gsap.to(h3Ref.current, {
            yPercent: 0,
            duration: 0.85,
            ease: "power3.out",
            delay: 0.16,
          });
        },
      });

      gsap.set("[data-ci]", { opacity: 0, y: 18 });
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 80%",
        once: true,
        onEnter: () =>
          gsap.to("[data-ci]", {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.65,
            ease: "power3.out",
          }),
      });

      gsap.set("[data-cstrip]", { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: "[data-stripzone]",
        start: "top 90%",
        once: true,
        onEnter: () =>
          gsap.to("[data-cstrip]", {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.6,
            ease: "power3.out",
          }),
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* Per-item hover handlers */
  const onEnter = (e, color) => {
    const el = e.currentTarget;
    const icon = el.querySelector(".ci-icon");
    const val = el.querySelector(".ci-val");
    if (icon) {
      icon.style.borderColor = color;
      icon.style.background = `${color}18`;
      icon.style.color = color;
    }
    if (val) val.style.color = color;
  };
  const onLeave = (e) => {
    const el = e.currentTarget;
    const icon = el.querySelector(".ci-icon");
    const val = el.querySelector(".ci-val");
    el.style.background = "var(--bg)";
    if (icon) {
      icon.style.borderColor = "var(--border)";
      icon.style.background = "var(--surface)";
      icon.style.color = "var(--text-muted)";
    }
    if (val) val.style.color = "var(--text-muted)";
  };

  return (
    <section ref={rootRef} style={S.section}>
      <div style={S.wrap}>
        {/* Label */}
        <div data-ci style={S.labelBar}>
          <span style={S.dot} />
          <span style={S.labelTag}>Get In Touch</span>
          <span style={S.labelDivider} />
          <span style={S.labelNum}>Section / 05</span>
        </div>

        {/* Heading */}
        <div style={S.headWrap}>
          <span style={S.headClip}>
            <span ref={h1Ref} style={S.headLineSolid}>
              LET'S CREATE
            </span>
          </span>
          <span style={S.headClip}>
            <span ref={h2Ref} style={S.headLineSolid}>
              SOMETHING
            </span>
          </span>
          <span style={S.headClip}>
            <span ref={h3Ref} style={S.headLineOutline}>
              WORTH WATCHING.
            </span>
          </span>

          <p data-ci style={S.subText}>
            Open for freelance projects, brand films, reels, and full-time
            opportunities.
          </p>

          <div data-ci style={S.ctaWrap}>
            <a
              href="mailto:dinesh.theeditor01@gmail.com"
              style={S.mainCta}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Start a Project →
            </a>
          </div>
        </div>
      </div>

      {/* ── Contact strip — constrained width ── */}
      <div style={S.stripOuter} data-stripzone>
        <div
          style={{ ...S.stripInner, gridTemplateColumns: "repeat(4, 1fr)" }}
          className="contact-strip-grid"
        >
          {CONTACTS.map(({ icon, label, value, href, hoverColor }) => (
            <a
              key={label}
              data-cstrip
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={S.contactItem}
              onMouseEnter={(e) => onEnter(e, hoverColor)}
              onMouseLeave={onLeave}
            >
              <div
                className="ci-icon"
                style={{ ...S.iconWrap, color: "var(--text-muted)" }}
              >
                {icon}
              </div>
              <div className="ci-text-col" style={S.textCol}>
                <span style={S.itemLabel}>{label}</span>
                <span className="ci-val" style={S.itemValue}>
                  {value}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        /* 2-column on tablet */
        @media (max-width: 680px) {
          .contact-strip-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* Icon-only on small mobile: hide label + value, center icon */
        @media (max-width: 480px) {
          .contact-strip-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 1px !important;
          }
          .contact-strip-grid a {
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 16px 8px !important;
          }
          .ci-text-col { display: none !important; }
          .ci-icon {
            width: 42px !important;
            height: 42px !important;
          }
        }
      `}</style>
    </section>
  );
}
