import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { fill } from "../utils/format";
import { hasContactInfo } from "../utils/validators";
import { LIMITS } from "../data/limits";
import Modal from "../components/Modal";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import StarRating from "../components/StarRating";
import DoneState from "./DoneState";

// "Write a review" window (landlords review tenants, tenants review landlords).
// data (all optional): { kind: "landowner" | "tenant", name, listing, meta, onSubmitted }
//   onSubmitted = a function the page can pass to learn that the review was sent
//   kind = who is being reviewed. Missing values fall back to the sample text.
export default function ReviewDialog({ data = {}, onClose }) {
  const { t, n } = useApp();
  const r = t.dialogs.review;
  const kind = data.kind ?? "landowner";
  const k = r.kinds[kind];
  const target = { ...r.sample, ...data };

  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!rating) found.rating = r.errors.rating;
    if (text.trim().length < LIMITS.min) found.text = fill(r.errors.short, { min: n(LIMITS.min) });
    else if (hasContactInfo(text)) found.text = r.errors.contact;
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    // Simulation: nothing is sent yet. The backend will save { rating, text } and send it for moderation.
    data.onSubmitted?.();
    setDone(true);
  };

  return (
    <Modal title={r.title} width="max-w-xl" onClose={onClose}>
      {done ? (
        <DoneState title={r.done.title} text={r.done.text} button={r.done.button} onClose={onClose} />
      ) : (
        <form onSubmit={submit} noValidate className="space-y-5">
          <p className="text-sm text-slate-500">{k.sub}</p>

          <div className="rounded-2xl bg-mist p-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <Avatar name={target.name} className="size-11 text-base" />
              <div>
                <p className="text-sm font-extrabold">{target.name}</p>
                <p className="text-[11px] text-slate-500">{k.caption}</p>
              </div>
            </div>
            <p className="mt-3 text-sm font-extrabold">{target.listing}</p>
            <p className="mt-1 text-[11px] text-slate-500">{target.meta}</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold">{r.ratingLabel} <span className="text-brand">*</span></p>
            <StarRating value={rating} label={r.ratingLabel} onChange={(v) => { setRating(v); setErrors((x) => ({ ...x, rating: undefined })); }} />
            <p className="mt-2 text-xs font-semibold text-brand" aria-live="polite">
              {rating ? fill(r.outOf, { n: n(rating), label: r.labels[rating - 1] }) : r.choose}
            </p>
            {errors.rating && <p data-error className="mt-1.5 text-xs font-semibold text-red-600">{errors.rating}</p>}
          </div>

          <div>
            <label htmlFor="review-text" className="mb-2 block text-sm font-bold">{r.experience} <span className="text-brand">*</span></label>
            <textarea
              id="review-text"
              rows={5}
              maxLength={LIMITS.max}
              value={text}
              placeholder={r.placeholder}
              aria-invalid={!!errors.text}
              onChange={(e) => { setText(e.target.value); setErrors((x) => ({ ...x, text: undefined })); }}
              className={`w-full resize-none rounded-xl border p-4 text-sm leading-relaxed outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 ${errors.text ? "border-red-400" : "border-slate-200"}`}
            />
            <div className="mt-1.5 flex items-start justify-between gap-3 text-[11px] text-slate-500">
              <span>{fill(k.hint, { max: n(LIMITS.max) })}</span>
              <span className="shrink-0">{n(text.length)} / {n(LIMITS.max)}</span>
            </div>
            {errors.text && <p data-error className="mt-1.5 text-xs font-semibold text-red-600">{errors.text}</p>}
          </div>

          <p className="flex items-start gap-2.5 rounded-xl bg-brand-soft px-4 py-3 text-xs leading-relaxed text-slate-600">
            <MessageCircle size={16} className="mt-0.5 shrink-0 text-brand" />
            {r.notice}
          </p>

          <div className="flex gap-3">
            <Button type="submit" className="flex-[1.4]">{r.submit}</Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>{r.cancel}</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
