import type { Metadata } from "next";
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
    "/images/home/oturma-odasi-koleksiyon.jpg",

  "yatak-odasi":
    "/images/home/modernyatakodasi.jpg",

  "yemek-odasi":
    "/images/home/sikyemekodasi.jpg",

  "tv-uniteleri":
    "/images/home/tvunitesi.jpg",

  "calisma-alani":
    "/images/home/calismamasasi.jpg",

  kitaplik:
    "/images/home/kitaplik.png",
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  const category =
    await prisma.category.findUnique({
      where: {
        slug,
      },
    });

  if (!category || !category.active) {
    return {
      title: "Kategori Bulunamadı",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    category.description ||
    `${category.name} koleksiyonunu Era Concept'te keşfedin. Modern ve zamansız mobilya tasarımlarını inceleyin.`;

  const categoryUrl =
    `https://eraconcept.com.tr/category/${category.slug}`;

  const image =
    categoryHeroMap[category.slug] ||
    category.imageUrl ||
    "/images/home/hero-salon.jpg";

  return {
    title: category.name,

    description,

    alternates: {
      canonical: categoryUrl,
    },

    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: categoryUrl,
      siteName: "Era Concept",

      title:
        `${category.name} | Era Concept`,

      description,

      images: [
        {
          url: image,
          alt:
            `${category.name} koleksiyonu`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title:
        `${category.name} | Era Concept`,

      description,

      images: [image],
    },
  };
}

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
              price:
                "desc" as const,
            },
          ]
        : sort === "newest"
          ? [
              {
                createdAt:
                  "desc" as const,
              },
            ]
          : [
              {
                featured:
                  "desc" as const,
              },
              {
                createdAt:
                  "desc" as const,
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

              // ProductCard hover için
              take: 2,
            },
          },
        },
      },
    });

  if (
    !category ||
    !category.active
  ) {
    notFound();
  }

  const categorySlug =
    category.slug;

  const heroImage =
    categoryHeroMap[
      category.slug
    ] ||
    category.imageUrl ||
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

  const currentSortLabel =
    sort === "newest"
      ? "En Yeni"
      : sort === "price-asc"
        ? "Fiyat: Artan"
        : sort ===
            "price-desc"
          ? "Fiyat: Azalan"
          : "Öne Çıkan";

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f5f2ec] text-[#211f1b]">
        {/* HERO */}
        {heroImage ? (
          <section className="relative min-h-[390px] overflow-hidden sm:min-h-[500px] lg:min-h-[610px]">
            <Image
              src={heroImage}
              alt={`${category.name} koleksiyonu`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            {/* Mobilde metnin okunması için alttan daha koyu */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5 lg:bg-gradient-to-r lg:from-black/65 lg:via-black/20 lg:to-transparent" />

            <div className="relative mx-auto flex min-h-[390px] max-w-[1500px] items-end px-5 pb-10 pt-24 text-white sm:min-h-[500px] sm:px-8 sm:pb-14 lg:min-h-[610px] lg:px-10 lg:pb-16">
              <div className="max-w-3xl">
                {/* BREADCRUMB */}
                <div className="mb-5 flex flex-wrap items-center gap-2 text-[9px] font-medium uppercase tracking-[0.14em] text-white/55 sm:text-[10px]">
                  <Link
                    href="/"
                    className="transition hover:text-white"
                  >
                    Ana Sayfa
                  </Link>

                  <span>
                    /
                  </span>

                  <span className="text-white/80">
                    Koleksiyonlar
                  </span>
                </div>

                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#d4b995] sm:text-[10px]">
                  Era Concept
                </p>

                <h1 className="era-display mt-4 text-[46px] leading-[0.98] sm:text-[62px] lg:text-[76px]">
                  {category.name}
                </h1>

                {category.description && (
                  <p className="mt-5 max-w-xl text-[13px] leading-6 text-white/70 sm:text-base sm:leading-8">
                    {
                      category.description
                    }
                  </p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="border-b border-black/[0.07] bg-[#faf8f4]">
            <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
              <p className="era-kicker">
                Era Concept
              </p>

              <h1 className="era-display mt-5 text-[46px] sm:text-[64px]">
                {category.name}
              </h1>

              {category.description && (
                <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600">
                  {
                    category.description
                  }
                </p>
              )}
            </div>
          </section>
        )}

        {/* MOBİL STICKY FİLTRE */}
        <div className="sticky top-[112px] z-30 border-b border-black/[0.08] bg-[#faf8f4]/95 backdrop-blur-xl lg:hidden">
          <div className="grid grid-cols-2 divide-x divide-black/[0.08]">
            {/* STOK */}
            <Link
              href={createFilterUrl({
                nextStock:
                  onlyInStock
                    ? undefined
                    : "1",
              })}
              className={`flex min-h-[52px] items-center justify-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                onlyInStock
                  ? "bg-[#211f1b] text-white"
                  : "text-[#312f2a]"
              }`}
            >
              {onlyInStock && (
                <span>
                  ✓
                </span>
              )}

              Stokta
            </Link>

            {/* SIRALAMA */}
            <details className="group relative">
              <summary className="flex min-h-[52px] list-none items-center justify-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#312f2a]">
                {currentSortLabel}

                <span className="text-xs transition group-open:rotate-180">
                  ↓
                </span>
              </summary>

              <div className="absolute right-0 top-full z-40 w-[210px] border border-black/[0.08] bg-[#faf8f4] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                <MobileSortLink
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

                <MobileSortLink
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

                <MobileSortLink
                  label="Fiyat: Artan"
                  href={createFilterUrl({
                    nextSort:
                      "price-asc",
                  })}
                  active={
                    sort ===
                    "price-asc"
                  }
                />

                <MobileSortLink
                  label="Fiyat: Azalan"
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
            </details>
          </div>
        </div>

        {/* ÜRÜNLER */}
        <section className="mx-auto max-w-[1500px] px-4 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          {/* BAŞLIK */}
          <div className="border-b border-black/[0.09] pb-7 sm:pb-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="era-kicker">
                  Koleksiyon
                </p>

                <h2 className="era-display mt-4 text-[36px] leading-[1.04] sm:text-[48px]">
                  {
                    category.name
                  }{" "}
                  seçkisi.
                </h2>

                <p className="mt-3 text-xs text-neutral-500">
                  {
                    category
                      .products
                      .length
                  }{" "}
                  ürün
                  gösteriliyor
                </p>
              </div>

              {/* DESKTOP FILTERS */}
              <div className="hidden items-center gap-3 lg:flex">
                <Link
                  href={createFilterUrl({
                    nextStock:
                      onlyInStock
                        ? undefined
                        : "1",
                  })}
                  className={`flex min-h-[46px] items-center px-5 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${
                    onlyInStock
                      ? "bg-[#211f1b] text-white"
                      : "border border-black/10 bg-[#faf8f4] hover:border-black/30"
                  }`}
                >
                  {onlyInStock
                    ? "✓ Stokta Olanlar"
                    : "Stokta Olanlar"}
                </Link>

                <div className="flex border border-black/10 bg-[#faf8f4]">
                  <DesktopSortLink
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

                  <DesktopSortLink
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

                  <DesktopSortLink
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

                  <DesktopSortLink
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

          {/* GRID */}
          <div className="mt-8 sm:mt-12">
            {category.products
              .length === 0 ? (
              <div className="border border-black/[0.08] bg-[#faf8f4] px-6 py-20 text-center sm:py-24">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9a7b56]">
                  Era Concept
                </p>

                <h3 className="era-display mt-4 text-3xl sm:text-4xl">
                  Ürün
                  bulunamadı.
                </h3>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-neutral-500">
                  Seçtiğiniz
                  filtrelere uygun
                  ürün bulunmuyor.
                </p>

                <Link
                  href={`/category/${categorySlug}`}
                  className="mt-8 inline-flex min-h-[50px] items-center justify-center bg-[#211f1b] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white"
                >
                  Filtreleri
                  Temizle
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-14 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-16">
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

        {/* ALT BRAND CTA */}
        <section className="border-t border-black/[0.07] bg-[#ebe6dd]">
          <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10 lg:py-24">
            <div>
              <p className="era-kicker">
                Era Concept
              </p>

              <h2 className="era-display mt-4 max-w-2xl text-[36px] leading-[1.05] sm:text-[48px]">
                Yaşam alanınızı
                bir bütün olarak
                tasarlayın.
              </h2>
            </div>

            <Link
              href="/#koleksiyonlar"
              className="flex min-h-[52px] w-full items-center justify-center bg-[#211f1b] px-7 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-black sm:w-fit"
            >
              Tüm
              Koleksiyonlar
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function MobileSortLink({
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
      className={`flex min-h-[46px] items-center justify-between px-4 text-xs ${
        active
          ? "bg-[#211f1b] text-white"
          : "text-neutral-600 hover:bg-[#eeeae3]"
      }`}
    >
      {label}

      {active && (
        <span>
          ✓
        </span>
      )}
    </Link>
  );
}

function DesktopSortLink({
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
      className={`flex min-h-[44px] items-center border-r border-black/[0.08] px-4 text-[10px] font-medium last:border-r-0 ${
        active
          ? "bg-[#211f1b] text-white"
          : "text-neutral-500 transition hover:bg-[#eeeae3] hover:text-black"
      }`}
    >
      {label}
    </Link>
  );
}