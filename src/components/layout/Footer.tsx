import Link from "next/link";

const academicsLinks = [
  { label: "All programs", href: "/programs" },
  { label: "IIT-JEE · MPC", href: "/programs/jee" },
  { label: "NEET · BiPC", href: "/programs/neet" },
];

const exploreLinks = [
  { label: "About Dhanik Bharat", href: "/about" },
  { label: "Campus", href: "/campus" },
  { label: "Student life", href: "/student-life" },
  { label: "Events", href: "/events" },
];

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#123b2a]/55">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm text-[#123b2a]/80 transition-colors hover:text-[#08783f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08783f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f8f4]"
            >
              <span>{link.label}</span>
              <span
                aria-hidden="true"
                className="text-[#08783f] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function FooterSection() {
  return (
    <footer className="border-t border-[#123b2a]/10 bg-[#f7f8f4] text-[#123b2a]">
      <div className="mx-auto max-w-[1280px] px-5 pb-5 pt-12 sm:px-8 sm:pt-14 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.7fr_0.7fr_1fr] lg:gap-12">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Dhanik Bharat home"
              className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08783f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f8f4]"
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rotate-45 bg-[#e50046]"
              />
              <span className="text-lg font-semibold tracking-[-0.035em]">
                Dhanik Bharat
              </span>
            </Link>
            <p className="mt-4 max-w-[330px] text-sm leading-6 text-[#123b2a]/70">
              Strong foundations for Classes 11 and 12, with focused preparation
              for the next step.
            </p>
          </div>

          <FooterLinks title="Academics" links={academicsLinks} />
          <FooterLinks title="Explore" links={exploreLinks} />

          <div className="border-l-2 border-[#c9e52c] pl-5 sm:col-span-2 lg:col-span-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#123b2a]/55">
              Take the next step
            </p>
            <p className="mt-3 text-sm leading-6 text-[#123b2a]/80">
              Find the right program and begin your admissions journey.
            </p>
            <Link
              href="/admissions"
              className="mt-4 inline-flex min-h-10 items-center gap-3 bg-[#123b2a] px-4 text-sm font-medium text-[#f7f8f4] transition-colors hover:bg-[#08783f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50046] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f8f4]"
            >
              Admissions <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#123b2a]/15 pt-4 text-xs text-[#123b2a]/60 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dhanik Bharat Educational Institutions</p>
          <p>Learn · Prepare · Grow</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
