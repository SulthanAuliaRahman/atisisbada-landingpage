"use client";
import { useState } from "react";

type PengembangPayload = {
  id?: string;
  nama?: string;
  jabatan?: string;
  nomor_urut?: number;
  status?: boolean;
  img_url?: string;
};

type Props = {
  initialData?: PengembangPayload;
  nextOrder?: number;
  onSuccess: () => void;
};

export default function PengembangForm({
  initialData,
  nextOrder,
  onSuccess,
}: Props) {
  const isEdit = Boolean(initialData?.id);
  const [preview, setPreview] = useState<string | null>(initialData?.img_url || null);
  const [file, setFile] = useState<File | null>(null);
  const [nama, setNama] = useState(initialData?.nama ?? "");
  const [jabatan, setJabatan] = useState(initialData?.jabatan ?? "");
  const [nomorUrut, setNomorUrut] = useState(
    initialData?.nomor_urut ?? nextOrder ?? 1
  );
  const [status, setStatus] = useState(initialData?.status ?? true);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let response: Response;

    if (isEdit) {
      response = await fetch(`/api/admin/pengembang/${initialData!.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          jabatan,
          nomor_urut: nomorUrut,
          status,
        }),
      });
    } else {
      if (!file || !nama || !jabatan) {
        alert("Foto, Nama, dan Jabatan wajib diisi untuk data baru");
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("image", file);
      formData.append("nama", nama);
      formData.append("jabatan", jabatan);
      formData.append("nomor_urut", String(nomorUrut));
      formData.append("status", String(status));

      response = await fetch("/api/admin/pengembang", {
        method: "POST",
        body: formData,
      });
    }

    setLoading(false);
    if (response.ok) {
      onSuccess();
    } else {
      alert("Gagal menyimpan data");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Upload Foto - mirip Carousel */}
      <div className="space-y-2">
        <label className="block font-medium text-sm text-foreground">
          Foto Pengembang {isEdit ? "(kosongkan jika tidak diganti)" : ""}
        </label>
        <label
          className="
            flex flex-col items-center justify-center
            w-full h-32
            border-2 border-dashed border-gray-300
            rounded-lg cursor-pointer
            hover:border-blue-500 transition
            bg-background
            overflow-hidden
          "
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-32 object-cover rounded-md border"
            />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-foreground mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1 M12 12v6m0-6l-3 3m3-3l3 3 M12 6v6"
                />
              </svg>
              <span className="text-foreground text-sm text-center px-2">
                {file ? file.name : "Klik atau tarik foto ke sini"}
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const selected = e.target.files?.[0] ?? null;
              setFile(selected);
              if (selected) {
                setPreview(URL.createObjectURL(selected));
              } else {
                setPreview(null);
              }
            }}
          />
        </label>
      </div>

      {/* Nama */}
      <div className="space-y-1">
        <label className="text-sm text-foreground">Nama Lengkap</label>
        <input
          placeholder="Contoh: Dr. Sulthan Ahmad"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Jabatan */}
      <div className="space-y-1">
        <label className="text-sm text-foreground">Jabatan</label>
        <input
          placeholder="Contoh: Lead Developer"
          value={jabatan}
          onChange={(e) => setJabatan(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Urutan */}
      <div className="space-y-1">
        <label className="text-foreground">Urutan</label>
        <input
          type="number"
          value={nomorUrut}
          onChange={(e) => setNomorUrut(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Status */}
      <label className="flex items-center text-foreground gap-2">
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
        Active
      </label>

      {/* Tombol */}
      <button
        disabled={loading}
        className="regular-button w-full py-2"
      >
        {loading ? "Saving..." : isEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}