// Sample notifications for the bell in the top bar.
// The Node.js backend will send the real ones (per user) later.
//  id         = unique. The words for it are in t.notifications.items[<id>]
//  audience   = who sees it: "student" | "landowner" | "admin"
//  type       = which icon to show (see ICONS in components/NotificationBell.jsx)
//  minutesAgo = how long ago it happened (the bell turns it into "5 minutes ago")
//  target     = where a click goes: { view, data?, section? }  (view = a key of pages/index.js)
export const NOTIFICATIONS = [
  { id: "s-docs", audience: "student", type: "verify", minutesAgo: 25, target: { view: "dashboard" } },
  { id: "s-request", audience: "student", type: "request", minutesAgo: 190, target: { view: "publicProfile", data: { personId: "mariam" } } },
  { id: "s-homes", audience: "student", type: "home", minutesAgo: 1500, target: { view: "search" } },
  { id: "s-review", audience: "student", type: "review", minutesAgo: 3000, target: { view: "reviews" } },

  { id: "l-approved", audience: "landowner", type: "home", minutesAgo: 60, target: { view: "dashboard" } },
  { id: "l-review", audience: "landowner", type: "review", minutesAgo: 320, target: { view: "reviews" } },
  { id: "l-expiry", audience: "landowner", type: "alert", minutesAgo: 1700, target: { view: "dashboard" } },

  { id: "a-queue", audience: "admin", type: "verify", minutesAgo: 15, target: { view: "admin", section: "queue" } },
  { id: "a-report", audience: "admin", type: "report", minutesAgo: 240, target: { view: "admin", section: "reports" } },
];
