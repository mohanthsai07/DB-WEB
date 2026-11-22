import type { Metadata } from "next";
import ProgramDetailPage from "@/components/programs/ProgramDetailPage";

export const metadata: Metadata = {
  title: "MPC + JEE | Dhanik Bharat",
  description: "Explore the MPC pathway with focused preparation for JEE at Dhanik Bharat.",
};

export default function JeeProgramPage() {
  return <ProgramDetailPage stream="MPC" exam="JEE" subjects="Mathematics · Physics · Chemistry" title="A strong foundation for engineering aspirations." description="Study Mathematics, Physics and Chemistry through Intermediate education alongside preparation for the Joint Entrance Examination." image="/images/programs/mpc.png" accent="green" />;
}
