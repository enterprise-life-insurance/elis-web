// Eight confirmed segments per Jay Bablani, client call 2026-08-28 (expanded from
// the original four in ia/website-ia-sitemap.md). Tone per
// brand/brand-voice-messaging.md ("Segment tone"). Shared across the Home teaser
// and the Who We Help index/detail pages. The four new segments (Professional,
// Mortgage Brokers, Farmers, IT Professionals) don't have confirmed page content
// yet — see brand/scratch-content-questionnaire.md — so their detail pages render
// an honest "coming soon" state rather than fabricated specifics.
export interface Segment {
	slug: string;
	title: string;
	description: string;
}

export const segments: Segment[] = [
	{
		slug: 'business-owners',
		title: 'Business Owners & Contractors',
		description: "Your business carries risks a standard policy won't cover. We build coverage around how you actually operate.",
	},
	{
		slug: 'professionals',
		title: 'Professional',
		description: 'Coverage built around your income, your practice, and the specifics of how you work.',
	},
	{
		slug: 'medical-professionals',
		title: 'Health Care',
		description: 'Long hours, high liability, and a career you spent years building — your coverage should work as hard as you do.',
	},
	{
		slug: 'engineers',
		title: 'Architect and Engineers',
		description: 'Income protection and estate planning, modeled with the same precision you bring to your own work.',
	},
	{
		slug: 'families-individuals',
		title: 'Families & Individuals',
		description: 'Coverage that protects the people who depend on you — clear, and built around your life.',
	},
	{
		slug: 'mortgage-brokers',
		title: 'Mortgage Brokers',
		description: 'Coverage that reflects commission-based income and the way mortgage brokers actually get paid.',
	},
	{
		slug: 'farmers',
		title: 'Farmers',
		description: 'Coverage built around land, equipment, and a business that often passes through the family.',
	},
	{
		slug: 'it-professionals',
		title: 'IT Professionals',
		description: 'Coverage that keeps pace with contract work, equity compensation, and a fast-moving career.',
	},
];
