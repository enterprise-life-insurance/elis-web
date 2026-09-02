// Six confirmed services per ia/website-ia-sitemap.md, expanded per Jay Bablani,
// client call 2026-08-28 (added Investments; Disability Insurance renamed to
// Disability & Critical Illness Insurance). Shared across the Home teaser and the
// Services index/detail pages. Investments has no confirmed page content yet —
// see brand/scratch-content-questionnaire.md — so its detail page renders an
// honest "coming soon" state rather than fabricated specifics.
export interface Service {
	slug: string;
	title: string;
	description: string;
}

export const services: Service[] = [
	{
		slug: 'life-insurance',
		title: 'Life Insurance',
		description: 'Income replacement and legacy protection for the people who depend on you.',
	},
	{
		slug: 'disability-insurance',
		title: 'Disability & Critical Illness Insurance',
		description: "Protects your income if you're unable to work, and provides a lump sum if you're diagnosed with a serious illness.",
	},
	{
		slug: 'investments',
		title: 'Investments',
		description: 'Investment planning coordinated with the rest of your coverage, not managed in isolation.',
	},
	{
		slug: 'group-benefits',
		title: 'Group Benefits',
		description: 'Health, dental, and wellness coverage that helps you retain the people who built your business.',
	},
	{
		slug: 'financial-estate-planning',
		title: 'Financial & Estate Planning',
		description: "A clear plan for what you're building — and what happens to it.",
	},
	{
		slug: 'travel-insurance',
		title: 'Travel Insurance',
		description: 'Medical coverage for when you’re away from home, sized to how you actually travel.',
	},
];
