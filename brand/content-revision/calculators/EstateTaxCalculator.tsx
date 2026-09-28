import { useMemo, useState } from "react";
import { calculateEstate, type EstateInput } from "../../lib/calculators/logic";
import { RULES, money } from "../../lib/calculators/rules";
import { CalculatorShell, Checkbox, Field, Group, Headline, Ledger, NumberInput, ResultFooter, StackBar } from "./CalculatorUI";

const DEFAULTS: EstateInput = {
  cottageValue: 900_000,
  cottageAcb: 250_000,
  investmentsValue: 600_000,
  investmentsAcb: 350_000,
  companyValue: 1_500_000,
  companyAcb: 100,
  capitalGainsExemption: 0,
  registered: 700_000,
  principalResidence: 1_400_000,
  otherAssets: 150_000,
  registeredHasBeneficiary: true,
  marginalRatePct: RULES.ontarioTopMarginalRate,
};

function GainRow({ label, id, value, acb, onValue, onAcb }: { label: string; id: string; value: number; acb: number; onValue: (n: number) => void; onAcb: (n: number) => void }) {
  return (
    <div className="grid grid-cols-2 items-center gap-3 py-1.5 sm:grid-cols-[1fr_8.5rem_8.5rem]">
      <span className="col-span-2 text-[15px] text-natural-grey-900 sm:col-span-1">{label}</span>
      <NumberInput id={`${id}-v`} label={`${label} value today`} step={10_000} value={value} onChange={onValue} />
      <NumberInput id={`${id}-a`} label={`${label} adjusted cost base`} step={10_000} value={acb} onChange={onAcb} />
    </div>
  );
}

export default function EstateTaxCalculator() {
  const [v, setV] = useState<EstateInput>(DEFAULTS);
  const [spouse, setSpouse] = useState(false);
  const set = <K extends keyof EstateInput>(k: K) => (n: EstateInput[K]) => setV((p) => ({ ...p, [k]: n }));
  const r = useMemo(() => calculateEstate(v), [v]);

  return (
    <CalculatorShell
      form={
        <>
          <Group title="Assets that have grown in value" hint="Adjusted cost base (ACB) is roughly what you paid, plus improvements.">
            <div className="hidden grid-cols-[1fr_8.5rem_8.5rem] gap-3 text-right text-xs text-natural-grey-600 sm:grid">
              <span />
              <span>Value today</span>
              <span>ACB</span>
            </div>
            <GainRow id="e-cot" label="Cottage or rental property" value={v.cottageValue} acb={v.cottageAcb} onValue={set("cottageValue")} onAcb={set("cottageAcb")} />
            <GainRow id="e-inv" label="Non-registered investments" value={v.investmentsValue} acb={v.investmentsAcb} onValue={set("investmentsValue")} onAcb={set("investmentsAcb")} />
            <GainRow id="e-co" label="Private company shares" value={v.companyValue} acb={v.companyAcb} onValue={set("companyValue")} onAcb={set("companyAcb")} />
            <Field id="e-lcge" label="Capital gains exemption available" hint="Only for qualifying small business shares — confirm with your accountant" step={10_000} value={v.capitalGainsExemption} onChange={set("capitalGainsExemption")} />
          </Group>
          <Group title="Registered plans and other assets">
            <Field id="e-rrsp" label="RRSP / RRIF balance" step={10_000} value={v.registered} onChange={set("registered")} />
            <Field id="e-home" label="Principal residence" hint="Tax-free, but counts toward probate" step={10_000} value={v.principalResidence} onChange={set("principalResidence")} />
            <Field id="e-other" label="Cash, TFSAs and other assets" step={10_000} value={v.otherAssets} onChange={set("otherAssets")} />
            <Checkbox id="e-benef" label="My RRSP / RRIF has a named beneficiary" hint="It passes outside the estate, so no probate fee applies to it" checked={v.registeredHasBeneficiary} onChange={set("registeredHasBeneficiary")} />
          </Group>
          <Group title="Tax assumptions">
            <Field id="e-rate" label="Marginal tax rate in year of death" hint="Ontario's top combined rate is shown" kind="percent" step={0.01} max={60} value={v.marginalRatePct} onChange={set("marginalRatePct")} />
            <Checkbox id="e-spouse" label="A spouse or partner will inherit" hint="Tax is usually deferred until the second death, when this bill comes due" checked={spouse} onChange={setSpouse} />
          </Group>
        </>
      }
      result={
        <>
          <Headline
            caption={spouse ? "Estimated tax and probate at the second death" : "Estimated tax and probate at death"}
            amount={money(r.total)}
            sub={
              spouse
                ? "Little or nothing is usually due at the first death. This is what your heirs would face after both of you have died, assuming similar values."
                : `About ${Math.round(r.sharePct)}% of a ${money(r.gross)} estate. Life insurance can pay it so assets don't have to be sold.`
            }
          />
          <StackBar
            parts={[
              { value: r.total, tone: "bg-enterprise-blue-700" },
              { value: r.toHeirs, tone: "bg-life-green-500" },
            ]}
            left="Tax and fees"
            right={`To heirs: ${money(r.toHeirs)}`}
          />
          <Ledger rows={r.lines} totalLabel="Total to fund" total={r.total} />
          <ResultFooter note={`Estimate only, not tax advice. Uses one marginal rate; actual tax depends on total income in the year of death, credits and losses. Excludes jointly held and US assets. Rules as of ${RULES.asOfYear}.`} />
        </>
      }
    />
  );
}
