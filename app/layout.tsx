import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "./footer";
import Script from 'next/script'; // Import next/script for Google Analytics

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learning Era",
  description: "Check your SSC CGL 2024 Result here.",
  icons: {
    icon: "https://cdn.jsdelivr.net/gh/jangirankit5/cdn/learning%20era%20website/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://cdn.jsdelivr.net/gh/jangirankit5/cdn/learning%20era%20website/images/logo.jpg" />
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KMKSJXHN3N" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KMKSJXHN3N');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-200 text-black`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
