import { ChevronDown } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Logo from "../../components/Logo";
import LangToggle from "../../components/LangToggle";
import NotificationBell from "../../components/NotificationBell";

// Top bar for the administrator area (different links from the public site).
export default function AdminNavbar({ onAudit }) {
  const { t, go } = useApp();
  const a = t.admin.nav;
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const links = [
    { label: a.overview, action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: a.verifications, action: () => jump("queue"), active: true },
    { label: a.reports, action: () => jump("reports") },
    { label: a.audit, action: onAudit },
  ];
  const linkClass = (l) => `whitespace-nowrap text-sm font-semibold ${l.active ? "text-brand" : "text-slate-500 hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <button type="button" onClick={() => go("landing")}><Logo /></button>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => <button key={l.label} type="button" onClick={l.action} className={linkClass(l)}>{l.label}</button>)}
        </nav>
        <div className="flex items-center gap-1">
          <LangToggle />
          <NotificationBell audience="admin" />
          <span className="flex items-center gap-2 ps-2">
            <span className="grid size-9 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand">{a.name[0]}</span>
            <span className="hidden text-sm font-bold sm:block">{a.name}</span>
            <ChevronDown size={14} className="hidden text-brand sm:block" />
          </span>
        </div>
      </div>
      <nav className="flex gap-6 overflow-x-auto border-t border-slate-100 px-5 py-2 md:hidden">
        {links.map((l) => <button key={l.label} type="button" onClick={l.action} className={linkClass(l)}>{l.label}</button>)}
      </nav>
    </header>
  );
}
