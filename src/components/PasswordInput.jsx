import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useApp } from "../context/AppContext";
import Input from "./Input";

// Input with a show/hide eye button.
export default function PasswordInput(props) {
  const { t } = useApp();
  const [show, setShow] = useState(false);
  return (
    <Input
      {...props}
      type={show ? "text" : "password"}
      action={
        <button type="button" aria-label={show ? t.login.hide : t.login.show} onClick={() => setShow(!show)} className="absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand">
          {show ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      }
    />
  );
}
