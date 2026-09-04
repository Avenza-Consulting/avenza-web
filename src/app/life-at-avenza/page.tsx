import type { Metadata } from "next";
import { LifeHero } from "@/components/sections/LifeHero";
import { LifeHighlights } from "@/components/sections/LifeHighlights";
import { LifeGallery } from "@/components/sections/LifeGallery";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Life at Avenza | Avenza Consulting",
  description:
    "A look at culture, work-life balance, and the moments that make Avenza more than a workplace — team events, learning, and everyday fun.",
};

export default function LifeAtAvenzaPage() {
  return (
    <>
      <LifeHero />
      <LifeHighlights />
      <LifeGallery />
      <ContactCta />
    </>
  );
}
