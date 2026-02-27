"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "./actions";
import { signUp } from "@/lib/auth-client";
import { User } from "@/lib/type/User";

type Props = {
  triggerLabel: string;
  initialData?: User;
};
const UserModal = ({ triggerLabel, initialData }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        if (initialData?.id) {
          await updateUser(formData);
        } else {
          const res = await signUp.email({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
          });

          if (res?.error) {
            alert(res.error.message || "Gagal menambahkan user");
            return;
          }
        }

        setOpen(false);
        router.refresh();
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan");
      }
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-primary text-white px-3 py-1 rounded-md text-sm"
      >
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-background p-6 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {initialData ? "Edit User" : "Tambah User"}
            </h2>

            <form action={handleSubmit} className="space-y-4">
              {initialData?.id && (
                <input type="hidden" name="id" value={initialData.id} />
              )}

              <input
                name="name"
                defaultValue={initialData?.name}
                placeholder="Nama"
                required
                disabled={isPending}
                className="w-full border px-3 py-2 rounded-md"
              />

              <input
                name="email"
                type="email"
                defaultValue={initialData?.email}
                placeholder="Email"
                required
                disabled={isPending}
                className="w-full border px-3 py-2 rounded-md"
              />

              {!initialData && (
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  minLength={8}
                  disabled={isPending}
                  className="w-full border px-3 py-2 rounded-md"
                />
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                  className="px-3 py-1 border rounded-md"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-primary text-white px-3 py-1 rounded-md disabled:opacity-60"
                >
                  {isPending ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default UserModal;
