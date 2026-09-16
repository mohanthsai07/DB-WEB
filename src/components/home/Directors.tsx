"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";

interface Director {
  id: string;
  name: string;
  role: string;
  image: string;
}

const directors: Director[] = [
  {
    id: "01",
    name: "Director Name",
    role: "Director",
    image: "/images/directors/S.png",
  },
  {
    id: "02",
    name: "Director Name",
    role: "Director",
    image: "/images/leadership/director-02.jpg",
  },
  {
    id: "03",
    name: "Director Name",
    role: "Director",
    image: "/images/leadership/director-03.jpg",
  },
  {
    id: "04",
    name: "Director Name",
    role: "Director",
    image: "/images/leadership/director-04.jpg",
  },
  {
    id: "05",
    name: "Director Name",
    role: "Director",
    image: "/images/leadership/director-05.jpg",
  },
  {
    id: "06",
    name: "Director Name",
    role: "Director",
    image: "/images/leadership/director-06.jpg",
  },
  {
    id: "07",
    name: "Director Name",
    role: "Director",
    image: "/images/leadership/director-07.jpg",
  },
];

/* ============================================================
   GET CARD POSITION
============================================================ */

function getPosition(
  distance: number,
  screenWidth: number
) {
  /*
    distance:

    -3 = far left
    -2 = left
    -1 = near left
     0 = center
     1 = near right
     2 = right
     3 = far right
  */

  const isMobile = screenWidth < 640;
  const isTablet =
    screenWidth >= 640 && screenWidth < 1024;

  if (isMobile) {
    const positions: Record<number, any> = {
      [-3]: {
        x: -145,
        y: 35,
        z: -140,
        rotateY: 22,
        rotateZ: -10,
        scale: 0.68,
        opacity: 0,
      },

      [-2]: {
        x: -105,
        y: 20,
        z: -90,
        rotateY: 17,
        rotateZ: -8,
        scale: 0.76,
        opacity: 0.45,
      },

      [-1]: {
        x: -72,
        y: 8,
        z: -35,
        rotateY: 9,
        rotateZ: -4,
        scale: 0.86,
        opacity: 0.8,
      },

      [0]: {
        x: 0,
        y: 0,
        z: 80,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
      },

      [1]: {
        x: 72,
        y: 8,
        z: -35,
        rotateY: -9,
        rotateZ: 4,
        scale: 0.86,
        opacity: 0.8,
      },

      [2]: {
        x: 105,
        y: 20,
        z: -90,
        rotateY: -17,
        rotateZ: 8,
        scale: 0.76,
        opacity: 0.45,
      },

      [3]: {
        x: 145,
        y: 35,
        z: -140,
        rotateY: -22,
        rotateZ: 10,
        scale: 0.68,
        opacity: 0,
      },
    };

    return positions[distance];
  }

  if (isTablet) {
    const positions: Record<number, any> = {
      [-3]: {
        x: -390,
        y: 45,
        z: -150,
        rotateY: 20,
        rotateZ: -11,
        scale: 0.72,
        opacity: 0,
      },

      [-2]: {
        x: -275,
        y: 27,
        z: -100,
        rotateY: 14,
        rotateZ: -7,
        scale: 0.8,
        opacity: 0.55,
      },

      [-1]: {
        x: -145,
        y: 8,
        z: -35,
        rotateY: 7,
        rotateZ: -4,
        scale: 0.91,
        opacity: 0.9,
      },

      [0]: {
        x: 0,
        y: 0,
        z: 80,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
      },

      [1]: {
        x: 145,
        y: 8,
        z: -35,
        rotateY: -7,
        rotateZ: 4,
        scale: 0.91,
        opacity: 0.9,
      },

      [2]: {
        x: 275,
        y: 27,
        z: -100,
        rotateY: -14,
        rotateZ: 7,
        scale: 0.8,
        opacity: 0.55,
      },

      [3]: {
        x: 390,
        y: 45,
        z: -150,
        rotateY: -20,
        rotateZ: 11,
        scale: 0.72,
        opacity: 0,
      },
    };

    return positions[distance];
  }

  /* DESKTOP */

  const positions: Record<number, any> = {
    [-3]: {
      x: -610,
      y: 58,
      z: -190,
      rotateY: 22,
      rotateZ: -14,
      scale: 0.75,
      opacity: 0,
    },

    [-2]: {
      x: -430,
      y: 35,
      z: -125,
      rotateY: 15,
      rotateZ: -9,
      scale: 0.84,
      opacity: 0.58,
    },

    [-1]: {
      x: -225,
      y: 12,
      z: -45,
      rotateY: 7,
      rotateZ: -4,
      scale: 0.94,
      opacity: 0.9,
    },

    [0]: {
      x: 0,
      y: 0,
      z: 100,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      opacity: 1,
    },

    [1]: {
      x: 225,
      y: 12,
      z: -45,
      rotateY: -7,
      rotateZ: 4,
      scale: 0.94,
      opacity: 0.9,
    },

    [2]: {
      x: 430,
      y: 35,
      z: -125,
      rotateY: -15,
      rotateZ: 9,
      scale: 0.84,
      opacity: 0.58,
    },

    [3]: {
      x: 610,
      y: 58,
      z: -190,
      rotateY: -22,
      rotateZ: 14,
      scale: 0.75,
      opacity: 0,
    },
  };

  return positions[distance];
}


/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function Directors() {
  const [activeIndex, setActiveIndex] =
    useState(3);

  const [hoveredIndex, setHoveredIndex] =
    useState<number | null>(null);

  const [screenWidth, setScreenWidth] =
    useState(1200);

  const touchStartX =
    useRef<number | null>(null);

  /* ==========================================================
     SCREEN SIZE
  ========================================================== */

  useEffect(() => {
    const updateSize = () => {
      setScreenWidth(window.innerWidth);
    };

    updateSize();

    window.addEventListener(
      "resize",
      updateSize
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateSize
      );
    };
  }, []);


  /* ==========================================================
     NEXT
  ========================================================== */

  const next = useCallback(() => {
    setActiveIndex((current) => {
      return (
        (current + 1) %
        directors.length
      );
    });
  }, []);


  /* ==========================================================
     PREVIOUS
  ========================================================== */

  const previous = useCallback(() => {
    setActiveIndex((current) => {
      return (
        (current -
          1 +
          directors.length) %
        directors.length
      );
    });
  }, []);


  /* ==========================================================
     AUTO PLAY
  ========================================================== */

  useEffect(() => {
    const timer = setInterval(() => {
      if (hoveredIndex === null) {
        next();
      }
    }, 5500);

    return () => {
      clearInterval(timer);
    };
  }, [next, hoveredIndex]);


  /* ==========================================================
     SWIPE
  ========================================================== */

  const handleTouchStart = (
    e: React.TouchEvent
  ) => {
    touchStartX.current =
      e.touches[0].clientX;
  };


  const handleTouchEnd = (
    e: React.TouchEvent
  ) => {
    if (
      touchStartX.current === null
    ) {
      return;
    }

    const endX =
      e.changedTouches[0].clientX;

    const difference =
      touchStartX.current - endX;

    if (Math.abs(difference) > 45) {
      if (difference > 0) {
        next();
      } else {
        previous();
      }
    }

    touchStartX.current = null;
  };


  /* ==========================================================
     CARD CLICK
  ========================================================== */

  const handleCardClick = (
    index: number
  ) => {
    if (index === activeIndex) {
      return;
    }

    setActiveIndex(index);
  };


  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#f7f8f4]

        px-4
        py-20

        sm:px-6
        sm:py-24

        md:px-8
        md:py-28

        lg:px-12
        lg:py-32
      "
    >

      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]
        "
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          className="
            relative
            z-50
            mb-10
            text-center

            sm:mb-12
          "
        >

          <div
            className="
              mb-4
              flex
              items-center
              justify-center
              gap-2.5
            "
          >

            <span
              className="
                h-[6px]
                w-[6px]
                rounded-full
                bg-[#08783f]
              "
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-[#08783f]
              "
            >
              Our Leadership
            </span>

          </div>


          <h2
            className="
              text-[40px]
              font-semibold
              leading-[0.95]
              tracking-[-0.055em]
              text-[#123b2a]

              sm:text-[52px]

              md:text-[60px]

              lg:text-[68px]
            "
          >
            People behind the{" "}
            <span className="text-[#e50046]">
              vision.
            </span>
          </h2>


          <p
            className="
              mx-auto
              mt-5
              max-w-[520px]
              text-[13px]
              leading-6
              text-[#68746e]

              sm:text-[14px]
              sm:leading-7
            "
          >
            The leadership shaping the
            learning environment and
            future of Dhanik Bharat.
          </p>

        </div>


        {/* ==================================================
            3D CAROUSEL
        ================================================== */}

        <div
          className="
            relative
            mx-auto

            h-[360px]
            w-full

            sm:h-[440px]

            md:h-[510px]

            lg:h-[570px]

            [perspective:1600px]
          "
          onTouchStart={
            handleTouchStart
          }
          onTouchEnd={
            handleTouchEnd
          }
        >

          {/* Ground shadow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[72%]

              h-[80px]
              w-[55%]

              -translate-x-1/2

              rounded-[50%]

              bg-[#123b2a]/[0.08]

              blur-[45px]
            "
          />


          {/* CARDS */}

          {directors.map(
            (director, index) => {

              let distance =
                index -
                activeIndex;

              /*
                Circular wrapping
                makes the carousel
                continuous.
              */

              if (
                distance > 3
              ) {
                distance -=
                  directors.length;
              }

              if (
                distance < -3
              ) {
                distance +=
                  directors.length;
              }

              const position =
                getPosition(
                  distance,
                  screenWidth
                );

              const isActive =
                distance === 0;

              const isHovered =
                hoveredIndex ===
                index;

              return (
                <button
                  key={
                    director.id
                  }
                  type="button"
                  onClick={() =>
                    handleCardClick(
                      index
                    )
                  }
                  onMouseEnter={() =>
                    setHoveredIndex(
                      index
                    )
                  }
                  onMouseLeave={() =>
                    setHoveredIndex(
                      null
                    )
                  }
                  className="
                    absolute
                    left-1/2
                    top-1/2

                    h-[270px]
                    w-[185px]

                    overflow-hidden

                    rounded-[24px]

                    border
                    border-white/30

                    bg-[#123b2a]

                    p-0

                    outline-none

                    transition-all
                    duration-[1100ms]
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    [transform-style:preserve-3d]

                    focus-visible:ring-2
                    focus-visible:ring-[#08783f]
                    focus-visible:ring-offset-4

                    sm:h-[350px]
                    sm:w-[235px]

                    md:h-[410px]
                    md:w-[270px]

                    lg:h-[450px]
                    lg:w-[300px]
                  "
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      translate3d(
                        ${position.x}px,
                        ${position.y}px,
                        ${position.z}px
                      )
                      rotateY(
                        ${position.rotateY}deg
                      )
                      rotateZ(
                        ${position.rotateZ}deg
                      )
                      scale(
                        ${
                          isHovered &&
                          isActive
                            ? position.scale *
                              1.035
                            : position.scale
                        }
                      )
                    `,

                    opacity:
                      position.opacity,

                    zIndex:
                      isActive
                        ? 30
                        : 20 -
                          Math.abs(
                            distance
                          ),

                    boxShadow:
                      isActive
                        ? "0 35px 80px rgba(13, 53, 36, 0.25)"
                        : "0 18px 45px rgba(13, 58, 39, 0.12)",
                  }}
                >

                  {/* IMAGE */}

                  <Image
                    src={
                      director.image
                    }
                    alt={
                      director.name
                    }
                    fill
                    sizes="
                      (max-width: 640px) 185px,
                      (max-width: 1024px) 270px,
                      300px
                    "
                    className="
                      object-cover

                      transition-transform
                      duration-[1200ms]
                      ease-out
                    "
                  />


                  {/* IMAGE TINT */}

                  <div
                    className="
                      absolute
                      inset-0

                      bg-[#123b2a]

                      opacity-[0.08]

                      transition-opacity
                      duration-700
                    "
                    style={{
                      opacity:
                        isActive
                          ? 0.04
                          : 0.22,
                    }}
                  />


                  {/* BOTTOM GRADIENT */}

                  <div
                    className="
                      pointer-events-none

                      absolute
                      inset-x-0
                      bottom-0

                      h-[55%]

                      bg-gradient-to-t
                      from-black/90
                      via-black/40
                      to-transparent
                    "
                  />


                  {/* NUMBER */}

                  <div
                    className="
                      absolute
                      right-5
                      top-5

                      font-mono
                      text-[9px]

                      tracking-[0.18em]

                      text-white/75
                    "
                  >
                    {director.id}
                  </div>


                  {/* NAME */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0

                      w-full

                      p-5
                      text-left

                      sm:p-6

                      md:p-7
                    "
                  >

                    <p
                      className="
                        mb-2

                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]

                        text-[#c9f36a]

                        sm:text-[9px]
                      "
                    >
                      {director.role}
                    </p>


                    <h3
                      className="
                        text-[18px]
                        font-semibold
                        leading-tight
                        tracking-[-0.035em]

                        text-white

                        sm:text-[21px]

                        md:text-[24px]
                      "
                    >
                      {director.name}
                    </h3>

                  </div>


                  {/* CARD BORDER */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0

                      rounded-[24px]

                      ring-1
                      ring-inset
                      ring-white/20
                    "
                  />

                </button>
              );
            }
          )}

        </div>


        {/* ==================================================
            CONTROLS
        ================================================== */}

        <div
          className="
            relative
            z-50

            -mt-3

            flex
            items-center
            justify-center
            gap-5
          "
        >

          {/* PREVIOUS */}

          <button
            type="button"
            onClick={previous}
            aria-label="Previous director"
            className="
              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-full

              border
              border-[#123b2a]/15

              bg-white

              text-[#123b2a]

              transition-all
              duration-300

              hover:bg-[#123b2a]
              hover:text-white

              sm:h-11
              sm:w-11
            "
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>


          {/* DOTS */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            {directors.map(
              (director, index) => (
                <button
                  key={
                    director.id
                  }
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      index
                    )
                  }
                  aria-label={`Director ${index + 1}`}
                  className={`
                    h-[6px]
                    rounded-full

                    transition-all
                    duration-500

                    ${
                      index ===
                      activeIndex
                        ? "w-7 bg-[#08783f]"
                        : "w-[6px] bg-[#123b2a]/20"
                    }
                  `}
                />
              )
            )}
          </div>


          {/* NEXT */}

          <button
            type="button"
            onClick={next}
            aria-label="Next director"
            className="
              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-full

              border
              border-[#123b2a]/15

              bg-white

              text-[#123b2a]

              transition-all
              duration-300

              hover:bg-[#123b2a]
              hover:text-white

              sm:h-11
              sm:w-11
            "
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

        </div>


        {/* COUNTER */}

        <div
          className="
            mt-5
            text-center
          "
        >
          <span
            className="
              font-mono
              text-[9px]
              tracking-[0.18em]
              text-[#08783f]
            "
          >
            {directors[
              activeIndex
            ].id}
          </span>

          <span
            className="
              mx-3
              text-[#b4beb8]
            "
          >
            /
          </span>

          <span
            className="
              font-mono
              text-[9px]
              tracking-[0.18em]
              text-[#89958e]
            "
          >
            07
          </span>
        </div>

      </div>

    </section>
  );
}