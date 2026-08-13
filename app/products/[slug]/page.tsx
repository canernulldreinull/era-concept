import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
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

  const product =
    await prisma.product.findUnique({
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
    product.description?.slice(
      0,
      155
    ) ||
    `${product.name} ürününü Era Concept'te keşfedin. Modern ve zamansız mobilya tasarımlarını inceleyin.`;

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

      title:
        `${product.name} | Era Concept`,

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

      title:
        `${product.name} | Era Concept`,

      description,

      images: [image],
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product =
    await prisma.product.findUnique({
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

  const price =
    Number(product.price);

  const compareAtPrice =
    product.compareAtPrice
      ? Number(
          product.compareAtPrice
        )
      : null;

  const hasDiscount =
    compareAtPrice !== null &&
    compareAtPrice > price;

  const discountPercentage =
    hasDiscount &&
    compareAtPrice !== null
      ? Math.round(
          ((compareAtPrice -
            price) /
            compareAtPrice) *
            100
        )
      : null;

  const productUrl =
    `https://eraconcept.com.tr/products/${product.slug}`;

  const productImage =
    product.images[0]?.url ||
    "https://eraconcept.com.tr/images/home/hero-salon.jpg";

  const cartProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price,
    stock: product.stock,

    imageUrl:
      product.images[0]?.url ??
      null,
  };

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type": "Product",

    name: product.name,

    description:
      product.shortDescription ||
      product.description ||
      `${product.name} - Era Concept`,

    image:
      product.images.length > 0
        ? product.images.map(
            (image) => image.url
          )
        : [productImage],

    url: productUrl,

    sku: product.id,

    category:
      product.category.name,

    brand: {
      "@type": "Brand",
      name: "Era Concept",
    },

    offers: {
      "@type": "Offer",

      url: productUrl,

      priceCurrency: "TRY",

      price:
        price.toFixed(2),

      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      itemCondition:
        "https://schema.org/NewCondition",
    },
  };

  const hasProductFeatures =
    product.color ||
    product.material ||
    product.width ||
    product.height ||
    product.depth ||
    product.weight;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData
            ),
        }}
      />

      <Header />

      <main className="min-h-screen bg-[#f5f2ec] pb-24 text-[#211f1b] lg:pb-0">
        {/* BREADCRUMB */}
        <div className="border-b border-black/[0.07] bg-[#faf8f4]">
          <div className="mx-auto max-w-[1500px] px-4 py-3.5 sm:px-8 sm:py-4 lg:px-10">
            <div className="flex min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-400 sm:text-[10px]">
              <Link
                href="/"
                className="shrink-0 transition hover:text-black"
              >
                Ana Sayfa
              </Link>

              <span className="shrink-0 text-neutral-300">
                /
              </span>

              <Link
                href={`/category/${product.category.slug}`}
                className="shrink-0 transition hover:text-black"
              >
                {
                  product
                    .category.name
                }
              </Link>

              <span className="shrink-0 text-neutral-300">
                /
              </span>

              <span className="truncate text-neutral-600">
                {product.name}
              </span>
            </div>
          </div>
        </div>

        {/* ANA ÜRÜN */}
        <section className="mx-auto max-w-[1500px] px-4 pb-14 pt-5 sm:px-8 sm:pb-20 sm:pt-8 lg:px-10 lg:py-16">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 xl:gap-20">
            {/* GALERİ */}
            <div className="min-w-0">
              <ProductGallery
                images={
                  product.images
                }
                productName={
                  product.name
                }
              />
            </div>

            {/* BİLGİ */}
            <div className="lg:sticky lg:top-[190px] lg:self-start">
              {/* KATEGORİ */}
              <div className="flex items-center justify-between gap-4">
                <Link
                  href={`/category/${product.category.slug}`}
                  className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9a7b56] transition hover:text-[#73583a] sm:text-[10px]"
                >
                  {
                    product.category
                      .name
                  }
                </Link>

                {hasDiscount &&
                  discountPercentage !==
                    null && (
                    <span className="bg-[#211f1b] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                      %
                      {
                        discountPercentage
                      }{" "}
                      Avantaj
                    </span>
                  )}
              </div>

              {/* İSİM */}
              <h1 className="era-display mt-4 text-[38px] leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[58px]">
                {product.name}
              </h1>

              {/* KISA AÇIKLAMA */}
              {product.shortDescription && (
                <p className="mt-5 max-w-xl text-[13px] leading-6 text-neutral-600 sm:mt-6 sm:text-[15px] sm:leading-7">
                  {
                    product.shortDescription
                  }
                </p>
              )}

              {/* FİYAT */}
              <div className="mt-7 border-y border-black/[0.09] py-5 sm:mt-8 sm:py-6">
                <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
                  <span className="text-[27px] font-semibold tracking-[-0.035em] text-[#211f1b] sm:text-[32px]">
                    {price.toLocaleString(
                      "tr-TR",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}{" "}
                    TL
                  </span>

                  {hasDiscount &&
                    compareAtPrice !==
                      null && (
                      <span className="pb-1 text-[13px] text-neutral-400 line-through sm:text-[15px]">
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

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <p className="text-[10px] text-neutral-400">
                    KDV dahil satış
                    fiyatı
                  </p>

                  {hasDiscount && (
                    <>
                      <span className="h-3 w-px bg-black/10" />

                      <p className="text-[10px] font-medium text-[#8a6743]">
                        Avantajlı fiyat
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* STOK */}
              <div className="flex items-center justify-between gap-4 border-b border-black/[0.08] py-5">
                <div className="flex items-center gap-2.5">
                  {product.stock >
                  0 ? (
                    <>
                      <span className="h-[7px] w-[7px] rounded-full bg-[#5b795d]" />

                      <span className="text-xs font-medium text-[#465d48]">
                        Stokta
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="h-[7px] w-[7px] rounded-full bg-[#9b4c43]" />

                      <span className="text-xs font-medium text-[#8a433b]">
                        Stokta Yok
                      </span>
                    </>
                  )}
                </div>

                {product.stock >
                  0 && (
                  <p className="text-[10px] text-neutral-400">
                    {
                      product.stock
                    }{" "}
                    adet mevcut
                  </p>
                )}
              </div>

              {/* DESKTOP / TABLET SEPET */}
              <div className="mt-7 hidden lg:block">
                <AddToCartButton
                  product={
                    cartProduct
                  }
                />
              </div>

              {/* GÜVEN KARTLARI */}
              <div className="mt-7 grid grid-cols-3 border-y border-black/[0.08] sm:mt-8">
                <TrustItem
                  icon={
                    <ShieldIcon />
                  }
                  title="Güvenli"
                  text="Alışveriş"
                />

                <TrustItem
                  icon={
                    <TruckIcon />
                  }
                  title="Planlı"
                  text="Teslimat"
                />

                <TrustItem
                  icon={
                    <SupportIcon />
                  }
                  title="Satış Sonrası"
                  text="Destek"
                />
              </div>

              {/* HIZLI BİLGİLER */}
              <div className="mt-8 border-t border-black/[0.09]">
                <ProductAccordion
                  title="Ürün Bilgileri"
                >
                  {hasProductFeatures ? (
                    <div className="divide-y divide-black/[0.07]">
                      {product.color && (
                        <Info
                          title="Renk"
                          value={
                            product.color
                          }
                        />
                      )}

                      {product.material && (
                        <Info
                          title="Malzeme"
                          value={
                            product.material
                          }
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
                  ) : (
                    <p className="text-xs leading-6 text-neutral-500">
                      Detaylı ürün
                      özellikleri için
                      bizimle iletişime
                      geçebilirsiniz.
                    </p>
                  )}
                </ProductAccordion>

                {product.description && (
                  <ProductAccordion
                    title="Açıklama"
                  >
                    <p className="whitespace-pre-line text-[13px] leading-7 text-neutral-600 sm:text-sm">
                      {
                        product.description
                      }
                    </p>
                  </ProductAccordion>
                )}

                <ProductAccordion
                  title="Teslimat"
                >
                  <p className="text-[13px] leading-7 text-neutral-600">
                    Mobilya
                    siparişlerinde
                    teslimat süreci ürün
                    ve teslimat bölgesine
                    göre planlanır.
                    Siparişinizin
                    durumunu sipariş
                    takibi üzerinden
                    kontrol
                    edebilirsiniz.
                  </p>

                  <Link
                    href="/teslimat"
                    className="mt-4 inline-flex border-b border-black/25 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                  >
                    Teslimat
                    Bilgileri
                  </Link>
                </ProductAccordion>

                <ProductAccordion
                  title="Destek"
                >
                  <p className="text-[13px] leading-7 text-neutral-600">
                    Ürün, sipariş veya
                    teslimat hakkında
                    bilgi almak için
                    Era Concept ile
                    iletişime
                    geçebilirsiniz.
                  </p>

                  <Link
                    href="/iletisim"
                    className="mt-4 inline-flex border-b border-black/25 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                  >
                    İletişime Geç
                  </Link>
                </ProductAccordion>
              </div>
            </div>
          </div>
        </section>

        {/* MARKA MESAJI */}
        <section className="border-y border-black/[0.07] bg-[#ebe6dd]">
          <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.7fr_1fr] lg:items-center lg:px-10 lg:py-24">
            <div>
              <p className="era-kicker">
                Era Concept
              </p>

              <h2 className="era-display mt-5 text-[38px] leading-[1.04] sm:text-[50px]">
                Detaylarda
                <br />
                bütünlük.
              </h2>
            </div>

            <div className="max-w-xl lg:ml-auto">
              <p className="text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
                Mobilyayı yalnızca
                tek bir ürün olarak
                değil, yaşam alanınızın
                bütünü içinde
                değerlendiriyoruz.
              </p>

              <Link
                href={`/category/${product.category.slug}`}
                className="group mt-7 inline-flex items-center gap-4 border-b border-black/20 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em]"
              >
                {
                  product.category
                    .name
                }{" "}
                Koleksiyonu

                <span className="text-[#9a7b56] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* MOBİL SABİT SATIN ALMA ÇUBUĞU */}
      {product.stock > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-[45] border-t border-black/10 bg-[#faf8f4]/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <div className="min-w-[100px] shrink-0">
              <p className="text-[9px] uppercase tracking-[0.12em] text-neutral-400">
                Fiyat
              </p>

              <p className="mt-1 whitespace-nowrap text-[15px] font-semibold tracking-[-0.02em]">
                {price.toLocaleString(
                  "tr-TR",
                  {
                    minimumFractionDigits: 2,
                  }
                )}{" "}
                TL
              </p>
            </div>

            <div className="min-w-0 flex-1">
              <AddToCartButton
                product={
                  cartProduct
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ProductAccordion({
  title,
  children,
}: {
  title: string;
  children:
    React.ReactNode;
}) {
  return (
    <details className="group border-b border-black/[0.09]">
      <summary className="flex min-h-[58px] list-none items-center justify-between gap-5 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2d2a25]">
        {title}

        <span className="relative flex h-5 w-5 items-center justify-center">
          <span className="absolute h-px w-3 bg-current" />

          <span className="absolute h-3 w-px bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
        </span>
      </summary>

      <div className="pb-6">
        {children}
      </div>
    </details>
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
    <div className="flex items-center justify-between gap-5 py-3.5 text-xs">
      <span className="text-neutral-500">
        {title}
      </span>

      <span className="text-right font-medium text-[#292722]">
        {value}
      </span>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="border-r border-black/[0.08] px-2 py-5 text-center last:border-r-0 sm:px-4">
      <div className="mx-auto flex h-6 w-6 items-center justify-center text-[#9a7b56]">
        {icon}
      </div>

      <p className="mt-3 text-[10px] font-semibold text-[#292722]">
        {title}
      </p>

      <p className="mt-1 text-[9px] leading-4 text-neutral-400 sm:text-[10px]">
        {text}
      </p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />

      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 17h4V5H2v12h3" />
      <path d="M14 9h4l4 4v4h-3" />
      <circle
        cx="7.5"
        cy="17.5"
        r="2.5"
      />
      <circle
        cx="16.5"
        cy="17.5"
        r="2.5"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 13v-2a8 8 0 0 1 16 0v2" />

      <path d="M18 19c0 1.1-.9 2-2 2h-3" />

      <path d="M4 13a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Z" />

      <path d="M20 13a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z" />
    </svg>
  );
}