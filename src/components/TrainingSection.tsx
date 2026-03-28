import { useTranslations } from "next-intl";
import FadeUp from "./FadeUp";
import { Icons } from "./Icons";

const featureIcons = [Icons.Clipboard, Icons.Calendar, Icons.BarChart, Icons.RefreshCw, Icons.Zap];

export default function TrainingSection() {
  const t = useTranslations("training");

  const features = [0, 1, 2, 3, 4].map((i) => ({
    title: t(`features.${i}.title`),
    description: t(`features.${i}.description`),
    Icon: featureIcons[i]!,
  }));

  return (
    <section id="training" className="py-32 px-4 relative">
      <div className="divider absolute top-0 inset-x-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/6 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-28 items-center">

          {/* Left: Content */}
          <div>
            <FadeUp>
              <p className="label mb-4">{t("badge")}</p>
              <h2 className="text-5xl sm:text-6xl font-black tracking-tighter text-white mb-5 leading-tight">
                {t("title")}
              </h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">{t("subtitle")}</p>
            </FadeUp>

            <div className="space-y-2 mb-10">
              {features.map((f, i) => (
                <FadeUp key={i} delay={0.05 + i * 0.08}>
                  <div className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-white/3 group cursor-default">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-indigo-500/8 border border-indigo-500/12 flex items-center justify-center text-indigo-400 mt-0.5">
                      <f.Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors mb-0.5">
                        {f.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.5}>
              <a
                href={t("ctaUrl")}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-primary inline-flex items-center gap-3 px-8 py-4 text-sm"
              >
                {t("cta")}
                <Icons.ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </FadeUp>
          </div>

          {/* Right: App Mockup */}
          <FadeUp delay={0.2} className="relative animate-float">
            {/* Glow */}
            <div className="absolute -inset-10 bg-indigo-600/8 rounded-[3rem] blur-3xl pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 rounded-2xl pointer-events-none" />

            {/* Browser frame */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/70 bg-[#0d1117]">
              {/* Chrome bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 mx-4 bg-[#0d1117] rounded-md px-3 py-1.5 text-[11px] text-slate-600 font-mono">
                  mylife-training.vercel.app
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-500/8 border border-green-500/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-green-400 font-bold">LIVE</span>
                </div>
              </div>

              {/* App UI */}
              <div className="p-5 space-y-4">
                {/* Workout header */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">Montag · Push Day A</p>
                    <p className="text-base font-bold text-white">Workout läuft…</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-600 mb-0.5">Dauer</p>
                    <p className="text-sm font-bold text-indigo-400 tabular-nums">34:12</p>
                  </div>
                </div>

                {/* Exercise rows */}
                {[
                  { name: "Bankdrücken", sets: "4 × 8", weight: "80 kg", done: true },
                  { name: "Schulterdrücken", sets: "3 × 10", weight: "50 kg", done: true },
                  { name: "Trizeps Pushdown", sets: "3 × 12", weight: "35 kg", done: false },
                ].map((ex, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                      ex.done
                        ? "bg-indigo-500/8 border border-indigo-500/12"
                        : "bg-white/[0.02] border border-white/5"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        ex.done ? "bg-indigo-500 border-indigo-500" : "border-slate-700"
                      }`}
                    >
                      {ex.done && <Icons.Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className={`text-sm flex-1 ${ex.done ? "text-slate-400" : "text-white font-medium"}`}>
                      {ex.name}
                    </span>
                    <span className="text-xs text-slate-600 mr-2 tabular-nums">{ex.sets}</span>
                    <span className={`text-xs font-bold tabular-nums ${ex.done ? "text-indigo-400" : "text-slate-400"}`}>
                      {ex.weight}
                    </span>
                  </div>
                ))}

                {/* Progress bar */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-600">Session-Fortschritt</span>
                    <span className="text-indigo-400 font-bold">2 / 3 Übungen</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { icon: Icons.Activity, label: "Volumen", value: "3.840 kg" },
                    { icon: Icons.Clipboard, label: "Sätze", value: "10 / 15" },
                    { icon: Icons.Zap, label: "PRs heute", value: "2 neue" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/[0.025] rounded-xl px-3 py-2.5 text-center">
                      <s.icon className="w-3.5 h-3.5 text-indigo-400 mx-auto mb-1" />
                      <p className="text-[9px] text-slate-600 mb-0.5 uppercase tracking-wide">{s.label}</p>
                      <p className="text-xs font-bold text-white tabular-nums">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
