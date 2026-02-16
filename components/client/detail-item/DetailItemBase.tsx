"use client";

import { useEffect, useState } from "react";
import { Item } from "@/lib/type/Item";
import { useRouter } from "next/navigation";
import { getDescriptionParts } from "@/app/utils/GetDesc";
import DetailFiturModul from "@/components/client/detail-item/DetailFiturModul";
import DetailMitra from "@/components/client/detail-item/DetailMitra";

type Props = {
  id: string;
  variant: "fimod" | "mitra";
};

const DetailItemBase = ({ id, variant }: Props) => {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/item/${id}`);
        if (!res.ok) {
          setError("Failed to load item");
          return;
        }
        const json = await res.json();
        setItem(json.data);
      } catch (err) {
        setError("Error loading item");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Item not found
      </div>
    );

  const { first, rest } = getDescriptionParts(item.deskripsi);

  return (
    <div className="w-full">
      {variant === "fimod" && <DetailFiturModul item={item} first={first} />}

      {variant === "mitra" && <DetailMitra item={item} first={first} />}

      <section className="w-full bg-white py-20">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[900px] px-6 text-justify">
            <div
              className="prose max-w-none [&_iframe]:w-full [&_iframe]:aspect-video"
              dangerouslySetInnerHTML={{ __html: rest }}
            />

            <button
              onClick={() => router.back()}
              className="mt-10 text-blue-600 hover:opacity-80"
            >
              ← Kembali
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailItemBase;
