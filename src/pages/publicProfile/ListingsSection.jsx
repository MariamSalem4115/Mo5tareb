import { useApp } from "../../context/AppContext";
import { IMG } from "../../data/images";
import ListingCard from "../../components/ListingCard";
import { getListing } from "../../services/listings";
import { cardItem } from "../../utils/listingView";

// For landowners: the places they currently offer. ids = the ids of their homes (data/listings.js).
export default function ListingsSection({ ids }) {
  const { t, n } = useApp();
  const l = t.publicProfile.listings;
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-extrabold">{l.title}</h2>
      <p className="mb-5 mt-1 text-sm text-slate-500">{l.sub}</p>
      <div className="grid gap-5 md:grid-cols-2">
        {ids.map(getListing).filter(Boolean).map((l) => <ListingCard key={l.id} item={cardItem(t, n, l)} img={IMG.rooms[l.photos[0]]} />)}
      </div>
    </section>
  );
}
