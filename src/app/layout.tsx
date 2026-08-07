import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import GsapProvider from "@/components/animations/GsapProvider";
import CustomCursor from "@/components/animations/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Religare Broking | Financial Stock Trading Platform",
  description: "A clean, high-performance financial stock trading platform featuring real-time tickers, top gainers, intraday tools, and interactive stock charts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-emerald-500 selection:text-white font-sans">
        <GsapProvider>
          <CustomCursor />
          {children}
        </GsapProvider>
      </body>
    </html>
  );
}
