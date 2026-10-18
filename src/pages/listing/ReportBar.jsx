import { Flag } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button";

// "Something doesn't look right?": opens the report window (dialogs/ReportDialog.jsx) for this home.
export default function ReportBar({ home }) {
  const { t, openDialog } = useApp();
  const r = t.listingPage.report;
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white px-6 py-5 ring-1 ring-slate-200">
      <div>
        <p className="text-sm font-extrabold">{r.title}</p>
        <p className="text-xs text-slate-500">{r.text}</p>
      </div>
      <Button variant="outline" icon={Flag} onClick={() => openDialog("report", { title: home.title, meta: `${home.area} · ${home.typeLabel}` })}>{r.button}</Button>
    </div>
  );
}
