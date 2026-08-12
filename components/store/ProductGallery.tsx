"use client";

import { useState } from "react";

type ProductGalleryProps = {
  images: {
    url: string;
    alt: string | null;
  }[];
  productName: string;
};

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-neutral-100 text-neutral-400">
        Ürün görseli bulunmuyor
      </div>
    );
  }

  const activeImage = images[activeIndex];

  function previousImage() {
    setActiveIndex((current) =>
      current === 0
        ? images.length - 1
        : current - 1
    );
  }

  function nextImage() {
    setActiveIndex((current) =>
      current === images.length - 1
        ? 0
        : current + 1
    );
  }

  function handleImageClick(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (images.length <= 1) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const clickPosition =
      event.clientX - rect.left;

    if (clickPosition < rect.width / 2) {
      previousImage();
    } else {
      nextImage();
    }
  }

  return (
    <div>
      <div
        onClick={handleImageClick}
        className="relative aspect-square cursor-pointer overflow-hidden rounded-3xl bg-neutral-100"
      >
        <img
          src={activeImage.url}
          alt={activeImage.alt || productName}
          className="h-full w-full select-none object-cover"
          draggable={false}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Önceki görsel"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl shadow-md transition hover:scale-105"
            >
              ‹
            </button>

            <button
              type="button"
              aria-label="Sonraki görsel"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl shadow-md transition hover:scale-105"
            >
              ›
            </button>

            <div
              className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/35 px-3 py-2"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Görsel ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full transition-all ${
                    activeIndex === index
                      ? "h-3 w-3 bg-white"
                      : "h-3 w-3 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}