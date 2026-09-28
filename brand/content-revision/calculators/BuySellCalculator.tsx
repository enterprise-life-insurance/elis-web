import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { calculateBuySell, type BuySellStructure, type Owner } from "../../lib/calculators/logic";
import { money, roundUp } from "../../lib/calculators/rules";
import { CalculatorShell, Field, Group, Headline, NumberInput, ResultFooter, Segmented } from "./CalculatorUI";

const MAX_OWNERS = 4;
let nextId = 3;

const HINTS: Record<BuySellStructure, string> = {
  corporate:
    "The company owns and pays for one policy on each owner. It's simpler to manage, and the tax-free death benefit can usually flow to shareholders through the Capital Dividend Account.",
  crisscross:
    "Each owner holds a policy on every other owner, sized to the share of the business they'd buy. Proceeds stay outside the company, but the number of policies grows quickly with more owners.",
};

export default function BuySellCalculator() {
  const [value, setValue] = useState(3_000_000);
  const [growth, setGrowth] = useState(10);
  const [structure, setStructure] = useState<BuySellStructure>("corporate");
  const [owners, setOwners] = useState<Owner[]>([
    { id: "1", name: "Owner A", pct: 50 },
    { id: "2", name: "Owner B", pct: 50 },
  ]);
  const r = useMemo(() => calculateBuySell(value, growth, owners, structure), [value, growth, owners, structure]);

  const update = (id: string, patch: Partial<Owner>) => setOwners((os) => os.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  const add = () =>
    setOwners((os) => [...os, { id: String(nextId++), name: `Owner ${String.fromCharCode(65 + os.length)}`, pct: 0 }]);
  const remove = (id: string) => setOwners((os) => os.filter((o) => o.id !== id));

  return (
    <CalculatorShell
      form={
        <>
          <Group title="The business">
            <Field id="b-value" label="Current fair market value" step={10_000} value={value} onChange={setValue} />
            <Field id="b-growth" label="Growth buffer" hint="Room for the value to rise before your next review" kind="percent" step={5} max={100} value={growth} onChange={setGrowth} />
          </Group>
          <Group title="Owners" hint="Ownership must add up to 100%.">
            {owners.map((o, i) => (
              <div key={o.id} className="grid grid-cols-[1fr_7rem_2.5rem] items-center gap-3 py-1.5">
                <input
                  aria-label={`Owner ${i + 1} name`}
                  value={o.name}
                  onChange={(e) => update(o.id, { name: e.target.value })}
                  className="w-full rounded-lg border border-natural-grey-300 px-3 py-2 text-[15px] text-enterprise-blue-900 focus:border-enterprise-blue-500 focus:outline-none focus:ring-2 focus:ring-enterprise-blue-500/25"
                />
                <NumberInput id={`b-pct-${o.id}`} label={`Owner ${i + 1} ownership`} kind="percent" max={100} value={o.pct} onChange={(n) => update(o.id, { pct: n })} />
                <button
                  type="button"
                  onClick={() => remove(o.id)}
                  disabled={owners.length <= 2}
                  aria-label={`Remove ${o.name}`}
                  className="grid size-10 place-items-center rounded-lg border border-natural-grey-300 text-natural-grey-600 hover:text-enterprise-blue-700 disabled:opacity-40"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={add} disabled={owners.length >= MAX_OWNERS} className="mt-2 text-sm font-semibold text-enterprise-blue-600 hover:text-enterprise-blue-800 disabled:text-natural-grey-400">
              Add an owner
            </button>
            {!r.valid && <p className="mt-2 text-sm font-medium text-red-700">Ownership adds up to {r.pctSum}%. Adjust it to 100% to see results.</p>}
          </Group>
          <Group title="Who owns the policies">
            <Segmented
              label="Policy structure"
              value={structure}
              onChange={setStructure}
              options={[
                { value: "corporate", label: "The corporation" },
                { value: "crisscross", label: "The owners (criss-cross)" },
              ]}
            />
            <p className="mt-3 text-sm text-natural-grey-600">{HINTS[structure]}</p>
          </Group>
        </>
      }
      result={
        r.valid ? (
          <>
            <Headline caption="Total coverage across all owners" amount={money(r.total)} sub={`Based on a value of ${money(r.adjustedValue)} including the growth buffer.`} />
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm tabular-nums">
                <thead>
                  <tr className="border-b border-natural-grey-300 text-xs text-natural-grey-600">
                    <th className="py-2 text-left font-medium">{structure === "corporate" ? "Insured owner" : "Policy"}</th>
                    <th className="py-2 pl-3 text-right font-medium">Needed</th>
                    <th className="py-2 pl-3 text-right font-medium">Rounded</th>
                  </tr>
                </thead>
                <tbody>
                  {r.policies.map((p, i) => (
                    <tr key={i} className="border-b border-natural-grey-200">
                      <td className="py-2 text-natural-grey-800">{structure === "corporate" ? p.insured : `${p.holder} insures ${p.insured}`}</td>
                      <td className="py-2 pl-3 text-right text-natural-grey-900">{money(p.amount)}</td>
                      <td className="py-2 pl-3 text-right font-semibold text-enterprise-blue-900">{money(roundUp(p.amount))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ResultFooter note="Estimate only, not advice. Base the value on a recent valuation and review coverage when it changes. Your agreement's valuation clause and tax advice should shape the final structure." />
          </>
        ) : (
          <Headline caption="Total coverage across all owners" amount="—" sub="Set ownership to add up to 100% to see results." />
        )
      }
    />
  );
}
