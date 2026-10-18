import { useState } from "react";
import { ArrowRight, KeyRound, Mail } from "lucide-react";
import { useApp } from "../context/AppContext";
import { isEmail } from "../utils/validators";
import PageShell from "../components/PageShell";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ForgotPassword() {
  const { t, go } = useApp();
  const f = t.forgot;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  // Simulation: the real email is sent by the Node.js backend later.
  const submit = (e) => {
    e.preventDefault();
    if (!isEmail(email)) return setError(t.errors.email);
    setError("");
    setSent(true);
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-md px-5 py-12 lg:py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand"><KeyRound size={22} /></span>
          <h1 className="mt-5 text-3xl font-extrabold">{f.title}</h1>
          <p className="mt-2 text-sm leading-7 text-slate-500">{f.sub}</p>

          <form onSubmit={submit} noValidate className="mt-6 space-y-4">
            <Input label={f.email} icon={Mail} type="email" autoComplete="email" placeholder={f.emailPh} value={email} error={error} onChange={(e) => { setEmail(e.target.value); setSent(false); }} />
            <Button type="submit" disabled={sent} className="h-12 w-full disabled:bg-emerald-600">{sent ? f.sent : f.submit}</Button>
          </form>

          <div className="mt-5 rounded-2xl bg-brand-soft p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-brand"><Mail size={16} /> {f.infoTitle}</p>
            <p className="mt-1.5 text-xs leading-6 text-slate-600">{f.infoText}</p>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5 text-center">
            <button type="button" onClick={() => go("login")} className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline">
              {f.back} <ArrowRight size={15} className="ltr:-scale-x-100" />
            </button>
            <p className="mt-3 text-xs text-slate-500">{f.help}</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
