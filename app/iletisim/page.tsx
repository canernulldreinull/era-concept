import Link from "next/link";

import Header from "@/components/store/Header";

export default function ContactPage() {
  const phoneDisplay = "0532 396 66 34";
  const phoneHref = "tel:+905323966634";

  const whatsappUrl =
    "https://wa.me/905323966634?text=" +
    encodeURIComponent(
      "Merhaba, Era Concept Mobilyaları hakkında bilgi almak istiyorum."
    );

  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Era Concept Mobilyaları, Aydınlı, Atlas Sk. No:7/B, 34953 Tuzla/İstanbul"
    );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f7f4] text-[#181817]">
        <section className="border-b border-black/5 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Era Concept
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
              İletişim
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600">
              Ürünlerimiz, siparişleriniz ve teslimat süreçleri hakkında
              bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-6">
              <div className="border border-black/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Adres
                </p>

                <h2 className="mt-3 text-xl font-semibold">
                  Era Concept Mobilyaları
                </h2>

                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  Aydınlı, Atlas Sk. No:7/B
                  <br />
                  34953 Tuzla / İstanbul
                </p>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center justify-center border border-black/15 px-5 text-sm font-medium transition hover:bg-neutral-50"
                >
                  Google Maps&apos;te Aç
                </a>
              </div>

              <div className="border border-black/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Telefon
                </p>

                <a
                  href={phoneHref}
                  className="mt-3 block text-2xl font-medium transition hover:text-neutral-600"
                >
                  {phoneDisplay}
                </a>

                <p className="mt-2 text-sm text-neutral-500">
                  Telefon üzerinden bize ulaşabilirsiniz.
                </p>
              </div>

              <div className="border border-black/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  WhatsApp
                </p>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  Ürünler hakkında hızlıca bilgi almak için WhatsApp üzerinden
                  mesaj gönderebilirsiniz.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center justify-center bg-[#181817] px-5 text-sm font-medium text-white transition hover:bg-black"
                >
                  WhatsApp&apos;tan Yaz
                </a>
              </div>

              <Link
                href="/"
                className="inline-flex text-sm font-medium text-neutral-600 transition hover:text-black"
              >
                ← Ana sayfaya dön
              </Link>
            </div>

            <div className="overflow-hidden border border-black/10 bg-white">
              <iframe
                title="Era Concept Mobilyaları Konumu"
                src="https://www.google.com/maps?q=Era%20Concept%20Mobilyalar%C4%B1%2C%20Ayd%C4%B1nl%C4%B1%2C%20Atlas%20Sk.%20No%3A7%2FB%2C%2034953%20Tuzla%2F%C4%B0stanbul&output=embed"
                className="h-[520px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}