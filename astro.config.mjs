// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  // TODO: switch back to 'https://enterpriselife.ca' once DNS points there —
  // it's currently still on the registrar's parking page (redirects to /lander),
  // so OG/Twitter tags pointing at it 404 for link-preview crawlers (WhatsApp etc).
  site: 'https://elis-web.vercel.app',

  integrations: [
    react(),
    sanity({
      // Placeholder until a real Sanity project exists (see .env.example) —
      // @sanity/astro instantiates a client for every route at build time, so an
      // empty projectId breaks `astro build` even on pages that don't query Sanity.
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder-project',
      dataset: process.env.PUBLIC_SANITY_DATASET ?? 'production',
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