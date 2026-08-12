import crypto from "crypto";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const orderNumber = String(
      body.orderNumber || ""
    ).trim();

    if (!orderNumber) {
      return NextResponse.json(
        {
          error: "Sipariş numarası bulunamadı.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Siparişi doğrudan veritabanından alıyoruz.
     * Tutarı frontend'den kesinlikle kabul etmiyoruz.
     */
    const order =
      await prisma.order.findUnique({
        where: {
          orderNumber,
        },

        include: {
          items: true,
        },
      });

    if (!order) {
      return NextResponse.json(
        {
          error: "Sipariş bulunamadı.",
        },
        {
          status: 404,
        }
      );
    }

    if (order.paymentStatus === "PAID") {
      return NextResponse.json(
        {
          error:
            "Bu siparişin ödemesi zaten tamamlanmış.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * .env değerleri
     */
    const merchantId =
      process.env.PAYTR_MERCHANT_ID;

    const merchantKey =
      process.env.PAYTR_MERCHANT_KEY;

    const merchantSalt =
      process.env.PAYTR_MERCHANT_SALT;

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL;

    if (
      !merchantId ||
      !merchantKey ||
      !merchantSalt ||
      !siteUrl
    ) {
      console.error(
        "PayTR environment variables missing."
      );

      return NextResponse.json(
        {
          error:
            "PayTR ayarları tamamlanmamış.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * Müşteri IP adresi
     */
    const forwardedFor =
      request.headers.get(
        "x-forwarded-for"
      );

    const realIp =
      request.headers.get(
        "x-real-ip"
      );

    let userIp =
      forwardedFor
        ?.split(",")[0]
        ?.trim() ||
      realIp ||
      "";

    /*
     * Lokal geliştirme sırasında
     * 127.0.0.1 PayTR tarafından
     * geçerli müşteri IP'si olarak
     * kabul edilmez.
     *
     * Gerçek test aşamasında siteyi
     * Vercel/domain üzerinden açacağız.
     */
    if (
      !userIp ||
      userIp === "::1" ||
      userIp === "127.0.0.1"
    ) {
      return NextResponse.json(
        {
          error:
            "PayTR testi için gerçek dış IP gerekiyor. Canlı/test deployment üzerinden deneyin.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * PayTR tutarı kuruş olarak ister.
     *
     * Örnek:
     * 1299.90 TL → 129990
     */
    const paymentAmount = Math.round(
      Number(order.total) * 100
    ).toString();

    /*
     * PayTR sepet formatı:
     *
     * [
     *   ["Ürün", "100.00", 1],
     *   ["Ürün 2", "250.00", 2]
     * ]
     */
    const basket = order.items.map(
      (item) => [
        item.productName,

        Number(
          item.unitPrice
        ).toFixed(2),

        item.quantity,
      ]
    );

    const userBasket = Buffer.from(
      JSON.stringify(basket)
    ).toString("base64");

    /*
     * PayTR ayarları
     */
    const noInstallment = "0";

    const maxInstallment = "0";

    const currency = "TL";

    /*
     * PayTR mağazan canlı olsa bile
     * şimdilik test modunda çalıştırıyoruz.
     */
    const testMode = "1";

    /*
     * Token oluşturulurken kullanılacak
     * değerlerin sırası PayTR tarafından
     * belirlenmiştir.
     */
    const hashString =
      merchantId +
      userIp +
      order.orderNumber +
      order.customerEmail +
      paymentAmount +
      userBasket +
      noInstallment +
      maxInstallment +
      currency +
      testMode;

    const paytrToken = crypto
      .createHmac(
        "sha256",
        merchantKey
      )
      .update(
        hashString + merchantSalt
      )
      .digest("base64");

    /*
     * Ödeme tamamlandıktan sonra
     * müşterinin yönlendirileceği sayfalar.
     *
     * Bunlar callback değildir.
     * Gerçek ödeme onayı daha sonra
     * ayrıca callback endpointinden gelecek.
     */
    const merchantOkUrl =
      `${siteUrl}/payment/${order.orderNumber}/success`;

    const merchantFailUrl =
      `${siteUrl}/payment/${order.orderNumber}/failed`;

    /*
     * PayTR'a gönderilecek POST body
     */
    const formData =
      new URLSearchParams();

    formData.append(
      "merchant_id",
      merchantId
    );

    formData.append(
      "user_ip",
      userIp
    );

    formData.append(
      "merchant_oid",
      order.orderNumber
    );

    formData.append(
      "email",
      order.customerEmail
    );

    formData.append(
      "payment_amount",
      paymentAmount
    );

    formData.append(
      "paytr_token",
      paytrToken
    );

    formData.append(
      "user_basket",
      userBasket
    );

    formData.append(
      "debug_on",
      "1"
    );

    formData.append(
      "no_installment",
      noInstallment
    );

    formData.append(
      "max_installment",
      maxInstallment
    );

    formData.append(
      "user_name",
      order.customerName
    );

    formData.append(
      "user_address",
      [
        order.shippingAddress,
        order.shippingDistrict,
        order.shippingCity,
      ]
        .filter(Boolean)
        .join(", ")
    );

    formData.append(
      "user_phone",
      order.customerPhone
    );

    formData.append(
      "merchant_ok_url",
      merchantOkUrl
    );

    formData.append(
      "merchant_fail_url",
      merchantFailUrl
    );

    formData.append(
      "timeout_limit",
      "30"
    );

    formData.append(
      "currency",
      currency
    );

    formData.append(
      "test_mode",
      testMode
    );

    formData.append(
      "lang",
      "tr"
    );

    formData.append(
    "iframe_v2",
    "1"
    );

    formData.append(
    "iframe_v2_dark",
    "0"
    );

    /*
     * Token isteğini PayTR'a gönder
     */
    const paytrResponse =
      await fetch(
        "https://www.paytr.com/odeme/api/get-token",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body: formData.toString(),

          cache: "no-store",
        }
      );

    const result =
      await paytrResponse.json();

    if (
      result.status !== "success"
    ) {
      console.error(
        "PAYTR TOKEN ERROR:",
        result
      );

      return NextResponse.json(
        {
          error:
            result.reason ||
            "PayTR ödeme başlatılamadı.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Frontend'e yalnızca iframe token
     * gönderiyoruz.
     *
     * merchant_key ve merchant_salt
     * hiçbir zaman gönderilmiyor.
     */
    return NextResponse.json({
      success: true,
      token: result.token,
    });
  } catch (error) {
    console.error(
      "PAYTR TOKEN ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Ödeme başlatılırken bir hata oluştu.",
      },
      {
        status: 500,
      }
    );
  }
}