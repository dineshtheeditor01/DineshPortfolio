/**
 * SINGLE SOURCE OF TRUTH — typography tokens + shared inline styles
 * Change a value here → every component that imports from this file updates.
 *
 * Font-size values reference CSS custom properties defined in index.css so
 * you can also adjust them once there and everything follows.
 */

// ─── Font-size references ─────────────────────────────────────────────────────
export const FS = {
  hero: "clamp(72px, 18vw, 150px)",
  heading: "clamp(36px, 7vw, 72px)",
  subheading: "clamp(24px, 4vw, 40px)",
  label: "var(--fs-label)", // 12px  — section tags, accent labels
  labelSm: "var(--fs-label-sm)", // 10px  — small mono tags, badges
  monoXs: "var(--fs-mono-xs)", // 9px   — very tiny UI text
  body: "var(--fs-body)", // clamp(15px, 1.8vw, 17px)
  bodySm: "var(--fs-body-sm)", // clamp(13px, 1.5vw, 15px)
};

// ─── Shared inline style objects ─────────────────────────────────────────────
export const STYLE = {
  /** Green accent label — section tags like "Biography", "Skills & Tools" */
  labelAccent: {
    fontFamily: "var(--font-mono)",
    fontSize: FS.label,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--accent)",
  },

  /** Muted label — secondary tags, counts */
  labelMuted: {
    fontFamily: "var(--font-mono)",
    fontSize: FS.label,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
  },

  /** Dim label — darkest small text, numbers, dividers */
  labelDim: {
    fontFamily: "var(--font-mono)",
    fontSize: FS.labelSm,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--text-dim)",
  },

  /** Tiny mono — timestamps, badges, row counts */
  monoXs: {
    fontFamily: "var(--font-mono)",
    fontSize: FS.monoXs,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--text-dim)",
  },

  /** Main body copy */
  body: {
    fontFamily: "var(--font-body)",
    fontSize: FS.body,
    fontWeight: 500,
    lineHeight: 1.75,
    color: "var(--text-muted)",
  },

  /** Secondary / smaller body copy */
  bodySm: {
    fontFamily: "var(--font-body)",
    fontSize: FS.bodySm,
    fontWeight: 300,
    lineHeight: 1.75,
    color: "var(--text-muted)",
  },

  /** Accent dot indicator (green circle) */
  dot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "var(--accent)",
    flexShrink: 0,
    display: "block",
  },

  /** Row containing dot + label tag + divider + number */
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  /** Hairline vertical divider between label elements */
  labelDivider: {
    width: 1,
    height: 10,
    background: "var(--border)",
  },

  /** Solid CTA button */
  btnSolid: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 28px",
    background: "var(--accent)",
    color: "#000",
    fontFamily: "var(--font-mono)",
    fontSize: FS.labelSm,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    textDecoration: "none",
    transition: "opacity 0.2s",
    cursor: "pointer",
    border: "none",
  },

  /** Outlined secondary button */
  btnOutline: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "11px 26px",
    border: "1px solid var(--border-mid)",
    color: "var(--text-muted)",
    fontFamily: "var(--font-mono)",
    fontSize: FS.labelSm,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    textDecoration: "none",
    transition: "border-color 0.2s, color 0.2s",
    cursor: "pointer",
    background: "none",
  },

  /** Tag pill (border only) */
  pill: {
    padding: "5px 14px",
    border: "1px solid var(--border)",
    fontFamily: "var(--font-mono)",
    fontSize: FS.labelSm,
    letterSpacing: "0.1em",
    color: "var(--text-muted)",
    textTransform: "uppercase",
  },
};

// ─── Section heading styles — CRAFTING / STORIES pattern ─────────────────────
// All section H1/H2 double-line headings use these styles.
// Change --fs-section-heading in index.css → every heading updates.
export const HEADING = {
  /** Clip wrapper for slide-up animation (overflow:hidden) */
  clip: {
    overflow: "hidden",
    lineHeight: 1,
  },

  /** Solid line — full color */
  solid: {
    fontFamily: "var(--font-display)",
    fontSize: "var(--fs-section-heading)",
    lineHeight: 0.9,
    letterSpacing: "0.01em",
    color: "var(--text)",
    display: "block",
  },

  /** Outline line — offset, transparent, webkit-stroke */
  outline: {
    fontFamily: "var(--font-display)",
    fontSize: "var(--fs-section-heading)",
    lineHeight: 0.9,
    letterSpacing: "0.01em",
    color: "transparent",
    WebkitTextStroke: "var(--heading-stroke)",
    display: "block",
    paddingLeft: "var(--heading-indent)",
    marginTop: "0.04em",
  },

  /** Divider below heading block */
  divider: {
    height: 1,
    background: "var(--border)",
    margin: "clamp(24px, 4vw, 40px) 0",
    width: "100%",
  },
};

// ─── Animation defaults ───────────────────────────────────────────────────────
export const ANIM = {
  ease: "power3.out",
  duration: 0.75,
  stagger: 0.1,
  y: 32,
  x: 24,
  yPercent: 110, // for clip/mask heading reveals
  scale: 0.94,
  start: "top 80%",
};
