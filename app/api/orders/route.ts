import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingCity,
      shippingDistrict,
      shippingAddress,
      shippingPostalCode,
      items,
    } = body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !shippingCity ||
      !shippingDistrict ||
      !shippingAddress ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          error: "Eksik sipariş bilgisi var.",
        },
        {
          status: 400,
        }
      );
    }

    const normalizedItems = items.map((item) => ({
      productId: String(item.productId || ""),
      quantity: Number(item.quantity),
    }));

    if (
      normalizedItems.some(
        (item) =>
          !item.productId ||
          !Number.isInteger(item.quantity) ||
          item.quantity <= 0
      )
    ) {
      return NextResponse.json(
        {
          error: "Sepette geçersiz ürün veya adet var.",
        },
        {
          status: 400,
        }
      );
    }

    const productIds = [
      ...new Set(
        normalizedItems.map(
          (item) => item.productId
        )
      ),
    ];

    const products =
      await prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
          active: true,
        },
      });

    if (
      products.length !== productIds.length
    ) {
      return NextResponse.json(
        {
          error:
            "Sepette artık satışta olmayan bir ürün bulunuyor.",
        },
        {
          status: 400,
        }
      );
    }

    let subtotal = 0;

    const orderItems: {
      productId: string;
      productName: string;
      productSku: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }[] = [];

    for (const item of normalizedItems) {
      const product = products.find(
        (product) =>
          product.id === item.productId
      );

      if (!product) {
        return NextResponse.json(
          {
            error: "Ürün bulunamadı.",
          },
          {
            status: 400,
          }
        );
      }

      if (item.quantity > product.stock) {
        return NextResponse.json(
          {
            error: `${product.name} için yeterli stok bulunmuyor. Mevcut stok: ${product.stock}`,
          },
          {
            status: 400,
          }
        );
      }

      const unitPrice =
        Number(product.price);

      const totalPrice =
        unitPrice * item.quantity;

      subtotal += totalPrice;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        quantity: item.quantity,
        unitPrice,
        totalPrice,
      });
    }

    const shippingCost = 0;

    const total =
      subtotal + shippingCost;

    const orderNumber =
      `ERA-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )
        .toString()
        .padStart(3, "0")}`;

    const order =
      await prisma.$transaction(
        async (tx) => {
          /*
           * Stokları transaction içinde
           * tekrar kontrol ediyoruz.
           */
          for (const item of normalizedItems) {
            const product =
              await tx.product.findUnique({
                where: {
                  id: item.productId,
                },
              });

            if (
              !product ||
              !product.active
            ) {
              throw new Error(
                "PRODUCT_UNAVAILABLE"
              );
            }

            if (
              product.stock <
              item.quantity
            ) {
              throw new Error(
                `OUT_OF_STOCK:${product.name}:${product.stock}`
              );
            }
          }

          /*
           * Siparişi oluştur.
           */
          const createdOrder =
            await tx.order.create({
              data: {
                orderNumber,

                status: "PENDING",
                paymentStatus:
                  "PENDING",

                subtotal,
                shippingCost,
                total,

                customerName:
                  String(
                    customerName
                  ).trim(),

                customerEmail:
                  String(
                    customerEmail
                  ).trim(),

                customerPhone:
                  String(
                    customerPhone
                  ).trim(),

                shippingCity:
                  String(
                    shippingCity
                  ).trim(),

                shippingDistrict:
                  String(
                    shippingDistrict
                  ).trim(),

                shippingAddress:
                  String(
                    shippingAddress
                  ).trim(),

                shippingPostalCode:
                  shippingPostalCode
                    ? String(
                        shippingPostalCode
                      ).trim()
                    : null,

                items: {
                  create: orderItems,
                },
              },
            });

          /*
           * Stokları azalt.
           */
          for (const item of normalizedItems) {
            await tx.product.update({
              where: {
                id: item.productId,
              },

              data: {
                stock: {
                  decrement:
                    item.quantity,
                },
              },
            });
          }

          return createdOrder;
        }
      );

    return NextResponse.json({
      success: true,
      orderNumber:
        order.orderNumber,
    });
  } catch (error) {
    console.error(
      "Sipariş oluşturma hatası:",
      error
    );

    if (
      error instanceof Error &&
      error.message ===
        "PRODUCT_UNAVAILABLE"
    ) {
      return NextResponse.json(
        {
          error:
            "Sepette artık satışta olmayan bir ürün bulunuyor.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      error instanceof Error &&
      error.message.startsWith(
        "OUT_OF_STOCK:"
      )
    ) {
      const [, productName, stock] =
        error.message.split(":");

      return NextResponse.json(
        {
          error: `${productName} için yeterli stok bulunmuyor. Mevcut stok: ${stock}`,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        error:
          "Sipariş oluşturulamadı. Lütfen tekrar deneyin.",
      },
      {
        status: 500,
      }
    );
  }
}