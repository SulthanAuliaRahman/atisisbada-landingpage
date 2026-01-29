import React from "react";

interface FAQItemProps {
  pertanyaan: string;
  jawaban: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  pertanyaan,
  jawaban,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="rounded-xl md:rounded-2xl border border-border/60 bg-card overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`
          flex w-full items-center justify-between
          px-5 py-4 md:px-6 md:py-5  
          text-left font-medium text-foreground
          transition-colors border border-border/30
        `}
      >

        

        <span className="font-medium text-foreground text-base md:text-lg leading-tight ">
          {pertanyaan}
        </span>

        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full bg-primary transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            className="w-4 h-4 text-foregrounde"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Jawaban */}
      <div
        className={`
          grid transition-all duration-300 ease-in-out
          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        <div className="overflow-hidden bg-blue-200/60">
          <div className="border-t border-border/40 px-6 py-4 text-sm text-muted-foreground leading-relaxed">
            {jawaban}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
