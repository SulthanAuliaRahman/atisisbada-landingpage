import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const berita = await prisma.berita.findMany({
    orderBy: { nomor_urut: "asc" },
  });

  return NextResponse.json(berita);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nama, url, deskripsi,nomor_urut, status } = body;

  if (!nama || !url) {
    return NextResponse.json(
      { message: "nama dan url wajib diisi" },
      { status: 400 }
    );
  }

  const berita = await prisma.berita.create({
    data: {
      nama,
      url,
      deskripsi,
      nomor_urut: nomor_urut ?? null,
      status: status ?? true,
      created_at: new Date(),
    },
  });

  return NextResponse.json(berita);
}
