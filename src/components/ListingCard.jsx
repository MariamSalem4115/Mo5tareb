import { CircleCheck, Heart, Star, User } from "lucide-react";
import { useApp } from "../context/AppContext";
import Photo from "./Photo";

// item = { id, title, area, type, distance, price, gender, rating, verified } (build it with cardItem() in utils/listingView.js)
export default function ListingCard({ item, img }) {
  const { t, n, money, go, savedIds, toggleSaved } = useApp();
  const liked = savedIds.includes(item.id);

  return (
    <article onClick={() => go("listing", { listingId: item.id })} className="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <div className="relative">
        <Photo src={img} alt={item.title} className="h-44 w-full" />
        <button
          type="button"
          aria-label={t.misc.fav}
          aria-pressed={liked}
          onClick={(e) => { e.stopPropagation(); toggleSaved(item.id); }}
          className="absolute end-3 top-3 grid size-8 place-items-center rounded-full bg-white"
        >
          <Heart size={16} className={liked ? "fill-brand text-brand" : "text-ink"} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${item.verified ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
            <CircleCheck size={13} /> {item.verified ? t.featured.verified : t.listings.unverified}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold">
            <Star size={13} className="fill-amber-400 text-amber-400" /> {n(item.rating)}
          </span>
        </div>
        <h3 className="mt-3 font-bold">{item.title}</h3>
        <p className="mt-1.5 text-xs text-slate-500">{item.area} · {item.type}</p>
        <p className="mt-1 text-xs text-slate-500">{item.distance}</p>
        <div className="mt-3 flex items-end justify-between">
          <p className="text-xl font-extrabold text-brand">
            {money(item.price)} <span className="text-xs font-normal text-slate-400">{t.featured.perMonth}</span>
          </p>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500"><User size={13} className="text-brand" /> {item.gender}</span>
        </div>
      </div>
    </article>
  );
}
