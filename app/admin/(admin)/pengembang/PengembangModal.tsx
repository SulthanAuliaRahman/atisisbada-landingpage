"use client";
import { useState } from "react";
import PengembangForm from "./PengembangForm";

export type PengembangPayload = {
  id?: string;
  nama?: string;
  jabatan?: string;
  nomor_urut?: number;
  status?: boolean;
  img_url?: string;
};

type Props = {
  triggerLabel: string;
  initialData?: PengembangPayload;
  nextOrder?: number;
};

export default function PengembangModal({
  triggerLabel,
  initialData,
  nextOrder,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="regular-button py-3"
      >
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-background border-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-foreground font-semibold">
                {initialData?.id ? "Edit Pengembang" : "Tambah Pengembang"}
              </h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <PengembangForm
              initialData={initialData}
              nextOrder={nextOrder}
              onSuccess={() => {
                setOpen(false);
                window.location.reload();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}