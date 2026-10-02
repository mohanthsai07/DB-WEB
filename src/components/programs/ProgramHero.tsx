import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function ProgramHero() {
  return (
    <section className="relative overflow-hidden bg-[#f7f8f4] px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pt-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-52 h-[540px] w-[540px] rounded-full border border-[#123b2a]/[0.07] sm:-right-16 sm:-top-64 sm:h-[700px] sm:w-[700px]" />
      <div className="relative mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <p className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#08783f]"><span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />Learning pathways</p>
          <h1 className="max-w-[860px] text-[52px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#123b2a] sm:text-[76px] lg:text-[100px]">Two directions.<br /><span className="text-[#08783f]">One strong</span> foundation.</h1>
        </div>
        <div className="max-w-[430px] pb-1 lg:justify-self-end">
          <p className="text-[15px] leading-7 text-[#647069] sm:text-[16px]">Integrated Intermediate education with focused preparation for the entrance pathway ahead.</p>
          <Link href="#pathways" className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#123b2a] px-5 py-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#08783f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f]">Explore the pathways <ArrowDownRight size={16} className="transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" /></Link>
        </div>
      </div>
      <div className="relative mx-auto mt-16 flex max-w-[1320px] items-center gap-4 border-t border-[#dce4de] pt-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#929c96] sm:mt-20"><span>Classes 11 & 12</span><span className="h-px w-8 bg-[#c9f36a]" /><span>Intermediate + entrance preparation</span></div>
    </section>
  );
}
