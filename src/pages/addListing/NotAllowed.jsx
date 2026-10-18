import { Lock } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button";

// Shown instead of the form when the visitor is not logged in, or is a student.
// (The backend must enforce this rule later too. Hiding the form here is only the friendly part.)
export default function NotAllowed() {
  const { t, go, loggedIn } = useApp();
  const g = t.addListing.guard;
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-soft text-brand"><Lock size={24} /></span>
      <h1 className="mt-4 text-xl font-extrabold">{loggedIn ? g.studentTitle : g.visitorTitle}</h1>
      <p className="mb-6 mt-2 text-sm leading-7 text-slate-500">{loggedIn ? g.studentText : g.visitorText}</p>
      {loggedIn ? (
        <Button className="w-full" onClick={() => go("dashboard")}>{g.dashboard}</Button>
      ) : (
        <Button className="w-full" onClick={() => go("login")}>{g.login}</Button>
      )}
    </div>
  );
}
