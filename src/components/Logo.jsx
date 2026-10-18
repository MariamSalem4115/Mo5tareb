import { House } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Logo({ light = false }) {
  const { t } = useApp();
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid size-10 place-items-center rounded-xl bg-brand text-white">
        <House size={20} />
      </span>
      <span className="text-start leading-tight">
        <span className={`block text-lg font-extrabold ${light ? "text-white" : "text-brand"}`}>{t.brand.name}</span>
        <span className="block text-[11px] text-slate-500">{t.brand.tagline}</span>
      </span>
    </span>
  );
}
