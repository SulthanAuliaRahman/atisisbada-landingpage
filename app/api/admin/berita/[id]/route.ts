import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function PUT(request: NextRequest, 
  { params }: { params: Promise<{ id: string }>} ) {
  const {id} = await params;
  const body = await request.json();

  if (!id) {
    return NextResponse.json(
      { message: "Missing id" },
      { status: 400 }
    );
  }
  
  const { nama,url, deskripsi, nomor_urut, status } = body;

  const berita = await prisma.berita.update({
    where: { id },
    data: {
      nama,
      url,
      deskripsi,
      nomor_urut,
      status,
 
      updated_at: new Date(),
    },
  });

  return NextResponse.json(berita);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {

  const {id} = await params;

  await prisma.berita.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
