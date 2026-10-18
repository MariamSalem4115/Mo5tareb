import { Eye, Flag, Lock, ScrollText, Siren } from "lucide-react";
import { useApp } from "../../context/AppContext";

// One icon per tip, in the same order as the tips in i18n/supportPage.js.
const TIP_ICONS = [Eye, ScrollText, Lock, Flag];

// Safety centre: four habits that keep students safe, and the emergency numbers.
export default function SafetyCentre() {
  const { t } = useApp();
  const s = t.supportPage.safety;
  return (
    <section id="support-safety" className="mt-8 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
      <h2 className="text-xl font-extrabold">{s.title}</h2>
      <p className="mb-6 mt-1 text-xs text-slate-500">{s.sub}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {s.tips.map((tip, i) => {
          const Icon = TIP_ICONS[i];
          return (
            <div key={tip.title} className="rounded-2xl bg-mist p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-white text-brand"><Icon size={18} /></span>
              <h3 className="mt-3 text-sm font-extrabold">{tip.title}</h3>
              <p className="mt-1 text-xs leading-6 text-slate-500">{tip.text}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-5 flex items-center gap-3 rounded-2xl bg-brand-soft p-4 text-xs font-semibold leading-6 text-slate-700">
        <Siren size={18} className="shrink-0 text-brand" />
        {s.emergency}
      </p>
    </section>
  );
}
