# Codex Bio — Engineering the Code of Life

> A high-performance, animation-driven synthetic biology and precision genomics platform interface showcasing creative frontend engineering and WebGL graphics.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)](#)

---

## Overview

**Codex Bio** is an interactive, design-forward web application built by **Sameep Chaurasia** that models the intersection of generative AI, computational genomics, and automated wet-lab biology. Created as a flagship creative frontend portfolio piece, it translates complex biological workflows into fluid, highly responsive user experiences featuring real-time 3D molecular visualization, interactive thermodynamic computations, and seamless GPU-accelerated canvas animations.

---

## Features

- **Hero & Precision Genome Slider (`Hero.tsx`)**: Dynamic introductory landing section featuring a nucleotide text decoder, interactive precision slider demonstrating sequence-alignment confidence, interactive mission video modal, and partnership drawer triggers.
- **Mission & Core Architecture (`About.tsx`)**: Overview of the platform's four pillars (Generative Foundation Models, Automated Wet-Lab Cloud, High-Throughput Screening, Closed-Loop Optimization) with expandable technical monographs and milestone roadmaps.
- **Platform & 3D Molecular Engine (`Technology.tsx`)**: Interactive 3D Three.js protein viewer (`ThreeProteinViewer.tsx`) with real-time mouse orbiting, emissive atom shaders, covalent bonds, and 3 structural rendering modes (*Double Helix*, *Alpha Helix*, *Binding Pocket*).
- **Research Hub (`ResearchKnowledgeHub.tsx`)**: Curated repository of peer-reviewed computational biology papers and clinical monographs with live keyword search, domain tag filtering (Oncology, CRISPR, Protein Folding, Epigenetics), and full detail drawers.
- **Next-Gen Capabilities (`Capabilities.tsx`)**: Deep-dive technical grid covering 6 core biotechnological disciplines (De Novo Protein Design, CRISPR Multiplexing, Cell-Free Biomanufacturing, Epigenetic Reprogramming, High-Throughput Screening, Metabolic Pathway Optimization) framed with animated HUD telemetry and radar sweeps.
- **Gene Sandbox DNA Workbench (`GenePlayground.tsx`)**: Live interactive nucleotide sequence editor (`A`, `T`, `C`, `G`) with dynamic 64-codon translation into peptide chains and real-time biophysical calculations:
  - **GC Content (%)**: Base composition ratio.
  - **Melting Temperature ($T_m$)**: Salt-adjusted thermodynamic denaturation threshold.
  - **Free Energy ($\Delta G^\circ_{37}$)**: Nearest-neighbor duplex stability derived from SantaLucia (1998) unified parameters.
  - **Dissociation Constant ($K_d$)**: Gibbs-derived binding affinity in nM/μM.
  - **CRISPR Cas12a Simulators**: Live insertion/cut mechanics, reverse complement generation, and standard therapeutic presets.
- **Empirical Impact & Statistics (`Stats.tsx`)**: Key performance metrics (14.2M+ candidate molecules, 99.8% folding fidelity, 420+ publications, 18.4x yield acceleration) powered by scroll-triggered animated counters.
- **Interactive Modals & Drawers (`DetailModal.tsx`, `PartnerModal.tsx`, `MissionVideoModal.tsx`)**: Accessible, keyboard-navigable overlay panels for technical exploration and partnership inquiries.
- **Synthesized UI Audio (`lib/audio.ts` & `SoundToggle.tsx`)**: Zero-asset procedural sound effects generated via native Web Audio API oscillators with global mute/unmute persistence.

---

## Tech Stack

| Domain | Library / Tool | Version | Role in Codebase |
|---|---|---|---|
| **Core Framework** | [Next.js](https://nextjs.org/) | `^16.3.0` | React framework (App Router), server-side rendering, `next/font` optimization |
| **UI Library** | [React](https://react.dev/) | `^19.2.8` | Functional components, custom hooks, and concurrent UI rendering |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5.0.0` | 100% strict type safety for data models, 3D math, and biophysical kinetics |
| **3D Graphics** | [Three.js](https://threejs.org/) | `^0.185.1` | WebGL rendering for 3D protein viewer and ambient particle fields |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^4.0.0` | Utility-first styling with `@tailwindcss/postcss` and custom theme tokens |
| **Smooth Scrolling** | [Lenis](https://github.com/darkroomengineering/lenis) | `^1.3.26` | Hardware-accelerated inertial smooth scroll provider |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | `^13.1.0` | Micro-interactions, spring button physics, and modal transition states |
| **GSAP** | [GSAP](https://greensock.com/) + `@gsap/react` | `^3.15.0` | Scroll-linked animation primitives and ticker synchronization |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.31.0` | Clean, modern SVG icon set for biotech telemetry and controls |
| **Audio** | Native Web Audio API | Browser Native | Procedural frequency synthesis for interactive UI sound design |
| **Linting & Code Quality** | [ESLint](https://eslint.org/) | `^9.0.0` | Strict code analysis with `eslint-config-next` |

---

## Project Structure

```
├── app/                        # Next.js App Router root
│   ├── globals.css             # Design tokens, bioluminescent gradients, and keyframes
│   ├── layout.tsx              # Root HTML shell, fonts (Fraunces, Space Grotesk, Inter, JetBrains Mono), cursor & providers
│   └── page.tsx                # Main single-page application composition & modal orchestration
├── components/                 # React component library
│   ├── canvas/                 # WebGL & 2D canvas graphics (ThreeProteinViewer, ParticleField, MolecularCanvas)
│   ├── layout/                 # Structural navigation & shell (Navbar, Footer, SmoothScrollProvider)
│   ├── sections/               # Page section components (Hero, About, Technology, Research, Capabilities, GenePlayground, Stats, FinalCta)
│   └── ui/                     # Reusable UI primitives, continuous background systems, modals, and buttons
├── data/                       # Structured content definitions and scientific literature records
│   ├── content.ts              # Section copy, navigation links, and pillar definitions
│   └── researchData.ts         # Peer-reviewed publication monographs and metadata
├── hooks/                      # Custom React hooks
│   ├── useIsMobile.ts          # Viewport width detection (<768px threshold)
│   └── useReducedMotion.ts     # Accessibility hook for prefers-reduced-motion media query
├── lib/                        # Shared utility functions and engine helpers
│   ├── audio.ts                # Native Web Audio API procedural sound synthesizer
│   └── utils.ts                # Tailwind class merge helper (clsx + twMerge)
└── public/                     # Static media, SVG icons, and favicon assets
```

---

## Getting Started

### Prerequisites
- Node.js `18.18.0` or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SameepChaurasia/animated_biotech.git
   cd animated_biotech
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   *No external API keys or `.env` configuration required. All molecular algorithms and audio synthesizers run client-side.*

4. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

6. **Linting**:
   ```bash
   npm run lint
   ```

---

## Architecture Notes

### Continuous Multi-Section Background Systems (System A & System B)
To prevent visual fragmentation between dense content sections, the application groups sections into two overarching continuous canvas wrappers:
- **System A (`SectionBackgroundSystemA.tsx`)**: Envelopes Section 03 (*Research Hub*) and Section 04 (*Capabilities*) in an atmospheric deep-indigo canvas featuring rotating holographic radar sectors, multi-spectral laser sweeps, floating benzene hexagon clusters, and a Three.js `ParticleField`.
- **System B (`SectionBackgroundSystemB.tsx`)**: Envelopes Section 05 (*Gene Sandbox*) and Section 06 (*Impact*) in a bio-synthetic emerald/teal/amber canvas featuring cascading genetic code rain (matrix-style nucleotide streams), traveling DNA double-helix ribbons with illuminated base-pair ladders, and biological sonar pulse waves.

### Seamless Section-Blend Technique
Both background systems eliminate hard cutoffs using CSS vertical alpha masks:
```css
mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
-webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
```
This ensures zero visual seams when scrolling across section boundaries, creating a unified bioluminescent experience without abrupt color breaks.

---

## Author

**Sameep Chaurasia**  
- GitHub: [@SameepChaurasia](https://github.com/SameepChaurasia)  
- Project Repository: [animated_biotech](https://github.com/SameepChaurasia/animated_biotech)

---

## License

This project is licensed under the [MIT License](LICENSE) — Copyright © 2026 Sameep Chaurasia.
