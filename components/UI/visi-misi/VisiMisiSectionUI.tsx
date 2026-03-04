"use client"

import React from "react";

interface Props {
  visi: string;
  misi: string;
}

const VisiMisiSectionUI = ({ visi, misi }: Props) => {
  return (
    <section
      id="visi-misi"
      className="py-20 md:py-28 bg-background scroll-mt-24"
    >
      <div className="container">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Visi dan Misi
          </h2>

          <div className="mt-4 flex justify-center gap-2">
            <span className="w-6 h-[3px] bg-secondary rounded-full" />
            <span className="w-6 h-[3px] bg-secondary/60 rounded-full" />
            <span className="w-6 h-[3px] bg-secondary/40 rounded-full" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">

          {/* VISI */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Visi</h3>

            <div className="flex gap-2 mb-4">
              <span className="w-10 h-[3px] bg-secondary rounded-full" />
              <span className="w-6 h-[3px] bg-secondary/60 rounded-full" />
            </div>

            <p className="text-foreground/80 leading-relaxed text-justify whitespace-pre-line">
              {visi}
            </p>
          </div>

          {/* MISI */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Misi</h3>

            <div className="flex gap-2 mb-4">
              <span className="w-10 h-[3px] bg-secondary rounded-full" />
              <span className="w-6 h-[3px] bg-secondary/60 rounded-full" />
            </div>

            <p className="text-foreground/80 leading-relaxed text-justify whitespace-pre-line">
              {misi}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisiMisiSectionUI;