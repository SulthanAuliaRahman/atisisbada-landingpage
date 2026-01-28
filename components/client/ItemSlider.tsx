"use client";

import { useEffect, useState } from "react";
import { Item } from "@lib/type/Item";

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
    <div className="bg-[#D9D9D9] px-6 py-20 min-h-[420px]">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8">
        {title}
      </h2>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalSlide }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full bg-[#0489D4] ${i === slide ? "w-10" : "w-4"}`}
          />
        ))}
      </div>

      <div className="relative">
        {slide > 0 && (
          <button
            onClick={() => setSlide(slide - 1)}
            className="absolute left-0 top-1/2 text-4xl"
          >
            ‹
          </button>
        )}

        {slide < totalSlide - 1 && (
          <button
            onClick={() => setSlide(slide + 1)}
            className="absolute right-0 top-1/2 text-4xl"
          >
            ›
          </button>
        )}

        <div className="overflow-hidden min-h-[260px]">
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
                      <div
                        key={item.id}
                        className="flex flex-col items-center gap-3"
                      >
                        <img
                          src={item.ikon}
                          alt={item.nama}
                          className="w-16 h-16"
                        />
                        <span>{item.nama}</span>
                      </div>
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
