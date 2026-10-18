import { CircleCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button";

// The "thank you" screen shown after the listing was sent.
// onAnother() starts a fresh, empty form.
export default function Success({ onAnother }) {
  const { t, go } = useApp();
  const d = t.addListing.done;
  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <CircleCheck size={52} className="mx-auto text-emerald-600" />
      <h1 className="mt-4 text-2xl font-extrabold">{d.title}</h1>
      <p className="mb-6 mt-2 text-sm leading-7 text-slate-500">{d.text}</p>
      <div className="space-y-3">
        <Button className="w-full" onClick={() => go("dashboard")}>{d.dashboard}</Button>
        <Button variant="outline" className="w-full" onClick={onAnother}>{d.another}</Button>
      </div>
    </div>
  );
}
