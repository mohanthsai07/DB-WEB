"use client";

import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Integrated",
    subtitle: "Learning",
    icon: "▣",
  },
  {
    title: "Personalised",
    subtitle: "Mentoring",
    icon: "♧",
  },
  {
    title: "Regular Tests",
    subtitle: "& Analysis",
    icon: "▥",
  },
  {
    title: "Competitive",
    subtitle: "Readiness",
    icon: "☆",
  },
];

export default function Hero() {
  return (
    <section className="bg-[#f7f8f4] px-4 pb-8 pt-3 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] sm:rounded-[34px] lg:rounded-[38px]">

        {/* =====================================================
            HERO IMAGE
        ===================================================== */}

        <Image
          src="/images/hero/student.jpg"
          alt="Student at Dhanik Bharat"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center]"
        />

        {/* =====================================================
            GRADIENT OVERLAY
        ===================================================== */}

        {/* Main cream → transparent gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f8f4] via-[#f7f8f4]/95 via-[38%] via-[#f7f8f4]/65 to-transparent" />

        {/* Green tint on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#063d2a]/65" />

        {/* Bottom image darkness */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="relative z-10 min-h-[680px] sm:min-h-[720px] lg:min-h-[730px]">

          <div className="flex h-full min-h-[680px] items-center px-7 py-16 sm:min-h-[720px] sm:px-10 lg:min-h-[730px] lg:px-16">

            <div className="max-w-[610px]">

              {/* Eyebrow */}
              <div className="mb-6 flex items-center gap-3">

                <span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#08783f] sm:text-[11px]">
                  Integrated Intermediate Education
                </p>

              </div>

              {/* =================================================
                  HEADING
              ================================================= */}

              <h1 className="text-[48px] font-semibold leading-[0.98] tracking-[-0.055em] text-[#0d3b2c] sm:text-[62px] lg:text-[76px] xl:text-[82px]">

                Build Today
                <br />

                for a Brighter
                <br />

                <span className="text-[#e50046]">
                  Tomorrow.
                </span>

              </h1>

              {/* Small accent */}
              <div className="mt-6 h-[3px] w-12 bg-[#e50046]" />

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p className="mt-6 max-w-[540px] text-[15px] leading-6 text-[#4f5b55] sm:text-[16px] sm:leading-7">
                Integrated Classes 11 & 12 with focused preparation
                for JEE, NEET, BITSAT and Olympiads — helping
                students build strong fundamentals for the future.
              </p>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="mt-8 flex flex-wrap items-center gap-5">

                <Link
                  href="/programs"
                  className="group inline-flex h-[52px] items-center gap-7 rounded-full bg-[#08783f] px-7 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#056532]"
                >
                  <span>Explore Programs</span>

                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="/our-story"
                  className="group inline-flex items-center gap-3 text-[13px] font-medium text-[#123b2a]"
                >

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#123b2a]/30 transition-all duration-300 group-hover:border-[#e50046] group-hover:text-[#e50046]">
                    <span className="ml-[2px] text-[10px]">
                      ▶
                    </span>
                  </span>

                  <span>
                    Watch Our Story
                  </span>

                </Link>

              </div>

              {/* =================================================
                  FEATURE STRIP
              ================================================= */}

              <div className="mt-12 grid max-w-[590px] grid-cols-2 border-t border-[#cfd8d2]/80 pt-6 sm:grid-cols-4">

                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`
                      flex items-start gap-3 py-2
                      sm:px-4
                      ${index === 0 ? "sm:pl-0" : ""}
                      ${index !== 0 ? "border-l border-[#cfd8d2]/80" : ""}
                    `}
                  >

                    {/* Icon */}
                    <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e3f0e3] text-[17px] text-[#08783f] sm:flex">
                      {feature.icon}
                    </div>

                    <div>
                      <p className="text-[11px] font-medium leading-4 text-[#173e30]">
                        {feature.title}
                      </p>

                      <p className="text-[11px] leading-4 text-[#59655f]">
                        {feature.subtitle}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE — MORE THAN ACADEMICS
          ===================================================== */}

          {/* <div className="absolute right-6 top-8 hidden w-[150px] rounded-[24px] bg-[#063d2a]/85 p-6 text-white backdrop-blur-sm lg:block xl:right-8">

            <p className="text-[17px] font-medium leading-5">
              More
              <br />
              than
              <br />
              Academics
            </p>

            <div className="my-5 h-px w-8 bg-[#e50046]" />

            <p className="text-[12px] leading-5 text-white/75">
              A community
              <br />
              that helps
              <br />
              you grow.
            </p>

            <Link
              href="/student-life"
              className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition hover:bg-white hover:text-[#063d2a]"
            >
              →
            </Link>

          </div> */}

          {/* =====================================================
              BOTTOM IMAGE CARD
          ===================================================== */}

          

          {/* =====================================================
              DECORATIVE GREEN CIRCLE
          ===================================================== */}

          <div className="absolute bottom-8 left-[47%] hidden h-3 w-3 rounded-full bg-[#c9e52c] lg:block" />

        </div>
      </div>
    </section>
  );
}