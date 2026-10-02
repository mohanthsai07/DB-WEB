"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

const navItems = [
  { label: "Programs", href: "/programs" },
  { label: "Campus", href: "/campus" },
  { label: "Student Life", href: "/student-life" },
  { label: "About", href: "/about" },
  { label: "Admissions", href: "/admissions" },
];

const searchablePages = [
  { label: "Programs", detail: "Explore academic pathways", href: "/programs" },
  { label: "IIT-JEE / MPC", detail: "Engineering pathway", href: "/programs/jee" },
  { label: "NEET / BiPC", detail: "Medical pathway", href: "/programs/neet" },
  { label: "Campus", detail: "Learning environment", href: "/campus" },
  { label: "Student Life", detail: "Life beyond academics", href: "/student-life" },
  { label: "About Dhanik Bharat", detail: "Our institution and vision", href: "/about" },
  { label: "Admissions", detail: "Enquire about joining", href: "/admissions" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filteredPages = searchablePages.filter((page) =>
    `${page.label} ${page.detail}`.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
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

  const openSearch = (event: MouseEvent<HTMLButtonElement>) => {
    searchTriggerRef.current = event.currentTarget;
    setMenuOpen(false);
    setSearchOpen(true);
  };

  const submitSearch = () => {
    const [firstResult] = filteredPages;
    if (!firstResult) return;
    router.push(firstResult.href);
    closeSearch();
  };

  return (
    <>
    <header
      className="
        sticky
        top-0
        z-[100]
        w-full
        border-b
        border-[#e7ebe6]
        bg-[#f7f8f4]/95
        backdrop-blur-xl
      "
    >
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center"
          aria-label="Dhanik Bharat Educational Institutions"
        >
          <Image
            src="/logo/logo1.png"
            alt="Dhanik Bharat Educational Institutions"
            width={225}
            height={65}
            priority
            className="h-auto w-[185px] sm:w-[205px]"
          />
        </Link>


        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                group
                relative
                py-2
                text-[13px]
                font-medium
                text-[#26362e]
                transition-colors
                duration-200
                hover:text-[#08783f]
              "
            >
              {item.label}

              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  rounded-full
                  bg-[#08783f]
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="hidden items-center gap-4 lg:flex">

          {/* Search */}
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search"
            aria-haspopup="dialog"
            aria-expanded={searchOpen}
            aria-controls="site-search-dialog"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-[#123b2a]
              transition
              hover:bg-[#e8eee7]
            "
          >
            <SearchIcon />
          </button>

          {/* CTA */}
          <Link
            href="/admissions"
            className="
              group
              inline-flex
              h-[48px]
              items-center
              gap-5
              rounded-full
              bg-[#08783f]
              px-6
              text-[13px]
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#056532]
            "
          >
            Enquire Now

            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search"
            aria-haspopup="dialog"
            aria-expanded={searchOpen}
            aria-controls="site-search-dialog"
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#123b2a] transition hover:bg-[#e8eee7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08783f]"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="
              flex h-11 w-11 items-center justify-center rounded-full
              border border-[#dce3dd] bg-white text-[#123b2a]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08783f]
            "
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="
            absolute
            left-0
            right-0
            top-[78px]
            border-t
            border-[#e4e9e4]
            bg-[#f7f8f4]
            px-5
            pb-6
            shadow-[0_20px_40px_rgba(18,59,42,0.08)]
            lg:hidden
          "
        >
          <nav className="mx-auto max-w-[1440px]">

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#e4e9e4]
                  py-5
                  text-[15px]
                  font-medium
                  text-[#173e30]
                "
              >
                {item.label}

                <span className="text-[#08783f]">
                  →
                </span>
              </Link>
            ))}

            <Link
              href="/admissions"
              onClick={() => setMenuOpen(false)}
              className="
                mt-5
                flex
                h-[50px]
                items-center
                justify-center
                rounded-full
                bg-[#08783f]
                text-sm
                font-semibold
                text-white
              "
            >
              Enquire Now
            </Link>

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
            className="absolute inset-0 h-full w-full cursor-default bg-[#071f15]/55 backdrop-blur-[3px]"
          />
          <div
            id="site-search-dialog"
            ref={searchPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-search-title"
            onKeyDown={handleSearchKeyDown}
            className="relative z-10 w-full max-w-[680px] overflow-hidden rounded-[22px] border border-[#123b2a]/10 bg-[#f7f8f4] shadow-[0_30px_100px_rgba(7,31,21,0.28)] sm:rounded-[28px]"
          >
            <div className="border-b border-[#123b2a]/10 p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#08783f]">Dhanik Bharat</p>
                  <h2 id="site-search-title" className="mt-2 text-xl font-semibold tracking-[-0.035em] text-[#123b2a]">What are you looking for?</h2>
                </div>
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Close search"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#123b2a]/15 text-lg text-[#123b2a] transition hover:bg-[#e8eee7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08783f]"
                >
                  ×
                </button>
              </div>
              <form
                role="search"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitSearch();
                }}
                className="flex items-center gap-3 rounded-full border border-[#123b2a]/15 bg-white px-4 focus-within:border-[#08783f] focus-within:ring-2 focus-within:ring-[#08783f]/15"
              >
                <SearchIcon />
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
              <p className="px-3 pb-2 pt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#647069]">
                {searchQuery.trim() ? "Search results" : "Explore"}
              </p>
              {filteredPages.length ? (
                <ul>
                  {filteredPages.map((page) => (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        onClick={closeSearch}
                        className="group flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08783f]"
                      >
                        <span>
                          <span className="block text-sm font-medium text-[#123b2a]">{page.label}</span>
                          <span className="mt-0.5 block text-xs text-[#647069]">{page.detail}</span>
                        </span>
                        <span aria-hidden="true" className="text-[#08783f] transition-transform group-hover:translate-x-1">↗</span>
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


/* SEARCH */

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}


/* MENU */

function MenuIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}


/* CLOSE */

function CloseIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}
