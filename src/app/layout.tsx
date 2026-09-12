import type { Metadata, Viewport } from "next";
import { Righteous, Poppins } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Turntable } from "@/components/Turntable";
import { SceneTrack } from "@/components/SceneTrack";
import { AudioBackdrop } from "@/components/AudioBackdrop";
import { BootScreen } from "@/components/BootScreen";
import { HeaderProvider } from "@/components/HeaderVisibility";

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

const siteTitle = "Gesang Hemas Bayu Sekti | Personal Portfolio";
const siteDescription =
  "Personal portfolio of Gesang Hemas Bayu Sekti. Informatics student focused on Artificial Intelligence, software development, and emerging technologies.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Gesang Hemas Bayu Sekti",
    "portfolio",
    "AI engineer",
    "artificial intelligence",
    "computer vision",
    "President University",
  ],
  authors: [{ name: "Gesang Hemas Bayu Sekti" }],
  creator: "Gesang Hemas Bayu Sekti",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: siteTitle,
    description: siteDescription,
    siteName: "Gesang Hemas Bayu Sekti",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

/* Viewport lives in its own export (Next 14+ convention): paper-tinted
   browser chrome, light-only scheme (the site ships one light grade). */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f2ef",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${righteous.variable} bg-paper text-ink min-h-screen flex flex-col font-sans`}
      >
        <HeaderProvider>
          <BootScreen />
          <SceneTrack />
          <AudioBackdrop />
          <TopNav />
          <main className="relative flex-1 z-[1]">{children}</main>
          <Footer />
          <Chatbot />
          <MusicPlayer />
          <Turntable />
        </HeaderProvider>
      </body>
    </html>
  );
}
