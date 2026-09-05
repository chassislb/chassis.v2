# Build Plan

## Decision: rebuild in place on V2 (not a fresh app)

Reasoning in AUDIT.md. Stack stays React 19 + Vite + Tailwind 4 + Framer Motion. GSAP, CursorGlow, MagneticButton, Starfield are removed as dependencies/files.

## New information architecture (single page, anchor-based)

`Header → Hero → Problem → Process → Services → Work → About → Direction → Testimonials → FinalCTA → Footer`
Legal pages (`/privacy`, `/terms`) stay as separate routes (existing simple router in `main.jsx`/`App.jsx` is sufficient, no need for a real router library).

## File-level plan

**Delete:** `src/components/CursorGlow/`, `src/components/MagneticButton/`, `src/components/Starfield/`, `src/components/Diagnosis/`, `src/components/DiagnosisBand.jsx`, `src/components/BuildWithAI/`, `src/data/diagnosis.js`, `src/data/healthModel.js`, GSAP from `package.json`.

**Keep architecture, replace content:** `src/i18n/LanguageContext.jsx` (as-is), `src/i18n/locales/en.js` + `ar.js` (full rewrite, verified content, full parity), `src/data/services.js`, `src/data/cases.js`, `src/data/testimonials.js` (full rewrite from CONTENT-INVENTORY.md).

**Rewrite components:** `Header/Navbar`, `Hero`, new `Problem`, rename/rework `Method` → `Process` (4 clickable stages + panel), rework `Layers` → `Services` (interactive navigator + panel + FAQ), rework `CaseFiles` → `Work` (Michel Karam full panel + 6 teaser cards with short panels), `About` (short + panel), new `Direction`, `Testimonials` (simplify to 2 verified quotes), `Contact`/`FinalCTA`, `Footer`.

**Shared new component:** `Panel.jsx` — one reusable overlay/drawer used by Process/Services/Work/About, with: focus trap, Escape to close, scroll-lock without losing page scroll position, RTL-aware, keyboard-navigable, animated via Framer Motion (opacity/translate only, respects `prefers-reduced-motion`).

**Assets:** copy real logo/photo/case-study images from `chassis.lb/assets/*` into `public/`, replacing V2's oversized/mislabeled ones; fix favicon (real .ico) and og-image (real .jpg).

**Legal:** wire `Privacy.jsx`/`Terms.jsx` into the locale system (currently hardcoded English-only) using verified legal content.

## Motion rules applied

No ScrollTrigger/scrub, no pinning, no scroll-jacking. Panels: fade+slight translate on open/close only. Hover states: simple color/opacity transitions. All motion gated behind `prefers-reduced-motion: no-preference`.

## Verification steps (in order)

1. Content diff against CONTENT-INVENTORY.md — every row present.
2. `npm run build`, `npm run lint` (oxlint per `.oxlintrc.json`), fix all errors.
3. Manual link check (Calendly/WhatsApp/mailto/social/legal all resolve).
4. Visual QA in browser: EN desktop/mobile, AR desktop/mobile, every panel open/close, language switch, at minimum 1440×900 and 390×844.
