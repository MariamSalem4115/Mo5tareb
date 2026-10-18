import { useState } from "react";
import { Star } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { IMG } from "../../data/images";
import Button from "../../components/Button";
import PersonAvatar from "../../components/PersonAvatar";

const PHOTO_OF = { 0: IMG.mariam, 1: IMG.nour }; // the first two sample students have a photo, the rest show their first letter
const STARS = [0, 1, 2, 3, 4];

// "What students say": the average rating and a few reviews; "Read all" shows the rest.
// Simulation: these are 4 sample reviews. The backend will send the real ones page by page (GET /api/listings/:id/reviews).
export default function StudentReviews({ home }) {
  const { t, n, rate } = useApp();
  const p = t.listingPage.students;
  const [all, setAll] = useState(false);
  const list = all ? p.sample : p.sample.slice(0, 2);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-extrabold">{p.title}</h2>
      <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        <span className="flex text-amber-500" aria-hidden="true">{STARS.map((i) => <Star key={i} size={14} fill="currentColor" />)}</span>
        {fill(t.listingPage.rating, { avg: rate(home.rating), count: n(home.reviews) })}
      </p>

      <ul className="mt-5 divide-y divide-slate-100">
        {list.map((r, i) => (
          <li key={r.name} className="py-4 first:pt-0">
            <div className="flex items-center gap-3">
              <PersonAvatar src={PHOTO_OF[i]} name={r.name} className="size-10 text-sm" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-extrabold">{r.name}</p>
                <p className="text-[11px] text-slate-500">{r.meta} · {r.date}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700"><Star size={12} fill="currentColor" /> {rate(r.rating)}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">{r.quote}</p>
          </li>
        ))}
      </ul>

      <Button variant="outline" className="mt-2" aria-expanded={all} onClick={() => setAll(!all)}>
        {all ? p.fewer : fill(p.readAll, { n: n(home.reviews) })}
      </Button>
    </section>
  );
}
