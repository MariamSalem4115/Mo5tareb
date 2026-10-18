import { useApp } from "../../context/AppContext";
import Button from "../../components/Button";

export default function FinalCta() {
  const { t, go } = useApp();
  const c = t.cta;
  return (
    <section className="bg-brand">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold leading-[1.4] text-white">{c.title}</h2>
          <p className="mt-2 text-sm text-white/80">{c.sub}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="white" onClick={() => go("register")}>{c.register}</Button>
          <Button variant="ghostWhite" onClick={() => go("login")}>{c.login}</Button>
        </div>
      </div>
    </section>
  );
}
