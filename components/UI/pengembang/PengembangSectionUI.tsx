"use client";

import PengembangCard from "@/components/PengembangCard";
import { useRef, useState, useEffect } from "react";

type Developer = {
  img_url: string;
  nama: string;
  jabatan: string;
};

interface PengembangSectionUIProps {
  developers: Developer[];
}

export default function PengembangSectionUI({
  developers,
}: PengembangSectionUIProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [itemsPerSlide, setItemsPerSlide] = useState(5);
  const [currentSlide, setCurrentSlide] = useState(0);

  // RESPONSIVE UI
  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerSlide(5); // desktop
      } else if (window.innerWidth >= 768) {
        setItemsPerSlide(3); // tablet
      } else {
        setItemsPerSlide(1); // mobile
      }
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const totalSlides = Math.ceil(developers.length / itemsPerSlide);

  const scrollToSlide = (slideIndex: number) => {
    const el = sliderRef.current;
    if (!el) return;

    const slideWidth = el.clientWidth;

    el.scrollTo({
      left: slideIndex * slideWidth,
      behavior: "smooth",
    });

    setCurrentSlide(slideIndex);
  };

  return (
    <section
      id="pengembang"
      className="py-20 md:py-28 bg-background relative scroll-mt-24"
    >
      <div className="container relative">

        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Bertemu dengan Pengembang
          </h2>

          <p className="mt-6 max-w-xl mx-auto text-sm text-foreground/70">
            Tim profesional yang membangun dan mengembangkan sistem.
          </p>
        </div>

        {/* LEFT BUTTON */}
        <button
          onClick={() => scrollToSlide(Math.max(currentSlide - 1, 0))}
          disabled={currentSlide === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                     h-10 w-10 rounded-full shadow
                     bg-background hover:bg-white disabled:opacity-50"
        >
          ‹
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={() =>
            scrollToSlide(Math.min(currentSlide + 1, totalSlides - 1))
          }
          disabled={currentSlide === totalSlides - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                     h-10 w-10 rounded-full shadow
                     bg-background hover:bg-white disabled:opacity-50"
        >
          ›
        </button>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="flex overflow-hidden scroll-smooth"
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="min-w-full flex justify-center gap-8"
            >
              {developers
                .slice(
                  slideIndex * itemsPerSlide,
                  slideIndex * itemsPerSlide + itemsPerSlide
                )
                .map((dev, index) => (
                  <div
                    key={index}
                    className=""
                    style={{
                      width: `${100 / itemsPerSlide}%`,
                      maxWidth: "280px",
                    }}
                  >
                    <PengembangCard {...dev} />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}