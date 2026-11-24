
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  Mail,
} from "lucide-react";

import CampusCatalogue from "@/components/campus/CampusCatalogue";
import { campuses, cities } from "@/data/campuses";

export const metadata: Metadata = {
  title: "Our Campuses | Dhanik Bharat",
  description: `Explore all ${campuses.length} Dhanik Bharat campuses across ${cities.join(", ")}.`,
};

export default function CampusPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#123b2a]">

      {/* CAMPUS CATALOGUE */}

      <CampusCatalogue />

      {/* COMPACT ADMISSIONS SECTION */}

      <section className="px-3 pb-8 pt-2 sm:px-6 sm:pb-12 lg:px-12">

        <div className="mx-auto max-w-[1320px]">

          <div className="rounded-2xl border border-[#dce5da] bg-[#edf3e9] p-5 sm:p-7">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <p className="text-xs font-semibold text-[#e50046]">
                  Admissions support
                </p>

                <h2 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">
                  Need help choosing a campus?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#647069]">
                  Our admissions team is here to guide you.
                </p>

              </div>

              <Link
                href="/admissions"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-xl bg-[#123b2a] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#08783f]"
              >
                Contact admissions
                <ArrowUpRight size={16} />
              </Link>

            </div>

            {/* QUICK CONTACT */}

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#d5e1d1] pt-4">

              <a
                href="tel:+919555825559"
                className="flex min-h-9 items-center gap-2 text-xs font-medium sm:text-sm"
              >
                <Phone
                  size={15}
                  className="text-[#08783f]"
                />

                +91 955582 5559
              </a>

              <a
                href="mailto:info@dhanikbharat.org"
                className="flex min-h-9 items-center gap-2 break-all text-xs font-medium sm:text-sm"
              >
                <Mail
                  size={16}
                  className="shrink-0 text-[#08783f]"
                />

                info@dhanikbharat.org
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
