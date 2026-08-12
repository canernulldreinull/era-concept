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

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f0efeb]">
        {product.images[0]?.url ? (
          <Image
            src={product.images[0].url}
            alt={
              product.images[0].alt ||
              product.name
            }
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            Ürün görseli
          </div>
        )}

        {hasDiscount && (
          <div className="absolute left-3 top-3 bg-white px-3 py-1.5 text-xs font-medium shadow-sm">
            İndirim
          </div>
        )}

        {product.stock <= 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/55 backdrop-blur-[1px]">
            <span className="bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-700">
              Stokta Yok
            </span>
          </div>
        )}
      </div>

      <div className="pt-4">
        <h3 className="text-[15px] font-medium leading-6 text-neutral-900 transition group-hover:text-neutral-600">
          {product.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-base font-semibold text-neutral-900">
            {price.toLocaleString("tr-TR", {
              minimumFractionDigits: 2,
            })}{" "}
            TL
          </span>

          {hasDiscount && (
            <span className="text-sm text-neutral-400 line-through">
              {compareAtPrice.toLocaleString(
                "tr-TR",
                {
                  minimumFractionDigits: 2,
                }
              )}{" "}
              TL
            </span>
          )}
        </div>

        <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-neutral-500 transition group-hover:text-black">
          Ürünü incele
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}