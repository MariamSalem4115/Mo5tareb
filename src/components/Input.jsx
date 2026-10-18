// Labeled text field.
//  icon   = decorative icon shown at the end of the field
//  action = a clickable element at the end instead (e.g. show/hide password)
//  unit   = a short word shown at the end of the field (for example "EGP" or "min")
//  error  = red message under the field; hint = gray helper text
export default function Input({ label, required, icon: Icon, action, unit, error, hint, ...props }) {
  return (
    <div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-bold">
          {label}
          {required && <span className="text-brand"> *</span>}
        </span>
        <span className="relative block">
          <input
            {...props}
            aria-invalid={!!error}
            className={`h-12 w-full rounded-xl border bg-white ps-3.5 ${unit ? "pe-16" : "pe-11"} text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 ${error ? "border-red-400" : "border-slate-200"}`}
          />
          {unit && <span className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">{unit}</span>}
          {action ?? (Icon && <Icon size={18} className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400" />)}
        </span>
      </label>
      {error ? (
        <p data-error className="mt-1.5 text-xs font-semibold text-red-600">{error}</p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      )}
    </div>
  );
}
