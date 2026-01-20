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
    <div className="border border-border-colour bg-card rounded-full px-6 py-4 flex flex-col">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-medium text-foreground text-sm md:text-base">
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

      {isOpen && (
        <div className="mt-4 text-sm text-foreground leading-relaxed px-1">
          {jawaban}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
