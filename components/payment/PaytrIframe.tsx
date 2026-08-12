"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type PaytrIframeProps = {
  orderNumber: string;
};

declare global {
  interface Window {
    iFrameResize?: (
      options: Record<string, unknown>,
      selector: string
    ) => void;
  }
}

export default function PaytrIframe({
  orderNumber,
}: PaytrIframeProps) {
  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const initialized =
    useRef(false);

  useEffect(() => {
    async function loadToken() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/paytr/token",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              orderNumber,
            }),
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Ödeme ekranı yüklenemedi."
          );
        }

        setToken(data.token);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Ödeme ekranı yüklenemedi."
        );
      } finally {
        setLoading(false);
      }
    }

    loadToken();
  }, [orderNumber]);

  useEffect(() => {
    if (
      !token ||
      !window.iFrameResize ||
      initialized.current
    ) {
      return;
    }

    window.iFrameResize(
      {},
      "#paytriframe"
    );

    initialized.current = true;
  }, [token]);

  function handleScriptLoad() {
    if (
      !token ||
      !window.iFrameResize ||
      initialized.current
    ) {
      return;
    }

    window.iFrameResize(
      {},
      "#paytriframe"
    );

    initialized.current = true;
  }

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center border border-black/10 bg-[#f8f7f4]">
        <p className="text-sm text-neutral-500">
          Güvenli ödeme ekranı
          hazırlanıyor...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-700">
          Ödeme ekranı açılamadı.
        </p>

        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <>
      <Script
        src="https://www.paytr.com/js/iframeResizer.min.js?v2"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />

      <iframe
        id="paytriframe"
        src={`https://www.paytr.com/odeme/guvenli/${token}`}
        frameBorder="0"
        scrolling="no"
        className="min-h-[600px] w-full"
        title="PayTR Güvenli Ödeme"
      />
    </>
  );
}