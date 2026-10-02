"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/* =========================================================
   TYPES
========================================================= */

type JourneyItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  location?: string;
  branch?: string;
};

export type DhanikTimelineProps = {
  title?: string;
  subtitle?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
};

/* =========================================================
   BRAND COLORS
========================================================= */

const BRAND = {
  deepGreen: "#123B2A",
  green: "#08783F",
  lime: "#C9F36A",
  pink: "#E50046",
  background: "#F7F8F4",
  muted: "#647069",
  border: "#123B2A",
};

/* =========================================================
   REDUCED MOTION
========================================================= */

const REDUCED_MOTION_QUERY =
  "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(
  callback: () => void,
) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQueryList =
    window.matchMedia(REDUCED_MOTION_QUERY);

  mediaQueryList.addEventListener(
    "change",
    callback,
  );

  return () => {
    mediaQueryList.removeEventListener(
      "change",
      callback,
    );
  };
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia?.(
      REDUCED_MOTION_QUERY,
    )?.matches ?? false
  );
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

/* =========================================================
   JOURNEY DATA
========================================================= */

const journeyItems: JourneyItem[] = [
  {
    id: "vision",
    number: "01",
    title: "The Vision",
    description:
      "An education ecosystem built around academic understanding, discipline and the development of confident young minds.",
  },

  {
    id: "foundation",
    number: "02",
    title: "The Foundation",
    description:
      "Dhanik Bharat brings Intermediate education together with focused preparation for competitive examinations.",
  },

  {
    id: "HYDERABAD",
    number: "03",
    title: "HYDERABAD",
    location: "Vijayawada",
    branch: "Dhanik Bharat Campus",
    description:
      "A campus environment where academic preparation, mentoring and student life come together.",
  },

  {
    id: "VIJAYAWADA",
    number: "04",
    title: "VIJAYAWADA",
    location: "VIJAYAWADA",
    branch: "Dhanik Bharat Campus",
    description:
      "A growing student community supported by focused learning, guidance and campus experiences.",
  },

  {
    id: "GUNTUR",
    number: "05",
    title: "GUNTUR",
    location: "Guntur",
    branch: "Dhanik Bharat Campus",
    description:
      "An academic environment designed around focused preparation, practice and student development.",
  },

  {
    id: "VIZAG",
    number: "06",
    title: "VIZAG",
    location: "VIZAG",
    branch: "Dhanik Bharat Campus",
    description:
      "A connected learning environment supporting students beyond the regular classroom.",
  },

  {
    id: "future",
    number: "07",
    title: "Looking Ahead",
    description:
      "The journey continues with a focus on stronger learning experiences, student development and a growing academic community.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function DhanikTimeline({
  title = "Our Journey",
  subtitle = "From vision to a growing academic community.",
  textColor = BRAND.deepGreen,
  mutedTextColor = BRAND.muted,
  activeColor = BRAND.green,
  backgroundColor = BRAND.background,
}: DhanikTimelineProps) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const viewportRef =
    useRef<HTMLDivElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const reducedMotion =
    usePrefersReducedMotion();

  /* =======================================================
     GSAP
  ======================================================= */

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) {
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile =
        window.innerWidth < 768;

      /* ===================================================
         RESPONSIVE VALUES
      =================================================== */

      const trackWidthVw = isMobile
        ? 690
        : 300;

      const movePercent = isMobile
        ? 86.5
        : 61;

      const introWidthVw = isMobile
        ? 72
        : 30;

      const trackPaddingVw = isMobile
        ? 8
        : 5;

      const trackGapVw = isMobile
        ? 4
        : 7;

      const milestoneSpacingVw = isMobile
        ? 82
        : 18;

      /* ===================================================
         REDUCED MOTION
      =================================================== */

      if (reducedMotion) {
        gsap.set(track, {
          xPercent: isMobile
            ? -86.5
            : -61,
        });

        gsap.set(
          ".dhanik-journey-line",
          {
            width: "100%",
          },
        );

        journeyItems.forEach((item) => {
          gsap.set(
            `.dhanik-stem-${item.id}`,
            {
              scaleY: 1,
            },
          );

          gsap.set(
            `.dhanik-dot-${item.id}`,
            {
              scale: 1,
            },
          );

          gsap.set(
            `.dhanik-title-${item.id}`,
            {
              opacity: 1,
              y: 0,
            },
          );

          gsap.set(
            `.dhanik-description-${item.id}`,
            {
              opacity: 1,
              y: 0,
            },
          );

          gsap.set(
            `.dhanik-location-${item.id}`,
            {
              opacity: 1,
              y: 0,
            },
          );
        });

        return;
      }

      /* ===================================================
         INITIAL STATES
      =================================================== */

      journeyItems.forEach(
        (item, index) => {
          const isTop =
            index % 2 === 0;

          /* STEM */

          gsap.set(
            `.dhanik-stem-${item.id}`,
            {
              scaleY: 0,
              transformOrigin: isTop
                ? "bottom center"
                : "top center",
            },
          );

          /* DOT */

          gsap.set(
            `.dhanik-dot-${item.id}`,
            {
              scale: 0,
              transformOrigin:
                "center center",
            },
          );

          /* LOCATION */

          gsap.set(
            `.dhanik-location-${item.id}`,
            {
              opacity: 0,
              y: isTop ? 12 : -12,
            },
          );

          /* TITLE */

          gsap.set(
            `.dhanik-title-${item.id}`,
            {
              opacity: 0,
              y: isTop ? 28 : -28,
            },
          );

          /* DESCRIPTION */

          gsap.set(
            `.dhanik-description-${item.id}`,
            {
              opacity: 0,
              y: isTop ? 20 : -20,
            },
          );
        },
      );

      /* ===================================================
         MAIN LINE
      =================================================== */

      gsap.set(
        ".dhanik-journey-line",
        {
          width: "0%",
        },
      );

      /* ===================================================
         MOVEMENT
      =================================================== */

      const moveDistance = isMobile
        ? -86.5
        : -61;

      const scrollDistance = isMobile
        ? 3300
        : 4600;

      /* ===================================================
         MASTER TIMELINE
      =================================================== */

      const masterTimeline =
        gsap.timeline({
          defaults: {
            ease: "none",
          },

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: viewport,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: false,
            preventOverlaps: true,
          },
        });

      /* ===================================================
         HORIZONTAL TRACK
      =================================================== */

      masterTimeline.fromTo(
        track,
        {
          xPercent: 0,
        },
        {
          xPercent: moveDistance,
          duration: 1,
          ease: "none",
        },
        0,
      );

      /* ===================================================
         MAIN LINE
      =================================================== */

      masterTimeline.to(
        ".dhanik-journey-line",
        {
          width: "100%",
          duration: 1,
          ease: "none",
        },
        0,
      );

      /* ===================================================
         CENTER SYNCHRONIZED REVEALS
      =================================================== */

      journeyItems.forEach(
        (item, index) => {
          const stem =
            `.dhanik-stem-${item.id}`;

          const dot =
            `.dhanik-dot-${item.id}`;

          const title =
            `.dhanik-title-${item.id}`;

          const description =
            `.dhanik-description-${item.id}`;

          const location =
            `.dhanik-location-${item.id}`;

          /* -------------------------------------------------
             MILESTONE POSITION
          ------------------------------------------------- */

          const milestonePositionVw =
            trackPaddingVw +
            introWidthVw +
            trackGapVw +
            index *
              milestoneSpacingVw;

          /* -------------------------------------------------
             VIEWPORT CENTER
          ------------------------------------------------- */

          const viewportCenterVw = 50;

          /* -------------------------------------------------
             DISTANCE TO CENTER
          ------------------------------------------------- */

          const distanceToCenterVw =
            milestonePositionVw -
            viewportCenterVw;

          /* -------------------------------------------------
             TOTAL MOVEMENT
          ------------------------------------------------- */

          const totalMovementVw =
            trackWidthVw *
            (movePercent / 100);

          /* -------------------------------------------------
             CENTER PROGRESS
          ------------------------------------------------- */

          let centerProgress =
            distanceToCenterVw /
            totalMovementVw;

          centerProgress = Math.max(
            0.005,
            Math.min(
              0.98,
              centerProgress,
            ),
          );

          /* -------------------------------------------------
             REVEAL OFFSET
          ------------------------------------------------- */

          const revealOffset = isMobile
            ? 0.045
            : 0.025;

          const revealStart =
            Math.max(
              0,
              centerProgress -
                revealOffset,
            );

          /* =================================================
             STEM
          ================================================= */

          masterTimeline.to(
            stem,
            {
              scaleY: 1,
              duration: isMobile
                ? 0.035
                : 0.025,
              ease: "power2.out",
            },
            revealStart,
          );

          /* =================================================
             DOT
          ================================================= */

          masterTimeline.to(
            dot,
            {
              scale: 1,
              duration: isMobile
                ? 0.035
                : 0.025,
              ease: "back.out(1.8)",
            },
            revealStart +
              (isMobile
                ? 0.015
                : 0.012),
          );

          /* =================================================
             LOCATION
          ================================================= */

          if (item.location) {
            masterTimeline.to(
              location,
              {
                opacity: 1,
                y: 0,
                duration: isMobile
                  ? 0.035
                  : 0.025,
                ease: "power2.out",
              },
              revealStart +
                (isMobile
                  ? 0.025
                  : 0.018),
            );
          }

          /* =================================================
             TITLE
          ================================================= */

          masterTimeline.to(
            title,
            {
              opacity: 1,
              y: 0,
              duration: isMobile
                ? 0.045
                : 0.035,
              ease: "power2.out",
            },
            revealStart +
              (isMobile
                ? 0.04
                : 0.028),
          );

          /* =================================================
             DESCRIPTION
          ================================================= */

          masterTimeline.to(
            description,
            {
              opacity: 1,
              y: 0,
              duration: isMobile
                ? 0.055
                : 0.04,
              ease: "power2.out",
            },
            revealStart +
              (isMobile
                ? 0.055
                : 0.045),
          );
        },
      );

      /* ===================================================
         REFRESH
      =================================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  /* =======================================================
     SECTION STYLE
  ======================================================= */

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      ref={sectionRef}
      id="journey"
      style={sectionStyle}
      className="relative w-full"
    >
      {/* =================================================
          PINNED VIEWPORT
      ================================================= */}

      <div
        ref={viewportRef}
        className="
          relative
          h-[100svh]
          min-h-[620px]
          w-full
          overflow-hidden
        "
      >
        {/* =================================================
            SUBTLE BRAND ACCENT
        ================================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[42%]
            z-0
            h-[220px]
            w-[220px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#C9F36A]/[0.055]
            blur-[90px]
          "
        />

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0
            z-30
            mx-auto
            max-w-[1440px]
            px-5
            pt-6
            sm:px-8
            sm:pt-8
            lg:px-12
            lg:pt-12
          "
        >
          <div className="flex items-start justify-between">
            {/* TITLE */}

            <div>
              {/* LABEL */}

              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-2.5
                  sm:mb-4
                  sm:gap-3
                "
              >
                <span
                  className="
                    h-[5px]
                    w-[5px]
                    rounded-full
                  "
                  style={{
                    backgroundColor:
                      activeColor,
                  }}
                />

                <span
                  className="
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    sm:text-[8px]
                    sm:tracking-[0.27em]
                  "
                  style={{
                    color: activeColor,
                  }}
                >
                  Dhanik Bharat
                </span>
              </div>

              {/* HEADING */}

              <h2
                className="
                  max-w-[340px]
                  text-[clamp(38px,12vw,58px)]
                  font-semibold
                  leading-[0.9]
                  tracking-[-0.055em]
                  sm:max-w-[500px]
                  md:max-w-[600px]
                  md:text-[clamp(42px,6vw,78px)]
                  md:tracking-[-0.06em]
                "
              >
                {title}
              </h2>
            </div>

            {/* DESKTOP SUBTITLE */}

            <p
              className="
                hidden
                max-w-[270px]
                pt-8
                text-[11px]
                leading-5
                md:block
              "
              style={{
                color: mutedTextColor,
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* =================================================
            MOBILE SUBTITLE
        ================================================= */}

        <div
          className="
            absolute
            left-5
            top-[22%]
            z-20
            max-w-[250px]
            sm:left-8
            md:hidden
          "
        >
          <p
            className="
              text-[9px]
              leading-[1.6]
            "
            style={{
              color: mutedTextColor,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* =================================================
            HORIZONTAL TRACK
        ================================================= */}

        <div
          ref={trackRef}
          className="
            absolute
            left-0
            top-[46%]
            flex
            h-[38vh]
            w-[690vw]
            items-center
            gap-[4vw]
            px-[8vw]
            md:top-[45%]
            md:h-[34vh]
            md:w-[300vw]
            md:gap-[7vw]
            md:px-[5vw]
          "
        >
          {/* =================================================
              INTRO
          ================================================= */}

          <div
            className="
              h-full
              w-[72vw]
              shrink-0
              pt-2
              md:w-[30vw]
              md:pt-3
            "
          >
            <p
              className="
                max-w-[72vw]
                text-[10px]
                leading-[1.65]
                sm:text-[11px]
                sm:leading-5
                md:max-w-[240px]
              "
              style={{
                color: mutedTextColor,
              }}
            >
              Every journey begins with an
              idea. Ours is centred on
              creating an environment where
              students can understand,
              prepare and grow.
            </p>
          </div>

          {/* =================================================
              TIMELINE
          ================================================= */}

          <div
            className="
              relative
              h-full
              min-w-[580vw]
              shrink-0
              md:min-w-[390vw]
            "
          >
            {/* =================================================
                MAIN LINE
            ================================================= */}

            <div
              className="
                absolute
                left-0
                top-1/2
                flex
                w-full
                -translate-y-1/2
                items-center
              "
            >
              <div
                className="
                  dhanik-journey-line
                  h-[1.5px]
                  w-0
                  rounded-full
                  md:h-[2px]
                "
                style={{
                  /*
                   * Green → Lime → Pink
                   *
                   * This creates the visual story
                   * of the journey.
                   */
                  background:
                    "linear-gradient(90deg, #08783F 0%, #08783F 68%, #C9F36A 87%, #E50046 100%)",
                }}
              />
            </div>

            {/* =================================================
                MILESTONES
            ================================================= */}

            <div className="absolute inset-0">
              {journeyItems.map(
                (item, index) => {
                  const isTop =
                    index % 2 === 0;

                  const isFuture =
                    item.id === "future";

                  const milestoneStyle = {
                    "--journey-index":
                      index,
                  } as CSSProperties;

                  return (
                    <div
                      key={item.id}
                      style={
                        milestoneStyle
                      }
                      className="
                        absolute
                        top-0
                        h-full
                        left-[calc(var(--journey-index)*82vw)]
                        w-[78vw]
                        sm:left-[calc(var(--journey-index)*82vw)]
                        sm:w-[74vw]
                        md:left-[calc(var(--journey-index)*18vw)]
                        md:w-[28vw]
                      "
                    >
                      {/* =================================================
                          STEM + DOT
                      ================================================= */}

                      <div
                        className={`
                          absolute
                          left-0
                          top-1/2
                          z-20
                          -translate-x-1/2
                          ${
                            isTop
                              ? "-translate-y-full"
                              : ""
                          }
                        `}
                      >
                        {/* STEM */}

                        <div
                          className={`
                            dhanik-stem-${item.id}
                            mx-auto
                            h-[72px]
                            w-[1px]
                            md:h-[110px]
                            ${
                              isTop
                                ? "origin-bottom"
                                : "origin-top"
                            }
                          `}
                          style={{
                            backgroundColor:
                              isFuture
                                ? BRAND.pink
                                : activeColor,
                          }}
                        />

                        {/* DOT */}

                        <div
                          className={`
                            dhanik-dot-${item.id}
                            relative
                            z-30
                            h-[9px]
                            w-[9px]
                            -translate-x-[4px]
                            rounded-full
                            border-[2px]
                            border-[#f7f8f4]
                            md:h-[10px]
                            md:w-[10px]
                            md:-translate-x-[4px]
                            md:border-[3px]
                          `}
                          style={{
                            backgroundColor:
                              isFuture
                                ? BRAND.pink
                                : activeColor,

                            /*
                             * Lime gives the normal
                             * milestones a subtle
                             * active energy ring.
                             *
                             * Pink gets its own ring.
                             */
                            boxShadow:
                              isFuture
                                ? `0 0 0 4px rgba(229,0,70,0.10)`
                                : `0 0 0 4px rgba(201,243,106,0.20)`,
                          }}
                        />
                      </div>

                      {/* =================================================
                          CONTENT

                          Text starts horizontally away
                          from the stem.
                      ================================================= */}

                      <div
                        className={`
                          absolute
                          left-[32px]
                          z-10
                          w-[calc(78vw-32px)]
                          max-w-[308px]

                          ${
                            isTop
                              ? "bottom-[50%] pb-5"
                              : "top-[50%] pt-5"
                          }

                          sm:left-[36px]
                          sm:w-[calc(74vw-36px)]

                          md:left-[40px]
                          md:w-[250px]
                          md:max-w-none
                        `}
                      >
                        {/* =================================================
                            NUMBER + BRANCH
                        ================================================= */}

                        <div
                          className="
                            mb-2
                            flex
                            items-center
                            gap-2.5
                            sm:gap-3
                          "
                        >
                          <span
                            className="
                              font-mono
                              text-[8px]
                              sm:text-[9px]
                            "
                            style={{
                              color: isFuture
                                ? BRAND.pink
                                : activeColor,
                            }}
                          >
                            {item.number}
                          </span>

                          <span
                            className="
                              h-px
                              w-5
                              bg-[#123b2a]/15
                              sm:w-7
                            "
                          />

                          {item.location && (
                            <span
                              className={`
                                dhanik-location-${item.id}
                                whitespace-nowrap
                                text-[6px]
                                font-semibold
                                uppercase
                                tracking-[0.14em]
                                sm:text-[7px]
                                sm:tracking-[0.16em]
                              `}
                              style={{
                                color:
                                  isFuture
                                    ? BRAND.pink
                                    : activeColor,
                              }}
                            >
                              Branch
                            </span>
                          )}
                        </div>

                        {/* =================================================
                            LOCATION
                        ================================================= */}

                        {item.location && (
                          <div
                            className={`
                              dhanik-location-${item.id}
                              mb-2
                              text-[8px]
                              font-medium
                              uppercase
                              tracking-[0.14em]
                              sm:text-[9px]
                              sm:tracking-[0.16em]
                            `}
                            style={{
                              color:
                                mutedTextColor,
                            }}
                          >
                            {item.location}
                          </div>
                        )}

                        {/* =================================================
                            TITLE
                        ================================================= */}

                        <h3
                          className={`
                            dhanik-title-${item.id}
                            text-[22px]
                            font-semibold
                            leading-[0.98]
                            tracking-[-0.035em]
                            sm:text-[25px]
                            md:text-[30px]
                            md:tracking-[-0.04em]
                          `}
                          style={{
                            color:
                              isFuture
                                ? BRAND.pink
                                : textColor,
                          }}
                        >
                          {item.title}
                        </h3>

                        {/* =================================================
                            BRANCH
                        ================================================= */}

                        {item.branch && (
                          <p
                            className="
                              mt-2
                              text-[7px]
                              font-semibold
                              uppercase
                              tracking-[0.13em]
                              sm:text-[8px]
                              sm:tracking-[0.15em]
                            "
                            style={{
                              color:
                                isFuture
                                  ? BRAND.pink
                                  : activeColor,
                            }}
                          >
                            {item.branch}
                          </p>
                        )}

                        {/* =================================================
                            DESCRIPTION
                        ================================================= */}

                        <p
                          className={`
                            dhanik-description-${item.id}
                            mt-3
                            max-w-full
                            text-[10px]
                            leading-[1.5]
                            sm:text-[10px]
                            sm:leading-[1.55]
                            md:max-w-[250px]
                            md:text-[11px]
                          `}
                          style={{
                            color:
                              mutedTextColor,
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM META
        ================================================= */}

        <div
          className="
            absolute
            bottom-5
            left-5
            right-5
            z-30
            flex
            items-center
            justify-between
            border-t
            border-[#123b2a]/10
            pt-3
            sm:left-8
            sm:right-8
            lg:left-12
            lg:right-12
          "
        >
          <span
            className="
              text-[6px]
              font-semibold
              uppercase
              tracking-[0.18em]
              sm:text-[7px]
              sm:tracking-[0.2em]
            "
            style={{
              color: mutedTextColor,
            }}
          >
            Our Journey
          </span>

          <div className="flex items-center gap-3">
            {/* Tiny brand progression indicator */}

            <span
              aria-hidden="true"
              className="
                hidden
                h-[3px]
                w-[3px]
                rounded-full
                bg-[#C9F36A]
                sm:block
              "
            />

            <span
              className="
                text-[6px]
                uppercase
                tracking-[0.18em]
                sm:text-[7px]
                sm:tracking-[0.2em]
              "
              style={{
                color: mutedTextColor,
              }}
            >
              Scroll to explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}