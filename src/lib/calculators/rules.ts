// Tax figures for the /tools calculators. The client's delivery (brand/content-revision/calculators/)
// referenced this file but didn't include it — these values were reconstructed from published
// CRA / Ontario rules and still need accountant sign-off before being relied on.
export const RULES = {
	asOfYear: 2026,
	capitalGainsInclusionRate: 0.5,
	// Combined federal + Ontario top marginal rate.
	ontarioTopMarginalRate: 53.53,
	// Ontario Estate Administration Tax: nothing on the first $50,000, then $15 per $1,000 (or part).
	probateExemptAmount: 50_000,
	probatePerThousand: 15,
} as const;

export const CONTACT_PATH = '/contact';

export interface Line {
	key: string;
	label: string;
	value: number;
	tone?: string;
}

const currency = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

export const money = (n: number) => currency.format(Math.round(n));

// Coverage is quoted in round amounts; round up so the estimate never falls short.
// Whole dollars first, so float drift (3,000,000 × 1.1 = 3,300,000.0000000005) doesn't bump a step.
export const roundUp = (n: number, step = 25_000) => (n <= 0 ? 0 : Math.ceil(Math.round(n) / step) * step);
