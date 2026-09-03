import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Capabilities } from "@/components/sections/Capabilities";
import { Journey } from "@/components/sections/Journey";
import { Accelerators } from "@/components/sections/Accelerators";
import { AiBanking } from "@/components/sections/AiBanking";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { DeliveryModels } from "@/components/sections/DeliveryModels";
import { WhyAvenza } from "@/components/sections/WhyAvenza";
import { Insights } from "@/components/sections/Insights";
import { ContactCta } from "@/components/sections/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Capabilities />
      <Journey />
      <Accelerators />
      <AiBanking />
      <Ecosystem />
      <DeliveryModels />
      <WhyAvenza />
      <Insights />
      <ContactCta />
    </>
  );
}
