import type { Metadata } from "next";
import { Outfit, Rubik } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title:
    "GRITMANS GIGGLE AND CHUCKLE JOINT | Where your ribs break and your worries fade",
  description:
    "The official home of jokes, funny stories, laughter, memes and entertaining content at funnygritmanlaughters.com.",
  keywords: [
    "Gritmans Giggle",
    "comedy joint",
    "funny stories",
    "jokes",
    "Ghana comedy",
    "African humor",
    "chuckles",
    "gritmanslaughters.com",
  ],
  authors: [{ name: "Gritmans Giggle & Chuckle Joint" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${rubik.variable} ${outfit.variable} h-full antialiased`}
    >
      <Analytics />
      <body className='min-h-full flex flex-col font-sans bg-[#FFFDF7] text-[#121316] selection:bg-[#FFDE00] selection:text-black'>
        <Navbar />
        <main className='flex-1 w-full'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
