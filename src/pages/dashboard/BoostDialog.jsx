import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { DASH } from "../../data/dashboard";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

// Pop-up for buying a 7-day boost. Payment is only simulated until the backend exists.
// activeItems = listings that can be boosted, startId = listing to preselect ("" = first one).
export default function BoostDialog({ activeItems, startId, onConfirm, onClose }) {
  const { t, money } = useApp();
  const b = t.dashboard.boostDialog;
  const [chosen, setChosen] = useState(startId || activeItems[0]?.id || "");
  const [done, setDone] = useState(false);

  const confirm = () => {
    onConfirm(chosen); // real payment call goes here later
    setDone(true);
  };

  return (
    <Modal title={b.title} onClose={onClose}>
      {done ? (
        <div className="py-4 text-center">
          <CircleCheck size={44} className="mx-auto text-emerald-600" />
          <p className="mb-5 mt-3 text-sm font-bold">{b.done}</p>
          <Button className="w-full" onClick={onClose}>{b.close}</Button>
        </div>
      ) : activeItems.length === 0 ? (
        <div>
          <p className="mb-5 text-sm text-slate-600">{b.none}</p>
          <Button className="w-full" onClick={onClose}>{b.close}</Button>
        </div>
      ) : (
        <div className="space-y-5">
          <p className="text-sm text-slate-600">{b.text}</p>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold">{b.listing}</span>
            <select value={chosen} onChange={(e) => setChosen(e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
              {activeItems.map((i) => <option key={i.id} value={i.id}>{i.title}</option>)}
            </select>
          </label>

          <div className="flex items-center justify-between rounded-xl bg-mist px-4 py-3">
            <span className="text-sm font-bold">{b.total}</span>
            <span className="text-lg font-extrabold text-brand">{money(DASH.boostPrice)}</span>
          </div>

          <Button className="w-full" onClick={confirm}>{b.confirm}</Button>
          <p className="text-center text-[11px] text-slate-500">{b.simulated}</p>
        </div>
      )}
    </Modal>
  );
}
