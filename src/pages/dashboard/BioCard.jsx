import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { DASH } from "../../data/dashboard";
import Button from "../../components/Button";

// "My Bio": short text, university year (students only) and lifestyle chips.
// onSaved(year) tells the page which year was saved, so the top card can show it.
export default function BioCard({ onSaved }) {
  const { t, n, role, fmtDateTime } = useApp();
  const b = t.dashboard.bio;
  const isStudent = role === "student";

  // text = null means "untouched", so the sample bio follows the language until you type.
  const start = { text: null, year: b.defaultYear, options: b.defaultOptions };
  const [draft, setDraft] = useState(start); // what you see on screen now
  const [saved, setSaved] = useState(start); // what was last saved
  const [savedAt, setSavedAt] = useState(DASH.savedAt);

  const shownText = draft.text ?? b.initial[role];
  const same = (a, c) => (a.text ?? b.initial[role]) === (c.text ?? b.initial[role]) && a.year === c.year && [...a.options].sort().join() === [...c.options].sort().join();
  const changed = !same(draft, saved);

  const toggleOption = (i) =>
    setDraft((d) => ({ ...d, options: d.options.includes(i) ? d.options.filter((x) => x !== i) : [...d.options, i] }));

  const save = () => {
    setSaved(draft);
    setSavedAt(new Date());
    onSaved(draft.year); // backend call goes here later
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-extrabold">{b.title}</h2>
      <p className="mb-5 mt-1 text-sm text-slate-500">{b.sub}</p>

      <div className="rounded-2xl border border-slate-200 p-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
        <textarea
          aria-label={b.title}
          rows={4}
          maxLength={DASH.bioMax}
          placeholder={b.placeholder}
          value={shownText}
          onChange={(e) => setDraft({ ...draft, text: e.target.value })}
          className="w-full resize-none text-sm leading-relaxed outline-none"
        />
        <p className="text-end text-[11px] text-slate-400">{n(shownText.length)} / {n(DASH.bioMax)}</p>
      </div>

      {isStudent && (
        <label className="relative mt-4 block rounded-2xl border border-slate-200 px-4 py-2.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
          <span className="block text-[11px] text-slate-500">{b.year}</span>
          <select
            value={draft.year}
            onChange={(e) => setDraft({ ...draft, year: Number(e.target.value) })}
            className="w-full appearance-none bg-transparent pe-8 text-sm font-bold outline-none"
          >
            {b.years.map((label, i) => <option key={label} value={i}>{label}</option>)}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-slate-500" />
        </label>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {b.options.map((label, i) => {
          const on = draft.options.includes(i);
          return (
            <button
              key={label}
              type="button"
              aria-pressed={on}
              onClick={() => toggleOption(i)}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-bold ${on ? "border-brand-soft bg-brand-soft text-brand" : "border-slate-200 bg-white text-slate-500 hover:border-brand/40"}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <Button className="mt-5 w-full" disabled={!changed} onClick={save}>{b.save}</Button>
      <p className={`mt-3 text-xs ${changed ? "font-semibold text-amber-700" : "text-emerald-700"}`} aria-live="polite">
        {changed ? b.unsaved : fill(b.savedAt, { time: fmtDateTime(savedAt) })}
      </p>
    </section>
  );
}
