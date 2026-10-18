import { GraduationCap } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";

// "Know your neighborhood": the address, a small illustrative map and walking times.
// The exact building is never shown (it is shared after the student connects).
export default function Neighborhood({ home }) {
  const { t, n, money } = useApp();
  const p = t.listingPage.neighborhood;
  const near = [
    fill(p.walkTo, { uni: home.university, min: n(home.walk) }),
    fill(p.stopWalk, { stop: home.stop, min: n(home.metro) }),
    fill(p.shop, { min: n(home.shop) }),
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-extrabold">{p.title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{home.address}</p>

      <div dir="ltr" role="img" aria-label={p.mapLabel} className="relative mt-4 h-52 overflow-hidden rounded-2xl bg-[#eeede6]">
        <span className="absolute left-[5%] top-[8%] h-[24%] w-[18%] rounded-xl bg-[#e2e1d8]" />
        <span className="absolute left-[40%] top-[8%] h-[20%] w-[26%] rounded-xl bg-[#e2e1d8]" />
        <span className="absolute left-[24%] top-[58%] h-[28%] w-[22%] rounded-xl bg-[#d9e7cf]" />
        <span className="absolute right-0 top-0 h-full w-[12%] rounded-l-[70%] bg-[#cfe6ec]" />
        <span className="absolute inset-x-0 top-[40%] h-3 bg-white" />
        <span className="absolute inset-x-0 top-[78%] h-2 bg-white" />
        <span className="absolute inset-y-0 left-[22%] w-3 bg-white" />
        <span className="absolute inset-y-0 left-[60%] w-3 bg-white" />
        <span className="absolute left-[40%] top-[50%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-brand px-3 py-1.5 text-[11px] font-bold text-white shadow-md">{money(home.price)}</span>
        <span className="absolute left-[14%] top-[78%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span className="grid size-7 place-items-center rounded-full bg-white text-brand shadow"><GraduationCap size={14} /></span>
          <span className="mt-0.5 whitespace-nowrap text-[9px] font-bold">{home.university}</span>
        </span>
      </div>

      <ul className="mt-4 grid gap-2 text-xs text-slate-600 sm:grid-cols-3">
        {near.map((line) => <li key={line}>{line}</li>)}
      </ul>
      <p className="mt-4 text-[11px] text-slate-500">{p.note}</p>
    </section>
  );
}
