import type { Metadata } from "next";
import Link from "next/link";
import AdmissionEnquiryForm from "@/components/admissions/AdmissionEnquiryForm";

export const metadata: Metadata = {
  title: "Contact Dhanik Bharat",
  description: "Start a conversation with Dhanik Bharat about programmes, campuses and admissions.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#f7f8f4] text-[#123b2a]">
      <section className="subpage-hero">
        <div className="subpage-container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="subpage-kicker">Contact Dhanik Bharat</p>
            <h1 className="subpage-title mt-5 max-w-[620px]">Let’s make your next step clearer.</h1>
          </div>
          <div className="max-w-[510px] lg:justify-self-end">
            <p className="subpage-subtitle">
              Have questions about a pathway, campus or the admissions process? Share the essentials and use the enquiry form to begin a conversation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact-form" className="subpage-button bg-[#08783f] text-white">Start an enquiry <span className="ml-2">↗</span></a>
              <Link href="/admissions" className="subpage-button border border-[#cbd7cf] text-[#123b2a]">Admissions guide</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-form" className="subpage-section border-t border-[#e5eae4] bg-white">
        <div className="subpage-container grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <aside className="border-l-2 border-[#c9f36a] pl-6">
            <p className="subpage-kicker">A simple starting point</p>
            <h2 className="subpage-section-title mt-4 max-w-[360px]">Tell us what you’re exploring.</h2>
            <p className="mt-5 max-w-[380px] text-sm leading-6 text-[#647069]">
              The form checks your entries in this browser and does not transmit or store them. For current campus and application details, the admissions team can guide you through the official process.
            </p>
            <div className="mt-8 border-t border-[#e5eae4] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#08783f]">Useful links</p>
              <div className="mt-3 flex flex-col items-start gap-2 text-sm font-semibold">
                <Link href="/programs" className="subpage-action-link w-full justify-start border-transparent px-0 underline decoration-[#c9f36a] underline-offset-4 hover:border-transparent">Compare programmes ↗</Link>
                <Link href="/campus" className="subpage-action-link w-full justify-start border-transparent px-0 underline decoration-[#c9f36a] underline-offset-4 hover:border-transparent">Explore campuses ↗</Link>
              </div>
            </div>
          </aside>
          <div className="subpage-card overflow-hidden p-6 sm:p-9">
            <AdmissionEnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
