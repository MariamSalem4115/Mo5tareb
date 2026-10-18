import { CircleCheck, Star } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import { IMG } from "../../data/images";
import Button from "../../components/Button";
import PersonAvatar from "../../components/PersonAvatar";
import LifestyleChips from "../../components/LifestyleChips";

// One student in the Roommates list.
//  person = the numbers (data/roommates.js), text = name, field, city, bio (i18n/roommatesPage.js)
//  sent = a request was already sent, onConnect() = the "Connect" button was pressed
export default function PersonCard({ person, text, sent, onConnect }) {
  const { t, n, rate, money, go } = useApp();
  const c = t.roommatesPage.card;
  const university = t.register.universities[person.university];

  return (
    <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-4">
        <PersonAvatar src={IMG[person.img]} name={text.name} className="size-16 text-xl" />
        <div className="min-w-0">
          <h2 className="truncate text-lg font-extrabold">{text.name}{c.sep}{n(person.age)}</h2>
          <p className="text-xs text-slate-500">{university} · {text.field}</p>
          <p className="mt-1 text-xs text-slate-500">{t.dashboard.bio.years[person.year]}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-bold text-emerald-700">
          <CircleCheck size={13} /> {c.verified}
        </span>
        <span className="inline-flex items-center gap-1 font-bold">
          <Star size={13} className="fill-amber-400 text-amber-400" /> {rate(person.rating)}
          <span className="font-normal text-slate-400">({n(person.reviews)})</span>
        </span>
        <span className="font-semibold text-brand">{fill(c.budget, { amount: money(person.budget) })}</span>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">“{text.bio}”</p>
      <LifestyleChips options={person.options} className="mt-3" />

      <div className="mt-5 grid grid-cols-2 gap-3 pt-1">
        <Button variant="outline" onClick={() => go("publicProfile", { personId: person.id })}>{c.view}</Button>
        <Button disabled={sent} onClick={onConnect}>{sent ? c.sent : c.connect}</Button>
      </div>
    </article>
  );
}
