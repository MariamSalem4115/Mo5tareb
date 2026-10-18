import { CircleCheck, Flag, PenLine } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { IMG } from "../../data/images";
import Photo from "../../components/Photo";
import Button from "../../components/Button";

// One completed stay: photo, details, and the buttons "Write a review" / "Report listing".
// stay = sample data (price, image, kind), text = translated texts, reviewed = true when a review was sent.
export default function StayCard({ stay, text, reviewed, onReviewed }) {
  const { t, role, money, openDialog } = useApp();
  const p = t.staysPage;

  const write = () =>
    openDialog("review", {
      kind: stay.kind,
      name: text.name,
      listing: text.place,
      meta: `${text.area} · ${text.dates}`,
      onSubmitted: onReviewed, // the window tells us when the review was sent
    });

  const report = () => openDialog("report", { title: text.place, meta: `${text.name} · ${text.area}` });

  return (
    <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white md:grid-cols-[260px_1fr]">
      <Photo src={IMG.rooms[stay.image]} alt={text.place} className="h-48 w-full md:h-full" />

      <div className="flex flex-col justify-between gap-5 p-6">
        <div>
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand">{p.completed}</span>
          <h2 className="mt-3 text-xl font-extrabold">{text.place}</h2>
          <p className="mt-1 text-sm text-slate-500">{text.area}</p>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-[11px] text-slate-500">{p.who[role]}</dt>
              <dd className="font-bold">{text.name}</dd>
            </div>
            <div>
              <dt className="text-[11px] text-slate-500">{p.dates}</dt>
              <dd className="font-bold">{text.dates}</dd>
            </div>
            <div>
              <dt className="text-[11px] text-slate-500">{p.rent}</dt>
              <dd className="font-bold">{money(stay.price)} <span className="text-xs font-normal text-slate-500">{p.perMonth}</span></dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {reviewed ? (
            <p className="flex items-center gap-2 text-sm font-bold text-emerald-700" role="status">
              <CircleCheck size={18} />
              <span>{p.sent} <span className="text-xs font-normal text-slate-500">· {p.sentNote}</span></span>
            </p>
          ) : (
            <Button icon={PenLine} onClick={write}>{p.write}</Button>
          )}
          {/* Reporting makes sense for tenants (the listing is the landowner's). */}
          {role === "student" && (
            <Button variant="outline" icon={Flag} className="py-2 text-xs" onClick={report}>{p.report}</Button>
          )}
        </div>
      </div>
    </article>
  );
}
