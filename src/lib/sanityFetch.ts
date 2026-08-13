import { sanityClient } from 'sanity:client';

// No real Sanity project exists yet (see .env.example / CLAUDE.md), so queries
// against the placeholder projectId/dataset fail at build time. Every other page
// in this repo sidesteps that by not querying Sanity at all; Resources is the
// first page that actually needs to, so it fails soft instead — returns
// `fallback` and logs a warning rather than breaking `astro build`. Once a real
// project/dataset is configured this resolves automatically, no code change needed.
export async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
	try {
		return await sanityClient.fetch<T>(query, params);
	} catch (error) {
		console.warn(`[sanity] query failed, using fallback (${(error as Error).message})`);
		return fallback;
	}
}
