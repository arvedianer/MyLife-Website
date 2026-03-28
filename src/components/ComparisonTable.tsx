import { useTranslations } from "next-intl";
import FadeUp from "./FadeUp";
import { Icons } from "./Icons";

type Val = "yes" | "no" | "partial" | "planned";

function Cell({ v, hl }: { v: Val; hl?: boolean }) {
  if (v === "yes")
    return (
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${hl ? "bg-indigo-500/15 border border-indigo-500/25" : "bg-white/5"}`}>
        <Icons.Check className={`w-3.5 h-3.5 ${hl ? "text-indigo-400" : "text-slate-500"}`} />
      </span>
    );
  if (v === "no")
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/6">
        <Icons.X className="w-3 h-3 text-red-500/40" />
      </span>
    );
  if (v === "partial")
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/6">
        <span className="text-yellow-500/50 text-xs font-black">~</span>
      </span>
    );
  return <span className="badge-planned text-[10px] px-2 py-0.5">Planned</span>;
}

export default function ComparisonTable() {
  const t = useTranslations("comparison");

  const features = [0,1,2,3,4,5,6,7,8,9].map((i) => ({
    name: t(`features.${i}.name`),
    mylife: t(`features.${i}.mylife`) as Val,
    mfp: t(`features.${i}.mfp`) as Val,
    strava: t(`features.${i}.strava`) as Val,
    fitbit: t(`features.${i}.fitbit`) as Val,
  }));

  const competitors = [0,1,2].map((i) => ({
    name: t(`competitors.${i}`),
    desc: t(`competitorDescriptions.${i}`),
  }));

  return (
    <section id="comparison" className="py-32 px-4 relative">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="label mb-4">{t("badge")}</p>
          <h2 className="text-5xl sm:text-6xl font-black tracking-tighter text-white mb-5">{t("title")}</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">{t("subtitle")}</p>
        </FadeUp>

        {/* Competitor cards */}
        <FadeUp delay={0.1}>
          <div className="grid md:grid-cols-3 gap-3 mb-8">
            {competitors.map((c, i) => (
              <div key={i} className="card rounded-xl px-5 py-4 cursor-default">
                <p className="text-sm font-bold text-slate-300 mb-1">{c.name}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Table */}
        <FadeUp delay={0.2}>
          <div className="rounded-2xl border border-white/7 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/6">
                    <th className="text-left px-6 py-5 text-[11px] font-bold text-slate-600 uppercase tracking-widest w-[36%]">
                      Feature
                    </th>
                    {/* MyLife — highlighted */}
                    <th className="px-4 py-5 text-center min-w-[110px] bg-indigo-500/6 border-x border-indigo-500/12">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                          <span className="text-white text-[9px] font-black">M</span>
                        </div>
                        <span className="text-xs font-bold text-indigo-300">{t("mylife")}</span>
                      </div>
                    </th>
                    {["MyFitnessPal","Strava","Fitbit"].map((c) => (
                      <th key={c} className="px-4 py-5 text-center min-w-[90px] text-[11px] font-semibold text-slate-600">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((row, i) => (
                    <tr key={i} className={`border-b border-white/3 hover:bg-white/[0.012] transition-colors ${i % 2 === 1 ? "bg-white/[0.012]" : ""}`}>
                      <td className="px-6 py-4 text-sm text-slate-400 cursor-default">{row.name}</td>
                      <td className="px-4 py-4 text-center bg-indigo-500/4 border-x border-indigo-500/8">
                        <div className="flex justify-center"><Cell v={row.mylife} hl /></div>
                      </td>
                      <td className="px-4 py-4 text-center"><div className="flex justify-center"><Cell v={row.mfp} /></div></td>
                      <td className="px-4 py-4 text-center"><div className="flex justify-center"><Cell v={row.strava} /></div></td>
                      <td className="px-4 py-4 text-center"><div className="flex justify-center"><Cell v={row.fitbit} /></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="px-6 py-4 border-t border-white/4 flex flex-wrap gap-5 text-xs text-slate-700">
              {[
                { icon: <Icons.Check className="w-3 h-3 text-slate-500" />, label: "Verfügbar" },
                { icon: <span className="text-yellow-500/50 font-black">~</span>, label: "Teilweise" },
                { icon: <Icons.X className="w-3 h-3 text-red-500/40" />, label: "Nicht verfügbar" },
                { icon: <span className="text-indigo-400 font-bold text-[10px]">★</span>, label: t("planned") },
              ].map((l, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {l.icon} {l.label}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
