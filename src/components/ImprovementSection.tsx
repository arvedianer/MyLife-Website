import { useTranslations } from "next-intl";
import FadeUp from "./FadeUp";
import { Icons } from "./Icons";

const pillarIcons = [Icons.Dumbbell, Icons.PieChart, Icons.Watch, Icons.HeartPulse];

export default function ImprovementSection() {
  const t = useTranslations("improvement");
  const pillars = [0, 1, 2, 3].map((i) => ({
    label: t(`pillars.${i}.label`),
    Icon: pillarIcons[i]!,
  }));
  const benefits = [0, 1, 2, 3].map((i) => t(`benefits.${i}`));

  return (
    <section id="improvement" className="py-32 px-4 relative">
      <div className="divider absolute top-0 inset-x-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/6 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-20">
          <p className="label mb-4">{t("badge")}</p>
          <h2 className="text-5xl sm:text-6xl font-black tracking-tighter text-white mb-5">{t("title")}</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">{t("subtitle")}</p>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-28 items-center">

          {/* Left: Hub diagram */}
          <FadeUp delay={0.1} className="flex items-center justify-center min-h-[400px]">
            <div className="relative w-72 h-72">
              {/* Orbit rings */}
              <div className="absolute inset-0 rounded-full border border-white/4 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border border-violet-500/8" />

              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 flex flex-col items-center justify-center shadow-2xl shadow-indigo-500/30 border border-indigo-400/20 z-10">
                  <Icons.Sparkles className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Pillar nodes — positioned at top/right/bottom/left */}
              {pillars.map((p, i) => {
                const positions = [
                  { top: "-4px", left: "50%", transform: "translateX(-50%)" },
                  { top: "50%", right: "-4px", transform: "translateY(-50%)" },
                  { bottom: "-4px", left: "50%", transform: "translateX(-50%)" },
                  { top: "50%", left: "-4px", transform: "translateY(-50%)" },
                ];
                const colors = [
                  "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
                  "bg-amber-500/10 border-amber-500/20 text-amber-400",
                  "bg-green-500/10 border-green-500/20 text-green-400",
                  "bg-violet-500/10 border-violet-500/20 text-violet-400",
                ];
                return (
                  <div
                    key={i}
                    className="absolute z-20 flex flex-col items-center gap-1"
                    style={positions[i]}
                  >
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${colors[i]}`}>
                      <p.Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] text-slate-500 font-medium whitespace-nowrap">{p.label}</span>
                  </div>
                );
              })}
            </div>
          </FadeUp>

          {/* Right: Benefits */}
          <div>
            <FadeUp delay={0.05}>
              <p className="text-slate-500 mb-10 leading-relaxed">{t("description")}</p>
            </FadeUp>
            <ul className="space-y-3">
              {benefits.map((benefit, i) => (
                <FadeUp key={i} delay={0.1 + i * 0.08}>
                  <li className="flex items-start gap-4 p-4 card rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-default">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center mt-0.5">
                      <Icons.Check className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <span className="text-sm text-slate-300 leading-relaxed">{benefit}</span>
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
