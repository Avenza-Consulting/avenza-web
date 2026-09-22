import type { Metadata } from "next";
import { InsightsHero } from "@/components/sections/InsightsHero";
import { InsightsList } from "@/components/sections/InsightsList";

export const metadata: Metadata = {
  title: "Insights | Avenza Consulting",
  description:
    "Points of view, whitepapers and articles on modernizing, migrating and running banking platforms — grounded in delivery, not theory.",
  openGraph: {
    title: "Insights | Avenza Consulting",
    description:
      "Points of view, whitepapers and articles on modernizing, migrating and running banking platforms — grounded in delivery, not theory.",
    url: "https://www.avenza-consulting.com/insights",
    siteName: "Avenza Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | Avenza Consulting",
    description:
      "Points of view, whitepapers and articles on modernizing, migrating and running banking platforms — grounded in delivery, not theory.",
  },
};

export default function InsightsPage() {
  return (
    <>
      <InsightsHero />
      <InsightsList />
    </>
  );
}
