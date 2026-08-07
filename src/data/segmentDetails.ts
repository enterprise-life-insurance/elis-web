// Detail-page-only content for each Who We Help segment: intro copy, risk list, and
// FAQ. Tone per brand/brand-voice-messaging.md ("Segment tone"). FAQ content is
// general insurance education, not ELIS-specific pricing/policy claims — kept that
// way deliberately since we don't have confirmed specifics to attribute.
import type { FAQItem } from '../components/ui/FAQ.astro';

export interface SegmentDetail {
	slug: string;
	intro: string;
	risks: string[];
	faq: FAQItem[];
}

export const segmentDetails: SegmentDetail[] = [
	{
		slug: 'business-owners',
		intro:
			"A business owner and a tradesperson need different coverage than an employee does — your income, your debt, and your business are tied together in ways a standard policy doesn't account for.",
		risks: [
			'Business loans and lines of credit tied to a personal guarantee',
			"Key person risk — what happens to the business if you're the one who gets hurt or sick",
			'Passing the business to a partner or family member without a clear plan',
			'Attracting and retaining employees without a competitive benefits package',
		],
		faq: [
			{
				question: 'What happens to my business loan if something happens to me?',
				answer:
					"Many business loans and lines of credit are personally guaranteed. Life or disability insurance can be structured to cover that balance, so a health event doesn't become a debt your family or business partners inherit.",
			},
			{
				question: "What's key person insurance, and do I need it?",
				answer:
					'If your business depends heavily on you or another owner, key person insurance replaces some of the income or provides capital the business needs to keep operating while it adjusts.',
			},
			{
				question: 'Can I offer group benefits without it being complicated to manage?',
				answer:
					'Yes — group benefits plans can be structured to fit a business of almost any size, and we handle the setup and ongoing administration.',
			},
			{
				question: 'I already have insurance through my trade association — do I need anything else?',
				answer: 'Association plans are a starting point, not usually a complete plan. We can review what you have and show you the gaps.',
			},
		],
	},
	{
		slug: 'medical-professionals',
		intro:
			"Between long hours and high liability, your coverage needs to work as hard as you do — and account for how specialized your income actually is.",
		risks: [
			'Disability coverage that reflects your specific specialty, not a generic occupation category',
			'Outstanding student debt that would remain even if your income stopped',
			"Overhead expenses for practice owners if you're unable to work",
			'Group benefits for practice staff',
		],
		faq: [
			{
				question: 'What is own-occupation disability coverage, and why does it matter for me?',
				answer:
					"Own-occupation coverage pays out if you can't perform the specific duties of your specialty — even if you could technically work in a different medical role. Standard disability policies often don't offer this distinction.",
			},
			{
				question: 'I still have student debt. Does that affect my coverage needs?',
				answer: 'It should factor into how much coverage you carry. We build your plan around your actual financial picture, including debt.',
			},
			{
				question: "I own my practice — what's overhead expense insurance?",
				answer:
					"It covers your practice's fixed costs — rent, staff wages, utilities — if you're unable to work due to illness or injury, so the business can keep running while you recover.",
			},
			{
				question: 'How is this different from what my hospital or group offers?',
				answer: "Employer or group coverage is often not portable and may not follow you if you change roles or specialties. We look at what you have and fill in the gaps.",
			},
		],
	},
	{
		slug: 'engineers',
		intro:
			'Income protection and estate planning, modeled with the same precision you bring to your own work — not a flat percentage rule of thumb.',
		risks: [
			'Income replacement modeled against your actual earning trajectory, not a generic multiple',
			"Disability coverage that doesn't lose value to inflation over a long career",
			'Estate planning for RRSPs, pensions, and equity compensation',
			'Coordinating group benefits with individual coverage to avoid gaps or overlap',
		],
		faq: [
			{
				question: 'How is my coverage amount actually calculated?',
				answer: "We model it against your income, debt, and future earning trajectory — not a flat multiple. You'll see the numbers, not just a recommendation.",
			},
			{
				question: 'Does my coverage keep pace with inflation?',
				answer:
					"It can — disability coverage can be structured with a cost-of-living adjustment rider so your benefit doesn't lose value over time.",
			},
			{
				question: 'I have group coverage through my employer. Do I need my own policy too?',
				answer: "Often, yes. Group coverage is usually capped and not portable if you change jobs. We'll show you exactly where the gaps are.",
			},
			{
				question: 'What happens to my RRSPs and pension if I die before retirement?',
				answer: 'It depends on your beneficiary designations and estate structure. We review this as part of your plan so nothing gets left to default rules.',
			},
		],
	},
	{
		slug: 'families-individuals',
		intro: 'Coverage that protects the people who depend on you — clear, and built around your life, not a generic checklist.',
		risks: [
			'Income replacement so your family can stay in their home and routine',
			"Coverage for a stay-at-home parent, whose contribution isn't a paycheque but still has real cost",
			'Mortgage protection',
			'Guardianship and estate planning for minor children',
		],
		faq: [
			{
				question: 'How much life insurance do we actually need?',
				answer:
					"It depends on your mortgage, debts, income, and how many years of support your family would need. We'll walk through the numbers with you, not just sell you a policy.",
			},
			{
				question: "My spouse doesn't work outside the home — do we still need to insure them?",
				answer: "Yes. Replacing childcare, household management, and everything a stay-at-home parent does has a real cost. It's easy to overlook.",
			},
			{
				question: 'We just had a baby. What should we be thinking about?',
				answer: 'Life insurance, updating beneficiaries, and naming a guardian in your will are the three most common gaps we see with new parents.',
			},
			{
				question: 'Is mortgage protection the same as life insurance?',
				answer:
					"Not exactly. Mortgage protection through a lender is usually tied to that one loan and isn't portable. A personal life insurance policy is more flexible and stays with you.",
			},
		],
	},
];
