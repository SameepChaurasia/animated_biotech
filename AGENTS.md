<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Developer & AI Agent Reference Manual

## 1. Project Summary
Codex Bio is an animation-rich synthetic biology and computational genomics landing platform engineered by Sameep Chaurasia. Built with Next.js 16 (App Router), React 19, TypeScript, Three.js (WebGL), Tailwind CSS v4, and Lenis. Its core purpose is demonstrating high-performance 3D graphics, real-time biophysical kinetics computation, and design-forward frontend architecture.

## 2. Setup Commands
- **Install dependencies**: `npm install`
- **Start development server**: `npm run dev` (starts on `http://localhost:3000`)
- **Build production bundle**: `npm run build`
- **Start production server**: `npm run start`
- **Lint codebase**: `npm run lint`
- **Typecheck code**: `npx tsc --noEmit`

## 3. Code Conventions
- **Component Pattern**: 
  - Standard React 19 functional components with explicit TypeScript interfaces (`export const ComponentName: React.FC<Props> = ...`).
  - File naming: PascalCase for components (`ThreeProteinViewer.tsx`, `GenePlayground.tsx`), camelCase for hooks (`useReducedMotion.ts`, `useIsMobile.ts`) and utilities (`audio.ts`, `utils.ts`).
  - Strict separation between presentation (`components/sections/`, `components/ui/`), graphics engines (`components/canvas/`), and layout wrappers (`components/layout/`).
  - Client components must start with `"use client";` directive at line 1.
- **Styling Approach**:
  - Tailwind CSS v4 via `@tailwindcss/postcss` with dark bioluminescent color tokens configured in `app/globals.css`.
  - Utility class composition with `cn()` helper (`clsx` + `tailwind-merge`) in `lib/utils.ts`.
  - Inline CSS `style={{ ... }}` is strictly reserved for dynamic calculations (e.g., scroll progress widths, procedural gradient coordinates, or WebGL canvas overlays).
- **State Management**:
  - Local component state via React `useState`, `useRef`, `useMemo`, and `useCallback`.
  - Top-level modal orchestration managed in `app/page.tsx` (`activeDetailId`, `isDetailOpen`, `isPartnerOpen`, `isMissionVideoOpen`).
  - Global audio singleton in `lib/audio.ts` (`SoundManager`) with mute state toggling.
  - No external state management libraries (Redux, Zustand) — maintain lightweight prop passing and local composition.

## 4. Key Architectural Constraints
1. **Continuous Shared Background Wrappers (Zero Section Seams)**:
   - Never apply standalone, opaque per-section background colors to sections wrapped by `SectionBackgroundSystemA` (Sections 03 & 04) or `SectionBackgroundSystemB` (Sections 05 & 06).
   - All continuous background systems must preserve the 5% top/bottom vertical alpha mask fade:
     ```css
     mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
     -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
     ```
   - Modifying section padding or z-indices must never create hard cutoff lines across section transitions.

2. **Three.js ParticleField & WebGL Lifecycle Rules**:
   - WebGL renderer MUST have transparent background enabled: `{ alpha: true }` and `renderer.setClearColor(0x000000, 0)`.
   - Must strictly respect accessibility: check `window.matchMedia("(prefers-reduced-motion: reduce)")` via `useReducedMotion()`. Disable animation loop or rendering when enabled.
   - Disabled on viewports `<768px` for mobile battery and GPU optimization (`window.innerWidth < 768`).
   - RequestAnimationFrame (RAF) loops MUST be gated by `IntersectionObserver` (disconnect/cancel RAF when out of viewport) to prevent GPU throttling during scroll.
   - Always clean up WebGL geometries, materials, textures, resize listeners, and WebGL context loss handlers (`canvas.addEventListener("webglcontextlost", ...)`) in the `useEffect` cleanup return.

3. **Gene Sandbox Real-Time Kinetics Calculation**:
   - All biophysical metrics (GC Content %, Melting Temperature $T_m$, Free Energy $\Delta G^\circ_{37}$, Dissociation Constant $K_d$, Duplex Stability Index) MUST recompute dynamically via `useMemo` from the actual user-modified nucleotide `sequence`.
   - Never replace the dynamic SantaLucia (1998) Nearest-Neighbor thermodynamic algorithm (`NN_DELTA_G` table) with static or hardcoded numbers.

## 5. File Map
- **Background Systems & Canvas Backdrops**:
  - `components/ui/DynamicScrollBackground.tsx` — Base atmospheric background gradient responding to page scroll progress.
  - `components/canvas/MolecularCanvas.tsx` — Whole-page 2D bioluminescent particle network with mouse repulsion and DNA helix morphing.
  - `components/ui/SectionBackgroundSystemA.tsx` — Continuous wrapper for Research Hub + Capabilities (holographic radar, laser sweep, ParticleField).
  - `components/ui/SectionBackgroundSystemB.tsx` — Continuous wrapper for Gene Sandbox + Impact (matrix genetic code rain, DNA double helix ribbon, sonar ripples, ParticleField).
  - `components/canvas/ParticleField.tsx` — Reusable Three.js proximity constellation particle engine with alpha transparency.
- **Section Components**:
  - `components/sections/Hero.tsx` & `components/sections/HeroPrecisionSlider.tsx` — Hero landing with interactive confidence slider.
  - `components/sections/About.tsx` — Mission, 4 foundational pillars, and milestone roadmap.
  - `components/sections/Technology.tsx` & `components/canvas/ThreeProteinViewer.tsx` — Platform AI architecture & interactive 3D WebGL protein viewer.
  - `components/sections/ResearchKnowledgeHub.tsx` — Filterable scientific literature repository and research papers.
  - `components/sections/Capabilities.tsx` — 6 domain capability cards with telemetry decorations.
  - `components/sections/GenePlayground.tsx` — Interactive DNA workbench, 64-codon genetic code translation, SantaLucia thermodynamic kinetic calculator, and CRISPR simulator.
  - `components/sections/Stats.tsx` — Biotech metric counters and validation benchmarks.
  - `components/sections/FinalCta.tsx` — Partnership contact trigger.
- **Data & Audio**:
  - `data/content.ts` — Navigation schemas, pillar descriptions, and capabilities data.
  - `data/researchData.ts` — Research monographs and publication database.
  - `lib/audio.ts` — Synthesized Web Audio API sound effects.

## 6. Testing & Verification
When verifying changes or preparing releases, execute the following validation steps:
1. **Server Health**: Ensure `npm run dev` compiles cleanly with zero TypeScript errors (`npx tsc --noEmit`) and zero ESLint warnings (`npm run lint`).
2. **Multi-Viewport Testing**:
   - **Mobile (`<768px`, e.g., 375x667, 390x844)**: Verify Three.js `ParticleField` is disabled gracefully, mobile hamburger navigation works, Gene Sandbox horizontally scrolls without breaking layout, and touch interactions operate smoothly.
   - **Laptop (`1440x900`)**: Verify 3D protein viewer mouse orbiting, radar animations in Section System A, and layout centering.
   - **Desktop / Ultrawide (`1920x1080` & larger)**: Verify max-width containers (`max-w-[1720px]`), laser sweep bounds, and canvas scaling without pixelation.
3. **Visual Seam Inspection**:
   - Scroll slowly through Section 02 -> Section 03 (Start of System A), Section 04 -> Section 05 (Transition between System A and System B), and Section 06 -> Section 07 (End of System B). Ensure zero sharp background borders or clipped glows exist.
4. **Interactive Validation**:
   - Add/remove nucleotides in Gene Sandbox (`GenePlayground.tsx`) and confirm GC%, $T_m$, $\Delta G$, and $K_d$ update synchronously.
   - Switch modes in `ThreeProteinViewer.tsx` (*Double Helix*, *Alpha Helix*, *Binding Pocket*) and verify geometry rebuilds without memory leaks.

## 7. Do NOT
- **DO NOT** add per-section solid background colors (e.g., `bg-slate-900` or `bg-[#05080a]`) to sections inside `SectionBackgroundSystemA` or `SectionBackgroundSystemB`. Doing so overrides the continuous canvas and introduces visible horizontal section seams.
- **DO NOT** hardcode Gene Sandbox thermodynamic values (GC%, $T_m$, $\Delta G$, $K_d$). Always compute them from the active nucleotide sequence string.
- **DO NOT** remove or omit `alpha: true` or `setClearColor(0x000000, 0)` in `ParticleField.tsx` or `ThreeProteinViewer.tsx`. An opaque WebGL canvas will obliterate the underlying CSS gradients and particle backgrounds.
- **DO NOT** delete the mobile viewport bypass (`< 768px`) or the `IntersectionObserver` RAF pause in WebGL canvas components. Running continuous 60fps Three.js simulations in offscreen mobile viewports severely degrades performance and battery life.
- **DO NOT** hardcode external third-party API dependencies or remote asset URLs for core functionality. Keep the application self-contained, high-performance, and fully functional offline.
