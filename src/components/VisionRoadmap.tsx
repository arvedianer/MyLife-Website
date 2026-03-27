import { useTranslations } from "next-intl";

export default function VisionRoadmap() {
  const t = useTranslations("roadmap");

  const items = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    icon: t(`items.${i}.icon`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  return (
    <section id="vision" className="py-32 px-4 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/8 to-transparent pointer-events-none" />

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

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative group rounded-2xl p-6 card-gradient-border bg-[#0a0e1a] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 to-indigo-600/0 group-hover:from-violet-600/6 group-hover:to-indigo-600/4 transition-all duration-300" />

              <div className="relative z-10">
                {/* Number + icon row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/8 flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-black text-white/15 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Badge */}
                <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/8 border border-amber-500/15 text-[10px] text-amber-400 font-bold mb-3">
                  {t("plannedBadge")}
                </span>

                <h3 className="font-bold text-white text-sm mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[12px] text-slate-500 leading-relaxed">
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
