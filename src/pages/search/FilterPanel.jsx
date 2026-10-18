import { useApp } from "../../context/AppContext";
import { AMENITY_IDS } from "../../data/listings";
import Button from "../../components/Button";
import BudgetSlider from "../../components/BudgetSlider";
import SelectField from "../../components/SelectField";
import CheckboxGroup from "../../components/CheckboxGroup";

// The filter box on the side. Changes only count after "Apply filters" (draft -> applied in Search.jsx).
//  draft = the filters as they are being edited, onChange(newDraft), onApply(), onReset()
export default function FilterPanel({ draft, onChange, onApply, onReset }) {
  const { t, moneyRange } = useApp();
  const f = t.searchPage.filters;
  const set = (patch) => onChange({ ...draft, ...patch });

  const genders = ["women", "men", "any"].map((id) => ({ id, label: t.listings.gender[id] }));
  const rooms = ["private", "shared", "entire"].map((id, i) => ({ id, label: t.search.rooms[i] }));
  const amenities = AMENITY_IDS.map((id) => ({ id, label: t.listings.amenities[id] }));
  const toggleAmenity = (id) => set({ amenities: draft.amenities.includes(id) ? draft.amenities.filter((a) => a !== id) : [...draft.amenities, id] });

  return (
    <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-extrabold">{f.title}</h2>
        <button type="button" onClick={onReset} className="text-xs font-bold text-brand hover:underline">{f.reset}</button>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-bold">{f.budget}</span>
          <span className="font-bold text-brand">{moneyRange(draft.min, draft.max)}</span>
        </div>
        <BudgetSlider min={draft.min} max={draft.max} label={f.budget} onChange={(min, max) => set({ min, max })} />
      </div>

      <SelectField label={f.gender} options={genders} placeholder={f.any} value={draft.gender} onChange={(e) => set({ gender: e.target.value })} />
      <SelectField label={f.room} options={rooms} placeholder={f.any} value={draft.room} onChange={(e) => set({ room: e.target.value })} />

      <CheckboxGroup label={f.amenities} options={amenities} selected={draft.amenities} onToggle={toggleAmenity} columns={1} />

      <label className="flex cursor-pointer items-center gap-2.5 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-700">
        <input type="checkbox" className="size-[18px] shrink-0 cursor-pointer accent-brand" checked={draft.verifiedOnly} onChange={() => set({ verifiedOnly: !draft.verifiedOnly })} />
        {f.verified}
      </label>

      <Button className="w-full" onClick={onApply}>{f.apply}</Button>
      <p className="text-[11px] leading-5 text-slate-500">{f.note}</p>
    </div>
  );
}
