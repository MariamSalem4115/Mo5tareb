import { useState } from "react";
import { CircleCheck, Heart, MapPin, Share2, Star } from "lucide-react";
import { useApp } from "../context/AppContext";
import { fill } from "../utils/format";
import { listingView } from "../utils/listingView";
import { getListing } from "../services/listings";
import PageFrame from "../components/PageFrame";
import Button from "../components/Button";
import Gallery from "./listing/Gallery";
import AboutCard from "./listing/AboutCard";
import HouseRules from "./listing/HouseRules";
import Neighborhood from "./listing/Neighborhood";
import StudentReviews from "./listing/StudentReviews";
import PriceCard from "./listing/PriceCard";
import LandlordCard from "./listing/LandlordCard";
import ContactCard from "./listing/ContactCard";
import ReportBar from "./listing/ReportBar";

// Listing details. Opened with go("listing", { listingId: "dokki" }).
// If no id is given (or it is unknown) the first home is shown, so the page never breaks.
export default function Listing() {
  const { viewData, loggedIn, role, verified } = useApp();
  const listing = getListing(viewData?.listingId) ?? getListing("dokki");
  // key: start fresh (photo, "revealed number", reviews) when another home or another kind of visitor opens the page
  return (
    <PageFrame>
      <ListingBody key={`${listing.id}-${loggedIn}-${role}-${verified}`} listing={listing} />
    </PageFrame>
  );
}

const STARS = [0, 1, 2, 3, 4];

function ListingBody({ listing }) {
  const { t, n, rate, go, savedIds, toggleSaved } = useApp();
  const p = t.listingPage;
  const home = listingView(t, n, listing);
  const saved = savedIds.includes(home.id);
  const [copied, setCopied] = useState(false);

  // Share: the phone's share sheet when there is one, otherwise copy the link.
  // Simulation: there is no router yet, so the link is the site's address. The backend/router will give every home its own link.
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: home.title, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* the person closed the share sheet: nothing to do */
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <nav aria-label={p.crumbs.housing} className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <button type="button" onClick={() => go("search", { uni: home.uni })} className="font-semibold hover:text-brand">{p.crumbs.housing}</button>
        <span aria-hidden="true">/</span>
        <span className="font-semibold">{home.university}</span>
        <span aria-hidden="true">/</span>
        <span className="font-bold text-ink">{home.area.split(/[,،]/)[0]}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${home.verified ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
            <CircleCheck size={12} /> {home.verified ? p.verified : p.unverified}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">{home.title}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="flex text-amber-500" aria-hidden="true">{STARS.map((i) => <Star key={i} size={13} fill="currentColor" />)}</span>
              {fill(p.rating, { avg: rate(home.rating), count: n(home.reviews) })}
            </span>
            <span className="inline-flex items-center gap-1"><MapPin size={13} className="text-brand" /> {home.area} · {fill(p.walk, { min: n(home.walk), uni: home.university })}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" icon={Heart} aria-pressed={saved} className={saved ? "[&_svg]:fill-brand" : ""} onClick={() => toggleSaved(home.id)}>{saved ? p.saved : p.save}</Button>
          <Button variant="outline" icon={Share2} onClick={share}>{copied ? p.copied : p.share}</Button>
        </div>
      </div>

      <div className="mt-6"><Gallery home={home} /></div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-6">
          <AboutCard home={home} />
          <HouseRules home={home} />
          <Neighborhood home={home} />
          <StudentReviews home={home} />
          <ReportBar home={home} />
        </div>
        <aside className="min-w-0 space-y-6">
          <PriceCard home={home} />
          <LandlordCard home={home} />
          <ContactCard home={home} />
        </aside>
      </div>
    </div>
  );
}
