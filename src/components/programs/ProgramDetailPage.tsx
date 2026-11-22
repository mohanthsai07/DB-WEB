import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

type ProgramDetailPageProps = {
  stream: "MPC" | "BiPC";
  exam: "JEE" | "NEET";
  subjects: string;
  title: string;
  description: string;
  image: string;
  accent: "green" | "pink";
};

const details = [
  ["01", "Intermediate foundation", "Study the complete subject combination for Classes 11 and 12, with time for questions and review."],
  ["02", "Entrance focus", "Connect subject learning with focused preparation for the examination named in this pathway."],
  ["03", "Practical review", "Use a repeatable rhythm of practice, feedback and correction so that the next study session has direction."],
];

export default function ProgramDetailPage({
  stream,
  exam,
  subjects,
  title,
  description,
  image,
  accent,
}: ProgramDetailPageProps) {
  const isGreen = accent === "green";
  const colour = isGreen ? "#08783f" : "#c0003c";

  return (
    <main className="overflow-hidden bg-[#f7f8f4] text-[#123b2a]">
      <section className="subpage-hero">
        <div className="subpage-container grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
          <div>
            <p className="subpage-kicker" style={{ color: colour }}>
              {stream} with {exam} · Classes 11 &amp; 12
            </p>
            <h1 className="subpage-title mt-5 max-w-[760px]">
              {title}
            </h1>
            <p className="subpage-subtitle mt-6 max-w-[590px]">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/admissions" className="subpage-button text-white" style={{ backgroundColor: colour }}>
                Ask admissions <ArrowUpRight size={15} className="ml-2" />
              </Link>
              <Link href="/programs" className="subpage-button border border-[#cbd7cf]">
                Compare pathways
              </Link>
            </div>
          </div>
          <div className="relative aspect-[1.18/1] min-h-[300px] overflow-hidden rounded-[22px] bg-[#dfe8df] sm:min-h-[380px]">
            <Image src={image} alt={`${stream} students following the ${exam} pathway`} fill priority sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#092518]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white sm:bottom-8 sm:left-8">
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#c9f36a]">
                Your subject combination
              </p>
              <p className="mt-2 text-xl font-semibold tracking-[-.04em] sm:text-2xl">
                {subjects}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e5eae4] bg-white px-5 sm:px-8 lg:px-12" aria-labelledby="pathway-principles">
        <div className="subpage-container grid gap-10 py-14 md:grid-cols-[.65fr_1.35fr] md:gap-16 md:py-20">
          <div>
            <p className="subpage-kicker" style={{ color: colour }}>The pathway</p>
            <h2 id="pathway-principles" className="subpage-section-title mt-4 max-w-[330px]">
              Two purposes, one study rhythm.
            </h2>
          </div>
          <div className="divide-y border-y border-[#dfe6df]">
            {details.map(([number, heading, body]) => (
              <article key={number} className="grid gap-4 py-6 sm:grid-cols-[64px_1fr]">
                <span className="text-xs font-bold tracking-[.18em]" style={{ color: colour }}>{number}</span>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-.025em]">{heading}</h3>
                  <p className="mt-2 max-w-[560px] text-sm leading-6 text-[#647069]">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="subpage-section px-5 sm:px-8 lg:px-12">
        <div className="subpage-container grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-end">
          <div>
            <p className="subpage-kicker" style={{ color: colour }}>What to explore</p>
            <h2 className="subpage-section-title mt-4 max-w-[520px]">
              Start with the questions that matter.
            </h2>
          </div>
          <ul className="grid gap-3 text-sm leading-6 text-[#647069]">
            {["Which pathway fits the student’s interests?", "How can the Intermediate years support that direction?", "What should we confirm before applying?"].map((item) => (
              <li key={item} className="flex items-start gap-3 border-b border-[#dfe6df] pb-3">
                <Check size={16} style={{ color: colour }} className="mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="subpage-container mt-12 flex flex-col gap-5 border-t border-[#cbd7cf] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[620px] text-sm leading-6 text-[#647069]">
            Admissions can confirm current class availability, programme details and the application process for this pathway.
          </p>
          <Link href="/contact" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#123b2a] px-5 text-sm font-semibold text-white">
            Talk to the team <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
