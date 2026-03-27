import { useTranslations } from "next-intl";

type CellValue = "yes" | "no" | "partial" | "planned";

function Cell({ value, isMyLife }: { value: CellValue; isMyLife?: boolean }) {
  if (value === "yes") {
    return (
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${isMyLife ? "bg-green-500/20 border border-green-500/30" : "bg-gray-700/50"}`}>
        <svg className={`w-4 h-4 ${isMyLife ? "text-green-400" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/10">
        <svg className="w-4 h-4 text-red-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/10">
        <span className="text-yellow-500/70 text-sm font-bold">~</span>
      </span>
    );
  }
  // planned
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 text-xs font-medium whitespace-nowrap">
      ★ Planned
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
    description: t(`competitorDescriptions.${i}`),
  }));

  return (
    <section id="comparison" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            {t("badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Competitor context */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {competitors.map((c, i) => (
            <div key={i} className="glass rounded-xl p-5">
              <h4 className="font-semibold text-gray-300 mb-2">{c.name}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 w-1/3">Feature</th>
                  <th className="px-4 py-4 text-center">
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
                      {t("mylife")}
                    </span>
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-gray-400">MyFitnessPal</th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-gray-400">Strava</th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-gray-400">Fitbit</th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/5 transition-colors hover:bg-white/2 ${
                      i % 2 === 0 ? "" : "bg-white/[0.02]"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-300">{row.name}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center">
                        <Cell value={row.mylife} isMyLife />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center">
                        <Cell value={row.mfp} />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center">
                        <Cell value={row.strava} />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center">
                        <Cell value={row.fitbit} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="px-6 py-4 border-t border-white/5 flex flex-wrap gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              Verfügbar / Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500/70 font-bold text-xs">~</span>
              Teilweise / Partial
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-red-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              Nicht verfügbar / Not available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 text-xs">★ Planned</span>
              {t("planned")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
