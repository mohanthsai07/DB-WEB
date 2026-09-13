"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Programs", href: "/programs" },
  { label: "Campus", href: "/campus" },
  { label: "Student Life", href: "/student-life" },
  { label: "About", href: "/about" },
  { label: "Admissions", href: "/admissions" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
            src="/logo/logonav.png"
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
            aria-label="Search"
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
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-[#dce3dd]
            bg-white
            text-[#123b2a]
            lg:hidden
          "
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
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