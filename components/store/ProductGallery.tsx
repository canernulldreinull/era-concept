"use client";

import { useEffect, useState } from "react";

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
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, images.length]);

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
      current === 0 ? images.length - 1 : current - 1
    );
  }

  function nextImage() {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  }

  return (
    <>
      <div>
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 z-10 cursor-zoom-in"
            aria-label="Ürün görselini büyüt"
          />

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
                className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl shadow-md transition hover:scale-105 sm:left-4 sm:h-12 sm:w-12 sm:text-3xl"
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
                className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl shadow-md transition hover:scale-105 sm:right-4 sm:h-12 sm:w-12 sm:text-3xl"
              >
                ›
              </button>

              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/35 px-3 py-2 sm:bottom-5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Görsel ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-full transition-all ${
                      activeIndex === index
                        ? "h-2.5 w-2.5 bg-white sm:h-3 sm:w-3"
                        : "h-2.5 w-2.5 bg-white/50 hover:bg-white/80 sm:h-3 sm:w-3"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="pointer-events-none absolute bottom-4 right-4 z-20 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
            Büyüt
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-3 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            aria-label="Kapat"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20 sm:right-6 sm:top-6"
          >
            ×
          </button>

          <div
            className="relative flex h-full w-full max-w-7xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeImage.url}
              alt={activeImage.alt || productName}
              className="max-h-[90vh] max-w-[92vw] select-none object-contain"
              draggable={false}
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Önceki görsel"
                  onClick={previousImage}
                  className="absolute left-1 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-3xl text-white backdrop-blur transition hover:bg-white/25 sm:left-4 sm:h-14 sm:w-14"
                >
                  ‹
                </button>

                <button
                  type="button"
                  aria-label="Sonraki görsel"
                  onClick={nextImage}
                  className="absolute right-1 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-3xl text-white backdrop-blur transition hover:bg-white/25 sm:right-4 sm:h-14 sm:w-14"
                >
                  ›
                </button>

                <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/45 px-3 py-2 sm:bottom-5">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Görsel ${index + 1}`}
                      onClick={() => setActiveIndex(index)}
                      className={`rounded-full transition-all ${
                        activeIndex === index
                          ? "h-3 w-3 bg-white"
                          : "h-3 w-3 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}