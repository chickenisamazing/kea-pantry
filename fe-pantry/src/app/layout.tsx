import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

import Navbar from "../component/Navbar";

const pretendard = localFont({
  src: ".././font/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${pretendard.className}`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
