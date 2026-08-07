// Four confirmed segments per ia/website-ia-sitemap.md. Tone per
// brand/brand-voice-messaging.md ("Segment tone"). Shared across the Home teaser
// and the Who We Help index/detail pages once those are built.
export interface Segment {
	slug: string;
	title: string;
	description: string;
}

export const segments: Segment[] = [
	{
		slug: 'business-owners',
		title: 'Business Owners & Trades',
		description: "Your business carries risks a standard policy won't cover. We build coverage around how you actually operate.",
	},
	{
		slug: 'medical-professionals',
		title: 'Medical Professionals',
		description: 'Long hours, high liability, and a career you spent years building — your coverage should work as hard as you do.',
	},
	{
		slug: 'engineers',
		title: 'Engineers',
		description: 'Income protection and estate planning, modeled with the same precision you bring to your own work.',
	},
	{
		slug: 'families-individuals',
		title: 'Families & Individuals',
		description: 'Coverage that protects the people who depend on you — clear, and built around your life.',
	},
];
