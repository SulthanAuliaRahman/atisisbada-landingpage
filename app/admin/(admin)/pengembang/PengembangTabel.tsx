"use client";

import React from "react";
import PengembangModal from "./PengembangModal";   // pastikan path-nya benar

type Pengembang = {
  id: string;
  nomor_urut: number | null;
  nama: string;
  jabatan: string;
  img_url: string;
  status: boolean;
};

type Props = {
  data: Pengembang[];
};

const PengembangTabel = ({ data }: Props) => {
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
                Foto
              </th>
              <th scope="col" className="w-5/12 px-4 py-3.5 text-left font-semibold text-foreground">
                Nama
              </th>
              <th scope="col" className="w-4/12 px-4 py-3.5 text-left font-semibold text-foreground">
                Jabatan
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
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-base font-medium">Belum ada data pengembang</p>
                    <p className="text-sm">Tambahkan anggota tim baru</p>
                  </div>
                </td>
              </tr>
            ) : (
              data
                .sort((a, b) => (a.nomor_urut ?? 999) - (b.nomor_urut ?? 999))
                .map((item, idx) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-indigo-300/40 transition-colors"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-foreground">
                      {idx + 1}
                    </td>

                    {/* Foto */}
                    <td className="px-4 py-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 border border-foreground/30 flex-shrink-0">
                        <img
                          src={item.img_url}
                          alt={item.nama}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = "/images/placeholder-person.jpg"; 
                          }}
                        />
                      </div>
                    </td>

                    <td className="px-4 py-4 font-medium text-foreground">
                      {item.nama}
                    </td>

                    <td className="px-4 py-4 text-foreground">
                      {item.jabatan}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-foreground">
                      {item.nomor_urut ?? "—"}
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
                        <PengembangModal
                          triggerLabel="Edit"
                          initialData={{
                            id: item.id,
                            nama: item.nama,
                            jabatan: item.jabatan,
                            img_url: item.img_url,
                            nomor_urut: item.nomor_urut ?? undefined,
                            status: item.status,
                          }}
                        />

                        <button
                          onClick={async () => {
                            if (!confirm(`Hapus ${item.nama}?`)) return;
                            await fetch(`/api/admin/pengembang/${item.id}`, { method: "DELETE" });
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
          Menampilkan {data.length} pengembang
        </div>
      )}
    </div>
  );
};

export default PengembangTabel;