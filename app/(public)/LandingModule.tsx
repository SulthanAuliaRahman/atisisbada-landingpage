import React from "react";
import ModuleCard from "@/components/ModuleCard";

type IconName = "user" | "setting" | "boxes" | "handshake";

type LandingCard = {
  icon: IconName;
  header: string;
  content: readonly string[];
};

type LandingSection = {
  id: string;
  cards: readonly LandingCard[];
};

const landingSections: readonly LandingSection[] = [
  {
    id: "feature",
    cards: [
      {
        icon: "setting",
        header: "Feature",
        content: [
          "Input Foto",
          "Integrasi Pelaporan",
          "Penatausahaan",
          "Chatting",
        ],
      },
    ],
  },
  {
    id: "module",
    cards: [
      {
        icon: "boxes",
        header: "Modul",
        content: [
          "Administrasi Sistem",
          "Penerimaan Pengadaan Barang",
          "Penatausahaan",
          "Pemanfaatan Barang",
          "Penghapusan Barang",
          "Pelaporan",
        ],
      },
    ],
  },
  {
    id: "mitra",
    cards: [
      {
        icon: "handshake",
        header: "Mitra",
        content: ["Kabupaten Bogor", "Kabupaten Kuningan"],
      },
    ],
  },
] as const;

const LandingModule = () => {
  const allCards = landingSections.flatMap((section) => section.cards);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12 justify-items-center">
          {allCards.map((card, index) => (
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
