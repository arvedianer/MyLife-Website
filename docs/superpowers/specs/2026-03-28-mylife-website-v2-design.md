# MyLife Website v2 — Design Spec
**Date:** 2026-03-28
**Status:** Approved by user

---

## 1. Goal

A premium, dark, high-energy marketing website for the MyLife ecosystem (3 apps). The primary goal: a visitor lands, instantly understands what MyLife is, feels the quality of the product, and clicks "Training öffnen" or scrolls through all three app sections convinced. The bar is Apple product pages — not a startup landing page template.

No purple. No emoji decoration. No childish animations. Evidence-based design: every visual element serves a communication purpose.

---

## 2. Design System

### Styling Approach
**Tailwind CSS** is the sole styling system. The existing `tailwind.config.ts` is extended with the new color tokens below. No CSS-in-JS. Component-level styles use Tailwind utility classes. Global base styles (keyframes, CSS custom properties) live in `globals.css`.

### Colors
Replace the existing indigo/violet/purple token set entirely. New tokens added to `tailwind.config.ts` under `theme.extend.colors` and also declared as CSS custom properties in `globals.css`:

```
--bg:          #080808   /* true black, not navy */
--bg-elevated: #111111
--card:        #161616
--border:      #222222
--border-hover:#333333
--cyan:        #4DFFED   /* brand accent — identical to Training App */
--cyan-dark:   #00CCC0
--cyan-glow:   rgba(77,255,237,0.15)
--text:        #FFFFFF
--text-muted:  #888888
--text-dim:    #555555
--emerald:     #34D399   /* Nutrition section accent */
--amber:       #FBBF24   /* Life section accent */
--success:     #34C759
--danger:      #FF3B30
```

**Remove entirely from globals.css and tailwind.config.ts:** `--indigo` (#6366f1), `--violet` (#8b5cf6), and all purple/indigo/violet variants. `constants/tokens.ts` (if it exists) is updated to match.

The `--emerald` and `--amber` tokens are new and supplement (do not conflict with) CLAUDE.md's existing token set. `--success: #34C759` and `--danger: #FF3B30` are preserved from the original spec.

### Typography
Three Google Font families, loaded via `next/font/google` in `layout.tsx`:
- **Headlines:** Barlow Condensed, weight 800 (ExtraBold)
- **Body:** Manrope, weights 400 / 500 / 700
- **Numbers / Stats:** Courier Prime, weight 600
- Fallback: system-ui, sans-serif

### Logo
Pure text/CSS implementation — no SVG file or external asset required.
- **Wordmark:** `MY LIFE` rendered as `<span>` in Barlow Condensed 800, letter-spacing `-0.02em`, all caps, color white
- **Monogram:** `[ML]` rendered as `<span>`, color `--cyan`, used in FloatingNavbar (14px) and browser tab favicon (generated as a simple text-based PNG at build time or manually created as a 32×32 PNG)
- File: `public/favicon.ico` — simple `[ML]` on black background, manually created

---

## 3. Page Architecture

Single-page app (one route per locale), all sections stacked vertically. Smooth scroll (`scroll-behavior: smooth`).

**i18n Architecture:** next-intl locale routing is preserved as-is. Routes are `/de` (default) and `/en`. The language toggle triggers a client-side `router.push()` to the alternate locale path — a full route change, not a context-only swap. This is the standard next-intl App Router pattern already in use; no architectural change needed. The toggle is a small pill button in the FloatingNavbar (right side, beside the CTA) and repeated in the Footer.

```
/[locale] (page.tsx)
├── HeroSection
├── FloatingNavbar (position: fixed, z-index 50)
├── EcosystemSection          id="ecosystem"
├── TrainingSection           id="training"
│   ├── FeatureSidebar (sticky)
│   ├── MockupShowcase
│   └── CompetitorTable
├── NutritionSection          id="nutrition"
├── LifeSection               id="life"
├── StatsSection
├── CTASection
└── Footer
```

---

## 4. Section Specifications

### 4.1 Hero Section

**Purpose:** Instant WOW. Communicate brand, hook visitor in 3 seconds.

**Layout:** `min-h-screen` (100dvh). Centered content via flex. No navbar visible.

**Background:** Custom Canvas particle system (pure Canvas API, zero dependencies).

Particle behavior:
- **Desktop:** 2000 particles. **Mobile (≤768px):** 500 particles. **`prefers-reduced-motion`:** 0 particles (canvas hidden, static dark background shown instead).
- Each particle: cyan dot, 1–2px radius, opacity 0.3–0.7, randomized initial position across full canvas
- **Idle:** slow Brownian drift — each particle has a velocity vector with tiny random perturbation each frame
- **Mouse repulsion:** `mousemove` listener. For each particle within 80px of cursor: apply outward force proportional to `1/distance`. Particles snap back with spring damping (friction 0.92, return force 0.02 per frame toward original position)
- **Scroll dissolve:** `scroll` listener. At `scrollY > 50`: multiply each particle's velocity by `1 + scrollY * 0.003`, reduce global alpha linearly from 1.0 → 0 as `scrollY` goes 0 → 300px

**`prefers-reduced-motion` fallback:** When `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true, the canvas is not initialized. Instead, a static `#080808` background with a subtle radial gradient (`radial-gradient(ellipse at 50% 0%, rgba(77,255,237,0.06) 0%, transparent 70%)`) is shown.

**Content (centered, z-index 10 above canvas):**
1. Live badge — `● Training ist live` — pill, `glass` class, green pulse dot (`animate-pulse`)
2. `MY LIFE` — Barlow Condensed 800, `clamp(5rem, 12vw, 10rem)`, white, letter-spacing `-0.02em`
3. `Training. Nutrition. Life.` — Manrope 500, `1.25rem`, `#888888`
4. `Von einem Lifter für Lifter. Kostenlos.` — Manrope 400, `1rem`, `#555555`
5. CTAs (flex row, gap 12px, centered, wrap on mobile):
   - Primary: `Training App öffnen →` — pill, `background: #4DFFED`, `color: #080808`, `font-weight: 700`, `box-shadow: 0 0 30px rgba(77,255,237,0.4)`; hover: `box-shadow` increases to `60px`
   - Ghost: `Mehr erfahren ↓` — pill, `border: 1px solid #333`, `color: #888`, hover `color: #fff border-color: #555`
6. Scroll indicator: `1px` vertical line, `#333`, 40px height, `animate-pulse`, below CTAs

**Mount animations (Framer Motion, `initial` → `animate`):**
All elements: `opacity: 0, y: 20` → `opacity: 1, y: 0`. Duration `0.6s`, ease `[0.16, 1, 0.3, 1]`. Stagger: badge 0s, headline 0.1s, sub 0.25s, subline 0.35s, CTAs 0.45s, indicator 0.7s.

---

### 4.2 Floating Island Navbar

**Behavior:** Not rendered on initial load. Appears when `scrollY > 100`. Uses `useScrollThreshold(100)` hook which returns `isPast: boolean`. `AnimatePresence` wraps the nav; it mounts/unmounts based on `isPast`.

**Layout:** `position: fixed`, `top: 20px`, `left: 50%`, `transform: translateX(-50%)`, `z-index: 50`. Pill shape. Max-width `640px`, min-width `320px`. Width: `fit-content`.

**Visual:**
- Background: `rgba(8,8,8,0.85)` + `backdrop-filter: blur(20px) saturate(1.5)`
- Border: `1px solid #222`
- Border-radius: `9999px`
- Padding: `6px 8px 6px 16px`

**Contents (flex row, `items-center`, `justify-between`, `gap-6`):**
- Left: `[ML]` in Barlow Condensed 800, 14px, `#4DFFED`
- Center: nav links `<a href="#training">Training</a>` `<a href="#nutrition">Nutrition</a>` `<a href="#life">Life</a>` — Manrope 500, 13px, `#888`, hover `#fff`, transition 150ms
- Right (flex row gap-2):
  - Language toggle: `DE / EN` pill — 11px, `#555`, hover `#fff`, triggers `router.push('/[locale]')`
  - CTA: `Training öffnen` — pill, bg `#4DFFED`, color `#080808`, 13px, font-weight 700, padding `6px 14px`

**Framer Motion entry:** `initial: { opacity: 0, y: -16, scale: 0.95 }` → `animate: { opacity: 1, y: 0, scale: 1 }`. Spring: `stiffness: 300, damping: 30`. Exit: `opacity: 0, y: -8, scale: 0.97`.

---

### 4.3 Ecosystem Overview

**Purpose:** Show the 3-app vision in 10 seconds. Clear status per app.

**Layout:** Section heading centered above. 3 cards in a `grid grid-cols-1 md:grid-cols-3 gap-6`. Max-width `1100px`, centered.

**Section heading:**
- Label: `DAS ÖKOSYSTEM` — 11px, Manrope 700, tracking `0.18em`, `#4DFFED`
- Headline: `Drei Apps. Eine Vision.` — Barlow Condensed 800, `clamp(2.5rem, 5vw, 4rem)`, white
- Subline: `Trainieren, ernähren, leben — alles verbunden.` — Manrope 400, `#888`

**Each AppCard (`components/AppCard.tsx`):**
- Background: `#161616`, border-top: `2px solid [accent]`, border-left/right/bottom: `1px solid #222`
- border-radius: `16px`, padding: `32px`
- Top: lucide-react icon, 28px, `[accent]` color
- App name: Barlow Condensed 700, `1.5rem`, white
- 1-line tagline: Manrope 400, `0.875rem`, `#888`
- Feature bullets (3 items): `0.8rem`, `#555`, `•` bullet in `[accent]`
- Badge: `LIVE` | `COMING SOON` | `IN PLANUNG` (styled via `badge-live`, `badge-soon`, `badge-planned` classes)
- 3D tilt via `useMouseTilt(cardRef)` — applies inline `transform` CSS, no re-renders

**Accents:**
- Training: `#4DFFED`, icon: `Dumbbell`
- Nutrition: `#34D399`, icon: `Apple` (or `Salad`)
- Life: `#FBBF24`, icon: `Leaf`

---

### 4.4 Training Deep-Dive

**Purpose:** Prove Training is the best free workout tracker with features no competitor has.

**Section layout:** Two-column sticky pattern.

**Outer wrapper:** `grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-0 items-start`. Min-height: `600px`.

**Left column — `FeatureSidebar`:**
- `position: sticky`, `top: 88px` (below floating navbar), `height: fit-content`
- 6 feature items. Each is a `<button>` with:
  - Left border: `2px solid transparent` → `2px solid #4DFFED` when active
  - Text: `#555` → `#fff` when active; subtitle `#333` → `#888` when active
  - transition: `all 0.2s`
  - Click: sets `activeFeature` state (index 0–5)

**Right column — `MockupShowcase`:**
- iPhone frame: pure CSS component (`components/IPhoneFrame.tsx`)
  - Outer: `width: 280px`, `height: 560px`, `border-radius: 36px`, `border: 8px solid #222`, `background: #111`, `position: relative`
  - Notch: `::before` pseudo, centered top, `width: 80px height: 22px`, `background: #000`, `border-radius: 0 0 12px 12px`
  - Inner screen: `width: 100%, height: 100%`, `overflow: hidden`, `border-radius: 28px`
  - **Mockup dimensions:** `264px × 544px` (screen interior). All placeholder SVGs and final Rotato PNG exports must match this aspect ratio (`264:544 ≈ 1:2.06`, i.e. approx iPhone 14 proportions).
- Inside frame: `<AnimatePresence mode="wait">` wraps a `<motion.img>` keyed on `activeFeature`. Transition: `opacity: 0, x: 20` → `opacity: 1, x: 0` → exit `opacity: 0, x: -20`. Duration 0.25s.
- Mockup images: `public/mockups/training-[feature].svg` (Phase 1) → `public/mockups/training-[feature].png` (Phase 2). `next/image` with `width=264 height=544`.

**Scroll auto-advance (how `useActiveFeature` works):**
- The right panel contains 6 invisible sentinel `<div>` elements, one per feature, each `height: 180px` (total scroll zone: 1080px).
- `useActiveFeature(containerRef)` attaches an `IntersectionObserver` to each sentinel (`threshold: 0.5`). When a sentinel enters the viewport, it fires a callback with its index → sets `activeFeature`.
- The left sidebar reflects `activeFeature` as the highlighted item.
- User can also click a sidebar item directly → scrolls the right panel to that sentinel via `scrollIntoView`.

**Competitor Comparison Table** (`components/CompetitorTable.tsx`):
- Placed below the sticky section, full width, standard document flow
- Headline: `Warum nicht einfach eine andere App?` — Barlow Condensed 800, `clamp(2rem, 4vw, 3rem)`, white; subline: `Wir haben verglichen.`
- Table: `width: 100%`, `border-collapse: collapse`. 5 columns.
- Header row: `MyLife` column header has `background: rgba(77,255,237,0.08)`, cyan text, bold. Others: `#555`, normal weight.
- Each row revealed on scroll via `FadeUp` wrapper + `staggerChildren: 0.05s`.
- Cell icons: `✓` rendered as a `<span className="text-cyan-400">` (custom SVG checkmark), `✗` as `<span className="text-gray-600">`, `⚠` as `<span className="text-amber-400">`.

| Feature | MyLife | Hevy | Strong | FitNotes |
|---|---|---|---|---|
| Kostenlos | ✓ | ⚠ Abo | ⚠ Abo | ✓ |
| KI-Coach | ✓ | ✗ | ✗ | ✗ |
| Progressive Overload KI | ✓ | ✗ | ✗ | ✗ |
| Athlete Score | ✓ | ✗ | ✗ | ✗ |
| Community / Forum | ✓ | ✓ | ✗ | ✗ |
| PWA — kein App Store | ✓ | ✗ | ✗ | ✗ |
| Dark Mode always | ✓ | ✓ | ✓ | ✗ |
| Deutsch | ✓ | ✗ | ✗ | ✗ |

---

### 4.5 Nutrition Preview

**Content:**
- Label: `COMING SOON` — 11px, Manrope 700, `#34D399`, tracking `0.18em`
- Headline: `Iss nicht ins Blaue.` — Barlow Condensed 800, `clamp(2.5rem, 6vw, 4.5rem)`, white
- Subline: `KI-basiertes Ernährungs-Tracking. Makros die zu deinem Training passen.` — Manrope 400, `#888`
- Feature list (4 items, lucide `Lock` icon in `#333`): text `#555`
- Blurred iPhone frame: same CSS frame, `filter: blur(10px)`, wrapped in `relative` container with `emerald` glow overlay `rgba(52,211,153,0.06)`
- No email input (keep it clean)

---

### 4.6 Life Preview

Same structure as Nutrition. Amber (`#FBBF24`) accent.

- Headline: `Gewohnheiten die bleiben.`
- Subline: `Nicht der 10. Habit-Tracker. Der einzige der mit deinem Training verbunden ist.`
- Features: Tages-Routinen, Streak-Tracking, Ziel-System, Sync mit Training & Nutrition

---

### 4.7 Stats Section

**Layout:** `grid grid-cols-1 sm:grid-cols-3`, `max-width: 800px`, centered, generous `py-24`.

**Each stat:** `text-center`
- Value: Courier Prime 600, `clamp(3rem, 6vw, 5rem)`, white — animated via `useAnimatedCounter`
- Label: Manrope 500, 14px, `#888`

Values:
- `60+` → Übungen in der Bibliothek
- `100%` → Kostenlos. Immer.
- `PWA` → Kein App Store nötig (no animation — static string)

---

### 4.8 Final CTA + Donation

**Layout:** Centered, `py-32`, `max-width: 600px`.

- Headline: `Bereit?` — Barlow Condensed 800, `clamp(4rem, 10vw, 8rem)`, white
- Subline: `Starte dein erstes Workout in 2 Minuten.` — Manrope 400, `#888`
- Primary CTA: large pill, bg `#4DFFED`, color `#080808`, font-weight 700, `box-shadow: 0 0 40px rgba(77,255,237,0.5)`, text `Training App öffnen →`
- Thin divider `1px solid #1a1a1a`, `my-12`
- Donation copy: `Diese App entsteht in der Freizeit. Kostenlos. Immer.` — Manrope 400, `#444`
- Donation CTA: ghost pill, `☕ Arved einen Kaffee kaufen` — links to `https://ko-fi.com` or `https://paypal.me` (placeholder URL, to be filled by Arved)

---

### 4.9 Footer

Single line. `py-8`. `border-top: 1px solid #161616`.

```
MY LIFE  ·  Made by Arved  ·  GitHub  ·  © 2026
```

- Text: Manrope 400, 13px, `#333`
- Links: hover `#fff`, 150ms transition
- Language toggle pill: `DE / EN` same as navbar variant

---

## 5. Custom Hooks

### `useParticleCanvas(canvasRef, options)`
`options: { count: number, reducedMotion: boolean }`
- If `reducedMotion` is true: immediately returns, no canvas initialization
- Runs `requestAnimationFrame` loop: clear canvas → update positions → draw
- Cleanup: cancels rAF on unmount, removes event listeners
- Particle count: caller passes `count` (2000 desktop, 500 mobile, 0 reduced-motion). Caller detects via `window.innerWidth < 768` and `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.

### `useMouseTilt(ref)`
- Attaches `pointermove` / `pointerleave` to `ref.current`
- On move: calculates `(x - rect.centerX) / (rect.width/2)` and `(y - rect.centerY) / (rect.height/2)` → maps to `rotateY: ±8deg, rotateX: ±5deg`
- On leave: resets to `rotateX: 0, rotateY: 0, scale: 1`
- Applies via `ref.current.style.transform` directly — no React re-renders
- Adds `transition: transform 0.1s` on move, `transition: transform 0.4s ease` on leave

### `useScrollThreshold(threshold: number): boolean`
- Attaches `scroll` listener, returns `scrollY > threshold`
- Uses `useState` + `useEffect` with passive listener
- Returns: `isPast: boolean`

### `useAnimatedCounter(target: number, duration: number, suffix: string)`
- Uses `useRef` for IntersectionObserver on the element
- On viewport enter: starts rAF loop from 0 → target, ease-out (quadratic), over `duration` ms
- Returns: `{ ref, displayValue: string }` — `displayValue` is `Math.round(current) + suffix`

### `useActiveFeature(containerRef, count: number): [number, (i: number) => void]`
- Creates `count` sentinel refs
- Attaches `IntersectionObserver` (`threshold: 0.5`) to each sentinel
- When sentinel `i` intersects: calls `setActiveFeature(i)`
- Returns: `[activeFeature, setActiveFeature]` — `setActiveFeature` used by sidebar clicks
- Sentinel `<div>` elements must be placed in the right-panel scroll area, one per feature, each `h-[180px]`

---

## 6. Component Tree

```
app/[locale]/page.tsx
├── HeroSection                         (src/components/HeroSection.tsx)
│   └── ParticleCanvas                  (src/components/ParticleCanvas.tsx)
├── FloatingNavbar                      (src/components/FloatingNavbar.tsx)
├── EcosystemSection                    (src/components/EcosystemSection.tsx)
│   └── AppCard × 3                     (src/components/AppCard.tsx)
├── TrainingSection                     (src/components/TrainingSection.tsx)
│   ├── FeatureSidebar                  (inline or sub-component)
│   ├── MockupShowcase                  (src/components/MockupShowcase.tsx)
│   │   └── IPhoneFrame                 (src/components/IPhoneFrame.tsx)
│   └── CompetitorTable                 (src/components/CompetitorTable.tsx)
├── NutritionSection                    (src/components/NutritionSection.tsx)
├── LifeSection                         (src/components/LifeSection.tsx)
├── StatsSection                        (src/components/StatsSection.tsx)
├── CTASection                          (src/components/CTASection.tsx)
└── Footer                              (src/components/Footer.tsx)

src/hooks/
├── useParticleCanvas.ts
├── useMouseTilt.ts
├── useScrollThreshold.ts
├── useAnimatedCounter.ts
└── useActiveFeature.ts
```

---

## 7. Mockup Strategy

**iPhone frame dimensions (fixed for all mockups):** `264px × 544px` (screen area inside CSS frame). This is approx iPhone 14 proportions (`9:18.5 ratio`). All Phase 1 SVG placeholders and Phase 2 Rotato PNG exports use exactly these dimensions to prevent layout reflow.

**Phase 1 (implementation):** Each `public/mockups/training-[name].svg` is a 264×544 SVG with:
- Background: `#111111`
- Centered label text (e.g. "Active Workout") in `#4DFFED`, Manrope 500

**Phase 2 (after Rotato exports):** Drop-in PNG replacements at `264×544px`. `next/image` with `width=264 height=544 priority={false}`.

Files needed:
- `public/mockups/training-workout.svg` / `.png`
- `public/mockups/training-stats.svg` / `.png`
- `public/mockups/training-coach.svg` / `.png`
- `public/mockups/training-splits.svg` / `.png`
- `public/mockups/training-forum.svg` / `.png`
- `public/mockups/training-dashboard.svg` / `.png`

---

## 8. What Gets Rebuilt vs Preserved

| File | Action |
|---|---|
| `src/app/globals.css` | Rewrite — remove indigo/violet/purple, new token set |
| `tailwind.config.ts` | Update `theme.extend.colors` with new tokens |
| `src/components/Navbar.tsx` | Delete → replaced by `FloatingNavbar.tsx` |
| `src/components/HeroSection.tsx` | Rebuild from scratch |
| `src/components/EcosystemOverview.tsx` | Delete → replaced by `EcosystemSection.tsx` + `AppCard.tsx` |
| `src/components/TrainingSection.tsx` | Rebuild (sticky pattern + new sub-components) |
| `src/components/NutritionSection.tsx` | Rebuild |
| `src/components/ImprovementSection.tsx` | Delete → replaced by `LifeSection.tsx` |
| `src/components/ComparisonTable.tsx` | Delete → replaced by `CompetitorTable.tsx` inside TrainingSection |
| `src/components/CTASection.tsx` | Rebuild |
| `src/components/Footer.tsx` | Rebuild (simplify) |
| `src/components/VisionRoadmap.tsx` | Delete (concept folded into section previews) |
| `src/components/FadeUp.tsx` | **Keep** (scroll-fade utility, used everywhere) |
| `src/components/Icons.tsx` | **Keep + extend** |
| `src/components/LanguageToggle.tsx` | **Keep** (reuse in FloatingNavbar + Footer) |
| `src/lib/animation.ts` | **Keep + extend** (add new easing curves) |
| `src/i18n/` | **Keep** (all files) |
| `src/middleware.ts` | **Keep** |
| `next.config.mjs` | **Keep** |
| `messages/de.json` | Update keys for new section text |
| `messages/en.json` | Update keys for new section text |
| `src/hooks/` (new directory) | Create — all 5 custom hooks |

---

## 9. Performance Constraints

- **Particles:** adaptive count (2000 desktop / 500 mobile / 0 reduced-motion). Canvas `will-change: opacity`. Particle loop: only runs while hero is in viewport (`IntersectionObserver` on hero section stops the rAF loop when scrolled out).
- **Images:** `next/image`, `loading="lazy"`, `priority={false}` except hero if it has an image
- **Fonts:** `next/font/google` — subset + display swap, zero layout shift
- **No heavy deps:** No Spline, no Remotion, no GSAP, no three.js. Only Framer Motion (already installed) + Tailwind + Canvas API.
- **Target:** Lighthouse Performance ≥ 90 on desktop, ≥ 75 on mobile (particle system is the main mobile cost)

---

## 10. i18n

All display text lives in `messages/de.json` and `messages/en.json`. No hardcoded German or English strings in components — all via `useTranslations()`. Language toggle: `router.push('/' + newLocale)` — standard next-intl pattern. Default locale: `de`.

New i18n keys needed (additions to existing files):
- `ecosystem.label`, `ecosystem.headline`, `ecosystem.subline`
- `training.sectionLabel`, `training.feature[0-5].title`, `training.feature[0-5].subtitle`
- `training.comparison.headline`, `training.comparison.subline`
- `nutrition.label`, `nutrition.headline`, `nutrition.subline`, `nutrition.feature[0-3]`
- `life.label`, `life.headline`, `life.subline`, `life.feature[0-3]`
- `stats.stat[0-2].value`, `stats.stat[0-2].label`
- `cta.headline`, `cta.subline`, `cta.primary`, `cta.donationCopy`, `cta.donationCta`
