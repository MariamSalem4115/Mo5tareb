import { ShieldCheck, Star } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import Button from "../../components/Button";
import PersonAvatar from "../../components/PersonAvatar";

// The big card at the top: photo, name, badges, headline, rating and the main button.
export default function ProfileTop({ subject, sent, onConnect }) {
  const { t, n, rate, go } = useApp();
  const pp = t.publicProfile;
  const isOwner = subject.role === "landowner";

  return (
    <div className="flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex min-w-0 items-center gap-5">
        <PersonAvatar src={subject.avatar} name={subject.name} className="size-24 text-3xl" />
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-extrabold">{subject.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
              <ShieldCheck size={12} /> {pp.badges.identity}
            </span>
            <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand">
              {isOwner ? pp.badges.owner : pp.badges.student}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">{subject.headline}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <span className="flex text-amber-500" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={13} fill="currentColor" />)}
            </span>
            {fill(pp.rating, { avg: rate(subject.rating), count: n(subject.count) })}
          </p>
        </div>
      </div>

      {subject.own ? (
        <Button variant="outline" onClick={() => go("dashboard")}>{pp.actions.edit}</Button>
      ) : (
        !isOwner && <Button disabled={sent} onClick={onConnect}>{sent ? pp.actions.sent : pp.actions.connect}</Button>
      )}
    </div>
  );
}
