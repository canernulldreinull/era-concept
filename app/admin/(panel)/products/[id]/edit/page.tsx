import MultiImageUpload from "@/components/admin/MultiImageUpload";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { updateProductAction } from "@/app/admin/actions";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    where: {
      active: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Ürün Düzenle</h1>
          <p className="mt-1 text-neutral-500">{product.name}</p>
        </div>

        <Link
          href="/admin/products"
          className="cursor-pointer rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium hover:bg-neutral-50"
        >
          Geri dön
        </Link>
      </div>

      <form action={updateProductAction} className="space-y-6">
        <input type="hidden" name="id" value={product.id} />

        <FormSection title="Temel Bilgiler">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Ürün adı" name="name" defaultValue={product.name} required />
            <Field label="SKU" name="sku" defaultValue={product.sku} required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Kategori</label>

            <select
              name="categoryId"
              defaultValue={product.categoryId}
              required
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <Field label="Kısa açıklama" name="shortDescription" defaultValue={product.shortDescription ?? ""} />

          <div>
            <label className="mb-2 block text-sm font-medium">Ürün açıklaması</label>
            <textarea
              name="description"
              rows={6}
              defaultValue={product.description ?? ""}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3"
            />
          </div>
        </FormSection>

        <FormSection title="Fiyat">
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Satış fiyatı"
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={Number(product.price)}
              required
            />

            <Field
              label="Eski fiyat / karşılaştırma fiyatı"
              name="compareAtPrice"
              type="number"
              step="0.01"
              min="0"
              defaultValue={product.compareAtPrice ? Number(product.compareAtPrice) : ""}
            />
          </div>
        </FormSection>

        <FormSection title="Stok ve Durum">
          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Stok miktarı" name="stock" type="number" min="0" defaultValue={product.stock} required />

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3">
              <input type="checkbox" name="active" defaultChecked={product.active} className="h-4 w-4 cursor-pointer" />
              <span className="text-sm font-medium">Aktif (mağazada görünür)</span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3">
              <input type="checkbox" name="featured" defaultChecked={product.featured} className="h-4 w-4 cursor-pointer" />
              <span className="text-sm font-medium">Öne çıkan ürün</span>
            </label>
          </div>
        </FormSection>

        <FormSection title="Özellikler">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Malzeme" name="material" defaultValue={product.material ?? ""} />
            <Field label="Renk" name="color" defaultValue={product.color ?? ""} />
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <Field label="Genişlik (cm)" name="width" type="number" step="0.01" defaultValue={product.width ? Number(product.width) : ""} />
            <Field label="Yükseklik (cm)" name="height" type="number" step="0.01" defaultValue={product.height ? Number(product.height) : ""} />
            <Field label="Derinlik (cm)" name="depth" type="number" step="0.01" defaultValue={product.depth ? Number(product.depth) : ""} />
            <Field label="Ağırlık (kg)" name="weight" type="number" step="0.01" defaultValue={product.weight ? Number(product.weight) : ""} />
          </div>
        </FormSection>

        <FormSection title="Görseller">
          <MultiImageUpload name="imageUrls" defaultValues={product.images.map((image) => image.url)} />
        </FormSection>

        <div className="flex justify-end">
          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-neutral-900 px-8 py-3 font-medium text-white transition hover:bg-neutral-800"
          >
            Değişiklikleri Kaydet
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
