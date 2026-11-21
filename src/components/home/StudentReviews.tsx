"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Quote,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

export type StudentReview = {
  id: string;
  label: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  poster?: string;
};

/**
 * Keep this list intentionally honest until verified student stories are supplied.
 * The optional media fields are the extension point for attributed stories.
 */
export const studentReviewCards: StudentReview[] = [
  {
    id: "preview-01",
    label: "Student video",
    title: "Hear from a student",
    description:
      "Dhanik Bharat student experience",
    video: "/images/students/1.mp4",
  },
  {
    id: "preview-02",
    label: "Student story preview",
    title: "Learning, day by day",
    description:
      "A verified student story can be added here.",
  },
  {
    id: "preview-03",
    label: "Student story preview",
    title: "Growing with the right support",
    description:
      "A verified student story can be added here.",
  },
  {
    id: "preview-04",
    label: "Student story preview",
    title: "More room to discover",
    description:
      "A verified student story can be added here.",
  },
  {
    id: "preview-05",
    label: "Student story preview",
    title: "Your story could be next",
    description:
      "A verified student story can be added here.",
  },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function StudentReviews() {
  const railRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedReview, setSelectedReview] = useState<StudentReview | null>(
    null,
  );

  const scrollToCard = useCallback((index: number) => {
    const rail = railRef.current;
    if (!rail) return;

    const nextIndex =
      index < 0
        ? studentReviewCards.length - 1
        : index >= studentReviewCards.length
          ? 0
          : index;
    const card = rail.children[nextIndex] as HTMLElement | undefined;
    if (!card) return;

    setActiveIndex(nextIndex);
    rail.scrollTo({
      left: card.offsetLeft - rail.offsetLeft,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const updateActiveCard = () => {
      const cards = Array.from(rail.children) as HTMLElement[];
      const nearest = cards.reduce(
        (best, card, index) => {
          const distance = Math.abs(card.offsetLeft - rail.scrollLeft);
          return distance < best.distance ? { distance, index } : best;
        },
        { distance: Number.POSITIVE_INFINITY, index: 0 },
      );
      setActiveIndex(nearest.index);
    };

    rail.addEventListener("scroll", updateActiveCard, { passive: true });
    return () => rail.removeEventListener("scroll", updateActiveCard);
  }, []);

  useEffect(() => {
    if (!selectedReview) return;

    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setSelectedReview(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    const video = modalVideoRef.current;
    if (video) {
      void video.play().catch(() => {});
    }
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selectedReview]);

  useEffect(() => {
    if (selectedReview) return;
    const video = modalVideoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, [selectedReview]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToCard(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToCard(activeIndex + 1);
    }
  };

  const openReview = (review: StudentReview) => {
    if (review.video) setSelectedReview(review);
  };

  const closeReview = () => {
    modalVideoRef.current?.pause();
    if (modalVideoRef.current) modalVideoRef.current.currentTime = 0;
    setSelectedReview(null);
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeReview();
  };

  return (
    <section
      aria-labelledby="student-reviews-heading"
      className="overflow-hidden bg-[#f7f8f4] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-[740px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#08783f]">
                Student voices
              </span>
            </div>
            <h2
              id="student-reviews-heading"
              className="text-[40px] font-semibold leading-[0.98] tracking-[-0.05em] text-[#123b2a] sm:text-[48px] lg:text-[56px]"
            >
              Hear It From
              <br />
              <span className="text-[#e50046]">Our Students</span>
            </h2>
          </div>
          <p className="max-w-[360px] text-sm leading-6 text-[#647069] lg:pb-1">
            Real experiences. Honest perspectives. Stories from the Dhanik
            learning community.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#647069]">
            Preview collection
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous student story"
              onClick={() => scrollToCard(activeIndex - 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6dfd6] text-[#123b2a] transition-colors hover:border-[#123b2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08783f]"
            >
              <ArrowLeft size={17} strokeWidth={1.7} />
            </button>
            <button
              type="button"
              aria-label="Next student story"
              onClick={() => scrollToCard(activeIndex + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#123b2a] text-white transition-colors hover:bg-[#08783f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08783f]"
            >
              <ArrowRight size={17} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Student story previews. Use left and right arrow keys to browse."
          className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 outline-none scrollbar-none focus-visible:ring-2 focus-visible:ring-[#08783f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f8f4]"
        >
          {studentReviewCards.map((review, index) => {
            const hasMedia = Boolean(review.video);
            return (
              <article
                key={review.id}
                className="relative w-[82vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-[16px] bg-[#123b2a] text-white sm:w-[44%] sm:max-w-none lg:w-[23.5%]"
              >
                <div className="relative aspect-[4/5]">
                  {review.video ? (
                    <video
                      src={review.video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedData={(event) => {
                        event.currentTarget.currentTime = 5;
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : review.image ? (
                    <Image
                      src={review.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className={
                        index % 2
                          ? "absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(201,243,106,0.28),transparent_35%),linear-gradient(145deg,#1d6043,#09251a)]"
                          : "absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(201,243,106,0.28),transparent_35%),linear-gradient(145deg,#1d6043,#09251a)]"
                      }
                    >
                      <div className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full border border-[#c9f36a]/20" />
                      <div className="absolute left-8 top-24 h-20 w-20 rounded-full border border-white/10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f15] via-[#123b2a]/25 to-transparent" />
                  <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                    {hasMedia && (
                      <button
                        type="button"
                        onClick={() => openReview(review)}
                        aria-label="Play student review video"
                        className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-bold text-[#123b2a] shadow-[0_6px_18px_rgba(7,31,21,0.14)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08783f]"
                      >
                        <Play size={13} fill="currentColor" />
                        Play
                      </button>
                    )}
                    <span className="rounded-full border border-[#c9f36a]/40 bg-[#123b2a]/50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#c9f36a] backdrop-blur-sm">
                      {review.label}
                    </span>
                  </div>
                  <div className="absolute inset-x-5 bottom-5">
                    <Quote
                      aria-hidden="true"
                      size={22}
                      className="mb-4 text-[#c9f36a]"
                      fill="currentColor"
                    />
                    <h3 className="text-2xl font-semibold leading-[1.05] tracking-[-0.04em]">
                      {review.title}
                    </h3>
                    <p className="mt-3 text-xs leading-5 text-white/70">
                      {review.description}
                    </p>
                    {hasMedia && (
                      <button
                        type="button"
                        onClick={() => openReview(review)}
                        className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#c9f36a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9f36a]"
                      >
                        <Play size={13} fill="currentColor" />
                        Watch story
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-3 flex items-center gap-2" aria-hidden="true">
          {studentReviewCards.map((review, index) => (
            <span
              key={review.id}
              className={`h-1 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-[#e50046]" : "w-2 bg-[#cbd6cc]"
              }`}
            />
          ))}
        </div>
      </div>

      {selectedReview?.video && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedReview.title}
          onMouseDown={handleBackdropClick}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-[#071f15]/85 p-4 backdrop-blur-sm"
        >
          <div className="relative h-[calc(100dvh-40px)] max-h-[720px] w-auto max-w-[calc(100vw-32px)] aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-2xl">
            <button
              type="button"
              aria-label="Close student story"
              onClick={closeReview}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X size={17} />
            </button>
            <video
              ref={modalVideoRef}
              src={selectedReview.video}
              poster={selectedReview.poster}
              controls
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
}
