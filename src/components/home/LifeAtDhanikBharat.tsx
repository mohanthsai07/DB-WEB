"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

const experiences = [
  {
    number: "01",
    category: "STAY",
    title: "A comfortable space away from home.",
    description:
      "Thoughtfully arranged student accommodation with dedicated spaces to rest, study and recharge.",
    image: "/images/life/hostel-room.jpg",
    sideImage: "/images/life/hostel-study.jpg",
  },
  {
    number: "02",
    category: "DINING",
    title: "Good food. Shared moments.",
    description:
      "A dedicated dining environment where students can enjoy their meals together as part of everyday campus life.",
    image: "/images/life/food-mess.jpg",
    sideImage: "/images/life/food.jpg",
  },
  {
    number: "03",
    category: "STUDY",
    title: "Space to focus when it matters.",
    description:
      "Quiet spaces that give students room to revise, read, practise and stay focused outside regular classes.",
    image: "/images/life/study-space.jpg",
    sideImage: "/images/life/library.jpg",
  },
  {
    number: "04",
    category: "STUDENT LIFE",
    title: "Life beyond the timetable.",
    description:
      "A supportive environment where students can interact, unwind and build friendships along the way.",
    image: "/images/life/student-life.jpg",
    sideImage: "/images/life/campus-life.jpg",
  },
];

export default function LifeAtDhanikBharat() {
  const [active, setActive] = useState(0);

  const current = experiences[active];

  const previous = () => {
    setActive((value) =>
      value === 0 ? experiences.length - 1 : value - 1
    );
  };

  const next = () => {
    setActive((value) =>
      value === experiences.length - 1 ? 0 : value + 1
    );
  };

  return (
    <section className="h-[100svh] min-h-[620px] overflow-hidden bg-[#f7f8f4]">

      <div className="mx-auto flex h-full max-w-[1440px] flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="shrink-0">

          <div className="flex items-end justify-between gap-6">

            <div className="max-w-[760px]">

              <div className="mb-3 flex items-center gap-3">

                <span className="h-[5px] w-[5px] rounded-full bg-[#08783f]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.27em] text-[#08783f]">
                  Life at Dhanik Bharat
                </span>

              </div>

              <h2 className="text-[clamp(34px,4.2vw,64px)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#123b2a]">

                A place to learn.
                <br />

                <span className="text-[#e50046]">
                  A place to belong.
                </span>

              </h2>

            </div>


            <p className="hidden max-w-[340px] pb-1 text-[13px] leading-5 text-[#647069] md:block lg:max-w-[370px]">
              Explore the spaces and everyday experiences that become
              part of a student's life at Dhanik Bharat.
            </p>

          </div>

        </div>


        {/* =====================================================
            MAIN VISUAL
        ====================================================== */}

        <div className="relative mt-5 min-h-0 flex-1 lg:mt-6">

          {/* =================================================
              DESKTOP
          ================================================= */}

          <div className="hidden h-full lg:block">

            {/* MAIN IMAGE */}

            <div className="absolute inset-y-0 left-0 w-[67%] overflow-hidden rounded-[24px]">

              {experiences.map((experience, index) => (

                <div
                  key={experience.number}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    active === index
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >

                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    priority={index === 0}
                    sizes="67vw"
                    className="object-cover"
                  />

                </div>

              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-[#031b11]/60 via-transparent to-transparent" />


              {/* IMAGE LABEL */}

              <div className="absolute bottom-6 left-7 flex items-center gap-3">

                <span className="h-px w-8 bg-white/50" />

                <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Everyday life
                </span>

              </div>

            </div>


            {/* SECONDARY IMAGE */}

            <div className="absolute right-[2%] top-[5%] z-10 h-[34%] w-[21%] overflow-hidden rounded-[18px] border-[7px] border-[#f7f8f4]">

              {experiences.map((experience, index) => (

                <div
                  key={experience.number}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    active === index
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >

                  <Image
                    src={experience.sideImage}
                    alt=""
                    fill
                    sizes="21vw"
                    className="object-cover"
                  />

                </div>

              ))}

            </div>


            {/* WHITE CONTENT PANEL */}

            <div className="absolute bottom-0 right-0 z-20 w-[46%] max-w-[570px] bg-[#f7f8f4] pl-9 pt-8">

              <div className="border-t border-[#dce4de] pt-6">

                <div className="flex items-center gap-3">

                  <span className="font-mono text-[10px] text-[#08783f]">
                    {current.number}
                  </span>

                  <span className="h-px w-9 bg-[#08783f]/30" />

                  <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#89958e]">
                    {current.category}
                  </span>

                </div>


                <div
                  key={current.number}
                  className="animate-life-content"
                >

                  <h3 className="mt-4 max-w-[520px] text-[clamp(27px,3vw,44px)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#123b2a]">
                    {current.title}
                  </h3>

                  <p className="mt-3 max-w-[430px] text-[12px] leading-5 text-[#647069]">
                    {current.description}
                  </p>

                </div>


                {/* CONTROLS */}

                <div className="mt-5 flex items-center justify-between">

                  <div className="flex gap-1.5">

                    {experiences.map((experience, index) => (

                      <button
                        key={experience.number}
                        type="button"
                        onClick={() => setActive(index)}
                        aria-label={`Show ${experience.category}`}
                        className={`h-[3px] transition-all duration-300 ${
                          active === index
                            ? "w-9 bg-[#08783f]"
                            : "w-3 bg-[#d1dbd4]"
                        }`}
                      />

                    ))}

                  </div>


                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={previous}
                      aria-label="Previous"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ccd7cf] text-[#123b2a] transition hover:bg-[#08783f] hover:text-white"
                    >
                      <ChevronLeft
                        size={15}
                        strokeWidth={1.5}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#123b2a] text-white transition hover:bg-[#08783f]"
                    >
                      <ChevronRight
                        size={15}
                        strokeWidth={1.5}
                      />
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              MOBILE
          ================================================= */}

          <div className="relative h-full lg:hidden">

            {/* MAIN IMAGE */}

            <div className="relative h-full min-h-0 overflow-hidden rounded-[22px]">

              {experiences.map((experience, index) => (

                <div
                  key={experience.number}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    active === index
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >

                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover"
                  />

                </div>

              ))}


              {/* DARK GRADIENT */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#031b11]/90 via-[#031b11]/15 to-transparent" />


              {/* TOP */}

              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <span className="font-mono text-[10px] text-[#c9f36a]">
                    {current.number}
                  </span>

                  <span className="h-px w-6 bg-white/40" />

                  <span className="text-[8px] uppercase tracking-[0.18em] text-white/65">
                    {current.category}
                  </span>

                </div>


                <span className="font-mono text-[9px] text-white/55">
                  {active + 1} / 4
                </span>

              </div>


              {/* CONTENT */}

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">

                <div
                  key={current.number}
                  className="animate-life-content"
                >

                  <h3 className="max-w-[390px] text-[clamp(28px,8vw,38px)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
                    {current.title}
                  </h3>

                  <p className="mt-3 max-w-[420px] text-[12px] leading-5 text-white/70">
                    {current.description}
                  </p>

                </div>


                {/* CONTROLS */}

                <div className="mt-5 flex items-center justify-between">

                  <div className="flex gap-1.5">

                    {experiences.map((experience, index) => (

                      <button
                        key={experience.number}
                        type="button"
                        onClick={() => setActive(index)}
                        aria-label={`Show ${experience.category}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          active === index
                            ? "w-8 bg-[#c9f36a]"
                            : "w-1.5 bg-white/40"
                        }`}
                      />

                    ))}

                  </div>


                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={previous}
                      aria-label="Previous"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/10 text-white backdrop-blur-sm"
                    >
                      <ChevronLeft
                        size={14}
                        strokeWidth={1.5}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9f36a] text-[#123b2a]"
                    >
                      <ChevronRight
                        size={14}
                        strokeWidth={1.5}
                      />
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div className="flex shrink-0 items-center justify-between border-t border-[#dce4de] pt-3">

          <p className="text-[8px] uppercase tracking-[0.2em] text-[#929c96]">
            Stay · Study · Live · Grow
          </p>

          <a
            href="/campus-life"
            className="group flex items-center gap-2 text-[10px] font-semibold text-[#123b2a]"
          >
            Explore student life

            <ArrowUpRight
              size={12}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />

          </a>

        </div>

      </div>

    </section>
  );
}