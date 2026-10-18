import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import Button from "../../components/Button";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
import BioCard from "./BioCard";
import VerificationCard from "./VerificationCard";
import ReviewsCard from "./ReviewsCard";
import ListingsCard from "./ListingsCard";

// The whole dashboard: sidebar on one side, the cards on the other.
// It keeps the few things that two cards need to share (like the saved university year).
export default function DashboardBody() {
  const { t, role, go, displayName } = useApp();
  const d = t.dashboard;
  const isOwner = role === "landowner";

  const [active, setActive] = useState("profile"); // highlighted sidebar item
  const [savedYear, setSavedYear] = useState(d.bio.defaultYear); // set by BioCard, shown by ProfileHeader

  // Sidebar items. "Listings" exists for landowners only.
  const sections = ["profile", "verification", "reviews", ...(isOwner ? ["listings"] : [])];

  const openSection = (id) => {
    setActive(id);
    document.getElementById(`dash-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 lg:grid-cols-[220px_1fr] lg:gap-8">
      <Sidebar sections={sections} active={active} onSelect={openSection} />

      <div className="min-w-0 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">{fill(d.hello, { name: displayName.split(" ")[0] })}</h1>
            <p className="mt-1 text-sm text-slate-500">{d.sub[role]}</p>
          </div>
          <Button variant="outline" onClick={() => go("publicProfile")}>{d.viewPublic}</Button>
        </div>

        <section id="dash-profile" className="scroll-mt-24 space-y-6">
          <ProfileHeader savedYear={savedYear} />
          <div className="grid gap-6 xl:grid-cols-2">
            <BioCard onSaved={setSavedYear} />
            <div id="dash-verification" className="scroll-mt-24">
              <VerificationCard />
            </div>
          </div>
        </section>

        <div id="dash-reviews" className="scroll-mt-24">
          <ReviewsCard />
        </div>

        {isOwner && (
          <div id="dash-listings" className="scroll-mt-24">
            <ListingsCard />
          </div>
        )}

        {isOwner && <p className="text-xs text-slate-500">{d.listings.footNote}</p>}
      </div>
    </div>
  );
}

