import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Achievement } from "@/components/sections/Achievement";
import { Capabilities } from "@/components/sections/Capabilities";
import { WhyAvenza } from "@/components/sections/WhyAvenza";
import { ContactCta } from "@/components/sections/ContactCta";
import { SolarOrbitVisual } from "@/components/ui/SolarOrbitVisual";

export default function Home() {
  return (
    <>
      <Hero />
      <Hero visual={<SolarOrbitVisual />} />
      <WhoWeAre />
      <Achievement />
      <Capabilities />
      <WhyAvenza />
      <ContactCta />
    </>
  );
}
