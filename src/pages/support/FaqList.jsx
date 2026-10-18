import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { DASH } from "../../data/dashboard";

// Questions that open and close. Only one answer is open at a time.
export default function FaqList() {
  const { t, n, money } = useApp();
  const [open, setOpen] = useState(0); // index of the open question, -1 = all closed
  const values = { days: n(DASH.expiryDays), price: money(DASH.boostPrice) }; // numbers inside the answers

  return (
    <div>
      {t.supportPage.faq.items.map((it, i) => (
        <div key={it.q} className="border-b border-slate-200 last:border-b-0">
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 py-4 text-start text-sm font-bold">
            {it.q}
            {open === i ? <Minus size={16} className="shrink-0" /> : <Plus size={16} className="shrink-0" />}
          </button>
          {open === i && <p className="pb-4 text-sm leading-7 text-slate-500">{fill(it.a, values)}</p>}
        </div>
      ))}
    </div>
  );
}
