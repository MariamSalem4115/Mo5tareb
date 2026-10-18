import { GraduationCap, FileImage, User } from "lucide-react";
import { useApp } from "../../context/AppContext";

// A FICTIONAL document picture. Real documents will come from the backend later.
// large = bigger version used in the review panel and full-screen view.
export default function DocPreview({ item, large = false }) {
  const { t } = useApp();
  const d = t.admin.doc;
  const student = item.docKind === "student";

  if (!large) {
    return student ? (
      <div className="rounded-xl border border-brand/30 bg-brand-soft p-3">
        <div className="flex items-center justify-between text-[10px] font-bold text-brand">
          <span className="inline-flex items-center gap-1.5"><GraduationCap size={12} /> {item.university.toUpperCase()}</span>
          <span>{d.demo}</span>
        </div>
        <p className="mt-3 border-t border-brand/20 pt-2 text-center text-[10px] font-semibold text-brand">{d.notValid}</p>
      </div>
    ) : (
      <div className="rounded-xl bg-mist p-3">
        <FileImage size={16} className="text-brand" />
        <p className="mt-1.5 text-xs font-bold">{item.doc}</p>
        <p className="text-[10px] text-brand">{d.masked}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-brand/30 bg-brand-soft p-5">
      <div className="flex items-center justify-between text-xs font-bold text-brand">
        <span className="inline-flex items-center gap-2">
          <GraduationCap size={16} />
          {student ? <>{item.university.toUpperCase()} <span className="font-normal text-slate-500">{d.studentId}</span></> : item.doc}
        </span>
        <span>{d.demo}</span>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span className="grid size-20 shrink-0 place-items-center rounded-xl bg-white text-brand/50"><User size={32} /></span>
        <div>
          <p className="font-bold">{item.name} · {d.sample}</p>
          {item.detail && <p className="mt-1 text-xs text-slate-500">{item.detail}</p>}
          <p className="mt-1 text-xs text-slate-500">{student ? d.studentNumber : d.nationalNumber}: ••••••••</p>
          {student && <p className="mt-1 text-xs text-slate-500">{d.academicYear}</p>}
        </div>
      </div>
      <p className="mt-4 border-t border-brand/20 pt-3 text-center text-xs font-semibold text-brand">{d.notValid}</p>
    </div>
  );
}
