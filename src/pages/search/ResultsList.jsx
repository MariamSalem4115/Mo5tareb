import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import Button from "../../components/Button";
import ResultCard from "./ResultCard";

// The middle column: how many results, the sort buttons, the cards and "Load more homes".
//  homes = ALL homes that match (with words), visible = how many to show now
export default function ResultsList({ homes, visible, onMore, sort, onSort, selectedId, onHover, onReset }) {
  const { t, n } = useApp();
  const r = t.searchPage.results;
  const shown = homes.slice(0, visible);

  if (homes.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center">
        <h2 className="text-lg font-extrabold">{t.searchPage.empty.title}</h2>
        <p className="mb-5 mt-1 text-sm text-slate-500">{t.searchPage.empty.text}</p>
        <Button variant="outline" onClick={onReset}>{t.searchPage.empty.reset}</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold" aria-live="polite">{fill(r.count, { n: n(homes.length) })}</p>
        <p className="text-[11px] text-slate-500">{r.sort}</p>
      </div>
      <div role="group" aria-label={r.sort} className="mt-2 grid grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-white p-1">
        {["price", "newest"].map((id) => (
          <button key={id} type="button" aria-pressed={sort === id} onClick={() => onSort(id)} className={`rounded-lg py-2 text-xs font-bold ${sort === id ? "bg-brand text-white" : "text-slate-600 hover:bg-mist"}`}>
            {r[id]}
          </button>
        ))}
      </div>
      <p className="mb-4 mt-2 text-[11px] text-slate-500">{sort === "price" ? r.notePrice : r.noteNewest}</p>

      <div className="space-y-4">
        {shown.map((home) => <ResultCard key={home.id} home={home} selected={home.id === selectedId} onHover={onHover} />)}
      </div>

      {visible < homes.length && (
        <Button variant="outline" className="mt-4 w-full" onClick={onMore}>{r.more}</Button>
      )}
      <p className="mt-3 text-center text-[11px] text-slate-500">{fill(r.showing, { shown: n(shown.length), total: n(homes.length) })}</p>
    </div>
  );
}
