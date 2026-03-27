import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden grid-bg">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-blob absolute top-[-200px] left-[-100px] w-[700px] h-[700px] rounded-full bg-indigo-700/20 blur-[120px]" />
        <div className="animate-blob-delay absolute bottom-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-violet-700/15 blur-[120px]" />
        <div className="animate-blob-delay2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      {/* Radial fade at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/8 text-indigo-300 text-sm font-medium mb-10 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          {t("badge")}
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100 text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.95] mb-8">
          <span className="block text-white">{t("headline").split("\n")[0]}</span>
          <span className="block text-shimmer mt-2">{t("headline").split("\n")[1]}</span>
          <span className="block text-white/40 mt-2 text-5xl sm:text-6xl md:text-7xl">{t("headline").split("\n")[2]}</span>
        </h1>

        {/* Subline */}
        <p className="animate-fade-up delay-200 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          {t("subline")}
        </p>

        {/* CTA */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={t("ctaUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base transition-all duration-300 hover:scale-[1.04] btn-glow"
          >
            {t("cta")}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#ecosystem"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/10 text-slate-300 hover:text-white hover:border-white/20 font-medium text-base transition-all duration-200 backdrop-blur-sm"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up delay-400 mt-20 grid grid-cols-3 gap-2 max-w-sm mx-auto">
          {[
            { value: t("stat1Value"), label: t("stat1Label") },
            { value: t("stat2Value"), label: t("stat2Label") },
            { value: t("stat3Value"), label: t("stat3Label") },
          ].map((stat, i) => (
            <div key={i} className="text-center py-4 px-3 rounded-2xl glass">
              <div className="text-2xl sm:text-3xl font-black text-gradient">{stat.value}</div>
              <div className="text-[11px] text-slate-500 mt-1 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
