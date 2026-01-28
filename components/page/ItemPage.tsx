"use client";

import { useEffect, useState } from "react";
import ItemSlider from "@/components/client/ItemSlider";
import LandingModule from "@/app/(public)/LandingModule";
import { Item } from "@/lib/type/Item";
const pageConfig = {
  FITUR: {
    title: "Fitur",
  },
  MODUL: {
    title: "Modul",
  },
  MITRA: {
    title: "Mitra",
  },
};
type ItemType = "FITUR" | "MODUL" | "MITRA";

type Props = {
  type: ItemType;
};

const ItemPage = ({ type }: Props) => {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/admin/item?type=${type}&status=true`);
      const json = await res.json();
      setData(json.data);
    };
    load();
  }, [type]);

  return (
    <>
      <ItemSlider data={data} title={pageConfig[type].title} />
      <LandingModule />
    </>
  );
};

export default ItemPage;
