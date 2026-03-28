"use client";

import { useState, useEffect } from "react";

export function useScrollThreshold(threshold: number): boolean {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsPast(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isPast;
}
