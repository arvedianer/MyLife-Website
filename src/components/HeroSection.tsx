"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Icons } from "./Icons";

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function HeroSection() {
  const t = useTranslations("hero");
  const lines = t("headline").split("\n");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden dot-grid">
      {/* ── Aurora background ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main aurora orbs */}
        <div className="animate-blob absolute -top-48 -left-32 w-[800px] h-[800px] rounded-full bg-indigo-700/25 blur-[140px]" />
        <div className="animate-blob-2 absolute -bottom-48 -right-32 w-[700px] h-[700px] rounded-full bg-violet-700/20 blur-[130px]" />
        <div className="animate-blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[110px]" />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,transparent_0%,rgba(6,9,18,0.9)_80%)]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-[#060912] to-transparent" />
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-12 glass cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-sm text-slate-300 font-medium tracking-wide">{t("badge")}</span>
        </motion.div>

        {/* Headline */}
        <div className="mb-8 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            className="font-black tracking-tighter leading-[0.9]"
          >
            {lines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease }}
                className={`block ${
                  i === 0
                    ? "text-[clamp(4rem,12vw,9rem)] text-white"
                    : i === 1
                    ? "text-[clamp(4rem,12vw,9rem)] text-shimmer"
                    : "text-[clamp(2.8rem,8vw,6.5rem)] text-white/30 mt-2"
                }`}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t("subline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={t("ctaUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="group btn-primary inline-flex items-center gap-3 px-10 py-4 text-base"
          >
            {t("cta")}
            <Icons.ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="#ecosystem"
            className="btn-ghost inline-flex items-center gap-2.5 px-8 py-4 text-base font-medium"
          >
            {t("ctaSecondary")}
            <Icons.ChevronDown className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
          className="mt-20 grid grid-cols-3 gap-3 max-w-xs mx-auto"
        >
          {[
            { value: t("stat1Value"), label: t("stat1Label") },
            { value: t("stat2Value"), label: t("stat2Label") },
            { value: t("stat3Value"), label: t("stat3Label") },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl px-3 py-4 text-center cursor-default">
              <div className="text-2xl font-black text-gradient">{stat.value}</div>
              <div className="text-[10px] text-slate-500 mt-1 leading-tight">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-slate-500 to-transparent" />
        <Icons.ChevronDown className="w-4 h-4 text-slate-500 animate-bounce" />
      </motion.div>
    </section>
  );
}
