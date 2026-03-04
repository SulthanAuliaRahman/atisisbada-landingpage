import prisma from '@/lib/prisma'
import VisiMisiSectionUI from "../UI/visi-misi/VisiMisiSectionUI";

export const revalidate = 30;

export default async function VisiMisiSectionWrapper() {
    const data = await getVisiMisi();

  return <VisiMisiSectionUI visi={data?.Visi ?? ""} misi={data?.Misi ?? ""}/>;
}

async function getVisiMisi() {  
  return prisma.profile_Kantor.findFirst({
    select: {
      Visi: true,
      Misi: true,
    },
  });
}
