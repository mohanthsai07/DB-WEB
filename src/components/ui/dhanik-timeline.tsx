
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  MapPin,
  Navigation,
} from "lucide-react";

type Campus = {
  id: string;
  city: string;
  state: string;
  area?: string;
  image: string;
  description: string;
};

const campuses: Campus[] = [
  {
    id: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    image: "/images/campus/environment.png",
    description: "Explore Dhanik Bharat's learning locations in Hyderabad.",
  },
  {
    id: "vijayawada",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    image: "/images/campus/life.png",
    description: "Discover our learning community in Vijayawada.",
  },
  {
    id: "guntur",
    city: "Guntur",
    state: "Andhra Pradesh",
    image: "/images/campus/study room.png",
    description: "Explore Dhanik Bharat's presence in Guntur.",
  },
  {
    id: "visakhapatnam",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    area: "PM Palem, Car Shed Junction",
    image: "/images/campus/food.png",
    description: "Find our campus location at PM Palem, Car Shed Junction.",
  },
];

const mapUrl = (campus: Campus) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Dhanik Bharat Educational Institutions ${campus.area ?? campus.city}`
  )}`;

function CampusRow({ campus }: { campus: Campus }) {
  return (
    <article className="group flex items-center gap-3 rounded-2xl bg-white/0 p-3 transition-colors duration-200 hover:bg-white">
      <div
        className="relative h-[66px] w-[78px] shrink-0 overflow-hidden rounded-xl bg-[#dce9df] bg-cover bg-center"
        style={{ backgroundImage: `url("${campus.image}")` }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-[#123b2a]/10">
          <GraduationCap className="h-7 w-7 text-[#123b2a]/70" />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] font-semibold text-[#123b2a]">
          {campus.city}
        </h3>
        <p className="mt-1 truncate text-xs text-[#647069]">
          {campus.area ?? campus.state}
        </p>

        <a
          href={mapUrl(campus)}
          target="_blank"
          rel="noreferrer"
          className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#08783f] hover:underline"
        >
          <Navigation className="h-3 w-3" />
          Get directions
        </a>
      </div>

      <a
        href={mapUrl(campus)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Explore ${campus.city} on Google Maps`}
        className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#123b2a] px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#08783f]"
      >
        Explore
        <ArrowUpRight className="h-3 w-3" />
      </a>
    </article>
  );
}

export default function DhanikTimeline() {
  return (
    <section
      id="our-campuses"
      className="overflow-hidden bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        {/* Section heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#08783f]">
              <span className="h-2 w-2 rounded-full bg-[#c9f36a]" />
              Our locations
            </span>

            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-[#123b2a] md:text-5xl">
              One learning community.
              <br />
              <span className="text-[#e50046]">Across four cities.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-[#647069] md:text-right">
            Discover Dhanik Bharat locations across Telangana and Andhra
            Pradesh, and find the city closest to you.
          </p>
        </div>

        {/* Main discovery layout */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.65fr]">
          {/* Featured learning panel */}
          <div className="overflow-hidden rounded-[26px] border border-[#e9eee8] bg-[#f7f8f4] p-5 md:p-7">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#123b2a]">
                The Dhanik learning experience
              </span>
              <span className="rounded-full bg-[#e8f0e7] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#08783f]">
                Learn with purpose
              </span>
            </div>

            {/* Add your mentoring/classroom image here */}
            <div
              className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl bg-[#e3e9df] bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("/images/campus/study room.png")',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#123b2a]/35 to-transparent">
                <div className="rounded-full border border-white/50 bg-white/80 p-4 backdrop-blur-sm">
                  <GraduationCap className="h-9 w-9 text-[#123b2a]" />
                </div>
              </div>
            </div>

            <div className="pt-5">
              <h3 className="text-xl font-semibold tracking-tight text-[#123b2a] md:text-2xl">
                Focused learning.
                <br />
                Personal guidance.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#647069]">
                An academic environment combining Intermediate education
                with focused preparation for competitive examinations.
              </p>

              <Link
                href="/programs"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#08783f] hover:gap-3"
              >
                Explore our programs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Campus location panel */}
          <div className="rounded-[26px] bg-[#edf2f8] p-4 md:p-7">
            <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#647069]">
                  Find your campus
                </span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#123b2a] md:text-2xl">
                  Explore our locations
                </h3>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-medium text-[#123b2a]">
                <MapPin className="h-3.5 w-3.5 text-[#08783f]" />
                Telangana & Andhra Pradesh
              </span>
            </div>

            <div className="mt-4 divide-y divide-[#dce4ed]">
              {campuses.map((campus) => (
                <CampusRow key={campus.id} campus={campus} />
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/70 p-4">
              <div>
                <p className="text-sm font-semibold text-[#123b2a]">
                  Looking for a specific campus?
                </p>
                <p className="mt-1 text-xs text-[#647069]">
                  Contact our admissions team for location details.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#123b2a] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#08783f]"
              >
                Contact us
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* City strip */}
        <div className="mt-14 md:mt-16">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#08783f]">
                Our reach
              </span>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#123b2a] md:text-2xl">
                Find us across these cities
              </h3>
            </div>
            <span className="hidden text-xs text-[#647069] sm:block">
              Select a city to explore
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {campuses.map((campus) => (
              <a
                key={campus.id}
                href={mapUrl(campus)}
                target="_blank"
                rel="noreferrer"
                className="group flex min-w-0 items-center gap-3 rounded-2xl border border-[#e8ece7] bg-white p-3 transition-colors hover:border-[#b8d5bf] hover:bg-[#f7f8f4]"
              >
                <div
                  className="h-14 w-14 shrink-0 rounded-xl bg-[#e3e9df] bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${campus.image}")`,
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#123b2a]">
                    {campus.city}
                  </p>
                  <p className="mt-1 truncate text-[11px] text-[#647069]">
                    {campus.state}
                  </p>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#dce5dc] text-[#123b2a] transition-colors group-hover:bg-[#123b2a] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
