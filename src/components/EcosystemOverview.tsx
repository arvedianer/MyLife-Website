import { useTranslations } from "next-intl";
import FadeUp from "./FadeUp";
import { Icons } from "./Icons";

const appIcons = [Icons.Dumbbell, Icons.PieChart, Icons.Brain];
const accentColors = [
  "text-indigo-400 bg-indigo-500/10 border-indigo-500/15",
  "text-amber-400 bg-amber-500/10 border-amber-500/15",
  "text-violet-400 bg-violet-500/10 border-violet-500/15",
];

export default function EcosystemOverview() {
  const t = useTranslations("ecosystem");

  const apps = [0, 1, 2].map((i) => ({
    name: t(`apps.${i}.name`),
    status: t(`apps.${i}.status`),
    statusType: t(`apps.${i}.statusType`),
    description: t(`apps.${i}.description`),
    cta: t(`apps.${i}.cta`),
    ctaUrl: t(`apps.${i}.ctaUrl`),
    Icon: appIcons[i]!,
    accent: accentColors[i]!,
  }));

  return (
    <section id="ecosystem" className="py-32 px-4 relative">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-20">
          <p className="label mb-4">{t("badge")}</p>
          <h2 className="text-5xl sm:text-6xl font-black tracking-tighter text-white mb-5">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-4">
          {apps.map((app, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className={`steam-card rounded-2xl p-8 flex flex-col h-full group cursor-default ${
                app.statusType === "beta" ? "ring-1 ring-indigo-500/20" : ""
              }`}>
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-5 ${app.accent}`}>
                  <app.Icon className="w-5 h-5" />
                </div>

                {/* Status */}
                <span className={app.statusType === "beta" ? "badge-beta" : "badge-soon"}>
                  {app.statusType === "beta" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  )}
                  {app.status}
                </span>

                <h3 className="text-lg font-bold text-white mt-4 mb-2">{app.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-grow mb-8">{app.description}</p>

                <a
                  href={app.ctaUrl}
                  target={app.ctaUrl.startsWith("http") ? "_blank" : undefined}
                  rel={app.ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 cursor-pointer group/link ${
                    app.statusType === "beta"
                      ? "text-indigo-400 hover:text-indigo-300"
                      : "text-slate-600 hover:text-slate-300"
                  }`}
                >
                  {app.cta}
                  <Icons.ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
