import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { ThemeScript } from "@/components/ui/ThemeScript";
import { TrfBanner } from "@/components/ui/TrfBanner";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { contactInfo } from "@/data/content";
import "./globals.css";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Avenza Consulting Services",
  url: "https://www.avenza-consulting.com",
  description:
    "Avenza Consulting accelerates core banking, Temenos, payments, digital, cloud and AI transformation for banks worldwide.",
  email: contactInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "43/B, 1st Main Road, Sarakki Industrial Layout, 3rd Phase, JP Nagar",
    addressLocality: "Bengaluru",
    postalCode: "560078",
    addressCountry: "IN",
  },
  sameAs: ["https://www.linkedin.com/company/avenza-consulting-services/"],
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Timely Core Banking Transformations | Avenza Consulting Services",
  description:
    "Avenza Consulting accelerates core banking, Temenos, payments, digital, cloud and AI transformation for banks worldwide — proven methodologies, accelerators, and global delivery expertise.",
  metadataBase: new URL("https://www.avenza-consulting.com"),
  openGraph: {
    title: "Timely Core Banking Transformations | Avenza Consulting Services",
    description:
      "Accelerating core banking, Temenos, payments, cloud and AI transformation for banks worldwide.",
    url: "https://www.avenza-consulting.com",
    siteName: "Avenza Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timely Core Banking Transformations | Avenza Consulting Services",
    description:
      "Accelerating core banking, Temenos, payments, cloud and AI transformation for banks worldwide.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <JsonLd data={organizationSchema} />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-amber focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to main content
        </a>
        <TrfBanner />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
