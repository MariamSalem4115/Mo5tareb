import { Mail, Phone, User } from "lucide-react";
import { useApp } from "../../context/AppContext";
import SectionCard from "../../components/SectionCard";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import SelectField from "../../components/SelectField";
import SocialButtons from "../../components/SocialButtons";

// Step 2: name, phone, email, university, password.
export default function AccountDetails({ form, errors, onField, isStudent }) {
  const { t } = useApp();
  const r = t.register;
  const bind = (key) => ({ value: form[key], error: errors[key], onChange: (e) => onField(key, e.target.value) });

  return (
    <SectionCard step={2} title={r.detailsTitle} sub={r.detailsSub}>
      <SocialButtons label={r.social} />
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Input label={r.name} required icon={User} autoComplete="name" placeholder={r.namePh} {...bind("name")} />
        <Input label={r.phone} required icon={Phone} type="tel" inputMode="tel" autoComplete="tel" placeholder={r.phonePh} {...bind("phone")} />
        <Input label={r.email} required icon={Mail} type="email" autoComplete="email" placeholder={r.emailPh} {...bind("email")} />
        <SelectField label={r.university} required={isStudent} options={r.universities} placeholder={r.universityPh} {...bind("university")} />
        <PasswordInput label={r.password} required autoComplete="new-password" placeholder={r.passwordPh} hint={r.hint} {...bind("password")} />
        <PasswordInput label={r.confirm} required autoComplete="new-password" placeholder={r.confirmPh} {...bind("confirm")} />
      </div>
    </SectionCard>
  );
}
