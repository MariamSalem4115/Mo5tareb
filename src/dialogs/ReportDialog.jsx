import { useState } from "react";
import { House, ShieldAlert } from "lucide-react";
import { useApp } from "../context/AppContext";
import { fill } from "../utils/format";
import { LIMITS } from "../data/limits";
import Modal from "../components/Modal";
import Button from "../components/Button";
import DoneState from "./DoneState";

// "Report listing" window. Opened from the Listing Details page (later).
// data (all optional): { title, meta } of the listing. Missing values fall back to the sample text.
export default function ReportDialog({ data = {}, onClose }) {
  const { t, n } = useApp();
  const r = t.dialogs.report;
  const listing = { ...r.sample, ...data };

  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!reason) found.reason = r.errors.reason;
    if (details.trim().length < LIMITS.min) found.details = fill(r.errors.short, { min: n(LIMITS.min) });
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    // Simulation: nothing is sent yet. The backend will save { listing, reason, details } for the admin panel.
    setDone(true);
  };

  return (
    <Modal title={r.title} width="max-w-xl" onClose={onClose}>
      {done ? (
        <DoneState title={r.done.title} text={r.done.text} button={r.done.button} onClose={onClose} />
      ) : (
        <form onSubmit={submit} noValidate className="space-y-5">
          <p className="text-sm text-slate-500">{r.sub}</p>

          <div className="flex items-center gap-3 rounded-2xl bg-mist p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><House size={20} /></span>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold">{listing.title}</p>
              <p className="mt-0.5 text-[11px] text-slate-500">{listing.meta}</p>
            </div>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-bold">{r.reasonLabel} <span className="text-brand">*</span></legend>
            <div className="space-y-2">
              {r.reasons.map((x) => (
                <label key={x.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 ${reason === x.id ? "border-brand bg-brand-soft/60" : "border-slate-200 hover:border-brand/40"}`}>
                  <input
                    type="radio"
                    name="report-reason"
                    value={x.id}
                    checked={reason === x.id}
                    onChange={() => { setReason(x.id); setErrors((v) => ({ ...v, reason: undefined })); }}
                    className="mt-1 size-4 shrink-0 accent-brand"
                  />
                  <span>
                    <span className="block text-sm font-bold">{x.label}</span>
                    <span className="block text-xs text-slate-500">{x.hint}</span>
                  </span>
                </label>
              ))}
            </div>
            {errors.reason && <p data-error className="mt-1.5 text-xs font-semibold text-red-600">{errors.reason}</p>}
          </fieldset>

          <div>
            <label htmlFor="report-details" className="mb-2 block text-sm font-bold">{r.detailsLabel} <span className="text-brand">*</span></label>
            <textarea
              id="report-details"
              rows={4}
              maxLength={LIMITS.max}
              value={details}
              placeholder={r.detailsPh}
              aria-invalid={!!errors.details}
              onChange={(e) => { setDetails(e.target.value); setErrors((v) => ({ ...v, details: undefined })); }}
              className={`w-full resize-none rounded-xl border p-4 text-sm leading-relaxed outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 ${errors.details ? "border-red-400" : "border-slate-200"}`}
            />
            <div className="mt-1.5 flex items-start justify-between gap-3 text-[11px] text-slate-500">
              <span>{r.hint}</span>
              <span className="shrink-0">{n(details.length)} / {n(LIMITS.max)}</span>
            </div>
            {errors.details && <p data-error className="mt-1.5 text-xs font-semibold text-red-600">{errors.details}</p>}
          </div>

          <p className="flex items-start gap-2.5 rounded-xl bg-brand-soft px-4 py-3 text-xs leading-relaxed text-slate-600">
            <ShieldAlert size={16} className="mt-0.5 shrink-0 text-brand" />
            {r.notice}
          </p>

          <div className="flex gap-3">
            <Button type="submit" className="flex-[1.4]">{r.submit}</Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>{r.cancel}</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
