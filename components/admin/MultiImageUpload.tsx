"use client";

import { useState } from "react";

type MultiImageUploadProps = {
  name: string;
  defaultValues?: string[];
};

export default function MultiImageUpload({
  name,
  defaultValues = [],
}: MultiImageUploadProps) {
  const [imageUrls, setImageUrls] =
    useState<string[]>(defaultValues);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleFiles(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      event.target.files ?? []
    );

    if (files.length === 0) {
      return;
    }

    if (imageUrls.length + files.length > 8) {
      setError(
        "Bir ürüne en fazla 8 görsel ekleyebilirsiniz."
      );
      return;
    }

    setUploading(true);
    setError("");

    try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const formData = new FormData();

        formData.append("file", file);

        const response = await fetch(
          "/api/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Görsel yüklenemedi."
          );
        }

        uploadedUrls.push(data.url);
      }

      setImageUrls((current) => [
        ...current,
        ...uploadedUrls,
      ]);

      event.target.value = "";
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Görseller yüklenemedi."
      );
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index: number) {
    setImageUrls((current) =>
      current.filter(
        (_, currentIndex) =>
          currentIndex !== index
      )
    );
  }

  function moveLeft(index: number) {
    if (index === 0) {
      return;
    }

    setImageUrls((current) => {
      const updated = [...current];

      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ];

      return updated;
    });
  }

  function moveRight(index: number) {
    if (index === imageUrls.length - 1) {
      return;
    }

    setImageUrls((current) => {
      const updated = [...current];

      [updated[index + 1], updated[index]] = [
        updated[index],
        updated[index + 1],
      ];

      return updated;
    });
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        Ürün Görselleri
      </label>

      <input
        type="hidden"
        name={name}
        value={JSON.stringify(imageUrls)}
      />

      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFiles}
        disabled={uploading}
        className="w-full rounded-xl border bg-white px-4 py-3"
      />

      <p className="mt-2 text-xs text-neutral-500">
        En fazla 8 görsel. İlk görsel ürünün ana
        görseli olarak kullanılır.
      </p>

      {uploading && (
        <p className="mt-3 text-sm text-neutral-500">
          Görseller yükleniyor...
        </p>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {imageUrls.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {imageUrls.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="rounded-xl border bg-white p-2"
            >
              <div className="relative">
                <img
                  src={url}
                  alt={`Ürün görseli ${index + 1}`}
                  className="aspect-square w-full rounded-lg object-cover"
                />

                {index === 0 && (
                  <span className="absolute left-2 top-2 rounded-full bg-black px-2 py-1 text-xs text-white">
                    Ana
                  </span>
                )}
              </div>

              <div className="mt-2 flex items-center justify-between gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() =>
                    moveLeft(index)
                  }
                  className="rounded border px-2 py-1 text-xs disabled:opacity-30"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() =>
                    removeImage(index)
                  }
                  className="text-xs text-red-600"
                >
                  Sil
                </button>

                <button
                  type="button"
                  disabled={
                    index ===
                    imageUrls.length - 1
                  }
                  onClick={() =>
                    moveRight(index)
                  }
                  className="rounded border px-2 py-1 text-xs disabled:opacity-30"
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}