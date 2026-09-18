// Eight confirmed segments per Jay Bablani, client call 2026-08-28 (expanded from
// the original four in ia/website-ia-sitemap.md). Tone per
// brand/brand-voice-messaging.md ("Segment tone"). Shared across the Home teaser
// and the Who We Help index/detail pages. Client-approved page content landed
// 2026-09-17 (brand/content-revision/) for Professional, Farmers, and IT
// Professionals — see src/data/segmentDetails.ts. Mortgage Brokers still has no
// confirmed page content, so its detail page stays a "coming soon" state.
export interface Segment {
	slug: string;
	title: string;
	description: string;
}

export const segments: Segment[] = [
	{
		slug: 'business-owners',
		title: 'Business Owners & Contractors',
		description: 'Your business carries exposures that off-the-shelf policies overlook. We structure coverage around how your business actually generates revenue.',
	},
	{
		slug: 'professionals',
		title: 'Professional',
		description: 'Your earning potential is your greatest asset. We build income protection calibrated to your practice and career.',
	},
	{
		slug: 'medical-professionals',
		title: 'Health Care',
		description: "You've spent years — and significant liability exposure — building your career. Your coverage should reflect the demands of your profession.",
	},
	{
		slug: 'engineers',
		title: 'Architect and Engineers',
		description: 'Precision matters in your work — it matters in your coverage, too. We model income protection with the same rigor.',
	},
	{
		slug: 'families-individuals',
		title: 'Families & Individuals',
		description: "The people who count on you deserve a plan that's easy to understand and built around your family's real needs.",
	},
	{
		slug: 'mortgage-brokers',
		title: 'Mortgage Brokers',
		description: "Commission-based income requires a different approach to protection, reflecting how you're actually compensated.",
	},
	{
		slug: 'farmers',
		title: 'Farmers',
		description: 'Your operation is a business, an asset, and often a legacy. We protect your land, equipment, and the transition ahead.',
	},
	{
		slug: 'it-professionals',
		title: 'IT Professionals',
		description: 'Contract work, equity compensation, and rapid career growth call for coverage that adapts as quickly as your industry does.',
	},
];
