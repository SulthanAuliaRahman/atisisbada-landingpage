import ItemManager from "@/components/admin/ItemManager";
import { ItemManagerConfig } from "@/components/admin/ItemManager/types";

export default function Page() {
  const config: ItemManagerConfig = {
    type: "mitra",
    title: "Kelola Mitra",
    apiEndpoint: "/api/admin/item",
    addButtonText: "Tambah Mitra",
  };

  return <ItemManager config={config} />;
}
