import Link from "next/link";

const signals = [
  ["01", "Strong fundamentals", "Clear concepts that travel beyond a single test."],
  ["02", "Steady progress", "Regular assessments turn effort into visible momentum."],
  ["03", "Right-fit guidance", "Mentors help every student focus on their next best step."],
];

const reporting = [
  ["Academic year", "2025–26", "Current reporting cycle"],
  ["Programme scorecards", "Being compiled", "Published after verification"],
  ["Student stories", "Coming soon", "Outcome-led profiles in progress"],
];

export default function ResultsPage() {
  return (
    <main className="bg-[#f7f8f4]">
      <section className="bg-[#123b2a] px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-12">
        <div className="subpage-container grid gap-12 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#c9f36a]">Progress, not pressure</p>
            <h1 className="subpage-title mt-6 max-w-[750px] text-white">
              Results are<br /><span className="text-[#c9f36a]">built daily.</span>
            </h1>
          </div>
          <p className="max-w-[390px] text-[15px] leading-7 text-white/70">We believe meaningful results come from strong foundations, honest feedback and the confidence to keep going.</p>
        </div>
      </section>
      <section className="subpage-section px-5 sm:px-8 lg:px-12">
        <div className="subpage-container">
          <div className="grid gap-8 border-b border-[#dce4de] pb-14 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#08783f]">Our approach</p>
              <h2 className="subpage-section-title mt-5 max-w-[400px]">The work behind the outcome.</h2>
            </div>
            <div className="grid divide-y divide-[#dce4de] border-y border-[#dce4de]">
              {signals.map(([number, title, description]) => (
                <div key={number} className="grid gap-3 py-6 sm:grid-cols-[70px_1fr]">
                  <span className="text-xs font-bold tracking-[.18em] text-[#e50046]">{number}</span>
                  <div><h3 className="font-semibold text-[#123b2a]">{title}</h3><p className="mt-2 max-w-[470px] text-sm leading-6 text-[#647069]">{description}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-8 border-b border-[#dce4de] py-14 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#08783f]">Results desk</p>
              <h2 className="subpage-section-title mt-5 max-w-[420px]">Evidence, when it is ready.</h2>
              <p className="mt-5 max-w-[390px] text-sm leading-6 text-[#647069]">We are assembling verified programme and student outcomes rather than publishing estimates. This is the reporting view to check for the latest update.</p>
            </div>
            <div className="divide-y divide-[#dce4de] border-y border-[#dce4de]">
              {reporting.map(([label, value, note]) => (
                <div key={label} className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#647069]">{label}</p><p className="mt-2 text-sm text-[#123b2a]">{note}</p></div>
                  <span className="w-fit bg-[#eaf4e1] px-3 py-2 text-sm font-bold text-[#08783f]">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5 py-14 md:grid-cols-3">
            {[
              ["01", "What we measure", "Concept confidence, assessment consistency and progress across the year."],
              ["02", "What gets checked", "Programme, year and cohort details are reviewed before publication."],
              ["03", "What to do now", "Explore the pathways and speak with admissions about your goals."],
            ].map(([number, title, copy]) => (
              <article key={number} className="border-t-2 border-[#c9f36a] bg-white p-6">
                <span className="text-[10px] font-bold tracking-[.2em] text-[#e50046]">{number}</span>
                <h3 className="mt-10 text-xl font-semibold tracking-[-.04em] text-[#123b2a]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#647069]">{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 flex flex-col gap-6 border-l-2 border-[#e50046] pl-6 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-xl font-semibold tracking-[-.03em] text-[#123b2a]">Want to understand the right programme for you?</p><p className="mt-2 text-sm text-[#647069]">Explore our focused pathways or speak with admissions.</p></div>
            <Link href="/programs" className="inline-flex w-fit items-center gap-4 bg-[#08783f] px-5 py-3 text-sm font-bold text-white hover:bg-[#123b2a]">Explore programmes <span>→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
