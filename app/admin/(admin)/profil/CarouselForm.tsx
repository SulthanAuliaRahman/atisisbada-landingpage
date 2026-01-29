"use client";

import { useState } from "react";
import type { CarouselPayload } from "./CarouselModal";

type Props = {
  initialData?: CarouselPayload;
  nextOrder?: number;
  onSuccess: () => void;
};

export default function CarouselForm({
  initialData,
  nextOrder,
  onSuccess,
}: Props) {
  const isEdit = Boolean(initialData?.id);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState(initialData?.alt ?? "");
  const [nomorUrut, setNomorUrut] = useState(
    initialData?.nomor_urut ?? nextOrder ?? 1,
  );
  const [status, setStatus] = useState(initialData?.status ?? true);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    let response: Response;

    if (isEdit) {
      response = await fetch(`/api/admin/profile/${initialData!.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomor_urut: nomorUrut,
          alt: alt,
          status,
        }),
      });
    } else {
      if (!file || !alt) {
        alert("Nama dan image wajib diisi");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append("nama", alt);
      formData.append("nomor_urut", String(nomorUrut));
      formData.append("status", String(status));

      response = await fetch("/api/admin/profile", {
        method: "POST",
        body: formData,
      });
    }

    setLoading(false);

    if (response.ok) onSuccess();
    else alert("Gagal menyimpan data");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {!isEdit && (
        <>
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block font-medium text-sm text-foreground">
              Image Carousel
            </label>

            <label
              className="
    flex flex-col items-center justify-center
    w-full h-28
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
                  className="w-128 h-28 object-cover rounded-md border"
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
                      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1
             M12 12v6m0-6l-3 3m3-3l3 3
             M12 6v6"
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
                onChange={(event) => {
                  const selectedFile = event.target.files?.[0] ?? null;
                  setFile(selectedFile);

                  if (selectedFile) {
                    setPreview(URL.createObjectURL(selectedFile));
                  } else {
                    setPreview(null);
                  }
                }}
              />
            </label>
          </div>

          {/* Alt text & Nama Carousel*/}
          <label className="text-sm text-foreground">Nama Carousel</label>
          <input
            placeholder="Alternative text & Nama Carousel"
            value={alt}
            onChange={(event) => setAlt(event.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </>
      )}

      {isEdit && (
        <div className="space-y-1">
          <label className="text-sm text-foreground">Nama Carousel</label>
          <input
            placeholder="Alternative text & Nama Carousel"
            value={alt}
            onChange={(event) => setAlt(event.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      )}

      <label className="text-foregroundk">Urutan</label>
      <input
        type="number"
        value={nomorUrut}
        onChange={(event) => setNomorUrut(Number(event.target.value))}
        className="w-full border px-3 py-2 rounded"
      />

      <label className="flex items-center text-foreground gap-2">
        <input
          type="checkbox"
          checked={status}
          onChange={(event) => setStatus(event.target.checked)}
        />
        Active
      </label>

      <button disabled={loading} className="regular-button w-full py-2">
        {loading ? "Saving..." : isEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}
