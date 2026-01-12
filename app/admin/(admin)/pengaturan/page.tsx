"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";

export default function AdminPengaturan() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    setLoading(false);

    if (res.error) {
      setError(res.error.message || "Gagal menambahkan user.");
    } else {
      setSuccess("User berhasil ditambahkan.");
      e.currentTarget.reset();
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <p className="text-sm text-foreground/60">
          Tambahkan user baru untuk mengakses sistem *Temp
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border bg-background p-6">
        <h2 className="text-lg font-semibold mb-4">
          Tambah User Baru
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-500">
            {error}
          </p>
        )}

        {success && (
          <p className="mb-4 text-sm text-green-600">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Nama Lengkap"
            required
            className="
              w-full rounded-md border px-3 py-2
              bg-background text-foreground
              border-foreground/20
              focus:outline-none focus:ring-2 focus:ring-primary
            "
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="
              w-full rounded-md border px-3 py-2
              bg-background text-foreground
              border-foreground/20
              focus:outline-none focus:ring-2 focus:ring-primary
            "
          />

          <input
            name="password"
            type="password"
            placeholder="Password (min. 8 karakter)"
            required
            minLength={8}
            className="
              w-full rounded-md border px-3 py-2
              bg-background text-foreground
              border-foreground/20
              focus:outline-none focus:ring-2 focus:ring-primary
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="regular-button w-full disabled:opacity-60"
          >
            {loading ? "Menambahkan..." : "Tambah User"}
          </button>
        </form>
      </div>
    </div>
  );
}
