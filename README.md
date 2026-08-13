# Codex Bio by Sameep Chaurasia — Engineering the Code of Life

> **Round 1 Creative Frontend Developer Submission**  
> **Author**: Sameep Chaurasia  
> **Tech Stack**: Next.js 16 (App Router), Three.js (3D WebGL), TypeScript, Tailwind CSS v4, GSAP 3 (ScrollTrigger), Motion, Lenis, Web Audio API.  
> **Live Demo**: [https://animated-biotech.vercel.app](https://animated-biotech.vercel.app) *(or your Vercel deployment link)*  
> **Submission Form Target**: Round 1 Take-Home

---

## 1. Project Overview

**Codex Bio** is a world-class, animation-driven biotechnology landing page designed and engineered by **Sameep Chaurasia**. It pairs generative protein architecture with automated wet-lab synthetic biology to accelerate drug discovery. 

The visual and conceptual narrative treats genetic DNA sequences as high-level executable software code — bridging digital code with biological code.

---

## 2. Technical Stack

| Tech / Library | Version | Role & Usage |
|---|---|---|
| **Next.js** | `16.3` (App Router) | React framework, SSR/SSG route generation, `next/font` variable font loader |
| **Three.js** | `0.174` | Raw WebGL 3D rotating double helix & protein ribbon viewer with emissive atom shaders |
| **TypeScript** | `5.x` Strict Mode | 100% strict type safety across components, 3D math vectors, and data schemas |
| **Tailwind CSS** | `v4` (`@theme`) | Custom dark bioluminescent design system, glassmorphism utilities |
| **GSAP + ScrollTrigger** | `3.15` + `@gsap/react` | Desktop horizontal scroll-jacking deck, pinned viewport triggers, SVG draw effects |
| **Motion** | `framer-motion` | Micro-interactions, spring button physics, preloader SVG draw |
| **Lenis** | `lenis/react` | Silky smooth scroll foundation synchronized with `gsap.ticker` |
| **HTML5 2D Canvas** | Native HTML5 Canvas | 60fps molecular particle simulation morphing to DNA helix on scroll |
| **Web Audio API** | Native Web Audio API | Zero-asset synthetic UI sound generator (hover tones, click blips) |

---

## 3. Signature Features & Innovations

1. **Recruiter Personalization**: "Codex Bio by Sameep Chaurasia" branding embedded in the Navbar badge, Preloader overlay, Hero subtitle, Footer copyright, and HTML metadata.
2. **Interactive 3D Three.js Molecule Viewer (`ThreeProteinViewer.tsx`)**: High-performance 3D WebGL component featuring interactive mouse rotation, emissive atomic node shaders, covalent bonds, and 3 mode toggles (*Double Helix*, *Alpha Helix*, *Binding Pocket*).
3. **Interactive Genetic Sequence Sandbox (`GenePlayground.tsx`)**: Real-time codon translation playground allowing users to input/click synthetic DNA base pairs (`A`, `T`, `C`, `G`), compute GC content, and preview binding affinity ($K_d$).
4. **Scroll-Reactive Molecular Canvas (`MolecularCanvas.tsx`)**: 180 bioluminescent 2D particles with mouse repulsion physics that morph dynamically into a 3D double helix structure as scroll progress advances.
5. **Nucleotide Text Decoder (`TextDecode.tsx`)**: Headlines decode from random genetic characters (`A`, `T`, `C`, `G`) into real readable text upon viewport entry.
6. **Signature Code Comment Motif (`Eyebrow.tsx`)**: Every section feature styled like code comments `// 0X — LABEL` in JetBrains Mono with bioluminescent lime accents (`#C8FF4D`).
7. **Desktop Horizontal Scroll-Jacking (GSAP Pinning)**: The Technology section pins on wide screens (>=1024px) for 4 horizontal cards, collapsing to a clean responsive vertical stack on tablets and mobile screens (<1024px).
8. **Web Audio Sound Effects Synthesizer (`lib/audio.ts` & `SoundToggle.tsx`)**: Native Web Audio API tone generator producing futuristic UI click blips and hover tones with a Navbar sound mute/unmute control.
9. **Bioluminescent Custom Cursor (`CustomCursor.tsx`)**: Lagging cursor ring + dot with hover expansion over buttons and 3D cards.

---

## 4. Design & Animation Rationale

### Visual Identity
- **Color Palette**: Dark, editorial, "lab-at-night" mood (`#05080A` Void, `#0D1414` / `#131C1C` elevated glass surfaces). Accent highlights use `#C8FF4D` (Bioluminescent Lime), `#00E5FF` (Data Cyan), and `#0FA37F` (Bio Emerald).
- **Typography**: High-fashion variable display serif (**Fraunces**) paired with **Space Grotesk** for headings, **Inter** for clean body text, and **JetBrains Mono** for code eyebrows and statistics.

### Animation Layering
- **Layer 1 — Smooth Scroll Foundation**: Driven by `lenis/react` synced with `gsap.ticker`.
- **Layer 2 — 3D & 2D Canvas Simulation**: WebGL Three.js 3D protein viewer + HTML5 2D scroll-reactive DNA particle system running at 60fps.
- **Layer 3 — Scroll Triggers & Pinning**: GSAP `ScrollTrigger` handling horizontal deck movement on desktop.
- **Layer 4 — Micro-Interactions**: Particle burst physics on click, custom cursor, and Framer Motion spring buttons.

---

## 5. Local Setup & Building

```bash
# 1. Clone repository
git clone https://github.com/SameepChaurasia/animated_biotech.git
cd animated_biotech

# 2. Install dependencies
npm install

# 3. Launch local dev server
npm run dev

# 4. Production build
npm run build
npm run start
```

---

## 6. Performance & Accessibility Targets

- **Lighthouse Performance**: `90+`
- **Lighthouse Accessibility**: `98+`
- **Lighthouse Best Practices**: `100`
- **Lighthouse SEO**: `100`
- **Universal Reduced Motion Support**: Checks `useReducedMotion()`. When `prefers-reduced-motion` is enabled, all 3D auto-rotation, particle math, text decoding, and GSAP pinning simplify to static opacity fades.

---

## 7. Submission Checklist

- [x] **Live Deployed Site**: Hosted on Vercel
- [x] **GitHub Repository**: Public with clean staged commits
- [x] **README & Design Rationale**: Complete documentation
- [x] **Recruiter Attribution**: "Codex Bio by Sameep Chaurasia"

---

## 8. License

MIT License © 2026 Sameep Chaurasia · Codex Bio.
