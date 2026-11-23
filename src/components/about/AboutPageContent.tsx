
import Image from "next/image";
import Link from "next/link";

export default function AboutPageContent() {
  return (
    <main className="overflow-x-hidden bg-[#f7f8f4] text-[#123b2a]">
      {/* HERO SECTION */}
      <section className="subpage-hero px-4 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="subpage-container mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* TEXT CONTENT */}
            <div className="order-1 min-w-0">
              <p className="subpage-kicker mb-5 flex items-center gap-3 text-xs sm:mb-6">
                <span className="h-px w-8 shrink-0 bg-[#08783f]" />
                About Dhanik Bharat
              </p>

              <h1 className="subpage-title max-w-[700px] text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                Education for the{" "}
                <span className="text-[#e50046]">
                  next chapter.
                </span>
              </h1>

              <p className="mt-5 max-w-[570px] text-sm leading-7 text-[#647069] sm:mt-7 sm:text-base">
                Dhanik Bharat Educational Institutions focuses on
                the formative Intermediate years—Classes 11 and
                12—when students begin shaping their academic
                direction.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#123b2a] sm:mt-8 sm:gap-3 sm:text-[11px]">
                <span className="rounded-full border border-[#cbd7cf] px-3 py-2 sm:px-4 sm:py-2.5">
                  Classes 11 &amp; 12
                </span>
                <span className="rounded-full border border-[#cbd7cf] px-3 py-2 sm:px-4 sm:py-2.5">
                  MPC · JEE
                </span>
                <span className="rounded-full border border-[#cbd7cf] px-3 py-2 sm:px-4 sm:py-2.5">
                  BiPC · NEET
                </span>
              </div>
            </div>

            {/* FOUNDER IMAGE */}
            
{/* FOUNDER IMAGE */}
<div className="order-2 relative mx-auto w-full max-w-[540px] lg:ml-auto">
  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-[#e4eae4] sm:aspect-[0.92/1] sm:rounded-[32px] lg:rounded-[36px]">
    <Image
      src="/images/founder/Vikramsir.png"
      alt="Vikram Narayana Rao, Founder and CMD of Dhanik Bharat Educational Institutions"
      fill
      priority
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 42vw"
      className="object-cover object-top"
    />

    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#123b2a]/85 via-transparent to-transparent" />

    <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-8 sm:bottom-8">
      <span className="mb-3 block h-0.5 w-9 bg-[#c9f36a]" />

      <h2 className="text-xl font-semibold tracking-[-0.04em] sm:text-2xl lg:text-3xl">
        Vikram Narayana Rao
      </h2>

      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">
        Founder &amp; CMD
      </p>
    </div>
  </div>

  <div className="absolute -bottom-5 -right-2 hidden rounded-full bg-[#c9f36a] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#123b2a] sm:block lg:-right-6">
    Our purpose
  </div>
</div>

          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="subpage-section bg-[#123b2a] px-4 py-14 text-white sm:px-8 sm:py-20 lg:px-12">
        <div className="subpage-container mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-12 lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.06em] text-[#c9f36a]">
              A vision for education
            </p>

            <h2 className="subpage-section-title mt-5 max-w-[360px] text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Rooted in values. Ready for what’s next.
            </h2>
          </div>

          <div className="max-w-[720px] text-sm leading-7 text-white/75 sm:text-base">
            <p>
              The institution’s vision is to contribute to an
              empowered, self-reliant India through education,
              while staying rooted in Indian values and
              responding to a changing world.
            </p>

            <p className="mt-5">
              Its mission is to help students build academic
              mastery, confidence and character. That work
              begins with focused learning through Intermediate
              education and preparation for the next stage of
              each student’s journey.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/20 pt-6">
              <div>
                <span className="block text-xs font-semibold text-[#c9f36a]">
                  Focus
                </span>
                <span className="mt-2 block text-sm text-white">
                  Intermediate education
                </span>
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#c9f36a]">
                  Pathways
                </span>
                <span className="mt-2 block text-sm text-white">
                  MPC / JEE · BiPC / NEET
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE SECTION */}
      <section className="subpage-section px-4 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="subpage-container mx-auto flex w-full max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#08783f]">
              Continue exploring
            </p>

            <h2 className="subpage-section-title mt-4 max-w-[540px] text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Find the academic path that fits.
            </h2>
          </div>

          <Link
            href="/programs"
            className="subpage-action-link group inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-[#123b2a] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#123b2a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f] sm:self-auto"
          >
            Explore programs
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
