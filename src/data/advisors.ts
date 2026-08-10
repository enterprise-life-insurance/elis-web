// ⚠️ Glenn Merkley is not licensed for life insurance sales/servicing (confirmed by
// Jay Bablani, 2026-08-04 — see CLAUDE.md / ia/website-ia-sitemap.md). His bio below
// is the client-confirmed text, verbatim, and stays scoped to commercial insurance.
export interface Advisor {
	slug: string;
	name: string;
	role?: string;
	image: string;
	shortBio: string;
	bio: string[];
}

export const advisors: Advisor[] = [
	{
		slug: 'jay-bablani',
		name: 'Jay Bablani',
		role: 'Advisor',
		image: '/brand/team/jay-bablani.jpg',
		shortBio: 'Advisor since 1994.',
		bio: [
			"Jay Bablani has been writing insurance policies since 1994. His work today spans life insurance, disability insurance, and financial and estate planning — bringing three decades of hands-on advisor experience into Enterprise Life Insurance and Investment Solutions.",
		],
	},
	{
		slug: 'glenn-merkley',
		name: 'Glenn Merkley',
		role: 'Director',
		image: '/brand/team/glenn-merkley.png',
		shortBio: '30+ years in commercial insurance for business owners, professionals, and HNW clients.',
		bio: [
			'Glenn Merkley brings more than 30 years of insurance industry experience to his role as Director. With a background specializing in commercial insurance and serving business owners, professionals, and high-net-worth clients, Glenn provides strategic leadership and industry insight that support the company\'s commitment to exceptional client service and long-term financial protection.',
			"His extensive experience and client-focused approach help guide the organization's vision and growth while ensuring clients remain at the center of everything the company does.",
		],
	},
	{
		slug: 'ekta-balani',
		name: 'Ekta Balani',
		role: 'Insurance Broker & Financial Planner',
		image: '/brand/team/ekta-balani.png',
		shortBio: 'RIBO-certified Insurance Broker and Financial Planner specializing in life insurance.',
		bio: ["Ekta Balani is a RIBO-certified Insurance Broker and Financial Planner at Enterprise Life, specializing in life insurance for clients and their families."],
	},
];
