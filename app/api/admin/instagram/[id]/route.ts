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
      { message: "Missing id param" },
      { status: 400 }
    );
  }
  
  const { url, nama, deskripsi, nomor_urut, status } = body;

  const instagram = await prisma.instagram.update({
    where: { id },
    data: {
      url,
      nama,
      deskripsi,
      nomor_urut,
      status,
      updated_at: new Date(),
    },
  });

  return NextResponse.json(instagram);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {

  const {id} = await params;

  await prisma.instagram.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
