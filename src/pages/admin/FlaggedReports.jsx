import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

// Flagged listings table. status = { [id]: "suspended" | "banned" | "dismissed" }
export default function FlaggedReports({ status, onModerate, onDismiss }) {
  const { t, n } = useApp();
  const r = t.admin.reports;
  const [open, setOpen] = useState(null); // report whose evidence is showing
  const done = { suspended: r.suspended, banned: r.banned, dismissed: r.dismissed };

  return (
    <section id="reports" className="scroll-mt-32 rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
      <h2 className="text-2xl font-extrabold">{r.title}</h2>
      <p className="mt-2 text-sm text-slate-500">{r.sub}</p>

      <div className="mt-5 hidden grid-cols-[1.4fr_0.8fr_1.4fr_1fr] gap-4 rounded-xl bg-mist px-4 py-3 text-[11px] font-bold text-slate-500 md:grid">
        {r.cols.map((c) => <span key={c}>{c}</span>)}
      </div>

      <div className="mt-3 space-y-3">
        {r.items.map((it) => {
          const state = status[it.id];
          return (
            <div key={it.id} className="grid gap-4 rounded-xl border border-slate-200 p-4 md:grid-cols-[1.4fr_0.8fr_1.4fr_1fr] md:items-center">
              <div>
                <p className="font-bold">{it.title}</p>
                <p className="mt-1 text-xs text-slate-500">{it.owner}</p>
                <span className="mt-2 inline-block rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700">{it.tag}</span>
              </div>
              <div>
                <p className="font-extrabold text-red-700">{n(it.count)} {r.reportWord}</p>
                <p className="text-[11px] text-slate-400">{r.unique}</p>
              </div>
              <div>
                <p className="text-sm">{it.reason}</p>
                <p className="mt-1 text-[11px] text-slate-400">{r.latest}: {it.latest}</p>
                <button type="button" onClick={() => setOpen(it)} className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline">
                  {r.evidence} <ArrowRight size={12} className="rtl:-scale-x-100" />
                </button>
              </div>
              <div className="flex gap-2 md:flex-col">
                {state ? (
                  <span className="rounded-lg bg-mist px-3 py-2 text-center text-xs font-bold text-slate-600">{done[state]}</span>
                ) : (
                  <>
                    <Button variant="danger" className="flex-1 py-2 text-xs" onClick={() => onModerate(it.action, it)}>{r[it.action]}</Button>
                    <Button variant="outline" className="flex-1 py-2 text-xs" onClick={() => onDismiss(it)}>{r.dismiss}</Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-slate-400">{r.note}</p>

      {open && (
        <Modal title={`${r.evidenceTitle} · ${open.title}`} wide onClose={() => setOpen(null)}>
          <ul className="space-y-3">
            {open.evidence.map((e) => (
              <li key={e.date} className="rounded-xl bg-mist p-4">
                <p className="text-[11px] font-bold text-slate-400">{e.date}</p>
                <p className="mt-1 text-sm leading-7">{e.text}</p>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </section>
  );
}
