import { CircleCheck, Users } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { IMG } from "../../data/images";
import Button from "../../components/Button";
import Photo from "../../components/Photo";

export default function Roommate() {
  const { t, go } = useApp();
  const r = t.roommate;
  return (
    <section className="bg-brand-soft py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold text-brand">{r.eyebrow}</p>
          <h2 className="mt-1 text-3xl font-extrabold">{r.title}</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">{r.text}</p>
          <Button icon={Users} className="mt-6" onClick={() => go("roommates")}>{r.button}</Button>
          <p className="mt-4 text-xs text-slate-500">{r.note}</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Photo src={IMG.mariam} alt={r.name} className="size-16 rounded-full" />
            <div>
              <h3 className="text-lg font-bold">{r.name}</h3>
              <p className="text-xs text-slate-500">{r.meta}</p>
              <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                <CircleCheck size={13} /> {r.verified}
              </span>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">“{r.quote}”</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {r.tags.map((tag) => <span key={tag} className="rounded-full bg-mist px-3 py-1 text-xs text-slate-600">{tag}</span>)}
          </div>
          <Button variant="outline" className="mt-5 w-full" onClick={() => go("publicProfile", { personId: "mariam" })}>{r.profile}</Button>
        </div>
      </div>
    </section>
  );
}
