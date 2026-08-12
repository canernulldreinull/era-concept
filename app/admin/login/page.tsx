"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Giriş yapılamadı.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8">
        <h1 className="text-3xl font-semibold mb-2">
          Yönetim Paneli
        </h1>

        <p className="text-neutral-500 mb-8">
          Devam etmek için giriş yap.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              E-posta
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              placeholder="admin@cetinerstore.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Şifre
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-xl py-3 font-medium disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </main>
  );
}