import type { Metadata } from "next";
import AboutPageContent from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us | Dhanik Bharat",
  description:
    "Learn about Dhanik Bharat Educational Institutions and its focus on Intermediate education and exam preparation.",
  openGraph: {
    title: "About Dhanik Bharat",
    description: "Learn about Dhanik Bharat Educational Institutions and its focus on Intermediate education and exam preparation.",
    images: ["/images/founder/Vikramsir.png"],
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
