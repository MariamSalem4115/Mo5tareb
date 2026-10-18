import { useApp } from "../context/AppContext";

// White numbered card used by the Register form ("01 Account type", ...).
// id (optional) lets other parts of the page scroll to this card.
export default function SectionCard({ step, title, sub, id, children }) {
  const { n } = useApp();
  return (
    <section id={id} className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
      <h2 className="text-xl font-extrabold">{n(0)}{n(step)} {title}</h2>
      <p className="mt-1 text-xs text-slate-500">{sub}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}
