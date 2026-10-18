// The notifications of one kind of user ("student" | "landowner" | "admin"), ready for the bell to show.
//
// BACKEND NOTE: today the list comes from data/notifications.js and "read / cleared" is kept in React state
// (AppContext), so it resets on refresh. Later replace it with:
//   GET   /api/notifications               -> the list for the logged-in user
//   PATCH /api/notifications/read          -> mark some or all as read   (markRead / markAllRead below)
//   DELETE /api/notifications              -> clear them                 (clearAll below)
import { NOTIFICATIONS } from "../data/notifications";
import { useApp } from "../context/AppContext";

export function useNotifications(audience) {
  const { t, notifState, setNotifState, go, goSection } = useApp();

  const items = NOTIFICATIONS
    .filter((x) => x.audience === audience && !notifState.cleared.includes(x.id))
    .map((x) => ({ ...x, ...t.notifications.items[x.id], read: notifState.read.includes(x.id) }));
  const unread = items.filter((x) => !x.read).length;

  const markRead = (ids) => setNotifState((s) => ({ ...s, read: [...new Set([...s.read, ...ids])] }));
  const markAllRead = () => markRead(items.map((x) => x.id));
  const clearAll = () => setNotifState((s) => ({ ...s, cleared: [...new Set([...s.cleared, ...items.map((x) => x.id)])] }));

  // Click on one notification: mark it read, then go where it points.
  const open = (item) => {
    markRead([item.id]);
    const { view, data, section } = item.target;
    if (section) goSection(view, section);
    else go(view, data ?? null);
  };

  return { items, unread, markAllRead, clearAll, open };
}
