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

Built the Who We Help index (intro + all four segment cards) and the four segment detail pages (Business Owners & Contractors, Healthcare, Engineers, Families & Individuals), replacing their `PageStub`s. Each has a hero with segment-toned intro copy, a "what we help you plan for" risks list, a calculator section, an FAQ accordion, and a closing CTA.

Copy follows the segment tone rules in `brand/brand-voice-messaging.md` (Engineers: analytical/numbers-first; Healthcare: empathetic but efficient; Business owners & contractors: practical, risk-to-the-business framing; Families: warmest, protection/peace-of-mind framing). FAQ content (`src/data/segmentDetails.ts`) is deliberately general insurance education rather than ELIS-specific pricing or policy claims, since we don't have confirmed specifics to attribute. The calculator section is honestly labeled "coming soon" rather than naming a tool that doesn't exist — specific calculators are still an open IA item. Added a reusable `FAQ.astro` component (native `<details>`/`<summary>` accordion, no JS) and `CTASection.astro`, both meant to be reused on the upcoming Services pages too. Verified with `astro check` (0 errors) and `astro build` (all four segment pages render 4 FAQ items each).

## 2026-08-07 — Services index + 5 service pages built

Built the Services index (intro + all five service cards) and the five service detail pages (Life Insurance, Disability Insurance, Group Benefits, Financial & Estate Planning, Travel Insurance), replacing their `PageStub`s. Each follows the same pattern as the Who We Help segment pages — hero, a coverage-overview list, an FAQ accordion, and a closing CTA — reusing `FAQ.astro`/`CTASection.astro` and adding `ServiceHero.astro`/`CoverageOverview.astro` as the service-specific equivalents of `SegmentHero`/`SegmentRisks`. FAQ content in `src/data/serviceDetails.ts` is general insurance education (term vs. permanent life, own-occupation vs. any-occupation disability, etc.), not ELIS-specific pricing or policy claims. Verified with `astro check` (0 errors) and `astro build` (all five service pages render 4 FAQ items each).

All approved IA sections now have real page content except Tools, Resources, and Contact (still `PageStub` placeholders — Tools and Resources are blocked on real content/calculator decisions rather than being a build gap).

## 2026-08-07 — Contact page + form built

Built the real Contact page: a working form (`ContactForm.tsx`, a `client:load` React island using `react-hook-form` + `zod`) posting JSON to a new server endpoint, `src/pages/api/contact.ts`. That endpoint is `export const prerender = false`, which is the site's first non-static route — this flips the Astro build into hybrid mode (confirmed via `astro build`: everything else still prerenders to static HTML, only `/api/contact` bundles as a Vercel serverless function, `.vercel/output/functions/_render.func`).

SendGrid (`@sendgrid/mail`) is wired into the endpoint, but no real API key or from/to addresses exist yet — tested in dev and confirmed the endpoint fails loudly with a 503 ("the contact form isn't fully set up yet...") rather than silently pretending to send, once `SENDGRID_API_KEY`/`CONTACT_TO_EMAIL`/`CONTACT_FROM_EMAIL` are set in `.env` it should send for real. Also tested Zod validation directly (422 with per-field errors on bad input). No confirmed phone/email exists for ELIS yet either, so `ContactInfo.astro` says contact details are "being finalized" instead of inventing a phone number or email address that isn't real.

Every approved IA section now has real page content except Tools and Resources, both still blocked on the client's calculator/content decisions rather than a build gap.

## 2026-08-10 — Open Graph / Twitter Card meta tags for social link previews

Wired `og:*`/`twitter:*` meta tags plus a canonical link into `Layout.astro`, generated from each page's existing `title`/`description` props (no per-page content changes needed) with a new optional `image` prop for overrides. Added a generated default `public/og-image.png` (1200×630, brand-blue gradient + logo card) as the site-wide preview image; the three advisor profile pages override it with their own headshot instead.

This requires an absolute `site` URL in `astro.config.mjs` so `og:image`/`og:url` resolve to real, fetchable links (link-preview crawlers like WhatsApp's won't follow relative paths). Set it to `enterpriselife.ca` first, then found via a live WhatsApp test that the domain is still sitting on the registrar's parking page (redirects to `/lander`, doesn't serve this deployment at all) — so every og:image URL 404'd and no preview rendered. Switched `site` to `https://elis-web.vercel.app` (the domain actually serving the live build) to unblock previews now. **Swap `site` back to `https://enterpriselife.ca` once DNS is pointed at this Vercel deployment** — until then, leave it on the vercel.app URL.

## 2026-08-10 — Footer polish and content corrections

Enlarged the partner-logo strip in `Footer.astro` and replaced the static row with an infinite CSS marquee ticker (per-logo color-on-hover, pure CSS, no JS). Updated Ekta Balani's title/bio to her confirmed credential: Insurance Broker and Financial Planner, RIBO certified. Renamed two Who We Help segments per client feedback: "Business Owners & Trades" -> "Business Owners & Contractors", "Medical Professionals" -> "Healthcare" (updated everywhere the segment names appear: `src/data/segments.ts`/`segmentDetails.ts`, nav, home page cards).

## 2026-08-13 — One-time Sanity seed script

Added `scripts/seed-sanity.ts` (run via `pnpm seed`) to push the existing static content in `src/data/*.ts` (advisors, segments, segment details, services, service details) into Sanity as real documents using `createOrReplace` with deterministic IDs, so Studio isn't empty once a real Sanity project exists. Rerunning it after editing `src/data/*.ts` overwrites the seeded documents again — any content since edited directly in Studio for those same documents would get clobbered, so it's meant as a one-time bridge, not a sync loop. Needs `SANITY_API_WRITE_TOKEN` (Editor permission) in `.env`; documented in `.env.example`.

## 2026-08-31 — Client content-revamp kickoff: questionnaire + IA expansion (8 segments, 6 services)

Client feedback from an earlier call ("content didn't land," doesn't match what ELIS actually does) led to two new docs in `brand/`: `scratch-content-questionnaire.md` (a WhatsApp-ready ask to Jay/Glenn/Ekta for real intro copy, risk/coverage lists, and FAQ answers, page by page) and `scratch-current-site-copy.md` (a verbatim snapshot of every page's current copy, to diff future rewrites against). Also bumped the header logo size per the same feedback (`Header.astro`, `h-9` → `h-12`/`md:h-[3.25rem]`).

A follow-up call (Jay Bablani, 2026-08-28) expanded the IA: Who We Help goes from 4 to 8 segments (added Professional, Mortgage Brokers, Farmers, IT Professionals; renamed Healthcare → Health Care and Engineers → Architect and Engineers; kept Business Owners & Contractors combined), and Services goes from 5 to 6 (added Investments; renamed Disability Insurance → Disability & Critical Illness Insurance, with a critical-illness coverage bullet and FAQ added in the same general-education tone as the rest). Built all 5 new page routes (`src/pages/who-we-help/{professionals,mortgage-brokers,farmers,it-professionals}.astro`, `src/pages/services/investments.astro`) using the existing `EmptyState` component for an honest "full details coming soon" state, since none of these five have confirmed content yet — same pattern already used for Testimonials/Resources/the calculator teaser, not a fabrication. Both `src/data/segments.ts` and `src/data/services.ts` updated accordingly; the questionnaire and current-copy docs updated to match. Verified with `astro check` (0 errors).

## 2026-09-17 — Client content-revamp delivered: real copy for Farmers, IT Professionals, Professional, Investments; rewrites elsewhere

Client delivered final, approved page copy as static HTML mockups in `brand/content-revision/enterprise-life-site/`. Implemented directly into the site's content layer (`src/data/*.ts` — see "CMS status" note below):

- **New real content**, replacing the `EmptyState` "coming soon" placeholders from 2026-08-31: Who We Help → Farmers, IT Professionals, Professional; Services → Investments. Each now has a full intro, risk/coverage list, and 4-question FAQ in `src/data/segmentDetails.ts` / `src/data/serviceDetails.ts`, and their page routes render the same `SegmentHero`/`SegmentRisks`/`FAQ`/`CTASection` (or `ServiceHero`/`CoverageOverview`) pattern already used by the other segment/service pages. Mortgage Brokers remains "coming soon" — the client mockup itself has no detail page for it yet.
- **Rewritten FAQs**: Life Insurance (all 4 swapped, adds conversion-to-permanent and beneficiary questions), Travel Insurance (coverage list grows 4→6 items adding Super Visa/Visitors-to-Canada, all 4 FAQs replaced), Architect and Engineers, and Health Care (medical-professionals) — same topics, reworded per the client's copy.
- **Advisor profile pages restructured**: `src/data/advisors.ts`'s `Advisor` interface gained `tags: string[]` and `areasOfFocus: {title, description}[]`; `AdvisorProfile.astro` now renders a profile-hero band (photo, name, role, credential tag chips) plus an "Areas of Focus" 3-card grid below the bio, for all three advisors (all three pages share this one component). Jay's title is now "President" and Ekta's profile adds a CLU designation + "10+ years advising" — both new, client-confirmed facts not previously in `advisors.ts`/`CLAUDE.md`. Glenn Merkley's copy stays strictly scoped to commercial insurance — verified no life insurance sales/servicing language was introduced.
- **Home page**: hero eyebrow/headline/subhead reworded to match the client's new copy (adds a "holistic, relationship-first approach" paragraph); the lower-page "A New Company, Not New Advisors" advisor-credibility eyebrow is unchanged. `AdvisorCredibility.astro` now shows all 3 advisors (was Jay + Glenn only) in a 3-column grid.
- **Footer**: `Footer.astro`'s nav was hardcoded to the original 4 segments/5 services and had drifted stale since the 2026-08-28 IA expansion. Made it dynamic — it now maps over `src/data/segments.ts`/`services.ts` directly, so it can't go stale again.

**CMS status, clarified while doing this work**: a real Sanity project now exists (Studio has real `Service`/`Advisor`/`Segment`/etc. documents, almost certainly from the one-time `pnpm seed` bridge), but none of the page templates touched here actually query it — Services, Segments, Advisors, and Home/About copy all still come from the static `src/data/*.ts` files edited above. Only Resources and Testimonials fetch from Sanity live. So editing content in Studio today has no effect on the live site, and the Studio's seeded documents are now out of sync with the edits above. Worth a decision later: migrate these page types to fetch from Sanity so the Studio becomes the real editing surface, or keep treating `src/data/*.ts` as the source of truth and stop suggesting Studio edits for this content.

Verified with `astro check` (0 errors, 81 files) and `astro build` (clean; confirmed no "Coming Soon" placeholder remains on the four newly-built pages in the built output).

## 2026-09-17 — Sanity actually wired up (Services, Segments, Advisors now live-editable in Studio)

Follow-up to the CMS status note above: made the Sanity Studio a real, live-editable source for Services, Who We Help Segments, and Advisors, which is what the client was expecting when they asked why Studio edits weren't showing up.

- **Schema reshaped to match the site exactly**: the old schema (`src/sanity/schemaTypes/{segment,service,advisor}.ts`, `objects/faqItem.ts`) used portable-text block arrays for fields that are plain strings/string-arrays in `src/data/*.ts` (`segment.intro`, `service.coverageOverview`, `faqItem.answer`), and was missing fields the site actually renders (`segment.description`/`risks`, `service.intro`, `advisor.shortBio`/`tags`/`areasOfFocus`). Studio content was silently lossy even if pages had queried it. Fixed field-for-field.
- **`scripts/seed-sanity.ts` rewritten** to push the new shapes (no more portable-text conversion helpers for these fields) — still needs a human to run `pnpm seed` (has real write access via `SANITY_API_WRITE_TOKEN`); not run as part of this change, so it wasn't run automatically.
- **New `src/lib/queries.ts`**: shared GROQ queries + TypeScript shapes (`SegmentCardData`/`SegmentPageData`, `ServiceCardData`/`ServicePageData`, `AdvisorCardData`/`AdvisorPageData`) plus shape-validators (`isValidSegmentPageData` etc.) used below.
- **Every page/component that rendered Services/Segments/Advisors now fetches from Sanity first**, via `safeFetch`/new `safeFetchList`/`safeFetchOne` helpers (`src/lib/sanityFetch.ts`), falling back to the matching `src/data/*.ts` file if the query errors, returns nothing, or — critically — returns a document seeded under the old schema shape. That last case doesn't throw (the document exists, just with missing/wrong-shaped fields), so a naive fallback-on-error wouldn't have caught it: building against the real (currently stale) dataset crashed with `Cannot read properties of null (reading 'map')` on the advisor pages, and silently showed only the old 4-segment/5-service list everywhere else (dropping Farmers/IT Professionals/Professional/Mortgage Brokers/Investments) instead of falling back to the full static list. Added explicit shape validators (`isValid*PageData`/`isValid*CardData` in `queries.ts`) so a stale/incomplete Sanity result is rejected wholesale in favor of the static fallback, rather than partially trusted. Confirmed via `astro build` against the real (unseeded-for-new-schema) project: no crash, full 8 segments/6 services/3 advisors render correctly from fallback.
- Wired: `src/pages/who-we-help/{index,business-owners,engineers,families-individuals,farmers,it-professionals,medical-professionals,mortgage-brokers,professionals}.astro`, `src/pages/services/{index,life-insurance,disability-insurance,group-benefits,financial-estate-planning,investments,travel-insurance}.astro`, `src/pages/about/{index via TeamGrid.astro,jay-bablani,glenn-merkley,ekta-balani}.astro`, `src/components/home/{WhoWeHelp,Services,AdvisorCredibility}.astro`, `src/components/Footer.astro`. Advisor headshots deliberately stay served from the static local `/brand/team/*` paths rather than Sanity image assets — kept photo management out of scope for this pass; only copy (bio, role, tags, areas of focus) is Sanity-backed.
- **Fixed a real, pre-existing config bug found while testing this**: `astro.config.mjs` read `process.env.PUBLIC_SANITY_PROJECT_ID` directly at config-load time, before Astro/Vite has injected `.env` into `process.env` — so a plain `pnpm dev`/`pnpm build` (no explicit env flag) was *always* silently using the placeholder project, even with a real project ID set in `.env`, since the project was scaffolded. Fixed with `process.loadEnvFile()` (Node ≥20.12, this repo requires ≥22.12) at the top of the config, wrapped in try/catch so a missing `.env` (fresh clone) still falls through to the placeholder rather than crashing.

**Still needed from a human with dashboard access** (not something this session can do):
1. ~~Run `pnpm seed`~~ — done 2026-09-18, see below.
2. ~~Set up a Sanity webhook → Vercel Deploy Hook~~ — done 2026-09-18, see below.

## 2026-09-18 — Sanity → Vercel deploy pipeline wired up; found all the above work was never live

Closed out the two "still needed" items above, and along the way found the real reason the client wasn't seeing any of the 2026-09-17 content fixes on the live site.

- **`pnpm seed` run against the real project** (`asbmuht0`), pushing the reshaped schema's documents. Also hit and fixed two Studio-side issues while verifying: stale `drafts.<id>` documents left over from before the schema reshape were shadowing the correctly-published documents in the editor (fixed by adding `discardStaleDrafts()` to `seed-sanity.ts`, now runs every `pnpm seed`), and an "Unknown fields found" / "Expected type Array, got String" validation error in Studio that turned out to be a stale, long-running local `astro dev` process that had never reloaded the current schema files — Studio's embedded schema isn't reliably hot-reloaded, so a full dev-server restart was needed, not a data fix.
- **Sanity webhook → Vercel Deploy Hook** configured: any Create/Update/Delete publish in the `production` dataset (no type filter — client preferred every publish to trigger a rebuild over maintaining a type allowlist) POSTs to a Vercel Deploy Hook, triggering a rebuild.
- **Root cause of "nothing I publish/redeploy shows up," found while testing the webhook**: every file from the two 2026-09-17 entries above had been sitting as **uncommitted local changes** — never pushed to `main`. Every deploy-hook-triggered rebuild was building the old pre-fix code from GitHub, regardless of what changed in Sanity or how many times it rebuilt. Not a caching or CMS bug at all. Committed and pushed everything in this session (content fixes, schema/seed/query-helper changes, this log).
- **Separately, fixed a real stale-HTML-flash bug**: reloading the live site briefly painted a previously-cached copy of the page before swapping to the current one, even after a hard reload — the browser/edge was allowed to store and reuse the prerendered HTML document. Added `vercel.json` scoping `Cache-Control: no-store` to document requests (`Accept: text/html`) only, so page navigations always do one fresh fetch and paint once; static assets (`/_astro/*`, images) keep their normal long-term caching.
