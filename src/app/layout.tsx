import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://grahambunt.com"),
  title: "Graham Bunt — Product Designer",
  description:
    "Graham Bunt is a product designer leaning into scale and complexity, shaping direction, and driving teams to bring ambitious ideas to life.",
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/icon",
  },
  openGraph: {
    title: "Graham Bunt — Product Designer",
    description:
      "Graham Bunt is a product designer leaning into scale and complexity, shaping direction, and driving teams to bring ambitious ideas to life.",
    url: "https://grahambunt.com",
    siteName: "Graham Bunt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans-preview antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
