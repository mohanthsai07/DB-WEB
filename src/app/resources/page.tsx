import Link from "next/link";

const resourceGroups = [
  {
    number: "01",
    title: "Plan your pathway",
    description: "Understand the difference between MPC and BiPC, and find the route that fits your ambitions.",
    links: [
      ["Compare programmes", "/programs"],
      ["IIT-JEE / MPC", "/programs/jee"],
      ["NEET / BiPC", "/programs/neet"],
    ],
  },
  {
    number: "02",
    title: "Prepare with purpose",
    description: "Practical guidance for building consistent habits across Classes 11 and 12.",
    links: [
      ["Student life", "/student-life"],
      ["Our campus", "/campus"],
      ["Admissions", "/admissions"],
    ],
  },
  {
    number: "03",
    title: "Keep your week moving",
    description: "Use a simple rhythm: plan the week, protect focused study time, then review what needs another look.",
    links: [
      ["Learning environment", "/campus"],
      ["Student experience", "/student-life"],
      ["Track your progress", "/results"],
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="bg-[#f7f8f4]">
      <section className="border-b border-[#e5eae4] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:px-12">
        <div className="subpage-container">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#08783f]">The DBI library</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <h1 className="subpage-title max-w-[780px]">
              Make your next<br /><span className="text-[#e50046]">step clearer.</span>
            </h1>
            <p className="max-w-[390px] text-[15px] leading-7 text-[#647069]">
              A growing collection of guidance for students and families making important choices about intermediate education.
            </p>
          </div>
        </div>
      </section>

      <section className="subpage-section px-5 sm:px-8 lg:px-12">
        <div className="subpage-container">
          <div className="mb-10 flex items-end justify-between border-b border-[#e5eae4] pb-5">
            <h2 className="text-2xl font-semibold tracking-[-.04em] text-[#123b2a]">Explore the library</h2>
            <span className="hidden text-[10px] font-bold uppercase tracking-[.22em] text-[#647069] sm:block">Curated for Classes 11–12</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {resourceGroups.map((group) => (
              <article key={group.number} className="border-t-2 border-[#123b2a] bg-white p-6 sm:p-9">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-bold tracking-[.2em] text-[#e50046]">{group.number}</span>
                  <span className="h-3 w-3 rounded-full bg-[#c9f36a]" />
                </div>
                <h3 className="mt-10 text-[20px] font-semibold leading-tight tracking-[-.04em] text-[#123b2a] sm:text-[22px]">{group.title}</h3>
                <p className="mt-4 max-w-[470px] text-sm leading-6 text-[#647069]">{group.description}</p>
                <ul className="mt-8 border-t border-[#e5eae4]">
                  {group.links.map(([label, href]) => (
                    <li key={href} className="border-b border-[#e5eae4]">
                      <Link href={href} className="group flex items-center justify-between py-4 text-sm font-semibold text-[#123b2a] hover:text-[#08783f]">
                        {label}<span className="text-[#08783f] transition-transform group-hover:translate-x-1">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-5 grid gap-5 border-t border-[#e5eae4] pt-8 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#08783f]">A useful starting point</p>
              <h2 className="mt-3 max-w-[330px] text-3xl font-semibold leading-[.98] tracking-[-.06em] text-[#123b2a]">Clarity is a study skill.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Choose", "Compare the pathway before you commit."],
                ["02", "Build", "Create a repeatable study rhythm."],
                ["03", "Review", "Use feedback to choose the next step."],
              ].map(([number, title, copy]) => (
                <div key={number} className="border-l border-[#e5eae4] pl-4">
                  <span className="text-[10px] font-bold tracking-[.2em] text-[#e50046]">{number}</span>
                  <h3 className="mt-5 text-sm font-bold text-[#123b2a]">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#647069]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-5 bg-[#123b2a] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#c9f36a]">Need a conversation?</p>
              <p className="mt-2 text-lg font-medium tracking-[-.02em]">Our admissions team can help you choose with confidence.</p>
            </div>
            <Link href="/admissions" className="inline-flex w-fit items-center gap-4 bg-[#c9f36a] px-5 py-3 text-sm font-bold text-[#123b2a] hover:bg-white">Talk to us <span>→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
