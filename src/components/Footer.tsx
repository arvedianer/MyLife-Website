import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer
      className="py-10 px-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <span
          className="font-barlow font-black text-white text-xl tracking-tight"
        >
          MY LIFE
        </span>

        {/* Made by */}
        <p className="font-manrope text-xs" style={{ color: "var(--text-dim)" }}>
          {t("madeBy")} · © 2026
        </p>

        {/* GitHub */}
        <a
          href={t("githubUrl")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-manrope text-xs transition-colors duration-150 hover:text-white"
          style={{ color: "var(--text-dim)" }}
        >
          {t("github")}
        </a>
      </div>
    </footer>
  );
}
