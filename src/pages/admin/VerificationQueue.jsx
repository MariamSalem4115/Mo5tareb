import { Check, ChevronDown, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button";
import DocPreview from "./DocPreview";

// Table of pending verification requests. Click a row to open it in the review panel below.
export default function VerificationQueue({ items, totalPending, filter, onFilter, selectedId, onSelect, decisions, onApprove, onReject }) {
  const { t, n } = useApp();
  const q = t.admin.queue;
  const status = { approved: q.approved, rejected: q.rejected };

  return (
    <section id="queue" className="scroll-mt-32 rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
      <h2 className="text-2xl font-extrabold">{q.title}</h2>
      <p className="mt-2 text-sm text-slate-500">{q.sub}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
        <span className="rounded-full bg-brand-soft px-3 py-1.5 font-bold text-brand">{q.pending} · {n(totalPending)}</span>
        <label className="relative">
          <select value={filter} onChange={(e) => onFilter(e.target.value)} aria-label={q.filters.all} className="h-9 appearance-none rounded-lg border border-slate-200 bg-white ps-3 pe-8 font-bold text-brand outline-none focus:border-brand">
            {Object.entries(q.filters).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-brand" />
        </label>
        <span className="text-slate-400">{q.order.replace("{n}", n(items.length))}</span>
      </div>

      <div className="mt-5 hidden grid-cols-[1.3fr_1.3fr_0.9fr] gap-4 rounded-xl bg-mist px-4 py-3 text-[11px] font-bold text-slate-500 md:grid">
        {q.cols.map((c) => <span key={c}>{c}</span>)}
      </div>

      <div className="mt-3 space-y-3">
        {items.length === 0 && <p className="rounded-xl bg-mist p-6 text-center text-sm text-slate-500">{q.empty}</p>}
        {items.map((it) => {
          const decided = decisions[it.id];
          const selected = it.id === selectedId;
          return (
            <div key={it.id} onClick={() => onSelect(it.id)} className={`grid cursor-pointer gap-4 rounded-xl border p-4 md:grid-cols-[1.3fr_1.3fr_0.9fr] md:items-center ${selected ? "border-brand bg-brand-soft/40" : "border-slate-200 bg-white hover:bg-mist/60"}`}>
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand">{it.name[0]}</span>
                <div>
                  <p className="font-bold">{it.name}</p>
                  <p className="text-xs text-slate-500">{it.role}</p>
                  <p className="mt-2 text-xs text-slate-500">{it.date} · {it.doc}</p>
                  <span className={`mt-2 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${decided === "approved" ? "bg-emerald-50 text-emerald-700" : decided === "rejected" ? "bg-red-50 text-red-700" : selected ? "bg-brand-soft text-brand" : "bg-amber-50 text-amber-700"}`}>
                    {decided ? status[decided] : selected ? q.selected : q.pendingReview}
                  </span>
                </div>
              </div>
              <div>
                <DocPreview item={it} />
                <p className="mt-1.5 text-[10px] text-slate-400">{q.previewNote}</p>
              </div>
              <div className="flex gap-2 md:flex-col" onClick={(e) => e.stopPropagation()}>
                <Button icon={Check} className="flex-1 py-2.5" disabled={!!decided} onClick={() => onApprove(it)}>{q.approve}</Button>
                <Button variant="danger" icon={X} className="flex-1 py-2.5" disabled={!!decided} onClick={() => onReject(it)}>{q.reject}</Button>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-slate-400">{q.showing.replace("{shown}", n(items.length)).replace("{total}", n(totalPending))}</p>
    </section>
  );
}
