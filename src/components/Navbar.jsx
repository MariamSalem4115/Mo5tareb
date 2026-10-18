import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import Logo from "./Logo";
import Button from "./Button";
import LangToggle from "./LangToggle";
import Avatar from "./Avatar";
import NotificationBell from "./NotificationBell";

// Top bar. Shows Login/Register for visitors, and a bell + avatar menu once logged in.
export default function Navbar() {
  const { t, go, view, role, loggedIn, displayName, profile, logout } = useApp();
  const [open, setOpen] = useState(false); // mobile menu
  const [account, setAccount] = useState(false); // avatar dropdown
  const menu = t.dashboard.menu;
  const audience = role === "landowner" ? "landowner" : "student"; // whose notifications the bell shows

  // Go to the landing page, then scroll to the "How it works" section.
  const goHow = () => {
    go("landing");
    setTimeout(() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" }), 50);
  };
  const links = [
    { label: t.nav.home, action: () => go("landing"), active: view === "landing" },
    { label: t.nav.housing, action: () => go("search"), active: view === "search" || view === "listing" },
    { label: t.nav.roommates, action: () => go("roommates"), active: view === "roommates" },
    { label: t.nav.how, action: goHow },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <button type="button" onClick={() => go("landing")} aria-label={t.nav.home}>
          <Logo />
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button key={l.label} type="button" onClick={l.action} className={`text-sm font-semibold ${l.active ? "text-brand" : "text-slate-500 hover:text-ink"}`}>
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LangToggle />
          {loggedIn ? (
            <>
              <NotificationBell audience={audience} />
              <div className="relative">
                <button type="button" aria-expanded={account} onClick={() => setAccount(!account)} className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-50">
                  <Avatar src={profile.avatar} name={displayName} />
                  <span className="text-sm font-bold">{displayName}</span>
                  <ChevronDown size={14} className="text-brand" />
                </button>
                {account && (
                  <div className="absolute end-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                    <button type="button" onClick={() => { setAccount(false); go("dashboard"); }} className="block w-full rounded-lg px-3 py-2 text-start text-sm font-semibold hover:bg-slate-50">{menu.dashboard}</button>
                    <button type="button" onClick={() => { setAccount(false); logout(); }} className="block w-full rounded-lg px-3 py-2 text-start text-sm font-semibold text-red-600 hover:bg-red-50">{menu.logout}</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button variant="outline" className="py-2" onClick={() => go("login")}>{t.nav.login}</Button>
              <Button className="py-2" onClick={() => go("register")}>{t.nav.register}</Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          {loggedIn && <NotificationBell audience={audience} />}
          <button type="button" className="rounded-lg p-2 hover:bg-slate-100" aria-label={t.nav.menu} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-1 border-t border-slate-100 bg-white px-5 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <button key={l.label} type="button" onClick={() => { setOpen(false); l.action(); }} className="block w-full rounded-lg px-3 py-3 text-start text-sm font-semibold hover:bg-slate-50">
              {l.label}
            </button>
          ))}
          <div className="flex items-center gap-2 pt-2">
            {loggedIn ? (
              <>
                <Button variant="outline" className="flex-1" onClick={() => { setOpen(false); go("dashboard"); }}>{menu.dashboard}</Button>
                <Button variant="danger" className="flex-1" onClick={() => { setOpen(false); logout(); }}>{menu.logout}</Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="flex-1" onClick={() => go("login")}>{t.nav.login}</Button>
                <Button className="flex-1" onClick={() => go("register")}>{t.nav.register}</Button>
              </>
            )}
          </div>
          <LangToggle />
        </div>
      )}
    </header>
  );
}
