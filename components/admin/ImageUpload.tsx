"use client";

import { useState } from "react";

type ImageUploadProps = {
  name: string;
  defaultValue?: string;
};

export default function ImageUpload({
  name,
  defaultValue = "",
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] =
    useState(defaultValue);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setError("");

    try {
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

      setImageUrl(data.url);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Görsel yüklenemedi."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        Ürün Görseli
      </label>

      <input
        type="hidden"
        name={name}
        value={imageUrl}
      />

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={uploading}
        className="w-full rounded-xl border bg-white px-4 py-3"
      />

      {uploading && (
        <p className="mt-2 text-sm text-neutral-500">
          Görsel yükleniyor...
        </p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {imageUrl && (
        <div className="mt-4">
          <img
            src={imageUrl}
            alt="Ürün önizleme"
            className="h-48 w-48 rounded-xl border object-cover"
          />

          <button
            type="button"
            onClick={() =>
              setImageUrl("")
            }
            className="mt-3 block text-sm text-red-600"
          >
            Görseli Kaldır
          </button>
        </div>
      )}
    </div>
  );
}