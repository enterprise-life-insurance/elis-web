# Build Progress

Dated, milestone-level log of what's shipped. Not a commit log — just enough for a quick status read, and the source for syncing status back into the agency vault (`second-brain`) when asked.

Log a new entry whenever something client-relevant changes: a milestone hit, a decision made, a blocker found. When you want the vault's `open-loops.md` / `account-summary.md` updated, point back here (or just say what happened) and it'll get pulled across — this file doesn't sync automatically.

---

## 2026-08-05 — Repo bridged from vault

Brand assets, final brand voice/messaging, and the approved IA/sitemap copied in from the agency vault to start standalone dev. See `README.md`.

## 2026-08-07 — Draft visual identity guideline + team/partner assets added

Added `brand/Enterprise Life – Visual Identity Guideline – Draft.pdf` (color palette, typography, logo usage rules — still marked draft, not yet confirmed final), team headshots for Jay/Glenn/Ekta under `brand/company/team/headshots/`, and carrier partner logos under `brand/partner-logos/`.

## 2026-08-07 — Domain purchased

Client purchased `enterpriselife.ca`. Closes the domain open item in `ia/website-ia-sitemap.md`.

## 2026-08-07 — Design/tech reference audit

Audited the three client-supplied design references (qopiafinancial.ca, safepacific.com, radiantlifefinancial.ca) plus the two local mockups in `brand/references/` — tech stack, typography, color usage, spacing, animation/micro-interaction patterns, and IA per site. Written up in `brand/references/design-audit.md`. Audit only, no build decisions made; open questions (serif/sans pairing, animation budget, tech stack for ELIS itself) flagged at the end of that doc for Jay.

Extended same day with a second batch (subduxion.com, limeiq.com, alethia.earth, solvenergy.com) called out by the client specifically for premium/unique animation and interaction quality. Two are Framer-built with a dark-base/neon-accent + glassmorphism motion language; limeiq.com (closest industry comparable — insurance tech) was inaccessible to direct fetch (Vercel bot-challenge) and audited via its Awwwards listing instead, flagged as lower-confidence and needing a follow-up pass with real browser access. Added a note flagging that the dark/neon direction is a departure from ELIS's current warm/family-photography direction — worth confirming with Jay whether "premium" means mood or literal dark-UI.

## 2026-08-07 — Typography decision: sticking with Poppins

Client confirmed the brand font (Poppins, sans-only) stays as-is — no serif accent face, despite several design references (safepacific.com, radiantlifefinancial.ca, limeiq.com) leaning on a serif/characterful display pairing. Resolves that open question in `brand/references/design-audit.md`; `CLAUDE.md` updated to note typography specifically is confirmed even though the rest of the visual identity guideline PDF is still draft.

## 2026-08-07 — Tech stack confirmed

Client confirmed the full build stack: Astro + TypeScript, React islands, Tailwind CSS, Sanity headless CMS, GSAP/ScrollTrigger + Lenis + Motion for animation (rationale tied to the design-audit references), Vercel hosting, and Vercel Analytics + GA4 together for analytics. Recorded in `CLAUDE.md` under a new "Tech stack" section. Still open: transactional email provider for form delivery, and embedded vs. standalone Sanity Studio. No scaffolding done yet — this is the confirmed plan, not a running project.

## 2026-08-07 — Astro project scaffolded

Scaffolded the Astro app at repo root: Astro 7 + TypeScript strict, React 19 + Tailwind v4 (via `@tailwindcss/vite`) + Vercel adapter added via `astro add`. Installed the rest of the confirmed stack (Sanity client libs, GSAP, Lenis, Motion, react-hook-form, zod, lucide-react, Fontsource Poppins) as dependencies, not yet wired into components. Brand color ramps and Poppins set up as Tailwind `@theme` tokens in `src/styles/global.css`. Route stubs created for the full approved IA (19 pages incl. per-advisor profile pages and per-segment/per-service pages) using a shared `PageStub.astro` placeholder — structure only, verified with `astro check` (0 errors) and `astro build` (19 pages built). No real page content, Sanity Studio, or animation wiring yet — that's next.

## 2026-08-07 — Visual direction, color palette, and email provider confirmed

Client confirmed three remaining open items: (1) stay with ELIS's current warm/light/family-photography direction rather than the dark-mode/neon-accent look some design-audit references used — premium feel should come from animation/interaction quality within the confirmed light palette, not a dark-UI pivot; (2) the visual identity guideline's color palette is final (no longer draft, same status as typography); (3) SendGrid is the transactional email provider for form delivery. Recorded in `CLAUDE.md`, `PROGRESS.md`, and `brand/references/design-audit.md`. Remaining open item: embedded vs. standalone Sanity Studio.

## 2026-08-07 — Sanity Studio embedded, schemas drafted

Client confirmed embedded Sanity Studio (mounted at `/studio` via `@sanity/astro`, in this same repo — not a standalone deployment). Added `sanity.config.ts` and content schemas in `src/sanity/schemaTypes/`: `advisor` (with an editorial `licensedForLifeInsurance` flag referencing the Glenn Merkley constraint), `service`, `segment` (Who We Help, with a placeholder calculator field pending the still-unconfirmed Tools list), `resource`, `testimonial`, singleton `siteSettings`, and a shared `faqItem` object used by both `service` and `segment`. No real Sanity project exists yet — `astro.config.mjs` uses a placeholder `projectId` so `astro build`/`astro check` still pass (0 errors, 20 pages incl. `/studio`); `.env.example` documents the real `PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET` vars to set once a project is created via sanity.io/manage. This closes out every open item in the tech-stack decision — remaining work is execution (create the real Sanity project, wire animation, build real content).

## 2026-08-07 — Layout components + Home page built

Added Header (responsive nav, mobile toggle), Footer (real partner-logo strip, IA-matched link groups), and Button/Card primitives, wired into `Layout.astro`. Swapped the default Astro favicon/logo placeholders for the real ELIS assets.

Built the real Home page per the IA (hero, Who We Help segment cards, advisor credibility, Services, Tools teaser, testimonials, resources teaser), with copy drawn from `brand/brand-voice-messaging.md`'s pillars and confirmed facts (Jay since 1994; Glenn's bio kept scoped to commercial insurance per the licensing constraint). No licensed lifestyle photography exists yet, so the hero uses an abstract graphic built from the visual identity guideline's petal-shape motif instead of a stock photo. Testimonials and Resources sections render as clearly-labeled "coming soon" placeholders rather than fabricated quotes/articles, since no real Sanity content exists yet.

Also wired the first real animation: a global `src/scripts/motion.ts` sets up Lenis smooth-scroll and GSAP ScrollTrigger fade/slide-up reveals on `[data-reveal]` sections, respecting `prefers-reduced-motion` and avoiding FOUC (content only pre-hides once an `html.js` class confirms JS can actually animate it in). Verified via `astro check` (0 errors) and by confirming the bundled Lenis/GSAP/ScrollTrigger modules resolve at runtime in dev.

## 2026-08-07 — About page + advisor profile pages built

Built the real About page: company overview and mission/vision/"what we stand for" pillars using copy pulled verbatim from the visual identity guideline and `brand/brand-voice-messaging.md` (not written fresh, since both are already locked/confirmed), plus a team grid for Jay, Glenn, and Ekta.

Built the three individual advisor profile pages (replacing their `PageStub`s), each with a real QR code generated at build time via the `qrcode` package, pointed at `https://enterpriselife.ca/about/<slug>` — satisfies the IA requirement that every advisor profile page has its own QR code. Advisor bios now live in `src/data/advisors.ts`: Glenn's is the client-confirmed text verbatim (stays scoped to commercial insurance, no life insurance sales/servicing claims); Jay's and Ekta's are short and deliberately conservative, sticking to confirmed facts only (Jay: advisor since 1994; Ekta: operations/logistics) rather than inventing job titles or history not on record. Verified with `astro check` (0 errors), `astro build` (still clean), and confirmed in dist output that no "life insurance" text appears near Glenn's bio (only unrelated footer nav links).

## 2026-08-07 — Who We Help index + 4 segment pages built

Built the Who We Help index (intro + all four segment cards) and the four segment detail pages (Business Owners & Trades, Medical Professionals, Engineers, Families & Individuals), replacing their `PageStub`s. Each has a hero with segment-toned intro copy, a "what we help you plan for" risks list, a calculator section, an FAQ accordion, and a closing CTA.

Copy follows the segment tone rules in `brand/brand-voice-messaging.md` (Engineers: analytical/numbers-first; Medical professionals: empathetic but efficient; Business owners/trades: practical, risk-to-the-business framing; Families: warmest, protection/peace-of-mind framing). FAQ content (`src/data/segmentDetails.ts`) is deliberately general insurance education rather than ELIS-specific pricing or policy claims, since we don't have confirmed specifics to attribute. The calculator section is honestly labeled "coming soon" rather than naming a tool that doesn't exist — specific calculators are still an open IA item. Added a reusable `FAQ.astro` component (native `<details>`/`<summary>` accordion, no JS) and `CTASection.astro`, both meant to be reused on the upcoming Services pages too. Verified with `astro check` (0 errors) and `astro build` (all four segment pages render 4 FAQ items each).

## 2026-08-07 — Services index + 5 service pages built

Built the Services index (intro + all five service cards) and the five service detail pages (Life Insurance, Disability Insurance, Group Benefits, Financial & Estate Planning, Travel Insurance), replacing their `PageStub`s. Each follows the same pattern as the Who We Help segment pages — hero, a coverage-overview list, an FAQ accordion, and a closing CTA — reusing `FAQ.astro`/`CTASection.astro` and adding `ServiceHero.astro`/`CoverageOverview.astro` as the service-specific equivalents of `SegmentHero`/`SegmentRisks`. FAQ content in `src/data/serviceDetails.ts` is general insurance education (term vs. permanent life, own-occupation vs. any-occupation disability, etc.), not ELIS-specific pricing or policy claims. Verified with `astro check` (0 errors) and `astro build` (all five service pages render 4 FAQ items each).

All approved IA sections now have real page content except Tools, Resources, and Contact (still `PageStub` placeholders — Tools and Resources are blocked on real content/calculator decisions rather than being a build gap).
