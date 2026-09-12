import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    number: "01",
    stream: "MPC",
    title: "Engineering",
    exams: "JEE · BITSAT · Olympiads",
    description:
      "Strong foundations in Mathematics, Physics and Chemistry with focused preparation for competitive examinations.",
    image: "/images/programs/jee.jpg",
    accent: "#08783F",
    href: "/programs/jee",
  },
  {
    number: "02",
    stream: "BiPC",
    title: "Medicine",
    exams: "NEET · Medical Preparation",
    description:
      "A structured academic journey combining Intermediate education with focused preparation for medical entrance examinations.",
    image: "/images/programs/neet.jpg",
    accent: "#E50046",
    href: "/programs/neet",
  },
];

export default function Programs() {
  return (
    <section className="bg-[#f7f8f4] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1320px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div className="max-w-[760px]">

            <div className="mb-5 flex items-center gap-3">

              <span className="h-[6px] w-[6px] rounded-full bg-[#08783f]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#08783f]">
                Our Programmes
              </span>

            </div>

            <h2 className="text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] text-[#123b2a] sm:text-[56px] lg:text-[68px]">

              Choose the path
              <br />

              that shapes your{" "}

              <span className="text-[#e50046]">
                future.
              </span>

            </h2>

          </div>


          <p className="max-w-[390px] text-[14px] leading-6 text-[#647069] lg:pb-1">
            Integrated Intermediate education with focused preparation
            for the next step in your journey.
          </p>

        </div>


        {/* =====================================================
            PROGRAMMES
        ====================================================== */}

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2">

          {programs.map((program) => (

            <Link
              key={program.number}
              href={program.href}
              className="group relative block overflow-hidden rounded-[24px] sm:rounded-[28px]"
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="relative h-[430px] sm:h-[500px] lg:h-[520px]">

                <Image
                  src={program.image}
                  alt={`${program.title} programme`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />


                {/* OVERLAY */}

                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#031b11]/90 via-[#031b11]/20 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-r from-[#031b11]/25 to-transparent" />


                {/* =================================================
                    TOP INFO
                ================================================= */}

                <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">

                  <div className="flex items-center gap-3">

                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                      style={{ color: program.accent }}
                    >
                      {program.stream}
                    </span>

                    <span className="h-px w-6 bg-white/40" />

                    <span className="text-[9px] uppercase tracking-[0.16em] text-white/60">
                      Classes 11 & 12
                    </span>

                  </div>


                  <span className="font-mono text-[10px] text-white/55">
                    {program.number}
                  </span>

                </div>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-9">

                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: program.accent }}
                  >
                    {program.exams}
                  </p>


                  <h3 className="mt-3 text-[38px] font-semibold leading-none tracking-[-0.05em] text-white sm:text-[48px] lg:text-[52px]">
                    {program.title}
                  </h3>


                  <p className="mt-3 max-w-[430px] text-[13px] leading-6 text-white/70 sm:text-[14px]">
                    {program.description}
                  </p>


                  {/* CTA */}

                  <div className="mt-5 flex items-center gap-3">

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#123b2a] transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>

                    <span className="text-[11px] font-semibold text-white">
                      Explore Programme
                    </span>

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>


        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div className="mt-6 flex items-center justify-between border-t border-[#dce4de] pt-5">

          <p className="text-[9px] uppercase tracking-[0.2em] text-[#929c96]">
            JEE · NEET · BITSAT · Olympiads
          </p>

          <Link
            href="/programs"
            className="group flex items-center gap-3 text-[11px] font-semibold text-[#123b2a]"
          >
            View all programmes

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

          </Link>

        </div>

      </div>
    </section>
  );
}