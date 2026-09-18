// Shared GROQ queries + result shapes for content that's now Sanity-backed
// (Segments, Services, Advisors), used together with safeFetchList/safeFetchOne
// (src/lib/sanityFetch.ts) so every page falls back to the matching src/data/*.ts
// file if the query fails or the document/list isn't there yet.

export interface FAQEntry {
	question: string;
	answer: string;
}

// --- Segments (Who We Help) ---

export interface SegmentCardData {
	slug: string;
	title: string;
	description: string;
}

export interface SegmentPageData {
	title: string;
	description: string;
	intro: string;
	risks: string[];
	faq: FAQEntry[];
}

export const segmentListQuery = `*[_type == "segment"] | order(order asc) { "slug": slug.current, title, description }`;

// `description` was added to the schema after the first Sanity seed — a document
// seeded under the old schema comes back with description undefined, which is how
// stale/incomplete list results are told apart from real ones (see safeFetchList).
export function isValidSegmentCardData(item: SegmentCardData): boolean {
	return typeof item.description === 'string' && item.description.length > 0;
}

export const segmentDetailQuery = `*[_type == "segment" && slug.current == $slug][0]{ title, description, intro, risks, faq }`;

// Guards against documents seeded under an older/mismatched schema (e.g. `intro`
// as portable-text blocks instead of a plain string, or a missing `risks` array) —
// safeFetchOne only catches a missing/null document, not a wrong-shaped one, so
// callers must validate the shape themselves before trusting a live result over
// the static fallback.
export function isValidSegmentPageData(data: unknown): data is SegmentPageData {
	const d = data as Partial<SegmentPageData> | null;
	return !!d && typeof d.intro === 'string' && Array.isArray(d.risks) && Array.isArray(d.faq);
}

// --- Services ---

export interface ServiceCardData {
	slug: string;
	title: string;
	description: string;
}

export interface ServicePageData {
	title: string;
	description: string;
	intro: string;
	coverageOverview: string[];
	faq: FAQEntry[];
}

export const serviceListQuery = `*[_type == "service"] | order(order asc) { "slug": slug.current, title, description }`;

// Old schema had this field named `summary`, not `description` — undefined here
// means a stale/pre-rename document (see isValidSegmentCardData above).
export function isValidServiceCardData(item: ServiceCardData): boolean {
	return typeof item.description === 'string' && item.description.length > 0;
}

export const serviceDetailQuery = `*[_type == "service" && slug.current == $slug][0]{ title, description, intro, coverageOverview, faq }`;

export function isValidServicePageData(data: unknown): data is ServicePageData {
	const d = data as Partial<ServicePageData> | null;
	return !!d && typeof d.intro === 'string' && Array.isArray(d.coverageOverview) && Array.isArray(d.faq);
}

// --- Advisors ---
// Headshots stay served from src/data/advisors.ts's local /brand/team/*.jpg paths
// rather than Sanity image assets — keeps photo management out of Studio for now
// (no upload workflow needed) while copy (bio/role/tags/areas of focus) is fully
// Sanity-backed. Revisit if the client wants to swap headshots from Studio too.

export interface AdvisorCardData {
	slug: string;
	name: string;
	role?: string;
	shortBio: string;
}

export interface AdvisorPageData {
	name: string;
	role?: string;
	shortBio: string;
	bio: string[];
	tags: string[];
	areasOfFocus: { title: string; description: string }[];
}

export const advisorListQuery = `*[_type == "advisor"] | order(order asc) { "slug": slug.current, name, role, shortBio }`;

// `shortBio` was added to the schema after the first Sanity seed — undefined here
// means a stale document (see isValidSegmentCardData above).
export function isValidAdvisorCardData(item: AdvisorCardData): boolean {
	return typeof item.shortBio === 'string' && item.shortBio.length > 0;
}

export const advisorDetailQuery = `*[_type == "advisor" && slug.current == $slug][0]{ name, role, shortBio, bio, tags, areasOfFocus }`;

export function isValidAdvisorPageData(data: unknown): data is AdvisorPageData {
	const d = data as Partial<AdvisorPageData> | null;
	return !!d && Array.isArray(d.bio) && Array.isArray(d.tags) && Array.isArray(d.areasOfFocus);
}
