"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (!added) return;

    const timeout = setTimeout(() => {
      setAdded(false);
    }, 1600);

    return () => {
      clearTimeout(timeout);
    };
  }, [added]);

  function handleClick() {
    if (product.stock <= 0) {
      return;
    }

    addItem({
      ...product,
      quantity: 1,
    });

    setAdded(true);
  }

  const disabled = product.stock <= 0;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      aria-live="polite"
      className={`group relative flex min-h-[54px] w-full items-center justify-center overflow-hidden px-5 text-[10px] font-semibold uppercase tracking-[0.16em] transition duration-300 sm:min-h-[58px] sm:px-7 sm:text-[11px] ${
        disabled
          ? "cursor-not-allowed bg-[#d8d4cc] text-[#8f8b84]"
          : added
            ? "bg-[#5c6f5a] text-white"
            : "bg-[#211f1b] text-white hover:bg-black"
      }`}
    >
      <span className="flex items-center justify-center gap-3">
        {disabled ? (
          <>
            <StockIcon />
            Stokta Yok
          </>
        ) : added ? (
          <>
            <CheckIcon />
            Sepete Eklendi
          </>
        ) : (
          <>
            Sepete Ekle

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </>
        )}
      </span>
    </button>
  );
}

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function StockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
      />

      <path d="M8 8l8 8" />
    </svg>
  );
}