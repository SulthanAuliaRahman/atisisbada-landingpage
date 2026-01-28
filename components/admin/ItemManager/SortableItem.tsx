import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableItemProps } from "./types";

export default function SortableItem({
  item,
  onContext,
  onToggle,
}: SortableItemProps) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: item.uiId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative bg-white rounded-lg p-4 h-48 select-none shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Drag handle */}
      <div {...listeners} className="absolute inset-0 cursor-grab" />

      {/* Toggle */}
      <div className="absolute top-3 right-3 z-10">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={item.status}
            onChange={() => onToggle(item.uiId)}
          />
          <div
            className={`w-10 h-5 rounded-full relative transition-colors ${
              item.status ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                item.status ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
        </label>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full gap-2 pointer-events-none">
        <img src={item.ikon} className="w-16 h-16 object-contain" />
        <span className="font-medium text-sm text-center">{item.nama}</span>
      </div>

      {/* Context menu */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onContext(e);
        }}
        className="absolute bottom-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded hover:bg-black/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
        </svg>
      </button>
    </div>
  );
}
