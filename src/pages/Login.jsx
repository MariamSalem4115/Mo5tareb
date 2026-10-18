import { useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import { IMG } from "../data/images";
import { isEmail } from "../utils/validators";
import PageShell from "../components/PageShell";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import SocialButtons from "../components/SocialButtons";
import Button from "../components/Button";
import Photo from "../components/Photo";

export default function Login() {
  const { t, go, login } = useApp();
  const l = t.login;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  // Fake login for now: the real check will call the Node.js backend later.
  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!isEmail(email)) next.email = t.errors.email;
    if (!password) next.password = t.errors.required;
    setErrors(next);
    if (Object.keys(next).length === 0) {
      login(); // fake login for now
      go("dashboard");
    }
  };

  return (
    <PageShell>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-12 lg:grid-cols-2 lg:py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10">
          <h1 className="text-3xl font-extrabold">{l.title}</h1>
          <p className="mt-2 text-sm text-slate-500">{l.sub}</p>

          <form onSubmit={submit} noValidate className="mt-8 space-y-5">
            <Input label={l.email} icon={Mail} type="email" autoComplete="email" placeholder={l.emailPh} value={email} error={errors.email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInput label={l.password} autoComplete="current-password" placeholder={l.passwordPh} value={password} error={errors.password} onChange={(e) => setPassword(e.target.value)} />
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input type="checkbox" className="size-4 accent-brand" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                {l.remember}
              </label>
              <button type="button" onClick={() => go("forgot")} className="font-bold text-brand hover:underline">{l.forgot}</button>
            </div>
            <Button type="submit" className="h-12 w-full">{l.submit}</Button>
          </form>

          <div className="mt-6"><SocialButtons label={l.or} /></div>

          <div className="mt-8 border-t border-slate-200 pt-6 text-center">
            <p className="mb-4 text-sm text-slate-500">{l.noAccount}</p>
            <Button variant="outline" className="h-12 w-full" onClick={() => go("register")}>{l.create}</Button>
          </div>
        </div>

        <aside className="hidden lg:block">
          <Photo src={IMG.hero} alt="" className="h-64 w-full rounded-3xl" />
          <h2 className="mt-8 text-2xl font-extrabold">{l.sideTitle}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">{l.sideText}</p>
          <div className="mt-6 rounded-2xl bg-brand-soft p-5">
            <p className="flex items-center gap-2 text-sm font-bold text-brand"><ShieldCheck size={18} /> {l.trustTitle}</p>
            <p className="mt-1.5 text-xs leading-6 text-slate-600">{l.trustText}</p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
