
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  MapPin,
  Navigation,
} from "lucide-react";

type Campus = {
  id: string;
  city: string;
  region: string;
  address: string;
  note: string;
  mapsQuery: string;
};

const campuses: Campus[] = [
  {
    id: "01",
    city: "Hyderabad",
    region: "Kukatpally",
    address:
      "Metro Pillar No. A772, NH 65, above G. Pulla Reddy Sweets, A.S. Raju Nagar, Vivekananda Nagar, Hyderabad, Telangana 500072.",
    note: "Hyderabad location",
    mapsQuery:
      "Dhanik Bharat Educational Institutions Kukatpally Hyderabad",
  },
  {
    id: "02",
    city: "Hyderabad",
    region: "Madeenaguda",
    address:
      "Plot No. 207 & 208, near Siddarth Neuro Hospital, Mythri Nagar, Hafeezpet, Madeenaguda, Hyderabad, Telangana 500049.",
    note: "Hyderabad location",
    mapsQuery:
      "Dhanik Bharat Educational Institutions Mythri Nagar Madeenaguda Hyderabad",
  },
  {
    id: "03",
    city: "Vijayawada",
    region: "Andhra Pradesh",
    address:
      "A public listing places Dhanik Bharat Educational Institutions in the Labbipet area, Vijayawada, Andhra Pradesh 520010. Confirm the exact campus address before visiting.",
    note: "Vijayawada location",
    mapsQuery: "Dhanik Bharat Educational Institutions Labbipet Vijayawada",
  },
  {
    id: "04",
    city: "Visakhapatnam",
    region: "PM Palem",
    address:
      "Near Car Shed, P. M. Palem, Chinagadila, Visakhapatnam, Andhra Pradesh 530041.",
    note: "PM Palem location",
    mapsQuery: "Dhanik Bharat Junior College PM Palem Visakhapatnam",
  },
  {
    id: "05",
    city: "Guntur",
    region: "Ratnagiri Nagar",
    address:
      "Dhanik Bharat Junior College, opposite Vijetha Function Hall, Palakaluru Road, Ratnagiri Nagar, Guntur, Andhra Pradesh 522006.",
    note: "Guntur location",
    mapsQuery: "Dhanik Bharat Junior College Ratnagiri Nagar Guntur",
  },
];

export default function CampusDirectory() {
  const [selectedId, setSelectedId] = useState("01");

  const selected =
    campuses.find((campus) => campus.id === selectedId) ?? campuses[0];

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    selected.mapsQuery
  )}`;

  return (
    <section
      id="campus-directory"
      className="scroll-mt-24 bg-[#f7f8f4] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col gap-8 border-b border-[#dce4de] pb-10 sm:pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#08783f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />
              Our locations
            </p>

            <h2 className="mt-5 max-w-[800px] text-[clamp(2.8rem,7vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[#123b2a]">
              Find your
              <br />
              <span className="text-[#08783f]">place to begin.</span>
            </h2>
          </div>

          <p className="max-w-[340px] text-[14px] leading-7 text-[#647069]">
            Explore our listed locations across Telangana and Andhra Pradesh.
            Select a location to view its address and map.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#647069]">
                Campus directory
              </span>
              <span className="text-[11px] tabular-nums text-[#647069]">
                {String(campuses.length).padStart(2, "0")} locations listed
              </span>
            </div>

            <div className="border-t border-[#dce4de]">
              {campuses.map((campus) => {
                const isSelected = campus.id === selectedId;

                return (
                  <button
                    key={campus.id}
                    type="button"
                    onClick={() => setSelectedId(campus.id)}
                    aria-pressed={isSelected}
                    className={`group flex w-full items-center gap-4 border-b border-[#dce4de] py-5 text-left transition-colors duration-300 sm:py-6 ${
                      isSelected
                        ? "text-[#08783f]"
                        : "text-[#123b2a] hover:text-[#08783f]"
                    }`}
                  >
                    <span
                      className={`w-8 shrink-0 text-[11px] tabular-nums transition-colors ${
                        isSelected ? "text-[#08783f]" : "text-[#8b968e]"
                      }`}
                    >
                      {campus.id}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[22px] font-medium tracking-[-0.045em] sm:text-[28px]">
                        {campus.city}
                      </span>
                      <span className="mt-1 block text-[11px] text-[#647069]">
                        {campus.region}
                      </span>
                    </span>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isSelected
                          ? "border-[#08783f] bg-[#08783f] text-white"
                          : "border-[#dce4de] text-[#123b2a] group-hover:border-[#08783f]"
                      }`}
                    >
                      <ArrowDownRight
                        size={17}
                        className={`transition-transform duration-300 ${
                          isSelected
                            ? "-rotate-45"
                            : "group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-5 text-[11px] leading-5 text-[#7a857d]">
              Addresses are based on publicly available listings. Please
              confirm the current campus address and visit arrangements with
              admissions before travelling.
            </p>
          </div>

          <div
            key={selected.id}
            className="relative flex min-h-[410px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#123b2a] p-6 text-white sm:min-h-[480px] sm:p-10 lg:p-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/[0.08]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/[0.08]"
            />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c9f36a]">
                  Selected location
                </p>
                <p className="mt-4 text-[12px] tabular-nums text-white/55">
                  CAMPUS / {selected.id}
                </p>
              </div>

              <MapPin size={23} strokeWidth={1.4} className="text-[#c9f36a]" />
            </div>

            <div className="relative mt-14">
              <h3 className="text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.07em]">
                {selected.city}
              </h3>

              <p className="mt-3 text-[13px] text-white/65">
                {selected.region}
              </p>

              <div className="mt-8 h-px w-full bg-white/15" />

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Location details
              </p>

              <p className="mt-3 max-w-[480px] text-[14px] leading-7 text-white/85">
                {selected.address}
              </p>
            </div>

            <div className="relative mt-10 flex flex-wrap items-center gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#c9f36a] px-5 text-[12px] font-semibold text-[#123b2a] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Open in Google Maps
                <Navigation size={15} />
              </a>

              <Link
                href="/admissions"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-5 text-[12px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Ask admissions
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
