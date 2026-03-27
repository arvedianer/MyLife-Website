"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function CTASection() {
  const t = useTranslations("cta");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="newsletter" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA */}
        <div className="relative glass rounded-3xl p-12 text-center overflow-hidden mb-8">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-violet-600/5 to-purple-600/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              {t("badge")}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
              {t("subtitle")}
            </p>
            <a
              href={t("primaryUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-lg shadow-2xl shadow-indigo-500/30 transition-all duration-200 hover:scale-105"
            >
              {t("primaryButton")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">{t("newsletterTitle")}</h3>
          <p className="text-gray-400 mb-6">{t("newsletterSubtitle")}</p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-green-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Du bist dabei! / You&apos;re in!</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                required
                className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors whitespace-nowrap"
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
