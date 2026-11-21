import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import FooterSection from "@/components/layout/Footer";
import AIChatbot from "@/components/ai/AIChatbot";
const manrope = Manrope({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhanik Bharat Educational Institutions",
  description: "Dhanik Bharat Educational Institutions",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Navbar />
        {children}
        <FooterSection />
        <AIChatbot />
      </body>
    </html>
  );
}
