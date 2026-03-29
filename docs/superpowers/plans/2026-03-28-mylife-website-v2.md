# MyLife Website v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete visual redesign of the MyLife marketing website — pure black + cyan design system, Canvas particle hero, floating island navbar, sticky Training showcase with competitor table, and Coming Soon previews for Nutrition and Life.

**Architecture:** Single-page Next.js 14 App Router site with next-intl i18n. All interactivity via custom React hooks + Framer Motion. No backend, no heavy 3D libs — pure Canvas API + CSS for animations. Components are rebuilt section by section; old components deleted after page is rewired.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion (installed), lucide-react (to install), next-intl (installed), next/font/google, pure Canvas API

**Spec:** `docs/superpowers/specs/2026-03-28-mylife-website-v2-design.md`

---

## File Map

### New files to create
```
src/hooks/useScrollThreshold.ts
src/hooks/useMouseTilt.ts
src/hooks/useAnimatedCounter.ts
src/hooks/useActiveFeature.ts
src/hooks/useParticleCanvas.ts
src/components/FloatingNavbar.tsx
src/components/ParticleCanvas.tsx
src/components/AppCard.tsx
src/components/EcosystemSection.tsx
src/components/IPhoneFrame.tsx
src/components/MockupShowcase.tsx
src/components/CompetitorTable.tsx
src/components/LifeSection.tsx
src/components/StatsSection.tsx
messages/de.json
messages/en.json
public/mockups/training-workout.svg
public/mockups/training-stats.svg
public/mockups/training-coach.svg
public/mockups/training-splits.svg
public/mockups/training-forum.svg
public/mockups/training-dashboard.svg
```

### Files to modify
```
package.json                          → add lucide-react
tailwind.config.ts                    → new color tokens
src/app/globals.css                   → rewrite tokens, remove indigo/violet
src/app/[locale]/layout.tsx           → new fonts (Barlow Condensed, Manrope, Courier Prime)
src/app/[locale]/page.tsx             → new section order, new imports
src/components/HeroSection.tsx        → full rebuild
src/components/TrainingSection.tsx    → full rebuild (sticky pattern)
src/components/NutritionSection.tsx   → full rebuild
src/components/CTASection.tsx         → full rebuild
src/components/Footer.tsx             → full rebuild
```

### Files to delete (after page.tsx is rewired in Task 13)
```
src/components/Navbar.tsx
src/components/EcosystemOverview.tsx
src/components/ComparisonTable.tsx
src/components/VisionRoadmap.tsx
src/components/ImprovementSection.tsx
```

---

## Task 1: Dependencies + Design Tokens

**Files:**
- Modify: `package.json` (install step)
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Install lucide-react**

```bash
cd "D:\arved\20_Projekte\MyLife\MyLife-Website"
npm install lucide-react
```

Expected: `lucide-react` added to `package.json` dependencies. No errors.

- [ ] **Step 2: Update tailwind.config.ts with new color tokens**

Replace entire file content:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080808",
        "bg-elevated": "#111111",
        card: "#161616",
        border: {
          DEFAULT: "#222222",
          hover: "#333333",
        },
        cyan: {
          brand: "#4DFFED",
          dark: "#00CCC0",
        },
        emerald: {
          brand: "#34D399",
        },
        amber: {
          brand: "#FBBF24",
        },
        muted: "#888888",
        dim: "#555555",
      },
      fontFamily: {
        barlow: ["var(--font-barlow)", "system-ui", "sans-serif"],
        manrope: ["var(--font-manrope)", "system-ui", "sans-serif"],
        courier: ["var(--font-courier)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Rewrite globals.css — remove all indigo/violet, add new tokens**

Replace entire file content:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── CSS Custom Properties ─────────────────────────── */
:root {
  --bg:          #080808;
  --bg-elevated: #111111;
  --card:        #161616;
  --border:      #222222;
  --border-hover:#333333;
  --cyan:        #4DFFED;
  --cyan-dark:   #00CCC0;
  --cyan-glow:   rgba(77, 255, 237, 0.15);
  --emerald:     #34D399;
  --amber:       #FBBF24;
  --text:        #FFFFFF;
  --text-muted:  #888888;
  --text-dim:    #555555;
  --success:     #34C759;
  --danger:      #FF3B30;
}

html { scroll-behavior: smooth; }
body { background-color: var(--bg); color: var(--text); }

/* ─── Scrollbar ──────────────────────────────────────── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--cyan-dark); border-radius: 9999px; }

/* ─── Selection ──────────────────────────────────────── */
::selection { background: rgba(77, 255, 237, 0.2); }

/* ─── Keyframes ──────────────────────────────────────── */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(77, 255, 237, 0.3); }
  50%       { box-shadow: 0 0 50px rgba(77, 255, 237, 0.6); }
}
@keyframes scan-line {
  0%   { transform: translateY(-100%); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

/* ─── Utility classes ────────────────────────────────── */
@layer utilities {
  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    border: 1px solid var(--border);
  }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    transition: border-color 0.25s;
  }
  .card:hover { border-color: var(--border-hover); }

  .btn-primary {
    background: var(--cyan);
    color: var(--bg);
    font-weight: 700;
    border-radius: 9999px;
    transition: all 0.2s;
    box-shadow: 0 0 30px rgba(77, 255, 237, 0.4);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-primary:hover {
    box-shadow: 0 0 60px rgba(77, 255, 237, 0.6);
    transform: translateY(-1px);
  }

  .btn-ghost {
    border: 1px solid var(--border);
    color: var(--text-muted);
    border-radius: 9999px;
    transition: all 0.2s;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-ghost:hover { border-color: var(--border-hover); color: var(--text); }

  .section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border) 50%, transparent);
  }

  .badge-live {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 9999px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    background: rgba(52, 199, 89, 0.1); color: #34C759; border: 1px solid rgba(52, 199, 89, 0.25);
  }
  .badge-soon {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 9999px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    background: rgba(251, 191, 36, 0.1); color: #FBBF24; border: 1px solid rgba(251, 191, 36, 0.25);
  }
  .badge-planned {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 9999px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    background: rgba(77, 255, 237, 0.06); color: var(--text-dim); border: 1px solid var(--border);
  }
}
```

- [ ] **Step 4: Update layout.tsx with new fonts and body classes**

Replace entire file content:

```typescript
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Barlow_Condensed, Manrope, Courier_Prime } from "next/font/google";
import { routing } from "@/i18n/routing";
import "../globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MyLife – Training, Nutrition & Life",
  description:
    "Die App-Familie für Lifter. Training tracken, Makros berechnen, Gewohnheiten aufbauen – alles verbunden. Kostenlos.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "de" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${barlow.variable} ${manrope.variable} ${courierPrime.variable}`}
    >
      <body
        className="bg-bg text-white antialiased font-manrope"
        style={{ backgroundColor: "#080808" }}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Create messages directory and base translation files**

Create `messages/de.json`:

```json
{
  "hero": {
    "badge": "Training ist live",
    "headline": "MY LIFE",
    "sub": "Training. Nutrition. Life.",
    "subline": "Von einem Lifter für Lifter. Kostenlos.",
    "cta": "Training App öffnen",
    "ctaSecondary": "Mehr erfahren",
    "ctaUrl": "https://mylifetraining.vercel.app"
  },
  "nav": {
    "training": "Training",
    "nutrition": "Nutrition",
    "life": "Life",
    "cta": "Training öffnen",
    "lang": "EN"
  },
  "ecosystem": {
    "label": "Das Ökosystem",
    "headline": "Drei Apps. Eine Vision.",
    "subline": "Trainieren, ernähren, leben — alles verbunden.",
    "training": {
      "name": "MyLife Training",
      "tagline": "Kraft tracken. Stärker werden.",
      "f1": "KI-Gewichtsvorschläge",
      "f2": "Athlete Score 0–1000",
      "f3": "Coach Arved – persönlicher KI-Coach",
      "badge": "live"
    },
    "nutrition": {
      "name": "MyLife Nutrition",
      "tagline": "Makros die zu deinem Training passen.",
      "f1": "Barcode-Scanner",
      "f2": "KI-Ernährungsplan",
      "f3": "Sync mit Training",
      "badge": "soon"
    },
    "life": {
      "name": "MyLife Life",
      "tagline": "Gewohnheiten die bleiben.",
      "f1": "Tages-Routinen",
      "f2": "Streak-Tracking",
      "f3": "Sync mit Training & Nutrition",
      "badge": "planned"
    }
  },
  "training": {
    "sectionLabel": "MyLife Training",
    "headline": "Die smartste Trainings-App die du nie kaufen musst.",
    "subline": "KI-Gewichtsvorschläge, persönlicher Coach, Athlete Score — kostenlos.",
    "features": [
      {
        "title": "Aktives Workout",
        "subtitle": "KI-Gewichtsvorschläge, PR-Erkennung",
        "description": "Progressive Overload automatisch. Die App schlägt das ideale Gewicht vor — basierend auf deiner Trainingshistorie."
      },
      {
        "title": "Athlete Score",
        "subtitle": "0–1000. Fünf Dimensionen.",
        "description": "Kraft, Ausdauer, Konsistenz, Volumen, Fortschritt. Eine ehrliche Zahl die deinen gesamten Trainingsstand abbildet."
      },
      {
        "title": "Coach Arved",
        "subtitle": "Kein Chatbot. Arved.",
        "description": "Er kennt deine PRs, deine schwachen Muskeln, deine verpassten Sessions. Antwortet wie ein Mensch."
      },
      {
        "title": "Splits & Pläne",
        "subtitle": "Arnold, PPL, Bro Split — oder dein eigener",
        "description": "Vorgefertigte Splits oder komplett eigene Planung. Alle Übungen, alle Muskelgruppen."
      },
      {
        "title": "Community & Forum",
        "subtitle": "Live sehen wer gerade trainiert",
        "description": "Sieh in Echtzeit wer im Gym ist. Cheffe-Rolle für die Stärksten. DMs, Forum, gemeinsam stärker."
      },
      {
        "title": "Stats & Auswertung",
        "subtitle": "Lebenszeit-Tracking deiner Stärke",
        "description": "Volumen, Gewicht, Wiederholungen — alles über deine gesamte Trainingskarriere hinweg."
      }
    ],
    "comparison": {
      "headline": "Warum nicht einfach eine andere App?",
      "subline": "Wir haben verglichen.",
      "feature0": "Kostenlos",
      "feature1": "KI-Coach",
      "feature2": "Progressive Overload KI",
      "feature3": "Athlete Score",
      "feature4": "Community / Forum",
      "feature5": "PWA — kein App Store",
      "feature6": "Dark Mode always",
      "feature7": "Deutsch"
    }
  },
  "nutrition": {
    "label": "Coming Soon",
    "headline": "Iss nicht ins Blaue.",
    "subline": "KI-basiertes Ernährungs-Tracking. Makros die zu deinem Training passen.",
    "f0": "Makro-Tracking mit Barcode-Scanner",
    "f1": "KI-Ernährungsplan basierend auf deinen Trainingszielen",
    "f2": "Sync mit MyLife Training (Kalorien ↔ Workout-Volumen)",
    "f3": "Wöchentliche KI-Anpassungen"
  },
  "life": {
    "label": "In Planung",
    "headline": "Gewohnheiten die bleiben.",
    "subline": "Nicht der 10. Habit-Tracker. Der einzige der mit deinem Training verbunden ist.",
    "f0": "Tages-Routinen mit Reminder",
    "f1": "Streak-Tracking mit Statistiken",
    "f2": "Ziel-System mit Meilensteinen",
    "f3": "Sync mit Training & Nutrition"
  },
  "stats": {
    "v0": "60+",
    "l0": "Übungen in der Bibliothek",
    "v1": "100%",
    "l1": "Kostenlos. Immer.",
    "v2": "PWA",
    "l2": "Kein App Store nötig"
  },
  "cta": {
    "headline": "Bereit?",
    "subline": "Starte dein erstes Workout in 2 Minuten.",
    "primary": "Training App öffnen",
    "ctaUrl": "https://mylifetraining.vercel.app",
    "donationCopy": "Diese App entsteht in der Freizeit. Kostenlos. Immer. Wenn du willst dass sie weiterlebt:",
    "donationCta": "Arved einen Kaffee kaufen",
    "donationUrl": "https://ko-fi.com"
  },
  "footer": {
    "madeBy": "Made by Arved",
    "github": "GitHub",
    "githubUrl": "https://github.com/arvedianer",
    "lang": "EN"
  }
}
```

Create `messages/en.json` (identical structure, English strings):

```json
{
  "hero": {
    "badge": "Training is live",
    "headline": "MY LIFE",
    "sub": "Training. Nutrition. Life.",
    "subline": "By a lifter, for lifters. Free.",
    "cta": "Open Training App",
    "ctaSecondary": "Learn more",
    "ctaUrl": "https://mylifetraining.vercel.app"
  },
  "nav": {
    "training": "Training",
    "nutrition": "Nutrition",
    "life": "Life",
    "cta": "Open Training",
    "lang": "DE"
  },
  "ecosystem": {
    "label": "The Ecosystem",
    "headline": "Three Apps. One Vision.",
    "subline": "Train, eat, live — all connected.",
    "training": {
      "name": "MyLife Training",
      "tagline": "Track strength. Get stronger.",
      "f1": "AI weight suggestions",
      "f2": "Athlete Score 0–1000",
      "f3": "Coach Arved – personal AI coach",
      "badge": "live"
    },
    "nutrition": {
      "name": "MyLife Nutrition",
      "tagline": "Macros that match your training.",
      "f1": "Barcode scanner",
      "f2": "AI nutrition plan",
      "f3": "Sync with Training",
      "badge": "soon"
    },
    "life": {
      "name": "MyLife Life",
      "tagline": "Habits that stick.",
      "f1": "Daily routines",
      "f2": "Streak tracking",
      "f3": "Sync with Training & Nutrition",
      "badge": "planned"
    }
  },
  "training": {
    "sectionLabel": "MyLife Training",
    "headline": "The smartest training app you'll never have to pay for.",
    "subline": "AI weight suggestions, personal coach, Athlete Score — free.",
    "features": [
      {
        "title": "Active Workout",
        "subtitle": "AI weight suggestions, PR detection",
        "description": "Progressive overload on autopilot. The app suggests the ideal weight based on your training history."
      },
      {
        "title": "Athlete Score",
        "subtitle": "0–1000. Five dimensions.",
        "description": "Strength, endurance, consistency, volume, progress. One honest number representing your entire fitness level."
      },
      {
        "title": "Coach Arved",
        "subtitle": "Not a chatbot. Arved.",
        "description": "He knows your PRs, your weak muscles, your missed sessions. Responds like a human."
      },
      {
        "title": "Splits & Plans",
        "subtitle": "Arnold, PPL, Bro Split — or your own",
        "description": "Pre-built splits or fully custom programming. All exercises, all muscle groups."
      },
      {
        "title": "Community & Forum",
        "subtitle": "See who's training live",
        "description": "See in real time who's in the gym. Cheffe role for the strongest. DMs, forum, stronger together."
      },
      {
        "title": "Stats & Analytics",
        "subtitle": "Lifetime tracking of your strength",
        "description": "Volume, weight, reps — tracked across your entire training career."
      }
    ],
    "comparison": {
      "headline": "Why not just use another app?",
      "subline": "We compared.",
      "feature0": "Free",
      "feature1": "AI Coach",
      "feature2": "Progressive Overload AI",
      "feature3": "Athlete Score",
      "feature4": "Community / Forum",
      "feature5": "PWA — no App Store",
      "feature6": "Dark Mode always",
      "feature7": "German language"
    }
  },
  "nutrition": {
    "label": "Coming Soon",
    "headline": "Stop guessing what to eat.",
    "subline": "AI-powered nutrition tracking. Macros that match your training.",
    "f0": "Macro tracking with barcode scanner",
    "f1": "AI nutrition plan based on your training goals",
    "f2": "Sync with MyLife Training (calories ↔ workout volume)",
    "f3": "Weekly AI adjustments"
  },
  "life": {
    "label": "Planned",
    "headline": "Habits that actually stick.",
    "subline": "Not the 10th habit tracker. The only one connected to your training.",
    "f0": "Daily routines with reminders",
    "f1": "Streak tracking with statistics",
    "f2": "Goal system with milestones",
    "f3": "Sync with Training & Nutrition"
  },
  "stats": {
    "v0": "60+",
    "l0": "Exercises in the library",
    "v1": "100%",
    "l1": "Free. Always.",
    "v2": "PWA",
    "l2": "No App Store needed"
  },
  "cta": {
    "headline": "Ready?",
    "subline": "Start your first workout in 2 minutes.",
    "primary": "Open Training App",
    "ctaUrl": "https://mylifetraining.vercel.app",
    "donationCopy": "This app is built in free time. Free. Always. If you want it to keep going:",
    "donationCta": "Buy Arved a coffee",
    "donationUrl": "https://ko-fi.com"
  },
  "footer": {
    "madeBy": "Made by Arved",
    "github": "GitHub",
    "githubUrl": "https://github.com/arvedianer",
    "lang": "DE"
  }
}
```

- [ ] **Step 6: Verify build compiles**

```bash
cd "D:\arved\20_Projekte\MyLife\MyLife-Website"
npm run build 2>&1 | tail -20
```

Expected: Build passes (may have warnings about unused old components — fine). No type errors on new files.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: design tokens, fonts, i18n keys, tailwind config — v2 foundation"
```

---

## Task 2: Custom Hooks

**Files:**
- Create: `src/hooks/useScrollThreshold.ts`
- Create: `src/hooks/useMouseTilt.ts`
- Create: `src/hooks/useAnimatedCounter.ts`
- Create: `src/hooks/useActiveFeature.ts`
- Create: `src/hooks/useParticleCanvas.ts`

- [ ] **Step 1: Create src/hooks/useScrollThreshold.ts**

```typescript
"use client";

import { useState, useEffect } from "react";

export function useScrollThreshold(threshold: number): boolean {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsPast(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isPast;
}
```

- [ ] **Step 2: Create src/hooks/useMouseTilt.ts**

```typescript
"use client";

import { useEffect, RefObject } from "react";

export function useMouseTilt(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      el.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg) scale(1.02)`;
      el.style.transition = "transform 0.1s ease-out";
    };

    const handleLeave = () => {
      el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
      el.style.transition = "transform 0.4s ease-out";
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [ref]);
}
```

- [ ] **Step 3: Create src/hooks/useAnimatedCounter.ts**

```typescript
"use client";

import { useState, useEffect, useRef } from "react";

export function useAnimatedCounter(
  target: number,
  duration: number = 1500,
  suffix: string = ""
): { ref: React.RefObject<HTMLDivElement | null>; displayValue: string } {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState("0" + suffix);
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.round(eased * target);
            setDisplayValue(current + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix]);

  return { ref, displayValue };
}
```

- [ ] **Step 4: Create src/hooks/useActiveFeature.ts**

```typescript
"use client";

import { useState, useEffect, useRef, RefObject } from "react";

export function useActiveFeature(
  count: number
): {
  activeFeature: number;
  setActiveFeature: (i: number) => void;
  sentinelRefs: RefObject<HTMLDivElement | null>[];
} {
  const [activeFeature, setActiveFeature] = useState(0);
  // Create refs for each sentinel
  const sentinelRefs = Array.from({ length: count }, () =>
    useRef<HTMLDivElement>(null)
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sentinelRefs.forEach((ref, i) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveFeature(i);
        },
        { threshold: 0.5 }
      );
      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return { activeFeature, setActiveFeature, sentinelRefs };
}
```

**Note:** The `useRef` calls inside `Array.from` violate the rules of hooks (hooks must not be called inside loops). Fix: use a pattern where refs are created once. Replace the hook body with:

```typescript
"use client";

import { useState, useEffect, useRef, RefObject, useCallback } from "react";

// Hook that manages N sentinel refs + active index tracking via IntersectionObserver
export function useActiveFeature(count: number): {
  activeFeature: number;
  setActiveFeature: (i: number) => void;
  getSentinelRef: (i: number) => (el: HTMLDivElement | null) => void;
} {
  const [activeFeature, setActiveFeature] = useState(0);
  const sentinelEls = useRef<(HTMLDivElement | null)[]>(Array(count).fill(null));
  const observers = useRef<IntersectionObserver[]>([]);

  const getSentinelRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      sentinelEls.current[i] = el;
    },
    []
  );

  useEffect(() => {
    // Clean up old observers
    observers.current.forEach((o) => o.disconnect());
    observers.current = [];

    sentinelEls.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveFeature(i);
        },
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
      );
      observer.observe(el);
      observers.current.push(observer);
    });

    return () => observers.current.forEach((o) => o.disconnect());
  });

  return { activeFeature, setActiveFeature, getSentinelRef };
}
```

- [ ] **Step 5: Create src/hooks/useParticleCanvas.ts**

```typescript
"use client";

import { useEffect, RefObject } from "react";

interface Particle {
  x: number; y: number;
  ox: number; oy: number; // origin position
  vx: number; vy: number;
  opacity: number;
  radius: number;
}

interface Options {
  count: number;
  reducedMotion: boolean;
}

export function useParticleCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  { count, reducedMotion }: Options
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion || count === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let scrollY = 0;
    let particles: Particle[] = [];
    let heroVisible = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initParticles = () => {
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x, y, ox: x, oy: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: 0.3 + Math.random() * 0.5,
          radius: 0.8 + Math.random() * 1.2,
        };
      });
    };

    const REPULSION_RADIUS = 90;
    const REPULSION_STRENGTH = 4;
    const FRICTION = 0.92;
    const RETURN_FORCE = 0.015;

    const tick = () => {
      if (!heroVisible) { rafId = requestAnimationFrame(tick); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Global alpha based on scroll
      const scrollFade = Math.max(0, 1 - scrollY / 280);
      if (scrollFade <= 0) { rafId = requestAnimationFrame(tick); return; }

      particles.forEach((p) => {
        // Return force toward origin
        p.vx += (p.ox - p.x) * RETURN_FORCE;
        p.vy += (p.oy - p.y) * RETURN_FORCE;

        // Mouse repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;
          p.vx += (dx / dist) * force * REPULSION_STRENGTH;
          p.vy += (dy / dist) * force * REPULSION_STRENGTH;
        }

        // Friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // Scroll boost
        p.vx += (Math.random() - 0.5) * (scrollY * 0.002);
        p.vy += (Math.random() - 0.5) * (scrollY * 0.002);

        p.x += p.vx;
        p.y += p.vy;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77, 255, 237, ${p.opacity * scrollFade})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleScroll = () => { scrollY = window.scrollY; };

    // Pause when hero is not visible
    const observer = new IntersectionObserver(
      ([entry]) => { heroVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    resize();
    initParticles();
    rafId = requestAnimationFrame(tick);

    window.addEventListener("resize", () => { resize(); initParticles(); });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [canvasRef, count, reducedMotion]);
}
```

- [ ] **Step 6: Verify TypeScript compiles**

```bash
cd "D:\arved\20_Projekte\MyLife\MyLife-Website"
npx tsc --noEmit 2>&1 | head -40
```

Expected: 0 errors on the new hook files. May show existing component errors — that's fine for now.

- [ ] **Step 7: Commit**

```bash
git add src/hooks/
git commit -m "feat: add 5 custom hooks (scroll, tilt, counter, activeFeature, particles)"
```

---

## Task 3: SVG Mockup Placeholders

**Files:**
- Create: `public/mockups/training-workout.svg`
- Create: `public/mockups/training-stats.svg`
- Create: `public/mockups/training-coach.svg`
- Create: `public/mockups/training-splits.svg`
- Create: `public/mockups/training-forum.svg`
- Create: `public/mockups/training-dashboard.svg`

- [ ] **Step 1: Create all 6 SVG placeholders**

Each file is a 264×544 SVG. The template (vary the label text and accent color per file):

`public/mockups/training-workout.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="264" height="544" viewBox="0 0 264 544">
  <rect width="264" height="544" fill="#111111"/>
  <!-- Status bar -->
  <rect width="264" height="44" fill="#161616"/>
  <text x="132" y="28" text-anchor="middle" font-family="system-ui" font-size="11" fill="#555555">9:41</text>
  <!-- Header -->
  <rect y="44" width="264" height="48" fill="#161616"/>
  <text x="132" y="75" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="700" fill="#FFFFFF">Aktives Workout</text>
  <!-- Content area -->
  <rect x="16" y="108" width="232" height="80" rx="12" fill="#161616"/>
  <text x="132" y="143" text-anchor="middle" font-family="system-ui" font-size="12" fill="#888888">Bankdrücken</text>
  <text x="132" y="163" text-anchor="middle" font-family="system-ui" font-size="20" font-weight="700" fill="#4DFFED">80 kg × 5</text>
  <rect x="16" y="204" width="232" height="80" rx="12" fill="#161616"/>
  <text x="132" y="239" text-anchor="middle" font-family="system-ui" font-size="12" fill="#888888">Kniebeuge</text>
  <text x="132" y="259" text-anchor="middle" font-family="system-ui" font-size="20" font-weight="700" fill="#FFFFFF">100 kg × 3</text>
  <rect x="16" y="300" width="232" height="80" rx="12" fill="#161616"/>
  <text x="132" y="335" text-anchor="middle" font-family="system-ui" font-size="12" fill="#888888">Kreuzheben</text>
  <text x="132" y="355" text-anchor="middle" font-family="system-ui" font-size="20" font-weight="700" fill="#FFFFFF">120 kg × 1</text>
  <!-- PR badge -->
  <rect x="84" y="370" width="96" height="28" rx="14" fill="rgba(77,255,237,0.12)" stroke="#4DFFED" stroke-width="1"/>
  <text x="132" y="388" text-anchor="middle" font-family="system-ui" font-size="11" font-weight="700" fill="#4DFFED">🏆 Neuer PR!</text>
  <!-- CTA button -->
  <rect x="24" y="480" width="216" height="44" rx="22" fill="#4DFFED"/>
  <text x="132" y="507" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="700" fill="#080808">Satz abschließen</text>
</svg>
```

`public/mockups/training-stats.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="264" height="544" viewBox="0 0 264 544">
  <rect width="264" height="544" fill="#111111"/>
  <rect width="264" height="44" fill="#161616"/>
  <text x="132" y="28" text-anchor="middle" font-family="system-ui" font-size="11" fill="#555555">9:41</text>
  <rect y="44" width="264" height="48" fill="#161616"/>
  <text x="132" y="75" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="700" fill="#FFFFFF">Athlete Score</text>
  <!-- Big score -->
  <text x="132" y="180" text-anchor="middle" font-family="system-ui" font-size="72" font-weight="800" fill="#4DFFED">742</text>
  <text x="132" y="210" text-anchor="middle" font-family="system-ui" font-size="12" fill="#888888">von 1000 möglichen Punkten</text>
  <!-- Score bar -->
  <rect x="32" y="230" width="200" height="6" rx="3" fill="#222222"/>
  <rect x="32" y="230" width="148" height="6" rx="3" fill="#4DFFED"/>
  <!-- Dimensions -->
  <rect x="16" y="260" width="108" height="60" rx="10" fill="#161616"/>
  <text x="70" y="285" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888888">Kraft</text>
  <text x="70" y="308" text-anchor="middle" font-family="system-ui" font-size="18" font-weight="700" fill="#FFFFFF">830</text>
  <rect x="140" y="260" width="108" height="60" rx="10" fill="#161616"/>
  <text x="194" y="285" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888888">Konsistenz</text>
  <text x="194" y="308" text-anchor="middle" font-family="system-ui" font-size="18" font-weight="700" fill="#FFFFFF">650</text>
  <rect x="16" y="334" width="108" height="60" rx="10" fill="#161616"/>
  <text x="70" y="359" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888888">Volumen</text>
  <text x="70" y="382" text-anchor="middle" font-family="system-ui" font-size="18" font-weight="700" fill="#FFFFFF">710</text>
  <rect x="140" y="334" width="108" height="60" rx="10" fill="#161616"/>
  <text x="194" y="359" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888888">Fortschritt</text>
  <text x="194" y="382" text-anchor="middle" font-family="system-ui" font-size="18" font-weight="700" fill="#FFFFFF">790</text>
</svg>
```

`public/mockups/training-coach.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="264" height="544" viewBox="0 0 264 544">
  <rect width="264" height="544" fill="#111111"/>
  <rect width="264" height="44" fill="#161616"/>
  <text x="132" y="28" text-anchor="middle" font-family="system-ui" font-size="11" fill="#555555">9:41</text>
  <rect y="44" width="264" height="48" fill="#161616"/>
  <text x="132" y="75" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="700" fill="#FFFFFF">Coach Arved</text>
  <!-- Chat messages -->
  <rect x="16" y="112" width="180" height="56" rx="12" fill="#161616"/>
  <text x="28" y="132" font-family="system-ui" font-size="11" fill="#888888">Arved</text>
  <text x="28" y="152" font-family="system-ui" font-size="12" fill="#FFFFFF">Dein Bankdrücken stagniert.</text>
  <text x="28" y="168" font-family="system-ui" font-size="12" fill="#FFFFFF">Deload nächste Woche.</text>
  <rect x="68" y="182" width="180" height="42" rx="12" fill="rgba(77,255,237,0.12)" stroke="#4DFFED" stroke-width="0.5"/>
  <text x="80" y="199" font-family="system-ui" font-size="12" fill="#FFFFFF">Ok, und wie lange?</text>
  <text x="80" y="215" font-family="system-ui" font-size="12" fill="#FFFFFF">Eine Woche reicht?</text>
  <rect x="16" y="238" width="200" height="72" rx="12" fill="#161616"/>
  <text x="28" y="258" font-family="system-ui" font-size="11" fill="#888888">Arved</text>
  <text x="28" y="278" font-family="system-ui" font-size="12" fill="#FFFFFF">Ja. Du trainierst seit 8 Wochen</text>
  <text x="28" y="294" font-family="system-ui" font-size="12" fill="#FFFFFF">ohne Pause. 60% Gewicht,</text>
  <text x="28" y="310" font-family="system-ui" font-size="12" fill="#4DFFED">höhere Wdh. Vertrau mir.</text>
  <!-- Input -->
  <rect x="16" y="480" width="232" height="44" rx="22" fill="#161616" stroke="#222222" stroke-width="1"/>
  <text x="36" y="507" font-family="system-ui" font-size="13" fill="#555555">Frag Coach Arved...</text>
</svg>
```

`public/mockups/training-splits.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="264" height="544" viewBox="0 0 264 544">
  <rect width="264" height="544" fill="#111111"/>
  <rect width="264" height="44" fill="#161616"/>
  <text x="132" y="28" text-anchor="middle" font-family="system-ui" font-size="11" fill="#555555">9:41</text>
  <rect y="44" width="264" height="48" fill="#161616"/>
  <text x="132" y="75" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="700" fill="#FFFFFF">Meine Splits</text>
  <!-- Split cards -->
  <rect x="16" y="108" width="232" height="72" rx="12" fill="#161616" stroke="#4DFFED" stroke-width="1"/>
  <text x="28" y="132" font-family="system-ui" font-size="13" font-weight="700" fill="#FFFFFF">Push / Pull / Legs</text>
  <text x="28" y="152" font-family="system-ui" font-size="11" fill="#888888">6 Tage/Woche · 18 Übungen</text>
  <rect x="180" y="120" width="56" height="24" rx="12" fill="rgba(77,255,237,0.12)"/>
  <text x="208" y="136" text-anchor="middle" font-family="system-ui" font-size="10" font-weight="700" fill="#4DFFED">AKTIV</text>
  <rect x="16" y="194" width="232" height="64" rx="12" fill="#161616"/>
  <text x="28" y="218" font-family="system-ui" font-size="13" font-weight="700" fill="#FFFFFF">Arnold Split</text>
  <text x="28" y="238" font-family="system-ui" font-size="11" fill="#888888">6 Tage/Woche · 20 Übungen</text>
  <rect x="16" y="272" width="232" height="64" rx="12" fill="#161616"/>
  <text x="28" y="296" font-family="system-ui" font-size="13" font-weight="700" fill="#FFFFFF">Bro Split</text>
  <text x="28" y="316" font-family="system-ui" font-size="11" fill="#888888">5 Tage/Woche · 25 Übungen</text>
  <rect x="16" y="350" width="232" height="64" rx="12" fill="#161616"/>
  <text x="28" y="374" font-family="system-ui" font-size="13" font-weight="700" fill="#FFFFFF">Upper / Lower</text>
  <text x="28" y="394" font-family="system-ui" font-size="11" fill="#888888">4 Tage/Woche · 16 Übungen</text>
  <!-- Add button -->
  <rect x="24" y="480" width="216" height="44" rx="22" fill="#161616" stroke="#333333" stroke-width="1"/>
  <text x="132" y="507" text-anchor="middle" font-family="system-ui" font-size="14" fill="#888888">+ Eigenen Split erstellen</text>
</svg>
```

`public/mockups/training-forum.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="264" height="544" viewBox="0 0 264 544">
  <rect width="264" height="544" fill="#111111"/>
  <rect width="264" height="44" fill="#161616"/>
  <text x="132" y="28" text-anchor="middle" font-family="system-ui" font-size="11" fill="#555555">9:41</text>
  <rect y="44" width="264" height="48" fill="#161616"/>
  <text x="132" y="75" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="700" fill="#FFFFFF">Community</text>
  <!-- Live training badge -->
  <rect x="16" y="108" width="232" height="44" rx="10" fill="rgba(52,199,89,0.08)" stroke="rgba(52,199,89,0.2)" stroke-width="1"/>
  <circle cx="34" cy="130" r="5" fill="#34C759"/>
  <text x="48" y="134" font-family="system-ui" font-size="12" fill="#FFFFFF">3 Leute trainieren gerade</text>
  <!-- Forum posts -->
  <rect x="16" y="166" width="232" height="72" rx="12" fill="#161616"/>
  <rect x="28" y="178" width="28" height="28" rx="14" fill="#222222"/>
  <text x="42" y="196" text-anchor="middle" font-family="system-ui" font-size="11" fill="#4DFFED" font-weight="700">C</text>
  <text x="64" y="190" font-family="system-ui" font-size="12" font-weight="700" fill="#FFFFFF">Cheffe_Arved</text>
  <text x="64" y="208" font-family="system-ui" font-size="11" fill="#888888">Neuer PR heute: 140kg Kreuzheben</text>
  <text x="64" y="224" font-family="system-ui" font-size="11" fill="#555555">🔥 24 Likes · 8 Kommentare</text>
  <rect x="16" y="252" width="232" height="72" rx="12" fill="#161616"/>
  <rect x="28" y="264" width="28" height="28" rx="14" fill="#222222"/>
  <text x="42" y="282" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888888">M</text>
  <text x="64" y="276" font-family="system-ui" font-size="12" font-weight="700" fill="#FFFFFF">MaxMuscle</text>
  <text x="64" y="294" font-family="system-ui" font-size="11" fill="#888888">PPL nach 3 Monaten — mein Review</text>
  <text x="64" y="310" font-family="system-ui" font-size="11" fill="#555555">12 Likes · 5 Kommentare</text>
  <rect x="16" y="338" width="232" height="72" rx="12" fill="#161616"/>
  <rect x="28" y="350" width="28" height="28" rx="14" fill="#222222"/>
  <text x="42" y="368" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888888">L</text>
  <text x="64" y="362" font-family="system-ui" font-size="12" font-weight="700" fill="#FFFFFF">LenaLift</text>
  <text x="64" y="380" font-family="system-ui" font-size="11" fill="#888888">Frage: Deload nach 8 Wochen?</text>
  <text x="64" y="396" font-family="system-ui" font-size="11" fill="#555555">3 Likes · 12 Kommentare</text>
</svg>
```

`public/mockups/training-dashboard.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="264" height="544" viewBox="0 0 264 544">
  <rect width="264" height="544" fill="#111111"/>
  <rect width="264" height="44" fill="#161616"/>
  <text x="132" y="28" text-anchor="middle" font-family="system-ui" font-size="11" fill="#555555">9:41</text>
  <!-- Greeting -->
  <text x="24" y="80" font-family="system-ui" font-size="11" fill="#888888">Guten Abend,</text>
  <text x="24" y="104" font-family="system-ui" font-size="22" font-weight="700" fill="#FFFFFF">Arved 👋</text>
  <!-- Next workout card -->
  <rect x="16" y="120" width="232" height="88" rx="12" fill="#161616" stroke="#4DFFED" stroke-width="0.5"/>
  <text x="28" y="142" font-family="system-ui" font-size="10" fill="#4DFFED" font-weight="700" letter-spacing="2">HEUTE</text>
  <text x="28" y="164" font-family="system-ui" font-size="16" font-weight="700" fill="#FFFFFF">Push Day A</text>
  <text x="28" y="184" font-family="system-ui" font-size="12" fill="#888888">7 Übungen · ~65 Min</text>
  <rect x="160" y="162" width="76" height="32" rx="16" fill="#4DFFED"/>
  <text x="198" y="182" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="700" fill="#080808">Starten →</text>
  <!-- Stats row -->
  <rect x="16" y="222" width="108" height="64" rx="10" fill="#161616"/>
  <text x="70" y="248" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888888">Streak</text>
  <text x="70" y="272" text-anchor="middle" font-family="system-ui" font-size="20" font-weight="700" fill="#FFFFFF">12 🔥</text>
  <rect x="140" y="222" width="108" height="64" rx="10" fill="#161616"/>
  <text x="194" y="248" text-anchor="middle" font-family="system-ui" font-size="11" fill="#888888">Athlete Score</text>
  <text x="194" y="272" text-anchor="middle" font-family="system-ui" font-size="20" font-weight="700" fill="#4DFFED">742</text>
  <!-- Recent workouts -->
  <text x="24" y="316" font-family="system-ui" font-size="12" font-weight="700" fill="#FFFFFF">Letzte Workouts</text>
  <rect x="16" y="328" width="232" height="44" rx="10" fill="#161616"/>
  <text x="28" y="353" font-family="system-ui" font-size="12" fill="#FFFFFF">Push Day B</text>
  <text x="200" y="353" text-anchor="end" font-family="system-ui" font-size="12" fill="#888888">gestern</text>
  <rect x="16" y="384" width="232" height="44" rx="10" fill="#161616"/>
  <text x="28" y="409" font-family="system-ui" font-size="12" fill="#FFFFFF">Pull Day A</text>
  <text x="200" y="409" text-anchor="end" font-family="system-ui" font-size="12" fill="#888888">vor 2 Tagen</text>
</svg>
```

- [ ] **Step 2: Verify files exist**

```bash
ls "D:\arved\20_Projekte\MyLife\MyLife-Website\public\mockups"
```

Expected: 6 `.svg` files listed.

- [ ] **Step 3: Commit**

```bash
git add public/mockups/
git commit -m "feat: add SVG mockup placeholders (264×544) for all 6 training features"
```

---

## Task 4: ParticleCanvas + HeroSection

**Files:**
- Create: `src/components/ParticleCanvas.tsx`
- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Create ParticleCanvas.tsx**

```typescript
"use client";

import { useRef, useEffect, useState } from "react";
import { useParticleCanvas } from "@/hooks/useParticleCanvas";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [config, setConfig] = useState({ count: 0, reducedMotion: false });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setConfig({
      count: reducedMotion ? 0 : isMobile ? 500 : 2000,
      reducedMotion,
    });
  }, []);

  useParticleCanvas(canvasRef, config);

  if (config.reducedMotion) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(77,255,237,0.06) 0%, transparent 70%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: "opacity" }}
    />
  );
}
```

- [ ] **Step 2: Rebuild HeroSection.tsx**

```typescript
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Particle background */}
      <ParticleCanvas />

      {/* Subtle radial overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, rgba(8,8,8,0.7) 70%)",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 glass"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {t("badge")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="font-barlow font-black text-white leading-none tracking-tighter mb-4"
          style={{ fontSize: "clamp(5rem, 16vw, 12rem)" }}
        >
          {t("headline")}
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="font-manrope font-medium mb-3"
          style={{ fontSize: "1.25rem", color: "var(--text-muted)" }}
        >
          {t("sub")}
        </motion.p>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="font-manrope mb-12"
          style={{ fontSize: "0.95rem", color: "var(--text-dim)" }}
        >
          {t("subline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href={t("ctaUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-3.5 text-sm font-manrope"
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#ecosystem"
            className="btn-ghost px-6 py-3.5 text-sm font-manrope"
          >
            {t("ctaSecondary")}
            <ChevronDown className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <div
          className="w-px h-10 animate-pulse"
          style={{ background: "linear-gradient(to bottom, transparent, var(--border), transparent)" }}
        />
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" style={{ color: "var(--text-dim)" }} />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Run dev server and visually verify**

```bash
cd "D:\arved\20_Projekte\MyLife\MyLife-Website"
npm run dev
```

Open http://localhost:3000/de — verify:
- Black background (#080808)
- Cyan particles visible, moving on mouse
- "MY LIFE" headline in Barlow Condensed
- Both CTA buttons render

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.tsx src/components/ParticleCanvas.tsx
git commit -m "feat: hero section with Canvas particle system"
```

---

## Task 5: FloatingNavbar

**Files:**
- Create: `src/components/FloatingNavbar.tsx`

- [ ] **Step 1: Create FloatingNavbar.tsx**

```typescript
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";

export default function FloatingNavbar() {
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
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
          style={{ width: "fit-content", minWidth: "320px", maxWidth: "640px" }}
        >
          <div
            className="flex items-center justify-between gap-6 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(8, 8, 8, 0.88)",
              backdropFilter: "blur(20px) saturate(1.5)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Logo monogram */}
            <span
              className="font-barlow font-black text-sm tracking-tighter shrink-0"
              style={{ color: "var(--cyan)", fontSize: "14px" }}
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
              >
                {t("lang")}
              </button>

              {/* CTA */}
              <a
                href="https://mylifetraining.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-manrope font-bold text-xs transition-all duration-200 hover:opacity-90"
                style={{
                  background: "var(--cyan)",
                  color: "var(--bg)",
                }}
              >
                {t("cta")}
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Add FloatingNavbar to page.tsx temporarily and verify**

In `src/app/[locale]/page.tsx`, add the import and render it (keep old Navbar for now):

```typescript
// Add import at top:
import FloatingNavbar from "@/components/FloatingNavbar";

// Add inside JSX after old Navbar:
<FloatingNavbar />
```

- [ ] **Step 3: Run dev and verify**

Open http://localhost:3000/de — scroll down 100px — floating pill navbar appears smoothly. Language toggle switches to /en.

- [ ] **Step 4: Commit**

```bash
git add src/components/FloatingNavbar.tsx src/app/[locale]/page.tsx
git commit -m "feat: floating island navbar with scroll trigger + language toggle"
```

---

## Task 6: EcosystemSection + AppCard

**Files:**
- Create: `src/components/AppCard.tsx`
- Create: `src/components/EcosystemSection.tsx`

- [ ] **Step 1: Create AppCard.tsx**

```typescript
"use client";

import { useRef } from "react";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { LucideIcon } from "lucide-react";

interface AppCardProps {
  name: string;
  tagline: string;
  features: [string, string, string];
  badge: "live" | "soon" | "planned";
  accentColor: string;
  icon: LucideIcon;
}

const badgeLabels: Record<AppCardProps["badge"], string> = {
  live: "LIVE",
  soon: "COMING SOON",
  planned: "IN PLANUNG",
};

const badgeClasses: Record<AppCardProps["badge"], string> = {
  live: "badge-live",
  soon: "badge-soon",
  planned: "badge-planned",
};

export default function AppCard({ name, tagline, features, badge, accentColor, icon: Icon }: AppCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  useMouseTilt(cardRef);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl p-8 flex flex-col gap-5 cursor-default"
      style={{
        background: "var(--card)",
        borderTop: `2px solid ${accentColor}`,
        borderLeft: "1px solid var(--border)",
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        willChange: "transform",
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${accentColor}18` }}
      >
        <Icon className="w-6 h-6" style={{ color: accentColor }} />
      </div>

      {/* Name + badge */}
      <div className="flex items-start justify-between gap-3">
        <h3
          className="font-barlow font-bold leading-tight"
          style={{ fontSize: "1.4rem", color: "var(--text)" }}
        >
          {name}
        </h3>
        <span className={badgeClasses[badge]}>{badgeLabels[badge]}</span>
      </div>

      {/* Tagline */}
      <p className="font-manrope text-sm" style={{ color: "var(--text-muted)" }}>
        {tagline}
      </p>

      {/* Features */}
      <ul className="flex flex-col gap-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs font-manrope" style={{ color: "var(--text-dim)" }}>
            <span style={{ color: accentColor }}>•</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Create EcosystemSection.tsx**

```typescript
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Dumbbell, Salad, Leaf } from "lucide-react";
import AppCard from "./AppCard";
import FadeUp from "./FadeUp";

export default function EcosystemSection() {
  const t = useTranslations("ecosystem");

  const apps = [
    {
      name: t("training.name"),
      tagline: t("training.tagline"),
      features: [t("training.f1"), t("training.f2"), t("training.f3")] as [string, string, string],
      badge: t("training.badge") as "live" | "soon" | "planned",
      accentColor: "#4DFFED",
      icon: Dumbbell,
    },
    {
      name: t("nutrition.name"),
      tagline: t("nutrition.tagline"),
      features: [t("nutrition.f1"), t("nutrition.f2"), t("nutrition.f3")] as [string, string, string],
      badge: t("nutrition.badge") as "live" | "soon" | "planned",
      accentColor: "#34D399",
      icon: Salad,
    },
    {
      name: t("life.name"),
      tagline: t("life.tagline"),
      features: [t("life.f1"), t("life.f2"), t("life.f3")] as [string, string, string],
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
          <p className="font-manrope text-base max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
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
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
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
```

- [ ] **Step 3: Check FadeUp component still works**

Read `src/components/FadeUp.tsx` — verify it accepts `className` prop. If not, it just needs `children` and viewport-based fade. It will be used as-is.

- [ ] **Step 4: Commit**

```bash
git add src/components/AppCard.tsx src/components/EcosystemSection.tsx
git commit -m "feat: ecosystem section with 3 tilt cards (Training/Nutrition/Life)"
```

---

## Task 7: IPhoneFrame + MockupShowcase

**Files:**
- Create: `src/components/IPhoneFrame.tsx`
- Create: `src/components/MockupShowcase.tsx`

- [ ] **Step 1: Create IPhoneFrame.tsx**

```typescript
import Image from "next/image";

interface IPhoneFrameProps {
  src: string;
  alt: string;
  accentColor?: string;
}

export default function IPhoneFrame({ src, alt, accentColor = "#4DFFED" }: IPhoneFrameProps) {
  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: "280px",
        height: "560px",
        borderRadius: "40px",
        border: "8px solid #1a1a1a",
        background: "#0a0a0a",
        boxShadow: `0 0 0 1px #333, 0 32px 80px rgba(0,0,0,0.8), 0 0 60px ${accentColor}18`,
      }}
    >
      {/* Notch */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
        style={{
          width: "88px",
          height: "24px",
          background: "#0a0a0a",
          borderRadius: "0 0 14px 14px",
        }}
      />

      {/* Screen */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "32px",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={264}
          height={544}
          className="w-full h-full object-cover"
          priority={false}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create MockupShowcase.tsx**

```typescript
"use client";

import { motion, AnimatePresence } from "framer-motion";
import IPhoneFrame from "./IPhoneFrame";

interface Feature {
  key: string;
  mockupSrc: string;
  mockupAlt: string;
}

interface MockupShowcaseProps {
  activeFeature: number;
  features: Feature[];
}

export default function MockupShowcase({ activeFeature, features }: MockupShowcaseProps) {
  const active = features[activeFeature];
  if (!active) return null;

  return (
    <div className="flex items-center justify-center py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.key}
          initial={{ opacity: 0, x: 20, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <IPhoneFrame
            src={active.mockupSrc}
            alt={active.mockupAlt}
            accentColor="#4DFFED"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/IPhoneFrame.tsx src/components/MockupShowcase.tsx
git commit -m "feat: IPhoneFrame (CSS-only) + MockupShowcase with AnimatePresence"
```

---

## Task 8: TrainingSection (Sticky Pattern)

**Files:**
- Modify: `src/components/TrainingSection.tsx` (full rebuild)

- [ ] **Step 1: Rebuild TrainingSection.tsx**

```typescript
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import FadeUp from "./FadeUp";
import MockupShowcase from "./MockupShowcase";
import CompetitorTable from "./CompetitorTable";
import { useActiveFeature } from "@/hooks/useActiveFeature";

const MOCKUP_KEYS = ["workout", "stats", "coach", "splits", "forum", "dashboard"] as const;

export default function TrainingSection() {
  const t = useTranslations("training");
  const { activeFeature, setActiveFeature, getSentinelRef } = useActiveFeature(6);

  const features = Array.from({ length: 6 }, (_, i) => ({
    title: t(`features.${i}.title`),
    subtitle: t(`features.${i}.subtitle`),
    description: t(`features.${i}.description`),
    key: MOCKUP_KEYS[i]!,
    mockupSrc: `/mockups/training-${MOCKUP_KEYS[i]}.svg`,
    mockupAlt: t(`features.${i}.title`),
  }));

  return (
    <section id="training" className="py-28 px-6 relative">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <FadeUp className="mb-16 max-w-2xl">
          <p className="section-label mb-3" style={{ color: "var(--cyan)" }}>
            {t("sectionLabel")}
          </p>
          <h2
            className="font-barlow font-black text-white tracking-tight leading-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {t("headline")}
          </h2>
          <p className="font-manrope text-base" style={{ color: "var(--text-muted)" }}>
            {t("subline")}
          </p>
        </FadeUp>

        {/* Sticky showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-16">
          {/* LEFT: Sticky feature list */}
          <div
            className="hidden lg:block"
            style={{ position: "sticky", top: "88px", height: "fit-content" }}
          >
            <div className="flex flex-col gap-1">
              {features.map((f, i) => (
                <button
                  key={f.key}
                  onClick={() => {
                    setActiveFeature(i);
                    document.querySelector(`[data-sentinel="${i}"]`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className="text-left px-4 py-4 rounded-lg transition-all duration-200 group"
                  style={{
                    borderLeft: activeFeature === i
                      ? "2px solid var(--cyan)"
                      : "2px solid transparent",
                    background: activeFeature === i ? "rgba(77,255,237,0.04)" : "transparent",
                  }}
                >
                  <div
                    className="font-manrope font-semibold text-sm mb-0.5 transition-colors duration-200"
                    style={{ color: activeFeature === i ? "var(--text)" : "var(--text-dim)" }}
                  >
                    {f.title}
                  </div>
                  <div
                    className="font-manrope text-xs transition-colors duration-200"
                    style={{ color: activeFeature === i ? "var(--text-muted)" : "#333" }}
                  >
                    {f.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Scroll area with sentinels */}
          <div>
            {/* Desktop: sticky mockup on top + sentinels below */}
            <div className="hidden lg:block">
              <MockupShowcase activeFeature={activeFeature} features={features} />
            </div>

            {/* Sentinel divs for IntersectionObserver */}
            <div className="lg:block">
              {features.map((f, i) => (
                <div
                  key={f.key}
                  ref={getSentinelRef(i)}
                  data-sentinel={i}
                  className="h-[180px] flex items-center lg:hidden"
                >
                  {/* Mobile: show feature card */}
                  <div
                    className="w-full p-5 rounded-xl"
                    style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                  >
                    <div className="font-manrope font-bold text-base text-white mb-1">{f.title}</div>
                    <div className="font-manrope text-xs mb-2" style={{ color: "var(--cyan)" }}>{f.subtitle}</div>
                    <div className="font-manrope text-sm" style={{ color: "var(--text-muted)" }}>{f.description}</div>
                  </div>
                </div>
              ))}
              {/* Desktop sentinels (invisible) */}
              {features.map((f, i) => (
                <div
                  key={`desktop-${f.key}`}
                  ref={getSentinelRef(i)}
                  data-sentinel={i}
                  className="h-[180px] hidden lg:block"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Competitor table */}
        <div className="mt-24">
          <CompetitorTable />
        </div>
      </div>
    </section>
  );
}
```

**Note on dual sentinels:** The `useActiveFeature` hook uses a callback ref pattern (`getSentinelRef(i)`) — calling it twice with the same index will overwrite the ref. Fix: use a single set of sentinels. For mobile, render feature cards separately without them being sentinels. Revised approach:

```typescript
// Replace the sentinel/card section with this:
{/* Sentinels for IntersectionObserver (invisible on all breakpoints, used for scroll tracking) */}
{features.map((f, i) => (
  <div
    key={f.key}
    ref={getSentinelRef(i)}
    data-sentinel={i}
    className="h-[180px]"
  >
    {/* Mobile: show content inside the sentinel */}
    <div
      className="lg:hidden h-full flex items-center"
    >
      <div
        className="w-full p-5 rounded-xl"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="font-manrope font-bold text-base text-white mb-1">{f.title}</div>
        <div className="font-manrope text-xs mb-2" style={{ color: "var(--cyan)" }}>{f.subtitle}</div>
        <div className="font-manrope text-sm" style={{ color: "var(--text-muted)" }}>{f.description}</div>
      </div>
    </div>
  </div>
))}
```

- [ ] **Step 2: Run dev and verify**

Open http://localhost:3000/de — scroll to Training section:
- Sticky sidebar highlights active feature as you scroll
- Mockup swaps with fade animation
- On mobile: feature cards show inline

- [ ] **Step 3: Commit**

```bash
git add src/components/TrainingSection.tsx
git commit -m "feat: training section with sticky sidebar, mockup showcase, scroll-driven feature highlighting"
```

---

## Task 9: CompetitorTable

**Files:**
- Create: `src/components/CompetitorTable.tsx`

- [ ] **Step 1: Create CompetitorTable.tsx**

```typescript
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, X, AlertTriangle } from "lucide-react";

type CellValue = "yes" | "no" | "partial";

const rows: { key: string; values: [CellValue, CellValue, CellValue, CellValue] }[] = [
  { key: "feature0", values: ["yes", "partial", "partial", "yes"] },
  { key: "feature1", values: ["yes", "no", "no", "no"] },
  { key: "feature2", values: ["yes", "no", "no", "no"] },
  { key: "feature3", values: ["yes", "no", "no", "no"] },
  { key: "feature4", values: ["yes", "yes", "no", "no"] },
  { key: "feature5", values: ["yes", "no", "no", "no"] },
  { key: "feature6", values: ["yes", "yes", "yes", "no"] },
  { key: "feature7", values: ["yes", "no", "no", "no"] },
];

const competitors = ["MyLife", "Hevy", "Strong", "FitNotes"];
const partialLabels: Record<string, string> = {
  feature0: "Abo",
};

function Cell({ value, featureKey, colIndex }: { value: CellValue; featureKey: string; colIndex: number }) {
  if (value === "yes") {
    return (
      <td className="px-4 py-4 text-center">
        <span className="inline-flex items-center justify-center">
          <Check
            className="w-4 h-4"
            style={{ color: colIndex === 0 ? "var(--cyan)" : "#34C759" }}
          />
        </span>
      </td>
    );
  }
  if (value === "partial") {
    return (
      <td className="px-4 py-4 text-center">
        <span
          className="inline-flex items-center gap-1 text-xs font-manrope"
          style={{ color: "var(--amber)" }}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          {partialLabels[featureKey] ?? "~"}
        </span>
      </td>
    );
  }
  return (
    <td className="px-4 py-4 text-center">
      <span className="inline-flex items-center justify-center">
        <X className="w-4 h-4" style={{ color: "var(--text-dim)" }} />
      </span>
    </td>
  );
}

export default function CompetitorTable() {
  const t = useTranslations("training.comparison");

  return (
    <div>
      {/* Heading */}
      <div className="mb-10">
        <h3
          className="font-barlow font-black text-white tracking-tight mb-2"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          {t("headline")}
        </h3>
        <p className="font-manrope text-sm" style={{ color: "var(--text-muted)" }}>
          {t("subline")}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border)" }}>
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th
                className="px-4 py-4 text-left font-manrope text-xs font-semibold"
                style={{ color: "var(--text-dim)", width: "35%" }}
              >
                Feature
              </th>
              {competitors.map((c, i) => (
                <th
                  key={c}
                  className="px-4 py-4 text-center font-manrope text-xs font-bold"
                  style={{
                    color: i === 0 ? "var(--cyan)" : "var(--text-dim)",
                    background: i === 0 ? "rgba(77,255,237,0.04)" : "transparent",
                    borderLeft: i === 0 ? "1px solid rgba(77,255,237,0.15)" : "none",
                    borderRight: i === 0 ? "1px solid rgba(77,255,237,0.15)" : "none",
                  }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ key, values }, rowIndex) => (
              <motion.tr
                key={key}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: rowIndex * 0.05 }}
                style={{ borderBottom: rowIndex < rows.length - 1 ? "1px solid var(--border)" : "none" }}
              >
                <td
                  className="px-4 py-4 font-manrope text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t(key)}
                </td>
                {values.map((v, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-4 text-center"
                    style={{
                      background: colIndex === 0 ? "rgba(77,255,237,0.03)" : "transparent",
                      borderLeft: colIndex === 0 ? "1px solid rgba(77,255,237,0.1)" : "none",
                      borderRight: colIndex === 0 ? "1px solid rgba(77,255,237,0.1)" : "none",
                    }}
                  >
                    {v === "yes" && (
                      <span className="inline-flex items-center justify-center">
                        <Check className="w-4 h-4" style={{ color: colIndex === 0 ? "var(--cyan)" : "#34C759" }} />
                      </span>
                    )}
                    {v === "no" && (
                      <span className="inline-flex items-center justify-center">
                        <X className="w-4 h-4" style={{ color: "var(--text-dim)" }} />
                      </span>
                    )}
                    {v === "partial" && (
                      <span className="inline-flex items-center gap-1 text-xs font-manrope" style={{ color: "var(--amber)" }}>
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {partialLabels[key] ?? "~"}
                      </span>
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CompetitorTable.tsx
git commit -m "feat: competitor comparison table with stagger reveal animation"
```

---

## Task 10: NutritionSection + LifeSection

**Files:**
- Modify: `src/components/NutritionSection.tsx` (rebuild)
- Create: `src/components/LifeSection.tsx`

- [ ] **Step 1: Rebuild NutritionSection.tsx**

```typescript
"use client";

import { useTranslations } from "next-intl";
import { Lock } from "lucide-react";
import FadeUp from "./FadeUp";
import IPhoneFrame from "./IPhoneFrame";

export default function NutritionSection() {
  const t = useTranslations("nutrition");

  return (
    <section id="nutrition" className="py-28 px-6 relative">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <FadeUp>
            <p
              className="section-label mb-4"
              style={{ color: "#34D399" }}
            >
              {t("label")}
            </p>
            <h2
              className="font-barlow font-black text-white tracking-tight leading-tight mb-5"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {t("headline")}
            </h2>
            <p className="font-manrope text-base mb-8" style={{ color: "var(--text-muted)" }}>
              {t("subline")}
            </p>

            <ul className="flex flex-col gap-3">
              {([0, 1, 2, 3] as const).map((i) => (
                <li key={i} className="flex items-center gap-3 font-manrope text-sm" style={{ color: "var(--text-dim)" }}>
                  <Lock className="w-3.5 h-3.5 shrink-0" style={{ color: "#333" }} />
                  {t(`f${i}`)}
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* Blurred mockup */}
          <FadeUp delay={0.15}>
            <div className="relative flex justify-center">
              {/* Emerald glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(52,211,153,0.08) 0%, transparent 70%)",
                }}
              />
              <div style={{ filter: "blur(8px)", opacity: 0.6 }}>
                <IPhoneFrame
                  src="/mockups/training-dashboard.svg"
                  alt="Nutrition Preview"
                  accentColor="#34D399"
                />
              </div>
              {/* Coming soon overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="px-6 py-3 rounded-full font-manrope font-bold text-sm"
                  style={{
                    background: "rgba(8,8,8,0.9)",
                    border: "1px solid rgba(52,211,153,0.3)",
                    color: "#34D399",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Coming Soon
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create LifeSection.tsx**

```typescript
"use client";

import { useTranslations } from "next-intl";
import { Lock } from "lucide-react";
import FadeUp from "./FadeUp";
import IPhoneFrame from "./IPhoneFrame";

export default function LifeSection() {
  const t = useTranslations("life");

  return (
    <section id="life" className="py-28 px-6 relative">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Blurred mockup (left on desktop) */}
          <FadeUp className="order-2 lg:order-1" delay={0.15}>
            <div className="relative flex justify-center">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(251,191,36,0.07) 0%, transparent 70%)",
                }}
              />
              <div style={{ filter: "blur(8px)", opacity: 0.6 }}>
                <IPhoneFrame
                  src="/mockups/training-dashboard.svg"
                  alt="Life Preview"
                  accentColor="#FBBF24"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="px-6 py-3 rounded-full font-manrope font-bold text-sm"
                  style={{
                    background: "rgba(8,8,8,0.9)",
                    border: "1px solid rgba(251,191,36,0.3)",
                    color: "#FBBF24",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  In Planung
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Content (right on desktop) */}
          <FadeUp className="order-1 lg:order-2">
            <p className="section-label mb-4" style={{ color: "#FBBF24" }}>
              {t("label")}
            </p>
            <h2
              className="font-barlow font-black text-white tracking-tight leading-tight mb-5"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {t("headline")}
            </h2>
            <p className="font-manrope text-base mb-8" style={{ color: "var(--text-muted)" }}>
              {t("subline")}
            </p>

            <ul className="flex flex-col gap-3">
              {([0, 1, 2, 3] as const).map((i) => (
                <li key={i} className="flex items-center gap-3 font-manrope text-sm" style={{ color: "var(--text-dim)" }}>
                  <Lock className="w-3.5 h-3.5 shrink-0" style={{ color: "#333" }} />
                  {t(`f${i}`)}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Check FadeUp accepts a delay prop**

Read `src/components/FadeUp.tsx`. If it doesn't accept `delay`, the `delay={0.15}` props above should be removed. Adjust accordingly.

- [ ] **Step 4: Commit**

```bash
git add src/components/NutritionSection.tsx src/components/LifeSection.tsx
git commit -m "feat: Nutrition and Life preview sections with blurred mockups"
```

---

## Task 11: StatsSection

**Files:**
- Create: `src/components/StatsSection.tsx`

- [ ] **Step 1: Create StatsSection.tsx**

```typescript
"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import FadeUp from "./FadeUp";

function StatItem({ value, suffix, label }: { value: number | null; suffix: string; label: string }) {
  const { ref, displayValue } = value !== null
    ? useAnimatedCounter(value, 1500, suffix)
    : { ref: useRef<HTMLDivElement>(null), displayValue: suffix };

  return (
    <FadeUp className="text-center py-8 px-6">
      <div
        ref={ref}
        className="font-courier font-bold text-white mb-3"
        style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
      >
        {displayValue}
      </div>
      <div className="font-manrope text-sm" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
    </FadeUp>
  );
}

export default function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section className="py-20 px-6 relative">
      <div className="divider absolute top-0 inset-x-0" />

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x"
          style={{ borderColor: "var(--border)" }}>
          <StatItem value={60} suffix="+" label={t("l0")} />
          <StatItem value={100} suffix="%" label={t("l1")} />
          <StatItem value={null} suffix="PWA" label={t("l2")} />
        </div>
      </div>
    </section>
  );
}
```

**Note:** `useAnimatedCounter` is called conditionally above which violates Rules of Hooks. Fix: always call the hook, but pass `target=0` when disabled:

```typescript
function StatItem({ target, suffix, label, animate }: { target: number; suffix: string; label: string; animate: boolean }) {
  const { ref, displayValue } = useAnimatedCounter(animate ? target : 0, 1500, "");

  return (
    <FadeUp className="text-center py-8 px-6">
      <div ref={ref} className="font-courier font-bold text-white mb-3"
        style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
        {animate ? displayValue : suffix}
      </div>
      <div className="font-manrope text-sm" style={{ color: "var(--text-muted)" }}>{label}</div>
    </FadeUp>
  );
}

export default function StatsSection() {
  const t = useTranslations("stats");
  return (
    <section className="py-20 px-6 relative">
      <div className="divider absolute top-0 inset-x-0" />
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3"
          style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <StatItem target={60} suffix="60+" label={t("l0")} animate={true} />
          <StatItem target={100} suffix="100%" label={t("l1")} animate={true} />
          <StatItem target={0} suffix="PWA" label={t("l2")} animate={false} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/StatsSection.tsx
git commit -m "feat: stats section with animated counters"
```

---

## Task 12: CTASection + Footer

**Files:**
- Modify: `src/components/CTASection.tsx` (rebuild)
- Modify: `src/components/Footer.tsx` (rebuild)

- [ ] **Step 1: Rebuild CTASection.tsx**

```typescript
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Coffee } from "lucide-react";
import FadeUp from "./FadeUp";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-36 px-6 relative text-center">
      <div className="divider absolute top-0 inset-x-0" />

      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(77,255,237,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-xl mx-auto">
        <FadeUp>
          <h2
            className="font-barlow font-black text-white tracking-tighter leading-none mb-4"
            style={{ fontSize: "clamp(5rem, 14vw, 10rem)" }}
          >
            {t("headline")}
          </h2>
          <p className="font-manrope text-base mb-10" style={{ color: "var(--text-muted)" }}>
            {t("subline")}
          </p>

          <a
            href={t("ctaUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-10 py-4 text-base font-manrope inline-flex items-center gap-3"
            style={{ fontSize: "1rem" }}
          >
            {t("primary")}
            <ArrowRight className="w-5 h-5" />
          </a>
        </FadeUp>

        {/* Donation */}
        <FadeUp delay={0.2}>
          <div className="mt-16 pt-10" style={{ borderTop: "1px solid var(--border)" }}>
            <p
              className="font-manrope text-sm mb-5 max-w-sm mx-auto"
              style={{ color: "var(--text-dim)", lineHeight: "1.7" }}
            >
              {t("donationCopy")}
            </p>
            <a
              href={t("donationUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-6 py-3 text-sm font-manrope inline-flex items-center gap-2"
            >
              <Coffee className="w-4 h-4" />
              {t("donationCta")}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rebuild Footer.tsx**

```typescript
"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.startsWith("/en") ? "en" : "de";
  const otherLocale = currentLocale === "de" ? "en" : "de";

  const handleLangSwitch = () => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${otherLocale}`);
    router.push(newPath);
  };

  return (
    <footer
      className="py-8 px-6"
      style={{ borderTop: "1px solid #161616" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 font-manrope text-xs" style={{ color: "#333" }}>
          <span className="font-barlow font-black text-sm tracking-tighter" style={{ color: "var(--text-dim)" }}>
            MY LIFE
          </span>
          <span>·</span>
          <span>{t("madeBy")}</span>
          <span>·</span>
          <a
            href={t("githubUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            {t("github")}
          </a>
          <span>·</span>
          <span>© 2026</span>
        </div>

        <button
          onClick={handleLangSwitch}
          className="font-manrope text-xs px-3 py-1.5 rounded-full transition-colors hover:text-white"
          style={{ color: "#333", border: "1px solid var(--border)" }}
        >
          {t("lang")}
        </button>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/CTASection.tsx src/components/Footer.tsx
git commit -m "feat: CTA section with donation block + minimal footer"
```

---

## Task 13: Page Assembly + FadeUp Check + Cleanup

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Read + potentially modify: `src/components/FadeUp.tsx`
- Delete: old components no longer needed

- [ ] **Step 1: Read FadeUp.tsx and verify/update it**

Read `src/components/FadeUp.tsx`. It should accept `children`, `className`, and optionally `delay`. If it doesn't accept `className` or `delay`, update it:

```typescript
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeUp({ children, className, delay = 0 }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Rewrite page.tsx with new section order**

```typescript
import HeroSection from "@/components/HeroSection";
import FloatingNavbar from "@/components/FloatingNavbar";
import EcosystemSection from "@/components/EcosystemSection";
import TrainingSection from "@/components/TrainingSection";
import NutritionSection from "@/components/NutritionSection";
import LifeSection from "@/components/LifeSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default async function Home() {
  return (
    <>
      <FloatingNavbar />
      <main>
        <HeroSection />
        <EcosystemSection />
        <TrainingSection />
        <NutritionSection />
        <LifeSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Delete obsolete components**

```bash
cd "D:\arved\20_Projekte\MyLife\MyLife-Website"
rm src/components/Navbar.tsx
rm src/components/EcosystemOverview.tsx
rm src/components/ComparisonTable.tsx
rm src/components/VisionRoadmap.tsx
rm src/components/ImprovementSection.tsx
```

- [ ] **Step 4: Run build to catch all TypeScript errors**

```bash
npm run build 2>&1
```

Fix any type errors. Common issues:
- Missing `"use client"` directive on components using hooks
- `Courier_Prime` import (use `Courier_Prime` not `CourierPrime` from next/font/google)
- `useAnimatedCounter` ref type — ensure `useRef<HTMLDivElement>(null)` matches the ref attachment target

- [ ] **Step 5: Run dev and do full page walkthrough**

```bash
npm run dev
```

Check http://localhost:3000/de top to bottom:
1. Particle hero loads, particles react to mouse
2. Scroll 100px → floating navbar appears
3. Ecosystem 3-card grid with tilt
4. Training: sticky sidebar + mockup swap + competitor table
5. Nutrition: blurred mockup + feature list
6. Life: same pattern, amber
7. Stats: counters animate on scroll
8. CTA: big headline + donation block
9. Footer: one-line

Check http://localhost:3000/en — same but English strings.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: MyLife Website v2 — complete redesign (black+cyan, particle hero, floating navbar, training showcase)"
```

---

## ⚠️ Execution Order Note

**Task 8 imports CompetitorTable before Task 9 creates it.** When executing, complete **Task 9 Step 1** (create `CompetitorTable.tsx`) immediately after Task 8 Step 1, before running dev or committing Task 8. Then commit both Task 8 and Task 9 together.

---

## Notes for Executor

- **No test framework is set up** in this project. Verification is done via `npm run build` (type errors) and `npm run dev` (visual check). Don't try to run `jest` or `vitest` — they're not installed.
- **`Courier_Prime`** in next/font/google uses underscore: `Courier_Prime`. Not `CourierPrime`.
- **`"use client"`** is required on any component that uses: `useState`, `useEffect`, `useRef`, `useRouter`, `usePathname`, Framer Motion hooks, `useTranslations` in a client context, or event handlers.
- **FadeUp's delay prop** — check if it exists before using it. If not, just remove the `delay` prop from call sites.
- **Particle count on mobile** is detected by `window.innerWidth < 768` which is browser-only. The check in `ParticleCanvas.tsx` is inside `useEffect` so it's safe.
- **`useActiveFeature`** uses a callback ref pattern to avoid calling `useRef` in a loop. `getSentinelRef(i)` returns a callback ref function — pass it as `ref={getSentinelRef(i)}`.
