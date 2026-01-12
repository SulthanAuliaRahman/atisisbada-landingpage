"use client";

//route: /admin masuk ke login page

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function LogInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/admin/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-2">
          Admin Login
        </h1>

        <p className="text-sm text-foreground/60 text-center mb-6">
          Login untuk mengakses panel admin
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Password"
            required
            className="
              w-full rounded-md border px-3 py-2
              bg-background text-foreground
              border-foreground/20
              focus:outline-none focus:ring-2 focus:ring-primary
            "
          />

          <button type="submit" className="w-full regular-button">
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}
