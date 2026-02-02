"use client";
import { useRouter } from "next/navigation";
import BeritaModal from "./BeritaModal";

type Berita = {
  id: string;
  nama: string;
  url: string;
  deskripsi: string | null;
  nomor_urut: number | null;
  status: boolean;
};

type Props = {
  berita: Berita[];
};


export default function BeritaTable({ berita }: Props) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus berita ini?")) return;

    const res = await fetch(`/api/admin/berita/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh(); // TODO implement this to other feature (its faster because only the data is revalidated)
    } else {
      alert("Gagal menghapus berita");
    }
  };

  return (
    <div className="bg-background border rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="w-10 px-4 py-3 text-left font-semibold">No</th>
              <th className="w-16 px-4 py-3 text-left font-semibold">Urut</th>
              <th className="w-5/12 px-4 py-3 text-left font-semibold">
                Judul
              </th>
              <th className="w-4/12 px-4 py-3 text-left font-semibold">
                Deskripsi
              </th>
              <th className="w-20 px-4 py-3 text-left font-semibold">Status</th>
              <th className="w-28 px-4 py-3 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {berita.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-16 text-center text-muted-foreground"
                >
                  Belum ada data berita
                </td>
              </tr>
            ) : (
              berita.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">{item.nomor_urut ?? "-"}</td>
                  <td className="px-4 py-4 font-medium">
                    {item.nama}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      <br />
                      {item.url}
                    </a>
                  </td>
                  <td className="px-4 py-4 max-w-md">
                    <div className="line-clamp-2">{item.deskripsi || "-"}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.status ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-3">
                      <BeritaModal triggerLabel="Edit" initialData={item} />
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {berita.length > 0 && (
        <div className="px-6 py-3 text-xs text-foreground bg-background border-t">
          Menampilkan {berita.length} pertanyaan
        </div>
      )}
    </div>
  );
}
