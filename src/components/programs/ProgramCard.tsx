import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type Program = {
  id: string;
  number: string;
  stream: string;
  title: string;
  exam: string;
  description: string;
  image: string;
  accent: "green" | "pink";
};

export default function ProgramCard({ program }: { program: Program }) {
  const green = program.accent === "green";
  return (
    <article id={program.id} className="group scroll-mt-24 grid overflow-hidden rounded-[26px] bg-white shadow-[0_18px_55px_rgba(18,59,42,0.07)] md:grid-cols-[1.06fr_0.94fr]">
      <div className={`relative min-h-[320px] overflow-hidden md:min-h-[490px] ${green ? "bg-[#e8efe8]" : "bg-[#f4e7e9]"}`}>
        <Image src={program.image} alt={`${program.stream} pathway`} fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.025]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031b11]/55 via-transparent to-transparent" />
        <span className="absolute left-6 top-6 rounded-full border border-white/45 bg-[#031b11]/15 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">{program.number} / 02 · Classes 11 & 12</span>
        <span className="absolute bottom-6 left-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">{program.stream} pathway</span>
      </div>
      <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
        <div>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${green ? "text-[#08783f]" : "text-[#c0003c]"}`}>{program.exam}</p>
          <h2 className="mt-5 text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] text-[#123b2a] sm:text-[54px]">{program.title}</h2>
          <p className="mt-6 max-w-[430px] text-[14px] leading-7 text-[#647069]">{program.description}</p>
          <div className="mt-9 border-y border-[#e4e9e4] py-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#929c96]">An integrated approach</p>
            <p className="mt-2 text-[13px] leading-6 text-[#123b2a]">Build your Intermediate subject foundation alongside preparation focused on your chosen entrance exam.</p>
          </div>
        </div>
        <Link href="/admissions" className={`mt-8 inline-flex w-fit items-center gap-3 rounded-full px-5 py-3.5 text-[12px] font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${green ? "bg-[#08783f] hover:bg-[#123b2a] focus-visible:outline-[#08783f]" : "bg-[#c0003c] hover:bg-[#123b2a] focus-visible:outline-[#c0003c]"}`}>
          Enquire about {program.stream} <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}
