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
    <section id="ecosystem" className="py-32 px-4 relative">
      {/* Subtle section separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="section-number mb-4">{t("badge")}</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {apps.map((app, i) => (
            <div
              key={i}
              className={`relative group rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 card-gradient-border ${
                i === 0 ? "md:col-span-1 ring-1 ring-indigo-500/20" : ""
              }`}
            >
              {/* Hover glow */}
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  i === 0
                    ? "bg-gradient-to-br from-indigo-600/8 to-violet-600/4"
                    : "bg-gradient-to-br from-white/3 to-transparent"
                }`}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5 ${
                    i === 0
                      ? "bg-indigo-500/15 border border-indigo-500/20"
                      : "bg-white/5 border border-white/8"
                  }`}
                >
                  {app.icon}
                </div>

                {/* Badge */}
                <span
                  className={`self-start mb-4 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase border ${
                    app.statusType === "beta"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}
                >
                  {app.status}
                </span>

                <h3 className="text-xl font-bold text-white mb-3">{app.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed flex-grow mb-7">
                  {app.description}
                </p>

                <a
                  href={app.ctaUrl}
                  target={app.ctaUrl.startsWith("http") ? "_blank" : undefined}
                  rel={
                    app.ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group/link ${
                    app.statusType === "beta"
                      ? "text-indigo-400 hover:text-indigo-300"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {app.cta}
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
