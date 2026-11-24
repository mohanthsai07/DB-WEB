
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  MapPin,
  Search,
  ChevronDown,
  X,
} from "lucide-react";

import {
  campuses,
  cities,
  type Campus,
} from "@/data/campuses";

const PAGE_SIZE = 6;

/* COMPACT CAMPUS CARD */

function CampusCard({ campus }: { campus: Campus }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    campus.mapsQuery
  )}`;

  return (
    <article
      id={`campus-${campus.id}`}
      className="group flex h-full min-w-0 flex-col rounded-2xl border border-[#e4e8e2] bg-white p-2 transition-all duration-200 hover:border-[#b9cebc] hover:shadow-sm sm:p-2.5"
    >
      {/* CAMPUS IMAGE */}

      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#eef1eb]">

        <Image
          src={campus.image}
          alt={`${campus.name}, ${campus.city}`}
          fill
          sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, (max-width: 1279px) 23vw, 240px"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />

        <span className="absolute left-1.5 top-1.5 rounded-md bg-white/95 px-2 py-1 text-[10px] font-semibold text-[#123b2a]">
          {campus.id}
        </span>

      </div>

      {/* CAMPUS DETAILS */}

      <div className="flex flex-1 flex-col px-1 pb-1 pt-2.5 sm:px-2 sm:pt-3">

        {/* Audience */}

        <p className="text-[11px] font-semibold leading-4 text-[#e50046] sm:text-xs">
          {campus.audience}
        </p>

        {/* Name */}

        <h3 className="mt-1 break-words text-[15px] font-semibold leading-snug tracking-[-0.025em] text-[#123b2a] sm:text-[17px]">
          {campus.name}
        </h3>

        {/* Location */}

        <div className="mt-1.5 flex items-start gap-1 text-xs leading-5 text-[#647069]">

          <MapPin
            size={13}
            className="mt-0.5 shrink-0 text-[#08783f]"
          />

          <span>
            {campus.area}, {campus.city}
          </span>

        </div>

        {/* Campus Type */}

        <p className="mb-3 mt-2 text-[11px] leading-4 text-[#647069] sm:text-xs">
          {campus.type}
        </p>

        {/* Location Button */}

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View location of ${campus.name}`}
          className="mt-auto flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-[#cddfcd] bg-[#f0f6ed] px-2 text-center text-xs font-semibold text-[#08783f] transition-colors hover:border-[#08783f] hover:bg-[#08783f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08783f]"
        >
          View location

          <ArrowUpRight
            size={14}
            className="shrink-0"
          />
        </a>

      </div>

    </article>
  );
}

/* CAMPUS CATALOGUE */

export default function CampusCatalogue() {
  const [activeCity, setActiveCity] = useState("All");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] =
    useState(PAGE_SIZE);

  const filteredCampuses = campuses.filter((campus) => {
    const matchesCity =
      activeCity === "All" ||
      campus.city === activeCity;

    const query = search.trim().toLowerCase();

    const matchesSearch =
      `${campus.name} ${campus.city} ${campus.area} ${campus.audience} ${campus.type}`
        .toLowerCase()
        .includes(query);

    return matchesCity && matchesSearch;
  });

  const visibleCampuses = filteredCampuses.slice(
    0,
    visibleCount
  );

  const handleCityChange = (city: string) => {
    setActiveCity(city);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section
      id="campus-list"
      className="scroll-mt-24 bg-[#f7f8f4] px-3 py-6 sm:px-6 sm:py-10 lg:px-12"
    >
      <div className="mx-auto max-w-[1320px]">

        {/* COMPACT HEADER */}

        <div className="mb-5 flex items-center justify-between gap-3 sm:mb-7">

          <div>

            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#08783f]">
              Our campus network
            </p>

            <h1 className="text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-tight tracking-[-0.045em] text-[#123b2a]">
              Find your{" "}
              <span className="text-[#e50046]">
                campus.
              </span>
            </h1>

            <p className="mt-2 text-xs text-[#647069] sm:text-sm">
              {campuses.length} campuses across{" "}
              {cities.length} cities
            </p>

          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e7efe4] text-[#08783f] sm:h-14 sm:w-14">

            <MapPin size={25} strokeWidth={1.6} />

          </div>

        </div>

        {/* SEARCH AND CITY FILTERS */}

        <div className="mb-5 flex flex-col gap-3 sm:mb-7 lg:flex-row lg:items-center lg:justify-between">

          {/* SEARCH BAR */}

          <div className="relative w-full lg:max-w-[340px]">

            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647069]"
            />

            <input
              type="search"
              aria-label="Search campuses"
              placeholder="Search campus or location"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className="h-12 w-full rounded-xl border border-[#dce4de] bg-white pl-11 pr-10 text-sm text-[#123b2a] outline-none transition-colors placeholder:text-[#78847b] focus:border-[#08783f] [&::-webkit-search-cancel-button]:hidden"
            />

            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setSearch("");
                  setVisibleCount(PAGE_SIZE);
                }}
                className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-[#647069]"
              >
                <X size={17} />
              </button>
            )}

          </div>

          {/* CITY FILTERS */}

          <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {["All", ...cities].map((city) => {
              const isActive = activeCity === city;

              return (
                <button
                  key={city}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleCityChange(city)}
                  className={`min-h-10 shrink-0 rounded-xl border px-4 text-xs font-semibold transition-colors sm:text-sm ${
                    isActive
                      ? "border-[#123b2a] bg-[#123b2a] text-white"
                      : "border-[#dce4de] bg-white text-[#526259] hover:border-[#08783f]"
                  }`}
                >
                  {city === "All" ? "All campuses" : city}
                </button>
              );
            })}

          </div>

        </div>

        {/* RESULTS HEADER */}

        <div className="mb-3 flex items-center justify-between gap-3">

          <h2 className="text-base font-semibold text-[#123b2a] sm:text-xl">
            {activeCity === "All"
              ? "Explore campuses"
              : activeCity}
          </h2>

          <span
            aria-live="polite"
            className="text-xs text-[#647069]"
          >
            {filteredCampuses.length} campuses
          </span>

        </div>

        {/* COMPACT PRODUCT-STYLE GRID */}

        {visibleCampuses.length > 0 ? (

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">

            {visibleCampuses.map((campus) => (

              <CampusCard
                key={campus.id}
                campus={campus}
              />

            ))}

          </div>

        ) : (

          <div className="rounded-2xl border border-[#e4e8e2] bg-white px-5 py-10 text-center">

            <Search
              size={28}
              className="mx-auto mb-3 text-[#647069]"
            />

            <h3 className="font-semibold text-[#123b2a]">
              No campuses found
            </h3>

            <p className="mt-2 text-sm text-[#647069]">
              Try searching for another location.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCity("All");
                setVisibleCount(PAGE_SIZE);
              }}
              className="mt-4 text-sm font-semibold text-[#e50046]"
            >
              Reset filters
            </button>

          </div>

        )}

        {/* LOAD MORE */}

        {filteredCampuses.length > 0 && (

          <div className="mt-5 flex flex-col items-center gap-3 sm:mt-7">

            <p
              aria-live="polite"
              className="text-xs text-[#647069]"
            >
              Showing {visibleCampuses.length} of{" "}
              {filteredCampuses.length} campuses
            </p>

            {/* Progress indicator */}

            <div
              aria-hidden="true"
              className="h-1 w-28 overflow-hidden rounded-full bg-[#e0e6de]"
            >
              <div
                className="h-full rounded-full bg-[#08783f] transition-all duration-300"
                style={{
                  width: `${
                    (visibleCampuses.length /
                      filteredCampuses.length) *
                    100
                  }%`,
                }}
              />
            </div>

            {visibleCount < filteredCampuses.length && (

              <button
                type="button"
                onClick={() =>
                  setVisibleCount(
                    (previous) => previous + PAGE_SIZE
                  )
                }
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#dce4de] bg-white px-6 text-sm font-semibold text-[#123b2a] transition-colors hover:border-[#e50046] hover:text-[#e50046]"
              >
                View more campuses
                <ChevronDown size={17} />
              </button>

            )}

            {visibleCount > PAGE_SIZE && (

              <button
                type="button"
                onClick={() => setVisibleCount(PAGE_SIZE)}
                className="min-h-10 text-xs font-semibold text-[#e50046]"
              >
                Show less
              </button>

            )}

          </div>

        )}

      </div>
    </section>
  );
}
