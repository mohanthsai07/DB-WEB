"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";
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

/* ============================================================
   FOLLOWING POINTER
   Desktop only.
   Attached only to the main photography area.
============================================================ */

function LifeFollowingPointer({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [visible, setVisible] = useState(false);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <div
      className="absolute inset-0 z-30 hidden cursor-none lg:block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <motion.div
        className="pointer-events-none absolute left-0 top-0"
        style={{
          x,
          y,
        }}
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.8,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#123b2a]/90 px-3 py-2 shadow-xl backdrop-blur-md">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c9f36a] text-[#123b2a]">
              <ArrowUpRight
                size={12}
                strokeWidth={2}
              />
            </span>

            <span className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
              Explore
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function LifeAtDhanikBharat() {
  const [active, setActive] = useState(0);

  const imageRef = useRef<HTMLDivElement>(null);

  const current = experiences[active];


  /* ============================================================
     NAVIGATION
  ============================================================ */

  const previous = () => {
    setActive((value) =>
      value === 0
        ? experiences.length - 1
        : value - 1
    );
  };

  const next = () => {
    setActive((value) =>
      value === experiences.length - 1
        ? 0
        : value + 1
    );
  };


  /* ============================================================
     KEYBOARD
  ============================================================ */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        previous();
      }

      if (event.key === "ArrowRight") {
        next();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);


  return (
    <section
      className="
        overflow-hidden
        bg-[#f7f8f4]
        py-16
        sm:py-20
        lg:h-[100svh]
        lg:min-h-[680px]
        lg:py-8
      "
    >

      <div
        className="
          mx-auto
          flex
          h-full
          max-w-[1440px]
          flex-col
          px-0
          sm:px-0
          lg:px-12
        "
      >

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            shrink-0
            px-5
            sm:px-8
            lg:px-0
          "
        >

          <div
            className="
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-end
              md:justify-between
            "
          >

            {/* TITLE */}

            <div className="max-w-[760px]">

              <div className="mb-4 flex items-center gap-3">

                <span
                  className="
                    h-[5px]
                    w-[5px]
                    rounded-full
                    bg-[#08783f]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.27em]
                    text-[#08783f]
                  "
                >
                  Life at Dhanik Bharat
                </span>

              </div>

              <h2
                className="
                  text-[clamp(38px,7vw,64px)]
                  font-semibold
                  leading-[0.94]
                  tracking-[-0.055em]
                  text-[#123b2a]
                "
              >
                A place to learn.
                <br />

                <span className="text-[#e50046]">
                  A place to belong.
                </span>
              </h2>

            </div>


            {/* DESCRIPTION */}

            <p
              className="
                max-w-[370px]
                text-[13px]
                leading-5
                text-[#647069]
              "
            >
              Explore the spaces and everyday
              experiences that become part of a
              student's life at Dhanik Bharat.
            </p>

          </div>

        </div>


        {/* =====================================================
            MAIN EXPERIENCE
        ====================================================== */}

        <div
          className="
            relative
            mt-8
            flex-1
            lg:mt-6
          "
        >

          {/* =================================================
              DESKTOP
          ================================================= */}

          <div className="hidden h-full lg:block">

            {/* ---------------------------------------------
                MAIN IMAGE
            --------------------------------------------- */}

            <div
              ref={imageRef}
              className="
                absolute
                inset-y-0
                left-0
                w-[67%]
                overflow-hidden
                rounded-[24px]
              "
            >

              {experiences.map(
                (experience, index) => (
                  <div
                    key={experience.number}
                    className={`
                      absolute
                      inset-0
                      transition-opacity
                      duration-700
                      ease-out
                      ${
                        active === index
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      }
                    `}
                  >

                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      priority={index === 0}
                      sizes="67vw"
                      className="
                        object-cover
                        transition-transform
                        duration-[1200ms]
                        ease-out
                      "
                    />

                  </div>
                )
              )}


              {/* IMAGE GRADIENT */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#031b11]/65
                  via-[#031b11]/5
                  to-transparent
                "
              />


              {/* FOLLOWING POINTER */}

              <LifeFollowingPointer
                containerRef={imageRef}
              />


              {/* IMAGE LABEL */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-7
                  left-7
                  flex
                  items-center
                  gap-3
                "
              >

                <span
                  className="
                    h-px
                    w-8
                    bg-white/50
                  "
                />

                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-white/75
                  "
                >
                  Everyday life
                </span>

              </div>

            </div>


            {/* ---------------------------------------------
                SECONDARY IMAGE
            --------------------------------------------- */}

            <div
              className="
                absolute
                right-[2%]
                top-[5%]
                z-10
                h-[34%]
                w-[21%]
                overflow-hidden
                rounded-[18px]
                border-[7px]
                border-[#f7f8f4]
              "
            >

              {experiences.map(
                (experience, index) => (
                  <div
                    key={experience.number}
                    className={`
                      absolute
                      inset-0
                      transition-opacity
                      duration-700
                      ${
                        active === index
                          ? "opacity-100"
                          : "opacity-0"
                      }
                    `}
                  >

                    <Image
                      src={experience.sideImage}
                      alt=""
                      fill
                      sizes="21vw"
                      className="object-cover"
                    />

                  </div>
                )
              )}

            </div>


            {/* ---------------------------------------------
                CONTENT PANEL
            --------------------------------------------- */}

            <div
              className="
                absolute
                bottom-0
                right-0
                z-20
                w-[46%]
                max-w-[570px]
                bg-[#f7f8f4]
                pl-9
                pt-8
              "
            >

              <div
                className="
                  border-t
                  border-[#dce4de]
                  pt-6
                "
              >

                {/* META */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      font-mono
                      text-[10px]
                      text-[#08783f]
                    "
                  >
                    {current.number}
                  </span>

                  <span
                    className="
                      h-px
                      w-9
                      bg-[#08783f]/30
                    "
                  />

                  <span
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-[#89958e]
                    "
                  >
                    {current.category}
                  </span>

                </div>


                {/* CONTENT */}

                <div
                  key={current.number}
                  className="animate-life-content"
                >

                  <h3
                    className="
                      mt-4
                      max-w-[520px]
                      text-[clamp(27px,3vw,44px)]
                      font-semibold
                      leading-[0.98]
                      tracking-[-0.045em]
                      text-[#123b2a]
                    "
                  >
                    {current.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-[430px]
                      text-[12px]
                      leading-5
                      text-[#647069]
                    "
                  >
                    {current.description}
                  </p>

                </div>


                {/* CONTROLS */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                  "
                >

                  {/* PROGRESS */}

                  <div className="flex gap-1.5">

                    {experiences.map(
                      (experience, index) => (
                        <button
                          key={experience.number}
                          type="button"
                          onClick={() =>
                            setActive(index)
                          }
                          aria-label={`Show ${experience.category}`}
                          className={`
                            h-[3px]
                            transition-all
                            duration-300
                            ${
                              active === index
                                ? "w-9 bg-[#08783f]"
                                : "w-3 bg-[#d1dbd4]"
                            }
                          `}
                        />
                      )
                    )}

                  </div>


                  {/* ARROWS */}

                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={previous}
                      aria-label="Previous experience"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#ccd7cf]
                        text-[#123b2a]
                        transition
                        hover:bg-[#08783f]
                        hover:text-white
                      "
                    >
                      <ChevronLeft
                        size={15}
                        strokeWidth={1.5}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next experience"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-[#123b2a]
                        text-white
                        transition
                        hover:bg-[#08783f]
                      "
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

          <div className="lg:hidden">

            {/* ---------------------------------------------
                FULL-BLEED IMAGE STORY
            --------------------------------------------- */}

            <div
              className="
                relative
                -mx-0
                h-[72svh]
                min-h-[500px]
                max-h-[720px]
                overflow-hidden
              "
            >

              {experiences.map(
                (experience, index) => (
                  <div
                    key={experience.number}
                    className={`
                      absolute
                      inset-0
                      transition-opacity
                      duration-700
                      ease-out
                      ${
                        active === index
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      }
                    `}
                  >

                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="
                        object-cover
                        object-center
                      "
                    />

                  </div>
                )
              )}


              {/* DARK GRADIENT */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#031b11]/95
                  via-[#031b11]/20
                  to-[#031b11]/5
                "
              />


              {/* TOP META */}

              <div
                className="
                  absolute
                  left-5
                  right-5
                  top-5
                  flex
                  items-center
                  justify-between
                  sm:left-7
                  sm:right-7
                  sm:top-7
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      font-mono
                      text-[10px]
                      text-[#c9f36a]
                    "
                  >
                    {current.number}
                  </span>

                  <span
                    className="
                      h-px
                      w-6
                      bg-white/45
                    "
                  />

                  <span
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white/70
                    "
                  >
                    {current.category}
                  </span>

                </div>

                <span
                  className="
                    font-mono
                    text-[9px]
                    text-white/55
                  "
                >
                  {String(active + 1).padStart(2, "0")} / 04
                </span>

              </div>


              {/* MOBILE CONTENT */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  px-5
                  pb-6
                  sm:px-7
                  sm:pb-8
                "
              >

                <div
                  key={current.number}
                  className="animate-life-content"
                >

                  {/* SMALL CATEGORY */}

                  <div
                    className="
                      mb-4
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <span
                      className="
                        h-px
                        w-8
                        bg-[#c9f36a]
                      "
                    />

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-white/65
                      "
                    >
                      Everyday life
                    </span>

                  </div>


                  <h3
                    className="
                      max-w-[390px]
                      text-[clamp(30px,8vw,42px)]
                      font-semibold
                      leading-[0.96]
                      tracking-[-0.045em]
                      text-white
                    "
                  >
                    {current.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-[430px]
                      text-[12px]
                      leading-5
                      text-white/70
                    "
                  >
                    {current.description}
                  </p>

                </div>


                {/* MOBILE CONTROLS */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-between
                  "
                >

                  {/* PROGRESS */}

                  <div className="flex items-center gap-1.5">

                    {experiences.map(
                      (experience, index) => (
                        <button
                          key={experience.number}
                          type="button"
                          onClick={() =>
                            setActive(index)
                          }
                          aria-label={`Show ${experience.category}`}
                          className={`
                            h-1.5
                            rounded-full
                            transition-all
                            duration-300
                            ${
                              active === index
                                ? "w-8 bg-[#c9f36a]"
                                : "w-1.5 bg-white/40"
                            }
                          `}
                        />
                      )
                    )}

                  </div>


                  {/* ARROWS */}

                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={previous}
                      aria-label="Previous experience"
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/25
                        bg-black/10
                        text-white
                        backdrop-blur-md
                      "
                    >
                      <ChevronLeft
                        size={15}
                        strokeWidth={1.5}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next experience"
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-[#c9f36a]
                        text-[#123b2a]
                      "
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


            {/* ---------------------------------------------
                MOBILE EXPERIENCE INDEX
            --------------------------------------------- */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[#dce4de]
                px-5
                py-4
                sm:px-7
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <span
                  className="
                    font-mono
                    text-[9px]
                    text-[#08783f]
                  "
                >
                  {current.number}
                </span>

                <span
                  className="
                    h-px
                    w-6
                    bg-[#08783f]/30
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#89958e]
                  "
                >
                  {current.category}
                </span>

              </div>


              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-[#89958e]
                "
              >
                Swipe to explore
              </span>

            </div>

          </div>

        </div>


        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div
          className="
            hidden
            shrink-0
            items-center
            justify-between
            border-t
            border-[#dce4de]
            pt-3
            lg:flex
          "
        >

          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-[#929c96]
            "
          >
            Stay · Study · Live · Grow
          </p>

          <a
            href="/campus-life"
            className="
              group
              flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              text-[#123b2a]
            "
          >
            Explore student life

            <ArrowUpRight
              size={12}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </a>

        </div>

      </div>

    </section>
  );
}