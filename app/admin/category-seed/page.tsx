import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const categories = [
  {
    name: "Oturma Odası",
    slug: "oturma-odasi",
    description:
      "Koltuk takımları ve yaşam alanı mobilyaları.",
  },
  {
    name: "Yemek Odası",
    slug: "yemek-odasi",
    description:
      "Yemek masaları, sandalyeler ve tamamlayıcı mobilyalar.",
  },
  {
    name: "Yatak Odası",
    slug: "yatak-odasi",
    description:
      "Yatak odası takımları ve tamamlayıcı ürünler.",
  },
  {
    name: "TV Üniteleri",
    slug: "tv-uniteleri",
    description:
      "TV üniteleri ve salon depolama çözümleri.",
  },
  {
    name: "Çalışma Alanı",
    slug: "calisma-alani",
    description:
      "Çalışma masaları ve işlevsel çalışma mobilyaları.",
  },
  {
    name: "Kitaplık",
    slug: "kitaplik",
    description:
      "Kitaplık ve raf sistemleri.",
  },
];

async function createCategories() {
  "use server";

  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

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

  redirect("/admin/categories");
}

export default async function CategorySeedPage() {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <main className="p-10">
      <div className="mx-auto max-w-xl border bg-white p-8">
        <h1 className="text-2xl font-semibold">
          Ana Kategorileri Oluştur
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Oturma Odası, Yemek Odası, Yatak Odası,
          TV Üniteleri, Çalışma Alanı ve Kitaplık
          kategorilerini oluşturur.
        </p>

        <form action={createCategories}>
          <button
            type="submit"
            className="mt-6 cursor-pointer bg-black px-6 py-3 font-medium text-white"
          >
            Kategorileri Oluştur
          </button>
        </form>
      </div>
    </main>
  );
}