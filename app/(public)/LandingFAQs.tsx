import React from "react";
import FAQList from "@/components/FAQList";

export const faqs = [
  {
    id: 1,
    pertanyaan: "Apa itu ATISIBADA?",
    jawaban: "ATISIBADA adalah ....."
  },
  {
    id: 2,
    pertanyaan: "Mengapa harus ATISIBADA?",
    jawaban: "Karena ATISIBADA ...."
  },
];

export const publikasi = [
  {
    id: 1,
    pertanyaan: "Publikasi 1",
    jawaban: "Preview? Deskripsi? Link ?"
  },
  {
    id: 2,
    pertanyaan: "Publikasi 2",
    jawaban: "Preview? Deskripsi? Link 2 ?"
  },
];

const LandingFaqs: React.FC = () => {
  return (
    <section className="py-20 bg-background" id="FAQ">
      <div className="container mx-auto px-4">
        {/* FAQ & Publikasi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* FAQs*/}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">FAQs</h2>
              <div className="mt-2 flex gap-2">
                <span className="w-10 h-1 bg-primary rounded-full" />
                <span className="w-6 h-1 bg-primary rounded-full opacity-50" />
              </div>
            </div>

            <FAQList faqs={faqs} />

            <div className="mt-6">
              <a
                href="#"
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
                <span className="w-10 h-1 bg-primary rounded-full" />
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
