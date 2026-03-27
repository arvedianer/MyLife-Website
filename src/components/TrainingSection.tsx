import { useTranslations } from "next-intl";

export default function TrainingSection() {
  const t = useTranslations("training");

  const features = [0, 1, 2, 3, 4].map((i) => ({
    icon: t(`features.${i}.icon`),
    title: t(`features.${i}.title`),
    description: t(`features.${i}.description`),
  }));

  return (
    <section id="training" className="py-24 px-4 bg-gray-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-4">
              {t("badge")}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {t("subtitle")}
            </p>
            <a
              href={t("ctaUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:scale-105"
            >
              {t("cta")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Right: features */}
          <div className="space-y-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 glass rounded-xl hover:border-indigo-500/20 transition-all duration-200 group"
              >
                <div className="text-2xl mt-0.5 flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
