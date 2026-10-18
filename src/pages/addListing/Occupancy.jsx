import { useApp } from "../../context/AppContext";
import SectionCard from "../../components/SectionCard";
import Input from "../../components/Input";
import SelectField from "../../components/SelectField";
import { makeBind } from "./bind";

// Step 4: how many people live in the flat, how many places are free, and who the place suits.
export default function Occupancy({ form, errors, onField }) {
  const { t } = useApp();
  const o = t.addListing.occupancy;
  const bind = makeBind(form, errors, onField);
  return (
    <SectionCard id="listing-step-4" step={4} title={t.addListing.steps[3]}>
      <div className="grid gap-5 md:grid-cols-2">
        <Input label={o.total} required inputMode="numeric" unit={o.totalUnit} placeholder={o.totalPh} {...bind("residents")} />
        <Input label={o.places} required inputMode="numeric" unit={o.placesUnit} placeholder={o.placesPh} {...bind("places")} />
        <SelectField label={o.group} required options={o.groups} placeholder={o.groupPh} {...bind("group")} />
        <SelectField label={o.perRoom} required options={o.perRoomList} placeholder={o.perRoomPh} {...bind("perRoom")} />
      </div>
      <p className="mt-5 text-xs text-slate-500">{o.hint}</p>
    </SectionCard>
  );
}
