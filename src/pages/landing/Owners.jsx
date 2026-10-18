import { Check, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { IMG } from "../../data/images";
import Button from "../../components/Button";
import Photo from "../../components/Photo";

export default function Owners() {
  const { t, go } = useApp();
  const o = t.owners;
  return (
    <section className="bg-mist py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
        <Photo src={IMG.owner} alt="" className="h-72 w-full rounded-3xl lg:h-80" />
        <div>
          <p className="text-xs font-bold text-brand">{o.eyebrow}</p>
          <h2 className="mt-1 text-3xl font-extrabold">{o.title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">{o.text}</p>
          <ul className="mt-5 space-y-2.5">
            {o.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm"><Check size={16} className="shrink-0 text-brand" />{p}</li>
            ))}
          </ul>
          <Button icon={Plus} className="mt-6" onClick={() => go("register")}>{o.button}</Button>
        </div>
      </div>
    </section>
  );
}
