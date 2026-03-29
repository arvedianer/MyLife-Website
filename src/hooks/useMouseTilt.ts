"use client";

import { useEffect, RefObject } from "react";

export function useMouseTilt(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      el.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg) scale(1.02)`;
      el.style.transition = "transform 0.1s ease-out";
    };

    const handleLeave = () => {
      el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
      el.style.transition = "transform 0.4s ease-out";
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [ref]);
}
