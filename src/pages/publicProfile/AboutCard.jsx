import { useApp } from "../../context/AppContext";
import LifestyleChips from "../../components/LifestyleChips";

// "About": the bio and the lifestyle pills.
export default function AboutCard({ subject }) {
  const { t } = useApp();
  const a = t.publicProfile.about;
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-extrabold">{a.title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{subject.bio}</p>
      {subject.options.length > 0 && (
        <>
          <h3 className="mb-3 mt-6 text-sm font-bold">{a.lifestyle}</h3>
          <LifestyleChips options={subject.options} />
        </>
      )}
    </section>
  );
}
