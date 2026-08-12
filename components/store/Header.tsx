"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaInstagram,
  FaLocationDot,
} from "react-icons/fa6";

import CartButton from "@/components/cart/CartButton";

const menuItems = [
  {
    label: "Oturma Odası",
    href: "/category/oturma-odasi",
  },
  {
    label: "Yemek Odası",
    href: "/category/yemek-odasi",
  },
  {
    label: "Yatak Odası",
    href: "/category/yatak-odasi",
  },
  {
    label: "TV Üniteleri",
    href: "/category/tv-uniteleri",
  },
  {
    label: "Çalışma Alanı",
    href: "/category/calisma-alani",
  },
  {
    label: "Kitaplık",
    href: "/category/kitaplik",
  },
];

const instagramUrl =
  "https://www.instagram.com/eraconcept_2015/";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Era Concept Mobilyaları, Aydınlı, Atlas Sk. No:7/B, 34953 Tuzla/İstanbul"
  );

export default function Header() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        {/* ÜST BİLGİ ŞERİDİ */}
        <div className="border-b border-black/5 bg-[#25241f] text-white">
          <div className="mx-auto flex h-8 max-w-[1440px] items-center justify-center px-6 text-center text-[11px] tracking-wide text-white/75">
            Era Concept · Yaşam alanınız için
            mobilya koleksiyonları
          </div>
        </div>

        {/* ANA HEADER */}
        <div className="border-b border-black/10">
          <div className="mx-auto flex h-[88px] max-w-[1440px] items-center justify-between gap-6 px-5 lg:px-10">
            {/* MOBİL MENÜ */}
            <button
              type="button"
              onClick={() =>
                setMobileOpen(true)
              }
              className="flex h-10 w-10 cursor-pointer items-center justify-center lg:hidden"
              aria-label="Menüyü aç"
            >
              <MenuIcon />
            </button>

            {/* LOGO */}
            <Link
              href="/"
              className="relative block h-[58px] w-[180px] shrink-0 sm:w-[210px]"
              aria-label="Era Concept Ana Sayfa"
            >
              <Image
                src="/era-concept-logo.png"
                alt="Era Concept"
                fill
                priority
                sizes="210px"
                className="object-contain object-left"
              />
            </Link>

            {/* MASAÜSTÜ ARAMA */}
            <button
              type="button"
              onClick={() =>
                setSearchOpen(
                  (current) => !current
                )
              }
              className="mx-auto hidden h-11 max-w-[520px] flex-1 cursor-pointer items-center justify-between border-b border-black/20 text-left text-sm text-neutral-400 transition hover:border-black lg:flex"
            >
              <span>
                Ürün, kategori veya koleksiyon ara
              </span>

              <SearchIcon />
            </button>

            {/* SAĞ */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {/* MOBİL ARAMA */}
              <button
                type="button"
                onClick={() =>
                  setSearchOpen(
                    (current) => !current
                  )
                }
                className="flex h-10 w-10 cursor-pointer items-center justify-center lg:hidden"
                aria-label="Ara"
              >
                <SearchIcon />
              </button>

              {/* INSTAGRAM */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Era Concept Instagram"
                title="Instagram"
                className="group hidden h-10 w-10 items-center justify-center rounded-full border border-black/10 text-neutral-600 transition hover:border-black/20 hover:bg-[#f8f7f4] hover:text-black sm:flex"
              >
                <FaInstagram className="h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110" />
              </a>

              {/* KONUM */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Era Concept mağaza konumu"
                title="Mağaza Konumu"
                className="group hidden h-10 w-10 items-center justify-center rounded-full border border-black/10 text-neutral-600 transition hover:border-black/20 hover:bg-[#f8f7f4] hover:text-black sm:flex"
              >
                <FaLocationDot className="h-[17px] w-[17px] transition-transform duration-200 group-hover:scale-110" />
              </a>

              <CartButton />
            </div>
          </div>
        </div>

        {/* MASAÜSTÜ KATEGORİ MENÜSÜ */}
        <div className="hidden border-b border-black/5 bg-white lg:block">
          <nav className="mx-auto flex h-[52px] max-w-[1440px] items-center justify-center gap-8 px-10">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative flex h-full items-center text-[13px] font-medium text-neutral-700 transition hover:text-black"
              >
                {item.label}

                <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}

            <Link
              href="/#urunler"
              className="group relative flex h-full items-center text-[13px] font-semibold text-[#8d5637]"
            >
              Tüm Ürünler

              <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#8d5637] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </nav>
        </div>
      </header>

      {/* ARAMA PANELİ */}
      {searchOpen && (
        <div className="fixed inset-x-0 top-[120px] z-[60] border-b border-black/10 bg-white shadow-lg lg:top-[173px]">
          <div className="mx-auto max-w-3xl px-6 py-7">
            <form
              action="/search"
              method="GET"
              className="flex items-center border-b-2 border-black"
            >
              <SearchIcon />

              <input
                autoFocus
                type="search"
                name="q"
                placeholder="Ne aramıştınız?"
                className="h-14 flex-1 bg-transparent px-4 text-lg outline-none placeholder:text-neutral-400"
              />

              <button
                type="submit"
                className="cursor-pointer px-3 text-sm font-medium text-black"
              >
                Ara
              </button>

              <button
                type="button"
                onClick={() =>
                  setSearchOpen(false)
                }
                className="cursor-pointer px-3 text-sm text-neutral-500"
              >
                Kapat
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MOBİL DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={() =>
              setMobileOpen(false)
            }
            className="absolute inset-0 bg-black/40"
          />

          <aside className="absolute inset-y-0 left-0 w-[88%] max-w-[380px] overflow-y-auto bg-white shadow-2xl">
            <div className="flex h-20 items-center justify-between border-b border-black/10 px-6">
              <div className="relative h-[52px] w-[170px]">
                <Image
                  src="/era-concept-logo.png"
                  alt="Era Concept"
                  fill
                  sizes="170px"
                  className="object-contain object-left"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-2xl"
                aria-label="Menüyü kapat"
              >
                ×
              </button>
            </div>

            <nav className="px-6 py-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Koleksiyonlar
              </p>

              <div className="divide-y divide-black/10 border-y border-black/10">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="flex items-center justify-between py-4 text-base font-medium"
                  >
                    {item.label}

                    <span className="text-neutral-400">
                      →
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                href="/#urunler"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="mt-6 flex min-h-12 items-center justify-center bg-[#181817] px-6 text-sm font-medium text-white"
              >
                Tüm Ürünleri İncele
              </Link>
            </nav>

            {/* MOBİL SOSYAL + KONUM */}
            <div className="border-t border-black/10 px-6 py-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Bizi Takip Edin
              </p>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 border border-black/10 text-sm font-medium transition hover:bg-neutral-50"
                >
                  <FaInstagram className="h-[18px] w-[18px]" />
                  Instagram
                </a>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 border border-black/10 text-sm font-medium transition hover:bg-neutral-50"
                >
                  <FaLocationDot className="h-[17px] w-[17px]" />
                  Konum
                </a>
              </div>
            </div>

            <div className="border-t border-black/10 px-6 py-7">
              <p className="text-sm font-medium">
                Era Concept
              </p>

              <p className="mt-2 text-xs leading-6 text-neutral-500">
                Aydınlı, Atlas Sk. No:7/B
                <br />
                34953 Tuzla / İstanbul
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function MenuIcon() {
  return (
    <div className="space-y-[5px]">
      <span className="block h-[1.5px] w-6 bg-black" />
      <span className="block h-[1.5px] w-6 bg-black" />
      <span className="block h-[1.5px] w-6 bg-black" />
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="7"
      />

      <path d="m20 20-4-4" />
    </svg>
  );
}