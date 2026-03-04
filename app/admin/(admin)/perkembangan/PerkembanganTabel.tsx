"use client";
import React from "react";
import PerkembanganModal from "./PerkembanganModal";

type Perkembangan = {
  id: string;
  tahun: number | null;
  judul: string;
  text: string;
  background_url: string;
  status: boolean;
};

type Props = {
  data: Perkembangan[];
};

const PerkembanganTabel = ({ data }: Props) => {
  return (
    <div className="bg-background border border-foreground rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-foreground text-sm">
          <thead className="bg-background">
            <tr>
              <th scope="col" className="w-10 px-4 py-3.5 text-left font-semibold text-foreground">
                No
              </th>
              <th scope="col" className="w-28 px-4 py-3.5 text-left font-semibold text-foreground">
                Background
              </th>
              <th scope="col" className="w-5/12 px-4 py-3.5 text-left font-semibold text-foreground">
                Judul
              </th>
              <th scope="col" className="w-4/12 px-4 py-3.5 text-left font-semibold text-foreground">
                Teks
              </th>
              <th scope="col" className="w-24 px-4 py-3.5 text-left font-semibold text-foreground">
                Tahun
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
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-base font-medium">Belum ada data perkembangan</p>
                    <p className="text-sm">Tambahkan entri baru</p>
                  </div>
                </td>
              </tr>
            ) : (
              data
                .sort((a, b) => (a.tahun ?? 9999) - (b.tahun ?? 9999))
                .map((item, idx) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-indigo-300/40 transition-colors"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-foreground">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-16 h-10 rounded overflow-hidden bg-gray-100 border border-foreground flex-shrink-0">
                        <img
                          src={item.background_url}
                          alt={item.judul}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4 font-medium text-foreground">
                      {item.judul}
                    </td>
                    <td className="px-4 py-4 text-foreground line-clamp-2">
                      {item.text}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-foreground">
                      {item.tahun ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span
                        className={`
                          inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${
                            item.status
                              ? "bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20"
                              : "bg-gray-100 text-foreground ring-1 ring-inset ring-gray-500/20"
                          }
                        `}
                      >
                        {item.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <PerkembanganModal
                          triggerLabel="Edit"
                          initialData={{
                            id: item.id,
                            judul: item.judul,
                            text: item.text,
                            tahun: item.tahun ?? undefined,
                            background_url: item.background_url,
                            status: item.status,
                          }}
                        />
                        <button
                          onClick={async () => {
                            if (!confirm(`Hapus "${item.judul}"?`)) return;
                            await fetch(`/api/admin/perkembangan/${item.id}`, {
                              method: "DELETE",
                            });
                            window.location.reload();
                          }}
                          className="text-red-600 bg-red-100 rounded-full px-2 py-0.5 text-sm"
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

      {data.length > 0 && (
        <div className="px-6 py-3 text-xs text-foreground bg-background border-t">
          Menampilkan {data.length} data perkembangan
        </div>
      )}
    </div>
  );
};

export default PerkembanganTabel;