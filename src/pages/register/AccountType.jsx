import { Building2, Circle, CircleCheck, GraduationCap } from "lucide-react";
import { useApp } from "../../context/AppContext";
import SectionCard from "../../components/SectionCard";

const ROLES = [
  { key: "student", Icon: GraduationCap },
  { key: "owner", Icon: Building2 },
];

// Step 1: pick student, owner, or both.
export default function AccountType({ roles, onToggle }) {
  const { t } = useApp();
  const r = t.register;
  return (
    <SectionCard step={1} title={r.typeTitle} sub={r.typeSub}>
      <div role="radiogroup" className="grid gap-4 sm:grid-cols-2">
        {ROLES.map(({ key, Icon }) => {
          const on = roles[key];
          const Check = on ? CircleCheck : Circle;
          return (
            <button key={key} type="button" role="radio" aria-checked={on} onClick={() => onToggle(key)} className={`rounded-2xl border p-4 text-start transition-colors ${on ? "border-brand bg-brand-soft" : "border-slate-200 bg-white hover:bg-mist"}`}>
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold"><Icon size={18} className="text-brand" /> {r[key].title}</span>
                <Check size={18} className={on ? "text-brand" : "text-slate-300"} />
              </span>
              <span className="mt-2 block text-xs text-slate-500">{r[key].text}</span>
            </button>
          );
        })}
      </div>
    </SectionCard>
  );
}
