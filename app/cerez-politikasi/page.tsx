import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

export default function CookiePolicyPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f7f4] text-[#181817]">
        <section className="border-b border-black/5 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Yasal Bilgilendirme
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
              Çerez Politikası
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600">
              İnternet sitemizde kullanılan çerezler ve benzeri teknolojiler
              hakkında bilgilendirme.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
          <div className="space-y-10 text-sm leading-7 text-neutral-600">
            <Article
              number="01"
              title="Çerez Nedir?"
            >
              Çerezler, bir internet sitesini ziyaret ettiğinizde cihazınıza
              kaydedilebilen küçük veri dosyalarıdır. Çerezler internet
              sitesinin çalışmasını sağlamak, tercihlerin hatırlanması ve
              belirli teknik işlevlerin gerçekleştirilmesi amacıyla
              kullanılabilir.
            </Article>

            <Article
              number="02"
              title="Çerezlerin Kullanım Amaçları"
            >
              Era Concept internet sitesinde çerezler; sitenin güvenli ve
              düzgün şekilde çalışması, sepet işlemlerinin sürdürülebilmesi,
              kullanıcı tercihlerinin hatırlanması ve teknik performansın
              sağlanması gibi amaçlarla kullanılabilir.
            </Article>

            <Article
              number="03"
              title="Zorunlu Çerezler"
            >
              Zorunlu çerezler internet sitesinin temel fonksiyonlarının
              çalışması için gerekli olan çerezlerdir. Sepetin çalışması,
              güvenlik işlemleri, oturum yönetimi ve benzeri temel işlevler
              bu kapsamda değerlendirilebilir.
            </Article>

            <Article
              number="04"
              title="İşlevsel Çerezler"
            >
              İşlevsel çerezler, kullanıcı tarafından yapılan belirli
              tercihlerin hatırlanması ve internet sitesinin kullanım
              deneyiminin geliştirilmesi amacıyla kullanılabilir.
            </Article>

            <Article
              number="05"
              title="Performans ve Analitik Çerezleri"
            >
              İnternet sitesinin nasıl kullanıldığının anlaşılması, sayfa
              performansının ölçülmesi ve kullanıcı deneyiminin
              geliştirilmesi amacıyla analitik veya performans çerezleri
              kullanılabilir.
            </Article>

            <Article
              number="06"
              title="Reklam ve Pazarlama Çerezleri"
            >
              İleride reklam veya pazarlama hizmetleri kullanılması halinde,
              kullanıcıların ilgi alanlarına uygun içerik veya reklamların
              sunulması amacıyla reklam ve pazarlama çerezleri kullanılabilir.
              Bu tür çerezlerin kullanımı ilgili mevzuata uygun şekilde
              gerekli izin mekanizmalarına tabi olacaktır.
            </Article>

            <Article
              number="07"
              title="Üçüncü Taraf Hizmetler"
            >
              İnternet sitesinde Google Maps, ödeme hizmetleri, görsel
              barındırma veya benzeri üçüncü taraf hizmetler kullanılabilir.
              Bu hizmetler kendi çerezlerini veya benzeri teknolojileri
              kullanabilir ve kendi gizlilik politikalarına tabi olabilir.
            </Article>

            <Article
              number="08"
              title="Çerez Tercihlerinin Yönetilmesi"
            >
              Kullanıcılar tarayıcı ayarları üzerinden çerezleri silebilir,
              engelleyebilir veya kullanımını sınırlandırabilir. Ancak zorunlu
              çerezlerin engellenmesi internet sitesinin bazı bölümlerinin
              doğru çalışmamasına neden olabilir.
            </Article>

            <Article
              number="09"
              title="Açık Rıza Gerektiren Çerezler"
            >
              Zorunlu olmayan ve açık rıza gerektiren çerezlerin kullanılması
              halinde kullanıcı tercihleri alınmadan bu çerezlerin
              çalıştırılmaması amaçlanmaktadır. Kullanıcıların tercihlerini
              sonradan değiştirebilmesine yönelik bir mekanizma da
              sağlanabilir.
            </Article>

            <Article
              number="10"
              title="Politikanın Güncellenmesi"
            >
              Kullanılan teknolojilerin, hizmet sağlayıcıların veya ilgili
              mevzuatın değişmesi halinde bu Çerez Politikası
              güncellenebilir. Güncel metin internet sitesi üzerinden
              yayımlanır.
            </Article>

            <Article
              number="11"
              title="İletişim"
            >
              Çerezlerin veya kişisel verilerin kullanımı hakkında sorularınız
              için Era Concept ile iletişime geçebilirsiniz.
            </Article>
          </div>

          <div className="mt-12 border border-black/10 bg-white p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              İletişim
            </p>

            <h2 className="mt-3 text-xl font-semibold">
              Era Concept Mobilyaları
            </h2>

            <p className="mt-3 text-sm leading-7 text-neutral-600">
              Aydınlı, Atlas Sk. No:7/B
              <br />
              34953 Tuzla / İstanbul
              <br />
              0532 396 66 34
            </p>

            <a
              href="/iletisim"
              className="mt-5 inline-flex min-h-11 items-center justify-center bg-[#181817] px-5 text-sm font-medium text-white transition hover:bg-black"
            >
              İletişim Sayfası
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Article({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-black/10 pb-9">
      <div className="grid gap-4 sm:grid-cols-[60px_1fr]">
        <span className="text-xs font-semibold text-neutral-400">
          {number}
        </span>

        <div>
          <h2 className="text-xl font-semibold text-neutral-900">
            {title}
          </h2>

          <div className="mt-3">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}