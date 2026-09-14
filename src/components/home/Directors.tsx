"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const directors = [
  {
    id: "01",
    name: "Director Name",
    role: "Director",
    image: "/images/directors/director-01.jpg",
  },
  {
    id: "02",
    name: "Director Name",
    role: "Director",
    image: "/images/directors/director-02.jpg",
  },
  {
    id: "03",
    name: "Director Name",
    role: "Director",
    image: "/images/directors/director-03.jpg",
  },
  {
    id: "04",
    name: "Director Name",
    role: "Director",
    image: "/images/directors/director-04.jpg",
  },
  {
    id: "05",
    name: "Director Name",
    role: "Director",
    image: "/images/directors/director-05.jpg",
  },
  {
    id: "06",
    name: "Director Name",
    role: "Director",
    image: "/images/directors/director-06.jpg",
  },
  {
    id: "07",
    name: "Director Name",
    role: "Director",
    image: "/images/directors/director-07.jpg",
  },
];

export default function Directors() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = directors.length;


  /* ============================================================
     RESPONSIVE VIEWPORT
  ============================================================ */

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setViewportWidth(
          carouselRef.current.clientWidth
        );
      }
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    window.addEventListener(
      "resize",
      updateWidth
    );

    return () => {
      observer.disconnect();
      window.removeEventListener(
        "resize",
        updateWidth
      );
    };
  }, []);


  /* ============================================================
     NAVIGATION
  ============================================================ */

  const next = () => {
    setActive(
      (current) =>
        (current + 1) % total
    );
  };

  const previous = () => {
    setActive(
      (current) =>
        (current - 1 + total) % total
    );
  };


  /* ============================================================
     AUTOMATIC CINEMATIC MOVEMENT
  ============================================================ */

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActive(
        (current) =>
          (current + 1) % total
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, total]);


  /* ============================================================
     CIRCULAR POSITION
  ============================================================ */

  const getPosition = (index: number) => {
    let position = index - active;

    if (position > total / 2) {
      position -= total;
    }

    if (position < -total / 2) {
      position += total;
    }

    return position;
  };


  /* ============================================================
     RESPONSIVE CAROUSEL VALUES
  ============================================================ */

  const isMobile = viewportWidth > 0 &&
    viewportWidth < 768;

  const isTablet = viewportWidth >= 768 &&
    viewportWidth < 1024;


  /*
   * Card width scales naturally.
   *
   * Mobile:
   * ~220px → ~285px
   *
   * Desktop:
   * ~270px → 310px
   */

  const cardWidth = isMobile
    ? Math.min(
        285,
        Math.max(
          215,
          viewportWidth * 0.70
        )
      )
    : isTablet
      ? Math.min(
          290,
          Math.max(
            245,
            viewportWidth * 0.30
          )
        )
      : Math.min(
          310,
          Math.max(
            270,
            viewportWidth * 0.215
          )
        );


  /*
   * Card height maintains the portrait
   * cinematic ratio.
   */

  const cardHeight = isMobile
    ? Math.round(cardWidth * 1.43)
    : isTablet
      ? Math.round(cardWidth * 1.43)
      : 455;


  /*
   * Distance between cards.
   *
   * This is the important fix:
   * no more fixed 245px on every screen.
   */

  const step = isMobile
    ? Math.max(
        cardWidth * 0.68,
        viewportWidth * 0.56
      )
    : isTablet
      ? Math.max(
          cardWidth * 0.72,
          viewportWidth * 0.29
        )
      : Math.max(
          190,
          Math.min(
            245,
            viewportWidth * 0.17
          )
        );


  /* ============================================================
     TOUCH SWIPE
  ============================================================ */

  const handleTouchStart = (
    event: React.TouchEvent
  ) => {
    touchStartX.current =
      event.touches[0].clientX;

    setIsPaused(true);
  };


  const handleTouchEnd = (
    event: React.TouchEvent
  ) => {
    if (
      touchStartX.current === null
    ) {
      setIsPaused(false);
      return;
    }

    const touchEndX =
      event.changedTouches[0].clientX;

    const distance =
      touchStartX.current -
      touchEndX;

    if (Math.abs(distance) > 45) {
      if (distance > 0) {
        next();
      } else {
        previous();
      }
    }

    touchStartX.current = null;

    setIsPaused(false);
  };


  /* ============================================================
     KEYBOARD
  ============================================================ */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "ArrowRight"
      ) {
        next();
      }

      if (
        event.key === "ArrowLeft"
      ) {
        previous();
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
        py-14
        sm:py-18
        lg:py-24
      "
      onMouseEnter={() =>
        setIsPaused(true)
      }
      onMouseLeave={() =>
        setIsPaused(false)
      }
    >

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div
        className="
          mx-auto
          max-w-[1440px]
          px-5
          sm:px-8
          lg:px-12
        "
      >

        <div className="text-center">

          {/* EYEBROW */}

          <div
            className="
              mb-3
              flex
              items-center
              justify-center
              gap-3
            "
          >

            <span
              className="
                h-[5px]
                w-[5px]
                rounded-full
                bg-[#08783f]
              "
            />

            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.26em]
                text-[#08783f]
                sm:text-[10px]
              "
            >
              Leadership
            </p>

          </div>


          {/* HEADING */}

          <h2
            className="
              mx-auto
              max-w-[850px]
              text-[clamp(36px,7vw,72px)]
              font-medium
              leading-[0.94]
              tracking-[-0.055em]
              text-[#123b2a]
            "
          >
            The people behind
            <br className="hidden sm:block" />
            <span className="sm:ml-2">
              the vision.
            </span>
          </h2>


          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-5
              max-w-[600px]
              text-[12px]
              leading-5
              text-[#647069]
              sm:text-sm
              sm:leading-6
            "
          >
            Meet the people shaping the
            learning environment, culture
            and future of Dhanik Bharat.
          </p>

        </div>

      </div>


      {/* ========================================================
          RESPONSIVE CAROUSEL
      ======================================================== */}

      <div
        ref={carouselRef}
        className="
          relative
          mx-auto
          mt-10
          h-[470px]
          w-full
          overflow-hidden
          sm:mt-12
          sm:h-[520px]
          md:h-[560px]
          lg:mt-14
          lg:h-[610px]
          lg:max-w-[1440px]
        "
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* ======================================================
            SOFT CENTER ATMOSPHERE
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[280px]
            w-[280px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#08783f]/[0.025]
            blur-[60px]
            sm:h-[420px]
            sm:w-[420px]
            lg:h-[520px]
            lg:w-[520px]
            lg:blur-[80px]
          "
        />


        {/* ======================================================
            CARDS
        ====================================================== */}

        <div
          className="
            absolute
            inset-0
          "
          style={{
            perspective:
              isMobile
                ? "900px"
                : "1400px",
          }}
        >

          {directors.map(
            (director, index) => {
              const position =
                getPosition(index);

              /*
               * On mobile we only need:
               *
               * -2
               * -1
               *  0
               * +1
               * +2
               *
               * This keeps the composition clean.
               */

              const visibleRange =
                isMobile ? 2 : 3;

              if (
                Math.abs(position) >
                visibleRange
              ) {
                return null;
              }


              const isActive =
                position === 0;

              const distance =
                Math.abs(position);


              /* -----------------------------------------------
                 SCALE
              ------------------------------------------------ */

              let scale = 1;

              if (distance === 1) {
                scale = isMobile
                  ? 0.76
                  : isTablet
                    ? 0.76
                    : 0.79;
              }

              if (distance === 2) {
                scale = isMobile
                  ? 0.58
                  : isTablet
                    ? 0.62
                    : 0.63;
              }

              if (distance === 3) {
                scale = 0.50;
              }


              /* -----------------------------------------------
                 VERTICAL DEPTH
              ------------------------------------------------ */

              let translateY = 0;

              if (distance === 1) {
                translateY =
                  isMobile ? 24 : 28;
              }

              if (distance === 2) {
                translateY =
                  isMobile ? 50 : 62;
              }

              if (
                distance === 3
              ) {
                translateY = 85;
              }


              /* -----------------------------------------------
                 ROTATION
              ------------------------------------------------ */

              const rotateY =
                position === 0
                  ? 0
                  : position > 0
                    ? -10
                    : 10;


              /* -----------------------------------------------
                 OPACITY
              ------------------------------------------------ */

              let opacity = 1;

              if (distance === 1) {
                opacity = isMobile
                  ? 0.65
                  : 0.72;
              }

              if (distance === 2) {
                opacity = isMobile
                  ? 0.28
                  : 0.38;
              }

              if (distance === 3) {
                opacity = 0.16;
              }


              /* -----------------------------------------------
                 DEPTH
              ------------------------------------------------ */

              const zIndex =
                50 -
                distance * 10;


              return (
                <button
                  key={director.id}
                  type="button"
                  aria-label={`View ${director.name}`}
                  onClick={() =>
                    setActive(index)
                  }
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    outline-none
                  "
                  style={{
                    width: cardWidth,
                    height: cardHeight,

                    zIndex,

                    opacity,

                    transform: `
                      translate(-50%, -50%)
                      translateX(${position * step}px)
                      translateY(${translateY}px)
                      rotateY(${rotateY}deg)
                      scale(${scale})
                    `,

                    transition:
                      "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease",

                    transformStyle:
                      "preserve-3d",

                    WebkitTapHighlightColor:
                      "transparent",
                  }}
                >

                  {/* =================================================
                      CARD
                  ================================================== */}

                  <div
                    className={`
                      relative
                      h-full
                      w-full
                      overflow-hidden
                      rounded-[18px]
                      bg-[#123b2a]
                      sm:rounded-[22px]
                      ${
                        isActive
                          ? "shadow-[0_28px_70px_rgba(18,59,42,0.20)]"
                          : "shadow-[0_15px_40px_rgba(18,59,42,0.08)]"
                      }
                    `}
                  >

                    {/* IMAGE */}

                    <Image
                      src={director.image}
                      alt={director.name}
                      fill
                      priority={
                        isActive
                      }
                      sizes={`
                        ${
                          isMobile
                            ? "70vw"
                            : "310px"
                        }
                      `}
                      className="
                        object-cover
                      "
                    />


                    {/* GRADIENT */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/85
                        via-black/15
                        to-transparent
                      "
                    />


                    {/* BORDER */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-[18px]
                        ring-1
                        ring-inset
                        ring-white/15
                        sm:rounded-[22px]
                      "
                    />


                    {/* NUMBER */}

                    <div
                      className="
                        absolute
                        right-4
                        top-4
                        rounded-full
                        bg-black/20
                        px-2.5
                        py-1.5
                        text-[8px]
                        font-medium
                        tracking-[0.15em]
                        text-white
                        backdrop-blur-md
                        sm:right-5
                        sm:top-5
                        sm:px-3
                        sm:text-[10px]
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
                        right-0
                        p-5
                        text-left
                        sm:p-7
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
                          text-[22px]
                          font-medium
                          leading-none
                          tracking-[-0.035em]
                          text-white
                          sm:text-[28px]
                        "
                      >
                        {director.name}
                      </h3>

                    </div>

                  </div>

                </button>
              );
            }
          )}

        </div>


        {/* ======================================================
            CONTROLS
        ====================================================== */}

        <div
          className="
            absolute
            bottom-3
            left-1/2
            z-[80]
            flex
            -translate-x-1/2
            items-center
            gap-4
            sm:gap-7
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
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#123b2a]/15
              bg-[#f7f8f4]/95
              text-[#123b2a]
              shadow-sm
              transition-all
              duration-300
              hover:border-[#123b2a]
              hover:bg-[#123b2a]
              hover:text-white
              sm:h-11
              sm:w-11
            "
          >
            <ChevronLeft
              size={17}
              strokeWidth={1.5}
            />
          </button>


          {/* PROGRESS */}

          <div
            className="
              flex
              max-w-[120px]
              items-center
              gap-1
              overflow-hidden
              sm:max-w-none
              sm:gap-1.5
            "
          >

            {directors.map(
              (director, index) => (
                <button
                  key={director.id}
                  type="button"
                  onClick={() =>
                    setActive(index)
                  }
                  aria-label={`Go to director ${index + 1}`}
                  className={`
                    h-[2px]
                    shrink-0
                    transition-all
                    duration-500
                    ${
                      active === index
                        ? "w-6 bg-[#08783f] sm:w-8"
                        : "w-2.5 bg-[#123b2a]/15 hover:bg-[#123b2a]/35 sm:w-3"
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
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#123b2a]/15
              bg-[#f7f8f4]/95
              text-[#123b2a]
              shadow-sm
              transition-all
              duration-300
              hover:border-[#123b2a]
              hover:bg-[#123b2a]
              hover:text-white
              sm:h-11
              sm:w-11
            "
          >
            <ChevronRight
              size={17}
              strokeWidth={1.5}
            />
          </button>

        </div>

      </div>


      {/* ========================================================
          MOBILE SWIPE HINT
      ======================================================== */}

      <div
        className="
          mt-1
          flex
          items-center
          justify-center
          gap-3
          px-5
          md:hidden
        "
      >

        <span
          className="
            h-px
            w-6
            bg-[#123b2a]/15
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
          Swipe to explore
        </span>

        <span
          className="
            h-px
            w-6
            bg-[#123b2a]/15
          "
        />

      </div>


      {/* ========================================================
          FOOTER
      ======================================================== */}

      <div
        className="
          mx-auto
          mt-8
          max-w-[1400px]
          px-5
          sm:mt-10
          sm:px-8
          lg:mt-12
          lg:px-12
        "
      >

        <div
          className="
            border-t
            border-[#123b2a]/10
            pt-5
            sm:pt-6
          "
        >

          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#647069]
                sm:text-[10px]
              "
            >
              Leadership · Vision · Education
            </p>

            <p
              className="
                max-w-[480px]
                text-[11px]
                leading-5
                text-[#647069]
                sm:text-right
                sm:text-sm
                sm:leading-6
              "
            >
              The people behind the vision,
              shaping an environment where
              students can learn, grow and
              prepare for what comes next.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}