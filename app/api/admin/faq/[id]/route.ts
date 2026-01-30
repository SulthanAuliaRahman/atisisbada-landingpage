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
  
  const { pertanyaan, jawaban, nomor_urut, status } = body;

  const faq = await prisma.faq.update({
    where: { id },
    data: {
      pertanyaan,
      jawaban,
      nomor_urut,
      status,
      updated_at: new Date(),
    },
  });

  return NextResponse.json(faq);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {

  const {id} = await params;

  await prisma.faq.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
