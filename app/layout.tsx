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
  metadataBase: new URL("https://eraconcept.com.tr"),

  title: {
    default: "Era Concept | Modern Mobilya ve Yaşam Alanları",
    template: "%s | Era Concept",
  },

  description:
    "Era Concept; oturma odası, yemek odası, yatak odası, TV ünitesi, çalışma alanı ve kitaplık koleksiyonlarıyla modern yaşam alanları sunar.",

  keywords: [
    "Era Concept",
    "mobilya",
    "modern mobilya",
    "oturma odası",
    "yemek odası",
    "yatak odası",
    "TV ünitesi",
    "çalışma masası",
    "kitaplık",
    "Tuzla mobilya",
    "İstanbul mobilya",
  ],

  authors: [
    {
      name: "Era Concept",
    },
  ],

  creator: "Era Concept",
  publisher: "Era Concept",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://eraconcept.com.tr",
    siteName: "Era Concept",
    title: "Era Concept | Modern Mobilya ve Yaşam Alanları",
    description:
      "Modern yaşam alanları için oturma odası, yemek odası, yatak odası ve tamamlayıcı mobilya koleksiyonlarını keşfedin.",
    images: [
      {
        url: "/images/home/hero-salon.jpg",
        width: 1200,
        height: 630,
        alt: "Era Concept Mobilya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Era Concept | Modern Mobilya ve Yaşam Alanları",
    description:
      "Modern yaşam alanları için Era Concept mobilya koleksiyonlarını keşfedin.",
    images: ["/images/home/hero-salon.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "Era Concept",
  url: "https://eraconcept.com.tr",
  logo: "https://eraconcept.com.tr/era-concept-logo.png",
  image: "https://eraconcept.com.tr/images/home/hero-salon.jpg",
  description:
    "Era Concept; oturma odası, yemek odası, yatak odası, TV ünitesi, çalışma alanı ve kitaplık koleksiyonları sunan mobilya markasıdır.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Aydınlı, Atlas Sk. No:7/B",
    addressLocality: "Tuzla",
    addressRegion: "İstanbul",
    postalCode: "34953",
    addressCountry: "TR",
  },
  sameAs: [
    "https://www.instagram.com/eraconcept_2015/",
  ],
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

      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationStructuredData),
  }}
/>

        <CartProvider>{children}</CartProvider>
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}