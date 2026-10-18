import { useApp } from "../../context/AppContext";
import { LISTING } from "../../data/listing";
import SectionCard from "../../components/SectionCard";
import Input from "../../components/Input";
import SelectField from "../../components/SelectField";
import TextArea from "../../components/TextArea";
import { makeBind } from "./bind";

// Step 1: title, type, size, floor, bathrooms and description.
export default function Details({ form, errors, onField }) {
  const { t } = useApp();
  const d = t.addListing.details;
  const bind = makeBind(form, errors, onField);
  return (
    <SectionCard id="listing-step-1" step={1} title={t.addListing.steps[0]}>
      <div className="space-y-5">
        <Input label={d.name} required maxLength={LISTING.titleMax} placeholder={d.namePh} hint={d.nameHint} {...bind("name")} />
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField label={d.type} required options={d.types} placeholder={d.typePh} {...bind("type")} />
          <Input label={d.area} required inputMode="numeric" unit={d.areaUnit} placeholder={d.areaPh} {...bind("area")} />
          <SelectField label={d.floor} required options={d.floors} placeholder={d.floorPh} {...bind("floor")} />
          <SelectField label={d.bathrooms} required options={d.bathroomList} placeholder={d.bathroomsPh} {...bind("bathrooms")} />
        </div>
        <TextArea label={d.desc} required rows={4} maxLength={LISTING.descMax} placeholder={d.descPh} {...bind("description")} />
      </div>
    </SectionCard>
  );
}
