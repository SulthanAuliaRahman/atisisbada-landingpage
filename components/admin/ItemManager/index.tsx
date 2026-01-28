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
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import AlertMessage from "@/components/AlertMessage";
import SortableItem from "./SortableItem";
import ItemModal from "./ItemModal";
import { BaseItem, ItemManagerConfig, ContextMenuState } from "./types";

interface ItemManagerProps {
  config: ItemManagerConfig;
}

const parseStatus = (v: any): boolean => {
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

export default function ItemManager({ config }: ItemManagerProps) {
  const [data, setData] = useState<BaseItem[]>([]);
  const [modal, setModal] = useState<Partial<BaseItem> | null>(null);
  const [context, setContext] = useState<ContextMenuState | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (!saveMessage) return;

    const t = setTimeout(() => setSaveMessage(null), 3000);
    return () => clearTimeout(t);
  }, [saveMessage]);

  const loadItems = async () => {
    try {
      const url = `${config.apiEndpoint}?type=${config.type.toUpperCase()}`;
      const res = await fetch(url);
      const json = await res.json();

      const mapped = json.data.map((f: any) => ({
        ...f,
        status: parseStatus(f.status),
        uiId: crypto.randomUUID(),
      }));

      console.log("data:", mapped);
      setData(mapped);
    } catch (e) {
      console.error(`Gagal load ${config.type}`, e);
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
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const saveAllItems = async () => {
    setSaveMessage(null);
    try {
      const dataToSend = await Promise.all(
        data.map(async (f) => {
          let ikon = f.ikon;

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

      const res = await fetch(config.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: config.type.toUpperCase(),
          data: dataToSend,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        setSaveMessage(result.message || "Gagal menyimpan");
        return;
      }

      setSaveMessage("Data berhasil disimpan");
      await loadItems();
    } catch (e: any) {
      setSaveMessage(e?.message || "Terjadi kesalahan pada server");
    }
  };

  return (
    <div className="p-6 relative">
      <AlertMessage message={saveMessage} />
      <h1 className="text-lg sm:text-2xl font-bold mb-6">{config.title}</h1>

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
                onContext={(e: React.MouseEvent) =>
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
              <span className="text-sm mt-2">
                {config.addButtonText || `Tambah ${config.type}`}
              </span>
            </button>
          </div>
        </SortableContext>
      </DndContext>

      <div className="sticky top-4 mt-4 sm:mt-6">
        <button
          onClick={saveAllItems}
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
        <ItemModal
          data={modal}
          onClose={() => setModal(null)}
          type={config.type}
          onSave={(item: Partial<BaseItem>) => {
            setData((prev) => {
              if (item.uiId) {
                return prev.map((i) =>
                  i.uiId === item.uiId ? { ...i, ...item } : i,
                );
              }

              return [
                ...prev,
                {
                  ...(item as BaseItem),
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
