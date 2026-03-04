import prisma from "@/lib/prisma";
import MasterProfileForm from "./MasterProfileForm";


export const dynamic = "force-dynamic";

export default async function AdminProfile() {
  const data = await prisma.profile_Kantor.findFirst();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-xl font-bold">Setting Profile Kantor</h1>
      </div>

      <MasterProfileForm initialData={data} />
    </div>
  );
}