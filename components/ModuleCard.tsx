"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Boxes,
  User,
  Settings,
  Handshake,
  LucideIcon,
} from "lucide-react";

type IconName = "user" | "setting" | "boxes" | "handshake";

const iconMap: Record<IconName, LucideIcon> = {
  user: User,
  setting: Settings,
  boxes: Boxes,
  handshake: Handshake,
};

type CardItem = {
  id: string;
  nama: string;
};

interface ModuleCardProps {
  icon: IconName;
  header: string;
  type: "FITUR" | "MODUL" | "MITRA";
  content: CardItem[];
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  icon,
  header,
  type,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = iconMap[icon];

  const routeMap = {
    FITUR: "/fitur",
    MODUL: "/modul",
    MITRA: "/mitra",
  };

  const baseRoute = routeMap[type];
  const unopenItemCount = 4; // config angka biar mudah di edit nya
  const openedItemCount = 6; 

  const visibleItems = isOpen ? content.slice(0, openedItemCount): content.slice(0, unopenItemCount);

  return (
    <div className="w-80 rounded-xl border border-card-border bg-card shadow-sm">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4"
      >
        <Icon className="text-primary" size={32} />

        <span className="text-left font-semibold text-foreground">
          {header}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300
        ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        md:max-h-none md:opacity-100`}
      >
        <ul className="px-16 pb-4 space-y-2">
          {visibleItems.map((item) => (
            <li key={item.id}>
              <Link
                href={`${baseRoute}/${item.id}`}
                className="text-sm text-foreground/80 hover:text-primary transition"
              >
                {item.nama}
              </Link>
            </li>
          ))}

          {isOpen &&  (
            <li>
              <Link
                href={baseRoute}
                className="text-sm font-medium text-primary hover:underline"
              >
                lihat menu →
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ModuleCard;