import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

const questions = [
  {
    question: "Siparişimi nasıl oluşturabilirim?",
    answer:
      "Beğendiğiniz ürünü sepete ekledikten sonra sepet sayfasından ödeme adımına geçebilirsiniz. Teslimat bilgilerinizi girdikten sonra siparişiniz oluşturulur ve güvenli ödeme ekranına yönlendirilirsiniz.",
  },
  {
    question: "Siparişimin durumunu nasıl takip edebilirim?",
    answer:
      "Siparişiniz oluşturulduktan sonra size verilen sipariş numarası üzerinden sipariş durumunuzu takip edebilirsiniz. Siparişinizle ilgili destek almak için bizimle WhatsApp veya telefon üzerinden de iletişime geçebilirsiniz.",
  },
  {
    question: "Ürünler stokta mı?",
    answer:
      "Ürün sayfalarında güncel stok durumu gösterilir. Stokta bulunmayan ürünlerde satın alma işlemi gerçekleştirilemez.",
  },
  {
    question: "Teslimat ne kadar sürer?",
    answer:
      "Teslimat süresi ürünün stok durumuna, teslimat adresine ve ürünün hazırlanma sürecine göre değişebilir. Sipariş sonrasında teslimat süreciyle ilgili sizinle iletişime geçilir.",
  },
  {
    question: "Türkiye'nin her yerine teslimat yapıyor musunuz?",
    answer:
      "Teslimat imkanları ürün ve teslimat adresine göre değişebilir. Sipariş öncesinde teslimat bölgeniz hakkında bilgi almak için bizimle iletişime geçebilirsiniz.",
  },
  {
    question: "Kargo ücreti ne kadar?",
    answer:
      "Kargo ve teslimat ücreti ürünün boyutu, ağırlığı ve teslimat adresine göre değişebilir. Geçerli teslimat ücreti sipariş sürecinde veya müşteri temsilcimiz tarafından bildirilecektir.",
  },
  {
    question: "Ürünlerin ölçülerini nereden görebilirim?",
    answer:
      "Genişlik, yükseklik, derinlik, ağırlık, renk ve malzeme gibi bilgiler mevcut olduğu ürünlerde ürün detay sayfasında gösterilir.",
  },
  {
    question: "Ürün görselleri gerçek ürünü yansıtıyor mu?",
    answer:
      "Ürün görsellerinin ürünü mümkün olduğunca doğru şekilde yansıtmasına özen gösterilir. Ekran, ışık ve ortam koşullarına bağlı olarak renklerde küçük ton farklılıkları oluşabilir.",
  },
  {
    question: "Sipariş verdikten sonra adresimi değiştirebilir miyim?",
    answer:
      "Siparişiniz teslimat sürecine girmeden önce bizimle iletişime geçmeniz halinde adres değişikliği konusunda yardımcı olmaya çalışabiliriz.",
  },
  {
    question: "Siparişimi iptal edebilir miyim?",
    answer:
      "Siparişin hazırlanma ve teslimat durumuna göre iptal imkanı değişebilir. İptal talebiniz için mümkün olan en kısa sürede bizimle iletişime geçmeniz gerekir.",
  },
  {
    question: "İade veya değişim yapabilir miyim?",
    answer:
      "İade ve değişim koşulları ürünün niteliğine ve sipariş durumuna göre değerlendirilir. Ayrıntılı bilgi için İade ve Değişim sayfamızı inceleyebilirsiniz.",
  },
  {
    question: "Nasıl iletişime geçebilirim?",
    answer:
      "0532 396 66 34 numaralı telefondan veya sitemizde bulunan WhatsApp butonundan bize ulaşabilirsiniz. Mağazamız Aydınlı, Atlas Sk. No:7/B, 34953 Tuzla/İstanbul adresindedir.",
  },
];

export default function FAQPage() {
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
              Sıkça Sorulan Sorular
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600">
              Sipariş, teslimat, ürünler ve alışveriş süreci hakkında en sık
              karşılaştığımız soruların cevaplarını burada bulabilirsiniz.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
          <div className="space-y-3">
            {questions.map((item, index) => (
              <details
                key={item.question}
                className="group border border-black/10 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 sm:px-6">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 text-xs font-semibold text-neutral-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm font-semibold sm:text-base">
                      {item.question}
                    </span>
                  </div>

                  <span className="shrink-0 text-xl font-light text-neutral-400 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-black/5 px-5 py-5 sm:px-6 sm:pl-[62px]">
                  <p className="text-sm leading-7 text-neutral-600">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 border border-black/10 bg-[#1f1e1a] p-7 text-white sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Sorunuzun cevabını bulamadınız mı?
            </p>

            <h2 className="mt-3 text-2xl font-medium">
              Bizimle iletişime geçin
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
              Ürünlerimiz veya siparişiniz hakkında bilgi almak için
              WhatsApp, telefon veya iletişim sayfamız üzerinden bize
              ulaşabilirsiniz.
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
                href="/iletisim"
                className="inline-flex min-h-11 items-center justify-center border border-white/20 px-5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                İletişim
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}