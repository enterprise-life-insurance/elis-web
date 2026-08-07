# Design & Tech Reference Audit

Research pass over reference sites supplied for this project, plus the two local mockups in this folder. Method: HTTP/HTML/CSS inspection (`curl` + grep on served markup, stylesheets, and JS bundles) for tech-stack and token-level facts (colors, fonts, spacing, transition timings, animation-library fingerprints); page-render analysis for layout/IA/tone; Awwwards/CSS Design Awards listings where a site was inaccessible to direct fetch. No browser screenshots were taken (browser tooling wasn't available this session) — visual claims below are inferred from markup/CSS/JS, not pixel-measured.

Audit-only. No implementation decisions made here — see "Open questions for ELIS" at the end.

**Batch 1** (2026-08-07): qopiafinancial.ca, safepacific.com, radiantlifefinancial.ca — general competitor/positioning references.
**Batch 2** (2026-08-07): subduxion.com, limeiq.com, alethia.earth, solvenergy.com — called out specifically for premium/unique animation, motion, and interaction quality, independent of industry fit.

---

## 1. qopiafinancial.ca

**Tech stack:** WordPress + Divi theme (Divi Child Theme) + Divi Builder, Gravity Forms (multi-step quiz/calculator forms), Popups for Divi, LiteSpeed cache. Fully off-the-shelf page-builder stack — no custom framework.

**Typography:** Google Fonts stack typical of Divi defaults — Merriweather (serif, likely headline candidate), Source Sans Pro, Nunito Sans, Poppins, Catamaran, Roboto all queued but only a subset actually used. H1 module renders small (28px in the captured breakpoint) relative to viewport — hierarchy leans on weight/letter-spacing more than raw size.

**Color usage:** Unusual accent for the category — warm bronze/tan (`#a7774b`, appears 13× in inline styles) as the dominant brand color rather than blue. Black (`#000`) and white for base, with a WordPress default-palette color set (`#ff6900`, `#fcb900`, `#00d084`, etc.) present but likely unused editorial leftovers, not intentional brand colors.

**Spacing/sizing:** Standard Divi row/column gutters (module-based, not a custom scale). Buttons are full pill shape (`border-radius:100px`).

**Animation / micro-interactions:** Classic Divi hover pattern — buttons transition `background-color 1s ease-out` and `letter-spacing 0.5s ease-out` on hover (text visibly spreads, background fills). Hero section uses Divi's built-in parallax background (`et_pb_section_parallax` / `et_parallax_bg`). No scroll-triggered reveal animations detected beyond Divi's default `et_animated` fade-in-on-view class.

**IA / content order:** Hero (headline + single CTA) → interactive tools block (4 quizzes/calculators: retirement readiness, insurance needs, portfolio suitability, group-benefits adequacy — each a Gravity Forms multi-step flow) → "Qopia Advantage" 4-column service grid → testimonials (5 quotes) → resources/blog CTA → footer.

**Tone:** Trust/transparency-forward copy ("Transparency that Matters"), client-centric, calm. Dark hero with glowing logo treatment for a premium feel.

**Relevance to ELIS:** The 4-tool interactive quiz/calculator block is the most directly relevant pattern — ELIS's IA already calls for a calculator per segment landing page and a Tools index; this is a working precedent for how to package that as a homepage teaser.

---

## 2. safepacific.com

**Tech stack:** WordPress running a **fully custom theme** (`takt-spf` — built by/for an agency, not a marketplace theme) combined with Tailwind CSS utility classes, Alpine.js (`x-data` reactive components), Swiper.js (carousels/testimonials), Gravity Forms + reCAPTCHA, Autoptimize, Instagram Feed Pro. Presence of Livewire CSS variables suggests the theme was built on a modern component-driven front-end workflow (Tailwind + Alpine is a common "no-build-step reactivity" pairing) rather than classic page-builder output. Site sits behind Cloudflare with bot-challenge enabled (blocks naive scrapers/curl without full browser headers).

**Typography:** Two-font pairing — `CordaLig` (custom/licensed serif, used for display headings and quote/prose blocks) over `Roboto` (sans, body/UI). Serif-for-headline + sans-for-body is a deliberate "editorial trust" signal, distinct from the other two references which stay all-sans.

**Color usage:** Restrained two-tone system — `dark-blue` (custom Tailwind token) + white, with black used for contrast overlays and a `bg-gradient-to-t` scrim over hero imagery. No secondary/tertiary brand color detected in markup — palette discipline is tight.

**Sizing:** Aggressively oversized display numerals for the "01–04" differentiator callouts (Tailwind arbitrary values up to `text-[137px]`, `text-[98px]`) — big-number sections are a deliberate hero-of-the-page moment, not decorative. Headings otherwise run `text-3xl` to `text-7xl`. Thick 4px borders (`border-[4px]`) used as a graphic device rather than thin hairlines.

**Animation / micro-interactions:** Consistent `duration-300` (300ms) transitions throughout — `hover:opacity-70` / `hover:opacity-100` fades on links and cards, `hover:translate-y-0` (implies an element sits translated off its resting position until hover — a lift/settle effect), `hover:bg-dark-blue` + `hover:text-white` color inversion on buttons, `hover:rounded-bl-*` (corner shape morphs on hover — an organic/branded touch), and a `animate-marquee` continuous-scroll ticker (likely the partner-logo strip). This is the most animation-considered of the three references — timing is consistent (300ms everywhere) rather than ad hoc.

**IA / content order:** Hero (coastal photography, "Personalized Insurance & Investment Strategies", single "Let's Meet" CTA) → About / four differentiators as numbered big-type callouts (Always Independent, Relationship Focused, No Pressure, No Rush) → "Who We Serve" (business owners, professionals, affluent families, estates) → Knowledge Hub preview (8 articles w/ read-time labels) → Services/Process/Case-Studies tabbed section → testimonial carousel (12+ reviews, attributed to named advisors) → contact form → footer (nav mirror + address + social + legal).

**Tone:** Conversational-but-authoritative, relationship-led, explicitly "no pressure, no rush" — positions against typical insurance-sales stereotypes. Segment language ("business owners," "professionals," "affluent families," "estates") maps closely to ELIS's own four-segment "Who We Help" structure.

**Relevance to ELIS:** Closest stylistic and structural match to ELIS's positioning (advisor-led, segment-fluent, "not new advisors" trust narrative). The numbered-differentiator big-type section and named-advisor testimonials are strong direct precedents. Tech stack (Tailwind + Alpine, custom theme) is also the most "modern build" of the three, useful as a technical bar to aim for if ELIS goes headless/custom rather than page-builder.

---

## 3. radiantlifefinancial.ca

**Tech stack:** WordPress on an older marketplace theme (`revolution`, versioned 2.4.5.3) + WPBakery Page Builder (`js_composer`), **skrollr.js** for parallax scrolling (a jQuery-era library, largely abandoned since ~2016), Feed Them Social + Instagram Feed for embedded social proof, Font Awesome 4-era icon set. Upload timestamps in served assets date to 2018, consistent with a site that hasn't had a structural rebuild since. This is the technically weakest/most dated of the three references.

**Typography:** `Vidaloka` (serif display) + `Palanquin` (sans body/UI) — a traditional serif-headline pairing. Bilingual content (English + Traditional Chinese, "瑞光金融"), which adds real layout/typography constraints (CJK line-height and font-fallback) not present in the other two references.

**Color usage:** Traditional "old money" trust palette — deep navy (`#1b2c68`) + gold/khaki (`#968357`), with light neutrals (`#f0f0f0`, `#f4f4f4`) for section backgrounds. Palette intent is coherent even though the surrounding tech is dated.

**IA / content order:** Hero (logo + tagline "Your life, should be a Radiant Life" + 3 equal-width service cards: Life Insurance, Financial Planning, Business Centre) → tagline/legacy messaging block → embedded Instagram feed → embedded Facebook feed → retirement-consultation promo CTA → partner/institution logo grid → three recruitment/consultation/partnership CTA blocks → large multi-column footer.

**Animation:** skrollr-driven parallax scroll effects (background elements move at a different rate than foreground on scroll) — a dated technique that's easy to get janky on mobile; not recommended as a pattern to copy.

**Tone:** Relationship-over-transaction messaging, multi-service breadth (insurance + mortgages + accounting + business services under one roof) rather than a tight niche focus — nav is noticeably more sprawling than the other two (About, Life Insurance, Financial Planning, Business Centre, Other Services incl. Mortgages/Home & Auto/Tax & Accounting, Clients, Contact).

**Relevance to ELIS:** Useful negative/cautionary reference more than a positive one — shows what happens when IA grows unchecked (broad service nav) and when scroll-parallax is done with legacy tooling. The bilingual handling and navy/gold trust palette are worth noting even though the execution is dated.

---

## 4. Local mockups (`elis-web-reference-1.jpg`, `elis-web-reference-2.png`)

**`elis-web-reference-1.jpg` ("Finovate" template):** Off-the-shelf consulting/finance template, not ELIS-branded. Dark wood-paneled hero with warm lighting and a lime-green accent color (`#8BC53F`-ish) against deep green/charcoal text, asymmetric hero photo crop, pill-shaped CTA buttons, small floating stat pills over the hero image ("Trusted Partner," "Financial Services," "Investing"), and a 3-card grid directly below the hero using irregular blob/cutout image shapes as a graphic device (not the standard rectangle-crop card). Numbered scroll-progress indicator (01/03) pinned to the hero's right edge. This is a style/mood reference, not a build target — the agency likely pulled it to gesture at "editorial, tactile, not corporate-flat" energy.

**`elis-web-reference-2.png` (ELIS-branded wireframe):** Low-fidelity greybox wireframe already using ELIS's actual logo, blue/green brand colors, and an "EST 2026" badge overlaid on the logo mark in the hero. Full-bleed photographic hero (family/lifestyle imagery, consistent with the brand-voice doc's "families" segment tone) with headline "Safeguarding your Valuables" and dual CTAs (`Learn more` outline pill + `Get Started` filled green pill — same pill-button language as reference 1). Below the hero: a "trusted by" logo strip placeholder (echoes the partner-logos folder), then repeating two-column content blocks (heading + copy + dual CTA + image placeholders) — this is effectively an approved low-fi layout skeleton for the homepage, not just a mood board.

---

## 5. subduxion.com

**Tech stack:** Built and hosted on **Framer** (SSG — `server: Framer`, served from `framerusercontent.com`, edge-cached out of `ca-central-1`). Framer's own animation runtime drives everything — no separate GSAP/Lottie/etc. detected. Entrance animations are implemented via `data-framer-appear-id` elements with inline `transform:translateX(20px) translateY(0px) scale(1)` → `translate(0,0) scale(1)` resting states (slide-and-settle on scroll into view), plus extensive `will-change` hints for GPU-accelerated transforms.

**Typography:** `Inter` for UI/body, with `Fragment Mono` and `Roboto Mono` for what's almost certainly eyebrow labels, stats, and code-flavored accents — the monospace-for-data-points convention common to AI-product marketing sites.

**Color usage:** Near-black base (`#131313`) with a single high-voltage neon-lime accent (`#98fe00`) — a "premium dark mode" formula: everything reads as restrained/expensive until the accent color hits, then it's unmissable. Small supporting blues (`#d2e9fe`, `#9ecdf8`) appear in what's likely a diagram/illustration, not the core palette.

**Sizing/shape:** Mostly sharp corners (`border-radius:0px` dominant) with a couple of `10px` card radii and one large `64px` pill — sharp geometric shell, soft accent on the one element meant to invite a click (likely primary CTA). `cursor:none` on at least one element strongly suggests a custom cursor replacement (a common premium-site signature — default cursor hidden, replaced by a styled dot/ring that the site draws itself).

**Content order / copy:** Hero ("AI you can trust / Data you can rely on") → capabilities → 8 use-case categories → 4-stage delivery methodology (Envision, Blueprint, Deploy, Support) → partner logos → careers pitch → blog. Copy is outcome-first and governance-forward (EU/data-sovereignty angle), not hype-driven.

**Relevance to ELIS:** Not an industry match (AI consulting), but the dark-base + single-neon-accent + monospace-data-label formula, sharp-cornered shell with one soft pill CTA, and Framer's scroll-appear system are all directly reusable *motion-language* ideas even on a warmer, more human-facing brand like ELIS.

---

## 6. limeiq.com

**Access note:** Site sits behind a Vercel bot-challenge (`x-vercel-mitigated: challenge`, HTTP 429 to non-browser requests) — could not be fetched directly this session (same constraint applies to any headless/non-JS client, not just this tool). Findings below are sourced from its [Awwwards Honorable Mention listing](https://www.awwwards.com/sites/limeiq) (awarded 2025-11-04) rather than direct inspection — flagged as lower-confidence than the other audits here.

**Category:** Insurance technology — the single closest industry match of the seven sites audited (LimeIQ is literally an insurance-tech company). Awwwards' own line on it: *"Rhythmic, precise, and rich with metaphor — LimeIQ's website merges art and logic, shaping a visual language of insurance tech."*

**Color palette (per Awwwards):** Warm cream/beige (`#E5DED6`) paired with dark brown/charcoal (`#2E2522`) — a warm, paper-like neutral duo rather than corporate blue, unusual and distinctive for the insurance category (echoes qopiafinancial.ca's bronze instinct in batch 1, but executed with more restraint per the award scoring).

**Design approach:** Tagged Business & Corporate, Technology, Animation, Colorful, Flat Design, Graphic Design, Transitions, Content Architecture. Designed in Figma. Awwwards notes **scroll-based animation** (3 distinct variations), **mouse-interaction-driven** elements, and animation/transitions "throughout" — i.e. motion is a core deliverable of the site, not an afterthought, which matches the user's read of it as premium/animation-forward.

**Scoring:** Community average 6.60–8.30 across categories, peak individual score 8.30/10 — solid but not top-tier Awwwards (site-of-the-day-caliber sites typically clear 8.5+), useful calibration for how "premium" this reference actually reads industry-wide versus subduxion/alethia which weren't submitted/scored anywhere found.

**Relevance to ELIS:** Highest industry relevance of the whole reference set (insurance) and the strongest signal that a warm/editorial neutral palette + heavy scroll/mouse animation can work well in this category. Recommend revisiting this one with actual browser access (or asking the client for a Loom/screen recording) once available — this audit's confidence on it is meaningfully lower than the other six.

---

## 7. alethia.earth

**Tech stack:** Also Framer-built (identical hosting fingerprint to subduxion.com — `server: Framer`, `framerusercontent.com` preconnect). Same appear-on-scroll transform pattern as subduxion, confirming this is Framer's native scroll-reveal system rather than a site-specific build.

**Typography:** `Geist` + `Geist Mono` (Vercel's typeface) alongside `Fragment Mono` and `Inter` — again a sans-plus-monospace pairing, monospace reserved for data/numeric content given the `data-framer-name` labels seen ("Number", "Data", "Status Indicator", "01"/"02" sequencing).

**Color usage:** Deep forest green base (`#0f1f10`) with a bright mint/lime accent (`#C6F19D`) — structurally the *same* dark-base-plus-neon-accent formula as subduxion.com (down to both landing in the yellow-green hue family), just retinted to the brand's "environmental intelligence" positioning. A few saturated outliers (`#e02f99` magenta, `#802070` purple, `#fff345` yellow) suggest a data-viz/chart legend rather than core brand color.

**Signature interaction pattern — glassmorphism:** Heavy, layered use of `backdrop-filter: blur()` at four distinct depths (3px, 4px, 10px, 12px) — frosted-glass panels stacked over imagery/content, a strong premium-UI signal and the standout technique of this reference relative to the others (none of the other six sites in this audit use backdrop blur at all).

**Content:** Hero ("Know your impact—precisely") → 5 numbered measurement-capability systems → nature-based/supply-chain solution categories → tech explainers (atmospheric MRV, blockchain) → trust narrative → case studies with real metrics (e.g. "-8.3 tCO₂e" formatted figures) → footer. The numbered-system and live-metric presentation gives it a "dashboard made marketing-page" feel.

**Relevance to ELIS:** The glassmorphic card treatment and dark-base/neon-accent + monospace-numerics formula are the two most distinctive, liftable ideas here. The "numbered system" content pattern (01/02/03 measurement capabilities) is structurally similar to safepacific.com's numbered differentiators from batch 1 — two independent premium references converging on the same "big numbered callout" device.

---

## 8. solvenergy.com

**Tech stack:** **Craft CMS** (`CRAFT_CSRF_TOKEN` cookie, Craft's Freeform plugin for the contact form with reCAPTCHA v3) on nginx — a genuine custom build, not a page builder or template marketplace theme. Front-end is a Vite-bundled app (`app-B8X3mNPe.js`, content-hashed filename) layered over the CMS, plus jQuery 3.7.1, Swiper (project carousels), Lity (image lightbox), and Klaro (cookie-consent manager). No GSAP/ScrollTrigger/Lenis/Locomotive-Scroll fingerprint found in the bundled JS — animation here is likely handled with plain CSS transitions/`IntersectionObserver` rather than a dedicated animation library (only 1 `IntersectionObserver` and 3 `requestAnimationFrame` references in the whole bundle — modest by comparison to the Framer sites' animation density).

**Typography:** Roboto, self-hosted via `@font-face` — a plain, corporate-safe workhorse sans, no display/serif accent face.

**Color usage:** Utility blue (`#007bc7`, `#005CB9`) with a teal accent (`#108390`) — conventional energy-sector blue, the least distinctive palette of the seven sites audited.

**Content:** Hero (full-bleed solar-infrastructure photography, "Powering Progress with Proven Execution") → value proposition → service focus areas → stats block ("500+ power plants constructed"-style bold figures) → featured projects (Swiper carousel) → testimonial → contact form (Freeform) → footer. Photography-led rather than animation-led — real aerial/ground project photography carries the "scale and credibility" message rather than motion design.

**Relevance to ELIS:** Weakest fit for "premium/unique animation" of the four batch-2 sites — reads as a solid, professional B2B energy site built on a real custom CMS stack, but not an animation reference. Worth keeping only as a counter-example: shows that "custom-built, non-page-builder" doesn't automatically mean "animation-forward" — the two aren't the same axis. If the client's intent in listing it was the photography-led, stats-forward credibility section, that's the transferable idea, not motion.

---

## 9. Local mockups (`elis-web-reference-1.jpg`, `elis-web-reference-2.png`)

**`elis-web-reference-1.jpg` ("Finovate" template):** Off-the-shelf consulting/finance template, not ELIS-branded. Dark wood-paneled hero with warm lighting and a lime-green accent color (`#8BC53F`-ish) against deep green/charcoal text, asymmetric hero photo crop, pill-shaped CTA buttons, small floating stat pills over the hero image ("Trusted Partner," "Financial Services," "Investing"), and a 3-card grid directly below the hero using irregular blob/cutout image shapes as a graphic device (not the standard rectangle-crop card). Numbered scroll-progress indicator (01/03) pinned to the hero's right edge. This is a style/mood reference, not a build target — the agency likely pulled it to gesture at "editorial, tactile, not corporate-flat" energy.

**`elis-web-reference-2.png` (ELIS-branded wireframe):** Low-fidelity greybox wireframe already using ELIS's actual logo, blue/green brand colors, and an "EST 2026" badge overlaid on the logo mark in the hero. Full-bleed photographic hero (family/lifestyle imagery, consistent with the brand-voice doc's "families" segment tone) with headline "Safeguarding your Valuables" and dual CTAs (`Learn more` outline pill + `Get Started` filled green pill — same pill-button language as reference 1). Below the hero: a "trusted by" logo strip placeholder (echoes the partner-logos folder), then repeating two-column content blocks (heading + copy + dual CTA + image placeholders) — this is effectively an approved low-fi layout skeleton for the homepage, not just a mood board.

---

## Cross-site synthesis

| | qopiafinancial.ca | safepacific.com | radiantlifefinancial.ca | subduxion.com | limeiq.com | alethia.earth | solvenergy.com |
|---|---|---|---|---|---|---|---|
| Stack | WordPress + Divi | WordPress + custom Tailwind/Alpine | WordPress + dated theme + skrollr | Framer | Unknown (Vercel, blocked) | Framer | Craft CMS + Vite bundle |
| Typography | Sans-only, Divi defaults | Serif headline / sans body | Serif headline / sans body | Inter + mono accents | Unknown | Geist + mono accents | Roboto only |
| Color discipline | Loose (bronze + WP leftovers) | Tight (navy + white, one accent) | Coherent but dated (navy + gold) | Dark base + single neon accent | Warm cream + charcoal (per Awwwards) | Dark green base + neon mint accent | Conventional utility blue |
| Animation sophistication | Basic Divi hover, parallax hero | Consistent 300ms system, lift/fade/marquee | Legacy skrollr parallax | Framer scroll-appear (slide+scale), custom cursor | Scroll + mouse-driven, "throughout" (per Awwwards) | Framer scroll-appear + heavy glassmorphism | Minimal — plain CSS/IntersectionObserver, photography-led instead |
| CTA shape | Pill | Squared, color-invert hover | Rectangular | Sharp shell, one soft 64px pill | Unknown | Sharp, glass panels | Text links |
| Distinct pattern | Interactive quiz/calculator bank | Numbered big-type differentiators; named-advisor testimonials | Bilingual; broad nav | Neon-on-black, monospace data labels, custom cursor | Warm neutral palette in an insurance-tech category | Glassmorphic cards, numbered measurement systems | Photography + stats-led credibility |

**Where the local wireframe (`reference-2.png`) already sits relative to these:** pill buttons + full-bleed lifestyle photography + trusted-by logo strip is closest to safepacific.com's restraint and qopiafinancial.ca's button language. None of batch 2's dark-mode/neon-accent formula is present in it yet — if the client wants that premium-animation energy carried into ELIS, it'd be a genuine departure from the wireframe's current light, warm, family-photography direction, worth confirming rather than assuming.

## Decisions

- **Typography: sticking with the brand font.** Poppins (sans-only, per the visual identity draft) stays as-is — no serif accent face, despite several references (safepacific, radiant, limeiq's editorial feel) leaning on one for authority. Decided 2026-08-07.
- **Color palette: final.** The visual identity guideline's palette (Enterprise Blue `#0061A6`, Life Green `#85BD2D`, Neutral Grey `#F7F7F7` + ramps) is confirmed, no longer draft. Decided 2026-08-07.
- **Visual direction: stay light/warm, not dark/neon — but keep chasing batch-2's animation and interaction *quality*.** Client confirmed: don't move away from ELIS's current warm, family-photography direction (visual identity draft + local wireframe). The dark-base/neon-accent formula from subduxion.com and alethia.earth was read as *mood* (confidence, restraint, motion quality), not a literal palette to adopt — so the target is scroll-choreography, glassmorphism-caliber polish, and micro-interaction density reinterpreted inside ELIS's confirmed light palette, not a dark-UI pivot. Decided 2026-08-07.
- **Transactional email: SendGrid.** Resolves the form-delivery open item for the contact form / calculator submissions. Decided 2026-08-07.

## Open questions for ELIS (not decided here)

- Animation budget/library: safepacific.com's consistent 300ms hover system and the two Framer sites' scroll-appear + glassmorphism are the most reusable *patterns*, but none of them are trivial to replicate outside Framer without picking a real animation stack (e.g. GSAP/Framer Motion + Lenis for smooth scroll) — that's a tech-stack decision, not just a style one. (Stack itself is now confirmed — see `CLAUDE.md` — this is about how far to push it within the light palette.)
- Interactive tools: qopiafinancial.ca's quiz/calculator bank remains the strongest working precedent for the "Tools" section and per-segment calculators already called for in `ia/website-ia-sitemap.md`.
- limeiq.com needs a follow-up pass with real browser access (or a client-provided recording) — this audit's read on it is Awwwards-sourced, not directly inspected, and it's the single closest industry comparable (insurance tech) of all seven sites.
- Tech stack for ELIS itself is still unset per `CLAUDE.md` ("no framework/tooling set up yet"). Nothing in either batch is being recommended by default — Framer buys the scroll-appear/glassmorphism polish "for free" but trades away custom-code flexibility; Craft/WordPress custom builds (safepacific, solvenergy) buy flexibility but require someone to hand-build the animation system. That trade-off is a separate decision from this audit.
