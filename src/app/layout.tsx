import type { Metadata } from "next";
import { IBM_Plex_Sans, Instrument_Serif, JetBrains_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SceneTrack } from "@/components/SceneTrack";

const ibmPlex = IBM_Plex_Sans({
  variable: "--body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal"],
});

const jetbrains = JetBrains_Mono({
  variable: "--mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const dancingScript = Dancing_Script({
  variable: "--script",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Gesang Hemas Bayu Sekti — Personal Portfolio",
  description:
    "Personal portfolio of Gesang Hemas Bayu Sekti — Informatics student focused on Artificial Intelligence, software development, and emerging technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlex.variable} ${instrumentSerif.variable} ${jetbrains.variable} ${dancingScript.variable} bg-paper text-ink min-h-screen flex flex-col font-sans`}
      >
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
