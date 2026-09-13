import Image from "next/image";
import Link from "next/link";

export default function FounderMessage() {
  return (
    <section className="bg-[#f7f8f4] px-5 py-20 sm:px-8 md:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1240px]">

        <div className="grid items-start gap-12 md:grid-cols-[280px_minmax(0,1fr)] md:gap-16 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-20 xl:grid-cols-[380px_minmax(0,1fr)] xl:gap-28">

          {/* =====================================================
              LEFT — FOUNDER
          ===================================================== */}

          <div>

            {/* Eyebrow */}

            <div className="mb-5 flex items-center gap-2.5">

              <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#08783f]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#08783f]">
                From Our Founder
              </span>

            </div>


            {/* Portrait */}

        <div className="relative aspect-[4/6.1] w-full overflow-hidden rounded-[20px] bg-[#e8eee9]">
  <Image
    src="/images/founder/Vikramsir.png"
    alt="Founder of Dhanik Bharat Educational Institutions"
    fill
    sizes="(max-width: 768px) 100vw, 380px"
    className="object-cover"
  />
</div>


            {/* Social links */}

            <div className="mt-4 flex items-center gap-4">

              <a
                href="#"
                aria-label="LinkedIn"
                className="text-[12px] font-semibold text-[#123b2a] transition hover:text-[#08783f]"
              >
                in
              </a>

              <span className="h-3 w-px bg-[#ccd5cf]" />

              <a
                href="#"
                aria-label="Instagram"
                className="text-[12px] font-semibold text-[#123b2a] transition hover:text-[#08783f]"
              >
                Instagram
              </a>

              <span className="h-3 w-px bg-[#ccd5cf]" />

              <a
                href="#"
                aria-label="X"
                className="text-[13px] text-[#123b2a] transition hover:text-[#08783f]"
              >
                𝕏
              </a>

            </div>

          </div>


          {/* =====================================================
              RIGHT — MESSAGE
          ===================================================== */}

          <div className="pt-1 md:pt-8 lg:pt-10">

            {/* Heading */}

            <h2 className="max-w-[820px] text-[38px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#123b2a] sm:text-[48px] lg:text-[56px] xl:text-[62px]">

              Education should build
              <br />

              <span className="text-[#e50046]">
                more than marks.
              </span>

            </h2>


            {/* Message */}

            <div className="mt-7 max-w-[760px] text-[15px] leading-7 text-[#58665f] sm:text-[16px]">

              <p>
                At Dhanik Bharat, our purpose is rooted in a simple
                belief — every student deserves the opportunity to
                learn well, discover their strengths and prepare
                confidently for the future.
              </p>

              <p className="mt-4">
                We created Dhanik Bharat to bring together strong
                academic foundations, focused preparation and
                personalised guidance, so that students can grow
                with confidence and move towards their goals.
              </p>

            </div>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="mt-8 flex flex-wrap items-center gap-7">

              {/* Primary */}

              <Link
                href="/about"
                className="group inline-flex h-[50px] items-center gap-5 rounded-full bg-[#c9f36a] pl-6 pr-2 text-[13px] font-semibold text-[#123b2a] transition-all duration-300 hover:bg-[#b9e957]"
              >

                <span>
                  Our Story
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#08783f] text-lg text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  ↗
                </span>

              </Link>


              {/* Secondary */}

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border-b border-[#68746e] pb-1 text-[13px] font-medium text-[#34443c] transition-colors duration-300 hover:border-[#08783f] hover:text-[#08783f]"
              >

                Talk to Us

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>

              </Link>

            </div>


            {/* =================================================
                FOUNDER IDENTITY
            ================================================= */}

            <div className="mt-12 border-t border-[#dfe5df] pt-5">

              <div className="flex flex-wrap items-end justify-between gap-5">

                <div>

                  <p className="font-serif text-[22px] italic tracking-[-0.02em] text-[#123b2a]">
                    Vikram Narayana Rao
                  </p>

                  <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-[#87938c]">
                    Founder & CMD
                  </p>

                </div>

                <p className="max-w-[260px] text-right text-[9px] uppercase leading-5 tracking-[0.16em] text-[#9aa49e]">
                  Building education
                  <br />
                  with purpose
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}