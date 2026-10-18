import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { fill } from "../../utils/format";
import Button from "../../components/Button";
import Details from "./Details";
import Location from "./Location";
import Rent from "./Rent";
import Occupancy from "./Occupancy";
import Amenities from "./Amenities";
import Photos from "./Photos";
import Ownership from "./Ownership";
import Sidebar from "./Sidebar";
import { validateListing } from "./validate";

// What the form starts with. Text fields start empty; lists (amenities, rules) hold the ids that are ticked.
const EMPTY_FORM = {
  // 1. details
  name: "", type: "", area: "", floor: "", bathrooms: "", description: "",
  // 2. location
  governorate: "", district: "", street: "", university: "", walk: "", address: "",
  // 3. rent
  rent: "", deposit: "", internetWater: "", electricityGas: "", minStay: "", from: "", extra: "",
  // 4. occupancy
  residents: "", places: "", group: "", perRoom: "",
  // 5. amenities
  amenities: [], rules: [], notes: "",
  // 7. ownership
  ownerRole: "",
};

// The whole form: seven numbered sections on one side, the side column on the other.
// This file keeps the form's data and decides what happens on "Submit" and "Save as draft".
// onSubmitted() tells the page that the listing was sent, so it can show the thank-you screen.
export default function ListingForm({ onSubmitted }) {
  const { t, n, lang } = useApp();
  const a = t.addListing;

  const [form, setForm] = useState(EMPTY_FORM); // all the typed and chosen values
  const [photos, setPhotos] = useState([]); // [{ id, file, url, space }]
  const [doc, setDoc] = useState(null); // the ownership document (a File) or null
  const [agree, setAgree] = useState(false); // the confirmation checkbox
  const [errors, setErrors] = useState({}); // error messages, by field name
  const [draftAt, setDraftAt] = useState(null); // when "Save as draft" was last pressed

  const clearError = (key) => setErrors((e) => ({ ...e, [key]: undefined }));

  // Change one field, and remove its error message.
  const setField = (key, value) => {
    // A new governorate means the old district no longer belongs to it.
    setForm((f) => ({ ...f, [key]: value, ...(key === "governorate" ? { district: "" } : {}) }));
    clearError(key);
  };
  // Tick or untick one item inside a list field (amenities, rules).
  const toggleItem = (key, id) =>
    setForm((f) => ({ ...f, [key]: f[key].includes(id) ? f[key].filter((x) => x !== id) : [...f[key], id] }));
  const changePhotos = (list) => {
    setPhotos(list);
    clearError("photos");
  };
  const changeDoc = (file) => {
    setDoc(file);
    clearError("doc");
  };

  // Simulation: nothing is saved yet. The Node.js backend will receive { ...form, photos, doc } later.
  const submit = (ev) => {
    ev.preventDefault();
    const found = validateListing({ form, photos, doc, agree, t, n });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Scroll to the first problem so nobody has to hunt for it.
      setTimeout(() => document.querySelector("[data-error]")?.scrollIntoView({ block: "center", behavior: "smooth" }), 50);
      return;
    }
    onSubmitted();
  };

  // Simulation: this only shows the "saved" message. The backend will really store the draft later.
  const saveDraft = () => setDraftAt(new Date());
  const draftTime = draftAt?.toLocaleTimeString(lang === "ar" ? "ar-EG" : "en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
      <form onSubmit={submit} noValidate className="min-w-0 space-y-6">
        <Details form={form} errors={errors} onField={setField} />
        <Location form={form} errors={errors} onField={setField} />
        <Rent form={form} errors={errors} onField={setField} />
        <Occupancy form={form} errors={errors} onField={setField} />
        <Amenities form={form} errors={errors} onField={setField} onToggle={toggleItem} />
        <Photos photos={photos} error={errors.photos} onChange={changePhotos} />
        <Ownership form={form} errors={errors} onField={setField} doc={doc} onDoc={changeDoc} />

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-brand"
              checked={agree}
              onChange={(e) => { setAgree(e.target.checked); clearError("agree"); }}
            />
            {a.confirm}
          </label>
          {errors.agree && <p data-error className="mt-1.5 text-xs font-semibold text-red-600">{errors.agree}</p>}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="submit" className="h-12 w-full">{a.submit}</Button>
          <Button variant="outline" className="h-12 w-full" onClick={saveDraft}>{a.draft}</Button>
        </div>
        <div className="space-y-1 text-center text-xs text-slate-500">
          <p aria-live="polite" className="font-semibold text-emerald-700">{draftAt && fill(a.draftSaved, { time: draftTime })}</p>
          <p>{a.footnote}</p>
        </div>
      </form>
      <Sidebar />
    </div>
  );
}
