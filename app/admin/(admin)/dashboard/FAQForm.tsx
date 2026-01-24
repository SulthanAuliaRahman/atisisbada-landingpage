"use client";

import { useState } from "react";
import type { FAQPayload } from "./FAQModal";

type Props = {
  initialData?: FAQPayload;
  onSuccess: () => void;
};

export default function FAQForm({ initialData, onSuccess }: Props) {
  const isEdit = Boolean(initialData?.id);

  const [pertanyaan, setPertanyaan] = useState(
    initialData?.pertanyaan ?? ""
  );
  const [jawaban, setJawaban] = useState(
    initialData?.jawaban ?? ""
  );
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(
      isEdit ? `/api/admin/faq/${initialData!.id}` : "/api/admin/faq",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pertanyaan, jawaban }),
      }
    );

    setLoading(false);

    if (response.ok) onSuccess();
    else alert("Gagal menyimpan FAQ");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Pertanyaan</label>
        <input
          value={pertanyaan}
          onChange={(e) => setPertanyaan(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Jawaban</label>
        <textarea
          value={jawaban}
          onChange={(e) => setJawaban(e.target.value)}
          className="w-full border px-3 py-2 rounded min-h-[100px]"
          required
        />
      </div>

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : isEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}
