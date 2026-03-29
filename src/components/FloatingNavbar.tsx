"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";

const pillStyle: React.CSSProperties = {
  background: "rgba(8, 8, 8, 0.88)",
  backdropFilter: "blur(20px) saturate(1.5)",
  border: "1px solid var(--border)",
};

const logoStyle: React.CSSProperties = {
  color: "var(--cyan)",
  fontSize: "14px",
  letterSpacing: "-0.02em",
};

const ctaStyle: React.CSSProperties = {
  background: "var(--cyan)",
  color: "var(--bg)",
};

export function FloatingNavbar() {
  const t = useTranslations("nav");
  const isPast = useScrollThreshold(100);
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.startsWith("/en") ? "en" : "de";
  const otherLocale = currentLocale === "de" ? "en" : "de";

  const handleLangSwitch = () => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${otherLocale}`);
    router.push(newPath);
  };

  return (
    <AnimatePresence>
      {isPast && (
        <motion.nav
          key="floating-nav"
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
          style={{ width: "fit-content", minWidth: "320px", maxWidth: "640px" }}
        >
          <div
            className="flex items-center justify-between gap-6 px-4 py-1.5 rounded-full"
            style={pillStyle}
          >
            {/* Logo monogram */}
            <span
              className="font-barlow font-black shrink-0"
              style={logoStyle}
            >
              [ML]
            </span>

            {/* Nav links */}
            <div className="hidden sm:flex items-center gap-5">
              {(["training", "nutrition", "life"] as const).map((key) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="font-manrope font-medium text-xs transition-colors duration-150 hover:text-white"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t(key)}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <button
                onClick={handleLangSwitch}
                className="font-manrope text-xs px-2 py-1 rounded-full transition-colors duration-150 hover:text-white"
                style={{ color: "var(--text-dim)" }}
                type="button"
              >
                {t("lang")}
              </button>

              {/* CTA */}
              <a
                href="https://mylifetraining.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-manrope font-bold text-xs transition-all duration-200 hover:opacity-90"
                style={ctaStyle}
              >
                {t("cta")}
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
