import Link from "next/link";
import { redirect } from "next/navigation";

import DeleteProductButton from "@/components/admin/DeleteProductButton";
import { deleteProductAction } from "@/app/admin/actions";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      category: true,

      images: {
        orderBy: {
          position: "asc",
        },

        take: 1,
      },
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Ürünler
          </h1>

          <p className="mt-1 text-neutral-500">
            Mağazadaki ürünleri yönet.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          + Yeni Ürün Ekle
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <p className="text-lg font-medium">
              Henüz ürün eklenmedi
            </p>

            <p className="text-sm text-neutral-500">
              İlk ürününü ekleyerek mağazanı doldurmaya başla.
            </p>

            <Link
              href="/admin/products/new"
              className="mt-2 cursor-pointer rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Yeni Ürün Ekle
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                  <th className="px-4 py-3 font-medium">
                    Ürün
                  </th>

                  <th className="px-4 py-3 font-medium">
                    SKU
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Kategori
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Fiyat
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Stok
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Durum
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    İşlemler
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {products.map((product) => {
                  const image = product.images[0];

                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-neutral-50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
                            {image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={image.url}
                                alt={
                                  image.alt ??
                                  product.name
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-center text-[9px] leading-tight text-neutral-400">
                                Görsel yok
                              </span>
                            )}
                          </div>

                          <div>
                            <p className="font-medium text-neutral-900">
                              {product.name}
                            </p>

                            {product.featured && (
                              <span className="mt-0.5 inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                                Öne çıkan
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-neutral-600">
                        {product.sku}
                      </td>

                      <td className="px-4 py-3 text-neutral-600">
                        {product.category.name}
                      </td>

                      <td className="px-4 py-3 font-medium">
                        {Number(
                          product.price
                        ).toLocaleString("tr-TR", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        TL
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={
                            product.stock === 0
                              ? "font-medium text-red-600"
                              : "text-neutral-600"
                          }
                        >
                          {product.stock}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                            product.active
                              ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                              : "bg-neutral-100 text-neutral-600 ring-neutral-500/20"
                          }`}
                        >
                          {product.active
                            ? "Aktif"
                            : "Pasif"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-4">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="cursor-pointer text-sm font-medium text-neutral-700 hover:text-neutral-900"
                          >
                            Düzenle
                          </Link>

                          <form
                            action={deleteProductAction}
                          >
                            <input
                              type="hidden"
                              name="id"
                              value={product.id}
                            />

                            <DeleteProductButton
                              productName={
                                product.name
                              }
                            />
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}