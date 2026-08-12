"use client";

import Link from "next/link";

import { useCart } from "./CartProvider";

export default function CartButton() {
  const { totalQuantity } = useCart();

  return (
    <Link
      href="/cart"
      className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
    >
      Sepet ({totalQuantity})
    </Link>
  );
}