import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { STAYS } from "../../data/stays";
import StayCard from "./StayCard";

// The list of past stays. It remembers which ones you reviewed during this visit.
export default function StaysList() {
  const { t, role } = useApp();
  const p = t.staysPage;
  const [sent, setSent] = useState([]); // ids of stays reviewed just now

  const stays = STAYS[role];
  if (stays.length === 0) return <p className="rounded-3xl bg-white p-8 text-center text-sm text-slate-500">{p.empty}</p>;

  return (
    <div className="space-y-5">
      {stays.map((stay) => (
        <StayCard
          key={stay.id}
          stay={stay}
          text={p.items[role][stay.id]}
          reviewed={stay.reviewed || sent.includes(stay.id)}
          onReviewed={() => setSent((list) => [...list, stay.id])}
        />
      ))}
    </div>
  );
}
