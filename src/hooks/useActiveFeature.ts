"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useActiveFeature(count: number): {
  activeFeature: number;
  setActiveFeature: (i: number) => void;
  getSentinelRef: (i: number) => (el: HTMLDivElement | null) => void;
} {
  const [activeFeature, setActiveFeature] = useState(0);
  const sentinelEls = useRef<(HTMLDivElement | null)[]>(Array(count).fill(null));
  const observers = useRef<IntersectionObserver[]>([]);

  const getSentinelRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      sentinelEls.current[i] = el;
    },
    []
  );

  useEffect(() => {
    observers.current.forEach((o) => o.disconnect());
    observers.current = [];

    sentinelEls.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveFeature(i);
        },
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
      );
      observer.observe(el);
      observers.current.push(observer);
    });

    return () => observers.current.forEach((o) => o.disconnect());
  });

  return { activeFeature, setActiveFeature, getSentinelRef };
}
