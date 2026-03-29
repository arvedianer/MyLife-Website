"use client";

import { useTranslations } from "next-intl";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import FadeUp from "./FadeUp";

// Individual stat card — each gets its own hook instance (Rules of Hooks compliant)
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const match = value.match(/^(\d+)([+%]?)$/);
  const target = match ? parseInt(match[1]!, 10) : 0;
  const suffix = match ? match[2]! : "";
  const { ref, displayValue } = useAnimatedCounter(target, 1400, suffix);

  return (
    <FadeUp delay={delay}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="glass rounded-2xl p-8 text-center"
      >
        <p
          className="font-barlow font-black text-white leading-none mb-2"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          {match ? displayValue : value}
        </p>
        <p className="font-manrope text-sm" style={{ color: "var(--text-muted)" }}>
          {label}
        </p>
      </div>
    </FadeUp>
  );
}

export default function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    { value: t("v0"), label: t("l0") },
    { value: t("v1"), label: t("l1") },
    { value: t("v2"), label: t("l2") },
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              value={stat.value}
              label={stat.label}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
