"use client";

import { useState, useEffect } from "react";

export default function FiturModal({ data, onClose, onSave }: any) {
  const [ikonFile, setIkonFile] = useState<File | null>(null);
  const [ikonPreview, setIkonPreview] = useState<string | null>(
    data.ikon || null,
  );
  const [nama, setNama] = useState(data.nama || "");
  const [deskripsi, setDeskripsi] = useState(data.deskripsi || "");
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (!ikonFile) return;
    const url = URL.createObjectURL(ikonFile);
    setIkonPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [ikonFile]);

  useEffect(() => {
    setErrors({});
  }, [ikonFile, nama, deskripsi]);

  const validate = () => {
    const newErrors: any = {};

    if (!ikonFile && !ikonPreview) {
      newErrors.ikon = "Ikon wajib diisi";
    }

    if (!nama.trim()) {
      newErrors.nama = "Nama fitur wajib diisi";
    }

    if (!deskripsi.trim()) {
      newErrors.deskripsi = "Deskripsi wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    onSave({
      id: data.id,
      uiId: data.uiId,
      nama,
      deskripsi,
      ikon: ikonFile ? URL.createObjectURL(ikonFile) : data.ikon,
      ikonFile,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl p-8 rounded">
        <h2 className="text-2xl font-bold mb-6">
          {data.id ? "Edit Fitur" : "Tambah Fitur"}
        </h2>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block font-medium text-sm mb-2">Ikon</label>

            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded cursor-pointer overflow-hidden">
              {ikonPreview ? (
                <img
                  src={ikonPreview}
                  alt="Preview ikon"
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <span className="text-gray-400 text-sm">
                  Klik atau tarik ikon ke sini
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setIkonFile(file);
                }}
              />
            </label>

            {errors.ikon && (
              <p className="text-red-600 text-sm mt-1">{errors.ikon}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nama fitur</label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Nama fitur"
            />
            {errors.nama && (
              <p className="text-red-600 text-sm mt-1">{errors.nama}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full border p-2 rounded min-h-[120px]"
              placeholder="Deskripsi fitur"
            />
            {errors.deskripsi && (
              <p className="text-red-600 text-sm mt-1">{errors.deskripsi}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-4 py-2">
            Batal
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
