import { useApp } from "../context/AppContext";
import PageShell from "../components/PageShell";
import Button from "../components/Button";

// Shown for pages we have not built yet (search, listing details, ...).
export default function ComingSoon() {
  const { t, go } = useApp();
  return (
    <PageShell>
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <h1 className="text-2xl font-extrabold">{t.misc.soon}</h1>
        <p className="mb-6 mt-2 text-sm text-slate-500">{t.misc.soonText}</p>
        <Button onClick={() => go("landing")}>{t.misc.back}</Button>
      </div>
    </PageShell>
  );
}
