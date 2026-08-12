"use client";

import Image from "next/image";
import Link from "next/link";

import Header from "@/components/store/Header";
import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const {
    items,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f7f4] text-[#181817]">
        <section className="border-b border-black/5 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Alışveriş Sepeti
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
              Sepetim
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
          {items.length === 0 ? (
            <div className="border border-black/10 bg-white px-6 py-16 text-center sm:px-10">
              <h2 className="text-2xl font-medium">
                Sepetiniz şu anda boş.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
                Era Concept koleksiyonlarını inceleyerek
                beğendiğiniz ürünleri sepetinize ekleyebilirsiniz.
              </p>

              <Link
                href="/#urunler"
                className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#181817] px-7 text-sm font-medium text-white transition hover:bg-black"
              >
                Ürünleri İncele
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
              {/* ÜRÜNLER */}
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Sepetteki Ürünler
                  </h2>

                  <p className="text-sm text-neutral-500">
                    {items.reduce(
                      (total, item) =>
                        total + item.quantity,
                      0
                    )}{" "}
                    ürün
                  </p>
                </div>

                <div className="divide-y divide-black/10 border-y border-black/10 bg-white">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="grid gap-5 px-4 py-6 sm:grid-cols-[150px_1fr] sm:px-6"
                    >
                      {/* GÖRSEL */}
                      <Link
                        href={`/products/${item.slug}`}
                        className="relative aspect-square overflow-hidden bg-[#efeee9]"
                      >
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="150px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                            Görsel yok
                          </div>
                        )}
                      </Link>

                      {/* BİLGİLER */}
                      <div className="flex min-w-0 flex-col justify-between gap-6">
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <Link
                              href={`/products/${item.slug}`}
                              className="text-lg font-medium transition hover:text-neutral-600"
                            >
                              {item.name}
                            </Link>

                            <p className="mt-2 text-sm text-neutral-500">
                              Birim fiyat
                            </p>

                            <p className="mt-1 font-medium">
                              {item.price.toLocaleString(
                                "tr-TR",
                                {
                                  minimumFractionDigits: 2,
                                }
                              )}{" "}
                              TL
                            </p>
                          </div>

                          <p className="shrink-0 text-right font-semibold">
                            {(
                              item.price *
                              item.quantity
                            ).toLocaleString(
                              "tr-TR",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}{" "}
                            TL
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-5">
                          {/* ADET */}
                          <div className="flex items-center border border-black/15">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.id
                                )
                              }
                              className="flex h-11 w-11 cursor-pointer items-center justify-center text-lg transition hover:bg-neutral-100"
                              aria-label="Adedi azalt"
                            >
                              −
                            </button>

                            <span className="flex h-11 min-w-12 items-center justify-center border-x border-black/15 text-sm font-medium">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              disabled={
                                item.quantity >=
                                item.stock
                              }
                              onClick={() =>
                                increaseQuantity(
                                  item.id
                                )
                              }
                              className="flex h-11 w-11 cursor-pointer items-center justify-center text-lg transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label="Adedi artır"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="cursor-pointer text-sm text-neutral-500 underline-offset-4 transition hover:text-red-700 hover:underline"
                          >
                            Sepetten kaldır
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <Link
                  href="/#urunler"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-black"
                >
                  ← Alışverişe devam et
                </Link>
              </div>

              {/* SİPARİŞ ÖZETİ */}
              <aside className="h-fit border border-black/10 bg-white p-6 lg:sticky lg:top-28">
                <h2 className="text-xl font-semibold">
                  Sipariş Özeti
                </h2>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between gap-6 text-neutral-600">
                    <span>Ara toplam</span>

                    <span className="font-medium text-neutral-900">
                      {totalPrice.toLocaleString(
                        "tr-TR",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}{" "}
                      TL
                    </span>
                  </div>

                  <div className="flex justify-between gap-6 text-neutral-600">
                    <span>Kargo</span>

                    <span>
                      Adres aşamasında
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-black/10 pt-6">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <p className="text-sm text-neutral-500">
                        Toplam
                      </p>

                      <p className="mt-1 text-xs text-neutral-400">
                        Kargo hariç
                      </p>
                    </div>

                    <p className="text-2xl font-semibold tracking-tight">
                      {totalPrice.toLocaleString(
                        "tr-TR",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}{" "}
                      TL
                    </p>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-7 flex min-h-13 w-full items-center justify-center bg-[#181817] px-6 text-sm font-medium text-white transition hover:bg-black"
                >
                  Ödemeye Geç
                </Link>

                <div className="mt-6 space-y-3 border-t border-black/10 pt-6">
                  <SummaryInfo text="Güvenli ödeme altyapısı" />
                  <SummaryInfo text="Sipariş sonrası takip" />
                  <SummaryInfo text="Müşteri desteği" />
                </div>
              </aside>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

function SummaryInfo({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-xs text-neutral-500">
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
      <span>{text}</span>
    </div>
  );
}