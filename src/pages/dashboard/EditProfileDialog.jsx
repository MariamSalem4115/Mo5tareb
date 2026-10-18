import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";

// Pop-up to change the display name. The new name appears in the top bar and the greeting.
export default function EditProfileDialog({ onClose }) {
  const { t, displayName, updateProfile } = useApp();
  const e = t.dashboard.editDialog;
  const [name, setName] = useState(displayName);
  const [error, setError] = useState("");

  const submit = (ev) => {
    ev.preventDefault();
    if (!name.trim()) return setError(t.errors.required);
    updateProfile({ name: name.trim() });
    onClose();
  };

  return (
    <Modal title={e.title} onClose={onClose}>
      <form onSubmit={submit} noValidate className="space-y-5">
        <Input label={e.name} autoFocus value={name} error={error} onChange={(ev) => { setName(ev.target.value); setError(""); }} />
        <div className="flex gap-3">
          <Button type="submit" className="flex-1">{e.save}</Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>{e.cancel}</Button>
        </div>
      </form>
    </Modal>
  );
}
