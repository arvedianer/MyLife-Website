import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  const links = [0, 1, 2].map((i) => ({
    label: t(`links.${i}.label`),
    href: t(`links.${i}.href`),
  }));

  return (
    <footer className="border-t border-white/5 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="text-center md:text-left">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
              MyLife
            </span>
            <p className="text-sm text-gray-500 mt-1">{t("tagline")}</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-600">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
