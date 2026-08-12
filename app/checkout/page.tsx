"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/store/Header";
import { useCart } from "@/components/cart/CartProvider";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    items,
    totalPrice,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (items.length === 0) {
      setError("Sepetiniz boş.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const payload = {
      customerName: `${formData.get(
        "firstName"
      )} ${formData.get("lastName")}`,

      customerEmail: formData.get("email"),
      customerPhone: formData.get("phone"),

      shippingCity: formData.get("city"),
      shippingDistrict:
        formData.get("district"),
      shippingAddress:
        formData.get("address"),
      shippingPostalCode:
        formData.get("postalCode"),

      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch(
        "/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

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

        <main className="min-h-screen bg-[#f8f7f4]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="border border-black/10 bg-white px-6 py-16 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Checkout
              </p>

              <h1 className="mt-4 text-3xl font-medium tracking-tight">
                Sepetiniz boş.
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500">
                Ödeme ve teslimat adımına
                geçebilmek için önce sepetinize
                ürün eklemelisiniz.
              </p>

              <Link
                href="/#urunler"
                className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#181817] px-7 text-sm font-medium text-white"
              >
                Ürünleri İncele
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f7f4] text-[#181817]">
        {/* BAŞLIK */}
        <section className="border-b border-black/5 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  Güvenli Alışveriş
                </p>

                <h1 className="mt-4 text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
                  Teslimat Bilgileri
                </h1>
              </div>

              <div className="text-sm text-neutral-500">
                <span className="font-medium text-black">
                  1. Teslimat
                </span>

                <span className="mx-2">
                  →
                </span>

                <span>
                  2. Ödeme
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
              {/* SOL TARAF */}
              <div className="space-y-10">
                {/* İLETİŞİM */}
                <CheckoutSection
                  number="01"
                  title="İletişim Bilgileri"
                  description="Siparişiniz hakkında sizinle iletişime geçebilmemiz için."
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      name="firstName"
                      label="Ad"
                      autoComplete="given-name"
                      required
                    />

                    <Field
                      name="lastName"
                      label="Soyad"
                      autoComplete="family-name"
                      required
                    />
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <Field
                      name="email"
                      label="E-posta"
                      type="email"
                      autoComplete="email"
                      required
                    />

                    <Field
                      name="phone"
                      label="Telefon"
                      type="tel"
                      autoComplete="tel"
                      placeholder="05XX XXX XX XX"
                      required
                    />
                  </div>
                </CheckoutSection>

                {/* TESLİMAT */}
                <CheckoutSection
                  number="02"
                  title="Teslimat Adresi"
                  description="Siparişinizin gönderileceği adresi girin."
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      name="city"
                      label="Şehir"
                      autoComplete="address-level1"
                      required
                    />

                    <Field
                      name="district"
                      label="İlçe"
                      autoComplete="address-level2"
                      required
                    />
                  </div>

                  <div className="mt-5">
                    <Field
                      name="postalCode"
                      label="Posta Kodu"
                      autoComplete="postal-code"
                    />
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-medium"
                    >
                      Açık Adres
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      rows={5}
                      autoComplete="street-address"
                      placeholder="Mahalle, cadde, sokak, bina ve daire bilgileri"
                      required
                      className="w-full resize-none border border-black/15 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
                    />
                  </div>
                </CheckoutSection>

                {error && (
                  <div className="border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* TELEFON / TABLET BUTONU */}
                <button
                  type="submit"
                  disabled={
                    loading ||
                    items.length === 0
                  }
                  className="flex min-h-14 w-full cursor-pointer items-center justify-center bg-[#181817] px-7 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 lg:hidden"
                >
                  {loading
                    ? "Sipariş oluşturuluyor..."
                    : "Siparişi Oluştur"}
                </button>
              </div>

              {/* SAĞ TARAF */}
              <aside className="h-fit border border-black/10 bg-white lg:sticky lg:top-28">
                <div className="border-b border-black/10 p-6">
                  <h2 className="text-xl font-semibold">
                    Sipariş Özeti
                  </h2>

                  <p className="mt-1 text-xs text-neutral-500">
                    {items.reduce(
                      (total, item) =>
                        total + item.quantity,
                      0
                    )}{" "}
                    ürün
                  </p>
                </div>

                {/* ÜRÜNLER */}
                <div className="max-h-[380px] divide-y divide-black/10 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-5"
                    >
                      <Link
                        href={`/products/${item.slug}`}
                        className="relative h-20 w-20 shrink-0 overflow-hidden bg-[#efeee9]"
                      >
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">
                            Görsel yok
                          </div>
                        )}

                        <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">
                          {item.quantity}
                        </span>
                      </Link>

                      <div className="flex min-w-0 flex-1 justify-between gap-4">
                        <div>
                          <Link
                            href={`/products/${item.slug}`}
                            className="line-clamp-2 text-sm font-medium"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-2 text-xs text-neutral-500">
                            {item.price.toLocaleString(
                              "tr-TR",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}{" "}
                            TL / adet
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-semibold">
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
                    </div>
                  ))}
                </div>

                {/* TOPLAM */}
                <div className="p-6">
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between text-neutral-600">
                      <span>
                        Ara toplam
                      </span>

                      <span className="font-medium text-black">
                        {totalPrice.toLocaleString(
                          "tr-TR",
                          {
                            minimumFractionDigits: 2,
                          }
                        )}{" "}
                        TL
                      </span>
                    </div>

                    <div className="flex justify-between text-neutral-600">
                      <span>
                        Kargo
                      </span>

                      <span>
                        Hesaplanacak
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-black/10 pt-6">
                    <div className="flex items-end justify-between gap-6">
                      <span className="font-medium">
                        Toplam
                      </span>

                      <span className="text-2xl font-semibold tracking-tight">
                        {totalPrice.toLocaleString(
                          "tr-TR",
                          {
                            minimumFractionDigits: 2,
                          }
                        )}{" "}
                        TL
                      </span>
                    </div>

                    <p className="mt-2 text-right text-xs text-neutral-400">
                      Kargo hariç
                    </p>
                  </div>

                  {/* MASAÜSTÜ BUTONU */}
                  <button
                    type="submit"
                    disabled={
                      loading ||
                      items.length === 0
                    }
                    className="mt-7 hidden min-h-14 w-full cursor-pointer items-center justify-center bg-[#181817] px-7 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
                  >
                    {loading
                      ? "Sipariş oluşturuluyor..."
                      : "Siparişi Oluştur"}
                  </button>

                  <div className="mt-6 space-y-3 border-t border-black/10 pt-6">
                    <SecurityItem text="Güvenli ödeme altyapısı" />

                    <SecurityItem text="Kişisel bilgileriniz korunur" />

                    <SecurityItem text="Sipariş sonrası takip" />
                  </div>
                </div>
              </aside>
            </div>
          </form>
        </section>
      </main>
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
  children: React.ReactNode;
}) {
  return (
    <section className="border border-black/10 bg-white p-6 sm:p-8">
      <div className="mb-7 flex gap-4">
        <span className="text-xs font-semibold text-neutral-400">
          {number}
        </span>

        <div>
          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-neutral-500">
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
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        {...props}
        className="h-12 w-full border border-black/15 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
      />
    </div>
  );
}

function SecurityItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-xs text-neutral-500">
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />

      <span>
        {text}
      </span>
    </div>
  );
}