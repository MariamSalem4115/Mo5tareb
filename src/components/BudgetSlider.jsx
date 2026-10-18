import { BUDGET } from "../data/listings";

const pct = (v) => ((v - BUDGET.min) / (BUDGET.max - BUDGET.min)) * 100;

// Two-handle budget slider (monthly rent in EGP). The two handles can never cross: they stay BUDGET.gap apart.
// min / max = current values, onChange(min, max) reports every move. The styles are the .dual-range block in index.css.
export default function BudgetSlider({ min, max, onChange, label }) {
  return (
    <div className="dual-range">
      <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded bg-slate-200" />
      <div className="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-brand" style={{ insetInlineStart: `${pct(min)}%`, insetInlineEnd: `${100 - pct(max)}%` }} />
      <input type="range" aria-label={label} min={BUDGET.min} max={BUDGET.max} step={BUDGET.step} value={min} onChange={(e) => onChange(Math.min(+e.target.value, max - BUDGET.gap), max)} />
      <input type="range" aria-label={label} min={BUDGET.min} max={BUDGET.max} step={BUDGET.step} value={max} onChange={(e) => onChange(min, Math.max(+e.target.value, min + BUDGET.gap))} />
    </div>
  );
}
