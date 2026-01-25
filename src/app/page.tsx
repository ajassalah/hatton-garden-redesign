import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JewellersGrid from "@/components/JewellersGrid";
import VisitExperience from "@/components/VisitExperience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar hideBookButton />
      <Hero />
      <JewellersGrid />
      <VisitExperience />
      <Footer />
    </main>
  );
}
