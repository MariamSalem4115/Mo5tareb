import { MapPin } from "lucide-react";
import { useApp } from "../../context/AppContext";
import SectionCard from "../../components/SectionCard";
import Input from "../../components/Input";
import SelectField from "../../components/SelectField";
import { makeBind } from "./bind";

// Step 2: governorate, district, street, nearest university, walking time and the private address.
export default function Location({ form, errors, onField }) {
  const { t } = useApp();
  const l = t.addListing.location;
  const bind = makeBind(form, errors, onField);
  // The district list depends on the governorate that was chosen.
  const districts = l.places.find((p) => p.id === form.governorate)?.districts ?? [];
  // The university list is shared with the Register page. We save its position (0, 1, 2 ...) so it survives a language switch.
  const universities = t.register.universities.map((label, i) => ({ value: String(i), label }));

  return (
    <SectionCard id="listing-step-2" step={2} title={t.addListing.steps[1]} sub={l.sub}>
      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField label={l.governorate} required options={l.places.map((p) => ({ value: p.id, label: p.label }))} placeholder={l.governoratePh} {...bind("governorate")} />
          <SelectField label={l.district} required options={districts.map((d) => ({ value: d.id, label: d.label }))} placeholder={l.districtPh} {...bind("district")} />
        </div>
        <Input label={l.street} required icon={MapPin} placeholder={l.streetPh} {...bind("street")} />
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField label={l.university} required options={universities} placeholder={l.universityPh} {...bind("university")} />
          <Input label={l.walk} required inputMode="numeric" unit={l.walkUnit} placeholder={l.walkPh} {...bind("walk")} />
        </div>
        <Input label={l.address} required placeholder={l.addressPh} hint={l.addressHint} {...bind("address")} />
      </div>
    </SectionCard>
  );
}
