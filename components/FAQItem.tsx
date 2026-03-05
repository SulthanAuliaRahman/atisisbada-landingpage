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
    <div
      className={`
        rounded-xl border border-border/60 bg-card
        overflow-hidden transition
        hover:border-primary hover:bg-muted
      `}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="
          flex w-full items-center justify-between
          px-6 py-3.5
          text-left transition-colors
        "
      >
        <span className="text-base font-bold text-foreground pr-4">
          {pertanyaan}
        </span>

        <span
          className={`
            flex items-center justify-center
            w-7 h-7 rounded-full bg-primary/10 text-primary
            transition-transform duration-200 flex-shrink-0
            ${isOpen ? "rotate-180" : ""}
          `}
        >
          {/*  Arrow Icon */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Jawaban */}
      <div
        className={`
          transition-[max-height,opacity] 
          duration-300 ease-in-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >

        <div className="bg-secondary shadow-2xl rounded-xl border-t border-border/60 px-6 py-2 pb-5 pt-4  text-sm text-muted-foreground text-white leading-relaxed border-t border-border/40">
          {jawaban}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;