import type { Metadata } from "next";
import { CareersHero } from "@/components/sections/CareersHero";
import { JobOpenings } from "@/components/sections/JobOpenings";
import { Culture } from "@/components/sections/Culture";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Careers | Avenza Consulting",
  description:
    "Join Avenza Consulting — a people-first, ethical, transparent team building core banking transformation careers that matter.",
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <JobOpenings />
      <Culture />
      <ContactCta />
    </>
  );
}
