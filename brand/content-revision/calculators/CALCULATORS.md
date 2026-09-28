# /tools calculators — integration notes

Three calculators built to the site's stack: React 19 islands, Tailwind v4 brand ramps
(`enterprise-blue-*`, `life-green-*`, `natural-grey-*`), Poppins via the existing `--font-sans`, and `lucide-react`.
No new dependencies.

## Files

| Path | What it is |
| --- | --- |
| `src/lib/calculators/rules.ts` | Tax values (inclusion rate, Ontario top rate, probate), `money()`, `roundUp()`, contact path |
| `src/lib/calculators/logic.ts` | Pure calculation functions for all three tools — no UI, easy to unit test |
| `src/components/tools/CalculatorUI.tsx` | Shared fields, result panel, stacked bar, ledger, CTA |
| `src/components/tools/NeedsCalculator.tsx` | Life insurance needs |
| `src/components/tools/BuySellCalculator.tsx` | Buy-sell funding (corporate-owned or criss-cross, 2–4 owners) |
| `src/components/tools/EstateTaxCalculator.tsx` | Tax + Ontario probate at death |
| `src/pages/tools/index.astro` | Replaces the `/tools` PageStub |
| `src/pages/tools/life-insurance-needs.astro`, `buy-sell.astro`, `estate-tax.astro` | One page per calculator |

## Check before merging

1. **Layout import.** Pages import `../../layouts/Layout.astro`. Adjust if the layout lives elsewhere.
2. **Colour steps.** Classes assume the ramp's 500 step is the base brand colour (`#0061A6` / `#85BD2D`).
   If the guideline maps the base to 600, shift the steps down one.
3. **CTA section.** Each page has a comment where the shared `CTASection` should go.
4. **Segment pages.** The Who We Help "coming soon" calculator sections can now link or embed:
   - Families & Individuals → Life insurance needs
   - Business Owners & Contractors, Farmers → Buy-sell funding
   - Professionals, Health Care, Engineers → Life insurance needs (estate tax for HNW clients)
5. **Accountant review.** Confirm the values in `rules.ts` and the single-marginal-rate simplification
   in the estate calculator before launch.
6. **Credentialing.** The CTA says "Review this with an advisor" and links to `/contact`; no advisor is named,
   so the life-insurance credentialing constraint on advisor attribution isn't affected.
7. Add a `PROGRESS.md` entry and update the README status line ("Calculators: not yet confirmed").
