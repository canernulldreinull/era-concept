import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

export default function ReturnExchangePage() {
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
              İade ve Değişim
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600">
              Siparişlerinizle ilgili iade ve değişim taleplerinin genel
              değerlendirme süreci hakkında bilgi alabilirsiniz.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
          <div className="space-y-8">
            <InfoSection
              number="01"
              title="İade ve Değişim Talebi"
            >
              İade veya değişim talebiniz olması halinde sipariş bilgilerinizle
              birlikte mümkün olan en kısa sürede bizimle iletişime
              geçebilirsiniz. Talebiniz ürünün durumu ve sipariş süreci dikkate
              alınarak değerlendirilir.
            </InfoSection>

            <InfoSection
              number="02"
              title="Ürünün Durumu"
            >
              İade veya değişim talebine konu olan ürünün kullanılmamış,
              zarar görmemiş ve yeniden satışa uygun durumda olması
              gerekebilir. Ürünün aksesuarları, parçaları ve varsa ambalajı ile
              birlikte korunması değerlendirme sürecini kolaylaştırır.
            </InfoSection>

            <InfoSection
              number="03"
              title="Hasarlı veya Hatalı Ürün"
            >
              Teslimat sırasında üründe görünür hasar, eksik parça veya üretim
              kaynaklı bir sorun fark edilmesi halinde ürünün görselleriyle
              birlikte bizimle iletişime geçebilirsiniz. Durum incelendikten
              sonra uygun çözüm hakkında bilgi verilir.
            </InfoSection>

            <InfoSection
              number="04"
              title="Teslimat Sonrası Kontrol"
            >
              Ürünü teslim aldıktan sonra mümkün olan en kısa sürede kontrol
              etmenizi öneririz. Hasar veya eksiklik bulunması halinde ürünün
              mevcut durumunu gösteren fotoğraf ve videoların saklanması
              faydalı olabilir.
            </InfoSection>

            <InfoSection
              number="05"
              title="Özel veya Kişiye Özel Ürünler"
            >
              Müşterinin talebine göre özel ölçü, renk, malzeme veya benzeri
              özelliklerle üretilen ürünlerde iade ve değişim koşulları standart
              ürünlerden farklı olabilir.
            </InfoSection>

            <InfoSection
              number="06"
              title="İade Taşıma Süreci"
            >
              Ürünün geri alınması gereken durumlarda taşıma ve teslim alma
              süreci ürünün boyutu, teslimat bölgesi ve ürünün durumuna göre
              planlanabilir. Süreçle ilgili detaylar talep değerlendirmesi
              sırasında paylaşılır.
            </InfoSection>

            <InfoSection
              number="07"
              title="Ücret İadesi"
            >
              İade talebinin kabul edilmesi halinde ücret iadesi, ödemenin
              gerçekleştirildiği yöntem ve ilgili ödeme kuruluşunun işlem
              sürelerine bağlı olarak tamamlanır.
            </InfoSection>

            <InfoSection
              number="08"
              title="Değişim Süreci"
            >
              Değişim talebinin kabul edilmesi halinde yeni ürünün stok ve
              teslimat durumu kontrol edilir. Değişim süresi ürünün
              hazırlanmasına ve teslimat planına göre değişebilir.
            </InfoSection>
          </div>

          <div className="mt-12 border border-black/10 bg-[#1f1e1a] p-7 text-white sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              İade veya değişim talebiniz mi var?
            </p>

            <h2 className="mt-3 text-2xl font-medium">
              Sipariş bilgilerinizle bize ulaşın
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
              Sipariş numaranızı ve talebinizle ilgili bilgileri paylaşarak
              0532 396 66 34 numaralı telefondan veya WhatsApp üzerinden
              bizimle iletişime geçebilirsiniz.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/905323966634"
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

function InfoSection({
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