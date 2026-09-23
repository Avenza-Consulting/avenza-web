import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Achievement } from "@/components/sections/Achievement";
import { Capabilities } from "@/components/sections/Capabilities";
import { WhyAvenza } from "@/components/sections/WhyAvenza";
import { ContactCta } from "@/components/sections/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Achievement />
      <Capabilities />
      <WhyAvenza />
      <ContactCta />
    </>
  );
}
