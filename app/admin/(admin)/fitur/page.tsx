"use client";

import { useState } from "react";
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

const initialData = [
  {
    id: "1",
    ikon: "/fitur/input-gambar.svg",
    nama: "Input Gambar",
    deskripsi: "Tambah, ubah, dan atur hak akses pengguna.",
  },
  {
    id: "2",
    ikon: "/fitur/dokumen.svg",
    nama: "Dokumen, Sertifikat dll",
    deskripsi: "Pantau data dan aktivitas secara langsung.",
  },
  {
    id: "3",
    ikon: "/fitur/terhubung.svg",
    nama: "Terhubung 24 Jam",
    deskripsi: "Hubungkan sistem dengan layanan lain.",
  },
];

export default function AdminFitur() {
  const [data, setData] = useState(initialData);
  const [modal, setModal] = useState<any>(null);
  const [context, setContext] = useState<any>(null);

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
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const isLastRowSingle = (data.length + 1) % 4 === 1;

  return (
    <div className="p-6 relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Kelola Fitur</h1>
        <button
          onClick={() => {
            console.log(data);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded sticky top-6"
        >
          Simpan
        </button>{" "}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={data.map((i) => i.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
            {data.map((item, index) => (
              <SortableItem
                key={item.id}
                item={item}
                no={index + 1}
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
              className="flex flex-col items-center justify-center border-2 border-dashed rounded text-gray-500 h-full"
            >
              <div className="text-4xl">+</div>
              <span className="text-sm">Tambah Fitur</span>
            </button>
          </div>
        </SortableContext>
      </DndContext>

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
          onSave={(item: any) => {
            setData((prev) => {
              if (item.id) {
                return prev.map((i) => (i.id === item.id ? item : i));
              }
              return [...prev, { ...item, id: crypto.randomUUID() }];
            });
            setModal(null);
          }}
        />
      )}
    </div>
  );
}

function SortableItem({ item, no, onContext }: any) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [active, setActive] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative bg-[#D9D9D9] rounded p-4 h-48 select-none"
    >
      {/* Toggle */}
      <div className="absolute top-3 right-3">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={active}
            onChange={() => setActive(!active)}
          />
          <div
            className={`w-10 h-5 rounded-full relative transition-colors ${
              active ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                active ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
        </label>
      </div>

      <div
        {...listeners}
        className="flex flex-col items-center justify-center h-full gap-2 cursor-grab"
      >
        <img src={item.ikon} className="w-16 h-16 object-contain" />
        <span className="font-medium text-sm text-center">{item.nama}</span>
      </div>

      {/* titik tiga */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onContext(e);
        }}
        className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center rounded hover:bg-black/10"
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
