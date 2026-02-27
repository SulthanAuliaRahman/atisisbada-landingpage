"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUser(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
    },
  });

  revalidatePath("/admin/users");
}
export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}
