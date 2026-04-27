import Hero from "@/components/Hero";
import Letter from "@/components/Letter";
import Countdown from "@/components/Countdown";
import Schedule from "@/components/Schedule";
import LocationSection from "@/components/Location";
import DressCode from "@/components/DressCode";
import Details from "@/components/Details";
import RsvpSection from "@/components/RsvpSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[#6d001f] text-cream">
      <Hero />
      <Letter />
      <Countdown />
      <Schedule />
      <LocationSection />
      <DressCode />
      <Details />
      <RsvpSection />
      <Footer />
    </main>
  );
}
