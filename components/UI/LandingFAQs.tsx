"use client";

import { useState } from "react";
import FAQListNormal from "@/components/UI/faq/FAQListNormal";
import FAQListSlider from "@/components/UI/faq/FAQListSlider";
import BeritaList from "@/components/BeritaList";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Faq = {
  id: string;
  pertanyaan: string;
  jawaban: string;
};

type Berita = {
  id: string;
  nama: string;
  url: string;
};

type Props = {
  faqs: Faq[];
  berita: Berita[];
};

const INITIAL_COUNT = 4;

export default function LandingFaqs({ faqs, berita }: Props) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(false);
  const [sliderActive, setSliderActive] = useState(false);

  const hasMore = faqs.length > INITIAL_COUNT;

  const expand = () => {
    setExpanded(true);
    setTimeout(() => setSliderActive(true), 100);
  };

  const collapse = () => {
    setSliderActive(false);
    setTimeout(() => setExpanded(false), 100);
  };

  return (
    <section
      className={`py-10 bg-background`}
      id="FAQ"
    >
      <div className="container mx-auto px-4">
        <div
          className={`
    grid gap-12 transition-[grid-template-columns]
    duration-700 ease-[cubic-bezier(.22,.61,.36,1)]
    ${sliderActive ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}
  `}
        >
          {/* FAQ */}
          <div className="relative">
            <SectionHeader title="FAQs" />
            <div className="relative">
              {/* Normal */}
              <div
                className={`
          transition-all duration-300 ease-in-out
          ${
            sliderActive
              ? "opacity-0 h-0 overflow-hidden pointer-events-none"
              : "opacity-100 h-auto"
          }
        `}
              >
                <FAQListNormal
                  faqs={faqs.slice(0, INITIAL_COUNT)}
                  openIds={openIds}
                  setOpenIds={setOpenIds}
                />
              </div>

              {/* Slider */}
              <div
                className={`
          transition-all duration-300 ease-in-out
          ${
            sliderActive
              ? "opacity-100 h-auto"
              : "opacity-0 h-0 overflow-hidden pointer-events-none"
          }
        `}
              >
                <FAQListSlider
                  faqs={faqs}
                  openIds={openIds}
                  setOpenIds={setOpenIds}
                  isExpanded={expanded}
                  onCollapse={collapse}
                />
              </div>

              {/* Controls – only show "Baca selengkapnya" when not expanded */}
              <div className="relative z-20 mt-6 flex justify-start">
                {!expanded && hasMore && (
                  <button
                    onClick={expand}
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium"
                  >
                    Baca selengkapnya <ArrowRight />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Publikasi – hide when sliderActive instead of expanded */}
          {!sliderActive && (
            <div>
              <SectionHeader title="Publikasi" />
              <BeritaList berita={berita} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

//helper
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-2 flex gap-2">
        <span className="w-12 h-1 bg-primary rounded-full" />
        <span className="w-6 h-1 bg-primary rounded-full opacity-50" />
      </div>
    </div>
  );
}
