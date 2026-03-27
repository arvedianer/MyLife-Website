"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function CTASection() {
  const t = useTranslations("cta");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="newsletter" className="py-32 px-4 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Main CTA card */}
        <div className="relative rounded-3xl overflow-hidden mb-6 card-gradient-border bg-[#0a0e1a]">
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/8 via-transparent to-violet-600/6" />
          {/* Top highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          <div className="relative z-10 px-8 py-16 sm:px-16 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wide uppercase mb-6">
              {t("badge")}
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
              {t("title")}
            </h2>

            <p className="text-lg text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
              {t("subtitle")}
            </p>

            <a
              href={t("primaryUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-lg transition-all duration-200 hover:scale-[1.04] btn-glow shadow-2xl"
            >
              {t("primaryButton")}
              <svg
                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            <p className="mt-4 text-xs text-slate-600">Kostenlos · Keine Kreditkarte · Sofort loslegen</p>
          </div>
        </div>

        {/* Newsletter card */}
        <div className="rounded-2xl bg-white/[0.025] border border-white/8 px-8 py-8 text-center">
          <h3 className="text-lg font-bold text-white mb-1">{t("newsletterTitle")}</h3>
          <p className="text-sm text-slate-500 mb-6">{t("newsletterSubtitle")}</p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-green-400 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Du bist dabei — wir melden uns! 🎉
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                required
                className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/40 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all duration-200 whitespace-nowrap"
              >
                {t("button")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
