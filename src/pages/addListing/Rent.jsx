import { useApp } from "../../context/AppContext";
import { todayISO } from "../../utils/format";
import { LISTING } from "../../data/listing";
import SectionCard from "../../components/SectionCard";
import Input from "../../components/Input";
import SelectField from "../../components/SelectField";
import TextArea from "../../components/TextArea";
import { makeBind } from "./bind";

// Step 3: rent, deposit, who pays the bills, minimum stay, start date and extra costs.
export default function Rent({ form, errors, onField }) {
  const { t } = useApp();
  const r = t.addListing.rent;
  const bind = makeBind(form, errors, onField);
  return (
    <SectionCard id="listing-step-3" step={3} title={t.addListing.steps[2]} sub={r.sub}>
      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Input label={r.rent} required inputMode="numeric" unit={r.unit} placeholder={r.amountPh} {...bind("rent")} />
          <Input label={r.deposit} required inputMode="numeric" unit={r.unit} placeholder={r.amountPh} {...bind("deposit")} />
          <SelectField label={r.internetWater} required options={r.utilityOptions} placeholder={r.utilityPh} {...bind("internetWater")} />
          <SelectField label={r.electricityGas} required options={r.utilityOptions} placeholder={r.utilityPh} {...bind("electricityGas")} />
          <SelectField label={r.minStay} required options={r.stays} placeholder={r.minStayPh} {...bind("minStay")} />
          <Input label={r.from} required type="date" min={todayISO()} {...bind("from")} />
        </div>
        <TextArea label={r.extra} rows={3} maxLength={LISTING.notesMax} placeholder={r.extraPh} hint={r.extraHint} {...bind("extra")} />
      </div>
    </SectionCard>
  );
}
