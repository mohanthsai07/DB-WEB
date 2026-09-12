import type { NavigationItem } from "@/types/navigation";

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "IIT-JEE / MPC", href: "/programs/jee" },
      { label: "NEET / BiPC", href: "/programs/neet" },
    ],
  },
  { label: "Why Dhanik Bharat", href: "/about" },
  { label: "Campus", href: "/campus" },
  { label: "Results", href: "/results" },
  { label: "Student Life", href: "/student-life" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Admissions", href: "/admissions" },
];
