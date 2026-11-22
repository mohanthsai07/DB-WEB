const principles = [
  { index: "01", title: "Intermediate subjects", copy: "Study the subject combination aligned with your chosen stream." },
  { index: "02", title: "Entrance preparation", copy: "Prepare for JEE through MPC or NEET through BiPC as part of the academic journey." },
  { index: "03", title: "A clear next step", copy: "Explore the pathway and speak with the admissions team about fit and next steps." },
];

export default function ProgramFeatures() {
  return (
    <section className="subpage-section bg-[#123b2a] px-5 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <p className="text-xs font-bold tracking-[0.06em] text-[#c9f36a]">How the pathways connect</p>
          <h2 className="subpage-section-title max-w-[780px] text-white">Intermediate learning with a focused entrance direction.</h2>
        </div>
        <ol className="mt-9 grid border-t border-white/20 md:mt-14 md:grid-cols-3">
          {principles.map((item) => (
            <li key={item.index} className="border-b border-white/20 py-5 md:border-b-0 md:border-r md:px-7 md:py-8 md:first:pl-0 md:last:border-r-0">
              <span className="font-mono text-[10px] text-[#c9f36a]">{item.index}</span>
              <h3 className="mt-4 text-[20px] font-medium tracking-[-0.025em] md:mt-5">{item.title}</h3>
              <p className="mt-3 max-w-[310px] text-[13px] leading-6 text-white/65">{item.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
