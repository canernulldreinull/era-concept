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
      <header className="sticky top-0 z-50 w-full bg-[#f8f6f1]/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl">
        {/* PREMIUM ÜST ŞERİT */}
        <div className="bg-[#211f1b] text-white">
          <div className="mx-auto flex h-[34px] w-full max-w-[1500px] items-center justify-center px-4 lg:justify-between lg:px-10">
            <p className="text-center text-[9px] font-medium uppercase tracking-[0.19em] text-white/70 sm:text-[10px]">
              Yaşam alanlarınız için zamansız
              tasarımlar
            </p>

            <div className="hidden items-center gap-7 text-[10px] uppercase tracking-[0.15em] text-white/55 lg:flex">
              <Link
                href="/siparis-takibi"
                className="transition hover:text-white"
              >
                Sipariş Takibi
              </Link>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                Tuzla Mağazamız
              </a>
            </div>
          </div>
                </div>

        {/* KURULUM BİLGİLENDİRMESİ */}
        <div className="border-b border-black/[0.06] bg-[#f8f6f1]">
          <div className="mx-auto flex min-h-[32px] w-full max-w-[1500px] items-center justify-center px-4">
            <p className="text-center text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-500 sm:text-[10px]">
              Site kurulum aşamasındadır · Ürünler ve fiyatlar temsilidir.
            </p>
          </div>
        </div>

        {/* ANA HEADER */}
        <div>
          <div className="mx-auto flex h-[78px] w-full max-w-[1500px] items-center justify-between gap-3 px-4 sm:h-[88px] sm:px-6 lg:h-[94px] lg:px-10">
            {/* MOBİL MENÜ */}
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setMobileOpen(true);
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-start lg:hidden"
              aria-label="Menüyü aç"
            >
              <MenuIcon />
            </button>

            {/* LOGO */}
            <Link
              href="/"
              className="relative block h-[46px] w-[132px] shrink-0 sm:h-[58px] sm:w-[185px] lg:h-[64px] lg:w-[215px]"
              aria-label="Era Concept Ana Sayfa"
            >
              <Image
                src="/era-concept-logo.png"
                alt="Era Concept"
                fill
                priority
                sizes="(max-width: 640px) 132px, 215px"
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
              className="group mx-auto hidden h-12 max-w-[480px] flex-1 items-center justify-between border border-black/[0.09] bg-white/60 px-5 text-left transition duration-300 hover:border-black/20 hover:bg-white lg:flex"
            >
              <span className="text-[13px] text-neutral-400">
                Ürün veya koleksiyon ara
              </span>

              <span className="text-neutral-600 transition-transform duration-300 group-hover:scale-105">
                <SearchIcon />
              </span>
            </button>

            {/* SAĞ */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              {/* MOBİL ARAMA */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(
                    (current) => !current
                  );
                }}
                className="flex h-10 w-10 items-center justify-center text-[#27251f] lg:hidden"
                aria-label="Ara"
              >
                <SearchIcon />
              </button>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Era Concept Instagram"
                title="Instagram"
                className="group hidden h-11 w-11 items-center justify-center text-neutral-600 transition hover:text-black sm:flex"
              >
                <FaInstagram className="h-[17px] w-[17px] transition-transform duration-300 group-hover:scale-110" />
              </a>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Era Concept mağaza konumu"
                title="Mağaza Konumu"
                className="group hidden h-11 w-11 items-center justify-center text-neutral-600 transition hover:text-black sm:flex"
              >
                <FaLocationDot className="h-[16px] w-[16px] transition-transform duration-300 group-hover:scale-110" />
              </a>

              <div className="ml-0 border-l border-black/10 pl-1 sm:ml-1 sm:pl-2">
                <CartButton />
              </div>
            </div>
          </div>
        </div>

        {/* MASAÜSTÜ NAV */}
        <div className="hidden border-t border-black/[0.055] lg:block">
          <nav className="mx-auto flex h-[54px] max-w-[1500px] items-center justify-center gap-9 px-10">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative flex h-full items-center text-[12px] font-medium tracking-[0.025em] text-[#4e4b45] transition hover:text-black"
              >
                {item.label}

                <span className="absolute inset-x-0 bottom-0 h-[1px] origin-center scale-x-0 bg-[#9a7b56] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}

            <Link
              href="/#urunler"
              className="group relative flex h-full items-center text-[12px] font-semibold tracking-[0.025em] text-[#8a6743]"
            >
              Tüm Ürünler

              <span className="absolute inset-x-0 bottom-0 h-[1px] origin-center scale-x-0 bg-[#9a7b56] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </nav>
        </div>
      </header>

      {/* ARAMA PANELİ */}
      {searchOpen && (
        <>
          <button
            type="button"
            aria-label="Aramayı kapat"
            onClick={() =>
              setSearchOpen(false)
            }
            className="fixed inset-0 z-[55] bg-black/25 backdrop-blur-[1px]"
          />

          <div className="fixed inset-x-0 top-[112px] z-[60] border-b border-black/10 bg-[#f8f6f1] shadow-[0_25px_60px_rgba(0,0,0,0.12)] sm:top-[122px] lg:top-[182px]">
            <div className="mx-auto max-w-4xl px-5 py-9 sm:px-8 sm:py-12">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                Era Concept
              </p>

              <form
                action="/search"
                method="GET"
                className="flex items-center border-b border-black/50"
              >
                <span className="text-neutral-500">
                  <SearchIcon />
                </span>

                <input
                  autoFocus
                  type="search"
                  name="q"
                  placeholder="Ne arıyorsunuz?"
                  className="h-16 min-w-0 flex-1 bg-transparent px-4 text-xl font-light outline-none placeholder:text-neutral-400 sm:h-[74px] sm:text-2xl"
                />

                <button
                  type="submit"
                  className="px-3 text-xs font-semibold uppercase tracking-[0.15em] text-black sm:px-5"
                >
                  Ara
                </button>
              </form>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                <span className="text-xs text-neutral-400">
                  Popüler:
                </span>

                <Link
                  href="/category/oturma-odasi"
                  onClick={() =>
                    setSearchOpen(false)
                  }
                  className="text-xs text-neutral-600 hover:text-black"
                >
                  Oturma Odası
                </Link>

                <Link
                  href="/category/yemek-odasi"
                  onClick={() =>
                    setSearchOpen(false)
                  }
                  className="text-xs text-neutral-600 hover:text-black"
                >
                  Yemek Odası
                </Link>

                <Link
                  href="/category/yatak-odasi"
                  onClick={() =>
                    setSearchOpen(false)
                  }
                  className="text-xs text-neutral-600 hover:text-black"
                >
                  Yatak Odası
                </Link>
              </div>
            </div>
          </div>
        </>
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
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          />

          <aside className="absolute inset-y-0 left-0 w-[92%] max-w-[390px] overflow-y-auto bg-[#f8f6f1] shadow-2xl">
            {/* DRAWER HEADER */}
            <div className="flex h-[94px] items-center justify-between border-b border-black/[0.08] px-6">
              <div className="relative h-[56px] w-[175px]">
                <Image
                  src="/era-concept-logo.png"
                  alt="Era Concept"
                  fill
                  sizes="175px"
                  className="object-contain object-left"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="flex h-11 w-11 items-center justify-center text-[28px] font-light text-neutral-600"
                aria-label="Menüyü kapat"
              >
                ×
              </button>
            </div>

            {/* MENÜ */}
            <nav className="px-6 pb-8 pt-8">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#958f85]">
                Koleksiyonlar
              </p>

              <div className="border-y border-black/[0.09]">
                {menuItems.map(
                  (item, index) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() =>
                        setMobileOpen(
                          false
                        )
                      }
                      className={`group flex items-center justify-between py-[18px] ${
                        index !==
                        menuItems.length -
                          1
                          ? "border-b border-black/[0.07]"
                          : ""
                      }`}
                    >
                      <span className="text-[17px] font-medium tracking-[-0.01em] text-[#26241f]">
                        {item.label}
                      </span>

                      <span className="text-lg font-light text-[#9a7b56] transition group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  )
                )}
              </div>

              <Link
                href="/#urunler"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="mt-7 flex min-h-[52px] items-center justify-center bg-[#211f1b] px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black"
              >
                Tüm Ürünleri İncele
              </Link>
            </nav>

            {/* HIZLI MENÜ */}
            <div className="border-t border-black/[0.08] px-6 py-7">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#958f85]">
                Era Concept
              </p>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[50px] items-center justify-center gap-2 border border-black/10 bg-white/50 text-xs font-medium transition hover:bg-white"
                >
                  <FaInstagram className="h-[16px] w-[16px]" />
                  Instagram
                </a>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[50px] items-center justify-center gap-2 border border-black/10 bg-white/50 text-xs font-medium transition hover:bg-white"
                >
                  <FaLocationDot className="h-[15px] w-[15px]" />
                  Mağazamız
                </a>
              </div>

              <Link
                href="/siparis-takibi"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="mt-2 flex min-h-[50px] items-center justify-center border border-black/10 bg-white/50 text-xs font-medium"
              >
                Sipariş Takibi
              </Link>
            </div>

            {/* ADRES */}
            <div className="border-t border-black/[0.08] px-6 py-8">
              <p className="text-[15px] font-medium">
                Tuzla Mağazası
              </p>

              <p className="mt-3 text-xs leading-6 text-neutral-500">
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
    <div className="space-y-[6px]">
      <span className="block h-[1px] w-7 bg-[#211f1b]" />
      <span className="block h-[1px] w-5 bg-[#211f1b]" />
      <span className="block h-[1px] w-7 bg-[#211f1b]" />
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
      strokeWidth="1.5"
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