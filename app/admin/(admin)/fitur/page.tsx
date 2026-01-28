import ItemManager from "@/components/admin/ItemManager";
import { ItemManagerConfig } from "@/components/admin/ItemManager/types";

export default function AdminFiturPage() {
  const config: ItemManagerConfig = {
    type: "fitur",
    title: "Kelola Fitur",
    apiEndpoint: "/api/admin/item",
    addButtonText: "Tambah Fitur",
  };

  return <ItemManager config={config} />;
}
