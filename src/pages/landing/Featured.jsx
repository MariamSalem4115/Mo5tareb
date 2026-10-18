import { ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { IMG } from "../../data/images";
import { FEATURED_IDS } from "../../data/listings";
import { getListing } from "../../services/listings";
import { cardItem } from "../../utils/listingView";
import Button from "../../components/Button";
import ListingCard from "../../components/ListingCard";

export default function Featured() {
  const { t, n, go } = useApp();
  const f = t.featured;
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-brand">{f.eyebrow}</p>
          <h2 className="mt-1 text-3xl font-extrabold">{f.title}</h2>
          <p className="mt-1 text-sm text-slate-500">{f.sub}</p>
        </div>
        <Button variant="outline" icon={ArrowRight} flip onClick={() => go("search")}>{f.all}</Button>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {FEATURED_IDS.map(getListing).map((l) => <ListingCard key={l.id} item={cardItem(t, n, l)} img={IMG.rooms[l.photos[0]]} />)}
      </div>
    </section>
  );
}
