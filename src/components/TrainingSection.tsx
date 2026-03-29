"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FadeUp from "./FadeUp";
import IPhoneFrame from "./IPhoneFrame";
import CompetitorTable from "./CompetitorTable";
import { useActiveFeature } from "@/hooks/useActiveFeature";

// Map feature index → real screenshot
const SCREENSHOTS = [
  "/screenshots/app-dashboard-mobile.png",
  "/screenshots/app-stats-mobile.png",
  "/screenshots/app-coach.png",
  "/screenshots/app-splits.png",
  "/screenshots/app-forum.png",
  "/screenshots/app-workout.png",
] as const;

const ease: [number, number, number, number] = [0.25, 1, 0.3, 1];

export default function TrainingSection() {
  const t = useTranslations("training");
  const { activeFeature, getSentinelRef } = useActiveFeature(6);

  const features = Array.from({ length: 6 }, (_, i) => ({
    title: t(`features.${i}.title`),
    subtitle: t(`features.${i}.subtitle`),
    description: t(`features.${i}.description`),
    screenshot: SCREENSHOTS[i]!,
  }));

  const activeFeat = features[activeFeature] ?? features[0]!;

  return (
    <section id="training" className="py-28 px-6 relative">
      <div className="divider absolute top-0 inset-x-0" />

      {/* Cyan ambient */}
      <div
        className="absolute left-0 top-1/3 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(77,255,237,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeUp className="mb-16 max-w-2xl">
          <p className="font-manrope text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cyan)" }}>
            {t("sectionLabel")}
          </p>
          <h2 className="font-barlow font-black text-white tracking-tight leading-none mb-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            {t("headline")}
          </h2>
          <p className="font-manrope text-sm" style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
            {t("subline")}
          </p>
        </FadeUp>

        {/* Sticky showcase */}
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-20 lg:items-start">

          {/* Left: Feature cards + scrollable sentinels */}
          <div className="space-y-4 mb-10 lg:mb-0">
            {features.map((feat, i) => {
              const isActive = activeFeature === i;
              return (
                <div key={i} ref={getSentinelRef(i)}>
                  {/* Feature card */}
                  <motion.div
                    animate={{
                      borderColor: isActive ? "rgba(77,255,237,0.4)" : "rgba(34,34,34,1)",
                      backgroundColor: isActive ? "rgba(77,255,237,0.04)" : "rgba(22,22,22,1)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl p-6 cursor-default"
                    style={{ border: "1px solid" }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="font-courier text-xs mt-1 flex-shrink-0 tabular-nums"
                        style={{ color: isActive ? "var(--cyan)" : "var(--text-dim)" }}
                      >
                        0{i + 1}
                      </span>
                      <div className="flex-1">
                        <h3
                          className="font-barlow font-bold text-lg mb-1 transition-colors duration-300"
                          style={{ color: isActive ? "var(--text)" : "var(--text-muted)" }}
                        >
                          {feat.title}
                        </h3>
                        <p
                          className="font-manrope text-xs mb-2 transition-colors duration-300"
                          style={{ color: isActive ? "var(--cyan)" : "var(--text-dim)" }}
                        >
                          {feat.subtitle}
                        </p>
                        <motion.div
                          animate={{
                            opacity: isActive ? 1 : 0,
                            height: isActive ? "auto" : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="font-manrope text-sm" style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                            {feat.description}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Mobile phone (inside sentinel, hidden on desktop) */}
                  <div className="mt-6 flex justify-center lg:hidden">
                    <IPhoneFrame
                      src={feat.screenshot}
                      alt={feat.title}
                      accentColor="#4DFFED"
                    />
                  </div>
                </div>
              );
            })}

            {/* CTA */}
            <FadeUp delay={0.2} className="pt-4">
              <a
                href="https://mylifetraining.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-3.5 text-sm font-manrope font-bold"
              >
                App öffnen
                <ArrowRight className="w-4 h-4" />
              </a>
            </FadeUp>
          </div>

          {/* Right: Sticky phone mockup (desktop only) */}
          <div className="hidden lg:block sticky top-24">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <IPhoneFrame
                src={activeFeat.screenshot}
                alt={activeFeat.title}
                accentColor="#4DFFED"
              />
            </motion.div>
          </div>
        </div>

        {/* Competitor table */}
        <div className="mt-24">
          <CompetitorTable />
        </div>
      </div>
    </section>
  );
}
