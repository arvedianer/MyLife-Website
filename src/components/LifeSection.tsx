"use client";

import { useTranslations } from "next-intl";
import { Lock } from "lucide-react";
import FadeUp from "./FadeUp";
import IPhoneFrame from "./IPhoneFrame";

export default function LifeSection() {
  const t = useTranslations("life");
  const features = [0, 1, 2, 3].map((i) => t(`f${i}`));

  return (
    <section id="life" className="py-28 px-6 relative overflow-hidden">
      <div className="divider absolute top-0 inset-x-0" />

      {/* Amber ambient glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.10) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left: Blurred mockup (image first on desktop) */}
          <FadeUp delay={0.2} className="flex justify-center order-2 lg:order-1">
            <div className="relative">
              {/* Blurred phone */}
              <div className="opacity-50 blur-sm pointer-events-none select-none">
                <IPhoneFrame
                  src="/mockups/training-dashboard.svg"
                  alt="MyLife Life preview"
                  accentColor="var(--amber)"
                />
              </div>

              {/* In Planung overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass rounded-2xl px-8 py-5 text-center">
                  <p className="font-barlow font-black text-white text-2xl tracking-tight mb-1">
                    {t("label")}
                  </p>
                  <p className="font-manrope text-xs" style={{ color: "var(--amber)" }}>
                    MyLife Life
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <FadeUp>
              <p
                className="font-manrope text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--amber)" }}
              >
                {t("label")}
              </p>
              <h2
                className="font-barlow font-black text-white tracking-tight mb-4 leading-none"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                {t("headline")}
              </h2>
              <p className="font-manrope text-sm mb-10" style={{ color: "var(--text-muted)" }}>
                {t("subline")}
              </p>
            </FadeUp>

            <div className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <FadeUp key={i} delay={0.08 + i * 0.06}>
                  <div className="flex items-start gap-3">
                    <Lock
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--amber)", opacity: 0.45 }}
                      aria-hidden="true"
                    />
                    <span className="font-manrope text-sm" style={{ color: "var(--text-muted)" }}>
                      {feature}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.38}>
              <span className="badge-planned">{t("label")}</span>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
