import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { BUDGET_STEPS } from "../../data/roommates";
import SelectField from "../../components/SelectField";
import Button from "../../components/Button";

// The filter box. filters = { university, budget, group, options }, onChange(newFilters) reports every change.
export default function Filters({ filters, onChange, onReset }) {
  const { t, money } = useApp();
  const f = t.roommatesPage.filters;
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });
  const toggle = (i) =>
    onChange({ ...filters, options: filters.options.includes(i) ? filters.options.filter((x) => x !== i) : [...filters.options, i] });

  const universities = t.register.universities.slice(0, -1).map((label, i) => ({ value: String(i), label })); // without "Another university"
  const budgets = BUDGET_STEPS.map((v) => ({ value: String(v), label: fill(f.budgetUpTo, { amount: money(v) }) }));
  const groups = f.groups.map((g) => ({ value: g.id, label: g.label }));

  return (
    <aside className="h-fit space-y-4 rounded-3xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
      <h2 className="text-base font-extrabold">{f.title}</h2>
      <SelectField label={f.university} options={universities} placeholder={f.universityAll} value={filters.university} onChange={set("university")} />
      <SelectField label={f.budget} options={budgets} placeholder={f.budgetAny} value={filters.budget} onChange={set("budget")} />
      <SelectField label={f.group} options={groups} placeholder={f.groupAll} value={filters.group} onChange={set("group")} />

      <div role="group" aria-label={f.lifestyle}>
        <p className="mb-2 text-sm font-bold">{f.lifestyle}</p>
        <div className="flex flex-wrap gap-2">
          {t.dashboard.bio.options.map((label, i) => {
            const on = filters.options.includes(i);
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-bold ${on ? "border-brand-soft bg-brand-soft text-brand" : "border-slate-200 bg-white text-slate-500 hover:border-brand/40"}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <Button variant="outline" className="w-full py-2.5 text-xs" onClick={onReset}>{f.reset}</Button>
    </aside>
  );
}
