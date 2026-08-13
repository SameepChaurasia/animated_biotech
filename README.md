# Codex Bio — Engineering the Code of Life

> **AI-Driven Precision Genomics & Synthetic Biology Platform**  
> Round 1 Creative Frontend Developer Submission · Built with Next.js 16, Tailwind CSS v4, TypeScript, GSAP, Motion & HTML5 Canvas.

---

## 1. Overview

**Codex Bio** is a state-of-the-art landing page for a synthetic biology and computational genomics company. It unites generative AI protein architecture with automated wet-lab synthesis to accelerate therapeutic discovery. The application is built around a central thematic hook: treating genetic DNA sequences as high-level executable software code.

---

## 2. Tech Stack

| Technology | Version / Package | Role & Utilization |
|---|---|---|
| **Next.js** | `16.3` (App Router) | React framework, SSR/SSG layout, route optimization, Google Font loader |
| **TypeScript** | `5.x` Strict Mode | Complete type-safety across content layers and canvas math |
| **Tailwind CSS** | `v4` (`@theme`) | Utility styling, custom dark tokens, glassmorphism utilities |
| **GSAP & ScrollTrigger** | `3.15` + `@gsap/react` | Horizontal scroll-jacking deck, SVG path drawing, pinned triggers |
| **Motion** | `framer-motion` | Micro-interactions, spring physics buttons, preloader animations |
| **Lenis** | `lenis/react` | Butter-smooth scroll foundation synced to GSAP ticker |
| **HTML5 2D Canvas** | Native HTML5 Canvas | 60fps molecular particle simulation morphing into DNA double helix |
| **Lucide React** | `1.31` | Iconography suite |

---

## 3. Core Features

- 🧬 **Scroll-Reactive Molecular Canvas**: 180+ bioluminescent particles that float freely in the hero section, respond dynamically to mouse proximity, and self-organize into a 3D-feeling double helix with base-pair rungs as the user scrolls.
- 🔤 **Nucleotide Text Decode Effect (`TextDecode.tsx`)**: Headlines decode from random genetic sequence letters (`A`, `T`, `C`, `G`) into real typography upon viewport reveal.
- 💻 **Signature Code Comment Motif (`Eyebrow.tsx`)**: Every section eyebrow is styled like code comments `// 0X — LABEL` in JetBrains Mono with bioluminescent lime accents (`#C8FF4D`).
- ↔️ **Desktop Horizontal Scroll-Jacking (GSAP Pinning)**: The Technology section pins on wide screens (>=1024px) for 4 horizontal cards, collapsing to a clean responsive vertical stack on tablets and mobile screens (<1024px).
- 🧩 **Glassmorphism Bento Grid**: Asymmetric 6-card research grid with 3D cursor tilt effects, glowing borders, and category badges.
- 📊 **Animated Counters**: Odometer-style roll-up counters for key impact metrics (`182+`, `6.4x`, `98.7%`).
- ✨ **Cursor Trail & Micro-Interactions**: Ambient bioluminescent particle trail following cursor movement on desktop.
- ♿ **Universal Reduced Motion Support**: Full compliance with `prefers-reduced-motion` media queries.

---

## 4. Folder Structure

```
animated_biotech/
├── app/
│   ├── layout.tsx                # Root layout with google fonts, skip link, Lenis provider
│   ├── page.tsx                  # Main composition page rendering all sections in order
│   └── globals.css               # Tailwind v4 @theme configuration & custom CSS variables
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky header with glassmorphism, logo monogram, nav links & mobile drawer
│   │   ├── Footer.tsx            # Multi-column footer with brand, links, social icons, back-to-top
│   │   └── SmoothScrollProvider.tsx # Lenis + GSAP ticker integration
│   ├── canvas/
│   │   └── MolecularCanvas.tsx   # 60fps HTML5 2D Canvas DNA morphing particle system
│   ├── ui/
│   │   ├── Button.tsx            # Primary (Lime bioluminescent) and Ghost (Glass border) variants
│   │   ├── Container.tsx         # Max-w-7xl centered layout wrapper
│   │   ├── Eyebrow.tsx           # // 0X — LABEL code-comment component
│   │   ├── SectionHeading.tsx    # Shared section heading with TextDecode integration
│   │   ├── MagneticButton.tsx    # Cursor magnetic spring button
│   │   ├── TextDecode.tsx        # Nucleotide A/T/C/G character sequence decoder
│   │   ├── GlassCard.tsx         # Glassmorphism container with hover tilt & glow
│   │   ├── AnimatedCounter.tsx   # GSAP/IntersectionObserver roll-up odometer
│   │   ├── RevealOnScroll.tsx    # Viewport reveal wrapper with reduced motion check
│   │   └── CursorTrail.tsx       # Desktop bioluminescent particle trail
│   ├── sections/
│   │   ├── Hero.tsx              # Full-height hero with Canvas background, decoded headline, CTAs
│   │   ├── About.tsx             # Innovation story, mission pillars, animated molecular SVG
│   │   ├── Technology.tsx        # Pinned horizontal scroll deck (desktop) / vertical stack (mobile)
│   │   ├── Capabilities.tsx      # Asymmetric bento grid with 6 interactive research cards
│   │   ├── Stats.tsx             # Impact numbers band with AnimatedCounter primitives
│   │   └── FinalCta.tsx          # Closing banner with particle button burst & lead capture
│   └── Preloader.tsx             # Initial logo monogram SVG draw + sequence loading bar
├── hooks/
│   ├── useReducedMotion.ts       # Hook detecting prefers-reduced-motion media query
│   └── useIsMobile.ts            # Hook tracking window width responsive breakpoints (<768px / <1024px)
├── lib/
│   └── utils.ts                  # cn() classnames merger helper (clsx + tailwind-merge)
├── data/
│   └── content.ts                # Strongly-typed structured copy object for all section data
└── README.md
```

---

## 5. Design Approach

Most biotech landing pages rely on generic corporate light blue palettes with stock 3D DNA images. **Codex Bio** deliberately subverts this template by taking an editorial, "lab-at-night" dark mode direction (`#05080A`).

- **Color Psychology**: `#05080A` Void background coupled with elevated glass surfaces (`#0D1414`) creates an immersive nocturnal laboratory aesthetic. The primary accent — `#C8FF4D` (Bioluminescent Lime) — provides explosive contrast for CTAs and interactive highlights, while `#00E5FF` (Cyan) and `#0FA37F` (Emerald) anchor scientific data visualization.
- **Typography System**: Headlines leverage **Fraunces** (a high-fashion variable display serif) alongside **Space Grotesk** (modern tech sans), creating an authoritative, editorial feel. Body text uses **Inter** for pristine legibility, while **JetBrains Mono** powers section eyebrows, stat numbers, and code comments.
- **Thematic Consistency**: Every section is prefixed with a code comment eyebrow (`// 01 — THE MISSION`), reinforcing the core story: biological code and software code are one and the same.

---

## 6. Animation Strategy & Technical Tradeoffs

The motion design follows a layered architecture focused on physics-based responsiveness and 60fps performance:

1. **Scroll-Driven Canvas**: Instead of heavy WebGL/Three.js bundles that cause layout shift and frame drops on mobile GPUs, the hero visualization uses raw HTML5 2D Canvas rendering 180 particles. The particle cloud morphs seamlessly from stochastic floating motion to a rotating DNA double helix as scroll progress increases.
2. **GSAP ScrollTrigger Pinning**: The Technology section uses GSAP `ScrollTrigger` to pin the viewport on desktop screens (>=1024px) while scrolling through four platform cards horizontally. On mobile screens (<1024px), the layout degrades gracefully to a native vertical stack to prevent scroll-jacking friction on touch viewports.
3. **Lenis Integration**: Scroll velocity is normalized using Lenis smooth scroll, with its animation frame directly tied to `gsap.ticker` to ensure zero jitter during scroll-triggered animations.
4. **Accessibility First**: Every animated component checks `useReducedMotion()`. When `prefers-reduced-motion` is detected in the operating system, all GSAP pinning, particle math, text decoding, and cursor spring physics are disabled in favor of static opacity fades.

---

## 7. Setup & Local Development

```bash
# 1. Clone repository
git clone https://github.com/your-username/animated_biotech.git
cd animated_biotech

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Production build validation
npm run build
npm run start
```

---

## 8. Performance & Accessibility Targets

- **Lighthouse Performance**: `90+`
- **Lighthouse Accessibility**: `98+`
- **Lighthouse Best Practices**: `100`
- **Lighthouse SEO**: `100`
- **Keyboard Navigation**: Accessible skip-to-content link (`a.skip-link`), visible `:focus-visible` rings in bioluminescent lime (`#C8FF4D`), full ARIA attribute tagging for icon buttons.

---

## 9. Deployment

This Next.js application is zero-config ready for Vercel deployment:

1. Push your repository to GitHub.
2. Import the repository into your Vercel Dashboard.
3. Keep default settings (`Framework Preset: Next.js`).
4. Click **Deploy**.

---

## 10. License

MIT License © 2026 Codex Bio.
