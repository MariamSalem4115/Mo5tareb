import { useApp } from "../context/AppContext";
import Logo from "./Logo";
import LangToggle from "./LangToggle";

export default function Footer() {
  const { t, go, goSection } = useApp();
  const f = t.footer;
  const exploreTargets = ["search", "roommates", "register"];
  const supportTargets = ["support-safety", "support-faq", "support-contact"]; // parts of the Support page

  return (
    <footer className="bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-7 text-slate-500">{f.tagline}</p>
          </div>
          <div className="flex gap-16">
            <div>
              <h3 className="mb-3 text-sm font-bold">{f.explore}</h3>
              <ul className="space-y-2.5 text-sm text-slate-500">
                {f.exploreLinks.map((l, i) => (
                  <li key={l}><button type="button" onClick={() => go(exploreTargets[i])} className="hover:text-brand">{l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold">{f.support}</h3>
              <ul className="space-y-2.5 text-sm text-slate-500">
                {f.supportLinks.map((l, i) => (
                  <li key={l}><button type="button" onClick={() => goSection("support", supportTargets[i])} className="hover:text-brand">{l}</button></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>{f.copy}</span>
          <span className="flex flex-wrap items-center gap-4">
            <button type="button" className="hover:text-brand">{f.privacy}</button>
            <button type="button" className="hover:text-brand">{f.terms}</button>
            <LangToggle />
          </span>
        </div>
      </div>
    </footer>
  );
}
