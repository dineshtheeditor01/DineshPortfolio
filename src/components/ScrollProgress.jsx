import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current)
        ref.current.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div ref={ref} className="progress-bar" />;
}
