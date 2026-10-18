import { CircleCheck } from "lucide-react";
import Button from "../components/Button";

// The "thank you" screen shown inside a window after sending.
export default function DoneState({ title, text, button, onClose }) {
  return (
    <div className="py-4 text-center">
      <CircleCheck size={48} className="mx-auto text-emerald-600" />
      <h3 className="mt-3 text-lg font-extrabold">{title}</h3>
      <p className="mx-auto mb-6 mt-2 max-w-xs text-sm text-slate-600">{text}</p>
      <Button className="w-full" onClick={onClose}>{button}</Button>
    </div>
  );
}
