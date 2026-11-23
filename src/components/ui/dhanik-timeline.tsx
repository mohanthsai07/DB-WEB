
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

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
    area: "7 campuses",
    image: "/images/campus/branches/hyderabad-harvard-madhapur.jpg",
    description: "Explore Dhanik Bharat's seven campuses across Hyderabad.",
  },
  {
    id: "vijayawada",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    area: "3 campuses",
    image: "/images/campus/branches/vijayawada-harvard-ramavarapadu.jpg",
    description: "Discover Dhanik Bharat's three campuses in Vijayawada.",
  },
  {
    id: "guntur",
    city: "Guntur",
    state: "Andhra Pradesh",
    area: "4 campuses",
    image: "/images/campus/branches/guntur-harvard-peddapalakur.jpg",
    description: "Explore Dhanik Bharat's four campuses across Guntur.",
  },
  {
    id: "vizag",
    city: "Vizag",
    state: "Andhra Pradesh",
    area: "2 campuses",
    image: "/images/campus/branches/vizag-harvard-carshed-junction.jpg",
    description: "Find Dhanik Bharat's two campuses at Carshed Junction.",
  },
];

const mapUrl = (campus: Campus) => {
  const queries: Record<string, string> = {
    hyderabad: "Dhanik Bharat Harvard Campus - MADHAPUR Hyderabad",
    vijayawada: "Dhanik Bharat Harvard Campus - RAMAVARAPADU Vijayawada",
    guntur: "Dhanik Bharat Harvard Campus - PEDDAPALAKLURU Guntur",
    vizag: "Dhanik Bharat Harvard Campus - CARSHED JUNCTION Vizag",
  };

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    queries[campus.id] ?? `Dhanik Bharat Educational Institutions ${campus.city}`
  )}`;
};

function CampusRow({ campus }: { campus: Campus }) {
  return (
    <article className="group grid grid-cols-[86px_1fr] items-center gap-4 border-b border-[#dce4ed] py-4 last:border-b-0 sm:grid-cols-[110px_1fr_auto]">
      <div className="relative h-[66px] overflow-hidden bg-[#dce9df]">
        <Image src={campus.image} alt="" fill sizes="110px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-[17px] font-semibold text-[#123b2a]">
          {campus.city}
        </h3>
        <p className="mt-1 text-xs text-[#647069]">
          {campus.area ?? campus.state}
        </p>
      </div>

      <a
        href={mapUrl(campus)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Explore ${campus.city} on Google Maps`}
        className="col-span-2 inline-flex min-h-11 items-center rounded-full justify-center gap-2 bg-[#123b2a] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#08783f] sm:col-span-1"
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
      className="subpage-section overflow-hidden bg-white px-5 sm:px-8 lg:px-12"
    >
      <div className="subpage-container">
        {/* Section heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.06em] text-[#08783f]">
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
            Discover 16 Dhanik Bharat campuses across Hyderabad,
            Vijayawada, Guntur and Vizag.
          </p>
        </div>

        {/* Main discovery layout */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.65fr]">
          <div className="overflow-hidden border border-[#e9eee8] bg-[#f7f8f4] p-5 md:p-7">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#123b2a]">
                The Dhanik learning experience
              </span>
              <span className="rounded-full bg-[#e8f0e7] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#08783f]">
                Learn with purpose
              </span>
            </div>

            <div className="relative mt-5 aspect-[4/3] overflow-hidden bg-[#e3e9df]">
              <Image
                src="/images/campus/branches/hyderabad-harvard-madhapur.jpg"
                alt="Harvard Campus, Madhapur"
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#123b2a]/35 to-transparent" />
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
                className="subpage-action-link mt-5 border-[#b9c9bd] text-[#08783f] hover:gap-3"
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
                className="subpage-button bg-[#123b2a] text-xs text-white hover:bg-[#08783f]"
              >
                Contact us
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* City strip */}
        {/* <div className="mt-14 md:mt-16">
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
        </div> */}
      </div>
    </section>
  );
}
