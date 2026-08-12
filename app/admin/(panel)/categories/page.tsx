import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { createCategoryAction, deleteCategoryAction } from "@/app/admin/actions";

export default async function CategoriesPage() {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Kategoriler</h1>
        <p className="mt-1 text-neutral-500">Mağaza kategorilerini yönet.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <section className="h-fit rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="mb-5 text-base font-semibold">Yeni kategori</h2>

          <form action={createCategoryAction} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">Kategori adı</label>
              <input
                name="name"
                required
                placeholder="Çalışma Masaları"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Açıklama</label>
              <textarea
                name="description"
                rows={4}
                placeholder="Kategori açıklaması..."
                className="w-full rounded-xl border border-neutral-200 px-4 py-3"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-800"
            >
              Kategori oluştur
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="mb-5 text-base font-semibold">Mevcut kategoriler</h2>

          {categories.length === 0 ? (
            <p className="text-neutral-500">Henüz kategori bulunmuyor.</p>
          ) : (
            <div className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{category.name}</p>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${
                          category.active
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                            : "bg-neutral-100 text-neutral-600 ring-neutral-500/20"
                        }`}
                      >
                        {category.active ? "Aktif" : "Pasif"}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-neutral-500">/{category.slug}</p>

                    {category.description && (
                      <p className="mt-1 text-sm text-neutral-500">{category.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-sm text-neutral-500">{category._count.products} ürün</div>

                    <form action={deleteCategoryAction}>
                      <input type="hidden" name="id" value={category.id} />
                      <button type="submit" className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700">
                        Sil
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
