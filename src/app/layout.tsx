import type { Viewport } from "next";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://porto-ghbs.vercel.app"),
};

/* The interactive site supplies its own <html>/<body> chrome inside the
   (site) route group; /print deliberately renders standalone so no nav,
   chatbot, or display fonts leak into the printed document. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f2ef",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
