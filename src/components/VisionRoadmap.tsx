import { useTranslations } from "next-intl";

export default function VisionRoadmap() {
  const t = useTranslations("roadmap");

  const items = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    icon: t(`items.${i}.icon`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  return (
    <section id="vision" className="py-24 px-4 bg-gray-900/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            {t("badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Roadmap grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative glass rounded-xl p-6 group hover:border-purple-500/20 transition-all duration-300"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600/0 to-indigo-600/0 group-hover:from-purple-600/5 group-hover:to-indigo-600/5 transition-all duration-300" />

              <div className="relative z-10">
                <div className="text-3xl mb-3">{item.icon}</div>

                <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-3">
                  {t("plannedBadge")}
                </span>

                <h3 className="font-semibold text-white mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
