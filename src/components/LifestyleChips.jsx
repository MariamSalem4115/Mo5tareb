import { useApp } from "../context/AppContext";

// Small read-only pills for lifestyle choices.
// options = positions in t.dashboard.bio.options (the same list the Bio card uses).
export default function LifestyleChips({ options, className = "" }) {
  const { t } = useApp();
  const labels = t.dashboard.bio.options;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((i) => (
        <span key={i} className="rounded-full bg-brand-soft px-3 py-1 text-[11px] font-bold text-brand">{labels[i]}</span>
      ))}
    </div>
  );
}
