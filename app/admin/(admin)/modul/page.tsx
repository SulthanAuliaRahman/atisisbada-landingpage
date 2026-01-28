import ItemManager from "@/components/admin/ItemManager";
import { ItemManagerConfig } from "@/components/admin/ItemManager/types";

export default function Page() {
  const config: ItemManagerConfig = {
    type: "modul",
    title: "Kelola Modul",
    apiEndpoint: "/api/admin/item",
    addButtonText: "Tambah Modul",
  };

  return <ItemManager config={config} />;
}

