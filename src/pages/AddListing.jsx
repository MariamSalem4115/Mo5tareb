import { useState } from "react";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import SimpleFooter from "../components/SimpleFooter";
import ListingForm from "./addListing/ListingForm";
import Success from "./addListing/Success";
import NotAllowed from "./addListing/NotAllowed";

// "Add listing" page (landowners only): a form with five steps, then a thank-you screen.
export default function AddListing() {
  return (
    <div className="flex min-h-screen flex-col bg-mist">
      <Navbar />
      <main className="flex-1">
        <AddListingBody />
      </main>
      <SimpleFooter />
    </div>
  );
}

function AddListingBody() {
  const { t, go, role, loggedIn } = useApp();
  const a = t.addListing;
  const [done, setDone] = useState(false); // true = the listing was sent, show the thank-you screen
  const [round, setRound] = useState(0); // goes up by one for "Add another listing"; a new key gives an empty form

  const addAnother = () => {
    setRound((r) => r + 1);
    setDone(false);
    window.scrollTo({ top: 0 });
  };
  const sent = () => {
    setDone(true);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:py-10">
      {!loggedIn || role !== "landowner" ? (
        <NotAllowed />
      ) : done ? (
        <Success onAnother={addAnother} />
      ) : (
        <>
          <nav aria-label={a.crumbs.current} className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <button type="button" onClick={() => go("dashboard")} className="font-semibold hover:text-brand">{a.crumbs.account}</button>
            <span aria-hidden="true">/</span>
            <button type="button" onClick={() => go("dashboard")} className="font-semibold hover:text-brand">{a.crumbs.listings}</button>
            <span aria-hidden="true">/</span>
            <span className="font-bold text-ink">{a.crumbs.current}</span>
          </nav>
          <h1 className="mt-6 text-3xl font-extrabold md:text-4xl">{a.title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">{a.sub}</p>
          <p className="mt-4 text-xs text-slate-500">{a.note}</p>
          <ListingForm key={round} onSubmitted={sent} />
        </>
      )}
    </div>
  );
}
