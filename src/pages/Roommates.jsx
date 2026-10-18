import { useState } from "react";
import { useApp } from "../context/AppContext";
import { fill } from "../utils/format";
import { PEOPLE } from "../data/roommates";
import PageFrame from "../components/PageFrame";
import Filters from "./roommates/Filters";
import PersonCard from "./roommates/PersonCard";
import { ShieldCheck } from "lucide-react";
import Button from "../components/Button";

// What the filters start with: nothing chosen, so everyone is shown.
const NO_FILTERS = { university: "", budget: "", group: "", options: [] };

// Roommates page: filters on one side, the students that match on the other.
export default function Roommates() {
  return (
    <PageFrame>
      <RoommatesBody />
    </PageFrame>
  );
}

function RoommatesBody() {
  const { t, n, loggedIn, go } = useApp();
  const r = t.roommatesPage;
  const [filters, setFilters] = useState(NO_FILTERS);
  const [sent, setSent] = useState([]); // ids of the students you sent a request to (only in memory for now)

  // A student is shown when they pass every filter that has a choice.
  const shown = PEOPLE.map((person, i) => ({ person, text: r.people[i] })).filter(({ person }) =>
    (!filters.university || String(person.university) === filters.university) &&
    (!filters.budget || person.budget <= Number(filters.budget)) &&
    (!filters.group || person.group === filters.group) &&
    filters.options.every((o) => person.options.includes(o)),
  );

  // Simulation: the backend will really send the request later. Visitors must log in first.
  const connect = (id) => {
    if (!loggedIn) return go("login");
    setSent((list) => (list.includes(id) ? list : [...list, id]));
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:py-10">
      <p className="text-xs font-bold text-brand">{r.eyebrow}</p>
      <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">{r.title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">{r.sub}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <Filters filters={filters} onChange={setFilters} onReset={() => setFilters(NO_FILTERS)} />

        <div className="min-w-0">
          <p className="mb-4 flex items-start gap-2.5 rounded-2xl bg-brand-soft p-4 text-xs leading-6 text-slate-600">
            <ShieldCheck size={16} className="mt-1 shrink-0 text-brand" />
            {r.safety}
          </p>
          <p className="mb-4 text-sm font-bold" aria-live="polite">{fill(r.count, { n: n(shown.length) })}</p>

          {shown.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {shown.map(({ person, text }) => (
                <PersonCard key={person.id} person={person} text={text} sent={sent.includes(person.id)} onConnect={() => connect(person.id)} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center">
              <h2 className="text-lg font-extrabold">{r.empty.title}</h2>
              <p className="mb-5 mt-1 text-sm text-slate-500">{r.empty.text}</p>
              <Button variant="outline" onClick={() => setFilters(NO_FILTERS)}>{r.empty.reset}</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
