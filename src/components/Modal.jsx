import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useApp } from "../context/AppContext";

// Reusable pop-up window. Closes with the X, the Esc key, or a click on the dark background.
// We will reuse it for the review and report pop-ups later.
// width = optional Tailwind max-width class (for example "max-w-xl"). Without it: wide -> max-w-2xl, else max-w-md.
export default function Modal({ title, onClose, wide = false, width, children }) {
  const { t } = useApp();
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previous = document.activeElement;
    dialogRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} className={`max-h-[90vh] w-full overflow-auto rounded-2xl bg-white p-6 shadow-2xl outline-none ${width ?? (wide ? "max-w-2xl" : "max-w-md")}`}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-xl font-extrabold">{title}</h2>
          <button type="button" aria-label={t.misc.close} onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
