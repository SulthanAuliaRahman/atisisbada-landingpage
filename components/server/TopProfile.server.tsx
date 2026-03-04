import prisma from '@/lib/prisma'
import TopProfileSectionUI from "../UI/top-profile/TopProfileSectionUI";

export const revalidate = 30;

// data : Profil Text
export default async function TopProfileSectionWrapper() {
    const data = await getTopProfile();

  return <TopProfileSectionUI profile_text={data?.Profile_text ?? ""}/>;
}


async function getTopProfile() {  
  return prisma.profile_Kantor.findFirst({
    select: {
      Profile_text : true,
    },
  });
}