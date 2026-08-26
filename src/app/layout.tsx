import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://grahambunt.com"),
  title: "Graham Bunt — Product Designer",
  description:
    "Graham Bunt is a product designer leaning into scale and complexity, shaping direction, and helping teams to bring ambitious ideas to life.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/icon",
  },
  openGraph: {
    title: "Graham Bunt — Product Designer",
    description:
      "Graham Bunt is a product designer leaning into scale and complexity, shaping direction, and helping teams to bring ambitious ideas to life.",
    url: "https://grahambunt.com",
    siteName: "Graham Bunt",
    images: [
      {
        url: "/home-hero-portrait.jpg",
        width: 1000,
        height: 978,
        alt: "Graham Bunt",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Graham Bunt — Product Designer",
    description:
      "Graham Bunt is a product designer leaning into scale and complexity, shaping direction, and helping teams to bring ambitious ideas to life.",
    images: ["/home-hero-portrait.jpg"],
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
