"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function NutritionSection() {
  const t = useTranslations("nutrition");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const features = [0, 1, 2, 3, 4].map((i) => ({
    icon: t(`features.${i}.icon`),
    title: t(`features.${i}.title`),
    description: t(`features.${i}.description`),
  }));

  return (
    <section id="nutrition" className="py-32 px-4 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left: Teaser mockup */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-8 bg-amber-500/6 rounded-[3rem] blur-3xl" />

            <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d1117] shadow-2xl shadow-black/60">
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Heute</p>
                  <p className="text-sm font-bold text-white">Ernährungs-Übersicht</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-400 font-bold">
                  Coming Soon
                </span>
              </div>

              <div className="p-5 space-y-5">
                {/* Kaloriering */}
                <div className="flex items-center gap-6">
                  {/* Ring */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.9"
                        fill="none"
                        stroke="url(#cal-grad)"
                        strokeWidth="3"
                        strokeDasharray="70 100"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="cal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-xs font-black text-white leading-none">1.820</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">kcal</p>
                    </div>
                  </div>

                  {/* Makros */}
                  <div className="flex-1 space-y-2">
                    {[
                      { label: "Protein", val: "142g", pct: 80, color: "bg-blue-500" },
                      { label: "Carbs", val: "198g", pct: 60, color: "bg-amber-500" },
                      { label: "Fett", val: "54g", pct: 45, color: "bg-red-400" },
                    ].map((m) => (
                      <div key={m.label}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-slate-400">{m.label}</span>
                          <span className="text-slate-300 font-semibold">{m.val}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${m.color} opacity-70`}
                            style={{ width: `${m.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mahlzeiten */}
                <div className="space-y-2">
                  {[
                    { name: "Frühstück", kcal: 480, items: "Haferflocken · Banane · Protein" },
                    { name: "Mittagessen", kcal: 720, items: "Hähnchen · Reis · Brokkoli" },
                    { name: "+ Mahlzeit hinzufügen", kcal: null, items: null },
                  ].map((meal, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                        meal.kcal === null
                          ? "border border-dashed border-white/10 text-slate-600 hover:text-slate-400 cursor-pointer"
                          : "bg-white/3 border border-white/5"
                      }`}
                    >
                      {meal.kcal !== null ? (
                        <>
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-sm">🍽️</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white">{meal.name}</p>
                            <p className="text-[10px] text-slate-500 truncate">{meal.items}</p>
                          </div>
                          <span className="text-xs font-bold text-amber-400">{meal.kcal} kcal</span>
                        </>
                      ) : (
                        <span className="text-xs mx-auto">{meal.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="order-1 lg:order-2">
            <p className="section-number mb-4">{t("badge")}</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
              {t("title")}
            </h2>
            <p className="text-lg text-slate-400 mb-4 leading-relaxed">{t("subtitle")}</p>
            <p className="text-slate-500 mb-10 leading-relaxed">{t("description")}</p>

            {/* Features */}
            <div className="space-y-3 mb-10">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 opacity-70 hover:opacity-100 transition-opacity">
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-sm mt-0.5">
                    {f.icon}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-300">{f.title}</span>
                    <span className="text-slate-500"> — </span>
                    <span className="text-sm text-slate-500">{f.description}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Notify form */}
            <div className="card-gradient-border rounded-2xl p-5 bg-[#0f172a]">
              <p className="text-sm font-semibold text-white mb-3">{t("notifyLabel")}</p>
              {submitted ? (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Eingetragen — du wirst benachrichtigt!
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("notifyPlaceholder")}
                    required
                    className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-amber-500/40 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-all duration-200 whitespace-nowrap"
                  >
                    {t("notifyButton")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
