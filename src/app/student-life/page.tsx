import type { Metadata } from "next";
import StudentLifePageContent from "@/components/student-life/StudentLifePageContent";

export const metadata: Metadata = {
  title: "Student Life | Dhanik Bharat",
  description:
    "A closer look at student life at Dhanik Bharat Educational Institutions.",
  openGraph: {
    title: "Student Life | Dhanik Bharat",
    description: "A closer look at student life at Dhanik Bharat Educational Institutions.",
    images: ["/images/hero/student.jpg"],
  },
};

export default function StudentLifePage() {
  return <StudentLifePageContent />;
}
