import { Star } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import ReviewCard from "../../components/ReviewCard";

// Average rating plus the reviews other people wrote.
export default function ReviewsSection({ subject }) {
  const { t, n, rate } = useApp();
  const r = t.publicProfile.reviews;
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-extrabold">{r.title}</h2>
      <p className="mb-4 mt-3 flex items-center gap-2 text-sm font-bold">
        <Star size={18} className="text-amber-500" fill="currentColor" />
        {fill(t.publicProfile.rating, { avg: rate(subject.rating), count: n(subject.count) })}
      </p>
      {subject.reviews.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {subject.reviews.map((review) => <ReviewCard key={review.name} review={review} />)}
        </div>
      ) : (
        <p className="text-sm text-slate-500">{r.none}</p>
      )}
    </section>
  );
}
