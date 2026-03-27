import { useTranslations } from "next-intl";

export default function ImprovementSection() {
  const t = useTranslations("improvement");

  const pillars = [0, 1, 2, 3].map((i) => ({
    icon: t(`pillars.${i}.icon`),
    label: t(`pillars.${i}.label`),
  }));

  const benefits = [0, 1, 2, 3].map((i) => t(`benefits.${i}`));

  return (
    <section id="improvement" className="py-24 px-4 bg-gray-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-4">
            {t("badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Data flow diagram */}
          <div className="relative">
            <div className="glass rounded-2xl p-8">
              {/* Pillars */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {pillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <span className="text-2xl">{pillar.icon}</span>
                    <span className="text-sm font-medium text-gray-300">{pillar.label}</span>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-6 bg-gradient-to-b from-indigo-500 to-violet-500" />
                  <svg className="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L10 5.414 3.707 11.707a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 3z" clipRule="evenodd" transform="rotate(180 10 10)" />
                  </svg>
                  <div className="w-px h-6 bg-gradient-to-b from-violet-500 to-purple-500" />
                </div>
              </div>

              {/* Output */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 text-center">
                <span className="text-2xl mb-2 block">✨</span>
                <span className="font-semibold text-white">{t("combinesTo")}</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <p className="text-gray-400 mb-8 leading-relaxed">{t("description")}</p>
            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
