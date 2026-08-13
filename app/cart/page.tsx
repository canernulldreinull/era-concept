"use client";

import Image from "next/image";
import Link from "next/link";

import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const {
    items,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  const totalQuantity = items.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f5f2ec] pb-28 text-[#211f1b] lg:pb-0">
        {/* BAŞLIK */}
        <section className="border-b border-black/[0.07] bg-[#faf8f4]">
          <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <p className="era-kicker">
              Alışveriş Sepeti
            </p>

            <div className="mt-4 flex items-end justify-between gap-6">
              <h1 className="era-display text-[44px] leading-none sm:text-[58px]">
                Sepetim
              </h1>

              {items.length > 0 && (
                <p className="pb-1 text-[10px] uppercase tracking-[0.14em] text-neutral-400">
                  {totalQuantity} ürün
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
          {items.length === 0 ? (
            /* BOŞ SEPET */
            <div className="border border-black/[0.08] bg-[#faf8f4] px-5 py-20 text-center sm:px-10 sm:py-28">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-black/10 text-neutral-400">
                <CartIcon />
              </div>

              <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9a7b56]">
                Era Concept
              </p>

              <h2 className="era-display mt-4 text-[34px] leading-tight sm:text-[44px]">
                Sepetiniz şu anda boş.
              </h2>

              <p className="mx-auto mt-4 max-w-md text-[13px] leading-7 text-neutral-500 sm:text-sm">
                Koleksiyonlarımızı inceleyerek yaşam
                alanınıza uygun ürünleri sepetinize
                ekleyebilirsiniz.
              </p>

              <Link
                href="/#urunler"
                className="mt-8 inline-flex min-h-[52px] items-center justify-center bg-[#211f1b] px-8 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-black"
              >
                Ürünleri İncele
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_390px] lg:gap-14 xl:gap-20">
              {/* ÜRÜNLER */}
              <div className="min-w-0">
                <div className="mb-5 flex items-center justify-between border-b border-black/[0.08] pb-4 sm:mb-7">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#302e29]">
                    Sepetteki Ürünler
                  </h2>

                  <span className="text-[10px] text-neutral-400">
                    {totalQuantity} adet
                  </span>
                </div>

                <div className="divide-y divide-black/[0.08]">
                  {items.map((item) => {
                    const itemTotal =
                      item.price *
                      item.quantity;

                    return (
                      <article
                        key={item.id}
                        className="grid grid-cols-[112px_1fr] gap-4 py-5 sm:grid-cols-[155px_1fr] sm:gap-7 sm:py-7"
                      >
                        {/* GÖRSEL */}
                        <Link
                          href={`/products/${item.slug}`}
                          className="relative aspect-[4/5] overflow-hidden bg-[#e9e6df]"
                        >
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              sizes="(max-width: 640px) 112px, 155px"
                              className="object-cover transition duration-500 hover:scale-[1.025]"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-[0.14em] text-neutral-400">
                              Era Concept
                            </div>
                          )}
                        </Link>

                        {/* BİLGİ */}
                        <div className="flex min-w-0 flex-col">
                          <div>
                            <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#9a7b56] sm:text-[9px]">
                              Era Concept
                            </p>

                            <Link
                              href={`/products/${item.slug}`}
                              className="mt-2 block text-[14px] font-medium leading-5 tracking-[-0.01em] text-[#292722] transition hover:text-[#80654a] sm:text-[17px] sm:leading-6"
                            >
                              {item.name}
                            </Link>

                            <p className="mt-3 text-[12px] font-semibold tracking-[-0.02em] sm:text-sm">
                              {item.price.toLocaleString(
                                "tr-TR",
                                {
                                  minimumFractionDigits: 2,
                                }
                              )}{" "}
                              TL
                            </p>
                          </div>

                          {/* MOBİL TOPLAM */}
                          <div className="mt-4 sm:hidden">
                            <p className="text-[9px] uppercase tracking-[0.12em] text-neutral-400">
                              Toplam
                            </p>

                            <p className="mt-1 text-[13px] font-semibold">
                              {itemTotal.toLocaleString(
                                "tr-TR",
                                {
                                  minimumFractionDigits: 2,
                                }
                              )}{" "}
                              TL
                            </p>
                          </div>

                          {/* ADET + SİL */}
                          <div className="mt-auto pt-5">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div className="flex h-[42px] items-center border border-black/[0.13] bg-[#faf8f4] sm:h-[46px]">
                                <button
                                  type="button"
                                  onClick={() =>
                                    decreaseQuantity(
                                      item.id
                                    )
                                  }
                                  className="flex h-full w-10 items-center justify-center text-lg font-light transition hover:bg-[#ebe6dd] sm:w-11"
                                  aria-label="Adedi azalt"
                                >
                                  −
                                </button>

                                <span className="flex h-full min-w-[40px] items-center justify-center border-x border-black/[0.1] text-xs font-medium sm:min-w-[46px]">
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
                                  className="flex h-full w-10 items-center justify-center text-lg font-light transition hover:bg-[#ebe6dd] disabled:cursor-not-allowed disabled:opacity-25 sm:w-11"
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
                                className="text-[9px] font-semibold uppercase tracking-[0.1em] text-neutral-400 transition hover:text-[#914d43] sm:text-[10px]"
                              >
                                Kaldır
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* MASAÜSTÜ TOPLAM */}
                        <div className="hidden sm:col-start-2 sm:flex sm:justify-end">
                          <div className="-mt-[50px] text-right">
                            <p className="text-[9px] uppercase tracking-[0.12em] text-neutral-400">
                              Ürün Toplamı
                            </p>

                            <p className="mt-1 text-sm font-semibold">
                              {itemTotal.toLocaleString(
                                "tr-TR",
                                {
                                  minimumFractionDigits: 2,
                                }
                              )}{" "}
                              TL
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <Link
                  href="/#urunler"
                  className="group mt-7 inline-flex items-center gap-3 border-b border-black/20 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-600 transition hover:text-black"
                >
                  <span className="transition-transform group-hover:-translate-x-1">
                    ←
                  </span>

                  Alışverişe Devam Et
                </Link>
              </div>

              {/* DESKTOP SİPARİŞ ÖZETİ */}
              <aside className="hidden h-fit border border-black/[0.09] bg-[#faf8f4] p-7 lg:sticky lg:top-[190px] lg:block">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9a7b56]">
                  Sipariş
                </p>

                <h2 className="era-display mt-3 text-[32px]">
                  Sipariş Özeti
                </h2>

                <div className="mt-7 space-y-4 border-y border-black/[0.08] py-6">
                  <SummaryRow
                    label="Ürünler"
                    value={`${totalQuantity} adet`}
                  />

                  <SummaryRow
                    label="Ara Toplam"
                    value={`${totalPrice.toLocaleString(
                      "tr-TR",
                      {
                        minimumFractionDigits: 2,
                      }
                    )} TL`}
                  />

                  <SummaryRow
                    label="Teslimat"
                    value="Adres aşamasında"
                    muted
                  />
                </div>

                <div className="flex items-end justify-between gap-5 py-7">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                      Toplam
                    </p>

                    <p className="mt-1 text-[10px] text-neutral-400">
                      Kargo hariç
                    </p>
                  </div>

                  <p className="text-[25px] font-semibold tracking-[-0.035em]">
                    {totalPrice.toLocaleString(
                      "tr-TR",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}{" "}
                    TL
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="flex min-h-[56px] w-full items-center justify-center bg-[#211f1b] px-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black"
                >
                  Ödemeye Geç
                </Link>

                <div className="mt-7 border-t border-black/[0.08] pt-6">
                  <SummaryInfo
                    icon={<ShieldIcon />}
                    title="Güvenli alışveriş"
                    text="Korunan sipariş süreci"
                  />

                  <SummaryInfo
                    icon={<TruckIcon />}
                    title="Planlı teslimat"
                    text="Teslimat bilgileri adres aşamasında"
                  />

                  <SummaryInfo
                    icon={<SupportIcon />}
                    title="Müşteri desteği"
                    text="Sipariş öncesi ve sonrası"
                  />
                </div>
              </aside>
            </div>
          )}
        </section>

        {/* MOBİL GÜVEN ALANI */}
        {items.length > 0 && (
          <section className="border-y border-black/[0.07] bg-[#ebe6dd] lg:hidden">
            <div className="grid grid-cols-3">
              <MobileTrust
                icon={<ShieldIcon />}
                title="Güvenli"
              />

              <MobileTrust
                icon={<TruckIcon />}
                title="Teslimat"
              />

              <MobileTrust
                icon={<SupportIcon />}
                title="Destek"
              />
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* MOBİL SABİT ÖDEME ÇUBUĞU */}
      {items.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-[45] border-t border-black/[0.1] bg-[#faf8f4]/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <div className="min-w-[112px] shrink-0">
              <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                Toplam
              </p>

              <p className="mt-1 whitespace-nowrap text-[15px] font-semibold tracking-[-0.025em]">
                {totalPrice.toLocaleString(
                  "tr-TR",
                  {
                    minimumFractionDigits: 2,
                  }
                )}{" "}
                TL
              </p>
            </div>

            <Link
              href="/checkout"
              className="flex min-h-[54px] min-w-0 flex-1 items-center justify-center bg-[#211f1b] px-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-white transition active:bg-black"
            >
              Ödemeye Geç
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function SummaryRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-5 text-xs">
      <span className="text-neutral-500">
        {label}
      </span>

      <span
        className={
          muted
            ? "text-[10px] text-neutral-400"
            : "font-medium text-[#292722]"
        }
      >
        {value}
      </span>
    </div>
  );
}

function SummaryInfo({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 border-b border-black/[0.06] py-4 last:border-b-0">
      <div className="mt-0.5 shrink-0 text-[#9a7b56]">
        {icon}
      </div>

      <div>
        <p className="text-[10px] font-semibold text-[#302e29]">
          {title}
        </p>

        <p className="mt-1 text-[9px] leading-4 text-neutral-400">
          {text}
        </p>
      </div>
    </div>
  );
}

function MobileTrust({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex min-h-[90px] flex-col items-center justify-center border-r border-black/[0.08] px-2 text-center last:border-r-0">
      <div className="text-[#9a7b56]">
        {icon}
      </div>

      <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#444039]">
        {title}
      </p>
    </div>
  );
}

function CartIcon() {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="19" cy="20" r="1" />

      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
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
      width="19"
      height="19"
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
      <circle cx="7.5" cy="17.5" r="2.5" />
      <circle cx="16.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      width="18"
      height="18"
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