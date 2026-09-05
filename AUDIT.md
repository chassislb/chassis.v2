# Chassis Website Rebuild — Audit

Date: 2026-07-11

## Sources inspected

1. **Live official site** — local static source at `C:\Users\sophi\OneDrive\Desktop\Chassis\work\Websites\chassis.lb` (matches production domain `www.chassislb.com` per CNAME). 8 EN pages + 8 AR pages, fully mirrored routes. Treated as source of truth for all facts, copy, links, pricing.
2. **V2 (this repo)** — Vite + React 19 + Tailwind 4, local source, plus live preview at the Vercel URL.
3. **Chef Michel Karam** — chefmichelkaram.com, inspected live (page text extracted; screenshots timed out in this session — heavy hero video/parallax likely the cause, consistent with "strong visual opening" branding).
4. **HEWAR** — chassislb.github.io/hewar-website, inspected live (page also timed out on load — WebGL/canvas-driven navigation, consistent with its "creative navigation" premise). Used for interaction philosophy only, per the brief.
5. **Locked brand docs** — `OneDrive\Desktop\Chassis\Locked\*.pdf` + two Downloads PDFs + `Chassis_Method_Core_v1.docx` + `Chassis_Selected_Projects_Sophia_Ayoubi.pdf`.

Full raw findings from the three parallel audits are preserved in the session; this file distills them into decisions.

## Live site — what exists (summary; full detail in CONTENT-INVENTORY.md)

- Homepage, About, Services, Case Studies (+1 detail page: Michel Karam), Contact, Privacy, Terms — EN and AR.
- 4 services (Operational Diagnosis $150 flat / Business Structuring $500–2,000+ / Execution Infrastructure $800–4,000+ / Operational Partnership $300–1,500+/mo), each with lead line, body, outcome line, "best for," deliverables, price.
- Process: **Diagnose → Structure → Implement → Optimize** (this is the site's actual verified wording — used instead of the brief's suggested "Diagnose → Structure → Build → Support").
- 7 case studies referenced: Michel Karam (full detail page), Le Pavé Bar, La Gare, Vartavar Festival, The Ark Networks, Aline Kamakian/FIG Holding, Smart Vision — only Michel Karam has real, wired imagery.
- 2 core testimonials (Michel Karam, Elias Abdo), plus a third longer Michel Karam quote unique to his case-study page.
- Verified contact: Calendly `calendly.com/chassis-lb/chassis-discovery-call`, WhatsApp `+961 71 085 824`, email `chassis.lb@gmail.com`, Facebook/Instagram/LinkedIn (company) + Sophia's personal LinkedIn, based in Batroun, Lebanon.
- Design tokens confirmed in production CSS: `--yellow:#f3cc31`, `--blue:#36c6f4`, black/white base, Poppins (EN) / Zain+Poppins (AR, sized down ~6% to compensate for Zain running larger).
- **Known site bugs to not repeat:** homepage EN/AR structural mismatch (AR homepage has an "Outcomes" section and fuller case teaser that EN lacks entirely), "Google Review" links point to generic Google Maps not real reviews, orphaned Colart images with zero copy anywhere, Smart Vision has copy but no wired image, footer "Structured by Chassis" credit translated on only one AR page out of eight.

## V2 codebase — verdict: KEEP AND STRIP, DO NOT DISCARD

Full agent audit confirmed:
- Stack (React 19 + Vite + Tailwind 4) is sound for a static bilingual marketing site — no reason to move to Next.js, this site has no SSR/data-fetching need.
- The centralized i18n pattern (`LanguageContext` + `locales/en.js` + `locales/ar.js`) is well-built: 94/94 keys had exact parity, Arabic read as native business register, not machine translation. **Reused as the architecture**, content replaced.
- The data-file pattern (`src/data/*.js`) for services/cases/testimonials is the right shape. **Reused, content replaced with verified copy.**
- **Discarded entirely:** `CursorGlow.jsx`, `MagneticButton.jsx`, `Starfield.jsx` — pure decoration, cursor-follow/twinkle effects with no functional payload, exactly the "AI-generated," "decorative animation with no purpose" pattern the brief prohibits. Also discarded: GSAP + `ScrollTrigger` (`scrub`-based scroll-linked motion in `Hero.jsx` and `OperatingMap.jsx`) — scroll-linked motion reads as the soft form of scroll-jacking the brief bans. Framer Motion (already a dependency) is kept for ordinary reveal/panel transitions, which is safe.
- **Discarded as out of scope for this rebuild:** the full interactive 6-question branching "diagnosis quiz" engine (`Diagnosis.jsx`, `DiagnosisBand.jsx`, `healthModel.js`, `diagnosis.js`) and the "Build With AI" $600/$1,200/$2,000+ productized pricing tier. Neither appears on the verified live site or in the locked positioning docs; the quiz's lead capture is also unwired (`console.log` only, no CRM/email). Rebuilding a personalized branching quiz engine is a distinct, large product effort — flagged to the site owner in the final report rather than shipped half-finished or invented.
- Concrete defects fixed in the rebuild: literal `[TIMELINE - CONFIRM]` placeholder string, dead `href="#"` review link, mislabeled `favicon.ico`/`og-image.jpg` (wrong file types), oversized unoptimized logo source images, `Privacy.jsx`/`Terms.jsx` hardcoded English-only despite the live site having full AR legal pages.

## Locked brand docs — decisions on contradictions found

The positioning documents contain three different four-step "process" names and conflicting rules about words like "Optimize" and "Framework." Per the brief's own hierarchy ("current official website is the source of truth for existing content... do not change... services"), **the live site's actual displayed wording wins over internal drafts wherever they conflict.** Specifically:
- Process used: **Diagnose → Structure → Implement → Optimize** (matches live site's Services page and AR homepage, not the internal Method Core doc's "Find it/Trace it/Measure it/Build" or the Downloads folder's "Build→Install→Exit→Advisory" draft).
- Service names/pricing used: the 4 layers as named and priced on the live Services page (matches the Locked Internal Service Architecture and Chassis_Services.pdf on names/pricing — no actual conflict there).
- Tone: blended "direct, clear, operational, low-fluff" (both locked docs agree on this) without the "slightly confrontational" edge, since the live site's actual copy reads calm and declarative, not confrontational — matched to what's already published.
- The 7-condition "Operating Health Model" and "what happens when the owner isn't here?" framing are real, well-developed internal IP (also already partly built in V2's quiz) — used as supporting language inside the Problem section (rhetorical framing only, no invented stats), not as a full separate interactive product in this pass.
- Founder bio: used only the verified paragraphs from the live About page (8+ years, Le Pavé Bar/La Gare/Ark Networks/Emirates Airlines background) — the "Selected Projects" PDF's Vartavar Festival credit is consistent with this and was folded into the case studies grid, not into the bio (bio stays as verified on-page).

## Design reference takeaways

- **Chef Michel Karam**: numbered service cards with punchy 1–2 sentence copy, a 4-step process band (their own "Audit→Plan→Build→Hold"), stat callouts (25+ years / 8+ countries), a marquee ticker of keywords, and a direct low-friction contact block. Adopted pattern: numbered cards, stat callouts, ticker, direct contact block — not their content, colors, or culinary framing.
- **HEWAR**: adopted principle only (per brief) — content organized so a visitor can explore via interaction rather than a single long scroll; applied here as click-to-open panels/drawers for services, case studies, and About detail, keeping the main page short.

## Decision: rebuild scope

Full content and component rewrite inside the existing V2 repo (`chassis-website-v2`), keeping Vite/React/Tailwind/Framer Motion/i18n architecture, discarding all decorative/scroll-jacking components and unverified content, restructured to the one-page architecture specified in the brief (Header, Hero, Problem, Process, Services navigator, Work, About, Direction, Testimonials, Final CTA, Footer) with full EN/AR parity and click-to-open detail panels.
