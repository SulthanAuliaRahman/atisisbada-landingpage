import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function PUT(req: NextRequest, { params }: Params) {
  const {id} = await params;
  const body = await req.json();

  if (!id) {
      return NextResponse.json(
        { message: "Missing id param" },
        { status: 400 }
      );
    }
  
  const { pertanyaan, jawaban } = body;

  const faq = await prisma.faq.update({
    where: { id },
    data: {
      pertanyaan,
      jawaban,
      updated_at: new Date(),
    },
  });

  return NextResponse.json(faq);
}

export async function DELETE(_: NextRequest, { params }: Params) {

  const {id} = await params;

  await prisma.faq.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
