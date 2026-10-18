import { useState } from "react";
import { Clock, Plus, Zap } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { DASH } from "../../data/dashboard";
import Button from "../../components/Button";
import BoostDialog from "./BoostDialog";

const BADGE = {
  active: "bg-emerald-50 text-emerald-700",
  inactive: "bg-slate-100 text-slate-600",
  rented: "bg-brand-soft text-brand",
  expiring: "bg-amber-100 text-amber-800",
};

// "Listings Management" (landowners only): a table of your properties with one quick action per row.
export default function ListingsCard() {
  const { t, n, money, go, fmtDate } = useApp();
  const l = t.dashboard.listings;

  // Your changes, saved by listing id: { dokki: { status, expiryDate, boosted } }.
  // We keep them separate from the translated list so switching language still works.
  const [changes, setChanges] = useState({});
  const [boost, setBoost] = useState(null); // null = closed, otherwise { id } to preselect (id may be "")

  // The translated items with your changes laid on top.
  const items = l.items.map((item) => ({ ...item, ...changes[item.id] }));
  const activeCount = items.filter((i) => i.status === "active").length;

  const update = (id, patch) => setChanges((c) => ({ ...c, [id]: { ...c[id], ...patch } }));

  // Re-activate = active again, expiring 30 days from today.
  const reactivate = (id) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + DASH.expiryDays);
    update(id, { status: "active", expiryDate });
  };

  // One quick-action button per row, depending on the status.
  const action = (item) => {
    if (item.status === "active")
      return item.boosted
        ? <Button variant="outline" disabled icon={Zap} className="w-full py-2 text-xs">{l.boosted}</Button>
        : <Button variant="outline" icon={Zap} className="w-full py-2 text-xs" onClick={() => setBoost({ id: item.id })}>{l.boost}</Button>;
    if (item.status === "rented")
      return <Button variant="outline" className="w-full py-2 text-xs" onClick={() => go("listing", { listingId: item.id })}>{l.view}</Button>;
    return <Button className="w-full py-2 text-xs" onClick={() => reactivate(item.id)}>{l.reactivate}</Button>;
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-extrabold">{l.title}</h2>
      <p className="mb-4 mt-1 text-sm text-slate-500">{l.sub}</p>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-brand-soft px-3 py-1.5 text-[11px] font-bold text-brand">
          {fill(l.summary, { n: n(items.length), a: n(activeCount) })}
        </span>
        <Button variant="outline" icon={Plus} className="py-2 text-xs" onClick={() => go("addListing")}>{l.add}</Button>
      </div>

      {/* The table scrolls sideways on small screens instead of squashing. */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-start text-sm">
          <thead>
            <tr className="bg-mist text-[11px] font-bold text-slate-500">
              {l.cols.map((c) => <th key={c} scope="col" className="px-3 py-3 text-start first:rounded-s-xl last:rounded-e-xl">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 last:border-0">
                <td className="px-3 py-4">
                  <p className="font-bold">{item.title}</p>
                  <p className="text-[11px] text-slate-500">{item.sub}</p>
                </td>
                <td className="px-3 py-4 font-extrabold">{money(item.price)}</td>
                <td className="px-3 py-4">
                  <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${BADGE[item.status]}`}>{l.status[item.status]}</span>
                </td>
                <td className="px-3 py-4 text-xs text-slate-500">{item.expiryDate ? fmtDate(item.expiryDate) : item.expiry}</td>
                <td className="w-40 px-3 py-4">{action(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
        <Clock size={14} className="mt-0.5 shrink-0" />
        {l.notice}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-soft px-6 py-5">
        <div>
          <h3 className="text-base font-extrabold">{l.promoTitle}</h3>
          <p className="mt-1 text-xs text-slate-600">{l.promoText}</p>
        </div>
        <Button icon={Zap} onClick={() => setBoost({ id: "" })}>{l.promoBtn}</Button>
      </div>

      {boost && (
        <BoostDialog
          activeItems={items.filter((i) => i.status === "active" && !i.boosted)}
          startId={boost.id}
          onConfirm={(id) => update(id, { boosted: true })}
          onClose={() => setBoost(null)}
        />
      )}
    </section>
  );
}
