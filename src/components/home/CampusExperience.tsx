"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const facilities = [
  {
    number: "01",
    title: "Smart Classrooms",
    description:
      "Technology-enabled classrooms designed to support focused and engaging learning.",
    image: "/images/campus/classrooms.jpg",
  },
  {
    number: "02",
    title: "Laboratories",
    description:
      "Dedicated learning spaces where students can connect concepts with practical understanding.",
    image: "/images/campus/labs.jpg",
  },
  {
    number: "03",
    title: "Library & Study",
    description:
      "Quiet spaces for reading, revision and independent study.",
    image: "/images/campus/library.jpg",
  },
  {
    number: "04",
    title: "Hostel & Student Life",
    description:
      "A supportive residential environment designed around students' daily needs.",
    image: "/images/campus/hostel.jpg",
  },
];

export default function CampusExperience() {
  const [active, setActive] = useState(0);

  const current = facilities[active];

  return (
    <section className="bg-[#123b2a] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1320px]">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

          <div>

            <div className="mb-6 flex items-center gap-3">

              <span className="h-[6px] w-[6px] rounded-full bg-[#c9f36a]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9f36a]">
                Campus & Facilities
              </span>

            </div>

            <h2 className="max-w-[760px] text-[48px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[60px] lg:text-[70px]">

              Spaces designed
              <br />

              for{" "}

              <span className="text-[#c9f36a]">
                better learning.
              </span>

            </h2>

          </div>

          <p className="max-w-[400px] text-[15px] leading-7 text-white/60">
            A learning environment that brings together academics,
            practical learning, study spaces and everyday student
            life.
          </p>

        </div>


        {/* =====================================================
            CAMPUS EXPERIENCE
        ===================================================== */}

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.65fr_0.35fr]">

          {/* =================================================
              LARGE IMAGE
          ================================================= */}

          <div className="relative h-[560px] overflow-hidden rounded-[30px] sm:h-[650px] lg:h-[700px]">

            {facilities.map((facility, index) => (

              <div
                key={facility.number}
                className={`
                  absolute inset-0
                  transition-opacity duration-[900ms]
                  ${
                    active === index
                      ? "opacity-100"
                      : "opacity-0"
                  }
                `}
              >

                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  priority={index === 0}
                  className={`
                    object-cover
                    transition-transform
                    duration-[1600ms]
                    ${
                      active === index
                        ? "scale-100"
                        : "scale-105"
                    }
                  `}
                />

              </div>

            ))}


            {/* Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-[#031b11]/90 via-transparent to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-r from-[#031b11]/30 via-transparent to-transparent" />


            {/* =================================================
                TOP
            ================================================= */}

            <div className="absolute left-6 right-6 top-6 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">

              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/60">
                Dhanik Bharat Campus
              </span>

              <span className="font-mono text-[10px] text-white/50">
                {current.number} / 04
              </span>

            </div>


            {/* =================================================
                IMAGE CONTENT
            ================================================= */}

            <div
              key={current.number}
              className="absolute bottom-0 left-0 right-0 p-7 animate-campus-content sm:p-10 lg:p-12"
            >

              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#c9f36a]">
                {current.number}
              </p>

              <h3 className="mt-4 text-[42px] font-semibold leading-none tracking-[-0.045em] sm:text-[52px] lg:text-[64px]">
                {current.title}
              </h3>

              <p className="mt-5 max-w-[500px] text-[14px] leading-7 text-white/70 sm:text-[15px]">
                {current.description}
              </p>

            </div>

          </div>


          {/* =================================================
              FACILITY NAVIGATION
          ================================================= */}

          <div className="flex flex-col justify-between">

            <div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35">
                Explore the campus
              </p>


              <div className="mt-8">

                {facilities.map((facility, index) => (

                  <button
                    key={facility.number}
                    type="button"
                    onClick={() => setActive(index)}
                    className="group w-full text-left"
                  >

                    <div
                      className={`
                        border-t py-5
                        transition-all duration-500
                        ${
                          active === index
                            ? "border-[#c9f36a]"
                            : "border-white/10"
                        }
                      `}
                    >

                      <div className="flex items-center gap-4">

                        <span
                          className={`
                            font-mono text-[9px]
                            ${
                              active === index
                                ? "text-[#c9f36a]"
                                : "text-white/30"
                            }
                          `}
                        >
                          {facility.number}
                        </span>

                        <span
                          className={`
                            flex-1 text-[14px] font-medium
                            transition-colors
                            ${
                              active === index
                                ? "text-white"
                                : "text-white/45 group-hover:text-white/75"
                            }
                          `}
                        >
                          {facility.title}
                        </span>

                        <span
                          className={`
                            transition-all duration-300
                            ${
                              active === index
                                ? "translate-x-0 opacity-100 text-[#c9f36a]"
                                : "-translate-x-2 opacity-0"
                            }
                          `}
                        >
                          →
                        </span>

                      </div>

                    </div>

                  </button>

                ))}

              </div>

            </div>


            {/* =================================================
                CTA
            ================================================= */}

            <div className="border-t border-white/10 pt-6">

              <p className="text-[11px] leading-6 text-white/45">
                Want to experience the campus in person?
              </p>

              <Link
                href="/admissions"
                className="group mt-4 inline-flex items-center gap-4 rounded-full bg-[#c9f36a] px-5 py-3 text-[12px] font-semibold text-[#123b2a]"
              >
                Book a Campus Visit

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </Link>

            </div>

          </div>

        </div>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">

          <p className="text-[9px] uppercase tracking-[0.22em] text-white/35">
            Learn · Explore · Grow
          </p>

          <Link
            href="/campus"
            className="group flex items-center gap-3 text-[12px] font-semibold text-white"
          >
            Explore campus

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}