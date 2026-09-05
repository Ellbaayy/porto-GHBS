import type { Metadata } from "next";
import { Righteous, Poppins } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SceneTrack } from "@/components/SceneTrack";
import { BootScreen } from "@/components/BootScreen";

const righteous = Righteous({
  variable: "--display",
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  variable: "--body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Gesang Hemas Bayu Sekti | Personal Portfolio",
  description:
    "Personal portfolio of Gesang Hemas Bayu Sekti. Informatics student focused on Artificial Intelligence, software development, and emerging technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${righteous.variable} bg-paper text-ink min-h-screen flex flex-col font-sans`}
      >
        <BootScreen />
        <SceneTrack />
        <TopNav />
        <main className="relative flex-1 z-[1]">{children}</main>
        <Footer />
        <Chatbot />
        <MusicPlayer />
      </body>
    </html>
  );
}
