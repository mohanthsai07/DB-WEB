import type { Metadata } from "next";

import DhanikTimeline from "@/components/ui/dhanik-timeline";

export const metadata: Metadata = {
  title: "Our Journey | Dhanik Bharat",
  description:
    "Explore the journey of Dhanik Bharat Educational Institutions, from its founding vision to a growing academic community.",
  openGraph: {
    title: "Our Journey | Dhanik Bharat",
    description:
      "Explore the journey of Dhanik Bharat Educational Institutions, from its founding vision to a growing academic community.",
  },
};

export default function EventsPage() {
  return (
    <main className="bg-[#f7f8f4]">
      <DhanikTimeline />
    </main>
  );
}
