import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  const links = [0, 1, 2].map((i) => ({
    label: t(`links.${i}.label`),
    href: t(`links.${i}.href`),
  }));

  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white text-xs font-black">M</span>
            </div>
            <div>
              <span className="font-bold text-white">MyLife</span>
              <p className="text-xs text-slate-600 mt-0.5">{t("tagline")}</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm text-slate-600 hover:text-slate-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
          <span>{t("copyright")}</span>
          <span className="flex items-center gap-1.5">
            Built with
            <span className="text-indigo-500/60">♥</span>
            for ambitious people
          </span>
        </div>
      </div>
    </footer>
  );
}
