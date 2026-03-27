import { useTranslations } from "next-intl";

export default function EcosystemOverview() {
  const t = useTranslations("ecosystem");

  const apps = [0, 1, 2].map((i) => ({
    name: t(`apps.${i}.name`),
    status: t(`apps.${i}.status`),
    statusType: t(`apps.${i}.statusType`),
    icon: t(`apps.${i}.icon`),
    description: t(`apps.${i}.description`),
    cta: t(`apps.${i}.cta`),
    ctaUrl: t(`apps.${i}.ctaUrl`),
  }));

  return (
    <section id="ecosystem" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            {t("badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* App cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {apps.map((app, i) => (
            <div
              key={i}
              className="relative glass rounded-2xl p-8 flex flex-col hover:border-indigo-500/30 transition-all duration-300 group"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/0 to-violet-600/0 group-hover:from-indigo-600/5 group-hover:to-violet-600/5 transition-all duration-300" />

              {/* Icon */}
              <div className="text-4xl mb-4">{app.icon}</div>

              {/* Badge */}
              <span
                className={`self-start mb-3 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  app.statusType === "beta"
                    ? "bg-green-500/15 text-green-400 border-green-500/25"
                    : "bg-amber-500/15 text-amber-400 border-amber-500/25"
                }`}
              >
                {app.status}
              </span>

              <h3 className="text-xl font-bold text-white mb-3">{app.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6">
                {app.description}
              </p>

              <a
                href={app.ctaUrl}
                target={app.ctaUrl.startsWith("http") ? "_blank" : undefined}
                rel={app.ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  app.statusType === "beta"
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                    : "border border-white/10 text-gray-300 hover:border-white/20 hover:text-white"
                }`}
              >
                {app.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
