import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { HowWeDeliver } from "@/components/sections/HowWeDeliver";
import { LeadershipGrid } from "@/components/sections/LeadershipGrid";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "About | Avenza Consulting",
  description:
    "How Avenza delivers — our continuity-first lifecycle and the team behind it.",
  openGraph: {
    title: "About | Avenza Consulting",
    description:
      "How Avenza delivers — our continuity-first lifecycle and the team behind it.",
    url: "https://www.avenza-consulting.com/about",
    siteName: "Avenza Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Avenza Consulting",
    description:
      "How Avenza delivers — our continuity-first lifecycle and the team behind it.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <HowWeDeliver />
      <LeadershipGrid />
      <ContactCta />
    </>
  );
}
