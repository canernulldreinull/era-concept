import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import ProductCard from "@/components/store/ProductCard";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;

  searchParams: Promise<{
    sort?: string;
    stock?: string;
  }>;
};

const categoryHeroMap: Record<string, string> = {
  "oturma-odasi":
    "/images/home/genisacioturmaodasi.jpg",

  "yatak-odasi":
    "/images/home/modernyatakodasi.jpg",

  "yemek-odasi":
    "/images/home/sikyemekmodasi.jpg",

  "tv-uniteleri":
    "/images/home/tvunitesi.jpg",

  "calisma-alani":
    "/images/home/calismamasasi.jpg",

  kitaplik:
    "/images/home/kitaplik.png",
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;

  const {
    sort = "featured",
    stock,
  } = await searchParams;

  const onlyInStock =
    stock === "1";

  const orderBy =
    sort === "price-asc"
      ? [
          {
            price: "asc" as const,
          },
        ]
      : sort === "price-desc"
        ? [
            {
              price: "desc" as const,
            },
          ]
        : sort === "newest"
          ? [
              {
                createdAt: "desc" as const,
              },
            ]
          : [
              {
                featured: "desc" as const,
              },
              {
                createdAt: "desc" as const,
              },
            ];

  const category =
    await prisma.category.findUnique({
      where: {
        slug,
      },

      include: {
        products: {
          where: {
            active: true,

            ...(onlyInStock
              ? {
                  stock: {
                    gt: 0,
                  },
                }
              : {}),
          },

          orderBy,

          include: {
            images: {
              orderBy: {
                position: "asc",
              },

              take: 1,
            },
          },
        },
      },
    });

  if (!category || !category.active) {
    notFound();
  }

  const categorySlug = category.slug;

  const heroImage =
    category.imageUrl ||
    categoryHeroMap[category.slug] ||
    null;

  function createFilterUrl({
    nextSort = sort,
    nextStock = stock,
  }: {
    nextSort?: string;
    nextStock?: string;
  }) {
    const params =
      new URLSearchParams();

    if (nextSort) {
      params.set(
        "sort",
        nextSort
      );
    }

    if (nextStock === "1") {
      params.set(
        "stock",
        "1"
      );
    }

    const query =
      params.toString();

    return query
      ? `/category/${categorySlug}?${query}`
      : `/category/${categorySlug}`;
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f7f4] text-[#181817]">
        {/* BREADCRUMB */}
        <div className="border-b border-black/5 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
              <Link
                href="/"
                className="transition hover:text-black"
              >
                Ana Sayfa
              </Link>

              <span>/</span>

              <span className="text-neutral-800">
                {category.name}
              </span>
            </div>
          </div>
        </div>

        {/* HERO */}
        {heroImage ? (
          <section className="relative min-h-[430px] overflow-hidden sm:min-h-[520px]">
            <Image
              src={heroImage}
              alt={`${category.name} koleksiyonu`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

            <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-end px-6 py-12 text-white sm:min-h-[520px] sm:py-16">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                  Era Concept
                </p>

                <h1 className="mt-4 text-5xl font-medium leading-tight tracking-[-0.04em] sm:text-6xl">
                  {category.name}
                </h1>

                {category.description && (
                  <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="border-b border-black/5 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Era Concept
              </p>

              <h1 className="mt-4 text-5xl font-medium tracking-[-0.04em] sm:text-6xl">
                {category.name}
              </h1>

              {category.description && (
                <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
                  {category.description}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ÜRÜNLER */}
        <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
          <div className="border-b border-black/10 pb-7">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Koleksiyon
                </p>

                <h2 className="mt-3 text-3xl font-medium tracking-[-0.03em]">
                  {category.name} ürünleri
                </h2>

                <p className="mt-2 text-sm text-neutral-500">
                  {category.products.length} ürün gösteriliyor
                </p>
              </div>

              {/* FİLTRELER */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* STOK */}
                <Link
                  href={createFilterUrl({
                    nextStock:
                      onlyInStock
                        ? undefined
                        : "1",
                  })}
                  className={`inline-flex min-h-11 items-center justify-center border px-4 text-sm font-medium transition ${
                    onlyInStock
                      ? "border-black bg-black text-white"
                      : "border-black/15 bg-white text-neutral-700 hover:border-black"
                  }`}
                >
                  {onlyInStock
                    ? "✓ Sadece stokta"
                    : "Sadece stokta"}
                </Link>

                {/* SIRALAMA */}
                <div className="flex flex-wrap gap-2">
                  <SortButton
                    label="Öne Çıkan"
                    href={createFilterUrl({
                      nextSort:
                        "featured",
                    })}
                    active={
                      sort ===
                      "featured"
                    }
                  />

                  <SortButton
                    label="En Yeni"
                    href={createFilterUrl({
                      nextSort:
                        "newest",
                    })}
                    active={
                      sort ===
                      "newest"
                    }
                  />

                  <SortButton
                    label="Fiyat ↑"
                    href={createFilterUrl({
                      nextSort:
                        "price-asc",
                    })}
                    active={
                      sort ===
                      "price-asc"
                    }
                  />

                  <SortButton
                    label="Fiyat ↓"
                    href={createFilterUrl({
                      nextSort:
                        "price-desc",
                    })}
                    active={
                      sort ===
                      "price-desc"
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            {category.products.length === 0 ? (
              <div className="border border-black/10 bg-white px-6 py-16 text-center">
                <h3 className="text-xl font-medium">
                  Ürün bulunamadı.
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
                  Bu kategori veya seçtiğiniz filtreler için henüz ürün bulunmuyor.
                </p>

                {(onlyInStock ||
                  sort !==
                    "featured") && (
                  <Link
                    href={`/category/${categorySlug}`}
                    className="mt-7 inline-flex min-h-12 items-center justify-center border border-black/15 bg-white px-7 text-sm font-medium transition hover:border-black"
                  >
                    Filtreleri Temizle
                  </Link>
                )}

                <Link
                  href="/#koleksiyonlar"
                  className="ml-0 mt-3 inline-flex min-h-12 items-center justify-center bg-[#181817] px-7 text-sm font-medium text-white sm:ml-3 sm:mt-7"
                >
                  Diğer Koleksiyonlar
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
                {category.products.map(
                  (product) => (
                    <ProductCard
                      key={
                        product.id
                      }
                      product={
                        product
                      }
                    />
                  )
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function SortButton({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center border px-4 text-sm transition ${
        active
          ? "border-black bg-black font-medium text-white"
          : "border-black/15 bg-white text-neutral-600 hover:border-black hover:text-black"
      }`}
    >
      {label}
    </Link>
  );
}