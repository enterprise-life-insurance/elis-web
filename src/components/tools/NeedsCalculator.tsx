import { useMemo, useState } from 'react';
import { calculateNeeds, type NeedsInput } from '../../lib/calculators/logic';
import { money } from '../../lib/calculators/rules';
import { CalculatorShell, Field, Group, Headline, Ledger, ResultFooter, StackBar } from './CalculatorUI';

const DEFAULTS: NeedsInput = {
	income: 90_000,
	incomeSharePct: 70,
	years: 15,
	realReturnPct: 2,
	mortgage: 400_000,
	otherDebts: 25_000,
	finalExpenses: 25_000,
	children: 2,
	educationPerChild: 60_000,
	otherGoals: 0,
	savings: 50_000,
	personalCoverage: 0,
	groupCoverage: 100_000,
};

export default function NeedsCalculator() {
	const [v, setV] = useState<NeedsInput>(DEFAULTS);
	const set = (k: keyof NeedsInput) => (n: number) => setV((p) => ({ ...p, [k]: n }));
	const r = useMemo(() => calculateNeeds(v), [v]);

	const covered = Math.min(1, r.totalHave / (r.totalNeed || 1));
	const parts = [
		...r.needs.map((l) => ({ value: (l.value / (r.totalNeed || 1)) * (1 - covered), tone: l.tone! })),
		{ value: covered, tone: 'bg-life-green-500' },
	];

	return (
		<CalculatorShell
			form={
				<>
					<Group title="Replacing your income">
						<Field id="n-income" label="Your annual income" value={v.income} onChange={set('income')} />
						<Field
							id="n-share"
							label="Share your family would need"
							hint="Usually 60–80% once your own costs are gone"
							kind="percent"
							max={100}
							value={v.incomeSharePct}
							onChange={set('incomeSharePct')}
						/>
						<Field id="n-years" label="For how many years" kind="count" max={50} value={v.years} onChange={set('years')} />
						<Field
							id="n-return"
							label="Investment return after inflation"
							hint="Lower is more conservative"
							kind="percent"
							max={10}
							value={v.realReturnPct}
							onChange={set('realReturnPct')}
						/>
					</Group>
					<Group title="Debts and one-time costs">
						<Field id="n-mortgage" label="Mortgage balance" value={v.mortgage} onChange={set('mortgage')} />
						<Field
							id="n-debts"
							label="Other debts"
							hint="Car loans, lines of credit, cards"
							value={v.otherDebts}
							onChange={set('otherDebts')}
						/>
						<Field
							id="n-final"
							label="Final expenses"
							hint="Funeral, legal and estate costs"
							value={v.finalExpenses}
							onChange={set('finalExpenses')}
						/>
						<Field id="n-kids" label="Children to put through school" kind="count" max={12} value={v.children} onChange={set('children')} />
						<Field id="n-edu" label="Education cost per child" value={v.educationPerChild} onChange={set('educationPerChild')} />
						<Field
							id="n-other"
							label="Other goals"
							hint="Emergency fund, care for a parent"
							value={v.otherGoals}
							onChange={set('otherGoals')}
						/>
					</Group>
					<Group title="What's already in place">
						<Field
							id="n-savings"
							label="Savings and investments"
							hint="RRSPs, TFSAs, non-registered"
							value={v.savings}
							onChange={set('savings')}
						/>
						<Field id="n-personal" label="Personal life insurance" value={v.personalCoverage} onChange={set('personalCoverage')} />
						<Field
							id="n-group"
							label="Group life through work"
							hint="Usually ends if you leave the job"
							value={v.groupCoverage}
							onChange={set('groupCoverage')}
						/>
					</Group>
				</>
			}
			result={
				<>
					<Headline
						caption="Suggested additional coverage"
						amount={money(r.rounded)}
						muted={r.gap === 0}
						sub={
							r.gap === 0
								? 'What you have in place already covers these needs.'
								: `Rounded up from ${money(r.gap)}. Total need is ${money(r.totalNeed)}.`
						}
					/>
					<StackBar parts={parts} left="Still to cover" right="Already in place" />
					<Ledger rows={r.needs} minus={r.resources} totalLabel="Coverage gap" total={r.gap} />
					<ResultFooter
						note={`Estimate only, not advice. Income replacement of ${money(r.annual)} a year is valued in today's dollars at the return you entered.`}
					/>
				</>
			}
		/>
	);
}
