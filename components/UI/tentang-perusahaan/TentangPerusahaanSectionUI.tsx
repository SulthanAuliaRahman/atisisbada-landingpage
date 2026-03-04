"Use client"

import React from "react";
import Image from "next/image";

interface Props{
  tentang_text: string;
}

const TentangPerusahaanSectionUI = ({tentang_text}:Props) => {
  return (
    <section id="tentang" className="relative py-20 md:py-28 bg-item-bg overflow-hidden scroll-mt-24">
      {/* Glow effects */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-72 h-72 bg-white/30 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-72 h-72 bg-white/25 rounded-full blur-3xl" />

      <div className="container text-center text-white relative z-10">
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
          Tentang Perusahaan
        </h2>

        {/* Decor */}
        <div className="mt-4 mb-10 flex justify-center">
            <span className="w-6 h-1 bg-background rounded-full" />
            <span className="w-3 h-1 bg-item-bg rounded-full opacity-50" />

            <span className="w-12 h-1 bg-background rounded-full" />
            <span className="w-3 h-1 bg-item-bg rounded-full opacity-50" />

            <span className="w-6 h-1 bg-background rounded-full" />
            <span className="w-3 h-1 bg-item-bg rounded-full opacity-50" />
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={640}
            height={100}
            className="object-contain"
            priority
          />

          {/* <LogoPreview src="/logo.png" /> */}
        </div>

        {/* Description  TODO: Change THis Using Text Editor WYSWYG*/} 
        <div className="max-w-3xl mx-auto space-y-6 text-sm md:text-base leading-relaxed text-white/90 text-justify">
          <p>
            {tentang_text}
          </p>
        </div>

      </div>
    </section>
  );
};

export default TentangPerusahaanSectionUI;