import { useState } from "react";
import { ChevronDown, Lock, MessageCircle, Search, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button";
import BudgetSlider from "../../components/BudgetSlider";

// Dropdown. value = position of the chosen option, onChange(position).
function Select({ label, options, value, onChange }) {
  return (
    <label className="relative block rounded-xl border border-slate-200 px-3 py-2">
      <span className="block text-[11px] text-slate-500">{label}</span>
      <select value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full appearance-none bg-transparent pe-6 text-sm font-bold outline-none">
        {options.map((o, i) => <option key={o} value={i}>{o}</option>)}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute end-3 bottom-3 text-brand" />
    </label>
  );
}

export default function SearchBar() {
  const { t, moneyRange, go } = useApp();
  const s = t.search;
  const [uni, setUni] = useState(0);
  const [min, setMin] = useState(2000);
  const [max, setMax] = useState(5000);
  const [gender, setGender] = useState(0); // position in s.genders: 0 women, 1 men, 2 no preference
  const [room, setRoom] = useState(0); // position in s.rooms: 0 private, 1 shared, 2 entire
  const range = moneyRange(min, max);

  // Open the Search page with what was chosen here.
  const search = () => go("search", { uni, min, max, gender: ["women", "men", ""][gender], room: ["private", "shared", "entire"][room] });
  const trustIcons = [ShieldCheck, MessageCircle, Lock];

  return (
    <section className="mx-auto max-w-6xl px-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-bold">{s.title}</h2>
          <p className="text-xs text-slate-400">{s.hint}</p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1fr_1fr_auto]">
          <Select label={s.location} options={s.locations} value={uni} onChange={setUni} />

          <div className="rounded-xl border border-slate-200 px-3 py-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">{s.budget}</span>
              <span className="font-bold text-brand">{range}</span>
            </div>
            <div className="mt-2">
              <BudgetSlider min={min} max={max} label={s.budget} onChange={(a, b) => { setMin(a); setMax(b); }} />
            </div>
          </div>

          <Select label={s.gender} options={s.genders} value={gender} onChange={setGender} />
          <Select label={s.room} options={s.rooms} value={room} onChange={setRoom} />
          <Button icon={Search} className="min-h-12 md:col-span-2 lg:col-span-1 lg:px-6" onClick={search}>{s.button}</Button>
        </div>
      </div>

      <ul className="mt-5 flex flex-col items-center justify-around gap-3 text-xs text-slate-500 md:flex-row">
        {s.trust.map((text, i) => {
          const Icon = trustIcons[i];
          return <li key={text} className="inline-flex items-center gap-2"><Icon size={15} className="text-brand" />{text}</li>;
        })}
      </ul>
    </section>
  );
}
