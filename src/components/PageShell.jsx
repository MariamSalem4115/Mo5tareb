import Navbar from "./Navbar";
import SimpleFooter from "./SimpleFooter";

// Frame for inner pages: top bar, content, slim footer.
export default function PageShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <SimpleFooter />
    </div>
  );
}
