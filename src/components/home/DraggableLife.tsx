"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

const experiences = [
  {
    number: "01",
    category: "STAY",
    title: "Comfort away from home.",
    description:
      "Thoughtfully arranged student accommodation with dedicated spaces to rest, study and recharge.",
    image: "/images/life/hostel-room.jpg",
  },
  {
    number: "02",
    category: "DINING",
    title: "Good food. Shared moments.",
    description:
      "A dedicated dining environment where students can enjoy their meals together as part of everyday campus life.",
    image: "/images/life/food-mess.jpg",
  },
  {
    number: "03",
    category: "STUDY",
    title: "Space to focus.",
    description:
      "Quiet spaces that give students room to revise, read, practise and stay focused outside regular classes.",
    image: "/images/life/study-space.jpg",
  },
  {
    number: "04",
    category: "STUDENT LIFE",
    title: "Life beyond the timetable.",
    description:
      "A supportive environment where students can interact, unwind and build friendships along the way.",
    image: "/images/life/student-life.jpg",
  },
];

/*
 * All cards begin around the same point.
 * Small rotations create the physical photo-stack effect.
 */
const cardPositions = [
  {
    left: "50%",
    top: "57%",
    rotate: "-8deg",
    width: "clamp(245px, 22vw, 340px)",
  },
  {
    left: "50%",
    top: "57%",
    rotate: "-6deg",
    width: "clamp(255px, 23vw, 350px)",
  },
  {
    left: "50%",
    top: "57%",
    rotate: "9deg",
    width: "clamp(265px, 24vw, 365px)",
  },
  {
    left: "50%",
    top: "57%",
    rotate: "18deg",
    width: "clamp(245px, 22vw, 340px)",
  },
];

export default function DraggableLife() {
  /*
   * Initial stacking order.
   */
  const [zIndexes, setZIndexes] = useState([
    50,
    20,
    90,
    10,
  ]);

  const [activeCard, setActiveCard] = useState(2);

  /*
   * Bring dragged card to the front.
   */
  const bringToFront = (index: number) => {
    setZIndexes((current) => {
      const highest = Math.max(...current);

      return current.map((value, i) =>
        i === index ? highest + 1 : value,
      );
    });

    setActiveCard(index);
  };

  return (
    <section
      className="
        relative
        h-[100svh]
        min-h-[620px]
        overflow-hidden
        bg-[#f7f8f4]
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          z-[00]
          mx-auto
          max-w-[1440px]
          px-5
          pt-7
          sm:px-8
          sm:pt-9
          lg:px-12
          lg:pt-11
        "
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[5px] w-[5px] rounded-full bg-[#08783f]" />

              <span
                className="
                  text-[8px]
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
                max-w-[650px]
                text-[clamp(34px,5vw,68px)]
                font-semibold
                leading-[0.9]
                tracking-[-0.06em]
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

          <p
            className="
              hidden
              max-w-[260px]
              pt-6
              text-[11px]
              leading-5
              text-[#647069]
              md:block
            "
          >
            Explore the spaces and everyday experiences
            that become part of a student&apos;s life at
            Dhanik Bharat.
          </p>
        </div>
      </div>

      {/* =====================================================
          CARD STAGE
      ===================================================== */}

      <DraggableCardContainer
        className="
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* =================================================
            REVEAL MESSAGE

            IMPORTANT:
            This sits BEHIND the cards.

            The cards naturally cover it initially.
            When cards are dragged away, this message
            becomes visible.
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[66%]
            z-[2]
            w-[min(760px,85vw)]
            -translate-x-1/2
            -translate-y-1/2
            text-center
          "
        >
          {/* Small eyebrow */}

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#08783f]/30" />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.26em]
                text-[#08783f]
              "
            >
              Everyday experiences
            </span>

            <span className="h-px w-8 bg-[#08783f]/30" />
          </div>

          {/* Main message */}

          <p
            className="
              mx-auto
              max-w-[650px]
              text-[clamp(25px,3.3vw,46px)]
              font-semibold
              leading-[0.98]
              tracking-[-0.045em]
              text-[#123b2a]/55
            "
          >
            Life at Dhanik Bharat is more than
            the classroom — it is where students
            learn, grow and become themselves.
          </p>

          {/* Small supporting line */}

          <p
            className="
              mx-auto
              mt-5
              max-w-[420px]
              text-[10px]
              leading-5
              text-[#647069]/70
            "
          >
            The spaces around a student become part
            of the journey they remember.
          </p>
        </div>

        {/* =================================================
            VERY SUBTLE CENTER GLOW
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[58%]
            z-0
            h-[460px]
            w-[460px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#08783f]/[0.025]
            blur-3xl
          "
        />

        {/* =================================================
            POLAROID CARDS
        ================================================= */}

        {experiences.map((experience, index) => {
          const position = cardPositions[index];

          return (
            <DraggableCardBody
              key={experience.number}
              onBringToFront={() =>
                bringToFront(index)
              }
              style={{
                left: position.left,
                top: position.top,
                width: position.width,
                rotate: position.rotate,
                zIndex: zIndexes[index],
              }}
              className="
                -translate-x-1/2
                -translate-y-1/2
              "
            >
              {/* ==========================================
                  PHOTO
              ========================================== */}

              <div
                className="
                  relative
                  aspect-[0.92]
                  w-full
                  overflow-hidden
                  bg-[#e9ebe6]
                "
              >
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  sizes="
                    (max-width: 640px) 72vw,
                    (max-width: 1024px) 40vw,
                    365px
                  "
                  draggable={false}
                  priority={index === 2}
                  className="
                    pointer-events-none
                    object-cover
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/[0.08]
                    to-transparent
                  "
                />
              </div>

              {/* ==========================================
                  POLAROID CAPTION
              ========================================== */}

              <div
                className="
                  relative
                  bg-[#fdfdfb]
                  px-3
                  pb-1
                  pt-4
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="
                        mb-1.5
                        text-[7px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-[#08783f]
                      "
                    >
                      {experience.category}
                    </p>

                    <h3
                      className="
                        text-[16px]
                        font-semibold
                        leading-[1.05]
                        tracking-[-0.035em]
                        text-[#123b2a]
                        sm:text-[18px]
                      "
                    >
                      {experience.title}
                    </h3>
                  </div>

                  <span
                    className="
                      shrink-0
                      pt-0.5
                      font-mono
                      text-[8px]
                      text-[#89958e]
                    "
                  >
                    {experience.number}
                  </span>
                </div>

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[7px]
                      uppercase
                      tracking-[0.18em]
                      text-[#929c96]
                    "
                  >
                    Dhanik Bharat
                  </span>

                  <span
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-[#c9f36a]
                      text-[#123b2a]
                    "
                  >
                    <ArrowUpRight
                      size={12}
                      strokeWidth={1.6}
                    />
                  </span>
                </div>
              </div>
            </DraggableCardBody>
          );
        })}
      </DraggableCardContainer>

      {/* =====================================================
          BOTTOM INFORMATION
      ===================================================== */}

      <div
        className="
          absolute
          bottom-4
          left-5
          right-5
          z-[100]
          flex
          items-center
          justify-between
          border-t
          border-[#dce4de]
          pt-3
          sm:left-8
          sm:right-8
          lg:left-12
          lg:right-12
        "
      >
        <span
          className="
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#89958e]
          "
        >
          Stay · Study · Live · Grow
        </span>

        <span
          className="
            text-[7px]
            uppercase
            tracking-[0.18em]
            text-[#929c96]
          "
        >
          {String(activeCard + 1).padStart(2, "0")} / 04
        </span>
      </div>
    </section>
  );
}