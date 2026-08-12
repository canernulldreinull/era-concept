import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

export default function PrivacyPolicyPage() {
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
              Gizlilik Politikası
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600">
              Era Concept internet sitesini kullanırken paylaştığınız
              bilgilerin gizliliğine ve güvenliğine önem veriyoruz.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
          <div className="space-y-10 text-sm leading-7 text-neutral-600">
            <Article
              number="01"
              title="Gizlilik Politikası Hakkında"
            >
              Bu Gizlilik Politikası, Era Concept internet sitesini ziyaret
              eden veya site üzerinden alışveriş yapan kullanıcıların
              bilgilerinin hangi amaçlarla kullanılabileceği ve korunmasına
              ilişkin genel esasları açıklamaktadır.
            </Article>

            <Article
              number="02"
              title="Toplanan Bilgiler"
            >
              Sipariş ve iletişim süreçlerinde ad ve soyad, telefon numarası,
              e-posta adresi, teslimat adresi ve sipariş bilgileri gibi
              bilgiler işlenebilir. Ayrıca internet sitesinin güvenliği ve
              çalışması kapsamında teknik bağlantı ve işlem kayıtları
              oluşturulabilir.
            </Article>

            <Article
              number="03"
              title="Bilgilerin Kullanım Amaçları"
            >
              Toplanan bilgiler; siparişlerin oluşturulması, ürünlerin
              teslimatı, müşteriyle iletişim kurulması, ödeme ve satış
              süreçlerinin yürütülmesi, müşteri taleplerinin karşılanması,
              yasal yükümlülüklerin yerine getirilmesi ve internet sitesinin
              güvenliğinin sağlanması amaçlarıyla kullanılabilir.
            </Article>

            <Article
              number="04"
              title="Ödeme Bilgileri"
            >
              Online ödeme işlemlerinde kart bilgilerinin doğrudan yetkili
              ödeme hizmeti sağlayıcısının güvenli altyapısı üzerinden
              işlenmesi amaçlanmaktadır. Era Concept, ödeme altyapısının
              çalışma şekline bağlı olarak kart numarası ve kart güvenlik kodu
              gibi hassas kart bilgilerini kendi sistemlerinde saklamaz.
            </Article>

            <Article
              number="05"
              title="Bilgilerin Paylaşılması"
            >
              Kişisel bilgiler; sipariş ve teslimat süreçlerinin
              gerçekleştirilebilmesi için gerekli olduğu ölçüde ödeme
              kuruluşları, taşıma veya teslimat hizmeti sağlayıcıları,
              teknik hizmet sağlayıcıları ve mevzuat gereği yetkili kamu
              kurumlarıyla paylaşılabilir.
            </Article>

            <Article
              number="06"
              title="Bilgi Güvenliği"
            >
              Kullanıcı bilgilerinin yetkisiz erişim, değiştirme, açıklama
              veya kayıp risklerine karşı korunması amacıyla uygun teknik ve
              idari güvenlik önlemlerinin uygulanmasına özen gösterilir.
            </Article>

            <Article
              number="07"
              title="Bilgilerin Saklanması"
            >
              Kişisel bilgiler, işlenme amaçlarının gerektirdiği süre boyunca
              ve ilgili mevzuatta öngörülen yasal saklama süreleri dikkate
              alınarak muhafaza edilir. Saklama gerekliliğinin ortadan
              kalkması halinde bilgiler ilgili mevzuata uygun şekilde
              silinebilir, yok edilebilir veya anonim hale getirilebilir.
            </Article>

            <Article
              number="08"
              title="Çerezler"
            >
              İnternet sitesinin doğru şekilde çalışması, kullanıcı
              deneyiminin geliştirilmesi ve gerekli teknik işlemlerin
              gerçekleştirilebilmesi amacıyla çerezler kullanılabilir.
              Çerezlerin kullanımına ilişkin ayrıntılı bilgiler Çerez
              Politikası sayfasında açıklanmaktadır.
            </Article>

            <Article
              number="09"
              title="Üçüncü Taraf Hizmetler"
            >
              İnternet sitesi ödeme, harita, görsel barındırma veya benzeri
              işlevler için üçüncü taraf hizmetlerden yararlanabilir. Bu
              hizmetlerin kendi gizlilik ve veri işleme koşulları
              bulunabilir.
            </Article>

            <Article
              number="10"
              title="Kullanıcı Hakları"
            >
              Kullanıcılar, kişisel verilerinin işlenmesine ilişkin yürürlükteki
              mevzuattan kaynaklanan haklarını kullanabilir. Kişisel verilerin
              işlenmesine ilişkin daha ayrıntılı açıklamalar KVKK
              Aydınlatma Metni sayfasında yer almaktadır.
            </Article>

            <Article
              number="11"
              title="Politikadaki Değişiklikler"
            >
              Bu politika, internet sitesinde kullanılan hizmetlerin veya
              ilgili mevzuatın değişmesi halinde güncellenebilir. Güncel metin
              internet sitesi üzerinden yayımlanır.
            </Article>

            <Article
              number="12"
              title="İletişim"
            >
              Gizlilik politikası veya kişisel bilgilerinizle ilgili
              sorularınız için Era Concept ile iletişime geçebilirsiniz.
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