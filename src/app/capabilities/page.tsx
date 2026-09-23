import type { Metadata } from "next";
import { CapabilitiesHero } from "@/components/sections/CapabilitiesHero";
import { CapabilitiesList } from "@/components/sections/CapabilitiesList";
import { CapabilitiesCta } from "@/components/sections/CapabilitiesCta";

export const metadata: Metadata = {
  title: "Capabilities | Avenza Consulting",
  description:
    "Thirteen capabilities that span the whole banking-platform lifecycle — deep enough to trust with a critical programme, joined up enough to run as one.",
  openGraph: {
    title: "Capabilities | Avenza Consulting",
    description:
      "Thirteen capabilities that span the whole banking-platform lifecycle — deep enough to trust with a critical programme, joined up enough to run as one.",
    url: "https://www.avenza-consulting.com/capabilities",
    siteName: "Avenza Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capabilities | Avenza Consulting",
    description:
      "Thirteen capabilities that span the whole banking-platform lifecycle — deep enough to trust with a critical programme, joined up enough to run as one.",
  },
};

export default function CapabilitiesPage() {
  return (
    <>
      <CapabilitiesHero />
      <CapabilitiesList />
      <CapabilitiesCta />
    </>
  );
}
