import { useApp } from "../../context/AppContext";
import { LISTING } from "../../data/listing";
import SectionCard from "../../components/SectionCard";
import CheckboxGroup from "../../components/CheckboxGroup";
import TextArea from "../../components/TextArea";
import { makeBind } from "./bind";

// Step 5: amenities and house rules (tick boxes) plus a free notes box.
export default function Amenities({ form, errors, onField, onToggle }) {
  const { t } = useApp();
  const a = t.addListing.amenities;
  const bind = makeBind(form, errors, onField);
  return (
    <SectionCard id="listing-step-5" step={5} title={t.addListing.steps[4]}>
      <div className="space-y-6">
        <CheckboxGroup options={a.list} selected={form.amenities} onToggle={(id) => onToggle("amenities", id)} />
        <CheckboxGroup label={a.rules} columns={1} options={a.ruleList} selected={form.rules} onToggle={(id) => onToggle("rules", id)} />
        <TextArea label={a.notes} rows={3} maxLength={LISTING.notesMax} placeholder={a.notesPh} {...bind("notes")} />
      </div>
    </SectionCard>
  );
}
