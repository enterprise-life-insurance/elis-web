// Shared by sanity.config.ts (Studio) and any client-side Sanity code.
// astro.config.mjs reads the same PUBLIC_SANITY_* vars separately via process.env,
// since it runs outside Vite's import.meta.env context.

export const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION ?? '2026-08-07';
