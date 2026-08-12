"use client";

import { useState } from "react";

import { useCart } from "./CartProvider";

type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
    imageUrl: string | null;
  };
};

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem({
      ...product,
      quantity: 1,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  return (
    <button
      type="button"
      disabled={product.stock <= 0}
      onClick={handleClick}
      className="mt-6 w-full rounded-full bg-black py-4 font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
    >
      {product.stock <= 0
        ? "Stokta Yok"
        : added
        ? "Sepete Eklendi ✓"
        : "Sepete Ekle"}
    </button>
  );
}