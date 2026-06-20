import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIM } from "../theme";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Fade + slide up on scroll enter
 * @param {string|Element|Element[]} targets
 * @param {Element} trigger
 * @param {object} opts
 */
export function revealOnScroll(targets, trigger, opts = {}) {
  gsap.set(targets, { opacity: 0, y: opts.y ?? ANIM.y });
  ScrollTrigger.create({
    trigger,
    start: opts.start ?? ANIM.start,
    once: true,
    onEnter: () => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: opts.duration ?? ANIM.duration,
        ease: opts.ease ?? ANIM.ease,
        stagger: opts.stagger ?? ANIM.stagger,
        delay: opts.delay ?? 0,
      });
    },
  });
}

/**
 * Staggered load animation (no scroll trigger — fires on mount)
 */
export function staggerIn(targets, opts = {}) {
  gsap.from(targets, {
    opacity: 0,
    y: opts.y ?? ANIM.y,
    duration: opts.duration ?? ANIM.duration,
    ease: opts.ease ?? ANIM.ease,
    stagger: opts.stagger ?? ANIM.stagger,
    delay: opts.delay ?? 0.15,
  });
}

/**
 * Slide in from right (x direction)
 */
export function slideInX(targets, trigger, opts = {}) {
  gsap.set(targets, { opacity: 0, x: opts.x ?? ANIM.x });
  ScrollTrigger.create({
    trigger,
    start: opts.start ?? ANIM.start,
    once: true,
    onEnter: () => {
      gsap.to(targets, {
        opacity: 1,
        x: 0,
        duration: opts.duration ?? ANIM.duration,
        ease: opts.ease ?? ANIM.ease,
        stagger: opts.stagger ?? ANIM.stagger,
        delay: opts.delay ?? 0,
      });
    },
  });
}

/**
 * Heading clip reveal — slides elements up from yPercent: 110
 * Wrap each heading in overflow:hidden for the mask effect
 * @param {Element|Element[]} targets — array staggered by index
 * @param {Element} trigger
 * @param {object} opts
 */
export function headingReveal(targets, trigger, opts = {}) {
  const els = Array.isArray(targets)
    ? targets.filter(Boolean)
    : [targets].filter(Boolean);
  gsap.set(els, { yPercent: ANIM.yPercent });
  ScrollTrigger.create({
    trigger,
    start: opts.start ?? "top 82%",
    once: true,
    onEnter: () => {
      els.forEach((el, i) => {
        gsap.to(el, {
          yPercent: 0,
          duration: opts.duration ?? 0.9,
          ease: opts.ease ?? ANIM.ease,
          delay: i * (opts.stagger ?? 0.1),
        });
      });
    },
  });
}

/**
 * Scale + fade reveal (good for cards, grid items)
 */
export function scaleReveal(targets, trigger, opts = {}) {
  gsap.set(targets, { opacity: 0, scale: opts.scale ?? ANIM.scale, y: opts.y ?? 20 });
  ScrollTrigger.create({
    trigger,
    start: opts.start ?? "top 85%",
    once: true,
    onEnter: () => {
      gsap.to(targets, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: opts.duration ?? ANIM.duration,
        ease: opts.ease ?? ANIM.ease,
        stagger: opts.stagger ?? 0.07,
        delay: opts.delay ?? 0,
      });
    },
  });
}

/**
 * Horizontal line reveal (scaleX from 0 → 1)
 */
export function lineReveal(target, opts = {}) {
  gsap.from(target, {
    scaleX: 0,
    transformOrigin: "left",
    duration: opts.duration ?? 1.4,
    ease: opts.ease ?? ANIM.ease,
    delay: opts.delay ?? 0.1,
  });
}

/**
 * Convenient all-in-one: reveal all [data-reveal] children inside a context
 */
export function revealAll(contextEl, opts = {}) {
  const targets = contextEl.querySelectorAll("[data-reveal]");
  if (!targets.length) return;
  revealOnScroll(targets, contextEl, opts);
}
