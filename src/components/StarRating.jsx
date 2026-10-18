import { useState } from "react";
import { Star } from "lucide-react";

// Five clickable stars. value = 0..5, onChange(number) reports the choice.
// In Arabic the first star sits on the right automatically (the page direction does that).
export default function StarRating({ value, onChange, label }) {
  const [hover, setHover] = useState(0); // star under the mouse, for a live preview
  const shown = hover || value;

  return (
    <div role="group" aria-label={label} className="flex gap-3" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          aria-label={`${i} / 5`}
          aria-pressed={value === i}
          onMouseEnter={() => setHover(i)}
          onClick={() => onChange(i)}
          className="rounded-md p-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <Star size={34} strokeWidth={1.6} fill={i <= shown ? "currentColor" : "none"} className={i <= shown ? "text-brand" : "text-slate-300"} />
        </button>
      ))}
    </div>
  );
}
