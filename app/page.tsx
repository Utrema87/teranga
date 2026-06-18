import Hero from "@/components/home/Hero";
import StatsBand from "@/components/home/StatsBand";
import Marquee from "@/components/Marquee";
import GammesSection from "@/components/home/GammesSection";
import ZeroWaste from "@/components/home/ZeroWaste";
import OriginSection from "@/components/home/OriginSection";
import B2BTeaser from "@/components/home/B2BTeaser";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Marquee />
      <GammesSection />
      <ZeroWaste />
      <OriginSection />
      <B2BTeaser />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
