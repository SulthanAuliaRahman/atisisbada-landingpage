export type ItemType = "fitur" | "modul" | "mitra";

export interface BaseItem {
  id: string | null;
  nama: string;
  deskripsi: string;
  ikon: string;
  status: boolean;
  uiId: string;
  ikonFile?: File;
}

export interface ItemManagerConfig {
  type: ItemType;
  title: string;
  apiEndpoint: string;
  addButtonText?: string;
}

export interface ContextMenuState {
  x: number;
  y: number;
  item: BaseItem;
}

export interface ItemModalProps {
  data: Partial<BaseItem>;
  onClose: () => void;
  onSave: (item: Partial<BaseItem>) => void;
  type: ItemType;
}

export interface SortableItemProps {
  item: BaseItem;
  onContext: (e: React.MouseEvent) => void;
  onToggle: (uiId: string) => void;
}
