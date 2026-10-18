// A list of tick boxes where you can tick several (amenities, house rules, ...).
//  options  = [{ id, label }]
//  selected = list of the ids that are ticked
//  onToggle(id) = called when a box is clicked
//  columns  = 1 or 2 (two columns on wide screens)
export default function CheckboxGroup({ label, options, selected, onToggle, columns = 2 }) {
  return (
    <fieldset>
      {label && <legend className="mb-3 text-sm font-bold">{label}</legend>}
      <div className={`grid gap-x-8 gap-y-3.5 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
        {options.map((o) => (
          <label key={o.id} className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              className="size-[18px] shrink-0 cursor-pointer accent-brand"
              checked={selected.includes(o.id)}
              onChange={() => onToggle(o.id)}
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
