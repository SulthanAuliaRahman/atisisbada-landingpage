"use client";

import React from "react";
import BeritaItem from "./BeritaItem";

type Berita = {
  id: string;
  nama: string;
  url: string;
};

const BeritaList = ({ berita }: { berita: Berita[] }) => {
  return (
    <div className="space-y-4">
      {berita.map((item) => (
        <BeritaItem
          key={item.id}
          title={item.nama}
          url={item.url}
        />
      ))}
    </div>
  );
};

export default BeritaList;
