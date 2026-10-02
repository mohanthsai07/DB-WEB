import Link from "next/link";

export default function AdmissionsCTA() {
  return (
    <section className="bg-[#f7f8f4] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[24px] border border-[#dfe6df] bg-white shadow-[0_18px_60px_rgba(18,59,42,0.06)] sm:rounded-[30px]">
        <div className="grid lg:grid-cols-[1fr_360px]">
          <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#08783f] sm:text-[11px]">
                Admissions · Classes 11 &amp; 12
              </p>
            </div>

            <h2 className="max-w-[760px] text-[38px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#123b2a] sm:text-[52px] lg:text-[62px]">
              Build strong foundations.
              <br className="hidden sm:block" /> <span className="text-[#e50046]">Prepare for what’s next.</span>
            </h2>

            <p className="mt-6 max-w-[610px] text-[14px] leading-6 text-[#59655f] sm:text-[16px] sm:leading-7">
              Explore integrated intermediate education with focused preparation for JEE, NEET, BITSAT and Olympiads.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
  <Link
    href="/admissions"
    className="
      group
      relative
      inline-flex
      h-[52px]
      items-center
      gap-4
      overflow-hidden
      rounded-full
      bg-[#08783f]
      px-7
      text-[13px]
      font-semibold
      text-white
      transition-all
      duration-300
      ease-[cubic-bezier(.22,1,.36,1)]
      hover:-translate-y-[2px]
      hover:gap-6
      hover:bg-[#076b38]
      active:translate-y-0
    "
  >
    <span>Explore admissions</span>

    <span
      className="
        relative
        flex
        h-7
        w-7
        items-center
        justify-center
        overflow-hidden
        rounded-full
      "
    >
      {/* Arrow 1 */}
      <svg
        aria-hidden="true"
        className="
          absolute
          h-4
          w-4
          transition-all
          duration-300
          ease-[cubic-bezier(.22,1,.36,1)]
          group-hover:translate-x-6
          group-hover:opacity-0
        "
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M4 10h12m-5-5 5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Arrow 2 — launches in */}
      <svg
        aria-hidden="true"
        className="
          absolute
          h-4
          w-4
          -translate-x-6
          opacity-0
          transition-all
          duration-300
          ease-[cubic-bezier(.22,1,.36,1)]
          group-hover:translate-x-0
          group-hover:opacity-100
        "
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M4 10h12m-5-5 5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  </Link>

  <Link
    href="/programs"
    className="
      group
      inline-flex
      items-center
      gap-2
      text-[13px]
      font-semibold
      text-[#123b2a]
      transition-colors
      duration-300
      hover:text-[#08783f]
    "
  >
    <span>View our programs</span>

    <span
      className="
        h-px
        w-0
        bg-[#08783f]
        transition-all
        duration-300
        group-hover:w-5
      "
    />
  </Link>
</div>
          </div>

          <aside className="relative overflow-hidden bg-[#123b2a] px-6 py-8 text-white sm:px-10 sm:py-9 lg:px-10 lg:py-12">
            <div aria-hidden="true" className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c9e52c]">
                A focused path
              </p>
              <div className="my-6 h-px w-full bg-white/20" />
              <ul className="space-y-5 text-[13px] leading-5 text-white/85">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] text-[#c9e52c]">✓</span>
                  Integrated Classes 11 &amp; 12
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] text-[#c9e52c]">✓</span>
                  Mentoring and regular assessment
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] text-[#c9e52c]">✓</span>
                  Preparation for competitive exams
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
