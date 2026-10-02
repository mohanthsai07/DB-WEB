import Image from "next/image";
import Link from "next/link";

export default function StudentLifePageContent() {
  return (
    <main className="overflow-hidden bg-[#f7f8f4] text-[#123b2a]">
      <section className="relative px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid items-end gap-9 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
            <div className="pb-2">
              <p className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#08783f]">
                <span className="h-px w-8 bg-[#08783f]" /> The student experience
              </p>
              <h1 className="max-w-[650px] text-[clamp(3.15rem,7.2vw,6.4rem)] font-semibold leading-[0.91] tracking-[-0.075em]">
                A life of <span className="text-[#08783f]">learning</span>,
                <br className="hidden sm:block" /> in motion.
              </h1>
              <p className="mt-7 max-w-[470px] text-[15px] leading-7 text-[#647069] sm:text-base">
                Student life is more than a timetable. See a glimpse of the people and everyday moments that make up the Dhanik Bharat community.
              </p>
              <Link
                href="/admissions"
                className="group mt-8 inline-flex min-h-12 items-center gap-5 rounded-full bg-[#123b2a] py-1 pl-6 pr-1 text-[13px] font-semibold text-white transition-colors hover:bg-[#08783f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f]"
              >
                Begin your journey
                <span className="flex size-10 items-center justify-center rounded-full bg-[#c9f36a] text-lg text-[#123b2a] transition-transform group-hover:rotate-45" aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="relative">
              <div className="relative aspect-[1.32/1] overflow-hidden rounded-[26px] bg-[#dfe8df] sm:rounded-[34px]">
                <Image
                  src="/images/hero/student.jpg"
                  alt="Student at Dhanik Bharat"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092518]/55 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white sm:inset-x-8 sm:bottom-8">
                  <p className="max-w-[250px] text-sm font-medium leading-6 sm:text-base">A glimpse into the student experience</p>
                  <span className="font-mono text-[10px] tracking-[0.15em] text-white/75">01 / 01</span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 hidden size-[94px] items-center justify-center rounded-full border-[7px] border-[#f7f8f4] bg-[#c9f36a] text-center text-[9px] font-bold uppercase leading-[1.45] tracking-[0.12em] text-[#123b2a] sm:flex lg:-left-7">
                Learn<br />together<br /><span className="text-base">✳</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dce4de] bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-9 md:grid-cols-[0.65fr_1.35fr] md:gap-16">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#08783f]">A moment, in focus</p>
            <h2 className="mt-4 max-w-[300px] text-3xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-4xl">The everyday, as it happens.</h2>
          </div>
          <div>
            <div className="overflow-hidden rounded-[22px] bg-[#10291d]">
              <video
                className="aspect-video w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster="/images/hero/student.jpg"
                aria-label="Student life video"
              >
                <source src="/images/students/1.mp4" type="video/mp4" />
                Your browser does not support the video element.
              </video>
            </div>
            <div className="mt-5 flex flex-col justify-between gap-3 border-t border-[#dce4de] pt-4 text-xs text-[#647069] sm:flex-row sm:items-center">
              <span>Student life at Dhanik Bharat</span>
              <span className="font-mono uppercase tracking-[0.12em]">Video · 01</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 border-b border-[#cbd7cf] pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#08783f]">Explore more</p>
            <h2 className="mt-4 max-w-[580px] text-3xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl">The right environment starts with the right questions.</h2>
          </div>
          <Link href="/campus" className="group inline-flex items-center gap-3 text-sm font-semibold text-[#123b2a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f]">
            Explore campus <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <p className="mx-auto mt-6 max-w-[1240px] text-sm leading-6 text-[#647069]">For current information about the learning environment and available programs, contact our admissions team.</p>
      </section>
    </main>
  );
}
