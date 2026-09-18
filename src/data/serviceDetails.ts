// Detail-page-only content for each service: intro copy, coverage overview points,
// and FAQ. FAQ content is general insurance education, not ELIS-specific pricing or
// policy claims — kept that way deliberately since we don't have confirmed
// specifics to attribute.
import type { FAQItem } from '../components/ui/FAQ.astro';

export interface ServiceDetail {
	slug: string;
	intro: string;
	coverageOverview: string[];
	faq: FAQItem[];
}

export const serviceDetails: ServiceDetail[] = [
	{
		slug: 'life-insurance',
		intro: 'Income replacement and legacy protection for the people who depend on you.',
		coverageOverview: [
			'Term life insurance for a fixed period, sized to a mortgage, debt, or income-replacement need',
			'Permanent life insurance for lifelong coverage and cash value growth',
			'Beneficiary and estate planning coordination',
			'Coverage that can adjust as your life changes — a new mortgage, a new child, a new business',
		],
		faq: [
			{
				question: 'How much life insurance do I actually need?',
				answer:
					'It depends on income replacement needs, debt, and how many years of support your dependents would need. We calculate this with you rather than applying a flat multiple of income.',
			},
			{
				question: "What's the difference between term and permanent life insurance?",
				answer:
					'Term covers a set period at a lower cost, ideal for time-bound needs like a mortgage. Permanent lasts your lifetime and can build cash value, often used for estate planning or legacy goals.',
			},
			{
				question: 'Can I convert term coverage to permanent later?',
				answer:
					'Many term policies include a conversion option, letting you move to permanent coverage later without new medical underwriting. We build this into your plan from the start where it makes sense.',
			},
			{
				question: 'Who should I name as my beneficiary?',
				answer:
					"It depends on your goals — a spouse, children, a trust, or your estate can each make sense depending on your family and tax situation, and it's worth revisiting as life changes.",
			},
		],
	},
	{
		slug: 'disability-insurance',
		intro:
			"Protects your income if you're unable to work, and provides a lump sum if you're diagnosed with a serious illness — two of the most underestimated coverages there are.",
		coverageOverview: [
			"Income replacement if illness or injury keeps you from working",
			'Short-term and long-term disability options',
			'Own-occupation vs. any-occupation definitions, and why they matter',
			'Critical illness coverage that pays a lump sum on a covered diagnosis',
			'Coordination with employer group coverage to close gaps',
		],
		faq: [
			{
				question: "Doesn't my employer's group plan already cover this?",
				answer:
					'Often only partially. Group disability coverage is usually capped and may not follow you if you change jobs. An individual policy fills the gap and stays with you.',
			},
			{
				question: 'What\'s the difference between "own occupation" and "any occupation" coverage?',
				answer:
					"Own-occupation coverage pays out if you can't do your specific job, even if you could do other work. Any-occupation coverage only pays if you can't work in any job reasonably suited to your training — a much higher bar.",
			},
			{
				question: 'How long does disability coverage pay out for?',
				answer: 'It depends on the policy — benefit periods can range from a couple of years to age 65. We help you choose a term that matches your actual risk.',
			},
			{
				question: 'Is disability insurance only for physical jobs?',
				answer: 'No — disability claims are frequently related to conditions like mental health, cancer, and chronic illness, not just workplace injuries.',
			},
			{
				question: 'What does critical illness insurance cover?',
				answer:
					"It pays a lump sum if you're diagnosed with a covered serious illness — like cancer, a heart attack, or a stroke — that you can use however you need, on top of any disability coverage you have.",
			},
		],
	},
	{
		slug: 'group-benefits',
		intro: 'Health, dental, and wellness coverage that helps you retain the people who built your business.',
		coverageOverview: [
			'Health and dental plans for employees and their families',
			'Life and disability coverage as part of a group plan',
			'Plans that scale from a handful of employees to larger teams',
			'Ongoing plan administration and renewal support',
		],
		faq: [
			{
				question: 'How small can a group benefits plan be?',
				answer: "Group plans can be structured for very small teams — even just a few employees. We'll help you find a plan that fits your size and budget.",
			},
			{
				question: 'Can I customize what\'s covered?',
				answer: 'Yes. Coverage levels for health, dental, and other benefits can be tailored to your budget and what matters most to your team.',
			},
			{
				question: 'Who handles renewals and plan changes?',
				answer: 'We do. Ongoing administration and renewal support are part of the service, not a one-time setup.',
			},
			{
				question: 'Can group benefits help with hiring and retention?',
				answer:
					'Yes — a competitive benefits package is often one of the deciding factors for candidates comparing job offers, especially against larger employers.',
			},
		],
	},
	{
		slug: 'financial-estate-planning',
		intro: "A clear plan for what you're building — and what happens to it.",
		coverageOverview: [
			'Coordinating insurance, investments, and estate documents into one plan',
			'Beneficiary reviews and updates as your life changes',
			'Business succession and estate transfer planning',
			'Ongoing reviews as your income, assets, and family situation evolve',
		],
		faq: [
			{
				question: 'Is estate planning just about writing a will?',
				answer:
					'A will is part of it, but estate planning also includes beneficiary designations, powers of attorney, and how your insurance and investments are structured to transfer efficiently.',
			},
			{
				question: 'When should I update my estate plan?',
				answer: 'Any major life change — marriage, a new child, a business sale, or a significant change in assets — is a good trigger to review it.',
			},
			{
				question: 'Do you work with my lawyer or accountant?',
				answer: 'Yes. Estate planning usually involves coordinating with your existing legal and tax professionals rather than replacing them.',
			},
			{
				question: 'What happens to my business if something happens to me?',
				answer: 'That depends on whether you have a succession or buy-sell plan in place. We help business owners put a plan in writing before it\'s needed.',
			},
		],
	},
	{
		slug: 'travel-insurance',
		intro:
			"Emergency medical coverage scaled to how you travel — including visitors to Canada, Super Visa applicants, and frequent flyers — so you're always covered, never re-arranging.",
		coverageOverview: [
			'Emergency medical coverage for trips outside your home province or country',
			"Single-trip and annual multi-trip options, so you're not setting up new coverage before every departure",
			'Visitors to Canada coverage for parents, grandparents, and other visitors during their stay',
			"Super Visa insurance that meets the Government of Canada's minimum coverage requirements",
			'Coverage for pre-existing conditions, where eligible',
			'Trip cancellation and interruption options',
		],
		faq: [
			{
				question: 'What is Super Visa insurance, and do I need it?',
				answer:
					"If you're sponsoring a parent or grandparent's Super Visa application, they're required to have Canadian medical insurance meeting specific minimum coverage and duration requirements. We set up a policy that qualifies.",
			},
			{
				question: "What's the advantage of an annual multi-trip policy?",
				answer:
					"A single annual policy covers every trip you take that year, so you're not setting up new coverage — and risking a gap — before each departure.",
			},
			{
				question: 'Can visitors to Canada get coverage even without a Super Visa?',
				answer:
					'Yes — visitor-to-Canada plans are available for parents, grandparents, and other visitors regardless of visa type, covering emergency medical costs during their stay.',
			},
			{
				question: 'Will pre-existing conditions be covered?',
				answer: "In many cases, yes, depending on how well-controlled the condition is and other eligibility factors. We'll review your situation to find a plan that qualifies.",
			},
		],
	},
	{
		slug: 'investments',
		intro: 'Investment planning coordinated with the rest of your coverage, not managed in isolation.',
		coverageOverview: [
			'RRSPs for tax-deferred, long-term retirement savings',
			'TFSAs for flexible, tax-free growth and withdrawals',
			"RESPs for a child's education, structured to capture government grants",
			'Retirement income planning coordinated with your pension, CPP, and OAS',
		],
		faq: [
			{
				question: 'Should I contribute to an RRSP or a TFSA first?',
				answer:
					"It depends on your income, tax bracket, and how soon you'll need the money. We'll walk through the trade-offs for your specific situation rather than apply a one-size-fits-all rule.",
			},
			{
				question: 'How do RESP government grants work?',
				answer:
					"The Canada Education Savings Grant matches a portion of your RESP contributions, up to annual and lifetime limits. We make sure you're capturing what's available.",
			},
			{
				question: 'Are my investments coordinated with my insurance and estate plan?',
				answer:
					'Yes — that coordination is central to how we work, rather than having investments managed separately from your protection and estate strategy.',
			},
			{
				question: 'What happens to my investment accounts if I ever change advisors?',
				answer: 'Your accounts are yours. If you ever choose to move them, we help make the transition straightforward.',
			},
		],
	},
];
