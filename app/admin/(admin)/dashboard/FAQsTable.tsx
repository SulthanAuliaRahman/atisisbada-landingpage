"use client";
import FAQModal from "./FAQModal";

type Faq = {
  id: string;
  pertanyaan: string;
  jawaban: string;
  nomor_urut: number | null;
  status: boolean;
};

type Props = {
  faqs: Faq[];
};

const FAQsTable = ({ faqs }: Props) => {
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
                Pertanyaan
              </th>
              <th scope="col" className="w-4/12 px-4 py-3.5 text-left font-semibold text-foreground">
                Jawaban
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
            {faqs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-base font-medium">Belum ada FAQ</p>
                    <p className="text-sm">Tambahkan FAQ baru dengan tombol di atas</p>
                  </div>
                </td>
              </tr>
            ) : (
              faqs.map((faq, index) => (
                <tr
                  key={faq.id}
                  className="group hover:bg-blue-300/60 transition-colors"
                >
                  <td className="whitespace-nowrap px-4 py-4 text-foreground">
                    {index + 1}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-foreground">
                    {faq.nomor_urut ?? '-'}
                  </td>

                  <td className="px-4 py-4 font-medium text-foreground">
                    {faq.pertanyaan}
                  </td>

                  <td className="px-4 py-4 text-foreground max-w-md">
                    <div className="line-clamp-2">
                      {faq.jawaban}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      faq.status 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {faq.status ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex items-center gap-3">
                      <FAQModal
                        triggerLabel="Edit"
                        initialData={faq}
                      />

                      <button
                        onClick={async () => {
                          if (!confirm("Yakin ingin menghapus FAQ ini?")) return;

                          try {
                            const res = await fetch(`/api/admin/faq/${faq.id}`, {
                              method: "DELETE",
                            });

                            if (res.ok) {
                              window.location.reload();
                            } else {
                              alert("Gagal menghapus FAQ");
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
      {faqs.length > 0 && (
        <div className="px-6 py-3 text-xs text-foreground bg-background border-t">
          Menampilkan {faqs.length} pertanyaan
        </div>
      )}
    </div>
  );
};

export default FAQsTable;