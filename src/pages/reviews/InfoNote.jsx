import { MessageSquareHeart } from "lucide-react";
import { useApp } from "../../context/AppContext";

// Small explanation at the bottom: reviews go both ways.
export default function InfoNote() {
  const { t } = useApp();
  const i = t.staysPage.info;
  return (
    <section className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><MessageSquareHeart size={20} /></span>
      <div>
        <h2 className="text-lg font-extrabold">{i.title}</h2>
        <p className="mt-1 text-sm text-slate-600">{i.text1}</p>
        <p className="mt-1 text-sm text-slate-600">{i.text2}</p>
      </div>
    </section>
  );
}
