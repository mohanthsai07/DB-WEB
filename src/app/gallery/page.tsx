import type { Metadata } from "next";
import GalleryPageContent from "@/components/gallery/GalleryPageContent";

export const metadata: Metadata = {
  title: "Gallery | Dhanik Bharat",
  description:
    "Explore Dhanik Bharat campuses, student life, academics and landmark events.",
  openGraph: {
    title: "Gallery | Dhanik Bharat",
    description:
      "Explore Dhanik Bharat campuses, student life, academics and landmark events.",
    images: ["/images/campus/branches/hyderabad-harvard-madhapur.jpg"],
  },
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
