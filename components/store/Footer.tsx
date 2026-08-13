import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaLocationDot,
} from "react-icons/fa6";

const instagramUrl =
  "https://www.instagram.com/eraconcept_2015/";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Era Concept Mobilyaları, Aydınlı, Atlas Sk. No:7/B, 34953 Tuzla/İstanbul"
  );

export default function Footer() {
  return (
    <footer className="bg-[#211f1b] text-white">
      {/* GÜVEN ŞERİDİ */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 lg:grid-cols-4">
          <FooterFeature
            number="01"
            title="Güvenli Alışveriş"
            text="Korunan ödeme süreci"
          />

          <FooterFeature
            number="02"
            title="Planlı Teslimat"
            text="Mobilyaya özel teslimat"
          />

          <FooterFeature
            number="03"
            title="Sipariş Takibi"
            text="Sipariş sürecini takip edin"
          />

          <FooterFeature
            number="04"
            title="Satış Sonrası"
            text="İhtiyacınız olduğunda destek"
          />
        </div>
      </div>

      {/* ANA FOOTER */}
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr] lg:gap-12">
          {/* MARKA */}
          <div>
            <div className="relative h-[68px] w-[210px] brightness-0 invert">
              <Image
                src="/era-concept-logo.png"
                alt="Era Concept"
                fill
                sizes="210px"
                className="object-contain object-left"
              />
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
              Yaşam alanlarına karakter
              kazandıran modern, işlevsel
              ve zamansız mobilya
              koleksiyonları.
            </p>

            <div className="mt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Tuzla Mağazası
              </p>

              <p className="mt-3 text-sm leading-6 text-white/60">
                Aydınlı, Atlas Sk.
                No:7/B
                <br />
                34953 Tuzla / İstanbul
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/65 transition hover:border-white/40 hover:bg-white hover:text-black"
              >
                <FaInstagram className="h-[17px] w-[17px]" />
              </a>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mağaza konumu"
                className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/65 transition hover:border-white/40 hover:bg-white hover:text-black"
              >
                <FaLocationDot className="h-[16px] w-[16px]" />
              </a>
            </div>
          </div>

          <FooterColumn
            title="Koleksiyonlar"
            links={[
              [
                "Oturma Odası",
                "/category/oturma-odasi",
              ],
              [
                "Yemek Odası",
                "/category/yemek-odasi",
              ],
              [
                "Yatak Odası",
                "/category/yatak-odasi",
              ],
              [
                "TV Üniteleri",
                "/category/tv-uniteleri",
              ],
              [
                "Çalışma Alanı",
                "/category/calisma-alani",
              ],
              [
                "Kitaplık",
                "/category/kitaplik",
              ],
            ]}
          />

          <FooterColumn
            title="Destek"
            links={[
              [
                "Sipariş Takibi",
                "/siparis-takibi",
              ],
              [
                "Teslimat Bilgileri",
                "/teslimat",
              ],
              [
                "İade ve Değişim",
                "/iade-ve-degisim",
              ],
              [
                "Sıkça Sorulan Sorular",
                "/sss",
              ],
              [
                "İletişim",
                "/iletisim",
              ],
            ]}
          />

          <FooterColumn
            title="Era Concept"
            links={[
              [
                "Hakkımızda",
                "/hakkimizda",
              ],
              [
                "Mesafeli Satış Sözleşmesi",
                "/mesafeli-satis-sozlesmesi",
              ],
              [
                "Gizlilik Politikası",
                "/gizlilik-politikasi",
              ],
              ["KVKK", "/kvkk"],
              [
                "Çerez Politikası",
                "/cerez-politikasi",
              ],
            ]}
          />
        </div>

        {/* ALT */}
        <div className="mt-16 border-t border-white/10 pt-7 sm:mt-20">
          <div className="flex flex-col gap-5 text-[10px] uppercase tracking-[0.12em] text-white/35 md:flex-row md:items-center md:justify-between">
            <p>
              ©{" "}
              {new Date().getFullYear()}{" "}
              Era Concept. Tüm hakları
              saklıdır.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span>
                Güvenli Ödeme
              </span>

              <span>
                Planlı Teslimat
              </span>

              <span>
                Müşteri Desteği
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterFeature({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="border-b border-white/10 px-5 py-7 last:border-b-0 even:border-l even:border-white/10 sm:px-6 lg:border-b-0 lg:border-l lg:border-white/10 lg:first:border-l-0 lg:px-10 lg:py-9">
      <p className="text-[9px] font-medium tracking-[0.18em] text-[#b59a79]">
        {number}
      </p>

      <p className="mt-3 text-sm font-medium tracking-[-0.01em] text-white/90">
        {title}
      </p>

      <p className="mt-1 text-[11px] leading-5 text-white/40">
        {text}
      </p>
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [
    string,
    string,
  ][];
}) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {title}
      </h3>

      <div className="mt-6 space-y-4">
        {links.map(
          ([label, href]) => (
            <Link
              key={label}
              href={href}
              className="group block w-fit text-[13px] text-white/60 transition hover:text-white"
            >
              <span className="relative">
                {label}

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/50 transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          )
        )}
      </div>
    </div>
  );
}