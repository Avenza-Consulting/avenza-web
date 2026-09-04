import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Avenza Consulting",
  description:
    "Get in touch with Avenza Consulting for core banking, Temenos, payments and digital transformation inquiries.",
  openGraph: {
    title: "Contact Us | Avenza Consulting",
    description:
      "Get in touch with Avenza Consulting for core banking, Temenos, payments and digital transformation inquiries.",
    url: "https://www.avenza-consulting.com/contact",
    siteName: "Avenza Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Avenza Consulting",
    description:
      "Get in touch with Avenza Consulting for core banking, Temenos, payments and digital transformation inquiries.",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
