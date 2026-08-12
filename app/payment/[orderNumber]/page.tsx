import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import Header from "@/components/store/Header";
import PaytrIframe from "@/components/payment/PaytrIframe";

type PaymentPageProps = {
  params: Promise<{
    orderNumber: string;
  }>;
};

export default async function PaymentPage({
  params,
}: PaymentPageProps) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: {
      orderNumber,
    },

    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f7f4] text-[#181817]">
        <section className="border-b border-black/5 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Güvenli Ödeme
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
              Ödeme
            </h1>

            <div className="mt-5 text-sm text-neutral-500">
              <span>Teslimat</span>

              <span className="mx-2">
                →
              </span>

              <span className="font-medium text-black">
                Ödeme
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
            {/* ÖDEME ALANI */}
            <div className="border border-black/10 bg-white p-6 sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Sipariş
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    {order.orderNumber}
                  </h2>
                </div>

                <span className="border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                  Ödeme Bekleniyor
                </span>
              </div>

              <div className="mt-8 border-t border-black/10 pt-8">
                <h3 className="text-2xl font-medium">
                  Kart ile güvenli ödeme
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
                  Ödemenizi PayTR güvenli ödeme altyapısı
                  üzerinden tamamlayabilirsiniz.
                </p>

                <div className="mt-8">
                  <PaytrIframe
                    orderNumber={order.orderNumber}
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-3">
                <InfoBox
                  title="Güvenli Ödeme"
                  text="Kart bilgileriniz mağazamızda tutulmaz"
                />

                <InfoBox
                  title="Şifreli Bağlantı"
                  text="Ödeme işlemi güvenli bağlantı üzerinden gerçekleşir"
                />

                <InfoBox
                  title="Sipariş Takibi"
                  text="Ödeme sonrasında siparişiniz takip edilir"
                />
              </div>
            </div>

            {/* SİPARİŞ ÖZETİ */}
            <aside className="h-fit border border-black/10 bg-white lg:sticky lg:top-28">
              <div className="border-b border-black/10 p-6">
                <h2 className="text-xl font-semibold">
                  Sipariş Özeti
                </h2>

                <p className="mt-1 text-xs text-neutral-500">
                  {order.items.reduce(
                    (total, item) =>
                      total + item.quantity,
                    0
                  )}{" "}
                  ürün
                </p>
              </div>

              <div className="divide-y divide-black/10">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-5 p-5 text-sm"
                  >
                    <div>
                      <p className="font-medium">
                        {item.productName}
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        {item.quantity} adet
                      </p>
                    </div>

                    <p className="shrink-0 font-medium">
                      {Number(
                        item.totalPrice
                      ).toLocaleString(
                        "tr-TR",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}{" "}
                      TL
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-6">
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>
                      Ara toplam
                    </span>

                    <span className="font-medium text-black">
                      {Number(
                        order.subtotal
                      ).toLocaleString(
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

                    <span className="font-medium text-black">
                      {Number(
                        order.shippingCost
                      ).toLocaleString(
                        "tr-TR",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}{" "}
                      TL
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-black/10 pt-6">
                  <div className="flex items-end justify-between gap-6">
                    <span className="font-medium">
                      Toplam
                    </span>

                    <span className="text-2xl font-semibold tracking-tight">
                      {Number(
                        order.total
                      ).toLocaleString(
                        "tr-TR",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}{" "}
                      TL
                    </span>
                  </div>
                </div>

                <Link
                  href="/cart"
                  className="mt-6 block text-center text-sm text-neutral-500 transition hover:text-black"
                >
                  ← Sepete dön
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}

function InfoBox({
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