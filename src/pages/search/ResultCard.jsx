import { CircleCheck, Heart, Star, User } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { IMG } from "../../data/images";
import Photo from "../../components/Photo";

// One home in the results list: photo on one side, details on the other.
//  home = a home with its words (listingView), selected = it is the one picked on the map,
//  onHover(id | null) lets the map highlight its pin.
export default function ResultCard({ home, selected, onHover }) {
  const { t, n, rate, money, go, savedIds, toggleSaved } = useApp();
  const r = t.searchPage.results;
  const saved = savedIds.includes(home.id);

  return (
    <article
      id={`result-${home.id}`}
      onMouseEnter={() => onHover(home.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => go("listing", { listingId: home.id })}
      className={`flex cursor-pointer overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-md ${selected ? "border-brand ring-2 ring-brand/20" : "border-slate-200"}`}
    >
      <div className="relative w-2/5 shrink-0">
        <Photo src={IMG.rooms[home.photos[0]]} alt={home.title} className="h-full min-h-44 w-full" />
        <button
          type="button"
          aria-label={fill(r.fav, { title: home.title })}
          aria-pressed={saved}
          onClick={(e) => { e.stopPropagation(); toggleSaved(home.id); }}
          className="absolute end-3 top-3 grid size-8 place-items-center rounded-full bg-white"
        >
          <Heart size={16} className={saved ? "fill-brand text-brand" : "text-ink"} />
        </button>
        {home.boosted && <span className="absolute start-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold text-white">{r.featured}</span>}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${home.verified ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
            <CircleCheck size={12} /> {home.verified ? t.featured.verified : t.listings.unverified}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold">
            <Star size={12} className="fill-amber-400 text-amber-400" /> {rate(home.rating)}
          </span>
        </div>
        <h3 className="mt-3 font-bold leading-snug">{home.title}</h3>
        <p className="mt-1.5 text-xs text-slate-500">{home.area} · {home.typeLabel}</p>
        <p className="mt-1 text-xs text-slate-500">{home.distance}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <p className="text-xl font-extrabold text-brand">
            {money(home.price)} <span className="text-xs font-normal text-slate-400">{t.featured.perMonth}</span>
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500"><User size={12} className="text-brand" /> {home.genderLabel}</span>
        </div>
      </div>
    </article>
  );
}
