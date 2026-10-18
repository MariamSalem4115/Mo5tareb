import { User } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";

// Price, minimum stay and what the bills look like.
export default function PriceCard({ home }) {
  const { t, n, money } = useApp();
  const p = t.listingPage.pricing;
  const rows = [
    [p.deposit, money(home.deposit)],
    [p.internet, home.internetWater ? p.included : p.notIncluded],
    [p.electricity, p.elec[home.electricity]],
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-[11px] font-bold text-brand">
        <User size={12} /> {p.availableNow} · {home.genderLabel}
      </span>
      <p className="mt-4 text-3xl font-extrabold text-brand">
        {money(home.price)} <span className="text-sm font-normal text-slate-500">{p.perMonth}</span>
      </p>
      <p className="mt-2 text-xs text-slate-500">{fill(p.stay, { type: home.typeLabel, n: n(home.minStay) })}</p>

      <dl className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-xs">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <dt className="text-slate-500">{label}</dt>
            <dd className="font-bold">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[11px] leading-5 text-slate-500">{p.note}</p>
    </section>
  );
}
