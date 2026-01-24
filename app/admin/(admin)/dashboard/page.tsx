import React from "react";
import FAQsTable from "./FAQsTable";
import FAQModal from "./FAQModal";

const AdminDashboard = async () => {
  // nanti ganti dari API / Prisma
  const faqs = [
    {
      id: "1",
      pertanyaan: "Apa itu ATISIBADA?",
      jawaban: "ATISIBADA adalah ....",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* FAQ */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">FAQ Management</h1>

        <FAQModal triggerLabel="Tambah FAQ" />
      </div>

      <FAQsTable faqs={faqs} />
    </div>
  );
};

export default AdminDashboard;
