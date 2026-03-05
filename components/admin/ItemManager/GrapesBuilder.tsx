"use client";

import { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

type Props = {
  value?: string;
  onChange?: (html: string) => void;
};

export default function GrapesBuilder({ value, onChange }: Props) {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const editor = grapesjs.init({
      container: containerRef.current,
      height: "500px",
      fromElement: false,

      storageManager: false,

      blockManager: {
        appendTo: "#blocks",
      },

      panels: {
        defaults: [],
      },
    });

    editorRef.current = editor;

    /* ---------- BLOCK: TEXT ---------- */

    editor.BlockManager.add("text", {
      label: "Text",
      content: "<p>Tulis teks...</p>",
    });

    /* ---------- BLOCK: IMAGE ---------- */

    editor.BlockManager.add("image", {
      label: "Image",
      content: `<img src="https://via.placeholder.com/300" />`,
    });

    /* ---------- BLOCK: CONTAINER ---------- */

    editor.BlockManager.add("container", {
      label: "Container",
      content: `<div style="padding:20px;border:1px dashed #ccc">Drop here</div>`,
    });

    /* ---------- LOAD DATA ---------- */

    if (value) {
      editor.setComponents(value);
    }

    /* ---------- SAVE ---------- */

    editor.on("update", () => {
      const html = editor.getHtml();
      onChange?.(html);
    });

    return () => editor.destroy();
  }, []);

  return (
    <div className="flex gap-4">
      <div
        id="blocks"
        className="w-48 border rounded p-3 flex flex-col gap-2"
      />

      <div ref={containerRef} className="flex-1 border rounded" />
    </div>
  );
}
