import { useTranslations } from "next-intl";

export default function ImprovementSection() {
  const t = useTranslations("improvement");

  const pillars = [0, 1, 2, 3].map((i) => ({
    icon: t(`pillars.${i}.icon`),
    label: t(`pillars.${i}.label`),
  }));

  const benefits = [0, 1, 2, 3].map((i) => t(`benefits.${i}`));

  return (
    <section id="improvement" className="py-32 px-4 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/8 to-transparent pointer-events-none" />

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

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left: Hub visualization */}
          <div className="relative flex items-center justify-center min-h-[380px]">
            {/* Outer glow ring */}
            <div className="absolute w-72 h-72 rounded-full border border-indigo-500/10 animate-spin-slow" />
            <div className="absolute w-52 h-52 rounded-full border border-violet-500/15" />

            {/* Center node */}
            <div className="absolute z-20 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex flex-col items-center justify-center shadow-2xl shadow-indigo-500/30 border border-indigo-400/30">
              <span className="text-2xl">✨</span>
              <span className="text-[9px] text-indigo-200 font-bold mt-0.5 text-center leading-tight px-2">
                {t("combinesTo").split(" ")[0]}
              </span>
            </div>

            {/* Pillar nodes */}
            {pillars.map((p, i) => {
              const angles = [-90, 0, 90, 180];
              const angle = ((angles[i] ?? 0) * Math.PI) / 180;
              const r = 130;
              const x = r * Math.cos(angle);
              const y = r * Math.sin(angle);

              return (
                <div
                  key={i}
                  className="absolute z-10"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  {/* Connector line */}
                  <div
                    className="absolute top-1/2 left-1/2 bg-gradient-to-r from-indigo-500/30 to-transparent h-px"
                    style={{
                      width: `${r - 48}px`,
                      transform: `rotate(${angles[i] + 180}deg)`,
                      transformOrigin: "left center",
                    }}
                  />
                  {/* Node */}
                  <div className="relative w-14 h-14 rounded-2xl bg-[#0f172a] border border-white/10 flex flex-col items-center justify-center gap-0.5 -translate-x-1/2 -translate-y-1/2 shadow-lg">
                    <span className="text-lg">{p.icon}</span>
                    <span className="text-[9px] text-slate-400 font-medium">{p.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Benefits */}
          <div>
            <p className="text-slate-400 mb-10 leading-relaxed">{t("description")}</p>

            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-2xl card-gradient-border bg-[#0f172a] transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-3.5 h-3.5 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
