import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button";

export default function Faq() {
  const { t, go } = useApp();
  const f = t.faq;
  const [open, setOpen] = useState(0); // index of the open question, -1 = all closed

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_1.6fr]">
      <div>
        <p className="text-xs font-bold text-brand">{f.eyebrow}</p>
        <h2 className="mt-1 text-3xl font-extrabold">{f.title}</h2>
        <p className="mt-2 text-sm text-slate-500">{f.sub}</p>
        <Button variant="outline" icon={ArrowRight} flip className="mt-5" onClick={() => go("support")}>{f.button}</Button>
      </div>
      <div>
        {f.items.map((it, i) => (
          <div key={it.q} className="border-b border-slate-200">
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 py-4 text-start text-sm font-bold">
              {it.q}
              {open === i ? <Minus size={16} className="shrink-0" /> : <Plus size={16} className="shrink-0" />}
            </button>
            {open === i && <p className="pb-4 text-sm leading-7 text-slate-500">{it.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
