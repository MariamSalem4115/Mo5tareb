import { CircleHelp, House, ShieldCheck, Star, User } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button";

const ICONS = { profile: User, verification: ShieldCheck, reviews: Star, listings: House };

// Left menu. On phones it becomes a row you can swipe sideways.
// sections = list of ids to show, active = highlighted id, onSelect(id) = scroll there.
export default function Sidebar({ sections, active, onSelect }) {
  const { t, goSection } = useApp();
  const d = t.dashboard;

  return (
    <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
      <p className="mb-3 hidden text-xs font-bold text-slate-500 lg:block">{d.workspace}</p>

      <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0" aria-label={d.workspace}>
        {sections.map((id) => {
          const Icon = ICONS[id];
          const on = active === id;
          return (
            <button
              key={id}
              type="button"
              aria-current={on ? "true" : undefined}
              onClick={() => onSelect(id)}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold whitespace-nowrap ${on ? "bg-brand-soft text-brand" : "bg-white text-slate-600 hover:text-ink"}`}
            >
              <Icon size={16} />
              {d.nav[id]}
            </button>
          );
        })}
      </nav>

      <div className="mt-5 hidden rounded-2xl border border-slate-200 bg-white p-4 lg:block">
        <CircleHelp size={18} className="text-brand" />
        <h2 className="mt-3 text-sm font-extrabold">{d.help.title}</h2>
        <p className="mb-4 mt-1 text-xs leading-relaxed text-slate-500">{d.help.text}</p>
        <Button variant="outline" className="w-full py-2 text-xs" onClick={() => goSection("support", "support-contact")}>{d.help.button}</Button>
      </div>
    </aside>
  );
}
