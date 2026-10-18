import { CircleCheck, Star } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { IMG } from "../../data/images";
import Button from "../../components/Button";
import PersonAvatar from "../../components/PersonAvatar";

const STARS = [0, 1, 2, 3, 4];

// "Meet your landlord": photo, name, verification, rating and a link to the public profile.
export default function LandlordCard({ home }) {
  const { t, n, rate, year, go } = useApp();
  const l = t.listingPage.landlord;
  const who = home.landlordInfo;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-extrabold">{l.title}</h2>
      <div className="mt-4 flex items-center gap-4">
        <PersonAvatar src={IMG[who.img]} name={who.name} className="size-14 text-xl" />
        <div className="min-w-0">
          <p className="truncate font-extrabold">{who.name}</p>
          <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${who.verified ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
            <CircleCheck size={12} /> {who.verified ? l.identity : l.notVerified}
          </span>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
        <span className="flex text-amber-500" aria-hidden="true">{STARS.map((i) => <Star key={i} size={13} fill="currentColor" />)}</span>
        {fill(t.listingPage.rating, { avg: rate(who.rating), count: n(who.reviews) })}
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div><dt className="text-slate-500">{l.properties}</dt><dd className="font-bold">{n(who.properties)}</dd></div>
        <div><dt className="text-slate-500">{l.since}</dt><dd className="font-bold">{year(who.since)}</dd></div>
      </dl>
      <p className="mt-4 text-xs text-slate-500">{who.response}</p>
      <Button variant="outline" className="mt-4 w-full py-2.5 text-xs" onClick={() => go("publicProfile", { landlordId: who.id })}>{l.view}</Button>
    </section>
  );
}
