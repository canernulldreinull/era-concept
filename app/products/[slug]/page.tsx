import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import Header from "@/components/store/Header";
import ProductGallery from "@/components/store/ProductGallery";
import AddToCartButton from "@/components/cart/AddToCartButton";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!product || !product.active) {
    return {
      title: "Ürün Bulunamadı",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    product.shortDescription ||
    product.description?.slice(0, 155) ||
    `${product.name} ürününü Era Concept'te keşfedin. Modern ve şık mobilya seçeneklerini inceleyin.`;

  const productUrl =
    `https://eraconcept.com.tr/products/${product.slug}`;

  const image =
    product.images[0]?.url ||
    "/images/home/hero-salon.jpg";

  return {
    title: product.name,

    description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: productUrl,
      siteName: "Era Concept",
      title: `${product.name} | Era Concept`,
      description,
      images: [
        {
          url: image,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Era Concept`,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },

    include: {
      category: true,

      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!product || !product.active) {
    notFound();
  }

  const price = Number(product.price);

  const compareAtPrice = product.compareAtPrice
    ? Number(product.compareAtPrice)
    : null;

  const hasDiscount =
    compareAtPrice !== null &&
    compareAtPrice > price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((compareAtPrice - price) /
          compareAtPrice) *
          100
      )
    : null;

        const productUrl =
  `https://eraconcept.com.tr/products/${product.slug}`;

const productImage =
  product.images[0]?.url ||
  "https://eraconcept.com.tr/images/home/hero-salon.jpg";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description:
    product.shortDescription ||
    product.description ||
    `${product.name} - Era Concept`,
  image: product.images.length > 0
    ? product.images.map((image) => image.url)
    : [productImage],
  url: productUrl,
  sku: product.id,
  category: product.category.name,
  brand: {
    "@type": "Brand",
    name: "Era Concept",
  },
  offers: {
    "@type": "Offer",
    url: productUrl,
    priceCurrency: "TRY",
    price: price.toFixed(2),
    availability:
      product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    itemCondition:
      "https://schema.org/NewCondition",
  },
};

  return (
    <>
    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(structuredData),
  }}
/>
      <Header />

      <main className="bg-[#f8f7f4] text-[#181817]">
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

              <Link
                href={`/category/${product.category.slug}`}
                className="transition hover:text-black"
              >
                {product.category.name}
              </Link>

              <span>/</span>

              <span className="text-neutral-800">
                {product.name}
              </span>
            </div>
          </div>
        </div>

        {/* ANA ÜRÜN ALANI */}
        <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            {/* GALERİ */}
            <div>
              <ProductGallery
                images={product.images}
                productName={product.name}
              />
            </div>

            {/* ÜRÜN BİLGİLERİ */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                {product.category.name}
              </p>

              <h1 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.035em] sm:text-5xl">
                {product.name}
              </h1>

              {product.shortDescription && (
                <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                  {product.shortDescription}
                </p>
              )}

              {/* FİYAT */}
              <div className="mt-8 border-y border-black/10 py-6">
                <div className="flex flex-wrap items-end gap-3">
                  <span className="text-3xl font-semibold tracking-tight">
                    {price.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    TL
                  </span>

                  {hasDiscount && (
                    <>
                      <span className="pb-1 text-base text-neutral-400 line-through">
                        {compareAtPrice.toLocaleString(
                          "tr-TR",
                          {
                            minimumFractionDigits: 2,
                          }
                        )}{" "}
                        TL
                      </span>

                      {discountPercentage !== null && (
                        <span className="mb-1 bg-[#181817] px-2.5 py-1 text-xs font-semibold text-white">
                          %{discountPercentage} İndirim
                        </span>
                      )}
                    </>
                  )}
                </div>

                <p className="mt-2 text-xs text-neutral-500">
                  KDV dahil satış fiyatı
                </p>
              </div>

              {/* STOK */}
              <div className="mt-6">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    <span className="font-medium text-emerald-800">
                      Stokta
                    </span>

                    <span className="text-neutral-500">
                      · {product.stock} adet
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-red-600" />

                    <span className="font-medium text-red-700">
                      Ürün stokta bulunmuyor
                    </span>
                  </div>
                )}
              </div>

              {/* SEPET */}
              <div className="mt-7">
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price,
                    stock: product.stock,
                    imageUrl:
                      product.images[0]?.url ??
                      null,
                  }}
                />
              </div>

              {/* GÜVEN BİLGİLERİ */}
              <div className="mt-8 grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-3">
                <TrustItem
                  title="Güvenli Alışveriş"
                  text="Korunan ödeme süreci"
                />

                <TrustItem
                  title="Teslimat"
                  text="Sipariş takibi"
                />

                <TrustItem
                  title="Destek"
                  text="Sipariş öncesi ve sonrası"
                />
              </div>

              {/* ÖZELLİKLER */}
              {(product.color ||
                product.material ||
                product.width ||
                product.height ||
                product.depth ||
                product.weight) && (
                <div className="mt-10">
                  <h2 className="text-lg font-semibold">
                    Ürün Özellikleri
                  </h2>

                  <div className="mt-5 divide-y divide-black/10 border-y border-black/10">
                    {product.color && (
                      <Info
                        title="Renk"
                        value={product.color}
                      />
                    )}

                    {product.material && (
                      <Info
                        title="Malzeme"
                        value={product.material}
                      />
                    )}

                    {product.width && (
                      <Info
                        title="Genişlik"
                        value={`${Number(
                          product.width
                        )} cm`}
                      />
                    )}

                    {product.height && (
                      <Info
                        title="Yükseklik"
                        value={`${Number(
                          product.height
                        )} cm`}
                      />
                    )}

                    {product.depth && (
                      <Info
                        title="Derinlik"
                        value={`${Number(
                          product.depth
                        )} cm`}
                      />
                    )}

                    {product.weight && (
                      <Info
                        title="Ağırlık"
                        value={`${Number(
                          product.weight
                        )} kg`}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* AÇIKLAMA */}
        {product.description && (
          <section className="border-t border-black/5 bg-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[0.35fr_0.65fr] sm:py-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  Ürün Detayı
                </p>

                <h2 className="mt-4 text-3xl font-medium tracking-[-0.03em]">
                  Ürün hakkında
                </h2>
              </div>

              <div className="max-w-3xl">
                <p className="whitespace-pre-line text-base leading-8 text-neutral-600">
                  {product.description}
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-4 text-sm">
      <span className="text-neutral-500">
        {title}
      </span>

      <span className="text-right font-medium text-neutral-900">
        {value}
      </span>
    </div>
  );
}

function TrustItem({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white p-4">
      <p className="text-xs font-semibold">
        {title}
      </p>

      <p className="mt-1 text-[11px] leading-4 text-neutral-500">
        {text}
      </p>
    </div>
  );
}