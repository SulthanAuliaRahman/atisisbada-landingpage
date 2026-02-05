import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const body = await request.json();
  const { url, nama,deskripsi, nomor_urut, status } = body;

  if (!url || !nama) {
    return NextResponse.json(
      { message: "url dan nama wajib diisi" },
      { status: 400 }
    );
  }

  const instagram = await prisma.instagram.create({
    data: {
      url,
      nama,
      deskripsi,
      nomor_urut: nomor_urut ?? null,
      status: status ?? true,
      created_at: new Date(),
    },
  });

  return NextResponse.json(instagram);
}