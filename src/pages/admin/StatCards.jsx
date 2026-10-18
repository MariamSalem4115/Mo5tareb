import { BadgeCheck, Clock, FileText, Flag } from "lucide-react";
import { useApp } from "../../context/AppContext";

const ICONS = [FileText, Flag, BadgeCheck, Clock];

// Four number cards. values = the big numbers, already formatted.
export default function StatCards({ values }) {
  const { t } = useApp();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {t.admin.stats.map((s, i) => {
        const Icon = ICONS[i];
        return (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <Icon size={18} className="text-brand" />
            <p className="mt-3 text-sm text-slate-500">{s.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-brand">{values[i]}</p>
            <p className="mt-2 text-xs text-slate-400">{s.note}</p>
          </div>
        );
      })}
    </div>
  );
}
