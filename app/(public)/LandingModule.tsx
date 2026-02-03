"use client";

import { useEffect, useState } from "react";
import ModuleCard from "@/components/ModuleCard";

type IconName = "user" | "setting" | "boxes" | "handshake";

type Item = {
  id: string;
  urutan: number;
  ikon: IconName;
  nama: string;
  deskripsi: string;
  status: boolean;
  type: "FITUR" | "MODUL" | "MITRA";
};

type LandingCard = {
  icon: IconName;
  header: string;
  content: readonly string[];
};

const LandingModule = () => {
  const [cards, setCards] = useState<LandingCard[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/admin/item?status=true");
      const json = await res.json();

      const data: Item[] = json.data;

      const aktif = data.sort((a, b) => a.urutan - b.urutan);

      const fitur = aktif.filter((i) => i.type === "FITUR");
      const modul = aktif.filter((i) => i.type === "MODUL");
      const mitra = aktif.filter((i) => i.type === "MITRA");

      setCards([
        {
          icon: "setting",
          header: "Feature",
          content: fitur.map((i) => i.nama),
        },
        {
          icon: "boxes",
          header: "Modul",
          content: modul.map((i) => i.nama),
        },
        {
          icon: "handshake",
          header: "Mitra",
          content: mitra.map((i) => i.nama),
        },
      ]);
    };

    load();
  }, []);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12 justify-items-center">
          {cards.map((card, index) => (
            <ModuleCard
              key={index}
              icon={card.icon}
              header={card.header}
              content={card.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingModule;
