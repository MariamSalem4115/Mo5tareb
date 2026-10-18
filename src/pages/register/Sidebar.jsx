import { Lock } from "lucide-react";
import { useApp } from "../../context/AppContext";

// Reassurance column: privacy note, "what happens next", disclaimer.
export default function Sidebar() {
  const { t, n } = useApp();
  const r = t.register;
  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl bg-brand-soft p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-brand"><Lock size={16} /> {r.sidePrivacyTitle}</p>
        <p className="mt-2 text-xs leading-6 text-slate-600">{r.sidePrivacyText}</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-extrabold">{r.nextTitle}</h2>
        <ol className="mt-4 space-y-4">
          {r.steps.map((s, i) => (
            <li key={s.title}>
              <p className="text-sm font-bold text-brand">{n(0)}{n(i + 1)} {s.title}</p>
              <p className="mt-1 text-xs leading-6 text-slate-500">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="px-1 text-xs leading-6 text-slate-500">{r.sideNote}</p>
    </aside>
  );
}
