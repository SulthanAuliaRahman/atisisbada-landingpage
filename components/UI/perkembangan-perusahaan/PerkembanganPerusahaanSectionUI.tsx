"use client";
import { useState } from "react";

type Item = {
  background_url: string;
  tahun: number | null;
  judul: string;
  text: string;
};

interface Props {
  data: Item[];
}

const PerkembanganPerusahaanSectionUI = ({ data }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];

  return (
    <section id="perkembangan" className="relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden scroll-mt-24">
      {/* Background */}
      <img
        src={activeItem.background_url}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 container py-16 md:py-20 text-white">
        {/* Section Title */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Perkembangan</h2>
          <div className="flex gap-2 mt-3">
            <span className="w-10 h-[3px] bg-background rounded-full" />
            <span className="w-6 h-[3px] bg-background/60 rounded-full" />
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-start justify-between gap-1 md:gap-3 lg:gap-5">
            {data.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={item.tahun}
                  onClick={() => setActiveIndex(index)}
                  className="flex flex-col items-start group flex-1 min-w-0"
                >
                  {/* Dot */}
                  <div className="flex items-center gap-1.5 md:gap-3 mb-2.5">
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-primary"
                          : "bg-white/50 group-hover:bg-white/80"
                      }`}
                    />

                    {/* tahun */}

                    <span
                      className={`text-sm md:text-base font-medium transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {item.tahun}
                    </span>
                  </div>

                  {/* Kotak Kotak*/}
                  <div
                    className={`w-full h-0.5 md:h-1 transition-all duration-400 ${
                      isActive
                        ? "bg-primary  shadow-primary/40"
                        : "bg-white/25 group-hover:bg-white/45"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Content */}
        <div className="max-w-3xl">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-5 md:mb-6">
            {activeItem.judul}
          </h3>
          <p className="text-white/80 leading-relaxed text-sm md:text-base">
            {activeItem.text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PerkembanganPerusahaanSectionUI;