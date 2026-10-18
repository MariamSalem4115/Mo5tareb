import { useApp } from "../../context/AppContext";
import Modal from "../../components/Modal";

// Read-only list of every decision made in this session.
export default function AuditLog({ entries, onClose }) {
  const { t, lang } = useApp();
  const a = t.admin.audit;
  const fmt = (d) => d.toLocaleString(lang === "ar" ? "ar-EG" : "en-GB", { dateStyle: "medium", timeStyle: "short" });

  return (
    <Modal title={a.title} wide onClose={onClose}>
      {entries.length === 0 ? (
        <p className="rounded-xl bg-mist p-6 text-center text-sm text-slate-500">{a.empty}</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((e) => (
            <li key={e.id} className="rounded-xl bg-mist p-4 text-sm">
              <p className="font-bold">{a.actions[e.action]} · {e.subject}</p>
              <p className="mt-1 text-xs text-slate-500">{fmt(e.time)} · {a.by} {t.admin.nav.name}</p>
              {e.reason && <p className="mt-2 text-xs leading-6"><span className="font-bold">{a.reasonLabel}:</span> {e.reason}</p>}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
