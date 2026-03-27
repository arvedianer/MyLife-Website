import { useTranslations } from "next-intl";

type CellValue = "yes" | "no" | "partial" | "planned";

function Cell({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  const base = highlight ? "opacity-100" : "opacity-70";
  if (value === "yes")
    return (
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${highlight ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-white/5"} ${base}`}>
        <svg className={`w-3.5 h-3.5 ${highlight ? "text-indigo-400" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  if (value === "no")
    return (
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/8 ${base}`}>
        <svg className="w-3 h-3 text-red-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    );
  if (value === "partial")
    return (
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/8 ${base}`}>
        <span className="text-yellow-500/60 text-xs font-bold">~</span>
      </span>
    );
  // planned
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-semibold whitespace-nowrap ${base}`}>
      Planned
    </span>
  );
}

export default function ComparisonTable() {
  const t = useTranslations("comparison");

  const features = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
    name: t(`features.${i}.name`),
    mylife: t(`features.${i}.mylife`) as CellValue,
    mfp: t(`features.${i}.mfp`) as CellValue,
    strava: t(`features.${i}.strava`) as CellValue,
    fitbit: t(`features.${i}.fitbit`) as CellValue,
  }));

  const competitors = [0, 1, 2].map((i) => ({
    name: t(`competitors.${i}`),
    desc: t(`competitorDescriptions.${i}`),
  }));

  return (
    <section id="comparison" className="py-32 px-4 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-number mb-4">{t("badge")}</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Competitor context pills */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {competitors.map((c, i) => (
            <div key={i} className="rounded-2xl bg-white/[0.02] border border-white/6 px-5 py-4">
              <p className="text-sm font-semibold text-slate-300 mb-1">{c.name}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[38%]">
                    Feature
                  </th>
                  {/* MyLife column — highlighted */}
                  <th className="px-4 py-4 text-center min-w-[100px] bg-indigo-500/8 border-x border-indigo-500/15">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                        <span className="text-white text-[9px] font-black">M</span>
                      </div>
                      <span className="text-xs font-bold text-indigo-300">{t("mylife")}</span>
                    </div>
                  </th>
                  {["MyFitnessPal", "Strava", "Fitbit"].map((c) => (
                    <th key={c} className="px-4 py-4 text-center min-w-[90px] text-xs font-semibold text-slate-500">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/4 hover:bg-white/[0.015] transition-colors ${
                      i % 2 === 1 ? "bg-white/[0.015]" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-slate-300">{row.name}</td>
                    {/* MyLife cell — highlighted column */}
                    <td className="px-4 py-4 text-center bg-indigo-500/5 border-x border-indigo-500/10">
                      <div className="flex justify-center">
                        <Cell value={row.mylife} highlight />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center"><Cell value={row.mfp} /></div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center"><Cell value={row.strava} /></div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center"><Cell value={row.fitbit} /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="px-6 py-4 border-t border-white/5 flex flex-wrap gap-5 text-xs text-slate-600">
            {[
              { sym: "✓", label: "Verfügbar", color: "text-slate-400" },
              { sym: "~", label: "Teilweise", color: "text-yellow-600" },
              { sym: "✗", label: "Nicht verfügbar", color: "text-red-600" },
              { sym: "★", label: t("planned"), color: "text-indigo-500" },
            ].map((l) => (
              <span key={l.label} className="flex items-center gap-1.5">
                <span className={l.color}>{l.sym}</span>
                {l.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
