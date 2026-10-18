import { useId } from "react";
import { useApp } from "../context/AppContext";

// Labeled multi-line text box with a character counter (when maxLength is given).
//  error = red message; hint = gray helper text; the other props go straight to the <textarea>.
export default function TextArea({ label, required, error, hint, rows = 4, maxLength, value, ...props }) {
  const { n } = useApp();
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <textarea
        {...props}
        id={id}
        rows={rows}
        maxLength={maxLength}
        value={value}
        aria-invalid={!!error}
        className={`w-full resize-none rounded-xl border bg-white p-4 text-sm leading-relaxed outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 ${error ? "border-red-400" : "border-slate-200"}`}
      />
      <div className="mt-1.5 flex items-start justify-between gap-3 text-xs">
        {error ? <p data-error className="font-semibold text-red-600">{error}</p> : <p className="text-slate-500">{hint}</p>}
        {maxLength && <span className="shrink-0 text-[11px] text-slate-400">{n(value.length)} / {n(maxLength)}</span>}
      </div>
    </div>
  );
}
