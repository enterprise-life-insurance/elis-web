# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo status

Astro project scaffolded 2026-08-07 at repo root (`src/`, `public/`, `astro.config.mjs`, `package.json`, etc. alongside the pre-existing `brand/`, `ia/`, and doc files). Run `pnpm install` then `pnpm dev` (site at `localhost:4321`, Sanity Studio at `localhost:4321/studio`).

**Pages with real content:** Home (`src/pages/index.astro`) and About (`src/pages/about/index.astro` + the three advisor profile pages). Home: hero, Who We Help, advisor credibility, Services, Tools teaser, placeholder Testimonials/Resources (no fabricated quotes/articles — those stay placeholder until real Sanity content exists). About: company overview + mission/vision/values (copy pulled verbatim from the visual identity guideline / brand voice doc, not written fresh), team grid, and per-advisor profile pages each with a real build-time-generated QR code (via the `qrcode` package, pointed at `https://enterpriselife.ca/about/<slug>`) per the IA requirement. Advisor content lives in `src/data/advisors.ts` — Glenn Merkley's bio there is the client-confirmed text verbatim, scoped to commercial insurance.

Every other route (`src/pages/**`) is still a structure-only `PageStub.astro` placeholder pending the same treatment. Shared layout: `Header`/`Footer`/`Button`/`Card` in `src/components/`, first animation wiring in `src/scripts/motion.ts` (Lenis + GSAP ScrollTrigger reveals on `[data-reveal]`, see below).

## Tech stack (confirmed 2026-08-07, scaffolded 2026-08-07)

- **Framework:** Astro 7, static output, TypeScript (strict) throughout
- **Interactive islands:** React 19 via `@astrojs/react` (for calculators, quiz tools, contact form — not yet built)
- **Styling:** Tailwind CSS v4 via the `@tailwindcss/vite` plugin (CSS-first config, no `tailwind.config.js`); brand color ramps (`enterprise-blue-*`, `life-green-*`, `natural-grey-*`) and `--font-sans` defined via `@theme` in `src/styles/global.css`; `@fontsource/poppins` self-hosted (400/500/600/700 imported)
- **CMS:** Sanity, embedded at `/studio` in this repo via `@sanity/astro` (confirmed 2026-08-07 — not standalone). Config in `sanity.config.ts`; schema types in `src/sanity/schemaTypes/` (`advisor`, `service`, `segment`, `resource`, `testimonial`, singleton `siteSettings`, plus a reusable `faqItem` object). No real Sanity project exists yet — `astro.config.mjs` falls back to a placeholder `projectId` so the site still builds; see `.env.example` for the real `PUBLIC_SANITY_*` vars to set once a project is created.
- **Animation:** `src/scripts/motion.ts` (imported once, in `Layout.astro`) sets up Lenis smooth-scroll and GSAP + ScrollTrigger fade/slide-up reveals on any `[data-reveal]` element — respects `prefers-reduced-motion` and avoids FOUC via an `html.js` class added pre-paint (see `src/styles/global.css`). `motion` (the React-focused library, formerly Framer Motion) is installed but still unused — reserved for component-level micro-interactions inside React islands per the original plan. Astro's native `<ViewTransitions />` for page-to-page transitions also still unused. Rationale and reference-site comparisons in `brand/references/design-audit.md`.
- **Forms:** `react-hook-form` + `zod` installed, not yet wired to any form; submission handler (Astro server endpoint / Vercel function) not yet built
- **Transactional email:** SendGrid — confirmed 2026-08-07, not yet integrated
- **Icons:** `lucide-react`
- **Hosting:** Vercel — `@astrojs/vercel` adapter configured in `astro.config.mjs` (static output)
- **Analytics:** Vercel Analytics (free tier) + GA4, both — confirmed 2026-08-07, not yet installed/wired
- **Package manager:** pnpm

**Visual direction (confirmed 2026-08-07):** stay with ELIS's current warm, light, family-photography direction — do not pivot to the dark-mode/neon-accent look from some design-audit references. Premium feel should come from animation/interaction *quality* (scroll choreography, micro-interaction density) within the confirmed light palette, not a dark-UI reskin. See "Decisions" in `brand/references/design-audit.md`.

**No longer open — everything in the tech stack above is decided.** Remaining work is execution: create the real Sanity project, wire animation, build real page content, etc.

## Who ELIS is

Enterprise Life Insurance and Investment Solutions (ELIS) is a new insurance venture built on its founders' long-standing advisor experience — **new company, not new advisors**. That distinction must come through in all copy and site structure.

Key contacts:
- **Jay Bablani** — client-side lead, primary decision-maker on brand/positioning.
- **Glenn Merkley** — Director, 30+ years in insurance, specializes in commercial insurance for business owners, professionals, and HNW clients. ⚠️ **Not licensed for life insurance sales/servicing** — never attribute life insurance sales, servicing, or credentialing to him anywhere on the site (bio, advisor profile, homepage/services credibility copy). See `ia/website-ia-sitemap.md` for the confirmed bio and full constraint.
- **Ekta Balani** — client-side, handles logistics; also listed on the advisor/team directory.

## Content sources (read before writing copy or building pages)

- `brand/brand-voice-messaging.md` — locked positioning, mission, vision, communication pillars (with "say this / not that" examples), and segment-specific tone (Engineers, Medical professionals, Business owners/trades, Families & Individuals). Any UI copy should follow these pillars and tone rules.
- `ia/website-ia-sitemap.md` — approved sitemap: Home, About (incl. advisor profile pages with individual QR codes), Who We Help (four segment landing pages, each with a calculator + FAQ), Services (five service pages, each with coverage overview + FAQ), Tools (calculator index — specific tools still unconfirmed), Resources, Contact. Open items (calculators, domain) are called out there.
- `brand/logo/` — final SVG logo assets (primary/secondary color, stacked w/ tagline, wordmark, favicons).
- `brand/Enterprise Life – Visual Identity Guideline – Draft.pdf` — visual identity guide: color palette (Enterprise Blue `#0061A6`, Life Green `#85BD2D`, Neutral Grey `#F7F7F7`, plus full 50–900 tint/shade ramps for each) and typography (Poppins, Bold/Semi-Bold/Medium/Regular) are both **confirmed final** (2026-08-07) despite the filename still saying "Draft" — treat those two as locked, same as the logo files and brand voice doc. Logo usage/clear-space/misuse rules and the sample branding-material mockups (billboard, etc.) remain directional only. See `brand/references/design-audit.md` for the confirmation history.
- `brand/company/team/headshots/` — studio headshots for Jay Bablani, Glenn Merkley, and Ekta Balani (for advisor/team directory and profile pages).
- `brand/partner-logos/` — carrier/partner logos (Manulife, Sun Life, Canada Life, Equitable, Scotiabank, TD, National Bank, First National, Home Trust, Mackenzie, Quadrus, RMG) for a partners/carriers section.

## Sync model — important

This folder is a **deliberate, one-time snapshot**, not a live mirror of the agency vault. If brand copy, IA, or assets change upstream, they get re-copied deliberately — don't assume this repo auto-reflects vault changes, and don't try to sync back into the vault automatically.

- Full history/current status lives at `.../second-brain/03-Projects/Ctrl-The-Hype/01-Clients/InsureLine-ELIS/` (agency-side, outside this repo) — not accessible from here.
- Agency-internal tracking (open loops, meeting notes, account status, SOW discussion) intentionally does **not** live in this repo.
- `PROGRESS.md` is the dated, milestone-level build log for this repo (not a commit log). Add an entry whenever something client-relevant changes: a milestone hit, a decision made, a blocker found. When the vault's status docs need updating, point back to `PROGRESS.md` (or state what changed) rather than syncing automatically.
