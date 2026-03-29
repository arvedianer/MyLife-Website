# MyLife Website — Vollständiger Workflow für Claude Code

> **Diese Datei ist der Haupt-Prompt für eine neue Claude Code Sitzung.**
> Lies alles komplett bevor du irgendetwas tust.

---

## 0. WAS DU BAUST

Eine **professionelle Marketing-Website für das MyLife-Ökosystem** — drei Apps, eine Vision.
Ziel: Jemand besucht die Seite, versteht sofort was MyLife ist, sieht die Training-App in Aktion und klickt direkt auf "Öffnen" oder "Herunterladen".

**Die drei Apps des Ökosystems:**
1. **MyLife Training** — Kraft-Training App (fertig, live unter https://mylifetraining.vercel.app)
2. **MyLife Kalorien** — Ernährungs-Tracking (in Planung)
3. **MyLife Life** — Gewohnheiten & Life-Improvement (in Planung)

**Die Seite soll:**
- Das Ökosystem-Konzept klar und visuell stark erklären
- MyLife Training **featured** zeigen mit echten Screenshots/Mockups aller Features
- Jeden Feature-Block mit echten App-Bildern illustrieren (Rotato 3D Mockups)
- Einen direkten Link zur Training-App haben
- Einen Spenden-Button enthalten
- Auf einem völlig anderen Niveau sein als "normale" Gym-App-Sites

---

## 1. DESIGN-PHILOSOPHIE

**Inspirationsquellen — ALLE LESEN bevor du designst:**

- **Design Spells** → https://www.designspells.com/ — Micro-Interactions, Easter Eggs, Details die sich magisch anfühlen. Diese Seite ist Pflicht. Jedes Feature der Website soll ein dieser "Spells" haben.
- **UI Guideline** → https://www.uiguideline.com/ — Wie große Design-Systeme Komponenten bauen und dokumentieren. Referenz für konsistente, professionelle UI.
- **React Bits** → https://reactbits.dev/ — Animierte, interaktive React-Komponenten. Direkt nutzen oder als Inspiration.

**Visual Identity — identisch zur Training App:**

```
Hintergrund:    #080808 (fast schwarz)
Karten:         #161616
Akzent:         #4DFFED (Cyan)
Akzent Dark:    #00CCC0
Text:           #FFFFFF / #F5F5F5
Text Muted:     #AAAAAA
Danger:         #FF3B30
Success:        #34C759
Border:         #262626
Cheffe Gold:    #FFD700
```

**Typografie:**
- Headlines: Barlow Condensed (800 ExtraBold für Hero) — lädt von Google Fonts
- Body: Manrope (400/500/700)
- Numbers/Stats: Courier Prime (600)

**Ton:** Direkt, selbstbewusst, jung. Kein Corporate-Speak. Kurze Sätze. Wie Arved selbst reden würde.

**Vibe:** Dark, clean, high-energy. Wie ein Premium Fitness-Produkt — nicht wie eine Uni-Hausarbeit über Apps.

---

## 2. TECH STACK

```
Next.js 14 (App Router)     — Basis
TypeScript                  — Strict Mode
Framer Motion               — Scroll-Animationen, Page Transitions, alle Mikro-Animationen
Tailwind CSS                — Styling (oder CSS-in-JS wie in Training App)
@splinetool/react-spline    — 3D Hero-Element
React Bits Components       — Animierte UI-Elemente
Remotion (optional)         — Wenn Video-Animationen nötig werden
```

**KEINE Backend-Abhängigkeiten** — reine Static Site, Vercel Deploy.

---

## 3. TOOLS FÜR ASSETS — WIE NUTZEN

### Rotato (3D Phone Mockups) — https://app.rotato.app/
**Was:** Erstellt 3D-Gerät-Mockups (iPhone, iPad) aus Screenshots.
**Wann nutzen:** Für alle App-Screenshots auf der Website.
**Workflow:**
1. Screenshots aus der Training-App machen (https://mylifetraining.vercel.app)
2. In Rotato importieren → 3D iPhone-Rahmen drum
3. Schönen Winkel/Beleuchtung wählen (dark background, leichte Neigung)
4. Als PNG/WebP exportieren (transparent oder auf #080808 Hintergrund)
5. Als `public/mockups/` in die Website

**Wichtigste Screens zum Mocken:**
- Dashboard (Home)
- Aktives Workout (die Herzstück-Seite)
- Stats-Seite (Athlete Score)
- Coach Arved Chat
- Forum-Tab
- Splits-Übersicht

### Spline (3D Webgl) — https://spline.design/
**Was:** 3D-Elemente direkt im Browser, exportierbar als `@splinetool/react-spline` Komponente.
**Wann nutzen:** Hero-Section — ein rotierendes 3D-Element (z.B. abstraktes Gewicht, 3D-Buchstaben "MY LIFE", oder ein Fitness-Objekt).
**Installation:** `npm install @splinetool/react-spline @splinetool/runtime`
**Einbinden:**
```tsx
import Spline from '@splinetool/react-spline';
<Spline scene="https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode" />
```
**Hinweis:** Spline-Dateien sind groß — lazy-loaden, Fallback zeigen während geladen wird.

### Unicorn Studio (WebGL Effekte) — https://www.unicorn.studio/
**Was:** No-Code WebGL Effekte — Particle-Backgrounds, Glitch-Effekte, glühende Linien.
**Wann nutzen:** Als Hintergrundeffekt in der Hero-Section oder einem Feature-Block.
**Export:** Embeddable `<script>` Tag oder als Framer/Webflow Component.

### Remotion — https://www.remotion.dev/
**Was:** Videos programmatisch mit React erstellen.
**Wann nutzen:** Falls ein Feature-Video gebraucht wird das die App zeigt (z.B. ein kurzes Loop-Video "Wie funktioniert Coach Arved?").
**Hinweis:** Aufwendig — nur nutzen wenn wirklich sinnvoll. Rotato + echte Screenshots priorisieren.

### React Bits — https://reactbits.dev/
**Was:** Collection of animierter React-Komponenten.
**Nutze diese Komponenten:**
- Animated counters für Stats-Zahlen (z.B. "12.000+ Workouts getrackt")
- Typewriter-Effekt für den Hero-Headline
- Magnetic Buttons für CTAs
- Blur-In Textanimationen für Feature-Beschreibungen

---

## 4. SEITEN-STRUKTUR & CONTENT

### `/` — Hauptseite (One-Pager)

#### Section 1: Hero
```
[3D Spline Element oder WebGL Background]

MY LIFE
Training. Nutrition. Life.

[ → App öffnen ]  [ Mehr erfahren ↓ ]

Kleiner Subtext: "Von einem Lifter für Lifter. Kostenlos."
```

#### Section 2: Das Ökosystem
```
3 Cards nebeneinander:

[🏋️ TRAINING]     [🥗 KALORIEN]      [🌱 LIFE]
Kraft tracken      Essen tracken       Gewohnheiten
Splits planen      Makros berechnen    Ziele setzen
Coach Arved        KI-Ernährungsplan   Tages-Routinen

LIVE →             Coming Soon         Coming Soon
```

#### Section 3: MyLife Training — Featured
```
Headline: "Die smartste Trainings-App die du nie kaufen musst."
Subtext: 2-3 Zeilen warum sie besser ist als alles andere.

[Großes 3D Mockup des Dashboards]
```

#### Section 4: Features — Abwechselnd Links/Rechts

Feature-Blöcke (je Feature: Mockup + Text):

1. **Aktives Workout**
   - Mockup: Active Workout Screen
   - Headline: "Kein Workout ohne System."
   - Body: Progressive Overload, KI-Gewichtsvorschläge, PR-Erkennung

2. **Athlete Score**
   - Mockup: Stats Screen
   - Headline: "0-1000. Wo stehst du wirklich?"
   - Body: 5 Dimensionen, echter Vergleich, Lebenszeit-Tracking

3. **Coach Arved**
   - Mockup: Chat Screen
   - Headline: "Kein Chatbot. Arved."
   - Body: Persönliche Daten kennt er, antwortet wie ein Mensch

4. **Splits & Übungen**
   - Mockup: Splits Screen
   - Headline: "Dein Plan. Dein Weg."
   - Body: Arnold Split, PPL, Bro Split — oder komplett eigener

5. **Community & Forum**
   - Mockup: Forum Screen
   - Headline: "Trainier nicht allein."
   - Body: Live sehen wer trainiert, Cheffe-Rolle, DMs

#### Section 5: Stats/Numbers (animiert)
```
[Animated Counter]   [Animated Counter]   [Animated Counter]
60+ Übungen          Kostenlos            PWA — keine App nötig
```

#### Section 6: "Warum MyLife?"
```
Vergleichstabelle:
                MyLife Training    Andere Apps
Kostenlos?         ✅                ❌ (meist Abo)
KI-Coach?          ✅                ❌
Community?         ✅                selten
Open Source?       soon              nein
Dark Mode?         always            optional
```

#### Section 7: CTA + Spende
```
Headline: "Bereit?"

[ → Jetzt Training starten ]

---

[Kleiner Block]
Diese App wird in der Freizeit entwickelt und ist kostenlos.
Wenn du willst dass sie weiterlebt:

[ ☕ Arved einen Kaffee kaufen ]  (Ko-Fi / PayPal Link)
```

#### Footer
```
MyLife Training · Made by Arved
[GitHub Link wenn gewünscht]  [Instagram?]
© 2026
```

---

## 5. ANIMATION-SYSTEM

Alle Animationen mit **Framer Motion**. Konsistente Patterns:

```tsx
// Standard Scroll-Fade-In (für alle Sections)
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Feature Cards (stagger)
const staggerContainer = {
  whileInView: { transition: { staggerChildren: 0.1 } }
};

// Mockup Tilt (on hover)
const mockupHover = {
  whileHover: { rotateY: 5, rotateX: -3, scale: 1.02 },
  transition: { type: "spring", stiffness: 300 }
};
```

**Design Spells to implement** (aus https://www.designspells.com/ holen):
- Cursor-Trail-Effekt im Hero
- Magnetic-Button-Effekt auf allen CTAs (Button zieht Cursor an)
- Parallax-Scroll auf den Mockup-Bildern
- Zahl-Counter Animation wenn Stats in den Viewport kommen
- Smooth-Scroll zwischen Sections

---

## 6. FILE-STRUKTUR

```
MyLife-Website/
├── app/
│   ├── layout.tsx          # Fonts, Metadata, global styles
│   ├── page.tsx            # One-Pager (alle Sections)
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── EcosystemSection.tsx
│   │   ├── FeaturedSection.tsx
│   │   ├── FeatureBlock.tsx    # Wiederverwendbar (links/rechts Variante)
│   │   ├── StatsSection.tsx
│   │   ├── CompareSection.tsx
│   │   └── CTASection.tsx
│   ├── ui/
│   │   ├── AnimatedCounter.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── MockupFrame.tsx      # 3D-Tilt Wrapper für Mockup-Bilder
│   │   ├── GlowBorder.tsx
│   │   └── TypewriterText.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── public/
│   ├── mockups/            # Rotato-generierte 3D Phone Mockups
│   │   ├── dashboard.png
│   │   ├── workout.png
│   │   ├── stats.png
│   │   ├── coach.png
│   │   ├── forum.png
│   │   └── splits.png
│   ├── icons/
│   └── og-image.png        # Open Graph für Social Sharing
├── constants/
│   └── tokens.ts           # Identisch zur Training App (copy-paste)
├── next.config.js
├── package.json
└── CLAUDE.md               # Diese Datei
```

---

## 7. WORKFLOW — IN DIESER REIHENFOLGE

**Schritt 1: Projekt aufsetzen**
```bash
npx create-next-app@latest . --typescript --app --no-tailwind --eslint
npm install framer-motion @splinetool/react-spline
npm install lucide-react
```
Dann `constants/tokens.ts` aus der Training App kopieren.

**Schritt 2: Mockups erstellen (BEVOR du codest)**
- Training App öffnen (https://mylifetraining.vercel.app)
- Screenshots von allen 6 wichtigen Screens machen (Desktop + Mobile)
- In Rotato (https://app.rotato.app/) als 3D iPhone Mockups rendern
- In `public/mockups/` speichern

**Schritt 3: Spline 3D Hero erstellen**
- Spline öffnen (https://spline.design/)
- Einfaches 3D-Element erstellen: z.B. abstraktes rotierendes Objekt in Cyan (#4DFFED)
- Oder: 3D-Text "MY LIFE" mit Glow-Effekt
- Exportieren als Spline-URL und in HeroSection einbinden

**Schritt 4: Layout & Tokens**
- `app/layout.tsx` mit Google Fonts (Barlow Condensed + Manrope + Courier Prime)
- `constants/tokens.ts` einfügen
- `globals.css` mit Reset und Base-Styles

**Schritt 5: Section für Section bauen (top → bottom)**
- HeroSection (Spline/WebGL + Headline + CTAs)
- EcosystemSection (3 Cards)
- FeaturedSection (großes Mockup)
- FeatureBlocks (6× abwechselnd)
- StatsSection (animated counters)
- CompareSection (Tabelle)
- CTASection (Final CTA + Spende)
- Footer

**Schritt 6: Animationen hinzufügen**
- Framer Motion scroll-based animations in allen Sections
- Magnetic Buttons auf CTAs
- Mockup-Tilt-Effekt
- Parallax auf Hero

**Schritt 7: Design Spells Layer**
- Cursor-Trail in Hero
- Micro-Interactions auf Hover-States
- Easter Egg (z.B. Konami-Code aktiviert PR-Konfetti 🏆)

**Schritt 8: SEO & Meta**
- `og:image` generieren (1200×630, Dark mit Logo/Headline)
- title, description, keywords
- robots.txt, sitemap

**Schritt 9: Deploy**
```bash
npx vercel --prod
```
Ziel-Domain: `mylife.app` oder `mylifeapp.de` oder Vercel-Subdomain

---

## 8. SKILLS DIE DU NUTZEN SOLLST

Beim Start der Sitzung:
1. **`superpowers:brainstorming`** — Für jede Section die visuell unklar ist
2. **`superpowers:writing-plans`** — Plan erstellen bevor du codest
3. **`superpowers:subagent-driven-development`** — Implementierung Section für Section

Design-Referenz immer aufrufen wenn du UI-Entscheidungen triffst:
- Geh auf https://www.designspells.com/ und lass dich inspirieren
- Geh auf https://reactbits.dev/ für Komponenten
- Schau dir https://www.uiguideline.com/ an für Komponenten-Anatomy

---

## 9. QUALITÄTS-KRITERIEN

Diese Website ist fertig wenn:
- [ ] Auf Mobile genauso gut wie Desktop (responsive first)
- [ ] Alle 6 Feature-Blocks haben ein echtes Rotato-Mockup
- [ ] Hero hat ein 3D-Element (Spline oder WebGL)
- [ ] Alle CTAs haben Magnetic-Button-Effekt
- [ ] Alle Sections faden beim Scroll ein (Framer Motion)
- [ ] Mockups haben Parallax/Tilt-Effekt
- [ ] Stats-Zahlen animieren wenn sie in den Viewport kommen
- [ ] Spenden-Button vorhanden (Ko-Fi oder PayPal.me)
- [ ] Open Graph Bild vorhanden (für WhatsApp/Twitter Vorschau)
- [ ] Lighthouse Score > 90 (Performance)
- [ ] Dark Mode only (kein Toggle nötig — ist immer dark)

---

## 10. WICHTIGE LINKS ZUSAMMENGEFASST

| Tool | URL | Zweck |
|------|-----|-------|
| Training App (live) | https://mylifetraining.vercel.app | Screenshots machen |
| Rotato | https://app.rotato.app/ | 3D Phone Mockups |
| Spline | https://spline.design/ | 3D Hero Element |
| Unicorn Studio | https://www.unicorn.studio/ | WebGL Hintergrundeffekte |
| React Bits | https://reactbits.dev/ | Animierte Komponenten |
| Remotion | https://www.remotion.dev/ | Video-Animationen (optional) |
| Design Spells | https://www.designspells.com/ | Micro-Interaction Inspiration |
| UI Guideline | https://www.uiguideline.com/ | Design System Referenz |

---

## 11. CONTENT-TEXTE (DEUTSCH)

**Hero Headline:** `MY LIFE`
**Hero Sub:** `Training. Nutrition. Life.`
**Hero CTA:** `Training App öffnen →`
**Hero Claim:** `Von einem Lifter für Lifter. Kostenlos.`

**App Tagline:** `Die smartste Trainings-App die du nie kaufen musst.`

**Coach Arved Claim:** `Kein Chatbot. Arved. Er kennt deine PRs, deine Schwächen, deine verpassten Sessions.`

**Community Claim:** `Trainier nicht allein. Sieh live wer gerade im Gym ist.`

**Athlete Score Claim:** `0 bis 1000. Fünf Dimensionen. Eine ehrliche Zahl.`

**Vergleich Headline:** `Warum nicht einfach eine andere App?`

**Spenden-Text:** `Diese App wird in der Freizeit entwickelt. Kostenlos. Immer. Wenn du willst dass sie weiterlebt, kannst du Arved einen Kaffee kaufen.`
