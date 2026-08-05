# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo status

No application code yet. This repo currently holds a one-time content/asset bridge from the agency's vault (locked brand voice/messaging, logo assets, approved IA) as the starting point for building the ELIS website. There is no framework, build tooling, package manager, or test suite set up yet — when development starts, choose whatever framework/tooling fits and set it up independent of anything in the agency's `second-brain` vault.

## Who ELIS is

Enterprise Life Insurance and Investment Solutions (ELIS) is a new insurance venture built on its founders' long-standing advisor experience — **new company, not new advisors**. That distinction must come through in all copy and site structure.

Key contacts:
- **Jay Bablani** — client-side lead, primary decision-maker on brand/positioning.
- **Glenn Merkley** — Director, 30+ years in insurance, specializes in commercial insurance for business owners, professionals, and HNW clients. ⚠️ **Not licensed for life insurance sales/servicing** — never attribute life insurance sales, servicing, or credentialing to him anywhere on the site (bio, advisor profile, homepage/services credibility copy). See `ia/website-ia-sitemap.md` for the confirmed bio and full constraint.
- **Ekta Balani** — client-side, handles logistics; also listed on the advisor/team directory.

## Content sources (read before writing copy or building pages)

- `brand/brand-voice-messaging.md` — locked positioning, mission, vision, communication pillars (with "say this / not that" examples), and segment-specific tone (Engineers, Medical professionals, Business owners/trades, Families & Individuals). Any UI copy should follow these pillars and tone rules.
- `ia/website-ia-sitemap.md` — approved sitemap: Home, About (incl. advisor profile pages with individual QR codes), Who We Help (four segment landing pages, each with a calculator + FAQ), Services (five service pages, each with coverage overview + FAQ), Tools (calculator index — specific tools still unconfirmed), Resources, Contact. Open items (calculators, domain) are called out there.
- `brand/logo/` — final SVG logo assets (primary/secondary color, stacked w/ tagline, wordmark, favicons). Brand identity beyond the logo (color palette, typography) is **not yet final** — don't treat anything beyond the logo files as locked.

## Sync model — important

This folder is a **deliberate, one-time snapshot**, not a live mirror of the agency vault. If brand copy, IA, or assets change upstream, they get re-copied deliberately — don't assume this repo auto-reflects vault changes, and don't try to sync back into the vault automatically.

- Full history/current status lives at `.../second-brain/03-Projects/Ctrl-The-Hype/01-Clients/InsureLine-ELIS/` (agency-side, outside this repo) — not accessible from here.
- Agency-internal tracking (open loops, meeting notes, account status, SOW discussion) intentionally does **not** live in this repo.
- `PROGRESS.md` is the dated, milestone-level build log for this repo (not a commit log). Add an entry whenever something client-relevant changes: a milestone hit, a decision made, a blocker found. When the vault's status docs need updating, point back to `PROGRESS.md` (or state what changed) rather than syncing automatically.
