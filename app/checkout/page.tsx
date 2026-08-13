"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import { useCart } from "@/components/cart/CartProvider";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    items,
    totalPrice,
  } = useCart();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const totalQuantity =
    items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (items.length === 0) {
      setError(
        "Sepetiniz boş."
      );

      return;
    }

    setLoading(true);
    setError("");

    const formData =
      new FormData(
        e.currentTarget
      );

    const payload = {
      customerName:
        `${formData.get(
          "firstName"
        )} ${formData.get(
          "lastName"
        )}`,

      customerEmail:
        formData.get("email"),

      customerPhone:
        formData.get("phone"),

      shippingCity:
        formData.get("city"),

      shippingDistrict:
        formData.get(
          "district"
        ),

      shippingAddress:
        formData.get(
          "address"
        ),

      shippingPostalCode:
        formData.get(
          "postalCode"
        ),

      items: items.map(
        (item) => ({
          productId:
            item.id,

          quantity:
            item.quantity,
        })
      ),
    };

    try {
      const response =
        await fetch(
          "/api/orders",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "Sipariş oluşturulamadı."
        );

        return;
      }

      router.push(
        `/payment/${data.orderNumber}`
      );
    } catch {
      setError(
        "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-[#f5f2ec] text-[#211f1b]">
          <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
            <div className="border border-black/[0.08] bg-[#faf8f4] px-5 py-20 text-center sm:px-10 sm:py-28">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-black/10 text-neutral-400">
                <BagIcon />
              </div>

              <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9a7b56]">
                Era Concept
              </p>

              <h1 className="era-display mt-4 text-[36px] leading-tight sm:text-[48px]">
                Sepetiniz boş.
              </h1>

              <p className="mx-auto mt-4 max-w-md text-[13px] leading-7 text-neutral-500 sm:text-sm">
                Teslimat ve ödeme
                adımına geçebilmek için
                önce sepetinize ürün
                eklemelisiniz.
              </p>

              <Link
                href="/#urunler"
                className="mt-8 inline-flex min-h-[52px] items-center justify-center bg-[#211f1b] px-8 text-[10px] font-semibold uppercase tracking-[0.15em] text-white"
              >
                Ürünleri İncele
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f5f2ec] pb-28 text-[#211f1b] lg:pb-0">
        {/* ÜST BAŞLIK */}
        <section className="border-b border-black/[0.07] bg-[#faf8f4]">
          <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="era-kicker">
                  Güvenli Alışveriş
                </p>

                <h1 className="era-display mt-4 text-[43px] leading-[1.02] sm:text-[56px]">
                  Teslimat Bilgileri
                </h1>

                <p className="mt-4 max-w-lg text-[13px] leading-6 text-neutral-500 sm:text-sm sm:leading-7">
                  Siparişinizi
                  tamamlamak için iletişim
                  ve teslimat bilgilerinizi
                  girin.
                </p>
              </div>

              {/* ADIMLAR */}
              <div className="flex items-center gap-3">
                <CheckoutStep
                  number="01"
                  label="Teslimat"
                  active
                />

                <span className="h-px w-7 bg-black/15 sm:w-10" />

                <CheckoutStep
                  number="02"
                  label="Ödeme"
                />
              </div>
            </div>
          </div>
        </section>

        {/* MOBİL SİPARİŞ ÖZETİ */}
        <section className="border-b border-black/[0.07] bg-[#ebe6dd] lg:hidden">
          <details className="group">
            <summary className="flex min-h-[60px] list-none items-center justify-between gap-4 px-5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Sipariş Özeti
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  {totalQuantity} ürün
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">
                  {totalPrice.toLocaleString(
                    "tr-TR",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}{" "}
                  TL
                </span>

                <span className="text-sm transition-transform duration-300 group-open:rotate-180">
                  ↓
                </span>
              </div>
            </summary>

            <div className="border-t border-black/[0.08] bg-[#f5f2ec] px-4">
              {items.map(
                (item) => (
                  <CheckoutProduct
                    key={
                      item.id
                    }
                    item={
                      item
                    }
                  />
                )
              )}

              <div className="border-t border-black/[0.08] py-5">
                <SummaryRow
                  label="Ara Toplam"
                  value={`${totalPrice.toLocaleString(
                    "tr-TR",
                    {
                      minimumFractionDigits: 2,
                    }
                  )} TL`}
                />

                <div className="mt-3">
                  <SummaryRow
                    label="Teslimat"
                    value="Sonraki aşamada"
                    muted
                  />
                </div>
              </div>
            </div>
          </details>
        </section>

        {/* FORM */}
        <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
          <form
            id="checkout-form"
            onSubmit={
              handleSubmit
            }
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_410px] lg:gap-14 xl:gap-20">
              {/* SOL */}
              <div className="space-y-6 sm:space-y-8">
                {/* İLETİŞİM */}
                <CheckoutSection
                  number="01"
                  title="İletişim Bilgileri"
                  description="Siparişiniz ve teslimat süreci hakkında size ulaşabilmemiz için."
                >
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <Field
                      name="firstName"
                      label="Ad"
                      autoComplete="given-name"
                      placeholder="Adınız"
                      required
                    />

                    <Field
                      name="lastName"
                      label="Soyad"
                      autoComplete="family-name"
                      placeholder="Soyadınız"
                      required
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5">
                    <Field
                      name="email"
                      label="E-posta"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="ornek@email.com"
                      required
                    />

                    <Field
                      name="phone"
                      label="Telefon"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="05XX XXX XX XX"
                      required
                    />
                  </div>
                </CheckoutSection>

                {/* ADRES */}
                <CheckoutSection
                  number="02"
                  title="Teslimat Adresi"
                  description="Siparişinizin teslim edileceği adres bilgilerini girin."
                >
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <Field
                      name="city"
                      label="Şehir"
                      autoComplete="address-level1"
                      placeholder="İstanbul"
                      required
                    />

                    <Field
                      name="district"
                      label="İlçe"
                      autoComplete="address-level2"
                      placeholder="Tuzla"
                      required
                    />
                  </div>

                  <div className="mt-4 sm:mt-5">
                    <Field
                      name="postalCode"
                      label="Posta Kodu"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      placeholder="Opsiyonel"
                    />
                  </div>

                  <div className="mt-4 sm:mt-5">
                    <label
                      htmlFor="address"
                      className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#49463f]"
                    >
                      Açık Adres
                      <span className="ml-1 text-[#9a7b56]">
                        *
                      </span>
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      rows={5}
                      autoComplete="street-address"
                      placeholder="Mahalle, cadde, sokak, bina ve daire bilgileri"
                      required
                      className="w-full resize-none border border-black/[0.13] bg-[#fffefa] px-4 py-4 text-[14px] leading-6 outline-none transition duration-200 placeholder:text-neutral-400 focus:border-[#9a7b56] focus:ring-1 focus:ring-[#9a7b56]/20"
                    />
                  </div>
                </CheckoutSection>

                {/* GÜVEN */}
                <section className="border border-black/[0.08] bg-[#ebe6dd]">
                  <div className="grid grid-cols-3">
                    <MobileSecurity
                      icon={
                        <ShieldIcon />
                      }
                      title="Güvenli"
                      text="Sipariş"
                    />

                    <MobileSecurity
                      icon={
                        <LockIcon />
                      }
                      title="Korunan"
                      text="Bilgiler"
                    />

                    <MobileSecurity
                      icon={
                        <TruckIcon />
                      }
                      title="Planlı"
                      text="Teslimat"
                    />
                  </div>
                </section>

                {/* SÖZLEŞME */}
                <label className="flex cursor-pointer items-start gap-3 border-y border-black/[0.08] py-5">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#211f1b]"
                  />

                  <span className="text-[11px] leading-5 text-neutral-500 sm:text-xs">
                    <Link
                      href="/mesafeli-satis-sozlesmesi"
                      target="_blank"
                      className="font-medium text-[#34312b] underline underline-offset-2"
                    >
                      Mesafeli Satış
                      Sözleşmesi
                    </Link>{" "}
                    ve{" "}
                    <Link
                      href="/gizlilik-politikasi"
                      target="_blank"
                      className="font-medium text-[#34312b] underline underline-offset-2"
                    >
                      Gizlilik Politikası
                    </Link>
                    'nı okudum ve kabul
                    ediyorum.
                  </span>
                </label>

                {/* HATA */}
                {error && (
                  <div
                    role="alert"
                    className="border border-[#c9948d] bg-[#f4e7e5] px-4 py-4 text-[12px] leading-6 text-[#894b43]"
                  >
                    {error}
                  </div>
                )}

                {/* TABLET BUTON */}
                <button
                  type="submit"
                  disabled={
                    loading
                  }
                  className="hidden min-h-[58px] w-full items-center justify-center bg-[#211f1b] px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition disabled:cursor-not-allowed disabled:opacity-50 sm:flex lg:hidden"
                >
                  {loading
                    ? "İşleniyor..."
                    : "Ödemeye Devam Et"}
                </button>
              </div>

              {/* DESKTOP ÖZET */}
              <aside className="hidden h-fit border border-black/[0.09] bg-[#faf8f4] lg:sticky lg:top-[190px] lg:block">
                <div className="border-b border-black/[0.08] px-6 py-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9a7b56]">
                    Sipariş
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-4">
                    <h2 className="era-display text-[30px]">
                      Sipariş Özeti
                    </h2>

                    <span className="pb-1 text-[10px] text-neutral-400">
                      {totalQuantity} adet
                    </span>
                  </div>
                </div>

                {/* ÜRÜNLER */}
                <div className="max-h-[370px] divide-y divide-black/[0.07] overflow-y-auto px-5">
                  {items.map(
                    (item) => (
                      <CheckoutProduct
                        key={
                          item.id
                        }
                        item={
                          item
                        }
                      />
                    )
                  )}
                </div>

                {/* FİYAT */}
                <div className="border-t border-black/[0.08] p-6">
                  <div className="space-y-4">
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
                      value="Hesaplanacak"
                      muted
                    />
                  </div>

                  <div className="mt-6 border-t border-black/[0.08] pt-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                          Toplam
                        </p>

                        <p className="mt-1 text-[9px] text-neutral-400">
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
                  </div>

                  <button
                    type="submit"
                    disabled={
                      loading
                    }
                    className="mt-7 flex min-h-[58px] w-full items-center justify-center bg-[#211f1b] px-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading
                      ? "İşleniyor..."
                      : "Ödemeye Devam Et"}
                  </button>

                  <div className="mt-6 border-t border-black/[0.08] pt-5">
                    <SecurityItem
                      icon={
                        <ShieldIcon />
                      }
                      title="Güvenli sipariş"
                      text="Sipariş bilgileriniz korunur"
                    />

                    <SecurityItem
                      icon={
                        <LockIcon />
                      }
                      title="Kişisel bilgiler"
                      text="Verileriniz güvenli şekilde işlenir"
                    />

                    <SecurityItem
                      icon={
                        <TruckIcon />
                      }
                      title="Sipariş takibi"
                      text="Sipariş sürecinizi takip edebilirsiniz"
                    />
                  </div>
                </div>
              </aside>
            </div>
          </form>
        </section>
      </main>

      <Footer />

      {/* TELEFON SABİT CHECKOUT */}
      <div className="fixed inset-x-0 bottom-0 z-[45] border-t border-black/[0.1] bg-[#faf8f4]/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-[110px] shrink-0">
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

          <button
            type="submit"
            form="checkout-form"
            disabled={
              loading
            }
            className="flex min-h-[54px] min-w-0 flex-1 items-center justify-center bg-[#211f1b] px-3 text-[9px] font-semibold uppercase tracking-[0.13em] text-white transition active:bg-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "İşleniyor..."
              : "Ödemeye Devam Et"}
          </button>
        </div>
      </div>
    </>
  );
}

function CheckoutSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-black/[0.08] bg-[#faf8f4] p-5 sm:p-7 lg:p-8">
      <div className="mb-7 flex gap-4 border-b border-black/[0.07] pb-6">
        <span className="pt-1 text-[9px] font-semibold tracking-[0.15em] text-[#9a7b56]">
          {number}
        </span>

        <div>
          <h2 className="era-display text-[27px] leading-none sm:text-[31px]">
            {title}
          </h2>

          <p className="mt-3 max-w-lg text-[11px] leading-5 text-neutral-500 sm:text-xs sm:leading-6">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  required,
  ...props
}: {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#49463f]">
        {label}

        {required && (
          <span className="ml-1 text-[#9a7b56]">
            *
          </span>
        )}
      </label>

      <input
        {...props}
        required={
          required
        }
        className="h-[52px] w-full border border-black/[0.13] bg-[#fffefa] px-4 text-[14px] outline-none transition duration-200 placeholder:text-neutral-400 focus:border-[#9a7b56] focus:ring-1 focus:ring-[#9a7b56]/20 sm:h-[54px]"
      />
    </div>
  );
}

function CheckoutStep({
  number,
  label,
  active = false,
}: {
  number: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-7 w-7 items-center justify-center text-[8px] font-semibold ${
          active
            ? "bg-[#211f1b] text-white"
            : "border border-black/10 text-neutral-400"
        }`}
      >
        {number}
      </span>

      <span
        className={`text-[9px] font-semibold uppercase tracking-[0.12em] ${
          active
            ? "text-[#292722]"
            : "text-neutral-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function CheckoutProduct({
  item,
}: {
  item: {
    id: string;
    name: string;
    slug: string;
    price: number;
    quantity: number;
    imageUrl:
      | string
      | null;
  };
}) {
  const total =
    item.price *
    item.quantity;

  return (
    <div className="flex gap-4 py-5">
      <Link
        href={`/products/${item.slug}`}
        className="relative h-[78px] w-[65px] shrink-0 overflow-hidden bg-[#e9e6df]"
      >
        {item.imageUrl ? (
          <Image
            src={
              item.imageUrl
            }
            alt={
              item.name
            }
            fill
            sizes="65px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[7px] uppercase tracking-[0.1em] text-neutral-400">
            ERA
          </div>
        )}

        <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center bg-[#211f1b] px-1 text-[8px] font-semibold text-white">
          {
            item.quantity
          }
        </span>
      </Link>

      <div className="flex min-w-0 flex-1 justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/products/${item.slug}`}
            className="line-clamp-2 text-[12px] font-medium leading-5 text-[#302e29]"
          >
            {
              item.name
            }
          </Link>

          <p className="mt-2 text-[9px] text-neutral-400">
            {
              item.quantity
            }{" "}
            ×{" "}
            {item.price.toLocaleString(
              "tr-TR",
              {
                minimumFractionDigits: 2,
              }
            )}{" "}
            TL
          </p>
        </div>

        <p className="shrink-0 text-[11px] font-semibold">
          {total.toLocaleString(
            "tr-TR",
            {
              minimumFractionDigits: 2,
            }
          )}{" "}
          TL
        </p>
      </div>
    </div>
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

function SecurityItem({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 border-b border-black/[0.06] py-3.5 last:border-b-0">
      <div className="mt-0.5 shrink-0 text-[#9a7b56]">
        {icon}
      </div>

      <div>
        <p className="text-[10px] font-semibold">
          {title}
        </p>

        <p className="mt-1 text-[9px] leading-4 text-neutral-400">
          {text}
        </p>
      </div>
    </div>
  );
}

function MobileSecurity({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex min-h-[92px] flex-col items-center justify-center border-r border-black/[0.08] px-2 text-center last:border-r-0">
      <div className="text-[#9a7b56]">
        {icon}
      </div>

      <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.08em]">
        {title}
      </p>

      <p className="mt-1 text-[8px] text-neutral-500">
        {text}
      </p>
    </div>
  );
}

function BagIcon() {
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
      <path d="M6 8h12l1 13H5L6 8Z" />

      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
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

function LockIcon() {
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
      <rect
        x="5"
        y="10"
        width="14"
        height="11"
      />

      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
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