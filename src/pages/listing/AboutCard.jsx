import { Armchair, BedDouble, Fan, Snowflake, Utensils, WashingMachine, Wifi } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";

// An icon for each amenity id (the ids are in data/listings.js).
const AMENITY_ICONS = { wifi: Wifi, ac: Snowflake, fan: Fan, furnished: BedDouble, laundry: WashingMachine, kitchen: Utensils };

// "A calm home, close to everything": headline, description, quick facts and what is included.
export default function AboutCard({ home }) {
  const { t, n } = useApp();
  const p = t.listingPage;
  const c = p.chips;

  const chips = [
    c.bedroom[home.room],
    fill(home.room === "entire" ? c.capacity : c.students, { n: n(home.residents) }),
    home.room === "entire" ? c.bathroom.entire : c.bathroom.shared,
    `${home.floor === 0 ? c.ground : fill(c.floor, { n: n(home.floor) })} · ${home.elevator ? c.elevator : c.noElevator}`,
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-extrabold">{home.headline}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{home.desc}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {chips.map((chip) => <li key={chip} className="rounded-full bg-mist px-3 py-1.5 text-[11px] font-semibold text-slate-600">{chip}</li>)}
      </ul>

      <h3 className="mb-4 mt-6 text-sm font-extrabold">{p.included}</h3>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        {home.amenities.map((id) => {
          const Icon = AMENITY_ICONS[id] ?? Armchair;
          return (
            <li key={id} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
              <Icon size={16} className="shrink-0 text-brand" /> {t.listings.amenities[id]}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
