import { ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { IMG } from "../../data/images";
import Photo from "../../components/Photo";

export default function Campuses() {
  const { t, n, go } = useApp();
  const c = t.campus;
  return (
    <section className="bg-mist py-16">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs font-bold text-brand">{c.eyebrow}</p>
        <h2 className="mt-1 text-3xl font-extrabold">{c.title}</h2>
        <p className="mt-1 text-sm text-slate-500">{c.sub}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {c.items.map((u, i) => (
            <button key={u.name} type="button" onClick={() => go("search", { uni: i })} className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-start transition-shadow hover:shadow-md">
              <Photo src={IMG.campuses[i]} alt={u.name} className="h-40 w-full" />
              <div className="flex items-end justify-between p-4">
                <div>
                  <h3 className="font-bold">{u.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">{u.area}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-brand">
                  {n(u.count)} {c.homes} <ArrowRight size={13} className="rtl:-scale-x-100" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
