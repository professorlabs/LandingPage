import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Osman Hadi Archive - বাংলাদেশের বীর সন্তানদের স্মরণে",
  description: "এই ওয়েবসাইটে আমরা সেই সকল সাহসী মানুষদের আর্কাইভ করি যারা বাংলাদেশের জন্য জীবন উৎসর্গ করেছেন। সৎ, দেশপ্রেমিক এবং নিঃস্বার্থ বীরদের স্মৃতি চিরকাল অম্লান থাকবে।",
  keywords: ["Bangladesh", "heroes", "martyrs", "archive", "Osman Hadi", "freedom fighters"],
  icons: {
    icon: "/osman-hadi.png",
    apple: "/osman-hadi.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="background-container">
          <Image
            src="/greatbengalregime.png"
            alt="Great Bengal Regime Background"
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
          <div className="background-overlay"></div>
        </div>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

