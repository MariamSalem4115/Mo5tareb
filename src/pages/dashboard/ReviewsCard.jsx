import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { DASH } from "../../data/dashboard";
import ReviewCard from "../../components/ReviewCard";
import Button from "../../components/Button";

// "My Reviews & Ratings": two tabs (Received / Given) with the review cards of your role.
export default function ReviewsCard() {
  const { t, n, rate, role, go } = useApp();
  const r = t.dashboard.reviews;
  const [tab, setTab] = useState("received");
  const list = r.data[role][tab];

  const tabs = [
    { id: "received", label: `${r.received} · ${fill(r.average, { avg: rate(DASH.rating) })}` },
    { id: "given", label: `${r.given} · ${fill(r.count, { n: n(DASH.givenCount) })}` },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-xl font-extrabold">{r.title}</h2>
        <Button variant="outline" className="py-2 text-xs" onClick={() => go("reviews")}>{r.seeAll}</Button>
      </div>
      <p className="mb-4 mt-1 text-sm text-slate-500">{r.sub}</p>

      <div role="tablist" className="mb-4 flex flex-wrap gap-2">
        {tabs.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={tab === x.id}
            onClick={() => setTab(x.id)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${tab === x.id ? "bg-brand-soft text-brand" : "bg-mist text-slate-500 hover:text-ink"}`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="grid gap-4 md:grid-cols-2">
        {list.map((review) => <ReviewCard key={review.name} review={review} />)}
      </div>
    </section>
  );
}
