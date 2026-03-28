"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, X, AlertTriangle } from "lucide-react";

type CellValue = "yes" | "no" | "partial";

const rows: { key: string; values: [CellValue, CellValue, CellValue, CellValue] }[] = [
  { key: "feature0", values: ["yes", "partial", "partial", "yes"] },
  { key: "feature1", values: ["yes", "no", "no", "no"] },
  { key: "feature2", values: ["yes", "no", "no", "no"] },
  { key: "feature3", values: ["yes", "no", "no", "no"] },
  { key: "feature4", values: ["yes", "yes", "no", "no"] },
  { key: "feature5", values: ["yes", "no", "no", "no"] },
  { key: "feature6", values: ["yes", "yes", "yes", "no"] },
  { key: "feature7", values: ["yes", "no", "no", "no"] },
];

const competitors = ["MyLife", "Hevy", "Strong", "FitNotes"];

const partialLabels: Record<string, string> = {
  feature0: "Abo",
};

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CompetitorTable() {
  const t = useTranslations("training.comparison");

  return (
    <div>
      {/* Heading */}
      <div className="mb-10">
        <h3
          className="font-barlow font-black text-white tracking-tight mb-2"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          {t("headline")}
        </h3>
        <p className="font-manrope text-sm" style={{ color: "var(--text-muted)" }}>
          {t("subline")}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border)" }}>
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th
                className="px-4 py-4 text-left font-manrope text-xs font-semibold"
                style={{ color: "var(--text-dim)", width: "35%" }}
              >
                Feature
              </th>
              {competitors.map((c, i) => (
                <th
                  key={c}
                  className="px-4 py-4 text-center font-manrope text-xs font-bold"
                  style={{
                    color: i === 0 ? "var(--cyan)" : "var(--text-dim)",
                    background: i === 0 ? "rgba(77,255,237,0.04)" : "transparent",
                    borderLeft: i === 0 ? "1px solid rgba(77,255,237,0.15)" : "none",
                    borderRight: i === 0 ? "1px solid rgba(77,255,237,0.15)" : "none",
                  }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ key, values }, rowIndex) => (
              <motion.tr
                key={key}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: rowIndex * 0.05, ease }}
                style={{ borderBottom: rowIndex < rows.length - 1 ? "1px solid var(--border)" : "none" }}
              >
                <td className="px-4 py-4 font-manrope text-sm" style={{ color: "var(--text-muted)" }}>
                  {t(key)}
                </td>
                {values.map((v, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-4 text-center"
                    style={{
                      background: colIndex === 0 ? "rgba(77,255,237,0.03)" : "transparent",
                      borderLeft: colIndex === 0 ? "1px solid rgba(77,255,237,0.1)" : "none",
                      borderRight: colIndex === 0 ? "1px solid rgba(77,255,237,0.1)" : "none",
                    }}
                  >
                    {v === "yes" && (
                      <span className="inline-flex items-center justify-center">
                        <Check
                          className="w-4 h-4"
                          style={{ color: colIndex === 0 ? "var(--cyan)" : "#34C759" }}
                          aria-hidden="true"
                        />
                      </span>
                    )}
                    {v === "no" && (
                      <span className="inline-flex items-center justify-center">
                        <X className="w-4 h-4" style={{ color: "var(--text-dim)" }} aria-hidden="true" />
                      </span>
                    )}
                    {v === "partial" && (
                      <span
                        className="inline-flex items-center gap-1 text-xs font-manrope"
                        style={{ color: "var(--amber)" }}
                      >
                        <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                        {partialLabels[key] ?? "~"}
                      </span>
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
