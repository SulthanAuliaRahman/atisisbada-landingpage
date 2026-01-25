import prisma from "@/lib/prisma";
import FAQsTable from "./FAQsTable";
import FAQModal from "./FAQModal";

export const dynamic = "force-dynamic";

const AdminDashboard = async () => {
  const faqs = await prisma.faq.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">FAQ Management</h1>
        <FAQModal triggerLabel="Tambah FAQ" />
      </div>

      <FAQsTable faqs={faqs} />
    </div>
  );
};

export default AdminDashboard;
