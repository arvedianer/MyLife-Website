"use client";

import { useRef } from "react";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { LucideIcon } from "lucide-react";

interface AppCardProps {
  name: string;
  tagline: string;
  features: [string, string, string];
  badge: "live" | "soon" | "planned";
  accentColor: string;
  icon: LucideIcon;
}

const badgeLabels: Record<AppCardProps["badge"], string> = {
  live: "LIVE",
  soon: "COMING SOON",
  planned: "IN PLANUNG",
};

const badgeClasses: Record<AppCardProps["badge"], string> = {
  live: "badge-live",
  soon: "badge-soon",
  planned: "badge-planned",
};

export default function AppCard({
  name,
  tagline,
  features,
  badge,
  accentColor,
  icon: Icon,
}: AppCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  useMouseTilt(cardRef);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl p-8 flex flex-col gap-5 cursor-default"
      style={{
        background: "var(--card)",
        borderTop: `2px solid ${accentColor}`,
        borderLeft: "1px solid var(--border)",
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        willChange: "transform",
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${accentColor}18` }}
      >
        <Icon className="w-6 h-6" style={{ color: accentColor }} aria-hidden="true" />
      </div>

      {/* Name + badge */}
      <div className="flex items-start justify-between gap-3">
        <h3
          className="font-barlow font-bold leading-tight"
          style={{ fontSize: "1.4rem", color: "var(--text)" }}
        >
          {name}
        </h3>
        <span className={badgeClasses[badge]}>{badgeLabels[badge]}</span>
      </div>

      {/* Tagline */}
      <p className="font-manrope text-sm" style={{ color: "var(--text-muted)" }}>
        {tagline}
      </p>

      {/* Features */}
      <ul className="flex flex-col gap-2" aria-label="Features">
        {features.map((f, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-xs font-manrope"
            style={{ color: "var(--text-dim)" }}
          >
            <span style={{ color: accentColor }} aria-hidden="true">
              •
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
