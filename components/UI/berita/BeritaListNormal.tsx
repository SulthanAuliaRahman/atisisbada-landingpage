"use client";

import BeritaItem from "@/components/BeritaItem";

type Berita = {
  id: string;
  nama: string;
  url: string;
};

export default function BeritaListNormal({
  Berita,
}: {
  Berita: Berita[];
}) {
  return (
    <div className="space-y-4">
      {Berita.map(berita => (
        <BeritaItem
          key={berita.id}
          title={berita.nama}
          url={berita.url}
        />
      ))}
    </div>
  );
}
