"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Coffee } from "lucide-react";
import FadeUp from "./FadeUp";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section id="cta" className="py-32 px-6 relative overflow-hidden">
      <div className="divider absolute top-0 inset-x-0" />

      {/* Cyan ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(77,255,237,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <FadeUp>
          <h2
            className="font-barlow font-black text-white tracking-tight leading-none mb-4"
            style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}
          >
            {t("headline")}
          </h2>
          <p className="font-manrope text-sm mb-10" style={{ color: "var(--text-muted)" }}>
            {t("subline")}
          </p>

          <a
            href={t("ctaUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-10 py-4 font-manrope text-sm mb-16"
          >
            {t("primary")}
            <ArrowRight className="w-4 h-4" />
          </a>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="glass rounded-2xl px-8 py-6 max-w-sm mx-auto mt-16">
            <p className="font-manrope text-sm mb-5" style={{ color: "var(--text-dim)" }}>
              {t("donationCopy")}
            </p>
            <a
              href={t("donationUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-6 py-3 font-manrope text-xs"
            >
              <Coffee className="w-3.5 h-3.5" aria-hidden="true" />
              {t("donationCta")}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
