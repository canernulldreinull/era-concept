import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

export default function DistanceSalesAgreementPage() {
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
              Mesafeli Satış Sözleşmesi
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600">
              İnternet sitesi üzerinden gerçekleştirilen satışlara ilişkin
              temel sözleşme koşulları aşağıda yer almaktadır.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
          <div className="space-y-10 text-sm leading-7 text-neutral-600">
            <Article
              number="01"
              title="Taraflar"
            >
              <p>
                İşbu Mesafeli Satış Sözleşmesi, aşağıda bilgileri bulunan
                satıcı ile internet sitesi üzerinden ürün satın alan tüketici
                arasında elektronik ortamda kurulmaktadır.
              </p>

              <div className="mt-5 border border-black/10 bg-white p-5">
                <p>
                  <strong>Satıcı:</strong> Era Concept Mobilyaları
                </p>

                <p className="mt-2">
                  <strong>Ticari Unvan:</strong> [ŞİRKET / ŞAHIS UNVANI]
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

                <p className="mt-2">
                  <strong>Vergi No / T.C. No:</strong> [DOLDURULACAK]
                </p>

                <p className="mt-2">
                  <strong>MERSİS No:</strong> [VARSA DOLDURULACAK]
                </p>
              </div>
            </Article>

            <Article
              number="02"
              title="Sözleşmenin Konusu"
            >
              İşbu sözleşmenin konusu, tüketicinin internet sitesi üzerinden
              elektronik ortamda sipariş verdiği ürün veya ürünlerin satışı ve
              teslimine ilişkin tarafların hak ve yükümlülüklerinin
              belirlenmesidir.
            </Article>

            <Article
              number="03"
              title="Ürün ve Sipariş Bilgileri"
            >
              Satın alınan ürünün adı, adedi, satış bedeli, teslimat bilgileri
              ve varsa diğer özellikleri sipariş sırasında tüketiciye
              gösterilir. Tüketici siparişi onaylamadan önce sipariş özetini
              kontrol etmekle yükümlüdür.
            </Article>

            <Article
              number="04"
              title="Fiyat ve Ödeme"
            >
              Ürünlerin satış fiyatları internet sitesinde Türk Lirası
              cinsinden gösterilir. Siparişe ait toplam ödeme tutarı, ürün
              bedelleri ve varsa teslimat veya diğer yasal masraflar dahil
              edilerek ödeme öncesinde tüketiciye gösterilir.
            </Article>

            <Article
              number="05"
              title="Teslimat"
            >
              Siparişler, tüketici tarafından belirtilen teslimat adresine
              gönderilir. Teslimat süresi ürünün stok durumu, hazırlanma
              süreci, ürün özellikleri ve teslimat bölgesine göre değişiklik
              gösterebilir.
            </Article>

            <Article
              number="06"
              title="Teslimat Kontrolü"
            >
              Tüketicinin ürünü teslim alırken ürün ve ambalaj üzerinde
              görünür bir hasar bulunup bulunmadığını kontrol etmesi önerilir.
              Teslimat sırasında tespit edilen hasar veya eksikliklerin mümkün
              olan en kısa sürede satıcıya bildirilmesi gerekir.
            </Article>

            <Article
              number="07"
              title="Cayma Hakkı"
            >
              Tüketici, ilgili mevzuatta belirtilen istisnalar saklı kalmak
              kaydıyla, mal teslimine ilişkin mesafeli sözleşmelerde ürünü
              teslim aldığı tarihten itibaren 14 gün içerisinde herhangi bir
              gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden
              cayma hakkına sahiptir.
            </Article>

            <Article
              number="08"
              title="Cayma Bildirimi"
            >
              Cayma hakkının kullanılması halinde tüketicinin talebini süresi
              içerisinde satıcıya açık ve anlaşılır şekilde bildirmesi
              gerekir. Bildirim için yazılı iletişim kanalları veya kalıcı veri
              saklayıcısı niteliğindeki iletişim yöntemleri kullanılabilir.
            </Article>

            <Article
              number="09"
              title="Cayma Hakkının Kullanılamayacağı Durumlar"
            >
              İlgili mevzuat kapsamında cayma hakkı istisnası bulunan ürünlerde
              cayma hakkı kullanılamayabilir. Özellikle tüketicinin talebi veya
              kişisel ihtiyaçları doğrultusunda özel ölçü, renk, malzeme veya
              benzeri özelliklerle hazırlanan ürünler bu kapsamda
              değerlendirilebilir.
            </Article>

            <Article
              number="10"
              title="İade Süreci"
            >
              Cayma veya iade talebinin kabul edildiği durumlarda ürünün
              satıcıya ulaştırılması ve ücret iadesi ilgili mevzuat ve ödeme
              kuruluşlarının işlem süreleri doğrultusunda gerçekleştirilir.
              Ücret iadeleri mümkün olduğunca satın alma sırasında kullanılan
              ödeme yöntemine uygun şekilde yapılır.
            </Article>

            <Article
              number="11"
              title="Ayıplı veya Hasarlı Ürün"
            >
              Ürünün kusurlu, eksik veya ayıplı olması halinde tüketicinin
              yürürlükteki tüketici mevzuatından kaynaklanan hakları saklıdır.
              Ürünle ilgili sorun yaşanması halinde tüketici satıcıyla
              iletişime geçebilir.
            </Article>

            <Article
              number="12"
              title="Mücbir Sebepler"
            >
              Doğal afet, ulaşım ve altyapı sorunları, savaş, salgın, resmi
              makam kararları ve tarafların makul kontrolü dışında gerçekleşen
              benzeri durumlar nedeniyle yükümlülüklerin yerine
              getirilememesinden taraflar, mevzuatın izin verdiği ölçüde
              sorumlu tutulmayabilir.
            </Article>

            <Article
              number="13"
              title="Uyuşmazlıkların Çözümü"
            >
              Tüketici, uyuşmazlık halinde yürürlükteki tüketici mevzuatında
              öngörülen yetkili Tüketici Hakem Heyetleri ve Tüketici
              Mahkemelerine başvurma hakkına sahiptir.
            </Article>

            <Article
              number="14"
              title="Yürürlük"
            >
              Tüketici, internet sitesi üzerinden siparişini tamamlayarak
              kendisine sunulan ön bilgilendirme ve satış koşullarını
              elektronik ortamda kabul etmiş sayılır. İşbu sözleşme siparişin
              elektronik ortamda onaylanmasıyla birlikte yürürlüğe girer.
            </Article>
          </div>

          <div className="mt-12 border border-amber-200 bg-amber-50 p-6">
            <p className="text-sm font-semibold text-amber-900">
              Yayına almadan önce doldurulacak bilgiler
            </p>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              Ticari unvan, e-posta adresi, vergi/T.C. numarası ve varsa MERSİS
              numarası kesin şirket bilgileriyle güncellenmelidir.
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