import { useApp } from "../context/AppContext";

// Slim footer used on the account pages.
export default function SimpleFooter() {
  const { t, goSection } = useApp();
  const f = t.footer;
  return (
    <footer className="bg-mist">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <span>{f.copy}</span>
        <span className="flex gap-4">
          <button type="button" className="hover:text-brand">{f.privacy}</button>
          <button type="button" className="hover:text-brand">{f.terms}</button>
          <button type="button" onClick={() => goSection("support", "support-faq")} className="hover:text-brand">{f.supportLinks[1]}</button>
        </span>
      </div>
    </footer>
  );
}
