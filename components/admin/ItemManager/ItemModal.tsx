"use client";

import { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { ItemModalProps } from "./types";

export default function ItemModal({
  data,
  onClose,
  onSave,
  type,
}: ItemModalProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const editorRef = useRef<any>(null);
  const editorContainer = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    nama: data.nama || "",
  });

  const [layout, setLayout] = useState<any>(
    data.deskripsi
      ? JSON.parse(data.deskripsi)
      : { html: "<p>Mulai menulis...</p>", css: "" },
  );

  const [preview, setPreview] = useState(data.ikon || "");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!editorContainer.current) return;

    const editor = grapesjs.init({
      container: editorContainer.current,
      height: "500px",
      storageManager: false,

      blockManager: {
        appendTo: "#blocks",
      },

      canvas: {
        styles: [
          `
          img{
            max-width:100%;
            height:auto;
            display:block;
          }
        `,
        ],
      },

      assetManager: {
        upload: "/api/admin/item/image",
        uploadName: "file",
        multiUpload: false,
        autoAdd: true,
      },
      avoidInlineStyle: true,
    });

    editor.getWrapper()?.set({
      removable: false,
    });

    editor.DomComponents.addType("text-block", {
      model: {
        defaults: {
          tagName: "p",
          editable: true,
          droppable: false,
          traits: [
            {
              type: "select",
              label: "Tag",
              name: "tagName",
              options: [
                { id: "p", label: "Paragraph" },
                { id: "h1", label: "H1" },
                { id: "h2", label: "H2" },
                { id: "h3", label: "H3" },
                { id: "h4", label: "H4" },
              ],
            },
          ],
        },
      },
    });
    editorRef.current = editor;

    editor.BlockManager.add("text", {
      label: "Text",
      content: `<p>Tulis teks...</p>`,
    });

    editor.BlockManager.add("image", {
      label: "Image",
      content: `
        <img src="https://via.placeholder.com/400" />
      `,
    });

    editor.BlockManager.add("button", {
      label: "Button",
      content: `
        <a href="#" style="
          display:inline-block;
          padding:10px 20px;
          background:#2563eb;
          color:white;
          border-radius:6px;
          text-decoration:none;">
          Button
        </a>
      `,
    });

    /* 2 COLUMNS */

    editor.BlockManager.add("2-columns", {
      label: "2 Columns",
      content: `
        <div style="display:flex;gap:20px">
          <div style="flex:1;padding:10px"></div>
          <div style="flex:1;padding:10px"></div>
        </div>
      `,
    });

    /* 3 COLUMNS */

    editor.BlockManager.add("3-columns", {
      label: "3 Columns",
      content: `
        <div style="display:flex;gap:20px">
          <div style="flex:1;padding:10px"></div>
          <div style="flex:1;padding:10px"></div>
          <div style="flex:1;padding:10px"></div>
        </div>
      `,
    });

    /* HERO */

    editor.BlockManager.add("hero", {
      label: "Hero",
      content: `
        <section style="
          padding:80px;
          text-align:center;
          background:#f5f5f5;">
          <h1>Judul Hero</h1>
          <p>Tambahkan deskripsi</p>
        </section>
      `,
    });

    /* FEATURE GRID */

    editor.BlockManager.add("feature-grid", {
      label: "Feature Grid",
      content: `
        <div style="
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:20px;">
          <div style="padding:20px;border:1px solid #eee">
            <h3>Feature</h3>
            <p>Deskripsi</p>
          </div>
          <div style="padding:20px;border:1px solid #eee">
            <h3>Feature</h3>
            <p>Deskripsi</p>
          </div>
          <div style="padding:20px;border:1px solid #eee">
            <h3>Feature</h3>
            <p>Deskripsi</p>
          </div>
        </div>
      `,
    });

    /* SPACER */

    editor.BlockManager.add("spacer", {
      label: "Spacer",
      content: `<div style="height:40px"></div>`,
    });

    /* LOAD */

    editor.setComponents(layout.html);
    editor.setStyle(layout.css);

    /* SAVE */

    editor.on("update", () => {
      let html = editor.getHtml();
      let css = editor.getCss();

      html = html
        .replace(/<\/?body[^>]*>/g, "")
        .replace(/<\/?html[^>]*>/g, "")
        .replace(/<p[^>]*>\s*<\/p>/g, "")
        .replace(/<p[^>]*>\s*<p/gi, "<p")
        .replace(/<\/p>\s*<\/p>/gi, "</p>")
        .trim();

      css = css?.trim();

      setLayout({
        html,
        css,
      });
    });

    return () => editor.destroy();
  }, []);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!form.nama || !preview || !layout.html.trim()) {
      setErrorMsg("Semua field harus diisi");

      setTimeout(() => {
        setErrorMsg("");
      }, 2500);

      return;
    }

    onSave({
      ...data,
      ...form,
      deskripsi: JSON.stringify(layout),
      ikon: preview,
      ikonFile: file || undefined,
    });
  };

  const labels: any = {
    fitur: "Fitur",
    modul: "Modul",
    mitra: "Mitra",
  };

  const getTitle = () =>
    data.id ? `Edit ${labels[type]}` : `Tambah ${labels[type]}`;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {errorMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg text-sm">
          {errorMsg}
        </div>
      )}
      <div className="bg-white w-[95vw] h-[95vh] rounded flex flex-col">
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-bold">{getTitle()}</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
          {/* ICON */}

          <div>
            <label className="block font-medium text-xl mb-2">Ikon</label>

            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded cursor-pointer overflow-hidden">
              {preview ? (
                <img
                  src={preview}
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

          {/* NAMA */}

          <div>
            <label className="block text-xl font-medium mb-2">Nama</label>

            <input
              type="text"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* BUILDER */}

          <div>
            <label className="block text-xl font-medium mb-2">Deskripsi</label>

            <div className="flex gap-4">
              <div
                id="blocks"
                className="w-56 border rounded p-3 flex flex-col gap-2"
              />

              <div ref={editorContainer} className="flex-1 border rounded" />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button onClick={onClose}>Batal</button>

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
