"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { GalleryItem } from "@/types/gallery";

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export default function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onChange,
}: GalleryLightboxProps) {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        onChange((activeIndex - 1 + items.length) % items.length);
      }
      if (event.key === "ArrowRight") {
        onChange((activeIndex + 1) % items.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, items.length, onChange, onClose]);

  const activeItem =
    activeIndex === null ? null : items[activeIndex] ?? null;

  const move = (direction: -1 | 1) => {
    if (activeIndex === null) return;
    onChange((activeIndex + direction + items.length) % items.length);
  };

  return (
    <AnimatePresence>
      {activeItem && activeIndex !== null ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071811]/95 px-4 py-5 sm:px-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} image preview`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
            const distance = touchStartX.current - endX;
            if (Math.abs(distance) > 45) move(distance > 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#123b2a] sm:right-7 sm:top-7"
            aria-label="Close image preview"
            autoFocus
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={() => move(-1)}
            className="absolute left-3 z-20 hidden size-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-[#c9f36a] hover:text-[#123b2a] sm:flex lg:left-8"
            aria-label="Previous image"
          >
            <ArrowLeft size={21} />
          </button>

          <motion.div
            key={activeItem.id}
            className="relative flex h-[78vh] w-full max-w-[1180px] flex-col"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[18px] bg-[#10281d] sm:rounded-[24px]">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="(max-width: 1280px) 100vw, 1180px"
                className="object-contain"
                priority
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071811]/80 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-8 sm:bottom-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9f36a]">
                  {activeItem.category} · {activeItem.location}
                </p>
                <h2 className="mt-2 max-w-[700px] text-2xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  {activeItem.title}
                </h2>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-white/65">
              <p className="max-w-[70%] text-xs leading-5">
                {activeItem.caption}
              </p>
              <p className="font-mono text-[10px] tracking-[0.16em]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </p>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={() => move(1)}
            className="absolute right-3 z-20 hidden size-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-[#c9f36a] hover:text-[#123b2a] sm:flex lg:right-8"
            aria-label="Next image"
          >
            <ArrowRight size={21} />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
