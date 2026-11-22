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
      <section className="subpage-hero px-5 sm:px-8 lg:px-12">
        <div className="subpage-container grid gap-7 lg:grid-cols-[1fr_.75fr] lg:items-end">
          <div>
            <p className="subpage-kicker">Our journey &amp; locations</p>
            <h1 className="subpage-title mt-5 max-w-[760px]">
              Growing together,
              <br />
              <span className="text-[#e50046]">city by city.</span>
            </h1>
          </div>
          <p className="subpage-subtitle max-w-[440px] lg:justify-self-end">
            Discover the Dhanik Bharat learning community across Telangana and Andhra Pradesh.
          </p>
        </div>
      </section>
      <DhanikTimeline />
    </main>
  );
}
