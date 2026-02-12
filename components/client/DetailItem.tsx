"use client";
import { useEffect, useState, useRef } from "react";
import { Item } from "@/lib/type/Item";
import { useRouter } from "next/navigation";

type Props = { id: string };

const DetailItem = ({ id }: Props) => {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const descRef = useRef<HTMLDivElement | null>(null);
  const [svgHeight, setSvgHeight] = useState(800);

  useEffect(() => {
    if (!item) return;
    if (!descRef.current) return;

    const height = descRef.current.offsetHeight;
    setSvgHeight(height + 300);
  }, [item]);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/item/${id}`);

        if (!res.ok) {
          setError("Failed to load item");
          return;
        }

        const json = await res.json();
        setItem(json.data);
      } catch (err) {
        setError("Error loading item");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );

  if (!item)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Item not found</div>
      </div>
    );

  return (
    <div className="bg-card flex justify-center p-4 pt-12 relative overflow-hidden min-h-screen">
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ top: "100" }}
        height={svgHeight}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id="trapeziumClip">
            <path
              d="
            M 0,400
            Q 0,200 200,200
            L 800,200
            Q 1000,200 1000,400
            L 1000,1000
            L 0,1000
            Z
          "
            />
          </clipPath>
        </defs>
        <rect
          width="1000"
          height="1000"
          fill="#3B82F6"
          clipPath="url(#trapeziumClip)"
        />
      </svg>

      <div className="w-full max-w-7xl relative z-10">
        {/* Ikon dan Nama di atas lingkaran - dengan margin top lebih besar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 mt-4 sm:mt-8 md:mt-12 lg:mt-16">
          <img
            src={item.ikon}
            alt={item.nama}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
          />
          <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center">
            {item.nama}
          </h1>
        </div>
        <div className="h-12 sm:h-16 md:h-20 lg:h-24"></div>
        {/* Konten deskripsi - dengan padding top lebih besar untuk mobile */}
        <div className="px-8 md:px-16 lg:px-24 pt-24 sm:pt-32 md:pt-16 pb-12 text-white">
          <div
            ref={descRef}
            className="md:text-lg leading-relaxed prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: item.deskripsi }}
          />
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity absolute bottom-8 left-8 md:left-16 lg:left-24"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-white">Kembali</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
