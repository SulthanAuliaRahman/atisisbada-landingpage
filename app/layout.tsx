// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google"; // ← fixed import name
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  // variable: "--font-poppins",    ← you can keep it, but not needed for this approach
  display: "swap", // ← good practice
});

export const metadata: Metadata = {
  title: "Atisisbada",
  description: "Atisisbada Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${poppins.className}
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}
      >
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}