import prisma from "@/lib/prisma";
import InstagramTable from "./InstagramTable";
import InstagramModal from "./InstagramModal";
import InstagramSection from "@/components/server/InstagramSection.server";

export const dynamic = "force-dynamic";

const AdminDashboard = async () => {
  const instagram = await prisma.instagram.findMany({
    orderBy: { nomor_urut: "asc" },
  });

    const nextOrder =
    instagram.length > 0
      ? Math.max(...instagram.map((instagram) => instagram.nomor_urut ?? 0)) + 1 : 1;

  return (
    <div className="p-6 space-y-6">
      {/* FAQs Section */}
      <div>
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl font-bold">Instagram Managment</h1>
          <InstagramModal triggerLabel="Tambah FAQ" nextOrder={nextOrder}  />
        </div>

      <InstagramTable instagram={instagram} />

      
      </div>
      <InstagramSection/>

    </div>
  );
};

export default AdminDashboard;
