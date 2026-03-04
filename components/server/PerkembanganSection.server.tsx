import prisma from '@/lib/prisma'
import PerkembanganPerusahaanSectionUI from "../UI/perkembangan-perusahaan/PerkembanganPerusahaanSectionUI";

export const revalidate = 30;

const perkembanganPerusahaan = [
  {
    background_url: "/carousel/4_keunggulan_atisisbada.png",
    tahun: 2013,
    judul: "Perkembangan 2013",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },

];

export default async function PerkembanganSectionWrapper() {
    const data = await getPerkembanganPerusahaan();

  return <PerkembanganPerusahaanSectionUI data={data} />;
}

 async function getPerkembanganPerusahaan() {
  return prisma.perkembangan.findMany({
    where:{status: true},
    orderBy: { tahun: "asc" },
    select: {
      background_url:true,
      tahun:true,
      judul:true,
      text:true,
    },
  });
}
