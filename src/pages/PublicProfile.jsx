import { useState } from "react";
import { Eye } from "lucide-react";
import { useApp } from "../context/AppContext";
import { DASH } from "../data/dashboard";
import { fill } from "../utils/format";
import { IMG } from "../data/images";
import { PEOPLE } from "../data/roommates";
import { LANDLORDS, LISTINGS } from "../data/listings";
import PageFrame from "../components/PageFrame";
import Button from "../components/Button";
import ProfileTop from "./publicProfile/ProfileTop";
import AboutCard from "./publicProfile/AboutCard";
import ReviewsSection from "./publicProfile/ReviewsSection";
import ListingsSection from "./publicProfile/ListingsSection";
import SideCards from "./publicProfile/SideCards";

// Public profile: what OTHER people see about someone.
//  From the dashboard ("View public profile")   -> your own profile, as a preview.
//  From the Roommates page (go("publicProfile", { personId })) -> that student's profile.
// Documents, phone numbers and addresses are never shown here.
export default function PublicProfile() {
  const { viewData, role, loggedIn } = useApp();
  // key makes React start fresh when you open a different profile (so the "request sent" state doesn't carry over)
  return (
    <PageFrame>
      <ProfileBody key={`${viewData?.personId ?? viewData?.landlordId ?? "me"}-${role}-${loggedIn}`} />
    </PageFrame>
  );
}

// Builds one simple object ("subject") that the cards below can show,
// whether it is you or one of the sample students.
function useSubject() {
  const { t, n, year, lang, role, viewData, profile, displayName } = useApp();
  const pp = t.publicProfile;
  const d = t.dashboard;
  const monthYear = (date) => date.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", { month: "long", year: "numeric" });

  // A landlord (opened from the Listing details page): name and bio from t.listings, their homes from data/listings.js.
  const landlord = LANDLORDS.find((l) => l.id === viewData?.landlordId);
  if (landlord) {
    const text = t.listings.landlords[landlord.id];
    return {
      own: false,
      role: "landowner",
      name: text.name,
      avatar: IMG[landlord.img],
      headline: fill(t.listings.landlord.headline, { year: year(landlord.since) }),
      bio: text.bio,
      options: [],
      rating: landlord.rating,
      count: landlord.reviews,
      // Simulation: sample reviews written by tenants (the backend will send the real ones)
      reviews: t.listingPage.students.sample.slice(0, 2).map((r) => ({ name: r.name, date: r.date, rating: r.rating, tag: t.listings.landlord.tenant, quote: r.quote })),
      facts: [[t.listings.landlord.properties, n(landlord.properties)], [t.listings.landlord.since, year(landlord.since)]],
      listingIds: LISTINGS.filter((l) => LANDLORDS[l.landlord].id === landlord.id).map((l) => l.id),
    };
  }

  const personIndex = PEOPLE.findIndex((p) => p.id === viewData?.personId);
  if (personIndex >= 0) {
    const person = PEOPLE[personIndex];
    const text = t.roommatesPage.people[personIndex];
    const university = t.register.universities[person.university];
    const year = d.bio.years[person.year];
    return {
      own: false,
      role: "student",
      name: text.name,
      avatar: IMG[person.img],
      headline: `${university} · ${year}`,
      bio: text.bio,
      options: person.options,
      rating: person.rating,
      count: person.reviews,
      reviews: pp.sampleReviews.slice(0, Math.min(3, person.reviews)),
      facts: [
        [pp.facts.university, university],
        [pp.facts.year, year],
        [pp.facts.field, text.field],
        [pp.facts.city, text.city],
        [pp.facts.looking, pp.facts.group[person.group]],
        [pp.facts.since, monthYear(person.since)],
      ],
      budget: person.budget,
    };
  }

  // Your own profile. The bio and lifestyle are the same samples the Bio card starts with;
  // the backend will send the saved ones later.
  const university = d.university;
  return {
    own: true,
    role,
    name: displayName,
    avatar: profile.avatar,
    headline: role === "student" ? `${university} · ${d.bio.years[d.bio.defaultYear]}` : d.landownerLine,
    bio: d.bio.initial[role],
    options: d.bio.defaultOptions,
    rating: DASH.rating,
    count: DASH.ratingsCount,
    reviews: d.reviews.data[role].received,
    facts: [
      ...(role === "student" ? [[pp.facts.university, university], [pp.facts.year, d.bio.years[d.bio.defaultYear]]] : []),
      [pp.facts.since, monthYear(new Date(2026, 8, 1))],
    ],
  };
}

function ProfileBody() {
  const { t, go, loggedIn } = useApp();
  const pp = t.publicProfile;
  const subject = useSubject();
  const [sent, setSent] = useState(false); // "request sent" (only in memory for now)

  // Simulation: the backend will really send the request later. Visitors must log in first.
  const connect = () => (loggedIn ? setSent(true) : go("login"));

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:py-10">
      <nav aria-label={pp.crumbs.current} className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        {subject.own ? (
          <button type="button" onClick={() => go("dashboard")} className="font-semibold hover:text-brand">{pp.crumbs.account}</button>
        ) : (
          subject.role === "landowner" ? (
          <button type="button" onClick={() => go("search")} className="font-semibold hover:text-brand">{t.nav.housing}</button>
        ) : (
          <button type="button" onClick={() => go("roommates")} className="font-semibold hover:text-brand">{pp.crumbs.roommates}</button>
        )
        )}
        <span aria-hidden="true">/</span>
        <span className="font-bold text-ink">{subject.own ? pp.crumbs.current : subject.name}</span>
      </nav>

      {subject.own && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-brand-soft p-4">
          <p className="flex items-center gap-2.5 text-xs font-semibold leading-6 text-slate-700">
            <Eye size={16} className="shrink-0 text-brand" />
            {pp.preview.text}
          </p>
          <Button variant="outline" className="py-2 text-xs" onClick={() => go("dashboard")}>{pp.preview.back}</Button>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-6">
          <ProfileTop subject={subject} sent={sent} onConnect={connect} />
          <AboutCard subject={subject} />
          <ReviewsSection subject={subject} />
          {subject.role === "landowner" && <ListingsSection ids={subject.listingIds ?? ["dokki", "giza"]} />}
        </div>
        <SideCards subject={subject} />
      </div>
    </div>
  );
}
