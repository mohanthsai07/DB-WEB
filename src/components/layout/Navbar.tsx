"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import {
  ChevronDown,
  Menu,
  Phone,
  Search,
  X,
  ArrowUpRight,
} from "lucide-react";

type NavChild = {
  label: string;
  href: string;
  detail?: string;
};

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "View All Programs", href: "/programs", detail: "Compare both pathways" },
      { label: "MPC + JEE", href: "/programs/jee", detail: "Engineering preparation" },
      { label: "BiPC + NEET", href: "/programs/neet", detail: "Medical preparation" },
    ],
  },
  { label: "Campuses", href: "/campus" },
  { label: "Results", href: "/results" },
  { label: "Student Life", href: "/student-life" },
  {
    label: "More",
    href: "/resources",
    children: [
      { label: "Admissions", href: "/admissions", detail: "Begin the admissions journey" },
      { label: "Resources", href: "/resources", detail: "Guidance for students and families" },
      { label: "Events", href: "/events", detail: "What is happening at DBI" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const searchablePages = [
  { label: "Programs", detail: "Explore academic pathways", href: "/programs" },
  { label: "IIT-JEE / MPC", detail: "Engineering pathway", href: "/programs/jee" },
  { label: "NEET / BiPC", detail: "Medical pathway", href: "/programs/neet" },
  { label: "Campuses", detail: "Learning environment", href: "/campus" },
  { label: "Student Life", detail: "Life beyond academics", href: "/student-life" },
  { label: "About Dhanik Bharat", detail: "Our institution and vision", href: "/about" },
  { label: "Admissions", detail: "Enquire about joining", href: "/admissions" },
  { label: "Contact", detail: "Start a conversation", href: "/contact" },
  { label: "Resources", detail: "Guidance for students and families", href: "/resources" },
  { label: "Results", detail: "Our approach to progress", href: "/results" },
  { label: "Events", detail: "What is happening at DBI", href: "/events" },
];

function isActivePath(pathname: string, href: string, children?: NavChild[]) {
  if (href === "/") return pathname === "/";
  if (pathname === href || pathname.startsWith(`${href}/`)) return true;
  return children?.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`)) ?? false;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement | null>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredPages = searchablePages.filter((page) =>
    `${page.label} ${page.detail}`.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const openDesktopDropdown = (label: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenDesktopMenu(label);
  };

  const scheduleDesktopClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenDesktopMenu(null), 160);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: globalThis.MouseEvent) => {
      if (!desktopNavRef.current?.contains(event.target as Node)) setOpenDesktopMenu(null);
    };
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenDesktopMenu(null);
      setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      searchTriggerRef.current?.focus();
    };
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  const openSearch = (event: MouseEvent<HTMLButtonElement>) => {
    searchTriggerRef.current = event.currentTarget;
    setMenuOpen(false);
    setOpenDesktopMenu(null);
    setSearchOpen(true);
  };

  const submitSearch = () => {
    const [firstResult] = filteredPages;
    if (!firstResult) return;
    router.push(firstResult.href);
    closeSearch();
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = searchPanelRef.current?.querySelectorAll<HTMLElement>(
      'input:not([disabled]), button:not([disabled]), a[href]',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-[100] w-full bg-white transition-shadow duration-200 ${
          scrolled ? "shadow-[0_8px_24px_rgba(18,59,42,0.09)]" : "border-b border-[#e5eae4]"
        }`}
      >
        <div className="border-b border-[#edf1ec]">
          <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
            <Link
              href="/"
              aria-label="Dhanik Bharat Educational Institutions"
              className="flex items-center focus-visible:outline-none"
            >
              <Image
                src="/logo/logo.png"
                alt="Dhanik Bharat Educational Institutions"
                width={3750}
                height={780}
                priority
                className="h-auto w-[190px] sm:w-[220px] lg:w-[240px]"
              />
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search"
                aria-haspopup="dialog"
                aria-expanded={searchOpen}
                aria-controls="site-search-dialog"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe6df] text-[#123b2a] transition hover:border-[#08783f] hover:text-[#08783f]"
              >
                <Search size={18} strokeWidth={1.8} />
              </button>
              <Link
                href="/contact"
                aria-label="Contact Dhanik Bharat"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe6df] text-[#123b2a] transition hover:border-[#08783f] hover:bg-[#f2f6f1] hover:text-[#08783f]"
              >
                <Phone size={17} strokeWidth={1.8} />
              </Link>
              <Link
                href="/admissions"
                className="ml-1 inline-flex h-10 items-center gap-2 rounded-full bg-[#08783f] px-5 text-[12px] font-bold text-white transition hover:bg-[#056532]"
              >
                Enquire Now
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search"
                aria-haspopup="dialog"
                aria-expanded={searchOpen}
                aria-controls="site-search-dialog"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#123b2a]"
              >
                <Search size={19} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe6df] text-[#123b2a]"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <nav
          ref={desktopNavRef}
          aria-label="Primary navigation"
          className="hidden h-[50px] lg:block"
        >
          <div className="mx-auto flex h-full max-w-[1440px] items-center justify-center gap-1 px-10">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href, item.children);
              const hasDropdown = Boolean(item.children?.length);
              const open = openDesktopMenu === item.label;

              return (
                <div
                  key={item.label}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => hasDropdown && openDesktopDropdown(item.label)}
                  onMouseLeave={scheduleDesktopClose}
                >
                  {hasDropdown ? (
                    <button
                      type="button"
                      onClick={() => openDesktopDropdown(open ? "" : item.label)}
                      aria-expanded={open}
                      aria-current={active ? "page" : undefined}
                      aria-controls={`desktop-submenu-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          setOpenDesktopMenu(null);
                          event.currentTarget.focus();
                        }
                      }}
                      className={`relative flex h-full items-center gap-1 px-[clamp(8px,1.05vw,16px)] text-[12.5px] font-semibold transition-colors ${
                        active ? "text-[#08783f]" : "text-[#123b2a] hover:text-[#08783f]"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        strokeWidth={2}
                        className={`transition-transform ${open ? "rotate-180" : ""}`}
                      />
                      <span className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#08783f] transition-transform ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex h-full items-center px-[clamp(8px,1.05vw,16px)] text-[12.5px] font-semibold transition-colors ${
                        active ? "text-[#08783f]" : "text-[#123b2a] hover:text-[#08783f]"
                      }`}
                    >
                      {item.label}
                      <span className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#08783f] transition-transform ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`} />
                    </Link>
                  )}

                  {hasDropdown && open && (
                    <div
                      id={`desktop-submenu-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                      onMouseEnter={() => openDesktopDropdown(item.label)}
                      onMouseLeave={scheduleDesktopClose}
                      className="absolute left-1/2 top-[50px] w-[310px] -translate-x-1/2 rounded-b-[12px] border border-t-0 border-[#e5eae4] bg-white p-2 shadow-[0_18px_44px_rgba(18,59,42,0.14)]"
                    >
                      {item.children?.map((child) => {
                        const childActive = pathname === child.href || pathname.startsWith(`${child.href}/`);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDesktopMenu(null)}
                            aria-current={childActive ? "page" : undefined}
                            className={`group flex items-center justify-between rounded-[8px] px-3 py-3 transition-colors ${
                              childActive ? "bg-[#edf4ec] text-[#08783f]" : "text-[#123b2a] hover:bg-[#f4f7f3]"
                            }`}
                          >
                            <span>
                              <span className="block text-[13px] font-semibold">{child.label}</span>
                              {child.detail && <span className="mt-0.5 block text-[11px] font-normal text-[#647069]">{child.detail}</span>}
                            </span>
                            <ArrowUpRight size={14} className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="absolute left-0 right-0 top-[68px] max-h-[calc(100vh-68px)] overflow-y-auto border-t border-[#e5eae4] bg-white px-4 pb-5 shadow-[0_18px_40px_rgba(18,59,42,0.12)] lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="mx-auto max-w-[720px] py-2">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href, item.children);
                const open = mobileSectionOpen === item.label;
                return (
                  <div key={item.label} className="border-b border-[#edf1ec]">
                    {item.children?.length ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setMobileSectionOpen(open ? null : item.label)}
                          aria-expanded={open}
                          aria-current={active ? "page" : undefined}
                          className={`flex w-full items-center justify-between py-4 text-[15px] font-semibold ${
                            active ? "text-[#08783f]" : "text-[#123b2a]"
                          }`}
                        >
                          {item.label}
                          <ChevronDown size={17} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>
                        {open && (
                          <div className="pb-3 pl-3">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMenuOpen(false)}
                                aria-current={pathname === child.href ? "page" : undefined}
                                className={`flex items-center justify-between rounded-[8px] px-3 py-3 text-[13px] font-semibold ${
                                  pathname === child.href ? "bg-[#edf4ec] text-[#08783f]" : "text-[#496055]"
                                }`}
                              >
                                {child.label}
                                <ArrowUpRight size={14} />
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between py-4 text-[15px] font-semibold ${
                          active ? "text-[#08783f]" : "text-[#123b2a]"
                        }`}
                      >
                        {item.label}
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />}
                      </Link>
                    )}
                  </div>
                );
              })}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 items-center justify-center rounded-full border border-[#dfe6df] text-sm font-bold text-[#123b2a]"
                >
                  Contact
                </Link>
                <Link
                  href="/admissions"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 items-center justify-center rounded-full bg-[#08783f] text-sm font-bold text-white"
                >
                  Enquire Now
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[12vh] sm:px-6 sm:pt-[15vh]">
          <button
            type="button"
            aria-label="Close search"
            onClick={closeSearch}
            className="absolute inset-0 h-full w-full cursor-default bg-[#071f15]/55"
          />
          <div
            id="site-search-dialog"
            ref={searchPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-search-title"
            onKeyDown={handleSearchKeyDown}
            className="relative z-10 w-full max-w-[680px] overflow-hidden rounded-[16px] border border-[#123b2a]/10 bg-[#f7f8f4] shadow-[0_30px_100px_rgba(7,31,21,0.28)]"
          >
            <div className="border-b border-[#123b2a]/10 p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#08783f]">Dhanik Bharat</p>
                  <h2 id="site-search-title" className="mt-2 text-xl font-semibold text-[#123b2a]">What are you looking for?</h2>
                </div>
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Close search"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#123b2a]/15 text-[#123b2a]"
                >
                  <X size={18} />
                </button>
              </div>
              <form
                role="search"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitSearch();
                }}
                className="flex items-center gap-3 rounded-full border border-[#123b2a]/15 bg-white px-4 focus-within:border-[#08783f]"
              >
                <Search size={18} />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search programs, campus, admissions..."
                  aria-label="Search this website"
                  className="h-12 min-w-0 flex-1 bg-transparent text-sm text-[#123b2a] outline-none placeholder:text-[#647069]"
                />
                <kbd className="hidden rounded border border-[#123b2a]/10 px-2 py-1 text-[10px] text-[#647069] sm:inline">ENTER</kbd>
              </form>
            </div>
            <div className="max-h-[52vh] overflow-y-auto p-3 sm:p-4">
              <p className="px-3 pb-2 pt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#647069]">
                {searchQuery.trim() ? "Search results" : "Explore"}
              </p>
              {filteredPages.length ? (
                <ul>
                  {filteredPages.map((page) => (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        onClick={closeSearch}
                        className="group flex items-center justify-between gap-4 rounded-[8px] px-3 py-3 hover:bg-white"
                      >
                        <span>
                          <span className="block text-sm font-semibold text-[#123b2a]">{page.label}</span>
                          <span className="mt-0.5 block text-xs text-[#647069]">{page.detail}</span>
                        </span>
                        <ArrowUpRight size={15} className="text-[#08783f]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-3 py-6 text-sm text-[#647069]" role="status">No matching pages. Try “programs”, “campus” or “admissions”.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
