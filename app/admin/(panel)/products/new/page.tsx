import MultiImageUpload from "@/components/admin/MultiImageUpload";
import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { createProductAction } from "@/app/admin/actions";

export default async function NewProductPage() {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const categories = await prisma.category.findMany({
    where: {
      active: true,
    },

    orderBy: {
      name: "asc",
    },
  });

  if (categories.length === 0) {
    redirect("/admin/categories");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Yeni Ürün</h1>
          <p className="mt-1 text-neutral-500">Mağazaya yeni ürün ekle.</p>
        </div>

        <Link
          href="/admin/products"
          className="cursor-pointer rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium hover:bg-neutral-50"
        >
          Geri dön
        </Link>
      </div>

      <form action={createProductAction} className="space-y-6">
        <FormSection title="Temel Bilgiler">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Ürün adı" name="name" placeholder="Atlas Çalışma Masası" required />
            <Field label="SKU" name="sku" placeholder="MASA-001" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Kategori</label>

            <select name="categoryId" required className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <Field label="Kısa açıklama" name="shortDescription" placeholder="Modern ve fonksiyonel çalışma masası" />

          <div>
            <label className="mb-2 block text-sm font-medium">Ürün açıklaması</label>
            <textarea
              name="description"
              rows={6}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3"
              placeholder="Ürün detaylarını yaz..."
            />
          </div>
        </FormSection>

        <FormSection title="Fiyat">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Satış fiyatı" name="price" type="number" step="0.01" min="0" required />
            <Field label="Eski fiyat / karşılaştırma fiyatı" name="compareAtPrice" type="number" step="0.01" min="0" />
          </div>
        </FormSection>

        <FormSection title="Stok ve Durum">
          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Stok miktarı" name="stock" type="number" min="0" required />

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3">
              <input type="checkbox" name="active" defaultChecked className="h-4 w-4 cursor-pointer" />
              <span className="text-sm font-medium">Aktif (mağazada görünür)</span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3">
              <input type="checkbox" name="featured" className="h-4 w-4 cursor-pointer" />
              <span className="text-sm font-medium">Öne çıkan ürün</span>
            </label>
          </div>
        </FormSection>

        <FormSection title="Özellikler">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Malzeme" name="material" placeholder="18 mm suntalam" />
            <Field label="Renk" name="color" placeholder="Ceviz" />
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <Field label="Genişlik (cm)" name="width" type="number" step="0.01" />
            <Field label="Yükseklik (cm)" name="height" type="number" step="0.01" />
            <Field label="Derinlik (cm)" name="depth" type="number" step="0.01" />
            <Field label="Ağırlık (kg)" name="weight" type="number" step="0.01" />
          </div>
        </FormSection>

        <FormSection title="Görseller">
          <MultiImageUpload name="imageUrls" />
        </FormSection>

        <div className="flex justify-end">
          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-neutral-900 px-8 py-3 font-medium text-white transition hover:bg-neutral-800"
          >
            Ürünü Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 className="text-base font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <input {...props} className="w-full rounded-xl border border-neutral-200 px-4 py-3" />
    </div>
  );
}
