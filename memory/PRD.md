# Quiet Craft — Premium Portfolio (PRD)

## Original problem statement
Build a premium portfolio website for a senior UI Lead & Brand Designer specializing in Product Design, UI, Branding, Design Systems, and Creative Direction. Aesthetic blend of Apple / Elva Labs / Sakazuki / Noomo / Stripe / Linear. Cinematic, immersive, minimal, dark-mode, Awwwards-tier.

## Stack
- Frontend: React 19 + TypeScript + Tailwind + Framer Motion + GSAP + Lenis + React Three Fiber 9 + drei 10 (CRA + craco for supervisor compatibility)
- Backend: FastAPI + MongoDB (motor)
- Routing: react-router-dom v7

## Architecture
- `src/components/hero/` — Act I: HeroSection + 3D scene (HeroScene.jsx) + 5 objects (Monolith, Lens, Shard, Ribbon, Motes)
- `src/components/reel/` — Act II: horizontal scrubbing reel
- `src/components/work/` — Act III: ProjectPanel + WorkSection
- `src/components/practice/` — Act IV: book-spread page turns with chapter SVG artifacts
- `src/components/recognition/` — Act V: client marquee + pull-quote + awards
- `src/components/contact/` — Act VI: closing frame with large email
- `src/components/layout/` — Cursor (custom magnetic), HUD (logo + nav + chapter indicator + scroll affordance)
- `src/components/shared/` — Hairline (leitmotif), MaskedText, ProjectArtifact (SVG-per-project)
- `src/hooks/` — useLenis (smooth scroll + progress), useMousePosition, useReducedMotion
- `src/lib/` — motion.ts (DUR + EASE tokens), api.ts, utils.ts
- `src/data/content.ts` — Lorem ipsum placeholders + designer info (Atelier Nomine)
- `src/pages/` — HomePage, WorkDetailPage, ArchivePage, StudioPage, ContactPage

## Backend endpoints
- GET /api/projects, GET /api/projects/{slug}, POST /api/projects
- POST /api/contact, GET /api/contact
- Auto-seeds 6 projects on startup if DB empty

## What's implemented (Dec 2025)
- Six-act cinematic home page with full motion grammar from motion design spec
- 3D R3F hero scene with 5 abstract objects + mouse parallax + camera dolly
- Lenis smooth-scroll backbone driving Lenis progress to HUD chapter indicator
- Custom cursor with magnetic snap to interactive elements
- Animated film grain overlay (24fps stepped) + vignette + warm key-light ray
- Premium typography: Fraunces (display), Inter (body), JetBrains Mono (system)
- Color tokens: film-black #0A0A0B, bone-white #F2EBDD, copper accent #A8643C
- All 4 secondary pages (Archive, Studio, Contact, Work Detail) with consistent motion
- Backend CMS endpoints for projects + contact submissions
- prefers-reduced-motion contract honored

## Designer identity (placeholder)
- Name: Atelier Nomine (Lorem ipsum stand-in — can be swapped via /app/frontend/src/data/content.ts)
- Email: hello@ateliernomine.studio
- Location: Lisbon

## Next action items
- P1: Replace Lorem ipsum content in /app/frontend/src/data/content.ts with real designer name + real project copy
- P1: Update backend seed in /app/backend/server.py SEED_PROJECTS or wipe DB and re-seed via API
- P2: Add CMS admin route to edit projects from the browser (currently API-only)
- P2: Implement page-out shared-element morph transitions for case study links
- P3: Add real client logos to Recognition marquee
- P3: GSAP-driven scroll-scrubbed reel transitions (currently Framer Motion useScroll)

## Known limitations
- Heavy custom stack (R3F + GSAP + Lenis) may not be supported by Emergent's built-in deployment — Vercel deploy recommended
- 3D scene is auto-disabled on touch devices (cursor reverts to native)
