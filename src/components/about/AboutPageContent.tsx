import Image from "next/image";
import Link from "next/link";

export default function AboutPageContent() {
  return (
    <main className="bg-[#f7f8f4] text-[#123b2a]">
      <section className="px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <p className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#08783f]">
                <span className="h-px w-8 bg-[#08783f]" /> About Dhanik Bharat
              </p>
              <h1 className="max-w-[700px] text-[clamp(3.2rem,7.4vw,6.6rem)] font-semibold leading-[0.9] tracking-[-0.075em]">
                Education for the <span className="text-[#08783f]">next chapter.</span>
              </h1>
              <p className="mt-7 max-w-[570px] text-[15px] leading-7 text-[#647069] sm:text-base">
                Dhanik Bharat Educational Institutions focuses on the formative Intermediate years—Classes 11 and 12—when students begin shaping their academic direction.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#123b2a]">
                <span className="rounded-full border border-[#cbd7cf] px-4 py-2.5">Classes 11 &amp; 12</span>
                <span className="rounded-full border border-[#cbd7cf] px-4 py-2.5">MPC · JEE</span>
                <span className="rounded-full border border-[#cbd7cf] px-4 py-2.5">BiPC · NEET</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[540px] lg:ml-auto">
              <div className="relative aspect-[0.92/1] overflow-hidden rounded-[28px] bg-[#e4eae4] sm:rounded-[36px]">
                <Image
                  src="/images/founder/Vikramsir.png"
                  alt="Vikram Narayana Rao, Founder and CMD of Dhanik Bharat Educational Institutions"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#123b2a]/80 via-transparent to-transparent" />
                <div className="absolute inset-x-6 bottom-6 text-white sm:inset-x-8 sm:bottom-8">
                  <span className="mb-3 block h-0.5 w-9 bg-[#c9f36a]" />
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Vikram Narayana Rao</h2>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">Founder &amp; CMD</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-2 hidden rounded-full bg-[#c9f36a] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#123b2a] sm:block lg:-right-6">Our purpose</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#123b2a] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9f36a]">A vision for education</p>
            <h2 className="mt-5 max-w-[360px] text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl">Rooted in values. Ready for what’s next.</h2>
          </div>
          <div className="max-w-[720px] text-[15px] leading-7 text-white/75 sm:text-base">
            <p>
              The institution’s vision is to contribute to an empowered, self-reliant India through education, while staying rooted in Indian values and responding to a changing world.
            </p>
            <p className="mt-5">
              Its mission is to help students build academic mastery, confidence and character. That work begins with focused learning through Intermediate education and preparation for the next stage of each student’s journey.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/20 pt-6">
              <div><span className="block text-[10px] uppercase tracking-[0.18em] text-[#c9f36a]">Focus</span><span className="mt-2 block text-sm text-white">Intermediate education</span></div>
              <div><span className="block text-[10px] uppercase tracking-[0.18em] text-[#c9f36a]">Pathways</span><span className="mt-2 block text-sm text-white">MPC / JEE · BiPC / NEET</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#08783f]">Continue exploring</p>
            <h2 className="mt-4 max-w-[540px] text-3xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl">Find the academic path that fits.</h2>
          </div>
          <Link href="/programs" className="group inline-flex items-center gap-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f]">
            Explore programs <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
