import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/store/Footer";

import { prisma } from "@/lib/prisma";
import Header from "@/components/store/Header";
import ProductCard from "@/components/store/ProductCard";

const roomCollections = [
  {
    title: "Oturma Odası",
    description:
      "Konforu ve modern tasarımı bir araya getiren yaşam alanları.",
    image: "/images/home/genisacioturmaodasi.jpg",
  },
  {
    title: "Yatak Odası",
    description:
      "Günün başladığı ve bittiği alan için zamansız tasarımlar.",
    image: "/images/home/modernyatakodasi.jpg",
  },
  {
    title: "Yemek Odası",
    description:
      "Sofraları ve buluşmaları tamamlayan şık yemek odaları.",
    image: "/images/home/sikyemekodasi.jpg",
  },
  {
    title: "TV Üniteleri",
    description:
      "Salonunuzun merkezini tamamlayan modern TV üniteleri.",
    image: "/images/home/tvunitesi.jpg",
  },
  {
    title: "Çalışma Alanı",
    description:
      "Ev ve ofis için işlevsel çalışma çözümleri.",
    image: "/images/home/calismamasasi.jpg",
  },
  {
    title: "Kitaplık",
    description:
      "Kitaplarınız ve dekoratif objeleriniz için işlevsel alanlar.",
    image: "/images/home/kitaplik.png",
  },
];

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: {
      active: true,
    },
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    include: {
      images: {
        orderBy: {
          position: "asc",
        },
        take: 1,
      },
    },
    take: 12,
  });

  const featuredProducts = products.slice(0, 8);
  const newestProducts = products.slice(0, 4);

  return (
    <>
      <Header />

      <main className="bg-[#f8f7f4] text-[#181817]">
        {/* HERO */}
        <section className="relative min-h-[650px] overflow-hidden lg:min-h-[780px]">
          <Image
            src="/images/home/hero-salon.jpg"
            alt="Era Concept oturma odası koleksiyonu"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

          <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-20 lg:min-h-[780px]">
            <div className="max-w-2xl text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Era Concept
              </p>

              <h1 className="mt-6 text-5xl font-medium leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-[78px]">
                Evinizin her
                <br />
                alanı için
                <br />
                yeni bir stil.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
                Oturma odasından yatak odasına, yemek odasından
                çalışma alanlarına kadar yaşamınızın her bölümünü
                tamamlayan mobilyaları keşfedin.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#koleksiyonlar"
                  className="inline-flex min-h-12 items-center justify-center bg-white px-7 text-sm font-medium text-black transition hover:bg-neutral-100"
                >
                  Koleksiyonları Keşfet
                </a>

                <a
                  href="#urunler"
                  className="inline-flex min-h-12 items-center justify-center border border-white/50 px-7 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                >
                  Ürünleri İncele
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* GÜVEN ŞERİDİ */}
        <section className="border-b border-black/5 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-black/5 md:grid-cols-4">
            <InfoItem
              title="Geniş Koleksiyon"
              text="Evinizin farklı alanları için mobilyalar"
            />

            <InfoItem
              title="Özenli Tasarım"
              text="Estetik ve kullanım odaklı ürünler"
            />

            <InfoItem
              title="Güvenli Alışveriş"
              text="Korunan ödeme ve sipariş süreci"
            />

            <InfoItem
              title="Satış Sonrası Destek"
              text="Sipariş öncesi ve sonrasında iletişim"
            />
          </div>
        </section>

        {/* ANA KATEGORİLER */}
        <section
          id="koleksiyonlar"
          className="mx-auto max-w-7xl px-6 py-20 sm:py-28"
        >
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Koleksiyonlar
              </p>

              <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
                Evinizin her köşesi için.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-neutral-500">
              Yaşam alanınızı tek tek ürünlerle değil, bir bütün
              olarak düşünün. Farklı odalar için hazırlanan
              koleksiyonları keşfedin.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roomCollections.map((collection) => (
              <a
                key={collection.title}
                href="#urunler"
                className="group relative min-h-[420px] overflow-hidden bg-neutral-200"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <h3 className="text-2xl font-medium tracking-tight">
                    {collection.title}
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
                    {collection.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/85">
                    Koleksiyonu keşfet
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* OTURMA ODASI BÜYÜK BANNER */}
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-0 sm:px-6">
            <div className="grid min-h-[620px] overflow-hidden lg:grid-cols-[1.4fr_0.6fr]">
              <div className="relative min-h-[430px] lg:min-h-[620px]">
                <Image
                  src="/images/home/oturma-odasi-koleksiyon.jpg"
                  alt="Era Concept oturma odası"
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
              </div>

              <div className="flex items-center bg-[#25241f] px-8 py-14 text-white sm:px-12 lg:px-14">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                    Oturma Odası
                  </p>

                  <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.04em]">
                    Evin en çok
                    <br />
                    yaşanan alanı.
                  </h2>

                  <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
                    Günlük yaşamın merkezinde konforu ve tasarımı
                    bir araya getiren koltuk takımları ve yaşam
                    alanı mobilyaları.
                  </p>

                  <a
                    href="#urunler"
                    className="mt-8 inline-flex border-b border-white/40 pb-1 text-sm font-medium"
                  >
                    Oturma odasını keşfet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ÖNE ÇIKAN ÜRÜNLER */}
        <section
          id="urunler"
          className="mx-auto max-w-7xl px-6 py-20 sm:py-28"
        >
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Era Concept
              </p>

              <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                Öne çıkan ürünler
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-neutral-500">
              Koleksiyonlarımızdan öne çıkan ürünleri inceleyin.
            </p>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="border border-black/10 bg-white p-10 text-neutral-500">
              Henüz ürün bulunmuyor.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </section>

        {/* YATAK ODASI */}
        <section className="border-y border-black/5 bg-white">
          <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
            <div className="flex items-center px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
              <div className="max-w-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  Yatak Odası
                </p>

                <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
                  Günün başladığı
                  <br />
                  ve bittiği yer.
                </h2>

                <p className="mt-6 text-base leading-7 text-neutral-600">
                  Dolap, karyola ve tamamlayıcı parçaların bir araya
                  geldiği yatak odası koleksiyonlarıyla daha sakin,
                  düzenli ve bütünlüklü yaşam alanları oluşturun.
                </p>

                <a
                  href="#urunler"
                  className="mt-8 inline-flex border-b border-black/30 pb-1 text-sm font-medium"
                >
                  Yatak odalarını keşfet
                </a>
              </div>
            </div>

            <div className="relative min-h-[500px] lg:min-h-[650px]">
              <Image
                src="/images/home/modernyatakodasi.jpg"
                alt="Era Concept modern yatak odası"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* DÜĞÜN / EV PAKETİ */}
        <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <div className="relative min-h-[560px] overflow-hidden">
            <Image
              src="/images/home/dugunpaketi.jpg"
              alt="Era Concept ev ve düğün paketi"
              fill
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/5" />

            <div className="relative flex min-h-[560px] items-center px-7 py-16 sm:px-12 lg:px-16">
              <div className="max-w-xl text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/65">
                  Komple Ev Koleksiyonları
                </p>

                <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
                  Yeni bir eve,
                  <br />
                  eksiksiz bir başlangıç.
                </h2>

                <p className="mt-6 max-w-lg text-base leading-7 text-white/75">
                  Oturma odası, yemek odası ve yatak odası
                  koleksiyonlarını uyumlu bir bütün halinde
                  değerlendirin.
                </p>

                <a
                  href="#urunler"
                  className="mt-8 inline-flex min-h-12 items-center justify-center bg-white px-7 text-sm font-medium text-black"
                >
                  Koleksiyonları İncele
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* YEMEK ODASI + TV ÜNİTESİ */}
        <section className="bg-[#efede8]">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Yaşam Alanları
              </p>

              <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                Detaylarda bütünlük.
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <FeatureCard
                image="/images/home/sikyemekodasi.jpg"
                title="Yemek Odaları"
                text="Sofraları daha özel hale getiren masa, sandalye ve tamamlayıcı mobilyalar."
              />

              <FeatureCard
                image="/images/home/tvunitesi.jpg"
                title="TV Üniteleri"
                text="Salonun merkezini tamamlayan sade ve fonksiyonel tasarımlar."
              />
            </div>
          </div>
        </section>

        {/* YENİ ÜRÜNLER */}
        {newestProducts.length > 0 && (
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
              <div className="mb-12">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  Yeni Gelenler
                </p>

                <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                  Koleksiyona yeni eklenenler
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
                {newestProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ÇALIŞMA + KİTAPLIK */}
        <section className="border-t border-black/5 bg-[#f8f7f4]">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
            <div className="grid gap-5 md:grid-cols-2">
              <SmallCollection
                image="/images/home/calismamasasi.jpg"
                title="Çalışma Alanları"
                text="Fonksiyonel masalar ve düzenli çalışma çözümleri."
              />

              <SmallCollection
                image="/images/home/kitaplik.png"
                title="Kitaplıklar"
                text="Kitaplarınız ve dekoratif objeleriniz için tasarlanan depolama çözümleri."
              />
            </div>
          </div>
        </section>

        {/* MARKA HİKAYESİ */}
        <section className="bg-[#25241f] text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                Era Concept
              </p>

              <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
                Bir mobilyadan fazlası.
                Yaşam alanınızın bir parçası.
              </h2>
            </div>

            <div className="max-w-lg lg:ml-auto">
              <p className="text-base leading-8 text-white/65">
                Era Concept, farklı yaşam alanlarında estetik,
                işlevsellik ve konforu bir araya getiren mobilya
                çözümleri sunmayı hedefler. Tek bir üründen komple
                yaşam alanlarına kadar her parçanın aynı bütünün
                parçası olması gerektiğine inanıyoruz.
              </p>

              <a
                href="#koleksiyonlar"
                className="mt-8 inline-flex border-b border-white/40 pb-1 text-sm font-medium"
              >
                Koleksiyonları keşfedin
              </a>
            </div>
          </div>
        </section>

                {/* ALT GÜVEN ALANI */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-px bg-black/10 md:grid-cols-4">
            <BottomFeature
              number="01"
              title="Güvenli Ödeme"
              text="Ödeme altyapımız üzerinden korunan alışveriş deneyimi."
            />

            <BottomFeature
              number="02"
              title="Sipariş Takibi"
              text="Siparişinizin durumunu süreç boyunca takip edin."
            />

            <BottomFeature
              number="03"
              title="Teslimat"
              text="Mobilya siparişlerine uygun planlı teslimat süreci."
            />

            <BottomFeature
              number="04"
              title="Müşteri Desteği"
              text="Sipariş öncesi ve sonrasında ihtiyaç duyduğunuz destek."
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function InfoItem({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="px-5 py-7 sm:px-7">
      <p className="text-sm font-medium">
        {title}
      </p>

      <p className="mt-2 hidden text-xs leading-5 text-neutral-500 sm:block">
        {text}
      </p>
    </div>
  );
}

function FeatureCard({
  image,
  title,
  text,
}: {
  image: string;
  title: string;
  text: string;
}) {
  return (
    <a
      href="#urunler"
      className="group relative min-h-[520px] overflow-hidden"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition duration-700 group-hover:scale-[1.025]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-8 text-white">
        <h3 className="text-3xl font-medium">
          {title}
        </h3>

        <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
          {text}
        </p>

        <span className="mt-5 inline-flex text-sm font-medium">
          Keşfet →
        </span>
      </div>
    </a>
  );
}

function SmallCollection({
  image,
  title,
  text,
}: {
  image: string;
  title: string;
  text: string;
}) {
  return (
    <a
      href="#urunler"
      className="group grid overflow-hidden bg-white sm:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="relative min-h-[300px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex items-center p-8">
        <div>
          <h3 className="text-2xl font-medium">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            {text}
          </p>

          <span className="mt-5 inline-flex text-sm font-medium">
            Ürünleri incele →
          </span>
        </div>
      </div>
    </a>
  );
}

function BottomFeature({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white px-6 py-10">
      <p className="text-xs font-medium text-neutral-400">
        {number}
      </p>

      <h3 className="mt-5 font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-xs leading-6 text-neutral-500">
        {text}
      </p>
    </div>
  );
}