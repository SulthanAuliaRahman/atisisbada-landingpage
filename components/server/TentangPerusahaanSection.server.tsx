import prisma from '@/lib/prisma'

import TentangPerusahaanSectionUI from "../UI/tentang-perusahaan/TentangPerusahaanSectionUI";


export const revalidate = 30;

// data : logo(img), Tentang Perusahaan

export default async function TentangPerusahaanSectionWrapper() {
    const data = await getTentangPerusahaan();

  return <TentangPerusahaanSectionUI tentang_text={data?.Tentang_text ?? ""}/>;
}

async function getTentangPerusahaan() {  
  return prisma.profile_Kantor.findFirst({
    select: {
      Tentang_text: true,
    },
  });
}
