import prisma from "@/lib/prisma";
import PengembangModal from "./PengembangModal";
import PengembangTabel from "./PengembangTabel";

export const dynamic = "force-dynamic";

export default async function AdminPengembang() {
  const pengembang = await prisma.pengembang.findMany({
    orderBy: { nomor_urut: "asc" },
  });

  const nextOrder =
    pengembang.length > 0
      ? Math.max(...pengembang.map((pengembang) => pengembang.nomor_urut ?? 0)) + 1
      : 1;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-xl font-bold">Setting Pengembang</h1>

        <PengembangModal
          triggerLabel="Tambah Pengembang"
          nextOrder={nextOrder}
        />
      </div>

      <PengembangTabel data={pengembang} />
    </div>
  );
}