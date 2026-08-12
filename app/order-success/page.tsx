import Link from "next/link";

import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

type OrderSuccessPageProps = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export default async function OrderSuccessPage({
  searchParams,
}: OrderSuccessPageProps) {
  const { order } = await searchParams;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f7f4] text-[#181817]">
        <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <div className="border border-black/10 bg-white">
            <div className="border-b border-black/10 px-6 py-10 text-center sm:px-10 sm:py-14">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl text-emerald-700">
                ✓
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Siparişiniz Alındı
              </p>

              <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                Teşekkür ederiz.
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-600">
                Siparişiniz başarıyla oluşturuldu. Siparişinizin
                hazırlanma ve teslimat süreciyle ilgili bilgiler
                tarafınıza iletilecektir.
              </p>

              {order && (
                <div className="mx-auto mt-8 max-w-md border border-black/10 bg-[#f8f7f4] px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                    Sipariş Numarası
                  </p>

                  <p className="mt-2 text-lg font-semibold tracking-wide">
                    {order}
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-px bg-black/10 md:grid-cols-3">
              <InfoItem
                number="01"
                title="Sipariş Alındı"
                text="Siparişiniz sistemimize başarıyla kaydedildi."
              />

              <InfoItem
                number="02"
                title="Hazırlık Süreci"
                text="Siparişiniz kontrol edilerek hazırlık aşamasına alınacaktır."
              />

              <InfoItem
                number="03"
                title="Teslimat"
                text="Teslimat süreci başladığında tarafınıza bilgi verilecektir."
              />
            </div>

            <div className="flex flex-col gap-3 px-6 py-8 sm:flex-row sm:justify-center sm:px-10">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center bg-[#181817] px-7 text-sm font-medium text-white transition hover:bg-black"
              >
                Ana Sayfaya Dön
              </Link>

              <Link
                href="/#urunler"
                className="inline-flex min-h-12 items-center justify-center border border-black/15 bg-white px-7 text-sm font-medium transition hover:border-black"
              >
                Alışverişe Devam Et
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function InfoItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white p-6">
      <p className="text-xs font-medium text-neutral-400">
        {number}
      </p>

      <h2 className="mt-4 text-sm font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-xs leading-6 text-neutral-500">
        {text}
      </p>
    </div>
  );
}