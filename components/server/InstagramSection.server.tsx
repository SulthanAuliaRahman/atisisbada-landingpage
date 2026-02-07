import prisma from '@/lib/prisma'
import InstagramSectionUI from '../UI/InstagramSectionUI'

type InstagramPost = {
  url: string
  caption?: string
}


export default async function InstagramSection() {
  const instagramData = await prisma.instagram.findMany({
    orderBy: {nomor_urut:"asc"}
  })

  const showedInstagramPost = instagramData
  .filter((instagramData)=> instagramData.status && instagramData.nomor_urut !== null)
  .map((instagramData)=>({
    id:instagramData.id,
    url:instagramData.url,
    deskripsi:instagramData.deskripsi
  }))

  return <InstagramSectionUI posts={showedInstagramPost} />
}
