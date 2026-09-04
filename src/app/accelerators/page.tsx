import type { Metadata } from "next";
import { AcceleratorsHero } from "@/components/sections/AcceleratorsHero";
import { AcceleratorEngine } from "@/components/sections/AcceleratorEngine";
import { AcceleratorsCatalog } from "@/components/sections/AcceleratorsCatalog";
import { AcceleratorsCta } from "@/components/sections/AcceleratorsCta";

export const metadata: Metadata = {
  title: "Accelerators | Avenza Consulting",
  description:
    "Proprietary accelerators built from real programmes — reusable frameworks, templates and tooling that take the effort and risk out of core banking transformation.",
  openGraph: {
    title: "Accelerators | Avenza Consulting",
    description:
      "Proprietary accelerators built from real programmes — reusable frameworks, templates and tooling that take the effort and risk out of core banking transformation.",
    url: "https://www.avenza-consulting.com/accelerators",
    siteName: "Avenza Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Accelerators | Avenza Consulting",
    description:
      "Proprietary accelerators built from real programmes — reusable frameworks, templates and tooling that take the effort and risk out of core banking transformation.",
  },
};

export default function AcceleratorsPage() {
  return (
    <>
      <AcceleratorsHero />
      <AcceleratorEngine />
      <AcceleratorsCatalog />
      <AcceleratorsCta />
    </>
  );
}
