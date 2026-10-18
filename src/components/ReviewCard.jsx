import { Star } from "lucide-react";
import { useApp } from "../context/AppContext";
import Avatar from "./Avatar";

// One review: who wrote it, the stars, the relationship tag and the quote.
// review = { name, date, rating, tag, quote, back? } (see i18n/dashboard.js)
export default function ReviewCard({ review }) {
  const { rate } = useApp();
  return (
    <article className="rounded-2xl bg-mist p-5">
      <div className="flex items-center gap-3">
        <Avatar name={review.name} className="size-10 text-sm" />
        <div>
          <h3 className="text-sm font-extrabold">{review.name}</h3>
          <p className="flex items-center gap-1 text-[11px] text-slate-500">
            {review.date} · <Star size={11} className="text-amber-500" fill="currentColor" /> {rate(review.rating)}
          </p>
        </div>
      </div>
      <p className="mt-3 text-xs font-bold text-brand">{review.tag}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">“{review.quote}”</p>
      {review.back && <p className="mt-3 border-t border-slate-200 pt-3 text-[11px] text-slate-500">{review.back}</p>}
    </article>
  );
}
