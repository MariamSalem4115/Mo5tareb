import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { IMG } from "../../data/images";
import Photo from "../../components/Photo";

// The photos: one big picture with arrows, and the other photos beside it (click one to make it the big one).
export default function Gallery({ home }) {
  const { t, n } = useApp();
  const g = t.listingPage.gallery;
  const [index, setIndex] = useState(0);
  const count = home.photos.length;
  const src = (i) => IMG.rooms[home.photos[i]];
  const move = (step) => setIndex((i) => (i + step + count) % count);
  const others = home.photos.map((_, i) => i).filter((i) => i !== index);

  return (
    <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
      <div className="relative overflow-hidden rounded-3xl">
        <Photo src={src(index)} alt={fill(g.photo, { i: n(index + 1) })} className="aspect-[4/3] w-full lg:aspect-[16/10]" />
        <button type="button" aria-label={g.prev} onClick={() => move(-1)} className="absolute start-4 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white shadow">
          <ChevronLeft size={18} className="rtl:-scale-x-100" />
        </button>
        <button type="button" aria-label={g.next} onClick={() => move(1)} className="absolute end-4 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white shadow">
          <ChevronRight size={18} className="rtl:-scale-x-100" />
        </button>
        <span className="absolute bottom-4 end-4 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold shadow" aria-live="polite">
          {fill(g.counter, { i: n(index + 1), n: n(count) })}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:grid-rows-2">
        {others.map((i) => (
          <button key={i} type="button" aria-label={fill(g.show, { i: n(i + 1) })} onClick={() => setIndex(i)} className="overflow-hidden rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            <Photo src={src(i)} alt="" className="aspect-[4/3] w-full transition-transform hover:scale-105 lg:aspect-auto lg:h-full" />
          </button>
        ))}
      </div>
    </div>
  );
}
