"use client";

import Link from "next/link";

import { useCart } from "./CartProvider";

export default function CartButton() {
  const { totalQuantity } = useCart();

  return (
    <Link
      href="/cart"
      className="whitespace-nowrap rounded-full bg-black px-3 py-2 text-xs font-medium text-white transition hover:bg-neutral-800 sm:px-4 sm:py-2.5 sm:text-sm"
    >
      Sepet ({totalQuantity})
    </Link>
  );
}