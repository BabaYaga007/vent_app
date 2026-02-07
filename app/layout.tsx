import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vent - Ideas & Debate Forum",
  description: "Share ideas and engage in thoughtful debates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
