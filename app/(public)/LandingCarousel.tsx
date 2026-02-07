"use client";

import { useEffect, useState } from "react";

type CarouselSlide = {
  id: string;
  nomor_urut: number;
  alt: string;
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
      className="relative w-full py-0 bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Container that centers the carousel and limits max width */}
      <div className="mx-auto w-full max-w">
        <div className="relative aspect-[21/9] lg:aspect-[21/8] max-h-[740px] lg:max-h-[860px] xl:max-h-[940px] mx-auto">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={slide.id} className="relative min-w-full h-full">
                <img
                  src={slide.url}
                  alt={slide.alt || "Carousel Image"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-3 w-3 rounded-full transition-all ${
                  i === current ? "bg-white scale-125 shadow-md" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
