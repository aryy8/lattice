import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lattice",
  description: "Lattice reshapes your text through multiple language paths, creating a fresh expression while preserving the original idea.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


