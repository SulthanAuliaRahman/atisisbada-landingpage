"use client";

import { useEffect, useState } from "react";
import { Item } from "@/lib/type/Item";
import { useRouter } from "next/navigation";
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

  let html = "";
  let css = "";

  try {
    const parsed = JSON.parse(item.deskripsi);

    html = parsed.html || "";
    css = parsed.css || "";
  } catch {
    html = item.deskripsi || "";
  }

  const cleanHtml = html
    .replace(/<\/?body[^>]*>/g, "")
    .replace(/<\/?html[^>]*>/g, "")
    .replace(/\\&quot;/g, "")
    .replace(/\\"/g, '"')
    .trim();

  let first = "";
  let rest = cleanHtml;

  const match = cleanHtml.match(/<p[^>]*>.*?<\/p>/i);

  if (match) {
    first = match[0];
    rest = cleanHtml.replace(first, "");
  }

  return (
    <div className="w-full">
      {variant === "fimod" && <DetailFiturModul item={item} first={first} />}

      {variant === "mitra" && <DetailMitra item={item} first={first} />}

      <section className="w-full bg-white py-20 px-6">
        <div className="w-full max-w-[900px] mx-auto">
          {css && (
            <style
              dangerouslySetInnerHTML={{ __html: css }}
              suppressHydrationWarning
            />
          )}

          <div className="w-full [&_img]:max-w-[900px] [&_iframe]:w-full [&_*]:box-border">
            <div dangerouslySetInnerHTML={{ __html: rest }} />
          </div>

          <div className="px-6">
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
