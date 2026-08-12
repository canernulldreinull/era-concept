import { NextResponse } from "next/server";

import { cloudinary } from "@/lib/cloudinary";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Yetkisiz işlem." },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Dosya bulunamadı." },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Sadece JPG, PNG veya WEBP yükleyebilirsiniz.",
        },
        { status: 400 }
      );
    }

    // 8 MB
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        {
          error:
            "Görsel en fazla 8 MB olabilir.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder: "cetiner-store/products",
            resource_type: "image",
          },
          (error, result) => {
            if (error || !result) {
              reject(
                error ||
                  new Error(
                    "Cloudinary yükleme hatası."
                  )
              );

              return;
            }

            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          }
        );

      stream.end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        error: "Görsel yüklenemedi.",
      },
      {
        status: 500,
      }
    );
  }
}