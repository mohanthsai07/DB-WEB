import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BiPC + NEET | Dhanik Bharat",
  description: "Explore the BiPC pathway with focused preparation for NEET at Dhanik Bharat.",
};

export default function NeetProgramPage() {
  return (
    <main className="bg-[#f7f8f4] text-[#123b2a]">
      <section className="subpage-hero">
        <div className="subpage-container grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <p className="subpage-kicker">BiPC · NEET pathway</p>
            <h1 className="subpage-title mt-5 max-w-[760px]">Build the foundations for a future in medicine.</h1>
          </div>
          <p className="subpage-subtitle max-w-[400px] lg:justify-self-end">
            Study Biology, Physics and Chemistry through Intermediate education alongside preparation for the National Eligibility cum Entrance Test.
          </p>
        </div>
      </section>
      <section className="subpage-section border-y border-[#e5eae4] bg-white">
        <div className="subpage-container grid gap-5 md:grid-cols-3">
          {[
            ["01", "BiPC subjects", "Build the subject foundation across Biology, Physics and Chemistry."],
            ["02", "NEET direction", "Follow a focused preparation pathway for the National Eligibility cum Entrance Test."],
            ["03", "Classes 11 & 12", "Use the Intermediate years to develop consistent academic habits."],
          ].map(([number, title, copy]) => (
            <article key={number} className="subpage-card p-6">
              <span className="text-[11px] font-bold tracking-[.18em] text-[#e50046]">{number}</span>
              <h2 className="mt-8 text-lg font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#647069]">{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="subpage-section">
        <div className="subpage-container flex flex-col gap-6 border-l-2 border-[#c9f36a] pl-6 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="subpage-kicker">Coming soon</p><p className="mt-2 text-lg font-semibold">Detailed pathway information is being prepared.</p></div>
          <div className="flex flex-wrap gap-3"><Link href="/admissions" className="subpage-button bg-[#08783f] text-white">Ask admissions ↗</Link><Link href="/programs" className="subpage-button border border-[#cbd7cf]">All programmes</Link></div>
        </div>
      </section>
    </main>
  );
}
