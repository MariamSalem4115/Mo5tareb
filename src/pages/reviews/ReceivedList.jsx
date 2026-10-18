import { Star } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { DASH } from "../../data/dashboard";
import ReviewCard from "../../components/ReviewCard";

// Reviews other people wrote about you, plus your average rating.
export default function ReceivedList() {
  const { t, n, rate, role } = useApp();
  const list = t.dashboard.reviews.data[role].received;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <p className="mb-4 flex items-center gap-2 text-sm font-bold">
        <Star size={18} className="text-amber-500" fill="currentColor" />
        {fill(t.staysPage.summary, { avg: rate(DASH.rating), count: n(DASH.ratingsCount) })}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((review) => <ReviewCard key={review.name} review={review} />)}
      </div>
    </div>
  );
}
