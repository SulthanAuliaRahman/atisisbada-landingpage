import prisma from "@/lib/prisma";
import LandingCarousel from "@/app/(public)/LandingCarousel";
import CarouselTabel from "./CarouselTabel";
import CarouselModal from "./CarouselModal";

export const dynamic = "force-dynamic"; // agar admin page nya selalu sinkron dengan DB

export default async function AdminProfil() {
  const slides = await prisma.homeCarousel.findMany({
    orderBy: { nomor_urut: "asc" },
  });

  const previewSlides = slides
    .filter((slides) => slides.status && slides.nomor_urut !== null)
    .map((slides) => ({
      id: slides.id,
      alt: slides.alt,
      nomor_urut: slides.nomor_urut!,
      url: slides.url,
    }));

  const nextOrder =
    slides.length > 0
      ? Math.max(...slides.map((slide) => slide.nomor_urut ?? 0)) + 1 : 1;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl font-bold">Landing Carousel</h1>
          {/* Modal Trigger Pop up form*/}
          <CarouselModal triggerLabel="Tambah Carousel" nextOrder={nextOrder} />
        </div>

        {/* Table */}
        <CarouselTabel slides={slides} />

        {/* Preview */}
        <LandingCarousel
          slides={
            previewSlides.length > 0
              ? previewSlides
              : [
                  {
                    id: "default",
                    nomor_urut: 1,
                    alt: "Carousel Default Image",
                    url: "/carousel/4_keunggulan_atisisbada.png",
                  },
                ]
          }
        />
      </div>
    </div>
  );
}
