import prisma from "@/lib/prisma";
import UserTable from "./UserTable";

export default async function Page() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <UserTable users={users} />
    </div>
  );
}
