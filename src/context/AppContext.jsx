import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n/translations";

const AppContext = createContext(null);

// Everything the whole site shares: language, current page, who is logged in.
export function AppProvider({ children }) {
  const [lang, setLang] = useState("ar"); // "ar" (RTL) or "en" (LTR)
  const [view, setView] = useState("landing"); // which page is showing
  const [loggedIn, setLoggedIn] = useState(false); // fake login for now; the backend owns this later
  const [role, setRole] = useState("student"); // "student" | "landowner" (never both)
  const [profile, setProfile] = useState({ name: "", avatar: "" });
  const [viewData, setViewData] = useState(null); // extra info passed to a page, e.g. go("publicProfile", { personId: "mariam" })
  const [dialog, setDialog] = useState(null); // pop-up window that is open: { type: "review" | "report", data }
  const [savedIds, setSavedIds] = useState([]); // ids of the homes the user saved with the heart (Simulation: the backend will store them per user)
  const [verified, setVerified] = useState(false); // is the STUDENT identity-verified? Needed to see a landlord's contact (Simulation: the backend will decide)
  const [notifState, setNotifState] = useState({ read: [], cleared: [] }); // ids of notifications that were read / cleared (Simulation: the backend will keep this)

  // Keep the <html> tag in sync so RTL/LTR flips the whole layout.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const t = translations[lang];
  const locale = lang === "ar" ? "ar-EG" : "en-GB";

  // Number helpers: Arabic-Indic digits in Arabic, normal digits in English.
  const n = (v) => v.toLocaleString(lang === "ar" ? "ar-EG" : "en-US");
  const rate = (v) => v.toLocaleString(lang === "ar" ? "ar-EG" : "en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 }); // 5 -> 5.0
  const money = (v) => (lang === "ar" ? `${n(v)} ج.م` : `EGP ${n(v)}`);
  const moneyRange = (a, b) => (lang === "ar" ? `${n(a)}–${n(b)} ج.م` : `EGP ${n(a)}–${n(b)}`); // "EGP 2,000–5,000"
  const year = (v) => v.toLocaleString(lang === "ar" ? "ar-EG" : "en-US", { useGrouping: false }); // 2024 -> "2024" / "٢٠٢٤" (no thousands separator)

  // Date helpers
  const fmtDate = (d) => d.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
  const fmtDateTime = (d) => d.toLocaleString(locale, { dateStyle: "medium", timeStyle: "short" });

  const displayName = profile.name || t.dashboard.sampleName;

  const go = (next, data = null) => {
    setDialog(null); // moving to another page closes any open pop-up
    setViewData(data);
    setView(next);
    window.scrollTo({ top: 0 });
  };
  // Go to a page, then scroll to the part of it that has this id (for example go to Support, then its FAQ).
  const goSection = (next, id) => {
    go(next);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };
  const toggleLang = () => setLang((l) => (l === "ar" ? "en" : "ar"));
  const login = () => setLoggedIn(true);
  const logout = () => {
    setLoggedIn(false);
    go("landing");
  };
  // Any page can open a pop-up with openDialog("review", { ...info }) or openDialog("report", { ...info }).
  const openDialog = (type, data = {}) => setDialog({ type, data });
  const closeDialog = () => setDialog(null);
  const updateProfile = (patch) => setProfile((p) => ({ ...p, ...patch }));
  const toggleSaved = (id) => setSavedIds((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  const value = { lang, t, n, rate, money, moneyRange, year, fmtDate, fmtDateTime, view, viewData, go, goSection, toggleLang, loggedIn, login, logout, role, setRole, profile, displayName, updateProfile, dialog, openDialog, closeDialog, savedIds, toggleSaved, verified, setVerified, notifState, setNotifState };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
