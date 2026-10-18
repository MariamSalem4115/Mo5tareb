import { X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { BUDGET } from "../../data/listings";
import { DEFAULT_FILTERS } from "../../services/listings";

// The small purple pills under the title that show which filters are on. Each has an X to remove it.
//  filters = the APPLIED filters, onChange(newFilters) is called when one is removed
export default function ActiveChips({ filters, onChange }) {
  const { t, moneyRange } = useApp();
  const c = t.searchPage.chips;
  const roomIds = ["private", "shared", "entire"];

  const chips = [];
  if (filters.min !== BUDGET.min || filters.max !== BUDGET.max)
    chips.push({ key: "budget", label: moneyRange(filters.min, filters.max), remove: { min: BUDGET.min, max: BUDGET.max } });
  if (filters.gender) chips.push({ key: "gender", label: t.listings.gender[filters.gender], remove: { gender: "" } });
  if (filters.room) chips.push({ key: "room", label: t.search.rooms[roomIds.indexOf(filters.room)], remove: { room: "" } });
  filters.amenities.forEach((a) =>
    chips.push({ key: `a-${a}`, label: t.listings.amenities[a], remove: { amenities: filters.amenities.filter((x) => x !== a) } }),
  );
  if (filters.verifiedOnly) chips.push({ key: "verified", label: c.verified, remove: { verifiedOnly: false } });
  if (filters.area > 1) chips.push({ key: "area", label: c.area, remove: { area: DEFAULT_FILTERS.area } });

  if (chips.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label={t.searchPage.filters.title}>
      {chips.map((chip) => (
        <li key={chip.key} className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-[11px] font-bold text-brand">
          {chip.label}
          <button type="button" aria-label={fill(c.remove, { label: chip.label })} onClick={() => onChange({ ...filters, ...chip.remove })} className="rounded-full hover:bg-brand/10">
            <X size={12} />
          </button>
        </li>
      ))}
    </ul>
  );
}
