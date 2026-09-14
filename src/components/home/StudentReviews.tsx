"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { getStudentVideoPoster } from "@/data/generated/student-video-posters";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

const reviews = [
  {
    id: "01",
    name: "Student Name",
    className: "Class 12 · MPC",
    title: "My journey at Dhanik Bharat",
    description:
      "Hear directly from our students about their learning experience, teachers and everyday life at Dhanik Bharat.",
    video: "/images/students/1.mp4",
  },
  {
    id: "02",
    name: "Student Name",
    className: "Class 12 · BiPC",
    title: "Learning with confidence",
    description:
      "A student's perspective on learning, preparation and the support they receive throughout their journey.",
    video: "/images/students/2.mp4",
  },
  {
    id: "03",
    name: "Student Name",
    className: "Class 11 · MPC",
    title: "Finding clarity in my preparation",
    description:
      "Discover how students experience the academic environment and approach their preparation at Dhanik Bharat.",
    video: "/images/students/3.mp4",
  },
  {
    id: "04",
    name: "Student Name",
    className: "Class 12 · BiPC",
    title: "More than just academics",
    description:
      "A glimpse into the student experience beyond academics — from mentoring to everyday campus life.",
    video: "/images/students/4.mp4",
  },
];

export default function StudentReviews() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const current = reviews[active];
  const currentPoster = getStudentVideoPoster(current.video);

  /* =========================================================
     CHANGE STORY
  ========================================================= */

  const changeStory = (index: number) => {
    if (index === active) return;

    setPlaying(false);
    setActive(index);

    for (const video of [desktopVideoRef.current, mobileVideoRef.current]) {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const previous = () => {
    const index =
      active === 0 ? reviews.length - 1 : active - 1;

    changeStory(index);
  };

  const next = () => {
    const index =
      active === reviews.length - 1 ? 0 : active + 1;

    changeStory(index);
  };

  /* =========================================================
     PLAY / PAUSE
  ========================================================= */

  const togglePlay = async (video: HTMLVideoElement | null) => {
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  /* =========================================================
     MUTE
  ========================================================= */

  const toggleMute = (video: HTMLVideoElement | null) => {
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section className="overflow-hidden bg-[#f7f8f4] py-20 sm:py-24 lg:py-28">

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">

          <div className="max-w-[760px]">

            <div className="mb-5 flex items-center gap-3">

              <span className="h-[6px] w-[6px] rounded-full bg-[#08783f]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#08783f]">
                Student Voices
              </span>

            </div>

            <h2 className="text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] text-[#123b2a] sm:text-[56px] lg:text-[68px]">

              Hear it from the
              <br />

              <span className="text-[#e50046]">
                students themselves.
              </span>

            </h2>

          </div>


          <p className="max-w-[390px] text-[14px] leading-6 text-[#647069] lg:pb-1">
            Real perspectives from students experiencing the
            academic environment, mentoring and everyday life
            at Dhanik Bharat.
          </p>

        </div>


        {/* =====================================================
            DESKTOP EXPERIENCE
        ====================================================== */}

        <div className="mt-10 hidden lg:block">

          <div className="grid min-h-[650px] grid-cols-[38%_62%] overflow-hidden rounded-[28px] bg-[#123b2a]">

            {/* =================================================
                VERTICAL VIDEO
            ================================================= */}

            <div className="relative flex items-center justify-center overflow-hidden bg-[#071f15] p-8 xl:p-10">

              <div className="relative h-[590px] aspect-[9/16] overflow-hidden rounded-[18px] bg-black">

                <video
                  ref={desktopVideoRef}
                  key={current.video}
                  src={current.video}
                  poster={currentPoster}
                  playsInline
                  preload="metadata"
                  muted={muted}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  className="h-full w-full object-cover"
                />

                {/* VIDEO GRADIENT */}

                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10 transition-opacity duration-500 ${
                    playing ? "opacity-100" : "opacity-80"
                  }`}
                />


                {/* TOP LABEL */}

                <div className="absolute left-4 right-4 top-4 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <span className="font-mono text-[9px] text-white/70">
                      {current.id}
                    </span>

                    <span className="h-px w-5 bg-white/40" />

                    <span className="text-[8px] uppercase tracking-[0.16em] text-white/60">
                      Student Voice
                    </span>

                  </div>


                  <button
                    type="button"
                    onClick={() => toggleMute(desktopVideoRef.current)}
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-md"
                  >
                    {muted ? (
                      <VolumeX size={13} strokeWidth={1.5} />
                    ) : (
                      <Volume2 size={13} strokeWidth={1.5} />
                    )}
                  </button>

                </div>


                {/* PLAY BUTTON */}

                {!playing && (
                  <button
                    type="button"
                    onClick={() => togglePlay(desktopVideoRef.current)}
                    aria-label="Play student review"
                    className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#123b2a] shadow-xl transition-transform duration-300 hover:scale-105"
                  >
                    <Play
                      size={18}
                      fill="currentColor"
                      strokeWidth={0}
                      className="ml-1"
                    />
                  </button>
                )}


                {/* VIDEO CONTROLS */}

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">

                  <span className="text-[8px] uppercase tracking-[0.15em] text-white/60">
                    Watch story
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.15em] text-white/40">
                    9 : 16
                  </span>

                </div>

              </div>

            </div>


            {/* =================================================
                RIGHT INFORMATION
            ================================================= */}

            <div className="flex flex-col justify-between p-10 xl:p-14">

              {/* TOP */}

              <div>

                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#c9f36a]">
                  Real voices · Real journeys
                </p>

                <p className="mt-4 max-w-[380px] text-[13px] leading-6 text-white/50">
                  The best way to understand the student experience
                  is to hear it directly from the students.
                </p>

              </div>


              {/* ACTIVE STORY */}

              <div
                key={`desktop-content-${active}`}
                className="animate-experience-content"
              >

                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#c9f36a]">
                  {current.className}
                </p>

                <h3 className="mt-4 max-w-[560px] text-[42px] font-semibold leading-[0.98] tracking-[-0.045em] text-white xl:text-[54px]">
                  {current.title}
                </h3>

                <p className="mt-5 max-w-[440px] text-[14px] leading-7 text-white/55">
                  {current.description}
                </p>

                <p className="mt-5 text-[11px] text-white/40">
                  — {current.name}
                </p>

              </div>


              {/* STORY LIST */}

              <div className="mt-10">

                {reviews.map((review, index) => {

                  const isActive = index === active;
                  const poster = getStudentVideoPoster(review.video);

                  return (
                    <button
                      key={review.id}
                      type="button"
                      onClick={() => changeStory(index)}
                      className="group flex w-full items-center gap-4 border-b border-white/10 py-4 text-left"
                    >

                      <span
                        className={`font-mono text-[10px] ${
                          isActive
                            ? "text-[#c9f36a]"
                            : "text-white/25"
                        }`}
                      >
                        {review.id}
                      </span>


                      <div className="relative h-10 w-8 shrink-0 overflow-hidden rounded-[5px] bg-white/10">
                        {poster && (
                          <Image
                            src={poster}
                            alt=""
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        )}
                      </div>


                      <div className="min-w-0 flex-1">

                        <p
                          className={`truncate text-[13px] font-medium transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-white/40 group-hover:text-white/70"
                          }`}
                        >
                          {review.title}
                        </p>

                        <p className="mt-1 text-[9px] text-white/25">
                          {review.className}
                        </p>

                      </div>


                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          isActive
                            ? "bg-[#c9f36a] text-[#123b2a]"
                            : "border border-white/10 text-white/30"
                        }`}
                      >
                        <Play
                          size={9}
                          fill="currentColor"
                          strokeWidth={0}
                          className="ml-[1px]"
                        />
                      </span>

                    </button>
                  );
                })}

              </div>


              {/* BOTTOM CONTROLS */}

              <div className="mt-7 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <span className="font-mono text-[10px] text-[#c9f36a]">
                    {current.id}
                  </span>

                  <span className="font-mono text-[10px] text-white/25">
                    / {String(reviews.length).padStart(2, "0")}
                  </span>

                </div>


                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous student review"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    <ArrowLeft size={16} strokeWidth={1.5} />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next student review"
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

        <div className="mt-9 lg:hidden">

          {/* =================================================
              VERTICAL VIDEO
          ================================================= */}

          <div className="flex justify-center">

            <div className="relative w-full max-w-[430px] overflow-hidden rounded-[22px] bg-black">

              <div className="relative aspect-[9/16] w-full">

                <video
                  ref={mobileVideoRef}
                  key={current.video}
                  src={current.video}
                  poster={currentPoster}
                  playsInline
                  preload="metadata"
                  muted={muted}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  className="h-full w-full object-cover"
                />


                {/* GRADIENT */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />


                {/* TOP LABEL */}

                <div className="absolute left-5 right-5 top-5 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <span className="font-mono text-[10px] text-white/70">
                      {current.id}
                    </span>

                    <span className="h-px w-6 bg-white/40" />

                    <span className="text-[8px] uppercase tracking-[0.17em] text-white/60">
                      Student Voice
                    </span>

                  </div>


                  <button
                    type="button"
                    onClick={() => toggleMute(mobileVideoRef.current)}
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-md"
                  >
                    {muted ? (
                      <VolumeX size={14} strokeWidth={1.5} />
                    ) : (
                      <Volume2 size={14} strokeWidth={1.5} />
                    )}
                  </button>

                </div>


                {/* PLAY */}

                {!playing && (
                  <button
                    type="button"
                    onClick={() => togglePlay(mobileVideoRef.current)}
                    aria-label="Play student review"
                    className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#123b2a] shadow-lg active:scale-95"
                  >
                    <Play
                      size={16}
                      fill="currentColor"
                      strokeWidth={0}
                      className="ml-1"
                    />
                  </button>
                )}


                {/* BOTTOM CONTENT */}

                <div className="absolute bottom-0 left-0 right-0 p-5">

                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#c9f36a]">
                    {current.className}
                  </p>

                  <h3 className="mt-3 text-[28px] font-semibold leading-[1] tracking-[-0.04em] text-white">
                    {current.title}
                  </h3>

                  <p className="mt-3 text-[11px] text-white/55">
                    {current.name}
                  </p>


                  {/* CONTROLS */}

                  <div className="mt-5 flex items-center justify-between">

                    <div className="flex items-center gap-1.5">

                      {reviews.map((review, index) => (
                        <button
                          key={review.id}
                          type="button"
                          onClick={() => changeStory(index)}
                          aria-label={`Show ${review.title}`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === active
                              ? "w-8 bg-[#c9f36a]"
                              : "w-1.5 bg-white/35"
                          }`}
                        />
                      ))}

                    </div>


                    <div className="flex gap-2">

                      <button
                        type="button"
                        onClick={previous}
                        aria-label="Previous student review"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white backdrop-blur-md"
                      >
                        <ArrowLeft size={14} strokeWidth={1.5} />
                      </button>

                      <button
                        type="button"
                        onClick={next}
                        aria-label="Next student review"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9f36a] text-[#123b2a]"
                      >
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              MOBILE STORY SELECTOR
          ================================================= */}

          <div className="mt-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {/* <div className="flex min-w-max gap-2">

              {reviews.map((review, index) => {

                const isActive = index === active;

                return (
                  <button
                    key={review.id}
                    type="button"
                    onClick={() => changeStory(index)}
                    className={`flex items-center gap-2.5 rounded-full border px-3 py-2 transition-all ${
                      isActive
                        ? "border-[#123b2a] bg-[#123b2a] text-white"
                        : "border-[#dce4de] text-[#647069]"
                    }`}
                  >

                    <div className="relative h-7 w-7 overflow-hidden rounded-full">

                      <Image
                        src={review.thumbnail}
                        alt=""
                        fill
                        sizes="28px"
                        className="object-cover"
                      />

                    </div>

                    <span className="text-[10px] whitespace-nowrap">
                      {review.id} · {review.className}
                    </span>

                  </button>
                );
              })}

            </div> */}

          </div>


          {/* MOBILE DESCRIPTION */}

          <div
            key={`mobile-description-${active}`}
            className="animate-experience-content mt-7"
          >

            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#08783f]">
              Student perspective
            </p>

            <p className="mt-3 max-w-[500px] text-[13px] leading-6 text-[#647069]">
              {current.description}
            </p>

          </div>

        </div>


        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div className="mt-7 flex items-center justify-between border-t border-[#dce4de] pt-5">

          <p className="text-[9px] uppercase tracking-[0.22em] text-[#929c96]">
            Real voices · Real journeys
          </p>

          <Link
            href="/student-life"
            className="group flex items-center gap-3 text-[11px] font-semibold text-[#123b2a]"
          >
            Meet our students

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

          </Link>

        </div>

      </div>

    </section>
  );
}