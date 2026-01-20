"use client"

import React, { useState } from "react";
import FAQItem from "./FAQItem";

export interface FAQ {
  id: number;
  pertanyaan: string;
  jawaban: string;
}

interface FAQListProps {
  faqs: FAQ[];
}

const FAQList: React.FC<FAQListProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <FAQItem
          key={faq.id}
          pertanyaan={faq.pertanyaan}
          jawaban={faq.jawaban}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default FAQList;

