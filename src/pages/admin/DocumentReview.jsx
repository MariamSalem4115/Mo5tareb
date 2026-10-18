import { useState } from "react";
import { Check, Maximize2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import DocPreview from "./DocPreview";

// Detailed review of the selected submission. Approval stays disabled until every check is ticked.
// The parent gives this component key={item.id}, so the ticks reset when you pick another person.
export default function DocumentReview({ item, decision, onApprove, onReject }) {
  const { t } = useApp();
  const r = t.admin.review;
  const student = item.docKind === "student";
  const labels = student ? r.checks.student : r.checks.national;
  const [ticked, setTicked] = useState([false, false, false]);
  const [full, setFull] = useState(false);
  const allTicked = ticked.every(Boolean);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
      <h2 className="text-xl font-extrabold">{r.title} · {item.name}</h2>
      <p className="mt-2 text-sm text-slate-500">{r.selected.replace("{doc}", item.doc).replace("{date}", item.uploaded)}</p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[260px_1fr]">
        <div>
          <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold ${item.identityApproved ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
            {item.identityApproved ? r.identityOk : r.identityNo}
          </span>
          <h3 className="mt-3 font-bold">{student ? r.studentCheck : r.idCheck}</h3>
          <p className="mt-2 text-xs text-slate-500">{student ? `${item.university} · ${item.detail}` : item.role}</p>
          <p className="mt-2 text-xs leading-6 text-slate-500">{student ? r.studentNote : r.idNote}</p>
          <Button variant="outline" icon={Maximize2} className="mt-3 py-2 text-xs" onClick={() => setFull(true)}>{r.openFull}</Button>
        </div>
        <div>
          <DocPreview item={item} large />
          <p className="mt-2 text-[11px] text-slate-400">{r.demoNote}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {labels.map((label, i) => (
          <label key={label} className="inline-flex cursor-pointer items-center gap-2.5 text-sm">
            <input type="checkbox" className="size-4 accent-brand" checked={ticked[i]} disabled={!!decision} onChange={() => setTicked((cur) => cur.map((v, j) => (j === i ? !v : v)))} />
            {label}
          </label>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button icon={Check} disabled={!allTicked || !!decision} onClick={() => onApprove(item)}>{student ? r.approveStudent : r.approveId}</Button>
        <Button variant="danger" disabled={!!decision} onClick={() => onReject(item)}>{r.rejectReason}</Button>
        <span className="text-xs text-slate-400">{decision ? r.decided : !allTicked && r.needChecks}</span>
      </div>

      {full && (
        <Modal title={item.doc} wide onClose={() => setFull(false)}>
          <DocPreview item={item} large />
          <p className="mt-3 text-xs text-slate-400">{r.demoNote}</p>
        </Modal>
      )}
    </section>
  );
}
