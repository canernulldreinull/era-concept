"use client";

import {
  useEffect,
  useState,
} from "react";

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
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [
    lightboxOpen,
    setLightboxOpen,
  ] = useState(false);

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

  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === 0
            ? images.length - 1
            : current - 1
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current ===
          images.length - 1
            ? 0
            : current + 1
        );
      }
    }

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [lightboxOpen, images.length]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center bg-[#eeeae3] text-sm text-neutral-400">
        Ürün görseli bulunmuyor
      </div>
    );
  }

  const activeImage =
    images[activeIndex];

  return (
    <>
      <div className="space-y-4">
        {/* ANA GÖRSEL */}
        <div className="group relative aspect-square overflow-hidden bg-[#ebe8e2]">
          <button
            type="button"
            onClick={() =>
              setLightboxOpen(true)
            }
            className="absolute inset-0 z-10 cursor-zoom-in"
            aria-label="Ürün görselini büyüt"
          />

          <img
            src={activeImage.url}
            alt={
              activeImage.alt ||
              productName
            }
            className="h-full w-full select-none object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.015]"
            draggable={false}
          />

          {/* FOTOĞRAF SAYACI */}
          {images.length > 1 && (
            <div className="pointer-events-none absolute left-4 top-4 z-20 bg-white/90 px-3 py-2 text-[10px] font-medium tracking-[0.12em] text-neutral-700 backdrop-blur-md">
              {String(
                activeIndex + 1
              ).padStart(2, "0")}
              <span className="mx-2 text-neutral-300">
                /
              </span>
              {String(
                images.length
              ).padStart(2, "0")}
            </div>
          )}

          {/* BÜYÜT */}
          <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-700 opacity-90 backdrop-blur-md transition group-hover:opacity-100">
            <ExpandIcon />
            Büyüt
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Önceki görsel"
                onClick={(event) => {
                  event.stopPropagation();
                  previousImage();
                }}
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-black/[0.07] bg-white/90 text-2xl font-light text-neutral-700 opacity-100 backdrop-blur-md transition duration-300 hover:bg-white sm:left-5 sm:h-12 sm:w-12 lg:opacity-0 lg:group-hover:opacity-100"
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
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-black/[0.07] bg-white/90 text-2xl font-light text-neutral-700 opacity-100 backdrop-blur-md transition duration-300 hover:bg-white sm:right-5 sm:h-12 sm:w-12 lg:opacity-0 lg:group-hover:opacity-100"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* THUMBNAILS */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 sm:gap-3">
            {images.map(
              (image, index) => (
                <button
                  key={`${image.url}-${index}`}
                  type="button"
                  aria-label={`Görsel ${
                    index + 1
                  }`}
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  className={`relative h-[76px] w-[76px] shrink-0 overflow-hidden border bg-[#ebe8e2] transition duration-300 sm:h-[92px] sm:w-[92px] ${
                    activeIndex ===
                    index
                      ? "border-[#211f1b]"
                      : "border-transparent opacity-65 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={
                      image.alt ||
                      productName
                    }
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#11110f]/95 p-3 backdrop-blur-sm sm:p-7"
          onClick={() =>
            setLightboxOpen(false)
          }
        >
          <div className="absolute left-5 top-5 z-30 hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:block">
            Era Concept
          </div>

          <button
            type="button"
            aria-label="Kapat"
            onClick={() =>
              setLightboxOpen(false)
            }
            className="absolute right-4 top-4 z-30 flex h-12 w-12 items-center justify-center border border-white/15 bg-black/10 text-[28px] font-light text-white backdrop-blur transition hover:bg-white hover:text-black sm:right-7 sm:top-7"
          >
            ×
          </button>

          <div
            className="relative flex h-full w-full max-w-[1500px] items-center justify-center"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <img
              src={activeImage.url}
              alt={
                activeImage.alt ||
                productName
              }
              className="max-h-[90vh] max-w-[94vw] select-none object-contain"
              draggable={false}
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Önceki görsel"
                  onClick={previousImage}
                  className="absolute left-1 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/15 text-3xl font-light text-white backdrop-blur transition hover:bg-white hover:text-black sm:left-5 sm:h-14 sm:w-14"
                >
                  ‹
                </button>

                <button
                  type="button"
                  aria-label="Sonraki görsel"
                  onClick={nextImage}
                  className="absolute right-1 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/15 text-3xl font-light text-white backdrop-blur transition hover:bg-white hover:text-black sm:right-5 sm:h-14 sm:w-14"
                >
                  ›
                </button>

                <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 bg-black/40 px-4 py-2 text-[10px] font-medium tracking-[0.18em] text-white/80 backdrop-blur sm:bottom-7">
                  {activeIndex + 1}
                  <span className="mx-2 text-white/30">
                    /
                  </span>
                  {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3H3v5" />
      <path d="m3 3 6 6" />
      <path d="M16 3h5v5" />
      <path d="m21 3-6 6" />
      <path d="M8 21H3v-5" />
      <path d="m3 21 6-6" />
      <path d="M16 21h5v-5" />
      <path d="m21 21-6-6" />
    </svg>
  );
}