"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
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

  const quillRef = useRef<any>(null);
  const [quillReady, setQuillReady] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
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

  const getTitle = () =>
    data.id ? `Edit ${labels[type]}` : `Tambah ${labels[type]}`;

  useEffect(() => {
    if (!quillReady) return;
    if (quillRef.current) return;
    if (!(window as any).Quill) return;

    const Quill = (window as any).Quill;

    const quill = new Quill("#quill-editor", {
      theme: "snow",
      modules: {
        toolbar: {
          container: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            ["bold", "italic", "underline", "strike"],

            [{ color: [] }, { background: [] }],

            [{ script: "sub" }, { script: "super" }],

            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],

            [{ align: [] }],

            ["blockquote", "code-block"],

            ["link", "image", "video"],

            ["clean"],
          ],
          handlers: {
            image: () => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";

              input.onchange = async () => {
                const file = input.files?.[0];
                if (!file) return;

                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("/api/upload/image", {
                  method: "POST",
                  body: formData,
                });

                const { url } = await res.json();

                const range = quill.getSelection();
                quill.insertEmbed(range.index, "image", url);
              };

              input.click();
            },
          },
        },
      },
    });

    if (form.deskripsi) {
      quill.root.innerHTML = form.deskripsi;
    }

    quill.on("text-change", () => {
      setForm((prev) => ({
        ...prev,
        deskripsi: quill.root.innerHTML,
      }));
    });

    quillRef.current = quill;
  }, [quillReady]);

  return (
    <>
      <Script
        src="https://cdn.quilljs.com/1.3.7/quill.min.js"
        strategy="afterInteractive"
        onLoad={() => setQuillReady(true)}
      />
      <link
        rel="stylesheet"
        href="https://cdn.quilljs.com/1.3.7/quill.snow.css"
      />

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-card w-[95vw] h-[95vh] rounded flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b">
            <h2 className="text-2xl font-bold">{getTitle()}</h2>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="flex flex-col gap-6">
              <div>
                <label className="block font-medium text-xl mb-2">Ikon</label>

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
                <label className="block text-xl font-medium mb-2">Nama</label>
                <input
                  type="text"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  className="w-full border p-2 rounded"
                  placeholder={`Nama ${labels[type]}`}
                />
              </div>

              <div>
                <label className="block text-xl font-medium mb-2">
                  Deskripsi
                </label>
                <div
                  id="quill-editor"
                  className="bg-white border rounded min-h-[300px]"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t flex justify-end gap-3">
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
    </>
  );
}
