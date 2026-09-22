import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { HowWeDeliver } from "@/components/sections/HowWeDeliver";
import { LeadershipGrid } from "@/components/sections/LeadershipGrid";
import { Insights } from "@/components/sections/Insights";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "About | Avenza Consulting",
  description:
    "How Avenza delivers — our continuity-first lifecycle, the team behind it, and the perspectives we're sharing on banking transformation.",
  openGraph: {
    title: "About | Avenza Consulting",
    description:
      "How Avenza delivers — our continuity-first lifecycle, the team behind it, and the perspectives we're sharing on banking transformation.",
    url: "https://www.avenza-consulting.com/about",
    siteName: "Avenza Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Avenza Consulting",
    description:
      "How Avenza delivers — our continuity-first lifecycle, the team behind it, and the perspectives we're sharing on banking transformation.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <HowWeDeliver />
      <LeadershipGrid />
      <Insights />
      <ContactCta />
    </>
  );
}
