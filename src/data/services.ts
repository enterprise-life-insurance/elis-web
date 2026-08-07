// Five confirmed services per ia/website-ia-sitemap.md. Shared across the Home
// teaser and the Services index/detail pages once those are built.
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
		title: 'Disability Insurance',
		description: "Protects your income if you're unable to work — the coverage most people underestimate.",
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
