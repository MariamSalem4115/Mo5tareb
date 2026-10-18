import { Key, Search, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";

const icons = [Search, ShieldCheck, Key];

export default function Steps() {
  const { t, n } = useApp();
  const s = t.steps;
  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <p className="text-xs font-bold text-brand">{s.eyebrow}</p>
      <h2 className="mt-1 text-3xl font-extrabold">{s.title}</h2>
      <p className="mt-1 text-sm text-slate-500">{s.sub}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {s.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div key={item.title} className="rounded-2xl bg-mist p-6">
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand"><Icon size={20} /></span>
                <span className="text-xs font-bold text-brand/50">{n(i + 1)}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
