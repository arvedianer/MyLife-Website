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
    <section id="nutrition" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: features */}
          <div className="space-y-4 order-2 lg:order-1">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 glass rounded-xl opacity-80 hover:opacity-100 transition-all duration-200"
              >
                <div className="text-2xl mt-0.5 flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-4">
              {t("badge")}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-400 mb-4 leading-relaxed">
              {t("subtitle")}
            </p>
            <p className="text-gray-500 mb-8 leading-relaxed">
              {t("description")}
            </p>

            {/* Notify form */}
            <div className="glass rounded-2xl p-6">
              <p className="text-sm text-gray-300 font-medium mb-3">
                {t("notifyLabel")}
              </p>
              {submitted ? (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ✓ Eingetragen!
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setSubmitted(true);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("notifyPlaceholder")}
                    required
                    className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors"
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
