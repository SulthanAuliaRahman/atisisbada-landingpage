"use client";

import { useState } from "react";
import { FAQPayload } from "./FAQModal";

type Props = {
  initialData?: FAQPayload;
  nextOrder?: number;
  onSuccess: () => void;
};

const FAQForm = ({ initialData, nextOrder, onSuccess }: Props) => {
  const [pertanyaan, setPertanyaan] = useState(initialData?.pertanyaan ?? "");
  const [jawaban, setJawaban] = useState(initialData?.jawaban ?? "");
  const [nomorUrut, setNomorUrut] = useState(
    initialData?.nomor_urut ?? nextOrder ?? 1,
  );
  const [status, setStatus] = useState(initialData?.status ?? true);

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
        body: JSON.stringify({
          pertanyaan,
          jawaban,
          nomor_urut: nomorUrut,
          status,
        }),
      },
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
        <label className="block text-sm font-medium">Nomor Urut</label>
        <input
          type="number"
          value={nomorUrut}
          onChange={(e) => setNomorUrut(parseInt(e.target.value) || 1)}
          className="w-full border rounded px-3 py-2"
          min="1"
          required
        />
      </div>

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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="status"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="status" className="text-sm font-medium">
          Aktif
        </label>
      </div>

      <button disabled={loading} className="regular-button w-full py-2">
        {loading ? "Menyimpan..." : isEdit ? "Update FAQ" : "Tambah FAQ"}
      </button>
    </form>
  );
};

export default FAQForm;
