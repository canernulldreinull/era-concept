import Link from "next/link";

import { prisma } from "@/lib/prisma";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import ProductCard from "@/components/store/ProductCard";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;

  const query =
    typeof q === "string"
      ? q.trim()
      : "";

  const products = query
    ? await prisma.product.findMany({
        where: {
          active: true,

          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              shortDescription: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              sku: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              category: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          ],
        },

        orderBy: [
          {
            featured: "desc",
          },
          {
            createdAt: "desc",
          },
        ],

        include: {
          images: {
            orderBy: {
              position: "asc",
            },

            take: 1,
          },

          category: true,
        },
      })
    : [];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f7f4] text-[#181817]">
        <section className="border-b border-black/5 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Arama
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              {query
                ? `"${query}" için sonuçlar`
                : "Ürün Ara"}
            </h1>

            {query && (
              <p className="mt-4 text-sm text-neutral-500">
                {products.length} ürün bulundu.
              </p>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
          {!query ? (
            <div className="border border-black/10 bg-white p-8">
              <p className="text-sm text-neutral-500">
                Aramak istediğiniz ürün veya kategori adını üstteki arama alanına yazın.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="border border-black/10 bg-white px-6 py-16 text-center">
              <h2 className="text-2xl font-medium">
                Sonuç bulunamadı.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
                Farklı bir ürün adı, kategori veya kelime ile tekrar arama yapabilirsiniz.
              </p>

              <Link
                href="/#koleksiyonlar"
                className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#181817] px-7 text-sm font-medium text-white"
              >
                Koleksiyonları İncele
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}