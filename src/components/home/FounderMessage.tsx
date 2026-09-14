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


            {/* =================================================
                FOUNDER IMAGE
            ================================================= */}
            <div className="group relative aspect-[4/6.1] w-full overflow-hidden rounded-[20px] bg-[#e8eee9]">

              <Image
                src="/images/founder/Vikramsir.png"
                alt="Vikram Narayana Rao, Founder and CMD of Dhanik Bharat Educational Institutions"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />


              {/* Bottom cinematic overlay */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-[42%]
                  bg-gradient-to-t
                  from-[#123b2a]
                  via-[#123b2a]/70
                  to-transparent
                "
              />


              {/* Founder identity over image */}
              <div className="absolute inset-x-0 bottom-0 px-6 pb-6 sm:px-7 sm:pb-7">

                <div className="mb-3 h-[2px] w-10 bg-[#c9f36a]" />

                <h3
                  className="
                    font-serif
                    text-[25px]
                    italic
                    leading-none
                    tracking-[-0.025em]
                    text-white
                    sm:text-[28px]
                  "
                >
                  Vikram Narayana Rao
                </h3>

                <p
                  className="
                    mt-2
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.24em]
                    text-white/75
                  "
                >
                  Founder & CMD
                </p>

              </div>

            </div>


            {/* =================================================
                SOCIAL LINKS
            ================================================= */}
            <div className="mt-4 flex items-center gap-4">

              <a
                href="#"
                aria-label="LinkedIn"
                className="
                  text-[12px]
                  font-semibold
                  text-[#123b2a]
                  transition-colors
                  duration-200
                  hover:text-[#08783f]
                "
              >
                in
              </a>

              <span className="h-3 w-px bg-[#ccd5cf]" />

              <a
                href="#"
                aria-label="Instagram"
                className="
                  text-[12px]
                  font-semibold
                  text-[#123b2a]
                  transition-colors
                  duration-200
                  hover:text-[#08783f]
                "
              >
                Instagram
              </a>

              <span className="h-3 w-px bg-[#ccd5cf]" />

              <a
                href="#"
                aria-label="X"
                className="
                  text-[13px]
                  text-[#123b2a]
                  transition-colors
                  duration-200
                  hover:text-[#08783f]
                "
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
            <h2
              className="
                max-w-[820px]
                text-[38px]
                font-semibold
                leading-[1.02]
                tracking-[-0.05em]
                text-[#123b2a]
                sm:text-[48px]
                lg:text-[56px]
                xl:text-[62px]
              "
            >
              Our Vision and
              <br />

              <span className="text-[#e50046]">
                Mission
              </span>
            </h2>

            
            {/* =================================================
                MESSAGE
            ================================================= */}
            <div
              className="
                mt-7
                max-w-[760px]
                text-[15px]
                leading-7
                text-[#58665f]
                sm:text-[16px]
              "
            >

              <p>
                At Dhanik Bharat, we envision India that is not just
                developing but developed, empowered, and self-reliant,
                driven by the power of education. We aim to build a
                transformative educational ecosystem that evolves with
                the changing world while staying rooted in Indian values.
                Our focus begins at the foundation of future success:
                Integrated Intermediate Foundation (11 and 12), the
                defining stage where aspirations take shape and careers
                are born.
              </p>

              <p className="mt-5">
                Our mission is to nurture the next generation of engineers,
                doctors, innovators, and leaders who will guide India
                toward global excellence. Through focused, high-impact
                education, top-tier faculty, and the integration of
                cutting-edge AI tools, we empower students with academic
                mastery, confidence, and character. At Dhanik Bharat,
                education goes beyond exams—we prepare students to think,
                lead, and make a lasting impact on the nation and the world.
              </p>

            </div>


            {/* =================================================
                ACTIONS
            ================================================= */}
            <div className="mt-8 flex flex-wrap items-center gap-7">

              {/* Primary */}
              <Link
                href="/about"
                className="
                  group
                  inline-flex
                  h-[50px]
                  items-center
                  gap-5
                  rounded-full
                  bg-[#c9f36a]
                  pl-6
                  pr-2
                  text-[13px]
                  font-semibold
                  text-[#123b2a]
                  transition-all
                  duration-300
                  hover:bg-[#b9e957]
                "
              >
                <span>
                  Our Story
                </span>

                <span
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#08783f]
                    text-lg
                    text-white
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                >
                  ↗
                </span>
              </Link>


              {/* Secondary */}
              <Link
                href="/contact"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  border-b
                  border-[#68746e]
                  pb-1
                  text-[13px]
                  font-medium
                  text-[#34443c]
                  transition-colors
                  duration-300
                  hover:border-[#08783f]
                  hover:text-[#08783f]
                "
              >
                Talk to Us

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </Link>

            </div>


            {/* =================================================
                BOTTOM BRAND LINE
            ================================================= */}
            

          </div>

        </div>

      </div>
    </section>
  );
}