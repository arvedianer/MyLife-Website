"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import LanguageToggle from "./LanguageToggle";

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { key: "ecosystem", href: "#ecosystem" },
    { key: "training", href: "#training" },
    { key: "nutrition", href: "#nutrition" },
    { key: "comparison", href: "#comparison" },
    { key: "vision", href: "#vision" },
  ] as const;

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
              MyLife
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageToggle locale={locale} />
            <a
              href="https://mylife-training.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-200"
            >
              {t("cta")}
            </a>
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-400 hover:text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-white/5 space-y-2">
            {navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                {t(key)}
              </a>
            ))}
            <a
              href="https://mylife-training.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium text-center"
            >
              {t("cta")}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
