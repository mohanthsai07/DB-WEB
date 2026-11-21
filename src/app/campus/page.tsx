
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  MapPin,
  Navigation,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Campuses | Dhanik Bharat",
  description:
    "Explore Dhanik Bharat Educational Institutions campus locations and contact admissions for current branch information.",
  openGraph: {
    title: "Our Campuses | Dhanik Bharat",
    description:
      "Explore Dhanik Bharat locations across Telangana and Andhra Pradesh.",
  },
};

type Campus = {
  number: string;
  city: string;
  state: string;
  area: string;
  description: string;
  image: string;
  mapsQuery: string;
};

const campuses: Campus[] = [
  {
    number: "01",
    city: "Hyderabad",
    state: "Telangana",
    area: "Hyderabad",
    description:
      "Explore our Hyderabad location and enquire about available programmes and campus facilities.",
    image: "/images/campus/environment.png",
    mapsQuery: "Dhanik Bharat Educational Institutions Hyderabad",
  },
  {
    number: "02",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    area: "Vijayawada",
    description:
      "Discover our Vijayawada location and connect with admissions for programme information.",
    image: "/images/campus/life.png",
    mapsQuery: "Dhanik Bharat Educational Institutions Vijayawada",
  },
  {
    number: "03",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    area: "Visakhapatnam",
    description:
      "Explore our Visakhapatnam location and ask admissions about current campus arrangements.",
    image: "/images/campus/food.png",
    mapsQuery: "Dhanik Bharat Junior College PM Palem Visakhapatnam",
  },
  {
    number: "04",
    city: "Guntur",
    state: "Andhra Pradesh",
    area: "Guntur",
    description:
      "Find our Guntur location and confirm the latest address and visit details with admissions.",
    image: "/images/campus/study room.png",
    mapsQuery: "Dhanik Bharat Junior College Guntur Andhra Pradesh",
  },
];

function CampusCard({ campus }: { campus: Campus }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    campus.mapsQuery,
  )}`;

  return (
    <article
      id={`campus-${campus.number}`}
      className="group flex h-full flex-col rounded-[5px] border border-[#e5e5df] bg-[#fdfdfb] p-[10px] pb-[18px] shadow-[0_14px_32px_rgba(18,59,42,0.09)]"
    >
      {/* Physical photograph frame */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8eee7]">
        <Image
          src={campus.image}
          alt={`${campus.city} campus, Dhanik Bharat`}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          className="object-cover"
        />

        <div className="pointer-events-none absolute inset-0 border border-black/[0.04]" />

        <span className="absolute left-3 top-3 bg-[#fdfdfb]/95 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#123b2a]">
          CAMPUS / {campus.number}
        </span>
      </div>

      {/* Caption area */}
      <div className="flex flex-1 flex-col px-2 pb-1 pt-5 sm:px-3 sm:pt-6">
        <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#08783f]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />
          {campus.state}
        </p>

        <h2 className="mt-3 text-[22px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#123b2a] sm:text-[24px]">
          {campus.city}
        </h2>

        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-[#647069]">
          <MapPin size={13} className="shrink-0" />
          {campus.area}
        </p>

        <p className="mt-4 flex-1 text-[12px] leading-[1.8] text-[#647069]">
          {campus.description}
        </p>

        <div className="mt-5 border-t border-[#e5e9e4] pt-4">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-10 items-center justify-between gap-2 rounded-full bg-[#08783f] px-4 text-[11px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f]"
          >
            <span className="flex items-center gap-2">
              <Navigation size={14} />
              Get directions
            </span>
            <ArrowUpRight size={15} />
          </a>

          <Link
            href="/admissions"
            className="mt-3 flex items-center justify-center gap-2 py-1 text-[11px] font-medium text-[#123b2a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08783f]"
          >
            Enquire about this campus
            <ArrowDownRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CampusPage() {
  return (
    <main className="overflow-hidden bg-[#f7f8f4]">
      {/* Editorial heading */}
      <section className="px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-24 lg:px-12 lg:pt-28">
        <div className="subpage-container">
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#08783f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />
            Explore Dhanik Bharat
          </p>

          <div className="mt-7 grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h1 className="subpage-title max-w-[900px]">
              Find your
              <br />
              <span className="text-[#e50046]">place to grow.</span>
            </h1>

            <div className="max-w-[410px] pb-1 lg:justify-self-end">
              <p className="text-[14px] leading-7 text-[#647069] sm:text-[15px]">
                Every campus is a starting point for a new chapter. Explore
                our listed locations and contact admissions for current
                branch information.
              </p>

              <a
                href="#campus-list"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#123b2a] px-5 py-3.5 text-[12px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f]"
              >
                Explore locations
                <ArrowDownRight size={16} />
              </a>
            </div>
          </div>

          {/* <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-[#dce4de] py-5 sm:mt-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#647069]">
              Browse locations
            </span>

            {campuses.map((campus) => (
              <a
                key={campus.number}
                href={`#campus-${campus.number}`}
                className="text-[12px] font-medium text-[#123b2a] underline decoration-[#c9d5ca] underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#08783f]"
              >
                {campus.city}
              </a>
            ))}
          </div> */}
        </div>
      </section>

      {/* Campus photograph cards */}
      <section
        id="campus-list"
        className="scroll-mt-8 px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28"
      >
        <div className="subpage-container">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#08783f]">
                Our locations
              </p>
              <h2 className="subpage-section-title mt-3">
                Explore our campuses.
              </h2>
            </div>

            <p className="max-w-[310px] text-[12px] leading-6 text-[#647069]">
              Choose a location to open its map listing or contact our
              admissions team.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            {campuses.map((campus) => (
              <CampusCard key={campus.number} campus={campus} />
            ))}
          </div>

          <p className="mt-6 max-w-[850px] text-[11px] leading-5 text-[#7a857d]">
            The locations shown are a starting list, not a verified count
            of every branch. Please confirm the exact address and visit
            arrangements with admissions before travelling.
          </p>
        </div>
      </section>

      {/* Admissions contact */}
      <section className="subpage-section bg-[#123b2a] px-5 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[720px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c9f36a]">
              Need more information?
            </p>

            <h2 className="subpage-section-title mt-5">
              Your next chapter
              <br />
              starts here.
            </h2>

            <p className="mt-5 max-w-[470px] text-[14px] leading-7 text-white/70">
              Contact admissions to confirm campus locations, programmes
              and visit arrangements.
            </p>
          </div>

          <Link
            href="/admissions"
            className="inline-flex min-h-12 w-fit shrink-0 items-center gap-3 rounded-full bg-[#c9f36a] px-6 text-[12px] font-semibold text-[#123b2a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Contact admissions
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
