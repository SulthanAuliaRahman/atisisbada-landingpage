// components/UI/faq/FAQListSlider.tsx
"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FAQItem from "@/components/FAQItem";

export type FAQ = {
  id: string;
  pertanyaan: string;
  jawaban: string;
};

type FAQListSliderProps = {
  faqs: FAQ[];
  openIds?: Set<string>;
  setOpenIds?: React.Dispatch<React.SetStateAction<Set<string>>>;
  isExpanded?: boolean;           // ← new
  onCollapse?: () => void;        // ← new
};

const ITEMS_PER_PAGE = 8;

export default function FAQListSlider({
  faqs,
  openIds: externalOpenIds,
  setOpenIds: externalSetOpenIds,
  isExpanded = false,
  onCollapse,
}: FAQListSliderProps) {
  const [internalOpenIds, setInternalOpenIds] = useState<Set<string>>(new Set());
  const [pageIndex, setPageIndex] = useState(0);

  const openIds = externalOpenIds ?? internalOpenIds;
  const setOpenIds = externalSetOpenIds ?? setInternalOpenIds;

  const pages = chunk(faqs, ITEMS_PER_PAGE);
  const maxIndex = pages.length - 1;
  const hasMultiplePages = pages.length > 1;

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-8 md:space-y-10">
      {/* Carousel Content */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${pageIndex * 100}%)` }}
        >
          {pages.map((page, pageIdx) => (
            <div
              key={pageIdx}
              className="min-w-full grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 items-stretch"
            >
              {/* Left column */}
<div className="flex flex-col min-h-0">
    <div className="space-y-4 flex-1">
                  {page.slice(0, 4).map((faq) => (
                    <FAQItem key={faq.id} {...faq} isOpen={openIds.has(faq.id)} onToggle={() => toggle(faq.id)} />
                  ))}
                </div>
              </div>
              {/* Left column */}
              <div className="flex flex-col min-h-0">
    <div className="space-y-4 flex-1">{/* this one move the only itself and the controll why it does that? (i want the top one it is correct*/}
                {page.slice(4, 8).map((faq) => (
                  <FAQItem
                    key={faq.id}
                    {...faq}
                    isOpen={openIds.has(faq.id)}
                    onToggle={() => toggle(faq.id)}
                  />
                ))}
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation + Back button */}
      <div className="flex flex-col items-center gap-6">
        {/* Pagination arrows */}
        {hasMultiplePages && (
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setPageIndex((i) => Math.max(i - 1, 0))}
              disabled={pageIndex === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/80 text-primary shadow-sm transition-all hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="text-sm font-medium text-muted-foreground">
              {pageIndex + 1} / {pages.length}
            </div>

            <button
              onClick={() => setPageIndex((i) => Math.min(i + 1, maxIndex))}
              disabled={pageIndex === maxIndex}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/80 text-primary shadow-sm transition-all hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Kembali button - only when expanded */}
        {isExpanded && onCollapse && (
          <button
            onClick={onCollapse}
            className="p-5 inline-flex items-center gap-2 text-primary text-sm font-medium "
          >
            <ArrowLeft size={16} /> Kembali
          </button>
        )}
      </div>
    </div>
  );
}

function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}