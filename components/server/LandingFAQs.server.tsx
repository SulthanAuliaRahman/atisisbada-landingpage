import prisma from "@/lib/prisma";
import LandingFaqs from "../UI/LandingFAQs";

export const revalidate = 30;

export default async function LandingFAQsWrapper() {
  const faqs = await prisma.faq.findMany({
    orderBy: { created_at: "desc" },
    take: 4,
    select: {
      id: true,
      pertanyaan: true,
      jawaban: true,
    },
  });

  return <LandingFaqs faqs={faqs} />;
}
