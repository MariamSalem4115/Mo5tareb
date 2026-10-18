import { Lock } from "lucide-react";
import { useApp } from "../../context/AppContext";
import SectionCard from "../../components/SectionCard";
import FileDrop from "../../components/FileDrop";

// Step 3: ID for everyone, student proof only for students.
export default function Documents({ docs, errors, onDoc, isStudent }) {
  const { t } = useApp();
  const r = t.register;
  return (
    <SectionCard step={3} title={r.docsTitle} sub={r.docsSub}>
      <div className="grid gap-6 md:grid-cols-2">
        <FileDrop title={r.idTitle} text={r.idText} file={docs.id} error={errors.id} onChange={(f) => onDoc("id", f)} />
        {isStudent && <FileDrop title={r.studentTitle} text={r.studentText} file={docs.student} error={errors.student} onChange={(f) => onDoc("student", f)} />}
      </div>
      <div className="mt-6 rounded-2xl bg-brand-soft p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-brand"><Lock size={16} /> {r.privateTitle}</p>
        <p className="mt-1 text-xs leading-6 text-slate-600">{r.privateText}</p>
      </div>
    </SectionCard>
  );
}
