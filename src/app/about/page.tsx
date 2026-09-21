import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { DeliveryModels } from "@/components/sections/DeliveryModels";
import { LeadershipGrid } from "@/components/sections/LeadershipGrid";
import { Insights } from "@/components/sections/Insights";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "About | Avenza Consulting",
  description:
    "How Avenza's services span the Temenos ecosystem, the delivery models we flex to fit your team, and the perspectives we're sharing on banking transformation.",
  openGraph: {
    title: "About | Avenza Consulting",
    description:
      "How Avenza's services span the Temenos ecosystem, the delivery models we flex to fit your team, and the perspectives we're sharing on banking transformation.",
    url: "https://www.avenza-consulting.com/about",
    siteName: "Avenza Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Avenza Consulting",
    description:
      "How Avenza's services span the Temenos ecosystem, the delivery models we flex to fit your team, and the perspectives we're sharing on banking transformation.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Ecosystem />
      <DeliveryModels />
      <LeadershipGrid />
      <Insights />
      <ContactCta />
    </>
  );
}
