import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxe Engine | Premium Real Estate",
  description: "Curating exceptional living. Exclusive estates and architectural masterpieces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-black text-white flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <div className="flex-1">
          {children}
        </div>
        <footer className="py-6 mt-12 text-center border-t border-white/10 bg-black">
          <p className="text-xs text-neutral-500 font-light tracking-wide uppercase">
            &copy; {new Date().getFullYear()} Luxe Engine Realty. All rights reserved.
          </p>
        </footer>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
