import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, MapPin, Navigation } from "lucide-react";
import { campuses, cities, type Campus } from "@/data/campuses";

export const metadata: Metadata = {
  title: "Our Campuses | Dhanik Bharat",
  description: "Explore all 16 Dhanik Bharat campuses across Hyderabad, Vijayawada, Guntur and Vizag.",
};

function CampusCard({ campus }: { campus: Campus }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campus.mapsQuery)}`;
  return (
    <article id={`campus-${campus.id}`} className="group border-t-2 border-[#123b2a] bg-[#fdfdfb] p-2 pb-5">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8eee7]">
        <Image src={campus.image} alt={`${campus.name} ${campus.area}, ${campus.city}`} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 bg-[#fdfdfb]/95 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#123b2a]">CAMPUS / {campus.id}</span>
      </div>
      <div className="px-2 pt-5 sm:px-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#08783f]">{campus.audience}</p>
        <h3 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.04em] text-[#123b2a]">{campus.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#647069]"><MapPin size={13} />{campus.area}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="border border-[#dce4de] px-2.5 py-1 text-[10px] leading-4 text-[#647069]">{campus.type}</span>
        </div>
        <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-5 flex min-h-11 items-center justify-between rounded-full bg-[#08783f] px-4 text-[12px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f]">
          <span className="flex items-center gap-2"><Navigation size={14} /> Open campus map</span><ArrowUpRight size={15} />
        </a>
      </div>
    </article>
  );
}

export default function CampusPage() {
  return (
    <main className="campus-page overflow-hidden bg-[#f7f8f4]">
      <section className="subpage-hero px-5 sm:px-8 lg:px-12">
        <div className="subpage-container">
          <p className="subpage-kicker flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />The branch directory / 16 campuses</p>
          <div className="mt-7 grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h1 className="subpage-title max-w-[900px]">Find your<br /><span className="text-[#e50046]">place to grow.</span></h1>
            <div className="max-w-[410px] pb-1 lg:justify-self-end">
              <p className="text-[14px] leading-7 text-[#647069] sm:text-[15px]">Sixteen distinct campuses across four cities, each with its own rhythm, community and route to a bigger future.</p>
              <a href="#campus-list" className="subpage-button mt-6 bg-[#123b2a] text-[12px] text-white">Explore locations <ArrowDownRight size={16} /></a>
            </div>
          </div>
          <nav aria-label="Campus cities" className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-y border-[#dce4de] py-5 sm:mt-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#647069]">Browse by city</span>
            {cities.map((city) => <a key={city} href={`#${city.toLowerCase()}`} className="text-[12px] font-semibold text-[#123b2a] underline decoration-[#c9d5ca] underline-offset-4">{city}</a>)}
          </nav>
        </div>
      </section>

      <section id="campus-list" className="scroll-mt-8 px-5 pb-14 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
        <div className="subpage-container">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#08783f]">Real locations, real communities</p><h2 className="subpage-section-title mt-3">Explore the network.</h2></div>
            <p className="max-w-[310px] text-[12px] leading-6 text-[#647069]">Open any campus to get directions, or contact admissions before planning your visit.</p>
          </div>
          <div className="space-y-16 sm:space-y-24">
            {cities.map((city) => {
              const cityCampuses = campuses.filter((campus) => campus.city === city);
              return <section key={city} id={city.toLowerCase()} className="scroll-mt-8">
                <div className="mb-6 flex items-end justify-between border-b border-[#dce4de] pb-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#08783f]">{cityCampuses[0].state}</p><h2 className="mt-2 text-[32px] font-semibold tracking-[-0.05em] text-[#123b2a] sm:text-[42px]">{city}</h2></div><span className="text-[11px] tabular-nums text-[#647069]">{String(cityCampuses.length).padStart(2, "0")} campuses</span></div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{cityCampuses.map((campus) => <CampusCard key={campus.id} campus={campus} />)}</div>
              </section>;
            })}
          </div>
        </div>
      </section>

      <section className="subpage-section bg-[#123b2a] px-5 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[720px]"><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c9f36a]">Admissions desk</p><h2 className="subpage-section-title mt-5">Your next chapter<br />starts here.</h2><p className="mt-5 max-w-[620px] text-[14px] leading-7 text-white/70">info@dhanikbharat.org · +91 955582 5559<br />Registered Office: Unit No. 3A, Wing B, 2nd Floor, Times Square, Marol, Andheri (East), Mumbai 400059<br />Corporate Office: Sai Plaza, MIG 366, 4th Floor, KPHB Colony, Kukatpally, Hyderabad, Telangana 500072</p></div>
          <Link href="/admissions" className="inline-flex min-h-12 w-fit shrink-0 items-center gap-3 rounded-full bg-[#c9f36a] px-6 text-[12px] font-semibold text-[#123b2a]">Contact admissions <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
