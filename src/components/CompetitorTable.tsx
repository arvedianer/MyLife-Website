"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import FadeUp from "./FadeUp";

type CellValue = true | false | "partial";

interface Row {
  key: string;
  values: [CellValue, CellValue, CellValue, CellValue];
}

const ROWS: Row[] = [
  { key: "feature0", values: [true,  false, false, false] },
  { key: "feature1", values: [true,  false, false, false] },
  { key: "feature2", values: [true,  false, false, false] },
  { key: "feature3", values: [true,  false, false, false] },
  { key: "feature4", values: [true,  false, false, false] },
  { key: "feature5", values: [true,  true,  false, false] },
  { key: "feature6", values: [true,  false, false, false] },
  { key: "feature7", values: [true,  false, false, false] },
];

const APPS = ["MyLife Training", "Hevy", "Strong", "FitNotes"];

function Cell({ value, highlight }: { value: CellValue; highlight: boolean }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: highlight ? "rgba(77,255,237,0.15)" : "rgba(52,199,89,0.1)" }}
        >
          <Check
            className="w-3.5 h-3.5"
            style={{ color: highlight ? "var(--cyan)" : "#34C759" }}
            aria-hidden="true"
          />
        </div>
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="flex justify-center">
        <Minus className="w-4 h-4" style={{ color: "var(--text-dim)" }} aria-hidden="true" />
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <X className="w-3.5 h-3.5" style={{ color: "var(--text-dim)", opacity: 0.4 }} aria-hidden="true" />
    </div>
  );
}

export default function CompetitorTable() {
  const t = useTranslations("training.comparison");

  return (
    <FadeUp>
      <div className="max-w-3xl">
        <p className="font-manrope text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cyan)" }}>
          Vergleich
        </p>
        <h3 className="font-barlow font-black text-white tracking-tight mb-2" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}>
          {t("headline")}
        </h3>
        <p className="font-manrope text-sm mb-8" style={{ color: "var(--text-muted)" }}>
          {t("subline")}
        </p>

        <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--border)" }}>
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th
                  className="text-left px-5 py-4 font-manrope text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-dim)", width: "40%" }}
                >
                  Feature
                </th>
                {APPS.map((app, i) => (
                  <th
                    key={app}
                    className="px-3 py-4 text-center font-manrope text-xs font-bold"
                    style={{
                      color: i === 0 ? "var(--cyan)" : "var(--text-muted)",
                      background: i === 0 ? "rgba(77,255,237,0.04)" : "transparent",
                    }}
                  >
                    {i === 0 ? (
                      <span className="flex flex-col items-center gap-1.5">
                        <span>{app}</span>
                        <span className="badge-live">LIVE</span>
                      </span>
                    ) : (
                      app
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, rowIdx) => (
                <motion.tr
                  key={row.key}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: rowIdx * 0.05 }}
                  style={{
                    borderBottom: rowIdx < ROWS.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <td className="px-5 py-3.5 font-manrope text-sm" style={{ color: "var(--text-muted)" }}>
                    {t(row.key as Parameters<typeof t>[0])}
                  </td>
                  {row.values.map((val, colIdx) => (
                    <td
                      key={colIdx}
                      className="px-3 py-3.5 text-center"
                      style={{
                        background: colIdx === 0 ? "rgba(77,255,237,0.02)" : "transparent",
                      }}
                    >
                      <Cell value={val} highlight={colIdx === 0} />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-manrope text-xs mt-3" style={{ color: "var(--text-dim)" }}>
          Stand: März 2026 — kostenlose Versionen verglichen.
        </p>
      </div>
    </FadeUp>
  );
}
