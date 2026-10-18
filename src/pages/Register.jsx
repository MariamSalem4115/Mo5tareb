import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import { isEmail, isPhone, isStrongPassword } from "../utils/validators";
import PageShell from "../components/PageShell";
import Button from "../components/Button";
import AccountType from "./register/AccountType";
import AccountDetails from "./register/AccountDetails";
import Documents from "./register/Documents";
import Sidebar from "./register/Sidebar";

const EMPTY_FORM = { name: "", phone: "", email: "", university: "", password: "", confirm: "" };

export default function Register() {
  const { t, go, setRole } = useApp();
  const r = t.register;

  const [roles, setRoles] = useState({ student: true, owner: false });
  const [form, setForm] = useState(EMPTY_FORM);
  const [docs, setDocs] = useState({ id: null, student: null });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const setDoc = (key, file) => {
    setDocs((d) => ({ ...d, [key]: file }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };
  // Only one role at a time: clicking a card selects it and unselects the other.
  const toggleRole = (key) => setRoles({ student: key === "student", owner: key === "owner" });

  const validate = () => {
    const e = {};
    const er = t.errors;
    if (!form.name.trim()) e.name = er.required;
    if (!isPhone(form.phone)) e.phone = er.phone;
    if (!isEmail(form.email)) e.email = er.email;
    if (roles.student && !form.university) e.university = er.required;
    if (!isStrongPassword(form.password)) e.password = er.passRule;
    if (form.confirm !== form.password || !form.confirm) e.confirm = er.match;
    if (!docs.id) e.id = er.doc;
    if (roles.student && !docs.student) e.student = er.doc;
    if (!agree) e.agree = er.agree;
    return e;
  };

  // Simulation: nothing is sent anywhere yet. The Node.js backend will receive this later.
  const submit = (ev) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setTimeout(() => document.querySelector("[data-error]")?.scrollIntoView({ block: "center", behavior: "smooth" }), 50);
      return;
    }
    setRole(roles.owner ? "landowner" : "student"); // remember which kind of account this is
    setDone(true);
    window.scrollTo({ top: 0 });
  };

  if (done) {
    return (
      <PageShell>
        <div className="mx-auto max-w-md px-5 py-20 text-center">
          <CircleCheck size={52} className="mx-auto text-emerald-600" />
          <h1 className="mt-4 text-2xl font-extrabold">{r.doneTitle}</h1>
          <p className="mb-6 mt-2 text-sm leading-7 text-slate-500">{r.doneText}</p>
          <Button onClick={() => go("login")}>{r.doneButton}</Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-5 py-8 lg:py-10">
        <p className="text-xs text-slate-500">
          <button type="button" onClick={() => go("landing")} className="hover:text-brand">{r.crumbHome}</button> / {r.title}
        </p>
        <h1 className="mt-6 text-3xl font-extrabold md:text-4xl">{r.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{r.sub}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_260px]">
          <form onSubmit={submit} noValidate className="space-y-6">
            <AccountType roles={roles} onToggle={toggleRole} />
            <AccountDetails form={form} errors={errors} onField={setField} isStudent={roles.student} />
            <Documents docs={docs} errors={errors} onDoc={setDoc} isStudent={roles.student} />

            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input type="checkbox" className="mt-0.5 size-4 shrink-0 accent-brand" checked={agree} onChange={(e) => { setAgree(e.target.checked); setErrors((x) => ({ ...x, agree: undefined })); }} />
                {r.agree}
              </label>
              {errors.agree && <p data-error className="mt-1.5 text-xs font-semibold text-red-600">{errors.agree}</p>}
            </div>

            <Button type="submit" className="h-12 w-full">{r.submit}</Button>
            <p className="text-center text-sm">
              {r.have}{" "}
              <button type="button" onClick={() => go("login")} className="font-bold text-brand hover:underline">{r.login}</button>
            </p>
          </form>
          <Sidebar />
        </div>
      </div>
    </PageShell>
  );
}
