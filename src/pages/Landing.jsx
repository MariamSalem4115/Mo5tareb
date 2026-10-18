import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "./landing/Hero";
import SearchBar from "./landing/SearchBar";
import Featured from "./landing/Featured";
import Campuses from "./landing/Campuses";
import Steps from "./landing/Steps";
import Roommate from "./landing/Roommate";
import Story from "./landing/Story";
import Owners from "./landing/Owners";
import Faq from "./landing/Faq";
import FinalCta from "./landing/FinalCta";

// The home page is just these sections stacked in order.
export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SearchBar />
        <Featured />
        <Campuses />
        <Steps />
        <Roommate />
        <Story />
        <Owners />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
