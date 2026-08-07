# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo status

Astro project scaffolded 2026-08-07 at repo root (`src/`, `public/`, `astro.config.mjs`, `package.json`, etc. alongside the pre-existing `brand/`, `ia/`, and doc files). Route stubs exist for the full approved IA (`src/pages/**`, using `PageStub.astro` placeholders) — structure only, no real copy/design yet. Run `pnpm install` then `pnpm dev`.

## Tech stack (confirmed 2026-08-07, scaffolded 2026-08-07)

- **Framework:** Astro 7, static output, TypeScript (strict) throughout
- **Interactive islands:** React 19 via `@astrojs/react` (for calculators, quiz tools, contact form — not yet built)
- **Styling:** Tailwind CSS v4 via the `@tailwindcss/vite` plugin (CSS-first config, no `tailwind.config.js`); brand color ramps (`enterprise-blue-*`, `life-green-*`, `natural-grey-*`) and `--font-sans` defined via `@theme` in `src/styles/global.css`; `@fontsource/poppins` self-hosted (400/500/600/700 imported)
- **CMS:** Sanity — `@sanity/client`, `@sanity/image-url`, `astro-portabletext` installed; Studio itself not yet scaffolded (still deciding embedded vs. standalone, see below)
- **Animation:** `gsap`, `lenis`, `motion` installed but not yet wired into any component. Intended split: GSAP + ScrollTrigger and Lenis own page/scroll-level motion; Motion scoped to component-level micro-interactions inside React islands; Astro's native `<ViewTransitions />` for page-to-page transitions. Rationale and reference-site comparisons in `brand/references/design-audit.md`.
- **Forms:** `react-hook-form` + `zod` installed, not yet wired to any form; submission handler (Astro server endpoint / Vercel function) not yet built
- **Icons:** `lucide-react`
- **Hosting:** Vercel — `@astrojs/vercel` adapter configured in `astro.config.mjs` (static output)
- **Analytics:** Vercel Analytics (free tier) + GA4, both — confirmed 2026-08-07, not yet installed/wired
- **Package manager:** pnpm

**Still open / not yet decided:** transactional email provider for form delivery, and whether Sanity Studio stays embedded (`/studio` route in this repo) vs. standalone.

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
- `brand/Enterprise Life – Visual Identity Guideline – Draft.pdf` — draft visual identity guide: color palette (Enterprise Blue `#0061A6`, Life Green `#85BD2D`, Neutral Grey `#F7F7F7`, plus full 50–900 tint/shade ramps for each), primary typeface Poppins (Bold/Semi-Bold/Medium/Regular), logo usage/clear-space/misuse rules, and sample branding-material mockups (billboard, etc.). Filename says "Draft" — treat as the current directional reference, not yet confirmed as final/locked the way the logo files and brand voice doc are. **Exception: typography is confirmed** — sticking with Poppins (sans-only), no serif accent face, even though other design references explored a serif pairing. See `brand/references/design-audit.md`.
- `brand/company/team/headshots/` — studio headshots for Jay Bablani, Glenn Merkley, and Ekta Balani (for advisor/team directory and profile pages).
- `brand/partner-logos/` — carrier/partner logos (Manulife, Sun Life, Canada Life, Equitable, Scotiabank, TD, National Bank, First National, Home Trust, Mackenzie, Quadrus, RMG) for a partners/carriers section.

## Sync model — important

This folder is a **deliberate, one-time snapshot**, not a live mirror of the agency vault. If brand copy, IA, or assets change upstream, they get re-copied deliberately — don't assume this repo auto-reflects vault changes, and don't try to sync back into the vault automatically.

- Full history/current status lives at `.../second-brain/03-Projects/Ctrl-The-Hype/01-Clients/InsureLine-ELIS/` (agency-side, outside this repo) — not accessible from here.
- Agency-internal tracking (open loops, meeting notes, account status, SOW discussion) intentionally does **not** live in this repo.
- `PROGRESS.md` is the dated, milestone-level build log for this repo (not a commit log). Add an entry whenever something client-relevant changes: a milestone hit, a decision made, a blocker found. When the vault's status docs need updating, point back to `PROGRESS.md` (or state what changed) rather than syncing automatically.
