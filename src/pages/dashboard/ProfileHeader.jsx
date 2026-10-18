import { useRef, useState } from "react";
import { Pencil, ShieldCheck, Star } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { validateFile } from "../../utils/files";
import { fill } from "../../utils/format";
import { DASH } from "../../data/dashboard";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import EditProfileDialog from "./EditProfileDialog";

// The big card at the top: photo, name, badges, rating, and the "Edit profile" button.
// savedYear = the university year chosen in the Bio card (index into bio.years).
export default function ProfileHeader({ savedYear }) {
  const { t, n, rate, role, displayName, profile, updateProfile } = useApp();
  const d = t.dashboard;
  const fileRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [photoError, setPhotoError] = useState("");

  // Headline under the name: a student shows the university + year, a landowner shows the city.
  const headline = role === "student" ? `${d.university} · ${d.bio.years[savedYear]}` : d.landownerLine;

  const pickPhoto = (e) => {
    const file = e.target.files[0];
    e.target.value = ""; // lets you pick the same file again later
    if (!file) return;
    const issue = validateFile(file, t);
    setPhotoError(issue);
    if (issue) return;
    if (profile.avatar) URL.revokeObjectURL(profile.avatar); // free the memory of the old preview
    updateProfile({ avatar: URL.createObjectURL(file) }); // preview only; real upload comes with the backend
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex min-w-0 items-center gap-5">
        <div className="relative shrink-0">
          <Avatar src={profile.avatar} name={displayName} className="size-24 text-3xl" />
          <button
            type="button"
            aria-label={d.changePhoto}
            onClick={() => fileRef.current?.click()}
            className="absolute -bottom-1 end-0 grid size-8 place-items-center rounded-full border-2 border-white bg-brand text-white hover:bg-brand-dark"
          >
            <Pencil size={13} />
          </button>
          <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png" className="sr-only" onChange={pickPhoto} />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-2xl font-extrabold">{displayName}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
              <ShieldCheck size={12} />
              {d.identityVerified}
            </span>
            <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand">{d.roles[role]}</span>
          </div>
          <p className="mt-2 text-sm text-slate-600">{headline}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <span className="flex text-amber-500" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={13} fill="currentColor" />)}
            </span>
            {fill(d.rating, { avg: rate(DASH.rating), count: n(DASH.ratingsCount) })}
          </p>
          {photoError && <p className="mt-2 text-xs font-semibold text-red-600">{photoError}</p>}
        </div>
      </div>

      <Button variant="outline" icon={Pencil} onClick={() => setEditing(true)}>{d.editProfile}</Button>
      {editing && <EditProfileDialog onClose={() => setEditing(false)} />}
    </div>
  );
}
