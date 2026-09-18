// ⚠️ Glenn Merkley is not licensed for life insurance sales/servicing (confirmed by
// Jay Bablani, 2026-08-04 — see CLAUDE.md / ia/website-ia-sitemap.md). His bio below
// stays scoped to commercial insurance. Bios/titles/credentials below are the
// client-approved profile copy from brand/content-revision/ (delivered 2026-09-17).
export interface Advisor {
	slug: string;
	name: string;
	role?: string;
	homeRole?: string;
	image: string;
	shortBio: string;
	bio: string[];
	tags: string[];
	areasOfFocus: { title: string; description: string }[];
}

export const advisors: Advisor[] = [
	{
		slug: 'jay-bablani',
		name: 'Jay Bablani',
		role: 'President',
		image: '/brand/team/jay-bablani.jpg',
		shortBio: 'Advisor since 1994',
		bio: [
			"Jay Bablani has been advising clients on insurance and financial protection since 1994. Over three decades in the industry, his practice has grown to encompass life insurance, disability insurance, and financial and estate planning — giving clients a single, experienced point of contact across every stage of their financial life.",
			"As President of Enterprise Life Insurance and Investment Solutions, Jay brings that depth of hands-on advisory experience to the firm's leadership and to every client relationship it serves. His approach is grounded in the belief that good advice comes from understanding a client's full picture, not just the policy in front of them.",
		],
		tags: ['Advisor Since 1994', 'Life & Disability Insurance', 'Estate Planning'],
		areasOfFocus: [
			{
				title: 'Life Insurance',
				description: "Income replacement and legacy protection strategies built around each client's family and financial goals.",
			},
			{
				title: 'Disability Insurance',
				description: 'Income protection planning for clients whose livelihood depends on their ability to work.',
			},
			{
				title: 'Financial & Estate Planning',
				description: "Three decades of experience structuring plans for what clients are building — and what happens to it.",
			},
		],
	},
	{
		slug: 'glenn-merkley',
		name: 'Glenn Merkley',
		role: 'Director',
		image: '/brand/team/glenn-merkley.png',
		shortBio: '30+ years in commercial insurance for business owners, professionals, and HNW clients',
		bio: [
			'Glenn Merkley brings more than 30 years of insurance industry experience to his role as Director of Enterprise Life. His background is rooted in commercial insurance, with particular depth advising business owners, professionals, and high-net-worth clients on complex coverage and planning needs.',
			"Glenn provides the strategic leadership and industry insight that shape the firm's approach to exceptional client service and long-term financial protection. His experience and client-focused philosophy guide the organization's vision and growth, ensuring that as the firm expands, clients remain at the center of every decision it makes.",
		],
		tags: ['30+ Years Experience', 'Commercial Insurance', 'HNW Clients'],
		areasOfFocus: [
			{
				title: 'Commercial Insurance',
				description: 'Three decades of specialized experience structuring coverage for businesses and their owners.',
			},
			{
				title: 'High-Net-Worth Clients',
				description: 'Advising professionals and HNW individuals on coverage and planning suited to complex financial situations.',
			},
			{
				title: 'Strategic Leadership',
				description: "Guiding the firm's growth and direction while keeping client outcomes at the center of every decision.",
			},
		],
	},
	{
		slug: 'ekta-balani',
		name: 'Ekta Balani',
		role: 'Insurance Broker & Financial Planner',
		homeRole: 'Insurance Broker & Financial Planner, CLU',
		image: '/brand/team/ekta-balani.png',
		shortBio: '10+ years advising on life insurance and estate planning',
		bio: [
			'Ekta Balani is a RIBO-certified Insurance Broker and Financial Planner at Enterprise Life, specializing in life insurance for clients and their families. With more than 10 years of experience as an advisor, she brings particular expertise to complex cases, working closely with clients on sophisticated financial and estate planning needs.',
			"Ekta also holds the Chartered Life Underwriter (CLU) designation — a credential conferred exclusively by The Institute for Advanced Financial Education and recognized for a century as one of the highest marks of expertise in Canadian financial services. Earning the CLU requires advanced training in tax and estate law, wealth transfer, and estate planning strategy for both individuals and business owners, and it is an approved designation for use of the title Financial Planner in Ontario. That depth of training allows Ekta to guide clients through the more complex sides of financial protection — from tax-efficient estate structures to planning for the transfer of a business or significant assets — with the same rigor a specialist estate lawyer or accountant would bring to the table.",
		],
		tags: ['RIBO Certified', 'CLU Designation', '10+ Years Advising'],
		areasOfFocus: [
			{
				title: 'RIBO Certified',
				description: 'Licensed by the Registered Insurance Brokers of Ontario, the regulatory body overseeing insurance brokers in the province.',
			},
			{
				title: 'Chartered Life Underwriter (CLU)',
				description: 'An advanced designation in insurance, tax, and estate planning strategy, and an approved credential for the title Financial Planner in Ontario.',
			},
			{
				title: 'Complex Case Experience',
				description: 'Over a decade advising on sophisticated financial and estate planning scenarios, including business and high-net-worth cases.',
			},
		],
	},
];
