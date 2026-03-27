import { useTranslations } from "next-intl";

export default function TrainingSection() {
  const t = useTranslations("training");

  const features = [0, 1, 2, 3, 4].map((i) => ({
    icon: t(`features.${i}.icon`),
    title: t(`features.${i}.title`),
    description: t(`features.${i}.description`),
  }));

  return (
    <section id="training" className="py-32 px-4 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left */}
          <div>
            <p className="section-number mb-4">{t("badge")}</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
              {t("title")}
            </h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">{t("subtitle")}</p>

            <div className="space-y-3 mb-10">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 hover:bg-white/3 group cursor-default"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-lg">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors mb-0.5">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={t("ctaUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm transition-all duration-200 hover:scale-105 btn-glow"
            >
              {t("cta")}
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Right: App Mockup */}
          <div className="relative animate-float">
            {/* Glow behind */}
            <div className="absolute -inset-8 bg-indigo-600/10 rounded-[3rem] blur-3xl" />

            {/* Browser frame */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 bg-[#0d1117]">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 mx-3 bg-[#0d1117] rounded-md px-3 py-1 text-[11px] text-slate-500 font-mono">
                  mylife-training.vercel.app
                </div>
              </div>

              {/* App content */}
              <div className="p-5 space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-500 mb-0.5">Heute · Push Day A</p>
                    <p className="text-sm font-bold text-white">Workout läuft…</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[11px] text-green-400 font-semibold">Live</span>
                  </div>
                </div>

                {/* Exercise list */}
                {[
                  { name: "Bankdrücken", sets: "4 × 8", weight: "80 kg", done: true, pct: 100 },
                  { name: "Schulterdrücken", sets: "3 × 10", weight: "50 kg", done: true, pct: 100 },
                  { name: "Trizeps Pushdown", sets: "3 × 12", weight: "35 kg", done: false, pct: 33 },
                ].map((ex, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      ex.done
                        ? "bg-indigo-500/8 border border-indigo-500/15"
                        : "bg-white/[0.03] border border-white/5"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        ex.done ? "bg-indigo-500 border-indigo-500" : "border-slate-600"
                      }`}
                    >
                      {ex.done && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm flex-1 font-medium ${ex.done ? "text-slate-300" : "text-white"}`}>
                      {ex.name}
                    </span>
                    <span className="text-xs text-slate-500 mr-2">{ex.sets}</span>
                    <span
                      className={`text-xs font-bold ${
                        ex.done ? "text-indigo-400" : "text-slate-400"
                      }`}
                    >
                      {ex.weight}
                    </span>
                  </div>
                ))}

                {/* Progress */}
                <div className="pt-1 space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Fortschritt</span>
                    <span className="text-indigo-400 font-semibold">2 / 3 Übungen</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                      style={{ width: "66%" }}
                    />
                  </div>
                </div>

                {/* Stat row */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {[
                    { label: "Volumen", value: "3.840 kg" },
                    { label: "Sätze", value: "10 / 15" },
                    { label: "Zeit", value: "34 min" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/3 rounded-xl px-3 py-2.5 text-center">
                      <p className="text-[10px] text-slate-500 mb-0.5">{s.label}</p>
                      <p className="text-xs font-bold text-white">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
