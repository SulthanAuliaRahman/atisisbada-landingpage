"use client";

import { useEffect, useState } from "react";
import { Item } from "@/lib/type/Item";
import Link from "next/link";

type Props = {
  data: Item[];
  title: String;
};

const ItemSlider = ({ data = [], title }: Props) => {
  const [itemsPerSlide, setItemsPerSlide] = useState(8);
  const [slide, setSlide] = useState(0);

  const getItemsPerSlide = () => {
    if (window.innerWidth < 640) return 4;
    if (window.innerWidth < 1024) return 6;
    return 8;
  };

  useEffect(() => {
    const update = () => setItemsPerSlide(getItemsPerSlide());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setSlide(0);
  }, [data, itemsPerSlide]);

  const totalSlide = data.length ? Math.ceil(data.length / itemsPerSlide) : 1;

  return (
    <div className="relative min-h-[420px] lg:h-[745px] px-6 py-15 bg-item-bg overflow-hidden text-white">
      {" "}
      <div className="pointer-events-none absolute -top-32 -right-32 w-70 h-70 bg-white/30 rounded-full blur-3xl" />{" "}
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-70 h-70 bg-white/25 rounded-full blur-3xl" />
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8">
        {title}
      </h2>
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalSlide }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full bg-[#045E92] mb-10 ${i === slide ? "w-10" : "w-4"}`}
          />
        ))}
      </div>
      <div className="relative">
        {slide > 0 && (
          <button
            onClick={() => setSlide(slide - 1)}
            className="absolute -left-2 top-1/2 z-20 text-4xl"
          >
            ‹
          </button>
        )}

        {slide < totalSlide - 1 && (
          <button
            onClick={() => setSlide(slide + 1)}
            className="absolute -right-2 top-1/2 z-20 text-4xl"
          >
            ›
          </button>
        )}

        <div className="overflow-hidden min-h-[260px] relative z-10">
          <div
            className="flex transition-transform duration-300"
            style={{
              width: `${totalSlide * 100}%`,
              transform: `translateX(-${slide * (100 / totalSlide)}%)`,
            }}
          >
            {Array.from({ length: totalSlide }).map((_, index) => {
              const slideData = data.slice(
                index * itemsPerSlide,
                index * itemsPerSlide + itemsPerSlide,
              );

              return (
                <div
                  key={index}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / totalSlide}%` }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[220px]">
                    {slideData.map((item) => (
                      <Link
                        key={item.id}
                        href={`/${item.type.toLowerCase()}/${item.id}`}
                      >
                        <div className="flex flex-col items-center gap-3 p-10 rounded-lg cursor-pointer transition-colors hover:bg-[#045E92] hover:shadow-md">
                          <img
                            src={item.ikon}
                            alt={item.nama}
                            className="w-30 h-30 mb-6"
                          />
                          <span>{item.nama}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSlider;
