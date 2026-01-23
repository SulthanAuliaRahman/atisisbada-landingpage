"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type CarouselSlide = {
  id: string;
  nomor_urut: number;
  alt:string;
  url: string;
};

export default function LandingCarousel({
  slides,
}: {
  slides: CarouselSlide[];
}) {
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
                alt={slide.alt ? slide.alt :"Carousel Image"}
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
