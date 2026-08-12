"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getSession, destroySession } from "@/lib/auth";

/* =========================================================
   ÇIKIŞ YAP
========================================================= */

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

async function requireAdmin() {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return session;
}

function makeSlug(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .trim()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseImageUrls(formData: FormData) {
  const imageUrlsRaw = String(
    formData.get("imageUrls") || "[]"
  );

  let imageUrls: string[] = [];

  try {
    const parsed = JSON.parse(imageUrlsRaw);

    if (Array.isArray(parsed)) {
      imageUrls = parsed
        .filter(
          (url): url is string =>
            typeof url === "string" &&
            url.trim().length > 0
        )
        .slice(0, 8);
    }
  } catch {
    imageUrls = [];
  }

  return imageUrls;
}

/* =========================================================
   KATEGORİ OLUŞTUR
========================================================= */

export async function createCategoryAction(
  formData: FormData
) {
  await requireAdmin();

  const name = String(
    formData.get("name") || ""
  ).trim();

  const description = String(
    formData.get("description") || ""
  ).trim();

  if (!name) {
    throw new Error(
      "Kategori adı zorunludur."
    );
  }

  let slug = makeSlug(name);

  const existing =
    await prisma.category.findUnique({
      where: {
        slug,
      },
    });

  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  await prisma.category.create({
    data: {
      name,
      slug,
      description:
        description || null,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");

  redirect("/admin/categories");
}

/* =========================================================
   KATEGORİ SİL
========================================================= */

export async function deleteCategoryAction(
  formData: FormData
) {
  await requireAdmin();

  const id = String(
    formData.get("id") || ""
  );

  if (!id) {
    return;
  }

  const productCount =
    await prisma.product.count({
      where: {
        categoryId: id,
      },
    });

  if (productCount > 0) {
    throw new Error(
      "Bu kategoriye bağlı ürünler var. Önce ürünleri başka kategoriye taşı."
    );
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}

/* =========================================================
   ÜRÜN OLUŞTUR
========================================================= */

export async function createProductAction(
  formData: FormData
) {
  await requireAdmin();

  const name = String(
    formData.get("name") || ""
  ).trim();

  const sku = String(
    formData.get("sku") || ""
  ).trim();

  const categoryId = String(
    formData.get("categoryId") || ""
  ).trim();

  const description = String(
    formData.get("description") || ""
  ).trim();

  const shortDescription = String(
    formData.get("shortDescription") || ""
  ).trim();

  const material = String(
    formData.get("material") || ""
  ).trim();

  const color = String(
    formData.get("color") || ""
  ).trim();

  const price = Number(
    formData.get("price")
  );

  const stock = Number(
    formData.get("stock")
  );

  const compareAtPriceRaw = String(
    formData.get("compareAtPrice") || ""
  );

  const widthRaw = String(
    formData.get("width") || ""
  );

  const heightRaw = String(
    formData.get("height") || ""
  );

  const depthRaw = String(
    formData.get("depth") || ""
  );

  const weightRaw = String(
    formData.get("weight") || ""
  );

  const imageUrls =
    parseImageUrls(formData);

  const active =
    formData.get("active") !== null;

  const featured =
    formData.get("featured") !== null;

  if (
    !name ||
    !sku ||
    !categoryId ||
    !Number.isFinite(price) ||
    price < 0 ||
    !Number.isInteger(stock) ||
    stock < 0
  ) {
    throw new Error(
      "Ürün bilgileri geçersiz."
    );
  }

  const existingSku =
    await prisma.product.findUnique({
      where: {
        sku,
      },
    });

  if (existingSku) {
    throw new Error(
      "Bu SKU başka bir üründe kullanılıyor."
    );
  }

  let slug = makeSlug(name);

  const existingSlug =
    await prisma.product.findUnique({
      where: {
        slug,
      },
    });

  if (existingSlug) {
    slug = `${slug}-${Date.now()}`;
  }

  await prisma.product.create({
    data: {
      name,
      slug,
      sku,

      active,
      featured,

      description:
        description || null,

      shortDescription:
        shortDescription || null,

      price,

      compareAtPrice:
        compareAtPriceRaw !== ""
          ? Number(
              compareAtPriceRaw
            )
          : null,

      stock,

      material:
        material || null,

      color:
        color || null,

      width:
        widthRaw !== ""
          ? Number(widthRaw)
          : null,

      height:
        heightRaw !== ""
          ? Number(heightRaw)
          : null,

      depth:
        depthRaw !== ""
          ? Number(depthRaw)
          : null,

      weight:
        weightRaw !== ""
          ? Number(weightRaw)
          : null,

      categoryId,

      images:
        imageUrls.length > 0
          ? {
              create:
                imageUrls.map(
                  (
                    url,
                    index
                  ) => ({
                    url,
                    alt: name,
                    position:
                      index,
                  })
                ),
            }
          : undefined,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath(
    `/category/${categoryId}`
  );

  redirect("/admin/products");
}

/* =========================================================
   ÜRÜN SİL
========================================================= */

export async function deleteProductAction(
  formData: FormData
) {
  await requireAdmin();

  const id = String(
    formData.get("id") || ""
  );

  if (!id) {
    return;
  }

  await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
}

/* =========================================================
   ÜRÜN GÜNCELLE
========================================================= */

export async function updateProductAction(
  formData: FormData
) {
  await requireAdmin();

  const id = String(
    formData.get("id") || ""
  );

  const name = String(
    formData.get("name") || ""
  ).trim();

  const sku = String(
    formData.get("sku") || ""
  ).trim();

  const categoryId = String(
    formData.get("categoryId") || ""
  ).trim();

  const description = String(
    formData.get("description") || ""
  ).trim();

  const shortDescription = String(
    formData.get("shortDescription") || ""
  ).trim();

  const material = String(
    formData.get("material") || ""
  ).trim();

  const color = String(
    formData.get("color") || ""
  ).trim();

  const price = Number(
    formData.get("price")
  );

  const stock = Number(
    formData.get("stock")
  );

  const compareAtPriceRaw = String(
    formData.get("compareAtPrice") || ""
  );

  const widthRaw = String(
    formData.get("width") || ""
  );

  const heightRaw = String(
    formData.get("height") || ""
  );

  const depthRaw = String(
    formData.get("depth") || ""
  );

  const weightRaw = String(
    formData.get("weight") || ""
  );

  const imageUrls =
    parseImageUrls(formData);

  const active =
    formData.get("active") !== null;

  const featured =
    formData.get("featured") !== null;

  if (
    !id ||
    !name ||
    !sku ||
    !categoryId ||
    !Number.isFinite(price) ||
    price < 0 ||
    !Number.isInteger(stock) ||
    stock < 0
  ) {
    throw new Error(
      "Ürün bilgileri geçersiz."
    );
  }

  const currentProduct =
    await prisma.product.findUnique({
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

  if (!currentProduct) {
    throw new Error(
      "Ürün bulunamadı."
    );
  }

  const existingSku =
    await prisma.product.findFirst({
      where: {
        sku,

        NOT: {
          id,
        },
      },
    });

  if (existingSku) {
    throw new Error(
      "Bu SKU başka bir üründe kullanılıyor."
    );
  }

  let slug =
    currentProduct.slug;

  if (
    currentProduct.name !== name
  ) {
    slug = makeSlug(name);

    const slugOwner =
      await prisma.product.findFirst({
        where: {
          slug,

          NOT: {
            id,
          },
        },
      });

    if (slugOwner) {
      slug = `${slug}-${Date.now()}`;
    }
  }

  await prisma.$transaction(
    async (tx) => {
      await tx.product.update({
        where: {
          id,
        },

        data: {
          name,
          slug,
          sku,
          categoryId,

          active,
          featured,

          description:
            description || null,

          shortDescription:
            shortDescription ||
            null,

          price,

          compareAtPrice:
            compareAtPriceRaw !== ""
              ? Number(
                  compareAtPriceRaw
                )
              : null,

          stock,

          material:
            material || null,

          color:
            color || null,

          width:
            widthRaw !== ""
              ? Number(widthRaw)
              : null,

          height:
            heightRaw !== ""
              ? Number(heightRaw)
              : null,

          depth:
            depthRaw !== ""
              ? Number(depthRaw)
              : null,

          weight:
            weightRaw !== ""
              ? Number(weightRaw)
              : null,
        },
      });

      await tx.productImage.deleteMany({
        where: {
          productId: id,
        },
      });

      if (imageUrls.length > 0) {
        await tx.productImage.createMany({
          data:
            imageUrls.map(
              (
                url,
                index
              ) => ({
                productId: id,
                url,
                alt: name,
                position:
                  index,
              })
            ),
        });
      }
    }
  );

  revalidatePath("/admin/products");
  revalidatePath(
    `/admin/products/${id}/edit`
  );
  revalidatePath("/");
  revalidatePath(
    `/products/${slug}`
  );

  redirect("/admin/products");
}

/* =========================================================
   SİPARİŞ DURUMU GÜNCELLE
========================================================= */

export async function updateOrderStatusAction(
  formData: FormData
) {
  await requireAdmin();

  const id = String(
    formData.get("id") || ""
  );

  const status = String(
    formData.get("status") || ""
  );

  const allowedStatuses = [
    "PENDING",
    "PREPARING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ] as const;

  type AllowedStatus =
    (typeof allowedStatuses)[number];

  if (
    !id ||
    !allowedStatuses.includes(
      status as AllowedStatus
    )
  ) {
    throw new Error(
      "Geçersiz sipariş durumu."
    );
  }

  const validStatus =
    status as AllowedStatus;

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: validStatus,
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);

  redirect(`/admin/orders/${id}`);
}

/* =========================================================
   ÖDEME DURUMU GÜNCELLE
========================================================= */

export async function updatePaymentStatusAction(
  formData: FormData
) {
  await requireAdmin();

  const id = String(
    formData.get("id") || ""
  );

  const paymentStatus = String(
    formData.get("paymentStatus") || ""
  );

  const allowedPaymentStatuses = [
    "PENDING",
    "PAID",
    "FAILED",
    "REFUNDED",
  ] as const;

  type AllowedPaymentStatus =
    (typeof allowedPaymentStatuses)[number];

  if (
    !id ||
    !allowedPaymentStatuses.includes(
      paymentStatus as AllowedPaymentStatus
    )
  ) {
    throw new Error(
      "Geçersiz ödeme durumu."
    );
  }

  const currentOrder =
    await prisma.order.findUnique({
      where: {
        id,
      },
      select: {
        status: true,
      },
    });

  if (!currentOrder) {
    throw new Error(
      "Sipariş bulunamadı."
    );
  }

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      paymentStatus:
        paymentStatus as AllowedPaymentStatus,

      // Ödeme değiştiğinde sipariş durumu aynen korunur.
      status: currentOrder.status,
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);

  redirect(`/admin/orders/${id}`);
}