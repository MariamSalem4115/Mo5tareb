import { CircleCheck, Lock } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";

// Side column: quick facts and what was verified.
export default function SideCards({ subject }) {
  const { t, money } = useApp();
  const pp = t.publicProfile;
  const isOwner = subject.role === "landowner";
  const facts = [...subject.facts];
  if (subject.budget) facts.splice(facts.length - 1, 0, [pp.facts.budget, fill(t.roommatesPage.filters.budgetUpTo, { amount: money(subject.budget) })]);

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="text-base font-extrabold">{pp.facts.title}</h2>
        <dl className="mt-4 space-y-3">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] text-slate-500">{label}</dt>
              <dd className="text-sm font-bold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="text-base font-extrabold">{pp.trust.title}</h2>
        <ul className="mt-3 space-y-2.5 text-xs font-semibold text-slate-700">
          <li className="flex items-center gap-2"><CircleCheck size={16} className="shrink-0 text-emerald-600" /> {isOwner ? pp.trust.owner : pp.trust.identity}</li>
          {!isOwner && <li className="flex items-center gap-2"><CircleCheck size={16} className="shrink-0 text-emerald-600" /> {pp.trust.student}</li>}
        </ul>
        <p className="mt-4 flex items-start gap-2 rounded-2xl bg-brand-soft p-3 text-[11px] leading-6 text-slate-600">
          <Lock size={14} className="mt-1 shrink-0 text-brand" /> {pp.trust.privacy}
        </p>
      </div>
    </aside>
  );
}
