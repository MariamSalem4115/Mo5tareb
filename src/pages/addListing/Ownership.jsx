import { Lock } from "lucide-react";
import { useApp } from "../../context/AppContext";
import SectionCard from "../../components/SectionCard";
import SelectField from "../../components/SelectField";
import FileDrop from "../../components/FileDrop";
import { makeBind } from "./bind";

// Step 7: your role for the property and the ownership (or authorization) document.
// The document is for the verification team only and is never shown to students.
export default function Ownership({ form, errors, onField, doc, onDoc }) {
  const { t } = useApp();
  const o = t.addListing.ownership;
  const bind = makeBind(form, errors, onField);
  return (
    <SectionCard id="listing-step-7" step={7} title={`${t.addListing.steps[6]} *`} sub={o.sub}>
      <div className="space-y-6">
        <SelectField label={o.role} required options={o.roles.map((r) => ({ value: r.id, label: r.label }))} placeholder={o.rolePh} {...bind("ownerRole")} />
        <FileDrop title={o.docTitle} text={o.docText} file={doc} onChange={onDoc} error={errors.doc} />
        <p className="flex items-center gap-3 rounded-2xl bg-mist p-4 text-xs leading-6 text-slate-600">
          <Lock size={18} className="shrink-0 text-brand" />
          {o.privacy}
        </p>
      </div>
    </SectionCard>
  );
}
