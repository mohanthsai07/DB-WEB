
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
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
        {title}
      </h2>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 font-normal text-sm tracking-[0.01em] text-white/75 transition-colors duration-200 hover:text-[#c9e52c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9e52c] focus-visible:ring-offset-4 focus-visible:ring-offset-[#123b2a]"
            >
              <span>{link.label}</span>

              <span
                aria-hidden="true"
                className="text-[#c9e52c] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
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
    <footer className="border-t border-white/10 bg-[#123b2a] font-sans text-white">
      <div className="mx-auto max-w-[1280px] px-5 pb-5 pt-12 sm:px-8 sm:pt-14 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.7fr_0.7fr_1fr] lg:gap-12">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Dhanik Bharat home"
              className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9e52c] focus-visible:ring-offset-4 focus-visible:ring-offset-[#123b2a]"
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rotate-45 bg-[#e50046]"
              />

              <span className="text-lg font-semibold tracking-[-0.035em] text-white">
                Dhanik Bharat
              </span>
            </Link>

            <p className="mt-4 max-w-[330px] text-sm font-normal leading-7 tracking-[0.01em] text-white/65">
              Strong foundations for Classes 11 and 12, with focused preparation
              for the next step.
            </p>
          </div>

          {/* Academics */}
          <FooterLinks title="Academics" links={academicsLinks} />

          {/* Explore */}
          <FooterLinks title="Explore" links={exploreLinks} />

          {/* Admissions */}
          <div className="border-l-2 border-[#c9e52c] pl-5 sm:col-span-2 lg:col-span-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Take the next step
            </p>

            <p className="mt-3 text-sm font-normal leading-7 tracking-[0.01em] text-white/75">
              Find the right program and begin your admissions journey.
            </p>

            <Link
              href="/admissions"
              className="mt-4 inline-flex min-h-10 items-center gap-3 bg-[#c9e52c] px-4 text-sm font-semibold tracking-[0.01em] text-[#123b2a] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#123b2a]"
            >
              Admissions
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-4 text-xs font-normal tracking-[0.02em] text-white/55 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Dhanik Bharat Educational Institutions
          </p>

          <p className="tracking-[0.04em]">Learn · Prepare · Grow</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
