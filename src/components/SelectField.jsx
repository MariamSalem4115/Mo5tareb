import { ChevronDown } from "lucide-react";

// options = plain strings (the text is also the value), or { id, label } / { value, label } objects
// when the saved value must stay the same in every language.
export default function SelectField({ label, required, error, options, placeholder, ...props }) {
  return (
    <div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-bold">
          {label}
          {required && <span className="text-brand"> *</span>}
        </span>
        <span className="relative block">
          <select
            {...props}
            aria-invalid={!!error}
            className={`h-12 w-full appearance-none rounded-xl border bg-white ps-3.5 pe-11 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 ${error ? "border-red-400" : "border-slate-200"}`}
          >
            <option value="">{placeholder}</option>
            {options.map((o) => {
              const opt = typeof o === "string" ? { value: o, label: o } : { value: o.value ?? o.id, label: o.label };
              return <option key={opt.value} value={opt.value}>{opt.label}</option>;
            })}
          </select>
          <ChevronDown size={18} className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </span>
      </label>
      {error && <p data-error className="mt-1.5 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}
