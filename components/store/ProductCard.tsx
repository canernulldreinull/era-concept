import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: {
    name: string;
    slug: string;
    price: unknown;
    compareAtPrice: unknown | null;
    stock: number;

    images: {
      url: string;
      alt: string | null;
    }[];
  };
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const price = Number(product.price);

  const compareAtPrice = product.compareAtPrice
    ? Number(product.compareAtPrice)
    : null;

  const hasDiscount =
    compareAtPrice !== null &&
    compareAtPrice > price;

  const discountPercentage =
    hasDiscount && compareAtPrice
      ? Math.round(
          ((compareAtPrice - price) /
            compareAtPrice) *
            100
        )
      : null;

  const firstImage = product.images[0];
  const secondImage = product.images[1];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
    >
      {/* GÖRSEL */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e6df]">
        {firstImage?.url ? (
          <>
            <Image
              src={firstImage.url}
              alt={
                firstImage.alt ||
                product.name
              }
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={`object-cover transition duration-[850ms] ease-out ${
                secondImage
                  ? "group-hover:opacity-0"
                  : "group-hover:scale-[1.025]"
              }`}
            />

            {secondImage?.url && (
              <Image
                src={secondImage.url}
                alt={
                  secondImage.alt ||
                  product.name
                }
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover opacity-0 transition duration-[850ms] ease-out group-hover:scale-[1.015] group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.15em] text-neutral-400">
            Era Concept
          </div>
        )}

        {/* HAFİF ALT GÖLGE */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/[0.08] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        {/* İNDİRİM */}
        {hasDiscount && (
          <div className="absolute left-3 top-3 bg-[#211f1b] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white sm:left-4 sm:top-4">
            %{discountPercentage} Avantaj
          </div>
        )}

        {/* STOK */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f4f1eb]/75 backdrop-blur-[2px]">
            <span className="border border-black/10 bg-white/90 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
              Stokta Yok
            </span>
          </div>
        )}

        {/* HOVER DETAY */}
        {product.stock > 0 && (
          <div className="absolute inset-x-4 bottom-4 hidden translate-y-2 items-center justify-between bg-white/95 px-4 py-3 opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#25231f]">
              Ürünü İncele
            </span>

            <span className="text-sm text-[#9a7b56]">
              →
            </span>
          </div>
        )}
      </div>

      {/* BİLGİ */}
      <div className="pt-4 sm:pt-5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9a7b56] sm:text-[10px]">
          Era Concept
        </p>

        <h3 className="mt-2 line-clamp-2 text-[14px] font-medium leading-5 tracking-[-0.01em] text-[#24221e] transition-colors duration-300 group-hover:text-[#7b6248] sm:text-[15px] sm:leading-6">
          {product.name}
        </h3>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#211f1b] sm:text-base">
            {price.toLocaleString(
              "tr-TR",
              {
                minimumFractionDigits: 2,
              }
            )}{" "}
            TL
          </span>

          {hasDiscount && (
            <span className="text-xs text-neutral-400 line-through sm:text-[13px]">
              {compareAtPrice!.toLocaleString(
                "tr-TR",
                {
                  minimumFractionDigits: 2,
                }
              )}{" "}
              TL
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}