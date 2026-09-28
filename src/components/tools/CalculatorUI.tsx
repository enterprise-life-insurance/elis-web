import { useState, type ReactNode } from 'react';
import { CONTACT_PATH, money, type Line } from '../../lib/calculators/rules';

/* Layout ------------------------------------------------------------ */
export function CalculatorShell({ form, result }: { form: ReactNode; result: ReactNode }) {
	return (
		<div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
			<form className="rounded-2xl border border-natural-grey-600 bg-white px-6 py-2" onSubmit={(e) => e.preventDefault()}>
				{form}
			</form>
			<aside className="rounded-2xl bg-natural-grey-500 p-6 ring-1 ring-natural-grey-600 lg:sticky lg:top-28" aria-live="polite">
				{result}
			</aside>
		</div>
	);
}

export function Group({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
	return (
		<fieldset className="border-b border-natural-grey-600 py-5 last:border-b-0">
			<legend className="float-left mb-3 w-full text-base font-semibold text-natural-grey-900">{title}</legend>
			{hint && <p className="clear-both -mt-1 mb-3 text-sm text-natural-grey-800">{hint}</p>}
			<div className="clear-both">{children}</div>
		</fieldset>
	);
}

/* Inputs ------------------------------------------------------------ */
type FieldProps = {
	id: string;
	label: string;
	hint?: string;
	value: number;
	onChange: (v: number) => void;
	kind?: 'currency' | 'percent' | 'count';
	max?: number;
};

const grouped = new Intl.NumberFormat('en-CA', { maximumFractionDigits: 2 });

// Text input rather than type="number" so currency shows thousands separators when not being edited.
export function NumberInput({ id, label, value, onChange, kind = 'currency', max }: Omit<FieldProps, 'hint'>) {
	const [draft, setDraft] = useState<string | null>(null);
	const safe = Number.isFinite(value) ? value : 0;
	const shown = draft ?? (kind === 'currency' ? grouped.format(safe) : String(safe));

	return (
		<div className="relative">
			{kind === 'currency' && (
				<span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-natural-grey-800">$</span>
			)}
			<input
				id={id}
				aria-label={label}
				type="text"
				inputMode={kind === 'count' ? 'numeric' : 'decimal'}
				autoComplete="off"
				value={shown}
				onFocus={(e) => {
					setDraft(safe === 0 ? '' : String(safe));
					requestAnimationFrame(() => e.target.select());
				}}
				onBlur={() => setDraft(null)}
				onChange={(e) => {
					const raw = e.target.value.replace(kind === 'count' ? /[^\d]/g : /[^\d.]/g, '');
					setDraft(raw);
					const n = raw === '' ? 0 : parseFloat(raw) || 0;
					onChange(max === undefined ? n : Math.min(max, n));
				}}
				className={[
					'w-full rounded-lg border border-natural-grey-700 bg-white py-2 text-right text-[15px] font-medium text-natural-grey-900 tabular-nums',
					'focus:border-enterprise-blue-500 focus:ring-2 focus:ring-enterprise-blue-500/25 focus:outline-none',
					kind === 'currency' ? 'pr-3 pl-7' : kind === 'percent' ? 'pr-8 pl-3' : 'px-3',
				].join(' ')}
			/>
			{kind === 'percent' && (
				<span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-natural-grey-800">%</span>
			)}
		</div>
	);
}

export function Field(props: FieldProps) {
	return (
		<div className="grid grid-cols-[1fr_9.5rem] items-center gap-3 py-1.5">
			<label htmlFor={props.id} className="text-[15px] text-natural-grey-900">
				{props.label}
				{props.hint && <span className="block text-xs text-natural-grey-800">{props.hint}</span>}
			</label>
			<NumberInput {...props} />
		</div>
	);
}

export function Checkbox({
	id,
	label,
	hint,
	checked,
	onChange,
}: {
	id: string;
	label: string;
	hint?: string;
	checked: boolean;
	onChange: (v: boolean) => void;
}) {
	return (
		<label htmlFor={id} className="flex cursor-pointer items-start gap-3 py-2 text-[15px] text-natural-grey-900">
			<input
				id={id}
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				className="mt-1 size-4 accent-enterprise-blue-500"
			/>
			<span>
				{label}
				{hint && <span className="block text-xs text-natural-grey-800">{hint}</span>}
			</span>
		</label>
	);
}

export function Segmented<T extends string>({
	label,
	value,
	options,
	onChange,
}: {
	label: string;
	value: T;
	options: { value: T; label: string }[];
	onChange: (v: T) => void;
}) {
	return (
		<div role="group" aria-label={label} className="inline-flex flex-wrap rounded-3xl bg-natural-grey-500 p-1 ring-1 ring-natural-grey-600">
			{options.map((o) => (
				<button
					key={o.value}
					type="button"
					aria-pressed={value === o.value}
					onClick={() => onChange(o.value)}
					className={[
						'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
						value === o.value ? 'bg-enterprise-blue-500 text-white shadow-sm' : 'text-natural-grey-900 hover:text-enterprise-blue-600',
					].join(' ')}
				>
					{o.label}
				</button>
			))}
		</div>
	);
}

/* Results ----------------------------------------------------------- */
export function Headline({ caption, amount, sub, muted }: { caption: string; amount: string; sub?: string; muted?: boolean }) {
	return (
		<div>
			<p className="text-sm font-medium text-natural-grey-900">{caption}</p>
			<p
				className={`mt-1 text-4xl font-bold tracking-tight tabular-nums sm:text-5xl ${muted ? 'text-life-green-700' : 'text-enterprise-blue-500'}`}
			>
				{amount}
			</p>
			{sub && <p className="mt-2 text-sm text-natural-grey-900">{sub}</p>}
		</div>
	);
}

export function StackBar({ parts, left, right }: { parts: { value: number; tone: string }[]; left: string; right: string }) {
	const sum = parts.reduce((s, p) => s + p.value, 0) || 1;
	return (
		<div className="mt-5" aria-hidden="true">
			<div className="flex h-3 overflow-hidden rounded-full bg-natural-grey-600">
				{parts.map((p, i) => (
					<span
						key={i}
						className={`${p.tone} h-full transition-[width] duration-300 motion-reduce:transition-none`}
						style={{ width: `${(p.value / sum) * 100}%` }}
					/>
				))}
			</div>
			<div className="mt-1.5 flex justify-between gap-3 text-xs text-natural-grey-800">
				<span>{left}</span>
				<span className="text-right">{right}</span>
			</div>
		</div>
	);
}

export function Ledger({ rows, minus = [], totalLabel, total }: { rows: Line[]; minus?: Line[]; totalLabel: string; total: number }) {
	return (
		<table className="mt-5 w-full text-sm tabular-nums">
			<tbody>
				{rows.map((r) => (
					<tr key={r.key} className="border-b border-natural-grey-600">
						<td className="py-2 pr-3 text-natural-grey-900">
							{r.tone && <span className={`${r.tone} mr-2 inline-block size-2.5 rounded-sm align-[-1px]`} />}
							{r.label}
						</td>
						<td className="py-2 text-right whitespace-nowrap text-natural-grey-900">{money(r.value)}</td>
					</tr>
				))}
				{minus.map((r) => (
					<tr key={r.key} className="border-b border-natural-grey-600">
						<td className="py-2 pr-3 text-natural-grey-900">
							<span className="mr-2 inline-block size-2.5 rounded-sm bg-life-green-500 align-[-1px]" />
							{r.label}
						</td>
						<td className="py-2 text-right whitespace-nowrap text-life-green-700">−{money(r.value)}</td>
					</tr>
				))}
				<tr>
					<td className="pt-3 font-semibold text-enterprise-blue-900">{totalLabel}</td>
					<td className="pt-3 text-right font-semibold whitespace-nowrap text-enterprise-blue-900">{money(total)}</td>
				</tr>
			</tbody>
		</table>
	);
}

export function ResultFooter({ note }: { note: string }) {
	return (
		<>
			<a
				href={CONTACT_PATH}
				className="mt-6 flex items-center justify-center rounded-full bg-life-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-life-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-enterprise-blue-500"
			>
				Review this with an advisor
			</a>
			<p className="mt-4 text-xs leading-relaxed text-natural-grey-800">{note}</p>
		</>
	);
}
