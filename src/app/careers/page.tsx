import type { Metadata } from "next";
import { CareersHero } from "@/components/sections/CareersHero";
import { JobOpenings } from "@/components/sections/JobOpenings";
import { Culture } from "@/components/sections/Culture";
import { ContactCta } from "@/components/sections/ContactCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { jobs } from "@/data/content";

function addOneYear(dateString: string) {
  const date = new Date(dateString);
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().slice(0, 10);
}

const jobPostingSchemas = jobs.map((job) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: job.blurb,
  identifier: {
    "@type": "PropertyValue",
    name: "Avenza Consulting Services",
    value: job.id,
  },
  datePosted: job.datePosted,
  validThrough: addOneYear(job.datePosted),
  employmentType: job.employmentType,
  hiringOrganization: {
    "@type": "Organization",
    name: "Avenza Consulting Services",
    sameAs: "https://www.avenza-consulting.com",
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      streetAddress: "43/B, 1st Main Road, Sarakki Industrial Layout, 3rd Phase, JP Nagar",
      addressLocality: "Bengaluru",
      postalCode: "560078",
      addressCountry: "IN",
    },
  },
  directApply: false,
  applicantLocationRequirements: {
    "@type": "Country",
    name: "India",
  },
}));

export const metadata: Metadata = {
  title: "Careers | Avenza Consulting",
  description:
    "Join Avenza Consulting — a people-first, ethical, transparent team building core banking transformation careers that matter.",
  openGraph: {
    title: "Careers | Avenza Consulting",
    description:
      "Join Avenza Consulting — a people-first, ethical, transparent team building core banking transformation careers that matter.",
    url: "https://www.avenza-consulting.com/careers",
    siteName: "Avenza Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Avenza Consulting",
    description:
      "Join Avenza Consulting — a people-first, ethical, transparent team building core banking transformation careers that matter.",
  },
};

export default function CareersPage() {
  return (
    <>
      {jobPostingSchemas.map((schema) => (
        <JsonLd key={schema.identifier.value} data={schema} />
      ))}
      <CareersHero />
      <JobOpenings />
      <Culture />
      <ContactCta />
    </>
  );
}
