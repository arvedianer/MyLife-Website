"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageToggle({ locale }: { locale: string }) {
  const pathname = usePathname();

  const getLocalePath = (targetLocale: string) => {
    // Replace the current locale segment with the target locale
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/") || "/";
  };

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
      <Link
        href={getLocalePath("de")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          locale === "de"
            ? "bg-indigo-600 text-white shadow-lg"
            : "text-gray-400 hover:text-white"
        }`}
      >
        DE
      </Link>
      <Link
        href={getLocalePath("en")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          locale === "en"
            ? "bg-indigo-600 text-white shadow-lg"
            : "text-gray-400 hover:text-white"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
