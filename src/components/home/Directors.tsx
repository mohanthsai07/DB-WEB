"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const total = directors.length;

  const next = () => {
    setActive((current) => (current + 1) % total);
  };

  const previous = () => {
    setActive((current) => (current - 1 + total) % total);
  };

  /*
   * Automatic cinematic movement
   */
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  /*
   * Calculate the circular position of every card.
   *
   *  -3  -2  -1   0   +1  +2  +3
   *
   *                ACTIVE
   */
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

  return (
    <section
      className="overflow-hidden bg-[#f7f8f4]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mx-auto max-w-[1440px] px-5 pb-6 pt-16 sm:px-8 sm:pb-10 sm:pt-20 lg:px-12 lg:pb-12 lg:pt-24">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#08783f] sm:text-[11px]">
            Leadership
          </p>

          <h2 className="mx-auto max-w-[800px] text-[36px] font-medium leading-[0.98] tracking-[-0.045em] text-[#123b2a] sm:text-5xl lg:text-6xl">
            The people behind the vision.
          </h2>

          <p className="mx-auto mt-5 max-w-[620px] text-sm leading-6 text-[#647069] sm:text-base sm:leading-7">
            Meet the people shaping the learning environment, culture and
            future of Dhanik Bharat.
          </p>
        </div>
      </div>

      {/* =====================================================
          DESKTOP CAROUSEL
      ====================================================== */}

      <div className="relative mx-auto hidden h-[610px] max-w-[1440px] lg:block">

        {/* Very subtle centre atmosphere */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#08783f]/[0.025] blur-[80px]" />

        {/* Cards */}
        <div
          className="absolute inset-0"
          style={{
            perspective: "1400px",
          }}
        >
          {directors.map((director, index) => {
            const position = getPosition(index);

            /*
             * Only render the seven positions surrounding
             * the active card.
             */
            if (Math.abs(position) > 3) return null;

            const isActive = position === 0;
            const distance = Math.abs(position);

            /*
             * Horizontal placement
             */
            const translateX =
              position === 0
                ? 0
                : position * 245;

            /*
             * Slight vertical depth
             */
            const translateY =
              position === 0
                ? 0
                : distance === 1
                  ? 28
                  : distance === 2
                    ? 62
                    : 95;

            /*
             * Size
             */
            const scale =
              position === 0
                ? 1
                : distance === 1
                  ? 0.79
                  : distance === 2
                    ? 0.63
                    : 0.51;

            /*
             * 3D rotation
             */
            const rotateY =
              position === 0
                ? 0
                : position > 0
                  ? -10
                  : 10;

            /*
             * Depth
             */
            const zIndex = 50 - distance * 10;

            /*
             * Side transparency
             */
            const opacity =
              position === 0
                ? 1
                : distance === 1
                  ? 0.72
                  : distance === 2
                    ? 0.38
                    : 0.18;

            return (
              <button
                key={director.id}
                type="button"
                aria-label={`View ${director.name}`}
                onClick={() => setActive(index)}
                className="absolute left-1/2 top-1/2 h-[455px] w-[310px] -translate-x-1/2 -translate-y-1/2 outline-none"
                style={{
                  zIndex,
                  opacity,
                  transform: `
                    translate(-50%, -50%)
                    translateX(${translateX}px)
                    translateY(${translateY}px)
                    rotateY(${rotateY}deg)
                    scale(${scale})
                  `,
                  transition:
                    "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms ease",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Card */}
                <div
                  className={`relative h-full w-full overflow-hidden rounded-[22px] bg-white ${
                    isActive
                      ? "shadow-[0_30px_80px_rgba(18,59,42,0.20)]"
                      : "shadow-[0_15px_40px_rgba(18,59,42,0.08)]"
                  }`}
                >
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    priority={isActive}
                    sizes="310px"
                    className="object-cover"
                  />

                  {/* Cinematic gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                  {/* Soft glass border */}
                  <div className="absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/20" />

                  {/* Number */}
                  <div className="absolute right-5 top-5 rounded-full bg-black/20 px-3 py-1.5 text-[10px] font-medium tracking-[0.15em] text-white backdrop-blur-md">
                    {director.id}
                  </div>

                  {/* Name */}
                  <div className="absolute bottom-0 left-0 right-0 p-7 text-left">
                    <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.23em] text-[#c9f36a]">
                      {director.role}
                    </p>

                    <h3 className="text-[28px] font-medium leading-none tracking-[-0.035em] text-white">
                      {director.name}
                    </h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* =================================================
            DESKTOP CONTROLS
        ================================================== */}

        <div className="absolute bottom-4 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-7">

          <button
            type="button"
            onClick={previous}
            aria-label="Previous director"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#123b2a]/15 bg-[#f7f8f4] text-[#123b2a] transition-all duration-300 hover:border-[#123b2a] hover:bg-[#123b2a] hover:text-white"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>

          {/* Progress */}
          <div className="flex items-center gap-1.5">
            {directors.map((director, index) => (
              <button
                key={director.id}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Go to director ${index + 1}`}
                className={`h-[2px] transition-all duration-500 ${
                  active === index
                    ? "w-8 bg-[#08783f]"
                    : "w-3 bg-[#123b2a]/15 hover:bg-[#123b2a]/35"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next director"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#123b2a]/15 bg-[#f7f8f4] text-[#123b2a] transition-all duration-300 hover:border-[#123b2a] hover:bg-[#123b2a] hover:text-white"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>

        </div>
      </div>

      {/* =====================================================
          MOBILE CAROUSEL
      ====================================================== */}

      <div className="px-5 pb-12 lg:hidden">

        <div className="mx-auto max-w-[430px]">

          {/* Main card */}
          <div className="relative h-[430px] w-full overflow-hidden rounded-[20px] bg-[#123b2a] shadow-[0_20px_50px_rgba(18,59,42,0.12)]">

            {directors.map((director, index) => (
              <div
                key={director.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === active
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-[1.035] opacity-0"
                }`}
              >
                <Image
                  src={director.image}
                  alt={director.name}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 430px"
                  className="object-cover"
                />

                {/* Cinematic gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                {/* Number */}
                <div className="absolute right-5 top-5 rounded-full bg-black/20 px-3 py-1.5 text-[9px] tracking-[0.15em] text-white backdrop-blur-md">
                  {director.id} / {String(total).padStart(2, "0")}
                </div>

                {/* Name */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#c9f36a]">
                    {director.role}
                  </p>

                  <h3 className="text-[28px] font-medium leading-none tracking-[-0.035em] text-white">
                    {director.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-5 flex items-center justify-between">

            <button
              type="button"
              onClick={previous}
              aria-label="Previous director"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#123b2a]/15 text-[#123b2a]"
            >
              <ChevronLeft size={17} strokeWidth={1.5} />
            </button>

            <div className="flex items-center gap-1.5">
              {directors.map((director, index) => (
                <button
                  key={director.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Go to director ${index + 1}`}
                  className={`h-[2px] transition-all duration-500 ${
                    active === index
                      ? "w-7 bg-[#08783f]"
                      : "w-2.5 bg-[#123b2a]/15"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next director"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#123b2a]/15 text-[#123b2a]"
            >
              <ChevronRight size={17} strokeWidth={1.5} />
            </button>

          </div>

          {/* Mobile counter */}
          <div className="mt-4 text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#647069]">
              Meet our leadership
            </p>
          </div>

        </div>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="mx-auto max-w-[1400px] px-5 pb-12 sm:px-8 lg:px-12 lg:pb-20">

        <div className="border-t border-[#123b2a]/10 pt-5 sm:pt-6">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#647069] sm:text-[10px]">
              Leadership · Vision · Education
            </p>

            <p className="max-w-[480px] text-xs leading-5 text-[#647069] sm:text-right sm:text-sm sm:leading-6">
              The people behind the vision, shaping an environment where
              students can learn, grow and prepare for what comes next.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}