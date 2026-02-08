"use client";

import { useState } from "react";
import FAQListNormal from "@/components/UI/faq/FAQListNormal";
import FAQListSlider from "@/components/UI/faq/FAQListSlider";
import BeritaListNormal from "@/components/UI/berita/BeritaListNormal";
import BeritaListSlider from "@/components/UI/berita/BeritaListSlider";
import { ArrowRight } from "lucide-react";

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

type ActiveSection = "faq" | "berita" | "none";

const INITIAL_COUNT = 4;

export default function LandingFaqs({ faqs, berita }: Props) {
  // FAQ states
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [faqExpanded, setFaqExpanded] = useState(false);
  const [faqSliderReady, setFaqSliderReady] = useState(false);

  // Berita states
  const [beritaExpanded, setBeritaExpanded] = useState(false);
  const [beritaSliderReady, setBeritaSliderReady] = useState(false);

  const [activeSection, setActiveSection] = useState<ActiveSection>("none");

  const hasMoreFaq = faqs.length > INITIAL_COUNT;
  const hasMoreBerita = berita.length > INITIAL_COUNT;


  //faq handler
  const expandFaq = () => {
    setActiveSection("faq");
    setFaqExpanded(true);
    setTimeout(() => {
      setFaqSliderReady(true);
    }, 100);
  };

  const collapseFaq = () => {
    setFaqSliderReady(false);
    setTimeout(() => {
      setFaqExpanded(false);
      setActiveSection("none");
    }, 100); 
  };

  // Berita Handlers
  const expandBerita = () => {
    setActiveSection("berita");
    setBeritaExpanded(true);
    setTimeout(() => {
      setBeritaSliderReady(true);
    }, 100);
  };

  const collapseBerita = () => {
    setBeritaSliderReady(false);
    setTimeout(() => {
      setBeritaExpanded(false);
      setActiveSection("none");
    }, 100);
  };

  return (
    <section className="py-10 bg-background" id="FAQ">
      <div className="container mx-auto px-4">
        <div
          className={`
            grid gap-10 lg:gap-12
            transition-[grid-template-columns] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]
            ${activeSection !== "none" ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}
          `}
        >
          {/* FAQ COLUMN */}
          {activeSection !== "berita" && (
            <div className="relative">
              <SectionHeader title="FAQs" />

              <div
                className={`
                  transition-all duration-500 ease-in-out
                  ${faqExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none absolute inset-0"}
                `}
              >
                {faqExpanded && faqSliderReady && (
                  <FAQListSlider
                    faqs={faqs}
                    openIds={openIds}
                    setOpenIds={setOpenIds}
                    isExpanded={faqExpanded}
                    onCollapse={collapseFaq}
                  />
                )}
              </div>

              <div
                className={`
                  transition-all duration-500 ease-in-out
                  ${!faqExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-8px] pointer-events-none absolute inset-0"}
                `}
              >
                {!faqExpanded && (
                  <FAQListNormal
                    faqs={faqs.slice(0, INITIAL_COUNT)}
                    openIds={openIds}
                    setOpenIds={setOpenIds}
                  />
                )}
              </div>

              <div className="mt-6 flex justify-start">
                {!faqExpanded && hasMoreFaq && (
                  <button
                    onClick={expandFaq}
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline transition"
                  >
                    Baca selengkapnya <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* BERITA COLUMN */}
          {activeSection !== "faq" && (
            <div className="relative">
              <SectionHeader title="Berita" />

              <div
                className={`
                  transition-all duration-500 ease-in-out
                  ${beritaExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none absolute inset-0"}
                `}
              >
                {beritaExpanded && beritaSliderReady && (
                  <BeritaListSlider
                    berita={berita}
                    isExpanded={beritaExpanded}
                    onCollapse={collapseBerita}
                  />
                )}
              </div>

              <div
                className={`
                  transition-all duration-500 ease-in-out
                  ${!beritaExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-8px] pointer-events-none absolute inset-0"}
                `}
              >
                {!beritaExpanded && (
                  <BeritaListNormal Berita={berita.slice(0, INITIAL_COUNT)} />
                )}
              </div>

              {!beritaExpanded && hasMoreBerita && (
                <div className="mt-6 flex justify-start">
                  <button
                    onClick={expandBerita}
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline transition"
                  >
                    Baca Selengkapnya <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

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