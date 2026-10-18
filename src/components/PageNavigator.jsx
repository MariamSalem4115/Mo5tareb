import { useState } from "react";
import { Compass, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { pages } from "../pages";

// Floating test menu: jump to any page and preview the dashboard as a student or landowner.
// Delete <PageNavigator /> in App.jsx before launch.
export default function PageNavigator() {
  const { t, view, go, login, role, setRole, verified, setVerified, openDialog } = useApp();
  const [open, setOpen] = useState(false);
  const d = t.dashboard.dev;
  const w = t.dialogs.dev;

  const preview = (type) => {
    openDialog(type); // shows the pop-up with sample text
    setOpen(false);
  };

  const jump = (id) => {
    if (id === "dashboard" || id === "reviews" || id === "addListing") login(); // these pages need a "logged in" user
    if (id === "addListing") setRole("landowner"); // only landowners can add listings (use "Preview as" below to see the student message)
    go(id);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 start-4 z-50">
      {open && (
        <div className="mb-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
          <p className="px-3 py-2 text-xs font-bold text-slate-400">{t.misc.navigator}</p>
          {Object.keys(pages).map((id) => (
            <button key={id} type="button" onClick={() => jump(id)} className={`block w-full rounded-lg px-3 py-2 text-start text-sm font-semibold ${view === id ? "bg-brand-soft text-brand" : "hover:bg-slate-50"}`}>
              {t.views[id]}
            </button>
          ))}
          <p className="mt-2 border-t border-slate-100 px-3 pb-1 pt-3 text-xs font-bold text-slate-400">{d.label}</p>
          <div className="grid grid-cols-2 gap-1 px-1 pb-1">
            {["student", "landowner"].map((r) => (
              <button key={r} type="button" aria-pressed={role === r} onClick={() => setRole(r)} className={`rounded-lg py-1.5 text-xs font-bold ${role === r ? "bg-brand text-white" : "bg-mist text-slate-600"}`}>
                {d[r]}
              </button>
            ))}
          </div>
          <p className="mt-2 border-t border-slate-100 px-3 pb-1 pt-3 text-xs font-bold text-slate-400">{d.verifyLabel}</p>
          <div className="grid grid-cols-2 gap-1 px-1 pb-1">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" aria-pressed={verified === v} onClick={() => setVerified(v)} className={`rounded-lg py-1.5 text-xs font-bold ${verified === v ? "bg-brand text-white" : "bg-mist text-slate-600"}`}>
                {v ? d.verified : d.unverified}
              </button>
            ))}
          </div>
          <p className="mt-2 border-t border-slate-100 px-3 pb-1 pt-3 text-xs font-bold text-slate-400">{w.label}</p>
          <div className="space-y-1 px-1 pb-1">
            {["review", "report"].map((type) => (
              <button key={type} type="button" onClick={() => preview(type)} className="block w-full rounded-lg bg-mist px-3 py-2 text-start text-xs font-bold text-slate-600 hover:bg-brand-soft hover:text-brand">
                {w[type]}
              </button>
            ))}
          </div>
        </div>
      )}
      <button type="button" aria-label={t.misc.navigator} onClick={() => setOpen(!open)} className="grid size-12 place-items-center rounded-full bg-brand text-white shadow-lg hover:bg-brand-dark">
        {open ? <X size={20} /> : <Compass size={20} />}
      </button>
    </div>
  );
}
