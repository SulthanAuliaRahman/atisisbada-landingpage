import { useState, useEffect } from "react";
import { ItemModalProps } from "./types";

export default function ItemModal({
  data,
  onClose,
  onSave,
  type,
}: ItemModalProps) {
  const [form, setForm] = useState({
    nama: data.nama || "",
    deskripsi: data.deskripsi || "",
    ikon: data.ikon || "",
  });
  const [preview, setPreview] = useState(data.ikon || "");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...data,
      ...form,
      ikon: preview,
      ikonFile: file || undefined,
    });
  };

  const labels = {
    fitur: "Fitur",
    modul: "Modul",
    mitra: "Mitra",
  };

  const getTitle = () => {
    return data.id ? `Edit ${labels[type]}` : `Tambah ${labels[type]}`;
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-10 rounded">
        <h2 className="text-2xl font-bold mb-6">{getTitle()}</h2>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block font-medium text-sm mb-2">Ikon</label>

            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded cursor-pointer overflow-hidden">
              {preview ? (
                <img
                  src={preview}
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
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nama</label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full border p-2 rounded"
              placeholder={`Nama ${labels[type]}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Deskripsi</label>
            <textarea
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              className="w-full border p-2 rounded min-h-[120px]"
              placeholder={`Deskripsi ${labels[type]}`}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-4 py-2">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
