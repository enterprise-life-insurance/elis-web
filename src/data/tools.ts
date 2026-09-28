// Calculators delivered by the client 2026-09-28 (brand/content-revision/calculators/).
// Shared by the /tools index, each calculator page, and the calculator links on
// Who We Help / Services pages.
export interface Tool {
	slug: 'life-insurance-needs' | 'buy-sell' | 'estate-tax';
	audience: string;
	title: string;
	description: string;
}

export const tools: Tool[] = [
	{
		slug: 'life-insurance-needs',
		audience: 'Families & Individuals',
		title: 'Life insurance needs',
		description: "Add up what your family would need to pay for, subtract what's already in place, and see the gap.",
	},
	{
		slug: 'buy-sell',
		audience: 'Business Owners',
		title: 'Buy-sell funding',
		description: 'Size the coverage each owner needs so partners can buy out a share of the business without draining it.',
	},
	{
		slug: 'estate-tax',
		audience: 'Estate Planning',
		title: 'Estate tax at death',
		description: 'Estimate the capital gains tax, RRSP tax and Ontario probate your estate could owe — and what reaches your heirs.',
	},
];
