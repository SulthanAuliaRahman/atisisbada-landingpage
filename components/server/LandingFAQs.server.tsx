import prisma from "@/lib/prisma";
import LandingFaqs from "../UI/LandingFAQs";

export const revalidate = 30;

export default async function LandingFAQsWrapper() {
    const faqs = await getFaq();
    const berita = await getBerita();

  return <LandingFaqs faqs={faqs} berita={berita} />;
}


 async function getFaq() {
  return prisma.faq.findMany({
    where:{status: true},
    orderBy: { created_at: "asc" },
    select: {
      id: true,
      pertanyaan: true,
      jawaban: true,
    },
  });
}

 async function getBerita() {
  return prisma.berita.findMany({
    where:{status: true},
    orderBy: { created_at: "asc" },
    select: {
      id: true,
      nama: true,
      url: true,
    },
  });
}
