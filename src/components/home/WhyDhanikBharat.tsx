"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Users,
  Target,
  Building2,
} from "lucide-react";

const experiences = [
  {
    number: "01",
    title: "Academic Environment",
    shortTitle: "Academic",
    description:
      "A focused learning environment where students build strong concepts, practise consistently and engage closely with faculty.",
    image: "/images/campus/environment.png",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Personal Mentoring",
    shortTitle: "Mentoring",
    description:
      "Regular guidance and doubt-clearing help students understand their progress, identify areas to improve and stay focused.",
    image: "/images/experience/mentoring.jpg",
    icon: Users,
  },
  {
    number: "03",
    title: "Study & Preparation",
    shortTitle: "Preparation",
    description:
      "A structured approach to learning, practice and assessment helps students prepare for Intermediate education and competitive examinations.",
    image: "/images/experience/study.jpg",
    icon: Target,
  },
  {
    number: "04",
    title: "Campus & Student Life",
    shortTitle: "Campus",
    description:
      "Learning extends beyond the classroom through dedicated spaces for study, practical learning, interaction and everyday student life.",
    image: "/images/experience/campus.jpg",
    icon: Building2,
  },
];

export default function DhanikBharatExperience() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const current = experiences[active];

  const changeExperience = (index: number) => {
    if (index === active || isAnimating) return;

    setIsAnimating(true);
    setActive(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 550);
  };

  const previous = () => {
    const nextIndex =
      active === 0 ? experiences.length - 1 : active - 1;

    changeExperience(nextIndex);
  };

  const next = () => {
    const nextIndex =
      active === experiences.length - 1 ? 0 : active + 1;

    changeExperience(nextIndex);
  };

  /* ---------------------------------------------
     MOBILE SWIPE
  --------------------------------------------- */

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        next();
      } else {
        previous();
      }
    }

    touchStartX.current = null;
  };

  /* ---------------------------------------------
     KEYBOARD
  --------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        next();
      }

      if (event.key === "ArrowLeft") {
        previous();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <section className="bg-[#f7f8f4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

        {/* =====================================================
            INTRO
        ====================================================== */}

        <div className="mb-10 flex flex-col justify-between gap-7 md:flex-row md:items-end lg:mb-12">

          <div className="max-w-[720px]">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-[6px] w-[6px] rounded-full bg-[#08783f]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#08783f]">
                The Dhanik Bharat Experience
              </span>
            </div>

            <h2 className="text-[40px] font-semibold leading-[0.98] tracking-[-0.05em] text-[#123b2a] sm:text-[50px] lg:text-[62px]">
              More than a classroom.
              <br />
              <span className="text-[#e50046]">
                A place to grow.
              </span>
            </h2>
          </div>

          <p className="max-w-[390px] text-[14px] leading-6 text-[#647069] md:pb-1">
            See what everyday learning looks like at Dhanik Bharat —
            from classrooms and mentoring to preparation and campus life.
          </p>
        </div>


        {/* =====================================================
            DESKTOP EXPERIENCE
        ====================================================== */}

        <div className="hidden lg:block">

          <div className="grid h-[min(70vh,680px)] min-h-[560px] grid-cols-[58%_42%] overflow-hidden rounded-[28px] bg-[#123b2a]">

            {/* ---------------------------------------------
                IMAGE
            --------------------------------------------- */}

            <div className="relative overflow-hidden">

              {experiences.map((experience, index) => (
                <div
                  key={experience.number}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    index === active
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    priority={index === 0}
                    sizes="58vw"
                    className={`object-cover transition-transform duration-[1200ms] ease-out ${
                      index === active
                        ? "scale-100"
                        : "scale-[1.04]"
                    }`}
                  />
                </div>
              ))}

              {/* IMAGE GRADIENT */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#031a11]/85 via-[#031a11]/10 to-transparent" />

              <div className="absolute bottom-9 left-9 right-9 xl:bottom-11 xl:left-11 xl:right-11">

                <div
                  key={`desktop-content-${active}`}
                  className="animate-experience-content"
                >

                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-[11px] tracking-[0.15em] text-white/70">
                      {current.number}
                    </span>

                    <span className="h-px w-10 bg-white/40" />
                  </div>

                  <h3 className="max-w-[650px] text-[38px] font-semibold leading-[1] tracking-[-0.04em] text-white xl:text-[52px]">
                    {current.title}
                  </h3>

                  <p className="mt-4 max-w-[520px] text-[14px] leading-6 text-white/75">
                    {current.description}
                  </p>
                </div>
              </div>

            </div>


            {/* ---------------------------------------------
                RIGHT NAVIGATION
            --------------------------------------------- */}

            <div className="flex flex-col justify-between bg-[#123b2a] px-8 py-9 xl:px-11 xl:py-11">

              <div>

                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#c9f36a]">
                  Explore the experience
                </p>

                <p className="mt-3 max-w-[280px] text-[13px] leading-6 text-white/55">
                  Every part of student life is designed to support
                  learning, focus and growth.
                </p>

              </div>


              {/* NAV ITEMS */}

              <div className="my-8">

                {experiences.map((experience, index) => {
                  const Icon = experience.icon;
                  const isActive = index === active;

                  return (
                    <button
                      key={experience.number}
                      onClick={() => changeExperience(index)}
                      className="group w-full border-b border-white/10 py-5 text-left"
                    >

                      <div className="flex items-center gap-4">

                        <span
                          className={`font-mono text-[10px] transition-colors ${
                            isActive
                              ? "text-[#c9f36a]"
                              : "text-white/30"
                          }`}
                        >
                          {experience.number}
                        </span>

                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-[#c9f36a] text-[#123b2a]"
                              : "bg-white/5 text-white/40 group-hover:bg-white/10"
                          }`}
                        >
                          <Icon size={15} strokeWidth={1.7} />
                        </div>

                        <div className="flex-1">

                          <p
                            className={`text-[15px] font-medium transition-colors ${
                              isActive
                                ? "text-white"
                                : "text-white/45 group-hover:text-white/75"
                            }`}
                          >
                            {experience.title}
                          </p>

                          <div
                            className={`mt-2 h-[2px] origin-left bg-[#c9f36a] transition-all duration-500 ${
                              isActive
                                ? "w-10"
                                : "w-0"
                            }`}
                          />

                        </div>

                        <ArrowRight
                          size={16}
                          strokeWidth={1.5}
                          className={`transition-all duration-300 ${
                            isActive
                              ? "translate-x-0 text-[#c9f36a]"
                              : "-translate-x-2 text-transparent"
                          }`}
                        />

                      </div>

                    </button>
                  );
                })}

              </div>


              {/* CONTROLS */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <span className="font-mono text-[10px] text-[#c9f36a]">
                    {current.number}
                  </span>

                  <span className="text-[10px] text-white/30">
                    / 04
                  </span>

                </div>


                <div className="flex gap-2">

                  <button
                    onClick={previous}
                    aria-label="Previous experience"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    <ArrowLeft size={16} strokeWidth={1.5} />
                  </button>

                  <button
                    onClick={next}
                    aria-label="Next experience"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c9f36a] text-[#123b2a] transition hover:bg-white"
                  >
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </button>

                </div>

              </div>

            </div>

          </div>
        </div>


        {/* =====================================================
            MOBILE
        ====================================================== */}

        <div className="lg:hidden">

          <div
            className="relative overflow-hidden rounded-[24px] bg-[#123b2a]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >

            {/* IMAGE */}

            <div className="relative h-[520px] w-full sm:h-[580px]">

              {experiences.map((experience, index) => (
                <div
                  key={experience.number}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === active
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


              {/* OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#031a11] via-[#031a11]/25 to-transparent" />


              {/* TOP */}

              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <span className="font-mono text-[10px] tracking-[0.15em] text-[#c9f36a]">
                    {current.number}
                  </span>

                  <span className="h-px w-7 bg-white/40" />

                  <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/60">
                    Experience
                  </span>

                </div>

                <span className="font-mono text-[10px] text-white/50">
                  {String(active + 1).padStart(2, "0")} / 04
                </span>

              </div>


              {/* CONTENT */}

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">

                <div
                  key={`mobile-content-${active}`}
                  className="animate-experience-content"
                >

                  <div className="mb-4 flex items-center gap-3">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c9f36a] text-[#123b2a]">
                      <current.icon size={14} strokeWidth={1.7} />
                    </div>

                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                      Dhanik Bharat
                    </span>

                  </div>

                  <h3 className="text-[30px] font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-[36px]">
                    {current.title}
                  </h3>

                  <p className="mt-3 max-w-[480px] text-[13px] leading-6 text-white/70">
                    {current.description}
                  </p>

                </div>


                {/* MOBILE CONTROLS */}

                <div className="mt-6 flex items-center justify-between">

                  {/* DOTS */}

                  <div className="flex items-center gap-1.5">

                    {experiences.map((experience, index) => (
                      <button
                        key={experience.number}
                        onClick={() => changeExperience(index)}
                        aria-label={`Show ${experience.title}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === active
                            ? "w-8 bg-[#c9f36a]"
                            : "w-1.5 bg-white/35"
                        }`}
                      />
                    ))}

                  </div>


                  {/* ARROWS */}

                  <div className="flex gap-2">

                    <button
                      onClick={previous}
                      aria-label="Previous experience"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm"
                    >
                      <ArrowLeft size={15} strokeWidth={1.5} />
                    </button>

                    <button
                      onClick={next}
                      aria-label="Next experience"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c9f36a] text-[#123b2a]"
                    >
                      <ArrowRight size={15} strokeWidth={1.5} />
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* MOBILE MINI NAVIGATION */}

          <div className="mt-5 overflow-x-auto pb-2">

            <div className="flex min-w-max gap-2">

              {experiences.map((experience, index) => {
                const isActive = index === active;

                return (
                  <button
                    key={experience.number}
                    onClick={() => changeExperience(index)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] transition-all ${
                      isActive
                        ? "border-[#123b2a] bg-[#123b2a] text-white"
                        : "border-[#d9dfda] bg-transparent text-[#647069]"
                    }`}
                  >
                    <span className="font-mono text-[9px]">
                      {experience.number}
                    </span>

                    {experience.shortTitle}
                  </button>
                );
              })}

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM STATEMENT
        ====================================================== */}

        <div className="mt-10 flex items-center gap-4 lg:mt-12">

          <span className="h-px w-12 bg-[#08783f]/40 sm:w-20" />

          <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#789087]">
            Learn · Prepare · Grow
          </span>

        </div>

      </div>
    </section>
  );
}