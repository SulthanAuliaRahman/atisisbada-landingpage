import prisma from '@/lib/prisma'
import PengembangSectionUI from "../UI/pengembang/PengembangSectionUI";

export const revalidate = 30;

// const example_data = [
//   { img: "/carousel/4_keunggulan_atisisbada.png", nama: "Nama 1", jabatan: "Frontend Engineer" },
// ];

export default async function PengembangSectionWrapper() {
    const data = await getPengembang();

  return <PengembangSectionUI developers={data} />;
}

 async function getPengembang() {
  return prisma.pengembang.findMany({
    where:{status: true},
    orderBy: { created_at: "asc" },
    select: {
      id: true,
      nama: true,
      jabatan:true,
      img_url: true,
    },
  });
}
