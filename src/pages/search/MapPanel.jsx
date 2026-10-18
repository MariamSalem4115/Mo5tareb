import { GraduationCap, LocateFixed, Minus, Plus, RefreshCw, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { translations } from "../../i18n/translations";
import { IMG } from "../../data/images";
import Button from "../../components/Button";
import Photo from "../../components/Photo";

const ZOOM_MAX = 2.4;
const ZOOM_STEP = 0.4;
const CAMPUS = [17, 78]; // where the campus is drawn, in % of the map

// The map. It is an ILLUSTRATION made with plain shapes (no map library), so the pins are approximate.
// BACKEND NOTE: to use a real map later (Leaflet, Google Maps...), keep the props and replace what is drawn inside.
//  homes = the homes to pin (with words), uni = university position, selectedId / hoveredId = highlighted pins,
//  onSelect(id | null), zoom / onZoom(number), onSearchArea() = "Search this area" button.
export default function MapPanel({ homes, uni, selectedId, hoveredId, onSelect, zoom, onZoom, onSearchArea }) {
  const { t, lang, money } = useApp();
  const m = t.searchPage.map;
  const labels = m.labels[uni] ?? [];
  const hasWater = labels.some((l) => l.kind === "river");
  const selected = homes.find((h) => h.id === selectedId);
  const other = translations[lang === "ar" ? "en" : "ar"].register.universities[uni]; // the campus name in the other language

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold">{m.title}</h2>
        <button type="button" onClick={onSearchArea} className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-[11px] font-bold text-brand hover:bg-brand/10">
          <RefreshCw size={12} /> {m.searchArea}
        </button>
      </div>

      {/* dir="ltr": a map is not mirrored in Arabic, left stays left. */}
      <div dir="ltr" className="relative h-[70vh] min-h-96 overflow-hidden rounded-3xl border border-slate-200 bg-[#eeede6] lg:h-[calc(100vh-11rem)]" onClick={() => onSelect(null)}>
        <div className="absolute inset-0 origin-center transition-transform duration-300" style={{ transform: `scale(${zoom})` }}>
          {/* blocks, park, water and roads: pure decoration */}
          <span className="absolute left-[3%] top-[6%] h-[20%] w-[20%] rounded-xl bg-[#e2e1d8]" />
          <span className="absolute left-[40%] top-[10%] h-[16%] w-[30%] rounded-xl bg-[#e2e1d8]" />
          <span className="absolute left-[5%] top-[58%] h-[14%] w-[10%] rounded-xl bg-[#e2e1d8]" />
          <span className="absolute left-[62%] top-[56%] h-[18%] w-[16%] rounded-xl bg-[#e2e1d8]" />
          <span className="absolute left-[28%] top-[55%] h-[22%] w-[24%] rounded-xl bg-[#d9e7cf]" />
          {hasWater && <span className="absolute right-0 top-0 h-full w-[13%] rounded-l-[70%] bg-[#cfe6ec]" />}
          <span className="absolute inset-x-0 top-[33%] h-3 bg-white" />
          <span className="absolute inset-x-0 top-[80%] h-3 bg-white" />
          <span className="absolute inset-x-0 top-[52%] h-2 bg-white" />
          <span className="absolute inset-y-0 left-[26%] w-3 bg-white" />
          <span className="absolute inset-y-0 left-[55%] w-3 bg-white" />
          <span className="absolute inset-y-0 left-[79%] w-2 bg-white" />

          {labels.map((l) => (
            <span
              key={l.text}
              style={{ left: `${l.x}%`, top: `${l.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap ${l.kind === "area" ? "text-[10px] font-bold tracking-widest text-slate-400" : l.kind === "street" ? "text-[9px] italic text-slate-400" : "-rotate-90 text-[10px] text-sky-700/70"}`}
            >
              {l.text}
            </span>
          ))}

          {/* campus: counter-scaled so it keeps its size while the map zooms */}
          <span style={{ left: `${CAMPUS[0]}%`, top: `${CAMPUS[1]}%`, transform: `translate(-50%, -50%) scale(${1 / zoom})` }} className="absolute flex flex-col items-center">
            <span className="grid size-8 place-items-center rounded-full bg-white text-brand shadow"><GraduationCap size={16} /></span>
            <span className="mt-1 whitespace-nowrap text-[10px] font-bold">{t.register.universities[uni]}</span>
            <span className="whitespace-nowrap text-[9px] text-slate-500">{other}</span>
          </span>

          {homes.map((h) => {
            const active = h.id === selectedId || h.id === hoveredId;
            return (
              <button
                key={h.id}
                type="button"
                aria-label={`${money(h.price)} · ${h.title}`}
                aria-pressed={h.id === selectedId}
                onClick={(e) => { e.stopPropagation(); onSelect(h.id); }}
                style={{ left: `${h.pin[0]}%`, top: `${h.pin[1]}%`, transform: `translate(-50%, -50%) scale(${1 / zoom})` }}
                className={`absolute whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-bold shadow-md ${active ? "z-20 bg-brand text-white" : "z-10 bg-white text-ink hover:text-brand"}`}
              >
                {money(h.price)}
              </button>
            );
          })}
        </div>

        <div className="absolute right-3 top-3 z-30 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
          {[
            [Plus, m.zoomIn, () => onZoom(Math.min(ZOOM_MAX, +(zoom + ZOOM_STEP).toFixed(1))), zoom >= ZOOM_MAX],
            [Minus, m.zoomOut, () => onZoom(Math.max(1, +(zoom - ZOOM_STEP).toFixed(1))), zoom <= 1],
            [LocateFixed, m.recenter, () => { onZoom(1); onSelect(null); }, false],
          ].map(([Icon, label, action, off]) => (
            <button key={label} type="button" aria-label={label} disabled={off} onClick={action} className="grid size-9 place-items-center rounded-lg bg-white text-ink shadow hover:text-brand disabled:cursor-not-allowed disabled:opacity-40">
              <Icon size={16} />
            </button>
          ))}
        </div>

        {selected && (
          <div className="absolute inset-x-3 bottom-12 z-30 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-xl" dir={lang === "ar" ? "rtl" : "ltr"} onClick={(e) => e.stopPropagation()}>
            <Photo src={IMG.rooms[selected.photos[0]]} alt={selected.title} className="size-16 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{selected.title}</p>
              <p className="truncate text-[11px] text-slate-500">{selected.area} · {selected.typeLabel}</p>
              <p className="text-sm font-extrabold text-brand">{money(selected.price)} <span className="text-[11px] font-normal text-slate-400">{t.featured.perMonth}</span></p>
            </div>
            <Button className="shrink-0 px-3 py-2 text-xs" onClick={() => selected.open()}>{m.view}</Button>
            <button type="button" aria-label={m.close} onClick={() => onSelect(null)} className="absolute end-1.5 top-1.5 rounded-full p-1 text-slate-400 hover:bg-slate-100"><X size={14} /></button>
          </div>
        )}

        <span className="absolute bottom-3 left-3 z-20 rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] text-slate-500" dir={lang === "ar" ? "rtl" : "ltr"}>{m.illustrative}</span>
      </div>
      <p className="mt-3 text-xs text-slate-500">{m.hint}</p>
    </div>
  );
}
