import { useState } from "react";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import SimpleFooter from "../components/SimpleFooter";
import StaysList from "./reviews/StaysList";
import ReceivedList from "./reviews/ReceivedList";
import InfoNote from "./reviews/InfoNote";

// "My reviews & stays" page: your past stays (with a "Write a review" button) and the reviews you received.
export default function Reviews() {
  const { role } = useApp();
  return (
    <div className="flex min-h-screen flex-col bg-mist">
      <Navbar />
      <main className="flex-1">
        {/* key={role}: start fresh when the role changes (same trick as the dashboard) */}
        <ReviewsBody key={role} />
      </main>
      <SimpleFooter />
    </div>
  );
}

function ReviewsBody() {
  const { t, go } = useApp();
  const p = t.staysPage;
  const [tab, setTab] = useState("stays");

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-5 py-8">
      <nav aria-label={p.crumbs.current} className="flex items-center gap-2 text-xs text-slate-500">
        <button type="button" onClick={() => go("dashboard")} className="font-semibold hover:text-brand">{p.crumbs.account}</button>
        <span aria-hidden="true">/</span>
        <span className="font-bold text-ink">{p.crumbs.current}</span>
      </nav>

      <div>
        <h1 className="text-3xl font-extrabold">{p.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{p.sub}</p>
      </div>

      <div role="tablist" className="flex flex-wrap gap-2">
        {["stays", "received"].map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`rounded-xl border px-4 py-2 text-sm font-bold ${tab === id ? "border-brand bg-brand text-white" : "border-slate-200 bg-white text-brand hover:border-brand/40"}`}
          >
            {p.tabs[id]}
          </button>
        ))}
      </div>

      <div role="tabpanel">{tab === "stays" ? <StaysList /> : <ReceivedList />}</div>

      <InfoNote />
    </div>
  );
}
