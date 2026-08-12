"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { logoutAction } from "@/app/admin/actions";

const NAV_ITEMS = [
  { label: "Genel Bakış", href: "/admin" },
  { label: "Ürünler", href: "/admin/products" },
  { label: "Kategoriler", href: "/admin/categories" },
  { label: "Siparişler", href: "/admin/orders" },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-neutral-900 text-white"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobil üst çubuk */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 lg:hidden">
        <Link href="/admin" className="text-lg font-semibold tracking-tight">
          Çetiner Store
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Menüyü aç"
          className="cursor-pointer rounded-lg border border-neutral-200 p-2 text-neutral-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobil çekmece */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Menüyü kapat"
            className="absolute inset-0 cursor-pointer bg-black/30"
            onClick={() => setOpen(false)}
          />

          <div className="relative flex h-full w-72 flex-col bg-white py-5 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <span className="text-lg font-semibold tracking-tight">Çetiner Store</span>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Kapat"
                className="cursor-pointer rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 flex-1">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>

            <div className="flex flex-col gap-1 border-t border-neutral-200 px-3 pt-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
              >
                Mağazaya Git
              </Link>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Çıkış
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Masaüstü sabit sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-neutral-200 lg:bg-white">
        <div className="flex h-16 items-center px-5">
          <Link href="/admin" className="text-lg font-semibold tracking-tight">
            Çetiner Store
          </Link>
        </div>

        <div className="mt-2 flex flex-1 flex-col">
          <NavLinks />
        </div>

        <div className="flex flex-col gap-1 border-t border-neutral-200 px-3 py-4">
          <Link
            href="/"
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
          >
            Mağazaya Git
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Çıkış
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
