import type { Metadata } from "next";
import ProgramCard, { type Program } from "@/components/programs/ProgramCard";
import ProgramFeatures from "@/components/programs/ProgramFeatures";
import ProgramHero from "@/components/programs/ProgramHero";

export const metadata: Metadata = {
  title: "Intermediate & Entrance Programs | Dhanik Bharat",
  description: "Explore Dhanik Bharat's MPC with JEE and BiPC with NEET integrated Intermediate pathways for Classes 11 and 12.",
  openGraph: {
    title: "Programs | Dhanik Bharat",
    description: "Explore MPC with JEE and BiPC with NEET integrated Intermediate pathways.",
    images: ["/images/programs/mpc.png"],
  },
};

const programs: Program[] = [
  {
    id: "mpc-jee",
    number: "01",
    stream: "MPC",
    title: "MPC + JEE",
    exam: "Mathematics · Physics · Chemistry",
    description: "A pathway for students who want to pair Intermediate MPC study with preparation for the Joint Entrance Examination.",
    image: "/images/programs/mpc.png",
    accent: "green",
  },
  {
    id: "bipc-neet",
    number: "02",
    stream: "BiPC",
    title: "BiPC + NEET",
    exam: "Biology · Physics · Chemistry",
    description: "A pathway for students who want to pair Intermediate BiPC study with preparation for the National Eligibility cum Entrance Test.",
    image: "/images/programs/bipc.png",
    accent: "pink",
  },
];

export default function ProgramsPage() {
  return (
    <main>
      <ProgramHero />
      <section id="pathways" aria-label="Available academic pathways" className="scroll-mt-16 bg-[#f7f8f4] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto grid max-w-[1320px] gap-5">
          {programs.map((program) => <ProgramCard key={program.id} program={program} />)}
        </div>
      </section>
      <ProgramFeatures />
    </main>
  );
}
