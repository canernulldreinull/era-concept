import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

export default function KvkkPage() {
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
              KVKK Aydınlatma Metni
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600">
              Kişisel verilerinizin işlenmesine ilişkin bilgilendirme metni.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
          <div className="space-y-10 text-sm leading-7 text-neutral-600">
            <Article
              number="01"
              title="Veri Sorumlusu"
            >
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında
                kişisel verileriniz aşağıdaki veri sorumlusu tarafından
                işlenebilmektedir.
              </p>

              <div className="mt-5 border border-black/10 bg-white p-5">
                <p>
                  <strong>İşletme:</strong> Era Concept Mobilyaları
                </p>

                <p className="mt-2">
                  <strong>Resmî Ticari Unvan:</strong>{" "}
                  [ŞİRKET / ŞAHIS UNVANI]
                </p>

                <p className="mt-2">
                  <strong>Adres:</strong> Aydınlı, Atlas Sk. No:7/B,
                  34953 Tuzla / İstanbul
                </p>

                <p className="mt-2">
                  <strong>Telefon:</strong> 0532 396 66 34
                </p>

                <p className="mt-2">
                  <strong>E-posta:</strong> [E-POSTA ADRESİ]
                </p>
              </div>
            </Article>

            <Article
              number="02"
              title="İşlenebilecek Kişisel Veriler"
            >
              İnternet sitesi üzerinden gerçekleştirilen işlemlere bağlı
              olarak ad ve soyad, telefon numarası, e-posta adresi, teslimat
              adresi, sipariş bilgileri ve iletişim kayıtları gibi kişisel
              veriler işlenebilir. İnternet sitesinin güvenliğinin sağlanması
              amacıyla teknik işlem ve bağlantı kayıtları da işlenebilir.
            </Article>

            <Article
              number="03"
              title="Kişisel Verilerin İşlenme Amaçları"
            >
              Kişisel verileriniz; sipariş oluşturulması, ürünlerin
              hazırlanması ve teslim edilmesi, ödeme süreçlerinin
              yürütülmesi, müşterilerle iletişim kurulması, sipariş ve
              taleplerin takip edilmesi, müşteri desteğinin sağlanması,
              yasal yükümlülüklerin yerine getirilmesi ve internet sitesi
              güvenliğinin sağlanması amaçlarıyla işlenebilir.
            </Article>

            <Article
              number="04"
              title="Kişisel Verilerin Toplanma Yöntemi"
            >
              Kişisel verileriniz internet sitesi üzerindeki sipariş ve
              iletişim formları, telefon, WhatsApp, elektronik iletişim
              kanalları ve sipariş işlemleri sırasında elektronik veya
              fiziksel yöntemlerle elde edilebilir.
            </Article>

            <Article
              number="05"
              title="Kişisel Verilerin İşlenmesinin Hukuki Sebepleri"
            >
              Kişisel veriler, yürürlükteki mevzuatta belirtilen kişisel veri
              işleme şartları kapsamında; sözleşmenin kurulması veya ifası,
              veri sorumlusunun hukuki yükümlülüklerini yerine getirmesi,
              bir hakkın tesisi, kullanılması veya korunması ve ilgili diğer
              hukuki sebeplere dayanılarak işlenebilir.
            </Article>

            <Article
              number="06"
              title="Kişisel Verilerin Aktarılması"
            >
              Kişisel verileriniz; sipariş, ödeme ve teslimat süreçlerinin
              yürütülmesi amacıyla gerekli olduğu ölçüde ödeme hizmeti
              sağlayıcıları, kargo veya teslimat hizmeti sağlayıcıları,
              bilişim ve altyapı hizmeti sağlayıcıları ile paylaşılabilir.
              Ayrıca kanuni yükümlülükler kapsamında yetkili kamu kurum ve
              kuruluşlarına aktarım yapılabilir.
            </Article>

            <Article
              number="07"
              title="Ödeme İşlemleri"
            >
              Online ödeme hizmeti kullanılması halinde ödeme işlemlerine
              ilişkin veriler yetkili ödeme hizmeti sağlayıcısının güvenli
              sistemleri üzerinden işlenebilir. Kart numarası ve kart
              güvenlik kodu gibi hassas ödeme bilgilerinin Era Concept
              sistemlerinde saklanmaması hedeflenmektedir.
            </Article>

            <Article
              number="08"
              title="Verilerin Saklanması ve Güvenliği"
            >
              Kişisel veriler, işleme amaçlarının gerektirdiği süre boyunca
              ve ilgili mevzuatta öngörülen saklama süreleri dikkate alınarak
              muhafaza edilir. Verilerin hukuka aykırı şekilde işlenmesini,
              erişilmesini veya kaybolmasını önlemeye yönelik uygun teknik ve
              idari tedbirlerin uygulanmasına özen gösterilir.
            </Article>

            <Article
              number="09"
              title="İlgili Kişinin Hakları"
            >
              Kişisel verisi işlenen kişiler, yürürlükteki mevzuat kapsamında
              veri sorumlusuna başvurarak kendileriyle ilgili kişisel veri
              işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi
              talep etme, işlenme amacını ve amacına uygun kullanılıp
              kullanılmadığını öğrenme, verilerin aktarıldığı üçüncü kişileri
              öğrenme ve mevzuatta düzenlenen diğer haklarını kullanabilir.
            </Article>

            <Article
              number="10"
              title="Başvuru Yöntemi"
            >
              Kişisel verilerinizle ilgili taleplerinizi, kimliğinizi ve
              talebinizi açık şekilde belirterek veri sorumlusuna
              iletebilirsiniz. Başvurunun değerlendirilmesi sırasında talebin
              doğrulanabilmesi amacıyla ek bilgi talep edilebilir.
            </Article>

            <Article
              number="11"
              title="İletişim"
            >
              KVKK kapsamındaki başvurularınız ve kişisel verilerinizle ilgili
              sorularınız için aşağıdaki iletişim kanallarını
              kullanabilirsiniz.
            </Article>
          </div>

          <div className="mt-12 border border-black/10 bg-white p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Veri Sorumlusu İletişim Bilgileri
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
              <br />
              [E-POSTA ADRESİ]
            </p>
          </div>

          <div className="mt-6 border border-amber-200 bg-amber-50 p-6">
            <p className="text-sm font-semibold text-amber-900">
              Yayına almadan önce doldurulacak
            </p>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              Resmî ticari unvan ve kişisel veri başvurularında kullanılacak
              e-posta adresi şirket bilgileri geldiğinde güncellenecektir.
            </p>
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