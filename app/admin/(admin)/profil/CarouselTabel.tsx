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
    <div className="bg-background border border-foreground  rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-foreground text-sm">
          <thead className="bg-background">
            <tr>
              <th scope="col" className="w-10 px-4 py-3.5 text-left font-semibold text-foreground">
                No
              </th>
              <th scope="col" className="w-5/12 px-4 py-3.5 text-left font-semibold text-foreground">
                Nama Gambar
              </th>
              <th scope="col" className="w-24 px-4 py-3.5 text-left font-semibold text-foreground">
                Urutan
              </th>
              <th scope="col" className="w-28 px-4 py-3.5 text-left font-semibold text-foreground">
                Status
              </th>
              <th scope="col" className="w-32 px-4 py-3.5 text-left font-semibold text-foreground">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-foreground bg-background">
            {slides.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-base font-medium">Belum ada slide carousel</p>
                    <p className="text-sm">Tambahkan gambar baru untuk hero section</p>
                  </div>
                </td>
              </tr>
            ) : (
              slides
                .sort((a, b) => (a.nomor_urut ?? 999) - (b.nomor_urut ?? 999))
                .map((slide, idx) => (
                  <tr
                    key={slide.id}
                    className="group hover:bg-indigo-300/40 transition-colors"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-foreground">
                      {idx + 1}
                    </td>

                    {/* Preview + alt */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded overflow-hidden bg-gray-100 border border-foreground flex-shrink-0">
                          <img
                            src={slide.url}
                            alt={slide.alt ?? "Carousel slide"}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-foreground truncate max-w-xs">
                            {slide.alt || <span className="text-foreground italic">No alt text</span>}
                          </div>

                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-foreground">
                      {slide.nomor_urut ?? "—"}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <span
                        className={`
                          inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${
                            slide.status
                              ? "bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20"
                              : "bg-gray-100 text-foreground ring-1 ring-inset ring-gray-500/20"
                          }
                        `}
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
                ))
            )}
          </tbody>
        </table>
      </div>

      {slides.length > 0 && (
        <div className="px-6 py-3 text-xs text-foreground bg-background border-t">
          Menampilkan {slides.length} slide
        </div>
      )}
    </div>
  );
};

export default CarouselTabel;