"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "era-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(STORAGE_KEY);

    if (!savedConsent) {
      setVisible(true);
    }
  }, []);

  function saveConsent(consent: CookieConsent) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(consent)
    );

    setVisible(false);
    setSettingsOpen(false);
  }

  function acceptAll() {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  }

  function rejectOptional() {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  }

  function savePreferences() {
    saveConsent({
      necessary: true,
      analytics,
      marketing,
    });
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] border-t border-black/10 bg-[#f8f7f4]/95 shadow-[0_-12px_40px_rgba(0,0,0,0.10)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-5">
        {!settingsOpen ? (
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* SOL */}
            <div className="flex max-w-3xl items-start gap-4">
              <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white sm:flex">
                <CookieIcon />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h2 className="text-base font-semibold tracking-tight text-[#181817]">
                    Gizliliğiniz bizim için önemli.
                  </h2>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    Era Concept
                  </span>
                </div>

                <p className="mt-1.5 max-w-2xl text-xs leading-5 text-neutral-500 sm:text-[13px]">
                  Sitemizin çalışması için zorunlu çerezleri kullanıyoruz.
                  İzninizle analitik ve performans çerezlerini de
                  kullanabiliriz.{" "}
                  <Link
                    href="/cerez-politikasi"
                    className="font-medium text-[#181817] underline decoration-black/30 underline-offset-4 hover:decoration-black"
                  >
                    Çerez Politikası
                  </Link>
                </p>
              </div>
            </div>

            {/* SAĞ */}
            <div className="flex shrink-0 flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="min-h-11 cursor-pointer px-4 text-xs font-medium text-neutral-500 transition hover:text-black"
              >
                Tercihleri Yönet
              </button>

              <button
                type="button"
                onClick={rejectOptional}
                className="min-h-11 cursor-pointer border border-black/15 bg-white px-5 text-sm font-medium text-[#181817] transition hover:bg-neutral-50"
              >
                Reddet
              </button>

              <button
                type="button"
                onClick={acceptAll}
                className="min-h-11 cursor-pointer bg-[#1f1e1a] px-6 text-sm font-medium text-white transition hover:bg-black"
              >
                Tümünü Kabul Et
              </button>
            </div>
          </div>
        ) : (
          /* TERCİHLER AÇILDIĞINDA */
          <div>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  Çerez Tercihleri
                </p>

                <h2 className="mt-1 text-lg font-semibold tracking-tight">
                  Hangi çerezlere izin vermek istersiniz?
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="self-start cursor-pointer text-xs font-medium text-neutral-500 transition hover:text-black lg:self-auto"
              >
                Kapat ×
              </button>
            </div>

            <div className="mt-5 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-3">
              <CookieSetting
                title="Zorunlu"
                description="Sepet, güvenlik ve temel site özellikleri."
                checked
                disabled
              />

              <CookieSetting
                title="Analitik"
                description="Site kullanımını ve performansı anlamamıza yardımcı olur."
                checked={analytics}
                onChange={setAnalytics}
              />

              <CookieSetting
                title="Pazarlama"
                description="Reklam ve pazarlama ölçümlemelerinde kullanılabilir."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/cerez-politikasi"
                className="text-xs text-neutral-500 underline underline-offset-4 transition hover:text-black"
              >
                Çerez Politikası&apos;nı incele
              </Link>

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="min-h-11 cursor-pointer border border-black/15 bg-white px-5 text-sm font-medium transition hover:bg-neutral-50"
                >
                  Tümünü Reddet
                </button>

                <button
                  type="button"
                  onClick={savePreferences}
                  className="min-h-11 cursor-pointer bg-[#1f1e1a] px-6 text-sm font-medium text-white transition hover:bg-black"
                >
                  Tercihleri Kaydet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CookieSetting({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 bg-[#f8f7f4] p-4">
      <div>
        <p className="text-xs font-semibold">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-4 text-neutral-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => {
          if (!disabled && onChange) {
            onChange(!checked);
          }
        }}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#1f1e1a]" : "bg-neutral-300"
        } ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function CookieIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M20 13.2A8.3 8.3 0 0 1 10.8 4a4.5 4.5 0 0 0-.8 0A8 8 0 1 0 20 13.2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="9" cy="14" r="1" fill="currentColor" />
      <circle cx="13.5" cy="17" r="1" fill="currentColor" />
      <circle cx="7" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}