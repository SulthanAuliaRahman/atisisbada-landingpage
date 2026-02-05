"use client";
import InstagramModal from "./InstagramModal";

type Instagram = {
  id?: string;
  url?: string;
  nama?: string;
  deskripsi?: string;
  nomor_urut: number | null;
  status?: boolean;
};

type Props = {
  instagram: Instagram[];
};

const InstagramTable = ({ instagram }: Props) => {
  return (
    <div className="bg-background border border-foreground rounded-xl shadow-sm overflow-hidden">

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-foreground text-sm">
          <thead className="bg-background">
            <tr>
              <th scope="col" className="w-10 px-4 py-3.5 text-left font-semibold text-foreground">
                No
              </th>
              <th scope="col" className="w-1/12 px-4 py-3.5 text-left font-semibold text-foreground">
                Urut
              </th>
              <th scope="col" className="w-4/12 px-4 py-3.5 text-left font-semibold text-foreground">
               nama
              </th>
              <th scope="col" className="w-4/12 px-4 py-3.5 text-left font-semibold text-foreground">
                deskripsi
              </th>
              <th scope="col" className="w-1/12 px-4 py-3.5 text-left font-semibold text-foreground">
                Status
              </th>
              <th scope="col" className="w-2/12 px-4 py-3.5 text-left font-semibold text-foreground">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-foreground  bg-background">
            {instagram.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-base font-medium">Belum ada Postingan Instagram</p>
                    <p className="text-sm">Tambahkan Instagram baru dengan tombol di atas</p>
                  </div>
                </td>
              </tr>
            ) : (
              instagram.map((instagram, index) => (
                <tr
                  key={instagram.id}
                  className="group hover:bg-blue-300/60 transition-colors"
                >
                  <td className="whitespace-nowrap px-4 py-4 text-foreground">
                    {index + 1}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-foreground">
                    {instagram.nomor_urut ?? '-'}
                  </td>

                  <td className="px-4 py-4 font-medium text-foreground">
                    {instagram.nama ?? '-'}
                  </td>

                  <td className="px-4 py-4 text-foreground max-w-md">
                    <div className="line-clamp-2">
                      {instagram.deskripsi ?? '-'}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      instagram.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {instagram.status ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex items-center gap-3">
                      <InstagramModal
                        triggerLabel="Edit"
                        initialData={instagram}
                      />

                      <button
                        onClick={async () => {
                          if (!confirm("Yakin ingin menghapus Instagram ini?")) return;

                          try {
                            const res = await fetch(`/api/admin/instagram/${instagram.id}`, {
                              method: "DELETE",
                            });

                            if (res.ok) {
                              window.location.reload();
                            } else {
                              alert("Gagal menghapus Instagram");
                            }
                          } catch (err) {
                            alert("Terjadi kesalahan");
                          }
                        }}
                        className="text-red-600 bg-red-100 rounded-full px-2 py-0.5"
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

      {/* Optional footer with count */}
      {instagram.length > 0 && (
        <div className="px-6 py-3 text-xs text-foreground bg-background border-t">
          Menampilkan {instagram.length} pertanyaan
        </div>
      )}
    </div>
  );
};

export default InstagramTable;