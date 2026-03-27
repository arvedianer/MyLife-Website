"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import LanguageToggle from "./LanguageToggle";

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { key: "training", href: "#training" },
    { key: "nutrition", href: "#nutrition" },
    { key: "comparison", href: "#comparison" },
    { key: "vision", href: "#vision" },
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top border glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between bg-[#030712]/75 backdrop-blur-xl border-b border-white/5 rounded-b-2xl px-6">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-xs font-black">M</span>
            </div>
            <span className="font-bold text-white tracking-tight">MyLife</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150"
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <LanguageToggle locale={locale} />
            <a
              href="https://mylife-training.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20"
            >
              {t("cta")}
            </a>
            <button
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-1 rounded-2xl bg-[#0f172a]/90 backdrop-blur-xl border border-white/8 p-4 space-y-1">
            {links.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                {t(key)}
              </a>
            ))}
            <div className="pt-2 border-t border-white/8">
              <a
                href="https://mylife-training.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2.5 rounded-xl text-sm text-white bg-indigo-600 hover:bg-indigo-500 text-center font-semibold transition-all"
              >
                {t("cta")}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
