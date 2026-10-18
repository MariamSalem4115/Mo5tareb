import { Ban, CigaretteOff, DoorClosed, Moon, PawPrint, Sparkles, Users } from "lucide-react";
import { useApp } from "../../context/AppContext";

const RULE_ICONS = { quiet: Moon, noSmoking: CigaretteOff, cleaning: Sparkles, noPets: PawPrint, midnight: DoorClosed };

// House rules. The first rule comes from who the home is for (women only, men only, mixed); the rest from data/listings.js.
export default function HouseRules({ home }) {
  const { t } = useApp();
  const rules = [{ id: home.gender, Icon: Users }, ...home.rules.map((id) => ({ id, Icon: RULE_ICONS[id] ?? Ban }))];
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-extrabold">{t.listingPage.rules}</h2>
      <ul className="mt-4 space-y-3">
        {rules.map(({ id, Icon }) => (
          <li key={id} className="flex items-center gap-3 text-sm text-slate-600">
            <Icon size={16} className="shrink-0 text-brand" /> {t.listings.rules[id]}
          </li>
        ))}
      </ul>
    </section>
  );
}
