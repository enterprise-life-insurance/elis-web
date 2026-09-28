import { RULES, roundUp, type Line } from './rules';

const pos = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const sum = (lines: Line[]) => lines.reduce((s, l) => s + l.value, 0);

/* Life insurance needs ---------------------------------------------- */
export interface NeedsInput {
	income: number;
	incomeSharePct: number;
	years: number;
	realReturnPct: number;
	mortgage: number;
	otherDebts: number;
	finalExpenses: number;
	children: number;
	educationPerChild: number;
	otherGoals: number;
	savings: number;
	personalCoverage: number;
	groupCoverage: number;
}

export function calculateNeeds(v: NeedsInput) {
	const annual = pos(v.income) * (pos(v.incomeSharePct) / 100);
	const years = Math.floor(pos(v.years));
	const r = pos(v.realReturnPct) / 100;
	// Lump sum that, invested at the real return, pays `annual` at the start of each year for `years`.
	const incomeNeed = r === 0 ? annual * years : annual * ((1 - (1 + r) ** -years) / r) * (1 + r);

	const needs: Line[] = [
		{ key: 'income', label: 'Income replacement', value: incomeNeed, tone: 'bg-enterprise-blue-700' },
		{ key: 'mortgage', label: 'Mortgage', value: pos(v.mortgage), tone: 'bg-enterprise-blue-500' },
		{ key: 'debts', label: 'Other debts', value: pos(v.otherDebts), tone: 'bg-enterprise-blue-400' },
		{ key: 'final', label: 'Final expenses', value: pos(v.finalExpenses), tone: 'bg-enterprise-blue-300' },
		{ key: 'education', label: 'Education', value: Math.floor(pos(v.children)) * pos(v.educationPerChild), tone: 'bg-enterprise-blue-200' },
		{ key: 'other', label: 'Other goals', value: pos(v.otherGoals), tone: 'bg-enterprise-blue-100' },
	].filter((l) => l.value > 0);

	const resources: Line[] = [
		{ key: 'savings', label: 'Savings and investments', value: pos(v.savings) },
		{ key: 'personal', label: 'Personal life insurance', value: pos(v.personalCoverage) },
		{ key: 'group', label: 'Group life through work', value: pos(v.groupCoverage) },
	].filter((l) => l.value > 0);

	const totalNeed = sum(needs);
	const totalHave = sum(resources);
	const gap = Math.max(0, totalNeed - totalHave);

	return { annual, needs, resources, totalNeed, totalHave, gap, rounded: roundUp(gap) };
}

/* Buy-sell funding -------------------------------------------------- */
export type BuySellStructure = 'corporate' | 'crisscross';

export interface Owner {
	id: string;
	name: string;
	pct: number;
}

export interface Policy {
	holder: string;
	insured: string;
	amount: number;
}

export function calculateBuySell(value: number, growthPct: number, owners: Owner[], structure: BuySellStructure) {
	const pctSum = Math.round(owners.reduce((s, o) => s + pos(o.pct), 0) * 100) / 100;
	const valid = Math.abs(pctSum - 100) < 0.01;
	const adjustedValue = pos(value) * (1 + pos(growthPct) / 100);
	const policies: Policy[] = [];

	if (valid) {
		for (const insured of owners) {
			const stake = adjustedValue * (pos(insured.pct) / 100);
			if (structure === 'corporate') {
				policies.push({ holder: 'The corporation', insured: insured.name, amount: stake });
				continue;
			}
			// Criss-cross: each surviving owner buys the deceased's stake in proportion to their own ownership.
			const others = owners.filter((o) => o.id !== insured.id);
			const othersPct = others.reduce((s, o) => s + pos(o.pct), 0);
			if (othersPct === 0) continue;
			for (const holder of others) {
				policies.push({ holder: holder.name, insured: insured.name, amount: stake * (pos(holder.pct) / othersPct) });
			}
		}
	}

	const funded = policies.filter((p) => p.amount > 0);
	return { valid, pctSum, adjustedValue, policies: funded, total: funded.reduce((s, p) => s + roundUp(p.amount), 0) };
}

/* Estate tax at death ----------------------------------------------- */
export interface EstateInput {
	cottageValue: number;
	cottageAcb: number;
	investmentsValue: number;
	investmentsAcb: number;
	companyValue: number;
	companyAcb: number;
	capitalGainsExemption: number;
	registered: number;
	principalResidence: number;
	otherAssets: number;
	registeredHasBeneficiary: boolean;
	marginalRatePct: number;
}

export function calculateEstate(v: EstateInput) {
	const rate = pos(v.marginalRatePct) / 100;
	const gains =
		pos(v.cottageValue - v.cottageAcb) +
		pos(v.investmentsValue - v.investmentsAcb) +
		pos(pos(v.companyValue - v.companyAcb) - pos(v.capitalGainsExemption));

	const gross =
		pos(v.cottageValue) +
		pos(v.investmentsValue) +
		pos(v.companyValue) +
		pos(v.registered) +
		pos(v.principalResidence) +
		pos(v.otherAssets);
	const probateBase = gross - (v.registeredHasBeneficiary ? pos(v.registered) : 0);
	const probate = Math.ceil(pos(probateBase - RULES.probateExemptAmount) / 1000) * RULES.probatePerThousand;

	const lines: Line[] = [
		{ key: 'gains', label: 'Tax on capital gains', value: gains * RULES.capitalGainsInclusionRate * rate, tone: 'bg-enterprise-blue-700' },
		{ key: 'registered', label: 'Tax on RRSP / RRIF', value: pos(v.registered) * rate, tone: 'bg-enterprise-blue-500' },
		{ key: 'probate', label: 'Ontario probate fee', value: probate, tone: 'bg-enterprise-blue-300' },
	];

	const total = sum(lines);
	const toHeirs = Math.max(0, gross - total);
	return { lines, total, gross, toHeirs, sharePct: gross > 0 ? (total / gross) * 100 : 0 };
}
