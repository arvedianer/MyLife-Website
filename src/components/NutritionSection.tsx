"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import FadeUp from "./FadeUp";
import { Icons } from "./Icons";

const featureIcons = [Icons.PieChart, Icons.Link, Icons.UtensilsCrossed, Icons.Droplet, Icons.BarChart];

export default function NutritionSection() {
  const t = useTranslations("nutrition");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const features = [0, 1, 2, 3, 4].map((i) => ({
    title: t(`features.${i}.title`),
    description: t(`features.${i}.description`),
    Icon: featureIcons[i]!,
  }));

  return (
    <section id="nutrition" className="py-32 px-4 relative">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-28 items-center">

          {/* Left: Teaser mockup */}
          <FadeUp delay={0.15} className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 bg-amber-500/6 rounded-[3rem] blur-3xl pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d1117] shadow-2xl shadow-black/70">
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">Heute</p>
                  <p className="text-sm font-bold text-white">Ernährungs-Übersicht</p>
                </div>
                <span className="badge-soon">Coming Soon</span>
              </div>

              <div className="p-5 space-y-5">
                {/* Kaloriering + Makros */}
                <div className="flex items-center gap-5">
                  {/* Ring SVG */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#cg)" strokeWidth="2.5"
                        strokeDasharray="72 100" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-sm font-black text-white">1.820</p>
                      <p className="text-[9px] text-slate-600">kcal</p>
                    </div>
                  </div>

                  {/* Makros */}
                  <div className="flex-1 space-y-2.5">
                    {[
                      { label: "Protein", val: "142g", pct: 78, color: "#6366f1" },
                      { label: "Carbs", val: "198g", pct: 60, color: "#f59e0b" },
                      { label: "Fett", val: "54g", pct: 43, color: "#ef4444" },
                    ].map((m) => (
                      <div key={m.label}>
                        <div className="flex justify-between mb-1">
                          <span className="text-[11px] text-slate-500">{m.label}</span>
                          <span className="text-[11px] text-slate-300 font-semibold tabular-nums">{m.val}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color, opacity: 0.75 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meals */}
                <div className="space-y-2">
                  {[
                    { name: "Frühstück", kcal: "480 kcal", sub: "Haferflocken · Banane · Protein", icon: Icons.Flame },
                    { name: "Mittagessen", kcal: "720 kcal", sub: "Hähnchen · Reis · Brokkoli", icon: Icons.UtensilsCrossed },
                    { name: "+ Mahlzeit hinzufügen", kcal: null, sub: null, icon: null },
                  ].map((meal, i) => (
                    <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${
                      meal.kcal
                        ? "bg-white/[0.025] border border-white/5"
                        : "border border-dashed border-white/8 hover:border-white/15 transition-colors"
                    }`}>
                      {meal.kcal ? (
                        <>
                          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-amber-400 flex-shrink-0">
                            {meal.icon && <meal.icon className="w-3.5 h-3.5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white">{meal.name}</p>
                            <p className="text-[10px] text-slate-600 truncate">{meal.sub}</p>
                          </div>
                          <span className="text-xs font-bold text-amber-400 tabular-nums">{meal.kcal}</span>
                        </>
                      ) : (
                        <span className="text-xs text-slate-700 mx-auto">{meal.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <FadeUp>
              <p className="label mb-4">{t("badge")}</p>
              <h2 className="text-5xl sm:text-6xl font-black tracking-tighter text-white mb-5 leading-tight">
                {t("title")}
              </h2>
              <p className="text-lg text-slate-500 mb-3 leading-relaxed">{t("subtitle")}</p>
              <p className="text-slate-600 mb-10 leading-relaxed text-sm">{t("description")}</p>
            </FadeUp>

            <div className="space-y-3 mb-10">
              {features.map((f, i) => (
                <FadeUp key={i} delay={0.05 + i * 0.07}>
                  <div className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-amber-500/8 border border-amber-500/12 flex items-center justify-center text-amber-400 mt-0.5">
                      <f.Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-300">{f.title} </span>
                      <span className="text-sm text-slate-600">— {f.description}</span>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.4}>
              <div className="card rounded-2xl p-5 bg-[#0f172a]">
                <p className="text-sm font-bold text-white mb-3">{t("notifyLabel")}</p>
                {submitted ? (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Icons.Check className="w-4 h-4" />
                    Eingetragen — du wirst benachrichtigt!
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("notifyPlaceholder")}
                      required
                      className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/8 text-white placeholder-slate-700 text-sm focus:outline-none focus:border-amber-500/30 transition-colors cursor-text"
                    />
                    <button type="submit" className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap">
                      {t("notifyButton")}
                    </button>
                  </form>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
