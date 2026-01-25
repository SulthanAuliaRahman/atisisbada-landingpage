import LandingCarousel from "@/app/(public)/LandingCarousel";
import LandingModule from "@/app/(public)/LandingModule";
import prisma from "@/lib/prisma";
import LandingFAQsWrapper from "../../components/server/LandingFAQs.server";

// karena public jadi  bukan force-dynamic
// ini jadi update static content (yang di public) dengan cepat karena gak nge rebuild
export const revalidate = 60; // second

//TODO Refactor Carousel Slide using Wrapper for the server nanti

type CarouselSlide = {
  id: string;
  nomor_urut: number;
  alt:string;
  url: string;
};


// this is landing page
export default async function LandingPage() {
  //fetch carousel slide
    const slides: CarouselSlide[] = (
    await prisma.homeCarousel.findMany({
      where: { status: true },
      orderBy: { nomor_urut: "asc" },
      select: {
        id: true,
        alt:true,
        nomor_urut: true,
        url: true,
      },
    })
  ).filter(
    (slides): slides is CarouselSlide => slides.nomor_urut !== null
  );


  return (
    <div className=" bg-white overflow-x-hidden">
      {/* per-section */}
      <main>
        <LandingCarousel
          slides={
            slides.length > 0 ? slides : [
                  {
                    id: "default",
                    nomor_urut: 1,
                    alt:"Carousel_Image",
                    url: "/carousel/4_keunggulan_atisisbada.png", 
                  },
                ]
          }
        />
        <LandingModule/>
        <LandingFAQsWrapper/>
      </main>
      
    </div>
  );
}
