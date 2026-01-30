import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const faqs = await prisma.faq.findMany({
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(faqs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { pertanyaan, jawaban, nomor_urut, status } = body;

  if (!pertanyaan || !jawaban) {
    return NextResponse.json(
      { message: "Pertanyaan dan jawaban wajib diisi" },
      { status: 400 }
    );
  }

  const faq = await prisma.faq.create({
    data: {
      pertanyaan,
      jawaban,
      nomor_urut: nomor_urut ?? null,
      status: status ?? true,
      created_at: new Date(),
    },
  });

  return NextResponse.json(faq);
}
