import { Globe } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function LangToggle() {
  const { t, toggleLang } = useApp();
  return (
    <button type="button" onClick={toggleLang} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
      <Globe size={16} />
      {t.langLabel}
    </button>
  );
}
