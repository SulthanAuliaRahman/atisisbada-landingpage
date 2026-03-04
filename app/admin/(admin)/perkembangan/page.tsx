import prisma from "@/lib/prisma";
import PerkembanganModal from "./PerkembanganModal";
import PerkembanganTabel from "./PerkembanganTabel";

export const dynamic = "force-dynamic";

export default async function AdminPerkembangan() {
  const items = await prisma.perkembangan.findMany({
    orderBy: { tahun: "asc" },
  });

  const nextTahun =
    items.length > 0
      ? Math.max(...items.map((item) => item.tahun ?? 0)) + 1
      : new Date().getFullYear();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-xl font-bold">Setting Perkembangan</h1>
        <PerkembanganModal
          triggerLabel="Tambah Perkembangan"
          nextTahun={nextTahun}
        />
      </div>
      <PerkembanganTabel data={items} />
    </div>
  );
}