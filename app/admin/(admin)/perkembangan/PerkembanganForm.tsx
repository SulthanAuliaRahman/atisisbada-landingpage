"use client";
import { useState } from "react";

type PerkembanganPayload = {
  id?: string;
  judul?: string;
  text?: string;
  tahun?: number;
  status?: boolean;
  background_url?: string;
};

type Props = {
  initialData?: PerkembanganPayload;
  nextTahun?: number;
  onSuccess: () => void;
};

export default function PerkembanganForm({
  initialData,
  nextTahun,
  onSuccess,
}: Props) {
  const isEdit = Boolean(initialData?.id);

  const [preview, setPreview] = useState<string | null>(
    initialData?.background_url || null
  );
  const [file, setFile] = useState<File | null>(null);

  const [judul, setJudul] = useState(initialData?.judul ?? "");
  const [text, setText] = useState(initialData?.text ?? "");
  const [tahun, setTahun] = useState(
    initialData?.tahun ?? nextTahun ?? new Date().getFullYear()
  );
  const [status, setStatus] = useState(initialData?.status ?? true);

  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let response: Response;

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("text", text);
    formData.append("tahun", String(tahun));
    formData.append("status", String(status));

    if (file) {
      formData.append("image", file);
    }

    if (isEdit) {
      response = await fetch(`/api/admin/perkembangan/${initialData!.id}`, {
        method: "PUT",
        body: formData,
      });
    } else {
      if (!file || !judul || !text) {
        alert("Background gambar, Judul, dan Text wajib diisi untuk data baru");
        setLoading(false);
        return;
      }

      response = await fetch("/api/admin/perkembangan", {
        method: "POST",
        body: formData,
      });
    }

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", response.status, data);
      throw new Error(data?.message || "Unknown server error");
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
      {/* Upload Background */}
      <div className="space-y-2">
        <label className="block font-medium text-sm text-foreground">
          Background Gambar {isEdit ? "(kosongkan jika tidak diganti)" : ""}
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
                {file ? file.name : "Klik atau tarik gambar ke sini"}
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

      {/* Judul */}
      <div className="space-y-1">
        <label className="text-sm text-foreground">Judul</label>
        <input
          placeholder="Contoh: Tahun 2025 - Pencapaian Besar"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Text → Textarea */}
      <div className="space-y-1">
        <label className="text-sm text-foreground">Teks Deskripsi</label>
        <textarea
          placeholder="Tuliskan penjelasan singkat di sini..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border px-3 py-2 rounded min-h-[100px] resize-y"
          required
        />
      </div>

      {/* Tahun */}
      <div className="space-y-1">
        <label className="text-foreground">Tahun</label>
        <input
          type="number"
          value={tahun}
          onChange={(e) => setTahun(Number(e.target.value))}
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

      {/* Submit */}
      <button
        disabled={loading}
        className="regular-button w-full py-2"
      >
        {loading ? "Menyimpan..." : isEdit ? "Update" : "Tambah"}
      </button>
    </form>
  );
}