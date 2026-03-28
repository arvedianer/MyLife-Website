import { useTranslations } from "next-intl";
import FadeUp from "./FadeUp";
import { Icons } from "./Icons";

const roadmapIcons = [
  Icons.Bot,
  Icons.Camera,
  Icons.Moon,
  Icons.Apple,
  Icons.Trophy,
  Icons.HeartPulse,
  Icons.Watch,
  Icons.WifiOff,
];

const iconColors = [
  "text-indigo-400",
  "text-violet-400",
  "text-blue-400",
  "text-green-400",
  "text-amber-400",
  "text-pink-400",
  "text-cyan-400",
  "text-slate-400",
];

const iconBgs = [
  "bg-indigo-500/8 border-indigo-500/15",
  "bg-violet-500/8 border-violet-500/15",
  "bg-blue-500/8 border-blue-500/15",
  "bg-green-500/8 border-green-500/15",
  "bg-amber-500/8 border-amber-500/15",
  "bg-pink-500/8 border-pink-500/15",
  "bg-cyan-500/8 border-cyan-500/15",
  "bg-slate-500/8 border-slate-500/15",
];

export default function VisionRoadmap() {
  const t = useTranslations("roadmap");

  const items = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    Icon: roadmapIcons[i],
    color: iconColors[i],
    bg: iconBgs[i],
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  return (
    <section id="vision" className="py-32 px-4 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/8 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-20">
          <span className="label">{t("badge")}</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mt-4 mb-5">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </FadeUp>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <div className="relative group h-full rounded-2xl p-6 steam-card transition-all duration-300 hover:-translate-y-1 cursor-default">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 to-indigo-600/0 group-hover:from-violet-600/6 group-hover:to-indigo-600/4 transition-all duration-300" />

                <div className="relative z-10">
                  {/* Number + icon row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${item.bg} ${item.color}`}>
                      <item.Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-white/15 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Badge */}
                  <span className="badge-planned mb-3">
                    {t("plannedBadge")}
                  </span>

                  <h3 className="font-bold text-white text-sm mb-2 leading-tight mt-3">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
