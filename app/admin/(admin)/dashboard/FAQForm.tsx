"use client";

import { useState } from "react";
import { FAQPayload } from "./FAQModal";

type Props = {
  initialData?: FAQPayload;
  onSuccess: () => void;
};

const FAQForm = ({ initialData, onSuccess }: Props) => {
  const [pertanyaan, setPertanyaan] = useState(initialData?.pertanyaan ?? "");
  const [jawaban, setJawaban] = useState(initialData?.jawaban ?? "");
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(initialData?.id);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      isEdit ? `/api/admin/faq/${initialData!.id}` : "/api/admin/faq",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pertanyaan, jawaban }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      alert("Gagal menyimpan FAQ");
      return;
    }

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Pertanyaan</label>
        <input
          value={pertanyaan}
          onChange={(e) => setPertanyaan(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Jawaban</label>
        <textarea
          value={jawaban}
          onChange={(e) => setJawaban(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={4}
          required
        />
      </div>

      <button
        disabled={loading}
        className="regular-button w-full py-2"
      >
        {loading ? "Menyimpan..." : isEdit ? "Update FAQ" : "Tambah FAQ"}
      </button>
    </form>
  );
};

export default FAQForm;
