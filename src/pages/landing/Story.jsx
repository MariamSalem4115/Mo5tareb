import { Star } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { IMG } from "../../data/images";
import Photo from "../../components/Photo";

export default function Story() {
  const { t } = useApp();
  const s = t.story;
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 text-center">
      <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">{s.badge}</span>
      <blockquote className="mt-6 text-2xl font-bold leading-[1.7] md:text-3xl">“{s.quote}”</blockquote>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Photo src={IMG.nour} alt={s.name} className="size-10 rounded-full" />
        <div className="text-start">
          <p className="text-sm font-bold">{s.name}</p>
          <p className="text-xs text-slate-500">{s.meta}</p>
        </div>
      </div>
      <p className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500">
        <span className="flex">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={13} className="fill-amber-500 text-amber-500" />)}</span>
        {s.note}
      </p>
    </section>
  );
}
