import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const demoProducts = [
  {
    name: "Modern Yatak Odası",
    slug: "modern-yatak-odasi",
    sku: "DEMO-YATAK-001",
    price: 34990,
    stock: 10,
    categorySlug: "yatak-odasi",
    image: "/demo/yatakodasi.jpg",
    description:
      "Modern çizgileri ve dengeli tasarımıyla yatak odasına sade ve şık bir görünüm kazandırır.",
  },
  {
    name: "Aura Yatak Odası",
    slug: "aura-yatak-odasi",
    sku: "DEMO-YATAK-002",
    price: 42990,
    stock: 8,
    categorySlug: "yatak-odasi",
    image: "/demo/yatakodasi2.jpg",
    description:
      "Sade detayları ve modern görünümüyle ferah yaşam alanları için tasarlanan yatak odası koleksiyonu.",
  },
  {
    name: "Luna Oturma Grubu",
    slug: "luna-oturma-grubu",
    sku: "DEMO-OTURMA-001",
    price: 29990,
    stock: 12,
    categorySlug: "oturma-odasi",
    image: "/demo/oturmaodasi.jpg",
    description:
      "Konfor ve modern tasarımı bir araya getiren, farklı yaşam alanlarına uyum sağlayan oturma grubu.",
  },
  {
    name: "Nova Oturma Grubu",
    slug: "nova-oturma-grubu",
    sku: "DEMO-OTURMA-002",
    price: 31990,
    stock: 7,
    categorySlug: "oturma-odasi",
    image: "/demo/oturmaodasi2.jpg",
    description:
      "Modern yaşam alanları için dengeli form, konforlu kullanım ve sade tasarım.",
  },
  {
    name: "Line Kitaplık",
    slug: "line-kitaplik",
    sku: "DEMO-KITAPLIK-001",
    price: 8990,
    stock: 15,
    categorySlug: "kitaplik",
    image: "/demo/kitaplik.jpeg",
    description:
      "Geniş raf yapısıyla kitap, dekorasyon ve günlük kullanım için fonksiyonel depolama alanı sunar.",
  },
  {
    name: "Mira Kitaplık",
    slug: "mira-kitaplik",
    sku: "DEMO-KITAPLIK-002",
    price: 11990,
    stock: 11,
    categorySlug: "kitaplik",
    image: "/demo/kitaplik2.jpeg",
    description:
      "Sade ve modern çizgileriyle yaşam ve çalışma alanlarında kullanıma uygun kitaplık.",
  },
];

async function createDemoData() {
  "use server";

  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const categories = [
    {
      name: "Yatak Odası",
      slug: "yatak-odasi",
      description: "Yatak odası mobilyaları ve takımları.",
    },
    {
      name: "Oturma Odası",
      slug: "oturma-odasi",
      description: "Oturma grupları ve yaşam alanı mobilyaları.",
    },
    {
      name: "Kitaplık",
      slug: "kitaplik",
      description: "Kitaplık ve raf sistemleri.",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {
        name: category.name,
        description: category.description,
        active: true,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        active: true,
      },
    });
  }

  for (const demo of demoProducts) {
    const category = await prisma.category.findUnique({
      where: {
        slug: demo.categorySlug,
      },
    });

    if (!category) {
      continue;
    }

    const product = await prisma.product.upsert({
      where: {
        sku: demo.sku,
      },
      update: {
        name: demo.name,
        slug: demo.slug,
        description: demo.description,
        shortDescription: demo.description,
        price: demo.price,
        stock: demo.stock,
        active: true,
        featured: true,
        categoryId: category.id,
      },
      create: {
        name: demo.name,
        slug: demo.slug,
        sku: demo.sku,
        description: demo.description,
        shortDescription: demo.description,
        price: demo.price,
        stock: demo.stock,
        active: true,
        featured: true,
        categoryId: category.id,
      },
    });

    await prisma.productImage.deleteMany({
      where: {
        productId: product.id,
      },
    });

    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: demo.image,
        alt: demo.name,
        position: 0,
      },
    });
  }

  redirect("/admin/products");
}

export default async function DemoSeedPage() {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <main className="p-10">
      <div className="mx-auto max-w-xl rounded-2xl border bg-white p-8">
        <h1 className="text-2xl font-semibold">
          Demo Verilerini Oluştur
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Yatak Odası, Oturma Odası ve Kitaplık kategorilerini
          oluşturur ve 6 adet Era Concept demo ürünü ekler.
        </p>

        <form action={createDemoData}>
          <button
            type="submit"
            className="mt-6 cursor-pointer rounded-xl bg-black px-6 py-3 font-medium text-white"
          >
            Demo Ürünlerini Oluştur
          </button>
        </form>
      </div>
    </main>
  );
}