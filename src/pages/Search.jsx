import { useState } from "react";
import { ListFilter, Map as MapIcon, Search as SearchIcon } from "lucide-react";
import { useApp } from "../context/AppContext";
import { fill } from "../utils/format";
import { listingView } from "../utils/listingView";
import { PAGE_SIZE } from "../data/listings";
import { DEFAULT_FILTERS, searchListings } from "../services/listings";
import PageFrame from "../components/PageFrame";
import Button from "../components/Button";
import SelectField from "../components/SelectField";
import FilterPanel from "./search/FilterPanel";
import ActiveChips from "./search/ActiveChips";
import ResultsList from "./search/ResultsList";
import MapPanel from "./search/MapPanel";
import { inArea } from "./search/mapArea";

// Search results + map: filters on the side, the homes in the middle, an illustrative map on the other side.
// Opened from the top bar (default filters), from the landing search bar (its choices arrive in viewData)
// and from a campus card on the landing page (viewData = { uni }).
export default function Search() {
  return (
    <PageFrame>
      <SearchBody />
    </PageFrame>
  );
}

function SearchBody() {
  const { t, n, go, viewData } = useApp();
  const s = t.searchPage;

  // "applied" = the filters in use. "draft" = what is being edited in the filter box (counts after "Apply filters").
  const start = { ...DEFAULT_FILTERS, ...(viewData ?? {}) };
  const [applied, setApplied] = useState(start);
  const [draft, setDraft] = useState(start);
  const [headerUni, setHeaderUni] = useState(start.uni);
  const [sort, setSort] = useState("price"); // "price" | "newest"
  const [visible, setVisible] = useState(PAGE_SIZE); // how many cards are shown
  const [selectedId, setSelectedId] = useState(null); // home picked on the map
  const [hoveredId, setHoveredId] = useState(null); // home under the mouse in the list
  const [zoom, setZoom] = useState(1);
  const [tab, setTab] = useState("list"); // phones only: "list" | "map"
  const [showFilters, setShowFilters] = useState(false); // phones only

  const apply = (next) => {
    setApplied(next);
    setDraft(next);
    setHeaderUni(next.uni);
    setVisible(PAGE_SIZE);
    setSelectedId(null);
  };
  const reset = () => apply({ ...DEFAULT_FILTERS, uni: applied.uni });

  // Simulation: the backend will do this search (see services/listings.js). "Search this area" keeps the homes inside the visible map.
  const homes = searchListings(applied, sort)
    .filter((l) => applied.area <= 1 || inArea(l.pin, applied.area))
    .map((l) => ({ ...listingView(t, n, l), open: () => go("listing", { listingId: l.id }) }));

  const uniName = t.search.locations[applied.uni];
  const universities = t.search.locations.map((label, i) => ({ value: String(i), label }));

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <nav aria-label={s.crumbs.housing} className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <button type="button" onClick={() => go("landing")} className="font-semibold hover:text-brand">{s.crumbs.home}</button>
        <span aria-hidden="true">/</span>
        <span className="font-semibold">{s.crumbs.housing}</span>
        <span aria-hidden="true">/</span>
        <span className="font-bold text-ink">{t.register.universities[applied.uni]}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold md:text-4xl">{s.title}</h1>
          <p className="mt-2 text-sm text-slate-500" aria-live="polite">{fill(homes.length > 0 ? s.sub : s.subNone, { n: n(homes.length), uni: uniName })}</p>
        </div>
        <div className="flex w-full items-end gap-3 md:w-auto">
          <div className="flex-1 md:w-72">
            <SelectField label={s.location} options={universities} value={String(headerUni)} onChange={(e) => setHeaderUni(Number(e.target.value))} />
          </div>
          <Button icon={SearchIcon} className="h-12" onClick={() => apply({ ...applied, uni: headerUni })}>{s.button}</Button>
        </div>
      </div>

      <div className="mt-5"><ActiveChips filters={applied} onChange={apply} /></div>

      {/* Phones: switch between the list and the map, and open/close the filters. */}
      <div className="mt-5 flex gap-2 lg:hidden">
        <Button variant="outline" icon={ListFilter} className="flex-1 py-2.5" aria-expanded={showFilters} onClick={() => setShowFilters(!showFilters)}>{showFilters ? s.filters.hide : s.filters.show}</Button>
        <div role="group" className="grid flex-1 grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-white p-1">
          {[["list", s.tabs.list], ["map", s.tabs.map]].map(([id, label]) => (
            <button key={id} type="button" aria-pressed={tab === id} onClick={() => setTab(id)} className={`inline-flex items-center justify-center gap-1.5 rounded-lg text-xs font-bold ${tab === id ? "bg-brand text-white" : "text-slate-600"}`}>
              {id === "map" && <MapIcon size={14} />}{label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)_minmax(0,1fr)]">
        <aside className={`${showFilters ? "block" : "hidden"} lg:sticky lg:top-24 lg:block lg:self-start`}>
          <FilterPanel draft={draft} onChange={setDraft} onApply={() => { apply(draft); setShowFilters(false); }} onReset={reset} />
        </aside>

        <section className={`${tab === "list" ? "block" : "hidden"} min-w-0 lg:block`}>
          <ResultsList
            homes={homes}
            visible={visible}
            onMore={() => setVisible((v) => v + PAGE_SIZE)}
            sort={sort}
            onSort={(id) => { setSort(id); setVisible(PAGE_SIZE); }}
            selectedId={selectedId}
            onHover={setHoveredId}
            onReset={reset}
          />
        </section>

        <section className={`${tab === "map" ? "block" : "hidden"} min-w-0 lg:sticky lg:top-24 lg:block lg:self-start`}>
          <MapPanel
            homes={homes}
            uni={applied.uni}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={setSelectedId}
            zoom={zoom}
            onZoom={setZoom}
            onSearchArea={() => apply({ ...applied, area: zoom })}
          />
        </section>
      </div>
    </div>
  );
}
