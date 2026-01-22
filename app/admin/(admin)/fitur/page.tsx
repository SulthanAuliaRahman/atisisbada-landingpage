"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FiturModal from "./FiturModal";
import AlertMessage from "@/components/AlertMessage";

const initialData = [];

export default function AdminFitur() {
  const [data, setData] = useState<any[]>([]);
  const [modal, setModal] = useState<any>(null);
  const [context, setContext] = useState<any>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    loadFitur();
  }, []);

  useEffect(() => {
    if (!saveMessage) return;

    const t = setTimeout(() => setSaveMessage(null), 3000);
    return () => clearTimeout(t);
  }, [saveMessage]);

  const loadFitur = async () => {
    try {
      const res = await fetch("/api/admin/fitur");
      const json = await res.json();

      const mapped = json.data.map((f: any) => ({
        ...f,
        status: parseStatus(f.status),
        uiId: crypto.randomUUID(),
      }));

      console.log("data:", mapped);
      setData(mapped);
    } catch (e) {
      console.error("Gagal load fitur", e);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 30,
        tolerance: 3,
      },
    }),
  );

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setData((items) => {
      const oldIndex = items.findIndex((i) => i.uiId === active.id);
      const newIndex = items.findIndex((i) => i.uiId === over.id);

      if (oldIndex === -1 || newIndex === -1) return items;

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const isLastRowSingle = (data.length + 1) % 4 === 1;
  const saveAllFitur = async () => {
    setSaveMessage(null);
    try {
      const dataToSend = await Promise.all(
        data.map(async (f) => {
          let ikon = f.ikon;
          const fileToBase64 = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve(reader.result as string);
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          };

          if (f.ikonFile) {
            ikon = await fileToBase64(f.ikonFile);
          }
          return {
            id: f.id,
            nama: f.nama,
            deskripsi: f.deskripsi,
            ikon,
            status: f.status,
          };
        }),
      );

      const res = await fetch("/api/admin/fitur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: dataToSend }),
      });

      const result = await res.json();
      if (!res.ok) {
        setSaveMessage(result.message || "Gagal menyimpan");
        return;
      }

      setSaveMessage("Data berhasil disimpan");
      await loadFitur();
    } catch (e: any) {
      setSaveMessage(e?.message || "Terjadi kesalahan pada server");
    }
  };

  return (
    <div className="p-6 relative">
      <AlertMessage message={saveMessage} />
      <h1 className="text-lg sm:text-2xl font-bold mb-6">Kelola Fitur</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={data.map((i) => i.uiId)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
            {data.map((item) => (
              <SortableItem
                key={item.uiId}
                item={item}
                onToggle={(uiId: string) => {
                  setData((prev) =>
                    prev.map((i) =>
                      i.uiId === uiId ? { ...i, status: !i.status } : i,
                    ),
                  );
                }}
                onContext={(e: any) =>
                  setContext({
                    x: e.clientX,
                    y: e.clientY,
                    item,
                  })
                }
              />
            ))}

            <button
              onClick={() =>
                setModal({ id: null, ikon: "", nama: "", deskripsi: "" })
              }
              className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center h-48 w-full text-gray-500"
            >
              <div className="text-4xl leading-none">+</div>
              <span className="text-sm mt-2">Tambah Fitur</span>
            </button>
          </div>
        </SortableContext>
      </DndContext>

      <div className="sticky top-4 mt-4 sm:mt-6">
        <button
          onClick={saveAllFitur}
          className="w-full bg-green-600 text-white rounded py-3 px-4 sm:px-6 md:px-8"
        >
          Simpan
        </button>
      </div>
      {context && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setContext(null)}
          />

          <div
            className="fixed bg-white border rounded shadow z-50"
            style={{ top: context.y, left: context.x }}
          >
            <button
              onClick={() => {
                setModal(context.item);
                setContext(null);
              }}
              className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
            >
              Edit
            </button>

            <button
              onClick={() => {
                setData((prev) => prev.filter((i) => i.id !== context.item.id));
                setContext(null);
              }}
              className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 text-red-600"
            >
              Hapus
            </button>
          </div>
        </>
      )}

      {modal && (
        <FiturModal
          data={modal}
          onClose={() => setModal(null)}
          onSave={(item: { uiId?: string; [key: string]: any }) => {
            setData((prev) => {
              if (item.uiId) {
                return prev.map((i) =>
                  i.uiId === item.uiId ? { ...i, ...item } : i,
                );
              }

              return [
                ...prev,
                {
                  ...item,
                  id: null,
                  status: true,
                  uiId: crypto.randomUUID(),
                },
              ];
            });

            setModal(null);
          }}
        />
      )}
    </div>
  );
}

function SortableItem({ item, onContext, onToggle }: any) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: item.uiId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative bg-white rounded-lg p-4 h-48 select-none shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Drag handle */}
      <div {...listeners} className="absolute inset-0 cursor-grab" />

      {/* Toggle */}
      <div className="absolute top-3 right-3 z-10">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={item.status}
            onChange={() => onToggle(item.uiId)}
          />
          <div
            className={`w-10 h-5 rounded-full relative transition-colors ${
              item.status ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                item.status ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
        </label>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full gap-2 pointer-events-none">
        <img src={item.ikon} className="w-16 h-16 object-contain" />
        <span className="font-medium text-sm text-center">{item.nama}</span>
      </div>

      {/* Context menu */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onContext(e);
        }}
        className="absolute bottom-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded hover:bg-black/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
        </svg>
      </button>
    </div>
  );
}

const parseStatus = (v: any) => {
  if (v === true) return true;
  if (v === false) return false;
  if (v === "true") return true;
  if (v === "false") return false;
  if (v === "t") return true;
  if (v === "f") return false;
  if (v === 1) return true;
  if (v === 0) return false;
  return true;
};
