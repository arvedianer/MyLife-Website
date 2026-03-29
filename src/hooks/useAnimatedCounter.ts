"use client";

import { useState, useEffect, useRef } from "react";

export function useAnimatedCounter(
  target: number,
  duration: number = 1500,
  suffix: string = ""
): { ref: React.RefObject<HTMLDivElement | null>; displayValue: string } {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState("0" + suffix);
  const hasStarted = useRef(false);

  useEffect(() => {
    hasStarted.current = false;
    const el = ref.current;
    if (!el) return;

    let rafHandle = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = eased * target;
            setDisplayValue(Math.round(current).toLocaleString() + suffix);
            if (progress < 1) rafHandle = requestAnimationFrame(tick);
          };
          rafHandle = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => { cancelAnimationFrame(rafHandle); observer.disconnect(); };
  }, [target, duration, suffix]);

  return { ref, displayValue };
}
