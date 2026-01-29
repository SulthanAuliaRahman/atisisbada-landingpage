"use client";

import { useState } from "react";
import FAQForm from "./FAQForm";

export type FAQPayload = {
  id?: string;
  pertanyaan?: string;
  jawaban?: string;
};

type Props = {
  triggerLabel: string;
  initialData?: FAQPayload;
};

export default function FAQModal({ triggerLabel, initialData }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="regular-button py-2"
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
              <h2 className="text-lg font-semibold">
                {initialData?.id ? "Edit FAQ" : "Tambah FAQ"}
              </h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <FAQForm
              initialData={initialData}
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
