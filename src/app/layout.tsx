import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-sans-preview antialiased">
        {children}
      </body>
    </html>
  );
}
