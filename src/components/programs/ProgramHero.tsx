import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";

export default function ProgramHero() {
  return (
    <section className="subpage-hero relative overflow-hidden bg-[#f7f8f4] px-5 sm:px-8 lg:px-12">
      <div className="subpage-container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="flex flex-col justify-center">
          <p className="subpage-kicker mb-7 flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />Learning pathways</p>
          <h1 className="subpage-title max-w-[720px]">Two directions.<br /><span className="text-[#e50046]">One strong</span> foundation.</h1>
          <p className="mt-7 max-w-[520px] text-[15px] leading-7 text-[#647069] sm:text-[16px]">Integrated Intermediate education with focused preparation for the entrance pathway ahead.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#pathways" className="subpage-button bg-[#08783f] text-white transition-colors hover:bg-[#123b2a]">Explore the pathways <ArrowDownRight size={16} className="ml-2" /></Link>
            <Link href="/admissions" className="subpage-button border border-[#cbd7cf] text-[#123b2a]">Talk to admissions</Link>
          </div>
        </div>
        <div className="relative min-h-[300px] overflow-hidden rounded-[26px] bg-[#dfe8df] sm:min-h-[460px] sm:rounded-[34px] lg:min-h-[520px]">
          <Image src="/images/hero/student.jpg" alt="Student at Dhanik Bharat" fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#092518]/75 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-8 sm:right-8">
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#c9f36a]">Classes 11 &amp; 12</p>
            <p className="mt-3 max-w-[410px] text-2xl font-semibold leading-tight tracking-[-.04em] sm:text-3xl">Build clarity before choosing the next step.</p>
          </div>
        </div>
      </div>
      <div className="subpage-container mt-7 flex items-center gap-4 border-t border-[#dce4de] pt-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#929c96] sm:mt-14"><span>Classes 11 &amp; 12</span><span className="h-px w-8 bg-[#c9f36a]" /><span>Intermediate + entrance preparation</span></div>
    </section>
  );
}
