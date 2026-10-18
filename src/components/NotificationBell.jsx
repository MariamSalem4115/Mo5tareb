import { useEffect, useRef, useState } from "react";
import { Bell, BellOff, CircleAlert, CircleCheck, Flag, House, Star, UserPlus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useNotifications } from "../hooks/useNotifications";
import { fill, relativeTime } from "../utils/format";

// Which icon each notification type shows (the type is set in data/notifications.js).
const ICONS = { verify: CircleCheck, request: UserPlus, home: House, review: Star, alert: CircleAlert, report: Flag };

// The bell in the top bar. Click it to open a small window with the notifications,
// or with a friendly "no notifications" message when there are none.
// audience = whose notifications to show: "student" | "landowner" | "admin"
export default function NotificationBell({ audience }) {
  const { t, lang, n } = useApp();
  const b = t.notifications;
  const { items, unread, markAllRead, clearAll, open: openItem } = useNotifications(audience);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  // Close with Esc or with a click anywhere outside the window.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !boxRef.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        aria-label={unread > 0 ? `${b.title} (${fill(b.unread, { n: n(unread) })})` : b.title}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(!open)}
        className={`relative rounded-lg p-2 hover:bg-slate-100 ${open ? "bg-slate-100 text-brand" : "text-slate-500"}`}
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -end-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold leading-none text-white">{n(unread)}</span>
        )}
      </button>

      {open && (
        // On phones the window spans the screen under the top bar; on wide screens it hangs from the bell.
        <div role="dialog" aria-label={b.title} className="fixed inset-x-3 top-[4.5rem] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:absolute md:inset-x-auto md:end-0 md:top-full md:mt-2 md:w-96">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <h2 className="flex items-center gap-2 text-base font-extrabold">
              {b.title}
              {unread > 0 && <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-bold text-brand">{fill(b.unread, { n: n(unread) })}</span>}
            </h2>
            <button type="button" disabled={unread === 0} onClick={markAllRead} className="text-xs font-bold text-brand hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline">
              {b.markAll}
            </button>
          </div>

          {items.length > 0 ? (
            <>
              <ul className="max-h-96 divide-y divide-slate-100 overflow-y-auto">
                {items.map((item) => {
                  const Icon = ICONS[item.type] ?? Bell;
                  return (
                    <li key={item.id}>
                      <button type="button" onClick={() => { setOpen(false); openItem(item); }} className={`flex w-full items-start gap-3 px-5 py-4 text-start hover:bg-slate-50 ${item.read ? "" : "bg-brand-soft/40"}`}>
                        <span className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-full ${item.read ? "bg-mist text-slate-500" : "bg-brand-soft text-brand"}`}><Icon size={16} /></span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold leading-6">{item.title}</span>
                          <span className="block text-xs leading-6 text-slate-500">{item.text}</span>
                          <span className="mt-1 block text-[11px] text-slate-400">{relativeTime(lang, item.minutesAgo)}</span>
                        </span>
                        {!item.read && <span aria-label={b.new} className="mt-2 size-2 shrink-0 rounded-full bg-brand" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-slate-100 px-5 py-3 text-center">
                <button type="button" onClick={clearAll} className="text-xs font-bold text-slate-500 hover:text-red-600">{b.clear}</button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-brand-soft text-brand"><BellOff size={24} /></span>
              <h3 className="mt-4 text-base font-extrabold">{b.empty.title}</h3>
              <p className="mt-1 max-w-xs text-xs leading-6 text-slate-500">{b.empty.text}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
