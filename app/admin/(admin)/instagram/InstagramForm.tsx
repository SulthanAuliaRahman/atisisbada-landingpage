"use client";

import { useState } from "react";
import { InstagramPayload } from "./InstagramModal";

type Props = {
  initialData?: InstagramPayload;
  nextOrder?: number;
  onSuccess: () => void;
};

const InstagramForm = ({ initialData, nextOrder, onSuccess }: Props) => {
  const [url, setUrl] = useState(initialData?.url ?? "");
  const [nama, setNama] = useState(initialData?.nama ?? "");
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi ?? "");
  
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
      isEdit ? `/api/admin/instagram/${initialData!.id}` : "/api/admin/instagram",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          nama,
          deskripsi,
          nomor_urut: nomorUrut,
          status,
        }),
      },
    );

    setLoading(false);

    if (!res.ok) {
      alert("Gagal menyimpan Data Instagram");
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
        <label className="block text-sm font-medium">nama</label>
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama postingan instagram"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">URL Instagram</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Deskripsi</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Masukkan Deskripsi Instagram"
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
        <label htmlFor="status" className="text-sm font-medium">Aktif</label>
      </div>

      <button disabled={loading} className="regular-button w-full py-2">
        {loading ? "Menyimpan..." : isEdit ? "Update Instagram" : "Tambah Instagram"}
      </button>
    </form>
  );
};

export default InstagramForm;
