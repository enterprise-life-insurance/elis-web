// Six confirmed services per ia/website-ia-sitemap.md, expanded per Jay Bablani,
// client call 2026-08-28 (added Investments; Disability Insurance renamed to
// Disability & Critical Illness Insurance). Shared across the Home teaser and the
// Services index/detail pages. Client-approved page content for Investments
// landed 2026-09-17 (brand/content-revision/) — see src/data/serviceDetails.ts.
// 2026-10-19: Personal Health & Dental added and the Travel tagline rewritten, per
// the client's "Website notes.docx".
export interface Service {
	slug: string;
	title: string;
	description: string;
}

export const services: Service[] = [
	{
		slug: 'life-insurance',
		title: 'Life Insurance',
		description: "Protects your family's financial future through income replacement, debt coverage, and a lasting legacy.",
	},
	{
		slug: 'disability-insurance',
		title: 'Disability & Critical Illness Insurance',
		description: 'Replaces your income if illness or injury keeps you from working, and pays a lump sum on a covered diagnosis.',
	},
	{
		slug: 'investments',
		title: 'Investments',
		description: 'Strategies across RRSPs, TFSAs, and RESPs — coordinated with your full financial and insurance plan.',
	},
	{
		slug: 'group-benefits',
		title: 'Group Benefits',
		description: 'Competitive health, dental, and wellness coverage that helps you attract and retain your team.',
	},
	{
		slug: 'health-dental',
		title: 'Personal Health & Dental',
		description: "Individual health and dental plans for the self-employed, retirees, and anyone without a group plan to rely on.",
	},
	{
		slug: 'financial-estate-planning',
		title: 'Financial & Estate Planning',
		description: "A clear, actionable plan for what you're building today — and how it transfers to the people you care about.",
	},
	{
		slug: 'travel-insurance',
		title: 'Travel Insurance',
		description: "Emergency medical coverage for visitors to Canada, Super Visa applicants, and frequent travellers — with annual plans so you're not re-arranging coverage before every trip.",
	},
];
