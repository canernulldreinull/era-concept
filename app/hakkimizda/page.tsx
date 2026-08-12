import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

export default function AboutPage() {
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
              Hakkımızda
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600">
              2015 yılından bu yana yaşam alanlarına işlevsel, estetik ve
              kullanışlı mobilya çözümleri sunuyoruz.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                2015&apos;ten Bugüne
              </p>

              <h2 className="mt-4 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                Mobilyayı yaşam alanının bir parçası olarak görüyoruz.
              </h2>
            </div>

            <div className="space-y-6 text-sm leading-8 text-neutral-600">
              <p>
                Era Concept olarak 2015 yılından bu yana mobilya sektöründe
                faaliyet gösteriyoruz. Yaşam alanlarında yalnızca görsel
                olarak değil, günlük kullanım açısından da uzun süre değer
                sağlayacak ürünler sunmayı hedefliyoruz.
              </p>

              <p>
                Oturma odası, yemek odası, yatak odası, TV üniteleri,
                çalışma alanları ve farklı kullanım ihtiyaçlarına yönelik
                mobilya seçenekleriyle müşterilerimize geniş bir ürün
                yelpazesi sunuyoruz.
              </p>

              <p>
                Ürün seçiminden teslimat sürecine kadar müşterilerimizin
                ihtiyaçlarını anlamaya ve alışveriş sürecini mümkün olduğunca
                açık, kolay ve güvenilir hale getirmeye önem veriyoruz.
              </p>

              <p>
                Değişen yaşam alanları ve kullanım alışkanlıklarını takip
                ederek sade, işlevsel ve farklı dekorasyon stilleriyle uyum
                sağlayabilecek mobilya seçeneklerini bir araya getirmeye
                devam ediyoruz.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
            <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-3">
              <ValueBox
                title="2015'ten Beri"
                text="Mobilya sektöründeki deneyimimizi ürün ve hizmet süreçlerimize yansıtıyoruz."
              />

              <ValueBox
                title="İşlevsel Tasarım"
                text="Yaşam alanlarında estetik görünüm kadar kullanım kolaylığını da önemsiyoruz."
              />

              <ValueBox
                title="Müşteri Odaklı"
                text="Sipariş öncesinden teslimat sonrasına kadar ulaşılabilir olmaya önem veriyoruz."
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="border border-black/10 bg-white p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Yaklaşımımız
              </p>

              <h2 className="mt-3 text-2xl font-medium">
                Sade, kullanışlı ve uzun ömürlü yaşam alanları
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-600">
                Mobilyanın bulunduğu alanla uyum sağlaması kadar günlük
                kullanıma uygun olmasını da önemsiyoruz. Bu nedenle ürünleri
                değerlendirirken tasarım, ölçü, malzeme ve kullanım
                ihtiyaçlarını birlikte ele alıyoruz.
              </p>
            </div>

            <div className="border border-black/10 bg-[#1f1e1a] p-7 text-white sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Bizi Ziyaret Edin
              </p>

              <h2 className="mt-3 text-2xl font-medium">
                Era Concept Mobilyaları
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/60">
                Aydınlı, Atlas Sk. No:7/B
                <br />
                34953 Tuzla / İstanbul
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/iletisim"
                  className="inline-flex min-h-11 items-center justify-center bg-white px-5 text-sm font-medium text-black transition hover:bg-neutral-100"
                >
                  İletişim
                </a>

                <a
                  href="https://wa.me/905323966634"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center border border-white/20 px-5 text-sm font-medium transition hover:bg-white/10"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ValueBox({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white p-7 sm:p-8">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-neutral-500">
        {text}
      </p>
    </div>
  );
}