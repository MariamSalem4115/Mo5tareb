import { useState } from "react";
import { History, Lock, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import Button from "../components/Button";
import AdminNavbar from "./admin/AdminNavbar";
import StatCards from "./admin/StatCards";
import VerificationQueue from "./admin/VerificationQueue";
import DocumentReview from "./admin/DocumentReview";
import FlaggedReports from "./admin/FlaggedReports";
import ReasonDialog from "./admin/ReasonDialog";
import AuditLog from "./admin/AuditLog";

// Starting numbers. The queue shows 3 sample rows out of 18 pending.
const BASE = { pending: 18, reports: 7, verified: 124, hours: 18 };

export default function Admin() {
  const { t, n } = useApp();
  const a = t.admin;

  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState("salma");
  const [decisions, setDecisions] = useState({}); // { salma: "approved" | "rejected" }
  const [reportStatus, setReportStatus] = useState({}); // { faisal: "suspended" | "banned" | "dismissed" }
  const [audit, setAudit] = useState([]);
  const [dialog, setDialog] = useState(null); // { kind, item } while the reason pop-up is open
  const [auditOpen, setAuditOpen] = useState(false);

  const log = (action, subject, reason = "") =>
    setAudit((cur) => [{ id: Date.now() + Math.random(), time: new Date(), action, subject, reason }, ...cur]);

  const approve = (item) => {
    setDecisions((d) => ({ ...d, [item.id]: "approved" }));
    log("approve", `${item.name} · ${item.doc}`);
  };
  const dismiss = (item) => {
    setReportStatus((s) => ({ ...s, [item.id]: "dismissed" }));
    log("dismiss", item.title);
  };

  // Reject / suspend / ban all need a written reason first.
  const confirmReason = (reason) => {
    const { kind, item } = dialog;
    if (kind === "reject") setDecisions((d) => ({ ...d, [item.id]: "rejected" }));
    else setReportStatus((s) => ({ ...s, [item.id]: kind === "suspend" ? "suspended" : "banned" }));
    log(kind, item.name ? `${item.name} · ${item.doc}` : item.title, reason);
    setDialog(null);
  };

  const allItems = a.queue.items;
  const shown = allItems.filter((i) => filter === "all" || i.docKind === filter);
  const selected = allItems.find((i) => i.id === selectedId) ?? allItems[0];

  const pending = BASE.pending - Object.keys(decisions).length;
  const activeReports = BASE.reports - Object.keys(reportStatus).length;
  const verified = BASE.verified + Object.values(decisions).filter((d) => d === "approved").length;
  const stats = [n(pending), n(activeReports), n(verified), `${n(BASE.hours)}${a.hoursUnit}`];

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const tabClass = (active) => `rounded-full border px-4 py-1.5 text-xs font-bold ${active ? "border-brand bg-brand text-white" : "border-slate-200 bg-white text-brand"}`;

  return (
    <div className="min-h-screen bg-mist">
      <AdminNavbar onAudit={() => setAuditOpen(true)} />

      <main className="mx-auto max-w-6xl space-y-6 px-5 py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand"><ShieldCheck size={13} /> {a.badge}</span>
            <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">{a.title}</h1>
            <p className="mt-2 text-sm text-slate-500">{a.sub}</p>
          </div>
          <Button variant="outline" icon={History} onClick={() => setAuditOpen(true)}>{a.auditBtn}</Button>
        </div>

        <StatCards values={stats} />

        <div className="flex flex-wrap gap-2">
          <button type="button" className={tabClass(true)} onClick={() => jump("queue")}>{a.tabs.verifications} · {n(pending)}</button>
          <button type="button" className={tabClass(false)} onClick={() => jump("reports")}>{a.tabs.reports} · {n(activeReports)}</button>
          <button type="button" disabled title={a.tabs.soon} className={`${tabClass(false)} cursor-not-allowed opacity-50`}>{a.tabs.users}</button>
        </div>

        <VerificationQueue
          items={shown}
          totalPending={pending}
          filter={filter}
          onFilter={setFilter}
          selectedId={selected.id}
          onSelect={setSelectedId}
          decisions={decisions}
          onApprove={approve}
          onReject={(item) => setDialog({ kind: "reject", item })}
        />

        <DocumentReview key={selected.id} item={selected} decision={decisions[selected.id]} onApprove={approve} onReject={(item) => setDialog({ kind: "reject", item })} />

        <FlaggedReports status={reportStatus} onModerate={(kind, item) => setDialog({ kind, item })} onDismiss={dismiss} />

        <p className="flex items-start gap-2 rounded-xl bg-brand-soft p-4 text-xs leading-6 text-brand">
          <Lock size={14} className="mt-1 shrink-0" /> {a.footerNote}
        </p>
      </main>

      {dialog && (
        <ReasonDialog kind={dialog.kind} subject={dialog.item.name ?? dialog.item.title} onCancel={() => setDialog(null)} onConfirm={confirmReason} />
      )}
      {auditOpen && <AuditLog entries={audit} onClose={() => setAuditOpen(false)} />}
    </div>
  );
}
