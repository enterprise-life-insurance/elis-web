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
				question: 'Why does my specialty matter for disability coverage?',
				answer:
					'Generic occupation categories can undervalue specialized training. Coverage should reflect what it would actually cost to replace your specific skill set and income, not a broad average.',
			},
			{
				question: 'I still have student debt — how does that factor in?',
				answer: "Outstanding debt doesn't disappear if you're unable to work. Coverage can be structured to specifically cover those payments so they don't become a burden on your family.",
			},
			{
				question: "I own my practice — what happens to overhead if I can't work?",
				answer:
					"Overhead expense insurance covers fixed costs like rent, staff wages, and equipment leases while you're unable to work, so the practice can stay open until you're back.",
			},
			{
				question: 'Can I set up group benefits for my staff?',
				answer: 'Yes — group benefits plans can be structured for practices of any size, including clinics with just a few employees.',
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
				question: "Why can't I just use a standard disability policy?",
				answer:
					'Standard policies are often built around a flat percentage of salary. Ours are modeled against your actual earning trajectory and the specialized nature of your training.',
			},
			{
				question: 'How does inflation protection work on disability coverage?',
				answer:
					"A cost-of-living rider increases your benefit over time if you're on claim for an extended period, so a payout doesn't lose purchasing power over a long career.",
			},
			{
				question: 'How do RRSPs and pensions factor into my estate plan?',
				answer:
					"They're often among the largest assets in a professional's estate and carry specific tax implications on death. We plan around how they transfer, not just what they're worth today.",
			},
			{
				question: 'I have group benefits through my employer — do I still need my own coverage?',
				answer: "Group coverage is often capped and doesn't follow you if you change jobs. Individual coverage fills the gap and stays with you.",
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
	{
		slug: 'professionals',
		intro:
			"Lawyers, accountants, and other professionals carry income and liability considerations a standard policy doesn't always address.",
		risks: [
			'Income protection sized to a highly specialized, hard-to-replace skill set',
			'Overhead expense coverage for professionals who own or share a practice',
			'Buy-sell and partnership agreements properly funded for a firm or partnership',
			'Retirement and tax-efficient investment planning alongside a demanding career',
		],
		faq: [
			{
				question: 'I already have liability insurance through my professional association — do I need anything else?',
				answer:
					"Professional liability (errors & omissions) insurance protects you against claims arising from your work. It doesn't replace your personal income or fund a partnership buyout if something happens to you.",
			},
			{
				question: "What's a buy-sell agreement, and why would I need one?",
				answer:
					"It's an agreement, funded by insurance, that lets remaining partners buy out a partner's share of the practice if they die, become disabled, or leave — avoiding a forced sale or a drawn-out valuation dispute.",
			},
			{
				question: 'How is coverage different for a partner versus a sole practitioner?',
				answer:
					"Partners often need buy-sell funding and shared overhead coverage. Sole practitioners typically prioritize personal income replacement and overhead expense coverage, since there's no partner to absorb a gap.",
			},
			{
				question: 'Can you work alongside my accountant or lawyer?',
				answer: "Yes. We regularly coordinate with a client's existing legal and accounting team rather than duplicating or replacing that advice.",
			},
		],
	},
	{
		slug: 'farmers',
		intro:
			'Between land, equipment, and passing the operation to the next generation, farm coverage looks different from a standard personal policy.',
		risks: [
			'Coverage for land, equipment, and buildings tied to the operation',
			'Key person protection if an owner or essential worker is unable to work',
			'Succession planning for passing the farm to the next generation',
			'Coordinating personal and business coverage so nothing is duplicated or missed',
		],
		faq: [
			{
				question: 'How is farm succession planning different from a regular estate plan?',
				answer:
					'It often means keeping the operation intact for one heir while treating other heirs fairly — usually funded through life insurance rather than forcing a sale of land or equipment.',
			},
			{
				question: "Do I need separate coverage for the farm business and my family?",
				answer:
					"Often both, coordinated together. The farm's key person and succession needs are distinct from your personal family protection, but they should be planned as one picture.",
			},
			{
				question: 'What happens to the farm if something happens to me before a succession plan is in place?',
				answer:
					'Without a plan, the farm may need to be sold or divided to cover debts or settle the estate among heirs. Insurance-funded succession planning is designed to prevent that outcome.',
			},
			{
				question: "Can you work with our farm's accountant or lawyer?",
				answer: 'Yes — succession and estate plans for farms usually involve coordinating with your existing accountant and lawyer, not replacing them.',
			},
		],
	},
	{
		slug: 'it-professionals',
		intro: 'Contract work, equity compensation, and a fast-moving career call for coverage that keeps up.',
		risks: [
			'Income protection that reflects contract and consulting income, not just T4 salary',
			'Coverage that adapts as you move between employment, contract work, and incorporation',
			'Planning for equity compensation like stock options and RSUs',
			'Group benefits options for founders and small tech teams',
		],
		faq: [
			{
				question: 'I work on contract — can I still get disability or life insurance?',
				answer:
					'Yes. Coverage can be structured around your actual income pattern, including contract and consulting income, rather than requiring a traditional salaried role.',
			},
			{
				question: 'How does stock compensation factor into my planning?',
				answer:
					"Equity compensation like RSUs and options is factored into your overall financial and estate plan, including how it's taxed and how it fits into your net worth.",
			},
			{
				question: 'I just incorporated — does that change my insurance needs?',
				answer:
					"It can. Incorporation opens up options like corporate-owned life insurance and changes how you'd fund a buy-sell agreement if you have partners.",
			},
			{
				question: 'Can I get group benefits for a small team?',
				answer: 'Yes — group plans can be structured for very small teams, including early-stage startups.',
			},
		],
	},
];
