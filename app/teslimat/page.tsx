import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

export default function DeliveryPage() {
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
              Teslimat Bilgileri
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600">
              Siparişlerinizin hazırlanma, sevkiyat ve teslimat süreçleri
              hakkında genel bilgilere bu sayfadan ulaşabilirsiniz.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
          <div className="space-y-8">
            <DeliverySection
              number="01"
              title="Siparişin Hazırlanması"
            >
              Siparişiniz oluşturulduktan sonra ürünlerin stok ve hazırlık
              durumu kontrol edilir. Siparişinizin hazırlanma süresi ürünün
              türüne, stok durumuna ve sipariş yoğunluğuna göre değişebilir.
            </DeliverySection>

            <DeliverySection
              number="02"
              title="Teslimat Süresi"
            >
              Teslimat süresi ürünün stok durumuna, teslimat yapılacak bölgeye
              ve taşıma planlamasına göre değişiklik gösterebilir. Siparişiniz
              hazır olduğunda teslimat süreciyle ilgili sizinle iletişime
              geçilebilir.
            </DeliverySection>

            <DeliverySection
              number="03"
              title="Teslimat Bölgeleri"
            >
              Teslimat imkanları ürünün özelliklerine ve teslimat adresine göre
              değişebilir. Sipariş vermeden önce teslimat bölgeniz hakkında
              bilgi almak isterseniz bizimle telefon veya WhatsApp üzerinden
              iletişime geçebilirsiniz.
            </DeliverySection>

            <DeliverySection
              number="04"
              title="Kargo ve Teslimat Ücreti"
            >
              Teslimat ücreti ürünün boyutuna, ağırlığına, teslimat adresine ve
              uygulanacak taşıma yöntemine göre değişebilir. Geçerli teslimat
              ücreti sipariş sürecinde veya müşteri temsilcimiz tarafından
              bildirilebilir.
            </DeliverySection>

            <DeliverySection
              number="05"
              title="Teslimat Öncesi Kontrol"
            >
              Siparişinizi teslim alırken ürün ve ambalaj üzerinde görünür bir
              hasar bulunup bulunmadığını kontrol etmenizi öneririz. Teslimat
              sırasında fark edilen bir sorun olması halinde mümkün olan en
              kısa sürede bizimle iletişime geçebilirsiniz.
            </DeliverySection>

            <DeliverySection
              number="06"
              title="Adres Değişikliği"
            >
              Siparişiniz sevkiyat veya teslimat planına alınmadan önce bizimle
              iletişime geçmeniz halinde adres değişikliği konusunda yardımcı
              olmaya çalışabiliriz. Sevkiyat başladıktan sonra adres
              değişikliği mümkün olmayabilir.
            </DeliverySection>

            <DeliverySection
              number="07"
              title="Teslimat Sırasında Ulaşılamama"
            >
              Teslimat sırasında müşteri veya teslim almaya yetkili bir kişiye
              ulaşılamaması halinde teslimat yeniden planlanabilir. Yeniden
              teslimat koşulları ve varsa ek taşıma maliyetleri ayrıca
              değerlendirilebilir.
            </DeliverySection>

            <DeliverySection
              number="08"
              title="Kurulum Gerektiren Ürünler"
            >
              Bazı ürünlerde teslimat ve kurulum koşulları ürüne göre farklılık
              gösterebilir. Kurulum hizmeti bulunan ürünlerde detaylar sipariş
              öncesinde veya teslimat planlaması sırasında bildirilebilir.
            </DeliverySection>
          </div>

          <div className="mt-12 border border-black/10 bg-white p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Teslimat hakkında destek
            </p>

            <h2 className="mt-3 text-2xl font-medium">
              Bizimle iletişime geçebilirsiniz
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
              Siparişinizin teslimat durumu veya teslimat bölgeniz hakkında
              bilgi almak için 0532 396 66 34 numaralı telefondan ya da
              WhatsApp üzerinden bize ulaşabilirsiniz.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:+905323966634"
                className="inline-flex min-h-11 items-center justify-center bg-[#181817] px-5 text-sm font-medium text-white transition hover:bg-black"
              >
                Telefonla Ara
              </a>

              <a
                href="https://wa.me/905323966634"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center border border-black/15 px-5 text-sm font-medium transition hover:bg-neutral-50"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function DeliverySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-black/10 pb-8">
      <div className="grid gap-4 sm:grid-cols-[60px_1fr]">
        <span className="text-xs font-semibold text-neutral-400">
          {number}
        </span>

        <div>
          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-neutral-600">
            {children}
          </p>
        </div>
      </div>
    </section>
  );
}