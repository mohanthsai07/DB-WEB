import type { Metadata } from "next";
import ProgramDetailPage from "@/components/programs/ProgramDetailPage";

export const metadata: Metadata = {
  title: "BiPC + NEET | Dhanik Bharat",
  description: "Explore the BiPC pathway with focused preparation for NEET at Dhanik Bharat.",
};

export default function NeetProgramPage() {
  return <ProgramDetailPage stream="BiPC" exam="NEET" subjects="Biology · Physics · Chemistry" title="Build the foundations for a future in medicine." description="Study Biology, Physics and Chemistry through Intermediate education alongside preparation for the National Eligibility cum Entrance Test." image="/images/programs/bipc.png" accent="pink" />;
}
