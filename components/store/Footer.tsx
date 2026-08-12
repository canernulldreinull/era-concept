import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#1f1e1a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold tracking-wide">
              ERA CONCEPT
            </p>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
              Oturma odasından yatak odasına, yemek odasından çalışma
              alanlarına kadar yaşam alanınız için mobilya koleksiyonları.
            </p>
          </div>

          <FooterColumn
            title="Koleksiyonlar"
            links={[
              ["Oturma Odası", "/#koleksiyonlar"],
              ["Yemek Odası", "/#koleksiyonlar"],
              ["Yatak Odası", "/#koleksiyonlar"],
              ["TV Üniteleri", "/#koleksiyonlar"],
              ["Çalışma Alanı", "/#koleksiyonlar"],
              ["Kitaplık", "/#koleksiyonlar"],
            ]}
          />

          <FooterColumn
            title="Müşteri Hizmetleri"
            links={[
              ["Sipariş Takibi", "/siparis-takibi"],
              ["Teslimat Bilgileri", "/teslimat"],
              ["İade ve Değişim", "/iade-ve-degisim"],
              ["Sıkça Sorulan Sorular", "/sss"],
              ["İletişim", "/iletisim"],
            ]}
          />

          <FooterColumn
            title="Kurumsal"
            links={[
              ["Hakkımızda", "/hakkimizda"],
              [
                "Mesafeli Satış Sözleşmesi",
                "/mesafeli-satis-sozlesmesi",
              ],
              ["Gizlilik Politikası", "/gizlilik-politikasi"],
              ["KVKK", "/kvkk"],
              ["Çerez Politikası", "/cerez-politikasi"],
            ]}
          />
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Era Concept. Tüm hakları saklıdır.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <span>Güvenli Ödeme</span>
              <span>Planlı Teslimat</span>
              <span>Müşteri Desteği</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold">
        {title}
      </h3>

      <div className="mt-5 space-y-3">
        {links.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="block text-sm text-white/55 transition hover:text-white"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}