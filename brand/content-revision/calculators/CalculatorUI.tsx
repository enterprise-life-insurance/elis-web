import type { ReactNode } from "react";
import { CONTACT_PATH, money, type Line } from "../../lib/calculators/rules";

/* Layout ------------------------------------------------------------ */
export function CalculatorShell({ form, result }: { form: ReactNode; result: ReactNode }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
      <form className="rounded-2xl border border-natural-grey-200 bg-white px-6 py-2 shadow-sm" onSubmit={(e) => e.preventDefault()}>
        {form}
      </form>
      <aside className="rounded-2xl bg-natural-grey-50 p-6 ring-1 ring-natural-grey-200 lg:sticky lg:top-28" aria-live="polite">
        {result}
      </aside>
    </div>
  );
}

export function Group({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="border-b border-natural-grey-200 py-5 last:border-b-0">
      <legend className="float-left mb-3 w-full text-base font-semibold text-enterprise-blue-900">{title}</legend>
      {hint && <p className="clear-both -mt-1 mb-3 text-sm text-natural-grey-600">{hint}</p>}
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
  kind?: "currency" | "percent" | "count";
  step?: number;
  max?: number;
};

export function NumberInput({ id, label, value, onChange, kind = "currency", step, max }: Omit<FieldProps, "hint">) {
  return (
    <div className="relative">
      {kind === "currency" && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-natural-grey-500">$</span>
      )}
      <input
        id={id}
        aria-label={label}
        type="number"
        inputMode="decimal"
        min={0}
        max={max}
        step={step ?? (kind === "currency" ? 1000 : 1)}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))}
        className={[
          "w-full rounded-lg border border-natural-grey-300 bg-white py-2 text-right text-[15px] font-medium tabular-nums text-enterprise-blue-900",
          "focus:border-enterprise-blue-500 focus:outline-none focus:ring-2 focus:ring-enterprise-blue-500/25",
          kind === "currency" ? "pl-7 pr-3" : kind === "percent" ? "pl-3 pr-8" : "px-3",
        ].join(" ")}
      />
      {kind === "percent" && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-natural-grey-500">%</span>
      )}
    </div>
  );
}

export function Field(props: FieldProps) {
  return (
    <div className="grid grid-cols-[1fr_9.5rem] items-center gap-3 py-1.5">
      <label htmlFor={props.id} className="text-[15px] text-natural-grey-900">
        {props.label}
        {props.hint && <span className="block text-xs text-natural-grey-600">{props.hint}</span>}
      </label>
      <NumberInput {...props} />
    </div>
  );
}

export function Checkbox({ id, label, hint, checked, onChange }: { id: string; label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 py-2 text-[15px] text-natural-grey-900">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 size-4 accent-enterprise-blue-500" />
      <span>
        {label}
        {hint && <span className="block text-xs text-natural-grey-600">{hint}</span>}
      </span>
    </label>
  );
}

export function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full bg-natural-grey-100 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={[
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            value === o.value ? "bg-enterprise-blue-500 text-white shadow-sm" : "text-natural-grey-700 hover:text-enterprise-blue-700",
          ].join(" ")}
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
      <p className="text-sm font-medium text-natural-grey-600">{caption}</p>
      <p className={`mt-1 text-4xl font-bold tracking-tight tabular-nums sm:text-5xl ${muted ? "text-life-green-700" : "text-enterprise-blue-700"}`}>
        {amount}
      </p>
      {sub && <p className="mt-2 text-sm text-natural-grey-700">{sub}</p>}
    </div>
  );
}

export function StackBar({ parts, left, right }: { parts: { value: number; tone: string }[]; left: string; right: string }) {
  const sum = parts.reduce((s, p) => s + p.value, 0) || 1;
  return (
    <div className="mt-5" aria-hidden="true">
      <div className="flex h-3 overflow-hidden rounded-full bg-natural-grey-200">
        {parts.map((p, i) => (
          <span key={i} className={`${p.tone} h-full transition-[width] duration-300 motion-reduce:transition-none`} style={{ width: `${(p.value / sum) * 100}%` }} />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-natural-grey-600">
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}

export function Ledger({ rows, minus = [], totalLabel, total }: { rows: Line[]; minus?: Line[]; totalLabel: string; total: number }) {
  return (
    <table className="mt-5 w-full text-sm tabular-nums">
      <tbody>
        {rows.map((r) => (
          <tr key={r.key} className="border-b border-natural-grey-200">
            <td className="py-2 pr-3 text-natural-grey-800">
              {r.tone && <span className={`${r.tone} mr-2 inline-block size-2.5 rounded-sm align-[-1px]`} />}
              {r.label}
            </td>
            <td className="py-2 text-right whitespace-nowrap text-natural-grey-900">{money(r.value)}</td>
          </tr>
        ))}
        {minus.map((r) => (
          <tr key={r.key} className="border-b border-natural-grey-200">
            <td className="py-2 pr-3 text-natural-grey-800">
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
        className="mt-6 block rounded-full bg-life-green-500 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-life-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-enterprise-blue-500"
      >
        Review this with an advisor
      </a>
      <p className="mt-4 text-xs leading-relaxed text-natural-grey-600">{note}</p>
    </>
  );
}
