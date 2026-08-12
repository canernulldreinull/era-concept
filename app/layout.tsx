import type { Metadata } from "next";
import CookieBanner from "@/components/store/CookieBanner";
import { Geist, Geist_Mono } from "next/font/google";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import { CartProvider } from "@/components/cart/CartProvider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Era Concept",
  description: "Mobilya ve ev yaşam ürünleri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <CartProvider>{children}</CartProvider>
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}