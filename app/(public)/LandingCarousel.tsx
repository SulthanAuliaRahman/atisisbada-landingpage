"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type CarouselSlide = {
  id: string;
  nomor_urut: number;
  url: string;
};

const slides: CarouselSlide[] = [
  {
    id: "1",
    nomor_urut: 1,
    url: "/carousel/4_keunggulan_atisisbada.png",
  },
  {
    id: "2",
    nomor_urut: 2,
    url: "/carousel/fungsi_utama_atisisbada.png",
  },
  {
    id: "3",
    nomor_urut: 3,
    url: "/carousel/kenapa_atisisbada_dibutuhkan.png",
  },
].sort((firstSlide, secondSlide) => {
  return firstSlide.nomor_urut - secondSlide.nomor_urut;
});


export default function LandingCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = slides.length;

  const next = () => setCurrent((i) => (i + 1) % total);

  useEffect(() => {
    if (paused || total <= 1) return;

    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, total]);

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/9] lg:aspect-[21/9]">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={slide.id} className="relative min-w-full h-full">
              <Image
                src={slide.url}
                alt={"Carousel image"}
                fill
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === current ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
