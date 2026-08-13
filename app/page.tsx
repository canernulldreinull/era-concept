import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import ProductCard from "@/components/store/ProductCard";

const roomCollections = [
  {
    title: "Oturma Odası",
    subtitle: "Yaşamın merkezi",
    image:
      "/images/home/oturma-odasi-koleksiyon.jpg",
    href: "/category/oturma-odasi",
    className:
      "md:col-span-7 md:row-span-2 min-h-[450px] md:min-h-[760px]",
  },
  {
    title: "Yemek Odası",
    subtitle: "Bir araya geldiğiniz anlar",
    image:
      "/images/home/sikyemekodasi.jpg",
    href: "/category/yemek-odasi",
    className:
      "md:col-span-5 min-h-[360px]",
  },
  {
    title: "Yatak Odası",
    subtitle: "Dingin ve zamansız",
    image:
      "/images/home/modernyatakodasi.jpg",
    href: "/category/yatak-odasi",
    className:
      "md:col-span-5 min-h-[360px]",
  },
];

const smallCollections = [
  {
    title: "TV Üniteleri",
    image:
      "/images/home/tvunitesi.jpg",
    href: "/category/tv-uniteleri",
  },
  {
    title: "Çalışma Alanı",
    image:
      "/images/home/calismamasasi.jpg",
    href: "/category/calisma-alani",
  },
  {
    title: "Kitaplık",
    image:
      "/images/home/kitaplik.png",
    href: "/category/kitaplik",
  },
];

export default async function HomePage() {
  const products =
    await prisma.product.findMany({
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

          take: 2,
        },
      },

      take: 12,
    });

  const featuredProducts =
    products.slice(0, 8);

  const newestProducts =
    products.slice(0, 4);

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#f5f2ec] text-[#211f1b]">
        {/* HERO */}
        <section className="relative min-h-[590px] overflow-hidden sm:min-h-[680px] lg:min-h-[790px]">
          <Image
            src="/images/home/hero-salon.jpg"
            alt="Era Concept yaşam alanı koleksiyonu"
            fill
            priority
            sizes="100vw"
            className="era-hero-image object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/5" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5" />

          {/* İÇERİK */}
          <div className="relative mx-auto flex min-h-[590px] w-full max-w-[1500px] items-end px-5 pb-16 pt-24 sm:min-h-[680px] sm:px-8 sm:pb-20 lg:min-h-[790px] lg:items-center lg:px-10 lg:pb-0">
            <div className="era-fade-up max-w-[760px] text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60 sm:text-[11px]">
                Era Concept · İstanbul
              </p>

              <h1 className="era-display mt-5 max-w-[720px] text-[45px] leading-[0.99] text-white sm:text-[64px] lg:text-[82px]">
                Yaşam alanınıza
                <br />
                yeni bir karakter.
              </h1>

              <p className="mt-6 max-w-xl text-[14px] leading-7 text-white/70 sm:mt-8 sm:text-base sm:leading-8">
                Zamansız çizgiler,
                işlevsel detaylar ve
                yaşam alanınıza uyum
                sağlayan mobilya
                koleksiyonları.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
                <a
                  href="#koleksiyonlar"
                  className="flex min-h-[52px] items-center justify-center bg-white px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#211f1b] transition duration-300 hover:bg-[#e8e3da] sm:w-auto"
                >
                  Koleksiyonları Keşfet
                </a>

                <a
                  href="#urunler"
                  className="flex min-h-[52px] items-center justify-center border border-white/35 px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white hover:text-black sm:w-auto"
                >
                  Ürünleri İncele
                </a>
              </div>
            </div>
          </div>

          {/* ALT ETİKET */}
          <div className="absolute bottom-7 right-8 hidden items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/45 lg:flex">
            <span className="h-px w-10 bg-white/35" />
            Contemporary Living
          </div>
        </section>

        {/* GÜVEN / BRAND STRIP */}
        <section className="border-b border-black/[0.07] bg-[#faf8f4]">
          <div className="mx-auto grid max-w-[1500px] grid-cols-2 lg:grid-cols-4">
            <TrustItem
              number="01"
              title="Özenli Tasarım"
              text="Yaşam alanınızla bütünleşen mobilyalar"
            />

            <TrustItem
              number="02"
              title="Güvenli Alışveriş"
              text="Korunan sipariş ve ödeme süreci"
            />

            <TrustItem
              number="03"
              title="Planlı Teslimat"
              text="Mobilyaya uygun teslimat süreci"
            />

            <TrustItem
              number="04"
              title="Satış Sonrası"
              text="Sipariş öncesi ve sonrası destek"
            />
          </div>
        </section>

        {/* KOLEKSİYON BAŞLIK */}
        <section
          id="koleksiyonlar"
          className="mx-auto max-w-[1500px] px-5 pb-10 pt-20 sm:px-8 sm:pb-14 sm:pt-28 lg:px-10 lg:pt-36"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="era-kicker">
                Koleksiyonlar
              </p>

              <h2 className="era-display mt-5 max-w-3xl text-[42px] leading-[1.02] sm:text-[56px] lg:text-[68px]">
                Her oda,
                <br />
                ayrı bir hikâye.
              </h2>
            </div>

            <p className="max-w-lg text-sm leading-7 text-[#716d65] lg:ml-auto lg:text-base lg:leading-8">
              Evinizi tek tek
              mobilyalardan oluşan bir alan
              olarak değil, aynı tasarım
              dilini paylaşan bir bütün
              olarak ele alın.
            </p>
          </div>
        </section>

        {/* EDITORIAL KOLEKSİYON GRID */}
        <section className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-4 md:grid-cols-12">
            {roomCollections.map(
              (collection) => (
                <CollectionCard
                  key={collection.title}
                  {...collection}
                />
              )
            )}
          </div>

          {/* KÜÇÜK KOLEKSİYONLAR */}
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {smallCollections.map(
              (collection) => (
                <SmallRoomCard
                  key={collection.title}
                  {...collection}
                />
              )
            )}
          </div>
        </section>

        {/* ÖNE ÇIKAN ÜRÜNLER */}
        <section
          id="urunler"
          className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36"
        >
          <SectionHeading
            kicker="Seçkimiz"
            title="Öne çıkan tasarımlar."
            description="Era Concept koleksiyonlarından yaşam alanınıza yön verecek seçili ürünler."
          />

          {featuredProducts.length ===
          0 ? (
            <div className="mt-12 border border-black/10 bg-white px-6 py-16 text-center text-sm text-neutral-500">
              Henüz ürün bulunmuyor.
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-14 md:grid-cols-3 lg:mt-16 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-16">
              {featuredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}
            </div>
          )}
        </section>

        {/* OTURMA ODASI EDITORIAL */}
        <section className="bg-[#24221e] text-white">
          <div className="mx-auto grid max-w-[1600px] lg:min-h-[720px] lg:grid-cols-[1.35fr_0.65fr]">
            <div className="relative min-h-[420px] overflow-hidden sm:min-h-[560px] lg:min-h-[720px]">
              <Image
                src="/images/home/oturma-odasi-koleksiyon.jpg"
                alt="Era Concept oturma odası"
                fill
                sizes="(max-width: 1024px) 100vw, 68vw"
                className="object-cover transition duration-[1200ms] hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="flex items-center px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c0a484]">
                  Oturma Odası
                </p>

                <h2 className="era-display mt-6 text-[42px] leading-[1.02] sm:text-[54px]">
                  Evin en çok
                  <br />
                  yaşanan alanı.
                </h2>

                <p className="mt-7 max-w-sm text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                  Konforu, işlevselliği
                  ve modern tasarımı
                  aynı yaşam alanında
                  buluşturan
                  koleksiyonlar.
                </p>

                <Link
                  href="/category/oturma-odasi"
                  className="group mt-9 inline-flex items-center gap-4 border-b border-white/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
                >
                  Koleksiyonu Keşfet

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TASARIM FELSEFESİ */}
        <section className="bg-[#f5f2ec]">
          <div className="mx-auto max-w-[1200px] px-5 py-24 text-center sm:px-8 sm:py-32 lg:py-40">
            <p className="era-kicker">
              Era Concept
            </p>

            <p className="era-display mx-auto mt-7 max-w-[950px] text-[35px] leading-[1.15] text-[#282620] sm:text-[48px] lg:text-[58px]">
              “İyi tasarım yalnızca
              görünen değil,
              yaşadığınız alanı
              hissettiren detaydır.”
            </p>

            <div className="mx-auto mt-9 h-px w-14 bg-[#9a7b56]" />
          </div>
        </section>

        {/* YATAK ODASI */}
        <section className="border-y border-black/[0.07] bg-[#faf8f4]">
          <div className="mx-auto grid max-w-[1500px] lg:grid-cols-2">
            <div className="order-2 flex items-center px-6 py-16 sm:px-10 sm:py-20 lg:order-1 lg:px-20">
              <div className="max-w-lg">
                <p className="era-kicker">
                  Yatak Odası
                </p>

                <h2 className="era-display mt-6 text-[43px] leading-[1.03] sm:text-[58px]">
                  Günün başladığı
                  <br />
                  ve bittiği yer.
                </h2>

                <p className="mt-7 text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
                  Karyola, dolap ve
                  tamamlayıcı parçaların
                  uyum içinde bir araya
                  geldiği sakin ve
                  bütünlüklü yatak odaları.
                </p>

                <Link
                  href="/category/yatak-odasi"
                  className="group mt-9 inline-flex items-center gap-4 border-b border-black/20 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em]"
                >
                  Koleksiyonu Keşfet

                  <span className="text-[#9a7b56] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="relative order-1 min-h-[430px] overflow-hidden sm:min-h-[570px] lg:order-2 lg:min-h-[720px]">
              <Image
                src="/images/home/modernyatakodasi.jpg"
                alt="Era Concept yatak odası"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* DÜĞÜN / YENİ EV */}
        <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
          <div className="relative min-h-[560px] overflow-hidden sm:min-h-[650px]">
            <Image
              src="/images/home/dugunpaketi.jpg"
              alt="Era Concept komple ev koleksiyonları"
              fill
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/5" />

            <div className="relative flex min-h-[560px] items-end px-6 py-12 text-white sm:min-h-[650px] sm:items-center sm:px-12 lg:px-20">
              <div className="max-w-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d1b28d]">
                  Komple Ev
                </p>

                <h2 className="era-display mt-6 text-[46px] leading-[1.02] sm:text-[64px]">
                  Yeni bir eve,
                  <br />
                  eksiksiz bir başlangıç.
                </h2>

                <p className="mt-7 max-w-lg text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                  Oturma, yemek ve yatak
                  odası koleksiyonlarını
                  aynı tasarım dili içinde
                  değerlendirin.
                </p>

                <a
                  href="#koleksiyonlar"
                  className="mt-9 inline-flex min-h-[52px] items-center bg-white px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-[#e8e3da]"
                >
                  Koleksiyonları İncele
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* YEMEK + TV */}
        <section className="bg-[#ebe6dd]">
          <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
            <SectionHeading
              kicker="Yaşam Alanları"
              title="Detaylarda bütünlük."
              description="Bir yaşam alanını tamamlayan şey yalnızca ana mobilyalar değil, onları bir araya getiren detaylardır."
            />

            <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-2">
              <FeatureCard
                image="/images/home/sikyemekodasi.jpg"
                title="Yemek Odaları"
                subtitle="Birlikte geçirilen anlar için"
                href="/category/yemek-odasi"
              />

              <FeatureCard
                image="/images/home/tvunitesi.jpg"
                title="TV Üniteleri"
                subtitle="Salonun merkezini tamamlayan tasarımlar"
                href="/category/tv-uniteleri"
              />
            </div>
          </div>
        </section>

        {/* YENİ GELENLER */}
        {newestProducts.length >
          0 && (
          <section className="bg-[#faf8f4]">
            <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
              <SectionHeading
                kicker="Yeni Gelenler"
                title="Koleksiyona yeni eklenenler."
                description="Era Concept koleksiyonuna son eklenen tasarımları keşfedin."
              />

              <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-14 md:grid-cols-4 lg:mt-16 lg:gap-x-6">
                {newestProducts.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )
                )}
              </div>
            </div>
          </section>
        )}

        {/* MARKA HİKAYESİ */}
        <section className="bg-[#211f1b] text-white">
          <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-10 lg:py-36">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b59a79]">
                Biz Kimiz?
              </p>

              <h2 className="era-display mt-6 max-w-3xl text-[44px] leading-[1.03] sm:text-[60px] lg:text-[68px]">
                Bir mobilyadan fazlası.
                <br />
                Yaşam alanınızın parçası.
              </h2>
            </div>

            <div className="max-w-lg lg:ml-auto">
              <p className="text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                Era Concept,
                yaşam alanlarında estetik,
                işlevsellik ve konforu
                aynı çizgide buluşturan
                mobilya çözümleri sunar.
                Her parçayı evinizin
                bütünü içinde düşünür.
              </p>

              <Link
                href="/hakkimizda"
                className="group mt-8 inline-flex items-center gap-4 border-b border-white/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em]"
              >
                Era Concept'i Tanıyın

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function TrustItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="border-b border-black/[0.07] px-5 py-7 even:border-l even:border-black/[0.07] lg:border-b-0 lg:border-l lg:first:border-l-0 lg:px-8 lg:py-9">
      <p className="text-[9px] font-medium tracking-[0.15em] text-[#9a7b56]">
        {number}
      </p>

      <p className="mt-3 text-[13px] font-medium text-[#292722]">
        {title}
      </p>

      <p className="mt-1 hidden text-[11px] leading-5 text-neutral-500 sm:block">
        {text}
      </p>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.6fr] lg:items-end">
      <div>
        <p className="era-kicker">
          {kicker}
        </p>

        <h2 className="era-display mt-5 text-[42px] leading-[1.02] sm:text-[56px] lg:text-[64px]">
          {title}
        </h2>
      </div>

      <p className="max-w-md text-sm leading-7 text-neutral-500 lg:ml-auto">
        {description}
      </p>
    </div>
  );
}

function CollectionCard({
  title,
  subtitle,
  image,
  href,
  className,
}: {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  className: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden bg-neutral-200 ${className}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover transition duration-[1100ms] ease-out group-hover:scale-[1.025]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-10">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/55">
          {subtitle}
        </p>

        <div className="mt-3 flex items-end justify-between gap-4">
          <h3 className="era-display text-[34px] leading-none sm:text-[42px]">
            {title}
          </h3>

          <span className="mb-1 text-xl font-light text-white/70 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function SmallRoomCard({
  title,
  image,
  href,
}: {
  title: string;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative min-h-[320px] overflow-hidden bg-neutral-200 sm:min-h-[390px]"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-[900ms] group-hover:scale-[1.03]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white sm:p-7">
        <h3 className="era-display text-[29px]">
          {title}
        </h3>

        <span className="text-lg text-white/70 transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}

function FeatureCard({
  image,
  title,
  subtitle,
  href,
}: {
  image: string;
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative min-h-[480px] overflow-hidden bg-neutral-200 sm:min-h-[620px]"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition duration-[1000ms] group-hover:scale-[1.025]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/55">
          {subtitle}
        </p>

        <div className="mt-3 flex items-end justify-between">
          <h3 className="era-display text-[36px] sm:text-[45px]">
            {title}
          </h3>

          <span className="mb-1 text-xl text-white/70 transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}