"use client";

import FAQItem from "@/components/FAQItem";
import { useState } from "react";

export type FAQ = {
  id: string;
  pertanyaan: string;
  jawaban: string;
};

export default function FAQListNormal({
  faqs,
  openIds,
  setOpenIds,
}: {
  faqs: FAQ[];
  openIds: Set<string>;
  setOpenIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  const toggle = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {faqs.map(faq => (
        <FAQItem
          key={faq.id}
          {...faq}
          isOpen={openIds.has(faq.id)}
          onToggle={() => toggle(faq.id)}
        />
      ))}
    </div>
  );
}
