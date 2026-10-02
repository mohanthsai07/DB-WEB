import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Globe from "@/components/ui/Globe";

export const metadata: Metadata = {
  title: "Campus & Learning Environment | Dhanik Bharat",
  description: "Explore the Dhanik Bharat learning environment and contact admissions for current campus information.",
  openGraph: {
    title: "Campus | Dhanik Bharat",
    description: "Explore the Dhanik Bharat learning environment and ask admissions for current campus details.",
    images: ["/images/campus/environment.png"],
  },
};

export default function CampusPage() {
  return (
    <main className="bg-[#f7f8f4]">
      <section className="px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pt-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#08783f]"><span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />Campus & learning environment</p>
              <h1 className="max-w-[850px] text-[54px] font-semibold leading-[0.94] tracking-[-0.065em] text-[#123b2a] sm:text-[78px] lg:text-[100px]">Learning takes<br />place <span className="text-[#08783f]">in context.</span></h1>
            </div>
            <div className="max-w-[430px] pb-1 lg:justify-self-end">
              <p className="text-[15px] leading-7 text-[#647069] sm:text-[16px]">An environment is part of the learning journey. Explore the view we can share today, and ask our team for current campus details.</p>
              <Link href="#environment" className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#123b2a] px-5 py-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#08783f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f]">View the environment <ArrowDownRight size={16} className="transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            </div>
          </div>
          <figure id="environment" className="mt-12 scroll-mt-8 sm:mt-16">
            <div className="relative min-h-[390px] overflow-hidden rounded-[26px] sm:min-h-[540px] lg:min-h-[650px]">
              <Image src="/images/campus/environment.png" alt="A view of the Dhanik Bharat learning environment" fill priority sizes="(max-width: 1320px) 100vw, 1320px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031b11]/65 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10 lg:p-12">
                <figcaption className="max-w-[520px] text-[19px] font-medium leading-7 tracking-[-0.02em] text-white sm:text-[24px]">A learning environment to experience firsthand.</figcaption>
                <span className="w-fit rounded-full border border-white/40 bg-[#031b11]/20 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">Dhanik Bharat</span>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section className="overflow-hidden bg-[#123b2a] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1240px] items-center gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c9f36a]">A wider perspective</p>
            <h2 className="mt-5 max-w-[600px] text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.06em]">Find the right setting for your next step.</h2>
            <p className="mt-5 max-w-[500px] text-sm leading-7 text-white/70">
              Campus locations, facilities and visit details can change. Speak with admissions for current information before planning a visit.
            </p>
            <Link href="/admissions" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#c9f36a] px-5 text-[12px] font-semibold text-[#123b2a] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              Ask about a campus visit <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="order-1 mx-auto aspect-square w-full max-w-[420px] lg:order-2">
            <Globe markers={[]} />
          </div>
        </div>
      </section>

      <section className="border-t border-[#dce4de] bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#08783f]">Plan a conversation</p>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[650px]">
              <h2 className="text-[38px] font-semibold leading-[1] tracking-[-0.055em] text-[#123b2a] sm:text-[54px]">Want to know more about the campus?</h2>
              <p className="mt-5 max-w-[520px] text-[14px] leading-7 text-[#647069]">Campus facilities and visit information are being confirmed. Contact admissions for details that are current and relevant to your enquiry.</p>
            </div>
            <Link href="/admissions" className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#c9f36a] px-5 py-3.5 text-[12px] font-semibold text-[#123b2a] transition-colors hover:bg-[#b6e64e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f]">Enquire with admissions <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
