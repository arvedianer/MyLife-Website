"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";
import IPhoneFrame from "./IPhoneFrame";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Particle background */}
      <ParticleCanvas />

      {/* Cyan radial glow behind phone */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(77,255,237,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div>
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 glass"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                {t("badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="font-barlow font-black text-white leading-none tracking-tighter mb-5"
              style={{ fontSize: "clamp(5rem, 14vw, 9rem)" }}
            >
              {t("headline")}
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="font-barlow font-bold tracking-wider mb-4"
              style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", color: "var(--cyan)" }}
            >
              {t("sub")}
            </motion.p>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="font-manrope mb-10 max-w-lg"
              style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7 }}
            >
              {t("subline")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <a
                href={t("ctaUrl")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 text-sm font-manrope font-bold"
              >
                {t("cta")}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#ecosystem" className="btn-ghost px-6 py-4 text-sm font-manrope">
                {t("ctaSecondary")}
                <ChevronDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="flex justify-center lg:justify-end"
          >
            <div
              style={{
                animation: "float 6s ease-in-out infinite",
                filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.7))",
              }}
            >
              <IPhoneFrame
                src="/screenshots/app-dashboard-mobile.png"
                alt="MyLife Training App Dashboard"
                accentColor="#4DFFED"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.5, duration: 1, ease }}
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
