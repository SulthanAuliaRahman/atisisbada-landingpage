"use client";
import { useState } from "react";
import PerkembanganForm from "./PerkembanganForm";

export type PerkembanganPayload = {
  id?: string;
  judul?: string;
  text?: string;
  tahun?: number;
  status?: boolean;
  background_url?: string;
};

type Props = {
  triggerLabel: string;
  initialData?: PerkembanganPayload;
  nextTahun?: number;
};

export default function PerkembanganModal({
  triggerLabel,
  initialData,
  nextTahun,
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
                {initialData?.id ? "Edit Perkembangan" : "Tambah Perkembangan"}
              </h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <PerkembanganForm
              initialData={initialData}
              nextTahun={nextTahun}
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