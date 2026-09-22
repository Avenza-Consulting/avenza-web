import type { Metadata } from "next";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Industry Expertise | Avenza Consulting",
  description:
    "See how Avenza's services span the entire Temenos banking ecosystem — from digital channels through core banking, payments and data, to cloud and banking technology transformation.",
  openGraph: {
    title: "Industry Expertise | Avenza Consulting",
    description:
      "See how Avenza's services span the entire Temenos banking ecosystem — from digital channels through core banking, payments and data, to cloud and banking technology transformation.",
    url: "https://www.avenza-consulting.com/about/industry-expertise",
    siteName: "Avenza Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Expertise | Avenza Consulting",
    description:
      "See how Avenza's services span the entire Temenos banking ecosystem — from digital channels through core banking, payments and data, to cloud and banking technology transformation.",
  },
};

export default function IndustryExpertisePage() {
  return (
    <>
      <Ecosystem />
      <ContactCta />
    </>
  );
}
