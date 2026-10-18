import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

// Asks the admin for a written reason. Used for: reject verification, suspend listing, ban user.
export default function ReasonDialog({ kind, subject, onCancel, onConfirm }) {
  const { t } = useApp();
  const d = t.admin.dialogs;
  const [reason, setReason] = useState("");
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (reason.trim().length < 10) return setError(true);
    onConfirm(reason.trim());
  };

  return (
    <Modal title={d[kind].title} onClose={onCancel}>
      <form onSubmit={submit}>
        <p className="text-sm font-bold">{subject}</p>
        <p className="mt-1 text-sm leading-7 text-slate-500">{d[kind].text}</p>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-bold">{d.reason}</span>
          <textarea value={reason} onChange={(e) => { setReason(e.target.value); setError(false); }} rows={4} placeholder={d.reasonPh} aria-invalid={error} className={`w-full resize-none rounded-xl border p-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 ${error ? "border-red-400" : "border-slate-200"}`} />
        </label>
        {error && <p className="mt-1.5 text-xs font-semibold text-red-600">{d.reasonError}</p>}
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>{d.cancel}</Button>
          <Button type="submit">{d.confirm}</Button>
        </div>
      </form>
    </Modal>
  );
}
