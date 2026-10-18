import { useApp } from "../context/AppContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SimpleFooter from "./SimpleFooter";

// The shell shared by the public pages (Roommates, Public profile, Support):
// top bar, your page in the middle, and the full footer for visitors or the slim one once logged in.
export default function PageFrame({ children }) {
  const { loggedIn } = useApp();
  return (
    <div className="flex min-h-screen flex-col bg-mist">
      <Navbar />
      <main className="flex-1">{children}</main>
      {loggedIn ? <SimpleFooter /> : <Footer />}
    </div>
  );
}
