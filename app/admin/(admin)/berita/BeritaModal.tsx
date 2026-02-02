
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BeritaForm from "./BeritaForm";

export type BeritaPayload = {
  id?: string;
  nama?: string;
  url?: string;
  deskripsi?: string | null;
  nomor_urut?: number | null;
  status?: boolean;
};

type Props = {
  triggerLabel: string;
  initialData?: BeritaPayload;
  nextOrder?: number;
};

export default function BeritaModal({ triggerLabel, initialData, nextOrder }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="regular-button py-2 px-4"
      >
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            className="absolute inset-0"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-background border rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">
                {initialData?.id ? "Edit Berita" : "Tambah Berita Baru"}
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
            </div>

            <BeritaForm
              initialData={initialData}
              nextOrder={nextOrder}
              onSuccess={() => {
                setOpen(false);
                router.refresh();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}