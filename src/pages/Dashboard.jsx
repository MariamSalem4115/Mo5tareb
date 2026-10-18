import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import SimpleFooter from "../components/SimpleFooter";
import DashboardBody from "./dashboard/DashboardBody";

// User Dashboard page: top bar, the dashboard itself, slim footer.
// key={role} makes React start the body fresh whenever the role changes,
// so the forms inside never show leftovers from the other role.
export default function Dashboard() {
  const { role } = useApp();
  return (
    <div className="flex min-h-screen flex-col bg-mist">
      <Navbar />
      <main className="flex-1">
        <DashboardBody key={role} />
      </main>
      <SimpleFooter />
    </div>
  );
}
