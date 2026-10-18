import { useRef, useState } from "react";
import { CloudUpload, FileText, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { validateFile } from "../utils/files";

const sizeLabel = (bytes) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

// Drag-and-drop (or click) file box with type + size checks.
// file = the chosen File (or null), onChange(file | null) reports the choice.
export default function FileDrop({ title, text, file, onChange, error }) {
  const { t } = useApp();
  const r = t.register;
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [problem, setProblem] = useState("");

  const accept = (f) => {
    if (!f) return;
    const issue = validateFile(f, t);
    if (issue) return setProblem(issue);
    setProblem("");
    onChange(f);
  };
  const shownError = problem || error;

  return (
    <div>
      <h3 className="text-sm font-bold">{title} <span className="text-brand">*</span></h3>
      <p className="mb-3 mt-1 text-xs text-slate-500">{text}</p>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); accept(e.dataTransfer.files[0]); }}
        className={`flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-4 py-7 text-center ${dragging ? "border-brand bg-brand-soft" : "border-brand/40 bg-brand-soft/60"}`}
      >
        <CloudUpload size={26} className="text-brand" />
        <p className="text-sm font-bold">{r.drop}</p>
        <p className="text-[11px] text-slate-500">{r.dropHint}</p>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-1 rounded-lg bg-white px-5 py-2 text-xs font-bold text-brand shadow-sm hover:bg-slate-50">
          {file ? r.replace : r.choose}
        </button>
        <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="sr-only" onChange={(e) => { accept(e.target.files[0]); e.target.value = ""; }} />
      </div>

      {file && (
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-mist p-3">
          <FileText size={22} className="shrink-0 text-brand" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{file.name} · {sizeLabel(file.size)}</p>
            <p className="text-[11px] font-semibold text-emerald-700">{r.uploaded}</p>
          </div>
          <button type="button" aria-label={r.remove} onClick={() => onChange(null)} className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-red-600">
            <Trash2 size={16} />
          </button>
        </div>
      )}
      {shownError && <p data-error className="mt-2 text-xs font-semibold text-red-600">{shownError}</p>}
    </div>
  );
}
