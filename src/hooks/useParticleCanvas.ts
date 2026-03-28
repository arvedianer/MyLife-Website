"use client";

import { useEffect, RefObject } from "react";

interface Particle {
  x: number; y: number;
  ox: number; oy: number;
  vx: number; vy: number;
  opacity: number;
  radius: number;
}

export function useParticleCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>
) {
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = prefersReduced ? 0 : (typeof window !== 'undefined' && window.innerWidth > 768) ? 2000 : 500;

    const canvas = canvasRef.current;
    if (!canvas || count === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let scrollY = 0;
    let particles: Particle[] = [];
    let heroVisible = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initParticles = () => {
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x, y, ox: x, oy: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: 0.3 + Math.random() * 0.5,
          radius: 0.8 + Math.random() * 1.2,
        };
      });
    };

    const REPULSION_RADIUS = 90;
    const REPULSION_STRENGTH = 4;
    const FRICTION = 0.92;
    const RETURN_FORCE = 0.015;

    const tick = () => {
      if (!heroVisible) { rafId = requestAnimationFrame(tick); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollFade = Math.max(0, 1 - scrollY / 280);
      if (scrollFade <= 0) { rafId = requestAnimationFrame(tick); return; }

      particles.forEach((p) => {
        p.vx += (p.ox - p.x) * RETURN_FORCE;
        p.vy += (p.oy - p.y) * RETURN_FORCE;

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;
          p.vx += (dx / dist) * force * REPULSION_STRENGTH;
          p.vy += (dy / dist) * force * REPULSION_STRENGTH;
        }

        p.vx *= FRICTION;
        p.vy *= FRICTION;

        p.vx += (Math.random() - 0.5) * (scrollY * 0.002);
        p.vy += (Math.random() - 0.5) * (scrollY * 0.002);

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77, 255, 237, ${p.opacity * scrollFade})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleScroll = () => { scrollY = window.scrollY; };
    const handleResize = () => { resize(); initParticles(); };

    const observer = new IntersectionObserver(
      ([entry]) => { heroVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    resize();
    initParticles();
    rafId = requestAnimationFrame(tick);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [canvasRef]);
}
