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
				question: "What's the difference between term and permanent life insurance?",
				answer:
					'Term life covers you for a set period — usually 10, 20, or 30 years — and is generally more affordable. Permanent life insurance covers you for life and can build cash value over time. Which one makes sense depends on what you\'re protecting against and for how long.',
			},
			{
				question: 'How much life insurance do I actually need?',
				answer:
					"It depends on your income, debts, mortgage, and how many years of support your dependents would need. We calculate this with you rather than defaulting to a flat multiple of your salary.",
			},
			{
				question: 'Can I have more than one life insurance policy?',
				answer: "Yes. It's common to combine a term policy for a specific need, like a mortgage, with a smaller permanent policy for lifelong coverage.",
			},
			{
				question: 'What happens if I outlive my term policy?',
				answer:
					'Most term policies can be renewed or converted to permanent coverage, usually at a higher premium reflecting your age. We review this with you before your term ends.',
			},
		],
	},
	{
		slug: 'disability-insurance',
		intro: "Protects your income if you're unable to work — the coverage most people underestimate.",
		coverageOverview: [
			"Income replacement if illness or injury keeps you from working",
			'Short-term and long-term disability options',
			'Own-occupation vs. any-occupation definitions, and why they matter',
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
		intro: 'Medical coverage for when you’re away from home, sized to how you actually travel.',
		coverageOverview: [
			'Emergency medical coverage for trips outside your home province or country',
			'Single-trip and annual multi-trip options',
			'Coverage for pre-existing conditions, where eligible',
			'Trip cancellation and interruption options',
		],
		faq: [
			{
				question: "Doesn't my provincial health plan cover me when I travel?",
				answer:
					'Only partially, and usually at a much lower rate than what care actually costs outside your home province or country. Travel insurance covers the gap.',
			},
			{
				question: 'I travel often — is there a better option than buying a policy every trip?',
				answer:
					'Yes, an annual multi-trip plan can cover unlimited trips up to a set length each, which is often more convenient and cost-effective for frequent travelers.',
			},
			{
				question: 'Can I get coverage if I have a pre-existing medical condition?',
				answer: "Often yes, depending on how stable the condition has been before your trip. We'll walk through what's eligible.",
			},
			{
				question: "What's the difference between trip cancellation and emergency medical coverage?",
				answer:
					'Emergency medical covers health costs while you\'re away. Trip cancellation/interruption reimburses non-refundable costs if you have to cancel or cut a trip short for a covered reason.',
			},
		],
	},
];
