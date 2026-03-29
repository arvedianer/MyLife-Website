"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Dumbbell, Salad, Leaf } from "lucide-react";
import AppCard from "./AppCard";
import FadeUp from "./FadeUp";

const cardEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function EcosystemSection() {
  const t = useTranslations("ecosystem");

  const apps = [
    {
      name: t("training.name"),
      tagline: t("training.tagline"),
      features: [t("training.f1"), t("training.f2"), t("training.f3")] as [
        string,
        string,
        string,
      ],
      badge: t("training.badge") as "live" | "soon" | "planned",
      accentColor: "#4DFFED",
      icon: Dumbbell,
    },
    {
      name: t("nutrition.name"),
      tagline: t("nutrition.tagline"),
      features: [t("nutrition.f1"), t("nutrition.f2"), t("nutrition.f3")] as [
        string,
        string,
        string,
      ],
      badge: t("nutrition.badge") as "live" | "soon" | "planned",
      accentColor: "#34D399",
      icon: Salad,
    },
    {
      name: t("life.name"),
      tagline: t("life.tagline"),
      features: [t("life.f1"), t("life.f2"), t("life.f3")] as [
        string,
        string,
        string,
      ],
      badge: t("life.badge") as "live" | "soon" | "planned",
      accentColor: "#FBBF24",
      icon: Leaf,
    },
  ];

  return (
    <section id="ecosystem" className="py-28 px-6 relative">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeUp className="text-center mb-16">
          <p className="section-label mb-3" style={{ color: "var(--cyan)" }}>
            {t("label")}
          </p>
          <h2
            className="font-barlow font-black text-white tracking-tight leading-none mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {t("headline")}
          </h2>
          <p
            className="font-manrope text-base max-w-md mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            {t("subline")}
          </p>
        </FadeUp>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {apps.map((app) => (
            <motion.div
              key={app.name}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: cardEase },
                },
              }}
            >
              <AppCard {...app} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
