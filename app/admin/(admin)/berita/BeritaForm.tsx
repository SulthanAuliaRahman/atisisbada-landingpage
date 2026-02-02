// app/admin/(admin)/berita/BeritaForm.tsx
"use client";
import { useState } from "react";
import { BeritaPayload } from "./BeritaModal";

type Props = {
  initialData?: BeritaPayload;
  nextOrder?: number;
  onSuccess: () => void;
};

export default function BeritaForm({ initialData, nextOrder, onSuccess }: Props) {
  const [nama, setNama] = useState(initialData?.nama ?? "");
  const [url, setUrl] = useState(initialData?.url ?? "");
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi ?? "");
  const [nomorUrut, setNomorUrut] = useState<number>(
    initialData?.nomor_urut ?? nextOrder ?? 1
  );
  const [status, setStatus] = useState(initialData?.status ?? true);
  const [loading, setLoading] = useState(false);

  const isEdit = !!initialData?.id;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        isEdit ? `/api/admin/berita/${initialData!.id}` : `/api/admin/berita`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nama,
            url,
            deskripsi,
            nomor_urut: nomorUrut,
            status,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Gagal menyimpan berita");
        return;
      }

      onSuccess();
    } catch (err) {
      alert("Terjadi kesalahan saat menyimpan");
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Judul Berita</label>
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan judul berita"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">URL Berita</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Deskripsi</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Ringkasan atau isi singkat berita..."
          className="w-full border rounded px-3 py-2"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nomor Urut</label>
        <input
          type="number"
          value={nomorUrut}
          onChange={(e) => setNomorUrut(Number(e.target.value))}
          min={1}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
        <span>Tampilkan (Aktif)</span>
      </label>

      <button
        disabled={loading}
        className="regular-button w-full py-3 disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : isEdit ? "Update Berita" : "Tambah Berita"}
      </button>
    </form>
  );
}