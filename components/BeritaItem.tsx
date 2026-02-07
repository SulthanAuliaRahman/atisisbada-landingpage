import { ArrowRight } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  url: string;
}

const BeritaItem: React.FC<Props> = ({ title, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        block rounded-xl border border-border/60 bg-card
        px-6 py-4 transition hover:border-primary hover:bg-muted
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-foreground">
          {title}
        </span>

        <span className="text-primary text-sm"><ArrowRight/></span>
      </div>
    </a>
  );
};

export default BeritaItem;
