import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { isEmail } from "../../utils/validators";
import { LIMITS } from "../../data/limits";
import { SUPPORT } from "../../data/support";
import Button from "../../components/Button";
import Input from "../../components/Input";
import SelectField from "../../components/SelectField";
import TextArea from "../../components/TextArea";

// The contact form. After sending, it is replaced by a thank-you message.
export default function ContactForm() {
  const { t, n, loggedIn, displayName } = useApp();
  const f = t.supportPage.form;
  const [form, setForm] = useState({ topic: "", name: loggedIn ? displayName : "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sentTo, setSentTo] = useState(""); // the email we will reply to; empty = not sent yet

  const setField = (key) => (e) => {
    setForm((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  // Simulation: nothing is sent yet. The Node.js backend will receive `form` and email the support team.
  const submit = (ev) => {
    ev.preventDefault();
    const found = {};
    if (!form.topic) found.topic = t.errors.required;
    if (!form.name.trim()) found.name = t.errors.required;
    if (!form.email.trim()) found.email = t.errors.required;
    else if (!isEmail(form.email)) found.email = t.errors.email;
    const message = form.message.trim();
    if (!message) found.message = t.errors.required;
    else if (message.length < LIMITS.min) found.message = fill(f.tooShort, { min: n(LIMITS.min) });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setTimeout(() => document.querySelector("#support-contact [data-error]")?.scrollIntoView({ block: "center", behavior: "smooth" }), 50);
      return;
    }
    setSentTo(form.email.trim());
  };

  if (sentTo) {
    const s = t.supportPage.sent;
    return (
      <div className="py-6 text-center" role="status">
        <CircleCheck size={48} className="mx-auto text-emerald-600" />
        <h3 className="mt-3 text-xl font-extrabold">{s.title}</h3>
        <p className="mb-5 mt-2 text-sm leading-7 text-slate-500">{fill(s.text, { email: sentTo })}</p>
        <Button variant="outline" onClick={() => { setSentTo(""); setForm((v) => ({ ...v, topic: "", message: "" })); }}>{s.another}</Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <SelectField label={f.topic} required options={f.topics} placeholder={f.topicPh} value={form.topic} error={errors.topic} onChange={setField("topic")} />
      <div className="grid gap-5 md:grid-cols-2">
        <Input label={f.name} required autoComplete="name" placeholder={f.namePh} value={form.name} error={errors.name} onChange={setField("name")} />
        <Input label={f.email} required type="email" autoComplete="email" placeholder={f.emailPh} value={form.email} error={errors.email} onChange={setField("email")} />
      </div>
      <TextArea label={f.message} required rows={6} maxLength={SUPPORT.messageMax} placeholder={f.messagePh} hint={f.hint} value={form.message} error={errors.message} onChange={setField("message")} />
      <Button type="submit" className="h-12 w-full">{f.submit}</Button>
    </form>
  );
}
