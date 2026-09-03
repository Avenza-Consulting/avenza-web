import type { Metadata } from "next";
import { LeadershipHero } from "@/components/sections/LeadershipHero";
import { LeadershipGrid } from "@/components/sections/LeadershipGrid";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Leadership | Avenza Consulting",
  description:
    "Meet the leadership team driving Avenza Consulting's core banking, Temenos, and digital transformation delivery.",
};

export default function LeadershipPage() {
  return (
    <>
      <LeadershipHero />
      <LeadershipGrid />
      <ContactCta />
    </>
  );
}
