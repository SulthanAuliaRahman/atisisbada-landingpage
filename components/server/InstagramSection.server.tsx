import prisma from '@/lib/prisma'
import InstagramSectionUI from '../UI/InstagramSectionUI'

type InstagramPost = {
  url: string
  caption?: string
}

async function getInstagramEmbed(url: string): Promise<string | null> {
  try {
    const oembedUrl = `https://graph.facebook.com/v20.0/instagram_oembed?url=${encodeURIComponent(url)}`
    const res = await fetch(oembedUrl, { next: { revalidate: 3600 } }) // cache 1 hour

    if (!res.ok) return null

    const data = await res.json()
    return data.html || null
  } catch (err) {
    console.error('Failed to fetch Instagram oEmbed:', err)
    return null
  }
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
