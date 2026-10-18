import { ArrowRight, CircleCheck, GraduationCap, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { IMG } from "../../data/images";
import Button from "../../components/Button";
import Photo from "../../components/Photo";

export default function Hero() {
  const { t, go } = useApp();
  const h = t.hero;
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-10 pt-10 lg:grid-cols-2 lg:pt-16">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          <ShieldCheck size={14} /> {h.badge}
        </span>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.35] md:text-5xl">{h.title}</h1>
        <p className="mt-4 max-w-md text-base leading-8 text-slate-500">{h.sub}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button icon={ArrowRight} flip onClick={() => go("search")}>{h.explore}</Button>
          <Button variant="outline" onClick={() => go("roommates")}>{h.roommate}</Button>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <div className="flex -space-x-2 rtl:space-x-reverse">
            {h.avatars.map((a) => (
              <span key={a} className="grid size-8 place-items-center rounded-full border-2 border-white bg-brand-soft text-xs font-bold text-brand">{a}</span>
            ))}
          </div>
          <div>
            <p className="text-sm font-bold">{h.proof}</p>
            <p className="text-xs text-slate-500">{h.proofSub}</p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl">
        <Photo src={IMG.hero} alt="" className="h-80 w-full lg:h-[27rem]" />
        <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-emerald-700">
          <CircleCheck size={14} /> {h.imgBadge}
        </span>
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-lg sm:end-auto sm:w-72">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><GraduationCap size={20} /></span>
          <div>
            <p className="text-sm font-bold">{h.cardTitle}</p>
            <p className="text-[11px] text-slate-500">{h.cardSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
