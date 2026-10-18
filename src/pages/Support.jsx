import { Mail, CircleHelp, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import { SUPPORT } from "../data/support";
import PageFrame from "../components/PageFrame";
import ContactForm from "./support/ContactForm";
import FaqList from "./support/FaqList";
import SafetyCentre from "./support/SafetyCentre";

// One icon for each help channel (the ids match the list in i18n/supportPage.js).
const ICONS = { email: Mail, faq: CircleHelp, safety: ShieldCheck };
// The part of this page each channel scrolls to.
const TARGETS = { email: "support-contact", faq: "support-faq", safety: "support-safety" };

// Support / Contact page: three ways to get help, a contact form, common questions and safety tips.
export default function Support() {
  return (
    <PageFrame>
      <SupportBody />
    </PageFrame>
  );
}

function SupportBody() {
  const { t } = useApp();
  const s = t.supportPage;
  const jump = (id) => document.getElementById(TARGETS[id])?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:py-10">
      <p className="text-xs font-bold text-brand">{s.eyebrow}</p>
      <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">{s.title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">{s.sub}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {s.channels.map((c) => {
          const Icon = ICONS[c.id];
          return (
            <button key={c.id} type="button" onClick={() => jump(c.id)} className="rounded-3xl border border-slate-200 bg-white p-6 text-start transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
              <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand"><Icon size={20} /></span>
              <h2 className="mt-4 text-base font-extrabold">{c.title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">{c.text}</p>
              <span className="mt-3 block text-xs font-bold text-brand">{c.action}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
        <section id="support-contact" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-xl font-extrabold">{s.form.title}</h2>
          <p className="mb-6 mt-1 text-xs text-slate-500">{s.form.sub}</p>
          <ContactForm />
          <p className="mt-5 text-center text-xs text-slate-500">{SUPPORT.email}</p>
        </section>

        <section id="support-faq" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-xl font-extrabold">{s.faq.title}</h2>
          <p className="mb-2 mt-1 text-xs text-slate-500">{s.faq.sub}</p>
          <FaqList />
        </section>
      </div>

      <SafetyCentre />
    </div>
  );
}
