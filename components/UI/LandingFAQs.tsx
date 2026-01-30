import React from "react";
import FAQList from "@/components/FAQList";

type Faq = {
  id: string;
  pertanyaan: string;
  jawaban: string;
};

type Props = {
  faqs: Faq[];
};

export const publikasi = [
  {
    id: "publikasi 1",
    pertanyaan: "Publikasi 1",
    jawaban: "Preview? Deskripsi? Link ?"
  },
  {
    id: "publikasi 2",
    pertanyaan: "Publikasi 2",
    jawaban: "Preview? Deskripsi? Link 2 ?"
  },
];

const LandingFaqs: React.FC<Props> = ({ faqs }) => {
  return (
    <section className="py-20 bg-background" id="FAQ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* FAQs*/}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">FAQs</h2>
              <div className="mt-2 flex gap-2">
                <span className="w-15 h-1 bg-primary rounded-full" />
                <span className="w-6 h-1 bg-primary rounded-full opacity-50" />
              </div>
            </div>

            <FAQList faqs={faqs} />

            <div className="mt-6">
              <a
                href="/faqs"
                className="inline-flex items-center text-primary text-sm font-medium hover:underline"
              >
                Baca selengkapnya <span className="ml-2">→</span>
              </a>
            </div>
          </div>

          {/* Publikasi */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">Publikasi</h2>
              <div className="mt-2 flex gap-2">
                <span className="w-30 h-1 bg-primary rounded-full" />
                <span className="w-6 h-1 bg-primary rounded-full opacity-50" />
              </div>
            </div>

            <FAQList faqs={publikasi} />{/* Temporary kayak nya bakal beda apa yang di munculkan nya  */}

            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center text-primary text-sm font-medium hover:underline"
              >
                Baca selengkapnya <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        
        </div>
      </div>
    </section>
  );
};

export default LandingFaqs;
