import type { Metadata } from "next";
import { LifeHero } from "@/components/sections/LifeHero";
import { LifeHighlights } from "@/components/sections/LifeHighlights";
import { LifeGallery } from "@/components/sections/LifeGallery";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Life at Avenza | Avenza Consulting",
  description:
    "A look at culture, work-life balance, and the moments that make Avenza more than a workplace — team events, learning, and everyday fun.",
  openGraph: {
    title: "Life at Avenza",
    description:
      "A look at culture, work-life balance, and the moments that make Avenza more than a workplace — team events, learning, and everyday fun.",
    url: "https://www.avenza-consulting.com/life-at-avenza",
    siteName: "Avenza Consulting",
    type: "website",
    images: [
      {
        url: "/celebration-founders-day-2.jpg",
        width: 2048,
        height: 1536,
        alt: "Avenza team at the 1st Founders Day celebration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Life at Avenza",
    description:
      "A look at culture, work-life balance, and the moments that make Avenza more than a workplace — team events, learning, and everyday fun.",
    images: ["/celebration-founders-day-2.jpg"],
  },
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
