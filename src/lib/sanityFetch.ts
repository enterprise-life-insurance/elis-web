import { sanityClient } from 'sanity:client';

// If Sanity is unreachable at build time (misconfigured project, network failure),
// return `fallback` and log a warning rather than breaking `astro build`.
export async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
	try {
		return await sanityClient.fetch<T>(query, params);
	} catch (error) {
		console.warn(`[sanity] query failed, using fallback (${(error as Error).message})`);
		return fallback;
	}
}

// Same as safeFetch, but also falls back when Sanity returns an empty list —
// used for content (Services, Segments, Advisors) that should never legitimately
// render empty, unlike Resources/Testimonials where an empty result is a real
// "nothing published yet" state. Falls back to the matching src/data/*.ts array
// until the corresponding Sanity documents are seeded (see scripts/seed-sanity.ts).
//
// `isValid` additionally rejects the whole list (falling back wholesale) if any
// item doesn't match the current schema shape — guards against a live dataset
// that's non-empty but was seeded under an older schema (e.g. missing a field
// added later), where trusting a partial/incomplete list would silently drop
// content instead of showing an error.
export async function safeFetchList<T>(
	query: string,
	params: Record<string, unknown>,
	fallback: T[],
	isValid?: (item: T) => boolean,
): Promise<T[]> {
	const result = await safeFetch<T[]>(query, params, fallback);
	if (result.length === 0) return fallback;
	if (isValid && !result.every(isValid)) return fallback;
	return result;
}

// Same idea for a single document — falls back when Sanity returns null/undefined
// (document not found, or not yet seeded), not just on a hard query error.
export async function safeFetchOne<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
	const result = await safeFetch<T | null | undefined>(query, params, null);
	return result ?? fallback;
}
