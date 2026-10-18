import { useRef, useState } from "react";
import { CloudUpload, FileText } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { validateFile } from "../../utils/files";
import { fill } from "../../utils/format";
import { DASH } from "../../data/dashboard";
import Button from "../../components/Button";

const BADGE = { approved: "bg-emerald-50 text-emerald-700", pending: "bg-amber-100 text-amber-800" };

// "Profile Verification": your documents, their status, and a box to upload a new one.
// Students have two documents (National ID + Student ID). Landowners have only the National ID.
export default function VerificationCard() {
  const { t, role, fmtDate } = useApp();
  const v = t.dashboard.verification;
  const isStudent = role === "student";
  const keys = isStudent ? ["id", "student"] : ["id"];

  const [docs, setDocs] = useState(DASH.docs); // status + date (+ file name after an upload) for each document
  const [type, setType] = useState("id"); // which document the next upload replaces
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState({ kind: "", text: "" });
  const inputRef = useRef(null);

  const upload = (file) => {
    if (!file) return;
    const issue = validateFile(file, t);
    if (issue) return setMessage({ kind: "error", text: issue });
    // A new upload always goes back to "Pending review". The real upload happens on the server later.
    setDocs((d) => ({ ...d, [type]: { status: "pending", date: new Date(), file: file.name } }));
    setMessage({ kind: "ok", text: v.upload.success });
  };

  const noteFor = (key) => {
    const doc = docs[key];
    const date = fmtDate(doc.date);
    if (doc.status === "pending") return fill(v.notes.pending, { date });
    return fill(key === "id" ? v.notes.approvedId : v.notes.approvedStudent, { date });
  };

  return (
    <section className="h-full rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-extrabold">{v.title}</h2>
      <p className="mb-5 mt-1 text-sm text-slate-500">{v.sub[role]}</p>

      <ul className="space-y-3">
        {keys.map((key) => (
          <li key={key} className="rounded-2xl bg-mist p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-sm font-extrabold">
                <FileText size={16} className="text-brand" />
                {v.docs[key]}
              </p>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${BADGE[docs[key].status]}`}>{v.status[docs[key].status]}</span>
            </div>
            <p className="mt-2 break-all text-xs text-slate-500">{docs[key].file ?? v.files[key]}</p>
            <p className="mt-1 text-[11px] text-slate-500">{noteFor(key)}</p>
          </li>
        ))}
      </ul>

      {isStudent && (
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-bold">{v.upload.type}</span>
          <select value={type} onChange={(e) => setType(e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
            {keys.map((key) => <option key={key} value={key}>{v.docs[key]}</option>)}
          </select>
        </label>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); upload(e.dataTransfer.files[0]); }}
        className={`mt-4 flex flex-col items-center gap-1.5 rounded-2xl border-2 border-dashed px-4 py-6 text-center ${dragging ? "border-brand bg-brand-soft" : "border-brand/40 bg-brand-soft/60"}`}
      >
        <CloudUpload size={22} className="text-brand" />
        <p className="text-sm font-bold">{v.upload.drop}</p>
        <p className="text-[11px] text-slate-500">{v.upload.hint}</p>
        <Button variant="white" className="mt-2 px-4 py-2 text-xs shadow-sm" onClick={() => inputRef.current?.click()}>{v.upload.button}</Button>
        <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="sr-only" onChange={(e) => { upload(e.target.files[0]); e.target.value = ""; }} />
      </div>

      {message.text && (
        <p role="status" className={`mt-3 text-xs font-semibold ${message.kind === "error" ? "text-red-600" : "text-emerald-700"}`}>{message.text}</p>
      )}
      <p className="mt-4 text-center text-[11px] text-slate-500">{v.private}</p>
    </section>
  );
}
