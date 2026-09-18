// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';

// astro.config.mjs runs before Vite injects .env into process.env, so reading
// process.env.PUBLIC_SANITY_PROJECT_ID directly here always saw undefined (even
// with a real project ID set in .env) and silently fell back to the placeholder.
// process.loadEnvFile (Node >=20.12, this repo requires >=22.12 — see
// package.json engines) reads .env explicitly, the same way `pnpm seed` already
// does via `node --env-file=.env`. Wrapped in try/catch: harmless if .env doesn't
// exist yet (fresh clone before `cp .env.example .env`, or CI without secrets).
try {
  process.loadEnvFile();
} catch {
  // no .env file — falls through to the placeholder project below
}
const env = process.env;

// https://astro.build/config
export default defineConfig({
  // TODO: switch back to 'https://enterpriselife.ca' once DNS points there —
  // it's currently still on the registrar's parking page (redirects to /lander),
  // so OG/Twitter tags pointing at it 404 for link-preview crawlers (WhatsApp etc).
  site: 'https://elis-web.vercel.app',

  integrations: [
    react(),
    sanity({
      // Placeholder if no real Sanity project is configured (see .env.example) —
      // @sanity/astro instantiates a client for every route at build time, so an
      // empty projectId breaks `astro build` even on pages that don't query Sanity.
      projectId: env.PUBLIC_SANITY_PROJECT_ID || 'placeholder-project',
      dataset: env.PUBLIC_SANITY_DATASET || 'production',
      // Static build (see CLAUDE.md tech stack) — CDN caching is fine for reads.
      useCdn: true,
      studioBasePath: '/studio',
    })
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});