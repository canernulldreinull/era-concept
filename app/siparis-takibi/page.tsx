import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

export default function OrderTrackingPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f7f4] text-[#181817]">
        <section className="border-b border-black/5 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Müşteri Hizmetleri
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
              Sipariş Takibi
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600">
              Siparişinizin mevcut durumu hakkında bilgi almak için sipariş
              numaranızı kullanabilir veya bizimle doğrudan iletişime
              geçebilirsiniz.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
          <div className="border border-black/10 bg-white p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Sipariş Numaranız
            </p>

            <h2 className="mt-3 text-2xl font-medium">
              Sipariş durumunuzu öğrenin
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
              Sipariş oluşturulduktan sonra size verilen sipariş numarasını
              saklamanızı öneririz. Sipariş numaranız genellikle
              <strong> ERA-...</strong> formatındadır.
            </p>

            <div className="mt-7 border border-black/10 bg-[#f8f7f4] p-5">
              <p className="text-sm font-medium">
                Online sipariş takip ekranı yakında aktif olacaktır.
              </p>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Şimdilik sipariş numaranızı WhatsApp veya telefon üzerinden
                paylaşarak siparişinizin durumunu öğrenebilirsiniz.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <StatusCard
              number="01"
              title="Sipariş Alındı"
              text="Siparişiniz sistemimize ulaştıktan sonra kontrol edilir."
            />

            <StatusCard
              number="02"
              title="Hazırlanıyor"
              text="Ürününüz stok ve hazırlık sürecine alınır."
            />

            <StatusCard
              number="03"
              title="Teslimat"
              text="Siparişiniz teslimat planına alındığında süreç hakkında bilgi verilir."
            />
          </div>

          <div className="mt-10 border border-black/10 bg-[#1f1e1a] p-7 text-white sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Siparişinizi öğrenmek için
            </p>

            <h2 className="mt-3 text-2xl font-medium">
              Sipariş numaranızla bize ulaşın
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
              Sipariş numaranızı ileterek 0532 396 66 34 numaralı telefondan
              veya WhatsApp üzerinden güncel sipariş durumunuzu
              öğrenebilirsiniz.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/905323966634?text=Merhaba%2C%20sipari%C5%9Fimin%20durumu%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center bg-white px-5 text-sm font-medium text-black transition hover:bg-neutral-100"
              >
                WhatsApp
              </a>

              <a
                href="tel:+905323966634"
                className="inline-flex min-h-11 items-center justify-center border border-white/20 px-5 text-sm font-medium transition hover:bg-white/10"
              >
                Telefonla Ara
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function StatusCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="border border-black/10 bg-white p-6">
      <span className="text-xs font-semibold text-neutral-400">
        {number}
      </span>

      <h2 className="mt-4 text-lg font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-neutral-500">
        {text}
      </p>
    </div>
  );
}