"use client";

import { useState } from "react";
import CarouselForm from "./CarouselForm";

export type CarouselPayload = {
  id?: string;
  alt?: string; // this for the name
  nomor_urut?: number;
  status?: boolean;
};

type Props = {
  triggerLabel: string;
  initialData?: CarouselPayload;
  nextOrder?: number;
};

export default function CarouselModal({
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
                {initialData?.id ? "Edit Carousel" : "Tambah Carousel"}
              </h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <CarouselForm
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
