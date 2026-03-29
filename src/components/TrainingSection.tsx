"use client";

import { useTranslations } from "next-intl";
import FadeUp from "./FadeUp";
import MockupShowcase from "./MockupShowcase";
import CompetitorTable from "./CompetitorTable";
import { useActiveFeature } from "@/hooks/useActiveFeature";

const MOCKUP_KEYS = ["workout", "stats", "coach", "splits", "forum", "dashboard"] as const;

export default function TrainingSection() {
  const t = useTranslations("training");
  const { activeFeature, setActiveFeature, getSentinelRef } = useActiveFeature(6);

  const features = Array.from({ length: 6 }, (_, i) => ({
    title: t(`features.${i}.title`),
    subtitle: t(`features.${i}.subtitle`),
    description: t(`features.${i}.description`),
    key: MOCKUP_KEYS[i]!,
    mockupSrc: `/mockups/training-${MOCKUP_KEYS[i]}.svg`,
    mockupAlt: t(`features.${i}.title`),
  }));

  return (
    <section id="training" className="py-28 px-6 relative">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <FadeUp className="mb-16 max-w-2xl">
          <p className="section-label mb-3" style={{ color: "var(--cyan)" }}>
            {t("sectionLabel")}
          </p>
          <h2
            className="font-barlow font-black text-white tracking-tight leading-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {t("headline")}
          </h2>
          <p className="font-manrope text-base" style={{ color: "var(--text-muted)" }}>
            {t("subline")}
          </p>
        </FadeUp>

        {/* Sticky showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-16">
          {/* LEFT: Sticky feature list (desktop only) */}
          <div
            className="hidden lg:block"
            style={{ position: "sticky", top: "88px", height: "fit-content" }}
          >
            <div className="flex flex-col gap-1">
              {features.map((f, i) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    setActiveFeature(i);
                    document.querySelector(`[data-sentinel="${i}"]`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className="text-left px-4 py-4 rounded-lg transition-all duration-200"
                  style={{
                    borderLeft:
                      activeFeature === i
                        ? "2px solid var(--cyan)"
                        : "2px solid transparent",
                    background: activeFeature === i ? "rgba(77,255,237,0.04)" : "transparent",
                  }}
                >
                  <div
                    className="font-manrope font-semibold text-sm mb-0.5 transition-colors duration-200"
                    style={{ color: activeFeature === i ? "var(--text)" : "var(--text-dim)" }}
                  >
                    {f.title}
                  </div>
                  <div
                    className="font-manrope text-xs transition-colors duration-200"
                    style={{ color: activeFeature === i ? "var(--text-muted)" : "#333" }}
                  >
                    {f.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Mockup + sentinels */}
          <div>
            {/* Desktop: sticky mockup */}
            <div className="hidden lg:block">
              <MockupShowcase activeFeature={activeFeature} features={features} />
            </div>

            {/* Sentinels (all breakpoints) - contain mobile feature cards */}
            {features.map((f, i) => (
              <div
                key={f.key}
                ref={getSentinelRef(i)}
                data-sentinel={i}
                className="h-[180px]"
              >
                {/* Mobile: feature cards visible inside sentinel */}
                <div className="lg:hidden h-full flex items-center">
                  <div
                    className="w-full p-5 rounded-xl"
                    style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                  >
                    <div className="font-manrope font-bold text-base text-white mb-1">{f.title}</div>
                    <div
                      className="font-manrope text-xs mb-2"
                      style={{ color: "var(--cyan)" }}
                    >
                      {f.subtitle}
                    </div>
                    <div
                      className="font-manrope text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
