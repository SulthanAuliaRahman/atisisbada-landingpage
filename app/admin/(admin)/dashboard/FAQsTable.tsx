"use client";
import FAQModal from "./FAQModal";

type Faq = {
  id: string;
  pertanyaan: string;
  jawaban: string;
};

type Props = {
  faqs: Faq[];
};

const FAQsTable = ({ faqs }: Props) => {
  return (
    <div className="bg-background border rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b">
        <h2 className="text-sm font-semibold uppercase">FAQ List</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">Pertanyaan</th>
              <th className="px-4 py-3 text-left">Jawaban</th>
              <th className="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {faqs.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  Tidak ada FAQ
                </td>
              </tr>
            )}

            {faqs.map((faq) => (
              <tr key={faq.id} className="hover:bg-gray-500">
                <td className="px-4 py-3 font-medium">
                  {faq.pertanyaan}
                </td>

                <td className="px-4 py-3 text-foreground">
                  {faq.jawaban}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <FAQModal
                      triggerLabel="Edit"
                      initialData={faq}
                    />

                    <button
                      onClick={async () => {
                        if (!confirm("Hapus FAQ ini?")) return;
                        await fetch(`/api/admin/faq/${faq.id}`, {
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

export default FAQsTable;
