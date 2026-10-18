import { useEffect, useRef, useState } from "react";
import { ChevronDown, ImagePlus, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { fill } from "../utils/format";
import { MAX_SIZE, validateImage } from "../utils/files";
import { LISTING } from "../data/listing";

// Upload several listing photos: thumbnails on top, a dashed "add photos" box below.
// Each photo has a caption (what it shows). The first photo is the main one.
//  photos   = the list kept by the page: [{ id, file, url, space }]
//             url = a preview made from the file; space = what the photo shows ("room", "kitchen", ...)
//  onChange = called with the new list whenever a photo is added, removed, moved or re-captioned
//  error    = a message from the page (for example "add at least 3 photos")
// The photos only live in the browser for now. The Node.js backend will receive the files later.
export default function PhotoUploader({ photos, onChange, error }) {
  const { t, n } = useApp();
  const p = t.addListing.photos;
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [problem, setProblem] = useState(""); // message about the last files that were refused

  const sizeMb = MAX_SIZE / 1024 / 1024;
  const full = photos.length >= LISTING.photosMax;

  // Previews use memory. When this box leaves the screen, give that memory back.
  const latest = useRef(photos);
  latest.current = photos;
  useEffect(() => () => latest.current.forEach((x) => URL.revokeObjectURL(x.url)), []);

  const addFiles = (fileList) => {
    let issue = "";
    const good = [];
    for (const file of Array.from(fileList)) {
      const bad = validateImage(file); // "type", "size" or ""
      if (bad) issue = issue || fill(p.errors[bad], { size: n(sizeMb) });
      else good.push(file);
    }
    const room = LISTING.photosMax - photos.length;
    if (good.length > room) issue = issue || fill(p.errors.max, { max: n(LISTING.photosMax) });

    // Each new photo gets the first caption that is not used yet (Room, Living room, Kitchen ...), then "Other".
    const used = photos.map((x) => x.space);
    const added = good.slice(0, room).map((file) => {
      const space = p.spaces.find((s) => s.id !== "other" && !used.includes(s.id))?.id ?? "other";
      used.push(space);
      return { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, file, url: URL.createObjectURL(file), space };
    });
    setProblem(issue);
    if (added.length > 0) onChange([...photos, ...added]);
  };

  const remove = (photo) => {
    URL.revokeObjectURL(photo.url);
    setProblem("");
    onChange(photos.filter((x) => x.id !== photo.id));
  };
  const makeMain = (photo) => onChange([photo, ...photos.filter((x) => x.id !== photo.id)]); // first = main
  const setSpace = (photo, space) => onChange(photos.map((x) => (x.id === photo.id ? { ...x, space } : x)));

  const shownError = problem || error;

  return (
    <div>
      {photos.length > 0 && (
        <ul className="mb-4 grid gap-4 sm:grid-cols-3">
          {photos.map((photo, i) => (
            <li key={photo.id}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-mist sm:aspect-[9/4]">
                <img src={photo.url} alt={fill(p.alt, { n: n(i + 1) })} className="size-full object-cover" />
                {i > 0 && (
                  <button type="button" onClick={() => makeMain(photo)} className="absolute start-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-brand shadow-sm hover:bg-white">
                    {p.makeMain}
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-xs font-semibold text-slate-600">
                <span className="flex min-w-0 items-center gap-1">
                  <span className="relative">
                    <select
                      value={photo.space}
                      aria-label={fill(p.spaceLabel, { n: n(i + 1) })}
                      onChange={(e) => setSpace(photo, e.target.value)}
                      className="cursor-pointer appearance-none bg-transparent pe-4 text-xs font-semibold outline-none focus-visible:underline"
                    >
                      {p.spaces.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                    <ChevronDown size={12} className="pointer-events-none absolute end-0 top-1/2 -translate-y-1/2 text-slate-400" />
                  </span>
                  {i === 0 && <span className="shrink-0">· {p.main}</span>}
                </span>
                <button type="button" aria-label={`${p.remove} ${n(i + 1)}`} onClick={() => remove(photo)} className="shrink-0 text-brand hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        className={`flex flex-col items-center gap-2 rounded-2xl border border-dashed px-4 py-8 text-center ${dragging ? "border-brand bg-brand-soft" : "border-brand/50 bg-brand-soft/60"}`}
      >
        <ImagePlus size={22} className="text-brand" />
        <p className="text-sm font-bold">{p.drop}</p>
        <p className="text-[11px] text-slate-500">{fill(p.hint, { size: n(sizeMb) })}</p>
        <button
          type="button"
          disabled={full}
          onClick={() => inputRef.current?.click()}
          className="mt-1 rounded-lg bg-white px-5 py-2 text-xs font-bold text-brand shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {full ? p.full : p.choose}
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png"
          aria-label={p.choose}
          className="sr-only"
          onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
        />
      </div>

      {shownError && <p data-error className="mt-3 text-xs font-semibold text-red-600">{shownError}</p>}
    </div>
  );
}
