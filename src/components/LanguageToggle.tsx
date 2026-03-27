"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageToggle({ locale }: { locale: string }) {
  const pathname = usePathname();

  const getLocalePath = (targetLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/") || "/";
  };

  return (
    <div className="flex items-center gap-0.5 bg-white/5 border border-white/8 rounded-full p-1">
      {(["de", "en"] as const).map((l) => (
        <Link
          key={l}
          href={getLocalePath(l)}
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
            locale === l
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
