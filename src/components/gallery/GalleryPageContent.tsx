"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import {
  featuredEvents,
  galleryCampuses,
  galleryCategories,
  galleryItems,
  infrastructureItems,
} from "@/data/gallery";
import type { GalleryCampus, GalleryCategory } from "@/types/gallery";
import GalleryLightbox from "./GalleryLightbox";

export default function GalleryPageContent() {
  const [category, setCategory] = useState<GalleryCategory | "All">("All");
  const [campus, setCampus] = useState<GalleryCampus | "All">("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () =>
      galleryItems.filter(
        (item) =>
          (category === "All" || item.category === category) &&
          (campus === "All" || item.campus === campus),
      ),
    [category, campus],
  );

  return (
    <MotionConfig reducedMotion="user">
    <main className="bg-[#f7f8f4] text-[#123b2a]">
      <section className="subpage-hero relative px-5 sm:px-8 lg:px-12">
        <div className="subpage-container">
          <div className="grid items-end gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="pb-1"
            >
              <p className="subpage-kicker mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#08783f]" /> Dhanik Bharat, in frames
              </p>
              <h1 className="subpage-title max-w-[620px]">
                Campus Life,{" "}
                <br />
                <span className="text-[#08783f]">Captured.</span>
              </h1>
              <p className="mt-7 max-w-[470px] text-[15px] leading-7 text-[#647069] sm:text-base">
                Explore the spaces, experiences, and unforgettable moments that shape life at Dhanik Bharat.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative aspect-[1.42/1] overflow-hidden rounded-[24px] bg-[#dfe8df] sm:rounded-[34px]">
                <Image
                  src="/images/campus/branches/hyderabad-harvard-madhapur.jpg"
                  alt="Dhanik Bharat Harvard Campus in Madhapur"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092518]/70 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white sm:inset-x-8 sm:bottom-8">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9f36a]">
                      Campus 01
                    </p>
                    <p className="mt-2 text-base font-semibold sm:text-xl">
                      Harvard Campus · Madhapur
                    </p>
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.14em] text-white/70">
                    HYDERABAD / IN
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 hidden size-[96px] items-center justify-center rounded-full border-[7px] border-[#f7f8f4] bg-[#c9f36a] text-center text-[9px] font-bold uppercase leading-[1.45] tracking-[0.12em] text-[#123b2a] sm:flex lg:-left-7">
                16<br />campuses<br /><span className="text-base">✳</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-40 border-y border-[#dce4de] bg-white/95 px-5 py-4 backdrop-blur-md sm:px-8 sm:py-5 lg:px-12">
        <div className="subpage-container">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-1 flex items-center gap-1 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0" aria-label="Filter by category">
              {(["All Moments", ...galleryCategories] as const).map((value) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setCategory(value === "All Moments" ? "All" : value)}
                  aria-pressed={value === "All Moments" ? category === "All" : category === value}
                  className={`min-h-11 shrink-0 rounded-full px-4 text-[12px] font-bold transition-colors ${
                    value === "All Moments" ? category === "All" : category === value
                      ? "bg-[#123b2a] text-white"
                      : "text-[#647069] hover:bg-[#edf2ec] hover:text-[#123b2a]"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1" aria-label="Filter by campus">
              <button
                type="button"
                onClick={() => setCampus("All")}
                aria-pressed={campus === "All"}
                className={`shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] ${
                  campus === "All" ? "text-[#08783f]" : "text-[#8b968e]"
                }`}
              >
                All cities
              </button>
              {galleryCampuses.map((value) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setCampus(value)}
                  aria-pressed={campus === value}
                  className={`shrink-0 border-l border-[#dce4de] pl-3 text-[10px] font-bold uppercase tracking-[0.14em] ${
                    campus === value ? "text-[#08783f]" : "text-[#8b968e]"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="subpage-section px-5 sm:px-8 lg:px-12">
        <div id="gallery-moment-grid" className="subpage-container scroll-mt-24">
          <div className="mb-8 flex items-end justify-between border-b border-[#dce4de] pb-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#08783f]">
                Selected moments
              </p>
              <p className="mt-2 text-sm text-[#647069]">
                {filteredItems.length.toString().padStart(2, "0")} photographs
              </p>
            </div>
            <a
              href="#featured-events"
              className="hidden items-center gap-2 text-[11px] font-bold text-[#123b2a] sm:flex"
            >
              Featured events <ArrowDown size={15} />
            </a>
          </div>

          {filteredItems.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5"
            >
              {filteredItems.map((item, index) => {
                const span =
                  item.shape === "tall"
                    ? "lg:col-span-5"
                    : item.shape === "wide"
                      ? "lg:col-span-7"
                      : "lg:col-span-4";
                const height =
                  item.shape === "tall"
                    ? "h-[520px] sm:h-[620px]"
                    : item.shape === "wide"
                      ? "h-[380px] sm:h-[460px]"
                      : "h-[380px]";

                return (
                  <motion.button
                    layout
                    type="button"
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`group relative overflow-hidden rounded-[20px] bg-[#dfe8df] text-left ${span} ${height}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: Math.min(index * 0.045, 0.25) }}
                    aria-label={`Open ${item.title} in fullscreen`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#092518]/80 via-[#092518]/5 to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white sm:inset-x-7 sm:bottom-7">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#c9f36a]">
                          {item.category} · {item.location}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
                          {item.title}
                        </h3>
                      </div>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/10 backdrop-blur-sm transition-all group-hover:border-[#c9f36a] group-hover:bg-[#c9f36a] group-hover:text-[#123b2a]">
                        <ArrowUpRight size={17} />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[#cbd7cf] text-center">
              <p className="subpage-section-title">No moments here yet.</p>
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setCampus("All");
                }}
                className="mt-5 rounded-full bg-[#123b2a] px-5 py-3 text-xs font-bold text-white"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="featured-events" className="subpage-section scroll-mt-24 bg-[#123b2a] px-5 text-white sm:px-8 lg:px-12">
        <div className="subpage-container">
          <div className="flex flex-col justify-between gap-7 border-b border-white/15 pb-9 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9f36a]">
                Gatherings & milestones
              </p>
              <h2 className="subpage-section-title mt-4 max-w-[620px] text-white">
                Moments Worth Remembering.
              </h2>
            </div>
            <p className="max-w-[390px] text-sm leading-7 text-white/60">
              Moments when our campuses become a shared stage for ambition, recognition and community.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredEvents.map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group"
              >
                <div className="relative aspect-[1.18/1] overflow-hidden rounded-[20px]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#092518]/65 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-[#123b2a]/60 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] backdrop-blur-md">
                    {event.date}
                  </span>
                </div>
                <div className="pt-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#c9f36a]">
                    {event.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em]">
                    {event.title}
                  </h3>
                  <p className="mt-3 max-w-[360px] text-[13px] leading-6 text-white/58">
                    {event.description}
                  </p>
                  <p className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
                    <MapPin size={13} className="text-[#c9f36a]" /> {event.location}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCategory("Campus Events");
                      if (event.location === "Hyderabad" || event.location === "Vijayawada" || event.location === "Guntur" || event.location === "Vizag") {
                        setCampus(event.location);
                      }
                      document.querySelector("#gallery-moment-grid")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-5 inline-flex min-h-11 items-center gap-3 rounded-full border border-white/20 px-4 text-[11px] font-bold text-white transition-colors hover:border-[#c9f36a] hover:bg-[#c9f36a] hover:text-[#123b2a]"
                  >
                    Explore Event <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="subpage-section px-5 sm:px-8 lg:px-12">
        <div className="subpage-container">
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="subpage-kicker">Infrastructure</p>
              <h2 className="subpage-section-title mt-5 max-w-[420px]">
                Spaces Designed{" "}
                <br />
                <span className="text-[#08783f]">to Inspire.</span>
              </h2>
            </div>
            <p className="subpage-subtitle max-w-[520px] lg:justify-self-end">
              Every space supports a complete routine—from focused preparation and balanced meals to rest and reflection.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {infrastructureItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className={`overflow-hidden rounded-[22px] border border-[#dce4de] bg-white ${
                  index === 0 ? "lg:col-span-6" : "lg:col-span-3"
                }`}
              >
                <div className={`relative ${index === 0 ? "aspect-[1.5/1]" : "aspect-[.82/1]"}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
                    className="object-cover"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#08783f]">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-6 text-[#647069]">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8 sm:pb-14 lg:px-12">
        <div className="subpage-container flex flex-col justify-between gap-8 rounded-[24px] bg-[#eaf1e7] px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#08783f]">
              See it for yourself
            </p>
            <h2 className="subpage-section-title mt-4 max-w-[650px]">
              Your next chapter may begin on campus.
            </h2>
          </div>
          <Link
            href="/admissions"
            className="group inline-flex min-h-12 shrink-0 items-center gap-5 rounded-full bg-[#123b2a] py-1 pl-6 pr-1 text-[13px] font-semibold text-white transition-colors hover:bg-[#08783f]"
          >
            Plan a visit
            <span className="flex size-10 items-center justify-center rounded-full bg-[#c9f36a] text-lg text-[#123b2a] transition-transform group-hover:rotate-45">
              ↗
            </span>
          </Link>
        </div>
      </section>

      <GalleryLightbox
        items={filteredItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
      />
    </main>
    </MotionConfig>
  );
}
