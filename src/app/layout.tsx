import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { DialRoot } from "dialkit";
import "dialkit/styles.css";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Graham Bunt — Product Designer",
  description: "Product Designer based in Salt Lake City, Utah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${inter.variable} font-[family-name:var(--font-inter)] antialiased`}>
        {children}
        <DialRoot />
      </body>
    </html>
  );
}
