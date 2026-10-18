import { ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { DASH } from "../../data/dashboard";

// Side column: the seven steps (click one to jump to it), a note about review, and tips.
export default function Sidebar() {
  const { t, n } = useApp();
  const s = t.addListing.side;
  const jump = (step) => document.getElementById(`listing-step-${step}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <nav aria-label={s.listTitle} className="hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
        <h2 className="text-base font-extrabold">{s.listTitle}</h2>
        <ol className="mt-4 space-y-1">
          {t.addListing.steps.map((label, i) => (
            <li key={label}>
              <button type="button" onClick={() => jump(i + 1)} className="flex w-full items-center gap-3 rounded-lg py-1.5 text-start text-xs text-slate-600 hover:text-brand">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft text-[11px] font-bold text-brand">{n(i + 1)}</span>
                {label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="rounded-2xl bg-brand-soft p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-brand"><ShieldCheck size={16} /> {s.beforeTitle}</p>
        <p className="mt-2 text-xs leading-6 text-slate-600">{s.before}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-base font-extrabold">{s.tipsTitle}</h2>
        <div className="mt-3 space-y-3 text-xs leading-6 text-slate-500">
          {s.tips.map((tip) => <p key={tip}>{fill(tip, { days: n(DASH.expiryDays) })}</p>)}
        </div>
      </div>
    </aside>
  );
}
