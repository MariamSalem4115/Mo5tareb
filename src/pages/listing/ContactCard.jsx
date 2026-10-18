import { useState } from "react";
import { CircleCheck, Lock, MessageCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import Button from "../../components/Button";

// "Secure contact". Only ONE of these states shows, depending on who is looking:
//   visitor (not logged in)   -> locked, "Log in"
//   landowner                 -> a short note (only students contact landlords)
//   student, not verified     -> locked, "Verify my profile"  (goes to the dashboard where documents are uploaded)
//   student, verified         -> "Reveal WhatsApp / Phone Number", then the number
// BACKEND NOTE: the phone number must only be sent by the server to a verified student, when "Reveal" is pressed
// (e.g. POST /api/listings/:id/reveal-contact). Never include it in the normal listing response.
export default function ContactCard({ home }) {
  const { t, go, loggedIn, role, verified } = useApp();
  const c = t.listingPage.contact;
  const [revealed, setRevealed] = useState(false);

  let state = "ready";
  if (!loggedIn) state = "visitor";
  else if (role === "landowner") state = "owner";
  else if (!verified) state = "locked";

  const phone = home.landlordInfo.phone;
  const whatsappLink = `https://wa.me/${phone.replace(/\D/g, "")}`;
  const box = state === "ready" ? "border-brand/20 bg-brand-soft" : "border-slate-200 bg-mist";

  return (
    <section>
      <h2 className="mb-3 px-1 text-sm font-extrabold">{c.title}</h2>
      <div className={`rounded-3xl border p-6 ${box}`}>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${state === "ready" ? "bg-emerald-50 text-emerald-700" : "bg-white text-slate-600"}`}>
          {state === "ready" ? <CircleCheck size={12} /> : <Lock size={12} />} {c[state].badge}
        </span>
        <h3 className="mt-3 text-lg font-extrabold">{c[state].title}</h3>
        <p className="mt-1 text-xs leading-6 text-slate-600">{state === "ready" ? fill(c.ready.text, { name: home.landlordInfo.name }) : c[state].text}</p>

        {(state === "visitor" || state === "locked") && (
          <>
            {/* The number is hidden on purpose: these dots are not the real number. */}
            <p dir="ltr" aria-hidden="true" className="mt-4 rounded-xl bg-white px-4 py-3 text-center text-sm tracking-widest text-slate-300">+20 •• ••• •• ••</p>
            <Button variant="outline" icon={Lock} className="mt-4 w-full" onClick={() => go(state === "visitor" ? "login" : "dashboard")}>{c[state].button}</Button>
          </>
        )}

        {state === "ready" && !revealed && (
          <Button icon={MessageCircle} className="mt-4 w-full" onClick={() => setRevealed(true)}>{c.ready.button}</Button>
        )}
        {state === "ready" && revealed && (
          <div className="mt-4 space-y-3" aria-live="polite">
            <p className="text-[11px] text-slate-500">{c.ready.numberLabel}</p>
            <p dir="ltr" className="rounded-xl bg-white px-4 py-3 text-center text-lg font-extrabold">{phone}</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark">
              <MessageCircle size={16} /> {c.ready.whatsapp}
            </a>
            <button type="button" onClick={() => setRevealed(false)} className="w-full text-xs font-bold text-slate-500 hover:text-brand">{c.ready.hide}</button>
          </div>
        )}

        {state === "ready" && <p className="mt-4 text-[11px] font-semibold text-brand">{c.warning}</p>}
      </div>
    </section>
  );
}
