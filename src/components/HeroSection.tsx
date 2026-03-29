"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Particle background */}
      <ParticleCanvas />

      {/* Subtle radial overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, rgba(8,8,8,0.7) 70%)",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 glass"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {t("badge")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="font-barlow font-black text-white leading-none tracking-tighter mb-4"
          style={{ fontSize: "clamp(5rem, 16vw, 12rem)" }}
        >
          {t("headline")}
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="font-manrope font-medium mb-3"
          style={{ fontSize: "1.25rem", color: "var(--text-muted)" }}
        >
          {t("sub")}
        </motion.p>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="font-manrope mb-12"
          style={{ fontSize: "0.95rem", color: "var(--text-dim)" }}
        >
          {t("subline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href={t("ctaUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-3.5 text-sm font-manrope"
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#ecosystem"
            className="btn-ghost px-6 py-3.5 text-sm font-manrope"
          >
            {t("ctaSecondary")}
            <ChevronDown className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.2, duration: 1, ease }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <div
          className="w-px h-10 animate-pulse"
          style={{ background: "linear-gradient(to bottom, transparent, var(--border), transparent)" }}
        />
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" style={{ color: "var(--text-dim)" }} />
      </motion.div>
    </section>
  );
}
