"use client";

import React from "react";
import CarouselModal from "./CarouselModal";

type CarouselSlide = {
  id: string;
  nomor_urut: number | null;
  url: string;
  alt: string | null;
  status: boolean;
};

type Props = {
  slides: CarouselSlide[];
};

const CarouselTabel = ({ slides }: Props) => {
  return (
    <div className="bg-background border rounded-xl shadow-sm">
      {/* Header (similar to card-body top spacing) */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-sm font-semibold text-foreground uppercase">
          Carousel List
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-background text-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Nama Carousel</th>
              <th className="px-4 py-3 text-left font-medium">Nomor Urut</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {slides.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            )}

            {slides.map((slide, index) => (
              <tr
                key={slide.id}
                className="hover:bg-gray-500 transition bg-background"
              >
                <td className="px-4 py-3">{slide.alt}</td>

                <td className="px-4 py-3">{slide.nomor_urut ?? "-"}</td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                      ${
                        slide.status
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {slide.status ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <CarouselModal
                      triggerLabel="Edit"
                      initialData={{
                        id: slide.id,
                        alt: slide.alt ?? "Carousel Image",
                        nomor_urut: slide.nomor_urut ?? undefined,
                        status: slide.status,
                      }}
                    />

                    <button
                      onClick={async () => {
                        if (!confirm("Hapus carousel ini?")) return;
                        console.log("in button")
                        await fetch(`/api/admin/profile/${slide.id}`, {
                          method: "DELETE",
                        });
                        window.location.reload();
                      }}
                      className="text-red-600 bg-red-100 rounded-full px-2 py-0.5"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarouselTabel;
