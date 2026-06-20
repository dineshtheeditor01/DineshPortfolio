/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIM } from "../theme";

gsap.registerPlugin(ScrollTrigger);

/**
 * Attach a scroll-triggered fade+slide-up to a single element.
 * Returns a ref — attach it to the DOM node you want animated.
 *
 * @param {object} options
 * @param {number}  options.y         — initial Y offset (default: ANIM.y = 32)
 * @param {number}  options.duration  — seconds (default: ANIM.duration = 0.75)
 * @param {string}  options.ease      — GSAP ease string (default: ANIM.ease)
 * @param {string}  options.start     — ScrollTrigger start string (default: 'top 85%')
 * @param {number}  options.delay     — extra delay in seconds (default: 0)
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: options.start ?? "top 85%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.fromTo(
          el,
          { opacity: 0, y: options.y ?? ANIM.y },
          {
            opacity: 1,
            y: 0,
            duration: options.duration ?? ANIM.duration,
            ease: options.ease ?? ANIM.ease,
            delay: options.delay ?? 0,
          }
        );
      },
    });

    return () => trigger.kill();
  }, []);

  return ref;
}
